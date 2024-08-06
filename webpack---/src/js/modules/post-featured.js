var HaruPostFeaturedHandler = function HaruPostFeaturedHandler($scope, $) {
    var $currentPostFeatured = $scope.find('.haru-post-featured');

    if ($($currentPostFeatured).find('.haru-slick').length > 0) {
        $currentPostFeatured.find('.haru-slick').each(function(index) {
            $(this).slick();
        });
    }
};

jQuery(window).on('elementor/frontend/init', function() {
    elementorFrontend.hooks.addAction('frontend/element_ready/haru-post-featured.default', HaruPostFeaturedHandler);
});

//# sourceURL=webpack:///./src/js/modules/post-featured.js?