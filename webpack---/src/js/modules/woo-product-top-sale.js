var HaruWooProductTopSaleHandler = function HaruWooProductTopSaleHandler($scope, $) {
    var $currentWooProductTopSale = $scope.find('.haru-product-top-sale');

    if ($($currentWooProductTopSale).find('.haru-slick').length > 0) {
        $currentWooProductTopSale.find('.haru-slick').each(function(index) {
            $(this).slick();
        });
    }

    if ($($currentWooProductTopSale).closest('.menu-item-mega-menu').length > 0) {
        $($currentWooProductTopSale).closest('.menu-item-mega-menu').on('mouseenter', function() {
            $currentWooProductTopSale.find('.haru-slick').each(function(index) {
                $(this).slick('reinit');
            });
        });
    }
};

jQuery(window).on('elementor/frontend/init', function() {
    elementorFrontend.hooks.addAction('frontend/element_ready/haru-woo-product-top-sale.default', HaruWooProductTopSaleHandler);
});

//# sourceURL=webpack:///./src/js/modules/woo-product-top-sale.js?