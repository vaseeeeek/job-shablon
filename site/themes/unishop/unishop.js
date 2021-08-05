var main = {
    init: function () {
        var _this = this;

        _this.retinaLogo();
        _this.moveTop();
        _this.locationChange();
        _this.searchAuto();
        _this.previewCart();
        _this.addTouchClass();
        _this.numberInput();
        _this.showAllPlugins();

        _this.contentHeight();
        setTimeout(_this.contentHeight, 2000);
    },
    retinaLogo: function(){
        var logo = $('.js-retina-logo');

        if(logo.length){
            logo.retina({ force_original_dimensions: false });
        }
    },
    moveTop: function () {
        var linkMove = $('#move-to-top'), contentTop = $('.js-moved-content');

        if(contentTop.length && linkMove.length){
            $(window).scroll(function() {
                var t = $(document).scrollTop();
                var contentTopX = contentTop.offset().top;
                if (t >= contentTopX) {
                    linkMove.fadeIn();
                } else {
                    linkMove.fadeOut();
                }
            });

            linkMove.click(function(event) {
                event.preventDefault();

                $('html,body').animate({
                    scrollTop: 0
                }, 500);
            });
        }

    },
    locationChange: function (){
        $(".js-language").on("click", function (event) {
            event.preventDefault();

            var url = location.href;
            if (url.indexOf('?') == -1) {
                url += '?';
            } else {
                url += '&';
            }
            location.href = url + 'locale=' + $(this).data("value");
        });
    },
    searchAuto: function (){
        var input = $('.js-auto-search');

        input.on("keyup", function(){
            var $this = $(this),
                value = $this.val(),
                form = $this.closest('form'),
                url = form.attr("action"),
                resultWrap = form.find('.js-auto-search-result');

            if(value.length > 3){
                $.get(url + '?query='+value+'&ajax=1', function(data) {
                    var content = $(data).find('.js-auto-search');

                    resultWrap.html("");
                    if(content.length){
                        resultWrap.show();
                        resultWrap.html(content);
                    }else{
                        resultWrap.hide();
                    }
                });
            }
        });

        $('body').click(function (e) {
            var popup = $(".js-auto-search-result");
            if (!$('.js-auto-search').is(e.target) && !popup.is(e.target) && popup.has(e.target).length == 0) {
                popup.hide();
            }
        });
    },
    previewCart: function(){
        var _this = this,
            preview = $('.juniq-header-preview-cart');

        preview.each(function(){
            var $this = $(this),
                popup = $this.find('.js-cart-popup');

            if(popup.length){
                $this.hover(function (){
                    var url = $this.data('url');

                    popup.html("");
                    $.get(url + '?ajax=1', function(html) {
                        var cartContentHtml = $(html).find('.js-cart-ajax');

                        if(cartContentHtml.length){
                            popup.html(html);
                        }
                    });
                });
            }
        });
    },
    addTouchClass: function(){
        if(is_touch_device()){
            $('body').removeClass('no-touch').addClass('touch');
        }
    },
    numberInput: function (){
        $('body').on("keyup", ".js-number", function(){
            var reg_number = /[^0-9]/g;

            $(this).val($(this).val().replace(reg_number, ''));
        });
    },
    contentHeight: function (){
        var content = $('.js-content'),
            left = $('.js-left-sd'),
            right = $('.js-right-sidebar'),
            contentPadding = parseInt(content.css('padding-top')) + parseInt(content.css('padding-bottom'));

        content.css("min-height", "0");
        if(content.length && left.length){
            var contentHeight = content.outerHeight();
            var leftHeight = left.outerHeight();

            if(contentHeight < leftHeight){
                content.css("min-height", (parseFloat(leftHeight) - contentPadding - 2) + "px");
            }
        }

        if(content.length && right.length){
            var contentHeight = content.outerHeight();
            var rightHeight = right.outerHeight();

            if(contentHeight < rightHeight){
                content.css("min-height", (parseFloat(rightHeight) - contentPadding  - 2) + "px");
            }
        }
    },
    showAllPlugins: function (){
        var wrap = $('.js-nav-sidebar-wrap');

        wrap.each(function(){
            if($(this).find(".menu-v li:hidden").length){
                btn = $(this).find('.js-nav-sidebar-show');
                btn.removeClass('hide');

                btn.on("click", function(){
                    var hideElements = $(this).closest('.js-nav-sidebar-wrap').find(".menu-v li:hidden, .menu-v li.show");

                    hideElements.toggleClass("show");
                    $(this).find('.js-icon-plus, .js-icon-minus').toggleClass("hide");
                });
            }
        });
    },
};

var tabs = {
    init: function (){
        var _this = this;

        _this.initSelectTab();
        _this.selectTab();
        _this.moveToTabContent();
    },
    selectTab: function(){
        var button = $('.js-tab'), content = $('.js-tab-content');

        button.on("click", function(){
            var $this = $(this),
                contentWrapId = $this.data('tab-content');

            button.removeClass('selected');
            content.removeClass('selected');

            $this.addClass('selected');
            $('#' + contentWrapId).addClass('selected');
        });
    },
    moveToTabContent: function (){
        var btnMoveToTab = $('.js-motion-to-tab'),
            content = $('.js-tab-content');

        btnMoveToTab.on("click", function(event){
            event.preventDefault();

            var $this = $(this),
                tab = $('.js-tab'),
                currentTabContent = $('#' + $this.data('tab-content')),
                thisTfb = $('.js-tab[data-tab-content="'+$this.data('tab-content')+'"]');

            tab.removeClass('selected');
            thisTfb.addClass('selected');
            content.removeClass('selected');
            currentTabContent.addClass('selected');

            var top = currentTabContent.offset().top - 50;
            $('html,body').animate({
                scrollTop: top
            }, 500);
        });
    },
    initSelectTab: function (){
        var tabsWrap = $('.js-tabs');

        if(tabsWrap.length){
            tabsWrap.each(function (){
                var $this = $(this),
                    selectedTab = $this.find('.selected');

                if(!selectedTab.length){
                    selectedTab = $this.find('.js-tab:first');
                }

                if(selectedTab.length){
                    var tabContent = $('#' + selectedTab.data('tab-content'));

                    if(tabContent.length){
                        selectedTab.addClass('selected');
                        tabContent.addClass('selected');
                    }
                }
            });
        }
    }
};

var accTabs = {
    init: function (){
        var _this = this;

        _this.initSelectTab();
        _this.selectTab();
        _this.moveToTabContent();
    },
    selectTab: function (){
        var button = $('.js-acc-tab');

        button.on("click", function(){
            var $this = $(this),
                contentWrapId = $this.data('tab-content'),
                currentContent = button.closest('.js-tabs-acc-wrap').find('#' + contentWrapId);

            if(currentContent.is(':visible')){
                $this.removeClass('selected');
                currentContent.removeClass('selected');
            }else{
                $this.addClass('selected');
                currentContent.addClass('selected');
            }
        });
    },
    moveToTabContent: function (){
        var btnMoveToTab = $('.js-motion-to-tab');

        btnMoveToTab.on("click", function(event){
            event.preventDefault();

            var $this = $(this),
                currentTabContent = $('#' + $this.data('tab-content')),
                tabsOuterWrap = currentTabContent.closest(".js-tabs-acc-wrap"),
                thisTfb = tabsOuterWrap.find('.js-acc-tab[data-tab-content="'+$this.data('tab-content')+'"]');

            thisTfb.addClass('selected');
            currentTabContent.addClass('selected');

            var top = currentTabContent.offset().top - 40;
            $('html,body').animate({
                scrollTop: top
            }, 500);
        });
    },
    initSelectTab: function (){
        var tabsWrapOuter = $('.js-tabs-acc-wrap');

        if(tabsWrapOuter.length){
            tabsWrapOuter.each(function (){
                var $this = $(this),
                    selectedTab = $this.find('.js-acc-tab.selected');

                if(!selectedTab.length){
                    selectedTab = $this.find('.js-acc-tab:first');

                    if(selectedTab.length){
                        var tabContent = tabsWrapOuter.find('#' + selectedTab.data('tab-content'));

                        if(tabContent.length){
                            selectedTab.addClass('selected');
                            tabContent.addClass('selected');
                        }
                    }
                }
            });
        }
    }
};

var form = {
    init: function (){
        var _this = this;

        _this.formStyler();
        _this.submit();
    },
    formStyler: function (){
        $('body').on('change', 'input[type="checkbox"]', function() {
            if ($(this).is(':checked')) {
                $(this).closest('.jq-checkbox, .js-style-check').addClass('checked');
                $(this).closest('label').addClass('checked');
            } else {
                $(this).closest('.jq-checkbox, label, .js-style-check').removeClass('checked');
                $(this).closest('label').removeClass('checked');
            }
        });

        $('body').on('change', 'input[type="radio"]', function() {
            var inputs = $('input[type="radio"][name="'+$(this).attr('name')+'"]');
            inputs.each(function(){
                var input = $(this);
                if (input.is(':checked')) {
                    input.closest('.jq-radio, .js-toggle-styler').addClass('checked');
                    input.closest('label').addClass('checked');
                }else{
                    input.closest('.jq-radio, .js-toggle-styler').removeClass('checked');
                    input.closest('label').removeClass('checked');
                }
            });
        });

        if(!globalThemeSettings.isFormStylerInit){
            return false;
        }

        var inputStyler = $('input[type="checkbox"]:not(.js-style-check-input):not(.js-none-styler):not(.shop-sk-callback__checkbox), input[type="radio"]:not(.js-toggle-styler-input):not(.buy1step-auth__variant):not(.js-none-styler), .js-select');
        if(!inputStyler.length){
            return false;
        }
        inputStyler.styler();
        $('input[type="checkbox"], input[type="radio"], .js-select').styler();
        $('.js-addgifts__cart-el input[type="radio"], .searchpro__page-filters input[type="checkbox"], .searchpro__page-filters input[type="radio"], .searchpro__page-filters .js-select').styler('destroy');
    },
    submit: function (){
        $('body').on("click", ".js-btn-form", function (){
            var $this = $(this),
                form = $this.closest("form");

            if(!$this.hasClass('disabled')){
                form.submit();
            }
        });
    }
};

var selectList = {
    init: function (){
        var _this = this;

        $('body').on("click", '.js-checked-toggle', function(){
            var items = $(this).closest('.js-selecList').find('.js-select-items');

           if(items.is(':visible')){
               items.hide();
           }else{
               items.show();
           }
        });

        $('body').on("click", '.js-checked-toggle a', function(event){
            event.preventDefault();
        });

    }
};

var menu = {
    init: function (){
        var _this = this;

        _this.responsiveMenu();
        _this.resizeMenu();
        _this.headerMenuHover();
        _this.sidebar();
    },
    responsiveMenu: function(){
        var _this = this, items = $(".js-resp-nav-top");

        if(!items.length){
            return false;
        }

        jQuery.each(items, function(){
            _this.responsived($(this));
        });
    },
    resizeMenu: function(){
        var _this = this, items = $(".js-resp-nav-top");

        if(!items.length){
            return false;
        }

        $(window).resize(function() {
            _this.responsiveMenu();
        });
    },
    responsived: function(menu){
        var _this = this,
            menuWidth = menu.width(),
            menuItems = menu.children('.js-resp-nav-top-el'),
            ItemElse = menu.find('.js-resp-nav-top-else'),
            ItemElseWidth = parseFloat(ItemElse.removeClass('hide').outerWidth(true)),
            submenuElse = ItemElse.find('.js-resp-subnav-else'),
            allItemsWidth = 0;

        ItemElse.addClass('hide');
        submenuElse.html("");
        menuItems.removeClass('hide');

        jQuery.each(menuItems, function(){
            var $this = $(this),
                elWidth = parseFloat($this.outerWidth(true));

            if((allItemsWidth + elWidth + ItemElseWidth) > menuWidth){
                ItemElse.removeClass('hide');
                $this.clone().appendTo(submenuElse);
                $this.addClass('hide');
            }
            allItemsWidth += $this.outerWidth(true);
        });
    },
    headerMenuHover: function (){
        var headerMenu = $('#header-nav'),
            mobileBtnShowHideMenu = $('.js-nav-button[data-id="'+headerMenu.attr("id")+'"]'),
            item = $('.juniq-header-top-nav-el');

        if(!mobileBtnShowHideMenu.is(':visible')){
            item.hover(function(){

                var $this = $(this),
                    subMenuWrap = $this.children('.juniq-header-nav-sub');

                subMenuWrap.css("padding-top", "15px");
                subMenuWrap.css("opacity", "0");
                subMenuWrap.show();
                subMenuWrap.animate({ paddingTop: "0" , opacity: 1}, 300 );

            },function(){
                var $this = $(this),
                    subMenuWrap = $this.children('.juniq-header-nav-sub');

                subMenuWrap.hide();
            });
        }
    },
    sidebar: function (){
        var _this = this;

        _this.sidebarInit();

        var openBtn = $('.js-menu-v-open');

        openBtn.click(function(){
            var $this = $(this), subs = $($this.parent().find('.js-menu-v-submenu')[0]);

            if(!subs.is(':visible')){
                subs.show();
                $this.addClass('selected');
            }else{
                subs.hide();
                $this.removeClass('selected');
            }
        });
    },
    sidebarInit: function (){
        var treeCats = $('.js-sidebar-menu'),
            currentCat = treeCats.find('.selected'),
            outWrap = currentCat.parents(".js-menu-v-submenu");

        outWrap.removeClass('hide');
        outWrap.each(function(){
            $(this).parent().find('.js-menu-v-open').first().addClass('selected');
        });
    }
};



