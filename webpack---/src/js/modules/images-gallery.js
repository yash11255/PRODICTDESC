var HaruImagesGalleryHandler = function HaruImagesGalleryHandler($scope, $) {
    var $currentImagesGallery = $scope.find('.haru-images-gallery');

    if ($currentImagesGallery.find('.haru-slick').length > 0) {
        $currentImagesGallery.find('.haru-slick').each(function(index) {
            $(this).slick();
        });
    }

    $currentImagesGallery.find('.gallery-popup-link').magnificPopup({
        type: 'image',
        gallery: {
            enabled: true
        }
        // other options
    });
};

jQuery(window).on('elementor/frontend/init', function() {
    elementorFrontend.hooks.addAction('frontend/element_ready/haru-images-gallery.default', HaruImagesGalleryHandler);
});

//# sourceURL=webpack:///./src/js/modules/images-gallery.js?