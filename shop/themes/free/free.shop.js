var filter = {
    init: function () {
        var e = this;
        e.openOptions(), e.openCloseMobFilter(), e.send(), e.rangeOption($(".js-filters .js-filter-range")), e.showMoreOptions(), e.smartfilterRefreshHideParams(), e.clearSelectedFilter(), e.initFilterSubcategory()
    }, openOptions: function () {
        $(".js-filter-title").on("click", function () {
            var e = $(this).closest(".js-filter-el"), t = e.find(".js-filter-options");
            t.is(":visible") ? (t.slideUp(), e.addClass("close")) : (t.slideDown(), e.removeClass("close"))
        })
    }, openCloseMobFilter: function () {
        var e = $(".js-mobile-filter-head"), t = $(".js-mobile-filter-body");
        e.on("click", function () {
            t.toggle(), e.hasClass("filter-open") ? e.removeClass("filter-open") : e.addClass("filter-open")
        })
    }, send: function () {
        $(".js-filters.js-ajax form input").change(function () {
            var e = $(this).closest("form");
            productList.ajaxUpdateListFormFields(e.serializeArray())
        }), $(".js-filters.js-ajax form").submit(function () {
            var e = $(this);
            return productList.ajaxUpdateListFormFields(e.serializeArray()), !1
        })
    }, rangeOption: function (e) {
        e.each(function () {
            if (!$(this).find(".js-slider-range").length) {
                $(this).append('<div class="js-slider-range"></div>');
                var e = $(this).find(".js-min"), t = $(this).find(".js-max"), a = parseFloat(e.attr("placeholder")),
                    i = parseFloat(t.attr("placeholder")), r = 1, s = $(this).find(".js-slider-range");
                if (s.data("step")) r = parseFloat(s.data("step")); else {
                    var n = i - a;
                    if (Math.round(a) != a || Math.round(i) != i) {
                        r = n / 10;
                        for (var o = 0; r < 1;) r *= 10, o += 1;
                        r = Math.pow(10, -o), o = Math.round(1e5 * Math.abs(Math.round(a) - a)) / 1e5, o && o < r && (r = o), o = Math.round(1e5 * Math.abs(Math.round(i) - i)) / 1e5, o && o < r && (r = o)
                    }
                }
                s.slider({
                    range: !0,
                    min: parseFloat(e.attr("placeholder")),
                    max: parseFloat(t.attr("placeholder")),
                    step: r,
                    values: [parseFloat(e.val().length ? e.val() : e.attr("placeholder")), parseFloat(t.val().length ? t.val() : t.attr("placeholder"))],
                    slide: function (a, i) {
                        var r = i.values[0] == $(this).slider("option", "min") ? "" : i.values[0];
                        e.val(r), r = i.values[1] == $(this).slider("option", "max") ? "" : i.values[1], t.val(r)
                    },
                    stop: function (t, a) {
                        e.change()
                    }
                }), e.add(t).change(function () {
                    var a = "" === e.val() ? s.slider("option", "min") : parseFloat(e.val()),
                        i = "" === t.val() ? s.slider("option", "max") : parseFloat(t.val());
                    i >= a && s.slider("option", "values", [a, i])
                })
            }
        })
    }, showMoreOptions: function () {
        $(".js-filter-options-show-all").click(function (e) {
            e.preventDefault();
            var t = $(this), a = t.closest(".js-filter-options"), i = a.find(".js-filter-options-el");
            i.is(":hidden") ? (i.removeClass("hide"), t.addClass("open")) : (i.addClass("hide"), t.removeClass("open"))
        })
    }, smartfilterRefreshHideParams: function () {
        void 0 !== $.smartfiltersTheme && setTimeout(function () {
            var e = $(".js-filter-options-show-all");
            $(".js-filters").data("smartfilters-hide-option") && e.each(function () {
                var e = $(this), t = e.hasClass("open"), a = parseInt(e.data("max-show-params")),
                    i = e.closest(".js-filter-el").find("label"), r = 0;
                a && (e.hide(), i.each(function () {
                    var i = $(this);
                    i.removeClass("js-filter-options-el").removeClass("hide"), i.hasClass("sf-label-disabled") && i.is(":hidden") || r++, r > a && (e.show(), i.addClass("js-filter-options-el"), t || i.addClass("hide"))
                }))
            }), $(".js-filter-body").find('input[type="checkbox"], input[type="radio"], .js-select').trigger("refresh")
        }, 500)
    }, clearSelectedFilter: function () {
        var e = this;
        $("body").on("click", ".js-filter-checked-remove", function () {
            var t = $(this).data("code");
            $(".js-filters").length && (e.clearFilterItem(t), productList.ajaxUpdateListFormFields($(".js-filters form").serializeArray()))
        })
    }, clearFilterItem: function (e) {
        var t = this, a = $(".js-filters").find(".js-filter-el[data-code='" + e + "']");
        a.find('input[type="checkbox"], input[type="radio"]').prop("checked", !1).trigger("refresh"), a.find('input[type="text"]').val(""), $(".js-filters .js-slider-range").remove(), t.rangeOption($(".js-filters .js-filter-range"))
    }, addFilterSubcategory: function (e) {
        var t = $(".js-cat_sub"), a = t.data("save-filters"), i = t.data("save-filters-aliases"), r = e,
            s = t.find(".js-cat-link");
        if (a) if (i && (i = i.split(","), i.length > 0 && (r = [], e.forEach(function (e) {
            i.indexOf(e.name.replace("[]", "")) >= 0 && r.push(e)
        }))), r.length) {
            var n = filter.buildUrl(r);
            s.length && (n.length < 2 && (n = ""), s.each(function () {
                var e = $(this).attr("href");
                e = e.split("?")[0], $(this).attr("href", e + n)
            }))
        } else s.each(function () {
            var e = $(this).attr("href");
            e = e.split("?")[0], $(this).attr("href", e)
        })
    }, initFilterSubcategory: function () {
        var e = this, t = $(".js-filters form");
        t.length && e.addFilterSubcategory(t.serializeArray())
    }, buildUrl: function (e) {
        for (var t = [], a = 0; a < e.length; a++) "" !== e[a].value && t.push(e[a].name + "=" + e[a].value);
        return "?" + t.join("&")
    }
}, productList = {
    init: function () {
        var e = this;
        e.switchProductListView(), e.setCountPerPageProducts()
    }, switchProductListView: function () {
        var e = this, t = {expires: 7, path: "/"}, a = $(".js-switch-product-view");
        $("body").on("click", ".js-switch-product-view", function () {
            var i = $(this), r = i.data("view");
            r && $.cookie("CategoryViewProducts", r, t);
            $(".js-filters.js-ajax form");
            e.ajaxUpdateList(window.location.search), a.removeClass("selected"), i.addClass("selected")
        })
    }, setCountPerPageProducts: function () {
        $("#set-per-page").change(function () {
            var e = $(this), t = e.val(), a = {expires: 7, path: "/"};
            $.cookie("products_per_page", t, a);
            var i = window.location.href.replace(/(page=)\w+/g, "page=1");
            window.location.href = i
        })
    }, ajaxUpdateListFormFields: function (e) {
        var t = this, a = filter.buildUrl(e);
        t.ajaxUpdateList(a, !0), filter.addFilterSubcategory(e)
    }, ajaxUpdateList: function (e, t) {
        var a = $(".js-product-ajax-list"), i = $(".js-product-ajax-list-loader");
        $(window).lazyLoad && $(window).lazyLoad("sleep"), a.html(""), i.show();
        var r = e.indexOf("?") < 0 ? e + "?_" : e;
        r += "&_=_" + (new Date).getTime() + Math.random(), $.get(r, function (r) {
            var s = $("<div></div>").html(r);
            a.html(s.find(".js-product-ajax-list").html()), itemsViewList.images(a.find(".js-preview-products")), i.hide(), history.pushState && void 0 !== history.state && t && ("?" == e && (e = window.location.pathname), window.history.pushState({}, "", e)), $(window).lazyLoad && $(window).lazyLoad("reload"), $(window).on("popstate", function (e) {
                location.reload()
            }), productViewGrid.init(), void 0 !== $.autobadgeFrontend && $.autobadgeFrontend.reinit(), void 0 !== $.pluginprotilegallery && $.pluginprotilegallery.lazyload(), filter.smartfilterRefreshHideParams()
        })
    }
}, lazyloadingPagination = {
    init: function () {
        if ($.fn.lazyLoad) {
            var e = $(".lazy-paging");
            if (!e.length) return;
            var t = parseInt(e.data("times"), 10), a = e.data("loading-str") || "Loading...", i = e.find("li.selected");
            if ("1" != i.children("a").text()) return;
            e.hide();
            var r = $(window);
            r.lazyLoad("stop");
            i.next().length && r.lazyLoad({
                container: ".js-product-ajax-list .js-cat-list", load: function () {
                    r.lazyLoad("sleep");
                    var e = $(".lazy-paging").hide(), i = e.find("li.selected"), s = i.next(),
                        n = s.find("a").attr("href");
                    if (!n) return void r.lazyLoad("stop");
                    var o = $(".js-product-ajax-list .js-cat-list"),
                        l = $('<div class="lazy-paging-loader"><i class="icon16 loading"></i>' + a + "</div>").insertAfter(".js-product-ajax-list");
                    $.get(n, function (a) {
                        var i = $("<div></div>").html(a);
                        itemsViewList.images(i.find(".js-preview-products")), o.append(i.find(".js-product-ajax-list .js-cat-list").children());
                        var s = i.find(".lazy-paging").hide();
                        e.replaceWith(s), e = s, e.find("li.selected").next().length ? !isNaN(t) && t <= 0 ? (r.lazyLoad("sleep"), $(".lazyloading-load-more").length || $('<a href="#" class="lazyloading-load-more">' + link_text + "</a>").insertAfter(e).click(function () {
                            return l.show(), t = 1, r.lazyLoad("wake"), r.lazyLoad("force"), !1
                        })) : r.lazyLoad("wake") : (r.lazyLoad("stop"), $(".lazyloading-load-more").hide()), productViewGrid.init(), void 0 !== $.autobadgeFrontend && $.autobadgeFrontend.reinit(), void 0 !== $.pluginprotilegallery && $.pluginprotilegallery.lazyload(), l.remove(), i.remove()
                    })
                }
            })
        }
    }
}, countdown = {
    init: function () {
        $(".js-promo-countdown").each(function () {
            var e = $(this), t = e.data("end"), a = e.data("day-text"), i = e.data("wrap");
            e.countdown(t, function (t) {
                i ? (e.find(".js-countdown-days").html(t.strftime("%D")), e.find(".js-countdown-hours").html(t.strftime("%H")), e.find(".js-countdown-minutes").html(t.strftime("%M")), e.find(".js-countdown-seconds").html(t.strftime("%S"))) : e.text(t.strftime("%D " + a + " %H:%M:%S"))
            })
        })
    }
}, brandsCarousel = {
    brandsWrap: $(".js-brands-carousel"), init: function () {
        var e = this;
        if (!e.brandsWrap.length) return !1;
        e.prepareBrandsCarousels(), e.carouselInteraction(), $(window).one("resize", e.brandsCarousel)
    }, prepareBrandsCarousels: function () {
        var e = this, t = e.brandsWrap.find(".owl-carousel"), a = t.outerWidth(!0),
            i = e.brandsWrap.find(".js-homepage-brands-el"), r = i.length;
        if (i.first().outerWidth(!0) * r > a) {
            var s = e.brandsWrap.find(".js-homepage-brands-direction");
            s.append('<button data-index="prev" class="js-carousel-brands-on-initialized owl-prev disabled"></button>'), s.append('<button data-index="next" class="js-carousel-brands-on-initialized owl-next"></button>')
        }
        var n = t.offset().left + t.outerWidth();
        i.slice(0, 6).each(function () {
            $(this).offset().left < n && $(this).find(".owl-lazy").Lazy({
                afterLoad: function (e) {
                    e.removeClass("owl-lazy")
                }
            })
        })
    }, carouselInteraction: function () {
        var e = this;
        $(".js-carousel-brands-on-initialized").on("click", function () {
            e.brandsCarousel($(this).data("index"))
        }), checkTouchDevice() && e.brandsWrap.find(".owl-carousel").swipe({
            allowPageScroll: "auto",
            threshold: 20,
            swipe: function (e, t, a, i, r, s) {
                "left" == t ? brandsCarousel.brandsCarousel("next") : "right" == t && brandsCarousel.brandsCarousel("prev")
            }
        })
    }, brandsCarousel: function (e) {
        if (brandsCarousel.brandsWrap.hasClass("carousel-init")) return !1;
        var t = brandsCarousel.brandsWrap.find(".owl-carousel"),
            a = brandsCarousel.brandsWrap.find(".js-homepage-brands-direction");
        t.owlCarousel({
            loop: !1,
            margin: 0,
            nav: !0,
            navContainer: a,
            navText: ["", ""],
            lazyLoad: !0,
            dots: !1,
            responsive: {0: {items: 1}, 401: {items: 2}, 801: {items: 3}, 1001: {items: 4}, 1201: {items: 8}},
            onInitialize: function (e) {
                brandsCarousel.brandsWrap.find(".js-carousel-brands-on-initialized").remove()
            },
            onInitialized: function (e) {
                brandsCarousel.brandsWrap.addClass("carousel-init")
            }
        }), e && ("prev" == e ? t.trigger("prev.owl.carousel") : "next" == e && t.trigger("next.owl.carousel"))
    }
}, categories = {
    init: function () {
        var e = this;
        e.sidebar()
    }, sidebar: function () {
        this.sidebarInit(), $(".js-subcat-open").click(function () {
            var e = $(this), t = $(e.parent().find(".js-subcat")[0]);
            t.is(":visible") ? (t.slideUp(), e.removeClass("selected")) : (t.slideDown(), e.addClass("selected"))
        })
    }, sidebarInit: function () {
        var e = $(".js-sidebar-cats"), t = e.find("[data-is-open]"), a = t.parents(".js-subcat");
        a.removeClass("hide"), a.each(function () {
            $(this).parent().find(".js-subcat-open").first().addClass("selected")
        })
    }
}, categoryText = {
    readMore: function () {
        var e = $(".js-category-desc-wrap"), t = e.data("max-height"), a = $(".js-category-desc");
        if ($(".js-category-desc-more-wrap").remove(), e.removeClass("close"), e.length && t && e.css("max-height", t + "px"), e.length && a.length && e.outerHeight() < a.outerHeight()) {
            var i = e.data("text-more"), r = e.data("text-hide");
            e.addClass("close"), e.after("<div class='js-category-desc-more-wrap category-desc-more-wrap'><span class='js-category-desc-more category-desc-more sdColor link-half'>" + i + "</span></div>"), $(".js-category-desc-more").on("click", function () {
                var s = $(this);
                s.hasClass("open") ? (s.removeClass("open"), e.addClass("close"), s.text(i), e.animate({maxHeight: t}, 500)) : (e.animate({maxHeight: a.outerHeight() + "px"}, 500), s.addClass("open"), e.removeClass("close"), s.text(r))
            })
        } else e.removeAttr("style")
    }
}, reviews = {
    reviewsWrap: $(".js-reviews-carousel"), init: function () {
        var e = this;
        if (!e.reviewsWrap.length) return !1;
        e.prepareReviewsCarousels(), e.carouselInteraction(), $(window).one("resize", reviews.reviewsCarousel)
    }, prepareReviewsCarousels: function () {
        var e = this, t = e.reviewsWrap.find(".owl-carousel"), a = t.outerWidth(),
            i = e.reviewsWrap.find(".js-home-reviews-item"), r = i.length;
        if (i.first().outerWidth(!0) * r > a + 20) {
            var s = e.reviewsWrap.find(".js-reviews-carousel-direction");
            s.append('<button data-index="prev" class="js-carousel-reviews-on-initialized owl-prev disabled"></button>'), s.append('<button data-index="next" class="js-carousel-reviews-on-initialized owl-next"></button>')
        }
        var n = t.offset().left + t.outerWidth();
        i.slice(0, 2).each(function () {
            $(this).offset().left < n && $(this).find(".owl-lazy").Lazy({
                afterLoad: function (e) {
                    e.removeClass("owl-lazy")
                }
            })
        })
    }, carouselInteraction: function () {
        var e = this;
        $(".js-carousel-reviews-on-initialized").on("click", function () {
            e.reviewsCarousel($(this).data("index"))
        }), checkTouchDevice() && e.reviewsWrap.find(".owl-carousel").swipe({
            allowPageScroll: "auto",
            threshold: 20,
            swipe: function (e, t, a, i, r, s) {
                "left" == t ? reviews.reviewsCarousel("next") : "right" == t && reviews.reviewsCarousel("prev")
            }
        })
    }, reviewsCarousel: function (e) {
        if (reviews.reviewsWrap.hasClass("carousel-init")) return !1;
        var t = reviews.reviewsWrap.find(".owl-carousel"),
            a = reviews.reviewsWrap.find(".js-reviews-carousel-direction");
        t.owlCarousel({
            loop: !1,
            margin: 20,
            nav: !0,
            dots: !1,
            navText: ["", ""],
            navElement: "div",
            navContainer: a,
            responsive: {0: {items: 1}, 901: {items: 2}, 1201: {items: 3}},
            autoHeight: !0,
            lazyLoad: !0,
            onInitialize: function (e) {
                reviews.reviewsWrap.find(".js-carousel-reviews-on-initialized").remove()
            },
            onInitialized: function (e) {
                reviews.reviewsWrap.addClass("carousel-init")
            },
            onLoadedLazy: function (e) {
                var t = $(e.currentTarget);
                t.length && $.Retina && t.find(".owl-item.active .owl-lazy").retina()
            }
        }), e && ("prev" == e ? t.trigger("prev.owl.carousel") : "next" == e && t.trigger("next.owl.carousel"))
    }
};
$(document).ready(function () {
    filter.init(), productList.init(), lazyloadingPagination.init(), countdown.init(), brandsCarousel.init(), categories.init(), categoryText.readMore(), reviews.init()
}), $(function () {
    void 0 === window.seofilterOnFilterSuccessCallbacks && (window.seofilterOnFilterSuccessCallbacks = []), window.seofilterOnFilterSuccessCallbacks.push(function () {
        $(".js-filter-body").find('input[type="checkbox"], input[type="radio"], .js-select').trigger("refresh"), categoryText.readMore()
    })
});