var slider = {
    sliderContainer: $('.js-home-slider'),
    init: function (){
        var _this = this;

        if(_this.sliderContainer.length){
            _this.sliderAuto();

            _this.sliderInteraction();
        }
    },
    sliderAuto: function (){
        var _this = this;

        var pause = parseInt(_this.sliderContainer.data("pause")) * 1000;

        if(pause > 0){
            setTimeout(function (){
                _this.sliderInit(null, pause);
            }, pause);
        }
    },
    sliderInteraction: function (){
        var _this = this;

        var sliderNav = $('.js-slider-init-action');
        sliderNav.on("click", function (){
            _this.sliderInit($(this).data("index"), false);
            _this.sliderContainer.trigger('stop.owl.autoplay');
        });

        if(is_touch_device()){
            _this.sliderContainer.swipe( {
                allowPageScroll:"auto",
                threshold: 20,
                swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
                    if(direction == 'left'){
                        _this.sliderInit("next", false);
                    }
                    else if(direction == 'right') {
                        _this.sliderInit("prev", false);
                    }
                    if(_this.sliderContainer.hasClass("owl-loaded")){
                        _this.sliderContainer.trigger('stop.owl.autoplay');
                    }
                }
            });
        }
    },
    sliderInit: function (goToSlid, pause){
        var _this = this;

        if(_this.sliderContainer.hasClass("owl-loaded")){
            return false;
        }

        var auto = (pause) ? true : false,
            navWrap = _this.sliderContainer.closest(".js-slider-outer").find('.js-nav-slider'),
            dotsWrap = _this.sliderContainer.closest(".js-slider-outer").find('.js-dots-slider');

        var params = {
            loop: true,
            margin: 0,
            nav: true,
            lazyLoad: true,
            autoHeight: true,
            navContainer: navWrap,
            dotsContainer: dotsWrap,
            items:1,
            mouseDrag: false,
            navText: ['', ''],
            onInitialize: function (){
                navWrap.html("");
                dotsWrap.html("");
            },
            onLoadedLazy: function (data){
                if (_this.sliderContainer.data('type') == "product"){
                    data.element.retina();
                }
            }
        };

        if(auto){
            params["autoplay"] = true;
            params["autoplayTimeout"] = pause;
            params["autoplayHoverPause"] = true;
        }

        _this.sliderContainer.owlCarousel(params);

        $('.js-home-slider .owl-prev, .js-home-slider .owl-next, .js-home-slider owl-dot').on('click', function(e) {
            _this.sliderContainer.trigger('stop.owl.autoplay');
        });


        if(goToSlid){
            if(goToSlid == "prev") {
                _this.sliderContainer.trigger("prev.owl.carousel");
            }else if(goToSlid == "next"){
                _this.sliderContainer.trigger("next.owl.carousel");
            }else{
                _this.sliderContainer.trigger("to.owl.carousel", [parseInt(goToSlid)]);
            }
        }
    }
};

var photoGallery = {
    init: function (){
        var _this = this;

        var slider = $('.js-sidebar-photos').bxSlider({
            nextText: '',
            prevText: '',
            pager: false,
            responsive: true,
            auto: true,
            pause: 6500,
            autoHover: true,
            speed: 400,
            useCSS: false,
            /*auto: true,
            mode: 'fade', // for fade out
            captions: true*/
            onSliderLoad: function(currentIndex){
                $(".js-sidebar-photos .bx-next, .js-sidebar-photos .bx-prev, .js-sidebar-photos .bx-pager-item").click(function(){
                    slider.stopAuto();
                });
            }
        });
    }
};

var modalForm = {
    init: function (){
        var _this = this;

        _this.loadContentForm('a.js-form-login-popupp');
        _this.loadContentForm('.js-ajax-form a[href="/login/"]');
        _this.loadContentForm('.js-ajax-form a[href="/forgotpassword/"]');
        _this.submitForm();
    },
    loadContentForm : function (selectorBtnElement){
        var _this = this;
        var selectorContent = '.js-ajax-form';

        $('body').on("click", selectorBtnElement, function (event){
            event.preventDefault();
            var url = $(this).attr('href')+"?ajax=1";

            $.magnificPopup.close();
            $('body').prepend("<div class='js-loading-bg mfp-bg mfp-ready'><div class='mfp-preloader'></div></div>");

            $.get(url, function(data) {
                $('.js-loading-bg').remove();

                var content = $(data).find(selectorContent);
                _this.openModal(content, url);
            });
        });
    },
    openModal: function (content, url){
        var _this = this;

        $(content).find('form').attr("action", url);
        $(content).find('input[type="checkbox"], input[type="radio"], .js-select').styler();


        $.magnificPopup.open({
            items: {
                src: "<div class='modal-content'>"+content.outerHTML()+"</div>"
            },
            type: 'inline'
        }, 0);

    },

    submitForm: function(){
        var _this = this;

        $('body').on("submit", '.js-ajax-form form', function(event){
            var wrapForm = $(this).closest('.js-ajax-form');

            if (!wrapForm.find('.wa-login-form-wrapper').length && !wrapForm.find('.wa-forgotpassword-form-wrapper').length) {
                event.preventDefault();

                var url = $(this).attr("action"),
                    data = $(this).serialize(),
                    btn = $(this).find('input[type="submit"]');

                btn.hide();
                btn.after($('<i class="icon16 loading js-loading"></i>'));

                $.post(url, data, function(data){
                    var content = $(data).find('.js-ajax-form');
                    if(content.length > 0){
                        _this.openModal(content, url);
                        btn.show();
                        $(this).find(".js-loading").remove();
                    }else{
                        window.location.reload();
                    }
                });
            }
        });
    }

};

var dropDownWrap = {
    init: function (){
        var _this = this;

        var selectorButton = '.js-btnDrop-down',
            selectorWrap = '.js-dd-wrap',
            selectorOuter = '.js-dd-outer';

        $(document).click(function(event) {
            if((!$(event.target).closest(selectorWrap).length && !$(event.target).closest(selectorOuter).length) || $(event.target).hasClass('js-bg')) {
                $(selectorWrap).each(function (){
                    $(this).removeClass('show');
                });
            }
        });

        $(selectorButton).on("click", function (){
            var $this = $(this),
                wrap = $('#' + $(this).data("id"));

            if(wrap.is(':visible')){
                 wrap.removeClass('show');
            }else{
                $(selectorWrap).each(function (){
                    $(this).removeClass('show');
                });
                _this.open($this, wrap);
            }
        });
    },
    open: function (btn, wrap){
        if(wrap.is(':visible')){
            wrap.animate({ opacity: 0 }, 200,  function() {
                wrap.removeClass('show');
            } );

            btn.removeClass('active');
        }else{
            wrap.css("padding-top", "20px");
            wrap.css("opacity", "0");
            wrap.addClass('show');
            wrap.animate({ paddingTop: "0" , opacity: 1}, 200);

            btn.addClass('active');
        }
    }
};

var categoriesMainMenu = {
    init: function (){
        var _this = this;

        _this.dropDownDisclosed();
        _this.dropDown();
        _this.mobileShowSubmenu();
        _this.showBg();
        _this.headerCategoriesImages();
    },
    dropDownDisclosed: function (){
        var _this = this;

        var item = $(".js-cat-subs-disclosed"),
            headerCategoriesMenu = $('#nav-cat'),
            isHoverDelay = headerCategoriesMenu.data("delay"),
            isLazyImages = headerCategoriesMenu.data("lazy"),
            isRetinaImages = headerCategoriesMenu.data("retina");

        item.hover(function(){
            var $this = $(this),
                submenu = $this.find('.js-subcategory-menu').first(),
                isSubmenuAbsolute = submenu.css("position") == 'absolute',
                isCategoriesPositionAbsolute = headerCategoriesMenu.css("position") == 'absolute',
                catMenuWrap = $this.closest('.js-category-menu-wrap');

            if(isLazyImages){
                categoriesImages.lazyImages(submenu.find('.js-submenu-category-image'), isRetinaImages);
            }else if(isRetinaImages){
                categoriesImages.retinaImages(submenu.find('.js-submenu-category-image'));
            }
            if(isSubmenuAbsolute){
                if(submenu.length > 0){
                    if(isHoverDelay){
                        submenu.stop(true).delay(150).fadeIn(1, function (){
                            var submenuWidth = submenu.outerWidth(true);
                            if(!item.hasClass("pos-rel")){
                                catMenuWrap.css("padding-right", submenuWidth + "px");
                                if(isCategoriesPositionAbsolute){
                                    _this.calcHeight(catMenuWrap, submenu);
                                }
                            }
                        });
                    }else{
                        submenu.show();
                        var submenuWidth = submenu.outerWidth(true);
                        if(!item.hasClass("pos-rel")){
                            catMenuWrap.css("padding-right", submenuWidth + "px");
                            if(isCategoriesPositionAbsolute){
                                _this.calcHeight(catMenuWrap, submenu);
                            }
                        }
                    }
                }
            }
        }, function(){
            var $this = $(this),
                submenu = $this.find('.js-subcategory-menu').first(),
                isSubmenuAbsolute = submenu.css("position") == 'absolute',
                catMenuWrap = $this.closest('.js-category-menu-wrap');

            if(isSubmenuAbsolute){
                if(isHoverDelay){
                    submenu.stop(true).delay(150).fadeOut(1, function (){
                        catMenuWrap.removeAttr('style');
                    });
                }else{
                    submenu.hide();
                    catMenuWrap.removeAttr('style');
                }

            }
        });
    },
    dropDown: function (){
        var _this = this;

        var item = $(".js-cat-subs-dropdown"),
            isHoverDelay = $('#nav-cat').data("delay");

        item.hover(function(){
            var $this = $(this),
                submenu = $this.find('.js-subcategory-menu').first(),
                isSubmenuAbsolute = submenu.css("position") == 'absolute',
                isCategoriesPositionAbsolute = $('#nav-cat').css("position") == 'absolute',
                catMenuWrap = $this.closest('.js-category-menu-wrap'),
                catMenuMarginRight = 0;

            if(isSubmenuAbsolute){
                if(submenu.length){
                    catMenuMarginRight += 258;
                    if(isHoverDelay){
                        submenu.stop(true).delay(150).fadeIn(1);
                    }else{
                        submenu.show();
                    }
                }
                if(!item.hasClass("pos-rel")) {
                    catMenuWrap.css('margin-right', catMenuMarginRight + 'px');
                    if(isCategoriesPositionAbsolute){
                        _this.calcHeight(catMenuWrap, submenu);
                    }
                }
            }
        }, function(){
            var $this = $(this),
                submenu = $this.find('.js-subcategory-menu'),
                isSubmenuAbsolute = submenu.css("position") == 'absolute',
                catMenuWrap = $this.closest('.js-category-menu-wrap');

            if(isSubmenuAbsolute){
                if(isHoverDelay){
                    submenu.stop(true).delay(150).fadeOut(1, function(){
                        catMenuWrap.removeAttr('style');
                    });
                }else{
                    submenu.hide();
                    catMenuWrap.removeAttr('style');
                }
            }
        });

        var itemSub = $('.js-subcatmenu-el');
        itemSub.hover(function(){
            var $this = $(this),
                submenu = $this.find('.js-subcategory-menu').first(),
                isSubmenuAbsolute = submenu.css("position") == 'absolute',
                isCategoriesPositionAbsolute = $('#nav-cat').css("position") == 'absolute',
                catMenuWrap = $this.closest('.js-category-menu-wrap'),
                catMenuMarginRight = 518;

            if(isSubmenuAbsolute){
                if(isHoverDelay){
                    submenu.stop(true).delay(150).fadeIn(1, function (){
                        if (!itemSub.hasClass("pos-rel")){
                            catMenuWrap.css('margin-right', catMenuMarginRight + 'px');
                            if(isCategoriesPositionAbsolute){
                                _this.calcHeight(catMenuWrap, submenu);
                            }
                        }
                    });
                }else{
                    submenu.show();
                    if (!itemSub.hasClass("pos-rel")){
                        catMenuWrap.css('margin-right', catMenuMarginRight + 'px');
                        if(isCategoriesPositionAbsolute){
                            _this.calcHeight(catMenuWrap, submenu);
                        }
                    }
                }
            }
        }, function(){
            var $this = $(this),
                submenu = $this.find('.js-subcategory-menu').first(),
                isSubmenuAbsolute = submenu.css("position") == 'absolute',
                catMenuWrap = $this.closest('.js-category-menu-wrap'),
                catMenuMarginRight = 258,
                parent = $this.closest('.js-cat-subs-dropdown');


            if(isSubmenuAbsolute){
                if(isHoverDelay){
                    submenu.stop(true).delay(150).fadeOut(1, function (){
                        if (!itemSub.hasClass("pos-rel")) {
                            catMenuWrap.css('margin-right', catMenuMarginRight + 'px');
                        }
                    });
                }else{
                    submenu.hide();
                    if (!itemSub.hasClass("pos-rel")) {
                        catMenuWrap.css('margin-right', catMenuMarginRight + 'px');
                    }
                }
            }
        });
    },
    calcHeight: function (wrap, submenuWrap){
        var submenuWrapHeight = submenuWrap.outerHeight(true),
            wrapHeight = wrap.outerHeight(true);

        if(submenuWrapHeight > wrapHeight){
            wrap.css("height", submenuWrapHeight + 'px');
        }
    },
    mobileShowSubmenu: function (){
        var caret = $('.js-cat-item-caret');

        caret.on("click", function(){
            var $this =  $(this),
                parent = $this.closest('.js-cat-subs-disclosed, .js-cat-subs-dropdown, .js-subcatmenu-el'),
                submenu = $(parent.find('.js-subcategory-menu').first()),
                isSubmenuStatic = (submenu.css('position') != 'absolute');

            if(isSubmenuStatic){
                if(!submenu.is(':visible')){
                    submenu.show();
                    $this.addClass('open');
                }else{
                    submenu.hide();
                    $this.removeClass('open');
                }
            }
        });
    },
    showBg: function() {
        var menuWrap = $('#nav-cat.desktop-show'),
            bg = $('#nav-cat.desktop-show ~ .js-bg');
            isHoverDelay = $('#nav-cat').data("delay");

        if(isHoverDelay){
            menuWrap.hover(function () {
                bg.stop(true).delay(150).fadeIn(1);
            }, function () {
                bg.stop(true).delay(100).fadeOut(1);
            });
        }else{
            menuWrap.hover(function () {
                bg.show();
            }, function () {
                bg.hide();
            });
        }
    },
    headerCategoriesImages: function (){
        var headerCategoriesMenu = $('#nav-cat'),
            isLazyImages = headerCategoriesMenu.data("lazy"),
            isRetinaImages = headerCategoriesMenu.data("retina");

        if(isLazyImages){
            categoriesImages.lazyImages(headerCategoriesMenu.find('.js-category-menu-image'), isRetinaImages);
        }else if(isRetinaImages){
            categoriesImages.retinaImages(headerCategoriesMenu.find('.js-category-menu-image'));
        }
    }
};

