var filter = {
    init: function (){
        var _this = this;

        _this.openOptions();
        _this.openCloseMobFilter();
        _this.send();
        _this.rangeOption($('.js-filters .js-filter-range'));
        _this.showMoreOptions();
        _this.smartfilterRefreshHideParams();
        _this.clearSelectedFilter();
        _this.initFilterSubcategory();
    },
    openOptions: function(){
        var _this = this;

        var title = $('.js-filter-title');

        title.on("click", function (){
            var filterItem = $(this).closest('.js-filter-el'),
                options = filterItem.find('.js-filter-options');

            if(!options.is(':visible')){
                options.slideDown();
                filterItem.removeClass('close');
            }else{
                options.slideUp();
                filterItem.addClass('close');
            }
        });
    },
    openCloseMobFilter: function(){
        var _this = this,
            filterHead = $('.js-mobile-filter-head'),
            filterBody = $('.js-mobile-filter-body');

        filterHead.on('click', function(){
            filterBody.toggle();
            if(filterHead.hasClass('filter-open')){
                filterHead.removeClass('filter-open');
            }else{
                filterHead.addClass('filter-open');
            }
        });
    },
    send: function (){
        $('.js-filters.js-ajax form input').change(function () {
            var form = $(this).closest('form');
            productList.ajaxUpdateListFormFields(form.serializeArray());
        });
        $('.js-filters.js-ajax form').submit(function () {
            var form = $(this);
            productList.ajaxUpdateListFormFields(form.serializeArray());
            return false;
        });
    },
    rangeOption: function (fields){
        fields.each(function () {
            if (!$(this).find('.js-slider-range').length) {
                $(this).append('<div class="js-slider-range"></div>');
            } else {
                return;
            }
            var min = $(this).find('.js-min');
            var max = $(this).find('.js-max');
            var min_value = parseFloat(min.attr('placeholder'));
            var max_value = parseFloat(max.attr('placeholder'));
            var step = 1;
            var slider = $(this).find('.js-slider-range');
            if (slider.data('step')) {
                step = parseFloat(slider.data('step'));
            } else {
                var diff = max_value - min_value;
                if (Math.round(min_value) != min_value || Math.round(max_value) != max_value) {
                    step = diff / 10;
                    var tmp = 0;
                    while (step < 1) {
                        step *= 10;
                        tmp += 1;
                    }
                    step = Math.pow(10, -tmp);
                    tmp = Math.round(100000 * Math.abs(Math.round(min_value) - min_value)) / 100000;
                    if (tmp && tmp < step) {
                        step = tmp;
                    }
                    tmp = Math.round(100000 * Math.abs(Math.round(max_value) - max_value)) / 100000;
                    if (tmp && tmp < step) {
                        step = tmp;
                    }
                }
            }
            slider.slider({
                range: true,
                min: parseFloat(min.attr('placeholder')),
                max: parseFloat(max.attr('placeholder')),
                step: step,
                values: [parseFloat(min.val().length ? min.val() : min.attr('placeholder')),
                         parseFloat(max.val().length ? max.val() : max.attr('placeholder'))],
                slide: function( event, ui ) {
                    var v = ui.values[0] == $(this).slider('option', 'min') ? '' : ui.values[0];
                    min.val(v);
                    v = ui.values[1] == $(this).slider('option', 'max') ? '' : ui.values[1];
                    max.val(v);
                },
                stop: function (event, ui) {
                    min.change();
                }
            });
            min.add(max).change(function () {
                var v_min =  min.val() === '' ? slider.slider('option', 'min') : parseFloat(min.val());
                var v_max = max.val() === '' ? slider.slider('option', 'max') : parseFloat(max.val());
                if (v_max >= v_min) {
                    slider.slider('option', 'values', [v_min, v_max]);
                }
            });
        });
    },
    showMoreOptions: function (){
        var btn = $('.js-filter-options-show-all');

        btn.click(function (event){
            event.preventDefault();

            var $this = $(this),
                optionsList = $this.closest(".js-filter-options"),
                optionsEls = optionsList.find('.js-filter-options-el');

            if(optionsEls.is(":hidden")){
                optionsEls.removeClass("hide");
                $this.addClass("open");
            }else{
                optionsEls.addClass("hide");
                $this.removeClass("open");
            }
        });
    },
    smartfilterRefreshHideParams: function (){
        if(typeof $.smartfiltersTheme !== 'undefined') {
            setTimeout(function (){
                var btnShowMore = $('.js-filter-options-show-all'),
                    isHideDisabledFilters = $('.js-filters').data('smartfilters-hide-option');

                if(isHideDisabledFilters){
                    btnShowMore.each(function (){
                        var thisBtn = $(this),
                            isOpenAllParams = thisBtn.hasClass('open'),
                            maxParams = parseInt(thisBtn.data('max-show-params')),
                            params = thisBtn.closest('.js-filter-el').find('label'),
                            indexVisibleParam = 0;

                        if(maxParams){
                            thisBtn.hide();
                            params.each(function (){
                                var thisParam = $(this);

                                thisParam.removeClass('js-filter-options-el').removeClass('hide');
                                var isHiddenThisParam =  thisParam.hasClass('sf-label-disabled') && thisParam.is(':hidden');

                                if(!isHiddenThisParam){
                                    indexVisibleParam++;
                                }

                                if(indexVisibleParam > maxParams){
                                    thisBtn.show();
                                    thisParam.addClass('js-filter-options-el');
                                    if(!isOpenAllParams){
                                        thisParam.addClass('hide');
                                    }
                                }
                            });
                        }
                    });
                }
                $('.js-filter-body').find('input[type="checkbox"], input[type="radio"], .js-select').trigger('refresh');

            }, 500);
        }
    },
    clearSelectedFilter: function (){
        var _this = this;

        $('body').on("click", ".js-filter-checked-remove", function (){
            var code = $(this).data('code');

            if($('.js-filters').length){
                _this.clearFilterItem(code);

                productList.ajaxUpdateListFormFields($('.js-filters form').serializeArray());
            }
        });
    },
    clearFilterItem: function (code){
        var _this = this;

        var item = $('.js-filters').find(".js-filter-el[data-code='"+code+"']");
        item.find('input[type="checkbox"], input[type="radio"]').prop( "checked", false ).trigger('refresh');
        item.find('input[type="text"]').val("");

        /* range options refresh */
        $('.js-filters .js-slider-range').remove();
        _this.rangeOption($('.js-filters .js-filter-range'));
    },
    addFilterSubcategory: function(fields){
        var _this = this,
            subcategoriesWrap = $('.js-cat_sub'),
            isSaveFilters = subcategoriesWrap.data('save-filters'),
            saveFiltersAliases = subcategoriesWrap.data('save-filters-aliases'),
            saveFields = fields,
            subcategiesLink = subcategoriesWrap.find('.js-cat-link');

        if(isSaveFilters){
            if(saveFiltersAliases){
                saveFiltersAliases = saveFiltersAliases.split(',');

                if(saveFiltersAliases.length > 0){
                    saveFields = [];
                    fields.forEach(function(field) {
                        if(saveFiltersAliases.indexOf(field.name.replace("[]", "")) >= 0){
                            saveFields.push(field);
                        }
                    });
                }
            }

            if(saveFields.length){
                var url = filter.buildUrl(saveFields);

                if(subcategiesLink.length){
                    if(url.length < 2){
                        url = "";
                    }
                    subcategiesLink.each(function(){
                        var href = $(this).attr("href");
                        href = href.split("?")[0];
                        $(this).attr("href", href + url);
                    });
                }
            }else{
                subcategiesLink.each(function(){
                    var href = $(this).attr("href");
                    href = href.split("?")[0];
                    $(this).attr("href", href);
                });
            }
        }
    },
    initFilterSubcategory: function(){
        var _this = this,
            form = $('.js-filters form');

        if(form.length){
            _this.addFilterSubcategory(form.serializeArray());
        }
    },
    buildUrl: function (fields){
        var params = [];

        for (var i = 0; i < fields.length; i++) {
            if (fields[i].value !== '') {
                params.push(fields[i].name + '=' + fields[i].value);
            }
        }
        var url = '?' + params.join('&');

        return url;
    },
};

