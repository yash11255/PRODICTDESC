var HaruWooSearchHandler = function HaruWooSearchHandler($scope, $) {
    var $currentSearch = $scope.find('.haru-woo-search__form');
    var $currentSearchToggle = $scope.find('.haru-woo-search__toggle');

    $currentSearchToggle.on('click', function() {
        var popup_effect = $(this).data('effect');

        // Issues fixed element changed position: https://github.com/dimsemenov/Magnific-Popup/issues/615
        $(this).magnificPopup({
            items: {
                src: $currentSearch,
                type: 'inline'
            },
            removalDelay: 500, //delay removal by X to allow out-animation
            callbacks: {
                beforeOpen: function beforeOpen() {
                    this.st.mainClass = 'haru-woo-search__popup ' + popup_effect;
                },
                beforeClose: function beforeClose() {
                    //
                }
            },
            fixedContentPos: true
            // (optionally) other options
        }).magnificPopup('open');
    });

    if ($currentSearch.hasClass('ajax-search')) {

        // Process keyword
        var HaruWooSearch_ajax_callback = function HaruWooSearch_ajax_callback($currentSearch) {
            var keyword = $('.haru-woo-search__input', $currentSearch).val();
            var search_count = $currentSearch.attr('data-search-count');

            if (keyword.length < 3) {
                var hint_message = $currentSearch.attr('data-hint-message');

                $('.haru-woo-search__ajax-result', $currentSearch).html('<ul><li class="search-no-result">' + hint_message + '</li></ul>');
                return;
            }
            // Process icon-search
            $('.haru-woo-search__icon', $currentSearch).addClass('loading-search'); // Move to
            if (!$('.haru-woo-search__icon .fa-spin', $currentSearch).length > 0) {
                $('.haru-woo-search__icon', $currentSearch).append('<i class="fa-spinner fa fa-spin"></i>');
            }

            // Process icon-submit
            $('.haru-woo-search__submit', $currentSearch).addClass('loading-search'); // Move to
            if (!$('.haru-woo-search__submit .fa-spin', $currentSearch).length > 0) {
                $('.haru-woo-search__submit', $currentSearch).append('<i class="fa-spinner fa fa-spin"></i>');
            }

            // Ajax result
            $.ajax({
                type: 'POST',
                data: 'action=haru_woo_search_ajax&keyword=' + keyword + '&search_count=' + search_count,
                url: haru_pricom_ajax_url,
                success: function success(data) {
                    $('.haru-woo-search__icon', $currentSearch).removeClass('loading-search');
                    $('.haru-woo-search__submit', $currentSearch).removeClass('loading-search');

                    if (data) {
                        $('.haru-woo-search__ajax-result', $currentSearch).html(data);
                        $('.haru-woo-search__ajax-result', $currentSearch).scrollTop(0);
                    }

                    // Click product
                    var $item = $('li.product-search-item', $currentSearch);

                    $item.on('click', function() {
                        window.location = $item.find('a').attr('href');
                    });
                },
                error: function error(data) {
                    $('.haru-woo-search__icon', $currentSearch).removeClass('loading-search');
                    $('.haru-woo-search__submit', $currentSearch).removeClass('loading-search');
                }
            });
        };

        var HaruWooSearch_search_up = function HaruWooSearch_search_up($currentSearch) {
            var $item = $('li.selected', $currentSearch);

            if ($('li', $currentSearch).length < 2) return; // Only one item
            var $prev_item = $item.prev();

            $item.removeClass('selected');
            if ($prev_item.length) {
                $prev_item.addClass('selected');
            } else {
                $('li:last', $currentSearch).addClass('selected');
                $prev_item = $('li:last', $currentSearch);
            }
            if ($prev_item.position().top < $('.haru-woo-search__ajax-result', $currentSearch).scrollTop()) {
                $('.haru-woo-search__ajax-result', $currentSearch).scrollTop($prev_item.position().top);
            } else if ($prev_item.position().top + $prev_item.outerHeight() > $('.haru-woo-search__ajax-result', $currentSearch).scrollTop() + $('.haru-woo-search__ajax-result', $currentSearch).height()) {
                $('.haru-woo-search__ajax-result', $currentSearch).scrollTop($prev_item.position().top - $('.haru-woo-search__ajax-result', $currentSearch).height() + $prev_item.outerHeight());
            }
        };

        var HaruWooSearch_search_down = function HaruWooSearch_search_down($currentSearch) {
            var $item = $('li.selected', $currentSearch);

            if ($('li', $currentSearch).length < 2) return; // Only one item
            var $next_item = $item.next();

            $item.removeClass('selected');
            if ($next_item.length) {
                $next_item.addClass('selected');
            } else {
                $('li:first', $currentSearch).addClass('selected');
                $next_item = $('li:first', $currentSearch);
            }
            if ($next_item.position().top < $('.haru-woo-search__ajax-result', $currentSearch).scrollTop()) {
                $('.haru-woo-search__ajax-result', $currentSearch).scrollTop($next_item.position().top);
            } else if ($next_item.position().top + $next_item.outerHeight() > $('.haru-woo-search__ajax-result', $currentSearch).scrollTop() + $('.haru-woo-search__ajax-result', $currentSearch).height()) {
                $('.haru-woo-search__ajax-result', $currentSearch).scrollTop($next_item.position().top - $('.haru-woo-search__ajax-result', $currentSearch).height() + $next_item.outerHeight());
            }
        };

        var HaruWooSearch_search_enter = function HaruWooSearch_search_enter($currentSearch) {
            var $item = $('li.selected a', $currentSearch);

            if ($item.length > 0) {
                window.location = $item.attr('href');
            }
        };

        // Clear or close all state when closed search
        $(document).on('click', function(e) {
            // Enter trigger click then submit so need timeout
            setTimeout(function() {
                if ($(e.target).closest('.haru-woo-search__ajax-result', $currentSearch).length == 0) {
                    $currentSearch.find('.haru-woo-search__ajax-result').html('');
                    $currentSearch.find('.haru-woo-search__input').val('');
                }
            }, 100);
        });

        // Don't allow submit form
        $currentSearch.find('.haru-woo-search__form ').on('submit', function() {
            return false;
        });

        // Process when typing
        $currentSearch.find('.haru-woo-search__input').on('keyup', function(e) {
            var s_timeOut_search = null;

            if (e.altKey || e.ctrlKey || e.shiftKey || e.metaKey) {
                return;
            }

            var keys = ['Control', 'Alt', 'Shift'];
            if (keys.indexOf(e.key) != -1) return;
            switch (e.which) {
                case 27:
                    // Press ESC key
                    $('.haru-woo-search__ajax-result', $currentSearch).html('');
                    $(this).val('');
                    break;
                case 38:
                    // Press UP key
                    HaruWooSearch_search_up($currentSearch);
                    break;
                case 40:
                    // Press DOWN key
                    HaruWooSearch_search_down($currentSearch);
                    break;
                case 13:
                    // Press ENTER key
                    var $item = $('li.selected a', $currentSearch);
                    if ($item.length == 0) {
                        e.preventDefault();
                        return false;
                    }
                    HaruWooSearch_search_enter($currentSearch);
                    break;
                default:
                    clearTimeout(s_timeOut_search);
                    s_timeOut_search = setTimeout(function() {
                        HaruWooSearch_ajax_callback($currentSearch);
                    }, 1000);
                    break;
            }
        });
    }
};

jQuery(window).on('elementor/frontend/init', function() {
    elementorFrontend.hooks.addAction('frontend/element_ready/haru-woo-search.default', HaruWooSearchHandler);
});

//# sourceURL=webpack:///./src/js/modules/woo-search.js?