var mobileMenu = {
    init: function (){
        var _this = this;

        _this.hideShow();
        _this.showSubmenu();
    },
    hideShow: function(){
        var _this = this,
            btnMenuOpen = $(".js-nav-button");

        btnMenuOpen.on("click", function(){
            var $this = $(this),
                menu = $('#'+$this.data('id'));

            if(menu.hasClass('show')){
                menu.removeClass('show');
                $this.removeClass('show');
            }else{
                menu.addClass('show');
                $this.addClass('show');
            }
        });
    },
    showSubmenu: function (){
        var _this = this,
            btn = $('.js-top-nav-caret');

        btn.on("click", function(){
            var item = $(this).closest('.juniq-header-top-nav-el');

            if(item.hasClass('open')){
                item.removeClass('open');
                $(this).removeClass('open');
            }else{
                item.addClass('open');
                $(this).addClass('open');
            }
        });
    }
};

var mobileSearch = {
    init: function (){
        var btn = $('.js-show-Nav-search'),
            form = $('.js-Nav-search');

        btn.on("click", function (){
            if(form.is(":visible")){
                form.removeClass('show');
                $(this).removeClass('active');
            }else{
                form.addClass('show');
                $(this).addClass('active');
            }
        });
    }
};

var fixedPanel = {
    init: function (){
        var _this = this;

        var content = $("#main-content"),
            fixedPanel = $('.js-fixed-panel');

        if(content.length && fixedPanel.length){

            _this.fixPanel(content, fixedPanel);

            $(window).scroll(function() {
                _this.fixPanel(content, fixedPanel);
            });

            $(window).resize(function() {
                _this.fixPanel(content, fixedPanel);
            });
        }
    },
    fixPanel: function (content, fixedPanel){
        var t = $(document).scrollTop();
        var contentTopX = content.offset().top;
        var viewp = viewport();

        if (t >= contentTopX || viewp.width <= 1000) {
            if(!fixedPanel.is(":visible")){
                fixedPanel.css("padding", "3px 0");
                fixedPanel.css("bottom", "-50px");
                fixedPanel.addClass("show");
                fixedPanel.animate({bottom: "0"}, 200);
                fixedPanel.animate({"padding": "0"}, 300);
            }
        } else {
            fixedPanel.removeClass("show");
        }
    }
};

var subscribeForm = {
    init: function (){
        // MAILER app email subscribe form
        $('#mailer-subscribe-form input.charset').val(document.charset || document.characterSet);
        $('#mailer-subscribe-form').submit(function() {
            var form = $(this);

            var email_input = form.find('input[name="username"]'); // => input[name="email"] after check on valid email//
            var email_submit = form.find('.js-btn-form');
            var email_agree = form.find('input[name="agree"]');
            var loader = form.find('.js-subscribe-load');
            var error = false;

            email_input.removeClass('error');
            email_agree.closest('.js-subscribe-agree').removeClass('error');

            if(email_agree.length > 0 && !email_agree.is(':checked')){
                email_agree.closest('.js-subscribe-agree').addClass('error');
                error = true;
            }
            if(!email_input.val()){
                email_input.addClass('error');
                error = true;
            }else{
                if(!validateEmail(email_input.val())){
                    email_input.addClass('error');
                    error = true;
                }else{
                    email_input.attr('name', 'email');
                }
            }
            if(error === false){
                email_submit.hide();
                loader.show();
                $('#mailer-subscribe-error').hide();

                $.post(form.attr("action"), form.serialize(), function (response) {
                    email_input.attr('name', 'username');
                    if(response.status == "ok"){
                        $('.js-subscribe-inputs').hide();
                        if(response.data.html){
                            $('#mailer-subscribe-thankyou').html(response.data.html);
                        }
                        $('#mailer-subscribe-thankyou').show();
                        $('#mailer-subscribe-error').hide();
                    }else{
                        $('#mailer-subscribe-error').show();
                    }
                    email_submit.show();
                    loader.hide();
                });
            }else{
                email_input.attr('name', 'username');
            }


            return false;
        })
    }
};

var versionSite = {
    init: function (){
        var _this = this;

        _this.switchVersion();
        _this.removeLink();
    },
    switchVersion: function (){
        $('.js-switch-version-link').on("click", function (event){
            event.preventDefault();

            if($.cookie("is_desktop_for_mobile")){
                $.cookie("is_desktop_for_mobile", "", {path: '/', expires: 5});
            }else{
                $.cookie("is_desktop_for_mobile", 1, {path: '/', expires: 5});
            }
            location.reload();
        })
    },
    removeLink: function (){
        $('.js-switch-version-remove').on("click", function (event){
            event.preventDefault();

            $.cookie("is_hide_link_version_site", 1, {path: '/', expires: 1});
            $('.js-switch-version').remove();
        })
    }
};

var openMap = {
    init: function (){
        var _this = this;

        $('.js-open-map').magnificPopup({
            disableOn: 700,
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: false,
            fixedContentPos: false
        });
    }
};

var tags = {
    init: function (){
        var _this = this;

        _this.showAll();
    },
    showAll: function (){
        var _this = this,
            btn = $('.js-open-tags');

        btn.on("click", function (){
            var $this = $(this),
                tags = $this.closest('.js-tags').find('.js-tag');

            if($this.hasClass('open')){
                $this.removeClass('open');
                tags.addClass("hide");
            }else{
                $this.addClass('open');
                tags.removeClass("hide");
            }
        });
    }
};

var skCallback = {
    init: function (){
        var _this = this;

        _this.openModal();
        _this.onTriggerClose();
    },
    openModal: function () {
        var _this = this,
            buttons = $('.js-sk-callback-open'),
            block = $('.js-sk-callback-block');

        if (buttons.size() && block.size()) {
            buttons.magnificPopup({
                items: [
                    {
                        src: '.js-sk-callback-block',
                        type: 'inline'
                    }
                ],
                midClick: true,
                callbacks: {
                    open: function () {
                        _this.closeCustomModals();
                        block.trigger("event-open");
                    },
                    close: function () {
                        block.trigger("event-close");
                    }
                }
            });
        }
    },
    closeCustomModals: function(){
        $(".js-popup").hide();
        $("body").removeClass("_popup-open");
    },
    onTriggerClose: function () {
        var _this = this,
            block = $('.js-sk-callback-block');

        $(block).on("run-close", function () {
            $(this).find(".mfp-close").click();
        });
    }
};

var pagePopup = {
    init: function (){
        var _this = this;

        _this.loadContent();
    },
    loadContent: function (){
        var _this = this;

        $('body').on("click", '.js-page-popup', function (event){
            event.preventDefault();

            var $this = $(this),
                href = $this.attr('href');

            if(!href){
                href = $this.data('href');
            }

            $.magnificPopup.close();
            $('body').prepend("<div class='js-loading-bg mfp-bg mfp-ready'><div class='mfp-preloader'></div></div>");

            $.get(href + "?popup=1", function(data) {
                $('.js-loading-bg').remove();
                var content = false;
                if($(data)) {
                    if ($(data).attr("id") == 'page-popup') {
                        content = $(data);
                    } else if ($(data).find('#page-popup').length) {
                        content = $(data).find('#page-popup');
                    }
                    if(content){
                        _this.openModal(content);
                    }else{
                        location.href = href;
                    }
                }
            });
        });
    },
    openModal: function (content){
        $.magnificPopup.open({
            items: {
                src: "<div class='modal-content modal-content--page'>"+content.outerHTML()+"</div>"
            },
            type: 'inline'
        }, 0);

    },
};

if (!window.SkOneclick) {

    SkOneclick = (function ($) {

        'use strict';

        var SkOneclick = function (params) {

            this.init(params);


        };

        SkOneclick.prototype = {

            _config: {
                buttons: '.js-sk-oneclick-open',
                cart: '.js-sk-oneclick-open-cart',
                popup: '.js-sk-oneclick-popup',
                block: '.js-sk-oneclick-block',
                content: '.js-sk-oneclick-content',
                close: '.js-sk-oneclick-close',
                preload: '.js-sk-oneclick-preload'
            },

            init: function (params) {
                var that = this;

                that.params = $.extend({}, that._config, params);

                that.initElements();

                if (!that.elements.block.size()) {
                    return false;
                }

                that.initButtons();


                that.initCart();

                that.onClose();

                that.onTriggerClose();

                that.onEventLoading();

            },

            initElements: function () {
                var that = this,
                    elements = {};

                elements.popup = $(that.params.popup);
                elements.block = elements.popup.find(that.params.block);
                elements.content = elements.popup.find(that.params.content);
                elements.close = elements.popup.find(that.params.close);
                elements.preload = elements.block.find(that.params.preload);

                that.elements = elements;
            },

            initButtons: function () {
                var that = this,
                    elements = that.elements;

                $("body").on("click", that.params.buttons, function(){
                    var button = $(this),
                        type = button.data("type");

                    if(typeof type == "undefined" && type != "product" && type != "cart"){
                        return true;
                    }

                    elements.preload.show();
                    elements.popup.show();
                    $("body").addClass("_popup-open");

                    var params = {
                        form: button.closest("form"),
                        type: "product"
                    };

                    if(!params.form.size()){
                        console.log("Форма не найдена");
                        return false;
                    }

                    elements.block.trigger("event-open", params);

                });

            },

            initCart: function(){
                var that = this,
                    elements = that.elements;

                $("body").on("click", that.params.cart, function(){
                    var button = $(this),
                        type = button.data("type");

                    if(typeof type == "undefined" && type != "product" && type != "cart"){
                        return true;
                    }

                    elements.preload.show();
                    elements.popup.show();
                    $("body").addClass("_popup-open");

                    var params = {
                        form: button.closest("form"),
                        type: "cart"
                    };

                    if(!params.form.size()){
                        console.log("Форма не найдена");
                        return false;
                    }

                    elements.block.trigger("event-open", params);

                });
            },

            onClose: function(){
                var that = this,
                    elements = that.elements;

                elements.close.on("click", function(){
                    elements.block.trigger("event-close");
                    that.closePopup()
                });
            },

            onTriggerClose: function () {
                var that = this,
                    block = that.elements.block;

                block.on("run-close", function () {
                    that.closePopup()
                });
            },

            closePopup: function(){
                var that = this,
                    elements = that.elements;

                elements.popup.hide();
                elements.preload.show();
                elements.content.html("");
                $("body").removeClass("_popup-open");

            },

            onEventLoading: function(){
                var that = this;

                that.elements.block.on("event-load", function(object, params){
                    that.elements.preload.hide();
                });
            }

        };

        return SkOneclick;

    })(jQuery);

}

