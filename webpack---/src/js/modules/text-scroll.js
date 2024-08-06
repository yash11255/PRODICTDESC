var HaruTextScrollHandler = function HaruTextScrollHandler($scope, $) {
    var $currentTextScroll = $scope.find('.haru-text-scroll');

    if ($($currentTextScroll).length > 0) {
        // https://codepen.io/jonathan/pen/vDhKE
        // https://greensock.com/docs/v2/TimelineMax

        // speed of ticker
        var tickerSpeed = $currentTextScroll.attr('data-speed');
        var flickity = null;
        var isPaused = false;
        var slideshowID = $currentTextScroll.attr('data-id');
        var rtl = $currentTextScroll.attr('data-rtl') == 'yes' ? true : false;
        var slideshowEl = document.getElementById(slideshowID);

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
        flickity = new Flickity(slideshowEl, {
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
        slideshowEl.addEventListener('mouseenter', pause, false);
        slideshowEl.addEventListener('focusin', pause, false);
        slideshowEl.addEventListener('mouseleave', play, false);
        slideshowEl.addEventListener('focusout', play, false);

        flickity.on('dragStart', function() {
            isPaused = true;
        });

        // start ticker
        update();

        // mega menu: https://github.com/metafizzy/flickity/issues/150
        if ($($currentTextScroll).closest('.menu-item-mega-menu').length > 0) {
            $($currentTextScroll).closest('.menu-item-mega-menu').on('mouseenter', function() {
                flickity.resize();
            });
        }
    }
};

jQuery(window).on('elementor/frontend/init', function() {
    elementorFrontend.hooks.addAction('frontend/element_ready/haru-text-scroll.default', HaruTextScrollHandler);
});

//# sourceURL=webpack:///./src/js/modules/text-scroll.js?