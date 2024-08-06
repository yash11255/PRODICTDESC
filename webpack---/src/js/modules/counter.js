var HaruCounterHandler = function HaruCounterHandler($scope, $) {
    var $currentCounter = $scope.find('.haru-counter');
    var $currentCounterNumber = $($currentCounter).find('.haru-counter__number');

    var duration = parseInt($currentCounterNumber.attr('data-duration'));
    var to = parseInt($currentCounterNumber.attr('data-to-value'));
    var from = parseInt($currentCounterNumber.attr('data-from-value'));
    var delimiter = $currentCounterNumber.attr('data-delimiter');

    // Appear
    if (!$('.gr-animated').length) return;

    $('.gr-animated').appear();

    $(document.body).on('appear', '.gr-animated', function() {
        $(this).addClass('go');
    });

    $(document.body).on('disappear', '.gr-animated', function() {
        // $(this).removeClass('go')
    });

    // Counter
    if (!$('.gr-number-counter').length) return;
    $('.gr-number-counter').appear(); // require jquery-appear

    $('body').on('appear', '.gr-number-counter', function() {
        var counter = $(this);
        if (!counter.hasClass('count-complete')) {
            $($currentCounterNumber).numerator({
                easing: 'swing',
                duration: duration,
                delimiter: delimiter,
                toValue: to,
                fromValue: delimiter,
                onComplete: function onComplete() {
                    counter.addClass('count-complete');
                }
            });
        }
    });

    $('body').on('disappear', '.gr-number-counter', function() {
        // $(this).removeClass('count-complete')
    });
};

jQuery(window).on('elementor/frontend/init', function() {
    elementorFrontend.hooks.addAction('frontend/element_ready/haru-counter.default', HaruCounterHandler);
});

//# sourceURL=webpack:///./src/js/modules/counter.js?