var HaruWooProductSliderHandler = function HaruWooProductSliderHandler($scope, $) {
    var $currentProductSlider = $scope.find('.haru-woo-product-slider');

    if ($($currentProductSlider).find('.haru-slick').length > 0) {
        $currentProductSlider.find('.haru-slick').each(function(index) {
            $(this).slick();
        });
    }

    if ($($currentProductSlider).closest('.menu-item-mega-menu').length > 0) {
        $($currentProductSlider).closest('.menu-item-mega-menu').on('mouseenter', function() {
            $currentProductSlider.find('.haru-slick').each(function(index) {
                $(this).slick('reinit');
            });
        });
    }
};

jQuery(window).on('elementor/frontend/init', function() {
    elementorFrontend.hooks.addAction('frontend/element_ready/haru-woo-product-slider.default', HaruWooProductSliderHandler);
});

//# sourceURL=webpack:///./src/js/modules/woo-product-slider.js?