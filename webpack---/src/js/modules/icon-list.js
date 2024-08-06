var HaruIconListHandler = function HaruIconListHandler($scope, $) {
    var $currentIconList = $scope.find('.haru-icon-list');

    if ($currentIconList.find('.haru-slick').length > 0) {
        $currentIconList.find('.haru-slick').each(function(index) {
            $(this).slick();
        });
    }
};

jQuery(window).on('elementor/frontend/init', function() {
    elementorFrontend.hooks.addAction('frontend/element_ready/haru-icon-list.default', HaruIconListHandler);
});

//# sourceURL=webpack:///./src/js/modules/icon-list.js?