var productList = {
    init: function (){
        var _this = this;

        _this.switchProductListView();
        _this.setCountPerPageProducts();
    },
    switchProductListView: function(){
        var _this = this,
            cookieOptions = {expires: 7, path: '/'},
            switchBtn = $('.js-switch-product-view');

        $('body').on('click', '.js-switch-product-view', function(){
            var $this = $(this),
                type = $this.data('view');

            if(type){
                $.cookie('CategoryViewProducts', type, cookieOptions);
            }

            var form = $('.js-filters.js-ajax form');

            _this.ajaxUpdateList(window.location.search);

            switchBtn.removeClass('selected');
            $this.addClass('selected');
        });


    },
    setCountPerPageProducts: function () {
        var _this = this,
            select = $('#set-per-page');

        select.change(function () {
            var $this = $(this),
                count = $this.val(),
                cookieOptions = {expires: 7, path: '/'};

            $.cookie('products_per_page', count, cookieOptions);
            var href = window.location.href.replace(/(page=)\w+/g, 'page=1');
            window.location.href = href;
        });

    },
    ajaxUpdateListFormFields: function(fields){
        var _this = this,
            url = filter.buildUrl(fields);

        _this.ajaxUpdateList(url, true);
        filter.addFilterSubcategory(fields);
    },

    ajaxUpdateList: function(url, $isPushState){
        var _this = this;
        var productList = $('.js-product-ajax-list');
        var loader = $('.js-product-ajax-list-loader');

        $(window).lazyLoad && $(window).lazyLoad('sleep');
        productList.html("");
        loader.show();
        var getUrl = (url.indexOf('?') < 0) ? url+'?_' : url;
        getUrl += '&_=_'+ (new Date().getTime()) + Math.random();
        $.get(getUrl, function(html) {
            var tmp = $('<div></div>').html(html);
            productList.html(tmp.find('.js-product-ajax-list').html());
            productsPreviewList.images(productList.find('.js-preview-products'));
            loader.hide();
            if (!!(history.pushState && history.state !== undefined) && $isPushState) {
                if(url == "?") url = window.location.pathname;
                window.history.pushState({}, '', url);
            }

            $(window).lazyLoad && $(window).lazyLoad('reload');

            $(window).on("popstate", function(e) {
                location.reload();
            });
            productTile.init();

            if (typeof $.autobadgeFrontend !== 'undefined') {
                $.autobadgeFrontend.reinit();
            }
            if (typeof $.pluginprotilegallery !== 'undefined') {
                $.pluginprotilegallery.lazyload();
            }

            filter.smartfilterRefreshHideParams();
        });
    }
};