var cart = {
    init: function (){
        var _this = this;

        _this.addToCart();
        _this.cartDialog();
        _this.selectQuantity();
        _this.countQty();
    },
    cartDialog: function(){
        var _this = this;

        $('body').on( "click", ".js-card-dialog", function (){
            $.magnificPopup.open({
                items: {
                    src: $(this).data('href')
                },
                type: 'ajax',
                callbacks: {
                    parseAjax: function(mfpResponse) {
                        if (typeof mfpResponse.data === 'string' || mfpResponse.data instanceof String){
                            var outer = "<div>" + mfpResponse.data + "</div>";
                            mfpResponse.data = $(outer).find(".js-modal-content");
                        }else{
                            mfpResponse.data = $(mfpResponse.data);
                        }
                    },
                    ajaxContentAdded: function() {
                        var productCard = this.content.find('#product-cart');
                        if(productCard.length && productCard.data('id')){
                            productListCustom.viewed(productCard.data('id'));
                        }

                        if(!is_touch_device()){
                            productGallery.productImageZoom(this.content.find(".js-product_gallery-images-main"));
                        }
                        productGallery.swipeLargePhoto(this.content.find('.js-product_gallery-images-main'));
                        productGallery.previewsBxSlider = productGallery.previewsCarouselInit(this.content.find('.js-previews-gallery'));
                    },
                    open: function() {
                        $.magnificPopup.instance._onFocusIn = function(e) {
                            if( $(e.target).closest( '#storequickorder' ) ) {
                                return true;
                            }
                            $.magnificPopup.proto._onFocusIn.call(this,e);
                        };
                    }
                }
            }, 0);
        });
    },
    addToCart: function (){
        var _this = this;

        $('body').on('submit', '.js-add-to-cart', function(event){
            event.preventDefault();

            var $this = $(this),
                url = $this.attr('action'),
                data = $this.serialize(),
                previewCartCount = $('.js-cart-preview-count'),
                previewCartTotal = $('.js-cart-price-total-price'),
                cartDialog = $('#cart-form-dialog'),
                btn = $this.find(".js-btn-form");



            btn.addClass("cart-loading");
            $.post(url + '?html=1', data, function (response) {
                btn.removeClass("cart-loading");

                if(response.status == 'ok'){
                    previewCartCount.html(response.data.count);
                    previewCartTotal.html(response.data.total);

                    productListCustom.showAddedMsg($('.juniq-header-preview-cart'));
                    if(cartDialog.length > 0){
                        $.magnificPopup.close();
                    }

                    if($this.data('after-action') == 'popup'){
                        _this.popupAddCart($this);
                    }else if($this.data('after-action') == 'fixed'){
                        fixedCart.show();
                    }else if($this.data('after-action') == 'move'){
                        _this.animationMoveToCart($this);
                    }
                }else{
                    messages.notifyDanger(response.errors);
                }
            }, 'json');
        });
    },
    animationMoveToCart: function (form){
        var productBlock = form.closest('.js-product').find('.js-preview-cart');
        if(productBlock.length == 0){
            productBlock = form.closest('.js-preview-cart');
        }
        var position = productBlock.data('position');
        var productBlockCopy = $('<div></div>').append(productBlock.html());
        var cart_preview = $('.js-fixed .juniq-header-preview-cart');
        if(!cart_preview.length || !cart_preview.is(':visible')){
            cart_preview = $('.js-cart-header');
        }
        productBlockCopy.css({
            'z-index': 100,
            top: productBlock.offset().top,
            left: productBlock.offset().left,
            width: productBlock.width()+'px',
            height: productBlock.height()+'px',
            position: (position) ? position :'absolute',
            overflow: 'hidden',
            background: "#FFF"
        }).insertAfter('body').animate({
            top: cart_preview.offset().top,
            left: cart_preview.offset().left,
            width: 0,
            height: 0,
            opacity: 0.7
        }, 650, function() {
            productBlockCopy.remove();

            productListCustom.showAddedMsg($('.juniq-header-preview-cart'));
        });
    },
    popupAddCart: function (form){
        var popup = $('#popup-addcart'),
            productName = form.data("name"),
            price = form.data("price"),
            image = form.data("image"),
            quantity = 1,
            quantityFileld = form.find("input[name='quantity']");



        if(quantityFileld.length){
            quantity = quantityFileld.val()
        }

        popup.find(".js-popup-addcart-name").html(productName);
        popup.find(".js-popup-addcart-price").html(price);
        popup.find(".js-popup-addcart-count").html("(x" + quantity + ")");
        if(image){
            popup.find(".js-popup-addcart-image").html( "<img src='" + image + "' />");
        }else{
            popup.find(".js-popup-addcart-image").html("");
        }

        $.magnificPopup.open({
            items: {
                src: popup,
                type: 'inline'
            },
            callbacks: {
                afterClose: function (){
                    popup.find(".js-popup-addcart-name").html("");
                    popup.find(".js-popup-addcart-price").html("");
                    popup.find(".js-popup-addcart-count").html("");
                    popup.find(".js-popup-addcart-image").html("");
                }
            }

        });
        $('.js-close-popup-addcart').on("click", function (){
            $.magnificPopup.close();
        });
    },
    selectQuantity: function (){
        var _this = this;

        $('body').on("click", '.js-pr-count-action', function(){
            var $this = $(this),
                action = $this.data('action'),
                wrap = $this.closest('.js-pr-count'),
                inputQuantity = wrap.find('input'),
                quantity = inputQuantity.val();

            if(action == 'add'){
                inputQuantity.val(parseInt(quantity) + 1);
            }else{
                if(quantity > 1){
                    inputQuantity.val(parseInt(quantity) - 1);
                }
            }
            inputQuantity.change();
        });
    },
    countQty: function (){
        $('body').on("click", ".js-qty-button", function(){
            var $this = $(this),
                wrapOut = $this.closest('.js-qty'),
                action = $this.data('type'),
                input = wrapOut.find('input'),
                currentQty = parseInt(input.val());

            if(action == "-"){
                if(currentQty > 1 ){
                    currentQty--;
                }else{
                    currentQty = 1;
                }
            }else{
                if(currentQty){
                    currentQty++;
                }else{
                    currentQty = 1;
                }
            }

            input.val(currentQty);
            input.change();
        });
    }

};

var messages = {

    notifySuccess: function(text, offset){
        if(!text) text = 'Sent!';
        $.notify({
            message: text,
            icon: 'fa fa-check'
        },{
            delay: 5000,
            type: 'success',
            placement: {
                align: "right",
                from: 'bottom'
            }
        });
    },
    notifyRemoveElement: function(text){
        if(!text) text = 'Deleted!';
        $.notify({
            message: text
        },{
            delay: 5000,
            placement: {
                align: "right",
                from: 'bottom'
            }
        });
    },
    notifyDanger: function(text){
        if(!text) text = 'An error has occurred!';
        $.notify({
            message: text,
            icon: 'fa fa-exclamation-circle'
        },{
            delay: 5000,
            type: 'danger',
            placement: {
                align: "right",
                from: 'bottom'
            }
        });
    }

};

var specialProducts = {
    init: function (){
        var _this = this;

        $('.js-special-list').bxSlider({
            slideWidth: 244,
            minSlides: 1,
            maxSlides: 5,
            slideMargin: 15,
            moveSlides: 1,
            pager: false,
            nextText: '',
            prevText: '',
            infiniteLoop: false,
            hideControlOnEnd: true

        });
    }
};

var productTile = {
    init: function (){
        var product = $('.no-touch .js-Product-grid'), timeOut;

        product.hover(function(){
            var $this = $(this),
                prevProduct = $this.prev(),
                btnActions = $this.find('.js-button'),
                dialog = $this.find('.js-dialog');

            btnActions.css({marginTop: "15px", opacity: 0});

            if(prevProduct.length && $this.offset().top == prevProduct.offset().top){
                prevProduct.addClass('next-hover');
            }

            $this.addClass('hover');
            btnActions.first().show();
            btnActions.first().animate({ marginTop: "0", opacity: 1}, 300 );
            timeOut = setTimeout(function(){
                btnActions.last().show();
                btnActions.last().animate({ marginTop: "0", opacity: 1}, 150 );
            }, 150);

            dialog.fadeIn();

            var img = $this.find('.js-product-preview-img');
            img.animate({maxHeight: "100%", maxWidth: "100%"}, 150);

        }, function (){
            var $this = $(this),
                prevProduct = $this.prev(),
                btnActions = $this.find('.js-button'),
                dialog = $this.find('.js-dialog');

            clearTimeout(timeOut);
            prevProduct.removeClass('next-hover');
            $this.removeClass('hover');
            btnActions.first().stop();
            btnActions.last().stop();
            btnActions.hide();
            dialog.hide();

            var img = $this.find('.js-product-preview-img');
            img.stop();
            img.removeAttr("style");

        });
    }
};

var productListCustom = {
    init: function() {
        var _this = this;

        _this.compare();
        _this.favorites();
        _this.clear();
        _this.viewed();
    },
    viewed: function($productId){
        var _this = this;

        if($('#product-cart').length && $('#product-cart').data('id')){
            _this.add('viewed_product_list', $('#product-cart').data('id'), 20);
        }
    },
    compare: function(){
        var _this = this;

        _this.list(
            'shop_compare',
            $(".js-preview-compare"),
            '.js-compare-add',
            compareProductSidebar.list
        );
    },
    favorites: function(){
        var _this = this;

        _this.list(
            'product_favor_arr',
            $(".js-favorites-preview"),
            '.js-favorites-add'
        );
    },
    list: function (listName, listPreviewWrap, elAddToListBtn, callbackFunction){
        var _this = this;

        $("body").on('click', elAddToListBtn, function (event) {
            event.preventDefault();
            var $this = $(this),
                countInList = 0,
                isAdded = true,
                countPreviewView = listPreviewWrap.find('.js-products-count'),
                linPreviewView = listPreviewWrap.find('.js-products-link'),
                productId = $(this).data('product');

            if (!$this.hasClass('active')) {
                countInList = _this.add(listName, productId);
            } else {
                countInList = _this.remove(listName, productId);
                isAdded = false;
            }
            var url = (countInList > 0) ? linPreviewView.attr('href').replace(/compare\/.*$/, 'compare/' + _this.get(listName) + '/') : '/compare/';

            linPreviewView.attr('href', url);
            countPreviewView.html(countInList);

            if(isAdded){
                _this.showAddedMsg(listPreviewWrap);
            }

            $(elAddToListBtn + "[data-product='"+productId+"']").toggleClass('active');

            if(callbackFunction){
                callbackFunction({that: $this, url: url, productId: productId, isAdded: isAdded});
            }
        });
    },
    add: function(listName, productId, limit){
        var _this = this, list = $.cookie(listName), listArr = [];

        if (list && list != "null" && list != "0" ) {
            list = list.replace(",null", "");
            list = list.replace(",0", "");
            var listArr = list.split(',');

            var i = $.inArray(productId + '', listArr);
            if (i != -1) {
                listArr.splice(i, 1);
            }
        }
        listArr.unshift(productId);

        if(limit){
            listArr.splice(limit);
        }

        _this.save(listArr, listName);

        return listArr.length;
    },
    remove: function(listName, productId){
        var _this = this, list = $.cookie(listName);

        if (list) {
            list = list.split(',');
        } else {
            list = [];
        }
        var i = $.inArray(productId + '', list);
        if (i != -1) {
            list.splice(i, 1);
        }

        _this.save(list, listName);

        return list.length;
    },
    get: function(listName){
        return $.cookie(listName);
    },
    save: function(list, listName){
        if (list.length > 0) {
            for(var i = 0; i < list.length; i ++){
                if (!parseInt(list[i])){
                    list.splice(i, 1);
                }
            }
        }
        if (list.length > 0) {
            $.cookie(listName, list.join(','), { expires: 30, path: '/'});
        } else {
            $.cookie(listName, null, {path: '/'});
        }
    },
    clear: function (){
        var _this = this, btn = $('.js-clear-pr-list');

        btn.on("click", function (){
            var $this = $(this),
                list = [],
                listName = $this.data("list") + "_list";

            _this.save(list, listName);
            location.reload();

        });
    },
    showAddedMsg: function(listPreviewWrap){
        listPreviewWrap.addClass('active');
        setTimeout(function(){
            listPreviewWrap.removeClass('active');
        }, 3000);
    }
};

var compareProductSidebar = {
    list: function(params){
        var $this = params.that,
            url = params.url,
            productId = params.productId,
            isAdded = params.isAdded,
            productsFullWrap = $('.js-compare-products-full'),
            productsEmptyWrap = $('.js-compare-products-empty'),
            productsList = $('.js-compare-products-list'),
            template = $('.js-compare-template');

        $('.js-sidebar-compare-link').attr("href", url);

        if(!isAdded){
            var product = $('.js-compare-product[data-product="'+productId+'"]');
            product.remove();
        }else{
            if(productsList.length && $this.data('name') && template){
                var addedProduct = template.clone();
                addedProduct.removeClass('js-compare-template').addClass('js-compare-product');
                addedProduct.attr("data-product", productId);
                addedProduct.find('.js-compare-add').attr("data-product", productId).addClass('active');
                addedProduct.find('.js-compare-name').text($this.data('name'));
                addedProduct.find('.js-compare-name').attr("href", $this.data('url'));
                addedProduct.find('.js-compare-img').attr("href", $this.data('url'));
                if($this.data('img')){
                    addedProduct.find('.js-compare-img').html("<img src='"+$this.data('img')+"'>");
                }
                template.after(addedProduct);
                addedProduct.show();
            }
        }

        if($('.js-compare-product').length){
            productsEmptyWrap.hide();
            productsFullWrap.show();
        }else{
            productsEmptyWrap.show();
            productsFullWrap.hide();
        }
    }
};

