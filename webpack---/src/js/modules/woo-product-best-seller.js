var HaruWooProductBestSellerHandler = function HaruWooProductBestSellerHandler($scope, $) {
    var $currentWooProductBestSeller = $scope.find('.haru-product-best-seller');

    if ($($currentWooProductBestSeller).find('.haru-slick').length > 0) {
        $currentWooProductBestSeller.find('.haru-slick').each(function(index) {
            $(this).slick();
        });
    }

    if ($($currentWooProductBestSeller).closest('.menu-item-mega-menu').length > 0) {
        $($currentWooProductBestSeller).closest('.menu-item-mega-menu').on('mouseenter', function() {
            $currentWooProductBestSeller.find('.haru-slick').each(function(index) {
                $(this).slick('reinit');
            });
        });
    }
};

jQuery(window).on('elementor/frontend/init', function() {
    elementorFrontend.hooks.addAction('frontend/element_ready/haru-woo-product-best-seller.default', HaruWooProductBestSellerHandler);
});

//# sourceURL=webpack:///./src/js/modules/woo-product-best-seller.js?