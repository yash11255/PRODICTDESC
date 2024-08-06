var HaruTestimonialHandler = function HaruTestimonialHandler($scope, $) {
    var $currentTestimonial = $scope.find('.haru-testimonial');

    if ($($currentTestimonial).find('.haru-slick').length > 0) {
        $currentTestimonial.find('.haru-slick').each(function(index) {
            $(this).slick();
        });
    }

    if ($($currentTestimonial).hasClass('haru-testimonial--scroll')) {
        // https://codepen.io/jonathan/pen/vDhKE
        // https://greensock.com/docs/v2/TimelineMax

        // speed of ticker
        var tickerSpeed = $currentTestimonial.attr('data-speed');
        var flickity = null;
        var isPaused = false;
        var testimonialID = $currentTestimonial.attr('data-id');
        var rtl = $currentTestimonial.attr('data-rtl') == 'yes' ? true : false;
        var testimonialEl = document.getElementById(testimonialID);

        // functions
        var update = function update() {
            if (isPaused) return;
            if (flickity.slides) {
                flickity.x = (flickity.x - tickerSpeed) % flickity.slideableWidth;
                flickity.selectedIndex = flickity.dragEndRestingSelect();
                flickity.updateSelectedSlide();
                flickity.settle(flickity.x);
            }
            window.requestAnimationFrame(update);
        };

        var pause = function pause() {
            isPaused = true;
        };

        var play = function play() {
            if (isPaused) {
                isPaused = false;
                window.requestAnimationFrame(update);
            }
        };

        // create flickity instance
        flickity = new Flickity(testimonialEl, {
            cellAlign: 'left',
            setGallerySize: true,
            dragThreshold: 25,
            pageDots: false,
            prevNextButtons: false,
            autoPlay: false,
            draggable: true,
            wrapAround: true,
            selectedAttraction: 0.015,
            friction: 0.25,
            rightToLeft: rtl
        });
        flickity.x = 0;

        // event listeners
        testimonialEl.addEventListener('mouseenter', pause, false);
        testimonialEl.addEventListener('focusin', pause, false);
        testimonialEl.addEventListener('mouseleave', play, false);
        testimonialEl.addEventListener('focusout', play, false);

        flickity.on('dragStart', function() {
            isPaused = true;
        });

        // start ticker
        update();
    }
};

jQuery(window).on('elementor/frontend/init', function() {
    elementorFrontend.hooks.addAction('frontend/element_ready/haru-testimonial.default', HaruTestimonialHandler);
});

//# sourceURL=webpack:///./src/js/modules/testimonial.js?