var HaruRomeoSlideshowHandler = function HaruRomeoSlideshowHandler($scope, $) {
    var $element = $scope.find('.haru-romeo-slideshow');

    if ($($element).length > 0) {
        var processScroll = function processScroll(e) {
            var $toActivate = $titleWrapper.find('.slide-title:eq(' + counterIndex + ')');
            $element.attr('data-counter-index', counterIndex);
            $toActivate.find('a').trigger('romeo-active-title');
        };

        var processClick = function processClick(e) {
            var $toActivate = $titleWrapper.find('.slide-title:eq(' + counterIndex + ')');
            $element.attr('data-counter-index', counterIndex);
            $toActivate.find('a').trigger('romeo-active-title');

            // Process position of title May be check height not fix 100
            $titleWrapper[0].scrollTop = 100 * counterIndex - 200;
        };

        ;
        $slideImgsWrapper = $element.find('.slide-img-wrap'), $slideImgs = $element.find('.slide-img'), $bulletWrapper = $element.find('.bullet-wrap'), $titleWrapper = $element.find('.title-wrap'), $slideTitles = $element.find('.title-wrap .slide-title'), $counterProject = $element.find('.project-counter .counter');

        // Setup isScrolling variable
        var scrollDebounce = true;
        var counterIndex = 2;
        var timeout, anim;
        var preIndex = null;

        if (window.matchMedia('screen and ( min-width: 992px )').matches) {
            // Listen for scroll events
            window.addEventListener('wheel', function(event) {
                if (timeout) {
                    clearTimeout(timeout);
                    window.cancelAnimationFrame(anim);
                }

                timeout = setTimeout(function() {
                    anim = window.requestAnimationFrame(function() {
                        counterIndex = event.deltaY < 0 ? counterIndex - 1 : counterIndex + 1;

                        if (counterIndex < 0) counterIndex = 0;
                        if (counterIndex > $slideTitles.length - 1) counterIndex = $slideTitles.length - 1;

                        processScroll(event);
                        $titleWrapper[0].scrollTop = 100 * counterIndex - 200;
                    });
                }, 100);
            }, false);
        }

        $slideImgs.find('img').each(function() {
            var srcLoad = $(this).attr('data-src');
            $(this).attr('src', srcLoad);
        });

        $slideTitles.find('a').on('romeo-active-title', function(e) {
            var $atitle = $(this),
                $title = $atitle.closest('.slide-title'),
                id = $title.attr('data-id'),
                slider_type = $element.attr('data-slider-type'),
                $toActiveImg = $slideImgs.filter(':eq(' + id + ')');

            $slideTitles.removeClass('active');
            $title.addClass('active');

            $slideImgs.removeClass('active');
            $toActiveImg.addClass('active');

            if (slider_type == 'videos') {
                $slideImgs.find('video').each(function() {
                    var video = $(this)[0];
                    video.pause();
                });
                $toActiveImg.find('video')[0].play();
            }

            $counterProject.html(parseInt(id) + 1);

            // Bullet active
            $bulletWrapper.find('.slide-bullet[data-id="' + id + '"]').addClass('active').siblings('.slide-bullet').removeClass('active');
        });

        // if ($(window).width() < 991) {
        if (window.matchMedia('screen and ( max-width: 991px )').matches) {
            $slideTitles.find('a').attr('onClick', 'return false');
            $slideTitles.find('a').on('click', function() {
                $slideTitles.find('a').attr('onClick', 'return false');
                if (!$(this).parent().hasClass('active')) {
                    $(this).attr('onClick', '');
                    $(this).trigger('romeo-active-title');
                } else {
                    $(this).attr('onClick', 'return false');
                }
            });
        }

        // Bullet Click
        $bulletWrapper.find('.slide-bullet ').on('touchstart click', function(event) {
            // alert('bullet')
            preIndex = parseInt($bulletWrapper.find('.slide-bullet.active').attr('data-id'));
            counterIndex = parseInt($(this).attr('data-id'));
            processClick(event);

            $(this).addClass('active').siblings('.slide-bullet').removeClass('active');
        });
    }
};

jQuery(window).on('elementor/frontend/init', function() {
    elementorFrontend.hooks.addAction('frontend/element_ready/haru-romeo-slideshow.default', HaruRomeoSlideshowHandler);
});

//# sourceURL=webpack:///./src/js/modules/romeo-slideshow.js?