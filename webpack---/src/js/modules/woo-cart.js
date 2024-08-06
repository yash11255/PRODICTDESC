var HaruWooCartHandler = function HaruWooCartHandler($scope, $) {
    var $currentCart = $scope.find('.haru-cart');
    var timeoutCart = 0;

    if ($currentCart.hasClass('haru-cart--side')) {
        $('.cart-mask-overlay').on('click', function(e) {
            $('.cart-side-widget').removeClass('in');
            $('.cart-mask-overlay').removeClass('in');
        });

        $currentCart.find('.haru-cart-opener').on('click', function(e) {
            if (!isCart() && !isCheckout()) {
                e.preventDefault();

                $currentCart.find('.cart-side-widget').addClass('in');
                $currentCart.find('.cart-mask-overlay').addClass('in');
            }
        });

        $currentCart.find('.cart-side-close').on('click', function(e) {
            e.preventDefault();

            $currentCart.find('.cart-side-widget').removeClass('in');
            $currentCart.find('.cart-mask-overlay').removeClass('in');
        });

        $currentCart.find('.cart-side-widget').on('click', function(e) {
            clearTimeout(timeoutCart);
        });

        $('body').on('added_to_cart', function() {
            var $cartOpener = $('.haru-cart-icon');
            if ($cartOpener.length > 0) {
                $cartOpener.first().trigger('click');
            }

            clearTimeout(timeoutCart);

            var auto_close = $currentCart.attr('data-close');
            var close_time = parseInt($currentCart.attr('data-close-time'));

            if ('yes' == auto_close) {
                timeoutCart = setTimeout(function() {
                    $currentCart.find('.cart-side-widget').removeClass('in');
                    $currentCart.find('.cart-mask-overlay').removeClass('in');
                }, close_time);
            }
        });
    }

    // WooCommerce update fragments fix
    // $('body').on('added_to_cart removed_from_cart', function(e, fragments) {
    //   if (fragments) {
    //     $.each(fragments, function(key, value) {
    //       $(key).replaceWith(value)
    //     })
    //   }
    // })

    // if (typeof wc_cart_fragments_params !== 'undefined') {
    //   $('body').on('wc_fragments_refreshed wc_fragments_loaded', function() {
    //     var wc_fragments = JSON.parse(sessionStorage.getItem(wc_cart_fragments_params.fragment_name))

    //     if (wc_fragments) {
    //       $.each(wc_fragments, function(key, value) {
    //         $(key).replaceWith(value)
    //       })
    //     }
    //   })
    // }

    var isCart = function isCart() {
        return $('body').hasClass('woocommerce-cart');
    };

    var isCheckout = function isCheckout() {
        return $('body').hasClass('woocommerce-checkout');
    };
};

jQuery(window).on('elementor/frontend/init', function() {
    elementorFrontend.hooks.addAction('frontend/element_ready/haru-woo-cart.default', HaruWooCartHandler);
});

//# sourceURL=webpack:///./src/js/modules/woo-cart.js?