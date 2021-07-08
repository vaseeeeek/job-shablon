$(function () {

    function updateCart(data)
    {
        $(".cart-total, .js-cart-total").html(data.total);
        if (data.discount_numeric) {
            $(".cart-discount").closest('div.row').show();
        }
        $(".cart-discount").html('&minus; ' + data.discount);

        if (data.add_affiliate_bonus) {
            $(".affiliate").show().html(data.add_affiliate_bonus);
        } else {
            $(".affiliate").hide();
        }

        if (data.affiliate_discount) {
            $('.affiliate-discount-available').html(data.affiliate_discount);
            if ($('.affiliate-discount').data('use')) {
                $('.affiliate-discount').html('&minus; ' + data.affiliate_discount);
            }
        }
    }

    $(".js-cart-delete").click(function () {
        var row = $(this).closest('div.row');
        $.post('delete/', {html: 1, id: row.data('id')}, function (response) {
            if (response.data.count == 0) {
                location.reload();
            }
            row.remove();
            updateCart(response.data);
        }, "json");
        return false;
    });

    $(".js-cart-preview-product-delete").on("click", function(){
        var row = $(this).closest('.js-cart-product'),
            cartWrap = $(this).closest('.js-cart-ajax'),
            url = cartWrap.data("url");

        $.post(url+'delete/', {html: 1, id: row.data('id')}, function (response) {
            if (response.data.count == 0) {
                $('.js-cart-mini-empty').show();
                $('.js-cart-mini-full').hide();
            }
            row.hide();
            updateCart(response.data);
            $('.js-cart-preview-count').html(response.data.count);
            $('.js-cart-total-price').html(response.data.total);
        }, "json");
    });

    $(".cart input.qty").change(function () {
        var quantityInput = $(this),
            productWrap = quantityInput.closest('div.row');

        changeQty(productWrap, quantityInput, 'save/');
    });

    $(".js-cart-ajax input.qty").change(function () {
        var quantityInput = $(this),
            productWrap = quantityInput.closest('.js-cart-product');

        changeQty(productWrap, quantityInput, $('.js-fixed-cart-outer').data("cart-url") + 'save/');
    });

    function changeQty(productWrap, quantityInput, url){
        var quantityInputValue = quantityInput.val();
        if (quantityInputValue > 0) {
                $.post(url, {html: 1, id: productWrap.data('id'), quantity: quantityInputValue}, function (response) {
                    if(response.data.item_total.charAt(0) == '0' && row.find('.item-total').data('zero-text') != ""){
                        productWrap.find('.js-item-total').html(productWrap.find('.js-item-total').data('zero-text'));
                    }else{
                        productWrap.find('.js-item-total').html(response.data.item_total);
                    }

                    if (response.data.q) {
                        quantityInput.val(response.data.q);
                    }
                    if (response.data.error) {
                        alert(response.data.error);
                    } else {
                        quantityInput.removeClass('error');
                    }
                    updateCart(response.data);
                }, "json");
        } else {
            quantityInput.val(1);
        }
    }

    $(".js-cart-services input:checkbox").change(function () {
        var obj = $('select[name="service_variant[' + $(this).closest('div.row').data('id') + '][' + $(this).val() + ']"]');
        if (obj.length) {
            if ($(this).is(':checked')) {
                obj.removeAttr('disabled');
            } else {
                obj.attr('disabled', 'disabled');
            }
        }

        var div = $(this).closest('.js-cart-service');
        var row = $(this).closest('div.row');
        if ($(this).is(':checked')) {
           var parent_id = row.data('id')
           var data = {html: 1, parent_id: parent_id, service_id: $(this).val()};
           var $variants = $('[name="service_variant[' + parent_id + '][' + $(this).val() + ']"]');
           if ($variants.length) {
               data['service_variant_id'] = $variants.val();
           }
           $.post('add/', data, function(response) {
               div.data('id', response.data.id);
               row.find('.js-item-total').html(response.data.item_total);
               updateCart(response.data);
           }, "json");
        } else {
           $.post('delete/', {html: 1, id: div.data('id')}, function (response) {
               div.data('id', null);
               row.find('.js-item-total').html(response.data.item_total);
               updateCart(response.data);
           }, "json");
        }
    });

    $(".js-cart-services select").change(function () {
        var row = $(this).closest('div.row');
        $.post('save/', {html: 1, id: $(this).closest('div').data('id'), 'service_variant_id': $(this).val()}, function (response) {
            row.find('.js-item-total').html(response.data.item_total);
            updateCart(response.data);
        }, "json");
    });

    $("#cancel-affiliate").click(function () {
        $(this).closest('form').append('<input type="hidden" name="use_affiliate" value="0">').submit();
        return false;
    });

    $("#use-affiliate").click(function () {
        $(this).closest('form').append('<input type="hidden" name="use_affiliate" value="1">').submit();
        return false;
    })

    $("#use-coupon").click(function () {
        $('#discount-row:hidden').slideToggle(200);
        $('#apply-coupon-code:hidden').show();
        $('#apply-coupon-code input[type="text"]').focus();
        return false;
    });

    // listen coupon input value for change and hide its error message if changing have been happened

    var onInputChange = function ($input, onChange) {
        var prev_input_val = $input.val() || '';
        var timer_id, timeout = 500;
        $input.keydown(function () {
            if (timer_id) {
                clearTimeout(timer_id);
            }
            timer_id = setTimeout(function () {
                if (prev_input_val !== $input.val()) {
                    onChange.apply($input, arguments);
                }
                prev_input_val = $input.val();
            }, timeout);
        }).change(onChange);
    };

    onInputChange($('#apply-coupon-code input[type="text"]'), function () {
        $('#apply-coupon-code .errormsg').hide();
    });

    $("div.addtocart input:button").click(function () {
        var f = $(this).closest('div.addtocart');
        if (f.data('url')) {
            var d = $('#dialog');
            var c = d.find('.cart');
            c.load(f.data('url'), function () {
                c.prepend('<a href="#" class="dialog-close">&times;</a>');
                c.find('form').data('cart', 1);
                d.show();
                if ((c.height() > c.find('form').height())) {
                    c.css('bottom', 'auto');
                } else {
                    c.css('bottom', '15%');
                }
            });
            return false;
        }
        $.post($(this).data('url'), {html: 1, product_id: $(this).data('product_id')}, function (response) {
            if (response.status == 'ok') {
                var cart_total = $(".cart-total");
                $("#page-content").load(location.href, function () {
                    cart_total.closest('#cart').removeClass('empty');
                    cart_total.html(response.data.total);
                    $('#cart').addClass('fixed');
                    $('#cart-content').append($('<div class="cart-just-added"></div>').html(f.find('span.added2cart').text()));
                    $('.cart-to-checkout').slideDown(200);
                });
            }
        }, 'json');
       return false;
    });

    $('.js-cart-checkout-button').click(function (event){
        var PluginBuy1step = $('.buy1step-page__checkout-box');

        if(PluginBuy1step.length){
            event.preventDefault();

            var top = PluginBuy1step.offset().top - 20;

            $('html,body').animate({
                scrollTop: top
            }, 500);
        }
    });

});