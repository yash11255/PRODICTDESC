var HaruWooAjaxOrderHandler = function HaruWooAjaxOrderHandler($scope, $) {
    // Use for display only on Editor Mode
    if ($('body').hasClass('elementor-editor-active')) {
        var $currentAjaxOrder = $scope.find('.haru-woo-ajax-order');

        if ($($currentAjaxOrder).find('.haru-slick').length > 0) {
            $currentAjaxOrder.find('.haru-slick').each(function(index) {
                if (!$(this).hasClass('slick-initialized')) {
                    $(this).slick();
                }
            });
        }

        if ($($currentAjaxOrder).closest('.menu-item-mega-menu').length > 0) {
            $($currentAjaxOrder).closest('.menu-item-mega-menu').on('mouseenter', function() {
                $currentAjaxOrder.find('.haru-slick').each(function(index) {
                    if ($(this).hasClass('slick-initialized')) {
                        $(this).slick('destroy');
                        $(this).slick();
                    } else {
                        $(this).slick();
                    }
                });
            });
        }
    }
};

jQuery(window).on('elementor/frontend/init', function() {
    elementorFrontend.hooks.addAction('frontend/element_ready/haru-woo-ajax-order.default', HaruWooAjaxOrderHandler);
});

//# sourceURL=webpack:///./src/js/modules/woo-ajax-order.js?