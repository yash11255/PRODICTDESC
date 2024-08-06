var HaruTimelineHandler = function HaruTimelineHandler($scope, $) {
    var $currentTimeline = $scope.find('.haru-timeline');

    if ($($currentTimeline).length > 0) {
        $currentTimeline.each(function(index) {
            var timeline_content = $(this).find('.timeline-slider-nav');
            var timeline_thumb = $(this).find('.timeline-slider-for');

            timeline_content.slick();
            timeline_thumb.slick();
        });
    }
};

jQuery(window).on('elementor/frontend/init', function() {
    elementorFrontend.hooks.addAction('frontend/element_ready/haru-timeline.default', HaruTimelineHandler);
});

//# sourceURL=webpack:///./src/js/modules/timeline.js?