var productsHome = {
    init: function (){
        var _this = this;

        var productsList = $(".js-home-products");

        if(productsList.length){
            productsList.each(function(){
                _this.carousel($(this));
            });
        }
    },
    carousel: function (productsList){
        var _this = this;

        productsList.removeClass("active");
        productsList.parent().find('.js-home-products-more').remove();
        productsList.after('<span class="home-products-more js-home-products-more"></span>');

        var products = productsList.find('.js-Product-grid');
        products.removeClass('hide');
        if(products.length){
            var firstProduct = products.first(),
                firstProductOffsetTop = firstProduct.offset().top,
                countLine = productsList.data("count-line") ? parseInt(productsList.data("count-line")) : 1,
                indexLine = 0,
                prevProductOffsetTop = 0,
                countInLine = 0;

            products.each(function(){
                var currentProduct = $(this),
                    currentProductOffsetTop = currentProduct.offset().top;

                if(currentProductOffsetTop != prevProductOffsetTop){
                    indexLine++;
                }

                if (indexLine == 1){
                    countInLine++;
                }

                if(firstProductOffsetTop < currentProductOffsetTop && indexLine <= countLine){
                    firstProductOffsetTop = currentProductOffsetTop;
                }

                if(firstProductOffsetTop < currentProductOffsetTop && countInLine > 2){
                    currentProduct.addClass("hide");
                    productsList.addClass("active");
                }
                prevProductOffsetTop = currentProductOffsetTop;
            });
            _this.showElements(productsList, countInLine);
        }
    },
    showElements: function (productsList, countInLine){
        var btnShowMore = productsList.parent().find('.js-home-products-more');

        btnShowMore.on("click", function(){
            var products = productsList.find('.js-Product-grid');
            var productsHide = productsList.find('.js-Product-grid.hide');

            var index = 0;
            productsHide.each(function(){
                var currentProduct = $(this);

                if (index < countInLine){
                    currentProduct.removeClass("hide");
                    currentProduct.find(".js-product-preview-img").removeAttr("height").removeAttr("width");
                }

                index++;
            });

            var currentProductsHide = productsList.find('.js-Product-grid.hide');
            if(currentProductsHide.length){
                productsList.addClass("active");
            }else{
                productsList.removeClass("active");
            }

            if (typeof $.autobadgeFrontend !== 'undefined') {
                $.autobadgeFrontend.reinit();
            }
        });
    }
};

var productsCarousel = {
    carouselProductsWrap: $('.js-owl-carousel-product'),
    init: function (){
        var _this = this;

        if(!_this.carouselProductsWrap.length){
            return false;
        }

        _this.prepareProductListCarousels();
        _this.carouselInteraction();

        $(window).one('resize', _this.carouselsInit);
    },
    carouselsInit: function (){
        var _this = this;

        productsCarousel.carouselProductsWrap.each(function (){
            var $this = $(this);

            productsCarousel.carousel($this);
        });
    },
    prepareProductListCarousels: function (){
        var _this = this;

        _this.carouselProductsWrap.each(function (){
            var carousel = $(this).find('.owl-carousel'),
                carouselWidth = carousel.outerWidth(),
                itemCarousel = $(this).find(".js-Product-grid"),
                countItems = itemCarousel.length,
                widthItem = itemCarousel.first().outerWidth(true),
                widthAllItems = widthItem * countItems,
                isButtons = widthAllItems > carouselWidth;

            if(isButtons){
                var wrapButtons = $(this).find(".js-carousel-direction");

                wrapButtons.append('<div data-index="prev" class="js-slider-init-action owl-prev disabled"></div>');
                wrapButtons.append('<div data-index="next" class="js-slider-init-action owl-next"></div>');
            }

            var carouselOffsetRight = carousel.offset().left + carousel.outerWidth();
            itemCarousel.slice(0,5).each(function (){
                var itemOffsetLeft = $(this).offset().left;

                if (itemOffsetLeft < carouselOffsetRight) {
                    $(this).find(".owl-lazy").Lazy({
                        afterLoad: function(element) {
                            element.removeClass("owl-lazy");
                            if ($.Retina) {
                                element.retina();
                            }
                        },
                    });
                }
            });
        });
    },
    carouselInteraction: function (){
        var _this = this,
            productCarouselNav = $('.js-slider-init-action');

        productCarouselNav.on("click", function (){
            var carousel = $(this).closest('.js-owl-carousel-product');

            _this.carousel(carousel, $(this).data("index"));
        });

        if(is_touch_device()){
            $('.js-owl-carousel-product .owl-carousel').each(function (){
                var $productList = $(this);

                $productList.swipe( {
                    allowPageScroll:"auto",
                    threshold: 20,
                    swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
                        var $productListCarousel = $(this).closest(".js-owl-carousel-product");

                        if(direction == 'left'){
                            _this.carousel($productListCarousel, "next");
                        }
                        else if(direction == 'right') {
                            _this.carousel($productListCarousel, "prev");
                        }
                    }
                });
            });
        }
    },
    carousel: function (productsList, goToSlide){
        if(productsList.hasClass("carousel-init")){
            return false;
        }
        var productList = productsList.find('.owl-carousel'),
            navigation = productsList.find('.js-carousel-direction'),
            isMouseSwipe = productsList.data("swipe"),
            isMobilePreviewMini = productList.data("type-mobile-preview"),
            is2Cols = productList.closest(".cols-2").length,
            is3Cols = productList.closest(".cols-3").length,
            responsive = {};

        if(is3Cols){
            if(isMobilePreviewMini){
                responsive = { 0: { items: 2 }, 700: { items: 3 } };
            }else{
                responsive = { 0: { items: 1 }, 400: { items: 2 }, 700: { items: 3 }};
            }
        }else if(is2Cols){
            if(isMobilePreviewMini){
                responsive = { 0: { items: 2 }, 700: { items: 3 } , 1250: { items: 4 } };
            }else{
                responsive = { 0: { items: 1 }, 400: { items: 2 }, 700: { items: 3 }, 1250: { items: 4 } };
            }
        }else{
            if(isMobilePreviewMini){
                responsive = { 0: { items: 2 }, 700: { items: 3 }, 1000: { items: 4 }, 1250: { items: 5 } };
            }else{
                responsive = { 0: { items: 1 }, 400: { items: 2 }, 700: { items: 3 }, 1000: { items: 4 }, 1250: { items: 5 } };
            }
        }

        productList.owlCarousel({
            loop: false,
            margin: 0,
            nav: true,
            dots: false,
            mouseDrag: isMouseSwipe,
            navText: ['',''],
            navElement: "div",
            navContainer: navigation,
            responsive: responsive,
            lazyLoad: true,
            onInitialize: function (event){
                productsList.find(".js-slider-init-action").remove();
            },
            onInitialized: function (event){
                productsList.addClass("carousel-init");
            },
            onDragged: function(event){
                if (typeof $.autobadgeFrontend !== 'undefined') {
                    $.autobadgeFrontend.reinit();
                }
            },
            onTranslated: function(event){
                if (typeof $.autobadgeFrontend !== 'undefined') {
                    $.autobadgeFrontend.reinit();
                }
            },
            onLoadedLazy: function(event){
                var wrap = $(event.currentTarget);
                if (wrap.length && $.Retina) {
                    wrap.find(".owl-item.active .js-product-preview-img").retina();
                }
            },
        });

        if(goToSlide){
            if(goToSlide == "prev") {
                productList.trigger("prev.owl.carousel");
            }else if(goToSlide == "next"){
                productList.trigger("next.owl.carousel");
            }
        }
    }
};

var videoPopup = {
    init: function(){
        $("body").on("click", '.js-video-popup', function(e){
            e.preventDefault();
            var href = $(this).data("href");

            if(href){
                $.magnificPopup.open({
                    items: {
                        src: href
                    },
                    type: 'iframe',
                    mainClass: 'mfp-fade',
                    removalDelay: 160,
                    preloader: false,
                    fixedContentPos: false,
                    iframe: {
                        patterns: {
                            youtube_short: {
                                index: 'youtu.be/',
                                id: 'youtu.be/',
                                src: '//www.youtube.com/embed/%id%?autoplay=1'
                            }
                        }
                    }
                }, 0);
            }
        });
    },
};

/*
 * Информационное сообщение
 */
var infoMessage = {
    init: function (container) {
        var _this = this;

        if(!container.length){
            return false;
        }

        if(_this.checkOpen(container)){
            _this.runOpen(container);
            _this.onClose(container);
        }
    },
    checkOpen: function(container){
        var _this = this,
            id = container.data('id');

        if(!$.cookie("info_massage_close_" + id)){
            return true;
        }

        return false;
    },
    runOpen: function(container){
        var _this = this;

        container.show();
    },
    onClose: function(container){
        var _this = this,
            id = container.data('id'),
            close = container.find('.js-info-message-close');

        close.on("click", function(){
            container.detach();
            $.cookie("info_massage_close_" + id, 1, {path: '/', expires: 365});
        });
    }
};

var lazyImages = {
    init: function () {
        var _this = this;

        $('.js-image-lazy').lazy({bind: "event"});
    }
};

var productsPreviewList = {
    init: function () {
        var _this = this,
            productList = $('.js-preview-products');

        productList.each(function(){
            _this.images($(this));
        });
    },
    images: function (productList){
        var _this = this,
            isRetina = productList.data('retina'),
            isLazy = productList.data('image-lazy'),
            productImage = productList.find(".js-product-preview-img:not(.owl-lazy)");

        if(isLazy){
            productImage.lazy({
                afterLoad: function(element) {
                    if(isRetina){
                        element.retina();
                    }
                    new productTileGallery();
                },
            });
        }else if(isRetina){
            productImage.retina();
        }
    },
};

/*
 * Виджет акция в popup
 */
var popupAdvert = {
    init: function (container){
        var _this = this;

        if(!container.length){
            return false;
        }

        if(_this.isNotTabu() || _this.checkOpen(container)){
            _this.runLogic(container);
        }
    },
    checkOpen: function(container){
        var _this = this,
            id = container.data('id');

        if(!$.cookie("popup_advert_close_" + id)){
            return true;
        }

        return false;
    },
    isNotTabu: function(){
        var _this = this,
            is_tabu = $.cookie("popup_advert_tabu");

        if(typeof is_tabu === "undefined" && !is_tabu){
            return true;
        }

        return false
    },
    runLogic: function(container){
        var _this = this,
            time = parseInt(container.data("time")),
            tabu = parseInt(container.data("tabu")),
            id = container.data('id');

        if(!time){
            time = 10;
        }
        if(!tabu){
            tabu = 10;
        }
        setTimeout(function(){
            $.magnificPopup.open({
                items: {
                    src: container,
                    type: 'inline'
                },
                callbacks: {
                    open: function() {
                        $.cookie("popup_advert_tabu", 1, {path: '/', expires: tabu});
                        $.cookie("widget_popup_advert_close_" + id, 1, {path: '/', expires: 365});
                    }
                }
            });

        }, time * 1000);
    }
};

/*
 * Виджет социальные группы
 */
if (!window.SocialWidgets) {

    var SocialWidgets = (function ($) {

        'use strict';

        /**
         * Конструктор виджета "Социальные группы"
         *
         * @constructor SocialWidgets
         *
         * @param {Object} params параметры
         */
        var SocialWidgets = function (params) {
            this.init(params);
        };

        SocialWidgets.prototype = {
            _params: {
                container: ".js-social-widgets",
                timeAutoSwitch: 5000,
                autoSwitch: false
            },

            /**
             * Получение параметров
             *
             * @method getParams
             * @return {Array} Объект с настройками
             */
            getParams: function () {
                return this._params;
            },

            /**
             * Получение параметра
             *
             * @method getParam
             * @return {String} Объект с настройками
             */
            getParam: function (name) {
                return this._params[name];
            },
            /**
             * Установка параметра
             *
             * @method setParam
             *
             * @param {String} name Наименование параметров
             * @param {String} value Значение параметрра
             *
             * @return {String} Объект с настройками
             */
            setParam: function (name, value) {
                this._params[name] = value;
            },
            /**
             * Инициализируем плагин
             *
             * @method init
             *
             * @param {Object} params
             */
            init: function (params) {
                var that = this;

                that.autoTimer = null;

                that._params = $.extend({}, that._params, params);
                that._params.preload = "switch";

                that.initElements();

                if(typeof vivaSocialWidgetsData === "undefined") return false;

                that.data = vivaSocialWidgetsData;
                that.dataInst = vivaSocialWidgetsInst;

                if(!that.elements.container.size()) return false;

                that.active = Object.keys(that.elements.contentsArray)[0];
                that.autoSwitch = that.elements.container.data("auto");

                if(parseInt(that.elements.container.data("time"))){
                    that._params.timeAutoSwitch = parseInt(that.elements.container.data("time"));
                }
                if(that.elements.container.data("preload")){
                    that._params.preload = that.elements.container.data("preload");
                }
                that.initTabs();

                setTimeout(function(){
                    that.initAuto();
                }, 3000)
            },

            /**
             * Инициализируем элементы
             *
             * @method initElements
             *
             */
            initElements:  function () {
                var that = this,
                    elements = {};

                that.elements = elements;

                elements.container = $(that._params.container);
                if(!elements.container.size()) return false;

                elements.tabs = elements.container.find(".js-social-widgets-tab");
                elements.tabsArray = {};
                elements.tabs.each(function(){
                    elements.tabsArray[$(this).attr("data-tab")] = $(this);
                });
                elements.contents = elements.container.find(".js-social-widgets-content");
                elements.contentsArray = {};
                elements.contents.each(function(){
                    elements.contentsArray[$(this).attr("data-content")] = $(this);
                });
                that.elements = elements;
            },
            /**
             * Инициализируем табы переключения
             *
             * @method initTabs
             *
             */
            initTabs:  function () {

                var that = this,
                    elements = that.elements,
                    $container = elements.container;

                $container.hover(
                    function() {
                        that.pauseAuto();
                    }, function() {
                        that.initAuto();
                    }
                );
                for(var key in that.data){
                    if(typeof elements.contentsArray[key] === "undefined"){
                        continue;
                    }
                    if(key == "instagram"){
                        that.runInstagram();
                    }else{
                        elements.contentsArray[key].html(that.data[key]);
                    }
                    if(that._params.preload == "switch") break;
                }
                $container.find("[data-tab]").on("click", function(){
                    var $tab = $(this),
                        socialCurrent = elements.tabs.filter("._active").attr("data-tab"),
                        socialNew = $tab.attr("data-tab");

                    if(socialCurrent != socialNew){
                        that.stopAuto();
                        that.switch(socialNew);
                    }
                });
            },
            /**
             * Переключение соц.сети
             *
             * @method switch
             *
             * @param {String} social
             *
             */
            switch: function(social){
                var that = this,
                    elements = that.elements,
                    $tab = elements.tabsArray[social],
                    $content = elements.contentsArray[social];

                that.active = social;
                elements.tabs.removeClass("_active");
                $tab.addClass("_active");
                elements.contents.removeClass("_show");

                if(!$content.html()){
                    if(social == "instagram"){
                        that.runInstagram();
                    }else {
                        $content.append(that.data[social]);
                    }
                }
                $content.addClass("_show");
            },
            /**
             * Инициализируем автоматическое переключение
             *
             * @method initAuto
             *
             */
            initAuto: function(){
                var that = this,
                    elements = that.elements,
                    timeAuto = that.getParam("timeAutoSwitch");

                if(!that.autoSwitch) return false;

                that.autoTimer = setInterval(function(){
                    var activeSocial = that.active,
                        $nextElement = elements.tabsArray[activeSocial].next(".js-social-widgets-tab");

                    if(!$nextElement.size())
                        $nextElement = elements.tabs.first();

                    var socialNext = $nextElement.attr("data-tab");
                    that.active = socialNext;
                    that.switch(socialNext)
                }, timeAuto);

            },
            /**
             * Инициализируем паузу автоматического переключения
             *
             * @method pauseAuto
             *
             */
            pauseAuto: function(){
                var that = this;

                clearInterval(that.autoTimer);
            },
            /**
             * Инициализируем остановку автоматического переключения
             *
             * @method pauseAuto
             *
             */
            stopAuto: function(){
                var that = this;

                clearInterval(that.autoTimer);
                that.autoSwitch = false;
            },

            /**
             * Запуск виджета инстаграм
             *
             * @method runInstagram
             *
             */
            runInstagram: function() {
                var that = this,
                    id = "#social-widgets-content-instagram";

                $(id).html("<div id='list-instagram' class='list-instagram'></div>");

                if (typeof Instafeed !== "undefined" && that.dataInst){
                    var feed = new Instafeed({
                        get: 'user',
                        userId: that.dataInst.userId,
                        target: 'list-instagram',
                        clientId: that.dataInst.clientId,
                        accessToken: that.dataInst.accessToken,
                        limit: that.dataInst.limit,
                        template: '<div class="list-instagram__item"><a class="list-instagram__link" href="{{link}}" target="_blank"><img class="list-instagram__img" src="{{image}}" alt="{{caption}}" /></a></div>'
                    });
                    feed.run();
                }
            }
        };
        return SocialWidgets;
    })(jQuery);
}