var lazyloadingPagination = {
    init: function() {
        var _this = this;

        if ($.fn.lazyLoad) {
            var paging = $('.lazy-paging');
            if (!paging.length) {
                return;
            }

            var times = parseInt(paging.data('times'), 10);
            var loading_str = paging.data('loading-str') || 'Loading...';

            // check need to initialize lazy-loading
            var current = paging.find('li.selected');
            if (current.children('a').text() != '1') {
                return;
            }
            paging.hide();
            var win = $(window);

            // prevent previous launched lazy-loading
            win.lazyLoad('stop');

            // check need to initialize lazy-loading
            var next = current.next();
            if (next.length) {
                win.lazyLoad({
                    container: '.js-product-ajax-list .js-cat-list',
                    load: function () {
                        win.lazyLoad('sleep');

                        var paging = $('.lazy-paging').hide();

                        // determine actual current and next item for getting actual url
                        var current = paging.find('li.selected');
                        var next = current.next();
                        var url = next.find('a').attr('href');
                        if (!url) {
                            win.lazyLoad('stop');
                            return;
                        }
                        var product_list = $('.js-product-ajax-list .js-cat-list');
                        var loading = $('<div class="lazy-paging-loader"><i class="icon16 loading"></i>'+loading_str+'</div>').insertAfter('.js-product-ajax-list');

                        $.get(url, function (html) {
                            var tmp = $('<div></div>').html(html);
                            productsPreviewList.images(tmp.find('.js-preview-products'));
                            product_list.append(tmp.find('.js-product-ajax-list .js-cat-list').children());
                            var tmp_paging = tmp.find('.lazy-paging').hide();
                            paging.replaceWith(tmp_paging);
                            paging = tmp_paging;

                            var current = paging.find('li.selected');
                            var next = current.next();
                            if (next.length) {
                                if (!isNaN(times) && times <= 0) {
                                    win.lazyLoad('sleep');
                                    if (!$('.lazyloading-load-more').length) {
                                        $('<a href="#" class="lazyloading-load-more">' + link_text + '</a>').insertAfter(paging)
                                            .click(function () {
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
                                win.lazyLoad('stop');
                                $('.lazyloading-load-more').hide();
                            }

                            productTile.init();
                            if (typeof $.autobadgeFrontend !== 'undefined') {
                                $.autobadgeFrontend.reinit();
                            }
                            if (typeof $.pluginprotilegallery !== 'undefined') {
                                $.pluginprotilegallery.lazyload();
                            }
                            loading.remove();
                            tmp.remove();
                        });
                    }
                });
            }
        }
    }
};

var countdown = {
    init: function (){
        $(".js-promo-countdown").each(function(){
            var $this = $(this),
                dateEnd = $this.data("end"),
                dayText = $this.data("day-text"),
                isWrap = $this.data("wrap");

            $this.countdown(dateEnd, function(event) {
                if(isWrap){
                    $this.find('.js-countdown-days').html(event.strftime('%D'));
                    $this.find('.js-countdown-hours').html(event.strftime('%H'));
                    $this.find('.js-countdown-minutes').html(event.strftime('%M'));
                    $this.find('.js-countdown-seconds').html(event.strftime('%S'));
                }else{
                    $this.text(event.strftime('%D ' + dayText + ' %H:%M:%S'));
                }
            });
        });
    }
};

var brandsCarousel = {
    brandsWrap: $('.js-brands-carousel'),
    init: function (){
        var _this = this;

        if(!_this.brandsWrap.length){
            return false;
        }

        _this.prepareBrandsCarousels();
        _this.carouselInteraction();

        $(window).one('resize',  _this.brandsCarousel);
    },
    prepareBrandsCarousels: function (){
        var _this = this,
            carousel = _this.brandsWrap.find('.owl-carousel'),
            carouselWidth = carousel.outerWidth(true),
            itemCarousel = _this.brandsWrap.find(".js-homepage-brands-el"),
            countItems = itemCarousel.length,
            widthItem = itemCarousel.first().outerWidth(true),
            widthAllItems = widthItem * countItems,
            isButtons = widthAllItems > carouselWidth;

        if(isButtons){
            var wrapButtons = _this.brandsWrap.find(".js-homepage-brands-direction");
            wrapButtons.append('<button data-index="prev" class="js-carousel-brands-on-initialized owl-prev disabled"></button>');
            wrapButtons.append('<button data-index="next" class="js-carousel-brands-on-initialized owl-next"></button>');
        }

        var carouselOffsetRight = carousel.offset().left + carousel.outerWidth();
        itemCarousel.slice(0,6).each(function (){
            var itemOffsetLeft = $(this).offset().left;

            if (itemOffsetLeft < carouselOffsetRight) {
                $(this).find(".owl-lazy").Lazy({
                    afterLoad: function(element) {
                        element.removeClass("owl-lazy");
                    },
                });
            }
        });
    },
    carouselInteraction: function (){
        var _this = this,
            brandsCarouselNav = $('.js-carousel-brands-on-initialized');

        brandsCarouselNav.on("click", function (){
            _this.brandsCarousel($(this).data("index"));
        });

        if(is_touch_device()){
            _this.brandsWrap.find('.owl-carousel').swipe( {
                allowPageScroll:"auto",
                threshold: 20,
                swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
                    if(direction == 'left'){
                        brandsCarousel.brandsCarousel("next");
                    }
                    else if(direction == 'right') {
                        brandsCarousel.brandsCarousel("prev");
                    }
                }
            });
        }
    },
    brandsCarousel: function (goToSlide){
        var _this = this;

        if(brandsCarousel.brandsWrap.hasClass("carousel-init")){
            return false;
        }

        var carousel = brandsCarousel.brandsWrap.find('.owl-carousel'),
            nav = brandsCarousel.brandsWrap.find('.js-homepage-brands-direction');

        carousel.owlCarousel({
            loop:false,
            margin: 0,
            nav: true,
            navContainer: nav,
            navText: ["",""],
            lazyLoad:true,
            dots: false,
            responsive: {
                0: {
                    items: 1
                },
                401: {
                    items: 2
                },
                801: {
                    items: 3
                },
                1001: {
                    items: 4
                },
                1201: {
                    items: 5
                }
            },
            onInitialize: function (event){
                brandsCarousel.brandsWrap.find(".js-carousel-brands-on-initialized").remove();
            },
            onInitialized: function (event){
                brandsCarousel.brandsWrap.addClass("carousel-init");
            },
        });

        if(goToSlide){
            if(goToSlide == "prev") {
                carousel.trigger("prev.owl.carousel");
            }else if(goToSlide == "next"){
                carousel.trigger("next.owl.carousel");
            }
        }
    },
};

var categories = {
    init: function (){
        var _this = this;

        _this.sidebar();
        _this.sidebarCategoriesImages();
    },
    sidebar: function (){
        var _this = this;

         _this.sidebarInit();

        var openBtn = $('.js-subcat-open');

        openBtn.click(function(){
            var $this = $(this), subs = $($this.parent().find('.js-subcat')[0]);

            if(!subs.is(':visible')){
                subs.slideDown();
                $this.addClass('selected');
            }else{
                subs.slideUp();
                $this.removeClass('selected');
            }
        });
    },
    sidebarInit: function (){
        var treeCats = $('.js-sidebar-cats'),
            currentCat = treeCats.find('[data-is-open]'),
            outWrap = currentCat.parents(".js-subcat");

        outWrap.removeClass('hide');
        outWrap.each(function(){
            $(this).parent().find('.js-subcat-open').first().addClass('selected');
        });
    },
    sidebarCategoriesImages: function (){
        var menu = $('.js-sidebar-cats'),
            isLazyImages = menu.data("lazy"),
            isRetinaImages = menu.data("retina");

        if(isLazyImages){
            categoriesImages.lazyImages(menu.find('.js-sidebar-cat-image'), isRetinaImages);
        }else if(isRetinaImages){
            categoriesImages.retinaImages(menu.find('.js-sidebar-cat-image'));
        }
    }
};

var categoryText = {
    readMore: function (){
        var wrapOuter = $(".js-category-desc-wrap"),
            maxHeight = wrapOuter.data("max-height"),
            wrap = $(".js-category-desc"),
            linkMore = $('.js-category-desc-more-wrap');

        linkMore.remove();
        wrapOuter.removeClass("close");
        if (wrapOuter.length && maxHeight){
            wrapOuter.css("max-height", maxHeight + "px");
        }
        if(wrapOuter.length && wrap.length && wrapOuter.outerHeight() < wrap.outerHeight()){
            var textMore = wrapOuter.data("text-more"),
                textHide = wrapOuter.data("text-hide");

            wrapOuter.addClass("close");
            wrapOuter.after("<div class='js-category-desc-more-wrap category-desc-more-wrap'><span class='js-category-desc-more category-desc-more sdColor link-half'>"+textMore+"</span></div>");

            $('.js-category-desc-more').on("click", function(){
                var $this = $(this);

                if($this.hasClass("open")){
                    $this.removeClass("open");
                    wrapOuter.addClass("close");
                    $this.text(textMore);
                    wrapOuter.animate({maxHeight: maxHeight}, 500);
                }else{
                    wrapOuter.animate({maxHeight: wrap.outerHeight() + "px"}, 500);
                    $this.addClass("open");
                    wrapOuter.removeClass("close");
                    $this.text(textHide);
                }

            });
        }else{
            wrapOuter.removeAttr("style");
        }
    }
};


var reviews = {
    reviewsWrap: $('.js-reviews-carousel'),
    init: function (){
        var _this = this;

        if(!_this.reviewsWrap.length){
            return false;
        }

        _this.prepareReviewsCarousels();
        _this.carouselInteraction();

        $(window).one('resize', reviews.reviewsCarousel);
    },
    prepareReviewsCarousels: function (){
        var _this = this,
            carousel = _this.reviewsWrap.find('.owl-carousel'),
            carouselWidth = carousel.outerWidth(),
            itemCarousel = _this.reviewsWrap.find(".js-home-reviews-item"),
            countItems = itemCarousel.length,
            widthItem = itemCarousel.first().outerWidth(true),
            widthAllItems = widthItem * countItems,
            isButtons = widthAllItems > carouselWidth + 20;


        if(isButtons){
            var wrapButtons = _this.reviewsWrap.find(".js-reviews-carousel-direction");

            wrapButtons.append('<button data-index="prev" class="js-carousel-reviews-on-initialized owl-prev disabled"></button>');
            wrapButtons.append('<button data-index="next" class="js-carousel-reviews-on-initialized owl-next"></button>');
        }

        var carouselOffsetRight = carousel.offset().left + carousel.outerWidth();
        itemCarousel.slice(0,2).each(function (){
            var itemOffsetLeft = $(this).offset().left;

            if (itemOffsetLeft < carouselOffsetRight) {
                $(this).find(".owl-lazy").Lazy({
                    afterLoad: function(element) {
                        element.removeClass("owl-lazy");
                    },
                });
            }
        });
    },
    carouselInteraction: function (){
        var _this = this,
            reviewsCarouselNav = $('.js-carousel-reviews-on-initialized');

        reviewsCarouselNav.on("click", function (){
            _this.reviewsCarousel($(this).data("index"));
        });

        if(is_touch_device()){
            _this.reviewsWrap.find('.owl-carousel').swipe( {
                allowPageScroll:"auto",
                threshold: 20,
                swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
                    if(direction == 'left'){
                        reviews.reviewsCarousel("next");
                    }
                    else if(direction == 'right') {
                        reviews.reviewsCarousel("prev");
                    }
                }
            });
        }
    },
    reviewsCarousel: function (goToSlide){
        if(reviews.reviewsWrap.hasClass("carousel-init")){
            return false;
        }

        var carousel = reviews.reviewsWrap.find('.owl-carousel'),
            nav = reviews.reviewsWrap.find('.js-reviews-carousel-direction');

        carousel.owlCarousel({
            loop:false,
            margin: 20,
            nav: true,
            dots: false,
            navText: ['',''],
            navElement: "div",
            navContainer: nav,
            responsive: {
                0: {
                    items: 1
                },
                901: {
                    items: 2
                },
                1201: {
                    items: 3
                }
            },
            autoHeight: true,
            lazyLoad: true,
            onInitialize: function (event){
                reviews.reviewsWrap.find(".js-carousel-reviews-on-initialized").remove();
            },
            onInitialized: function (event){
                reviews.reviewsWrap.addClass("carousel-init");
            },
            onLoadedLazy: function(event){
                var reviews = $(event.currentTarget);
                if (reviews.length && $.Retina) {
                    reviews.find(".owl-item.active .owl-lazy").retina();
                }
            }
        });

        if(goToSlide){
            if(goToSlide == "prev") {
                carousel.trigger("prev.owl.carousel");
            }else if(goToSlide == "next"){
                carousel.trigger("next.owl.carousel");
            }
        }
    }
};


$(document).ready(function() {
    filter.init();
    productList.init();
    lazyloadingPagination.init();
    countdown.init();
    brandsCarousel.init();
    categories.init();
    categoryText.readMore();
    reviews.init();
});

$(function(){
    if(typeof window.seofilterOnFilterSuccessCallbacks === 'undefined'){
        window.seofilterOnFilterSuccessCallbacks = []
    }
    window.seofilterOnFilterSuccessCallbacks.push(
        function(){
            $('.js-filter-body').find('input[type="checkbox"], input[type="radio"], .js-select').trigger('refresh');
            categoryText.readMore();
        }
    )
});