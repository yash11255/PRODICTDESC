var HaruMovieSlideshowHandler = function HaruMovieSlideshowHandler($scope, $) {
    var $currentMovieSlideshow = $scope.find('.haru-movie-slideshow');

    if ($($currentMovieSlideshow).find('.movie-list').length > 0) {
        $currentMovieSlideshow.find('.movie-list').each(function(index) {
            $(this).slick();
        });
    }
};

jQuery(window).on('elementor/frontend/init', function() {
    elementorFrontend.hooks.addAction('frontend/element_ready/haru-movie-slideshow.default', HaruMovieSlideshowHandler);
});

//# sourceURL=webpack:///./src/js/modules/movie-slideshow.js?