var HaruNewsHandler = function HaruNewsHandler($scope, $) {
    var $currentNews = $scope.find('.haru-news');

    if ($($currentNews).find('.haru-slick').length > 0) {
        $currentNews.find('.haru-slick').each(function(index) {
            $(this).slick();
        });
    }
};

jQuery(window).on('elementor/frontend/init', function() {
    elementorFrontend.hooks.addAction('frontend/element_ready/haru-news.default', HaruNewsHandler);
});

//# sourceURL=webpack:///./src/js/modules/news.js?