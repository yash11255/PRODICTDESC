jQuery(document).ready(function($) {

    // Get where to show uploader
    var showUploaderIn = dnd_wc_uploader.show_uploader_in;

    // Setup drag n drop function
    window.initWcDragDrop = function() {

        // Get text object options/settings from localize script
        var TextOJB = dnd_wc_uploader.drag_n_drop_upload;
        var uploaderForm = (showUploaderIn == 'checkout' ? $('form.checkout') : $('form.cart'));

        var dnd_options = {
            'is_pro': true,
            'form': uploaderForm,
            'color': '#fff',
            'ajax_url': dnd_wc_uploader.ajax_url,
            'text': TextOJB.text,
            'separator': TextOJB.or_separator,
            'button_text': TextOJB.browse,
            'server_max_error': TextOJB.server_max_error,

            'parallel_uploads': dnd_wc_uploader.parallel_uploads,
            'chunks': dnd_wc_uploader.chunks,
            'chunk_size': dnd_wc_uploader.chunk_size,
            'max_total_size': dnd_wc_uploader.max_total_size,

            'err_message': {
                'maxNumFiles': dnd_wc_uploader.err_message.maxNumFiles,
                'maxTotalSize': dnd_wc_uploader.err_message.maxTotalSize,
                'maxUploadLimit': dnd_wc_uploader.err_message.maxUploadLimit
            },

            //@description: upload is in progress
            'in_progress': function(form_handler, queue, data) {

                // Get submit btn
                var cartBtn = $('button[type="submit"]', form_handler);

                // Disable submit button
                if (cartBtn.length > 0) {
                    cartBtn.addClass('disable').prop("disabled", true);
                }

                // Custom events in progress
                dndmfu_trigger_event('.wc-drag-n-drop-file', 'in_progress', data);
            },

            // @description: single queue file upload is complete
            'on_success': function(progressBar, response, fieldName, Record) {

                // Progressbar Object ID
                var progressDetails = $('#' + progressBar);
                //var cartBtn = $('button[type="submit"]', showUploderIn);

                if (response.data.preview) { // Show preview image

                    var image__thumbnail = $('.dnd-upload-image', progressDetails);

                    if (!response.data.show_thumbnail) {
                        image__thumbnail.addClass('no-bg no-thumbnail').append('<img title="' + response.data.file + '" src="' + response.data.preview + '">');
                    } else {
                        // Image Preview image
                        image__thumbnail.removeClass('no-bg').addClass('has-bg');

                        if (!response.data.is_image) {
                            image__thumbnail.addClass('unsupported-image').append('<img title="' + response.data.file + '" src="' + response.data.preview + '">');
                            $('.dnd-upload-image', progressDetails).append('<span class="cd-ext">.' + response.data.ext + '</span>')
                        }

                        // append to preview container.
                        progressDetails.appendTo('.codedropz--preview');

                        // Adjust thumbnail width & height
                        image__thumbnail.height(image__thumbnail.outerWidth() - $('span.name', progressDetails).outerHeight());

                    }

                    progressDetails.find('.dnd-upload-image').fadeIn();

                    // For PDF
                    if (dnd_wc_uploader.pdf_settings.enable == 'yes' && response.data.ext == 'pdf') {
                        var pdfInfo = dnd_wc_uploader.pdf_settings;
                        var pdfName = pdfInfo.text.replace('%filename', response.data.file);
                        var pdfText = pdfName.replace('%pagecount', response.data.total_pages);
                        $(pdfInfo.append_to).append(
                            '<span style="display:block;" pdf-index="' + response.data.index + '">' + pdfText + '</strong></span>'
                        );
                    }

                }

                // Custom event - on success
                dndmfu_trigger_event('.wc-drag-n-drop-file', 'on_success', Record);

                // If there's custom element (name, id, class)
                if (dnd_wc_uploader.cart_btn) {
                    //cartBtn = $(dnd_wc_uploader.cart_btn);
                }

                // Append hidden input field
                uploaderForm.append('<input type="hidden" data-index="' + progressBar + '" name="' + fieldName + '[' + progressBar + ']" value="' + response.data.path + response.data.file + '">');

                // Update Counter
                $('.dnd-upload-counter span').text(Record.uploaded);

            },

            // Hooks after file deletion
            'after_deleted': function(file_index, Record) {

                if (!file_index) {
                    return;
                }

                // remove appended pdf text info
                if ($('[pdf-index="' + file_index + '"]').length > 0) {
                    $('[pdf-index="' + file_index + '"]').remove();
                }
                console.log(Record);

                // Custom event - after deleted
                dndmfu_trigger_event('.wc-drag-n-drop-file', 'after_deleted', Record);
            },

            // @description: all queued files has been completed
            'completed': function(form_handler, name, data) {
                // If it's complete remove disabled attribute in button
                if ($('.in-progress', $('.codedropz-upload-wrapper')).length === 0) {
                    $('button[type="submit"]', form_handler).removeAttr('disabled');

                    // If checkout page
                    if (dnd_wc_uploader.show_uploader_in == 'checkout') {
                        $('body').trigger('update_checkout');
                    }

                    // Custom event - completed
                    dndmfu_trigger_event('.wc-drag-n-drop-file', 'completed', data);

                }
            }

        };

        // Initialize Plugin
        $('.wc-drag-n-drop-file').CodeDropz_Wc_Uploader(dnd_options);

    }

    // Custom event handler
    var dndmfu_trigger_event = function(target, name, data) {
        var event = new CustomEvent('dndmfu_' + name, {
            bubbles: true,
            detail: data
        });
        $(target).get(0).dispatchEvent(event);
    }

    // Get the parents form
    var parentsForm = (showUploaderIn == 'checkout' ? $('form.checkout') : $('form.cart'));

    // Add to cart btn - minimum file validation
    $('button[type="submit"]', parentsForm).on("click", function() {
        var $file = $('input.wc-drag-n-drop-file');
        if ($minimum_file = parseInt($file.data('min'))) {
            var $total_files = $('input[name^="' + $file.data('name') + '"]').length;
            var $error_msg = dnd_wc_uploader.drag_n_drop_upload.minimum_file;
            $('.codedropz-upload-wrapper').find('span.has-error-msg').hide().remove();
            if ($total_files > 0 && $total_files < $minimum_file) {
                $('.codedropz--results').after('<span class="has-error-msg">' + $error_msg.replace('%s', $minimum_file) + '</span>');
                return false;
            }
        }
    });

    // Initialize drag n drop plugin.
    window.initWcDragDrop();

    //@description : sample event call (change quantity to "total no" of uploaded files)
    document.addEventListener('dndmfu_completed', function(event) {
        var totalFile = event.detail.total;
        if (totalFile > 0 && dnd_wc_uploader.update_qty > 0) {
            jQuery('input[name="quantity"]').val(totalFile);
        }
    });

    //@description: reduce qty when file is deleted
    document.addEventListener('dndmfu_after_deleted', function(event) {
        var totalFile = event.detail.total;
        if (totalFile > 0 && dnd_wc_uploader.update_qty > 0) {
            jQuery('input[name="quantity"]').val(totalFile);
        }
    });

});