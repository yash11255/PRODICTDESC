var HaruLaylaSlideshowHandler = function HaruLaylaSlideshowHandler($scope, $) {
    var $element = $scope.find('.haru-layla-slideshow'),
        $slideImgsWrapper = $element.find('.slide-img-wrap'),
        $slideImgs = $element.find('.slide-img'),
        $titleWrapper = $element.find('.title-wrap'),
        $slideTitles = $element.find('.title-wrap .slide-title'),
        $counterProject = $element.find('.project-counter .counter'),
        $bulletWrapper = $element.find('.bullet-wrap');

    $slideImgs.find('img').each(function() {
        var srcLoad = $(this).attr('data-src');
        $(this).attr('src', srcLoad);
    });

    $slideTitles.find('a').on('mouseenter', function(e) {
        var $atitle = $(this),
            $title = $atitle.closest('.slide-title'),
            id = $title.attr('data-id'),
            $toActiveImg = $slideImgs.filter(':nth-child(' + id + ')'),
            slider_type = $element.data('slider-type');

        $slideTitles.removeClass('active');

        $title.addClass('active');

        $slideImgs.removeClass('active');
        $toActiveImg.addClass('active');

        if (slider_type == 'videos') {
            $toActiveImg.find('video')[0].play();
        }

        $counterProject.html(id);

        // Bullet active
        $bulletWrapper.find('.slide-bullet[data-id="' + id + '"]').addClass('active').siblings('.slide-bullet').removeClass('active');
    });

    // Bullet Click
    $bulletWrapper.find('.slide-bullet ').on('touchstart click', function(event) {
        preIndex = parseInt($bulletWrapper.find('.slide-bullet.active').attr('data-id'));
        counterIndex = parseInt($(this).attr('data-id'));

        $(this).addClass('active').siblings('.slide-bullet').removeClass('active');

        $titleWrapper.find('.slide-title[data-id="' + counterIndex + '"] a').trigger('mouseenter');
        // May be smooth scroll, check long text issue
        var title_height = $titleWrapper.find('.slide-title').height();
        $titleWrapper[0].scrollTop = title_height * (counterIndex - 1);
    });

    if (window.matchMedia('screen and ( max-width: 991px )').matches) {
        $slideTitles.find('a').attr('onClick', 'return false');
        $slideTitles.find('a').on('click', function() {
            $slideTitles.find('a').attr('onClick', 'return false');
            if ($(this).parent().hasClass('active')) $(this).attr('onClick', '');
            else {
                $(this).attr('onClick', 'return false');
            }
        });
    }

    $element.find('.slide-title').addClass('animate__hanimated animate__hfadeInUp');
    $element.find('.slide-title').css('animation-duration', '0.5s');
};

jQuery(window).on('elementor/frontend/init', function() {
    elementorFrontend.hooks.addAction('frontend/element_ready/haru-layla-slideshow.default', HaruLaylaSlideshowHandler);
});

//# sourceURL=webpack:///./src/js/modules/layla-slideshow.js?