/*
 * Плиточная галерея
 */
if (!window.productTileGallery) {

    productTileGallery = (function ($) {

        var productTileGallery = function (params) {
            this.init(params);
        };

        productTileGallery.prototype = {
            _config: {
                images: {},
                heightFixed: true
            },
            init: function (params) {
                var that = this;
                if($("body").hasClass("touch")){
                    return false;
                }
                that.params = $.extend({}, that._config, params);
                that.runGallery();
            },
            runGallery: function() {
                var that = this;
                var elements = $('.js-grid-gallery');
                elements.each(function (){
                    var element = $(this),
                        block = element.find(".js-grid-block-gallery"),
                        image = element.find(".js-product-preview-img"),
                        length = element.find('.js-grid-gallery-item').length;

                    if(!image.data("src")){
                        image.attr("data-src", image.attr("src"))
                    }

                    var src_default = image.data("src");

                    if(!element.size() || !block.size() || !image.size() || length < 2 || element.hasClass("_tile-active")){
                        return true;
                    }

                    element.addClass("_tile-active");

                    block.removeAttr("style");
                    if(that.params.heightFixed){
                        block.on("mouseenter",function(){
                            block.css("height", block.height() + "px");
                            block.css("line-height", block.height() + "px");
                        });
                    }

                    element.find(".js-grid-gallery-item").on("mouseenter", function(){
                        var src = $(this).data("img");
                        $('<img>').attr('src', src).load(function () {
                            image.attr("src", src);
                            image.retina();
                        });
                    });

                    block.on("mouseleave",function(){
                        image.attr("src", src_default);
                        image.retina();
                    });
                });
            }
        };
        return productTileGallery;
    })(jQuery);
}

var categoriesImages = {
    init: function (){
        var _this = this;

        _this.categoriesList();
    },
    categoriesList: function() {
        var _this = this,
            categories = $('.js-list-categories');

        categories.each(function (){
            var $this = $(this),
                isRetina = $this.data('retina'),
                isLazy = $this.data('lazy'),
                images = $this.find('.js-cat-item-image');

            if(isLazy){
                _this.lazyImages(images, isRetina);
            }else if(isRetina){
                _this.retinaImages(images);
            }
        });
    },
    lazyImages: function (images, isRetina){
        var _this = this;

        images.lazy({
            onFinishedAll: function(element) {
                if(isRetina){
                    _this.retinaImages(images);
                }
            },
        });
    },
    retinaImages: function (images){
        images.each(function(){
            var $this = $(this),
                imgUrl = $this.attr('src');

            if(imgUrl.indexOf("?") >= 0){
                var fileExtensionWithGet = imgUrl.substring(imgUrl.lastIndexOf('.') + 1),
                    imgUrl2x = imgUrl.replace("." + fileExtensionWithGet, "@2x." + fileExtensionWithGet);

                $this.attr("data-atretina", imgUrl2x);
            }
        }).promise().done(function(){
            images.retina();
        });
    }
};

var customGalleryPopup = {
    init: function (){
        var _this = this,
            galleryImage = $('.js-custom-gallery');

        galleryImage.on("click", function(e){
            e.preventDefault();
            var images = [],
                current = $(this),
                currentGroup = $(this).data('group'),
                position = 0,
                galleryImages = [];

            if(currentGroup){
                galleryImages = $('.js-custom-gallery[data-group="'+currentGroup+'"]');
            }

            if(galleryImages.length > 1){
                galleryImages.each(function (index) {
                    var href = $(this).attr('href'),
                        title = $(this).attr('title');

                    if (href){
                        if(current.attr('href') == href){
                            position = index;
                        }
                        images.push({href: href, title: title});
                    }
                });
                _this.openGallery(images, position);
            }else{
                var href = current.attr('href'),
                    title = current.attr('title');

                if(href){
                    images.push({href: href, title: title});
                    _this.openGallery(images);
                }
            }
        });
    },
    openGallery: function (images, position){
        $.swipebox(images, {
            useSVG : false,
            hideBarsDelay: false,
            initialIndexOnArray: position,
            afterOpen: function() {
                $('#swipebox-overlay').addClass('opacity-black');
                $('#swipebox-bottom-bar').addClass("swipebox-bottom-bar--pos-center");
                $('#swipebox-arrows').addClass("swipebox-arrows--pos-center");

                $(document).on("scroll", closeSwipe);
                function closeSwipe() {
                    var $closeButton = $("#swipebox-close");
                    if ($closeButton.length) {
                        $closeButton.trigger("click");
                    }
                    $(document).off("scroll", closeSwipe);
                }
            }
        });
    }
};

var contentPopup = {
    init: function (){
        var _this = this;

        _this.loadPage();
        _this.loadInline();
    },
    loadPage: function (){
        var _this = this;

        $('body').on("click", '.js-page-popup', function (event){
            event.preventDefault();

            var $this = $(this),
                href = $this.attr('href');

            if(!href){
                href = $this.data('href');
            }

            $.magnificPopup.close();
            $('body').prepend("<div class='js-loading-bg mfp-bg mfp-ready'><div class='mfp-preloader'></div></div>");

            $.get(href + "?popup=1", function(data) {
                $('.js-loading-bg').remove();
                var content = false,
                    data = $("<div>").append(data);

                if($(data)) {
                    if ($(data).find('#page-popup').length) {
                        content = $(data).find('#page-popup');
                    }
                    if(content){
                        _this.openModal(content, 'page');
                    }else{
                        location.href = href;
                    }
                }
            });
        });
    },
    loadInline: function (){
        var _this = this;

        $('body').on("click", '.js-content-popup', function (event){
            event.preventDefault();

            var id = $(this).data("href");

            if(id){
                var content = $("#" + id).clone();
                if(content.length){
                    content.removeClass("-Close");
                    _this.openModal(content, "custom");
                }
            }
        });
    },
    openModal: function (content, type){
        var addClass = null
        if(type){
            addClass = " modal-content--" + type;
        }
        $.magnificPopup.open({
            items: {
                src: "<div class='modal-content" + addClass + "'>" + content.outerHTML() + "</div>"
            },
            type: 'inline'
        }, 0);

    },
};

var fixedCart = {
    init: function (){
        var _this = this;

        _this.close();
    },
    show: function (){
        var wrapFixedCart = $('.js-fixed-cart-outer');

        if(wrapFixedCart.length){
            var cartUrl = wrapFixedCart.data("cart-url") + "?fixed=1";

            wrapFixedCart.html("");
            $.get(cartUrl, function(html) {
                var cartContent = $("<div>"+html+"</div>");

                if(cartContent.find('.js-fixed-cart').length){
                    wrapFixedCart.html(html);
                }
            });
        }
    },
    close: function(){
        $('body').on("click", '.js-cart-fixed-close', function (){
            var wrapFixedCart = $('.js-fixed-cart-outer');

            wrapFixedCart.html("");
        });
    }
};

var displayFontAwesome = {
    init: function (){
        var isHiddenIcons = $('body').hasClass('icondesc-hidden');

        if(isHiddenIcons){
            if ($.isFunction(window.fontSpy)) {
                fontSpy("FontAwesome", {
                    glyphs: '\ue81a\ue82d\ue823',
                    success: function() {
                        $('body').removeClass("icondesc-hidden");
                    },
                    failure: function() {
                        $('body').removeClass("icondesc-hidden");
                    }
                });
            }else{
                setTimeout(function (){
                    $('body').removeClass("icondesc-hidden");
                }, 3000);
            }
        }
    }
};

var demoSettings = {
    init: function (){
        var _this = this;

        if(!$('#test-settings').length){
            return false;
        }

        $('#open-test-settings').on("click", function(event){
            event.preventDefault();

            $.magnificPopup.open({
                items: {
                    src: '#test-settings'
                },
                type: 'inline'
            });
        });

        $('#open-test-settings').one("click", function(event){
            event.preventDefault();

            _this.settings();
        });
    },
    settings: function (){
        var settings = [
            "color_scheme",
            "base_color",
            "bg_color_navogation",
            "second_color",
            "homepage_type_slider_mode",
            "homepage_product_view",
            "body_bg",
            "font"
        ];

        $('.js-color-select').on("click", function (){
            $("#"+$(this).data('id')).val("#ffffff");
        });

        $('#settings-form').submit(function(event){
            event.preventDefault();

            var $this = $(this),
                settingsForm = $this.serializeArray();

            saveSettings(settingsForm);
        });

        $('.js-select-setting-color').on("click", function (){
            var $this = $(this),
                value = $this.data("value"),
                input = $('.js-setting-color');

            input.val(value);
            $('.js-select-setting-color').removeClass("selected");
            $this.addClass("selected");
        });

        $('.js-clear-test-settings').on("click", function (){
            clearTestSettings(settings);
        });

        function clearTestSettings(){
            settings.forEach(function(name){
                $.removeCookie(name, { path: '/' });
            });
            window.location.reload();
        }

        function saveSettings(values){
            settings.forEach(function(name){
                var setting = values.find(function (item){
                    return item.name == name;
                });

                if(setting.value == "#ffffff"){
                    setting.value = null;
                }

                if(setting){
                    var date = new Date(), minutes = 30;
                    date.setTime(date.getTime() + (minutes * 60 * 1000));
                    $.cookie(name, setting.value, { expires: date, path: '/' });
                }
                window.location.reload();
            });
        }
    }
};

