$(function() {

    $('.waSlideMenu-menu a').click(function(){

        if ( !$(this).parent().hasClass('collapsible') && !$(this).parent().hasClass('waSlideMenu-back') )
        {
            // that was an end node click in waSlideMenu, so do forst redirect here (Photos app Default theme specific)
            window.location.href = $(this).attr('href');
        }
    });

    $('.slidemenu').on('afterLoadDone.waSlideMenu', function () {
        $('img').retina();
    });

    if ($.fn.lazyLoad) {
        var paging = $('.lazy-paging');
        if (!paging.length) {
            return;
        }
        // check need to initialize lazy-loading
        var current = paging.find('li.selected');
        if (current.children('a').text() != '1') {
            return;
        }
        paging.hide();
        var win = $(window);

        var times = parseInt(paging.data('times'), 10);
        var link_text = paging.data('linkText') || 'Load more';

        // prevent previous launched lazy-loading
        win.lazyLoad('stop');

        // check need to initialize lazy-loading
        var next = current.next();
        if (next.length) {
            win.lazyLoad({
                container: '#js-photo-thumb',
                load: function() {
                    win.lazyLoad('sleep');
                    var paging = $('.lazy-paging').hide();

                    var loading = paging.parent().find('.loading').parent();

                    // determine actual current and next item for getting actual url
                    var current = paging.find('li.selected');
                    var next = current.next();
                    var url = next.find('a').attr('href');
                    if (!url) {
                        loading.hide();
                        $('.lazyloading-load-more').hide();
                        win.lazyLoad('stop');
                        return;
                    }

                    var photo_list = $('#js-photo-thumb');
                    if (!loading.length) {
                        loading = $('<div><i class="icon16 loading"></i>Loading...</div>').insertBefore(paging); // !!! localization?..
                    }

                    loading.show();
                    $.get(url, function(html) {
                        var tmp = $('<div></div>').html(html);
                        if ($.Retina) {
                            tmp.find('#js-photo-thumb img').retina();
                        }
                        photo_list.append(tmp.find('#js-photo-thumb').children());
                        var tmp_paging = tmp.find('.lazy-paging').hide();
                        paging.replaceWith(tmp_paging);
                        paging = tmp_paging;

                        times -= 1;

                        // check need to stop lazy-loading
                        var current = paging.find('li.selected');
                        var next = current.next();
                        if (next.length && next.find('a').attr('href')) {
                            if (!isNaN(times) && times <= 0) {
                                win.lazyLoad('sleep');
                                if (!$('.lazyloading-load-more').length) {
                                    $('<a href="#" class="lazyloading-load-more">' + link_text + '</a>').insertAfter(paging)
                                        .click(function() {
                                            loading.show();
                                            times = 1;      // one more time
                                            win.lazyLoad('wake');
                                            win.lazyLoad('force');
                                            return false;
                                        });
                                }
                            } else {
                                win.lazyLoad('wake');
                            }
                        } else {
                            $('.lazyloading-load-more').hide();
                            win.lazyLoad('stop');
                        }

                        loading.hide();
                        tmp.remove();

                        photo_list.trigger('append_photo_list');
                    });
                }
            });
        }
    }

});