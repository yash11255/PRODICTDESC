var HaruTabHandler = function HaruTabHandler($scope, $) {
    var $currentTab = $scope.find('.haru-tab'),
        $currentTabId = '#' + $currentTab.attr('id').toString();

    $($currentTabId + ' .haru-tab__nav ul li').each(function(index) {
        if ($(this).hasClass('active-default')) {
            $($currentTabId + ' .haru-tab__nav > ul li').removeClass('active').addClass('inactive');
            $(this).removeClass('inactive');
        } else {
            if (index == 0) {
                $(this).removeClass('inactive').addClass('active');
            }
        }
    });

    $($currentTabId + ' .haru-tab__content div').each(function(index) {
        if ($(this).hasClass('active-default')) {
            $($currentTabId + ' .haru-tab__content > div').removeClass('active');
        } else {
            if (index == 0) {
                $(this).removeClass('inactive').addClass('active');
            }
        }
    });

    $($currentTabId + ' .haru-tab__nav ul li').click(function() {
        var currentTabIndex = $(this).index();
        var tabsContainer = $(this).closest('.haru-tab');
        var tabsNav = $(tabsContainer).children('.haru-tab__nav').children('ul').children('li');
        var tabsContent = $(tabsContainer).children('.haru-tab__content').children('div');
        $(this).parent('li').addClass('active');
        $(tabsNav).removeClass('active active-default').addClass('inactive');
        $(this).addClass('active').removeClass('inactive');
        $(tabsContent).removeClass('active').addClass('inactive');
        $(tabsContent).eq(currentTabIndex).addClass('active').removeClass('inactive');

        var $imagesGallery = tabsContent.eq(currentTabIndex).find('.haru-images-gallery');

        if ($imagesGallery.length) {
            var sectionTop = $imagesGallery.parents('.elementor-top-section');

            if (sectionTop.hasClass('elementor-section-stretched')) {
                var stretchElement = new elementorModules.frontend.tools.StretchElement({
                    element: sectionTop
                });
            }
        }

        tabsContent.eq(currentTabIndex).find('.elementor-top-section').each(function() {
            var $stretchSection = $(this);

            if ($stretchSection.hasClass('elementor-section-stretched')) {
                var stretchSection = new elementorModules.frontend.tools.StretchElement({
                    element: $stretchSection
                });

                stretchSection.stretch();
            }
        });

        $(tabsContent).eq(currentTabIndex).find('.haru-slick').each(function(index) {
            if ($(this).hasClass('slick-initialized')) {
                $(this).slick('destroy');
                $(this).slick();
            } else {
                $(this).slick();
            }
        });

        $(tabsContent).each(function(index) {
            $(this).removeClass('active-default');
        });
    });
};

jQuery(window).on('elementor/frontend/init', function() {
    elementorFrontend.hooks.addAction('frontend/element_ready/haru-tabs.default', HaruTabHandler);
});

//# sourceURL=webpack:///./src/js/modules/tab.js?