var productGallery = {
    previewsBxSlider: null,
    init: function (){
        var _this = this,
            $ = jQuery;

        productGallery.previewsBxSlider = _this.previewsCarouselInit($('.js-previews-gallery'));
        productGallery.swipeLargePhoto($('.js-product_gallery-images-main'));
        productGallery.popupPhotoswipe();
        productGallery.popupSwipebox();

        $("body").on("click", ".js-id-preview-gallery a", function (event) {
            event.preventDefault();

            productGallery.changeLargeImage($(this), false);
        });

        if(!is_touch_device()){
            _this.productImageZoom($('.js-product_gallery-images-main'));
        }
    },
    previewsCarouselInit: function (images){
        if(images.length){
            images.bxSlider({
                mode: 'vertical',
                slideWidth: 60,
                minSlides: images.data('min-items'),
                slideMargin: 6,
                pager: false,
                nextText: '',
                prevText: '',
                infiniteLoop: false,
                hideControlOnEnd: true,
                oneToOneTouch: false,
                touchEnabled: false
            });

            return images;
        }else{
            return false;
        }
    },
    mainCarouselInit: function (mainGallery, goToSlide){
        var _this = this,
            position = 0;

        if(mainGallery.length && !mainGallery.hasClass('owl-loaded')){
            var currentPreview = mainGallery.closest('.js-product').find('.js-id-preview-gallery.selected');
            if(currentPreview.length){
                if(currentPreview.data("position") != "0"){
                    position = parseInt(currentPreview.data("position"));
                }
            }
            mainGallery.owlCarousel({
                loop: false,
                nav: false,
                margin: 0,
                items: 1,
                lazyLoad: true,
                autoHeight: false,
                dots: false,
                startPosition: position,
                mouseDrag: false,
                onLoadedLazy: function(event){
                    var gallery = $(event.currentTarget);
                    if (gallery.length && $.Retina) {
                        gallery.find(".owl-item.active .owl-lazy").retina();
                    }
                },
                onInitialized: function(){
                    if(!is_touch_device()){
                        _this.productImageZoom(mainGallery);
                    }
                    _this.displayImageTitle(mainGallery);
                },
                onChanged: function (event){
                    var gallery = $(event.currentTarget),
                        currentItemIndex = event.item.index,
                        currentItem = gallery.find('.js-product_gallery-images-main-el[data-position="'+currentItemIndex+'"]'),
                        currentItemId = currentItem.data("id"),
                        is_video = (currentItem.data("id") == "video");

                    if(is_video && !currentItem.find('iframe').length){
                        var videoUrl = currentItem.data("video-url"),
                            videoWidth = currentItem.data("video-width"),
                            videoHeight = currentItem.data("video-height");

                        currentItem.html('<iframe src="'+videoUrl+'" width="'+videoWidth+'" height="'+videoHeight+'" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>');
                    }

                    if(currentItemId){
                        var previews = gallery.closest('.js-product').find('.js-id-preview-gallery');

                        previews.removeClass("selected");
                        var currentPreview = previews.filter("[data-id='" + currentItemId + "']");
                        currentPreview.addClass("selected");
                    }
                },
                onDragged: function(event){
                    var gallery = $(event.currentTarget);

                    if(gallery.length){
                        var previews = gallery.closest('.js-product').find('.js-id-preview-gallery'),
                            previousPreview = previews.filter('.selected'),
                            image_id = $(gallery).find(".owl-item.active .js-product_gallery-images-main-el").data("id");


                        if(image_id){
                            previews.removeClass("selected");

                            var currentPreview = previews.filter("[data-id='" + image_id + "']");
                            currentPreview.addClass("selected");


                            if(currentPreview.attr("aria-hidden") == "true" && _this.previewsBxSlider.length){
                                if(parseInt(previousPreview.data('position')) > parseInt(currentPreview.data('position'))){
                                    _this.previewsBxSlider.goToPrevSlide();
                                }else if(parseInt(previousPreview.data('position')) < parseInt(currentPreview.data('position'))){
                                    _this.previewsBxSlider.goToNextSlide();
                                }
                            }
                            productGallery.displayImageTitle(gallery);

                        }
                    }
                }
            });

            if(goToSlide){
                if(goToSlide == "prev") {
                    mainGallery.trigger("next.owl.carousel");
                }else if(goToSlide == "next"){
                    mainGallery.trigger("prev.owl.carousel");
                }
            }
        }
    },
    swipeLargePhoto: function (mainGallery){
        if(is_touch_device()){
            mainGallery.swipe( {
                allowPageScroll:"auto",
                threshold: 20,
                swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
                    var mainGallery = $(event.target).closest('.js-product').find('.js-product_gallery-images-main');

                    if(direction == 'left'){
                        productGallery.mainCarouselInit(mainGallery, "prev");
                    }else if(direction == 'right') {
                        productGallery.mainCarouselInit(mainGallery, "next");
                    }
                }
            });
        }
    },
    changeLargeImage: function (previewImage, isPreviewsCarouselGoTo){
        var _this = this,
            preview =  previewImage.parent(),
            image_id = preview.data("id"),
            mainGallery = previewImage.closest('.js-product').find('.js-product_gallery-images-main'),
            mainGalleryItems = mainGallery.find('.js-product_gallery-images-main-el');

        if(!mainGallery.hasClass('owl-loaded')){
            _this.mainCarouselInit(mainGallery);
        }

        if(isPreviewsCarouselGoTo == undefined){
            isPreviewsCarouselGoTo = true
        }

        preview.addClass('selected').siblings().removeClass('selected');

        if(image_id){
            var position = mainGalleryItems.filter("[data-id='" + image_id + "']").data("position");
            if(typeof position !== "undefined"){

                mainGallery.trigger("to.owl.carousel", [position, 300]);
                productGallery.displayImageTitle(mainGallery);
            }
        }
    },
    displayImageTitle: function (gallery){
        var titleWrap = gallery.closest('.js-product').find('.js-product_gallery-images-title'),
            currentImage = gallery.find(".owl-item.active");

        titleWrap.text("");
        if(titleWrap.length && currentImage.length){
            var title = currentImage.find('img').attr('alt');
            if(title){
                titleWrap.text(title);
            }
        }
    },
    productImageZoom: function (mainGallery){
        if(mainGallery.length && mainGallery.closest('.js-product_gallery-images').data("zoom")){
            var currentImage = mainGallery.find(".js-product_gallery-images-main-el");

            currentImage.each(function(){
                $(this).zoom({
                    url: $(this).attr('href'),
                    onZoomIn: function (){
                        $(this).parent().addClass("zooming");
                    },
                    onZoomOut: function (){
                        $(this).parent().removeClass("zooming");
                    }
                });
            });
        }
    },
    popupSwipebox: function (){
        $('body').on("click", ".js-image-popup-swipebox", function(e) {
            e.preventDefault();

            var productGalley = $(this).closest('.js-product').find(".js-product_gallery-images"),
                previews = $(this).closest('.js-product').find('.js-id-preview-gallery'),
                images = [],
                position = 0;

            if (previews.length) {
                previews.each(function (index) {
                    if($(this).hasClass('selected')){
                        position = index;
                    }
                    if($(this).data('video')){
                        images.push({href: $(this).find('a').attr('href'), icon: '<i class="fa fa-video-camera" aria-hidden="true"></i>'});
                    }else{
                        images.push({href: $(this).find('a').attr('href'), src: $(this).find('img').attr('src')});
                    }
                });
            } else {
                images.push({href: $(this).attr('href'), src: $(this).find('img').attr('src')});
            }

            var thumbs = productGalley.data("thumbs");
            var bgOpacity = productGalley.data("black-bg");
            var sTop = 0;

            $.swipebox(images, {
                useSVG : false,
                hideBarsDelay: false,
                thumbs: thumbs,
                initialIndexOnArray: position,
                beforeOpen: function (){
                    sTop = $(document).scrollTop();
                },
                afterClose: function (){
                    $('body').removeClass("hidden-fixed");
                    $(window).scrollTop(sTop);
                },
                afterOpen: function() {
                    $('body').addClass("hidden-fixed");

                    if (bgOpacity === true){
                        $('#swipebox-overlay').addClass('opacity-black');
                    }
                    if (thumbs === true && images.length > 1){
                        var imagesThumbsHtml = '', currentIndex = parseInt($('#swipebox-slider .slide.current').data("index"));
                        images.forEach(function(element, index){
                            var addClass = "swipebox-thumbs_el js-swipebox-thumbs-el";
                            if (currentIndex === index){
                                addClass += " active";
                            }
                            if(element.icon){
                                imagesThumbsHtml += '<a class="' + addClass + ' swipebox-thumbs_el--icon" data-index="'+index+'" href="'+ element.href +'">'+element.icon+'</a>';
                            }else{
                                imagesThumbsHtml += '<a class="' + addClass + '" data-index="'+index+'" href="'+ element.href +'"><img src="'+element.src+'" /></a>';
                            }
                        });

                        $('#swipebox-container').append('<div id="swipebox-thumbs" class="swipebox-thumbs">'+imagesThumbsHtml+'</div>');
                        $('#swipebox-slider').css("padding-bottom", (parseInt($('#swipebox-thumbs').outerHeight()) + 30) + 'px');
                    }

                    if ((thumbs === true && images.length) || bgOpacity){
                        $('#swipebox-bottom-bar').addClass("swipebox-bottom-bar--pos-center");
                        $('#swipebox-arrows').addClass("swipebox-arrows--pos-center");
                    }

                    var closeSwipe = function() {
                        var $closeButton = $("#swipebox-close");
                        if ($closeButton.length) {
                            $closeButton.trigger("click");
                        }
                        $(document).off("scroll", closeSwipe);
                    };

                    $('#swipebox-slider').on("click", closeSwipe);
                },

            });
            return false;
        });
    },
    popupPhotoswipe: function (){
        $('body').on("click", ".pswp button", function (event){
            event.preventDefault();
        });

        $('body').on("click", ".js-image-popup-photoswipe", function (e) {
            e.preventDefault();

            var mainGallery = $(this).closest('.js-product').find('.js-product_gallery-images'),
                previews = $(this).closest('.js-product').find('.js-id-preview-gallery'),
                mainPhoto = $(this).closest('.js-product').find('.js-product_gallery-images-main-el'),
                pswpElement = document.querySelectorAll('.pswp')[0],
                position = 0,
                items = [];

            if (previews.length){
                previews.each(function () {
                    var image = $(this);
                    if (image.hasClass('selected')) {
                        position = image.data('position');
                    }
                    if (image.data("video")) {
                        var iframeVideo = mainGallery.find('iframe');
                        if (iframeVideo.length) {
                            items.push({html: '<iframe src="' + iframeVideo.attr("src") + '" width="' + iframeVideo.attr("width") + '" height="' + iframeVideo.attr("height") + '"></iframe>'});
                        }
                    } else {
                        items.push({src: image.find('a').attr("href"), w: 0, h: 0});
                    }
                });
            }else if(mainPhoto.length){
                items.push({src: mainPhoto.attr("href"), w: 0, h: 0});
            }

            var options = {
                index: position,
                shareEl: false,
                history: false
            };

            var gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);

            gallery.listen('gettingData', function (index, item) {
                if (item.w < 1 || item.h < 1) { // unknown size
                    var img = new Image();
                    img.onload = function () {
                        item.w = this.width;
                        item.h = this.height;
                        gallery.updateSize(true);
                    };
                    img.src = item.src;
                }
            });
            gallery.init();
        });
    }
};

function Product(form, options) {
    this.form = $(form);
    this.add2cart = this.form.find(".js-add2cart");
    this.button = this.add2cart.find(".js-btn-form");
    this.skFastButton = this.form.find(".js-sk-oneclick-open");
    this.discount = this.form.closest('.js-product-page').find(".js-product-discount");
    this.savedWrap = this.form.closest('.js-product-page').find(".js-product-discounts");
    this.isSkuUrl = this.form.data("sku-url");
    for (var k in options) {
        this[k] = options[k];
    }
    var self = this;
    // add to cart block: services
    this.form.find(".services input[type=checkbox]").change(function () {
        var obj = $('select[name="service-option[' + $(this).val() + ']"]');
        if (obj.length) {
            if ($(this).is(':checked')) {
                obj.removeAttr('disabled');
            } else {
                obj.attr('disabled', 'disabled');
            }
        }
        self.cartButtonVisibility(true);
        self.updatePrice();
    });

    this.form.find(".services .service-option").on('change', function () {
        self.cartButtonVisibility(true);
        self.updatePrice();
    });

    this.form.find('.select-v-inline a').click(function () {
        var d = $(this).closest('.select-v-inline');
        d.find('a.selected').removeClass('selected');
        $(this).addClass('selected');
        d.find('select.js-feature-sku, input.js-feature-sku').val($(this).data('value')).change();
        return false;
    });

    this.form.find(".skus input[type=radio], .skus select").change(function () {
        if($(this).find('option').length){
            var sku = $(this).find('option:selected');
        }else{
            var sku = $(this);
        }

        if (sku.data('image-id')) {
            $("#product-image-" + sku.data('image-id')).click();
        }
        if (sku.data('disabled')) {
            self.button.addClass('disabled');
            self.skFastButton.addClass('disabled');
        } else {
            self.button.removeClass('disabled');
            self.skFastButton.removeClass('disabled');
        }

        var sku_id = sku.attr('value');
        self.updateSkuServices(sku_id);
        self.cartButtonVisibility(true);
        self.updatePrice();
        if (self.isSkuUrl){
            self.updateURLSku(sku_id);
        }
        self.updateFeaturesList(sku_id);
    });

    if($('.skus input[type=radio]').length){
        var $initial_cb = this.form.find(".skus input[type=radio]:checked:not(:disabled)");
        if (!$initial_cb.length) {
            $initial_cb = this.form.find(".skus input[type=radio]:not(:disabled):first").prop('checked', true).click();
        }
        $initial_cb.change();
    }else if($('.skus option').length){
        var $initial_cb = this.form.find(".skus option:selected:not(:disabled)");
        if (!$initial_cb.length) {
            $initial_cb = this.form.find(".skus option:not(:disabled):first").prop('selected', true).click();
        }
        $initial_cb.change();
    }

    if (typeof $initial_cb !== 'undefined' && $initial_cb.length && $initial_cb.data('image-id')) {
        productGallery.changeLargeImage($("#product-image-" + $initial_cb.data("image-id")));
    }

    this.form.find("select.js-feature-sku, input.js-feature-sku").change(function () {
        var key = "";
        self.form.find("select.js-feature-sku, input.js-feature-sku").each(function () {
            key += $(this).data('feature-id') + ':' + $(this).val() + ';';
        });
        var sku = self.features[key];

        if (sku) {

            if (sku.image_id) {
                productGallery.changeLargeImage($("#product-image-" + sku.image_id));
            }
            self.updateSkuServices(sku.id);
            if (sku.available) {
                self.button.removeClass('disabled');
                self.skFastButton.removeClass('disabled');
            } else {
                self.form.find("div.stocks div").hide();
                self.form.find(".sku-no-stock").show();
                self.button.addClass('disabled');
                self.skFastButton.addClass('disabled');
            }
            self.add2cart.find(".price").data('price', sku.price);
            self.updatePrice(sku.price, sku.compare_price);
            if (self.isSkuUrl){
                self.updateURLSku(sku.id);
            }
            self.updateFeaturesList(sku.id);
        } else {
            self.form.find("div.stocks div").hide();
            self.form.find(".sku-no-stock").show();
            self.button.addClass('disabled');
            self.skFastButton.addClass('disabled');
            self.add2cart.find(".js-compare-at-price").hide();
            self.add2cart.find(".price").empty();
        }
        self.cartButtonVisibility(true);

    });
    this.form.find("select.js-feature-sku:first, input.js-feature-sku:first").change();

    if (!this.form.find(".skus input:radio:checked").length) {
        this.form.find(".skus input:radio:enabled:first").attr('checked', 'checked');
    }

    if (!this.form.find(".skus option:selected").length) {
        this.form.find(".skus option:enabled:first").attr('selected', 'selected');
    }

    self.showAllSkus();
}
Product.prototype.getEscapedText = function( bad_string ) {
    return $("<div>").text( bad_string ).html();
};

