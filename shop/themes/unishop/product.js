function Product(form, options) {
    this.form = $(form);
    this.add2cart = this.form.find(".js-add2cart");
    this.button = this.add2cart.find(".js-submit-form");
    this.skFastButton = this.form.find(".js-sk-oneclick-open");
    this.discount = this.form.closest('.js-product-card').find(".js-product-discount");
    this.savedWrap = this.form.closest('.js-product-card').find(".js-product-saving");
    this.isSkuUrl = this.form.data("sku-url");
    for (var k in options) {
        this[k] = options[k];
    }
    var self = this;
    // add to cart block: services
    this.form.find(".services input[type=checkbox]").change(function () {
        var obj = $('select[name="service_variant[' + $(this).val() + ']"]');
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

    this.form.find(".services .service-variants").on('change', function () {
        self.cartButtonVisibility(true);
        self.updatePrice();
    });

    this.form.find('.inline-select a').click(function () {
        var d = $(this).closest('.inline-select');
        d.find('a.selected').removeClass('selected');
        $(this).addClass('selected');
        d.find('select.js-sku-feature, input.js-sku-feature').val($(this).data('value')).change();
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
        changeLargeImage($("#product-image-" + $initial_cb.data("image-id")));
    }

    this.form.find("select.js-sku-feature, input.js-sku-feature").change(function () {
        var key = "";
        self.form.find("select.js-sku-feature, input.js-sku-feature").each(function () {
            key += $(this).data('feature-id') + ':' + $(this).val() + ';';
        });
        var sku = self.features[key];

        if (sku) {

            if (sku.image_id) {
                changeLargeImage($("#product-image-" + sku.image_id));
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
    this.form.find("select.js-sku-feature:first, input.js-sku-feature:first").change();

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
    if(this.form.find(".js-product-code").length > 0){
        this.form.find(".js-product-code").hide();
        this.form.find(".sku-" + sku_id + "-product-code").show();
    }

    this.form.find("div.stocks div").hide();
    this.form.find(".sku-" + sku_id + "-stock").show();
    for (var service_id in this.services[sku_id]) {
        var v = this.services[sku_id][service_id];
        if (v === false) {
            this.form.find(".service-" + service_id).hide().find('input,select').attr('disabled', 'disabled').removeAttr('checked').trigger('refresh');
        } else {
            this.form.find(".service-" + service_id).show().find('input').removeAttr('disabled').trigger('refresh');
            if (typeof (v) == 'string' || typeof (v) == 'number') {
                this.form.find(".service-" + service_id + ' .service-price').html(this.currencyFormat(v));
                this.form.find(".service-" + service_id + ' input').data('price', v);
            } else {
                var select = this.form.find(".service-" + service_id + ' .service-variants');
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
                    selected_variant_id = this.form.find(".service-" + service_id + ' .service-variants').find("option:not(.disable):first").attr("value");
                }
                this.form.find(".service-" + service_id + ' .service-variants').val(selected_variant_id);
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
        if (self.form.find('.service-' + s + '  .service-variants').length) {
            price += parseFloat(self.form.find('.service-' + s + '  .service-variants :selected').data('price'));
        } else {
            price += parseFloat($(this).data('price'));
        }
    });

    var $priceWrap =  this.add2cart.find(".price");
    var priceFormat = this.currencyFormat(price);
    var textZeroPrice = $priceWrap.data("zero-text");
    if (price == 0 && textZeroPrice){
        $priceWrap.html('<span class="product_zero-price">' + textZeroPrice + '</span>');
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

        this.discount.addClass('display_none');
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
                this.discount.html('-' + discount + '%').removeClass('display_none');
            }
        }
    }
};

Product.prototype.updateSaved = function (price, compare_price) {
    if (this.savedWrap.length){

        this.savedWrap.addClass('display_none');
        if(compare_price > price && price > 0){
            var saved = price - compare_price;

            this.savedWrap.html(this.currencyFormat(saved)).removeClass('display_none');
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

    if(typeof this.sku_features != 'undefined' && typeof this.product_skus_features[sku_id] != 'undefined' && featuresTables.length){
        var featuresList = this.sku_features,
            productFeaturesList = this.product_skus_features[sku_id],
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
                var itemFeaturesClass = "product_features-item";
                if(isDivider){
                    itemFeaturesClass += " " +"divider";
                }
                htmlTableTrFeature = '<tr class="'+ itemFeaturesClass +'">';
                htmlTableTrFeature += "<td class=\"product_features-title\">";
                htmlTableTrFeature += "<span>" + featuresList[f_code].name + "</span>";
                htmlTableTrFeature += "</td>";
                htmlTableTrFeature += "<td class=\"product_features-value\">";
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

$(function () {
    var previewsBxSlider = imagesPreviewCarusel();

    productMainImageCarousel(previewsBxSlider);
    /*productImageNav();*/

    var $ = jQuery,
        $productGallery = $('.js-product-gallery'),
        $coreWrapper = $("#product-core-image"),
        $coreImages = $coreWrapper.find(".js-product-image-popup");

    displayImageTitle($coreWrapper.find('.js-product-gallery-main'));

    if ($productGallery.data('popup')){
        if ($productGallery.data('photoswipe')){
            popupPhotoswipe($productGallery, $coreWrapper, $coreImages);
        }else{
            popupSwipebox($productGallery, $coreWrapper, $coreImages);
        }
    }

    $(".js-gallery-preview a").on("click", function (event) {
        event.preventDefault();

        changeLargeImage($(this));
    });

    $(".js-product-image-popup").on("click", function (event) {
        event.preventDefault();
    });
});

function productMainImageCarousel(previewsBxSlider){
    var mainGallery = $('.js-product-gallery-main'),
        position = 0;

    if(mainGallery.length){
        var currenrPreview = mainGallery.closest('.js-product').find('.js-gallery-preview.selected');
        if(currenrPreview.length){
            if(currenrPreview.data("position") != "0"){
                position = parseInt(currenrPreview.data("position"));
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
                    productImageZoom(mainGallery);
                }
            },
            onDragged: function(event){
                var gallery = $(event.currentTarget);

                if(gallery.length){
                    var previews = gallery.closest('.js-product').find('.js-gallery-preview'),
                        previousPreview = previews.filter('.selected'),
                        image_id = $(gallery).find(".owl-item.active .js-product-gallery-main-el").data("id");


                    if(image_id){
                        previews.removeClass("selected");

                        var currentPreview = previews.filter("[data-id='" + image_id + "']");
                        currentPreview.addClass("selected");


                       if(currentPreview.attr("aria-hidden") == "true" && previewsBxSlider.length){

                           if(parseInt(previousPreview.data('position')) > parseInt(currentPreview.data('position'))){
                               previewsBxSlider.goToPrevSlide();
                           }else if(parseInt(previousPreview.data('position')) < parseInt(currentPreview.data('position'))){
                               previewsBxSlider.goToNextSlide();
                           }
                       }
                        displayImageTitle(gallery);

                    }
                }
            }
        });
    }
}

function changeLargeImage(previewImage){
    var preview =  previewImage.parent(),
        image_id = preview.data("id"),
        mainGallery = previewImage.closest('.js-product').find('.js-product-gallery-main'),
        mainGalleryItems = mainGallery.find('.js-product-gallery-main-el');

    preview.addClass('selected').siblings().removeClass('selected');

    if(image_id){
        var position = mainGalleryItems.filter("[data-id='" + image_id + "']").data("position");
        if(typeof position !== "undefined"){
            mainGallery.trigger("to.owl.carousel", [position, 300]);
            displayImageTitle(mainGallery);
        }
    }
    /* productImageNavCheckDisabled(previewImage.parent()); */
}

function imagesPreviewCarusel(){
    var images = $('.js-product-gallery-previews');

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
}

function displayImageTitle(gallery){
    var titleWrap = gallery.closest('.js-product').find('.js-product-gallery-title'),
        currentImage = gallery.find(".owl-item.active");

    titleWrap.text("");
    if(titleWrap.length && currentImage.length){
        var title = currentImage.find('img').attr('alt');
        if(title){
            titleWrap.text(title);
        }
    }
}

function productImageZoom(mainGallery){
    if(mainGallery.length && mainGallery.closest('.js-product-gallery').data("zoom")){
        var currentImage = mainGallery.find(".js-product-gallery-main-el");

        currentImage.each(function(){
            $(this).zoom({url: $(this).attr('href')});
        });
    }
}

function popupSwipebox($productGallery, $coreWrapper, $coreImages){
    if ($coreImages.length) {
        $coreImages.on("click", function(e) {
            e.preventDefault();

            var previews = $(this).closest('.js-product').find('.js-gallery-preview'),
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

            var thumbs = $productGallery.data("thumbs");
            var bgOpacity = $productGallery.data("black-bg");
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

                    //$(document).on("scroll", closeSwipe);
                    $('#swipebox-slider').on("click", closeSwipe);
                },

            });
            return false;
        });
    }
}

function popupPhotoswipe($coreImages){
    $('body').on("click", ".pswp button", function (event){
        event.preventDefault();
    });

    if ($coreImages.length) {
        $coreImages.on("click", function (e) {
            e.preventDefault();

            var previews = $(this).closest('.js-product').find('.js-gallery-preview'),
                mainPhoto = $(this).closest('.js-product').find('.js-product-gallery-main-el'),
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
                        var iframeVideo = $coreImages.find('iframe');
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
                        gallery.invalidateCurrItems();
                        gallery.updateSize(true);
                    };
                    img.src = item.src;
                }
            });
            gallery.init();
        });
    }
}

function productImageNav(){
    var btnNav = $('.js-prоduct-gallery-nav');

    if(btnNav.length){
        btnNav.on("click", function(){
            var $this = $(this),
                action = $this.data("action"),
                currentActive = $('.js-gallery-preview.selected');

            if(action == 'next'){
                var newImage = currentActive.next();
            }else{
                var newImage = currentActive.prev();
            }

            if(newImage.length){
                newImage.find('a').click();
            }
        });
    }

}

function productImageNavCheckDisabled(previewImageWrap){
    var btnNext = $('.js-prоduct-gallery-nav[data-action="next"]'),
        btnPrev = $('.js-prоduct-gallery-nav[data-action="prev"]');

    if(btnNext.length && btnPrev.length){
        if(previewImageWrap.prev().length == 0){
            btnPrev.addClass("disabled");
        }else{
            btnPrev.removeClass("disabled");
        }

        if(previewImageWrap.next().length == 0){
            btnNext.addClass("disabled");
        }else{
            btnNext.removeClass("disabled");
        }
    }
}

function is_touch_device() {
    return 'ontouchstart' in window || navigator.maxTouchPoints;
};