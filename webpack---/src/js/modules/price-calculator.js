var HaruPriceCalculatorHandler = function HaruPriceCalculatorHandler($scope, $) {
    var $currentPriceCalculator = $scope.find('.haru-price-calculator');
    // $currentPriceCalculatorId = '#' + $currentPriceCalculator.attr('id').toString()

    if ($currentPriceCalculator.hasClass('haru-price-calculator--style-1')) {
        var price_base = $currentPriceCalculator.find('.haru-price-calculator__item.active').first().data('price');
        var price_option = $currentPriceCalculator.find('.haru-price-calculator__option.active').first().data('price');
        var price_calculated = price_base + price_option;

        $currentPriceCalculator.find('.haru-price-calculator__price-calculated-value').text(price_calculated);
        $currentPriceCalculator.find('.haru-price-calculator__price-base-value').text(price_base);
        // console.log(price_base)
        // console.log(price_option)
        // console.log(price_calculated)

        $currentPriceCalculator.find('.haru-price-calculator__option').on('click', function(e) {
            e.preventDefault();

            if ($(this).hasClass('active')) {
                return;
            } else {
                $(this).addClass('active');

                $(this).siblings('.haru-price-calculator__option').removeClass('active');
            }

            var price_option_selected = $(this).data('price');
            var price_base_selected = $currentPriceCalculator.find('.haru-price-calculator__item.active').first().data('price');

            var price_selected = price_option_selected + price_base_selected;
            $currentPriceCalculator.find('.haru-price-calculator__price-calculated-value').text(price_selected);
        });

        $currentPriceCalculator.find('.haru-price-calculator__item').on('click', function(e) {
            e.preventDefault();

            if ($(this).hasClass('active')) {
                return;
            } else {
                $(this).addClass('active');

                $(this).siblings('.haru-price-calculator__item').removeClass('active');
            }

            var price_base_selected = $(this).data('price');
            var price_option_selected = $currentPriceCalculator.find('.haru-price-calculator__option.active').first().data('price');

            var price_selected = price_base_selected + price_option_selected;
            $currentPriceCalculator.find('.haru-price-calculator__price-calculated-value').text(price_selected);
            $currentPriceCalculator.find('.haru-price-calculator__price-base-value').text(price_base_selected);
        });
    }

    if ($currentPriceCalculator.hasClass('haru-price-calculator--style-2')) {
        var active_url = $currentPriceCalculator.find('.haru-price-calculator__item.active').first().data('url');
        var active_text = $currentPriceCalculator.find('.haru-price-calculator__item.active').first().data('url_text');
        var button_html = '';

        if (active_url.url) {
            button_html = '<a class="haru-button haru-button--style-1 haru-button--bg-primary haru-button--size-large haru-button--round-normal" href="' + active_url.url + '">' + active_text + '</a>';

            $currentPriceCalculator.find('.haru-price-calculator__button').html(button_html);
        }

        $currentPriceCalculator.find('.haru-price-calculator__item').on('click', function(e) {
            e.preventDefault();

            if ($(this).hasClass('active')) {
                return;
            } else {
                $(this).addClass('active');

                $(this).siblings('.haru-price-calculator__item').removeClass('active');
            }

            active_url = $(this).data('url');
            active_text = $(this).data('url_text');
            $currentPriceCalculator.find('.haru-price-calculator__button').html();

            if (active_url.url) {
                button_html = '<a class="haru-button haru-button--style-1 haru-button--bg-primary haru-button--size-large haru-button--round-normal" href="' + active_url.url + '">' + active_text + '</a>';

                $currentPriceCalculator.find('.haru-price-calculator__button').html(button_html);
            }
        });
    }
};

jQuery(window).on('elementor/frontend/init', function() {
    elementorFrontend.hooks.addAction('frontend/element_ready/haru-price-calculator.default', HaruPriceCalculatorHandler);
});

//# sourceURL=webpack:///./src/js/modules/price-calculator.js?