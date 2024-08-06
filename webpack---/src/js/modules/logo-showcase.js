var HaruLogoShowcaseHandler = function HaruLogoShowcaseHandler($scope, $) {
    var $currentLogoShowcase = $scope.find('.haru-logo-showcase');

    if ($($currentLogoShowcase).find('.haru-slick').length > 0) {
        $currentLogoShowcase.find('.haru-slick').each(function(index) {
            $(this).slick();
        });
    }
};

jQuery(window).on('elementor/frontend/init', function() {
    elementorFrontend.hooks.addAction('frontend/element_ready/haru-logo-showcase.default', HaruLogoShowcaseHandler);
});

//# sourceURL=webpack:///./src/js/modules/logo-showcase.js?