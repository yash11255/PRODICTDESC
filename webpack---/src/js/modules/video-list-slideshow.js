var HaruVideoListSlideshowHandler = function HaruVideoListSlideshowHandler($scope, $) {
    var $currentListSlideshow = $scope.find('.haru-video-list-slideshow');

    if ($($currentListSlideshow).find('.haru-slick').length > 0) {
        $currentListSlideshow.find('.haru-slick').each(function(index) {
            $(this).slick({
                // dots: true,
            });
        });
    }
};

jQuery(window).on('elementor/frontend/init', function() {
    elementorFrontend.hooks.addAction('frontend/element_ready/haru-video-list-slideshow.default', HaruVideoListSlideshowHandler);
});

//# sourceURL=webpack:///./src/js/modules/video-list-slideshow.js?