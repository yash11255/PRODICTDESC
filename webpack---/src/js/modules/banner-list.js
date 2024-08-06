var HaruBannerListHandler = function HaruBannerListHandler($scope, $) {
    var $currentBannerList = $scope.find('.haru-banner-list');

    if ($currentBannerList.find('.haru-slick').length > 0) {
        $currentBannerList.find('.haru-slick').each(function(index) {
            $(this).slick();
        });
    }
};

jQuery(window).on('elementor/frontend/init', function() {
    elementorFrontend.hooks.addAction('frontend/element_ready/haru-banner-list.default', HaruBannerListHandler);
});

//# sourceURL=webpack:///./src/js/modules/banner-list.js?