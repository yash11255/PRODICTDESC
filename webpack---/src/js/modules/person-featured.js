var HaruPersonFeaturedHandler = function HaruPersonFeaturedHandler($scope, $) {
    var $currentPersonFeatured = $scope.find('.haru-person-featured');

    if ($($currentPersonFeatured).find('.haru-slick').length > 0) {
        $currentPersonFeatured.find('.haru-slick').each(function(index) {
            $(this).slick();
        });
    }
};

jQuery(window).on('elementor/frontend/init', function() {
    elementorFrontend.hooks.addAction('frontend/element_ready/haru-person-featured.default', HaruPersonFeaturedHandler);
});

//# sourceURL=webpack:///./src/js/modules/person-featured.js?