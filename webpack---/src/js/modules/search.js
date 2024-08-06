var HaruSearchHandler = function HaruSearchHandler($scope, $) {
    var $currentSearch = $scope.find('.haru-search');
    var $currentSearchToggle = $scope.find('.haru-search__toggle');

    $currentSearchToggle.on('click', function() {
        var popup_effect = $(this).data('effect');

        // Issues fixed element changed position: https://github.com/dimsemenov/Magnific-Popup/issues/615
        $(this).magnificPopup({
            items: {
                src: $currentSearch.find('.haru-search__form'),
                type: 'inline'
            },
            removalDelay: 500, //delay removal by X to allow out-animation
            callbacks: {
                beforeOpen: function beforeOpen() {
                    this.st.mainClass = 'haru-search__popup ' + popup_effect;
                },
                beforeClose: function beforeClose() {
                    //
                }
            },
            fixedContentPos: true
            // (optionally) other options
        }).magnificPopup('open');
    });
};

jQuery(window).on('elementor/frontend/init', function() {
    elementorFrontend.hooks.addAction('frontend/element_ready/haru-search.default', HaruSearchHandler);
});

//# sourceURL=webpack:///./src/js/modules/search.js?