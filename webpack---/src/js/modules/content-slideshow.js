var HaruContentSlideshowHandler = function HaruContentSlideshowHandler($scope, $) {
    var $currentContentSlideshow = $scope.find('.haru-content-slideshow');

    if ($currentContentSlideshow.find('.haru-slick').length > 0) {
        $currentContentSlideshow.find('.haru-slick').each(function(index) {
            $(this).slick();
        });
    }
};

jQuery(window).on('elementor/frontend/init', function() {
    elementorFrontend.hooks.addAction('frontend/element_ready/haru-content-slideshow.default', HaruContentSlideshowHandler);
});

//# sourceURL=webpack:///./src/js/modules/content-slideshow.js?