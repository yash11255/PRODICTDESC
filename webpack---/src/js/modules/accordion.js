var HaruAccordionHandler = function HaruAccordionHandler($scope, $) {
    var $currentAccordion = $scope.find('.haru-accordion');

    setTimeout(function() {
        $currentAccordion.find('.haru-tab-content:not(.active)').hide();
    }, 100);

    $currentAccordion.find('.haru-tab-title').on('click', function(e) {
        e.preventDefault();

        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
            $(this).parent().find('.haru-tab-content').removeClass('active').slideUp(300);
        } else {
            $(this).addClass('active');
            $(this).parent().find('.haru-tab-content').addClass('active').slideDown(300);

            console.log($(this).closest('.haru-accordion').children('.haru-accordion-item'));

            $(this).parent().siblings('.haru-accordion-item').find('.haru-tab-title').removeClass('active');
            $(this).parent().siblings('.haru-accordion-item').find('.haru-tab-content').removeClass('active').slideUp(300);
        }
    });
};

jQuery(window).on('elementor/frontend/init', function() {
    elementorFrontend.hooks.addAction('frontend/element_ready/haru-accordion.default', HaruAccordionHandler);
});

//# sourceURL=webpack:///./src/js/modules/accordion.js?