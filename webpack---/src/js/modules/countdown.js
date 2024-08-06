var HaruCountdownHandler = function HaruCountdownHandler($scope, $) {
    var $currentCounter = $scope.find('.haru-countdown');
    // var $currentCounterNumber = $($currentCounter).find('.haru-countdown__number')

    var counter_id = $currentCounter.attr('data-id');
    var date = $currentCounter.attr('data-date');
    var dategmt = $currentCounter.attr('data-dategmt');
    var strftime = $currentCounter.attr('data-strftime');

    $('#haru-countdown__content-' + counter_id).countdown(dategmt, function(event) {
        $(this).html(event.strftime(strftime));
    });
};

jQuery(window).on('elementor/frontend/init', function() {
    elementorFrontend.hooks.addAction('frontend/element_ready/haru-countdown.default', HaruCountdownHandler);
});

//# sourceURL=webpack:///./src/js/modules/countdown.js?