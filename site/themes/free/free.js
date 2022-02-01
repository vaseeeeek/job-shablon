var fixOrder = {
    init: function () {
        this.close()
    }, open: function () {
        var t, e = $(".js-fixed-cart-outer");
        e.length && (t = e.data("cart-url") + "?fixed=1", e.html(""), $.get(t, function (t) {
            $("<div>" + t + "</div>").find(".js-fixed-cart").length && e.html(t)
        }))
    }, close: function () {
        $("body").on("click", ".js-cart-fixed-close", function () {
            $(".js-fixed-cart-outer").html("")
        })
    }
}, fixedPanel = {
    init: function () {
        var t = this, e = $("#main-content"), i = $(".js-fixed-panel");
        e.length && i.length && (t.bottomPanel(e, i), $(window).scroll(function () {
            t.bottomPanel(e, i)
        }), $(window).resize(function () {
            t.bottomPanel(e, i)
        }))
    }, bottomPanel: function (t, e) {
        var i = $(document).scrollTop(), n = t.offset().top, t = viewport();
        n <= i || t.width <= 1e3 ? e.is(":visible") || (e.css("padding", "3px 0"), e.css("bottom", "-50px"), e.addClass("show"), e.animate({bottom: "0"}, 200), e.animate({padding: "0"}, 300)) : e.removeClass("show")
    }
}, phoneSbar = {
    init: function () {
        var t = $(".js-filter-fixed-btn"), e = $(".sidear-mobile #filter-body");
        t.on("click touchend", function () {
            left = Math.ceil(parseInt(e.css("left"))), left < 0 ? e.addClass("show") : e.removeClass("show")
        })
    }
}, freeCallback = {
    init: function () {
        this.showModal(), this.triggerCloce()
    }, showModal: function () {
        var t = this, e = $(".js-callback-open"), i = $(".js-callback-block");
        e.size() && i.size() && e.magnificPopup({
            items: [{src: ".js-callback-block", type: "inline"}],
            midClick: !0,
            callbacks: {
                open: function () {
                    t.closeModal(), i.trigger("event-open")
                }, close: function () {
                    i.trigger("event-close")
                }
            }
        })
    }, closeModal: function () {
        $(".js-popup").hide(), $("body").removeClass("_popup-open")
    }, triggerCloce: function () {
        var t = $(".js-callback-block");
        $(t).on("run-close", function () {
            $(this).find(".mfp-close").click()
        })
    }
}, productsSlider = {
    carouseItemsWrap: $(".js-owl-carousel-product"), init: function () {
        var t = this;
        if (!t.carouseItemsWrap.length) return !1;
        t.prepareListCarousels(), t.carouselAction(), $(window).one("resize", t.carouselsInitialization)
    }, carouselsInitialization: function () {
        productsSlider.carouseItemsWrap.each(function () {
            var t = $(this);
            productsSlider.slider(t)
        })
    }, prepareListCarousels: function () {
        this.carouseItemsWrap.each(function () {
            var t = $(this).find(".owl-carousel"), e = t.outerWidth(), i = $(this).find(".js-Product-grid"),
                n = i.length;
            e < i.first().outerWidth(!0) * n && ((n = $(this).find(".js-carousel-direction")).append('<div data-index="prev" class="js-slider-init-action owl-prev disabled"></div>'), n.append('<div data-index="next" class="js-slider-init-action owl-next"></div>'));
            var s = t.offset().left + t.outerWidth();
            i.slice(0, 7).each(function () {
                $(this).offset().left < s && $(this).find(".owl-lazy").Lazy({
                    afterLoad: function (t) {
                        t.removeClass("owl-lazy"), $.Retina && t.retina()
                    }
                })
            })
        })
    }, carouselAction: function () {
        var r = this;
        $(".js-slider-init-action").on("click", function () {
            var t = $(this).closest(".js-owl-carousel-product");
            r.slider(t, $(this).data("index"))
        }), checkTouchDevice() && $(".js-owl-carousel-product .owl-carousel").each(function () {
            $(this).swipe({
                allowPageScroll: "auto", threshold: 20, swipe: function (t, e, i, n, s, o) {
                    var a = $(this).closest(".js-owl-carousel-product");
                    "left" == e ? r.slider(a, "next") : "right" == e && r.slider(a, "prev")
                }
            })
        })
    }, slider: function (e, t) {
        if (e.hasClass("carousel-init")) return !1;
        var i = e.find(".owl-carousel"), n = e.find(".js-carousel-direction"), s = e.data("swipe"), o = {},
            o = i.data("type-mobile-preview") ? {
                0: {items: 4},
                700: {items: 5},
                1e3: {items: 6},
                1250: {items: 7}
            } : {0: {items: 3}, 400: {items: 4}, 700: {items: 5}, 1e3: {items: 6}, 1250: {items: 7}};
        i.owlCarousel({
            loop: !1,
            margin: 15,
            nav: !0,
            dots: !1,
            mouseDrag: s,
            navText: ["", ""],
            navElement: "div",
            navContainer: n,
            responsive: o,
            autoWidth: !0,
            lazyLoad: !0,
            onInitialize: function (t) {
                e.find(".js-slider-init-action").remove()
            },
            onInitialized: function (t) {
                e.addClass("carousel-init")
            },
            onDragged: function (t) {
                void 0 !== $.autobadgeFrontend && $.autobadgeFrontend.reinit()
            },
            onTranslated: function (t) {
                void 0 !== $.autobadgeFrontend && $.autobadgeFrontend.reinit()
            },
            onLoadedLazy: function (t) {
                t = $(t.currentTarget);
                t.length && $.Retina && t.find(".owl-item.active .js-product-preview-img").retina()
            }
        }), t && ("prev" == t ? i.trigger("prev.owl.carousel") : "next" == t && i.trigger("next.owl.carousel"))
    }
}, listHome = {
    init: function () {
        var t = this, e = $(".js-home-products");
        e.length && e.each(function () {
            t.slider($(this))
        })
    }, slider: function (i) {
        i.removeClass("active"), i.parent().find(".js-home-products-more").remove(), i.after('<span class="home-products-more js-home-products-more"></span>');
        var n, s, o, a, r, t = i.find(".js-Product-grid");
        t.removeClass("hide"), t.length && (n = t.first().offset().top, s = i.data("count-line") ? parseInt(i.data("count-line")) : 1, r = a = o = 0, t.each(function () {
            var t = $(this), e = t.offset().top;
            e != a && o++, 1 == o && r++, n < e && o <= s && (n = e), n < e && 2 < r && (t.addClass("hide"), i.addClass("active")), a = e
        }), this.showElements(i, r))
    }, showElements: function (i, n) {
        i.parent().find(".js-home-products-more").on("click", function () {
            i.find(".js-Product-grid");
            var t = i.find(".js-Product-grid.hide"), e = 0;
            t.each(function () {
                var t = $(this);
                e < n && (t.removeClass("hide"), t.find(".js-product-preview-img").removeAttr("height").removeAttr("width")), e++
            }), i.find(".js-Product-grid.hide").length ? i.addClass("active") : i.removeClass("active"), void 0 !== $.autobadgeFrontend && $.autobadgeFrontend.reinit()
        })
    }
}, catImgs = {
    init: function () {
        this.catList()
    }, catList: function () {
        var i = this;
        $(".js-list-categories").each(function () {
            var t = $(this), e = t.data("lazy"), t = t.find(".js-cat-item-image");
            e && i.lazyLoadImg(t)
        })
    }, lazyLoadImg: function (t) {
        t.lazy()
    }
}, slider = {
    sliderBox: $(".js-home-slider"), init: function () {
        this.sliderBox.length && (this.autoScroll(), this.sliderAction())
    }, autoScroll: function () {
        var t = this, e = 1e3 * parseInt(t.sliderBox.data("pause"));
        0 < e && setTimeout(function () {
            t.initializationSlider(null, e)
        }, e)
    }, sliderAction: function () {
        var a = this;
        $(".js-slider-init-action").on("click", function () {
            a.initializationSlider($(this).data("index"), !1), a.sliderBox.trigger("stop.owl.autoplay")
        }), checkTouchDevice() && a.sliderBox.swipe({
            allowPageScroll: "auto",
            threshold: 20,
            swipe: function (t, e, i, n, s, o) {
                "left" == e ? a.initializationSlider("next", !1) : "right" == e && a.initializationSlider("prev", !1), a.sliderBox.hasClass("owl-loaded") && a.sliderBox.trigger("stop.owl.autoplay")
            }
        })
    }, initializationSlider: function (t, e) {
        var i = this;
        if (i.sliderBox.hasClass("owl-loaded")) return !1;
        var n = !!e, s = i.sliderBox.closest(".js-slider-outer").find(".js-nav-slider"),
            o = i.sliderBox.closest(".js-slider-outer").find(".js-dots-slider"), a = {
                loop: !0,
                margin: 0,
                nav: !0,
                lazyLoad: !0,
                autoHeight: !0,
                navContainer: s,
                dotsContainer: o,
                items: 1,
                mouseDrag: !1,
                navText: ["", ""],
                onInitialize: function () {
                    s.html(""), o.html("")
                },
                onLoadedLazy: function (t) {
                    "product" == i.sliderBox.data("type") && t.element.retina()
                }
            };
        n && (a.autoplay = !0, a.autoplayTimeout = e, a.autoplayHoverPause = !0), i.sliderBox.owlCarousel(a), $(".js-home-slider .owl-prev, .js-home-slider .owl-next, .js-home-slider owl-dot").on("click", function (t) {
            i.sliderBox.trigger("stop.owl.autoplay")
        }), t && ("prev" == t ? i.sliderBox.trigger("prev.owl.carousel") : "next" == t ? i.sliderBox.trigger("next.owl.carousel") : i.sliderBox.trigger("to.owl.carousel", [parseInt(t)]))
    }
}, lazyLoadImg = {
    init: function () {
        $(".js-image-lazy").lazy({bind: "event"})
    }
}, formModal = {
    init: function () {
        this.loadForm("a.js-form-login-popupp"), this.loadForm('.js-ajax-form a[href="/login/"]'), this.loadForm('.js-ajax-form a[href="/forgotpassword/"]'), this.btnForm()
    }, loadForm: function (t) {
        var i = this;
        $("body").on("click", t, function (t) {
            t.preventDefault();
            var e = $(this).attr("href") + "?ajax=1";
            $.magnificPopup.close(), $("body").prepend("<div class='js-loading-bg mfp-bg mfp-ready'><div class='mfp-preloader'></div></div>"), $.get(e, function (t) {
                $(".js-loading-bg").remove();
                t = $(t).find(".js-ajax-form");
                i.showModal(t, e)
            })
        })
    }, showModal: function (t, e) {
        $(t).find("form").attr("action", e), $(t).find('input[type="checkbox"], input[type="radio"], .js-select').styler(), $.magnificPopup.open({
            items: {src: "<div class='modal-content'>" + t.outerHTML() + "</div>"},
            type: "inline"
        }, 0)
    }, btnForm: function () {
        var s = this;
        $("body").on("submit", ".js-ajax-form form", function (t) {
            var e, i, n = $(this).closest(".js-ajax-form");
            n.find(".wa-login-form-wrapper").length || n.find(".wa-forgotpassword-form-wrapper").length || (t.preventDefault(), e = $(this).attr("action"), t = $(this).serialize(), (i = $(this).find('input[type="submit"]')).hide(), i.after($('<i class="icon16 loading js-loading"></i>')), $.post(e, t, function (t) {
                t = $(t).find(".js-ajax-form");
                0 < t.length ? (s.showModal(t, e), i.show(), $(this).find(".js-loading").remove()) : window.location.reload()
            }))
        })
    }
}, videoModal = {
    init: function () {
        $("body").on("click", ".js-video-popup", function (t) {
            t.preventDefault();
            t = $(this).data("href");
            t && $.magnificPopup.open({
                items: {src: t},
                type: "iframe",
                mainClass: "mfp-fade",
                removalDelay: 160,
                preloader: !1,
                fixedContentPos: !1,
                iframe: {
                    patterns: {
                        youtube_short: {
                            index: "youtu.be/",
                            id: "youtu.be/",
                            src: "//www.youtube.com/embed/%id%?autoplay=1"
                        }
                    }
                }
            }, 0)
        })
    }
}, cart = {
    init: function () {
        this.addProductToCart(), this.addToCartDialog(), this.btnQuantity(), this.countQuantity()
    }, addToCartDialog: function () {
        $("body").on("click", ".js-card-dialog", function () {
            $.magnificPopup.open({
                items: {src: $(this).data("href")},
                type: "ajax",
                callbacks: {
                    parseAjax: function (t) {
                        var e;
                        "string" == typeof t.data || t.data instanceof String ? (e = "<div>" + t.data + "</div>", t.data = $(e).find(".js-modal-content")) : t.data = $(t.data)
                    }, ajaxContentAdded: function () {
                        var t = this.content.find("#product-cart");
                        t.length && t.data("id") && productViewListCustom.viewed(t.data("id")), checkTouchDevice() || itemGallery.productMagnifImg(this.content.find(".js-product_gallery-images-main")), itemGallery.swipeBigImg(this.content.find(".js-product_gallery-images-main")), itemGallery.previewsWrapSlider = itemGallery.previewsSliderWrap(this.content.find(".js-previews-gallery"))
                    }, open: function () {
                        $.magnificPopup.instance._onFocusIn = function (t) {
                            if ($(t.target).closest("#storequickorder")) return !0;
                            $.magnificPopup.proto._onFocusIn.call(this, t)
                        }
                    }
                }
            }, 0)
        })
    }, addProductToCart: function () {
        var r = this;
        $("body").on("submit", ".js-add-to-cart", function (t) {
            t.preventDefault();
            var e = $(this), i = e.attr("action"), t = e.serialize(), n = $(".js-cart-preview-count"),
                s = $(".js-cart-price-total-price"), o = $("#cart-form-dialog"), a = e.find(".js-submit-form");
            a.addClass("cart-loading"), $.post(i + "?html=1", t, function (t) {
                a.text("В корзине"), a.removeClass("cart-loading"), a.addClass("added"), "ok" == t.status ? (n.html(t.data.count), s.html(t.data.total), productViewListCustom.showAddedMsg($(".juniq-header-preview-cart")), 0 < o.length && $.magnificPopup.close(), "popup" == e.data("after-action") ? r.popupAddCart(e) : "fixed" == e.data("after-action") ? fixOrder.open() : "move" == e.data("after-action") && r.animationMoveToCart(e)) : messages.notifyDanger(t.errors)
            }, "json")
        })
    }, animationMoveToCart: function (t) {
        var e = t.closest(".js-product").find(".js-preview-cart");
        0 == e.length && (e = t.closest(".js-preview-cart"));
        var i = e.data("position"), n = $("<div></div>").append(e.html()),
            t = $(".js-fixed .juniq-header-preview-cart");
        t.length && t.is(":visible") || (t = $(".js-cart-header")), n.css({
            "z-index": 100,
            top: e.offset().top,
            left: e.offset().left,
            width: e.width() + "px",
            height: e.height() + "px",
            position: i || "absolute",
            overflow: "hidden",
            background: "#FFF"
        }).insertAfter("body").animate({
            top: t.offset().top,
            left: t.offset().left,
            width: 0,
            height: 0,
            opacity: .7
        }, 650, function () {
            n.remove(), productViewListCustom.showAddedMsg($(".juniq-header-preview-cart"))
        })
    }, popupAddCart: function (t) {
        var e = $("#popup-addcart"), i = t.data("name"), n = t.data("price"), s = t.data("image"), o = 1,
            t = t.find("input[name='quantity']");
        t.length && (o = t.val()), e.find(".js-popup-addcart-name").html(i), e.find(".js-popup-addcart-price").html(n), e.find(".js-popup-addcart-count").html("(x" + o + ")"), s ? e.find(".js-popup-addcart-image").html("<img src='" + s + "' />") : e.find(".js-popup-addcart-image").html(""), $.magnificPopup.open({
            items: {
                src: e,
                type: "inline"
            }, callbacks: {
                afterClose: function () {
                    e.find(".js-popup-addcart-name").html(""), e.find(".js-popup-addcart-price").html(""), e.find(".js-popup-addcart-count").html(""), e.find(".js-popup-addcart-image").html("")
                }
            }
        }), $(".js-close-popup-addcart").on("click", function () {
            $.magnificPopup.close()
        })
    }, btnQuantity: function () {
        $("body").on("click", ".js-pr-count-action", function () {
            var t = $(this), e = t.data("action"), i = t.closest(".js-pr-count").find("input"), t = i.val();
            "add" == e ? i.val(parseInt(t) + 1) : 1 < t && i.val(parseInt(t) - 1), i.change()
        })
    }, countQuantity: function () {
        $("body").on("click", ".js-qty-button", function () {
            var t = $(this), e = t.closest(".js-qty"), i = t.data("type"), t = e.find("input"), e = parseInt(t.val());
            "-" == i ? 1 < e ? e-- : e = 1 : e ? e++ : e = 1, t.val(e), t.change()
        })
    }
}, categoriesMainMenu = {
    init: function () {
        var t = this;
        t.ddShow(), t.dd(), t.showSubInMob(), t.hiderSubInMob(), t.outerBg(), $(".js-show-cat").hasClass("-hide") && t.hideCatList()
    }, ddShow: function () {
        var o = this, a = $(".js-cat-subs-disclosed"), r = $("#nav-cat"), l = r.data("delay");
        a.hover(function () {
            var t = $(this), e = t.find(".js-subcategory-menu").first(), i = "absolute" == e.css("position"),
                n = "absolute" == r.css("position"), s = t.closest(".js-category-menu-wrap");
            i && 0 < e.length && (l ? e.stop(!0).delay(150).fadeIn(1, function () {
                e.outerWidth(!0);
                a.hasClass("pos-rel") || n && o.calcHeight(s, e)
            }) : (e.show(), e.outerWidth(!0), a.hasClass("pos-rel") || n && o.calcHeight(s, e)))
        }, function () {
            var t = $(this), e = t.find(".js-subcategory-menu").first(), i = "absolute" == e.css("position"),
                n = t.closest(".js-category-menu-wrap");
            i && (l ? e.stop(!0).delay(150).fadeOut(1, function () {
                n.removeAttr("style")
            }) : (e.hide(), n.removeAttr("style")))
        })
    }, dd: function () {
        var o = this, a = $(".js-cat-subs-dropdown"), r = $("#nav-cat").data("delay");
        a.hover(function () {
            var t = $(this), e = t.find(".js-subcategory-menu").first(), i = "absolute" == e.css("position"),
                n = "absolute" == $("#nav-cat").css("position"), s = t.closest(".js-category-menu-wrap"), t = 0;
            i && (e.length && (t += 258, r ? e.stop(!0).delay(150).fadeIn(1) : e.show()), a.hasClass("pos-rel") || (s.css("margin-right", t + "px"), n && o.calcHeight(s, e)))
        }, function () {
            var t = $(this), e = t.find(".js-subcategory-menu"), i = "absolute" == e.css("position"),
                n = t.closest(".js-category-menu-wrap");
            i && (r ? e.stop(!0).delay(150).fadeOut(1, function () {
                n.removeAttr("style")
            }) : (e.hide(), n.removeAttr("style")))
        });
        var l = $(".js-subcatmenu-el");
        l.hover(function () {
            var t = $(this), e = t.find(".js-subcategory-menu").first(), i = "absolute" == e.css("position"),
                n = "absolute" == $("#nav-cat").css("position"), s = t.closest(".js-category-menu-wrap");
            i && (r ? e.stop(!0).delay(150).fadeIn(1, function () {
                l.hasClass("pos-rel") || (s.css("margin-right", "518px"), n && o.calcHeight(s, e))
            }) : (e.show(), l.hasClass("pos-rel") || (s.css("margin-right", "518px"), n && o.calcHeight(s, e))))
        }, function () {
            var t = $(this), e = t.find(".js-subcategory-menu").first(), i = "absolute" == e.css("position"),
                n = t.closest(".js-category-menu-wrap");
            t.closest(".js-cat-subs-dropdown");
            i && (r ? e.stop(!0).delay(150).fadeOut(1, function () {
                l.hasClass("pos-rel") || n.css("margin-right", "258px")
            }) : (e.hide(), l.hasClass("pos-rel") || n.css("margin-right", "258px")))
        })
    }, calcHeight: function (t, e) {
        e = e.outerHeight(!0);
        t.outerHeight(!0) < e && t.css("height", e + "px")
    }, showSubInMob: function () {
        $(".js-cat-item-caret").on("click", function () {
            var t = $(this), e = t.closest(".js-cat-subs-disclosed, .js-cat-subs-dropdown, .js-subcatmenu-el"),
                i = $(e.find(".js-subcategory-menu").first());
            "absolute" != i.css("position") && (i.is(":visible") ? (i.css("left", "0"), t.removeClass("open"), e.removeClass("open")) : (i.css("left", "-100%"), e.addClass("open"), t.addClass("open")))
        })
    }, hiderSubInMob: function () {
        $(".js-btn-close-submenu").on("click", function () {
            var t = $(this), e = t.closest(".js-subcategory-menu"), i = t.closest(".subcat-menu__item");
            parentArrow = t.closest(".js-cat-item-caret"), e.css("left", "-100%"), parentArrow.removeClass("open"), i.removeClass("open")
        })
    }, outerBg: function () {
        var t = $("#nav-cat.desktop-show"), e = $("#nav-cat.desktop-show ~ .js-bg");
        hoverTime = $("#nav-cat").data("delay"), hoverTime ? t.hover(function () {
            e.stop(!0).delay(150).fadeIn(1)
        }, function () {
            e.stop(!0).delay(100).fadeOut(1)
        }) : t.hover(function () {
            e.show()
        }, function () {
            e.hide()
        })
    }, hideCatList: function () {
        $(".js-show-cat").click(function () {
            $(".-hideList").addClass("open")
        }), $(".js-btn-hide-fullcatlist").click(function () {
            $(this).closest(".-hideList").removeClass("open")
        })
    }
}, itemsViewList = {
    init: function () {
        var t = this;
        $(".js-preview-products").each(function () {
            t.images($(this))
        })
    }, images: function (t) {
        var e = t.data("image-lazy"), t = t.find(".js-product-preview-img:not(.owl-lazy)");
        e && t.lazy({
            afterLoad: function (t) {
                new productGridGallery
            }
        })
    }
}, formSelectList = {
    init: function () {
        $(document).mouseup(function (e) {
            var i = $(".cat-sort");
            if (i.is(e.target) || 0 !== i.has(e.target).length) {
                let t = !0;
                $(e.target).attr("href") && $(e.target).attr("href").includes("?sort") && $(".js-select-items").is(":visible") && (i.find(".js-select-items").hide(), t = !1), $(e.target).hasClass("js-checked-toggle") && $(".js-select-items").is(":visible") && (i.find(".js-select-items").hide(), t = !1), $(e.target).hasClass("fi-rr-caret-down") && $(e.target).closest("jq-checked__arrow-trigger") && $(".js-select-items").is(":visible") && (i.find(".js-select-items").hide(), t = !1), t && i.find(".js-select-items").show()
            } else i.find(".js-select-items").hide()
        }), $("body").on("click", ".js-checked-toggle a", function (t) {
            t.preventDefault()
        })
    }
}, mobileMenuBtn = {
    init: function () {
        this.closeOpen(), this.openSub()
    }, closeOpen: function () {
        var t = $(".js-nav-button"), e = $(".menu-close");
        t.on("click", function () {
            var t = $(this), e = $("#" + t.data("id"));
            e.hasClass("show") ? (e.removeClass("show"), t.removeClass("show")) : (e.addClass("show"), t.addClass("show"))
        }), e.on("click", function () {
            $(this);
            var t = $(this).closest(".MobileMenu_nav-m"), e = $(this).closest(".js-cat-subs-dropdown"),
                i = $(".MobileMenu_nav-m .js-subcategory-menu");
            t.hasClass("show") && t.removeClass("show"), i.css("left", "-100%"), e.hasClass("open") && e.removeClass("open"), $(".-hideList").hasClass("open") && $(".-hideList").removeClass("open")
        })
    }, openSub: function () {
        $(".js-top-nav-caret").on("click", function () {
            var t = $(this).closest(".juniq-header-top-nav-el");
            t.hasClass("open") ? (t.removeClass("open"), $(this).removeClass("open")) : (t.addClass("open"), $(this).addClass("open"))
        })
    }
}, tabsAcc = {
    init: function () {
        this.initactiveTab(), this.activeTab(), this.activeToTabContent()
    }, activeTab: function () {
        var i = $(".js-acc-tab");
        i.on("click", function () {
            var t = $(this), e = t.data("tab-content"), e = i.closest(".js-tabs-acc-wrap").find("#" + e);
            e.is(":visible") ? (t.removeClass("selected"), e.removeClass("selected")) : (t.addClass("selected"), e.addClass("selected"))
        })
    }, activeToTabContent: function () {
        $(".js-motion-to-tab").on("click", function (t) {
            t.preventDefault();
            var e = $(this), t = $("#" + e.data("tab-content"));
            t.closest(".js-tabs-acc-wrap").find('.js-acc-tab[data-tab-content="' + e.data("tab-content") + '"]').addClass("selected"), t.addClass("selected");
            t = t.offset().top - 40;
            $("html,body").animate({scrollTop: t}, 500)
        })
    }, initactiveTab: function () {
        var i = $(".js-tabs-acc-wrap");
        i.length && i.each(function () {
            var t = $(this), e = t.find(".js-acc-tab.selected");
            e.length || !(e = t.find(".js-acc-tab:first")).length || (t = i.find("#" + e.data("tab-content"))).length && (e.addClass("selected"), t.addClass("selected"))
        })
    }
}, cookieMessage = {
    init: function (t) {
        if (!t.length) return !1;
        this.messageBox(t) && (this.boxOpen(t), this.onClose(t))
    }, messageBox: function (t) {
        return !$.cookie("closeCookie")
    }, boxOpen: function (t) {
        t.show()
    }, onClose: function (t) {
        t.data("id");
        t.find(".js-cookie-information").on("click", function () {
            t.detach(), $.cookie("closeCookie", 1)
        })
    }
}, formFunc = {
    init: function () {
        this.formAppearance(), this.formSend()
    }, formAppearance: function () {
        if ($("body").on("change", 'input[type="checkbox"]', function () {
            $(this).is(":checked") ? ($(this).closest(".jq-checkbox, .js-style-check").addClass("checked"), $(this).closest("label").addClass("checked")) : ($(this).closest(".jq-checkbox, label, .js-style-check").removeClass("checked"), $(this).closest("label").removeClass("checked"))
        }), $("body").on("change", 'input[type="radio"]', function () {
            $('input[type="radio"][name="' + $(this).attr("name") + '"]').each(function () {
                var t = $(this);
                t.is(":checked") ? (t.closest(".jq-radio, .js-toggle-styler").addClass("checked"), t.closest("label").addClass("checked")) : (t.closest(".jq-radio, .js-toggle-styler").removeClass("checked"), t.closest("label").removeClass("checked"))
            })
        }), !globalThemeSettings.isformAppearanceInit) return !1;
        var t = $('input[type="checkbox"]:not(.js-style-check-input):not(.js-none-styler):not(.shop-sk-callback__checkbox), input[type="radio"]:not(.js-toggle-styler-input):not(.buy1step-auth__variant):not(.js-none-styler), .js-select');
        if (!t.length) return !1;
        t.styler(), $('input[type="checkbox"], input[type="radio"], .js-select').styler(), $('.js-addgifts__cart-el input[type="radio"], .searchpro__page-filters input[type="checkbox"], .searchpro__page-filters input[type="radio"], .searchpro__page-filters .js-select').styler("destroy")
    }, formSend: function () {
        $("body").on("click", ".js-submit-form", function () {
            var t = $(this), e = t.closest("form");
            t.hasClass("disabled") || e.submit()
        })
    }
}, productViewListCustom = {
    init: function () {
        this.compare(), this.favorites(), this.clear(), this.viewed()
    }, viewed: function (t) {
        $("#product-cart").length && $("#product-cart").data("id") && this.add("viewed_product_list", $("#product-cart").data("id"), 20)
    }, compare: function () {
        this.list("shop_compare", $(".js-preview-compare"), ".js-compare-add")
    }, favorites: function () {
        this.list("product_favor_arr", $(".js-favorites-preview"), ".js-favorites-add")
    }, list: function (r, l, c, d) {
        var u = this;
        $("body").on("click", c, function (t) {
            t.preventDefault();
            var e = $(this), i = 0, n = !0, s = l.find(".js-products-count"), o = l.find(".js-products-link"),
                a = $(this).data("product");
            e.hasClass("active") ? (i = u.remove(r, a), n = !1) : i = u.add(r, a);
            t = 0 < i ? o.attr("href").replace(/compare\/.*$/, "compare/" + u.get(r) + "/") : "/compare/";
            o.attr("href", t), s.html(i), n && u.showAddedMsg(l), $(c + "[data-product='" + a + "']").toggleClass("active"), d && d({
                that: e,
                url: t,
                productId: a,
                isAdded: n
            }), ".js-compare-add" == c && location.href.includes("/compare/") && (location.href = location.href.replace(/compare\/.*/, "compare/"))
        })
    }, add: function (t, e, i) {
        var n = $.cookie(t), s = [];
        return n && "null" != n && "0" != n && (s = (n = (n = n.replace(",null", "")).replace(",0", "")).split(","), -1 != (n = $.inArray(e + "", s)) && s.splice(n, 1)), s.unshift(e), i && s.splice(i), this.save(s, t), s.length
    }, remove: function (t, e) {
        var i = (i = $.cookie(t)) ? i.split(",") : [], e = $.inArray(e + "", i);
        return -1 != e && i.splice(e, 1), this.save(i, t), i.length
    }, get: function (t) {
        return $.cookie(t)
    }, save: function (t, e) {
        if (0 < t.length) for (var i = 0; i < t.length; i++) parseInt(t[i]) || t.splice(i, 1);
        0 < t.length ? $.cookie(e, t.join(","), {expires: 30, path: "/"}) : $.cookie(e, null, {path: "/"})
    }, clear: function () {
        var e = this;
        $(".js-clear-pr-list").on("click", function () {
            var t = $(this).data("list");
            e.save([], t), location.reload()
        })
    }, showAddedMsg: function (t) {
        t.addClass("active"), setTimeout(function () {
            t.removeClass("active")
        }, 3e3)
    }
}, ddBox = {
    init: function () {
        var i = this, n = ".js-dd-wrap";
        $(document).click(function (t) {
            ($(t.target).closest(n).length || $(t.target).closest(".js-dd-outer").length) && !$(t.target).hasClass("js-bg") || $(n).each(function () {
                $(this).removeClass("show")
            })
        }), $(".js-btnDrop-down").on("click", function () {
            var t = $(this), e = $("#" + $(this).data("id"));
            e.is(":visible") ? e.removeClass("show") : ($(n).each(function () {
                $(this).removeClass("show")
            }), i.open(t, e))
        })
    }, open: function (t, e) {
        e.is(":visible") ? (e.animate({opacity: 0}, 200, function () {
            e.removeClass("show")
        }), t.removeClass("active")) : (e.css("padding-top", "20px"), e.css("opacity", "0"), e.addClass("show"), e.animate({
            paddingTop: "0",
            opacity: 1
        }, 200), t.addClass("active"))
    }
}, itemGallery = {
    previewsWrapSlider: null, init: function () {
        var e = jQuery;
        itemGallery.previewsWrapSlider = this.previewsSliderWrap(e(".js-previews-gallery")), itemGallery.swipeBigImg(e(".js-product_gallery-images-main")), itemGallery.popupSwipeImg(), itemGallery.popupSwipebox(), e("body").on("click", ".js-id-preview-gallery a", function (t) {
            t.preventDefault(), itemGallery.changeBigImg(e(this), !1)
        }), checkTouchDevice() || this.productMagnifImg(e(".js-product_gallery-images-main"))
    }, previewsSliderWrap: function (t) {
        return !!t.length && (t.bxSlider({
            mode: "vertical",
            slideWidth: 70,
            minSlides: Math.trunc($(".product_gallery-images-main-img").height() / 76),
            slideMargin: 6,
            pager: !1,
            nextText: "",
            prevText: "",
            infiniteLoop: !1,
            hideControlOnEnd: !0,
            oneToOneTouch: !1,
            touchEnabled: !1
        }), t)
    }, mainSliderInit: function (t, e) {
        var i, s = this, n = 0;
        t.length && !t.hasClass("owl-loaded") && ((i = t.closest(".js-product").find(".js-id-preview-gallery.selected")).length && "0" != i.data("position") && (n = parseInt(i.data("position"))), t.owlCarousel({
            loop: !1,
            nav: !1,
            margin: 0,
            items: 1,
            lazyLoad: !0,
            autoHeight: !1,
            dots: !1,
            startPosition: n,
            mouseDrag: !1,
            onLoadedLazy: function (t) {
                t = $(t.currentTarget);
                t.length && $.Retina && t.find(".owl-item.active .owl-lazy").retina()
            },
            onInitialized: function () {
                checkTouchDevice() || s.productMagnifImg(t), s.displayImageTitle(t)
            },
            onChanged: function (t) {
                var e, i = $(t.currentTarget), n = t.item.index,
                    s = i.find('.js-product_gallery-images-main-el[data-position="' + n + '"]'), o = s.data("id");
                "video" != s.data("id") || s.find("iframe").length || (e = s.data("video-url"), t = s.data("video-width"), n = s.data("video-height"), s.html('<iframe src="' + e + '" width="' + t + '" height="' + n + '" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>')), o && ((i = i.closest(".js-product").find(".js-id-preview-gallery")).removeClass("selected"), i.filter("[data-id='" + o + "']").addClass("selected"))
            },
            onDragged: function (t) {
                var e, i, n = $(t.currentTarget);
                n.length && (i = (e = n.closest(".js-product").find(".js-id-preview-gallery")).filter(".selected"), (t = $(n).find(".owl-item.active .js-product_gallery-images-main-el").data("id")) && (e.removeClass("selected"), (t = e.filter("[data-id='" + t + "']")).addClass("selected"), "true" == t.attr("aria-hidden") && s.previewsWrapSlider.length && (parseInt(i.data("position")) > parseInt(t.data("position")) ? s.previewsWrapSlider.goToPrevSlide() : parseInt(i.data("position")) < parseInt(t.data("position")) && s.previewsWrapSlider.goToNextSlide()), itemGallery.displayImageTitle(n)))
            }
        }), e && ("prev" == e ? t.trigger("next.owl.carousel") : "next" == e && t.trigger("prev.owl.carousel")))
    }, swipeBigImg: function (t) {
        checkTouchDevice() && t.swipe({
            allowPageScroll: "auto", threshold: 20, swipe: function (t, e, i, n, s, o) {
                t = $(t.target).closest(".js-product").find(".js-product_gallery-images-main");
                "left" == e ? itemGallery.mainSliderInit(t, "prev") : "right" == e && itemGallery.mainSliderInit(t, "next")
            }
        })
    }, changeBigImg: function (t, e) {
        var i = t.parent(), n = i.data("id"), s = t.closest(".js-product").find(".js-product_gallery-images-main"),
            t = s.find(".js-product_gallery-images-main-el");
        s.hasClass("owl-loaded") || this.mainSliderInit(s), null == e && (e = !0), i.addClass("selected").siblings().removeClass("selected"), !n || void 0 !== (n = t.filter("[data-id='" + n + "']").data("position")) && (s.trigger("to.owl.carousel", [n, 300]), itemGallery.displayImageTitle(s))
    }, displayImageTitle: function (t) {
        var e = t.closest(".js-product").find(".js-product_gallery-images-title"), t = t.find(".owl-item.active");
        e.text(""), e.length && t.length && (e = t.find("img").attr("alt")) && e.text(e)
    }, productMagnifImg: function (t) {
        t.length && t.closest(".js-product_gallery-images").data("zoom") && t.find(".js-product_gallery-images-main-el").each(function () {
            $(this).zoom({
                url: $(this).attr("href"), onZoomIn: function () {
                    $(this).parent().addClass("zooming")
                }, onZoomOut: function () {
                    $(this).parent().removeClass("zooming")
                }
            })
        })
    }, popupSwipebox: function () {
        $("body").on("click", ".js-image-popup-swipebox", function (t) {
            t.preventDefault();
            var e = $(this).closest(".js-product").find(".js-product_gallery-images"),
                t = $(this).closest(".js-product").find(".js-id-preview-gallery"), i = [], n = 0;
            t.length ? t.each(function (t) {
                $(this).hasClass("selected") && (n = t), $(this).data("video") ? i.push({
                    href: $(this).find("a").attr("href"),
                    icon: '<i class="fa fa-video-camera" aria-hidden="true"></i>'
                }) : i.push({href: $(this).find("a").attr("href"), src: $(this).find("img").attr("src")})
            }) : i.push({href: $(this).attr("href"), src: $(this).find("img").attr("src")});
            var o = e.data("thumbs"), a = e.data("black-bg"), s = 0;
            return $.swipebox(i, {
                useSVG: !1, hideBarsDelay: !1, thumbs: o, initialIndexOnArray: n, beforeOpen: function () {
                    s = $(document).scrollTop()
                }, afterClose: function () {
                    $("body").removeClass("hidden-fixed"), $(window).scrollTop(s)
                }, afterOpen: function () {
                    var n, s;
                    $("body").addClass("hidden-fixed"), !0 === a && $("#swipebox-overlay").addClass("opacity-black"), !0 === o && 1 < i.length && (n = "", s = parseInt($("#swipebox-slider .slide.current").data("index")), i.forEach(function (t, e) {
                        var i = "swipebox-thumbs_el js-swipebox-thumbs-el";
                        s === e && (i += " active"), t.icon ? n += '<a class="' + i + ' swipebox-thumbs_el--icon" data-index="' + e + '" href="' + t.href + '">' + t.icon + "</a>" : n += '<a class="' + i + '" data-index="' + e + '" href="' + t.href + '"><img src="' + t.src + '" /></a>'
                    }), $("#swipebox-container").append('<div id="swipebox-thumbs" class="swipebox-thumbs">' + n + "</div>"), $("#swipebox-slider").css("padding-bottom", parseInt($("#swipebox-thumbs").outerHeight()) + 30 + "px")), (!0 === o && i.length || a) && ($("#swipebox-bottom-bar").addClass("swipebox-bottom-bar--pos-center"), $("#swipebox-arrows").addClass("swipebox-arrows--pos-center"));
                    var e = function () {
                        var t = $("#swipebox-close");
                        t.length && t.trigger("click"), $(document).off("scroll", e)
                    };
                    $("#swipebox-slider").on("click", e)
                }
            }), !1
        })
    }, popupSwipeImg: function () {
        $("body").on("click", ".pswp button", function (t) {
            t.preventDefault()
        }), $("body").on("click", ".js-image-popup-photoswipe", function (t) {
            t.preventDefault();
            var i = $(this).closest(".js-product").find(".js-product_gallery-images"),
                n = $(this).closest(".js-product").find(".js-id-preview-gallery"),
                e = $(this).closest(".js-product").find(".js-product_gallery-images-main-el"),
                t = document.querySelectorAll(".pswp")[0], s = 0;
            (n = []).length ? n.each(function () {
                var t, e = $(this);
                e.hasClass("selected") && (s = e.data("position")), e.data("video") ? (t = i.find("iframe")).length && n.push({html: '<iframe src="' + t.attr("src") + '" width="' + t.attr("width") + '" height="' + t.attr("height") + '"></iframe>'}) : n.push({
                    src: e.find("a").attr("href"),
                    w: 0,
                    h: 0
                })
            }) : e.length && n.push({src: e.attr("href"), w: 0, h: 0});
            var o = new PhotoSwipe(t, PhotoSwipeUI_Default, n, {index: s, shareEl: !1, history: !1});
            o.listen("gettingData", function (t, e) {
                var i;
                (e.w < 1 || e.h < 1) && ((i = new Image).onload = function () {
                    e.w = this.width, e.h = this.height, o.updateSize(!0)
                }, i.src = e.src)
            }), o.init()
        })
    }
}, productViewGrid = {
    init: function () {
        var s;
        $(".js-Product-grid").hover(function () {
            var t = $(this), e = (t.prev(), t.find(".js-button")), i = t.find(".js-dialog");
            e.css({
                marginTop: "15px",
                opacity: 0
            }), t.addClass("hover"), e.first().show(), e.first().animate({
                marginTop: "0",
                opacity: 1
            }, 300), s = setTimeout(function () {
                e.last().show(), e.last().animate({marginTop: "0", opacity: 1}, 150)
            }, 150), i.fadeIn();
            t.find(".js-product-preview-img")
        }, function () {
            var t = $(this), e = t.prev(), i = t.find(".js-button"), n = t.find(".js-dialog");
            clearTimeout(s), e.removeClass("next-hover"), t.removeClass("hover"), i.first().stop(), i.last().stop(), i.hide(), n.hide();
            t = t.find(".js-product-preview-img");
            t.stop(), t.removeAttr("style")
        })
    }
}, menu = {
    init: function () {
        this.respMenu(), this.flexMenu(), this.headerMenuHover()
    }, respMenu: function () {
        var t = this, e = $(".js-resp-nav-top");
        if (!e.length) return !1;
        jQuery.each(e, function () {
            t.resp($(this))
        })
    }, flexMenu: function () {
        var t = this;
        if (!$(".js-resp-nav-top").length) return !1;
        $(window).resize(function () {
            t.respMenu()
        })
    }, resp: function (t) {
        var i = t.width(), e = t.children(".js-resp-nav-top-el"), n = t.find(".js-resp-nav-top-else"),
            s = parseFloat(n.removeClass("hide").outerWidth(!0)), o = n.find(".js-resp-subnav-else"), a = 0;
        n.addClass("hide"), o.html(""), e.removeClass("hide"), jQuery.each(e, function () {
            var t = $(this), e = parseFloat(t.outerWidth(!0));
            i < a + e + s && (n.removeClass("hide"), t.clone().appendTo(o), t.addClass("hide")), a += t.outerWidth(!0)
        })
    }, headerMenuHover: function () {
        var t = $("#header-nav"), e = $('.js-nav-button[data-id="' + t.attr("id") + '"]'),
            t = $(".juniq-header-top-nav-el");
        e.is(":visible") || t.hover(function () {
            var t = $(this).children(".juniq-header_menu-nav-sub");
            t.css("padding-top", "15px"), t.css("opacity", "0"), t.show(), t.animate({paddingTop: "0", opacity: 1}, 300)
        }, function () {
            $(this).children(".juniq-header_menu-nav-sub").hide()
        })
    }
}, phoneSearch = {
    init: function () {
        var t = $(".js-show-Nav-search"), e = $(".js-Nav-search");
        t.on("click", function () {
            e.is(":visible") ? (e.removeClass("show"), $(this).removeClass("active")) : (e.addClass("show"), $(this).addClass("active"))
        })
    }
}, tags = {
    init: function () {
        this.showAll()
    }, showAll: function () {
        $(".js-open-tags").on("click", function () {
            var t = $(this), e = t.closest(".js-tags").find(".js-tag"), i = t.find(".link-half");
            t.hasClass("open") ? (t.removeClass("open"), e.addClass("hide"), i.text("Развернуть")) : (t.addClass("open"), e.removeClass("hide"), i.text("Cвернуть"))
        })
    }
}, tabs = {
    init: function () {
        this.initactiveTab(), this.activeTab(), this.activeToTabContent()
    }, activeTab: function () {
        var i = $(".js-tab"), n = $(".js-tab-content");
        i.on("click", function () {
            var t = $(this), e = t.data("tab-content");
            i.removeClass("selected"), n.removeClass("selected"), t.addClass("selected"), $("#" + e).addClass("selected")
        })
    }, activeToTabContent: function () {
        var t = $(".js-motion-to-tab"), n = $(".js-tab-content");
        t.on("click", function (t) {
            t.preventDefault();
            var e = $(this), i = $(".js-tab"), t = $("#" + e.data("tab-content")),
                e = $('.js-tab[data-tab-content="' + e.data("tab-content") + '"]');
            i.removeClass("selected"), e.addClass("selected"), n.removeClass("selected"), t.addClass("selected");
            t = t.offset().top - 50;
            $("html,body").animate({scrollTop: t}, 500)
        })
    }, initactiveTab: function () {
        var t = $(".js-tabs");
        t.length && t.each(function () {
            var t = $(this), e = t.find(".selected");
            e.length || (e = t.find(".js-tab:first")), !e.length || (t = $("#" + e.data("tab-content"))).length && (e.addClass("selected"), t.addClass("selected"))
        })
    }
};
window.productGridGallery || (productGridGallery = function (s) {
    function t(t) {
        this.init(t)
    }

    return t.prototype = {
        _config: {images: {}}, init: function (t) {
            if (s("body").hasClass("touch")) return !1;
            this.params = s.extend({}, this._config, t), this.launchGallery()
        }, launchGallery: function () {
            s(".js-grid-gallery").each(function () {
                var t = s(this), e = t.find(".js-grid-block-gallery"), i = t.find(".js-product-preview-img");
                i.data("src") || i.attr("data-src", i.attr("src")), t.find(".js-grid-gallery-item").on("mouseenter", function () {
                    var t = s(this).data("img");
                    s("<img>").attr("src", t).load(function () {
                        i.attr("src", t)
                    })
                });
                var n = i.data("src");
                e.on("mouseleave", function () {
                    i.attr("src", n)
                })
            })
        }
    }, t
}(jQuery));
var main = {
    init: function () {
        var t = this;
        t.scrollToTop(), t.languageChange(), t.autoSearch(), t.inputCount(), t.viewFullPlugins()
    }, scrollToTop: function () {
        var e = $("#move-to-top"), i = $(".js-moved-content");
        i.length && e.length && ($(window).scroll(function () {
            var t = $(document).scrollTop();
            i.offset().top <= t ? e.fadeIn() : e.fadeOut()
        }), e.click(function (t) {
            t.preventDefault(), $("html,body").animate({scrollTop: 0}, 500)
        }))
    }, languageChange: function () {
        $(".js-language").on("click", function (t) {
            t.preventDefault();
            t = location.href;
            -1 == t.indexOf("?") ? t += "?" : t += "&", location.href = t + "locale=" + $(this).data("value")
        })
    }, autoSearch: function () {
        var t = $(".js-ajax-search");
        $(".js-ajax-search-result").resize(function () {
            t.closest(".inp-search").siblings(".inp-search--wrap").height(40 + $(".js-ajax-search-result").height() + 20)
        }), t.on("keyup", function () {
            var t = $(this), e = t.val(), i = t.closest("form"), t = i.attr("action"),
                n = i.find(".js-ajax-search-result");
            3 < e.length && $.get(t + "?query=" + e + "&ajax=1", function (t) {
                t = $(t).find(".js-ajax-search");
                n.html(""), t.length ? (n.show(), n.html(t), $(".Nav-search").css("box-shadow", "0 2px 8px 0 rgb(0 0 0 / 16%)"), $(".ajax-search-result").css("box-shadow", "rgb(0 0 0 / 16%) 0px 8px 8px 0px")) : ($(".Nav-search").css("box-shadow", "none"), $(".ajax-search-result").css("box-shadow", "none"), n.hide())
            })
        }), $("body").click(function (t) {
            var e = $(".js-ajax-search-result");
            $(".js-ajax-search").is(t.target) || e.is(t.target) || 0 != e.has(t.target).length || ($(".Nav-search").css("box-shadow", "none"), $(".ajax-search-result").css("box-shadow", "none"), e.hide())
        })
    }, inputCount: function () {
        $("body").on("keyup", ".js-number", function () {
            $(this).val($(this).val().replace(/[^0-9]/g, ""))
        })
    }, viewFullPlugins: function () {
        $(".js-nav-sidebar-wrap").each(function () {
            $(this).find(".menu-v li:hidden").length && (button = $(this).find(".js-nav-sidebar-show"), button.removeClass("hide"), button.on("click", function () {
                $(this).closest(".js-nav-sidebar-wrap").find(".menu-v li:hidden, .menu-v li.show").toggleClass("show"), $(this).find(".js-icon-plus, .js-icon-minus").toggleClass("hide")
            }))
        })
    }
};

function Product(t, e) {
    for (var i in this.formWrap = $(t), this.add2cart = this.formWrap.find(".js-add2cart"), this.button = this.add2cart.find(".js-submit-form"), this.skFastButton = this.formWrap.find(".js-sk-oneclick-open"), this.discount = this.formWrap.closest(".js-product-page").find(".js-product-discount"), this.savedWrap = this.formWrap.closest(".js-product-page").find(".js-product-discounts"), this.isSkuUrl = this.formWrap.data("sku-url"), e) this[i] = e[i];
    var n, s = this;
    this.formWrap.find(".services input[type=checkbox]").change(function () {
        var t = $('select[name="service-option[' + $(this).val() + ']"]');
        t.length && ($(this).is(":checked") ? t.removeAttr("disabled") : t.attr("disabled", "disabled")), s.cartButtonVisibility(!0), s.updatePrice()
    }), this.formWrap.find(".services .service-option").on("change", function () {
        s.cartButtonVisibility(!0), s.updatePrice()
    }), this.formWrap.find(".select-v-inline a").click(function () {
        var t = $(this).closest(".select-v-inline");
        return t.find("a.selected").removeClass("selected"), $(this).addClass("selected"), t.find("select.js-feature-sku, input.js-feature-sku").val($(this).data("value")).change(), !1
    }), this.formWrap.find(".skus input[type=radio], .skus select").change(function () {
        (t = $(this).find("option").length ? $(this).find("option:selected") : $(this)).data("image-id") && $("#product-image-" + t.data("image-id")).click(), t.data("disabled") ? (s.button.addClass("disabled"), s.skFastButton.addClass("disabled")) : (s.button.removeClass("disabled"), s.skFastButton.removeClass("disabled"));
        var t = t.attr("value");
        s.updateSkuServices(t), s.cartButtonVisibility(!0), s.updatePrice(), s.isSkuUrl && s.updateURLSku(t), s.updateFeaturesList(t)
    }), $(".skus input[type=radio]").length ? ((n = this.formWrap.find(".skus input[type=radio]:checked:not(:disabled)")).length || (n = this.formWrap.find(".skus input[type=radio]:not(:disabled):first").prop("checked", !0).click()), n.change()) : $(".skus option").length && ((n = this.formWrap.find(".skus option:selected:not(:disabled)")).length || (n = this.formWrap.find(".skus option:not(:disabled):first").prop("selected", !0).click()), n.change()), void 0 !== n && n.length && n.data("image-id") && itemGallery.changeBigImg($("#product-image-" + n.data("image-id"))), this.formWrap.find("select.js-feature-sku, input.js-feature-sku").change(function () {
        var t = "";
        s.formWrap.find("select.js-feature-sku, input.js-feature-sku").each(function () {
            t += $(this).data("feature-id") + ":" + $(this).val() + ";"
        });
        var e = s.features[t];
        e ? (e.image_id && itemGallery.changeBigImg($("#product-image-" + e.image_id)), s.updateSkuServices(e.id), e.available ? (s.button.removeClass("disabled"), s.skFastButton.removeClass("disabled")) : (s.formWrap.find("div.stocks div").hide(), s.formWrap.find(".sku-no-stock").show(), s.button.addClass("disabled"), s.skFastButton.addClass("disabled")), s.add2cart.find(".price").data("price", e.price), s.updatePrice(e.price, e.compare_price), s.isSkuUrl && s.updateURLSku(e.id), s.updateFeaturesList(e.id)) : (s.formWrap.find("div.stocks div").hide(), s.formWrap.find(".sku-no-stock").show(), s.button.addClass("disabled"), s.skFastButton.addClass("disabled"), s.add2cart.find(".js-compare-at-price").hide(), s.add2cart.find(".price").empty()), s.cartButtonVisibility(!0)
    }), this.formWrap.find("select.js-feature-sku:first, input.js-feature-sku:first").change(), this.formWrap.find(".skus input:radio:checked").length || this.formWrap.find(".skus input:radio:enabled:first").attr("checked", "checked"), this.formWrap.find(".skus option:selected").length || this.formWrap.find(".skus option:enabled:first").attr("selected", "selected"), s.showAllSkus()
}

function checkTouchDevice() {
    return "ontouchstart" in window || navigator.maxTouchPoints
}

function viewport() {
    var t = window, e = "inner";
    return "innerWidth" in window || (e = "client", t = document.documentElement || document.body), {
        width: t[e + "Width"],
        height: t[e + "Height"]
    }
}

function validateEmail(t) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(t)
}

Product.prototype.serviceVariantHtml = function (t, e, i) {
    return $('<option data-price="' + i + '" value="' + t + '"></option>').text(e + " (+" + this.currencyFormat(i, 1) + ")")
}, Product.prototype.getEscapedText = function (t) {
    return $("<div>").text(t).html()
}, Product.prototype.updateFeaturesList = function (t) {
    var r, l, c, d, e = $(".js-product-features");
    void 0 !== this.sku_features && void 0 !== this.skus_features[t] && e.length && (r = this.sku_features, l = this.skus_features[t], c = parseInt(this.short_features_count), d = this.short_features_codes ? this.short_features_codes.split(",") : [], e.each(function () {
        var t = $(this), e = t.data("type");
        t.html("");
        var i, n = 1;
        for (i in l) {
            var s, o = l[i], a = void 0 !== r[i].type && "divider" == r[i].type;
            if (void 0 === r[i] && void 0 !== r[i + ".0"] && (r[i] = r[i + ".0"], r[i].name = r[i + ".0"].name), "first" == e && 0 < c && c < n) break;
            "short" == e && d.length && -1 === $.inArray(i, d) || (s = "Product__features-item", a && (s += " divider"), s = '<tr class="' + s + '">', s += '<td class="Product__features-title">', s += "<span>" + r[i].name + "</span>", s += "</td>", s += '<td class="Product__features-value">', a || (s += o), s += "</td>", t.append(s), n++)
        }
    }))
}, Product.prototype.cartButtonVisibility = function (t) {
    t && (this.add2cart.find(".js-compare-at-price").show(), this.add2cart.find('input[type="submit"]').show(), this.add2cart.find(".price").show(), this.add2cart.find(".js-qty").show(), this.add2cart.find("span.added2cart").hide())
}, Product.prototype.updateURLSku = function (t) {
    var e, i, n = (e = window.location.search.substring(1), i = {}, e = e.split("&"), $.each(e, function (t, e) {
        e && (e = e.split("="), i[decodeURIComponent(e[0])] = decodeURIComponent(e[1] || ""))
    }), i);
    t ? n.sku = t : delete n.sku;
    n = function (t) {
        var e = "", i = [];
        $.each(t, function (t, e) {
            i.push(encodeURIComponent(t) + "=" + encodeURIComponent(e))
        }), i.length && (e = "?" + i.join("&"));
        return e
    }(n), n = location.origin + location.pathname + n + location.hash;
    "function" == typeof history.replaceState && history.replaceState(null, document.title, n)
}, Product.prototype.currencyFormat = function (t, e) {
    var i, n, s = this.currency.frac_digits, o = this.currency.decimal_point, a = this.currency.thousands_sep;
    isNaN(s = Math.abs(s)) && (s = 2), null == o && (o = ","), null == a && (a = "."), 3 < (n = (i = parseInt(t = (+t || 0).toFixed(s)) + "").length) ? n %= 3 : n = 0;
    t = (n ? i.substr(0, n) + a : "") + i.substr(n).replace(/(\d{3})(?=\d)/g, "$1" + a) + (s && t - i ? o + Math.abs(t - i).toFixed(s).replace(/-/, 0).slice(2) : ""), e = e ? this.currency.sign : this.currency.sign_html;
    return this.currency.sign_position ? t + this.currency.sign_delim + e : e + this.currency.sign_delim + t
}, Product.prototype.updateSkuServices = function (t) {
    let e = $(".pd-code__box");
    for (var i in 0 < e.find(".js-pd-code").length && (e.find(".js-pd-code").hide(), e.find(".sku-" + t + "-pd-code").show()), this.formWrap.find("div.stocks div").hide(), this.formWrap.find(".sku-" + t + "-stock").show(), this.services[t]) {
        var n = this.services[t][i];
        if (!1 === n) this.formWrap.find(".service-" + i).hide().find("input,select").attr("disabled", "disabled").removeAttr("checked").trigger("refresh"), this.formWrap.find(".service-" + i).find(".js-style-check, label").addClass("disabled"); else if (this.formWrap.find(".service-" + i).show().find("input").removeAttr("disabled").trigger("refresh"), this.formWrap.find(".service-" + i).find(".js-style-check, label").removeClass("disabled"), "string" == typeof n || "number" == typeof n) this.formWrap.find(".service-" + i + " .service-price").html(this.currencyFormat(n)), this.formWrap.find(".service-" + i + " input").data("price", n); else {
            var s, o = this.formWrap.find(".service-" + i + " .service-option"), a = o.val();
            for (s in n) {
                var r = o.find("option[value=" + s + "]");
                !1 === n[s] ? (r.hide().addClass("disable"), r.attr("value") == a && (a = !1)) : (a = a || s, r.replaceWith(this.serviceVariantHtml(s, n[s][0], n[s][1])))
            }
            a = a || this.form.find(".service-" + i + " .service-option").find("option:not(.disable):first").attr("value"), this.formWrap.find(".service-" + i + " .service-option").val(a)
        }
    }
}, Product.prototype.updatePrice = function (e, t) {
    void 0 === e && ((o = this.formWrap.find(".skus input:radio:checked, .skus option:selected")).length ? (e = parseFloat(o.data("price")), t = parseFloat(o.data("compare-price"))) : e = parseFloat(this.add2cart.find(".price").data("price"))), t && e ? (this.add2cart.find(".js-compare-at-price").length || this.add2cart.find(".price").after('<span class="js-compare-at-price product__old-price old-price nowrap"></span>'), this.add2cart.find(".js-compare-at-price").html(this.currencyFormat(t)).show()) : this.add2cart.find(".js-compare-at-price").html("");
    var i = this;
    this.formWrap.find(".services input:checked").each(function () {
        var t = $(this).val();
        i.formWrap.find(".service-" + t + "  .service-option").length ? e += parseFloat(i.formWrap.find(".service-" + t + "  .service-option :selected").data("price")) : e += parseFloat($(this).data("price"))
    });
    var n = this.add2cart.find(".price"), s = this.currencyFormat(e), o = n.data("zero-text");
    0 == e && o ? n.html('<span class="product_nul-price">' + o + "</span>") : n.html(s), i.updateDiscount(e, t), i.updateSaved(e, t), i.button.hasClass("disabled") || (0 == e && i.button.data("zero-price-disabled") ? (i.button.addClass("disabled"), i.skFastButton.addClass("disabled")) : (i.button.removeClass("disabled"), i.skFastButton.removeClass("disabled")))
}, Product.prototype.showAllSkus = function () {
    $("body").on("click", ".js-product-skus-show", function () {
        var t = $(this);
        t.closest(".js-product-skus").find(".js-product-skus-item").toggleClass("hide"), t.find(".js-icon-minus").toggleClass("hide"), t.find(".js-icon-plus").toggleClass("hide")
    })
}, Product.prototype.updateDiscount = function (t, e) {
    var i, n, s;
    this.discount.length && (i = 0, n = this.discount.data("round"), s = parseInt(this.discount.data("minimal")), this.discount.addClass("-Close"), t < e && 0 < t && (i = (e - t) / e * 100, s <= (i = "ceil" == n ? Math.ceil(i) : "floor" == n ? Math.floor(i) : Math.round(i)) && this.discount.html("-" + i + "%").removeClass("-Close")))
}, Product.prototype.updateSaved = function (t, e) {
    this.savedWrap.length && (this.savedWrap.addClass("-Close"), t < e && 0 < t && (e = t - e, this.savedWrap.html(this.currencyFormat(e)).removeClass("-Close")))
}, $(function () {
    main.init(), tabs.init(), tabsAcc.init(), formFunc.init(), formSelectList.init(), menu.init(), slider.init(), formModal.init(), ddBox.init(), categoriesMainMenu.init(), mobileMenuBtn.init(), phoneSearch.init(), phoneSbar.init(), fixedPanel.init(), tags.init(), freeCallback.init(), cart.init(), productViewGrid.init(), productViewListCustom.init(), listHome.init(), productsSlider.init(), videoModal.init(), lazyLoadImg.init(), itemsViewList.init(), cookieMessage.init($(".js-head-info-massage")), catImgs.init(), fixOrder.init(), itemGallery.init(), new productGridGallery
}), $.fn.elementRealWidth = function () {
    $clone = this.clone().css("visibility", "hidden").appendTo($("body"));
    var t = $clone.outerWidth(!0);
    return $clone.remove(), t
}, jQuery.fn.outerHTML = function (t) {
    return t ? this.before(t).remove() : jQuery("<p>").append(this.eq(0).clone()).html()
}, void 0 === jQuery.migrateMute && (jQuery.migrateMute = !0), function (l, i, c) {
    function d(t) {
        var e = i.console;
        n[t] || (n[t] = !0, l.migrateWarnings.push(t), e && e.warn && !l.migrateMute && (e.warn("JQMIGRATE: " + t), l.migrateTrace && e.trace && e.trace()))
    }

    function t(t, e, i, n) {
        if (Object.defineProperty) try {
            return Object.defineProperty(t, e, {
                configurable: !0, enumerable: !0, get: function () {
                    return d(n), i
                }, set: function (t) {
                    d(n), i = t
                }
            }), 0
        } catch (t) {
        }
        l._definePropertyBroken = !0, t[e] = i
    }

    var n = {};
    l.migrateWarnings = [], !l.migrateMute && i.console && i.console.log && i.console.log("JQMIGRATE: Logging is active"), l.migrateTrace === c && (l.migrateTrace = !0), l.migrateReset = function () {
        n = {}, l.migrateWarnings.length = 0
    }, "BackCompat" === document.compatMode && d("jQuery is not compatible with Quirks Mode");
    var a = l("<input/>", {size: 1}).attr("size") && l.attrFn, r = l.attr,
        s = l.attrHooks.value && l.attrHooks.value.get || function () {
            return null
        }, o = l.attrHooks.value && l.attrHooks.value.set || function () {
            return c
        }, u = /^(?:input|button)$/i, h = /^[238]$/,
        p = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
        f = /^(?:checked|selected)$/i;
    t(l, "attrFn", a || {}, "jQuery.attrFn is deprecated"), l.attr = function (t, e, i, n) {
        var s = e.toLowerCase(), o = t && t.nodeType;
        return n && (r.length < 4 && d("jQuery.fn.attr( props, pass ) is deprecated"), t && !h.test(o) && (a ? e in a : l.isFunction(l.fn[e]))) ? l(t)[e](i) : ("type" === e && i !== c && u.test(t.nodeName) && t.parentNode && d("Can't change the 'type' of an input or button in IE 6/7/8"), !l.attrHooks[s] && p.test(s) && (l.attrHooks[s] = {
            get: function (t, e) {
                var i, n = l.prop(t, e);
                return !0 === n || "boolean" != typeof n && (i = t.getAttributeNode(e)) && !1 !== i.nodeValue ? e.toLowerCase() : c
            }, set: function (t, e, i) {
                return !1 === e ? l.removeAttr(t, i) : ((e = l.propFix[i] || i) in t && (t[e] = !0), t.setAttribute(i, i.toLowerCase())), i
            }
        }, f.test(s) && d("jQuery.fn.attr('" + s + "') may use property instead of attribute")), r.call(l, t, e, i))
    }, l.attrHooks.value = {
        get: function (t, e) {
            var i = (t.nodeName || "").toLowerCase();
            return "button" === i ? s.apply(this, arguments) : ("input" !== i && "option" !== i && d("jQuery.fn.attr('value') no longer gets properties"), e in t ? t.value : null)
        }, set: function (t, e) {
            var i = (t.nodeName || "").toLowerCase();
            return "button" === i ? o.apply(this, arguments) : ("input" !== i && "option" !== i && d("jQuery.fn.attr('value', val) no longer sets properties"), t.value = e, c)
        }
    };
    var e, m = l.fn.init, g = l.parseJSON, v = /^([^<]*)(<[\w\W]+>)([^>]*)$/;
    l.fn.init = function (t, e, i) {
        var n;
        return t && "string" == typeof t && !l.isPlainObject(e) && (n = v.exec(l.trim(t))) && n[0] && ("<" !== t.charAt(0) && d("$(html) HTML strings must start with '<' character"), n[3] && d("$(html) HTML text after last tag is ignored"), "#" === n[0].charAt(0) && (d("HTML string cannot start with a '#' character"), l.error("JQMIGRATE: Invalid selector string (XSS)")), e && e.context && (e = e.context), l.parseHTML) ? m.call(this, l.parseHTML(n[2], e, !0), e, i) : m.apply(this, arguments)
    }, l.fn.init.prototype = l.fn, l.parseJSON = function (t) {
        return t || null === t ? g.apply(this, arguments) : (d("jQuery.parseJSON requires a valid JSON string"), null)
    }, l.uaMatch = function (t) {
        t = t.toLowerCase();
        t = /(chrome)[ \/]([\w.]+)/.exec(t) || /(webkit)[ \/]([\w.]+)/.exec(t) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(t) || /(msie) ([\w.]+)/.exec(t) || t.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(t) || [];
        return {browser: t[1] || "", version: t[2] || "0"}
    }, l.browser || (I = {}, (e = l.uaMatch(navigator.userAgent)).browser && (I[e.browser] = !0, I.version = e.version), I.chrome ? I.webkit = !0 : I.webkit && (I.safari = !0), l.browser = I), t(l, "browser", l.browser, "jQuery.browser is deprecated"), l.sub = function () {
        function i(t, e) {
            return new i.fn.init(t, e)
        }

        l.extend(!0, i, this), i.superclass = this, i.fn = i.prototype = this(), (i.fn.constructor = i).sub = this.sub, i.fn.init = function (t, e) {
            return e && e instanceof l && !(e instanceof i) && (e = i(e)), l.fn.init.call(this, t, e, n)
        }, i.fn.init.prototype = i.fn;
        var n = i(document);
        return d("jQuery.sub() is deprecated"), i
    }, l.ajaxSetup({converters: {"text json": l.parseJSON}});
    var y = l.fn.data;
    l.fn.data = function (t) {
        var e, i, n = this[0];
        return !n || "events" !== t || 1 !== arguments.length || (e = l.data(n, t), i = l._data(n, t), e !== c && e !== i || i === c) ? y.apply(this, arguments) : (d("Use of jQuery.fn.data('events') is deprecated"), i)
    };
    var w = /\/(java|ecma)script/i, _ = l.fn.andSelf || l.fn.addBack;

    function b(t) {
        return "string" != typeof t || l.event.special.hover ? t : (D.test(t) && d("'hover' pseudo-event is deprecated, use 'mouseenter mouseleave'"), t && t.replace(D, "mouseenter$1 mouseleave$1"))
    }

    l.fn.andSelf = function () {
        return d("jQuery.fn.andSelf() replaced by jQuery.fn.addBack()"), _.apply(this, arguments)
    }, l.clean || (l.clean = function (t, e, i, n) {
        e = (e = !(e = e || document).nodeType && e[0] || e).ownerDocument || e, d("jQuery.clean() is deprecated");
        var s, o, a, r = [];
        if (l.merge(r, l.buildFragment(t, e).childNodes), i) for (o = function (t) {
            return !t.type || w.test(t.type) ? n ? n.push(t.parentNode ? t.parentNode.removeChild(t) : t) : i.appendChild(t) : c
        }, s = 0; null != (a = r[s]); s++) l.nodeName(a, "script") && o(a) || (i.appendChild(a), a.getElementsByTagName !== c && (a = l.grep(l.merge([], a.getElementsByTagName("script")), o), r.splice.apply(r, [s + 1, 0].concat(a)), s += a.length));
        return r
    });
    var x = l.event.add, C = l.event.remove, S = l.event.trigger, T = l.fn.toggle, E = l.fn.live, k = l.fn.die,
        I = "ajaxStart|ajaxStop|ajaxSend|ajaxComplete|ajaxError|ajaxSuccess", A = RegExp("\\b(?:" + I + ")\\b"),
        D = /(?:^|\s)hover(\.\S+|)\b/;
    l.event.props && "attrChange" !== l.event.props[0] && l.event.props.unshift("attrChange", "attrName", "relatedNode", "srcElement"), l.event.dispatch && t(l.event, "handle", l.event.dispatch, "jQuery.event.handle is undocumented and deprecated"), l.event.add = function (t, e, i, n, s) {
        t !== document && A.test(e) && d("AJAX events should be attached to document: " + e), x.call(this, t, b(e || ""), i, n, s)
    }, l.event.remove = function (t, e, i, n, s) {
        C.call(this, t, b(e) || "", i, n, s)
    }, l.fn.error = function () {
        var t = Array.prototype.slice.call(arguments, 0);
        return d("jQuery.fn.error() is deprecated"), t.splice(0, 0, "error"), arguments.length ? this.bind.apply(this, t) : (this.triggerHandler.apply(this, t), this)
    }, l.fn.toggle = function (i, t) {
        if (!l.isFunction(i) || !l.isFunction(t)) return T.apply(this, arguments);
        d("jQuery.fn.toggle(handler, handler...) is deprecated");

        function e(t) {
            var e = (l._data(this, "lastToggle" + i.guid) || 0) % o;
            return l._data(this, "lastToggle" + i.guid, 1 + e), t.preventDefault(), n[e].apply(this, arguments) || !1
        }

        var n = arguments, s = i.guid || l.guid++, o = 0;
        for (e.guid = s; n.length > o;) n[o++].guid = s;
        return this.click(e)
    }, l.fn.live = function (t, e, i) {
        return d("jQuery.fn.live() is deprecated"), E ? E.apply(this, arguments) : (l(this.context).on(t, this.selector, e, i), this)
    }, l.fn.die = function (t, e) {
        return d("jQuery.fn.die() is deprecated"), k ? k.apply(this, arguments) : (l(this.context).off(t, this.selector || "**", e), this)
    }, l.event.trigger = function (t, e, i, n) {
        return i || A.test(t) || d("Global events are undocumented and deprecated"), S.call(this, t, e, i || document, n)
    }, l.each(I.split("|"), function (t, e) {
        l.event.special[e] = {
            setup: function () {
                var t = this;
                return t !== document && (l.event.add(document, e + "." + l.guid, function () {
                    l.event.trigger(e, null, t, !0)
                }), l._data(this, e, l.guid++)), !1
            }, teardown: function () {
                return this !== document && l.event.remove(document, e + "." + l._data(this, e)), !1
            }
        }
    })
}(jQuery, window), function (t, e) {
    "object" == typeof exports && "undefined" != typeof module ? e(exports, require("jquery"), require("popper.js")) : "function" == typeof define && define.amd ? define(["exports", "jquery", "popper.js"], e) : e((t = t || self).bootstrap = {}, t.jQuery, t.Popper)
}(this, function (t, d, s) {
    "use strict";

    function n(t, e) {
        for (var i = 0; i < e.length; i++) {
            var n = e[i];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
        }
    }

    function o(t, e, i) {
        return e && n(t.prototype, e), i && n(t, i), t
    }

    function a(n) {
        for (var t = 1; t < arguments.length; t++) {
            var s = null != arguments[t] ? arguments[t] : {}, e = Object.keys(s);
            "function" == typeof Object.getOwnPropertySymbols && (e = e.concat(Object.getOwnPropertySymbols(s).filter(function (t) {
                return Object.getOwnPropertyDescriptor(s, t).enumerable
            }))), e.forEach(function (t) {
                var e, i = n, t = s[e = t];
                e in i ? Object.defineProperty(i, e, {
                    value: t,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : i[e] = t
            })
        }
        return n
    }

    function i(t, s, e) {
        if (0 === t.length) return t;
        if (e && "function" == typeof e) return e(t);
        for (var t = (new window.DOMParser).parseFromString(t, "text/html"), o = Object.keys(s), a = [].slice.call(t.body.querySelectorAll("*")), i = 0, n = a.length; i < n; i++) !function (t) {
            var e = a[t], i = e.nodeName.toLowerCase();
            if (-1 === o.indexOf(e.nodeName.toLowerCase())) return e.parentNode.removeChild(e);
            var t = [].slice.call(e.attributes), n = [].concat(s["*"] || [], s[i] || []);
            t.forEach(function (t) {
                !function (t, e) {
                    var i = t.nodeName.toLowerCase();
                    if (-1 !== e.indexOf(i)) return -1 === Et.indexOf(i) || Boolean(t.nodeValue.match(kt) || t.nodeValue.match(It));
                    for (var n = e.filter(function (t) {
                        return t instanceof RegExp
                    }), s = 0, o = n.length; s < o; s++) if (i.match(n[s])) return 1
                }(t, n) && e.removeAttribute(t.nodeName)
            })
        }(i);
        return t.body.innerHTML
    }

    d = d && d.hasOwnProperty("default") ? d.default : d, s = s && s.hasOwnProperty("default") ? s.default : s;
    var e = "transitionend", u = {
        TRANSITION_END: "bsTransitionEnd", getUID: function (t) {
            for (; t += ~~(1e6 * Math.random()), document.getElementById(t);) ;
            return t
        }, getSelectorFromElement: function (t) {
            var e, i = t.getAttribute("data-target");
            i && "#" !== i || (i = (e = t.getAttribute("href")) && "#" !== e ? e.trim() : "");
            try {
                return document.querySelector(i) ? i : null
            } catch (t) {
                return null
            }
        }, getTransitionDurationFromElement: function (t) {
            if (!t) return 0;
            var e = d(t).css("transition-duration"), i = d(t).css("transition-delay"), n = parseFloat(e),
                t = parseFloat(i);
            return n || t ? (e = e.split(",")[0], i = i.split(",")[0], 1e3 * (parseFloat(e) + parseFloat(i))) : 0
        }, reflow: function (t) {
            return t.offsetHeight
        }, triggerTransitionEnd: function (t) {
            d(t).trigger(e)
        }, supportsTransitionEnd: function () {
            return Boolean(e)
        }, isElement: function (t) {
            return (t[0] || t).nodeType
        }, typeCheckConfig: function (t, e, i) {
            for (var n in i) if (Object.prototype.hasOwnProperty.call(i, n)) {
                var s = i[n], o = e[n],
                    o = o && u.isElement(o) ? "element" : {}.toString.call(o).match(/\s([a-z]+)/i)[1].toLowerCase();
                if (!new RegExp(s).test(o)) throw new Error(t.toUpperCase() + ': Option "' + n + '" provided type "' + o + '" but expected type "' + s + '".')
            }
        }, findShadowRoot: function (t) {
            if (!document.documentElement.attachShadow) return null;
            if ("function" != typeof t.getRootNode) return t instanceof ShadowRoot ? t : t.parentNode ? u.findShadowRoot(t.parentNode) : null;
            t = t.getRootNode();
            return t instanceof ShadowRoot ? t : null
        }
    };
    d.fn.emulateTransitionEnd = function (t) {
        var e = this, i = !1;
        return d(this).one(u.TRANSITION_END, function () {
            i = !0
        }), setTimeout(function () {
            i || u.triggerTransitionEnd(e)
        }, t), this
    }, d.event.special[u.TRANSITION_END] = {
        bindType: e, delegateType: e, handle: function (t) {
            if (d(t.target).is(this)) return t.handleObj.handler.apply(this, arguments)
        }
    };
    var r = "alert", l = "bs.alert", c = "." + l, h = d.fn[r],
        p = {CLOSE: "close" + c, CLOSED: "closed" + c, CLICK_DATA_API: "click" + c + ".data-api"},
        f = ((b = m.prototype).close = function (t) {
            var e = this._element;
            t && (e = this._getRootElement(t)), this._triggerCloseEvent(e).isDefaultPrevented() || this._removeElement(e)
        }, b.dispose = function () {
            d.removeData(this._element, l), this._element = null
        }, b._getRootElement = function (t) {
            var e = u.getSelectorFromElement(t), i = !1;
            return e && (i = document.querySelector(e)), i = i || d(t).closest(".alert")[0]
        }, b._triggerCloseEvent = function (t) {
            var e = d.Event(p.CLOSE);
            return d(t).trigger(e), e
        }, b._removeElement = function (e) {
            var t, i = this;
            d(e).removeClass("show"), d(e).hasClass("fade") ? (t = u.getTransitionDurationFromElement(e), d(e).one(u.TRANSITION_END, function (t) {
                return i._destroyElement(e, t)
            }).emulateTransitionEnd(t)) : this._destroyElement(e)
        }, b._destroyElement = function (t) {
            d(t).detach().trigger(p.CLOSED).remove()
        }, m._jQueryInterface = function (i) {
            return this.each(function () {
                var t = d(this), e = t.data(l);
                e || (e = new m(this), t.data(l, e)), "close" === i && e[i](this)
            })
        }, m._handleDismiss = function (e) {
            return function (t) {
                t && t.preventDefault(), e.close(this)
            }
        }, o(m, null, [{
            key: "VERSION", get: function () {
                return "4.3.1"
            }
        }]), m);

    function m(t) {
        this._element = t
    }

    d(document).on(p.CLICK_DATA_API, '[data-dismiss="alert"]', f._handleDismiss(new f)), d.fn[r] = f._jQueryInterface, d.fn[r].Constructor = f, d.fn[r].noConflict = function () {
        return d.fn[r] = h, f._jQueryInterface
    };
    var g = "button", v = "bs.button", y = "." + v, c = ".data-api", w = d.fn[g], _ = "active",
        b = '[data-toggle^="button"]',
        y = {CLICK_DATA_API: "click" + y + c, FOCUS_BLUR_DATA_API: "focus" + y + c + " blur" + y + c},
        x = ((c = C.prototype).toggle = function () {
            var t = !0, e = !0, i = d(this._element).closest('[data-toggle="buttons"]')[0];
            if (i) {
                var n, s = this._element.querySelector('input:not([type="hidden"])');
                if (s) {
                    if ("radio" === s.type && (s.checked && this._element.classList.contains(_) ? t = !1 : (n = i.querySelector(".active")) && d(n).removeClass(_)), t) {
                        if (s.hasAttribute("disabled") || i.hasAttribute("disabled") || s.classList.contains("disabled") || i.classList.contains("disabled")) return;
                        s.checked = !this._element.classList.contains(_), d(s).trigger("change")
                    }
                    s.focus(), e = !1
                }
            }
            e && this._element.setAttribute("aria-pressed", !this._element.classList.contains(_)), t && d(this._element).toggleClass(_)
        }, c.dispose = function () {
            d.removeData(this._element, v), this._element = null
        }, C._jQueryInterface = function (e) {
            return this.each(function () {
                var t = d(this).data(v);
                t || (t = new C(this), d(this).data(v, t)), "toggle" === e && t[e]()
            })
        }, o(C, null, [{
            key: "VERSION", get: function () {
                return "4.3.1"
            }
        }]), C);

    function C(t) {
        this._element = t
    }

    d(document).on(y.CLICK_DATA_API, b, function (t) {
        t.preventDefault();
        t = t.target;
        d(t).hasClass("btn") || (t = d(t).closest(".btn")), x._jQueryInterface.call(d(t), "toggle")
    }).on(y.FOCUS_BLUR_DATA_API, b, function (t) {
        var e = d(t.target).closest(".btn")[0];
        d(e).toggleClass("focus", /^focus(in)?$/.test(t.type))
    }), d.fn[g] = x._jQueryInterface, d.fn[g].Constructor = x, d.fn[g].noConflict = function () {
        return d.fn[g] = w, x._jQueryInterface
    };
    var S = "carousel", T = "bs.carousel", E = "." + T, b = ".data-api", k = d.fn[S],
        I = {interval: 5e3, keyboard: !0, slide: !1, pause: "hover", wrap: !0, touch: !0}, A = {
            interval: "(number|boolean)",
            keyboard: "boolean",
            slide: "(boolean|string)",
            pause: "(string|boolean)",
            wrap: "boolean",
            touch: "boolean"
        }, D = "next", j = "prev", $ = {
            SLIDE: "slide" + E,
            SLID: "slid" + E,
            KEYDOWN: "keydown" + E,
            MOUSEENTER: "mouseenter" + E,
            MOUSELEAVE: "mouseleave" + E,
            TOUCHSTART: "touchstart" + E,
            TOUCHMOVE: "touchmove" + E,
            TOUCHEND: "touchend" + E,
            POINTERDOWN: "pointerdown" + E,
            POINTERUP: "pointerup" + E,
            DRAG_START: "dragstart" + E,
            LOAD_DATA_API: "load" + E + b,
            CLICK_DATA_API: "click" + E + b
        }, M = "active", O = ".active.carousel-item", P = {TOUCH: "touch", PEN: "pen"},
        N = ((b = z.prototype).next = function () {
            this._isSliding || this._slide(D)
        }, b.nextWhenVisible = function () {
            !document.hidden && d(this._element).is(":visible") && "hidden" !== d(this._element).css("visibility") && this.next()
        }, b.prev = function () {
            this._isSliding || this._slide(j)
        }, b.pause = function (t) {
            t || (this._isPaused = !0), this._element.querySelector(".carousel-item-next, .carousel-item-prev") && (u.triggerTransitionEnd(this._element), this.cycle(!0)), clearInterval(this._interval), this._interval = null
        }, b.cycle = function (t) {
            t || (this._isPaused = !1), this._interval && (clearInterval(this._interval), this._interval = null), this._config.interval && !this._isPaused && (this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval))
        }, b.to = function (t) {
            var e = this;
            this._activeElement = this._element.querySelector(O);
            var i = this._getItemIndex(this._activeElement);
            if (!(t > this._items.length - 1 || t < 0)) if (this._isSliding) d(this._element).one($.SLID, function () {
                return e.to(t)
            }); else {
                if (i === t) return this.pause(), void this.cycle();
                i = i < t ? D : j;
                this._slide(i, this._items[t])
            }
        }, b.dispose = function () {
            d(this._element).off(E), d.removeData(this._element, T), this._items = null, this._config = null, this._element = null, this._interval = null, this._isPaused = null, this._isSliding = null, this._activeElement = null, this._indicatorsElement = null
        }, b._getConfig = function (t) {
            return t = a({}, I, t), u.typeCheckConfig(S, t, A), t
        }, b._handleSwipe = function () {
            var t = Math.abs(this.touchDeltaX);
            t <= 40 || (0 < (t = t / this.touchDeltaX) && this.prev(), t < 0 && this.next())
        }, b._addEventListeners = function () {
            var e = this;
            this._config.keyboard && d(this._element).on($.KEYDOWN, function (t) {
                return e._keydown(t)
            }), "hover" === this._config.pause && d(this._element).on($.MOUSEENTER, function (t) {
                return e.pause(t)
            }).on($.MOUSELEAVE, function (t) {
                return e.cycle(t)
            }), this._config.touch && this._addTouchEventListeners()
        }, b._addTouchEventListeners = function () {
            var t, e, i = this;
            this._touchSupported && (t = function (t) {
                i._pointerEvent && P[t.originalEvent.pointerType.toUpperCase()] ? i.touchStartX = t.originalEvent.clientX : i._pointerEvent || (i.touchStartX = t.originalEvent.touches[0].clientX)
            }, e = function (t) {
                i._pointerEvent && P[t.originalEvent.pointerType.toUpperCase()] && (i.touchDeltaX = t.originalEvent.clientX - i.touchStartX), i._handleSwipe(), "hover" === i._config.pause && (i.pause(), i.touchTimeout && clearTimeout(i.touchTimeout), i.touchTimeout = setTimeout(function (t) {
                    return i.cycle(t)
                }, 500 + i._config.interval))
            }, d(this._element.querySelectorAll(".carousel-item img")).on($.DRAG_START, function (t) {
                return t.preventDefault()
            }), this._pointerEvent ? (d(this._element).on($.POINTERDOWN, t), d(this._element).on($.POINTERUP, e), this._element.classList.add("pointer-event")) : (d(this._element).on($.TOUCHSTART, t), d(this._element).on($.TOUCHMOVE, function (t) {
                (t = t).originalEvent.touches && 1 < t.originalEvent.touches.length ? i.touchDeltaX = 0 : i.touchDeltaX = t.originalEvent.touches[0].clientX - i.touchStartX
            }), d(this._element).on($.TOUCHEND, e)))
        }, b._keydown = function (t) {
            if (!/input|textarea/i.test(t.target.tagName)) switch (t.which) {
                case 37:
                    t.preventDefault(), this.prev();
                    break;
                case 39:
                    t.preventDefault(), this.next()
            }
        }, b._getItemIndex = function (t) {
            return this._items = t && t.parentNode ? [].slice.call(t.parentNode.querySelectorAll(".carousel-item")) : [], this._items.indexOf(t)
        }, b._getItemByDirection = function (t, e) {
            var i = t === D, n = t === j, s = this._getItemIndex(e), o = this._items.length - 1;
            if ((n && 0 === s || i && s === o) && !this._config.wrap) return e;
            t = (s + (t === j ? -1 : 1)) % this._items.length;
            return -1 == t ? this._items[this._items.length - 1] : this._items[t]
        }, b._triggerSlideEvent = function (t, e) {
            var i = this._getItemIndex(t), n = this._getItemIndex(this._element.querySelector(O)),
                i = d.Event($.SLIDE, {relatedTarget: t, direction: e, from: n, to: i});
            return d(this._element).trigger(i), i
        }, b._setActiveIndicatorElement = function (t) {
            var e;
            this._indicatorsElement && (e = [].slice.call(this._indicatorsElement.querySelectorAll(".active")), d(e).removeClass(M), (t = this._indicatorsElement.children[this._getItemIndex(t)]) && d(t).addClass(M))
        }, b._slide = function (t, e) {
            var i, n, s, o = this, a = this._element.querySelector(O), r = this._getItemIndex(a),
                l = e || a && this._getItemByDirection(t, a), c = this._getItemIndex(l), e = Boolean(this._interval),
                t = t === D ? (i = "carousel-item-left", n = "carousel-item-next", "left") : (i = "carousel-item-right", n = "carousel-item-prev", "right");
            l && d(l).hasClass(M) ? this._isSliding = !1 : !this._triggerSlideEvent(l, t).isDefaultPrevented() && a && l && (this._isSliding = !0, e && this.pause(), this._setActiveIndicatorElement(l), s = d.Event($.SLID, {
                relatedTarget: l,
                direction: t,
                from: r,
                to: c
            }), d(this._element).hasClass("slide") ? (d(l).addClass(n), u.reflow(l), d(a).addClass(i), d(l).addClass(i), c = parseInt(l.getAttribute("data-interval"), 10), this._config.interval = c ? (this._config.defaultInterval = this._config.defaultInterval || this._config.interval, c) : this._config.defaultInterval || this._config.interval, c = u.getTransitionDurationFromElement(a), d(a).one(u.TRANSITION_END, function () {
                d(l).removeClass(i + " " + n).addClass(M), d(a).removeClass(M + " " + n + " " + i), o._isSliding = !1, setTimeout(function () {
                    return d(o._element).trigger(s)
                }, 0)
            }).emulateTransitionEnd(c)) : (d(a).removeClass(M), d(l).addClass(M), this._isSliding = !1, d(this._element).trigger(s)), e && this.cycle())
        }, z._jQueryInterface = function (n) {
            return this.each(function () {
                var t = d(this).data(T), e = a({}, I, d(this).data());
                "object" == typeof n && (e = a({}, e, n));
                var i = "string" == typeof n ? n : e.slide;
                if (t || (t = new z(this, e), d(this).data(T, t)), "number" == typeof n) t.to(n); else if ("string" == typeof i) {
                    if (void 0 === t[i]) throw new TypeError('No method named "' + i + '"');
                    t[i]()
                } else e.interval && e.ride && (t.pause(), t.cycle())
            })
        }, z._dataApiClickHandler = function (t) {
            var e, i, n = u.getSelectorFromElement(this);
            !n || (e = d(n)[0]) && d(e).hasClass("carousel") && (i = a({}, d(e).data(), d(this).data()), (n = this.getAttribute("data-slide-to")) && (i.interval = !1), z._jQueryInterface.call(d(e), i), n && d(e).data(T).to(n), t.preventDefault())
        }, o(z, null, [{
            key: "VERSION", get: function () {
                return "4.3.1"
            }
        }, {
            key: "Default", get: function () {
                return I
            }
        }]), z);

    function z(t, e) {
        this._items = null, this._interval = null, this._activeElement = null, this._isPaused = !1, this._isSliding = !1, this.touchTimeout = null, this.touchStartX = 0, this.touchDeltaX = 0, this._config = this._getConfig(e), this._element = t, this._indicatorsElement = this._element.querySelector(".carousel-indicators"), this._touchSupported = "ontouchstart" in document.documentElement || 0 < navigator.maxTouchPoints, this._pointerEvent = Boolean(window.PointerEvent || window.MSPointerEvent), this._addEventListeners()
    }

    d(document).on($.CLICK_DATA_API, "[data-slide], [data-slide-to]", N._dataApiClickHandler), d(window).on($.LOAD_DATA_API, function () {
        for (var t = [].slice.call(document.querySelectorAll('[data-ride="carousel"]')), e = 0, i = t.length; e < i; e++) {
            var n = d(t[e]);
            N._jQueryInterface.call(n, n.data())
        }
    }), d.fn[S] = N._jQueryInterface, d.fn[S].Constructor = N, d.fn[S].noConflict = function () {
        return d.fn[S] = k, N._jQueryInterface
    };
    var L = "collapse", F = "bs.collapse", b = "." + F, H = d.fn[L], W = {toggle: !0, parent: ""},
        R = {toggle: "boolean", parent: "(string|element)"}, B = {
            SHOW: "show" + b,
            SHOWN: "shown" + b,
            HIDE: "hide" + b,
            HIDDEN: "hidden" + b,
            CLICK_DATA_API: "click" + b + ".data-api"
        }, q = "show", U = "collapse", Q = "collapsing", V = "collapsed", Z = '[data-toggle="collapse"]',
        K = ((b = G.prototype).toggle = function () {
            d(this._element).hasClass(q) ? this.hide() : this.show()
        }, b.show = function () {
            var t, e, i, n, s = this;
            this._isTransitioning || d(this._element).hasClass(q) || (this._parent && 0 === (n = [].slice.call(this._parent.querySelectorAll(".show, .collapsing")).filter(function (t) {
                return "string" == typeof s._config.parent ? t.getAttribute("data-parent") === s._config.parent : t.classList.contains(U)
            })).length && (n = null), n && (i = d(n).not(this._selector).data(F)) && i._isTransitioning) || (t = d.Event(B.SHOW), d(this._element).trigger(t), t.isDefaultPrevented() || (n && (G._jQueryInterface.call(d(n).not(this._selector), "hide"), i || d(n).data(F, null)), e = this._getDimension(), d(this._element).removeClass(U).addClass(Q), this._element.style[e] = 0, this._triggerArray.length && d(this._triggerArray).removeClass(V).attr("aria-expanded", !0), this.setTransitioning(!0), i = "scroll" + (e[0].toUpperCase() + e.slice(1)), n = u.getTransitionDurationFromElement(this._element), d(this._element).one(u.TRANSITION_END, function () {
                d(s._element).removeClass(Q).addClass(U).addClass(q), s._element.style[e] = "", s.setTransitioning(!1), d(s._element).trigger(B.SHOWN)
            }).emulateTransitionEnd(n), this._element.style[e] = this._element[i] + "px"))
        }, b.hide = function () {
            var t = this;
            if (!this._isTransitioning && d(this._element).hasClass(q)) {
                var e = d.Event(B.HIDE);
                if (d(this._element).trigger(e), !e.isDefaultPrevented()) {
                    e = this._getDimension();
                    this._element.style[e] = this._element.getBoundingClientRect()[e] + "px", u.reflow(this._element), d(this._element).addClass(Q).removeClass(U).removeClass(q);
                    var i = this._triggerArray.length;
                    if (0 < i) for (var n = 0; n < i; n++) {
                        var s = this._triggerArray[n], o = u.getSelectorFromElement(s);
                        null !== o && (d([].slice.call(document.querySelectorAll(o))).hasClass(q) || d(s).addClass(V).attr("aria-expanded", !1))
                    }
                    this.setTransitioning(!0), this._element.style[e] = "";
                    e = u.getTransitionDurationFromElement(this._element);
                    d(this._element).one(u.TRANSITION_END, function () {
                        t.setTransitioning(!1), d(t._element).removeClass(Q).addClass(U).trigger(B.HIDDEN)
                    }).emulateTransitionEnd(e)
                }
            }
        }, b.setTransitioning = function (t) {
            this._isTransitioning = t
        }, b.dispose = function () {
            d.removeData(this._element, F), this._config = null, this._parent = null, this._element = null, this._triggerArray = null, this._isTransitioning = null
        }, b._getConfig = function (t) {
            return (t = a({}, W, t)).toggle = Boolean(t.toggle), u.typeCheckConfig(L, t, R), t
        }, b._getDimension = function () {
            return d(this._element).hasClass("width") ? "width" : "height"
        }, b._getParent = function () {
            var t, i = this;
            u.isElement(this._config.parent) ? (t = this._config.parent, void 0 !== this._config.parent.jquery && (t = this._config.parent[0])) : t = document.querySelector(this._config.parent);
            var e = '[data-toggle="collapse"][data-parent="' + this._config.parent + '"]',
                e = [].slice.call(t.querySelectorAll(e));
            return d(e).each(function (t, e) {
                i._addAriaAndCollapsedClass(G._getTargetFromElement(e), [e])
            }), t
        }, b._addAriaAndCollapsedClass = function (t, e) {
            t = d(t).hasClass(q);
            e.length && d(e).toggleClass(V, !t).attr("aria-expanded", t)
        }, G._getTargetFromElement = function (t) {
            t = u.getSelectorFromElement(t);
            return t ? document.querySelector(t) : null
        }, G._jQueryInterface = function (n) {
            return this.each(function () {
                var t = d(this), e = t.data(F), i = a({}, W, t.data(), "object" == typeof n && n ? n : {});
                if (!e && i.toggle && /show|hide/.test(n) && (i.toggle = !1), e || (e = new G(this, i), t.data(F, e)), "string" == typeof n) {
                    if (void 0 === e[n]) throw new TypeError('No method named "' + n + '"');
                    e[n]()
                }
            })
        }, o(G, null, [{
            key: "VERSION", get: function () {
                return "4.3.1"
            }
        }, {
            key: "Default", get: function () {
                return W
            }
        }]), G);

    function G(e, t) {
        this._isTransitioning = !1, this._element = e, this._config = this._getConfig(t), this._triggerArray = [].slice.call(document.querySelectorAll('[data-toggle="collapse"][href="#' + e.id + '"],[data-toggle="collapse"][data-target="#' + e.id + '"]'));
        for (var i = [].slice.call(document.querySelectorAll(Z)), n = 0, s = i.length; n < s; n++) {
            var o = i[n], a = u.getSelectorFromElement(o),
                r = [].slice.call(document.querySelectorAll(a)).filter(function (t) {
                    return t === e
                });
            null !== a && 0 < r.length && (this._selector = a, this._triggerArray.push(o))
        }
        this._parent = this._config.parent ? this._getParent() : null, this._config.parent || this._addAriaAndCollapsedClass(this._element, this._triggerArray), this._config.toggle && this.toggle()
    }

    d(document).on(B.CLICK_DATA_API, Z, function (t) {
        "A" === t.currentTarget.tagName && t.preventDefault();
        var i = d(this), t = u.getSelectorFromElement(this), t = [].slice.call(document.querySelectorAll(t));
        d(t).each(function () {
            var t = d(this), e = t.data(F) ? "toggle" : i.data();
            K._jQueryInterface.call(t, e)
        })
    }), d.fn[L] = K._jQueryInterface, d.fn[L].Constructor = K, d.fn[L].noConflict = function () {
        return d.fn[L] = H, K._jQueryInterface
    };
    var Y = "dropdown", X = "bs.dropdown", J = "." + X, b = ".data-api", tt = d.fn[Y], et = new RegExp("38|40|27"),
        it = {
            HIDE: "hide" + J,
            HIDDEN: "hidden" + J,
            SHOW: "show" + J,
            SHOWN: "shown" + J,
            CLICK: "click" + J,
            CLICK_DATA_API: "click" + J + b,
            KEYDOWN_DATA_API: "keydown" + J + b,
            KEYUP_DATA_API: "keyup" + J + b
        }, nt = "disabled", st = "show", ot = "dropdown-menu-right", at = '[data-toggle="dropdown"]',
        rt = ".dropdown-menu",
        lt = {offset: 0, flip: !0, boundary: "scrollParent", reference: "toggle", display: "dynamic"}, ct = {
            offset: "(number|string|function)",
            flip: "boolean",
            boundary: "(string|element)",
            reference: "(string|element)",
            display: "string"
        }, dt = ((b = ut.prototype).toggle = function () {
            if (!this._element.disabled && !d(this._element).hasClass(nt)) {
                var t = ut._getParentFromElement(this._element), e = d(this._menu).hasClass(st);
                if (ut._clearMenus(), !e) {
                    var i = {relatedTarget: this._element}, e = d.Event(it.SHOW, i);
                    if (d(t).trigger(e), !e.isDefaultPrevented()) {
                        if (!this._inNavbar) {
                            if (void 0 === s) throw new TypeError("Bootstrap's dropdowns require Popper.js (https://popper.js.org/)");
                            e = this._element;
                            "parent" === this._config.reference ? e = t : u.isElement(this._config.reference) && (e = this._config.reference, void 0 !== this._config.reference.jquery && (e = this._config.reference[0])), "scrollParent" !== this._config.boundary && d(t).addClass("position-static"), this._popper = new s(e, this._menu, this._getPopperConfig())
                        }
                        "ontouchstart" in document.documentElement && 0 === d(t).closest(".navbar-nav").length && d(document.body).children().on("mouseover", null, d.noop), this._element.focus(), this._element.setAttribute("aria-expanded", !0), d(this._menu).toggleClass(st), d(t).toggleClass(st).trigger(d.Event(it.SHOWN, i))
                    }
                }
            }
        }, b.show = function () {
            var t, e, i;
            this._element.disabled || d(this._element).hasClass(nt) || d(this._menu).hasClass(st) || (t = {relatedTarget: this._element}, e = d.Event(it.SHOW, t), i = ut._getParentFromElement(this._element), d(i).trigger(e), e.isDefaultPrevented() || (d(this._menu).toggleClass(st), d(i).toggleClass(st).trigger(d.Event(it.SHOWN, t))))
        }, b.hide = function () {
            var t, e, i;
            this._element.disabled || d(this._element).hasClass(nt) || !d(this._menu).hasClass(st) || (t = {relatedTarget: this._element}, e = d.Event(it.HIDE, t), i = ut._getParentFromElement(this._element), d(i).trigger(e), e.isDefaultPrevented() || (d(this._menu).toggleClass(st), d(i).toggleClass(st).trigger(d.Event(it.HIDDEN, t))))
        }, b.dispose = function () {
            d.removeData(this._element, X), d(this._element).off(J), this._element = null, (this._menu = null) !== this._popper && (this._popper.destroy(), this._popper = null)
        }, b.update = function () {
            this._inNavbar = this._detectNavbar(), null !== this._popper && this._popper.scheduleUpdate()
        }, b._addEventListeners = function () {
            var e = this;
            d(this._element).on(it.CLICK, function (t) {
                t.preventDefault(), t.stopPropagation(), e.toggle()
            })
        }, b._getConfig = function (t) {
            return t = a({}, this.constructor.Default, d(this._element).data(), t), u.typeCheckConfig(Y, t, this.constructor.DefaultType), t
        }, b._getMenuElement = function () {
            var t;
            return this._menu || (t = ut._getParentFromElement(this._element)) && (this._menu = t.querySelector(rt)), this._menu
        }, b._getPlacement = function () {
            var t = d(this._element.parentNode), e = "bottom-start";
            return t.hasClass("dropup") ? (e = "top-start", d(this._menu).hasClass(ot) && (e = "top-end")) : t.hasClass("dropright") ? e = "right-start" : t.hasClass("dropleft") ? e = "left-start" : d(this._menu).hasClass(ot) && (e = "bottom-end"), e
        }, b._detectNavbar = function () {
            return 0 < d(this._element).closest(".navbar").length
        }, b._getOffset = function () {
            var e = this, t = {};
            return "function" == typeof this._config.offset ? t.fn = function (t) {
                return t.offsets = a({}, t.offsets, e._config.offset(t.offsets, e._element) || {}), t
            } : t.offset = this._config.offset, t
        }, b._getPopperConfig = function () {
            var t = {
                placement: this._getPlacement(),
                modifiers: {
                    offset: this._getOffset(),
                    flip: {enabled: this._config.flip},
                    preventOverflow: {boundariesElement: this._config.boundary}
                }
            };
            return "static" === this._config.display && (t.modifiers.applyStyle = {enabled: !1}), t
        }, ut._jQueryInterface = function (e) {
            return this.each(function () {
                var t = d(this).data(X);
                if (t || (t = new ut(this, "object" == typeof e ? e : null), d(this).data(X, t)), "string" == typeof e) {
                    if (void 0 === t[e]) throw new TypeError('No method named "' + e + '"');
                    t[e]()
                }
            })
        }, ut._clearMenus = function (t) {
            if (!t || 3 !== t.which && ("keyup" !== t.type || 9 === t.which)) for (var e = [].slice.call(document.querySelectorAll(at)), i = 0, n = e.length; i < n; i++) {
                var s, o = ut._getParentFromElement(e[i]), a = d(e[i]).data(X), r = {relatedTarget: e[i]};
                t && "click" === t.type && (r.clickEvent = t), a && (s = a._menu, !d(o).hasClass(st) || t && ("click" === t.type && /input|textarea/i.test(t.target.tagName) || "keyup" === t.type && 9 === t.which) && d.contains(o, t.target) || (a = d.Event(it.HIDE, r), d(o).trigger(a), a.isDefaultPrevented() || ("ontouchstart" in document.documentElement && d(document.body).children().off("mouseover", null, d.noop), e[i].setAttribute("aria-expanded", "false"), d(s).removeClass(st), d(o).removeClass(st).trigger(d.Event(it.HIDDEN, r)))))
            }
        }, ut._getParentFromElement = function (t) {
            var e, i = u.getSelectorFromElement(t);
            return i && (e = document.querySelector(i)), e || t.parentNode
        }, ut._dataApiKeydownHandler = function (t) {
            var e, i, n;
            (/input|textarea/i.test(t.target.tagName) ? 32 === t.which || 27 !== t.which && (40 !== t.which && 38 !== t.which || d(t.target).closest(rt).length) : !et.test(t.which)) || (t.preventDefault(), t.stopPropagation(), this.disabled || d(this).hasClass(nt)) || (n = ut._getParentFromElement(this), (i = d(n).hasClass(st)) && (!i || 27 !== t.which && 32 !== t.which) ? 0 !== (e = [].slice.call(n.querySelectorAll(".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)"))).length && (i = e.indexOf(t.target), 38 === t.which && 0 < i && i--, 40 === t.which && i < e.length - 1 && i++, i < 0 && (i = 0), e[i].focus()) : (27 === t.which && (n = n.querySelector(at), d(n).trigger("focus")), d(this).trigger("click")))
        }, o(ut, null, [{
            key: "VERSION", get: function () {
                return "4.3.1"
            }
        }, {
            key: "Default", get: function () {
                return lt
            }
        }, {
            key: "DefaultType", get: function () {
                return ct
            }
        }]), ut);

    function ut(t, e) {
        this._element = t, this._popper = null, this._config = this._getConfig(e), this._menu = this._getMenuElement(), this._inNavbar = this._detectNavbar(), this._addEventListeners()
    }

    d(document).on(it.KEYDOWN_DATA_API, at, dt._dataApiKeydownHandler).on(it.KEYDOWN_DATA_API, rt, dt._dataApiKeydownHandler).on(it.CLICK_DATA_API + " " + it.KEYUP_DATA_API, dt._clearMenus).on(it.CLICK_DATA_API, at, function (t) {
        t.preventDefault(), t.stopPropagation(), dt._jQueryInterface.call(d(this), "toggle")
    }).on(it.CLICK_DATA_API, ".dropdown form", function (t) {
        t.stopPropagation()
    }), d.fn[Y] = dt._jQueryInterface, d.fn[Y].Constructor = dt, d.fn[Y].noConflict = function () {
        return d.fn[Y] = tt, dt._jQueryInterface
    };
    var ht = "modal", pt = "bs.modal", ft = "." + pt, mt = d.fn[ht],
        gt = {backdrop: !0, keyboard: !0, focus: !0, show: !0},
        vt = {backdrop: "(boolean|string)", keyboard: "boolean", focus: "boolean", show: "boolean"}, yt = {
            HIDE: "hide" + ft,
            HIDDEN: "hidden" + ft,
            SHOW: "show" + ft,
            SHOWN: "shown" + ft,
            FOCUSIN: "focusin" + ft,
            RESIZE: "resize" + ft,
            CLICK_DISMISS: "click.dismiss" + ft,
            KEYDOWN_DISMISS: "keydown.dismiss" + ft,
            MOUSEUP_DISMISS: "mouseup.dismiss" + ft,
            MOUSEDOWN_DISMISS: "mousedown.dismiss" + ft,
            CLICK_DATA_API: "click" + ft + ".data-api"
        }, wt = "modal-open", _t = "fade", bt = "show", xt = ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",
        Ct = ".sticky-top", St = ((b = Tt.prototype).toggle = function (t) {
            return this._isShown ? this.hide() : this.show(t)
        }, b.show = function (t) {
            var e, i = this;
            this._isShown || this._isTransitioning || (d(this._element).hasClass(_t) && (this._isTransitioning = !0), e = d.Event(yt.SHOW, {relatedTarget: t}), d(this._element).trigger(e), this._isShown || e.isDefaultPrevented() || (this._isShown = !0, this._checkScrollbar(), this._setScrollbar(), this._adjustDialog(), this._setEscapeEvent(), this._setResizeEvent(), d(this._element).on(yt.CLICK_DISMISS, '[data-dismiss="modal"]', function (t) {
                return i.hide(t)
            }), d(this._dialog).on(yt.MOUSEDOWN_DISMISS, function () {
                d(i._element).one(yt.MOUSEUP_DISMISS, function (t) {
                    d(t.target).is(i._element) && (i._ignoreBackdropClick = !0)
                })
            }), this._showBackdrop(function () {
                return i._showElement(t)
            })))
        }, b.hide = function (t) {
            var e = this;
            t && t.preventDefault(), this._isShown && !this._isTransitioning && (t = d.Event(yt.HIDE), d(this._element).trigger(t), this._isShown && !t.isDefaultPrevented() && (this._isShown = !1, (t = d(this._element).hasClass(_t)) && (this._isTransitioning = !0), this._setEscapeEvent(), this._setResizeEvent(), d(document).off(yt.FOCUSIN), d(this._element).removeClass(bt), d(this._element).off(yt.CLICK_DISMISS), d(this._dialog).off(yt.MOUSEDOWN_DISMISS), t ? (t = u.getTransitionDurationFromElement(this._element), d(this._element).one(u.TRANSITION_END, function (t) {
                return e._hideModal(t)
            }).emulateTransitionEnd(t)) : this._hideModal()))
        }, b.dispose = function () {
            [window, this._element, this._dialog].forEach(function (t) {
                return d(t).off(ft)
            }), d(document).off(yt.FOCUSIN), d.removeData(this._element, pt), this._config = null, this._element = null, this._dialog = null, this._backdrop = null, this._isShown = null, this._isBodyOverflowing = null, this._ignoreBackdropClick = null, this._isTransitioning = null, this._scrollbarWidth = null
        }, b.handleUpdate = function () {
            this._adjustDialog()
        }, b._getConfig = function (t) {
            return t = a({}, gt, t), u.typeCheckConfig(ht, t, vt), t
        }, b._showElement = function (t) {
            var e = this, i = d(this._element).hasClass(_t);
            this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE || document.body.appendChild(this._element), this._element.style.display = "block", this._element.removeAttribute("aria-hidden"), this._element.setAttribute("aria-modal", !0), d(this._dialog).hasClass("modal-dialog-scrollable") ? this._dialog.querySelector(".modal-body").scrollTop = 0 : this._element.scrollTop = 0, i && u.reflow(this._element), d(this._element).addClass(bt), this._config.focus && this._enforceFocus();
            var n = d.Event(yt.SHOWN, {relatedTarget: t}), t = function () {
                e._config.focus && e._element.focus(), e._isTransitioning = !1, d(e._element).trigger(n)
            };
            i ? (i = u.getTransitionDurationFromElement(this._dialog), d(this._dialog).one(u.TRANSITION_END, t).emulateTransitionEnd(i)) : t()
        }, b._enforceFocus = function () {
            var e = this;
            d(document).off(yt.FOCUSIN).on(yt.FOCUSIN, function (t) {
                document !== t.target && e._element !== t.target && 0 === d(e._element).has(t.target).length && e._element.focus()
            })
        }, b._setEscapeEvent = function () {
            var e = this;
            this._isShown && this._config.keyboard ? d(this._element).on(yt.KEYDOWN_DISMISS, function (t) {
                27 === t.which && (t.preventDefault(), e.hide())
            }) : this._isShown || d(this._element).off(yt.KEYDOWN_DISMISS)
        }, b._setResizeEvent = function () {
            var e = this;
            this._isShown ? d(window).on(yt.RESIZE, function (t) {
                return e.handleUpdate(t)
            }) : d(window).off(yt.RESIZE)
        }, b._hideModal = function () {
            var t = this;
            this._element.style.display = "none", this._element.setAttribute("aria-hidden", !0), this._element.removeAttribute("aria-modal"), this._isTransitioning = !1, this._showBackdrop(function () {
                d(document.body).removeClass(wt), t._resetAdjustments(), t._resetScrollbar(), d(t._element).trigger(yt.HIDDEN)
            })
        }, b._removeBackdrop = function () {
            this._backdrop && (d(this._backdrop).remove(), this._backdrop = null)
        }, b._showBackdrop = function (t) {
            var e, i = this, n = d(this._element).hasClass(_t) ? _t : "";
            this._isShown && this._config.backdrop ? (this._backdrop = document.createElement("div"), this._backdrop.className = "modal-backdrop", n && this._backdrop.classList.add(n), d(this._backdrop).appendTo(document.body), d(this._element).on(yt.CLICK_DISMISS, function (t) {
                i._ignoreBackdropClick ? i._ignoreBackdropClick = !1 : t.target === t.currentTarget && ("static" === i._config.backdrop ? i._element.focus() : i.hide())
            }), n && u.reflow(this._backdrop), d(this._backdrop).addClass(bt), t && (n ? (e = u.getTransitionDurationFromElement(this._backdrop), d(this._backdrop).one(u.TRANSITION_END, t).emulateTransitionEnd(e)) : t())) : !this._isShown && this._backdrop ? (d(this._backdrop).removeClass(bt), n = function () {
                i._removeBackdrop(), t && t()
            }, d(this._element).hasClass(_t) ? (e = u.getTransitionDurationFromElement(this._backdrop), d(this._backdrop).one(u.TRANSITION_END, n).emulateTransitionEnd(e)) : n()) : t && t()
        }, b._adjustDialog = function () {
            var t = this._element.scrollHeight > document.documentElement.clientHeight;
            !this._isBodyOverflowing && t && (this._element.style.paddingLeft = this._scrollbarWidth + "px"), this._isBodyOverflowing && !t && (this._element.style.paddingRight = this._scrollbarWidth + "px")
        }, b._resetAdjustments = function () {
            this._element.style.paddingLeft = "", this._element.style.paddingRight = ""
        }, b._checkScrollbar = function () {
            var t = document.body.getBoundingClientRect();
            this._isBodyOverflowing = t.left + t.right < window.innerWidth, this._scrollbarWidth = this._getScrollbarWidth()
        }, b._setScrollbar = function () {
            var t, e, s = this;
            this._isBodyOverflowing && (t = [].slice.call(document.querySelectorAll(xt)), e = [].slice.call(document.querySelectorAll(Ct)), d(t).each(function (t, e) {
                var i = e.style.paddingRight, n = d(e).css("padding-right");
                d(e).data("padding-right", i).css("padding-right", parseFloat(n) + s._scrollbarWidth + "px")
            }), d(e).each(function (t, e) {
                var i = e.style.marginRight, n = d(e).css("margin-right");
                d(e).data("margin-right", i).css("margin-right", parseFloat(n) - s._scrollbarWidth + "px")
            }), t = document.body.style.paddingRight, e = d(document.body).css("padding-right"), d(document.body).data("padding-right", t).css("padding-right", parseFloat(e) + this._scrollbarWidth + "px")), d(document.body).addClass(wt)
        }, b._resetScrollbar = function () {
            var t = [].slice.call(document.querySelectorAll(xt));
            d(t).each(function (t, e) {
                var i = d(e).data("padding-right");
                d(e).removeData("padding-right"), e.style.paddingRight = i || ""
            });
            t = [].slice.call(document.querySelectorAll(Ct));
            d(t).each(function (t, e) {
                var i = d(e).data("margin-right");
                void 0 !== i && d(e).css("margin-right", i).removeData("margin-right")
            });
            t = d(document.body).data("padding-right");
            d(document.body).removeData("padding-right"), document.body.style.paddingRight = t || ""
        }, b._getScrollbarWidth = function () {
            var t = document.createElement("div");
            t.className = "modal-scrollbar-measure", document.body.appendChild(t);
            var e = t.getBoundingClientRect().width - t.clientWidth;
            return document.body.removeChild(t), e
        }, Tt._jQueryInterface = function (i, n) {
            return this.each(function () {
                var t = d(this).data(pt), e = a({}, gt, d(this).data(), "object" == typeof i && i ? i : {});
                if (t || (t = new Tt(this, e), d(this).data(pt, t)), "string" == typeof i) {
                    if (void 0 === t[i]) throw new TypeError('No method named "' + i + '"');
                    t[i](n)
                } else e.show && t.show(n)
            })
        }, o(Tt, null, [{
            key: "VERSION", get: function () {
                return "4.3.1"
            }
        }, {
            key: "Default", get: function () {
                return gt
            }
        }]), Tt);

    function Tt(t, e) {
        this._config = this._getConfig(e), this._element = t, this._dialog = t.querySelector(".modal-dialog"), this._backdrop = null, this._isShown = !1, this._isBodyOverflowing = !1, this._ignoreBackdropClick = !1, this._isTransitioning = !1, this._scrollbarWidth = 0
    }

    d(document).on(yt.CLICK_DATA_API, '[data-toggle="modal"]', function (t) {
        var e, i = this, n = u.getSelectorFromElement(this);
        n && (e = document.querySelector(n));
        n = d(e).data(pt) ? "toggle" : a({}, d(e).data(), d(this).data());
        "A" !== this.tagName && "AREA" !== this.tagName || t.preventDefault();
        var s = d(e).one(yt.SHOW, function (t) {
            t.isDefaultPrevented() || s.one(yt.HIDDEN, function () {
                d(i).is(":visible") && i.focus()
            })
        });
        St._jQueryInterface.call(d(e), n, this)
    }), d.fn[ht] = St._jQueryInterface, d.fn[ht].Constructor = St, d.fn[ht].noConflict = function () {
        return d.fn[ht] = mt, St._jQueryInterface
    };
    var Et = ["background", "cite", "href", "itemtype", "longdesc", "poster", "src", "xlink:href"],
        kt = /^(?:(?:https?|mailto|ftp|tel|file):|[^&:\/?#]*(?:[\/?#]|$))/gi,
        It = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+\/]+=*$/i,
        At = "tooltip", Dt = "bs.tooltip", jt = "." + Dt, $t = d.fn[At], Mt = "bs-tooltip",
        Ot = new RegExp("(^|\\s)" + Mt + "\\S+", "g"), Pt = ["sanitize", "whiteList", "sanitizeFn"], Nt = {
            animation: "boolean",
            template: "string",
            title: "(string|element|function)",
            trigger: "string",
            delay: "(number|object)",
            html: "boolean",
            selector: "(string|boolean)",
            placement: "(string|function)",
            offset: "(number|string|function)",
            container: "(string|element|boolean)",
            fallbackPlacement: "(string|array)",
            boundary: "(string|element)",
            sanitize: "boolean",
            sanitizeFn: "(null|function)",
            whiteList: "object"
        }, zt = {AUTO: "auto", TOP: "top", RIGHT: "right", BOTTOM: "bottom", LEFT: "left"}, Lt = {
            animation: !0,
            template: '<div class="tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>',
            trigger: "hover focus",
            title: "",
            delay: 0,
            html: !1,
            selector: !1,
            placement: "top",
            offset: 0,
            container: !1,
            fallbackPlacement: "flip",
            boundary: "scrollParent",
            sanitize: !0,
            sanitizeFn: null,
            whiteList: {
                "*": ["class", "dir", "id", "lang", "role", /^aria-[\w-]*$/i],
                a: ["target", "href", "title", "rel"],
                area: [],
                b: [],
                br: [],
                col: [],
                code: [],
                div: [],
                em: [],
                hr: [],
                h1: [],
                h2: [],
                h3: [],
                h4: [],
                h5: [],
                h6: [],
                i: [],
                img: ["src", "alt", "title", "width", "height"],
                li: [],
                ol: [],
                p: [],
                pre: [],
                s: [],
                small: [],
                span: [],
                sub: [],
                sup: [],
                strong: [],
                u: [],
                ul: []
            }
        }, Ft = "show", Ht = {
            HIDE: "hide" + jt,
            HIDDEN: "hidden" + jt,
            SHOW: "show" + jt,
            SHOWN: "shown" + jt,
            INSERTED: "inserted" + jt,
            CLICK: "click" + jt,
            FOCUSIN: "focusin" + jt,
            FOCUSOUT: "focusout" + jt,
            MOUSEENTER: "mouseenter" + jt,
            MOUSELEAVE: "mouseleave" + jt
        }, Wt = "fade", Rt = "show", Bt = "hover", qt = "focus", Ut = ((b = Qt.prototype).enable = function () {
            this._isEnabled = !0
        }, b.disable = function () {
            this._isEnabled = !1
        }, b.toggleEnabled = function () {
            this._isEnabled = !this._isEnabled
        }, b.toggle = function (t) {
            var e, i;
            this._isEnabled && (t ? (e = this.constructor.DATA_KEY, (i = d(t.currentTarget).data(e)) || (i = new this.constructor(t.currentTarget, this._getDelegateConfig()), d(t.currentTarget).data(e, i)), i._activeTrigger.click = !i._activeTrigger.click, i._isWithActiveTrigger() ? i._enter(null, i) : i._leave(null, i)) : d(this.getTipElement()).hasClass(Rt) ? this._leave(null, this) : this._enter(null, this))
        }, b.dispose = function () {
            clearTimeout(this._timeout), d.removeData(this.element, this.constructor.DATA_KEY), d(this.element).off(this.constructor.EVENT_KEY), d(this.element).closest(".modal").off("hide.bs.modal"), this.tip && d(this.tip).remove(), this._isEnabled = null, this._timeout = null, this._hoverState = null, (this._activeTrigger = null) !== this._popper && this._popper.destroy(), this._popper = null, this.element = null, this.config = null, this.tip = null
        }, b.show = function () {
            var e = this;
            if ("none" === d(this.element).css("display")) throw new Error("Please use show on visible elements");
            var t, i, n = d.Event(this.constructor.Event.SHOW);
            this.isWithContent() && this._isEnabled && (d(this.element).trigger(n), i = u.findShadowRoot(this.element), t = d.contains(null !== i ? i : this.element.ownerDocument.documentElement, this.element), !n.isDefaultPrevented() && t && (i = this.getTipElement(), n = u.getUID(this.constructor.NAME), i.setAttribute("id", n), this.element.setAttribute("aria-describedby", n), this.setContent(), this.config.animation && d(i).addClass(Wt), t = "function" == typeof this.config.placement ? this.config.placement.call(this, i, this.element) : this.config.placement, n = this._getAttachment(t), this.addAttachmentClass(n), t = this._getContainer(), d(i).data(this.constructor.DATA_KEY, this), d.contains(this.element.ownerDocument.documentElement, this.tip) || d(i).appendTo(t), d(this.element).trigger(this.constructor.Event.INSERTED), this._popper = new s(this.element, i, {
                placement: n,
                modifiers: {
                    offset: this._getOffset(),
                    flip: {behavior: this.config.fallbackPlacement},
                    arrow: {element: ".arrow"},
                    preventOverflow: {boundariesElement: this.config.boundary}
                },
                onCreate: function (t) {
                    t.originalPlacement !== t.placement && e._handlePopperPlacementChange(t)
                },
                onUpdate: function (t) {
                    return e._handlePopperPlacementChange(t)
                }
            }), d(i).addClass(Rt), "ontouchstart" in document.documentElement && d(document.body).children().on("mouseover", null, d.noop), n = function () {
                e.config.animation && e._fixTransition();
                var t = e._hoverState;
                e._hoverState = null, d(e.element).trigger(e.constructor.Event.SHOWN), "out" === t && e._leave(null, e)
            }, d(this.tip).hasClass(Wt) ? (i = u.getTransitionDurationFromElement(this.tip), d(this.tip).one(u.TRANSITION_END, n).emulateTransitionEnd(i)) : n()))
        }, b.hide = function (t) {
            function e() {
                i._hoverState !== Ft && n.parentNode && n.parentNode.removeChild(n), i._cleanTipClass(), i.element.removeAttribute("aria-describedby"), d(i.element).trigger(i.constructor.Event.HIDDEN), null !== i._popper && i._popper.destroy(), t && t()
            }

            var i = this, n = this.getTipElement(), s = d.Event(this.constructor.Event.HIDE);
            d(this.element).trigger(s), s.isDefaultPrevented() || (d(n).removeClass(Rt), "ontouchstart" in document.documentElement && d(document.body).children().off("mouseover", null, d.noop), this._activeTrigger.click = !1, this._activeTrigger[qt] = !1, this._activeTrigger[Bt] = !1, d(this.tip).hasClass(Wt) ? (s = u.getTransitionDurationFromElement(n), d(n).one(u.TRANSITION_END, e).emulateTransitionEnd(s)) : e(), this._hoverState = "")
        }, b.update = function () {
            null !== this._popper && this._popper.scheduleUpdate()
        }, b.isWithContent = function () {
            return Boolean(this.getTitle())
        }, b.addAttachmentClass = function (t) {
            d(this.getTipElement()).addClass(Mt + "-" + t)
        }, b.getTipElement = function () {
            return this.tip = this.tip || d(this.config.template)[0], this.tip
        }, b.setContent = function () {
            var t = this.getTipElement();
            this.setElementContent(d(t.querySelectorAll(".tooltip-inner")), this.getTitle()), d(t).removeClass(Wt + " " + Rt)
        }, b.setElementContent = function (t, e) {
            "object" != typeof e || !e.nodeType && !e.jquery ? this.config.html ? (this.config.sanitize && (e = i(e, this.config.whiteList, this.config.sanitizeFn)), t.html(e)) : t.text(e) : this.config.html ? d(e).parent().is(t) || t.empty().append(e) : t.text(d(e).text())
        }, b.getTitle = function () {
            return this.element.getAttribute("data-original-title") || ("function" == typeof this.config.title ? this.config.title.call(this.element) : this.config.title)
        }, b._getOffset = function () {
            var e = this, t = {};
            return "function" == typeof this.config.offset ? t.fn = function (t) {
                return t.offsets = a({}, t.offsets, e.config.offset(t.offsets, e.element) || {}), t
            } : t.offset = this.config.offset, t
        }, b._getContainer = function () {
            return !1 === this.config.container ? document.body : u.isElement(this.config.container) ? d(this.config.container) : d(document).find(this.config.container)
        }, b._getAttachment = function (t) {
            return zt[t.toUpperCase()]
        }, b._setListeners = function () {
            var i = this;
            this.config.trigger.split(" ").forEach(function (t) {
                var e;
                "click" === t ? d(i.element).on(i.constructor.Event.CLICK, i.config.selector, function (t) {
                    return i.toggle(t)
                }) : "manual" !== t && (e = t === Bt ? i.constructor.Event.MOUSEENTER : i.constructor.Event.FOCUSIN, t = t === Bt ? i.constructor.Event.MOUSELEAVE : i.constructor.Event.FOCUSOUT, d(i.element).on(e, i.config.selector, function (t) {
                    return i._enter(t)
                }).on(t, i.config.selector, function (t) {
                    return i._leave(t)
                }))
            }), d(this.element).closest(".modal").on("hide.bs.modal", function () {
                i.element && i.hide()
            }), this.config.selector ? this.config = a({}, this.config, {
                trigger: "manual",
                selector: ""
            }) : this._fixTitle()
        }, b._fixTitle = function () {
            var t = typeof this.element.getAttribute("data-original-title");
            !this.element.getAttribute("title") && "string" == t || (this.element.setAttribute("data-original-title", this.element.getAttribute("title") || ""), this.element.setAttribute("title", ""))
        }, b._enter = function (t, e) {
            var i = this.constructor.DATA_KEY;
            (e = e || d(t.currentTarget).data(i)) || (e = new this.constructor(t.currentTarget, this._getDelegateConfig()), d(t.currentTarget).data(i, e)), t && (e._activeTrigger["focusin" === t.type ? qt : Bt] = !0), d(e.getTipElement()).hasClass(Rt) || e._hoverState === Ft ? e._hoverState = Ft : (clearTimeout(e._timeout), e._hoverState = Ft, e.config.delay && e.config.delay.show ? e._timeout = setTimeout(function () {
                e._hoverState === Ft && e.show()
            }, e.config.delay.show) : e.show())
        }, b._leave = function (t, e) {
            var i = this.constructor.DATA_KEY;
            (e = e || d(t.currentTarget).data(i)) || (e = new this.constructor(t.currentTarget, this._getDelegateConfig()), d(t.currentTarget).data(i, e)), t && (e._activeTrigger["focusout" === t.type ? qt : Bt] = !1), e._isWithActiveTrigger() || (clearTimeout(e._timeout), e._hoverState = "out", e.config.delay && e.config.delay.hide ? e._timeout = setTimeout(function () {
                "out" === e._hoverState && e.hide()
            }, e.config.delay.hide) : e.hide())
        }, b._isWithActiveTrigger = function () {
            for (var t in this._activeTrigger) if (this._activeTrigger[t]) return !0;
            return !1
        }, b._getConfig = function (t) {
            var e = d(this.element).data();
            return Object.keys(e).forEach(function (t) {
                -1 !== Pt.indexOf(t) && delete e[t]
            }), "number" == typeof (t = a({}, this.constructor.Default, e, "object" == typeof t && t ? t : {})).delay && (t.delay = {
                show: t.delay,
                hide: t.delay
            }), "number" == typeof t.title && (t.title = t.title.toString()), "number" == typeof t.content && (t.content = t.content.toString()), u.typeCheckConfig(At, t, this.constructor.DefaultType), t.sanitize && (t.template = i(t.template, t.whiteList, t.sanitizeFn)), t
        }, b._getDelegateConfig = function () {
            var t = {};
            if (this.config) for (var e in this.config) this.constructor.Default[e] !== this.config[e] && (t[e] = this.config[e]);
            return t
        }, b._cleanTipClass = function () {
            var t = d(this.getTipElement()), e = t.attr("class").match(Ot);
            null !== e && e.length && t.removeClass(e.join(""))
        }, b._handlePopperPlacementChange = function (t) {
            var e = t.instance;
            this.tip = e.popper, this._cleanTipClass(), this.addAttachmentClass(this._getAttachment(t.placement))
        }, b._fixTransition = function () {
            var t = this.getTipElement(), e = this.config.animation;
            null === t.getAttribute("x-placement") && (d(t).removeClass(Wt), this.config.animation = !1, this.hide(), this.show(), this.config.animation = e)
        }, Qt._jQueryInterface = function (i) {
            return this.each(function () {
                var t = d(this).data(Dt), e = "object" == typeof i && i;
                if ((t || !/dispose|hide/.test(i)) && (t || (t = new Qt(this, e), d(this).data(Dt, t)), "string" == typeof i)) {
                    if (void 0 === t[i]) throw new TypeError('No method named "' + i + '"');
                    t[i]()
                }
            })
        }, o(Qt, null, [{
            key: "VERSION", get: function () {
                return "4.3.1"
            }
        }, {
            key: "Default", get: function () {
                return Lt
            }
        }, {
            key: "NAME", get: function () {
                return At
            }
        }, {
            key: "DATA_KEY", get: function () {
                return Dt
            }
        }, {
            key: "Event", get: function () {
                return Ht
            }
        }, {
            key: "EVENT_KEY", get: function () {
                return jt
            }
        }, {
            key: "DefaultType", get: function () {
                return Nt
            }
        }]), Qt);

    function Qt(t, e) {
        if (void 0 === s) throw new TypeError("Bootstrap's tooltips require Popper.js (https://popper.js.org/)");
        this._isEnabled = !0, this._timeout = 0, this._hoverState = "", this._activeTrigger = {}, this._popper = null, this.element = t, this.config = this._getConfig(e), this.tip = null, this._setListeners()
    }

    d.fn[At] = Ut._jQueryInterface, d.fn[At].Constructor = Ut, d.fn[At].noConflict = function () {
        return d.fn[At] = $t, Ut._jQueryInterface
    };
    var Vt = "popover", Zt = "bs.popover", Kt = "." + Zt, Gt = d.fn[Vt], Yt = "bs-popover",
        Xt = new RegExp("(^|\\s)" + Yt + "\\S+", "g"), Jt = a({}, Ut.Default, {
            placement: "right",
            trigger: "click",
            content: "",
            template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'
        }), te = a({}, Ut.DefaultType, {content: "(string|element|function)"}), ee = {
            HIDE: "hide" + Kt,
            HIDDEN: "hidden" + Kt,
            SHOW: "show" + Kt,
            SHOWN: "shown" + Kt,
            INSERTED: "inserted" + Kt,
            CLICK: "click" + Kt,
            FOCUSIN: "focusin" + Kt,
            FOCUSOUT: "focusout" + Kt,
            MOUSEENTER: "mouseenter" + Kt,
            MOUSELEAVE: "mouseleave" + Kt
        }, ie = function (t) {
            function n() {
                return t.apply(this, arguments) || this
            }

            var e, i = t;
            (e = n).prototype = Object.create(i.prototype), (e.prototype.constructor = e).__proto__ = i;
            i = n.prototype;
            return i.isWithContent = function () {
                return this.getTitle() || this._getContent()
            }, i.addAttachmentClass = function (t) {
                d(this.getTipElement()).addClass(Yt + "-" + t)
            }, i.getTipElement = function () {
                return this.tip = this.tip || d(this.config.template)[0], this.tip
            }, i.setContent = function () {
                var t = d(this.getTipElement());
                this.setElementContent(t.find(".popover-header"), this.getTitle());
                var e = this._getContent();
                "function" == typeof e && (e = e.call(this.element)), this.setElementContent(t.find(".popover-body"), e), t.removeClass("fade show")
            }, i._getContent = function () {
                return this.element.getAttribute("data-content") || this.config.content
            }, i._cleanTipClass = function () {
                var t = d(this.getTipElement()), e = t.attr("class").match(Xt);
                null !== e && 0 < e.length && t.removeClass(e.join(""))
            }, n._jQueryInterface = function (i) {
                return this.each(function () {
                    var t = d(this).data(Zt), e = "object" == typeof i ? i : null;
                    if ((t || !/dispose|hide/.test(i)) && (t || (t = new n(this, e), d(this).data(Zt, t)), "string" == typeof i)) {
                        if (void 0 === t[i]) throw new TypeError('No method named "' + i + '"');
                        t[i]()
                    }
                })
            }, o(n, null, [{
                key: "VERSION", get: function () {
                    return "4.3.1"
                }
            }, {
                key: "Default", get: function () {
                    return Jt
                }
            }, {
                key: "NAME", get: function () {
                    return Vt
                }
            }, {
                key: "DATA_KEY", get: function () {
                    return Zt
                }
            }, {
                key: "Event", get: function () {
                    return ee
                }
            }, {
                key: "EVENT_KEY", get: function () {
                    return Kt
                }
            }, {
                key: "DefaultType", get: function () {
                    return te
                }
            }]), n
        }(Ut);
    d.fn[Vt] = ie._jQueryInterface, d.fn[Vt].Constructor = ie, d.fn[Vt].noConflict = function () {
        return d.fn[Vt] = Gt, ie._jQueryInterface
    };
    var ne = "scrollspy", se = "bs.scrollspy", oe = "." + se, ae = d.fn[ne],
        re = {offset: 10, method: "auto", target: ""},
        le = {offset: "number", method: "string", target: "(string|element)"},
        ce = {ACTIVATE: "activate" + oe, SCROLL: "scroll" + oe, LOAD_DATA_API: "load" + oe + ".data-api"},
        de = "active", ue = ".nav, .list-group", he = ".nav-link", pe = ".list-group-item", fe = "position",
        me = ((b = ge.prototype).refresh = function () {
            var e = this, t = this._scrollElement === this._scrollElement.window ? "offset" : fe,
                n = "auto" === this._config.method ? t : this._config.method, s = n === fe ? this._getScrollTop() : 0;
            this._offsets = [], this._targets = [], this._scrollHeight = this._getScrollHeight(), [].slice.call(document.querySelectorAll(this._selector)).map(function (t) {
                var e, i = u.getSelectorFromElement(t);
                if (i && (e = document.querySelector(i)), e) {
                    t = e.getBoundingClientRect();
                    if (t.width || t.height) return [d(e)[n]().top + s, i]
                }
                return null
            }).filter(function (t) {
                return t
            }).sort(function (t, e) {
                return t[0] - e[0]
            }).forEach(function (t) {
                e._offsets.push(t[0]), e._targets.push(t[1])
            })
        }, b.dispose = function () {
            d.removeData(this._element, se), d(this._scrollElement).off(oe), this._element = null, this._scrollElement = null, this._config = null, this._selector = null, this._offsets = null, this._targets = null, this._activeTarget = null, this._scrollHeight = null
        }, b._getConfig = function (t) {
            var e;
            return "string" != typeof (t = a({}, re, "object" == typeof t && t ? t : {})).target && ((e = d(t.target).attr("id")) || (e = u.getUID(ne), d(t.target).attr("id", e)), t.target = "#" + e), u.typeCheckConfig(ne, t, le), t
        }, b._getScrollTop = function () {
            return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop
        }, b._getScrollHeight = function () {
            return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
        }, b._getOffsetHeight = function () {
            return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height
        }, b._process = function () {
            var t = this._getScrollTop() + this._config.offset, e = this._getScrollHeight(),
                i = this._config.offset + e - this._getOffsetHeight();
            if (this._scrollHeight !== e && this.refresh(), i <= t) {
                i = this._targets[this._targets.length - 1];
                this._activeTarget !== i && this._activate(i)
            } else {
                if (this._activeTarget && t < this._offsets[0] && 0 < this._offsets[0]) return this._activeTarget = null, void this._clear();
                for (var n = this._offsets.length; n--;) this._activeTarget !== this._targets[n] && t >= this._offsets[n] && (void 0 === this._offsets[n + 1] || t < this._offsets[n + 1]) && this._activate(this._targets[n])
            }
        }, b._activate = function (e) {
            this._activeTarget = e, this._clear();
            var t = this._selector.split(",").map(function (t) {
                return t + '[data-target="' + e + '"],' + t + '[href="' + e + '"]'
            }), t = d([].slice.call(document.querySelectorAll(t.join(","))));
            t.hasClass("dropdown-item") ? (t.closest(".dropdown").find(".dropdown-toggle").addClass(de), t.addClass(de)) : (t.addClass(de), t.parents(ue).prev(he + ", " + pe).addClass(de), t.parents(ue).prev(".nav-item").children(he).addClass(de)), d(this._scrollElement).trigger(ce.ACTIVATE, {relatedTarget: e})
        }, b._clear = function () {
            [].slice.call(document.querySelectorAll(this._selector)).filter(function (t) {
                return t.classList.contains(de)
            }).forEach(function (t) {
                return t.classList.remove(de)
            })
        }, ge._jQueryInterface = function (e) {
            return this.each(function () {
                var t = d(this).data(se);
                if (t || (t = new ge(this, "object" == typeof e && e), d(this).data(se, t)), "string" == typeof e) {
                    if (void 0 === t[e]) throw new TypeError('No method named "' + e + '"');
                    t[e]()
                }
            })
        }, o(ge, null, [{
            key: "VERSION", get: function () {
                return "4.3.1"
            }
        }, {
            key: "Default", get: function () {
                return re
            }
        }]), ge);

    function ge(t, e) {
        var i = this;
        this._element = t, this._scrollElement = "BODY" === t.tagName ? window : t, this._config = this._getConfig(e), this._selector = this._config.target + " " + he + "," + this._config.target + " " + pe + "," + this._config.target + " .dropdown-item", this._offsets = [], this._targets = [], this._activeTarget = null, this._scrollHeight = 0, d(this._scrollElement).on(ce.SCROLL, function (t) {
            return i._process(t)
        }), this.refresh(), this._process()
    }

    d(window).on(ce.LOAD_DATA_API, function () {
        for (var t = [].slice.call(document.querySelectorAll('[data-spy="scroll"]')), e = t.length; e--;) {
            var i = d(t[e]);
            me._jQueryInterface.call(i, i.data())
        }
    }), d.fn[ne] = me._jQueryInterface, d.fn[ne].Constructor = me, d.fn[ne].noConflict = function () {
        return d.fn[ne] = ae, me._jQueryInterface
    };
    var ve = "bs.tab", b = "." + ve, ye = d.fn.tab, we = {
        HIDE: "hide" + b,
        HIDDEN: "hidden" + b,
        SHOW: "show" + b,
        SHOWN: "shown" + b,
        CLICK_DATA_API: "click" + b + ".data-api"
    }, _e = "active", be = ".active", xe = "> li > .active", Ce = ((b = Se.prototype).show = function () {
        var t, e, i, n, s, o, a = this;
        this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && d(this._element).hasClass(_e) || d(this._element).hasClass("disabled") || (o = d(this._element).closest(".nav, .list-group")[0], e = u.getSelectorFromElement(this._element), o && (s = "UL" === o.nodeName || "OL" === o.nodeName ? xe : be, i = (i = d.makeArray(d(o).find(s)))[i.length - 1]), n = d.Event(we.HIDE, {relatedTarget: this._element}), s = d.Event(we.SHOW, {relatedTarget: i}), i && d(i).trigger(n), d(this._element).trigger(s), s.isDefaultPrevented() || n.isDefaultPrevented() || (e && (t = document.querySelector(e)), this._activate(this._element, o), o = function () {
            var t = d.Event(we.HIDDEN, {relatedTarget: a._element}), e = d.Event(we.SHOWN, {relatedTarget: i});
            d(i).trigger(t), d(a._element).trigger(e)
        }, t ? this._activate(t, t.parentNode, o) : o()))
    }, b.dispose = function () {
        d.removeData(this._element, ve), this._element = null
    }, b._activate = function (t, e, i) {
        var n = this, s = (!e || "UL" !== e.nodeName && "OL" !== e.nodeName ? d(e).children(be) : d(e).find(xe))[0],
            o = i && s && d(s).hasClass("fade"), e = function () {
                return n._transitionComplete(t, s, i)
            };
        s && o ? (o = u.getTransitionDurationFromElement(s), d(s).removeClass("show").one(u.TRANSITION_END, e).emulateTransitionEnd(o)) : e()
    }, b._transitionComplete = function (t, e, i) {
        var n;
        e && (d(e).removeClass(_e), (n = d(e.parentNode).find("> .dropdown-menu .active")[0]) && d(n).removeClass(_e), "tab" === e.getAttribute("role") && e.setAttribute("aria-selected", !1)), d(t).addClass(_e), "tab" === t.getAttribute("role") && t.setAttribute("aria-selected", !0), u.reflow(t), t.classList.contains("fade") && t.classList.add("show"), t.parentNode && d(t.parentNode).hasClass("dropdown-menu") && ((e = d(t).closest(".dropdown")[0]) && (e = [].slice.call(e.querySelectorAll(".dropdown-toggle")), d(e).addClass(_e)), t.setAttribute("aria-expanded", !0)), i && i()
    }, Se._jQueryInterface = function (i) {
        return this.each(function () {
            var t = d(this), e = t.data(ve);
            if (e || (e = new Se(this), t.data(ve, e)), "string" == typeof i) {
                if (void 0 === e[i]) throw new TypeError('No method named "' + i + '"');
                e[i]()
            }
        })
    }, o(Se, null, [{
        key: "VERSION", get: function () {
            return "4.3.1"
        }
    }]), Se);

    function Se(t) {
        this._element = t
    }

    d(document).on(we.CLICK_DATA_API, '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]', function (t) {
        t.preventDefault(), Ce._jQueryInterface.call(d(this), "show")
    }), d.fn.tab = Ce._jQueryInterface, d.fn.tab.Constructor = Ce, d.fn.tab.noConflict = function () {
        return d.fn.tab = ye, Ce._jQueryInterface
    };
    var Te = "toast", Ee = "bs.toast", b = "." + Ee, ke = d.fn[Te], Ie = {
            CLICK_DISMISS: "click.dismiss" + b,
            HIDE: "hide" + b,
            HIDDEN: "hidden" + b,
            SHOW: "show" + b,
            SHOWN: "shown" + b
        }, Ae = "show", De = "showing", je = {animation: "boolean", autohide: "boolean", delay: "number"},
        $e = {animation: !0, autohide: !0, delay: 500}, Me = ((b = Oe.prototype).show = function () {
            var t = this;
            d(this._element).trigger(Ie.SHOW), this._config.animation && this._element.classList.add("fade");

            function e() {
                t._element.classList.remove(De), t._element.classList.add(Ae), d(t._element).trigger(Ie.SHOWN), t._config.autohide && t.hide()
            }

            var i;
            this._element.classList.remove("hide"), this._element.classList.add(De), this._config.animation ? (i = u.getTransitionDurationFromElement(this._element), d(this._element).one(u.TRANSITION_END, e).emulateTransitionEnd(i)) : e()
        }, b.hide = function (t) {
            var e = this;
            this._element.classList.contains(Ae) && (d(this._element).trigger(Ie.HIDE), t ? this._close() : this._timeout = setTimeout(function () {
                e._close()
            }, this._config.delay))
        }, b.dispose = function () {
            clearTimeout(this._timeout), this._timeout = null, this._element.classList.contains(Ae) && this._element.classList.remove(Ae), d(this._element).off(Ie.CLICK_DISMISS), d.removeData(this._element, Ee), this._element = null, this._config = null
        }, b._getConfig = function (t) {
            return t = a({}, $e, d(this._element).data(), "object" == typeof t && t ? t : {}), u.typeCheckConfig(Te, t, this.constructor.DefaultType), t
        }, b._setListeners = function () {
            var t = this;
            d(this._element).on(Ie.CLICK_DISMISS, '[data-dismiss="toast"]', function () {
                return t.hide(!0)
            })
        }, b._close = function () {
            function t() {
                i._element.classList.add("hide"), d(i._element).trigger(Ie.HIDDEN)
            }

            var e, i = this;
            this._element.classList.remove(Ae), this._config.animation ? (e = u.getTransitionDurationFromElement(this._element), d(this._element).one(u.TRANSITION_END, t).emulateTransitionEnd(e)) : t()
        }, Oe._jQueryInterface = function (i) {
            return this.each(function () {
                var t = d(this), e = t.data(Ee);
                if (e || (e = new Oe(this, "object" == typeof i && i), t.data(Ee, e)), "string" == typeof i) {
                    if (void 0 === e[i]) throw new TypeError('No method named "' + i + '"');
                    e[i](this)
                }
            })
        }, o(Oe, null, [{
            key: "VERSION", get: function () {
                return "4.3.1"
            }
        }, {
            key: "DefaultType", get: function () {
                return je
            }
        }, {
            key: "Default", get: function () {
                return $e
            }
        }]), Oe);

    function Oe(t, e) {
        this._element = t, this._config = this._getConfig(e), this._timeout = null, this._setListeners()
    }

    d.fn[Te] = Me._jQueryInterface, d.fn[Te].Constructor = Me, d.fn[Te].noConflict = function () {
        return d.fn[Te] = ke, Me._jQueryInterface
    }, function () {
        if (void 0 === d) throw new TypeError("Bootstrap's JavaScript requires jQuery. jQuery must be included before Bootstrap's JavaScript.");
        var t = d.fn.jquery.split(" ")[0].split(".");
        if (t[0] < 2 && t[1] < 9 || 1 === t[0] && 9 === t[1] && t[2] < 1 || 4 <= t[0]) throw new Error("Bootstrap's JavaScript requires at least jQuery v1.9.1 but less than v4.0.0")
    }(), t.Util = u, t.Alert = f, t.Button = x, t.Carousel = N, t.Collapse = K, t.Dropdown = dt, t.Modal = St, t.Popover = ie, t.Scrollspy = me, t.Tab = Ce, t.Toast = Me, t.Tooltip = Ut, Object.defineProperty(t, "__esModule", {value: !0})
}), function (t) {
    "use strict";

    function e() {
    }

    function l() {
        try {
            return document.activeElement
        } catch (t) {
        }
    }

    function c(t, e) {
        for (var i = 0, n = t.length; i < n; i++) if (t[i] === e) return 1
    }

    function d(t, e, i) {
        return t.addEventListener ? t.addEventListener(e, i, !1) : t.attachEvent && t.attachEvent("on" + e, i)
    }

    function u(t, e) {
        var i;
        t.createTextRange ? ((i = t.createTextRange()).move("character", e), i.select()) : t.selectionStart && (t.focus(), t.setSelectionRange(e, e))
    }

    function i(t, e) {
        try {
            return t.type = e, 1
        } catch (t) {
            return
        }
    }

    function n(t, e) {
        if (t && t.getAttribute(y)) e(t); else for (var i = t ? t.getElementsByTagName("input") : k, n = t ? t.getElementsByTagName("textarea") : I, s = i ? i.length : 0, o = s + (n ? n.length : 0), a = 0; a < o; a++) e(a < s ? i[a] : n[a - s])
    }

    function h(t) {
        n(t, p)
    }

    function p(t, e) {
        var i = !!e && t.value !== e, e = t.value === t.getAttribute(y);
        if (!i && !e || "true" !== t.getAttribute(w)) return !1;
        t.removeAttribute(w), t.value = t.value.replace(t.getAttribute(y), ""), t.className = t.className.replace(v, "");
        e = t.getAttribute(C);
        0 <= parseInt(e, 10) && (t.setAttribute("maxLength", e), t.removeAttribute(C));
        e = t.getAttribute(_);
        return e && (t.type = e), !0
    }

    function f(t) {
        var e = t.getAttribute(y);
        return !("" !== t.value || !e) && (t.setAttribute(w, "true"), t.value = e, t.className += " " + r, t.getAttribute(C) || (t.setAttribute(C, t.maxLength), t.removeAttribute("maxLength")), t.getAttribute(_) ? t.type = "text" : "password" === t.type && i(t, "text") && t.setAttribute(_, "password"), !0)
    }

    function s(t) {
        var e, i, n, s, o, a, r = t.form;
        r && "string" == typeof r && ((r = document.getElementById(r)).getAttribute(b) || (d(r, "submit", (a = r, function () {
            h(a)
        })), r.setAttribute(b, "true"))), d(t, "focus", (o = t, function () {
            A && o.value === o.getAttribute(y) && "true" === o.getAttribute(w) ? u(o, 0) : p(o)
        })), d(t, "blur", (s = t, function () {
            f(s)
        })), A && (d(t, "keydown", (n = t, function (t) {
            return m = n.value, "true" === n.getAttribute(w) && m === n.getAttribute(y) && c(g, t.keyCode) ? (t.preventDefault && t.preventDefault(), !1) : void 0
        })), d(t, "keyup", (i = t, function () {
            p(i, m), "" === i.value && (i.blur(), u(i, 0))
        })), d(t, "click", (e = t, function () {
            e === l() && e.value === e.getAttribute(y) && "true" === e.getAttribute(w) && u(e, 0)
        }))), t.setAttribute(x, "true"), t.setAttribute(y, j), !A && t === l() || f(t)
    }

    var o = void 0 !== document.createElement("input").placeholder;
    if (t.Placeholders = {
        nativeSupport: o, disable: o ? e : h, enable: o ? e : function (t) {
            n(t, f)
        }
    }, !o) {
        var m, a = ["text", "search", "url", "tel", "email", "password", "number", "textarea"],
            g = [27, 33, 34, 35, 36, 37, 38, 39, 40, 8, 46], r = "placeholdersjs",
            v = new RegExp("(?:^|\\s)" + r + "(?!\\S)"), y = "data-placeholder-value", w = "data-placeholder-active",
            _ = "data-placeholder-type", b = "data-placeholder-submit", x = "data-placeholder-bound",
            C = "data-placeholder-maxlength", S = document.getElementsByTagName("head")[0],
            T = document.documentElement, E = t.Placeholders, k = document.getElementsByTagName("input"),
            I = document.getElementsByTagName("textarea"), A = "false" === T.getAttribute("data-placeholder-focus"),
            D = "false" !== T.getAttribute("data-placeholder-live"), o = document.createElement("style");
        o.type = "text/css";
        T = document.createTextNode("." + r + " {color:#ccc;}");
        o.styleSheet ? o.styleSheet.cssText = T.nodeValue : o.appendChild(T), S.insertBefore(o, S.firstChild);
        for (var j, $, M = 0, O = k.length + I.length; M < O; M++) $ = M < k.length ? k[M] : I[M - k.length], (j = $.attributes.placeholder) && (j = j.nodeValue) && c(a, $.type) && s($);
        var P = setInterval(function () {
            for (var t = 0, e = k.length + I.length; t < e; t++) $ = t < k.length ? k[t] : I[t - k.length], (j = $.attributes.placeholder) ? (j = j.nodeValue) && c(a, $.type) && ($.getAttribute(x) || s($), j === $.getAttribute(y) && ("password" !== $.type || $.getAttribute(_)) || ("password" === $.type && !$.getAttribute(_) && i($, "text") && $.setAttribute(_, "password"), $.value === $.getAttribute(y) && ($.value = j), $.setAttribute(y, j))) : $.getAttribute(w) && (p($), $.removeAttribute(y));
            D || clearInterval(P)
        }, 100);
        d(t, "beforeunload", function () {
            E.disable()
        })
    }
}(this), function (U) {
    var Q = {
        mode: "horizontal",
        slideSelector: "",
        infiniteLoop: !0,
        hideControlOnEnd: !1,
        speed: 500,
        easing: null,
        slideMargin: 0,
        startSlide: 0,
        randomStart: !1,
        captions: !1,
        ticker: !1,
        tickerHover: !1,
        adaptiveHeight: !1,
        adaptiveHeightSpeed: 500,
        video: !1,
        useCSS: !0,
        preloadImages: "visible",
        responsive: !0,
        slideZIndex: 50,
        wrapperClass: "bx-wrapper",
        touchEnabled: !0,
        swipeThreshold: 50,
        oneToOneTouch: !0,
        preventDefaultSwipeX: !0,
        preventDefaultSwipeY: !1,
        ariaLive: !0,
        ariaHidden: !0,
        keyboardEnabled: !1,
        pager: !0,
        pagerType: "full",
        pagerShortSeparator: " / ",
        pagerSelector: null,
        buildPager: null,
        pagerCustom: null,
        controls: !0,
        nextText: "Next",
        prevText: "Prev",
        nextSelector: null,
        prevSelector: null,
        autoControls: !1,
        startText: "Start",
        stopText: "Stop",
        autoControlsCombine: !1,
        autoControlsSelector: null,
        auto: !1,
        pause: 4e3,
        autoStart: !0,
        autoDirection: "next",
        stopAutoOnClick: !1,
        autoHover: !1,
        autoDelay: 0,
        autoSlideForOnePage: !1,
        minSlides: 1,
        maxSlides: 1,
        moveSlides: 0,
        slideWidth: 0,
        shrinkItems: !1,
        onSliderLoad: function () {
            return !0
        },
        onSlideBefore: function () {
            return !0
        },
        onSlideAfter: function () {
            return !0
        },
        onSlideNext: function () {
            return !0
        },
        onSlidePrev: function () {
            return !0
        },
        onSliderResize: function () {
            return !0
        },
        onAutoChange: function () {
            return !0
        }
    };
    U.fn.bxSlider = function (e) {
        if (0 === this.length) return this;
        if (1 < this.length) return this.each(function () {
            U(this).bxSlider(e)
        }), this;
        var c = {}, d = this, n = U(window).width(), s = U(window).height();
        if (!U(d).data("bxSlider")) {
            function o() {
                U(d).data("bxSlider") || (c.settings = U.extend({}, Q, e), c.settings.slideWidth = parseInt(c.settings.slideWidth), c.children = d.children(c.settings.slideSelector), c.children.length < c.settings.minSlides && (c.settings.minSlides = c.children.length), c.children.length < c.settings.maxSlides && (c.settings.maxSlides = c.children.length), c.settings.randomStart && (c.settings.startSlide = Math.floor(Math.random() * c.children.length)), c.active = {index: c.settings.startSlide}, c.carousel = 1 < c.settings.minSlides || 1 < c.settings.maxSlides, c.carousel && (c.settings.preloadImages = "all"), c.minThreshold = c.settings.minSlides * c.settings.slideWidth + (c.settings.minSlides - 1) * c.settings.slideMargin, c.maxThreshold = c.settings.maxSlides * c.settings.slideWidth + (c.settings.maxSlides - 1) * c.settings.slideMargin, c.working = !1, c.controls = {}, c.interval = null, c.animProp = "vertical" === c.settings.mode ? "top" : "left", c.usingCSS = c.settings.useCSS && "fade" !== c.settings.mode && function () {
                    for (var t = document.createElement("div"), e = ["WebkitPerspective", "MozPerspective", "OPerspective", "msPerspective"], i = 0; i < e.length; i++) if (void 0 !== t.style[e[i]]) return c.cssPrefix = e[i].replace("Perspective", "").toLowerCase(), c.animProp = "-" + c.cssPrefix + "-transform", !0;
                    return !1
                }(), "vertical" === c.settings.mode && (c.settings.maxSlides = c.settings.minSlides), d.data("origStyle", d.attr("style")), d.children(c.settings.slideSelector).each(function () {
                    U(this).data("origStyle", U(this).attr("style"))
                }), h())
            }

            function a() {
                var t, e = 1;
                return "horizontal" === c.settings.mode && 0 < c.settings.slideWidth ? e = c.viewport.width() < c.minThreshold ? c.settings.minSlides : c.viewport.width() > c.maxThreshold ? c.settings.maxSlides : (t = c.children.first().width() + c.settings.slideMargin, Math.floor((c.viewport.width() + c.settings.slideMargin) / t) || 1) : "vertical" === c.settings.mode && (e = c.settings.minSlides), e
            }

            function t() {
                for (var t = "", e = "", i = y(), n = 0; n < i; n++) e = "", c.settings.buildPager && U.isFunction(c.settings.buildPager) || c.settings.pagerCustom ? (e = c.settings.buildPager(n), c.pagerEl.addClass("bx-custom-pager")) : (e = n + 1, c.pagerEl.addClass("bx-default-pager")), t += '<div class="bx-pager-item"><a href="" data-slide-index="' + n + '" class="bx-pager-link">' + e + "</a></div>";
                c.pagerEl.html(t)
            }

            function r() {
                d.startAuto()
            }

            function l() {
                d.stopAuto()
            }

            function u(t) {
                var e = a();
                c.settings.ariaHidden && !c.settings.ticker && (c.children.attr("aria-hidden", "true"), c.children.slice(t, t + e).attr("aria-hidden", "false"))
            }

            var h = function () {
                var t = c.children.eq(c.settings.startSlide);
                d.wrap('<div class="' + c.settings.wrapperClass + '"><div class="bx-viewport"></div></div>'), c.viewport = d.parent(), c.settings.ariaLive && !c.settings.ticker && c.viewport.attr("aria-live", "polite"), c.loader = U('<div class="bx-loading" />'), c.viewport.prepend(c.loader), d.css({
                    width: "horizontal" === c.settings.mode ? 1e3 * c.children.length + 215 + "%" : "auto",
                    position: "relative"
                }), c.usingCSS && c.settings.easing ? d.css("-" + c.cssPrefix + "-transition-timing-function", c.settings.easing) : c.settings.easing || (c.settings.easing = "swing"), c.viewport.css({
                    width: "100%",
                    overflow: "hidden",
                    position: "relative"
                }), c.viewport.parent().css({maxWidth: g()}), c.children.css({
                    float: "horizontal" === c.settings.mode ? "left" : "none",
                    listStyle: "none",
                    position: "relative"
                }), c.children.css("width", v()), "horizontal" === c.settings.mode && 0 < c.settings.slideMargin && c.children.css("marginRight", c.settings.slideMargin), "vertical" === c.settings.mode && 0 < c.settings.slideMargin && c.children.css("marginBottom", c.settings.slideMargin), "fade" === c.settings.mode && (c.children.css({
                    position: "absolute",
                    zIndex: 0,
                    display: "none"
                }), c.children.eq(c.settings.startSlide).css({
                    zIndex: c.settings.slideZIndex,
                    display: "block"
                })), c.controls.el = U('<div class="bx-controls" />'), c.settings.captions && T(), c.active.last = c.settings.startSlide === y() - 1, c.settings.video && d.fitVids(), "none" === c.settings.preloadImages ? t = null : "all" !== c.settings.preloadImages && !c.settings.ticker || (t = c.children), c.settings.ticker ? c.settings.pager = !1 : (c.settings.controls && C(), c.settings.auto && c.settings.autoControls && S(), c.settings.pager && x(), (c.settings.controls || c.settings.autoControls || c.settings.pager) && c.viewport.after(c.controls.el)), null === t ? f() : p(t, f)
            }, p = function (t, e) {
                var i = t.find('img:not([src=""]), iframe').length, n = 0;
                0 !== i ? t.find('img:not([src=""]), iframe').each(function () {
                    U(this).one("load error", function () {
                        ++n === i && e()
                    }).each(function () {
                        !this.complete && "" != this.src || U(this).trigger("load")
                    })
                }) : e()
            }, f = function () {
                var t, e;
                c.settings.infiniteLoop && "fade" !== c.settings.mode && !c.settings.ticker && (e = "vertical" === c.settings.mode ? c.settings.minSlides : c.settings.maxSlides, t = c.children.slice(0, e).clone(!0).addClass("bx-clone"), e = c.children.slice(-e).clone(!0).addClass("bx-clone"), c.settings.ariaHidden && (t.attr("aria-hidden", !0), e.attr("aria-hidden", !0)), d.append(t).prepend(e)), c.loader.remove(), _(), "vertical" === c.settings.mode && (c.settings.adaptiveHeight = !0), c.viewport.height(m()), d.redrawSlider(), c.settings.onSliderLoad.call(d, c.active.index), c.initialized = !0, c.settings.responsive && U(window).on("resize", q), c.settings.auto && c.settings.autoStart && (1 < y() || c.settings.autoSlideForOnePage) && P(), c.settings.ticker && N(), c.settings.pager && j(c.settings.startSlide), c.settings.controls && O(), c.settings.touchEnabled && !c.settings.ticker && F(), c.settings.keyboardEnabled && !c.settings.ticker && U(document).keydown(L)
            }, m = function () {
                var e = 0, t = U();
                if ("vertical" === c.settings.mode || c.settings.adaptiveHeight) if (c.carousel) {
                    var n = 1 === c.settings.moveSlides ? c.active.index : c.active.index * w(), t = c.children.eq(n);
                    for (i = 1; i <= c.settings.maxSlides - 1; i++) t = n + i >= c.children.length ? t.add(c.children.eq(i - 1)) : t.add(c.children.eq(n + i))
                } else t = c.children.eq(c.active.index); else t = c.children;
                return "vertical" === c.settings.mode ? (t.each(function (t) {
                    e += U(this).outerHeight()
                }), 0 < c.settings.slideMargin && (e += c.settings.slideMargin * (c.settings.minSlides - 1))) : e = Math.max.apply(Math, t.map(function () {
                    return U(this).outerHeight(!1)
                }).get()), "border-box" === c.viewport.css("box-sizing") ? e += parseFloat(c.viewport.css("padding-top")) + parseFloat(c.viewport.css("padding-bottom")) + parseFloat(c.viewport.css("border-top-width")) + parseFloat(c.viewport.css("border-bottom-width")) : "padding-box" === c.viewport.css("box-sizing") && (e += parseFloat(c.viewport.css("padding-top")) + parseFloat(c.viewport.css("padding-bottom"))), e
            }, g = function () {
                var t = "100%";
                return 0 < c.settings.slideWidth && (t = "horizontal" === c.settings.mode ? c.settings.maxSlides * c.settings.slideWidth + (c.settings.maxSlides - 1) * c.settings.slideMargin : c.settings.slideWidth), t
            }, v = function () {
                var t = c.settings.slideWidth, e = c.viewport.width();
                if (0 === c.settings.slideWidth || c.settings.slideWidth > e && !c.carousel || "vertical" === c.settings.mode) t = e; else if (1 < c.settings.maxSlides && "horizontal" === c.settings.mode) {
                    if (e > c.maxThreshold) return t;
                    e < c.minThreshold ? t = (e - c.settings.slideMargin * (c.settings.minSlides - 1)) / c.settings.minSlides : c.settings.shrinkItems && (t = Math.floor((e + c.settings.slideMargin) / Math.ceil((e + c.settings.slideMargin) / (t + c.settings.slideMargin)) - c.settings.slideMargin))
                }
                return t
            }, y = function () {
                var t = 0, e = 0, i = 0;
                if (0 < c.settings.moveSlides) {
                    if (!c.settings.infiniteLoop) {
                        for (; e < c.children.length;) ++t, e = i + a(), i += c.settings.moveSlides <= a() ? c.settings.moveSlides : a();
                        return i
                    }
                    t = Math.ceil(c.children.length / w())
                } else t = Math.ceil(c.children.length / a());
                return t
            }, w = function () {
                return 0 < c.settings.moveSlides && c.settings.moveSlides <= a() ? c.settings.moveSlides : a()
            }, _ = function () {
                var t, e;
                c.children.length > c.settings.maxSlides && c.active.last && !c.settings.infiniteLoop ? "horizontal" === c.settings.mode ? (t = (e = c.children.last()).position(), b(-(t.left - (c.viewport.width() - e.outerWidth())), "reset", 0)) : "vertical" === c.settings.mode && (e = c.children.length - c.settings.minSlides, t = c.children.eq(e).position(), b(-t.top, "reset", 0)) : (t = c.children.eq(c.active.index * w()).position(), c.active.index === y() - 1 && (c.active.last = !0), void 0 !== t && ("horizontal" === c.settings.mode ? b(-t.left, "reset", 0) : "vertical" === c.settings.mode && b(-t.top, "reset", 0)))
            }, b = function (t, e, i, n) {
                var s;
                c.usingCSS ? (s = "vertical" === c.settings.mode ? "translate3d(0, " + t + "px, 0)" : "translate3d(" + t + "px, 0, 0)", d.css("-" + c.cssPrefix + "-transition-duration", i / 1e3 + "s"), "slide" === e ? (d.css(c.animProp, s), 0 !== i ? d.on("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function (t) {
                    U(t.target).is(d) && (d.off("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd"), $())
                }) : $()) : "reset" === e ? d.css(c.animProp, s) : "ticker" === e && (d.css("-" + c.cssPrefix + "-transition-timing-function", "linear"), d.css(c.animProp, s), 0 !== i ? d.on("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function (t) {
                    U(t.target).is(d) && (d.off("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd"), b(n.resetValue, "reset", 0), z())
                }) : (b(n.resetValue, "reset", 0), z()))) : ((s = {})[c.animProp] = t, "slide" === e ? d.animate(s, i, c.settings.easing, function () {
                    $()
                }) : "reset" === e ? d.css(c.animProp, t) : "ticker" === e && d.animate(s, i, "linear", function () {
                    b(n.resetValue, "reset", 0), z()
                }))
            }, x = function () {
                c.settings.pagerCustom ? c.pagerEl = U(c.settings.pagerCustom) : (c.pagerEl = U('<div class="bx-pager" />'), c.settings.pagerSelector ? U(c.settings.pagerSelector).html(c.pagerEl) : c.controls.el.addClass("bx-has-pager").append(c.pagerEl), t()), c.pagerEl.on("click touchend", "a", D)
            }, C = function () {
                c.controls.next = U('<a class="bx-next" href="">' + c.settings.nextText + "</a>"), c.controls.prev = U('<a class="bx-prev" href="">' + c.settings.prevText + "</a>"), c.controls.next.on("click touchend", E), c.controls.prev.on("click touchend", k), c.settings.nextSelector && U(c.settings.nextSelector).append(c.controls.next), c.settings.prevSelector && U(c.settings.prevSelector).append(c.controls.prev), c.settings.nextSelector || c.settings.prevSelector || (c.controls.directionEl = U('<div class="bx-controls-direction" />'), c.controls.directionEl.append(c.controls.prev).append(c.controls.next), c.controls.el.addClass("bx-has-controls-direction").append(c.controls.directionEl))
            }, S = function () {
                c.controls.start = U('<div class="bx-controls-auto-item"><a class="bx-start" href="">' + c.settings.startText + "</a></div>"), c.controls.stop = U('<div class="bx-controls-auto-item"><a class="bx-stop" href="">' + c.settings.stopText + "</a></div>"), c.controls.autoEl = U('<div class="bx-controls-auto" />'), c.controls.autoEl.on("click", ".bx-start", I), c.controls.autoEl.on("click", ".bx-stop", A), c.settings.autoControlsCombine ? c.controls.autoEl.append(c.controls.start) : c.controls.autoEl.append(c.controls.start).append(c.controls.stop), c.settings.autoControlsSelector ? U(c.settings.autoControlsSelector).html(c.controls.autoEl) : c.controls.el.addClass("bx-has-controls-auto").append(c.controls.autoEl), M(c.settings.autoStart ? "stop" : "start")
            }, T = function () {
                c.children.each(function (t) {
                    var e = U(this).find("img:first").attr("title");
                    void 0 !== e && ("" + e).length && U(this).append('<div class="bx-caption"><span>' + e + "</span></div>")
                })
            }, E = function (t) {
                t.preventDefault(), c.controls.el.hasClass("disabled") || (c.settings.auto && c.settings.stopAutoOnClick && d.stopAuto(), d.goToNextSlide())
            }, k = function (t) {
                t.preventDefault(), c.controls.el.hasClass("disabled") || (c.settings.auto && c.settings.stopAutoOnClick && d.stopAuto(), d.goToPrevSlide())
            }, I = function (t) {
                d.startAuto(), t.preventDefault()
            }, A = function (t) {
                d.stopAuto(), t.preventDefault()
            }, D = function (t) {
                var e;
                t.preventDefault(), c.controls.el.hasClass("disabled") || (c.settings.auto && c.settings.stopAutoOnClick && d.stopAuto(), void 0 !== (t = U(t.currentTarget)).attr("data-slide-index") && (e = parseInt(t.attr("data-slide-index"))) !== c.active.index && d.goToSlide(e))
            }, j = function (i) {
                var t = c.children.length;
                if ("short" === c.settings.pagerType) return 1 < c.settings.maxSlides && (t = Math.ceil(c.children.length / c.settings.maxSlides)), void c.pagerEl.html(i + 1 + c.settings.pagerShortSeparator + t);
                c.pagerEl.find("a").removeClass("active"), c.pagerEl.each(function (t, e) {
                    U(e).find("a").eq(i).addClass("active")
                })
            }, $ = function () {
                var t;
                c.settings.infiniteLoop && (t = "", 0 === c.active.index ? t = c.children.eq(0).position() : c.active.index === y() - 1 && c.carousel ? t = c.children.eq((y() - 1) * w()).position() : c.active.index === c.children.length - 1 && (t = c.children.eq(c.children.length - 1).position()), t && ("horizontal" === c.settings.mode ? b(-t.left, "reset", 0) : "vertical" === c.settings.mode && b(-t.top, "reset", 0))), c.working = !1, c.settings.onSlideAfter.call(d, c.children.eq(c.active.index), c.oldIndex, c.active.index)
            }, M = function (t) {
                c.settings.autoControlsCombine ? c.controls.autoEl.html(c.controls[t]) : (c.controls.autoEl.find("a").removeClass("active"), c.controls.autoEl.find("a:not(.bx-" + t + ")").addClass("active"))
            }, O = function () {
                1 === y() ? (c.controls.prev.addClass("disabled"), c.controls.next.addClass("disabled")) : !c.settings.infiniteLoop && c.settings.hideControlOnEnd && (0 === c.active.index ? (c.controls.prev.addClass("disabled"), c.controls.next.removeClass("disabled")) : c.active.index === y() - 1 ? (c.controls.next.addClass("disabled"), c.controls.prev.removeClass("disabled")) : (c.controls.prev.removeClass("disabled"), c.controls.next.removeClass("disabled")))
            }, P = function () {
                0 < c.settings.autoDelay ? setTimeout(d.startAuto, c.settings.autoDelay) : (d.startAuto(), U(window).focus(r).blur(l)), c.settings.autoHover && d.hover(function () {
                    c.interval && (d.stopAuto(!0), c.autoPaused = !0)
                }, function () {
                    c.autoPaused && (d.startAuto(!0), c.autoPaused = null)
                })
            }, N = function () {
                var t, e, i, n, s, o, a, r, l = 0;
                "next" === c.settings.autoDirection ? d.append(c.children.clone().addClass("bx-clone")) : (d.prepend(c.children.clone().addClass("bx-clone")), t = c.children.first().position(), l = "horizontal" === c.settings.mode ? -t.left : -t.top), b(l, "reset", 0), c.settings.pager = !1, c.settings.controls = !1, c.settings.autoControls = !1, c.settings.tickerHover && (c.usingCSS ? (n = "horizontal" === c.settings.mode ? 4 : 5, c.viewport.hover(function () {
                    e = d.css("-" + c.cssPrefix + "-transform"), i = parseFloat(e.split(",")[n]), b(i, "reset", 0)
                }, function () {
                    r = 0, c.children.each(function (t) {
                        r += "horizontal" === c.settings.mode ? U(this).outerWidth(!0) : U(this).outerHeight(!0)
                    }), s = c.settings.speed / r, o = "horizontal" === c.settings.mode ? "left" : "top", a = s * (r - Math.abs(parseInt(i))), z(a)
                })) : c.viewport.hover(function () {
                    d.stop()
                }, function () {
                    r = 0, c.children.each(function (t) {
                        r += "horizontal" === c.settings.mode ? U(this).outerWidth(!0) : U(this).outerHeight(!0)
                    }), s = c.settings.speed / r, o = "horizontal" === c.settings.mode ? "left" : "top", a = s * (r - Math.abs(parseInt(d.css(o)))), z(a)
                })), z()
            }, z = function (t) {
                var e = t || c.settings.speed, i = {left: 0, top: 0}, t = {left: 0, top: 0};
                "next" === c.settings.autoDirection ? i = d.find(".bx-clone").first().position() : t = c.children.first().position(), i = "horizontal" === c.settings.mode ? -i.left : -i.top, t = "horizontal" === c.settings.mode ? -t.left : -t.top, b(i, "ticker", e, {resetValue: t})
            }, L = function (t) {
                var e, i, n, s = document.activeElement.tagName.toLowerCase();
                if (null == new RegExp(s, ["i"]).exec("input|textarea") && (e = d, i = U(window), n = {
                    top: i.scrollTop(),
                    left: i.scrollLeft()
                }, s = e.offset(), n.right = n.left + i.width(), n.bottom = n.top + i.height(), s.right = s.left + e.outerWidth(), s.bottom = s.top + e.outerHeight(), !(n.right < s.left || n.left > s.right || n.bottom < s.top || n.top > s.bottom))) return 39 === t.keyCode ? (E(t), !1) : 37 === t.keyCode ? (k(t), !1) : void 0
            }, F = function () {
                c.touch = {
                    start: {x: 0, y: 0},
                    end: {x: 0, y: 0}
                }, c.viewport.on("touchstart MSPointerDown pointerdown", H), c.viewport.on("click", ".bxslider a", function (t) {
                    c.viewport.hasClass("click-disabled") && (t.preventDefault(), c.viewport.removeClass("click-disabled"))
                })
            }, H = function (t) {
                var e;
                "touchstart" !== t.type && 0 !== t.button || (t.preventDefault(), c.controls.el.addClass("disabled"), c.working ? c.controls.el.removeClass("disabled") : (c.touch.originalPos = d.position(), t = void 0 !== (e = t.originalEvent).changedTouches ? e.changedTouches : [e], "function" == typeof PointerEvent && void 0 === e.pointerId || (c.touch.start.x = t[0].pageX, c.touch.start.y = t[0].pageY, c.viewport.get(0).setPointerCapture && (c.pointerId = e.pointerId, c.viewport.get(0).setPointerCapture(c.pointerId)), c.originalClickTarget = e.originalTarget || e.target, c.originalClickButton = e.button, c.originalClickButtons = e.buttons, c.originalEventType = e.type, c.hasMove = !1, c.viewport.on("touchmove MSPointerMove pointermove", R), c.viewport.on("touchend MSPointerUp pointerup", B), c.viewport.on("MSPointerCancel pointercancel", W))))
            }, W = function (t) {
                t.preventDefault(), b(c.touch.originalPos.left, "reset", 0), c.controls.el.removeClass("disabled"), c.viewport.off("MSPointerCancel pointercancel", W), c.viewport.off("touchmove MSPointerMove pointermove", R), c.viewport.off("touchend MSPointerUp pointerup", B), c.viewport.get(0).releasePointerCapture && c.viewport.get(0).releasePointerCapture(c.pointerId)
            }, R = function (t) {
                var e = t.originalEvent, i = void 0 !== e.changedTouches ? e.changedTouches : [e],
                    n = Math.abs(i[0].pageX - c.touch.start.x), s = Math.abs(i[0].pageY - c.touch.start.y), o = 0,
                    e = 0;
                c.hasMove = !0, (s < 3 * n && c.settings.preventDefaultSwipeX || n < 3 * s && c.settings.preventDefaultSwipeY) && t.preventDefault(), "touchmove" !== t.type && t.preventDefault(), "fade" !== c.settings.mode && c.settings.oneToOneTouch && (o = "horizontal" === c.settings.mode ? (e = i[0].pageX - c.touch.start.x, c.touch.originalPos.left + e) : (e = i[0].pageY - c.touch.start.y, c.touch.originalPos.top + e), b(o, "reset", 0))
            }, B = function (t) {
                t.preventDefault(), c.viewport.off("touchmove MSPointerMove pointermove", R), c.controls.el.removeClass("disabled");
                var e = t.originalEvent, i = void 0 !== e.changedTouches ? e.changedTouches : [e], t = 0, e = 0;
                c.touch.end.x = i[0].pageX, c.touch.end.y = i[0].pageY, "fade" === c.settings.mode ? (e = Math.abs(c.touch.start.x - c.touch.end.x)) >= c.settings.swipeThreshold && (c.touch.start.x > c.touch.end.x ? d.goToNextSlide() : d.goToPrevSlide(), d.stopAuto()) : (t = "horizontal" === c.settings.mode ? (e = c.touch.end.x - c.touch.start.x, c.touch.originalPos.left) : (e = c.touch.end.y - c.touch.start.y, c.touch.originalPos.top), (c.settings.infiniteLoop || !(0 === c.active.index && 0 < e || c.active.last && e < 0)) && Math.abs(e) >= c.settings.swipeThreshold ? (e < 0 ? d.goToNextSlide() : d.goToPrevSlide(), d.stopAuto()) : b(t, "reset", 200)), c.viewport.off("touchend MSPointerUp pointerup", B), c.viewport.get(0).releasePointerCapture && c.viewport.get(0).releasePointerCapture(c.pointerId), !1 !== c.hasMove || 0 !== c.originalClickButton && "touchstart" !== c.originalEventType || U(c.originalClickTarget).trigger({
                    type: "click",
                    button: c.originalClickButton,
                    buttons: c.originalClickButtons
                })
            }, q = function (t) {
                var e, i;
                c.initialized && (c.working ? window.setTimeout(q, 10) : (e = U(window).width(), i = U(window).height(), n === e && s === i || (n = e, s = i, d.redrawSlider(), c.settings.onSliderResize.call(d, c.active.index))))
            };
            return d.goToSlide = function (t, e) {
                var i, n, s = !0, o = 0, a = {left: 0, top: 0}, r = null;
                if (c.oldIndex = c.active.index, c.active.index = (n = t) < 0 ? c.settings.infiniteLoop ? y() - 1 : c.active.index : n >= y() ? c.settings.infiniteLoop ? 0 : c.active.index : n, !c.working && c.active.index !== c.oldIndex) {
                    if (c.working = !0, void 0 !== (s = c.settings.onSlideBefore.call(d, c.children.eq(c.active.index), c.oldIndex, c.active.index)) && !s) return c.active.index = c.oldIndex, void (c.working = !1);
                    "next" === e ? c.settings.onSlideNext.call(d, c.children.eq(c.active.index), c.oldIndex, c.active.index) || (s = !1) : "prev" === e && (c.settings.onSlidePrev.call(d, c.children.eq(c.active.index), c.oldIndex, c.active.index) || (s = !1)), c.active.last = c.active.index >= y() - 1, (c.settings.pager || c.settings.pagerCustom) && j(c.active.index), c.settings.controls && O(), "fade" === c.settings.mode ? (c.settings.adaptiveHeight && c.viewport.height() !== m() && c.viewport.animate({height: m()}, c.settings.adaptiveHeightSpeed), c.children.filter(":visible").fadeOut(c.settings.speed).css({zIndex: 0}), c.children.eq(c.active.index).css("zIndex", c.settings.slideZIndex + 1).fadeIn(c.settings.speed, function () {
                        U(this).css("zIndex", c.settings.slideZIndex), $()
                    })) : (c.settings.adaptiveHeight && c.viewport.height() !== m() && c.viewport.animate({height: m()}, c.settings.adaptiveHeightSpeed), !c.settings.infiniteLoop && c.carousel && c.active.last ? "horizontal" === c.settings.mode ? (a = (r = c.children.eq(c.children.length - 1)).position(), o = c.viewport.width() - r.outerWidth()) : (i = c.children.length - c.settings.minSlides, a = c.children.eq(i).position()) : c.carousel && c.active.last && "prev" === e ? (i = 1 === c.settings.moveSlides ? c.settings.maxSlides - w() : (y() - 1) * w() - (c.children.length - c.settings.maxSlides), a = (r = d.children(".bx-clone").eq(i)).position()) : "next" === e && 0 === c.active.index ? (a = d.find("> .bx-clone").eq(c.settings.maxSlides).position(), c.active.last = !1) : 0 <= t && (t = t * parseInt(w()), a = c.children.eq(t).position()), void 0 !== a && (a = "horizontal" === c.settings.mode ? -(a.left - o) : -a.top, b(a, "slide", c.settings.speed)), c.working = !1), c.settings.ariaHidden && u(c.active.index * w())
                }
            }, d.goToNextSlide = function () {
                var t;
                !c.settings.infiniteLoop && c.active.last || !0 === c.working || (t = parseInt(c.active.index) + 1, d.goToSlide(t, "next"))
            }, d.goToPrevSlide = function () {
                var t;
                !c.settings.infiniteLoop && 0 === c.active.index || !0 === c.working || (t = parseInt(c.active.index) - 1, d.goToSlide(t, "prev"))
            }, d.startAuto = function (t) {
                c.interval || (c.interval = setInterval(function () {
                    "next" === c.settings.autoDirection ? d.goToNextSlide() : d.goToPrevSlide()
                }, c.settings.pause), c.settings.onAutoChange.call(d, !0), c.settings.autoControls && !0 !== t && M("stop"))
            }, d.stopAuto = function (t) {
                c.autoPaused && (c.autoPaused = !1), c.interval && (clearInterval(c.interval), c.interval = null, c.settings.onAutoChange.call(d, !1), c.settings.autoControls && !0 !== t && M("start"))
            }, d.getCurrentSlide = function () {
                return c.active.index
            }, d.getCurrentSlideElement = function () {
                return c.children.eq(c.active.index)
            }, d.getSlideElement = function (t) {
                return c.children.eq(t)
            }, d.getSlideCount = function () {
                return c.children.length
            }, d.isWorking = function () {
                return c.working
            }, d.redrawSlider = function () {
                c.children.add(d.find(".bx-clone")).outerWidth(v()), c.viewport.css("height", m()), c.settings.ticker || _(), c.active.last && (c.active.index = y() - 1), c.active.index >= y() && (c.active.last = !0), c.settings.pager && !c.settings.pagerCustom && (t(), j(c.active.index)), c.settings.ariaHidden && u(c.active.index * w())
            }, d.destroySlider = function () {
                c.initialized && (c.initialized = !1, U(".bx-clone", this).remove(), c.children.each(function () {
                    void 0 !== U(this).data("origStyle") ? U(this).attr("style", U(this).data("origStyle")) : U(this).removeAttr("style")
                }), void 0 !== U(this).data("origStyle") ? this.attr("style", U(this).data("origStyle")) : U(this).removeAttr("style"), U(this).unwrap().unwrap(), c.controls.el && c.controls.el.remove(), c.controls.next && c.controls.next.remove(), c.controls.prev && c.controls.prev.remove(), c.pagerEl && c.settings.controls && !c.settings.pagerCustom && c.pagerEl.remove(), U(".bx-caption", this).remove(), c.controls.autoEl && c.controls.autoEl.remove(), clearInterval(c.interval), c.settings.responsive && U(window).off("resize", q), c.settings.keyboardEnabled && U(document).off("keydown", L), U(this).removeData("bxSlider"), U(window).off("blur", l).off("focus", r))
            }, d.reloadSlider = function (t) {
                void 0 !== t && (e = t), d.destroySlider(), o(), U(d).data("bxSlider", this)
            }, o(), U(d).data("bxSlider", this), this
        }
    }
}(jQuery), function (t) {
    "function" == typeof define && define.amd ? define(["jquery"], t) : "object" == typeof exports ? module.exports = t($ || require("jquery")) : t(jQuery)
}(function (M) {
    "use strict";

    function s(t, e) {
        this.element = t, this.options = M.extend({}, i, e);
        e = this.options.locale;
        void 0 !== this.options.locales[e] && M.extend(this.options, this.options.locales[e]), this.init()
    }

    function O(t) {
        var e, i;
        !M(t.target).parents().hasClass("jq-selectbox") && "OPTION" != t.target.nodeName && M("div.jq-selectbox.opened").length && (e = M("div.jq-selectbox.opened"), i = M("div.jq-selectbox__search input", e), t = M("div.jq-selectbox__dropdown", e), e.find("select").data("_" + o).options.onSelectClosed.call(e), i.length && i.val("").keyup(), t.hide().find("li.sel").addClass("selected"), e.removeClass("focused opened dropup dropdown"))
    }

    var o = "styler", i = {
        idSuffix: "-styler",
        filePlaceholder: "Файл не выбран",
        fileBrowse: "Обзор...",
        fileNumber: "Выбрано файлов: %s",
        selectPlaceholder: "Выберите...",
        selectSearch: !1,
        selectSearchLimit: 10,
        selectSearchNotFound: "Совпадений не найдено",
        selectSearchPlaceholder: "Поиск...",
        selectVisibleOptions: 0,
        singleSelectzIndex: "100",
        selectSmartPositioning: !0,
        locale: "ru",
        locales: {
            en: {
                filePlaceholder: "No file selected",
                fileBrowse: "Browse...",
                fileNumber: "Selected files: %s",
                selectPlaceholder: "Select...",
                selectSearchNotFound: "No matches found",
                selectSearchPlaceholder: "Search..."
            }
        },
        onSelectOpened: function () {
        },
        onSelectClosed: function () {
        },
        onFormStyled: function () {
        }
    };
    s.prototype = {
        init: function () {
            function A() {
                void 0 !== D.attr("id") && "" !== D.attr("id") && (this.id = D.attr("id") + j.idSuffix), this.title = D.attr("title"), this.classes = D.attr("class"), this.data = D.data()
            }

            var t, e, i, n, s, D = M(this.element), j = this.options,
                $ = !(!navigator.userAgent.match(/(iPad|iPhone|iPod)/i) || navigator.userAgent.match(/(Windows\sPhone)/i)),
                o = !(!navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/(Windows\sPhone)/i));
            D.is(":checkbox") ? ((t = function () {
                var t = new A, e = M('<div class="jq-checkbox"><div class="jq-checkbox__div"></div></div>').attr({
                    id: t.id,
                    title: t.title
                }).addClass(t.classes).data(t.data);
                D.css({
                    position: "absolute",
                    zIndex: "-1",
                    opacity: 0,
                    margin: 0,
                    padding: 0
                }).after(e).prependTo(e), e.attr("unselectable", "on").css({
                    "-webkit-user-select": "none",
                    "-moz-user-select": "none",
                    "-ms-user-select": "none",
                    "-o-user-select": "none",
                    "user-select": "none",
                    display: "inline-block",
                    position: "relative",
                    overflow: "hidden"
                }), D.is(":checked") && e.addClass("checked"), D.is(":disabled") && e.addClass("disabled"), e.click(function (t) {
                    t.preventDefault(), e.is(".disabled") || (D.is(":checked") ? (D.prop("checked", !1), e.removeClass("checked")) : (D.prop("checked", !0), e.addClass("checked")), D.focus().change())
                }), D.closest("label").add('label[for="' + D.attr("id") + '"]').on("click.styler", function (t) {
                    M(t.target).is("a") || M(t.target).closest(e).length || (e.triggerHandler("click"), t.preventDefault())
                }), D.on("change.styler", function () {
                    D.is(":checked") ? e.addClass("checked") : e.removeClass("checked")
                }).on("keydown.styler", function (t) {
                    32 == t.which && e.click()
                }).on("focus.styler", function () {
                    e.is(".disabled") || e.addClass("focused")
                }).on("blur.styler", function () {
                    e.removeClass("focused")
                })
            })(), D.on("refresh", function () {
                D.closest("label").add('label[for="' + D.attr("id") + '"]').off(".styler"), D.off(".styler").parent().before(D).remove(), t()
            })) : D.is(":radio") ? ((e = function () {
                var t = new A, e = M('<div class="jq-radio"><div class="jq-radio__div"></div></div>').attr({
                    id: t.id,
                    title: t.title
                }).addClass(t.classes).data(t.data);
                D.css({
                    position: "absolute",
                    zIndex: "-1",
                    opacity: 0,
                    margin: 0,
                    padding: 0
                }).after(e).prependTo(e), e.attr("unselectable", "on").css({
                    "-webkit-user-select": "none",
                    "-moz-user-select": "none",
                    "-ms-user-select": "none",
                    "-o-user-select": "none",
                    "user-select": "none",
                    display: "inline-block",
                    position: "relative"
                }), D.is(":checked") && e.addClass("checked"), D.is(":disabled") && e.addClass("disabled"), M.fn.commonParents = function () {
                    var t = this;
                    return t.first().parents().filter(function () {
                        return M(this).find(t).length === t.length
                    })
                }, M.fn.commonParent = function () {
                    return M(this).commonParents().first()
                }, e.click(function (t) {
                    t.preventDefault(), e.is(".disabled") || ((t = M('input[name="' + D.attr("name") + '"]')).commonParent().find(t).prop("checked", !1).parent().removeClass("checked"), D.prop("checked", !0).parent().addClass("checked"), D.focus().change())
                }), D.closest("label").add('label[for="' + D.attr("id") + '"]').on("click.styler", function (t) {
                    M(t.target).is("a") || M(t.target).closest(e).length || (e.triggerHandler("click"), t.preventDefault())
                }), D.on("change.styler", function () {
                    D.parent().addClass("checked")
                }).on("focus.styler", function () {
                    e.is(".disabled") || e.addClass("focused")
                }).on("blur.styler", function () {
                    e.removeClass("focused")
                })
            })(), D.on("refresh", function () {
                D.closest("label").add('label[for="' + D.attr("id") + '"]').off(".styler"), D.off(".styler").parent().before(D).remove(), e()
            })) : D.is(":file") ? (D.css({
                position: "absolute",
                top: 0,
                right: 0,
                margin: 0,
                padding: 0,
                opacity: 0,
                fontSize: "100px"
            }), (i = function () {
                var t = new A, s = D.data("placeholder");
                void 0 === s && (s = j.filePlaceholder);
                var e = D.data("browse");
                void 0 !== e && "" !== e || (e = j.fileBrowse);
                var o = M('<div class="jq-file"><div class="jq-file__name">' + s + '</div><div class="jq-file__browse">' + e + "</div></div>").css({
                    display: "inline-block",
                    position: "relative",
                    overflow: "hidden"
                }).attr({id: t.id, title: t.title}).addClass(t.classes).data(t.data);
                D.after(o).appendTo(o), D.is(":disabled") && o.addClass("disabled"), D.on("change.styler", function () {
                    var t, e, i = D.val(), n = M("div.jq-file__name", o);
                    D.is("[multiple]") && (i = "", 0 < (t = D[0].files.length) && (void 0 === (e = D.data("number")) && (e = j.fileNumber), i = e = e.replace("%s", t))), n.text(i.replace(/.+[\\\/]/, "")), "" === i ? (n.text(s), o.removeClass("changed")) : o.addClass("changed")
                }).on("focus.styler", function () {
                    o.addClass("focused")
                }).on("blur.styler", function () {
                    o.removeClass("focused")
                }).on("click.styler", function () {
                    o.removeClass("focused")
                })
            })(), D.on("refresh", function () {
                D.off(".styler").parent().before(D).remove(), i()
            })) : D.is('input[type="number"]') ? ((n = function () {
                var t = new A,
                    e = M('<div class="jq-number"><div class="jq-number__spin minus"></div><div class="jq-number__spin plus"></div></div>').attr({
                        id: t.id,
                        title: t.title
                    }).addClass(t.classes).data(t.data);
                D.after(e).prependTo(e).wrap('<div class="jq-number__field"></div>'), D.is(":disabled") && e.addClass("disabled");
                var o, a, r, i = null, n = null;
                void 0 !== D.attr("min") && (o = D.attr("min")), void 0 !== D.attr("max") && (a = D.attr("max")), r = void 0 !== D.attr("step") && M.isNumeric(D.attr("step")) ? Number(D.attr("step")) : Number(1);

                function s(t) {
                    var e, i = D.val();
                    M.isNumeric(i) || (i = 0, D.val("0")), t.is(".minus") ? e = Number(i) - r : t.is(".plus") && (e = Number(i) + r);
                    var n = (r.toString().split(".")[1] || []).length;
                    if (0 < n) {
                        for (var s = "1"; s.length <= n;) s += "0";
                        e = Math.round(e * s) / s
                    }
                    M.isNumeric(o) && M.isNumeric(a) ? o <= e && e <= a && D.val(e) : M.isNumeric(o) && !M.isNumeric(a) ? o <= e && D.val(e) : (M.isNumeric(o) || !M.isNumeric(a) || e <= a) && D.val(e)
                }

                e.is(".disabled") || (e.on("mousedown", "div.jq-number__spin", function () {
                    var t = M(this);
                    s(t), i = setTimeout(function () {
                        n = setInterval(function () {
                            s(t)
                        }, 40)
                    }, 350)
                }).on("mouseup mouseout", "div.jq-number__spin", function () {
                    clearTimeout(i), clearInterval(n)
                }).on("mouseup", "div.jq-number__spin", function () {
                    D.change()
                }), D.on("focus.styler", function () {
                    e.addClass("focused")
                }).on("blur.styler", function () {
                    e.removeClass("focused")
                }))
            })(), D.on("refresh", function () {
                D.off(".styler").closest(".jq-number").before(D).remove(), n()
            })) : D.is("select") ? ((s = function () {
                function T(t) {
                    t.off("mousewheel DOMMouseScroll").on("mousewheel DOMMouseScroll", function (t) {
                        var e = null;
                        "mousewheel" == t.type ? e = -1 * t.originalEvent.wheelDelta : "DOMMouseScroll" == t.type && (e = 40 * t.originalEvent.detail), e && (t.stopPropagation(), t.preventDefault(), M(this).scrollTop(e + M(this).scrollTop()))
                    })
                }

                function E() {
                    for (var t = 0; t < k.length; t++) {
                        var e = k.eq(t), i = "", n = "", s = "", o = "", a = "", r = "", l = "", c = "", d = "";
                        e.prop("selected") && (n = "selected sel"), e.is(":disabled") && (n = "disabled"), e.is(":selected:disabled") && (n = "selected sel disabled"), void 0 !== e.attr("id") && "" !== e.attr("id") && (o = ' id="' + e.attr("id") + j.idSuffix + '"'), void 0 !== e.attr("title") && "" !== k.attr("title") && (a = ' title="' + e.attr("title") + '"'), void 0 !== e.attr("class") && (l = " " + e.attr("class"), d = ' data-jqfs-class="' + e.attr("class") + '"');
                        var u, h = e.data();
                        for (u in h) "" !== h[u] && (r += " data-" + u + '="' + h[u] + '"');
                        n + l !== "" && (s = ' class="' + n + l + '"'), i = "<li" + d + r + s + a + o + ">" + e.html() + "</li>", e.parent().is("optgroup") && (void 0 !== e.parent().attr("class") && (c = " " + e.parent().attr("class")), i = "<li" + d + r + ' class="' + n + l + " option" + c + '"' + a + o + ">" + e.html() + "</li>", e.is(":first-child") && (i = '<li class="optgroup' + c + '">' + e.parent().attr("label") + "</li>" + i)), I += i
                    }
                }

                var k = M("option", D), I = "";
                D.is("[multiple]") ? o || $ || function () {
                    var t = new A, e = M('<div class="jq-select-multiple jqselect"></div>').css({
                        display: "inline-block",
                        position: "relative"
                    }).attr({id: t.id, title: t.title}).addClass(t.classes).data(t.data);
                    D.css({margin: 0, padding: 0}).after(e), E(), e.append("<ul>" + I + "</ul>");
                    var i = M("ul", e).css({
                            position: "relative",
                            "overflow-x": "hidden",
                            "-webkit-overflow-scrolling": "touch"
                        }), s = M("li", e).attr("unselectable", "on"), n = D.attr("size"), t = i.outerHeight(),
                        o = s.outerHeight();
                    void 0 !== n && 0 < n ? i.css({height: o * n}) : i.css({height: 4 * o}), t > e.height() && (i.css("overflowY", "scroll"), T(i), s.filter(".selected").length && i.scrollTop(i.scrollTop() + s.filter(".selected").position().top)), D.prependTo(e).css({
                        position: "absolute",
                        left: 0,
                        top: 0,
                        width: "100%",
                        height: "100%",
                        opacity: 0
                    }), D.is(":disabled") ? (e.addClass("disabled"), k.each(function () {
                        M(this).is(":selected") && s.eq(M(this).index()).addClass("selected")
                    })) : (s.filter(":not(.disabled):not(.optgroup)").click(function (t) {
                        D.focus();
                        var e, i, n = M(this);
                        t.ctrlKey || t.metaKey || n.addClass("selected"), t.shiftKey || n.addClass("first"), t.ctrlKey || t.metaKey || t.shiftKey || n.siblings().removeClass("selected first"), (t.ctrlKey || t.metaKey) && (n.is(".selected") ? n.removeClass("selected first") : n.addClass("selected first"), n.siblings().removeClass("first")), t.shiftKey && (i = e = !1, n.siblings().removeClass("selected").siblings(".first").addClass("selected"), n.prevAll().each(function () {
                            M(this).is(".first") && (e = !0)
                        }), n.nextAll().each(function () {
                            M(this).is(".first") && (i = !0)
                        }), e && n.prevAll().each(function () {
                            return !M(this).is(".selected") && void M(this).not(".disabled, .optgroup").addClass("selected")
                        }), i && n.nextAll().each(function () {
                            return !M(this).is(".selected") && void M(this).not(".disabled, .optgroup").addClass("selected")
                        }), 1 == s.filter(".selected").length && n.addClass("first")), k.prop("selected", !1), s.filter(".selected").each(function () {
                            var t = M(this), e = t.index();
                            t.is(".option") && (e -= t.prevAll(".optgroup").length), k.eq(e).prop("selected", !0)
                        }), D.change()
                    }), k.each(function (t) {
                        M(this).data("optionIndex", t)
                    }), D.on("change.styler", function () {
                        s.removeClass("selected");
                        var e = [];
                        k.filter(":selected").each(function () {
                            e.push(M(this).data("optionIndex"))
                        }), s.not(".optgroup").filter(function (t) {
                            return -1 < M.inArray(t, e)
                        }).addClass("selected")
                    }).on("focus.styler", function () {
                        e.addClass("focused")
                    }).on("blur.styler", function () {
                        e.removeClass("focused")
                    }), t > e.height() && D.on("keydown.styler", function (t) {
                        38 != t.which && 37 != t.which && 33 != t.which || i.scrollTop(i.scrollTop() + s.filter(".selected").position().top - o), 40 != t.which && 39 != t.which && 34 != t.which || i.scrollTop(i.scrollTop() + s.filter(".selected:last").position().top - i.innerHeight() + 2 * o)
                    }))
                }() : function () {
                    var t = new A, e = "", i = D.data("placeholder"), n = D.data("search"), s = D.data("search-limit"),
                        o = D.data("search-not-found"), a = D.data("search-placeholder"), l = D.data("z-index"),
                        c = D.data("smart-positioning");
                    void 0 === i && (i = j.selectPlaceholder), void 0 !== n && "" !== n || (n = j.selectSearch), void 0 !== s && "" !== s || (s = j.selectSearchLimit), void 0 !== o && "" !== o || (o = j.selectSearchNotFound), void 0 === a && (a = j.selectSearchPlaceholder), void 0 !== l && "" !== l || (l = j.singleSelectzIndex), void 0 !== c && "" !== c || (c = j.selectSmartPositioning);
                    var d = M('<div class="jq-selectbox jqselect"><div class="jq-selectbox__select" style="position: relative"><div class="jq-selectbox__select-text"></div><div class="jq-selectbox__trigger"><div class="jq-checked__arrow-trigger"></div></div></div></div>').css({
                        display: "inline-block",
                        position: "relative",
                        zIndex: l
                    }).attr({id: t.id, title: t.title}).addClass(t.classes).data(t.data);
                    D.css({margin: 0, padding: 0}).after(d).prependTo(d);
                    var r = M("div.jq-selectbox__select", d), u = M("div.jq-selectbox__select-text", d),
                        t = k.filter(":selected");
                    E(), n && (e = '<div class="jq-selectbox__search"><input type="search" autocomplete="off" placeholder="' + a + '"></div><div class="jq-selectbox__not-found">' + o + "</div>");
                    var h = M('<div class="jq-selectbox__dropdown" style="position: absolute">' + e + '<ul style="position: relative; list-style: none; overflow: auto; overflow-x: hidden">' + I + "</ul></div>");
                    d.append(h);
                    var p = M("ul", h), f = M("li", h), m = M("input", h),
                        g = M("div.jq-selectbox__not-found", h).hide();
                    f.length < s && m.parent().hide(), "" === k.first().text() && k.first().is(":selected") && !1 !== i ? u.text(i).addClass("placeholder") : u.text(t.text());
                    var v = 0, y = 0;
                    f.css({display: "inline-block"}), f.each(function () {
                        var t = M(this);
                        t.innerWidth() > v && (v = t.innerWidth(), y = t.width())
                    }), f.css({display: ""}), u.is(".placeholder") && u.width() > v ? u.width(u.width()) : (w = (C = d.clone().appendTo("body").width("auto")).outerWidth(), C.remove(), w == d.outerWidth() && u.width(y)), v > d.width() && h.width(v), "" === k.first().text() && "" !== D.data("placeholder") && f.first().hide(), D.css({
                        position: "absolute",
                        left: 0,
                        top: 0,
                        width: "100%",
                        height: "100%",
                        opacity: 0
                    });
                    var w, _ = d.outerHeight(!0), b = m.parent().outerHeight(!0) || 0, x = p.css("max-height"),
                        C = f.filter(".selected");
                    C.length < 1 && f.first().addClass("selected sel"), void 0 === f.data("li-height") && (w = f.outerHeight(), !1 !== i && (w = f.eq(1).outerHeight()), f.data("li-height", w));
                    var S = h.css("top");
                    if ("auto" == h.css("left") && h.css({left: 0}), "auto" == h.css("top") && (h.css({top: _}), S = _), h.hide(), C.length && (k.first().text() != t.text() && d.addClass("changed"), d.data("jqfs-class", C.data("jqfs-class")), d.addClass(C.data("jqfs-class"))), D.is(":disabled")) return d.addClass("disabled");
                    r.click(function () {
                        var t, e, i, n, s, o, a;

                        function r() {
                            p.css("max-height", Math.floor((i - t.scrollTop() - 20 - b) / e) * e)
                        }

                        M("div.jq-selectbox").filter(".opened").length && j.onSelectClosed.call(M("div.jq-selectbox").filter(".opened")), D.focus(), $ || (t = M(window), e = f.data("li-height"), i = d.offset().top, n = t.height() - _ - (i - t.scrollTop()), void 0 !== (a = D.data("visible-options")) && "" !== a || (a = j.selectVisibleOptions), s = 5 * e, o = e * a, 0 < a && a < 6 && (s = o), 0 === a && (o = "auto"), a = function () {
                            h.height("auto").css({bottom: "auto", top: S});

                            function t() {
                                p.css("max-height", Math.floor((n - 20 - b) / e) * e)
                            }

                            t(), p.css("max-height", o), "none" != x && p.css("max-height", x), n < h.outerHeight() + 20 && t()
                        }, !0 === c || 1 === c ? s + b + 20 < n ? (a(), d.removeClass("dropup").addClass("dropdown")) : (h.height("auto").css({
                            top: "auto",
                            bottom: S
                        }), r(), p.css("max-height", o), "none" != x && p.css("max-height", x), i - t.scrollTop() - 20 < h.outerHeight() + 20 && r(), d.removeClass("dropdown").addClass("dropup")) : !1 === c || 0 === c ? s + b + 20 < n && (a(), d.removeClass("dropup").addClass("dropdown")) : (h.height("auto").css({
                            bottom: "auto",
                            top: S
                        }), p.css("max-height", o), "none" != x && p.css("max-height", x)), d.offset().left + h.outerWidth() > t.width() && h.css({
                            left: "auto",
                            right: 0
                        }), M("div.jqselect").css({zIndex: l - 1}).removeClass("opened"), d.css({zIndex: l}), h.is(":hidden") ? (M("div.jq-selectbox__dropdown:visible").hide(), h.show(), d.addClass("opened focused"), j.onSelectOpened.call(d)) : (h.hide(), d.removeClass("opened dropup dropdown"), M("div.jq-selectbox").filter(".opened").length && j.onSelectClosed.call(d)), m.length && (m.val("").keyup(), g.hide(), m.keyup(function () {
                            var t = M(this).val();
                            f.each(function () {
                                M(this).html().match(new RegExp(".*?" + t + ".*?", "i")) ? M(this).show() : M(this).hide()
                            }), "" === k.first().text() && "" !== D.data("placeholder") && f.first().hide(), f.filter(":visible").length < 1 ? g.show() : g.hide()
                        })), f.filter(".selected").length && ("" === D.val() ? p.scrollTop(0) : (p.innerHeight() / e % 2 != 0 && (e /= 2), p.scrollTop(p.scrollTop() + f.filter(".selected").position().top - p.innerHeight() / 2 + e))), T(p))
                    }), f.hover(function () {
                        M(this).siblings().removeClass("selected")
                    }), f.filter(".selected").text(), f.filter(":not(.disabled):not(.optgroup)").click(function () {
                        D.focus();
                        var t, e = M(this), i = e.text();
                        e.is(".selected") || (t = e.index(), t -= e.prevAll(".optgroup").length, e.addClass("selected sel").siblings().removeClass("selected sel"), k.prop("selected", !1).eq(t).prop("selected", !0), u.text(i), d.data("jqfs-class") && d.removeClass(d.data("jqfs-class")), d.data("jqfs-class", e.data("jqfs-class")), d.addClass(e.data("jqfs-class")), D.change()), h.hide(), d.removeClass("opened dropup dropdown"), j.onSelectClosed.call(d)
                    }), h.mouseout(function () {
                        M("li.sel", h).addClass("selected")
                    }), D.on("change.styler", function () {
                        u.text(k.filter(":selected").text()).removeClass("placeholder"), f.removeClass("selected sel").not(".optgroup").eq(D[0].selectedIndex).addClass("selected sel"), k.first().text() != f.filter(".selected").text() ? d.addClass("changed") : d.removeClass("changed")
                    }).on("focus.styler", function () {
                        d.addClass("focused"), M("div.jqselect").not(".focused").removeClass("opened dropup dropdown").find("div.jq-selectbox__dropdown").hide()
                    }).on("blur.styler", function () {
                        d.removeClass("focused")
                    }).on("keydown.styler keyup.styler", function (t) {
                        var e = f.data("li-height");
                        "" === D.val() ? u.text(i).addClass("placeholder") : u.text(k.filter(":selected").text()), f.removeClass("selected sel").not(".optgroup").eq(D[0].selectedIndex).addClass("selected sel"), 38 != t.which && 37 != t.which && 33 != t.which && 36 != t.which || ("" === D.val() ? p.scrollTop(0) : p.scrollTop(p.scrollTop() + f.filter(".selected").position().top)), 40 != t.which && 39 != t.which && 34 != t.which && 35 != t.which || p.scrollTop(p.scrollTop() + f.filter(".selected").position().top - p.innerHeight() + e), 13 == t.which && (t.preventDefault(), h.hide(), d.removeClass("opened dropup dropdown"), j.onSelectClosed.call(d))
                    }).on("keydown.styler", function (t) {
                        32 == t.which && (t.preventDefault(), r.click())
                    }), O.registered || (M(document).on("click", O), O.registered = !0)
                }()
            })(), D.on("refresh", function () {
                D.off(".styler").parent().before(D).remove(), s()
            })) : D.is(":reset") && D.on("click", function () {
                setTimeout(function () {
                    D.closest("form").find("input, select").trigger("refresh")
                }, 1)
            })
        }, destroy: function () {
            var t = M(this.element);
            t.is(":checkbox") || t.is(":radio") ? (t.removeData("_" + o).off(".styler refresh").removeAttr("style").parent().before(t).remove(), t.closest("label").add('label[for="' + t.attr("id") + '"]').off(".styler")) : t.is('input[type="number"]') ? t.removeData("_" + o).off(".styler refresh").closest(".jq-number").before(t).remove() : (t.is(":file") || t.is("select")) && t.removeData("_" + o).off(".styler refresh").removeAttr("style").parent().before(t).remove()
        }
    }, M.fn[o] = function (e) {
        var i, n = arguments;
        return void 0 === e || "object" == typeof e ? (this.each(function () {
            M.data(this, "_" + o) || M.data(this, "_" + o, new s(this, e))
        }).promise().done(function () {
            var t = M(this[0]).data("_" + o);
            t && t.options.onFormStyled.call()
        }), this) : "string" == typeof e && "_" !== e[0] && "init" !== e ? (this.each(function () {
            var t = M.data(this, "_" + o);
            t instanceof s && "function" == typeof t[e] && (i = t[e].apply(t, Array.prototype.slice.call(n, 1)))
        }), void 0 !== i ? i : this) : void 0
    }, O.registered = !1
}), function (t) {
    "function" == typeof define && define.amd ? define(["jquery"], t) : t("object" == typeof exports ? require("jquery") : jQuery)
}(function (o) {
    function i(t, e, i) {
        e = {
            content: {
                message: "object" == typeof e ? e.message : e,
                title: e.title || "",
                icon: e.icon || "",
                url: e.url || "#",
                target: e.target || "-"
            }
        };
        i = o.extend(!0, {}, e, i), this.settings = o.extend(!0, {}, n, i), this._defaults = n, "-" == this.settings.content.target && (this.settings.content.target = this.settings.url_target), this.animations = {
            start: "webkitAnimationStart oanimationstart MSAnimationStart animationstart",
            end: "webkitAnimationEnd oanimationend MSAnimationEnd animationend"
        }, "number" == typeof this.settings.offset && (this.settings.offset = {
            x: this.settings.offset,
            y: this.settings.offset
        }), this.init()
    }

    var n = {
        element: "body",
        position: null,
        type: "info",
        allow_dismiss: !0,
        newest_on_top: !1,
        showProgressbar: !1,
        placement: {from: "top", align: "right"},
        offset: 20,
        spacing: 10,
        z_index: 1031,
        delay: 5e3,
        timer: 1e3,
        url_target: "_blank",
        mouse_over: null,
        animate: {enter: "animated fadeInDown", exit: "animated fadeOutUp"},
        onShow: null,
        onShown: null,
        onClose: null,
        onClosed: null,
        icon_type: "class",
        template: '<div data-notify="container" class="col-xs-11 col-sm-4 alert alert-{0}" role="alert"><button type="button" aria-hidden="true" class="close" data-notify="dismiss">&times;</button><span data-notify="icon"></span> <span data-notify="title">{1}</span> <span data-notify="message">{2}</span><div class="progress" data-notify="progressbar"><div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div></div><a href="{3}" target="{4}" data-notify="url"></a></div>'
    };
    String.format = function () {
        for (var t = arguments[0], e = 1; e < arguments.length; e++) t = t.replace(RegExp("\\{" + (e - 1) + "\\}", "gm"), arguments[e]);
        return t
    }, o.extend(i.prototype, {
        init: function () {
            var s = this;
            this.buildNotify(), this.settings.content.icon && this.setIcon(), "#" != this.settings.content.url && this.styleURL(), this.placement(), this.bind(), this.notify = {
                $ele: this.$ele, update: function (t, e) {
                    var i = {};
                    for (t in "string" == typeof t ? i[t] = e : i = t, i) switch (t) {
                        case"type":
                            this.$ele.removeClass("alert-" + s.settings.type), this.$ele.find('[data-notify="progressbar"] > .progress-bar').removeClass("progress-bar-" + s.settings.type), s.settings.type = i[t], this.$ele.addClass("alert-" + i[t]).find('[data-notify="progressbar"] > .progress-bar').addClass("progress-bar-" + i[t]);
                            break;
                        case"icon":
                            var n = this.$ele.find('[data-notify="icon"]');
                            "class" == s.settings.icon_type.toLowerCase() ? n.removeClass(s.settings.content.icon).addClass(i[t]) : (n.is("img") || n.find("img"), n.attr("src", i[t]));
                            break;
                        case"progress":
                            n = s.settings.delay - s.settings.delay * (i[t] / 100);
                            this.$ele.data("notify-delay", n), this.$ele.find('[data-notify="progressbar"] > div').attr("aria-valuenow", i[t]).css("width", i[t] + "%");
                            break;
                        case"url":
                            this.$ele.find('[data-notify="url"]').attr("href", i[t]);
                            break;
                        case"target":
                            this.$ele.find('[data-notify="url"]').attr("target", i[t]);
                            break;
                        default:
                            this.$ele.find('[data-notify="' + t + '"]').html(i[t])
                    }
                    e = this.$ele.outerHeight() + parseInt(s.settings.spacing) + parseInt(s.settings.offset.y);
                    s.reposition(e)
                }, close: function () {
                    s.close()
                }
            }
        }, buildNotify: function () {
            var t = this.settings.content;
            this.$ele = o(String.format(this.settings.template, this.settings.type, t.title, t.message, t.url, t.target)), this.$ele.attr("data-notify-position", this.settings.placement.from + "-" + this.settings.placement.align), this.settings.allow_dismiss || this.$ele.find('[data-notify="dismiss"]').css("display", "none"), (this.settings.delay <= 0 && !this.settings.showProgressbar || !this.settings.showProgressbar) && this.$ele.find('[data-notify="progressbar"]').remove()
        }, setIcon: function () {
            "class" == this.settings.icon_type.toLowerCase() ? this.$ele.find('[data-notify="icon"]').addClass(this.settings.content.icon) : this.$ele.find('[data-notify="icon"]').is("img") ? this.$ele.find('[data-notify="icon"]').attr("src", this.settings.content.icon) : this.$ele.find('[data-notify="icon"]').append('<img src="' + this.settings.content.icon + '" alt="Notify Icon" />')
        }, styleURL: function () {
            this.$ele.find('[data-notify="url"]').css({
                backgroundImage: "url(data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7)",
                height: "100%",
                left: "0px",
                position: "absolute",
                top: "0px",
                width: "100%",
                zIndex: this.settings.z_index + 1
            }), this.$ele.find('[data-notify="dismiss"]').css({
                position: "absolute",
                right: "10px",
                top: "5px",
                zIndex: this.settings.z_index + 2
            })
        }, placement: function () {
            var i = this, t = this.settings.offset.y, e = {
                display: "inline-block",
                margin: "0px auto",
                position: this.settings.position || ("body" === this.settings.element ? "fixed" : "absolute"),
                transition: "all .5s ease-in-out",
                zIndex: this.settings.z_index
            }, n = !1, s = this.settings;
            switch (o('[data-notify-position="' + this.settings.placement.from + "-" + this.settings.placement.align + '"]:not([data-closing="true"])').each(function () {
                return t = Math.max(t, parseInt(o(this).css(s.placement.from)) + parseInt(o(this).outerHeight()) + parseInt(s.spacing))
            }), 1 == this.settings.newest_on_top && (t = this.settings.offset.y), e[this.settings.placement.from] = t + "px", this.settings.placement.align) {
                case"left":
                case"right":
                    e[this.settings.placement.align] = this.settings.offset.x + "px";
                    break;
                case"center":
                    e.left = 0, e.right = 0
            }
            this.$ele.css(e).addClass(this.settings.animate.enter), o.each(Array("webkit", "moz", "o", "ms", ""), function (t, e) {
                i.$ele[0].style[e + "AnimationIterationCount"] = 1
            }), o(this.settings.element).append(this.$ele), 1 == this.settings.newest_on_top && (t = parseInt(t) + parseInt(this.settings.spacing) + this.$ele.outerHeight(), this.reposition(t)), o.isFunction(i.settings.onShow) && i.settings.onShow.call(this.$ele), this.$ele.one(this.animations.start, function () {
                n = !0
            }).one(this.animations.end, function () {
                o.isFunction(i.settings.onShown) && i.settings.onShown.call(this)
            }), setTimeout(function () {
                n || o.isFunction(i.settings.onShown) && i.settings.onShown.call(this)
            }, 600)
        }, bind: function () {
            var i, n = this;
            this.$ele.find('[data-notify="dismiss"]').on("click", function () {
                n.close()
            }), this.$ele.mouseover(function () {
                o(this).data("data-hover", "true")
            }).mouseout(function () {
                o(this).data("data-hover", "false")
            }), this.$ele.data("data-hover", "false"), 0 < this.settings.delay && (n.$ele.data("notify-delay", n.settings.delay), i = setInterval(function () {
                var t, e = parseInt(n.$ele.data("notify-delay")) - n.settings.timer;
                ("false" === n.$ele.data("data-hover") && "pause" == n.settings.mouse_over || "pause" != n.settings.mouse_over) && (t = (n.settings.delay - e) / n.settings.delay * 100, n.$ele.data("notify-delay", e), n.$ele.find('[data-notify="progressbar"] > div').attr("aria-valuenow", t).css("width", t + "%")), e <= -n.settings.timer && (clearInterval(i), n.close())
            }, n.settings.timer))
        }, close: function () {
            var t = this, e = parseInt(this.$ele.css(this.settings.placement.from)), i = !1;
            this.$ele.data("closing", "true").addClass(this.settings.animate.exit), t.reposition(e), o.isFunction(t.settings.onClose) && t.settings.onClose.call(this.$ele), this.$ele.one(this.animations.start, function () {
                i = !0
            }).one(this.animations.end, function () {
                o(this).remove(), o.isFunction(t.settings.onClosed) && t.settings.onClosed.call(this)
            }), setTimeout(function () {
                i || (t.$ele.remove(), t.settings.onClosed && t.settings.onClosed(t.$ele))
            }, 600)
        }, reposition: function (t) {
            var e = this,
                i = '[data-notify-position="' + this.settings.placement.from + "-" + this.settings.placement.align + '"]:not([data-closing="true"])',
                n = this.$ele.nextAll(i);
            1 == this.settings.newest_on_top && (n = this.$ele.prevAll(i)), n.each(function () {
                o(this).css(e.settings.placement.from, t), t = parseInt(t) + parseInt(e.settings.spacing) + o(this).outerHeight()
            })
        }
    }), o.notify = function (t, e) {
        return new i(0, t, e).notify
    }, o.notifyDefaults = function (t) {
        return n = o.extend(!0, {}, n, t)
    }, o.notifyClose = function (t) {
        o(void 0 === t || "all" == t ? "[data-notify]" : '[data-notify-position="' + t + '"]').find('[data-notify="dismiss"]').trigger("click")
    }
}), function (t) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], t) : t(jQuery)
}(function (n) {
    "use strict";

    function e(u) {
        return function (t) {
            var e, i, n = t.match(/%(-|!)?[A-Z]{1}(:[^;]+;)?/gi);
            if (n) for (var s = 0, o = n.length; s < o; ++s) {
                var a = n[s].match(/%(-|!)?([a-zA-Z]{1})(:[^;]+;)?/),
                    r = (i = (i = a[0]).toString().replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1"), new RegExp(i)),
                    l = a[1] || "", c = a[3] || "", d = null, a = a[2];
                h.hasOwnProperty(a) && (d = h[a], d = Number(u[d])), null !== d && ("!" === l && (e = d, a = i = void 0, i = "s", a = "", (c = c) && (i = 1 === (c = c.replace(/(:|;|\s)/gi, "").split(/\,/)).length ? c[0] : (a = c[0], c[1])), d = 1 < Math.abs(e) ? i : a), "" === l && d < 10 && (d = "0" + d.toString()), t = t.replace(r, d.toString()))
            }
            return t.replace(/%%/, "%")
        }
    }

    var s = [], i = [], o = {precision: 100, elapse: !1, defer: !1};
    i.push(/^[0-9]*$/.source), i.push(/([0-9]{1,2}\/){2}[0-9]{4}( [0-9]{1,2}(:[0-9]{2}){2})?/.source), i.push(/[0-9]{4}([\/\-][0-9]{1,2}){2}( [0-9]{1,2}(:[0-9]{2}){2})?/.source), i = new RegExp(i.join("|"));

    function a(t, e, i) {
        this.el = t, this.$el = n(t), this.interval = null, this.offset = {}, this.options = n.extend({}, o), this.instanceNumber = s.length, s.push(this), this.$el.data("countdown-instance", this.instanceNumber), i && ("function" == typeof i ? (this.$el.on("update.countdown", i), this.$el.on("stoped.countdown", i), this.$el.on("finish.countdown", i)) : this.options = n.extend({}, o, i)), this.setFinalDate(e), !1 === this.options.defer && this.start()
    }

    var h = {
        Y: "years",
        m: "months",
        n: "daysToMonth",
        d: "daysToWeek",
        w: "weeks",
        W: "weeksToMonth",
        H: "hours",
        M: "minutes",
        S: "seconds",
        D: "totalDays",
        I: "totalHours",
        N: "totalMinutes",
        T: "totalSeconds"
    };
    n.extend(a.prototype, {
        start: function () {
            null !== this.interval && clearInterval(this.interval);
            var t = this;
            this.update(), this.interval = setInterval(function () {
                t.update.call(t)
            }, this.options.precision)
        }, stop: function () {
            clearInterval(this.interval), this.interval = null, this.dispatchEvent("stoped")
        }, toggle: function () {
            this.interval ? this.stop() : this.start()
        }, pause: function () {
            this.stop()
        }, resume: function () {
            this.start()
        }, remove: function () {
            this.stop.call(this), s[this.instanceNumber] = null, delete this.$el.data().countdownInstance
        }, setFinalDate: function (t) {
            this.finalDate = function (t) {
                if (t instanceof Date) return t;
                if (String(t).match(i)) return String(t).match(/^[0-9]*$/) && (t = Number(t)), String(t).match(/\-/) && (t = String(t).replace(/\-/g, "/")), new Date(t);
                throw new Error("Couldn't cast `" + t + "` to a date object.")
            }(t)
        }, update: function () {
            var t, e, i;
            0 !== this.$el.closest("html").length ? (t = void 0 !== n._data(this.el, "events"), e = new Date, i = this.finalDate.getTime() - e.getTime(), i = Math.ceil(i / 1e3), i = !this.options.elapse && i < 0 ? 0 : Math.abs(i), this.totalSecsLeft !== i && t && (this.totalSecsLeft = i, this.elapsed = e >= this.finalDate, this.offset = {
                seconds: this.totalSecsLeft % 60,
                minutes: Math.floor(this.totalSecsLeft / 60) % 60,
                hours: Math.floor(this.totalSecsLeft / 60 / 60) % 24,
                days: Math.floor(this.totalSecsLeft / 60 / 60 / 24) % 7,
                daysToWeek: Math.floor(this.totalSecsLeft / 60 / 60 / 24) % 7,
                daysToMonth: Math.floor(this.totalSecsLeft / 60 / 60 / 24 % 30.4368),
                weeks: Math.floor(this.totalSecsLeft / 60 / 60 / 24 / 7),
                weeksToMonth: Math.floor(this.totalSecsLeft / 60 / 60 / 24 / 7) % 4,
                months: Math.floor(this.totalSecsLeft / 60 / 60 / 24 / 30.4368),
                years: Math.abs(this.finalDate.getFullYear() - e.getFullYear()),
                totalDays: Math.floor(this.totalSecsLeft / 60 / 60 / 24),
                totalHours: Math.floor(this.totalSecsLeft / 60 / 60),
                totalMinutes: Math.floor(this.totalSecsLeft / 60),
                totalSeconds: this.totalSecsLeft
            }, this.options.elapse || 0 !== this.totalSecsLeft ? this.dispatchEvent("update") : (this.stop(), this.dispatchEvent("finish")))) : this.remove()
        }, dispatchEvent: function (t) {
            t = n.Event(t + ".countdown");
            t.finalDate = this.finalDate, t.elapsed = this.elapsed, t.offset = n.extend({}, this.offset), t.strftime = e(this.offset), this.$el.trigger(t)
        }
    }), n.fn.countdown = function () {
        var i = Array.prototype.slice.call(arguments, 0);
        return this.each(function () {
            var t, e = n(this).data("countdown-instance");
            void 0 !== e ? (t = s[e], e = i[0], a.prototype.hasOwnProperty(e) ? t[e].apply(t, i.slice(1)) : null === String(e).match(/^[$A-Z_][0-9A-Z_$]*$/i) ? (t.setFinalDate.call(t, e), t.start()) : n.error("Method %s does not exist on jQuery.countdown".replace(/\%s/gi, e))) : new a(this, i[0], i[1])
        })
    }
}), function (t) {
    "function" == typeof define && define.amd ? define(["jquery"], t) : t("object" == typeof exports ? require("jquery") : jQuery)
}(function (u) {
    function h(t) {
        return f.raw ? t : encodeURIComponent(t)
    }

    function p(t, e) {
        t = f.raw ? t : function (t) {
            0 === t.indexOf('"') && (t = t.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\"));
            try {
                return t = decodeURIComponent(t.replace(i, " ")), f.json ? JSON.parse(t) : t
            } catch (t) {
            }
        }(t);
        return u.isFunction(e) ? e(t) : t
    }

    var i = /\+/g, f = u.cookie = function (t, e, i) {
        var n, s;
        if (void 0 !== e && !u.isFunction(e)) return "number" == typeof (i = u.extend({}, f.defaults, i)).expires && (s = i.expires, (n = i.expires = new Date).setTime(+n + 864e5 * s)), document.cookie = [h(t), "=", (s = e, h(f.json ? JSON.stringify(s) : String(s))), i.expires ? "; expires=" + i.expires.toUTCString() : "", i.path ? "; path=" + i.path : "", i.domain ? "; domain=" + i.domain : "", i.secure ? "; secure" : ""].join("");
        for (var o = t ? void 0 : {}, a = document.cookie ? document.cookie.split("; ") : [], r = 0, l = a.length; r < l; r++) {
            var c = a[r].split("="), d = (d = c.shift(), f.raw ? d : decodeURIComponent(d)), c = c.join("=");
            if (t && t === d) {
                o = p(c, e);
                break
            }
            t || void 0 === (c = p(c)) || (o[d] = c)
        }
        return o
    };
    f.defaults = {}, u.removeCookie = function (t, e) {
        return void 0 !== u.cookie(t) && (u.cookie(t, "", u.extend({}, e, {expires: -1})), !u.cookie(t))
    }
}), function (t) {
    "function" == typeof define && define.amd ? define(["jquery"], t) : t("object" == typeof exports ? require("jquery") : window.jQuery || window.Zepto)
}(function (c) {
    function t() {
    }

    function d(t, e) {
        f.ev.on("mfp" + t + _, e)
    }

    function u(t, e, i, n) {
        var s = document.createElement("div");
        return s.className = "mfp-" + t, i && (s.innerHTML = i), n ? e && e.appendChild(s) : (s = c(s), e && s.appendTo(e)), s
    }

    function h(t, e) {
        f.ev.triggerHandler("mfp" + t, e), f.st.callbacks && (t = t.charAt(0).toLowerCase() + t.slice(1), f.st.callbacks[t] && f.st.callbacks[t].apply(f, c.isArray(e) ? e : [e]))
    }

    function p(t) {
        return t === e && f.currTemplate.closeBtn || (f.currTemplate.closeBtn = c(f.st.closeMarkup.replace("%title%", f.st.tClose)), e = t), f.currTemplate.closeBtn
    }

    function o() {
        c.magnificPopup.instance || ((f = new t).init(), c.magnificPopup.instance = f)
    }

    var f, n, m, s, g, e, l = "Close", v = "BeforeClose", y = "MarkupParse", w = "Open", _ = ".mfp", b = "mfp-ready",
        i = "mfp-removing", a = "mfp-prevent-close", r = !!window.jQuery, x = c(window);
    t.prototype = {
        constructor: t, init: function () {
            var t = navigator.appVersion;
            f.isLowIE = f.isIE8 = document.all && !document.addEventListener, f.isAndroid = /android/gi.test(t), f.isIOS = /iphone|ipad|ipod/gi.test(t), f.supportsTransition = function () {
                var t = document.createElement("p").style, e = ["ms", "O", "Moz", "Webkit"];
                if (void 0 !== t.transition) return !0;
                for (; e.length;) if (e.pop() + "Transition" in t) return !0;
                return !1
            }(), f.probablyMobile = f.isAndroid || f.isIOS || /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent), m = c(document), f.popupsCache = {}
        }, open: function (t) {
            if (!1 === t.isObj) {
                f.items = t.items.toArray(), f.index = 0;
                for (var e, i = t.items, n = 0; n < i.length; n++) if ((e = i[n]).parsed && (e = e.el[0]), e === t.el[0]) {
                    f.index = n;
                    break
                }
            } else f.items = c.isArray(t.items) ? t.items : [t.items], f.index = t.index || 0;
            if (!f.isOpen) {
                f.types = [], g = "", t.mainEl && t.mainEl.length ? f.ev = t.mainEl.eq(0) : f.ev = m, t.key ? (f.popupsCache[t.key] || (f.popupsCache[t.key] = {}), f.currTemplate = f.popupsCache[t.key]) : f.currTemplate = {}, f.st = c.extend(!0, {}, c.magnificPopup.defaults, t), f.fixedContentPos = "auto" === f.st.fixedContentPos ? !f.probablyMobile : f.st.fixedContentPos, f.st.modal && (f.st.closeOnContentClick = !1, f.st.closeOnBgClick = !1, f.st.showCloseBtn = !1, f.st.enableEscapeKey = !1), f.bgOverlay || (f.bgOverlay = u("bg").on("click" + _, function () {
                    f.close()
                }), f.wrap = u("wrap").attr("tabindex", -1).on("click" + _, function (t) {
                    f._checkIfClose(t.target) && f.close()
                }), f.container = u("container", f.wrap)), f.contentContainer = u("content"), f.st.preloader && (f.preloader = u("preloader", f.container, f.st.tLoading));
                var s = c.magnificPopup.modules;
                for (n = 0; n < s.length; n++) {
                    var o = (o = s[n]).charAt(0).toUpperCase() + o.slice(1);
                    f["init" + o].call(f)
                }
                h("BeforeOpen"), f.st.showCloseBtn && (f.st.closeBtnInside ? (d(y, function (t, e, i, n) {
                    i.close_replaceWith = p(n.type)
                }), g += " mfp-close-btn-in") : f.wrap.append(p())), f.st.alignTop && (g += " mfp-align-top"), f.fixedContentPos ? f.wrap.css({
                    overflow: f.st.overflowY,
                    overflowX: "hidden",
                    overflowY: f.st.overflowY
                }) : f.wrap.css({
                    top: x.scrollTop(),
                    position: "absolute"
                }), !1 !== f.st.fixedBgPos && ("auto" !== f.st.fixedBgPos || f.fixedContentPos) || f.bgOverlay.css({
                    height: m.height(),
                    position: "absolute"
                }), f.st.enableEscapeKey && m.on("keyup" + _, function (t) {
                    27 === t.keyCode && f.close()
                }), x.on("resize" + _, function () {
                    f.updateSize()
                }), f.st.closeOnContentClick || (g += " mfp-auto-cursor"), g && f.wrap.addClass(g);
                var a = f.wH = x.height(), r = {};
                f.fixedContentPos && f._hasScrollBar(a) && ((l = f._getScrollbarSize()) && (r.marginRight = l)), f.fixedContentPos && (f.isIE7 ? c("body, html").css("overflow", "hidden") : r.overflow = "hidden");
                var l = f.st.mainClass;
                return f.isIE7 && (l += " mfp-ie7"), l && f._addClassTomfp(l), f.updateItemHTML(), h("BuildControls"), c("html").css(r), f.bgOverlay.add(f.wrap).prependTo(f.st.prependTo || c(document.body)), f._lastFocusedEl = document.activeElement, setTimeout(function () {
                    f.content ? (f._addClassTomfp(b), f._setFocus()) : f.bgOverlay.addClass(b), m.on("focusin" + _, f._onFocusIn)
                }, 16), f.isOpen = !0, f.updateSize(a), h(w), t
            }
            f.updateItemHTML()
        }, close: function () {
            f.isOpen && (h(v), f.isOpen = !1, f.st.removalDelay && !f.isLowIE && f.supportsTransition ? (f._addClassTomfp(i), setTimeout(function () {
                f._close()
            }, f.st.removalDelay)) : f._close())
        }, _close: function () {
            h(l);
            var t = i + " " + b + " ";
            f.bgOverlay.detach(), f.wrap.detach(), f.container.empty(), f.st.mainClass && (t += f.st.mainClass + " "), f._removeClassFrommfp(t), f.fixedContentPos && (t = {marginRight: ""}, f.isIE7 ? c("body, html").css("overflow", "") : t.overflow = "", c("html").css(t)), m.off("keyup.mfp focusin" + _), f.ev.off(_), f.wrap.attr("class", "mfp-wrap").removeAttr("style"), f.bgOverlay.attr("class", "mfp-bg"), f.container.attr("class", "mfp-container"), !f.st.showCloseBtn || f.st.closeBtnInside && !0 !== f.currTemplate[f.currItem.type] || f.currTemplate.closeBtn && f.currTemplate.closeBtn.detach(), f.st.autoFocusLast && f._lastFocusedEl && c(f._lastFocusedEl).focus(), f.currItem = null, f.content = null, f.currTemplate = null, f.prevHeight = 0, h("AfterClose")
        }, updateSize: function (t) {
            var e;
            f.isIOS ? (e = document.documentElement.clientWidth / window.innerWidth, e = window.innerHeight * e, f.wrap.css("height", e), f.wH = e) : f.wH = t || x.height(), f.fixedContentPos || f.wrap.css("height", f.wH), h("Resize")
        }, updateItemHTML: function () {
            var t = f.items[f.index];
            f.contentContainer.detach(), f.content && f.content.detach(), t.parsed || (t = f.parseEl(f.index));
            var e = t.type;
            h("BeforeChange", [f.currItem ? f.currItem.type : "", e]), f.currItem = t, f.currTemplate[e] || (i = !!f.st[e] && f.st[e].markup, h("FirstMarkupParse", i), f.currTemplate[e] = !i || c(i)), s && s !== t.type && f.container.removeClass("mfp-" + s + "-holder");
            var i = f["get" + e.charAt(0).toUpperCase() + e.slice(1)](t, f.currTemplate[e]);
            f.appendContent(i, e), t.preloaded = !0, h("Change", t), s = t.type, f.container.prepend(f.contentContainer), h("AfterChange")
        }, appendContent: function (t, e) {
            (f.content = t) ? f.st.showCloseBtn && f.st.closeBtnInside && !0 === f.currTemplate[e] ? f.content.find(".mfp-close").length || f.content.append(p()) : f.content = t : f.content = "", h("BeforeAppend"), f.container.addClass("mfp-" + e + "-holder"), f.contentContainer.append(f.content)
        }, parseEl: function (t) {
            var e, i = f.items[t];
            if ((i = i.tagName ? {el: c(i)} : (e = i.type, {data: i, src: i.src})).el) {
                for (var n = f.types, s = 0; s < n.length; s++) if (i.el.hasClass("mfp-" + n[s])) {
                    e = n[s];
                    break
                }
                i.src = i.el.attr("data-mfp-src"), i.src || (i.src = i.el.attr("href"))
            }
            return i.type = e || f.st.type || "inline", i.index = t, i.parsed = !0, f.items[t] = i, h("ElementParse", i), f.items[t]
        }, addGroup: function (e, i) {
            function t(t) {
                t.mfpEl = this, f._openClick(t, e, i)
            }

            var n = "click.magnificPopup";
            (i = i || {}).mainEl = e, i.items ? (i.isObj = !0, e.off(n).on(n, t)) : (i.isObj = !1, i.delegate ? e.off(n).on(n, i.delegate, t) : (i.items = e).off(n).on(n, t))
        }, _openClick: function (t, e, i) {
            if ((void 0 !== i.midClick ? i : c.magnificPopup.defaults).midClick || !(2 === t.which || t.ctrlKey || t.metaKey || t.altKey || t.shiftKey)) {
                var n = (void 0 !== i.disableOn ? i : c.magnificPopup.defaults).disableOn;
                if (n) if (c.isFunction(n)) {
                    if (!n.call(f)) return !0
                } else if (x.width() < n) return !0;
                t.type && (t.preventDefault(), f.isOpen && t.stopPropagation()), i.el = c(t.mfpEl), i.delegate && (i.items = e.find(i.delegate)), f.open(i)
            }
        }, updateStatus: function (t, e) {
            var i;
            f.preloader && (n !== t && f.container.removeClass("mfp-s-" + n), e || "loading" !== t || (e = f.st.tLoading), h("UpdateStatus", i = {
                status: t,
                text: e
            }), t = i.status, e = i.text, f.preloader.html(e), f.preloader.find("a").on("click", function (t) {
                t.stopImmediatePropagation()
            }), f.container.addClass("mfp-s-" + t), n = t)
        }, _checkIfClose: function (t) {
            if (!c(t).hasClass(a)) {
                var e = f.st.closeOnContentClick, i = f.st.closeOnBgClick;
                if (e && i) return !0;
                if (!f.content || c(t).hasClass("mfp-close") || f.preloader && t === f.preloader[0]) return !0;
                if (t === f.content[0] || c.contains(f.content[0], t)) {
                    if (e) return !0
                } else if (i && c.contains(document, t)) return !0;
                return !1
            }
        }, _addClassTomfp: function (t) {
            f.bgOverlay.addClass(t), f.wrap.addClass(t)
        }, _removeClassFrommfp: function (t) {
            this.bgOverlay.removeClass(t), f.wrap.removeClass(t)
        }, _hasScrollBar: function (t) {
            return (f.isIE7 ? m.height() : document.body.scrollHeight) > (t || x.height())
        }, _setFocus: function () {
            (f.st.focus ? f.content.find(f.st.focus).eq(0) : f.wrap).focus()
        }, _onFocusIn: function (t) {
            return t.target === f.wrap[0] || c.contains(f.wrap[0], t.target) ? void 0 : (f._setFocus(), !1)
        }, _parseMarkup: function (s, t, e) {
            var o;
            e.data && (t = c.extend(e.data, t)), h(y, [s, t, e]), c.each(t, function (t, e) {
                return void 0 === e || !1 === e || void (1 < (o = t.split("_")).length ? 0 < (i = s.find(_ + "-" + o[0])).length && ("replaceWith" === (n = o[1]) ? i[0] !== e[0] && i.replaceWith(e) : "img" === n ? i.is("img") ? i.attr("src", e) : i.replaceWith(c("<img>").attr("src", e).attr("class", i.attr("class"))) : i.attr(o[1], e)) : s.find(_ + "-" + t).html(e));
                var i, n
            })
        }, _getScrollbarSize: function () {
            var t;
            return void 0 === f.scrollbarSize && ((t = document.createElement("div")).style.cssText = "width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;", document.body.appendChild(t), f.scrollbarSize = t.offsetWidth - t.clientWidth, document.body.removeChild(t)), f.scrollbarSize
        }
    }, c.magnificPopup = {
        instance: null,
        proto: t.prototype,
        modules: [],
        open: function (t, e) {
            return o(), (t = t ? c.extend(!0, {}, t) : {}).isObj = !0, t.index = e || 0, this.instance.open(t)
        },
        close: function () {
            return c.magnificPopup.instance && c.magnificPopup.instance.close()
        },
        registerModule: function (t, e) {
            e.options && (c.magnificPopup.defaults[t] = e.options), c.extend(this.proto, e.proto), this.modules.push(t)
        },
        defaults: {
            disableOn: 0,
            key: null,
            midClick: !1,
            mainClass: "",
            preloader: !0,
            focus: "",
            closeOnContentClick: !1,
            closeOnBgClick: !0,
            closeBtnInside: !0,
            showCloseBtn: !0,
            enableEscapeKey: !0,
            modal: !1,
            alignTop: !1,
            removalDelay: 0,
            prependTo: null,
            fixedContentPos: "auto",
            fixedBgPos: "auto",
            overflowY: "auto",
            closeMarkup: '<button title="%title%" type="button" class="mfp-close">&#215;</button>',
            tClose: "Close (Esc)",
            tLoading: "Loading...",
            autoFocusLast: !0
        }
    }, c.fn.magnificPopup = function (t) {
        o();
        var e, i, n, s = c(this);
        return "string" == typeof t ? "open" === t ? (e = r ? s.data("magnificPopup") : s[0].magnificPopup, i = parseInt(arguments[1], 10) || 0, n = e.items ? e.items[i] : (n = s, e.delegate && (n = n.find(e.delegate)), n.eq(i)), f._openClick({mfpEl: n}, s, e)) : f.isOpen && f[t].apply(f, Array.prototype.slice.call(arguments, 1)) : (t = c.extend(!0, {}, t), r ? s.data("magnificPopup", t) : s[0].magnificPopup = t, f.addGroup(s, t)), s
    };

    function C() {
        E && (T.after(E.addClass(S)).detach(), E = null)
    }

    var S, T, E, k = "inline";
    c.magnificPopup.registerModule(k, {
        options: {hiddenClass: "hide", markup: "", tNotFound: "Content not found"},
        proto: {
            initInline: function () {
                f.types.push(k), d(l + "." + k, function () {
                    C()
                })
            }, getInline: function (t, e) {
                if (C(), t.src) {
                    var i, n = f.st.inline, s = c(t.src);
                    return s.length ? ((i = s[0].parentNode) && i.tagName && (T || (S = n.hiddenClass, T = u(S), S = "mfp-" + S), E = s.after(T).detach().removeClass(S)), f.updateStatus("ready")) : (f.updateStatus("error", n.tNotFound), s = c("<div>")), t.inlineElement = s
                }
                return f.updateStatus("ready"), f._parseMarkup(e, {}, t), e
            }
        }
    });

    function I() {
        D && c(document.body).removeClass(D)
    }

    function A() {
        I(), f.req && f.req.abort()
    }

    var D, j = "ajax";
    c.magnificPopup.registerModule(j, {
        options: {
            settings: null,
            cursor: "mfp-ajax-cur",
            tError: '<a href="%url%">The content</a> could not be loaded.'
        }, proto: {
            initAjax: function () {
                f.types.push(j), D = f.st.ajax.cursor, d(l + "." + j, A), d("BeforeChange." + j, A)
            }, getAjax: function (n) {
                D && c(document.body).addClass(D), f.updateStatus("loading");
                var t = c.extend({
                    url: n.src, success: function (t, e, i) {
                        i = {data: t, xhr: i};
                        h("ParseAjax", i), f.appendContent(c(i.data), j), n.finished = !0, I(), f._setFocus(), setTimeout(function () {
                            f.wrap.addClass(b)
                        }, 16), f.updateStatus("ready"), h("AjaxContentAdded")
                    }, error: function () {
                        I(), n.finished = n.loadError = !0, f.updateStatus("error", f.st.ajax.tError.replace("%url%", n.src))
                    }
                }, f.st.ajax.settings);
                return f.req = c.ajax(t), ""
            }
        }
    });
    var $;
    c.magnificPopup.registerModule("image", {
        options: {
            markup: '<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',
            cursor: "mfp-zoom-out-cur",
            titleSrc: "title",
            verticalFit: !0,
            tError: '<a href="%url%">The image</a> could not be loaded.'
        }, proto: {
            initImage: function () {
                var t = f.st.image, e = ".image";
                f.types.push("image"), d(w + e, function () {
                    "image" === f.currItem.type && t.cursor && c(document.body).addClass(t.cursor)
                }), d(l + e, function () {
                    t.cursor && c(document.body).removeClass(t.cursor), x.off("resize" + _)
                }), d("Resize" + e, f.resizeImage), f.isLowIE && d("AfterChange", f.resizeImage)
            }, resizeImage: function () {
                var t, e = f.currItem;
                e && e.img && f.st.image.verticalFit && (t = 0, f.isLowIE && (t = parseInt(e.img.css("padding-top"), 10) + parseInt(e.img.css("padding-bottom"), 10)), e.img.css("max-height", f.wH - t))
            }, _onImageHasSize: function (t) {
                t.img && (t.hasSize = !0, $ && clearInterval($), t.isCheckingImgSize = !1, h("ImageHasSize", t), t.imgHidden && (f.content && f.content.removeClass("mfp-loading"), t.imgHidden = !1))
            }, findImageSize: function (e) {
                var i = 0, n = e.img[0], s = function (t) {
                    $ && clearInterval($), $ = setInterval(function () {
                        return 0 < n.naturalWidth ? void f._onImageHasSize(e) : (200 < i && clearInterval($), void (3 === ++i ? s(10) : 40 === i ? s(50) : 100 === i && s(500)))
                    }, t)
                };
                s(1)
            }, getImage: function (t, e) {
                var i, n = 0, s = function () {
                    t && (t.img[0].complete ? (t.img.off(".mfploader"), t === f.currItem && (f._onImageHasSize(t), f.updateStatus("ready")), t.hasSize = !0, t.loaded = !0, h("ImageLoadComplete")) : ++n < 200 ? setTimeout(s, 100) : o())
                }, o = function () {
                    t && (t.img.off(".mfploader"), t === f.currItem && (f._onImageHasSize(t), f.updateStatus("error", a.tError.replace("%url%", t.src))), t.hasSize = !0, t.loaded = !0, t.loadError = !0)
                }, a = f.st.image, r = e.find(".mfp-img");
                return r.length && ((i = document.createElement("img")).className = "mfp-img", t.el && t.el.find("img").length && (i.alt = t.el.find("img").attr("alt")), t.img = c(i).on("load.mfploader", s).on("error.mfploader", o), i.src = t.src, r.is("img") && (t.img = t.img.clone()), 0 < (i = t.img[0]).naturalWidth ? t.hasSize = !0 : i.width || (t.hasSize = !1)), f._parseMarkup(e, {
                    title: function (t) {
                        if (t.data && void 0 !== t.data.title) return t.data.title;
                        var e = f.st.image.titleSrc;
                        if (e) {
                            if (c.isFunction(e)) return e.call(f, t);
                            if (t.el) return t.el.attr(e) || ""
                        }
                        return ""
                    }(t), img_replaceWith: t.img
                }, t), f.resizeImage(), t.hasSize ? ($ && clearInterval($), t.loadError ? (e.addClass("mfp-loading"), f.updateStatus("error", a.tError.replace("%url%", t.src))) : (e.removeClass("mfp-loading"), f.updateStatus("ready"))) : (f.updateStatus("loading"), t.loading = !0, t.hasSize || (t.imgHidden = !0, e.addClass("mfp-loading"), f.findImageSize(t))), e
            }
        }
    });
    var M;
    c.magnificPopup.registerModule("zoom", {
        options: {
            enabled: !1, easing: "ease-in-out", duration: 300, opener: function (t) {
                return t.is("img") ? t : t.find("img")
            }
        }, proto: {
            initZoom: function () {
                var t, e, i, n, s, o, a = f.st.zoom, r = ".zoom";
                a.enabled && f.supportsTransition && (n = a.duration, s = function (t) {
                    var e = t.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"),
                        i = "all " + a.duration / 1e3 + "s " + a.easing,
                        n = {position: "fixed", zIndex: 9999, left: 0, top: 0, "-webkit-backface-visibility": "hidden"},
                        t = "transition";
                    return n["-webkit-" + t] = n["-moz-" + t] = n["-o-" + t] = n[t] = i, e.css(n), e
                }, o = function () {
                    f.content.css("visibility", "visible")
                }, d("BuildControls" + r, function () {
                    f._allowZoom() && (clearTimeout(e), f.content.css("visibility", "hidden"), (t = f._getItemToZoom()) ? ((i = s(t)).css(f._getOffset()), f.wrap.append(i), e = setTimeout(function () {
                        i.css(f._getOffset(!0)), e = setTimeout(function () {
                            o(), setTimeout(function () {
                                i.remove(), t = i = null, h("ZoomAnimationEnded")
                            }, 16)
                        }, n)
                    }, 16)) : o())
                }), d(v + r, function () {
                    if (f._allowZoom()) {
                        if (clearTimeout(e), f.st.removalDelay = n, !t) {
                            if (!(t = f._getItemToZoom())) return;
                            i = s(t)
                        }
                        i.css(f._getOffset(!0)), f.wrap.append(i), f.content.css("visibility", "hidden"), setTimeout(function () {
                            i.css(f._getOffset())
                        }, 16)
                    }
                }), d(l + r, function () {
                    f._allowZoom() && (o(), i && i.remove(), t = null)
                }))
            }, _allowZoom: function () {
                return "image" === f.currItem.type
            }, _getItemToZoom: function () {
                return !!f.currItem.hasSize && f.currItem.img
            }, _getOffset: function (t) {
                var e = t ? f.currItem.img : f.st.zoom.opener(f.currItem.el || f.currItem), i = e.offset(),
                    n = parseInt(e.css("padding-top"), 10), t = parseInt(e.css("padding-bottom"), 10);
                i.top -= c(window).scrollTop() - n;
                n = {width: e.width(), height: (r ? e.innerHeight() : e[0].offsetHeight) - t - n};
                return void 0 === M && (M = void 0 !== document.createElement("p").style.MozTransform), M ? n["-moz-transform"] = n.transform = "translate(" + i.left + "px," + i.top + "px)" : (n.left = i.left, n.top = i.top), n
            }
        }
    });

    function O(t) {
        var e;
        !f.currTemplate[P] || (e = f.currTemplate[P].find("iframe")).length && (t || (e[0].src = "//about:blank"), f.isIE8 && e.css("display", t ? "block" : "none"))
    }

    var P = "iframe";
    c.magnificPopup.registerModule(P, {
        options: {
            markup: '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',
            srcAction: "iframe_src",
            patterns: {
                youtube: {index: "youtube.com", id: "v=", src: "//www.youtube.com/embed/%id%?autoplay=1"},
                vimeo: {index: "vimeo.com/", id: "/", src: "//player.vimeo.com/video/%id%?autoplay=1"},
                gmaps: {index: "//maps.google.", src: "%id%&output=embed"}
            }
        }, proto: {
            initIframe: function () {
                f.types.push(P), d("BeforeChange", function (t, e, i) {
                    e !== i && (e === P ? O() : i === P && O(!0))
                }), d(l + "." + P, function () {
                    O()
                })
            }, getIframe: function (t, e) {
                var i = t.src, n = f.st.iframe;
                c.each(n.patterns, function () {
                    return -1 < i.indexOf(this.index) ? (this.id && (i = "string" == typeof this.id ? i.substr(i.lastIndexOf(this.id) + this.id.length, i.length) : this.id.call(this, i)), i = this.src.replace("%id%", i), !1) : void 0
                });
                var s = {};
                return n.srcAction && (s[n.srcAction] = i), f._parseMarkup(e, s, t), f.updateStatus("ready"), e
            }
        }
    });

    function N(t) {
        var e = f.items.length;
        return e - 1 < t ? t - e : t < 0 ? e + t : t
    }

    function z(t, e, i) {
        return t.replace(/%curr%/gi, e + 1).replace(/%total%/gi, i)
    }

    c.magnificPopup.registerModule("gallery", {
        options: {
            enabled: !1,
            arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
            preload: [0, 2],
            navigateByImgClick: !0,
            arrows: !0,
            tPrev: "Previous (Left arrow key)",
            tNext: "Next (Right arrow key)",
            tCounter: "%curr% of %total%"
        }, proto: {
            initGallery: function () {
                var o = f.st.gallery, t = ".mfp-gallery";
                return f.direction = !0, !(!o || !o.enabled) && (g += " mfp-gallery", d(w + t, function () {
                    o.navigateByImgClick && f.wrap.on("click" + t, ".mfp-img", function () {
                        return 1 < f.items.length ? (f.next(), !1) : void 0
                    }), m.on("keydown" + t, function (t) {
                        37 === t.keyCode ? f.prev() : 39 === t.keyCode && f.next()
                    })
                }), d("UpdateStatus" + t, function (t, e) {
                    e.text && (e.text = z(e.text, f.currItem.index, f.items.length))
                }), d(y + t, function (t, e, i, n) {
                    var s = f.items.length;
                    i.counter = 1 < s ? z(o.tCounter, n.index, s) : ""
                }), d("BuildControls" + t, function () {
                    var t, e;
                    1 < f.items.length && o.arrows && !f.arrowLeft && (e = o.arrowMarkup, t = f.arrowLeft = c(e.replace(/%title%/gi, o.tPrev).replace(/%dir%/gi, "left")).addClass(a), e = f.arrowRight = c(e.replace(/%title%/gi, o.tNext).replace(/%dir%/gi, "right")).addClass(a), t.click(function () {
                        f.prev()
                    }), e.click(function () {
                        f.next()
                    }), f.container.append(t.add(e)))
                }), d("Change" + t, function () {
                    f._preloadTimeout && clearTimeout(f._preloadTimeout), f._preloadTimeout = setTimeout(function () {
                        f.preloadNearbyImages(), f._preloadTimeout = null
                    }, 16)
                }), void d(l + t, function () {
                    m.off(t), f.wrap.off("click" + t), f.arrowRight = f.arrowLeft = null
                }))
            }, next: function () {
                f.direction = !0, f.index = N(f.index + 1), f.updateItemHTML()
            }, prev: function () {
                f.direction = !1, f.index = N(f.index - 1), f.updateItemHTML()
            }, goTo: function (t) {
                f.direction = t >= f.index, f.index = t, f.updateItemHTML()
            }, preloadNearbyImages: function () {
                for (var t = f.st.gallery.preload, e = Math.min(t[0], f.items.length), i = Math.min(t[1], f.items.length), n = 1; n <= (f.direction ? i : e); n++) f._preloadItem(f.index + n);
                for (n = 1; n <= (f.direction ? e : i); n++) f._preloadItem(f.index - n)
            }, _preloadItem: function (t) {
                var e;
                t = N(t), f.items[t].preloaded || ((e = f.items[t]).parsed || (e = f.parseEl(t)), h("LazyLoad", e), "image" === e.type && (e.img = c('<img class="mfp-img" />').on("load.mfploader", function () {
                    e.hasSize = !0
                }).on("error.mfploader", function () {
                    e.hasSize = !0, e.loadError = !0, h("LazyLoadError", e)
                }).attr("src", e.src)), e.preloaded = !0)
            }
        }
    });
    var L = "retina";
    c.magnificPopup.registerModule(L, {
        options: {
            replaceSrc: function (t) {
                return t.src.replace(/\.\w+$/, function (t) {
                    return "@2x" + t
                })
            }, ratio: 1
        }, proto: {
            initRetina: function () {
                var i, n;
                1 < window.devicePixelRatio && (i = f.st.retina, n = i.ratio, 1 < (n = isNaN(n) ? n() : n) && (d("ImageHasSize." + L, function (t, e) {
                    e.img.css({"max-width": e.img[0].naturalWidth / n, width: "100%"})
                }), d("ElementParse." + L, function (t, e) {
                    e.src = i.replaceSrc(e, n)
                })))
            }
        }
    }), o()
}), function (l, i, n, r) {
    function c(t, e) {
        this.settings = null, this.options = l.extend({}, c.Defaults, e), this.$element = l(t), this._handlers = {}, this._plugins = {}, this._supress = {}, this._current = null, this._speed = null, this._coordinates = [], this._breakpoint = null, this._width = null, this._items = [], this._clones = [], this._mergers = [], this._widths = [], this._invalidated = {}, this._pipe = [], this._drag = {
            time: null,
            target: null,
            pointer: null,
            stage: {start: null, current: null},
            direction: null
        }, this._states = {
            current: {},
            tags: {initializing: ["busy"], animating: ["busy"], dragging: ["interacting"]}
        }, l.each(["onResize", "onThrottledResize"], l.proxy(function (t, e) {
            this._handlers[e] = l.proxy(this[e], this)
        }, this)), l.each(c.Plugins, l.proxy(function (t, e) {
            this._plugins[t.charAt(0).toLowerCase() + t.slice(1)] = new e(this)
        }, this)), l.each(c.Workers, l.proxy(function (t, e) {
            this._pipe.push({filter: e.filter, run: l.proxy(e.run, this)})
        }, this)), this.setup(), this.initialize()
    }

    c.Defaults = {
        items: 3,
        loop: !1,
        center: !1,
        rewind: !1,
        checkVisibility: !0,
        mouseDrag: !0,
        touchDrag: !0,
        pullDrag: !0,
        freeDrag: !1,
        margin: 0,
        stagePadding: 0,
        merge: !1,
        mergeFit: !0,
        autoWidth: !1,
        startPosition: 0,
        rtl: !1,
        smartSpeed: 250,
        fluidSpeed: !1,
        dragEndSpeed: !1,
        responsive: {},
        responsiveRefreshRate: 200,
        responsiveBaseElement: i,
        fallbackEasing: "swing",
        slideTransition: "",
        info: !1,
        nestedItemSelector: !1,
        itemElement: "div",
        stageElement: "div",
        refreshClass: "owl-refresh",
        loadedClass: "owl-loaded",
        loadingClass: "owl-loading",
        rtlClass: "owl-rtl",
        responsiveClass: "owl-responsive",
        dragClass: "owl-drag",
        itemClass: "owl-item",
        stageClass: "owl-stage",
        stageOuterClass: "owl-stage-outer",
        grabClass: "owl-grab"
    }, c.Width = {Default: "default", Inner: "inner", Outer: "outer"}, c.Type = {
        Event: "event",
        State: "state"
    }, c.Plugins = {}, c.Workers = [{
        filter: ["width", "settings"], run: function () {
            this._width = this.$element.width()
        }
    }, {
        filter: ["width", "items", "settings"], run: function (t) {
            t.current = this._items && this._items[this.relative(this._current)]
        }
    }, {
        filter: ["items", "settings"], run: function () {
            this.$stage.children(".cloned").remove()
        }
    }, {
        filter: ["width", "items", "settings"], run: function (t) {
            var e = this.settings.margin || "", i = !this.settings.autoWidth, n = this.settings.rtl,
                e = {width: "auto", "margin-left": n ? e : "", "margin-right": n ? "" : e};
            i || this.$stage.children().css(e), t.css = e
        }
    }, {
        filter: ["width", "items", "settings"], run: function (t) {
            var e = (this.width() / this.settings.items).toFixed(3) - this.settings.margin, i = null,
                n = this._items.length, s = !this.settings.autoWidth, o = [];
            for (t.items = {
                merge: !1,
                width: e
            }; n--;) i = this._mergers[n], i = this.settings.mergeFit && Math.min(i, this.settings.items) || i, t.items.merge = 1 < i || t.items.merge, o[n] = s ? e * i : this._items[n].width();
            this._widths = o
        }
    }, {
        filter: ["items", "settings"], run: function () {
            var t = [], e = this._items, i = this.settings, n = Math.max(2 * i.items, 4),
                s = 2 * Math.ceil(e.length / 2), o = i.loop && e.length ? i.rewind ? n : Math.max(n, s) : 0, a = "",
                r = "";
            for (o /= 2; 0 < o;) t.push(this.normalize(t.length / 2, !0)), a += e[t[t.length - 1]][0].outerHTML, t.push(this.normalize(e.length - 1 - (t.length - 1) / 2, !0)), r = e[t[t.length - 1]][0].outerHTML + r, --o;
            this._clones = t, l(a).addClass("cloned").appendTo(this.$stage), l(r).addClass("cloned").prependTo(this.$stage)
        }
    }, {
        filter: ["width", "items", "settings"], run: function () {
            for (var t, e, i = this.settings.rtl ? 1 : -1, n = this._clones.length + this._items.length, s = -1, o = []; ++s < n;) t = o[s - 1] || 0, e = this._widths[this.relative(s)] + this.settings.margin, o.push(t + e * i);
            this._coordinates = o
        }
    }, {
        filter: ["width", "items", "settings"], run: function () {
            var t = this.settings.stagePadding, e = this._coordinates, t = {
                width: Math.ceil(Math.abs(e[e.length - 1])) + 2 * t,
                "padding-left": t || "",
                "padding-right": t || ""
            };
            this.$stage.css(t)
        }
    }, {
        filter: ["width", "items", "settings"], run: function (t) {
            var e = this._coordinates.length, i = !this.settings.autoWidth, n = this.$stage.children();
            if (i && t.items.merge) for (; e--;) t.css.width = this._widths[this.relative(e)], n.eq(e).css(t.css); else i && (t.css.width = t.items.width, n.css(t.css))
        }
    }, {
        filter: ["items"], run: function () {
            this._coordinates.length < 1 && this.$stage.removeAttr("style")
        }
    }, {
        filter: ["width", "items", "settings"], run: function (t) {
            t.current = t.current ? this.$stage.children().index(t.current) : 0, t.current = Math.max(this.minimum(), Math.min(this.maximum(), t.current)), this.reset(t.current)
        }
    }, {
        filter: ["position"], run: function () {
            this.animate(this.coordinates(this._current))
        }
    }, {
        filter: ["width", "position", "items", "settings"], run: function () {
            for (var t, e, i = this.settings.rtl ? 1 : -1, n = 2 * this.settings.stagePadding, s = this.coordinates(this.current()) + n, o = s + this.width() * i, a = [], r = 0, l = this._coordinates.length; r < l; r++) t = this._coordinates[r - 1] || 0, e = Math.abs(this._coordinates[r]) + n * i, (this.op(t, "<=", s) && this.op(t, ">", o) || this.op(e, "<", s) && this.op(e, ">", o)) && a.push(r);
            this.$stage.children(".active").removeClass("active"), this.$stage.children(":eq(" + a.join("), :eq(") + ")").addClass("active"), this.$stage.children(".center").removeClass("center"), this.settings.center && this.$stage.children().eq(this.current()).addClass("center")
        }
    }], c.prototype.initializeStage = function () {
        this.$stage = this.$element.find("." + this.settings.stageClass), this.$stage.length || (this.$element.addClass(this.options.loadingClass), this.$stage = l("<" + this.settings.stageElement + ">", {class: this.settings.stageClass}).wrap(l("<div/>", {class: this.settings.stageOuterClass})), this.$element.append(this.$stage.parent()))
    }, c.prototype.initializeItems = function () {
        var t = this.$element.find(".owl-item");
        if (t.length) return this._items = t.get().map(function (t) {
            return l(t)
        }), this._mergers = this._items.map(function () {
            return 1
        }), void this.refresh();
        this.replace(this.$element.children().not(this.$stage.parent())), this.isVisible() ? this.refresh() : this.invalidate("width"), this.$element.removeClass(this.options.loadingClass).addClass(this.options.loadedClass)
    }, c.prototype.initialize = function () {
        var t, e;
        this.enter("initializing"), this.trigger("initialize"), this.$element.toggleClass(this.settings.rtlClass, this.settings.rtl), this.settings.autoWidth && !this.is("pre-loading") && (t = this.$element.find("img"), e = this.settings.nestedItemSelector ? "." + this.settings.nestedItemSelector : r, e = this.$element.children(e).width(), t.length && e <= 0 && this.preloadAutoWidthImages(t)), this.initializeStage(), this.initializeItems(), this.registerEventHandlers(), this.leave("initializing"), this.trigger("initialized")
    }, c.prototype.isVisible = function () {
        return !this.settings.checkVisibility || this.$element.is(":visible")
    }, c.prototype.setup = function () {
        var e = this.viewport(), t = this.options.responsive, i = -1, n = null;
        t ? (l.each(t, function (t) {
            t <= e && i < t && (i = Number(t))
        }), "function" == typeof (n = l.extend({}, this.options, t[i])).stagePadding && (n.stagePadding = n.stagePadding()), delete n.responsive, n.responsiveClass && this.$element.attr("class", this.$element.attr("class").replace(new RegExp("(" + this.options.responsiveClass + "-)\\S+\\s", "g"), "$1" + i))) : n = l.extend({}, this.options), this.trigger("change", {
            property: {
                name: "settings",
                value: n
            }
        }), this._breakpoint = i, this.settings = n, this.invalidate("settings"), this.trigger("changed", {
            property: {
                name: "settings",
                value: this.settings
            }
        })
    }, c.prototype.optionsLogic = function () {
        this.settings.autoWidth && (this.settings.stagePadding = !1, this.settings.merge = !1)
    }, c.prototype.prepare = function (t) {
        var e = this.trigger("prepare", {content: t});
        return e.data || (e.data = l("<" + this.settings.itemElement + "/>").addClass(this.options.itemClass).append(t)), this.trigger("prepared", {content: e.data}), e.data
    }, c.prototype.update = function () {
        for (var t = 0, e = this._pipe.length, i = l.proxy(function (t) {
            return this[t]
        }, this._invalidated), n = {}; t < e;) (this._invalidated.all || 0 < l.grep(this._pipe[t].filter, i).length) && this._pipe[t].run(n), t++;
        this._invalidated = {}, this.is("valid") || this.enter("valid")
    }, c.prototype.width = function (t) {
        switch (t = t || c.Width.Default) {
            case c.Width.Inner:
            case c.Width.Outer:
                return this._width;
            default:
                return this._width - 2 * this.settings.stagePadding + this.settings.margin
        }
    }, c.prototype.refresh = function () {
        this.enter("refreshing"), this.trigger("refresh"), this.setup(), this.optionsLogic(), this.$element.addClass(this.options.refreshClass), this.update(), this.$element.removeClass(this.options.refreshClass), this.leave("refreshing"), this.trigger("refreshed")
    }, c.prototype.onThrottledResize = function () {
        i.clearTimeout(this.resizeTimer), this.resizeTimer = i.setTimeout(this._handlers.onResize, this.settings.responsiveRefreshRate)
    }, c.prototype.onResize = function () {
        return !!this._items.length && this._width !== this.$element.width() && !!this.isVisible() && (this.enter("resizing"), this.trigger("resize").isDefaultPrevented() ? (this.leave("resizing"), !1) : (this.invalidate("width"), this.refresh(), this.leave("resizing"), void this.trigger("resized")))
    }, c.prototype.registerEventHandlers = function () {
        l.support.transition && this.$stage.on(l.support.transition.end + ".owl.core", l.proxy(this.onTransitionEnd, this)), !1 !== this.settings.responsive && this.on(i, "resize", this._handlers.onThrottledResize), this.settings.mouseDrag && (this.$element.addClass(this.options.dragClass), this.$stage.on("mousedown.owl.core", l.proxy(this.onDragStart, this)), this.$stage.on("dragstart.owl.core selectstart.owl.core", function () {
            return !1
        })), this.settings.touchDrag && (this.$stage.on("touchstart.owl.core", l.proxy(this.onDragStart, this)), this.$stage.on("touchcancel.owl.core", l.proxy(this.onDragEnd, this)))
    }, c.prototype.onDragStart = function (t) {
        var e = null;
        3 !== t.which && (e = l.support.transform ? {
            x: (e = this.$stage.css("transform").replace(/.*\(|\)| /g, "").split(","))[16 === e.length ? 12 : 4],
            y: e[16 === e.length ? 13 : 5]
        } : (e = this.$stage.position(), {
            x: this.settings.rtl ? e.left + this.$stage.width() - this.width() + this.settings.margin : e.left,
            y: e.top
        }), this.is("animating") && (l.support.transform ? this.animate(e.x) : this.$stage.stop(), this.invalidate("position")), this.$element.toggleClass(this.options.grabClass, "mousedown" === t.type), this.speed(0), this._drag.time = (new Date).getTime(), this._drag.target = l(t.target), this._drag.stage.start = e, this._drag.stage.current = e, this._drag.pointer = this.pointer(t), l(n).on("mouseup.owl.core touchend.owl.core", l.proxy(this.onDragEnd, this)), l(n).one("mousemove.owl.core touchmove.owl.core", l.proxy(function (t) {
            var e = this.difference(this._drag.pointer, this.pointer(t));
            l(n).on("mousemove.owl.core touchmove.owl.core", l.proxy(this.onDragMove, this)), Math.abs(e.x) < Math.abs(e.y) && this.is("valid") || (t.preventDefault(), this.enter("dragging"), this.trigger("drag"))
        }, this)))
    }, c.prototype.onDragMove = function (t) {
        var e, i = null, n = null, s = this.difference(this._drag.pointer, this.pointer(t)),
            o = this.difference(this._drag.stage.start, s);
        this.is("dragging") && (t.preventDefault(), this.settings.loop ? (i = this.coordinates(this.minimum()), n = this.coordinates(this.maximum() + 1) - i, o.x = ((o.x - i) % n + n) % n + i) : (i = this.settings.rtl ? this.coordinates(this.maximum()) : this.coordinates(this.minimum()), n = this.settings.rtl ? this.coordinates(this.minimum()) : this.coordinates(this.maximum()), e = this.settings.pullDrag ? -1 * s.x / 5 : 0, o.x = Math.max(Math.min(o.x, i + e), n + e)), this._drag.stage.current = o, this.animate(o.x))
    }, c.prototype.onDragEnd = function (t) {
        var e = this.difference(this._drag.pointer, this.pointer(t)), i = this._drag.stage.current,
            t = 0 < e.x ^ this.settings.rtl ? "left" : "right";
        l(n).off(".owl.core"), this.$element.removeClass(this.options.grabClass), (0 !== e.x && this.is("dragging") || !this.is("valid")) && (this.speed(this.settings.dragEndSpeed || this.settings.smartSpeed), this.current(this.closest(i.x, 0 !== e.x ? t : this._drag.direction)), this.invalidate("position"), this.update(), this._drag.direction = t, (3 < Math.abs(e.x) || 300 < (new Date).getTime() - this._drag.time) && this._drag.target.one("click.owl.core", function () {
            return !1
        })), this.is("dragging") && (this.leave("dragging"), this.trigger("dragged"))
    }, c.prototype.closest = function (i, n) {
        var s = -1, o = this.width(), a = this.coordinates();
        return this.settings.freeDrag || l.each(a, l.proxy(function (t, e) {
            return "left" === n && e - 30 < i && i < e + 30 ? s = t : "right" === n && e - o - 30 < i && i < e - o + 30 ? s = t + 1 : this.op(i, "<", e) && this.op(i, ">", a[t + 1] !== r ? a[t + 1] : e - o) && (s = "left" === n ? t + 1 : t), -1 === s
        }, this)), this.settings.loop || (this.op(i, ">", a[this.minimum()]) ? s = i = this.minimum() : this.op(i, "<", a[this.maximum()]) && (s = i = this.maximum())), s
    }, c.prototype.animate = function (t) {
        var e = 0 < this.speed();
        this.is("animating") && this.onTransitionEnd(), e && (this.enter("animating"), this.trigger("translate")), l.support.transform3d && l.support.transition ? this.$stage.css({
            transform: "translate3d(" + t + "px,0px,0px)",
            transition: this.speed() / 1e3 + "s" + (this.settings.slideTransition ? " " + this.settings.slideTransition : "")
        }) : e ? this.$stage.animate({left: t + "px"}, this.speed(), this.settings.fallbackEasing, l.proxy(this.onTransitionEnd, this)) : this.$stage.css({left: t + "px"})
    }, c.prototype.is = function (t) {
        return this._states.current[t] && 0 < this._states.current[t]
    }, c.prototype.current = function (t) {
        return t === r ? this._current : 0 === this._items.length ? r : (t = this.normalize(t), this._current !== t && ((e = this.trigger("change", {
            property: {
                name: "position",
                value: t
            }
        })).data !== r && (t = this.normalize(e.data)), this._current = t, this.invalidate("position"), this.trigger("changed", {
            property: {
                name: "position",
                value: this._current
            }
        })), this._current);
        var e
    }, c.prototype.invalidate = function (t) {
        return "string" === l.type(t) && (this._invalidated[t] = !0, this.is("valid") && this.leave("valid")), l.map(this._invalidated, function (t, e) {
            return e
        })
    }, c.prototype.reset = function (t) {
        (t = this.normalize(t)) !== r && (this._speed = 0, this._current = t, this.suppress(["translate", "translated"]), this.animate(this.coordinates(t)), this.release(["translate", "translated"]))
    }, c.prototype.normalize = function (t, e) {
        var i = this._items.length, e = e ? 0 : this._clones.length;
        return !this.isNumeric(t) || i < 1 ? t = r : (t < 0 || i + e <= t) && (t = ((t - e / 2) % i + i) % i + e / 2), t
    }, c.prototype.relative = function (t) {
        return t -= this._clones.length / 2, this.normalize(t, !0)
    }, c.prototype.maximum = function (t) {
        var e, i, n, s = this.settings, o = this._coordinates.length;
        if (s.loop) o = this._clones.length / 2 + this._items.length - 1; else if (s.autoWidth || s.merge) {
            if (e = this._items.length) for (i = this._items[--e].width(), n = this.$element.width(); e-- && !((i += this._items[e].width() + this.settings.margin) > n);) ;
            o = e + 1
        } else o = s.center ? this._items.length - 1 : this._items.length - s.items;
        return t && (o -= this._clones.length / 2), Math.max(o, 0)
    }, c.prototype.minimum = function (t) {
        return t ? 0 : this._clones.length / 2
    }, c.prototype.items = function (t) {
        return t === r ? this._items.slice() : (t = this.normalize(t, !0), this._items[t])
    }, c.prototype.mergers = function (t) {
        return t === r ? this._mergers.slice() : (t = this.normalize(t, !0), this._mergers[t])
    }, c.prototype.clones = function (i) {
        function n(t) {
            return t % 2 == 0 ? s + t / 2 : e - (t + 1) / 2
        }

        var e = this._clones.length / 2, s = e + this._items.length;
        return i === r ? l.map(this._clones, function (t, e) {
            return n(e)
        }) : l.map(this._clones, function (t, e) {
            return t === i ? n(e) : null
        })
    }, c.prototype.speed = function (t) {
        return t !== r && (this._speed = t), this._speed
    }, c.prototype.coordinates = function (t) {
        var e, i = 1, n = t - 1;
        return t === r ? l.map(this._coordinates, l.proxy(function (t, e) {
            return this.coordinates(e)
        }, this)) : (this.settings.center ? (this.settings.rtl && (i = -1, n = t + 1), e = this._coordinates[t], e += (this.width() - e + (this._coordinates[n] || 0)) / 2 * i) : e = this._coordinates[n] || 0, e = Math.ceil(e))
    }, c.prototype.duration = function (t, e, i) {
        return 0 === i ? 0 : Math.min(Math.max(Math.abs(e - t), 1), 6) * Math.abs(i || this.settings.smartSpeed)
    }, c.prototype.to = function (t, e) {
        var i, n = this.current(), s = t - this.relative(n), o = (0 < s) - (s < 0), a = this._items.length,
            r = this.minimum(), l = this.maximum();
        this.settings.loop ? (!this.settings.rewind && Math.abs(s) > a / 2 && (s += -1 * o * a), (i = (((t = n + s) - r) % a + a) % a + r) !== t && i - s <= l && 0 < i - s && (n = i - s, t = i, this.reset(n))) : t = this.settings.rewind ? (t % (l += 1) + l) % l : Math.max(r, Math.min(l, t)), this.speed(this.duration(n, t, e)), this.current(t), this.isVisible() && this.update()
    }, c.prototype.next = function (t) {
        t = t || !1, this.to(this.relative(this.current()) + 1, t)
    }, c.prototype.prev = function (t) {
        t = t || !1, this.to(this.relative(this.current()) - 1, t)
    }, c.prototype.onTransitionEnd = function (t) {
        if (t !== r && (t.stopPropagation(), (t.target || t.srcElement || t.originalTarget) !== this.$stage.get(0))) return !1;
        this.leave("animating"), this.trigger("translated")
    }, c.prototype.viewport = function () {
        var t;
        return this.options.responsiveBaseElement !== i ? t = l(this.options.responsiveBaseElement).width() : i.innerWidth ? t = i.innerWidth : n.documentElement && n.documentElement.clientWidth ? t = n.documentElement.clientWidth : console.warn("Can not detect viewport width."), t
    }, c.prototype.replace = function (t) {
        this.$stage.empty(), this._items = [], t = t && (t instanceof jQuery ? t : l(t)), this.settings.nestedItemSelector && (t = t.find("." + this.settings.nestedItemSelector)), t.filter(function () {
            return 1 === this.nodeType
        }).each(l.proxy(function (t, e) {
            e = this.prepare(e), this.$stage.append(e), this._items.push(e), this._mergers.push(+e.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1)
        }, this)), this.reset(this.isNumeric(this.settings.startPosition) ? this.settings.startPosition : 0), this.invalidate("items")
    }, c.prototype.add = function (t, e) {
        var i = this.relative(this._current);
        e = e === r ? this._items.length : this.normalize(e, !0), t = t instanceof jQuery ? t : l(t), this.trigger("add", {
            content: t,
            position: e
        }), t = this.prepare(t), 0 === this._items.length || e === this._items.length ? (0 === this._items.length && this.$stage.append(t), 0 !== this._items.length && this._items[e - 1].after(t), this._items.push(t), this._mergers.push(+t.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1)) : (this._items[e].before(t), this._items.splice(e, 0, t), this._mergers.splice(e, 0, +t.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1)), this._items[i] && this.reset(this._items[i].index()), this.invalidate("items"), this.trigger("added", {
            content: t,
            position: e
        })
    }, c.prototype.remove = function (t) {
        (t = this.normalize(t, !0)) !== r && (this.trigger("remove", {
            content: this._items[t],
            position: t
        }), this._items[t].remove(), this._items.splice(t, 1), this._mergers.splice(t, 1), this.invalidate("items"), this.trigger("removed", {
            content: null,
            position: t
        }))
    }, c.prototype.preloadAutoWidthImages = function (t) {
        t.each(l.proxy(function (t, e) {
            this.enter("pre-loading"), e = l(e), l(new Image).one("load", l.proxy(function (t) {
                e.attr("src", t.target.src), e.css("opacity", 1), this.leave("pre-loading"), this.is("pre-loading") || this.is("initializing") || this.refresh()
            }, this)).attr("src", e.attr("src") || e.attr("data-src") || e.attr("data-src-retina"))
        }, this))
    }, c.prototype.destroy = function () {
        for (var t in this.$element.off(".owl.core"), this.$stage.off(".owl.core"), l(n).off(".owl.core"), !1 !== this.settings.responsive && (i.clearTimeout(this.resizeTimer), this.off(i, "resize", this._handlers.onThrottledResize)), this._plugins) this._plugins[t].destroy();
        this.$stage.children(".cloned").remove(), this.$stage.unwrap(), this.$stage.children().contents().unwrap(), this.$stage.children().unwrap(), this.$stage.remove(), this.$element.removeClass(this.options.refreshClass).removeClass(this.options.loadingClass).removeClass(this.options.loadedClass).removeClass(this.options.rtlClass).removeClass(this.options.dragClass).removeClass(this.options.grabClass).attr("class", this.$element.attr("class").replace(new RegExp(this.options.responsiveClass + "-\\S+\\s", "g"), "")).removeData("owl.carousel")
    }, c.prototype.op = function (t, e, i) {
        var n = this.settings.rtl;
        switch (e) {
            case"<":
                return n ? i < t : t < i;
            case">":
                return n ? t < i : i < t;
            case">=":
                return n ? t <= i : i <= t;
            case"<=":
                return n ? i <= t : t <= i
        }
    }, c.prototype.on = function (t, e, i, n) {
        t.addEventListener ? t.addEventListener(e, i, n) : t.attachEvent && t.attachEvent("on" + e, i)
    }, c.prototype.off = function (t, e, i, n) {
        t.removeEventListener ? t.removeEventListener(e, i, n) : t.detachEvent && t.detachEvent("on" + e, i)
    }, c.prototype.trigger = function (t, e, i, n, s) {
        var o = {item: {count: this._items.length, index: this.current()}},
            a = l.camelCase(l.grep(["on", t, i], function (t) {
                return t
            }).join("-").toLowerCase()),
            r = l.Event([t, "owl", i || "carousel"].join(".").toLowerCase(), l.extend({relatedTarget: this}, o, e));
        return this._supress[t] || (l.each(this._plugins, function (t, e) {
            e.onTrigger && e.onTrigger(r)
        }), this.register({
            type: c.Type.Event,
            name: t
        }), this.$element.trigger(r), this.settings && "function" == typeof this.settings[a] && this.settings[a].call(this, r)), r
    }, c.prototype.enter = function (t) {
        l.each([t].concat(this._states.tags[t] || []), l.proxy(function (t, e) {
            this._states.current[e] === r && (this._states.current[e] = 0), this._states.current[e]++
        }, this))
    }, c.prototype.leave = function (t) {
        l.each([t].concat(this._states.tags[t] || []), l.proxy(function (t, e) {
            this._states.current[e]--
        }, this))
    }, c.prototype.register = function (i) {
        var e;
        i.type === c.Type.Event ? (l.event.special[i.name] || (l.event.special[i.name] = {}), l.event.special[i.name].owl || (e = l.event.special[i.name]._default, l.event.special[i.name]._default = function (t) {
            return !e || !e.apply || t.namespace && -1 !== t.namespace.indexOf("owl") ? t.namespace && -1 < t.namespace.indexOf("owl") : e.apply(this, arguments)
        }, l.event.special[i.name].owl = !0)) : i.type === c.Type.State && (this._states.tags[i.name] ? this._states.tags[i.name] = this._states.tags[i.name].concat(i.tags) : this._states.tags[i.name] = i.tags, this._states.tags[i.name] = l.grep(this._states.tags[i.name], l.proxy(function (t, e) {
            return l.inArray(t, this._states.tags[i.name]) === e
        }, this)))
    }, c.prototype.suppress = function (t) {
        l.each(t, l.proxy(function (t, e) {
            this._supress[e] = !0
        }, this))
    }, c.prototype.release = function (t) {
        l.each(t, l.proxy(function (t, e) {
            delete this._supress[e]
        }, this))
    }, c.prototype.pointer = function (t) {
        var e = {x: null, y: null};
        return (t = (t = t.originalEvent || t || i.event).touches && t.touches.length ? t.touches[0] : t.changedTouches && t.changedTouches.length ? t.changedTouches[0] : t).pageX ? (e.x = t.pageX, e.y = t.pageY) : (e.x = t.clientX, e.y = t.clientY), e
    }, c.prototype.isNumeric = function (t) {
        return !isNaN(parseFloat(t))
    }, c.prototype.difference = function (t, e) {
        return {x: t.x - e.x, y: t.y - e.y}
    }, l.fn.owlCarousel = function (e) {
        var n = Array.prototype.slice.call(arguments, 1);
        return this.each(function () {
            var t = l(this), i = t.data("owl.carousel");
            i || (i = new c(this, "object" == typeof e && e), t.data("owl.carousel", i), l.each(["next", "prev", "to", "destroy", "refresh", "replace", "add", "remove"], function (t, e) {
                i.register({
                    type: c.Type.Event,
                    name: e
                }), i.$element.on(e + ".owl.carousel.core", l.proxy(function (t) {
                    t.namespace && t.relatedTarget !== this && (this.suppress([e]), i[e].apply(this, [].slice.call(arguments, 1)), this.release([e]))
                }, i))
            })), "string" == typeof e && "_" !== e.charAt(0) && i[e].apply(i, n)
        })
    }, l.fn.owlCarousel.Constructor = c
}(window.Zepto || window.jQuery, window, document), function (e, i) {
    var n = function (t) {
        this._core = t, this._interval = null, this._visible = null, this._handlers = {
            "initialized.owl.carousel": e.proxy(function (t) {
                t.namespace && this._core.settings.autoRefresh && this.watch()
            }, this)
        }, this._core.options = e.extend({}, n.Defaults, this._core.options), this._core.$element.on(this._handlers)
    };
    n.Defaults = {autoRefresh: !0, autoRefreshInterval: 500}, n.prototype.watch = function () {
        this._interval || (this._visible = this._core.isVisible(), this._interval = i.setInterval(e.proxy(this.refresh, this), this._core.settings.autoRefreshInterval))
    }, n.prototype.refresh = function () {
        this._core.isVisible() !== this._visible && (this._visible = !this._visible, this._core.$element.toggleClass("owl-hidden", !this._visible), this._visible && this._core.invalidate("width") && this._core.refresh())
    }, n.prototype.destroy = function () {
        var t, e;
        for (t in i.clearInterval(this._interval), this._handlers) this._core.$element.off(t, this._handlers[t]);
        for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null)
    }, e.fn.owlCarousel.Constructor.Plugins.AutoRefresh = n
}(window.Zepto || window.jQuery, window, document), function (r, s) {
    var e = function (t) {
        this._core = t, this._loaded = [], this._handlers = {
            "initialized.owl.carousel change.owl.carousel resized.owl.carousel": r.proxy(function (t) {
                if (t.namespace && this._core.settings && this._core.settings.lazyLoad && (t.property && "position" == t.property.name || "initialized" == t.type)) {
                    var e = this._core.settings, i = e.center && Math.ceil(e.items / 2) || e.items,
                        n = e.center && -1 * i || 0,
                        s = (t.property && void 0 !== t.property.value ? t.property.value : this._core.current()) + n,
                        o = this._core.clones().length, a = r.proxy(function (t, e) {
                            this.load(e)
                        }, this);
                    for (0 < e.lazyLoadEager && (i += e.lazyLoadEager, e.loop && (s -= e.lazyLoadEager, i++)); n++ < i;) this.load(o / 2 + this._core.relative(s)), o && r.each(this._core.clones(this._core.relative(s)), a), s++
                }
            }, this)
        }, this._core.options = r.extend({}, e.Defaults, this._core.options), this._core.$element.on(this._handlers)
    };
    e.Defaults = {lazyLoad: !1, lazyLoadEager: 0}, e.prototype.load = function (t) {
        var e = this._core.$stage.children().eq(t), t = e && e.find(".owl-lazy");
        !t || -1 < r.inArray(e.get(0), this._loaded) || (t.each(r.proxy(function (t, e) {
            var i = r(e),
                n = 1 < s.devicePixelRatio && i.attr("data-src-retina") || i.attr("data-src") || i.attr("data-srcset");
            this._core.trigger("load", {
                element: i,
                url: n
            }, "lazy"), i.is("img") ? i.one("load.owl.lazy", r.proxy(function () {
                i.css("opacity", 1), this._core.trigger("loaded", {element: i, url: n}, "lazy")
            }, this)).attr("src", n) : i.is("source") ? i.one("load.owl.lazy", r.proxy(function () {
                this._core.trigger("loaded", {element: i, url: n}, "lazy")
            }, this)).attr("srcset", n) : ((e = new Image).onload = r.proxy(function () {
                i.css({"background-image": 'url("' + n + '")', opacity: "1"}), this._core.trigger("loaded", {
                    element: i,
                    url: n
                }, "lazy")
            }, this), e.src = n)
        }, this)), this._loaded.push(e.get(0)))
    }, e.prototype.destroy = function () {
        var t, e;
        for (t in this.handlers) this._core.$element.off(t, this.handlers[t]);
        for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null)
    }, r.fn.owlCarousel.Constructor.Plugins.Lazy = e
}(window.Zepto || window.jQuery, window, document), function (s, i) {
    var n = function (t) {
        this._core = t, this._previousHeight = null, this._handlers = {
            "initialized.owl.carousel refreshed.owl.carousel": s.proxy(function (t) {
                t.namespace && this._core.settings.autoHeight && this.update()
            }, this), "changed.owl.carousel": s.proxy(function (t) {
                t.namespace && this._core.settings.autoHeight && "position" === t.property.name && this.update()
            }, this), "loaded.owl.lazy": s.proxy(function (t) {
                t.namespace && this._core.settings.autoHeight && t.element.closest("." + this._core.settings.itemClass).index() === this._core.current() && this.update()
            }, this)
        }, this._core.options = s.extend({}, n.Defaults, this._core.options), this._core.$element.on(this._handlers), this._intervalId = null;
        var e = this;
        s(i).on("load", function () {
            e._core.settings.autoHeight && e.update()
        }), s(i).resize(function () {
            e._core.settings.autoHeight && (null != e._intervalId && clearTimeout(e._intervalId), e._intervalId = setTimeout(function () {
                e.update()
            }, 250))
        })
    };
    n.Defaults = {autoHeight: !1, autoHeightClass: "owl-height"}, n.prototype.update = function () {
        var t = this._core._current, e = t + this._core.settings.items, i = this._core.settings.lazyLoad,
            t = this._core.$stage.children().toArray().slice(t, e), n = [], e = 0;
        s.each(t, function (t, e) {
            n.push(s(e).height())
        }), (e = Math.max.apply(null, n)) <= 1 && i && this._previousHeight && (e = this._previousHeight), this._previousHeight = e, this._core.$stage.parent().height(e).addClass(this._core.settings.autoHeightClass)
    }, n.prototype.destroy = function () {
        var t, e;
        for (t in this._handlers) this._core.$element.off(t, this._handlers[t]);
        for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null)
    }, s.fn.owlCarousel.Constructor.Plugins.AutoHeight = n
}(window.Zepto || window.jQuery, window, document), function (d, e) {
    var i = function (t) {
        this._core = t, this._videos = {}, this._playing = null, this._handlers = {
            "initialized.owl.carousel": d.proxy(function (t) {
                t.namespace && this._core.register({type: "state", name: "playing", tags: ["interacting"]})
            }, this), "resize.owl.carousel": d.proxy(function (t) {
                t.namespace && this._core.settings.video && this.isInFullScreen() && t.preventDefault()
            }, this), "refreshed.owl.carousel": d.proxy(function (t) {
                t.namespace && this._core.is("resizing") && this._core.$stage.find(".cloned .owl-video-frame").remove()
            }, this), "changed.owl.carousel": d.proxy(function (t) {
                t.namespace && "position" === t.property.name && this._playing && this.stop()
            }, this), "prepared.owl.carousel": d.proxy(function (t) {
                var e;
                !t.namespace || (e = d(t.content).find(".owl-video")).length && (e.css("display", "none"), this.fetch(e, d(t.content)))
            }, this)
        }, this._core.options = d.extend({}, i.Defaults, this._core.options), this._core.$element.on(this._handlers), this._core.$element.on("click.owl.video", ".owl-video-play-icon", d.proxy(function (t) {
            this.play(t)
        }, this))
    };
    i.Defaults = {video: !1, videoHeight: !1, videoWidth: !1}, i.prototype.fetch = function (t, e) {
        var i = t.attr("data-vimeo-id") ? "vimeo" : t.attr("data-vzaar-id") ? "vzaar" : "youtube",
            n = t.attr("data-vimeo-id") || t.attr("data-youtube-id") || t.attr("data-vzaar-id"),
            s = t.attr("data-width") || this._core.settings.videoWidth,
            o = t.attr("data-height") || this._core.settings.videoHeight, a = t.attr("href");
        if (!a) throw new Error("Missing video URL.");
        if (-1 < (n = a.match(/(http:|https:|)\/\/(player.|www.|app.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com|be\-nocookie\.com)|vzaar\.com)\/(video\/|videos\/|embed\/|channels\/.+\/|groups\/.+\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/))[3].indexOf("youtu")) i = "youtube"; else if (-1 < n[3].indexOf("vimeo")) i = "vimeo"; else {
            if (!(-1 < n[3].indexOf("vzaar"))) throw new Error("Video URL not supported.");
            i = "vzaar"
        }
        n = n[6], this._videos[a] = {
            type: i,
            id: n,
            width: s,
            height: o
        }, e.attr("data-video", a), this.thumbnail(t, this._videos[a])
    }, i.prototype.thumbnail = function (e, t) {
        function i(t) {
            n = c.lazyLoad ? d("<div/>", {class: "owl-video-tn " + l, srcType: t}) : d("<div/>", {
                class: "owl-video-tn",
                style: "opacity:1;background-image:url(" + t + ")"
            }), e.after(n), e.after('<div class="owl-video-play-icon"></div>')
        }

        var n, s, o = t.width && t.height ? "width:" + t.width + "px;height:" + t.height + "px;" : "",
            a = e.find("img"), r = "src", l = "", c = this._core.settings;
        if (e.wrap(d("<div/>", {
            class: "owl-video-wrapper",
            style: o
        })), this._core.settings.lazyLoad && (r = "data-src", l = "owl-lazy"), a.length) return i(a.attr(r)), a.remove(), !1;
        "youtube" === t.type ? (s = "//img.youtube.com/vi/" + t.id + "/hqdefault.jpg", i(s)) : "vimeo" === t.type ? d.ajax({
            type: "GET",
            url: "//vimeo.com/api/v2/video/" + t.id + ".json",
            jsonp: "callback",
            dataType: "jsonp",
            success: function (t) {
                s = t[0].thumbnail_large, i(s)
            }
        }) : "vzaar" === t.type && d.ajax({
            type: "GET",
            url: "//vzaar.com/api/videos/" + t.id + ".json",
            jsonp: "callback",
            dataType: "jsonp",
            success: function (t) {
                s = t.framegrab_url, i(s)
            }
        })
    }, i.prototype.stop = function () {
        this._core.trigger("stop", null, "video"), this._playing.find(".owl-video-frame").remove(), this._playing.removeClass("owl-video-playing"), this._playing = null, this._core.leave("playing"), this._core.trigger("stopped", null, "video")
    }, i.prototype.play = function (t) {
        var e = d(t.target).closest("." + this._core.settings.itemClass), i = this._videos[e.attr("data-video")],
            n = i.width || "100%", s = i.height || this._core.$stage.height();
        this._playing || (this._core.enter("playing"), this._core.trigger("play", null, "video"), e = this._core.items(this._core.relative(e.index())), this._core.reset(e.index()), (t = d('<iframe frameborder="0" allowfullscreen mozallowfullscreen webkitAllowFullScreen ></iframe>')).attr("height", s), t.attr("width", n), "youtube" === i.type ? t.attr("src", "//www.youtube.com/embed/" + i.id + "?autoplay=1&rel=0&v=" + i.id) : "vimeo" === i.type ? t.attr("src", "//player.vimeo.com/video/" + i.id + "?autoplay=1") : "vzaar" === i.type && t.attr("src", "//view.vzaar.com/" + i.id + "/player?autoplay=true"), d(t).wrap('<div class="owl-video-frame" />').insertAfter(e.find(".owl-video")), this._playing = e.addClass("owl-video-playing"))
    }, i.prototype.isInFullScreen = function () {
        var t = e.fullscreenElement || e.mozFullScreenElement || e.webkitFullscreenElement;
        return t && d(t).parent().hasClass("owl-video-frame")
    }, i.prototype.destroy = function () {
        var t, e;
        for (t in this._core.$element.off("click.owl.video"), this._handlers) this._core.$element.off(t, this._handlers[t]);
        for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null)
    }, d.fn.owlCarousel.Constructor.Plugins.Video = i
}(window.Zepto || window.jQuery, (window, document)), function (a) {
    var e = function (t) {
        this.core = t, this.core.options = a.extend({}, e.Defaults, this.core.options), this.swapping = !0, this.previous = void 0, this.next = void 0, this.handlers = {
            "change.owl.carousel": a.proxy(function (t) {
                t.namespace && "position" == t.property.name && (this.previous = this.core.current(), this.next = t.property.value)
            }, this), "drag.owl.carousel dragged.owl.carousel translated.owl.carousel": a.proxy(function (t) {
                t.namespace && (this.swapping = "translated" == t.type)
            }, this), "translate.owl.carousel": a.proxy(function (t) {
                t.namespace && this.swapping && (this.core.options.animateOut || this.core.options.animateIn) && this.swap()
            }, this)
        }, this.core.$element.on(this.handlers)
    };
    e.Defaults = {animateOut: !1, animateIn: !1}, e.prototype.swap = function () {
        var t, e, i, n, s, o;
        1 === this.core.settings.items && a.support.animation && a.support.transition && (this.core.speed(0), e = a.proxy(this.clear, this), i = this.core.$stage.children().eq(this.previous), n = this.core.$stage.children().eq(this.next), s = this.core.settings.animateIn, o = this.core.settings.animateOut, this.core.current() !== this.previous && (o && (t = this.core.coordinates(this.previous) - this.core.coordinates(this.next), i.one(a.support.animation.end, e).css({left: t + "px"}).addClass("animated owl-animated-out").addClass(o)), s && n.one(a.support.animation.end, e).addClass("animated owl-animated-in").addClass(s)))
    }, e.prototype.clear = function (t) {
        a(t.target).css({left: ""}).removeClass("animated owl-animated-out owl-animated-in").removeClass(this.core.settings.animateIn).removeClass(this.core.settings.animateOut), this.core.onTransitionEnd()
    }, e.prototype.destroy = function () {
        var t, e;
        for (t in this.handlers) this.core.$element.off(t, this.handlers[t]);
        for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null)
    }, a.fn.owlCarousel.Constructor.Plugins.Animate = e
}(window.Zepto || window.jQuery, (window, document)), function (n, s, e) {
    var i = function (t) {
        this._core = t, this._call = null, this._time = 0, this._timeout = 0, this._paused = !0, this._handlers = {
            "changed.owl.carousel": n.proxy(function (t) {
                t.namespace && "settings" === t.property.name ? this._core.settings.autoplay ? this.play() : this.stop() : t.namespace && "position" === t.property.name && this._paused && (this._time = 0)
            }, this), "initialized.owl.carousel": n.proxy(function (t) {
                t.namespace && this._core.settings.autoplay && this.play()
            }, this), "play.owl.autoplay": n.proxy(function (t, e, i) {
                t.namespace && this.play(e, i)
            }, this), "stop.owl.autoplay": n.proxy(function (t) {
                t.namespace && this.stop()
            }, this), "mouseover.owl.autoplay": n.proxy(function () {
                this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.pause()
            }, this), "mouseleave.owl.autoplay": n.proxy(function () {
                this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.play()
            }, this), "touchstart.owl.core": n.proxy(function () {
                this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.pause()
            }, this), "touchend.owl.core": n.proxy(function () {
                this._core.settings.autoplayHoverPause && this.play()
            }, this)
        }, this._core.$element.on(this._handlers), this._core.options = n.extend({}, i.Defaults, this._core.options)
    };
    i.Defaults = {
        autoplay: !1,
        autoplayTimeout: 5e3,
        autoplayHoverPause: !1,
        autoplaySpeed: !1
    }, i.prototype._next = function (t) {
        this._call = s.setTimeout(n.proxy(this._next, this, t), this._timeout * (Math.round(this.read() / this._timeout) + 1) - this.read()), this._core.is("interacting") || e.hidden || this._core.next(t || this._core.settings.autoplaySpeed)
    }, i.prototype.read = function () {
        return (new Date).getTime() - this._time
    }, i.prototype.play = function (t, e) {
        var i;
        this._core.is("rotating") || this._core.enter("rotating"), t = t || this._core.settings.autoplayTimeout, i = Math.min(this._time % (this._timeout || t), t), this._paused ? (this._time = this.read(), this._paused = !1) : s.clearTimeout(this._call), this._time += this.read() % t - i, this._timeout = t, this._call = s.setTimeout(n.proxy(this._next, this, e), t - i)
    }, i.prototype.stop = function () {
        this._core.is("rotating") && (this._time = 0, this._paused = !0, s.clearTimeout(this._call), this._core.leave("rotating"))
    }, i.prototype.pause = function () {
        this._core.is("rotating") && !this._paused && (this._time = this.read(), this._paused = !0, s.clearTimeout(this._call))
    }, i.prototype.destroy = function () {
        var t, e;
        for (t in this.stop(), this._handlers) this._core.$element.off(t, this._handlers[t]);
        for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null)
    }, n.fn.owlCarousel.Constructor.Plugins.autoplay = i
}(window.Zepto || window.jQuery, window, document), function (s) {
    "use strict";
    var e = function (t) {
        this._core = t, this._initialized = !1, this._pages = [], this._controls = {}, this._templates = [], this.$element = this._core.$element, this._overrides = {
            next: this._core.next,
            prev: this._core.prev,
            to: this._core.to
        }, this._handlers = {
            "prepared.owl.carousel": s.proxy(function (t) {
                t.namespace && this._core.settings.dotsData && this._templates.push('<div class="' + this._core.settings.dotClass + '">' + s(t.content).find("[data-dot]").addBack("[data-dot]").attr("data-dot") + "</div>")
            }, this), "added.owl.carousel": s.proxy(function (t) {
                t.namespace && this._core.settings.dotsData && this._templates.splice(t.position, 0, this._templates.pop())
            }, this), "remove.owl.carousel": s.proxy(function (t) {
                t.namespace && this._core.settings.dotsData && this._templates.splice(t.position, 1)
            }, this), "changed.owl.carousel": s.proxy(function (t) {
                t.namespace && "position" == t.property.name && this.draw()
            }, this), "initialized.owl.carousel": s.proxy(function (t) {
                t.namespace && !this._initialized && (this._core.trigger("initialize", null, "navigation"), this.initialize(), this.update(), this.draw(), this._initialized = !0, this._core.trigger("initialized", null, "navigation"))
            }, this), "refreshed.owl.carousel": s.proxy(function (t) {
                t.namespace && this._initialized && (this._core.trigger("refresh", null, "navigation"), this.update(), this.draw(), this._core.trigger("refreshed", null, "navigation"))
            }, this)
        }, this._core.options = s.extend({}, e.Defaults, this._core.options), this.$element.on(this._handlers)
    };
    e.Defaults = {
        nav: !1,
        navText: ['<span aria-label="Previous">&#x2039;</span>', '<span aria-label="Next">&#x203a;</span>'],
        navSpeed: !1,
        navElement: 'button type="button" role="presentation"',
        navContainer: !1,
        navContainerClass: "owl-nav",
        navClass: ["owl-prev", "owl-next"],
        slideBy: 1,
        dotClass: "owl-dot",
        dotsClass: "owl-dots",
        dots: !0,
        dotsEach: !1,
        dotsData: !1,
        dotsSpeed: !1,
        dotsContainer: !1
    }, e.prototype.initialize = function () {
        var t, i = this._core.settings;
        for (t in this._controls.$relative = (i.navContainer ? s(i.navContainer) : s("<div>").addClass(i.navContainerClass).appendTo(this.$element)).addClass("disabled"), this._controls.$previous = s("<" + i.navElement + ">").addClass(i.navClass[0]).html(i.navText[0]).prependTo(this._controls.$relative).on("click", s.proxy(function (t) {
            this.prev(i.navSpeed)
        }, this)), this._controls.$next = s("<" + i.navElement + ">").addClass(i.navClass[1]).html(i.navText[1]).appendTo(this._controls.$relative).on("click", s.proxy(function (t) {
            this.next(i.navSpeed)
        }, this)), i.dotsData || (this._templates = [s('<button role="button">').addClass(i.dotClass).append(s("<span>")).prop("outerHTML")]), this._controls.$absolute = (i.dotsContainer ? s(i.dotsContainer) : s("<div>").addClass(i.dotsClass).appendTo(this.$element)).addClass("disabled"), this._controls.$absolute.on("click", "button", s.proxy(function (t) {
            var e = (s(t.target).parent().is(this._controls.$absolute) ? s(t.target) : s(t.target).parent()).index();
            t.preventDefault(), this.to(e, i.dotsSpeed)
        }, this)), this._overrides) this._core[t] = s.proxy(this[t], this)
    }, e.prototype.destroy = function () {
        var t, e, i, n, s = this._core.settings;
        for (t in this._handlers) this.$element.off(t, this._handlers[t]);
        for (e in this._controls) "$relative" === e && s.navContainer ? this._controls[e].html("") : this._controls[e].remove();
        for (n in this.overides) this._core[n] = this._overrides[n];
        for (i in Object.getOwnPropertyNames(this)) "function" != typeof this[i] && (this[i] = null)
    }, e.prototype.update = function () {
        var t, e, i = this._core.clones().length / 2, n = i + this._core.items().length, s = this._core.maximum(!0),
            o = this._core.settings, a = o.center || o.autoWidth || o.dotsData ? 1 : o.dotsEach || o.items;
        if ("page" !== o.slideBy && (o.slideBy = Math.min(o.slideBy, o.items)), o.dots || "page" == o.slideBy) for (this._pages = [], t = i, e = 0; t < n; t++) {
            if (a <= e || 0 === e) {
                if (this._pages.push({start: Math.min(s, t - i), end: t - i + a - 1}), Math.min(s, t - i) === s) break;
                e = 0, 0
            }
            e += this._core.mergers(this._core.relative(t))
        }
    }, e.prototype.draw = function () {
        var t = this._core.settings, e = this._core.items().length <= t.items,
            i = this._core.relative(this._core.current()), n = t.loop || t.rewind;
        this._controls.$relative.toggleClass("disabled", !t.nav || e), t.nav && (this._controls.$previous.toggleClass("disabled", !n && i <= this._core.minimum(!0)), this._controls.$next.toggleClass("disabled", !n && i >= this._core.maximum(!0))), this._controls.$absolute.toggleClass("disabled", !t.dots || e), t.dots && (e = this._pages.length - this._controls.$absolute.children().length, t.dotsData && 0 != e ? this._controls.$absolute.html(this._templates.join("")) : 0 < e ? this._controls.$absolute.append(new Array(1 + e).join(this._templates[0])) : e < 0 && this._controls.$absolute.children().slice(e).remove(), this._controls.$absolute.find(".active").removeClass("active"), this._controls.$absolute.children().eq(s.inArray(this.current(), this._pages)).addClass("active"))
    }, e.prototype.onTrigger = function (t) {
        var e = this._core.settings;
        t.page = {
            index: s.inArray(this.current(), this._pages),
            count: this._pages.length,
            size: e && (e.center || e.autoWidth || e.dotsData ? 1 : e.dotsEach || e.items)
        }
    }, e.prototype.current = function () {
        var i = this._core.relative(this._core.current());
        return s.grep(this._pages, s.proxy(function (t, e) {
            return t.start <= i && t.end >= i
        }, this)).pop()
    }, e.prototype.getPosition = function (t) {
        var e, i, n = this._core.settings;
        return "page" == n.slideBy ? (e = s.inArray(this.current(), this._pages), i = this._pages.length, t ? ++e : --e, e = this._pages[(e % i + i) % i].start) : (e = this._core.relative(this._core.current()), i = this._core.items().length, t ? e += n.slideBy : e -= n.slideBy), e
    }, e.prototype.next = function (t) {
        s.proxy(this._overrides.to, this._core)(this.getPosition(!0), t)
    }, e.prototype.prev = function (t) {
        s.proxy(this._overrides.to, this._core)(this.getPosition(!1), t)
    }, e.prototype.to = function (t, e, i) {
        !i && this._pages.length ? (i = this._pages.length, s.proxy(this._overrides.to, this._core)(this._pages[(t % i + i) % i].start, e)) : s.proxy(this._overrides.to, this._core)(t, e)
    }, s.fn.owlCarousel.Constructor.Plugins.Navigation = e
}(window.Zepto || window.jQuery, (window, document)), function (n, s) {
    "use strict";
    var e = function (t) {
        this._core = t, this._hashes = {}, this.$element = this._core.$element, this._handlers = {
            "initialized.owl.carousel": n.proxy(function (t) {
                t.namespace && "URLHash" === this._core.settings.startPosition && n(s).trigger("hashchange.owl.navigation")
            }, this), "prepared.owl.carousel": n.proxy(function (t) {
                var e;
                !t.namespace || (e = n(t.content).find("[data-hash]").addBack("[data-hash]").attr("data-hash")) && (this._hashes[e] = t.content)
            }, this), "changed.owl.carousel": n.proxy(function (t) {
                var i;
                t.namespace && "position" === t.property.name && (i = this._core.items(this._core.relative(this._core.current())), (t = n.map(this._hashes, function (t, e) {
                    return t === i ? e : null
                }).join()) && s.location.hash.slice(1) !== t && (s.location.hash = t))
            }, this)
        }, this._core.options = n.extend({}, e.Defaults, this._core.options), this.$element.on(this._handlers), n(s).on("hashchange.owl.navigation", n.proxy(function (t) {
            var e = s.location.hash.substring(1), i = this._core.$stage.children(),
                e = this._hashes[e] && i.index(this._hashes[e]);
            void 0 !== e && e !== this._core.current() && this._core.to(this._core.relative(e), !1, !0)
        }, this))
    };
    e.Defaults = {URLhashListener: !1}, e.prototype.destroy = function () {
        var t, e;
        for (t in n(s).off("hashchange.owl.navigation"), this._handlers) this._core.$element.off(t, this._handlers[t]);
        for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null)
    }, n.fn.owlCarousel.Constructor.Plugins.Hash = e
}(window.Zepto || window.jQuery, window, document), function (s, o) {
    function e(t, i) {
        var n = !1, e = t.charAt(0).toUpperCase() + t.slice(1);
        return s.each((t + " " + r.join(e + " ") + e).split(" "), function (t, e) {
            if (a[e] !== o) return n = !i || e, !1
        }), n
    }

    function t(t) {
        return e(t, !0)
    }

    var a = s("<support>").get(0).style, r = "Webkit Moz O ms".split(" "), i = {
        transition: {
            end: {
                WebkitTransition: "webkitTransitionEnd",
                MozTransition: "transitionend",
                OTransition: "oTransitionEnd",
                transition: "transitionend"
            }
        },
        animation: {
            end: {
                WebkitAnimation: "webkitAnimationEnd",
                MozAnimation: "animationend",
                OAnimation: "oAnimationEnd",
                animation: "animationend"
            }
        }
    }, n = function () {
        return !!e("transform")
    }, l = function () {
        return !!e("perspective")
    }, c = function () {
        return !!e("animation")
    };
    !function () {
        return !!e("transition")
    }() || (s.support.transition = new String(t("transition")), s.support.transition.end = i.transition.end[s.support.transition]), c() && (s.support.animation = new String(t("animation")), s.support.animation.end = i.animation.end[s.support.animation]), n() && (s.support.transform = new String(t("transform")), s.support.transform3d = l())
}(window.Zepto || window.jQuery, (window, void document)), function () {
    var t, e, i;

    function n(t, e) {
        var i, n;
        if (this.options = {
            target: "instafeed",
            get: "popular",
            resolution: "thumbnail",
            sortBy: "none",
            links: !0,
            mock: !1,
            useHttp: !1
        }, "object" == typeof t) for (i in t) n = t[i], this.options[i] = n;
        this.context = null != e ? e : this, this.unique = this._genKey()
    }

    n.prototype.hasNext = function () {
        return "string" == typeof this.context.nextUrl && 0 < this.context.nextUrl.length
    }, n.prototype.next = function () {
        return !!this.hasNext() && this.run(this.context.nextUrl)
    }, n.prototype.run = function (t) {
        var e;
        if ("string" != typeof this.options.clientId && "string" != typeof this.options.accessToken) throw new Error("Missing clientId or accessToken.");
        if ("string" != typeof this.options.accessToken && "string" != typeof this.options.clientId) throw new Error("Missing clientId or accessToken.");
        return null != this.options.before && "function" == typeof this.options.before && this.options.before.call(this), "undefined" != typeof document && null !== document && ((e = document.createElement("script")).id = "instafeed-fetcher", e.src = t || this._buildUrl(), document.getElementsByTagName("head")[0].appendChild(e), e = "instafeedCache" + this.unique, window[e] = new n(this.options, this), window[e].unique = this.unique), !0
    }, n.prototype.parse = function (t) {
        var e, i, n, s, o, a, r, l, c, d, u, h, p, f, m, g, v, y, w, _, b, x, C, S, T, E;
        if ("object" != typeof t) {
            if (null != this.options.error && "function" == typeof this.options.error) return this.options.error.call(this, "Invalid JSON data"), !1;
            throw new Error("Invalid JSON response")
        }
        if (200 !== t.meta.code) {
            if (null != this.options.error && "function" == typeof this.options.error) return this.options.error.call(this, t.meta.error_message), !1;
            throw new Error("Error from Instagram: " + t.meta.error_message)
        }
        if (0 === t.data.length) {
            if (null != this.options.error && "function" == typeof this.options.error) return this.options.error.call(this, "No images were returned from Instagram"), !1;
            throw new Error("No images were returned from Instagram")
        }
        if (null != this.options.success && "function" == typeof this.options.success && this.options.success.call(this, t), this.context.nextUrl = "", null != t.pagination && (this.context.nextUrl = t.pagination.next_url), "none" !== this.options.sortBy) switch (T = "random" === this.options.sortBy ? ["", "random"] : this.options.sortBy.split("-"), S = "least" === T[0], T[1]) {
            case"random":
                t.data.sort(function () {
                    return .5 - Math.random()
                });
                break;
            case"recent":
                t.data = this._sortBy(t.data, "created_time", S);
                break;
            case"liked":
                t.data = this._sortBy(t.data, "likes.count", S);
                break;
            case"commented":
                t.data = this._sortBy(t.data, "comments.count", S);
                break;
            default:
                throw new Error("Invalid option for sortBy: '" + this.options.sortBy + "'.")
        }
        if ("undefined" != typeof document && null !== document && !1 === this.options.mock) {
            if (h = t.data, T = parseInt(this.options.limit, 10), null != this.options.limit && h.length > T && (h = h.slice(0, T)), a = document.createDocumentFragment(), null != this.options.filter && "function" == typeof this.options.filter && (h = this._filter(h, this.options.filter)), null != this.options.template && "string" == typeof this.options.template) {
                for (r = "", E = document.createElement("div"), l = 0, _ = h.length; l < _; l++) {
                    if ("object" != typeof (d = (c = h[l]).images[this.options.resolution])) throw o = "No image found for resolution: " + this.options.resolution + ".", new Error(o);
                    g = d.width, m = (f = d.height) < g ? "landscape" : "square", g < f && (m = "portrait"), u = d.url, 0 <= window.location.protocol.indexOf("http") && !this.options.useHttp && (u = u.replace(/https?:\/\//, "//")), r += this._makeTemplate(this.options.template, {
                        model: c,
                        id: c.id,
                        link: c.link,
                        type: c.type,
                        image: u,
                        width: g,
                        height: f,
                        orientation: m,
                        caption: this._getObjectProperty(c, "caption.text"),
                        likes: c.likes.count,
                        comments: c.comments.count,
                        location: this._getObjectProperty(c, "location.name")
                    })
                }
                for (E.innerHTML = r, s = [], n = 0, i = E.childNodes.length; n < i;) s.push(E.childNodes[n]), n += 1;
                for (y = 0, b = s.length; y < b; y++) C = s[y], a.appendChild(C)
            } else for (w = 0, x = h.length; w < x; w++) {
                if (c = h[w], p = document.createElement("img"), "object" != typeof (d = c.images[this.options.resolution])) throw o = "No image found for resolution: " + this.options.resolution + ".", new Error(o);
                u = d.url, 0 <= window.location.protocol.indexOf("http") && !this.options.useHttp && (u = u.replace(/https?:\/\//, "//")), p.src = u, !0 === this.options.links ? ((e = document.createElement("a")).href = c.link, e.appendChild(p), a.appendChild(e)) : a.appendChild(p)
            }
            if ("string" == typeof (T = this.options.target) && (T = document.getElementById(T)), null == T) throw o = 'No element with id="' + this.options.target + '" on page.', new Error(o);
            T.appendChild(a), document.getElementsByTagName("head")[0].removeChild(document.getElementById("instafeed-fetcher")), v = "instafeedCache" + this.unique, window[v] = void 0;
            try {
                delete window[v]
            } catch (t) {
            }
        }
        return null != this.options.after && "function" == typeof this.options.after && this.options.after.call(this), !0
    }, n.prototype._buildUrl = function () {
        var t, e;
        switch (this.options.get) {
            case"popular":
                t = "media/popular";
                break;
            case"tagged":
                if (!this.options.tagName) throw new Error("No tag name specified. Use the 'tagName' option.");
                t = "tags/" + this.options.tagName + "/media/recent";
                break;
            case"location":
                if (!this.options.locationId) throw new Error("No location specified. Use the 'locationId' option.");
                t = "locations/" + this.options.locationId + "/media/recent";
                break;
            case"user":
                if (!this.options.userId) throw new Error("No user specified. Use the 'userId' option.");
                t = "users/" + this.options.userId + "/media/recent";
                break;
            default:
                throw new Error("Invalid option for get: '" + this.options.get + "'.")
        }
        return e = "https://api.instagram.com/v1/" + t, null != this.options.accessToken ? e += "?access_token=" + this.options.accessToken : e += "?client_id=" + this.options.clientId, null != this.options.limit && (e += "&count=" + this.options.limit), e + ("&callback=instafeedCache" + this.unique) + ".parse"
    }, n.prototype._genKey = function () {
        var t;
        return "" + (t = function () {
            return (65536 * (1 + Math.random()) | 0).toString(16).substring(1)
        })() + t() + t() + t()
    }, n.prototype._makeTemplate = function (t, e) {
        for (var i, n, s = /(?:\{{2})([\w\[\]\.]+)(?:\}{2})/, o = t; s.test(o);) i = o.match(s)[1], n = null != (i = this._getObjectProperty(e, i)) ? i : "", o = o.replace(s, function () {
            return "" + n
        });
        return o
    }, n.prototype._getObjectProperty = function (t, e) {
        for (var i, n = (e = e.replace(/\[(\w+)\]/g, ".$1")).split("."); n.length;) {
            if (i = n.shift(), !(null != t && i in t)) return null;
            t = t[i]
        }
        return t
    }, n.prototype._sortBy = function (t, i, n) {
        var e = function (t, e) {
            t = this._getObjectProperty(t, i), e = this._getObjectProperty(e, i);
            return n ? e < t ? 1 : -1 : t < e ? 1 : -1
        };
        return t.sort(e.bind(this)), t
    }, n.prototype._filter = function (t, e) {
        for (var i = [], n = function (t) {
            if (e(t)) return i.push(t)
        }, s = 0, o = t.length; s < o; s++) n(t[s]);
        return i
    }, t = n, e = this, i = function () {
        return t
    }, "function" == typeof define && define.amd ? define([], i) : "object" == typeof module && module.exports ? module.exports = t : e.Instafeed = t
}.call(this), function (t, e) {
    "function" == typeof define && define.amd ? define(e) : "object" == typeof exports ? module.exports = e() : t.PhotoSwipe = e()
}(this, function () {
    "use strict";
    return function (p, i, t, e) {
        var f = {
            features: null, bind: function (t, e, i, n) {
                var s = (n ? "remove" : "add") + "EventListener";
                e = e.split(" ");
                for (var o = 0; o < e.length; o++) e[o] && t[s](e[o], i, !1)
            }, isArray: function (t) {
                return t instanceof Array
            }, createEl: function (t, e) {
                e = document.createElement(e || "div");
                return t && (e.className = t), e
            }, getScrollY: function () {
                var t = window.pageYOffset;
                return void 0 !== t ? t : document.documentElement.scrollTop
            }, unbind: function (t, e, i) {
                f.bind(t, e, i, !0)
            }, removeClass: function (t, e) {
                e = new RegExp("(\\s|^)" + e + "(\\s|$)");
                t.className = t.className.replace(e, " ").replace(/^\s\s*/, "").replace(/\s\s*$/, "")
            }, addClass: function (t, e) {
                f.hasClass(t, e) || (t.className += (t.className ? " " : "") + e)
            }, hasClass: function (t, e) {
                return t.className && new RegExp("(^|\\s)" + e + "(\\s|$)").test(t.className)
            }, getChildByClass: function (t, e) {
                for (var i = t.firstChild; i;) {
                    if (f.hasClass(i, e)) return i;
                    i = i.nextSibling
                }
            }, arraySearch: function (t, e, i) {
                for (var n = t.length; n--;) if (t[n][i] === e) return n;
                return -1
            }, extend: function (t, e, i) {
                for (var n in e) if (e.hasOwnProperty(n)) {
                    if (i && t.hasOwnProperty(n)) continue;
                    t[n] = e[n]
                }
            }, easing: {
                sine: {
                    out: function (t) {
                        return Math.sin(t * (Math.PI / 2))
                    }, inOut: function (t) {
                        return -(Math.cos(Math.PI * t) - 1) / 2
                    }
                }, cubic: {
                    out: function (t) {
                        return --t * t * t + 1
                    }
                }
            }, detectFeatures: function () {
                if (f.features) return f.features;
                var t, e, i = f.createEl().style, n = "", s = {};
                s.oldIE = document.all && !document.addEventListener, s.touch = "ontouchstart" in window, window.requestAnimationFrame && (s.raf = window.requestAnimationFrame, s.caf = window.cancelAnimationFrame), s.pointerEvent = !!window.PointerEvent || navigator.msPointerEnabled, s.pointerEvent || (t = navigator.userAgent, !/iP(hone|od)/.test(navigator.platform) || (e = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/)) && 0 < e.length && 1 <= (e = parseInt(e[1], 10)) && e < 8 && (s.isOldIOSPhone = !0), e = (e = t.match(/Android\s([0-9\.]*)/)) ? e[1] : 0, 1 <= (e = parseFloat(e)) && (e < 4.4 && (s.isOldAndroid = !0), s.androidVersion = e), s.isMobileOpera = /opera mini|opera mobi/i.test(t));
                for (var o, a, r, l = ["transform", "perspective", "animationName"], c = ["", "webkit", "Moz", "ms", "O"], d = 0; d < 4; d++) {
                    n = c[d];
                    for (var u = 0; u < 3; u++) o = l[u], a = n + (n ? o.charAt(0).toUpperCase() + o.slice(1) : o), !s[o] && a in i && (s[o] = a);
                    n && !s.raf && (n = n.toLowerCase(), s.raf = window[n + "RequestAnimationFrame"], s.raf && (s.caf = window[n + "CancelAnimationFrame"] || window[n + "CancelRequestAnimationFrame"]))
                }
                return s.raf || (r = 0, s.raf = function (t) {
                    var e = (new Date).getTime(), i = Math.max(0, 16 - (e - r)), n = window.setTimeout(function () {
                        t(e + i)
                    }, i);
                    return r = e + i, n
                }, s.caf = function (t) {
                    clearTimeout(t)
                }), s.svg = !!document.createElementNS && !!document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect, f.features = s
            }
        };
        f.detectFeatures(), f.features.oldIE && (f.bind = function (t, e, i, n) {
            e = e.split(" ");
            for (var s, o = (n ? "detach" : "attach") + "Event", a = function () {
                i.handleEvent.call(i)
            }, r = 0; r < e.length; r++) if (s = e[r]) if ("object" == typeof i && i.handleEvent) {
                if (n) {
                    if (!i["oldIE" + s]) return !1
                } else i["oldIE" + s] = a;
                t[o]("on" + s, i["oldIE" + s])
            } else t[o]("on" + s, i)
        });
        var m = this, g = {
            allowPanToNext: !0,
            spacing: .12,
            bgOpacity: 1,
            mouseUsed: !1,
            loop: !0,
            pinchToClose: !0,
            closeOnScroll: !0,
            closeOnVerticalDrag: !0,
            verticalDragRange: .75,
            hideAnimationDuration: 333,
            showAnimationDuration: 333,
            showHideOpacity: !1,
            focus: !0,
            escKey: !0,
            arrowKeys: !0,
            mainScrollEndFriction: .35,
            panEndFriction: .35,
            isClickableElement: function (t) {
                return "A" === t.tagName
            },
            getDoubleTapZoom: function (t, e) {
                return t || e.initialZoomLevel < .7 ? 1 : 1.33
            },
            maxSpreadZoom: 1.33,
            modal: !0,
            scaleMode: "fit"
        };
        f.extend(g, e);

        function n() {
            return {x: 0, y: 0}
        }

        function s(t, e) {
            f.extend(m, e.publicMethods), Yt.push(t)
        }

        function a(t) {
            var e = Qe();
            return e - 1 < t ? t - e : t < 0 ? e + t : t
        }

        function o(t, e) {
            return te[t] || (te[t] = []), te[t].push(e)
        }

        function v(t) {
            var e = te[t];
            if (e) {
                var i = Array.prototype.slice.call(arguments);
                i.shift();
                for (var n = 0; n < e.length; n++) e[n].apply(m, i)
            }
        }

        function d() {
            return (new Date).getTime()
        }

        function y(t) {
            Ft = t, m.bg.style.opacity = t * g.bgOpacity
        }

        function r(t, e, i, n, s) {
            (!Jt || s && s !== m.currItem) && (n /= (s || m.currItem).fitRatio), t[rt] = Y + e + "px, " + i + "px" + X + " scale(" + n + ")"
        }

        function u(t, e) {
            var i;
            !g.loop && e && (i = B + (Zt.x * Qt - t) / Zt.x, e = Math.round(t - _e.x), (i < 0 && 0 < e || i >= Qe() - 1 && e < 0) && (t = _e.x + e * g.mainScrollEndFriction)), _e.x = t, ne(t, q)
        }

        function l(t, e) {
            var i = be[t] - Vt[t];
            return Bt[t] + Rt[t] + i - e / G * i
        }

        function w(t, e) {
            t.x = e.x, t.y = e.y, e.id && (t.id = e.id)
        }

        function c(t) {
            t.x = Math.round(t.x), t.y = Math.round(t.y)
        }

        function h(t, e) {
            return t = Ye(m.currItem, Ut, t), e && (Mt = t), t
        }

        function _(t) {
            return (t = t || m.currItem).initialZoomLevel
        }

        function b(t) {
            return 0 < (t = t || m.currItem).w ? g.maxSpreadZoom : 1
        }

        function x(t, e, i, n) {
            return n === m.currItem.initialZoomLevel ? (i[t] = m.currItem.initialPosition[t], !0) : (i[t] = l(t, n), i[t] > e.min[t] ? (i[t] = e.min[t], !0) : i[t] < e.max[t] && (i[t] = e.max[t], !0))
        }

        function C(t) {
            var e = "";
            g.escKey && 27 === t.keyCode ? e = "close" : g.arrowKeys && (37 === t.keyCode ? e = "prev" : 39 === t.keyCode && (e = "next")), e && (t.ctrlKey || t.altKey || t.shiftKey || t.metaKey || (t.preventDefault ? t.preventDefault() : t.returnValue = !1, m[e]()))
        }

        function S(t) {
            t && (kt || Et || Pt || xt) && (t.preventDefault(), t.stopPropagation())
        }

        function T() {
            m.setScrollOffset(0, f.getScrollY())
        }

        function E(t) {
            ae[t] && (ae[t].raf && ut(ae[t].raf), re--, delete ae[t])
        }

        function k(t) {
            ae[t] && E(t), ae[t] || (re++, ae[t] = {})
        }

        function I() {
            for (var t in ae) ae.hasOwnProperty(t) && E(t)
        }

        function A(t, e, i, n, s, o, a) {
            var r, l = d();
            k(t);
            var c = function () {
                if (ae[t]) {
                    if ((r = d() - l) >= n) return E(t), o(i), void (a && a());
                    o((i - e) * s(r / n) + e), ae[t].raf = dt(c)
                }
            };
            c()
        }

        function D(t, e) {
            return ge.x = Math.abs(t.x - e.x), ge.y = Math.abs(t.y - e.y), Math.sqrt(ge.x * ge.x + ge.y * ge.y)
        }

        function j(t, e) {
            return Ee.prevent = !Te(t.target, g.isClickableElement), v("preventDragEvent", t, e, Ee), Ee.prevent
        }

        function $(t, e) {
            return e.x = t.pageX, e.y = t.pageY, e.id = t.identifier, e
        }

        function M(t, e, i) {
            i.x = .5 * (t.x + e.x), i.y = .5 * (t.y + e.y)
        }

        function O() {
            var t = qt.y - m.currItem.initialPosition.y;
            return 1 - Math.abs(t / (Ut.y / 2))
        }

        function P(t) {
            for (; 0 < Ae.length;) Ae.pop();
            return lt ? (Wt = 0, pe.forEach(function (t) {
                0 === Wt ? Ae[0] = t : 1 === Wt && (Ae[1] = t), Wt++
            })) : -1 < t.type.indexOf("touch") ? t.touches && 0 < t.touches.length && (Ae[0] = $(t.touches[0], ke), 1 < t.touches.length && (Ae[1] = $(t.touches[1], Ie))) : (ke.x = t.pageX, ke.y = t.pageY, ke.id = "", Ae[0] = ke), Ae
        }

        function N(t, e) {
            var i, n, s, o = qt[t] + e[t], a = 0 < e[t], r = _e.x + e.x, l = _e.x - fe.x,
                c = o > Mt.min[t] || o < Mt.max[t] ? g.panEndFriction : 1, o = qt[t] + e[t] * c;
            return !g.allowPanToNext && K !== m.currItem.initialZoomLevel || (Ot ? "h" !== Nt || "x" !== t || Et || (a ? (o > Mt.min[t] && (c = g.panEndFriction, Mt.min[t], i = Mt.min[t] - Bt[t]), (i <= 0 || l < 0) && 1 < Qe() ? (s = r, l < 0 && r > fe.x && (s = fe.x)) : Mt.min.x !== Mt.max.x && (n = o)) : (o < Mt.max[t] && (c = g.panEndFriction, Mt.max[t], i = Bt[t] - Mt.max[t]), (i <= 0 || 0 < l) && 1 < Qe() ? (s = r, 0 < l && r < fe.x && (s = fe.x)) : Mt.min.x !== Mt.max.x && (n = o))) : s = r, "x" !== t) ? void (Pt || At || K > m.currItem.fitRatio && (qt[t] += e[t] * c)) : (void 0 !== s && (u(s, !0), At = s !== fe.x), Mt.min.x !== Mt.max.x && (void 0 !== n ? qt.x = n : At || (qt.x += e.x * c)), void 0 !== s)
        }

        function z(t) {
            var e;
            "mousedown" === t.type && 0 < t.button || (qe ? t.preventDefault() : Ct && "mousedown" === t.type || (j(t, !0) && t.preventDefault(), v("pointerDown"), lt && ((e = f.arraySearch(pe, t.pointerId, "id")) < 0 && (e = pe.length), pe[e] = {
                x: t.pageX,
                y: t.pageY,
                id: t.pointerId
            }), t = (e = P(t)).length, Dt = null, I(), St && 1 !== t || (St = zt = !0, f.bind(window, Q, m), bt = Ht = Lt = xt = At = kt = Tt = Et = !1, Nt = null, v("firstTouchStart", e), w(Bt, qt), Rt.x = Rt.y = 0, w(ue, e[0]), w(he, ue), fe.x = Zt.x * Qt, me = [{
                x: ue.x,
                y: ue.y
            }], wt = yt = d(), h(K, !0), Ce(), Se()), !jt && 1 < t && !Pt && !At && (G = K, jt = Tt = !(Et = !1), Rt.y = Rt.x = 0, w(Bt, qt), w(le, e[0]), w(ce, e[1]), M(le, ce, xe), be.x = Math.abs(xe.x) - qt.x, be.y = Math.abs(xe.y) - qt.y, $t = D(le, ce))))
        }

        function L(t) {
            var e, i;
            t.preventDefault(), lt && -1 < (e = f.arraySearch(pe, t.pointerId, "id")) && ((i = pe[e]).x = t.pageX, i.y = t.pageY), St && (i = P(t), Nt || kt || jt ? Dt = i : _e.x !== Zt.x * Qt ? Nt = "h" : (t = Math.abs(i[0].x - ue.x) - Math.abs(i[0].y - ue.y), 10 <= Math.abs(t) && (Nt = 0 < t ? "h" : "v", Dt = i)))
        }

        function F(t) {
            if (gt.isOldAndroid) {
                if (Ct && "mouseup" === t.type) return;
                -1 < t.type.indexOf("touch") && (clearTimeout(Ct), Ct = setTimeout(function () {
                    Ct = 0
                }, 600))
            }
            v("pointerUp"), j(t, !1) && t.preventDefault(), !lt || -1 < (i = f.arraySearch(pe, t.pointerId, "id")) && (o = pe.splice(i, 1)[0], navigator.msPointerEnabled ? (o.type = {
                4: "mouse",
                2: "touch",
                3: "pen"
            }[t.pointerType], o.type || (o.type = t.pointerType || "mouse")) : o.type = t.pointerType || "mouse");
            var e = P(t), i = e.length;
            if ("mouseup" === t.type && (i = 0), 2 === i) return !(Dt = null);
            1 === i && w(he, e[0]), 0 !== i || Nt || Pt || (o || ("mouseup" === t.type ? o = {
                x: t.pageX,
                y: t.pageY,
                type: "mouse"
            } : t.changedTouches && t.changedTouches[0] && (o = {
                x: t.changedTouches[0].pageX,
                y: t.changedTouches[0].pageY,
                type: "touch"
            })), v("touchRelease", t, o));
            var n, s, o = -1;
            if (0 === i && (St = !1, f.unbind(window, Q, m), Ce(), jt ? o = 0 : -1 !== we && (o = d() - we)), we = 1 === i ? d() : -1, o = -1 !== o && o < 150 ? "zoom" : "swipe", jt && i < 2 && (jt = !1, 1 === i && (o = "zoomPointerUp"), v("zoomGestureEnded")), Dt = null, kt || Et || Pt || xt) if (I(), (_t = _t || je()).calculateSwipeSpeed("x"), xt) O() < g.verticalDragRange ? m.close() : (n = qt.y, s = Ft, A("verticalDrag", 0, 1, 300, f.easing.cubic.out, function (t) {
                qt.y = (m.currItem.initialPosition.y - n) * t + n, y((1 - s) * t + s), ee()
            }), v("onVerticalDrag", 1)); else {
                if ((At || Pt) && 0 === i) {
                    if (Me(o, _t)) return;
                    o = "zoomPointerUp"
                }
                if (!Pt) return "swipe" !== o ? void Pe() : void (!At && K > m.currItem.fitRatio && $e(_t))
            }
        }

        var H, W, R, B, q, U, Q, V, Z, K, G, Y, X, J, tt, et, it, nt, st, ot, at, rt, lt, ct, dt, ut, ht, pt, ft, mt,
            gt, vt, yt, wt, _t, bt, xt, Ct, St, Tt, Et, kt, It, At, Dt, jt, $t, Mt, Ot, Pt, Nt, zt, Lt, Ft, Ht, Wt,
            Rt = n(), Bt = n(), qt = n(), Ut = {}, Qt = 0, Vt = {}, Zt = n(), Kt = 0, Gt = !0, Yt = [], Xt = {},
            Jt = !1, te = {}, ee = function (t) {
                Ot && (t && (K > m.currItem.fitRatio ? Jt || (Xe(m.currItem, !1, !0), Jt = !0) : Jt && (Xe(m.currItem), Jt = !1)), r(Ot, qt.x, qt.y, K))
            }, ie = function (t) {
                t.container && r(t.container.style, t.initialPosition.x, t.initialPosition.y, t.initialZoomLevel, t)
            }, ne = function (t, e) {
                e[rt] = Y + t + "px, 0px" + X
            }, se = null, oe = function () {
                se && (f.unbind(document, "mousemove", oe), f.addClass(p, "pswp--has_mouse"), g.mouseUsed = !0, v("mouseUsed")), se = setTimeout(function () {
                    se = null
                }, 100)
            }, ae = {}, re = 0, e = {
                shout: v, listen: o, viewportSize: Ut, options: g, isMainScrollAnimating: function () {
                    return Pt
                }, getZoomLevel: function () {
                    return K
                }, getCurrentIndex: function () {
                    return B
                }, isDragging: function () {
                    return St
                }, _zoomOning: function () {
                    return jt
                }, setScrollOffset: function (t, e) {
                    Vt.x = t, mt = Vt.y = e, v("updateScrollOffset", Vt)
                }, applyZoomPan: function (t, e, i, n) {
                    qt.x = e, qt.y = i, K = t, ee(n)
                }, init: function () {
                    if (!H && !W) {
                        var t;
                        m.framework = f, m.template = p, m.bg = f.getChildByClass(p, "pswp__bg"), ht = p.className, H = !0, gt = f.detectFeatures(), dt = gt.raf, ut = gt.caf, rt = gt.transform, ft = gt.oldIE, m.scrollWrap = f.getChildByClass(p, "pswp__scroll-wrap"), m.container = f.getChildByClass(m.scrollWrap, "pswp__container"), q = m.container.style, m.itemHolders = et = [{
                            el: m.container.children[0],
                            wrap: 0,
                            index: -1
                        }, {el: m.container.children[1], wrap: 0, index: -1}, {
                            el: m.container.children[2],
                            wrap: 0,
                            index: -1
                        }], et[0].el.style.display = et[2].el.style.display = "none", function () {
                            if (rt) {
                                var t = gt.perspective && !ct;
                                return Y = "translate" + (t ? "3d(" : "("), X = gt.perspective ? ", 0px)" : ")"
                            }
                            rt = "left", f.addClass(p, "pswp--ie"), ne = function (t, e) {
                                e.left = t + "px"
                            }, ie = function (t) {
                                var e = 1 < t.fitRatio ? 1 : t.fitRatio, i = t.container.style, n = e * t.w, e = e * t.h;
                                i.width = n + "px", i.height = e + "px", i.left = t.initialPosition.x + "px", i.top = t.initialPosition.y + "px"
                            }, ee = function () {
                                var t, e, i, n;
                                Ot && (t = Ot, i = (e = 1 < (n = m.currItem).fitRatio ? 1 : n.fitRatio) * n.w, n = e * n.h, t.width = i + "px", t.height = n + "px", t.left = qt.x + "px", t.top = qt.y + "px")
                            }
                        }(), Z = {
                            resize: m.updateSize, orientationchange: function () {
                                clearTimeout(vt), vt = setTimeout(function () {
                                    Ut.x !== m.scrollWrap.clientWidth && m.updateSize()
                                }, 500)
                            }, scroll: T, keydown: C, click: S
                        };
                        var e = gt.isOldIOSPhone || gt.isOldAndroid || gt.isMobileOpera;
                        for (gt.animationName && gt.transform && !e || (g.showAnimationDuration = g.hideAnimationDuration = 0), t = 0; t < Yt.length; t++) m["init" + Yt[t]]();
                        i && (m.ui = new i(m, f)).init(), v("firstUpdate"), B = B || g.index || 0, (isNaN(B) || B < 0 || B >= Qe()) && (B = 0), m.currItem = Ue(B), (gt.isOldIOSPhone || gt.isOldAndroid) && (Gt = !1), p.setAttribute("aria-hidden", "false"), g.modal && (Gt ? p.style.position = "fixed" : (p.style.position = "absolute", p.style.top = f.getScrollY() + "px")), void 0 === mt && (v("initialLayout"), mt = pt = f.getScrollY());
                        e = "pswp--open ";
                        for (g.mainClass && (e += g.mainClass + " "), g.showHideOpacity && (e += "pswp--animate_opacity "), e += ct ? "pswp--touch" : "pswp--notouch", e += gt.animationName ? " pswp--css_animation" : "", e += gt.svg ? " pswp--svg" : "", f.addClass(p, e), m.updateSize(), U = -1, Kt = null, t = 0; t < 3; t++) ne((t + U) * Zt.x, et[t].el.style);
                        ft || f.bind(m.scrollWrap, V, m), o("initialZoomInEnd", function () {
                            m.setContent(et[0], B - 1), m.setContent(et[2], B + 1), et[0].el.style.display = et[2].el.style.display = "block", g.focus && p.focus(), f.bind(document, "keydown", m), gt.transform && f.bind(m.scrollWrap, "click", m), g.mouseUsed || f.bind(document, "mousemove", oe), f.bind(window, "resize scroll orientationchange", m), v("bindEvents")
                        }), m.setContent(et[1], B), m.updateCurrItem(), v("afterInit"), Gt || (J = setInterval(function () {
                            re || St || jt || K !== m.currItem.initialZoomLevel || m.updateSize()
                        }, 1e3)), f.addClass(p, "pswp--visible")
                    }
                }, close: function () {
                    H && (W = !(H = !1), v("close"), f.unbind(window, "resize scroll orientationchange", m), f.unbind(window, "scroll", Z.scroll), f.unbind(document, "keydown", m), f.unbind(document, "mousemove", oe), gt.transform && f.unbind(m.scrollWrap, "click", m), St && f.unbind(window, Q, m), clearTimeout(vt), v("unbindEvents"), Ve(m.currItem, null, !0, m.destroy))
                }, destroy: function () {
                    v("destroy"), We && clearTimeout(We), p.setAttribute("aria-hidden", "true"), p.className = ht, J && clearInterval(J), f.unbind(m.scrollWrap, V, m), f.unbind(window, "scroll", m), Ce(), I(), te = null
                }, panTo: function (t, e, i) {
                    i || (t > Mt.min.x ? t = Mt.min.x : t < Mt.max.x && (t = Mt.max.x), e > Mt.min.y ? e = Mt.min.y : e < Mt.max.y && (e = Mt.max.y)), qt.x = t, qt.y = e, ee()
                }, handleEvent: function (t) {
                    t = t || window.event, Z[t.type] && Z[t.type](t)
                }, goTo: function (t) {
                    var e = (t = a(t)) - B;
                    Kt = e, B = t, m.currItem = Ue(B), Qt -= e, u(Zt.x * Qt), I(), Pt = !1, m.updateCurrItem()
                }, next: function () {
                    m.goTo(B + 1)
                }, prev: function () {
                    m.goTo(B - 1)
                }, updateCurrZoomItem: function (t) {
                    var e;
                    t && v("beforeChange", 0), Ot = et[1].el.children.length ? (e = et[1].el.children[0], f.hasClass(e, "pswp__zoom-wrap") ? e.style : null) : null, Mt = m.currItem.bounds, G = K = m.currItem.initialZoomLevel, qt.x = Mt.center.x, qt.y = Mt.center.y, t && v("afterChange")
                }, invalidateCurrItems: function () {
                    tt = !0;
                    for (var t = 0; t < 3; t++) et[t].item && (et[t].item.needsUpdate = !0)
                }, updateCurrItem: function (t) {
                    if (0 !== Kt) {
                        var e, i = Math.abs(Kt);
                        if (!(t && i < 2)) {
                            m.currItem = Ue(B), Jt = !1, v("beforeChange", Kt), 3 <= i && (U += Kt + (0 < Kt ? -3 : 3), i = 3);
                            for (var n = 0; n < i; n++) 0 < Kt ? (e = et.shift(), et[2] = e, ne((++U + 2) * Zt.x, e.el.style), m.setContent(e, B - i + n + 1 + 1)) : (e = et.pop(), et.unshift(e), ne(--U * Zt.x, e.el.style), m.setContent(e, B + i - n - 1 - 1));
                            !Ot || 1 !== Math.abs(Kt) || (t = Ue(it)).initialZoomLevel !== K && (Ye(t, Ut), Xe(t), ie(t)), Kt = 0, m.updateCurrZoomItem(), it = B, v("afterChange")
                        }
                    }
                }, updateSize: function (t) {
                    if (!Gt && g.modal) {
                        var e = f.getScrollY();
                        if (mt !== e && (p.style.top = e + "px", mt = e), !t && Xt.x === window.innerWidth && Xt.y === window.innerHeight) return;
                        Xt.x = window.innerWidth, Xt.y = window.innerHeight, p.style.height = Xt.y + "px"
                    }
                    if (Ut.x = m.scrollWrap.clientWidth, Ut.y = m.scrollWrap.clientHeight, T(), Zt.x = Ut.x + Math.round(Ut.x * g.spacing), Zt.y = Ut.y, u(Zt.x * Qt), v("beforeResize"), void 0 !== U) {
                        for (var i, n, s, o = 0; o < 3; o++) i = et[o], ne((o + U) * Zt.x, i.el.style), s = B + o - 1, g.loop && 2 < Qe() && (s = a(s)), (n = Ue(s)) && (tt || n.needsUpdate || !n.bounds) ? (m.cleanSlide(n), m.setContent(i, s), 1 === o && (m.currItem = n, m.updateCurrZoomItem(!0)), n.needsUpdate = !1) : -1 === i.index && 0 <= s && m.setContent(i, s), n && n.container && (Ye(n, Ut), Xe(n), ie(n));
                        tt = !1
                    }
                    G = K = m.currItem.initialZoomLevel, (Mt = m.currItem.bounds) && (qt.x = Mt.center.x, qt.y = Mt.center.y, ee(!0)), v("resize")
                }, zoomTo: function (e, t, i, n, s) {
                    t && (G = K, be.x = Math.abs(t.x) - qt.x, be.y = Math.abs(t.y) - qt.y, w(Bt, qt));
                    var t = h(e, !1), o = {};
                    x("x", t, o, e), x("y", t, o, e);
                    var a = K, r = qt.x, l = qt.y;
                    c(o);
                    t = function (t) {
                        1 === t ? (K = e, qt.x = o.x, qt.y = o.y) : (K = (e - a) * t + a, qt.x = (o.x - r) * t + r, qt.y = (o.y - l) * t + l), s && s(t), ee(1 === t)
                    };
                    i ? A("customZoomTo", 0, 1, i, n || f.easing.sine.inOut, t) : t(1)
                }
            }, le = {}, ce = {}, de = {}, ue = {}, he = {}, pe = [], fe = {}, me = [], ge = {}, ve = 0, ye = n(), we = 0,
            _e = n(), be = n(), xe = n(), Ce = function () {
                It && (ut(It), It = null)
            }, Se = function () {
                St && (It = dt(Se), De())
            }, Te = function (t, e) {
                return !(!t || t === document) && !(t.getAttribute("class") && -1 < t.getAttribute("class").indexOf("pswp__scroll-wrap")) && (e(t) ? t : Te(t.parentNode, e))
            }, Ee = {}, ke = {}, Ie = {}, Ae = [], De = function () {
                if (Dt) {
                    var t = Dt.length;
                    if (0 !== t) if (w(le, Dt[0]), de.x = le.x - ue.x, de.y = le.y - ue.y, jt && 1 < t) ue.x = le.x, ue.y = le.y, (de.x || de.y || (o = Dt[1], a = ce, o.x !== a.x || o.y !== a.y)) && (w(ce, Dt[1]), Et || (Et = !0, v("zoomGestureStarted")), n = D(le, ce), (s = Oe(n)) > m.currItem.initialZoomLevel + m.currItem.initialZoomLevel / 15 && (Ht = !0), i = 1, t = _(), o = b(), s < t ? g.pinchToClose && !Ht && G <= m.currItem.initialZoomLevel ? (y(a = 1 - (t - s) / (t / 1.2)), v("onPinchClose", a), Lt = !0) : (1 < (i = (t - s) / t) && (i = 1), s = t - i * (t / 3)) : o < s && (1 < (i = (s - o) / (6 * t)) && (i = 1), s = o + i * t), i < 0 && (i = 0), M(le, ce, ye), Rt.x += ye.x - xe.x, Rt.y += ye.y - xe.y, w(xe, ye), qt.x = l("x", s), qt.y = l("y", s), bt = K < s, K = s, ee()); else if (Nt && (zt && (zt = !1, 10 <= Math.abs(de.x) && (de.x -= Dt[0].x - he.x), 10 <= Math.abs(de.y) && (de.y -= Dt[0].y - he.y)), ue.x = le.x, ue.y = le.y, 0 !== de.x || 0 !== de.y)) {
                        if ("v" === Nt && g.closeOnVerticalDrag && "fit" === g.scaleMode && K === m.currItem.initialZoomLevel) {
                            Rt.y += de.y, qt.y += de.y;
                            var e = O();
                            return xt = !0, v("onVerticalDrag", e), y(e), void ee()
                        }
                        i = d(), n = le.x, s = le.y, 50 < i - wt && ((e = 2 < me.length ? me.shift() : {}).x = n, e.y = s, me.push(e), wt = i), kt = !0, Mt = m.currItem.bounds, N("x", de) || (N("y", de), c(qt), ee())
                    }
                }
                var i, n, s, o, a
            }, je = function () {
                var e, i, n = {
                    lastFlickOffset: {},
                    lastFlickDist: {},
                    lastFlickSpeed: {},
                    slowDownRatio: {},
                    slowDownRatioReverse: {},
                    speedDecelerationRatio: {},
                    speedDecelerationRatioAbs: {},
                    distanceOffset: {},
                    backAnimDestination: {},
                    backAnimStarted: {},
                    calculateSwipeSpeed: function (t) {
                        i = 1 < me.length ? (e = d() - wt + 50, me[me.length - 2][t]) : (e = d() - yt, he[t]), n.lastFlickOffset[t] = ue[t] - i, n.lastFlickDist[t] = Math.abs(n.lastFlickOffset[t]), 20 < n.lastFlickDist[t] ? n.lastFlickSpeed[t] = n.lastFlickOffset[t] / e : n.lastFlickSpeed[t] = 0, Math.abs(n.lastFlickSpeed[t]) < .1 && (n.lastFlickSpeed[t] = 0), n.slowDownRatio[t] = .95, n.slowDownRatioReverse[t] = 1 - n.slowDownRatio[t], n.speedDecelerationRatio[t] = 1
                    },
                    calculateOverBoundsAnimOffset: function (e, t) {
                        n.backAnimStarted[e] || (qt[e] > Mt.min[e] ? n.backAnimDestination[e] = Mt.min[e] : qt[e] < Mt.max[e] && (n.backAnimDestination[e] = Mt.max[e]), void 0 !== n.backAnimDestination[e] && (n.slowDownRatio[e] = .7, n.slowDownRatioReverse[e] = 1 - n.slowDownRatio[e], n.speedDecelerationRatioAbs[e] < .05 && (n.lastFlickSpeed[e] = 0, n.backAnimStarted[e] = !0, A("bounceZoomPan" + e, qt[e], n.backAnimDestination[e], t || 300, f.easing.sine.out, function (t) {
                            qt[e] = t, ee()
                        }))))
                    },
                    calculateAnimOffset: function (t) {
                        n.backAnimStarted[t] || (n.speedDecelerationRatio[t] = n.speedDecelerationRatio[t] * (n.slowDownRatio[t] + n.slowDownRatioReverse[t] - n.slowDownRatioReverse[t] * n.timeDiff / 10), n.speedDecelerationRatioAbs[t] = Math.abs(n.lastFlickSpeed[t] * n.speedDecelerationRatio[t]), n.distanceOffset[t] = n.lastFlickSpeed[t] * n.speedDecelerationRatio[t] * n.timeDiff, qt[t] += n.distanceOffset[t])
                    },
                    panAnimLoop: function () {
                        if (ae.zoomPan && (ae.zoomPan.raf = dt(n.panAnimLoop), n.now = d(), n.timeDiff = n.now - n.lastNow, n.lastNow = n.now, n.calculateAnimOffset("x"), n.calculateAnimOffset("y"), ee(), n.calculateOverBoundsAnimOffset("x"), n.calculateOverBoundsAnimOffset("y"), n.speedDecelerationRatioAbs.x < .05 && n.speedDecelerationRatioAbs.y < .05)) return qt.x = Math.round(qt.x), qt.y = Math.round(qt.y), ee(), void E("zoomPan")
                    }
                };
                return n
            }, $e = function (t) {
                return t.calculateSwipeSpeed("y"), Mt = m.currItem.bounds, t.backAnimDestination = {}, t.backAnimStarted = {}, Math.abs(t.lastFlickSpeed.x) <= .05 && Math.abs(t.lastFlickSpeed.y) <= .05 ? (t.speedDecelerationRatioAbs.x = t.speedDecelerationRatioAbs.y = 0, t.calculateOverBoundsAnimOffset("x"), t.calculateOverBoundsAnimOffset("y"), !0) : (k("zoomPan"), t.lastNow = d(), void t.panAnimLoop())
            }, Me = function (t, e) {
                var i, n;
                Pt || (ve = B), "swipe" === t && (n = ue.x - he.x, t = e.lastFlickDist.x < 10, 30 < n && (t || 20 < e.lastFlickOffset.x) ? o = -1 : n < -30 && (t || e.lastFlickOffset.x < -20) && (o = 1)), o && ((B += o) < 0 ? (B = g.loop ? Qe() - 1 : 0, s = !0) : B >= Qe() && (B = g.loop ? 0 : Qe() - 1, s = !0), s && !g.loop || (Kt += o, Qt -= o, i = !0));
                var s = Zt.x * Qt, o = Math.abs(s - _e.x),
                    a = i || s > _e.x == 0 < e.lastFlickSpeed.x ? (a = 0 < Math.abs(e.lastFlickSpeed.x) ? o / Math.abs(e.lastFlickSpeed.x) : 333, a = Math.min(a, 400), Math.max(a, 250)) : 333;
                return ve === B && (i = !1), Pt = !0, v("mainScrollAnimStart"), A("mainScroll", _e.x, s, a, f.easing.cubic.out, u, function () {
                    I(), Pt = !1, ve = -1, !i && ve === B || m.updateCurrItem(), v("mainScrollAnimComplete")
                }), i && m.updateCurrItem(!0), i
            }, Oe = function (t) {
                return 1 / $t * t * G
            }, Pe = function () {
                var t = K, e = _(), i = b();
                K < e ? t = e : i < K && (t = i);
                var n, s = Ft;
                return Lt && !bt && !Ht && K < e ? m.close() : (Lt && (n = function (t) {
                    y((1 - s) * t + s)
                }), m.zoomTo(t, 0, 200, f.easing.cubic.out, n)), !0
            };
        s("Gestures", {
            publicMethods: {
                initGestures: function () {
                    function t(t, e, i, n, s) {
                        nt = t + e, st = t + i, ot = t + n, at = s ? t + s : ""
                    }

                    (lt = gt.pointerEvent) && gt.touch && (gt.touch = !1), lt ? navigator.msPointerEnabled ? t("MSPointer", "Down", "Move", "Up", "Cancel") : t("pointer", "down", "move", "up", "cancel") : gt.touch ? (t("touch", "start", "move", "end", "cancel"), ct = !0) : t("mouse", "down", "move", "up"), Q = st + " " + ot + " " + at, V = nt, lt && !ct && (ct = 1 < navigator.maxTouchPoints || 1 < navigator.msMaxTouchPoints), m.likelyTouchDevice = ct, Z[nt] = z, Z[st] = L, Z[ot] = F, at && (Z[at] = Z[ot]), gt.touch && (V += " mousedown", Q += " mousemove mouseup", Z.mousedown = Z[nt], Z.mousemove = Z[st], Z.mouseup = Z[ot]), ct || (g.allowPanToNext = !1)
                }
            }
        });

        function Ne() {
            return {center: {x: 0, y: 0}, max: {x: 0, y: 0}, min: {x: 0, y: 0}}
        }

        function ze(t, e, i, n, s, o) {
            e.loadError || n && (e.imageAppended = !0, Xe(e, n, e === m.currItem && Jt), i.appendChild(n), o && setTimeout(function () {
                e && e.loaded && e.placeholder && (e.placeholder.style.display = "none", e.placeholder = null)
            }, 500))
        }

        function Le(t) {
            function e() {
                t.loading = !1, t.loaded = !0, t.loadComplete ? t.loadComplete(t) : t.img = null, i.onload = i.onerror = null, i = null
            }

            t.loading = !0, t.loaded = !1;
            var i = t.img = f.createEl("pswp__img", "img");
            return i.onload = e, i.onerror = function () {
                t.loadError = !0, e()
            }, i.src = t.src, i
        }

        function Fe(t, e) {
            return t.src && t.loadError && t.container && (e && (t.container.innerHTML = ""), t.container.innerHTML = g.errorMsg.replace("%url%", t.src), 1)
        }

        function He() {
            if (Ke.length) {
                for (var t, e = 0; e < Ke.length; e++) (t = Ke[e]).holder.index === t.index && ze(t.index, t.item, t.baseDiv, t.img, 0, t.clearPlaceholder);
                Ke = []
            }
        }

        var We, Re, Be, qe, Ue, Qe, Ve = function (a, t, r, e) {
            var l;
            We && clearTimeout(We), Be = qe = !0, a.initialLayout ? (l = a.initialLayout, a.initialLayout = null) : l = g.getThumbBoundsFn && g.getThumbBoundsFn(B);

            function c() {
                E("initialZoom"), r ? (m.template.removeAttribute("style"), m.bg.removeAttribute("style")) : (y(1), t && (t.style.display = "block"), f.addClass(p, "pswp--animated-in"), v("initialZoom" + (r ? "OutEnd" : "InEnd"))), e && e(), qe = !1
            }

            var d, u, h = r ? g.hideAnimationDuration : g.showAnimationDuration;
            if (!h || !l || void 0 === l.x) return v("initialZoom" + (r ? "Out" : "In")), K = a.initialZoomLevel, w(qt, a.initialPosition), ee(), p.style.opacity = r ? 0 : 1, y(1), void (h ? setTimeout(function () {
                c()
            }, h) : c());
            d = R, u = !m.currItem.src || m.currItem.loadError || g.showHideOpacity, a.miniImg && (a.miniImg.style.webkitBackfaceVisibility = "hidden"), r || (K = l.w / a.w, qt.x = l.x, qt.y = l.y - pt, m[u ? "template" : "bg"].style.opacity = .001, ee()), k("initialZoom"), r && !d && f.removeClass(p, "pswp--animated-in"), u && (r ? f[(d ? "remove" : "add") + "Class"](p, "pswp--animate_opacity") : setTimeout(function () {
                f.addClass(p, "pswp--animate_opacity")
            }, 30)), We = setTimeout(function () {
                var e, i, n, s, o, t;
                v("initialZoom" + (r ? "Out" : "In")), r ? (e = l.w / a.w, i = qt.x, n = qt.y, s = K, o = Ft, t = function (t) {
                    1 === t ? (K = e, qt.x = l.x, qt.y = l.y - mt) : (K = (e - s) * t + s, qt.x = (l.x - i) * t + i, qt.y = (l.y - mt - n) * t + n), ee(), u ? p.style.opacity = 1 - t : y(o - t * o)
                }, d ? A("initialZoom", 0, 1, h, f.easing.cubic.out, t, c) : (t(1), We = setTimeout(c, h + 20))) : (K = a.initialZoomLevel, w(qt, a.initialPosition), ee(), y(1), u ? p.style.opacity = 1 : y(1), We = setTimeout(c, h + 20))
            }, r ? 25 : 90)
        }, Ze = {}, Ke = [], Ge = {
            index: 0,
            errorMsg: '<div class="pswp__error-msg"><a href="%url%" target="_blank">The image</a> could not be loaded.</div>',
            forceProgressiveLoading: !1,
            preload: [1, 1],
            getNumItemsFn: function () {
                return Re.length
            }
        }, Ye = function (t, e, i) {
            if (!t.src || t.loadError) return t.w = t.h = 0, t.initialZoomLevel = t.fitRatio = 1, t.bounds = Ne(), t.initialPosition = t.bounds.center, t.bounds;
            var n, s, o, a = !i;
            return a && (t.vGap || (t.vGap = {
                top: 0,
                bottom: 0
            }), v("parseVerticalMargin", t)), Ze.x = e.x, Ze.y = e.y - t.vGap.top - t.vGap.bottom, a && (n = Ze.x / t.w, s = Ze.y / t.h, t.fitRatio = n < s ? n : s, "orig" === (o = g.scaleMode) ? i = 1 : "fit" === o && (i = t.fitRatio), 1 < i && (i = 1), t.initialZoomLevel = i, t.bounds || (t.bounds = Ne())), i ? (n = (e = t).w * i, s = t.h * i, (o = e.bounds).center.x = Math.round((Ze.x - n) / 2), o.center.y = Math.round((Ze.y - s) / 2) + e.vGap.top, o.max.x = n > Ze.x ? Math.round(Ze.x - n) : o.center.x, o.max.y = s > Ze.y ? Math.round(Ze.y - s) + e.vGap.top : o.center.y, o.min.x = n > Ze.x ? 0 : o.center.x, o.min.y = s > Ze.y ? e.vGap.top : o.center.y, a && i === t.initialZoomLevel && (t.initialPosition = t.bounds.center), t.bounds) : void 0
        }, Xe = function (t, e, i) {
            var n;
            t.src && (e = e || t.container.lastChild, n = i ? t.w : Math.round(t.w * t.fitRatio), i = i ? t.h : Math.round(t.h * t.fitRatio), t.placeholder && !t.loaded && (t.placeholder.style.width = n + "px", t.placeholder.style.height = i + "px"), e.style.width = n + "px", e.style.height = i + "px")
        };
        s("Controller", {
            publicMethods: {
                lazyLoadItem: function (t) {
                    t = a(t);
                    var e = Ue(t);
                    e && (!e.loaded && !e.loading || tt) && (v("gettingData", t, e), e.src && Le(e))
                }, initController: function () {
                    f.extend(g, Ge, !0), m.items = Re = t, Ue = m.getItemAt, Qe = g.getNumItemsFn, g.loop, Qe() < 3 && (g.loop = !1), o("beforeChange", function (t) {
                        for (var e = g.preload, i = null === t || 0 <= t, n = Math.min(e[0], Qe()), s = Math.min(e[1], Qe()), o = 1; o <= (i ? s : n); o++) m.lazyLoadItem(B + o);
                        for (o = 1; o <= (i ? n : s); o++) m.lazyLoadItem(B - o)
                    }), o("initialLayout", function () {
                        m.currItem.initialLayout = g.getThumbBoundsFn && g.getThumbBoundsFn(B)
                    }), o("mainScrollAnimComplete", He), o("initialZoomInEnd", He), o("destroy", function () {
                        for (var t, e = 0; e < Re.length; e++) (t = Re[e]).container && (t.container = null), t.placeholder && (t.placeholder = null), t.img && (t.img = null), t.preloader && (t.preloader = null), t.loadError && (t.loaded = t.loadError = !1);
                        Ke = null
                    })
                }, getItemAt: function (t) {
                    return 0 <= t && void 0 !== Re[t] && Re[t]
                }, allowProgressiveImg: function () {
                    return g.forceProgressiveLoading || !ct || g.mouseUsed || 1200 < screen.width
                }, setContent: function (e, i) {
                    g.loop && (i = a(i));
                    var t = m.getItemAt(e.index);
                    t && (t.container = null);
                    var n, s, o = m.getItemAt(i);
                    o ? (v("gettingData", i, o), e.index = i, s = (e.item = o).container = f.createEl("pswp__zoom-wrap"), !o.src && o.html && (o.html.tagName ? s.appendChild(o.html) : s.innerHTML = o.html), Fe(o), Ye(o, Ut), !o.src || o.loadError || o.loaded ? o.src && !o.loadError && ((n = f.createEl("pswp__img", "img")).style.opacity = 1, n.src = o.src, Xe(o, n), ze(0, o, s, n)) : (o.loadComplete = function (t) {
                        if (H) {
                            if (e && e.index === i) {
                                if (Fe(t, !0)) return t.loadComplete = t.img = null, Ye(t, Ut), ie(t), void (e.index === B && m.updateCurrZoomItem());
                                t.imageAppended ? !qe && t.placeholder && (t.placeholder.style.display = "none", t.placeholder = null) : gt.transform && (Pt || qe) ? Ke.push({
                                    item: t,
                                    baseDiv: s,
                                    img: t.img,
                                    index: i,
                                    holder: e,
                                    clearPlaceholder: !0
                                }) : ze(0, t, s, t.img, 0, !0)
                            }
                            t.loadComplete = null, t.img = null, v("imageLoadComplete", i, t)
                        }
                    }, f.features.transform && (t = "pswp__img pswp__img--placeholder", t += o.msrc ? "" : " pswp__img--placeholder--blank", t = f.createEl(t, o.msrc ? "img" : ""), o.msrc && (t.src = o.msrc), Xe(o, t), s.appendChild(t), o.placeholder = t), o.loading || Le(o), m.allowProgressiveImg() && (!Be && gt.transform ? Ke.push({
                        item: o,
                        baseDiv: s,
                        img: o.img,
                        index: i,
                        holder: e
                    }) : ze(0, o, s, o.img, 0, !0))), Be || i !== B ? ie(o) : (Ot = s.style, Ve(o, n || o.img)), e.el.innerHTML = "", e.el.appendChild(s)) : e.el.innerHTML = ""
                }, cleanSlide: function (t) {
                    t.img && (t.img.onload = t.img.onerror = null), t.loaded = t.loading = t.img = t.imageAppended = !1
                }
            }
        });

        function Je(t, e, i) {
            var n = document.createEvent("CustomEvent"),
                i = {origEvent: t, target: t.target, releasePoint: e, pointerType: i || "touch"};
            n.initCustomEvent("pswpTap", !0, !0, i), t.target.dispatchEvent(n)
        }

        var ti, ei, ii = {};
        s("Tap", {
            publicMethods: {
                initTap: function () {
                    o("firstTouchStart", m.onTapStart), o("touchRelease", m.onTapRelease), o("destroy", function () {
                        ii = {}, ti = null
                    })
                }, onTapStart: function (t) {
                    1 < t.length && (clearTimeout(ti), ti = null)
                }, onTapRelease: function (t, e) {
                    var i, n, s;
                    !e || kt || Tt || re || (i = e, ti && (clearTimeout(ti), ti = null, n = i, s = ii, Math.abs(n.x - s.x) < 25 && Math.abs(n.y - s.y) < 25) ? v("doubleTap", i) : "mouse" !== e.type ? "BUTTON" === t.target.tagName.toUpperCase() || f.hasClass(t.target, "pswp__single-tap") ? Je(t, e) : (w(ii, i), ti = setTimeout(function () {
                        Je(t, e), ti = null
                    }, 300)) : Je(t, e, "mouse"))
                }
            }
        }), s("DesktopZoom", {
            publicMethods: {
                initDesktopZoom: function () {
                    ft || (ct ? o("mouseUsed", function () {
                        m.setupDesktopZoom()
                    }) : m.setupDesktopZoom(!0))
                }, setupDesktopZoom: function (t) {
                    ei = {};
                    var e = "wheel mousewheel DOMMouseScroll";
                    o("bindEvents", function () {
                        f.bind(p, e, m.handleMouseWheel)
                    }), o("unbindEvents", function () {
                        ei && f.unbind(p, e, m.handleMouseWheel)
                    }), m.mouseZoomedIn = !1;

                    function i() {
                        m.mouseZoomedIn && (f.removeClass(p, "pswp--zoomed-in"), m.mouseZoomedIn = !1), K < 1 ? f.addClass(p, "pswp--zoom-allowed") : f.removeClass(p, "pswp--zoom-allowed"), s()
                    }

                    var n, s = function () {
                        n && (f.removeClass(p, "pswp--dragging"), n = !1)
                    };
                    o("resize", i), o("afterChange", i), o("pointerDown", function () {
                        m.mouseZoomedIn && (n = !0, f.addClass(p, "pswp--dragging"))
                    }), o("pointerUp", s), t || i()
                }, handleMouseWheel: function (t) {
                    if (K <= m.currItem.fitRatio) return g.modal && (!g.closeOnScroll || re || St ? t.preventDefault() : rt && 2 < Math.abs(t.deltaY) && (R = !0, m.close())), !0;
                    if (t.stopPropagation(), ei.x = 0, "deltaX" in t) 1 === t.deltaMode ? (ei.x = 18 * t.deltaX, ei.y = 18 * t.deltaY) : (ei.x = t.deltaX, ei.y = t.deltaY); else if ("wheelDelta" in t) t.wheelDeltaX && (ei.x = -.16 * t.wheelDeltaX), t.wheelDeltaY ? ei.y = -.16 * t.wheelDeltaY : ei.y = -.16 * t.wheelDelta; else {
                        if (!("detail" in t)) return;
                        ei.y = t.detail
                    }
                    h(K, !0);
                    var e = qt.x - ei.x, i = qt.y - ei.y;
                    (g.modal || e <= Mt.min.x && e >= Mt.max.x && i <= Mt.min.y && i >= Mt.max.y) && t.preventDefault(), m.panTo(e, i)
                }, toggleDesktopZoom: function (t) {
                    t = t || {x: Ut.x / 2 + Vt.x, y: Ut.y / 2 + Vt.y};
                    var e = g.getDoubleTapZoom(!0, m.currItem), i = K === e;
                    m.mouseZoomedIn = !i, m.zoomTo(i ? m.currItem.initialZoomLevel : e, t, 333), f[(i ? "remove" : "add") + "Class"](p, "pswp--zoomed-in")
                }
            }
        });

        function ni() {
            return gi.hash.substring(1)
        }

        function si() {
            ai && clearTimeout(ai), li && clearTimeout(li)
        }

        function oi() {
            var t = ni(), e = {};
            if (t.length < 5) return e;
            var i, n = t.split("&");
            for (o = 0; o < n.length; o++) n[o] && ((i = n[o].split("=")).length < 2 || (e[i[0]] = i[1]));
            if (g.galleryPIDs) {
                for (var s = e.pid, o = e.pid = 0; o < Re.length; o++) if (Re[o].pid === s) {
                    e.pid = o;
                    break
                }
            } else e.pid = parseInt(e.pid, 10) - 1;
            return e.pid < 0 && (e.pid = 0), e
        }

        var ai, ri, li, ci, di, ui, hi, pi, fi, mi, gi, vi, yi = {history: !0, galleryUID: 1}, wi = function () {
            var t, e;
            li && clearTimeout(li), re || St ? li = setTimeout(wi, 500) : (ci ? clearTimeout(ri) : ci = !0, e = B + 1, (t = Ue(B)).hasOwnProperty("pid") && (e = t.pid), t = hi + "&gid=" + g.galleryUID + "&pid=" + e, pi || -1 === gi.hash.indexOf(t) && (mi = !0), e = gi.href.split("#")[0] + "#" + t, vi ? "#" + t !== window.location.hash && history[pi ? "replaceState" : "pushState"]("", document.title, e) : pi ? gi.replace(e) : gi.hash = t, pi = !0, ri = setTimeout(function () {
                ci = !1
            }, 60))
        };
        s("History", {
            publicMethods: {
                initHistory: function () {
                    var t, e;
                    f.extend(g, yi, !0), g.history && (gi = window.location, pi = fi = mi = !1, hi = ni(), vi = "pushState" in history, -1 < hi.indexOf("gid=") && (hi = (hi = hi.split("&gid=")[0]).split("?gid=")[0]), o("afterChange", m.updateURL), o("unbindEvents", function () {
                        f.unbind(window, "hashchange", m.onHashChange)
                    }), t = function () {
                        ui = !0, fi || (mi ? history.back() : hi ? gi.hash = hi : vi ? history.pushState("", document.title, gi.pathname + gi.search) : gi.hash = ""), si()
                    }, o("unbindEvents", function () {
                        R && t()
                    }), o("destroy", function () {
                        ui || t()
                    }), o("firstUpdate", function () {
                        B = oi().pid
                    }), -1 < (e = hi.indexOf("pid=")) && ("&" === (hi = hi.substring(0, e)).slice(-1) && (hi = hi.slice(0, -1))), setTimeout(function () {
                        H && f.bind(window, "hashchange", m.onHashChange)
                    }, 40))
                }, onHashChange: function () {
                    return ni() === hi ? (fi = !0, void m.close()) : void (ci || (di = !0, m.goTo(oi().pid), di = !1))
                }, updateURL: function () {
                    si(), di || (pi ? ai = setTimeout(wi, 800) : wi())
                }
            }
        }), f.extend(m, e)
    }
}), function (t, e) {
    "function" == typeof define && define.amd ? define(e) : "object" == typeof exports ? module.exports = e() : t.PhotoSwipeUI_Default = e()
}(this, function () {
    "use strict";
    return function (n, r) {
        function t(t) {
            if (k) return !0;
            t = t || window.event, E.timeToIdle && E.mouseUsed && !_ && z();
            for (var e, i, n = (t.target || t.srcElement).getAttribute("class") || "", s = 0; s < F.length; s++) (e = F[s]).onTap && -1 < n.indexOf("pswp__" + e.name) && (e.onTap(), i = !0);
            i && (t.stopPropagation && t.stopPropagation(), k = !0, t = r.features.isOldAndroid ? 600 : 30, setTimeout(function () {
                k = !1
            }, t))
        }

        function e(t, e, i) {
            r[(i ? "add" : "remove") + "Class"](t, "pswp__" + e)
        }

        function i() {
            var t = 1 === E.getNumItemsFn();
            t !== T && (e(p, "ui--one-slide", t), T = t)
        }

        function s() {
            e(y, "share-modal--hidden", M)
        }

        function o() {
            return (M = !M) ? (r.removeClass(y, "pswp__share-modal--fade-in"), setTimeout(function () {
                M && s()
            }, 300)) : (s(), setTimeout(function () {
                M || r.addClass(y, "pswp__share-modal--fade-in")
            }, 30)), M || P(), 0
        }

        function a(t) {
            var e = (t = t || window.event).target || t.srcElement;
            return n.shout("shareLinkClick", t, e), !(!e.href || !e.hasAttribute("download") && (window.open(e.href, "pswp_share", "scrollbars=yes,resizable=yes,toolbar=no,location=yes,width=550,height=420,top=100,left=" + (window.screen ? Math.round(screen.width / 2 - 275) : 100)), M || o(), 1))
        }

        function l(t) {
            for (var e = 0; e < E.closeElClasses.length; e++) if (r.hasClass(t, "pswp__" + E.closeElClasses[e])) return !0
        }

        function c(t) {
            (t = (t = t || window.event).relatedTarget || t.toElement) && "HTML" !== t.nodeName || (clearTimeout(A), A = setTimeout(function () {
                D.setIdle(!0)
            }, E.timeToIdleOutside))
        }

        function d(t) {
            var e, i = t.vGap;
            !n.likelyTouchDevice || E.mouseUsed || screen.width > E.fitControlsWidth ? (e = E.barsSize, E.captionEl && "auto" === e.bottom ? (m || ((m = r.createEl("pswp__caption pswp__caption--fake")).appendChild(r.createEl("pswp__caption__center")), p.insertBefore(m, f), r.addClass(p, "pswp__ui--fit")), E.addCaptionHTMLFn(t, m, !0) ? (t = m.clientHeight, i.bottom = parseInt(t, 10) || 44) : i.bottom = e.top) : i.bottom = "auto" === e.bottom ? 0 : e.bottom, i.top = e.top) : i.top = i.bottom = 0
        }

        function u() {
            function t(t) {
                if (t) for (var e = t.length, i = 0; i < e; i++) {
                    s = t[i], o = s.className;
                    for (var n = 0; n < F.length; n++) a = F[n], -1 < o.indexOf("pswp__" + a.name) && (E[a.option] ? (r.removeClass(s, "pswp__element--disabled"), a.onInit && a.onInit(s)) : r.addClass(s, "pswp__element--disabled"))
                }
            }

            var s, o, a;
            t(p.children);
            var e = r.getChildByClass(p, "pswp__top-bar");
            e && t(e.children)
        }

        var h, p, f, m, g, v, y, w, _, b, x, C, S, T, E, k, I, A, D = this, j = !1, $ = !0, M = !0, O = {
            barsSize: {top: 44, bottom: "auto"},
            closeElClasses: ["item", "caption", "zoom-wrap", "ui", "top-bar"],
            timeToIdle: 4e3,
            timeToIdleOutside: 1e3,
            loadingIndicatorDelay: 1e3,
            addCaptionHTMLFn: function (t, e) {
                return t.title ? (e.children[0].innerHTML = t.title, !0) : (e.children[0].innerHTML = "", !1)
            },
            closeEl: !0,
            captionEl: !0,
            fullscreenEl: !0,
            zoomEl: !0,
            shareEl: !0,
            counterEl: !0,
            arrowEl: !0,
            preloaderEl: !0,
            tapToClose: !1,
            tapToToggleControls: !0,
            clickToCloseNonZoomable: !0,
            shareButtons: [{
                id: "facebook",
                label: "Share on Facebook",
                url: "https://www.facebook.com/sharer/sharer.php?u={{url}}"
            }, {
                id: "twitter",
                label: "Tweet",
                url: "https://twitter.com/intent/tweet?text={{text}}&url={{url}}"
            }, {
                id: "pinterest",
                label: "Pin it",
                url: "http://www.pinterest.com/pin/create/button/?url={{url}}&media={{image_url}}&description={{text}}"
            }, {id: "download", label: "Download image", url: "{{raw_image_url}}", download: !0}],
            getImageURLForShare: function () {
                return n.currItem.src || ""
            },
            getPageURLForShare: function () {
                return window.location.href
            },
            getTextForShare: function () {
                return n.currItem.title || ""
            },
            indexIndicatorSep: " / ",
            fitControlsWidth: 1200
        }, P = function () {
            for (var t, e, i, n, s = "", o = 0; o < E.shareButtons.length; o++) t = E.shareButtons[o], e = E.getImageURLForShare(t), i = E.getPageURLForShare(t), n = E.getTextForShare(t), s += '<a href="' + t.url.replace("{{url}}", encodeURIComponent(i)).replace("{{image_url}}", encodeURIComponent(e)).replace("{{raw_image_url}}", e).replace("{{text}}", encodeURIComponent(n)) + '" target="_blank" class="pswp__share--' + t.id + '"' + (t.download ? "download" : "") + ">" + t.label + "</a>", E.parseShareButtonOut && (s = E.parseShareButtonOut(t, s));
            y.children[0].innerHTML = s, y.children[0].onclick = a
        }, N = 0, z = function () {
            clearTimeout(A), N = 0, _ && D.setIdle(!1)
        }, L = function (t) {
            C !== t && (e(x, "preloader--active", !t), C = t)
        }, F = [{
            name: "caption", option: "captionEl", onInit: function (t) {
                f = t
            }
        }, {
            name: "share-modal", option: "shareEl", onInit: function (t) {
                y = t
            }, onTap: function () {
                o()
            }
        }, {
            name: "button--share", option: "shareEl", onInit: function (t) {
                v = t
            }, onTap: function () {
                o()
            }
        }, {name: "button--zoom", option: "zoomEl", onTap: n.toggleDesktopZoom}, {
            name: "counter",
            option: "counterEl",
            onInit: function (t) {
                g = t
            }
        }, {name: "button--close", option: "closeEl", onTap: n.close}, {
            name: "button--arrow--left",
            option: "arrowEl",
            onTap: n.prev
        }, {name: "button--arrow--right", option: "arrowEl", onTap: n.next}, {
            name: "button--fs",
            option: "fullscreenEl",
            onTap: function () {
                h.isFullscreen() ? h.exit() : h.enter()
            }
        }, {
            name: "preloader", option: "preloaderEl", onInit: function (t) {
                x = t
            }
        }];
        D.init = function () {
            var e;
            r.extend(n.options, O, !0), E = n.options, p = r.getChildByClass(n.scrollWrap, "pswp__ui"), (b = n.listen)("onVerticalDrag", function (t) {
                $ && t < .95 ? D.hideControls() : !$ && .95 <= t && D.showControls()
            }), b("onPinchClose", function (t) {
                $ && t < .9 ? (D.hideControls(), e = !0) : e && !$ && .9 < t && D.showControls()
            }), b("zoomGestureEnded", function () {
                e = !1
            }), b("beforeChange", D.update), b("doubleTap", function (t) {
                var e = n.currItem.initialZoomLevel;
                n.getZoomLevel() !== e ? n.zoomTo(e, t, 333) : n.zoomTo(E.getDoubleTapZoom(!1, n.currItem), t, 333)
            }), b("preventDragEvent", function (t, e, i) {
                var n = t.target || t.srcElement;
                n && n.getAttribute("class") && -1 < t.type.indexOf("mouse") && (0 < n.getAttribute("class").indexOf("__caption") || /(SMALL|STRONG|EM)/i.test(n.tagName)) && (i.prevent = !1)
            }), b("bindEvents", function () {
                r.bind(p, "pswpTap click", t), r.bind(n.scrollWrap, "pswpTap", D.onGlobalTap), n.likelyTouchDevice || r.bind(n.scrollWrap, "mouseover", D.onMouseOver)
            }), b("unbindEvents", function () {
                M || o(), I && clearInterval(I), r.unbind(document, "mouseout", c), r.unbind(document, "mousemove", z), r.unbind(p, "pswpTap click", t), r.unbind(n.scrollWrap, "pswpTap", D.onGlobalTap), r.unbind(n.scrollWrap, "mouseover", D.onMouseOver), h && (r.unbind(document, h.eventK, D.updateFullscreen), h.isFullscreen() && (E.hideAnimationDuration = 0, h.exit()), h = null)
            }), b("destroy", function () {
                E.captionEl && (m && p.removeChild(m), r.removeClass(f, "pswp__caption--empty")), y && (y.children[0].onclick = null), r.removeClass(p, "pswp__ui--over-close"), r.addClass(p, "pswp__ui--hidden"), D.setIdle(!1)
            }), E.showAnimationDuration || r.removeClass(p, "pswp__ui--hidden"), b("initialZoomIn", function () {
                E.showAnimationDuration && r.removeClass(p, "pswp__ui--hidden")
            }), b("initialZoomOut", function () {
                r.addClass(p, "pswp__ui--hidden")
            }), b("parseVerticalMargin", d), u(), E.shareEl && v && y && (M = !0), i(), E.timeToIdle && b("mouseUsed", function () {
                r.bind(document, "mousemove", z), r.bind(document, "mouseout", c), I = setInterval(function () {
                    2 == ++N && D.setIdle(!0)
                }, E.timeToIdle / 2)
            }), E.fullscreenEl && !r.features.isOldAndroid && ((h = h || D.getFullscreenAPI()) ? (r.bind(document, h.eventK, D.updateFullscreen), D.updateFullscreen(), r.addClass(n.template, "pswp--supports-fs")) : r.removeClass(n.template, "pswp--supports-fs")), E.preloaderEl && (L(!0), b("beforeChange", function () {
                clearTimeout(S), S = setTimeout(function () {
                    n.currItem && n.currItem.loading ? n.allowProgressiveImg() && (!n.currItem.img || n.currItem.img.naturalWidth) || L(!1) : L(!0)
                }, E.loadingIndicatorDelay)
            }), b("imageLoadComplete", function (t, e) {
                n.currItem === e && L(!0)
            }))
        }, D.setIdle = function (t) {
            e(p, "ui--idle", _ = t)
        }, D.update = function () {
            j = !(!$ || !n.currItem) && (D.updateIndexIndicator(), E.captionEl && (E.addCaptionHTMLFn(n.currItem, f), e(f, "caption--empty", !n.currItem.title)), !0), M || o(), i()
        }, D.updateFullscreen = function (t) {
            t && setTimeout(function () {
                n.setScrollOffset(0, r.getScrollY())
            }, 50), r[(h.isFullscreen() ? "add" : "remove") + "Class"](n.template, "pswp--fs")
        }, D.updateIndexIndicator = function () {
            E.counterEl && (g.innerHTML = n.getCurrentIndex() + 1 + E.indexIndicatorSep + E.getNumItemsFn())
        }, D.onGlobalTap = function (t) {
            var e = (t = t || window.event).target || t.srcElement;
            if (!k) if (t.detail && "mouse" === t.detail.pointerType) l(e) ? n.close() : r.hasClass(e, "pswp__img") && (1 === n.getZoomLevel() && n.getZoomLevel() <= n.currItem.fitRatio ? E.clickToCloseNonZoomable && n.close() : n.toggleDesktopZoom(t.detail.releasePoint)); else if (E.tapToToggleControls && ($ ? D.hideControls() : D.showControls()), E.tapToClose && (r.hasClass(e, "pswp__img") || l(e))) return void n.close()
        }, D.onMouseOver = function (t) {
            t = (t = t || window.event).target || t.srcElement;
            e(p, "ui--over-close", l(t))
        }, D.hideControls = function () {
            r.addClass(p, "pswp__ui--hidden"), $ = !1
        }, D.showControls = function () {
            $ = !0, j || D.update(), r.removeClass(p, "pswp__ui--hidden")
        }, D.supportsFullscreen = function () {
            var t = document;
            return !!(t.exitFullscreen || t.mozCancelFullScreen || t.webkitExitFullscreen || t.msExitFullscreen)
        }, D.getFullscreenAPI = function () {
            var t, e = document.documentElement, i = "fullscreenchange";
            return e.requestFullscreen ? t = {
                enterK: "requestFullscreen",
                exitK: "exitFullscreen",
                elementK: "fullscreenElement",
                eventK: i
            } : e.mozRequestFullScreen ? t = {
                enterK: "mozRequestFullScreen",
                exitK: "mozCancelFullScreen",
                elementK: "mozFullScreenElement",
                eventK: "moz" + i
            } : e.webkitRequestFullscreen ? t = {
                enterK: "webkitRequestFullscreen",
                exitK: "webkitExitFullscreen",
                elementK: "webkitFullscreenElement",
                eventK: "webkit" + i
            } : e.msRequestFullscreen && (t = {
                enterK: "msRequestFullscreen",
                exitK: "msExitFullscreen",
                elementK: "msFullscreenElement",
                eventK: "MSFullscreenChange"
            }), t && (t.enter = function () {
                if (w = E.closeOnScroll, E.closeOnScroll = !1, "webkitRequestFullscreen" !== this.enterK) return n.template[this.enterK]();
                n.template[this.enterK](Element.ALLOW_KEYBOARD_INPUT)
            }, t.exit = function () {
                return E.closeOnScroll = w, document[this.exitK]()
            }, t.isFullscreen = function () {
                return document[this.elementK]
            }), t
        }
    }
}), function (j, h) {
    "use strict";

    function a(p, f, m, t, e) {
        function i() {
            var s, o, a, r;
            x = 1 < j.devicePixelRatio, m = n(m), 0 <= f.delay && setTimeout(function () {
                l(!0)
            }, f.delay), (f.delay < 0 || f.combined) && (t.e = (s = f.throttle, o = function (t) {
                "resize" === t.type && (_ = b = -1), l(t.all)
            }, r = 0, function (t, e) {
                function i() {
                    r = +new Date, o.call(p, t)
                }

                var n = +new Date - r;
                a && clearTimeout(a), s < n || !f.enableThrottle || e ? i() : a = setTimeout(i, s - n)
            }), t.a = function (t) {
                t = n(t), m.push.apply(m, t)
            }, t.g = function () {
                return m = $(m).filter(function () {
                    return !$(this).data(f.loadedName)
                })
            }, t.f = function (t) {
                for (var e = 0; e < t.length; e++) {
                    var i = m.filter(function () {
                        return this === t[e]
                    });
                    i.length && l(!1, i)
                }
            }, l(), $(f.appendScroll).on("scroll." + e + " resize." + e, t.e))
        }

        function n(t) {
            for (var e = f.defaultImage, i = f.placeholder, n = f.imageBase, s = f.srcsetAttribute, o = f.loaderAttribute, a = f._f || {}, r = 0, l = (t = $(t).filter(function () {
                var t = $(this), e = g(this);
                return !t.data(f.handledName) && (t.attr(f.attribute) || t.attr(s) || t.attr(o) || a[e] !== h)
            }).data("plugin_" + f.name, p)).length; r < l; r++) {
                var c = $(t[r]), d = g(t[r]), u = c.attr(f.imageBaseAttribute) || n;
                d === E && u && c.attr(s) && c.attr(s, function (t, e) {
                    if (e) {
                        var i = t.split(",");
                        t = "";
                        for (var n = 0, s = i.length; n < s; n++) t += e + i[n].trim() + (n !== s - 1 ? "," : "")
                    }
                    return t
                }(c.attr(s), u)), a[d] === h || c.attr(o) || c.attr(o, a[d]), d === E && e && !c.attr(k) ? c.attr(k, e) : d === E || !i || c.css(D) && "none" !== c.css(D) || c.css(D, "url('" + i + "')")
            }
            return t
        }

        function l(t, e) {
            if (!m.length) return f.autoDestroy && p.destroy(), 0;
            for (var i, n, s, o, a, r = e || m, l = !1, c = f.imageBase || "", d = f.srcsetAttribute, u = f.handledName, h = 0; h < r.length; h++) (t || e || (n = r[h], s = a = o = s = void 0, s = n.getBoundingClientRect(), o = f.scrollDirection, a = f.threshold, n = (0 <= b ? b : b = $(j).height()) + a > s.top && -a < s.bottom, s = (0 <= _ ? _ : _ = $(j).width()) + a > s.left && -a < s.right, "vertical" === o ? n : ("horizontal" === o || n) && s)) && (i = $(r[h]), a = g(r[h]), o = i.attr(f.attribute), n = i.attr(f.imageBaseAttribute) || c, s = i.attr(f.loaderAttribute), i.data(u) || f.visibleOnly && !i.is(":visible") || !((o || i.attr(d)) && (a === E && (n + o !== i.attr(k) || i.attr(d) !== i.attr(I)) || a !== E && n + o !== i.css(D)) || s) || (l = !0, i.data(u, !0), function (e, t, i, n) {
                ++w;
                var s = function () {
                    y("onError", e), v(), s = $.noop
                };
                y("beforeLoad", e);
                var o, a, r = f.attribute, l = f.srcsetAttribute, c = f.sizesAttribute, d = f.retinaAttribute,
                    u = f.removeAttribute, h = f.loadedName, p = e.attr(d);
                n ? (o = function () {
                    u && e.removeAttr(f.loaderAttribute), e.data(h, !0), y(C, e), setTimeout(v, 1), o = $.noop
                }, e.off(T).one(T, s).one(S, o), y(n, e, function (t) {
                    t ? (e.off(S), o()) : (e.off(T), s())
                }) || e.trigger(T)) : ((a = $(new Image)).one(T, s).one(S, function () {
                    e.hide(), t === E ? e.attr(A, a.attr(A)).attr(I, a.attr(I)).attr(k, a.attr(k)) : e.css(D, "url('" + a.attr(k) + "')"), e[f.effect](f.effectTime), u && (e.removeAttr(r + " " + l + " " + d + " " + f.imageBaseAttribute), c !== A && e.removeAttr(c)), e.data(h, !0), y(C, e), a.remove(), v()
                }), p = (x && p ? p : e.attr(r)) || "", a.attr(A, e.attr(c)).attr(I, e.attr(l)).attr(k, p ? i + p : null), a.complete && a.trigger(S))
            }(i, a, n, s)));
            l && (m = $(m).filter(function () {
                return !$(this).data(u)
            }))
        }

        function g(t) {
            return t.tagName.toLowerCase()
        }

        function v() {
            --w, m.length || w || y("onFinishedAll")
        }

        function y(t) {
            return (t = f[t]) && (t.apply(p, [].slice.call(arguments, 1)), 1)
        }

        var w = 0, _ = -1, b = -1, x = !1, C = "afterLoad", S = "load", T = "error", E = "img", k = "src", I = "srcset",
            A = "sizes", D = "background-image";
        "event" === f.bind || s ? i() : $(j).on(S + "." + e, i)
    }

    function c(t, e) {
        var i = this, n = $.extend({}, i.config, e), s = {}, o = n.name + "-" + ++r;
        return i.config = function (t, e) {
            return e === h ? n[t] : (n[t] = e, i)
        }, i.addItems = function (t) {
            return s.a && s.a("string" === $.type(t) ? $(t) : t), i
        }, i.getItems = function () {
            return s.g ? s.g() : {}
        }, i.update = function (t) {
            return s.e && s.e({}, !t), i
        }, i.force = function (t) {
            return s.f && s.f("string" === $.type(t) ? $(t) : t), i
        }, i.loadAll = function () {
            return s.e && s.e({all: !0}, !0), i
        }, i.destroy = function () {
            return $(n.appendScroll).off("." + o, s.e), $(j).off("." + o), s = {}, h
        }, a(i, n, t, s, o), n.chainable ? t : i
    }

    var $ = j.jQuery || j.Zepto, r = 0, s = !1;
    $.fn.Lazy = $.fn.lazy = function (t) {
        return new c(this, t)
    }, $.Lazy = $.lazy = function (t, e, i) {
        if ($.isFunction(e) && (i = e, e = []), $.isFunction(i)) {
            t = $.isArray(t) ? t : [t], e = $.isArray(e) ? e : [e];
            for (var n = c.prototype.config, s = n._f || (n._f = {}), o = 0, a = t.length; o < a; o++) n[t[o]] !== h && !$.isFunction(n[t[o]]) || (n[t[o]] = i);
            for (var r = 0, l = e.length; r < l; r++) s[e[r]] = t[0]
        }
    }, c.prototype.config = {
        name: "lazy",
        chainable: !0,
        autoDestroy: !0,
        bind: "load",
        threshold: 500,
        visibleOnly: !1,
        appendScroll: j,
        scrollDirection: "both",
        imageBase: null,
        defaultImage: "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==",
        placeholder: null,
        delay: -1,
        combined: !1,
        attribute: "data-src",
        srcsetAttribute: "data-srcset",
        sizesAttribute: "data-sizes",
        retinaAttribute: "data-retina",
        loaderAttribute: "data-loader",
        imageBaseAttribute: "data-imagebase",
        removeAttribute: !0,
        handledName: "handled",
        loadedName: "loaded",
        effect: "show",
        effectTime: 0,
        enableThrottle: !0,
        throttle: 250,
        beforeLoad: h,
        afterLoad: h,
        onError: h,
        onFinishedAll: h
    }, $(j).on("load", function () {
        s = !0
    })
}(window), function (l) {
    fontSpy = function (t, e) {
        var i = l("html"), n = l("body");
        if ("string" != typeof t || "" === t) throw"A valid fontName is required. fontName must be a string and must not be an empty string.";
        var t = {
                font: t, fontClass: t.toLowerCase().replace(/\s/g, ""), success: function () {
                }, failure: function () {
                }, testFont: "Courier New", testString: "QW@HhsXJ", glyphs: "", delay: 50, timeOut: 1e3, callback: l.noop
            }, s = l.extend(t, e),
            o = l("<span>" + s.testString + s.glyphs + "</span>").css("position", "absolute").css("top", "-9999px").css("left", "-9999px").css("visibility", "hidden").css("fontFamily", s.testFont).css("fontSize", "250px");
        n.append(o);
        var a = o.outerWidth();
        o.css("fontFamily", s.font + "," + s.testFont);
        var r = function () {
            var t = o.outerWidth();
            a !== t ? (s.callback(), i.addClass(s.fontClass), s && s.success && s.success(), o.remove()) : s.timeOut < 0 ? (i.addClass("no-" + s.fontClass), s && s.failure && s.failure(), s.callback(new Error("FontSpy timeout")), o.remove()) : (setTimeout(r, s.delay), s.timeOut = s.timeOut - s.delay)
        };
        r()
    }
}(jQuery), function (t) {
    "function" == typeof define && define.amd && define.amd.jQuery ? define(["jquery"], t) : t("undefined" != typeof module && module.exports ? require("jquery") : jQuery)
}(function (rt) {
    "use strict";

    function n(t, a) {
        function e(t) {
            if (!(!0 === G.data($t + "_intouch") || 0 < rt(t.target).closest(a.excludedElements, G).length)) {
                var e = t.originalEvent || t;
                if (!e.pointerType || "mouse" != e.pointerType || 0 != a.fallbackToMouseEvents) {
                    var i, n = e.touches, s = n ? n[0] : e;
                    return Y = Tt, n ? X = n.length : !1 !== a.preventDefaultEvents && t.preventDefault(), Z = R = W = null, Q = 1, V = U = q = B = H = 0, (t = {})[lt] = A(lt), t[ct] = A(ct), t[dt] = A(dt), t[ut] = A(ut), K = t, C(), E(0, s), !n || X === a.fingers || a.fingers === Ct || m() ? (tt = M(), 2 == X && (E(1, n[1]), q = U = j(J[0].start, J[1].start)), (a.swipeStatus || a.pinchStatus) && (i = c(e, Y))) : i = !1, !1 === i ? (c(e, Y = It), i) : (a.hold && (at = setTimeout(rt.proxy(function () {
                        G.trigger("hold", [e.target]), a.hold && (i = a.hold.call(G, e, e.target))
                    }, this), a.longTapThreshold)), T(!0), null)
                }
            }
        }

        function i(t) {
            var e, i, n, s, o = t.originalEvent || t;
            Y === kt || Y === It || S() || (e = k((i = o.touches) ? i[0] : o), et = M(), i && (X = i.length), a.hold && clearTimeout(at), Y = Et, 2 == X && (0 == q ? (E(1, i[1]), q = U = j(J[0].start, J[1].start)) : (k(i[1]), U = j(J[0].end, J[1].end), J[0].end, J[1].end, Z = Q < 1 ? pt : ht), Q = (U / q * 1).toFixed(2), V = Math.abs(q - U)), X === a.fingers || a.fingers === Ct || !i || m() ? (W = $(e.start, e.end), function (t, e) {
                if (!1 !== a.preventDefaultEvents) if (a.allowPageScroll === ft) t.preventDefault(); else {
                    var i = a.allowPageScroll === mt;
                    switch (e) {
                        case lt:
                            (a.swipeLeft && i || !i && a.allowPageScroll != bt) && t.preventDefault();
                            break;
                        case ct:
                            (a.swipeRight && i || !i && a.allowPageScroll != bt) && t.preventDefault();
                            break;
                        case dt:
                            (a.swipeUp && i || !i && a.allowPageScroll != xt) && t.preventDefault();
                            break;
                        case ut:
                            (a.swipeDown && i || !i && a.allowPageScroll != xt) && t.preventDefault()
                    }
                }
            }(t, R = $(e.last, e.end)), n = e.start, s = e.end, H = Math.round(Math.sqrt(Math.pow(s.x - n.x, 2) + Math.pow(s.y - n.y, 2))), B = D(), i = H, (t = W) != ft && (i = Math.max(i, I(t)), K[t].distance = i), s = c(o, Y), a.triggerOnTouchEnd && !a.triggerOnTouchLeave || (n = !0, a.triggerOnTouchLeave && (t = {
                left: (i = (t = rt(t = this)).offset()).left,
                right: i.left + t.outerWidth(),
                top: i.top,
                bottom: i.top + t.outerHeight()
            }, e = e.end, t = t, n = e.x > t.left && e.x < t.right && e.y > t.top && e.y < t.bottom), !a.triggerOnTouchEnd && n ? Y = l(Et) : a.triggerOnTouchLeave && !n && (Y = l(kt)), Y != It && Y != kt || c(o, Y))) : c(o, Y = It), !1 === s && c(o, Y = It))
        }

        function n(t) {
            var e, i = t.originalEvent || t, n = i.touches;
            if (n) {
                if (n.length && !S()) return e = i, it = M(), nt = e.touches.length + 1, !0;
                if (n.length && S()) return !0
            }
            return S() && (X = nt), et = M(), B = D(), h() || !u() ? c(i, Y = It) : a.triggerOnTouchEnd || !1 === a.triggerOnTouchEnd && Y === Et ? (!1 !== a.preventDefaultEvents && !1 !== t.cancelable && t.preventDefault(), c(i, Y = kt)) : !a.triggerOnTouchEnd && _() ? d(i, Y = kt, yt) : Y === Et && c(i, Y = It), T(!1), null
        }

        function s() {
            U = q = tt = et = X = 0, C(), T(!(Q = 1))
        }

        function o(t) {
            t = t.originalEvent || t;
            a.triggerOnTouchLeave && c(t, Y = l(kt))
        }

        function r() {
            G.off(P, e), G.off(F, s), G.off(N, i), G.off(z, n), L && G.off(L, o), T(!1)
        }

        function l(t) {
            var e = t, i = p(), n = u(), s = h();
            return !i || s ? e = It : !n || t != Et || a.triggerOnTouchEnd && !a.triggerOnTouchLeave ? !n && t == kt && a.triggerOnTouchLeave && (e = It) : e = kt, e
        }

        function c(t, e) {
            var i, n = t.touches;
            return (g() && v() || v()) && (i = d(t, e, gt)), (f() && m() || m()) && !1 !== i && (i = d(t, e, vt)), x() && b() && !1 !== i ? i = d(t, e, wt) : B > a.longTapThreshold && H < St && a.longTap && !1 !== i ? i = d(t, e, _t) : 1 !== X && At || !(isNaN(H) || H < a.threshold) || !_() || !1 === i || (i = d(t, e, yt)), e === It && s(), e === kt && (n && n.length || s()), i
        }

        function d(t, e, i) {
            var n;
            if (i == gt) {
                if (G.trigger("swipeStatus", [e, W || null, H || 0, B || 0, X, J, R]), a.swipeStatus && !1 === (n = a.swipeStatus.call(G, t, e, W || null, H || 0, B || 0, X, J, R))) return !1;
                if (e == kt && g()) {
                    if (clearTimeout(ot), clearTimeout(at), G.trigger("swipe", [W, H, B, X, J, R]), a.swipe && !1 === (n = a.swipe.call(G, t, W, H, B, X, J, R))) return !1;
                    switch (W) {
                        case lt:
                            G.trigger("swipeLeft", [W, H, B, X, J, R]), a.swipeLeft && (n = a.swipeLeft.call(G, t, W, H, B, X, J, R));
                            break;
                        case ct:
                            G.trigger("swipeRight", [W, H, B, X, J, R]), a.swipeRight && (n = a.swipeRight.call(G, t, W, H, B, X, J, R));
                            break;
                        case dt:
                            G.trigger("swipeUp", [W, H, B, X, J, R]), a.swipeUp && (n = a.swipeUp.call(G, t, W, H, B, X, J, R));
                            break;
                        case ut:
                            G.trigger("swipeDown", [W, H, B, X, J, R]), a.swipeDown && (n = a.swipeDown.call(G, t, W, H, B, X, J, R))
                    }
                }
            }
            if (i == vt) {
                if (G.trigger("pinchStatus", [e, Z || null, V || 0, B || 0, X, Q, J]), a.pinchStatus && !1 === (n = a.pinchStatus.call(G, t, e, Z || null, V || 0, B || 0, X, Q, J))) return !1;
                if (e == kt && f()) switch (Z) {
                    case ht:
                        G.trigger("pinchIn", [Z || null, V || 0, B || 0, X, Q, J]), a.pinchIn && (n = a.pinchIn.call(G, t, Z || null, V || 0, B || 0, X, Q, J));
                        break;
                    case pt:
                        G.trigger("pinchOut", [Z || null, V || 0, B || 0, X, Q, J]), a.pinchOut && (n = a.pinchOut.call(G, t, Z || null, V || 0, B || 0, X, Q, J))
                }
            }
            return i == yt ? e !== It && e !== kt || (clearTimeout(ot), clearTimeout(at), b() && !x() ? (st = M(), ot = setTimeout(rt.proxy(function () {
                st = null, G.trigger("tap", [t.target]), a.tap && (n = a.tap.call(G, t, t.target))
            }, this), a.doubleTapThreshold)) : (st = null, G.trigger("tap", [t.target]), a.tap && (n = a.tap.call(G, t, t.target)))) : i == wt ? e !== It && e !== kt || (clearTimeout(ot), clearTimeout(at), st = null, G.trigger("doubletap", [t.target]), a.doubleTap && (n = a.doubleTap.call(G, t, t.target))) : i == _t && (e !== It && e !== kt || (clearTimeout(ot), st = null, G.trigger("longtap", [t.target]), a.longTap && (n = a.longTap.call(G, t, t.target)))), n
        }

        function u() {
            var t = !0;
            return null !== a.threshold && (t = H >= a.threshold), t
        }

        function h() {
            var t = !1;
            return null !== a.cancelThreshold && null !== W && (t = I(W) - H >= a.cancelThreshold), t
        }

        function p() {
            return !(a.maxTimeThreshold && B >= a.maxTimeThreshold)
        }

        function f() {
            var t = y(), e = w(), i = null === a.pinchThreshold || V >= a.pinchThreshold;
            return t && e && i
        }

        function m() {
            return a.pinchStatus || a.pinchIn || a.pinchOut
        }

        function g() {
            var t = p(), e = u(), i = y(), n = w();
            return !h() && n && i && e && t
        }

        function v() {
            return a.swipe || a.swipeStatus || a.swipeLeft || a.swipeRight || a.swipeUp || a.swipeDown
        }

        function y() {
            return X === a.fingers || a.fingers === Ct || !At
        }

        function w() {
            return 0 !== J[0].end.x
        }

        function _() {
            return a.tap
        }

        function b() {
            return !!a.doubleTap
        }

        function x() {
            if (null == st) return !1;
            var t = M();
            return b() && t - st <= a.doubleTapThreshold
        }

        function C() {
            nt = it = 0
        }

        function S() {
            var t = !1;
            return it && M() - it <= a.fingerReleaseThreshold && (t = !0), t
        }

        function T(t) {
            G && (!0 === t ? (G.on(N, i), G.on(z, n), L && G.on(L, o)) : (G.off(N, i, !1), G.off(z, n, !1), L && G.off(L, o, !1)), G.data($t + "_intouch", !0 === t))
        }

        function E(t, e) {
            var i = {start: {x: 0, y: 0}, last: {x: 0, y: 0}, end: {x: 0, y: 0}};
            return i.start.x = i.last.x = i.end.x = e.pageX || e.clientX, i.start.y = i.last.y = i.end.y = e.pageY || e.clientY, J[t] = i
        }

        function k(t) {
            var e = void 0 !== t.identifier ? t.identifier : 0, i = J[e] || null;
            return null === i && (i = E(e, t)), i.last.x = i.end.x, i.last.y = i.end.y, i.end.x = t.pageX || t.clientX, i.end.y = t.pageY || t.clientY, i
        }

        function I(t) {
            return K[t] ? K[t].distance : void 0
        }

        function A(t) {
            return {direction: t, distance: 0}
        }

        function D() {
            return et - tt
        }

        function j(t, e) {
            var i = Math.abs(t.x - e.x), e = Math.abs(t.y - e.y);
            return Math.round(Math.sqrt(i * i + e * e))
        }

        function $(t, e) {
            if (n = e, (i = t).x == n.x && i.y == n.y) return ft;
            var i, n,
                t = (n = e, t = (e = t).x - n.x, e = n.y - e.y, t = Math.atan2(e, t), (t = Math.round(180 * t / Math.PI)) < 0 && (t = 360 - Math.abs(t)), t);
            return t <= 45 && 0 <= t || t <= 360 && 315 <= t ? lt : 135 <= t && t <= 225 ? ct : 45 < t && t < 135 ? ut : dt
        }

        function M() {
            return (new Date).getTime()
        }

        var a = rt.extend({}, a), O = At || jt || !a.fallbackToMouseEvents,
            P = O ? jt ? Dt ? "MSPointerDown" : "pointerdown" : "touchstart" : "mousedown",
            N = O ? jt ? Dt ? "MSPointerMove" : "pointermove" : "touchmove" : "mousemove",
            z = O ? jt ? Dt ? "MSPointerUp" : "pointerup" : "touchend" : "mouseup", L = !O || jt ? "mouseleave" : null,
            F = jt ? Dt ? "MSPointerCancel" : "pointercancel" : "touchcancel", H = 0, W = null, R = null, B = 0, q = 0,
            U = 0, Q = 1, V = 0, Z = 0, K = null, G = rt(t), Y = "start", X = 0, J = {}, tt = 0, et = 0, it = 0, nt = 0,
            st = 0, ot = null, at = null;
        try {
            G.on(P, e), G.on(F, s)
        } catch (t) {
            rt.error("events not supported " + P + "," + F + " on jQuery.swipe")
        }
        this.enable = function () {
            return this.disable(), G.on(P, e), G.on(F, s), G
        }, this.disable = function () {
            return r(), G
        }, this.destroy = function () {
            r(), G.data($t, null), G = null
        }, this.option = function (t, e) {
            if ("object" == typeof t) a = rt.extend(a, t); else if (void 0 !== a[t]) {
                if (void 0 === e) return a[t];
                a[t] = e
            } else {
                if (!t) return a;
                rt.error("Option " + t + " does not exist on jQuery.swipe.options")
            }
            return null
        }
    }

    var lt = "left", ct = "right", dt = "up", ut = "down", ht = "in", pt = "out", ft = "none", mt = "auto",
        gt = "swipe", vt = "pinch", yt = "tap", wt = "doubletap", _t = "longtap", bt = "horizontal", xt = "vertical",
        Ct = "all", St = 10, Tt = "start", Et = "move", kt = "end", It = "cancel", At = "ontouchstart" in window,
        Dt = window.navigator.msPointerEnabled && !window.PointerEvent && !At,
        jt = (window.PointerEvent || window.navigator.msPointerEnabled) && !At, $t = "TouchSwipe";
    rt.fn.swipe = function (t) {
        var e = rt(this), i = e.data($t);
        if (i && "string" == typeof t) {
            if (i[t]) return i[t].apply(i, Array.prototype.slice.call(arguments, 1));
            rt.error("Method " + t + " does not exist on jQuery.swipe")
        } else if (i && "object" == typeof t) i.option.apply(i, arguments); else if (!(i || "object" != typeof t && t)) return function (i) {
            return !i || void 0 !== i.allowPageScroll || void 0 === i.swipe && void 0 === i.swipeStatus || (i.allowPageScroll = ft), void 0 !== i.click && void 0 === i.tap && (i.tap = i.click), i = i || {}, i = rt.extend({}, rt.fn.swipe.defaults, i), this.each(function () {
                var t = rt(this), e = t.data($t);
                e || (e = new n(this, i), t.data($t, e))
            })
        }.apply(this, arguments);
        return e
    }, rt.fn.swipe.version = "1.6.18", rt.fn.swipe.defaults = {
        fingers: 1,
        threshold: 75,
        cancelThreshold: null,
        pinchThreshold: 20,
        maxTimeThreshold: null,
        fingerReleaseThreshold: 250,
        longTapThreshold: 500,
        doubleTapThreshold: 200,
        swipe: null,
        swipeLeft: null,
        swipeRight: null,
        swipeUp: null,
        swipeDown: null,
        swipeStatus: null,
        pinchIn: null,
        pinchOut: null,
        pinchStatus: null,
        click: null,
        tap: null,
        doubleTap: null,
        longTap: null,
        hold: null,
        triggerOnTouchEnd: !0,
        triggerOnTouchLeave: !1,
        allowPageScroll: "auto",
        fallbackToMouseEvents: !0,
        excludedElements: ".noSwipe",
        preventDefaultEvents: !0
    }, rt.fn.swipe.phases = {
        PHASE_START: Tt,
        PHASE_MOVE: Et,
        PHASE_END: kt,
        PHASE_CANCEL: It
    }, rt.fn.swipe.directions = {
        LEFT: lt,
        RIGHT: ct,
        UP: dt,
        DOWN: ut,
        IN: ht,
        OUT: pt
    }, rt.fn.swipe.pageScroll = {NONE: ft, HORIZONTAL: bt, VERTICAL: xt, AUTO: mt}, rt.fn.swipe.fingers = {
        ONE: 1,
        TWO: 2,
        THREE: 3,
        FOUR: 4,
        FIVE: 5,
        ALL: Ct
    }
}), function (c) {
    c.fn.lazyLoad = function (t, e) {
        function i() {
            if (n.stopped) this.onscroll = null; else if (!n.stopped && !n.loading && l(r, a) <= n.distance) {
                if (null !== n.hash) {
                    var t = location.hash.replace(/^[^#]*#\/*/, "").split("/")[0];
                    if (-1 === n.hash.indexOf(t)) return void (this.onscroll = null)
                }
                n.load()
            }
        }

        var n;
        if ("stop" != t) if ("reload" != t) if ("sleep" != t) if ("wake" != t) if ("force" != t) {
            if ("get" === t) return (n = this.data("lazyLoadSettings") || {})[e];
            this.data("lazyLoadSettings", c.extend({
                distance: 50,
                load: function () {
                },
                container: r,
                state: "wake",
                hash: location.hash.replace(/^[^#]*#\/*/, "").split("/")[0] || null,
                distanceBetweenBottoms: null
            }, t || {})), (n = this.data("lazyLoadSettings")).loading = !1, n.stopped = !1;
            var s, o, a = c(window), r = n.container || c(this);
            null !== n.hash && (c.isArray(n.hash) || (n.hash = [n.hash])), c.fn.lazyLoad.call(a, n.state), o = setTimeout(s = function () {
                if (n.stopped) clearTimeout(o); else {
                    if (null !== n.hash) {
                        var t = location.hash.replace(/^[^#]*#\/*/, "").split("/")[0];
                        if (-1 === n.hash.indexOf(t)) return void clearTimeout(o)
                    }
                    n.loading ? o = setTimeout(s, 350) : (l(r, a), l(r, a) <= n.distance ? (n.load(), o = setTimeout(s, 350)) : (a.get(0).onscroll = i, clearTimeout(o)))
                }
            }, 350);
            var l = "function" == typeof n.distanceBetweenBottoms ? n.distanceBetweenBottoms : function (t, e, i) {
                return i = i || 0, (t = "string" == typeof t ? c(t) : t).position().top + t.outerHeight() - i - (e.scrollTop() + e.height())
            }
        } else (n = this.data("lazyLoadSettings")) && (n.loading || n.load()); else (n = this.data("lazyLoadSettings")) && (n.loading = !1); else (n = this.data("lazyLoadSettings")) && (n.loading = !0); else (n = this.data("lazyLoadSettings")) && (n.stopped = !1, n.loading = !1, this.get(0).onscroll = null, this.lazyLoad(n)); else (n = this.data("lazyLoadSettings")) && (n.stopped = !0)
    }
}(jQuery), function (s) {
    function o(t, e) {
        this.path = t, null != e ? (this.at_2x_path = e, this.perform_check = !1) : (this.at_2x_path = t.replace(/\.\w+$/, function (t) {
            return "@2x" + t
        }), this.perform_check = !0)
    }

    function e(t) {
        var e;
        /@2x\.\w+$/.test(s(t).attr("src")) || (this.el = t, this.path = new o(s(t).attr("src"), s(t).attr("data-atretina")), (e = this).path.check_2x_variant(function (t) {
            t && e.swap()
        }))
    }

    s.fn.retina = function (t) {
        if (s.Retina.isRetina()) return s.Retina.opts = s.extend(s.Retina.opts, t), this.each(function () {
            s(this).is("img") && new e(this)
        })
    }, s.Retina = function () {
    }, s.Retina.opts = {check_mime_type: !0, force_original_dimensions: !0}, s.Retina.isRetina = function () {
        return !!(1 < window.devicePixelRatio || window.matchMedia && window.matchMedia("(-webkit-min-device-pixel-ratio: 1.5),(min--moz-device-pixel-ratio: 1.5),(-o-min-device-pixel-ratio: 3/2),(min-resolution: 1.5dppx)").matches)
    }, o.confirmed_paths = [], o.prototype.is_external = function () {
        return !(!this.path.match(/^(https?\:|\/\/)/i) || this.path.match("//" + document.domain + "/"))
    }, o.prototype.check_2x_variant = function (e) {
        var i, n = this;
        if (this.is_external() || !this.perform_check && void 0 !== this.at_2x_path && null !== this.at_2x_path || this.at_2x_path in o.confirmed_paths) return e(!0);
        (i = new XMLHttpRequest).open("HEAD", this.at_2x_path), i.onreadystatechange = function () {
            if (4 == i.readyState && 200 <= i.status && i.status <= 399) {
                if (s.Retina.opts.check_mime_type) {
                    var t = i.getResponseHeader("Content-Type");
                    if (null === t || !t.match(/^image/i)) return e(!1)
                }
                return o.confirmed_paths.push(n.at_2x_path), e(!0)
            }
            return e(!1)
        }, i.send()
    }, (s.RetinaImage = e).prototype.swap = function (i) {
        void 0 === i && (i = this.path.at_2x_path);
        var n = this;
        !function t() {
            var e;
            n.el.complete ? (s.Retina.opts.force_original_dimensions && (n.el.setAttribute("width", n.el.offsetWidth), n.el.setAttribute("height", n.el.offsetHeight)), e = n.el.src, n.el.setAttribute("src", i), s(n.el).one("error", function () {
                n.el.setAttribute("src", e)
            })) : setTimeout(t, 5)
        }()
    }
}(jQuery), function (r) {
    function n(t, e) {
        var i = t.nodeName.toLowerCase();
        if ("area" !== i) return (/input|select|textarea|button|object/.test(i) ? !t.disabled : "a" == i && t.href || e) && s(t);
        var n, i = t.parentNode, e = i.name;
        return !(!t.href || !e || "map" !== i.nodeName.toLowerCase()) && !!(n = r("img[usemap=#" + e + "]")[0]) && s(n)
    }

    function s(t) {
        return !r(t).parents().andSelf().filter(function () {
            return "hidden" === r.curCSS(this, "visibility") || r.expr.filters.hidden(this)
        }).length
    }

    r.ui = r.ui || {}, r.ui.version || (r.extend(r.ui, {
        version: "1.8.24",
        keyCode: {
            ALT: 18,
            BACKSPACE: 8,
            CAPS_LOCK: 20,
            COMMA: 188,
            COMMAND: 91,
            COMMAND_LEFT: 91,
            COMMAND_RIGHT: 93,
            CONTROL: 17,
            DELETE: 46,
            DOWN: 40,
            END: 35,
            ENTER: 13,
            ESCAPE: 27,
            HOME: 36,
            INSERT: 45,
            LEFT: 37,
            MENU: 93,
            NUMPAD_ADD: 107,
            NUMPAD_DECIMAL: 110,
            NUMPAD_DIVIDE: 111,
            NUMPAD_ENTER: 108,
            NUMPAD_MULTIPLY: 106,
            NUMPAD_SUBTRACT: 109,
            PAGE_DOWN: 34,
            PAGE_UP: 33,
            PERIOD: 190,
            RIGHT: 39,
            SHIFT: 16,
            SPACE: 32,
            TAB: 9,
            UP: 38,
            WINDOWS: 91
        }
    }), r.fn.extend({
        propAttr: r.fn.prop || r.fn.attr, _focus: r.fn.focus, focus: function (e, i) {
            return "number" == typeof e ? this.each(function () {
                var t = this;
                setTimeout(function () {
                    r(t).focus(), i && i.call(t)
                }, e)
            }) : this._focus.apply(this, arguments)
        }, scrollParent: function () {
            var t = (r.browser.msie && /(static|relative)/.test(this.css("position")) || /absolute/.test(this.css("position")) ? this.parents().filter(function () {
                return /(relative|absolute|fixed)/.test(r.curCSS(this, "position", 1)) && /(auto|scroll)/.test(r.curCSS(this, "overflow", 1) + r.curCSS(this, "overflow-y", 1) + r.curCSS(this, "overflow-x", 1))
            }) : this.parents().filter(function () {
                return /(auto|scroll)/.test(r.curCSS(this, "overflow", 1) + r.curCSS(this, "overflow-y", 1) + r.curCSS(this, "overflow-x", 1))
            })).eq(0);
            return /fixed/.test(this.css("position")) || !t.length ? r(document) : t
        }, zIndex: function (t) {
            if (void 0 !== t) return this.css("zIndex", t);
            if (this.length) for (var e, i, n = r(this[0]); n.length && n[0] !== document;) {
                if (("absolute" === (e = n.css("position")) || "relative" === e || "fixed" === e) && (i = parseInt(n.css("zIndex"), 10), !isNaN(i) && 0 !== i)) return i;
                n = n.parent()
            }
            return 0
        }, disableSelection: function () {
            return this.bind((r.support.selectstart ? "selectstart" : "mousedown") + ".ui-disableSelection", function (t) {
                t.preventDefault()
            })
        }, enableSelection: function () {
            return this.unbind(".ui-disableSelection")
        }
    }), r("<a>").outerWidth(1).jquery || r.each(["Width", "Height"], function (t, i) {
        function n(t, e, i, n) {
            return r.each(s, function () {
                e -= parseFloat(r.curCSS(t, "padding" + this, !0)) || 0, i && (e -= parseFloat(r.curCSS(t, "border" + this + "Width", !0)) || 0), n && (e -= parseFloat(r.curCSS(t, "margin" + this, !0)) || 0)
            }), e
        }

        var s = "Width" === i ? ["Left", "Right"] : ["Top", "Bottom"], o = i.toLowerCase(), a = {
            innerWidth: r.fn.innerWidth,
            innerHeight: r.fn.innerHeight,
            outerWidth: r.fn.outerWidth,
            outerHeight: r.fn.outerHeight
        };
        r.fn["inner" + i] = function (t) {
            return void 0 === t ? a["inner" + i].call(this) : this.each(function () {
                r(this).css(o, n(this, t) + "px")
            })
        }, r.fn["outer" + i] = function (t, e) {
            return "number" != typeof t ? a["outer" + i].call(this, t) : this.each(function () {
                r(this).css(o, n(this, t, !0, e) + "px")
            })
        }
    }), r.extend(r.expr[":"], {
        data: r.expr.createPseudo ? r.expr.createPseudo(function (e) {
            return function (t) {
                return !!r.data(t, e)
            }
        }) : function (t, e, i) {
            return !!r.data(t, i[3])
        }, focusable: function (t) {
            return n(t, !isNaN(r.attr(t, "tabindex")))
        }, tabbable: function (t) {
            var e = r.attr(t, "tabindex"), i = isNaN(e);
            return (i || 0 <= e) && n(t, !i)
        }
    }), r(function () {
        var t = document.body, e = t.appendChild(document.createElement("div"));
        e.offsetHeight, r.extend(e.style, {
            minHeight: "100px",
            height: "auto",
            padding: 0,
            borderWidth: 0
        }), r.support.minHeight = 100 === e.offsetHeight, r.support.selectstart = "onselectstart" in e, t.removeChild(e).style.display = "none"
    }), r.curCSS || (r.curCSS = r.css), r.extend(r.ui, {
        plugin: {
            add: function (t, e, i) {
                var n, s = r.ui[t].prototype;
                for (n in i) s.plugins[n] = s.plugins[n] || [], s.plugins[n].push([e, i[n]])
            }, call: function (t, e, i) {
                var n = t.plugins[e];
                if (n && t.element[0].parentNode) for (var s = 0; s < n.length; s++) t.options[n[s][0]] && n[s][1].apply(t.element, i)
            }
        }, contains: function (t, e) {
            return document.compareDocumentPosition ? 16 & t.compareDocumentPosition(e) : t !== e && t.contains(e)
        }, hasScroll: function (t, e) {
            if ("hidden" === r(t).css("overflow")) return !1;
            var i = e && "left" === e ? "scrollLeft" : "scrollTop", e = !1;
            return 0 < t[i] || (t[i] = 1, e = 0 < t[i], t[i] = 0, e)
        }, isOverAxis: function (t, e, i) {
            return e < t && t < e + i
        }, isOver: function (t, e, i, n, s, o) {
            return r.ui.isOverAxis(t, i, s) && r.ui.isOverAxis(e, n, o)
        }
    }))
}(jQuery), function (a) {
    var n, i;
    a.cleanData ? (n = a.cleanData, a.cleanData = function (t) {
        for (var e, i = 0; null != (e = t[i]); i++) try {
            a(e).triggerHandler("remove")
        } catch (t) {
        }
        n(t)
    }) : (i = a.fn.remove, a.fn.remove = function (t, e) {
        return this.each(function () {
            return e || (t && !a.filter(t, [this]).length || a("*", this).add([this]).each(function () {
                try {
                    a(this).triggerHandler("remove")
                } catch (t) {
                }
            })), i.call(a(this), t, e)
        })
    }), a.widget = function (e, t, i) {
        var n = e.split(".")[0], s = n + "-" + (e = e.split(".")[1]);
        i || (i = t, t = a.Widget), a.expr[":"][s] = function (t) {
            return !!a.data(t, e)
        }, a[n] = a[n] || {}, a[n][e] = function (t, e) {
            arguments.length && this._createWidget(t, e)
        };
        t = new t;
        t.options = a.extend(!0, {}, t.options), a[n][e].prototype = a.extend(!0, t, {
            namespace: n,
            widgetName: e,
            widgetEventPrefix: a[n][e].prototype.widgetEventPrefix || e,
            widgetBaseClass: s
        }, i), a.widget.bridge(e, a[n][e])
    }, a.widget.bridge = function (o, e) {
        a.fn[o] = function (i) {
            var t = "string" == typeof i, n = Array.prototype.slice.call(arguments, 1), s = this;
            return i = !t && n.length ? a.extend.apply(null, [!0, i].concat(n)) : i, t && "_" === i.charAt(0) || (t ? this.each(function () {
                var t = a.data(this, o), e = t && a.isFunction(t[i]) ? t[i].apply(t, n) : t;
                if (e !== t && void 0 !== e) return s = e, !1
            }) : this.each(function () {
                var t = a.data(this, o);
                t ? t.option(i || {})._init() : a.data(this, o, new e(i, this))
            })), s
        }
    }, a.Widget = function (t, e) {
        arguments.length && this._createWidget(t, e)
    }, a.Widget.prototype = {
        widgetName: "widget", widgetEventPrefix: "", options: {disabled: !1}, _createWidget: function (t, e) {
            a.data(e, this.widgetName, this), this.element = a(e), this.options = a.extend(!0, {}, this.options, this._getCreateOptions(), t);
            var i = this;
            this.element.bind("remove." + this.widgetName, function () {
                i.destroy()
            }), this._create(), this._trigger("create"), this._init()
        }, _getCreateOptions: function () {
            return a.metadata && a.metadata.get(this.element[0])[this.widgetName]
        }, _create: function () {
        }, _init: function () {
        }, destroy: function () {
            this.element.unbind("." + this.widgetName).removeData(this.widgetName), this.widget().unbind("." + this.widgetName).removeAttr("aria-disabled").removeClass(this.widgetBaseClass + "-disabled ui-state-disabled")
        }, widget: function () {
            return this.element
        }, option: function (t, e) {
            var i = t;
            if (0 === arguments.length) return a.extend({}, this.options);
            if ("string" == typeof t) {
                if (void 0 === e) return this.options[t];
                (i = {})[t] = e
            }
            return this._setOptions(i), this
        }, _setOptions: function (t) {
            var i = this;
            return a.each(t, function (t, e) {
                i._setOption(t, e)
            }), this
        }, _setOption: function (t, e) {
            return this.options[t] = e, "disabled" === t && this.widget()[e ? "addClass" : "removeClass"](this.widgetBaseClass + "-disabled ui-state-disabled").attr("aria-disabled", e), this
        }, enable: function () {
            return this._setOption("disabled", !1)
        }, disable: function () {
            return this._setOption("disabled", !0)
        }, _trigger: function (t, e, i) {
            var n, s, o = this.options[t];
            if (i = i || {}, (e = a.Event(e)).type = (t === this.widgetEventPrefix ? t : this.widgetEventPrefix + t).toLowerCase(), e.target = this.element[0], s = e.originalEvent) for (n in s) n in e || (e[n] = s[n]);
            return this.element.trigger(e, i), !(a.isFunction(o) && !1 === o.call(this.element[0], e, i) || e.isDefaultPrevented())
        }
    }
}(jQuery), function (s) {
    var o = !1;
    s(document).mouseup(function (t) {
        o = !1
    }), s.widget("ui.mouse", {
        options: {cancel: ":input,option", distance: 1, delay: 0}, _mouseInit: function () {
            var e = this;
            this.element.bind("mousedown." + this.widgetName, function (t) {
                return e._mouseDown(t)
            }).bind("click." + this.widgetName, function (t) {
                if (!0 === s.data(t.target, e.widgetName + ".preventClickEvent")) return s.removeData(t.target, e.widgetName + ".preventClickEvent"), t.stopImmediatePropagation(), !1
            }), this.started = !1
        }, _mouseDestroy: function () {
            this.element.unbind("." + this.widgetName), this._mouseMoveDelegate && s(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate)
        }, _mouseDown: function (t) {
            if (!o) {
                this._mouseStarted && this._mouseUp(t), this._mouseDownEvent = t;
                var e = this, i = 1 == t.which,
                    n = !("string" != typeof this.options.cancel || !t.target.nodeName) && s(t.target).closest(this.options.cancel).length;
                return !(i && !n && this._mouseCapture(t) && (this.mouseDelayMet = !this.options.delay, this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function () {
                    e.mouseDelayMet = !0
                }, this.options.delay)), this._mouseDistanceMet(t) && this._mouseDelayMet(t) && (this._mouseStarted = !1 !== this._mouseStart(t), !this._mouseStarted) ? t.preventDefault() : (!0 === s.data(t.target, this.widgetName + ".preventClickEvent") && s.removeData(t.target, this.widgetName + ".preventClickEvent"), this._mouseMoveDelegate = function (t) {
                    return e._mouseMove(t)
                }, this._mouseUpDelegate = function (t) {
                    return e._mouseUp(t)
                }, s(document).bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate), t.preventDefault(), o = !0), 0))
            }
        }, _mouseMove: function (t) {
            return !s.browser.msie || 9 <= document.documentMode || t.button ? this._mouseStarted ? (this._mouseDrag(t), t.preventDefault()) : (this._mouseDistanceMet(t) && this._mouseDelayMet(t) && (this._mouseStarted = !1 !== this._mouseStart(this._mouseDownEvent, t), this._mouseStarted ? this._mouseDrag(t) : this._mouseUp(t)), !this._mouseStarted) : this._mouseUp(t)
        }, _mouseUp: function (t) {
            return s(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate), this._mouseStarted && (this._mouseStarted = !1, t.target == this._mouseDownEvent.target && s.data(t.target, this.widgetName + ".preventClickEvent", !0), this._mouseStop(t)), !1
        }, _mouseDistanceMet: function (t) {
            return Math.max(Math.abs(this._mouseDownEvent.pageX - t.pageX), Math.abs(this._mouseDownEvent.pageY - t.pageY)) >= this.options.distance
        }, _mouseDelayMet: function (t) {
            return this.mouseDelayMet
        }, _mouseStart: function (t) {
        }, _mouseDrag: function (t) {
        }, _mouseStop: function (t) {
        }, _mouseCapture: function (t) {
            return !0
        }
    })
}(jQuery), function (d) {
    d.widget("ui.slider", d.ui.mouse, {
        widgetEventPrefix: "slide",
        options: {
            animate: !1,
            distance: 0,
            max: 100,
            min: 0,
            orientation: "horizontal",
            range: !1,
            step: 1,
            value: 0,
            values: null
        },
        _create: function () {
            var a = this, t = this.options;
            if (this._mouseSliding = this._keySliding = !1, this._animateOff = !0, this._handleIndex = null, this._detectOrientation(), this._mouseInit(), this.element.addClass("ui-slider ui-slider-" + this.orientation + " ui-widget ui-widget-content ui-angle-all"), t.disabled && this.element.addClass("ui-slider-disabled ui-disabled"), this.range = d([]), t.range && (!0 === t.range ? (this.range = d("<div></div>"), t.values || (t.values = [this._valueMin(), this._valueMin()]), t.values.length && 2 !== t.values.length && (t.values = [t.values[0], t.values[0]])) : this.range = d("<div></div>"), this.range.appendTo(this.element).addClass("ui-slider-range"), "min" !== t.range && "max" !== t.range || this.range.addClass("ui-slider-range-" + t.range), this.range.addClass("ui-widget-header")), 0 === d(".ui-slider-handle", this.element).length && d("<a href='#'></a>").appendTo(this.element).addClass("ui-slider-handle"), t.values && t.values.length) for (; d(".ui-slider-handle", this.element).length < t.values.length;) d("<a href='#'></a>").appendTo(this.element).addClass("ui-slider-handle");
            this.handles = d(".ui-slider-handle", this.element).addClass("ui-state-default ui-angle-all"), this.handle = this.handles.eq(0), this.handles.add(this.range).filter("a").click(function (t) {
                t.preventDefault()
            }).hover(function () {
                t.disabled || d(this).addClass("ui-state-hover")
            }, function () {
                d(this).removeClass("ui-state-hover")
            }).focus(function () {
                t.disabled ? d(this).blur() : (d(".ui-slider .ui-state-focus").removeClass("ui-state-focus"), d(this).addClass("ui-state-focus"))
            }).blur(function () {
                d(this).removeClass("ui-state-focus")
            }), this.handles.each(function (t) {
                d(this).data("index.ui-slider-handle", t)
            }), this.handles.keydown(function (t) {
                var e, i, n, s = !0, o = d(this).data("index.ui-slider-handle");
                if (!a.options.disabled) {
                    switch (t.keyCode) {
                        case d.ui.keyCode.HOME:
                        case d.ui.keyCode.END:
                        case d.ui.keyCode.PAGE_UP:
                        case d.ui.keyCode.PAGE_DOWN:
                        case d.ui.keyCode.UP:
                        case d.ui.keyCode.RIGHT:
                        case d.ui.keyCode.DOWN:
                        case d.ui.keyCode.LEFT:
                            if (s = !1, !a._keySliding && (a._keySliding = !0, d(this).addClass("ui-state-active"), !1 === (e = a._start(t, o)))) return
                    }
                    switch (n = a.options.step, e = i = a.options.values && a.options.values.length ? a.values(o) : a.value(), t.keyCode) {
                        case d.ui.keyCode.HOME:
                            i = a._valueMin();
                            break;
                        case d.ui.keyCode.END:
                            i = a._valueMax();
                            break;
                        case d.ui.keyCode.PAGE_UP:
                            i = a._trimAlignValue(e + (a._valueMax() - a._valueMin()) / 5);
                            break;
                        case d.ui.keyCode.PAGE_DOWN:
                            i = a._trimAlignValue(e - (a._valueMax() - a._valueMin()) / 5);
                            break;
                        case d.ui.keyCode.UP:
                        case d.ui.keyCode.RIGHT:
                            if (e === a._valueMax()) return;
                            i = a._trimAlignValue(e + n);
                            break;
                        case d.ui.keyCode.DOWN:
                        case d.ui.keyCode.LEFT:
                            if (e === a._valueMin()) return;
                            i = a._trimAlignValue(e - n)
                    }
                    return a._slide(t, o, i), s
                }
            }).keyup(function (t) {
                var e = d(this).data("index.ui-slider-handle");
                a._keySliding && (a._keySliding = !1, a._stop(t, e), a._change(t, e), d(this).removeClass("ui-state-active"))
            }), this._refreshValue(), this._animateOff = !1
        },
        destroy: function () {
            return this.handles.remove(), this.range.remove(), this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-slider-disabled ui-widget ui-widget-content ui-angle-all").removeData("slider").unbind(".slider"), this._mouseDestroy(), this
        },
        _mouseCapture: function (t) {
            var e, i, n, s, o, a, r = this.options;
            return !r.disabled && (this.elementSize = {
                width: this.element.outerWidth(),
                height: this.element.outerHeight()
            }, this.elementOffset = this.element.offset(), e = {
                x: t.pageX,
                y: t.pageY
            }, i = this._normValueFromMouse(e), n = this._valueMax() - this._valueMin() + 1, (o = this).handles.each(function (t) {
                var e = Math.abs(i - o.values(t));
                e < n && (n = e, s = d(this), a = t)
            }), !0 === r.range && this.values(1) === r.min && (a += 1, s = d(this.handles[a])), !1 !== this._start(t, a) && (this._mouseSliding = !0, o._handleIndex = a, s.addClass("ui-state-active").focus(), r = s.offset(), this._clickOffset = d(t.target).parents().andSelf().is(".ui-slider-handle") ? {
                left: t.pageX - r.left - s.width() / 2,
                top: t.pageY - r.top - s.height() / 2 - (parseInt(s.css("borderTopWidth"), 10) || 0) - (parseInt(s.css("borderBottomWidth"), 10) || 0) + (parseInt(s.css("marginTop"), 10) || 0)
            } : {left: 0, top: 0}, i = this._normValueFromMouse(e), this._slide(t, a, i), this._animateOff = !0))
        },
        _mouseStart: function () {
            return !0
        },
        _mouseDrag: function (t) {
            var e = this._normValueFromMouse({x: t.pageX, y: t.pageY});
            return this._slide(t, this._handleIndex, e), !1
        },
        _mouseStop: function (t) {
            return this.handles.removeClass("ui-state-active"), this._mouseSliding = !1, this._stop(t, this._handleIndex), this._change(t, this._handleIndex), this._clickOffset = this._handleIndex = null, this._animateOff = !1
        },
        _detectOrientation: function () {
            this.orientation = "vertical" === this.options.orientation ? "vertical" : "horizontal"
        },
        _normValueFromMouse: function (t) {
            var e;
            return 1 < (e = (t = "horizontal" === this.orientation ? (e = this.elementSize.width, t.x - this.elementOffset.left - (this._clickOffset ? this._clickOffset.left : 0)) : (e = this.elementSize.height, t.y - this.elementOffset.top - (this._clickOffset ? this._clickOffset.top : 0))) / e) && (e = 1), e < 0 && (e = 0), "vertical" === this.orientation && (e = 1 - e), t = this._valueMax() - this._valueMin(), this._trimAlignValue(this._valueMin() + e * t)
        },
        _start: function (t, e) {
            var i = {handle: this.handles[e], value: this.value()};
            return this.options.values && this.options.values.length && (i.value = this.values(e), i.values = this.values()), this._trigger("start", t, i)
        },
        _slide: function (t, e, i) {
            var n;
            this.options.values && this.options.values.length ? (n = this.values(e ? 0 : 1), 2 === this.options.values.length && !0 === this.options.range && (0 === e && n < i || 1 === e && i < n) && (i = n), i !== this.values(e) && ((n = this.values())[e] = i, t = this._trigger("slide", t, {
                handle: this.handles[e],
                value: i,
                values: n
            }), this.values(e ? 0 : 1), !1 !== t && this.values(e, i, !0))) : i !== this.value() && !1 !== (t = this._trigger("slide", t, {
                handle: this.handles[e],
                value: i
            })) && this.value(i)
        },
        _stop: function (t, e) {
            var i = {handle: this.handles[e], value: this.value()};
            this.options.values && this.options.values.length && (i.value = this.values(e), i.values = this.values()), this._trigger("stop", t, i)
        },
        _change: function (t, e) {
            var i;
            this._keySliding || this._mouseSliding || (i = {
                handle: this.handles[e],
                value: this.value()
            }, this.options.values && this.options.values.length && (i.value = this.values(e), i.values = this.values()), this._trigger("change", t, i))
        },
        value: function (t) {
            return arguments.length && (this.options.value = this._trimAlignValue(t), this._refreshValue(), this._change(null, 0)), this._value()
        },
        values: function (t, e) {
            var i, n, s;
            if (1 < arguments.length && (this.options.values[t] = this._trimAlignValue(e), this._refreshValue(), this._change(null, t)), !arguments.length) return this._values();
            if (!d.isArray(t)) return this.options.values && this.options.values.length ? this._values(t) : this.value();
            for (i = this.options.values, n = t, s = 0; s < i.length; s += 1) i[s] = this._trimAlignValue(n[s]), this._change(null, s);
            this._refreshValue()
        },
        _setOption: function (t, e) {
            var i, n = 0;
            switch (d.isArray(this.options.values) && (n = this.options.values.length), d.Widget.prototype._setOption.apply(this, arguments), t) {
                case"disabled":
                    e ? (this.handles.filter(".ui-state-focus").blur(), this.handles.removeClass("ui-state-hover"), this.handles.attr("disabled", "disabled"), this.element.addClass("ui-disabled")) : (this.handles.removeAttr("disabled"), this.element.removeClass("ui-disabled"));
                    break;
                case"orientation":
                    this._detectOrientation(), this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-" + this.orientation), this._refreshValue();
                    break;
                case"value":
                    this._animateOff = !0, this._refreshValue(), this._change(null, 0), this._animateOff = !1;
                    break;
                case"values":
                    for (this._animateOff = !0, this._refreshValue(), i = 0; i < n; i += 1) this._change(null, i);
                    this._animateOff = !1
            }
        },
        _value: function () {
            var t = this.options.value;
            return this._trimAlignValue(t)
        },
        _values: function (t) {
            var e, i;
            if (arguments.length) return e = this.options.values[t], this._trimAlignValue(e);
            for (e = this.options.values.slice(), i = 0; i < e.length; i += 1) e[i] = this._trimAlignValue(e[i]);
            return e
        },
        _trimAlignValue: function (t) {
            if (t < this._valueMin()) return this._valueMin();
            if (t > this._valueMax()) return this._valueMax();
            var e = 0 < this.options.step ? this.options.step : 1, i = t % e;
            return t -= i, 2 * Math.abs(i) >= e && (t += 0 < i ? e : -e), parseFloat(t.toFixed(5))
        },
        _valueMin: function () {
            return this.options.min
        },
        _valueMax: function () {
            return this.options.max
        },
        _refreshValue: function () {
            var e, i, t, n, s, o = this.options.range, a = this.options, r = this, l = !this._animateOff && a.animate,
                c = {};
            this.options.values && this.options.values.length ? this.handles.each(function (t) {
                e = (r.values(t) - r._valueMin()) / (r._valueMax() - r._valueMin()) * 100, c["horizontal" === r.orientation ? "left" : "bottom"] = e + "%", d(this).stop(1, 1)[l ? "animate" : "css"](c, a.animate), !0 === r.options.range && ("horizontal" === r.orientation ? (0 === t && r.range.stop(1, 1)[l ? "animate" : "css"]({left: e + "%"}, a.animate), 1 === t && r.range[l ? "animate" : "css"]({width: e - i + "%"}, {
                    queue: !1,
                    duration: a.animate
                })) : (0 === t && r.range.stop(1, 1)[l ? "animate" : "css"]({bottom: e + "%"}, a.animate), 1 === t && r.range[l ? "animate" : "css"]({height: e - i + "%"}, {
                    queue: !1,
                    duration: a.animate
                }))), i = e
            }) : (t = this.value(), n = this._valueMin(), s = this._valueMax(), e = s !== n ? (t - n) / (s - n) * 100 : 0, c["horizontal" === r.orientation ? "left" : "bottom"] = e + "%", this.handle.stop(1, 1)[l ? "animate" : "css"](c, a.animate), "min" === o && "horizontal" === this.orientation && this.range.stop(1, 1)[l ? "animate" : "css"]({width: e + "%"}, a.animate), "max" === o && "horizontal" === this.orientation && this.range[l ? "animate" : "css"]({width: 100 - e + "%"}, {
                queue: !1,
                duration: a.animate
            }), "min" === o && "vertical" === this.orientation && this.range.stop(1, 1)[l ? "animate" : "css"]({height: e + "%"}, a.animate), "max" === o && "vertical" === this.orientation && this.range[l ? "animate" : "css"]({height: 100 - e + "%"}, {
                queue: !1,
                duration: a.animate
            }))
        }
    }), d.extend(d.ui.slider, {version: "1.8.2"})
}(jQuery), function (t) {
    function e(t, e) {
        var i, n;
        1 < t.originalEvent.touches.length || (t.preventDefault(), i = t.originalEvent.changedTouches[0], (n = document.createEvent("MouseEvents")).initMouseEvent(e, !0, !0, window, 1, i.screenX, i.screenY, i.clientX, i.clientY, !1, !1, !1, !1, 0, null), t.target.dispatchEvent(n))
    }

    var i, n, s, o;
    t.support.touch = "ontouchend" in document, t.support.touch && (n = t.ui.mouse.prototype, s = n._mouseInit, o = n._mouseDestroy, n._touchStart = function (t) {
        !i && this._mouseCapture(t.originalEvent.changedTouches[0]) && (i = !0, this._touchMoved = !1, e(t, "mouseover"), e(t, "mousemove"), e(t, "mousedown"))
    }, n._touchMove = function (t) {
        i && (this._touchMoved = !0, e(t, "mousemove"))
    }, n._touchEnd = function (t) {
        i && (e(t, "mouseup"), e(t, "mouseout"), this._touchMoved || e(t, "click"), i = !1)
    }, n._mouseInit = function () {
        this.element.bind({
            touchstart: t.proxy(this, "_touchStart"),
            touchmove: t.proxy(this, "_touchMove"),
            touchend: t.proxy(this, "_touchEnd")
        }), s.call(this)
    }, n._mouseDestroy = function () {
        this.element.unbind({
            touchstart: t.proxy(this, "_touchStart"),
            touchmove: t.proxy(this, "_touchMove"),
            touchend: t.proxy(this, "_touchEnd")
        }), o.call(this)
    })
}(jQuery), function (f) {
    var n = {
        url: !1,
        callback: !1,
        target: !1,
        duration: 120,
        on: "mouseover",
        touch: !0,
        onZoomIn: !1,
        onZoomOut: !1,
        magnify: 1
    };
    f.zoom = function (t, e, i, n) {
        var s, o, a, r, l, c, d, u = f(t), h = u.css("position"), p = f(e);
        return t.style.position = /(absolute|fixed)/.test(h) ? h : "relative", t.style.overflow = "hidden", i.style.width = i.style.height = "", f(i).addClass("zoomImg").css({
            position: "absolute",
            top: 0,
            left: 0,
            opacity: 0,
            width: i.width * n,
            height: i.height * n,
            border: "none",
            maxWidth: "none",
            maxHeight: "none"
        }).appendTo(t), {
            init: function () {
                o = u.outerWidth(), s = u.outerHeight(), a = e === t ? (r = o, s) : (r = p.outerWidth(), p.outerHeight()), l = (i.width - o) / r, c = (i.height - s) / a, d = p.offset()
            }, move: function (t) {
                var e = t.pageX - d.left, t = t.pageY - d.top, t = Math.max(Math.min(t, a), 0),
                    e = Math.max(Math.min(e, r), 0);
                i.style.left = e * -l + "px", i.style.top = t * -c + "px"
            }
        }
    }, f.fn.zoom = function (i) {
        return this.each(function () {
            var s = f.extend({}, n, i || {}), o = s.target && f(s.target)[0] || this, t = this, a = f(t),
                r = document.createElement("img"), l = f(r), c = "mousemove.zoom", d = !1, u = !1;
            if (!s.url) {
                var e = t.querySelector("img");
                if (e && (s.url = e.getAttribute("data-src") || e.currentSrc || e.src), !s.url) return
            }
            a.one("zoom.destroy", function (t, e) {
                a.off(".zoom"), o.style.position = t, o.style.overflow = e, r.onload = null, l.remove()
            }.bind(this, o.style.position, o.style.overflow)), r.onload = function () {
                function e(t) {
                    n.init(), n.move(t), l.stop().fadeTo(f.support.opacity ? s.duration : 0, 1, !!f.isFunction(s.onZoomIn) && s.onZoomIn.call(r))
                }

                function i() {
                    l.stop().fadeTo(s.duration, 0, !!f.isFunction(s.onZoomOut) && s.onZoomOut.call(r))
                }

                var n = f.zoom(o, t, r, s.magnify);
                "grab" === s.on ? a.on("mousedown.zoom", function (t) {
                    1 === t.which && (f(document).one("mouseup.zoom", function () {
                        i(), f(document).off(c, n.move)
                    }), e(t), f(document).on(c, n.move), t.preventDefault())
                }) : "click" === s.on ? a.on("click.zoom", function (t) {
                    return d ? void 0 : (d = !0, e(t), f(document).on(c, n.move), f(document).one("click.zoom", function () {
                        i(), d = !1, f(document).off(c, n.move)
                    }), !1)
                }) : "toggle" === s.on ? a.on("click.zoom", function (t) {
                    d ? i() : e(t), d = !d
                }) : "mouseover" === s.on && (n.init(), a.on("mouseenter.zoom", e).on("mouseleave.zoom", i).on(c, n.move)), s.touch && a.on("touchstart.zoom", function (t) {
                    t.preventDefault(), u ? (u = !1, i()) : (u = !0, e(t.originalEvent.touches[0] || t.originalEvent.changedTouches[0]))
                }).on("touchmove.zoom", function (t) {
                    t.preventDefault(), n.move(t.originalEvent.touches[0] || t.originalEvent.changedTouches[0])
                }).on("touchend.zoom", function (t) {
                    t.preventDefault(), u && (u = !1, i())
                }), f.isFunction(s.callback) && s.callback.call(r)
            }, r.setAttribute("role", "presentation"), r.alt = "", r.src = s.url
        })
    }, f.fn.zoom.defaults = n
}(window.jQuery), function (h, p, v, y) {
    v.swipebox = function (n, t) {
        var a, s, e = {
                useCSS: !0,
                useSVG: !0,
                initialIndexOnArray: 0,
                removeBarsOnMobile: !0,
                hideCloseButtonOnMobile: !1,
                hideBarsDelay: 3e3,
                videoMaxWidth: 1140,
                vimeoColor: "cccccc",
                beforeOpen: null,
                afterOpen: null,
                afterClose: null,
                nextSlide: null,
                prevSlide: null,
                loopAtEnd: !1,
                autoplayVideos: !1,
                queryStringData: {},
                toggleClassOnLoad: "",
                thumbs: !1
            }, r = this, f = [], o = n.selector, l = v(o),
            i = navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(Android)|(PlayBook)|(BB10)|(BlackBerry)|(Opera Mini)|(IEMobile)|(webOS)|(MeeGo)/i),
            c = null !== i || p.createTouch !== y || "ontouchstart" in h || "onmsgesturechange" in h || navigator.msMaxTouchPoints,
            d = !!p.createElementNS && !!p.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect,
            m = h.innerWidth || v(h).width(), u = h.innerHeight || v(h).height(), g = 0;
        r.settings = {}, v.swipebox.close = function () {
            a.closeSlide()
        }, v.swipebox.extend = function () {
            return a
        }, r.init = function () {
            r.settings = v.extend({}, e, t), v.isArray(n) ? (f = n, a.target = v(h), a.init(r.settings.initialIndexOnArray)) : v(p).on("click", o, function (t) {
                return "slide current" !== t.target.parentNode.className && (v.isArray(n) || (a.destroy(), s = v(o), a.actions()), f = [], i || (e = "data-rel", i = v(this).attr(e)), i || (e = "rel", i = v(this).attr(e)), (s = i && "" !== i && "nofollow" !== i ? l.filter("[" + e + '="' + i + '"]') : v(o)).each(function () {
                    var t = null, e = null;
                    v(this).attr("title") && (t = v(this).attr("title")), v(this).attr("href") && (e = v(this).attr("href")), f.push({
                        href: e,
                        title: t
                    })
                }), i = s.index(v(this)), t.preventDefault(), t.stopPropagation(), a.target = v(t.target), void a.init(i));
                var e, i
            })
        }, a = {
            init: function (t) {
                r.settings.beforeOpen && r.settings.beforeOpen(), this.target.trigger("swipebox-start"), v.swipebox.isOpen = !0, this.build(), this.openSlide(t), this.openMedia(t), this.preloadMedia(t + 1), this.preloadMedia(t - 1), r.settings.afterOpen && r.settings.afterOpen()
            }, build: function () {
                var t;
                v("body").append('<div id="swipebox-overlay">\t\t\t\t\t<div id="swipebox-container">\t\t\t\t\t\t<div id="swipebox-slider"></div>\t\t\t\t\t\t<div id="swipebox-top-bar">\t\t\t\t\t\t\t<div id="swipebox-title"></div>\t\t\t\t\t\t</div>\t\t\t\t\t\t<div id="swipebox-bottom-bar">\t\t\t\t\t\t\t<div id="swipebox-arrows">\t\t\t\t\t\t\t\t<a id="swipebox-prev"></a>\t\t\t\t\t\t\t\t<a id="swipebox-next"></a>\t\t\t\t\t\t\t</div>\t\t\t\t\t\t</div>\t\t\t\t\t\t<a id="swipebox-close"></a>\t\t\t\t\t</div>\t\t\t</div>'), d && !0 === r.settings.useSVG && (t = (t = v("#swipebox-close").css("background-image")).replace("png", "svg"), v("#swipebox-prev, #swipebox-next, #swipebox-close").css({"background-image": t})), i && r.settings.removeBarsOnMobile && v("#swipebox-bottom-bar, #swipebox-top-bar").remove(), v.each(f, function (t) {
                    v("#swipebox-slider").append('<div data-index="' + t + '" class="slide"></div>')
                }), this.setDim(), this.actions(), c && this.gesture(), this.keyboard(), this.animBars(), this.resize()
            }, setDim: function () {
                var t, e, i;
                "onorientationchange" in h ? h.addEventListener("orientationchange", function () {
                    0 === h.orientation ? (t = m, e = u) : 90 !== h.orientation && -90 !== h.orientation || (t = u, e = m)
                }, !1) : (t = h.innerWidth || v(h).width(), e = h.innerHeight || v(h).height()), i = {
                    width: t,
                    height: e
                }, v("#swipebox-overlay").css(i)
            }, resize: function () {
                var t = this;
                v(h).resize(function () {
                    t.setDim()
                }).resize()
            }, supportTransition: function () {
                for (var t = "transition WebkitTransition MozTransition OTransition msTransition KhtmlTransition".split(" "), e = 0; e < t.length; e++) if (p.createElement("div").style[t[e]] !== y) return t[e];
                return !1
            }, doCssTrans: function () {
                if (r.settings.useCSS && this.supportTransition()) return !0
            }, gesture: function () {
                var e, i, n, s, o, a, r = this, l = !1, c = !1, d = {}, u = {},
                    h = v("#swipebox-top-bar, #swipebox-bottom-bar"), p = v("#swipebox-slider");
                h.addClass("visible-bars"), r.setTimeout(), v("body").bind("touchstart", function (t) {
                    return v(this).addClass("touching"), e = v("#swipebox-slider .slide").index(v("#swipebox-slider .slide.current")), u = t.originalEvent.targetTouches[0], d.pageX = t.originalEvent.targetTouches[0].pageX, d.pageY = t.originalEvent.targetTouches[0].pageY, v("#swipebox-slider").css({
                        "-webkit-transform": "translate3d(" + g + "%, 0, 0)",
                        transform: "translate3d(" + g + "%, 0, 0)"
                    }), v(".touching").bind("touchmove", function (t) {
                        t.preventDefault(), t.stopPropagation(), u = t.originalEvent.targetTouches[0], !c && (o = n, n = u.pageY - d.pageY, 50 <= Math.abs(n) || l) && (t = .75 - Math.abs(n) / p.height(), p.css({top: n + "px"}), p.css({opacity: t}), l = !0), s = i, i = u.pageX - d.pageX, a = 100 * i / m, !c && !l && 10 <= Math.abs(i) && (v("#swipebox-slider").css({
                            "-webkit-transition": "",
                            transition: ""
                        }), c = !0), c && (0 < i ? 0 === e ? v("#swipebox-overlay").addClass("leftSpringTouch") : (v("#swipebox-overlay").removeClass("leftSpringTouch").removeClass("rightSpringTouch"), v("#swipebox-slider").css({
                            "-webkit-transform": "translate3d(" + (g + a) + "%, 0, 0)",
                            transform: "translate3d(" + (g + a) + "%, 0, 0)"
                        })) : i < 0 && (f.length === e + 1 ? v("#swipebox-overlay").addClass("rightSpringTouch") : (v("#swipebox-overlay").removeClass("leftSpringTouch").removeClass("rightSpringTouch"), v("#swipebox-slider").css({
                            "-webkit-transform": "translate3d(" + (g + a) + "%, 0, 0)",
                            transform: "translate3d(" + (g + a) + "%, 0, 0)"
                        }))))
                    }), !1
                }).bind("touchend", function (t) {
                    t.preventDefault(), t.stopPropagation(), v("#swipebox-slider").css({
                        "-webkit-transition": "-webkit-transform 0.4s ease",
                        transition: "transform 0.4s ease"
                    }), n = u.pageY - d.pageY, i = u.pageX - d.pageX, a = 100 * i / m, l ? (l = !1, 100 <= Math.abs(n) && Math.abs(n) > Math.abs(o) ? (t = 0 < n ? p.height() : -p.height(), p.animate({
                        top: t + "px",
                        opacity: 0
                    }, 300, function () {
                        r.closeSlide()
                    })) : p.animate({
                        top: 0,
                        opacity: 1
                    }, 300)) : c ? (c = !1, 10 <= i && s <= i ? r.getPrev() : i <= -10 && i <= s && r.getNext()) : h.hasClass("visible-bars") ? (r.clearTimeout(), r.hideBars()) : (r.showBars(), r.setTimeout()), v("#swipebox-slider").css({
                        "-webkit-transform": "translate3d(" + g + "%, 0, 0)",
                        transform: "translate3d(" + g + "%, 0, 0)"
                    }), v("#swipebox-overlay").removeClass("leftSpringTouch").removeClass("rightSpringTouch"), v(".touching").off("touchmove").removeClass("touching")
                })
            }, setTimeout: function () {
                var t;
                0 < r.settings.hideBarsDelay && ((t = this).clearTimeout(), t.timeout = h.setTimeout(function () {
                    t.hideBars()
                }, r.settings.hideBarsDelay))
            }, clearTimeout: function () {
                h.clearTimeout(this.timeout), this.timeout = null
            }, showBars: function () {
                var t = v("#swipebox-top-bar, #swipebox-bottom-bar");
                this.doCssTrans() ? t.addClass("visible-bars") : (v("#swipebox-top-bar").animate({top: 0}, 500), v("#swipebox-bottom-bar").animate({bottom: 0}, 500), setTimeout(function () {
                    t.addClass("visible-bars")
                }, 1e3))
            }, hideBars: function () {
                var t = v("#swipebox-top-bar, #swipebox-bottom-bar");
                this.doCssTrans() ? t.removeClass("visible-bars") : (v("#swipebox-top-bar").animate({top: "-50px"}, 500), v("#swipebox-bottom-bar").animate({bottom: "-50px"}, 500), setTimeout(function () {
                    t.removeClass("visible-bars")
                }, 1e3))
            }, animBars: function () {
                var t = this, e = v("#swipebox-top-bar, #swipebox-bottom-bar");
                e.addClass("visible-bars"), t.setTimeout(), v("#swipebox-slider").click(function () {
                    e.hasClass("visible-bars") || (t.showBars(), t.setTimeout())
                }), v("#swipebox-bottom-bar").hover(function () {
                    t.showBars(), e.addClass("visible-bars"), t.clearTimeout()
                }, function () {
                    0 < r.settings.hideBarsDelay && (e.removeClass("visible-bars"), t.setTimeout())
                })
            }, keyboard: function () {
                var e = this;
                v(h).bind("keyup", function (t) {
                    t.preventDefault(), t.stopPropagation(), 37 === t.keyCode ? e.getPrev() : 39 === t.keyCode ? e.getNext() : 27 === t.keyCode && e.closeSlide()
                })
            }, actions: function () {
                var i = this, t = "touchend click";
                f.length < 2 ? (v("#swipebox-bottom-bar").hide(), y === f[1] && v("#swipebox-top-bar").hide()) : (v("#swipebox-prev").bind(t, function (t) {
                    t.preventDefault(), t.stopPropagation(), i.getPrev(), i.setTimeout()
                }), v("#swipebox-next").bind(t, function (t) {
                    t.preventDefault(), t.stopPropagation(), i.getNext(), i.setTimeout()
                }), r.settings.thumbs && (f.forEach(function (t, e) {
                    i.preloadMedia(e)
                }), v("body").on(t, ".js-swipebox-thumbs-el", function (t) {
                    t.preventDefault(), t.stopPropagation(), i.getThumb(v(this)), i.setTimeout()
                }))), v("#swipebox-close").bind(t, function () {
                    i.closeSlide()
                })
            }, setSlide: function (t, e) {
                e = e || !1;
                var i = v("#swipebox-slider");
                g = 100 * -t, this.doCssTrans() ? i.css({
                    "-webkit-transform": "translate3d(" + 100 * -t + "%, 0, 0)",
                    transform: "translate3d(" + 100 * -t + "%, 0, 0)"
                }) : i.animate({left: 100 * -t + "%"}), v("#swipebox-slider .slide").removeClass("current"), v("#swipebox-slider .slide").eq(t).addClass("current"), r.settings.thumbs && (v(".js-swipebox-thumbs-el").removeClass("active"), v('.js-swipebox-thumbs-el[data-index="' + t + '"]').addClass("active")), this.setTitle(t), e && i.fadeIn(), v("#swipebox-prev, #swipebox-next").removeClass("disabled"), 0 === t ? v("#swipebox-prev").addClass("disabled") : t === f.length - 1 && !0 !== r.settings.loopAtEnd && v("#swipebox-next").addClass("disabled")
            }, openSlide: function (t) {
                v("html").addClass("swipebox-html"), c ? (v("html").addClass("swipebox-touch"), r.settings.hideCloseButtonOnMobile && v("html").addClass("swipebox-no-close-button")) : v("html").addClass("swipebox-no-touch"), v(h).trigger("resize"), this.setSlide(t, !0)
            }, preloadMedia: function (t) {
                var e = this, i = null;
                f[t] !== y && (i = f[t].href), e.isVideo(i) ? e.openMedia(t) : setTimeout(function () {
                    e.openMedia(t)
                }, 1e3)
            }, openMedia: function (t) {
                var e, i;
                if (f[t] !== y && (e = f[t].href), t < 0 || t >= f.length) return !1;
                i = v("#swipebox-slider .slide").eq(t), this.isVideo(e) ? i.html(this.getVideo(e)) : (i.addClass("slide-loading"), this.loadMedia(e, function () {
                    i.removeClass("slide-loading"), i.html(this)
                }))
            }, setTitle: function (t) {
                var e = null;
                v("#swipebox-title").empty(), f[t] !== y && (e = f[t].title), e ? (v("#swipebox-top-bar").show(), v("#swipebox-title").append(e)) : v("#swipebox-top-bar").hide()
            }, isVideo: function (t) {
                if (t) return !!(t.match(/(youtube\.com|youtube-nocookie\.com)\/watch\?v=([a-zA-Z0-9\-_]+)/) || t.match(/vimeo\.com\/([0-9]*)/) || t.match(/youtu\.be\/([a-zA-Z0-9\-_]+)/) || t.match(/youtube\.com\/([a-zA-Z0-9\-_]+)/)) || (0 <= t.toLowerCase().indexOf("swipeboxvideo=1") || void 0)
            }, parseUri: function (t, e) {
                var i = p.createElement("a"), n = {};
                return i.href = decodeURIComponent(t), i.search && (n = JSON.parse('{"' + i.search.toLowerCase().replace("?", "").replace(/&/g, '","').replace(/=/g, '":"') + '"}')), v.isPlainObject(e) && (n = v.extend(n, e, r.settings.queryStringData)), v.map(n, function (t, e) {
                    if (t && "" < t) return encodeURIComponent(e) + "=" + encodeURIComponent(t)
                }).join("&")
            }, getVideo: function (t) {
                var e = "",
                    i = t.match(/((?:www\.)?youtube\.com|(?:www\.)?youtube-nocookie\.com)\/watch\?v=([a-zA-Z0-9\-_]+)/),
                    n = t.match(/(?:www\.)?youtu\.be\/([a-zA-Z0-9\-_]+)/),
                    s = t.match(/(?:www\.)?vimeo\.com\/([0-9]*)/), o = "",
                    e = i || n ? (n && (i = n), o = a.parseUri(t, {
                        autoplay: r.settings.autoplayVideos ? "1" : "0",
                        v: ""
                    }), '<iframe width="560" height="315" src="//' + i[1] + "/embed/" + i[2] + "?" + o + '" frameborder="0" allowfullscreen></iframe>') : s ? (o = a.parseUri(t, {
                        autoplay: r.settings.autoplayVideos ? "1" : "0",
                        byline: "0",
                        portrait: "0",
                        color: r.settings.vimeoColor
                    }), '<iframe width="560" height="315"  src="//player.vimeo.com/video/' + s[1] + "?" + o + '" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>') : '<iframe width="560" height="315" src="' + t + '" frameborder="0" allowfullscreen></iframe>';
                return '<div class="swipebox-video-container" style="max-width:' + r.settings.videoMaxWidth + 'px"><div class="swipebox-video">' + e + "</div></div>"
            }, loadMedia: function (t, e) {
                var i;
                0 === t.trim().indexOf("#") ? e.call(v("<div>", {class: "swipebox-inline-container"}).append(v(t).clone().toggleClass(r.settings.toggleClassOnLoad))) : this.isVideo(t) || (i = v("<img>").on("load", function () {
                    e.call(i)
                })).attr("src", t)
            }, getNext: function () {
                var t, e = v("#swipebox-slider .slide").index(v("#swipebox-slider .slide.current"));
                e + 1 < f.length ? (t = v("#swipebox-slider .slide").eq(e).contents().find("iframe").attr("src"), v("#swipebox-slider .slide").eq(e).contents().find("iframe").attr("src", t), e++, this.setSlide(e), this.preloadMedia(e + 1), r.settings.nextSlide && r.settings.nextSlide()) : !0 === r.settings.loopAtEnd ? (t = v("#swipebox-slider .slide").eq(e).contents().find("iframe").attr("src"), v("#swipebox-slider .slide").eq(e).contents().find("iframe").attr("src", t), e = 0, this.preloadMedia(e), this.setSlide(e), this.preloadMedia(e + 1), r.settings.nextSlide && r.settings.nextSlide()) : (v("#swipebox-overlay").addClass("rightSpring"), setTimeout(function () {
                    v("#swipebox-overlay").removeClass("rightSpring")
                }, 500))
            }, getPrev: function () {
                var t, e = v("#swipebox-slider .slide").index(v("#swipebox-slider .slide.current"));
                0 < e ? (t = v("#swipebox-slider .slide").eq(e).contents().find("iframe").attr("src"), v("#swipebox-slider .slide").eq(e).contents().find("iframe").attr("src", t), e--, this.setSlide(e), this.preloadMedia(e - 1), r.settings.prevSlide && r.settings.prevSlide()) : (v("#swipebox-overlay").addClass("leftSpring"), setTimeout(function () {
                    v("#swipebox-overlay").removeClass("leftSpring")
                }, 500))
            }, getThumb: function (t) {
                var e = parseInt(t.data("index")),
                    t = v("#swipebox-slider .slide").eq(e).contents().find("iframe").attr("src");
                v("#swipebox-slider .slide").eq(e).contents().find("iframe").attr("src", t), this.preloadMedia(e), this.setSlide(e), r.settings.prevSlide && r.settings.prevSlide()
            }, nextSlide: function () {
            }, prevSlide: function () {
            }, closeSlide: function () {
                v("html").removeClass("swipebox-html"), v("html").removeClass("swipebox-touch"), v(h).trigger("resize"), this.destroy()
            }, destroy: function () {
                v(h).unbind("keyup"), v("body").unbind("touchstart"), v("body").unbind("touchmove"), v("body").unbind("touchend"), v("#swipebox-slider").unbind(), v("#swipebox-overlay").remove(), v.isArray(n) || n.removeData("_swipebox"), this.target && this.target.trigger("swipebox-destroy"), v.swipebox.isOpen = !1, r.settings.afterClose && r.settings.afterClose(), f = []
            }
        }, r.init()
    }, v.fn.swipebox = function (t) {
        return v.data(this, "_swipebox") || (t = new v.swipebox(this, t), this.data("_swipebox", t)), this.data("_swipebox")
    }
}(window, document, jQuery);