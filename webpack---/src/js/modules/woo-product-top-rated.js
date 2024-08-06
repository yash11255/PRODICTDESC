var HaruWooProductTopRatedHandler = function HaruWooProductTopRatedHandler($scope, $) {
    var $currentWooProductTopRated = $scope.find('.haru-product-top-rated');

    if ($($currentWooProductTopRated).find('.haru-slick').length > 0) {
        $currentWooProductTopRated.find('.haru-slick').each(function(index) {
            $(this).slick();
        });
    }

    if ($($currentWooProductTopRated).closest('.menu-item-mega-menu').length > 0) {
        $($currentWooProductTopRated).closest('.menu-item-mega-menu').on('mouseenter', function() {
            $currentWooProductTopRated.find('.haru-slick').each(function(index) {
                $(this).slick('reinit');
            });
        });
    }
};

jQuery(window).on('elementor/frontend/init', function() {
    elementorFrontend.hooks.addAction('frontend/element_ready/haru-woo-product-top-rated.default', HaruWooProductTopRatedHandler);
});

//# sourceURL=webpack:///./src/js/modules/woo-product-top-rated.js?