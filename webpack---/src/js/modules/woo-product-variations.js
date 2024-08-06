var HaruWooProductVariationsHandler = function HaruWooProductVariations($scope, $) {
    var $currentProductVariations = $scope.find('.haru-woo-product-variations');
    var $currentProductVariationsPopup = $scope.find('.product-variations-popup');
    var $currentProductVariationsBtn = $scope.find('.product-variations-btn');

    $currentProductVariationsBtn.on('click', function(e) {
        e.preventDefault();

        var popup_effect = $(this).data('effect');

        // Issues fixed element changed position: https://github.com/dimsemenov/Magnific-Popup/issues/615
        $(this).magnificPopup({
            items: {
                src: $currentProductVariationsPopup,
                type: 'inline'
            },
            removalDelay: 100, //delay removal by X to allow out-animation
            callbacks: {
                beforeOpen: function beforeOpen() {
                    this.st.mainClass = 'haru-woo-product-variations ' + popup_effect;
                },
                beforeClose: function beforeClose() {
                    //
                }
            },
            fixedContentPos: true
            // (optionally) other options
        }).magnificPopup('open');
    });

    var popup_id = $scope.find('.product-variations-btn').attr('data-popup-id');
    var current_step = 1;
    var next_step = 2;
    var prev_step = 0;
    var total_step = $('#' + popup_id + ' .variation-step-control').attr('data-total-step');
    var upload_step = 1;

    // Init
    $('#' + popup_id + ' .variation-slide-step[data-step="' + current_step + '"]').show();
    $('#' + popup_id + ' .variation-step-prev').addClass('disable');

    // Select file
    // $('input[type="file"].wc-drag-n-drop-file').on('change', function() {
    $(document).on('change', '#' + popup_id + ' input[type="file"].wc-drag-n-drop-file', function() {
        // console.log($(this).val())

        // setTimeout(function() {
        if ($(this).closest('.wc-dnd-file-upload').find('.codedropz--results .has-error').length > 0) {
            // console.log('error')
            $('#' + popup_id + ' .variation-step-next[data-next="' + (upload_step + 1) + '"]').addClass('disable');
        } else {
            // console.log('ok')
            $('#' + popup_id + ' .variation-step-next[data-next="' + (upload_step + 1) + '"]').removeClass('disable');
        }
        // }, 500)

        // Add then delete all then add -> BUG
    });

    $(document).on('click', '#' + popup_id + ' .remove-file', function() {
        // console.log('remove')

        // setTimeout(function() {
        if ($(this).closest('.wc-dnd-file-upload').find('.codedropz--results .has-error').length > 0) {
            // console.log('error')
            $('#' + popup_id + ' .variation-step-next[data-next="' + (upload_step + 1) + '"]').addClass('disable');
        } else {
            // console.log('ok')
            $('#' + popup_id + ' .variation-step-next[data-next="' + (upload_step + 1) + '"]').removeClass('disable');
        }
        // }, 500)

        setTimeout(function() {
            // Default is 2
            if ($currentProductVariationsPopup.find('.codedropz--results:empty').length > 0) {
                $('#' + popup_id + ' .variation-step-next[data-next="' + (upload_step + 1) + '"]').addClass('disable');
            }
        }, 500);
    });

    // Select attribute
    $('#' + popup_id + ' .variation-slide-step.slide-attribute').each(function() {
        var slide_attribute = $(this);
        var slide_current = '';

        // Default value
        if (slide_attribute.find('select').val()) {
            slide_attribute.addClass('variation-selected');

            if (slide_current == '1') {
                $('#' + popup_id + ' .variation-step-control').find('.variation-step-next').removeClass('disable');
            } else if (slide_current == parseInt(total_step)) {
                $('#' + popup_id + ' .variation-step-control');
                //   .find('.variation-step-next')
                //   .addClass('disable')
            } else {
                $('#' + popup_id + ' .variation-step-control').find('.variation-step-next').removeClass('disable');
            }
        }

        // Change value
        slide_attribute.find('select').on('change', function() {
            slide_current = slide_attribute.attr('data-step');
            // console.log(slide_current)

            if (this.value == '') {
                slide_attribute.removeClass('variation-selected');

                // console.log('no')
                if (slide_current == '1') {
                    $('#' + popup_id + ' .variation-step-control').find('.variation-step-next').addClass('disable');
                } else if (slide_current == parseInt(total_step)) {
                    // $('.variation-step-control')
                    //   .find('.variation-step-next')
                    //   .addClass('disable')
                } else {
                    // $('.variation-step-control')
                    //   .find('.variation-step-prev')
                    //   .removeClass('disable')

                    $('#' + popup_id + ' .variation-step-control').find('.variation-step-next').addClass('disable');
                }
            } else {
                slide_attribute.addClass('variation-selected');

                if (slide_current == '1') {
                    $('#' + popup_id + ' .variation-step-control').find('.variation-step-next').removeClass('disable');
                } else if (slide_current == parseInt(total_step)) {
                    $('#' + popup_id + ' .variation-step-control');
                    //   .find('.variation-step-next')
                    //   .addClass('disable')
                } else {
                    $('#' + popup_id + ' .variation-step-control').find('.variation-step-next').removeClass('disable');
                }
            }
        });
    });

    // Click Next
    $('#' + popup_id + ' .variation-step-next').on('click', function() {
        next_step = $(this).attr('data-next');

        $(this).attr('data-next', parseInt(next_step) + 1);
        $('#' + popup_id + ' .variation-slide-step').hide();
        $('#' + popup_id + ' .variation-slide-step[data-step="' + next_step + '"]').show();

        // Check if step already set
        if (!$('#' + popup_id + ' .variation-slide-step[data-step="' + next_step + '"]').hasClass('variation-selected')) {
            $(this).addClass('disable');
        }

        current_step = next_step;
        // console.log(current_step)

        // Step list
        $('#' + popup_id + ' .step-list li').removeClass('step-active');
        $('#' + popup_id + ' .step-list li[data-step="' + current_step + '"]').addClass('step-active');

        // Enable Prev
        if (current_step >= 2 && current_step < total_step) {
            $('#' + popup_id + ' .variation-step-prev').attr('data-prev', parseInt(current_step));
            $('#' + popup_id + ' .variation-step-prev').removeClass('disable');
        }

        // Check Show/Hide
        if (next_step < total_step) {
            $('#' + popup_id + ' .variation-step-next').attr('data-next', parseInt(current_step) + 1);

            $('#' + popup_id + ' .variation-step-prev').attr('data-prev', parseInt(current_step) - 1);
            $('#' + popup_id + ' .variation-step-prev').removeClass('disable');
        } else {
            $('#' + popup_id + ' .variation-step-next').attr('data-next', parseInt(current_step));
            $('#' + popup_id + ' .variation-step-next').addClass('disable');

            $('#' + popup_id + ' .variation-step-prev').attr('data-prev', parseInt(current_step) - 1);
            $('#' + popup_id + ' .variation-step-prev').removeClass('disable');
        }
    });

    // Click Prev
    $('#' + popup_id + ' .variation-step-prev').on('click', function() {
        prev_step = $(this).attr('data-prev');

        $('#' + popup_id + ' .variation-slide-step').hide();
        $('#' + popup_id + ' .variation-slide-step[data-step="' + prev_step + '"]').show();

        current_step = prev_step;
        // console.log(current_step)

        // Step list
        $('#' + popup_id + ' .step-list li').removeClass('step-active');
        $('#' + popup_id + ' .step-list li[data-step="' + current_step + '"]').addClass('step-active');

        // Check Show/Hide
        if (prev_step > 1) {
            $('#' + popup_id + ' .variation-step-prev').attr('data-prev', parseInt(current_step) - 1);

            $('#' + popup_id + ' .variation-step-next').attr('data-next', parseInt(current_step) + 1);
            $('#' + popup_id + ' .variation-step-next').removeClass('disable');
        } else {
            $('#' + popup_id + ' .variation-step-prev').attr('data-prev', parseInt(current_step));
            $('#' + popup_id + ' .variation-step-prev').addClass('disable');

            $('#' + popup_id + ' .variation-step-next').attr('data-next', parseInt(current_step) + 1);
            $('#' + popup_id + ' .variation-step-next').removeClass('disable');
        }
    });
};

jQuery(window).on('elementor/frontend/init', function() {
    elementorFrontend.hooks.addAction('frontend/element_ready/haru-woo-product-variations.default', HaruWooProductVariationsHandler);
});

//# sourceURL=webpack:///./src/js/modules/woo-product-variations.js?