Product.prototype.currencyFormat = function (number, no_html) {
    // Format a number with grouped thousands
    //
    // +   original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +	 bugfix by: Michael White (http://crestidg.com)

    var i, j, kw, kd, km;
    var decimals = this.currency.frac_digits;
    var dec_point = this.currency.decimal_point;
    var thousands_sep = this.currency.thousands_sep;

    // input sanitation & defaults
    if( isNaN(decimals = Math.abs(decimals)) ){
        decimals = 2;
    }
    if( dec_point == undefined ){
        dec_point = ",";
    }
    if( thousands_sep == undefined ){
        thousands_sep = ".";
    }

    i = parseInt(number = (+number || 0).toFixed(decimals)) + "";

    if( (j = i.length) > 3 ){
        j = j % 3;
    } else{
        j = 0;
    }

    km = (j ? i.substr(0, j) + thousands_sep : "");
    kw = i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands_sep);
    //kd = (decimals ? dec_point + Math.abs(number - i).toFixed(decimals).slice(2) : "");
    kd = (decimals && (number - i) ? dec_point + Math.abs(number - i).toFixed(decimals).replace(/-/, 0).slice(2) : "");


    var number = km + kw + kd;
    var s = no_html ? this.currency.sign : this.currency.sign_html;
    if (!this.currency.sign_position) {
        return s + this.currency.sign_delim + number;
    } else {
        return number + this.currency.sign_delim + s;
    }
};

Product.prototype.serviceVariantHtml= function (id, name, price) {
    return $('<option data-price="' + price + '" value="' + id + '"></option>').text(name + ' (+' + this.currencyFormat(price, 1) + ')');
};

Product.prototype.updateSkuServices = function (sku_id) {
    if(this.form.find(".js-pd-code").length > 0){
        this.form.find(".js-pd-code").hide();
        this.form.find(".sku-" + sku_id + "-pd-code").show();
    }

    this.form.find("div.stocks div").hide();
    this.form.find(".sku-" + sku_id + "-stock").show();
    for (var service_id in this.services[sku_id]) {
        var v = this.services[sku_id][service_id];
        if (v === false) {
            this.form.find(".service-" + service_id).hide().find('input,select').attr('disabled', 'disabled').removeAttr('checked').trigger('refresh');
            this.form.find(".service-" + service_id).find(".js-style-check, label").addClass("disabled");
        } else {
            this.form.find(".service-" + service_id).show().find('input').removeAttr('disabled').trigger('refresh');
            this.form.find(".service-" + service_id).find(".js-style-check, label").removeClass("disabled");
            if (typeof (v) == 'string' || typeof (v) == 'number') {
                this.form.find(".service-" + service_id + ' .service-price').html(this.currencyFormat(v));
                this.form.find(".service-" + service_id + ' input').data('price', v);
            } else {
                var select = this.form.find(".service-" + service_id + ' .service-option');
                var selected_variant_id = select.val();
                for (var variant_id in v) {
                    var obj = select.find('option[value=' + variant_id + ']');
                    if (v[variant_id] === false) {
                        obj.hide().addClass("disable");
                        if (obj.attr('value') == selected_variant_id) {
                            selected_variant_id = false;
                        }
                    } else {
                        if (!selected_variant_id) {
                            selected_variant_id = variant_id;
                        }
                        obj.replaceWith(this.serviceVariantHtml(variant_id, v[variant_id][0], v[variant_id][1]));
                    }
                }
                if(!selected_variant_id){
                    selected_variant_id = this.form.find(".service-" + service_id + ' .service-option').find("option:not(.disable):first").attr("value");
                }
                this.form.find(".service-" + service_id + ' .service-option').val(selected_variant_id);
            }
        }
    }
};

Product.prototype.updatePrice = function (price, compare_price) {
    if (price === undefined) {
        var input_checked = this.form.find(".skus input:radio:checked, .skus option:selected");
        if (input_checked.length) {
            var price = parseFloat(input_checked.data('price'));
            var compare_price = parseFloat(input_checked.data('compare-price'));
        } else {
            var price = parseFloat(this.add2cart.find(".price").data('price'));
        }
    }

    if (compare_price && price) {
        if (!this.add2cart.find(".js-compare-at-price").length) {
            this.add2cart.find(".price").after('<span class="js-compare-at-price product__old-price old-price nowrap"></span>');
        }
        this.add2cart.find(".js-compare-at-price").html(this.currencyFormat(compare_price)).show();
    } else {
        this.add2cart.find(".js-compare-at-price").html("");
    }
    var self = this;
    this.form.find(".services input:checked").each(function () {
        var s = $(this).val();
        if (self.form.find('.service-' + s + '  .service-option').length) {
            price += parseFloat(self.form.find('.service-' + s + '  .service-option :selected').data('price'));
        } else {
            price += parseFloat($(this).data('price'));
        }
    });

    var $priceWrap =  this.add2cart.find(".price");
    var priceFormat = this.currencyFormat(price);
    var textZeroPrice = $priceWrap.data("zero-text");
    if (price == 0 && textZeroPrice){
        $priceWrap.html('<span class="product_nul-price">' + textZeroPrice + '</span>');
    }else{
        $priceWrap.html(priceFormat);
    }
    self.updateDiscount(price,compare_price);
    self.updateSaved(price,compare_price);

    if(!self.button.hasClass('disabled')){
        if (price == 0 && self.button.data('zero-price-disabled')){
            self.button.addClass('disabled');
            self.skFastButton.addClass('disabled');
        }else{
            self.button.removeClass('disabled');
            self.skFastButton.removeClass('disabled');
        }
    }
}

Product.prototype.cartButtonVisibility = function (visible) {
    //toggles "Add to cart" / "%s is now in your shopping cart" visibility status
    if (visible) {
        this.add2cart.find('.js-compare-at-price').show();
        this.add2cart.find('input[type="submit"]').show();
        this.add2cart.find('.price').show();
        this.add2cart.find('.js-qty').show();
        this.add2cart.find('span.added2cart').hide();
    }
}

Product.prototype.showAllSkus = function () {
    $("body").on("click", ".js-product-skus-show", function (){
        var $this = $(this), outerWrap = $this.closest(".js-product-skus");

        outerWrap.find(".js-product-skus-item").toggleClass("hide");
        $this.find(".js-icon-minus").toggleClass("hide");
        $this.find(".js-icon-plus").toggleClass("hide");
    });
};

Product.prototype.updateDiscount = function (price, compare_price) {
    if (this.discount.length){
        var discount = 0,
            typeRound = this.discount.data('round'),
            minimal = parseInt(this.discount.data('minimal'));

        this.discount.addClass('-Close');
        if(compare_price > price && price > 0){
            discount = ((compare_price- price)/compare_price)*100;
            if (typeRound == "ceil"){
                discount = Math.ceil(discount);
            }else if (typeRound == "floor"){
                discount = Math.floor(discount);
            }else{
                discount = Math.round(discount);
            }
            if(discount >= minimal){
                this.discount.html('-' + discount + '%').removeClass('-Close');
            }
        }
    }
};

Product.prototype.updateSaved = function (price, compare_price) {
    if (this.savedWrap.length){

        this.savedWrap.addClass('-Close');
        if(compare_price > price && price > 0){
            var saved = price - compare_price;

            this.savedWrap.html(this.currencyFormat(saved)).removeClass('-Close');
        }
    }
};

Product.prototype.updateURLSku = function(sku_id) {
    var key_name = "sku";
    var search_object = stringToObject(window.location.search.substring(1));

    if (sku_id) {
        search_object[key_name] = sku_id;
    } else {
        delete search_object[key_name];
    }

    var search_string = objectToString(search_object);
    var new_URL = location.origin + location.pathname + search_string + location.hash;

    if (typeof history.replaceState === "function") {
        history.replaceState(null, document.title, new_URL);
    }

    function stringToObject(string) {
        var result = {};

        string = string.split("&");

        $.each(string, function(i, value) {
            if (value) {
                var pair = value.split("=");
                result[ decodeURIComponent( pair[0] ) ] = decodeURIComponent( pair[1] ? pair[1] : "" );
            }
        });

        return result;
    }

    function objectToString(object) {
        var result = "",
            array = [];

        $.each(object, function(key, value) {
            array.push(encodeURIComponent(key) + "=" + encodeURIComponent(value));
        });

        if (array.length) {
            result = "?" + array.join("&");
        }

        return result;
    }
};

Product.prototype.updateFeaturesList = function(sku_id) {
    var featuresTables = $('.js-product-features');

    if(typeof this.sku_features != 'undefined' && typeof this.skus_features[sku_id] != 'undefined' && featuresTables.length){
        var featuresList = this.sku_features,
            productFeaturesList = this.skus_features[sku_id],
            featuresCount = parseInt(this.short_features_count),
            featuresAliasesList = this.short_features_codes ? this.short_features_codes.split(',') : [];

        featuresTables.each(function (){
            var featuresTableOne = $(this),
                typeFeatures = featuresTableOne.data("type");

            featuresTableOne.html("");
            var indexIteration = 1, htmlTableTrFeature;

            for(var f_code in productFeaturesList) {
                var f_value = productFeaturesList[f_code],
                    isDivider = (typeof featuresList[f_code].type != 'undefined' && featuresList[f_code].type == 'divider');

                if(typeof featuresList[f_code] == 'undefined' && typeof featuresList[f_code + ".0"] != 'undefined'){
                    featuresList[f_code] = featuresList[f_code + ".0"];
                    featuresList[f_code].name = featuresList[f_code + ".0"].name;
                }
                if(typeFeatures == 'first' && featuresCount > 0 && indexIteration > featuresCount){
                    break;
                }
                if(typeFeatures == 'short' && featuresAliasesList.length && $.inArray(f_code, featuresAliasesList) === -1){
                    continue;
                }
                var itemFeaturesClass = "Product__features-item";
                if(isDivider){
                    itemFeaturesClass += " " +"divider";
                }
                htmlTableTrFeature = '<tr class="'+ itemFeaturesClass +'">';
                htmlTableTrFeature += "<td class=\"Product__features-title\">";
                htmlTableTrFeature += "<span>" + featuresList[f_code].name + "</span>";
                htmlTableTrFeature += "</td>";
                htmlTableTrFeature += "<td class=\"Product__features-value\">";
                if(!isDivider){
                    htmlTableTrFeature += f_value;
                }
                htmlTableTrFeature += "</td>";

                featuresTableOne.append(htmlTableTrFeature);

                indexIteration++;
            }
        })
    }
};

$(function(){
    main.init();
    tabs.init();
    accTabs.init();
    form.init();
    selectList.init();
    menu.init();
    slider.init();
    photoGallery.init();
    modalForm.init();
    dropDownWrap.init();
    categoriesMainMenu.init();
    mobileMenu.init();
    mobileSearch.init();
    fixedPanel.init();
    subscribeForm.init();
    versionSite.init();
    openMap.init();
    tags.init();
    skCallback.init();
    pagePopup.init();
    cart.init();
    specialProducts.init();
    productTile.init();
    productListCustom.init();
    productsHome.init();
    productsCarousel.init();
    videoPopup.init();
    lazyImages.init();
    productsPreviewList.init();
    infoMessage.init($('.js-head-info-massage'));
    popupAdvert.init($('.js-popup-advert'));
    categoriesImages.init();
    customGalleryPopup.init();
    contentPopup.init();
    fixedCart.init();
    displayFontAwesome.init();
    demoSettings.init();
    productGallery.init();

    new SkOneclick({ buttons: '.js-sk-oneclick-open' });
    new SocialWidgets({ container: ".js-social-widgets", timeAutoSwitch: 5000 });
    new productTileGallery();
});

$.fn.elementRealWidth = function () {
    $clone = this.clone()
        .css("visibility","hidden")
        .appendTo($('body'));
    var $width = $clone.outerWidth(true);
    $clone.remove();
    return $width;
};

jQuery.fn.outerHTML = function(s) {
    return s
        ? this.before(s).remove()
        : jQuery("<p>").append(this.eq(0).clone()).html();
};

function is_touch_device() {
    return 'ontouchstart' in window || navigator.maxTouchPoints;
};

function viewport() {
    var e = window, a = 'inner';
    if (!('innerWidth' in window )) {
        a = 'client';
        e = document.documentElement || document.body;
    }
    return { width : e[ a+'Width' ] , height : e[ a+'Height' ] };
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}


