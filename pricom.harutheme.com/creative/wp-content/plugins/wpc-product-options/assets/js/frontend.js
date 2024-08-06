'use strict';

(function($) {
    $(function() {
        // ready
        wpcpo_init();
    });

    $(document).on('woosq_loaded', function() {
        // quick view
        wpcpo_init();
    });

    $(document).on('found_variation', function(e, t) {
        if ($(e['target']).closest('.woosb-product').length ||
            $(e['target']).closest('.wooco-product').length ||
            $(e['target']).closest('.woobt-product').length ||
            $(e['target']).closest('.woofs-product').length ||
            $(e['target']).closest('.woosg-product').length) {
            return;
        }

        let $total = $(e['target']).closest('form.cart').find('.wpcpo-total');

        $total.attr('data-price', t['display_price']);

        wpcpo_update_total($total);
    });

    $(document).on('reset_data', function(e) {
        if ($(e['target']).closest('.woosb-product').length ||
            $(e['target']).closest('.wooco-product').length ||
            $(e['target']).closest('.woobt-product').length ||
            $(e['target']).closest('.woofs-product').length ||
            $(e['target']).closest('.woosg-product').length) {
            return;
        }

        let $total = $(e['target']).closest('form.cart').find('.wpcpo-total');

        $total.attr('data-price', $total.attr('data-o_price'));

        wpcpo_update_total($total);
    });

    $(document).on('woovr_selected', function(e, selected) {
        if ($(e['target']).closest('.woosb-product').length ||
            $(e['target']).closest('.wooco-product').length ||
            $(e['target']).closest('.woobt-product').length ||
            $(e['target']).closest('.woofs-product').length ||
            $(e['target']).closest('.woosg-product').length) {
            return;
        }

        let purchasable = selected.attr('data-purchasable'),
            $total = $(e['target']).closest('form.cart').find('.wpcpo-total');

        if (purchasable === 'yes') {
            $total.attr('data-price', selected.attr('data-price'));
        } else {
            $total.attr('data-price', $total.attr('data-o_price'));
        }

        wpcpo_update_total($total);
    });

    /* WPC Product Bundles */
    $(document).
    on('woosb_calc_price',
        function(e, total_sale, total, total_html, price_suffix, $wrap) {
            let wid = $wrap.attr('data-id'),
                $total = $('.wpcpo-total[data-product-id="' + wid + '"]');

            $total.attr('data-price', total_sale);

            wpcpo_update_total($total);
        });

    /* WPC Composite Products */
    $(document).
    on('wooco_calc_price',
        function(e, total, total_regular, total_html, $wrap) {
            let wid = $wrap.attr('data-id'),
                $total = $('.wpcpo-total[data-product-id="' + wid + '"]');

            $total.attr('data-price', total);

            wpcpo_update_total($total);
        });

    $(document).on('change', 'input.qty', function() {
        let $this = $(this);

        if ($this.closest('.woosb-product').length ||
            $this.closest('.wooco-product').length ||
            $this.closest('.woobt-product').length ||
            $this.closest('.woofs-product').length ||
            $this.closest('.woosg-product').length) {
            return;
        }

        wpcpo_update_total($this.closest('form.cart').find('.wpcpo-total'));
    });

    $(document).on('change input', '.wpcpo-option-field', function() {
        let $this = $(this),
            $option = $this.closest('.wpcpo-option');

        // Limit Checkbox
        if ($this.is(':checkbox')) {
            let $inputsCheck = $option.find('input:checked'),
                countCheckbox = $inputsCheck.get();
            if (parseInt($option.data('limit')) > 0) {
                if (countCheckbox.length >= parseInt($option.data('limit'))) {
                    $option.find('input:checkbox:not(:checked)').attr('disabled', true);
                } else {
                    $option.find('input:checkbox').attr('disabled', false);
                }
                if (countCheckbox.length > parseInt($option.data('limit'))) {
                    $option.addClass('wpcpo-has-error');
                } else {
                    $option.removeClass('wpcpo-has-error');
                }
            }
        }

        // Required Checkbox & Radio
        if ($this.is(':checkbox') || $this.is(':radio')) {
            let $inputsCheck = $option.find('input:checked'),
                countCheckbox = $inputsCheck.get();
            if ($option.hasClass('wpcpo-required')) {
                if (countCheckbox.length > 0) {
                    $option.find('.wpcpo-option-field').removeAttr('required');
                    $option.removeClass('wpcpo-has-error');
                } else {
                    $option.find('.wpcpo-option-field').
                    attr('required', 'required');
                    $option.addClass('wpcpo-has-error');
                }
            }
        }

        if ($this.hasClass('field-select')) {
            let $wrapper = $this.closest('.form-row'),
                $option = $this.find(':selected'),
                label = $option.data('label'),
                type = $option.data('price-type'),
                price = $option.data('price'),
                custom_price = $option.data('price-custom');
            $wrapper.find('input[name$="label\]"]').attr('value', label);
            $wrapper.find('input[name$="price_type\]"]').attr('value', type);
            $wrapper.find('input[name$="price\]"]').attr('value', price);
            $wrapper.find('input[name$="custom_price\]"]').
            attr('value', custom_price);
        } else if ($this.hasClass('field-radio')) {
            let $wrapper = $this.closest('.form-row'),
                $option = $wrapper.find(':checked'),
                label = $option.data('label'),
                type = $option.data('price-type'),
                custom_price = $option.data('price-custom'),
                price = $option.data('price'),
                image = $option.data('image');
            $wrapper.find('input[name$="label\]"]').attr('value', label);
            $wrapper.find('input[name$="image\]"]').attr('value', image);
            $wrapper.find('input[name$="price_type\]"]').attr('value', type);
            $wrapper.find('input[name$="price\]"]').attr('value', price);
            $wrapper.find('input[name$="custom_price\]"]').
            attr('value', custom_price);
        }

        wpcpo_update_total($this.closest('form.cart').find('.wpcpo-total'));
    });

    $(document).on('blur', '.wpcpo-option-field', function() {
        let $this = $(this),
            $option = $this.closest('.wpcpo-option');

        if (!$this.prop('required')) {
            return;
        }

        if ($this.val() === '') {
            $option.addClass('wpcpo-has-error');
        } else {
            $option.removeClass('wpcpo-has-error');
        }
    });

    $(document).on('keyup change', '.wpcpo-option-field', function() {
        if ($(this).attr('maxlength') > 0) {
            var value = $(this).val();
            var remaining = $(this).attr('maxlength') - value.length;

            $(this).
            next('.wpcpo-chars-remaining').
            find('span').
            text(remaining);
        }
    });
})(jQuery);

function wpcpo_round(value, decimals) {
    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}

function wpcpo_format_money(number, places, symbol, thousand, decimal) {
    number = number || 0;
    places = !isNaN((places = Math.abs(places))) ? places : 2;
    symbol = symbol !== undefined ? symbol : '$';
    thousand = thousand || ',';
    decimal = decimal || '.';

    var negative = number < 0 ? '-' : '',
        i = parseInt(
            (number = wpcpo_round(Math.abs(+number || 0), places).toFixed(places)),
            10) + '',
        j = 0;

    if (i.length > 3) {
        j = i.length % 3;
    }

    return (symbol + negative + (j ? i.substr(0, j) + thousand : '') +
        i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousand) + (places ?
            decimal +
            wpcpo_round(Math.abs(number - i), places).toFixed(places).slice(2) :
            ''));
}

function wpcpo_format_price(price) {
    var price_html = '<span class="woocommerce-Price-amount amount">';
    var price_formatted = wpcpo_format_money(price, wpcpo_vars.price_decimals, '',
        wpcpo_vars.price_thousand_separator, wpcpo_vars.price_decimal_separator);

    switch (wpcpo_vars.price_format) {
        case '%1$s%2$s':
            //left
            price_html += '<span class="woocommerce-Price-currencySymbol">' +
                wpcpo_vars.currency_symbol + '</span>' + price_formatted;
            break;
        case '%1$s %2$s':
            //left with space
            price_html += '<span class="woocommerce-Price-currencySymbol">' +
                wpcpo_vars.currency_symbol + '</span> ' + price_formatted;
            break;
        case '%2$s%1$s':
            //right
            price_html += price_formatted +
                '<span class="woocommerce-Price-currencySymbol">' +
                wpcpo_vars.currency_symbol + '</span>';
            break;
        case '%2$s %1$s':
            //right with space
            price_html += price_formatted +
                ' <span class="woocommerce-Price-currencySymbol">' +
                wpcpo_vars.currency_symbol + '</span>';
            break;
        default:
            //default
            price_html += '<span class="woocommerce-Price-currencySymbol">' +
                wpcpo_vars.currency_symbol + '</span> ' + price_formatted;
    }

    price_html += '</span>';

    return price_html;
}

function wpcpo_get_custom_price(
    custom_price, quantity, product_price, value, total = 0) {
    let length = value.length;
    let words = wpcpo_words_count(value);

    value = parseFloat(value.replace(/[^\d.]/g, ''));

    custom_price = custom_price.toLowerCase().
    replace(/(v|q|p|l|w|s)+/gi, function(match, tag, char) {
        switch (tag) {
            case 'q':
                return quantity;
            case 'p':
                return product_price;
            case 'l':
                return length;
            case 'w':
                return words;
            case 'v':
                return value === '' ? 1 : value;
            case 's':
                return total;
        }
    });

    try {
        custom_price = eval(custom_price.replace(/[^-()\d/*+.]/g, ''));
    } catch (e) {
        custom_price = 0;
    }

    if (isNaN(custom_price) || (custom_price === Infinity) ||
        (custom_price === -Infinity)) {
        custom_price = 0;
    }

    return custom_price;
}

function wpcpo_get_field_price($field, product_price, quantity = 1, total = 0) {
    let field_price = 0,
        type = $field.data('price-type'),
        price = $field.data('price'),
        custom_price = $field.data('price-custom'),
        value = $field.val();

    if ($field.hasClass('field-select')) {
        let $option = $field.find(':selected');
        type = $option.data('price-type');
        price = $option.data('price');
        custom_price = $option.data('price-custom');
    }

    switch (type) {
        case 'flat':
            if (isNaN(price)) {
                field_price = parseFloat(product_price) * parseFloat(price) / 100;
            } else {
                field_price = parseFloat(price);
            }

            break;
        case 'custom':
            field_price = wpcpo_get_custom_price(custom_price, quantity,
                product_price, value, total);

            break;
        default:
            // qty
            if (isNaN(price)) {
                field_price = parseFloat(product_price) * parseFloat(price) / 100 *
                    quantity;
            } else {
                field_price = parseFloat(price) * quantity;
            }

            break;
    }

    return field_price;
}

function wpcpo_update_total($total) {
    let qty = parseFloat(
            $total.closest('form.cart').find('.quantity .qty').val()),
        price = parseFloat($total.attr('data-price')),
        type = $total.data('type'),
        name = $total.data('product-name'),
        total = price * qty,
        fields = $total.closest('.wpcpo-wrapper').
    find('.wpcpo-option-field').
    get(), html = '',
        qty_string = wpcpo_vars.is_rtl ? wpcpo_vars.quantity_symbol + qty : qty +
        wpcpo_vars.quantity_symbol;

    html += '<ul>';
    html += `<li>
<div class="wpcpo-col1"><span>${qty_string}</span> ${name}</div>
<div class="wpcpo-col2"><strong><span class="amount">${wpcpo_format_price(
      price * qty)}</span></strong></div>
</li>`;

    for (let field of fields) {
        let $field = jQuery(field),
            enable_price = $field.data('enable-price'),
            $price_label = $field.closest('.wpcpo-option').
        find('.label-price-' + $field.attr('id')), value = $field.val();

        if ($field.is(':checkbox') || $field.is(':radio')) {
            if ($field.prop('checked')) {
                value = $field.data('label');
            } else {
                value = '';
            }
        }

        if ($field.is('select')) {
            value = $field.find('option:selected').data('label');
        }

        if (enable_price === 1 && value !== '') {
            $price_label.html(``);
            let field_price = wpcpo_get_field_price($field, price, qty, total);

            if (!isNaN(field_price)) {
                if (field_price !== 0) {
                    total += field_price;

                    if (field_price > 0) {
                        $price_label.html(`(+${wpcpo_format_price(field_price)})`);
                    } else {
                        $price_label.html(`(${wpcpo_format_price(field_price)})`);
                    }

                    html += `<li><div class="wpcpo-col1"><span>${$field.data(
              'title')}:</span> ${value}</div><div class="wpcpo-col2"><strong><span class="amount">${wpcpo_format_price(
              field_price)}</span></strong></div></li>`;
                } else {
                    html += `<li class="wpcpo-free"><div class="wpcpo-col1"><span>${$field.data(
              'title')}:</span> ${value}</div><div class="wpcpo-col2"><strong><span class="amount">${wpcpo_format_price(
              field_price)}</span></strong></div></li>`;
                }
            }
        } else {
            $price_label.html('');
        }
    }

    html += `<li class="wpcpo-subtotal">${wpcpo_vars.i18n_subtotal}<span class="amount">${wpcpo_format_price(
      total)}</span></li>`;
    html += '</ul>';

    $total.html(html);

    jQuery(document).trigger('wpcpo_update_total', [$total]);
}

function wpcpo_words_count(str) {
    return str.split(' ').filter(function(n) {
        return n != '';
    }).length;
}

function wpcpo_init() {
    if (jQuery('.wpcpo-color-picker').length) {
        jQuery('.wpcpo-color-picker').wpColorPicker({
            change: function(e, ui) {
                setTimeout(function() {
                    wpcpo_update_total(jQuery(e['target']).closest('.wpcpo-wrapper').find('.wpcpo-total'));
                }, 100);
            },
        });
    }

    jQuery('.wpcpo-date-picker').each(function() {
        var format = jQuery(this).attr('data-format');
        var block = jQuery(this).attr('data-block');
        var dpk_data = {
            dateFormat: format
        };

        if ((block !== undefined) && (block !== '')) {
            var block_dates = block.split(',');

            if (block_dates.includes('past')) {
                dpk_data.minDate = new Date();
            } else {
                if (block_dates.includes('future')) {
                    dpk_data.maxDate = new Date();
                }
            }

            dpk_data.onRenderCell = function onRenderCell(date, cellType) {
                if (cellType === 'day') {
                    const weekday = [
                        'sunday',
                        'monday',
                        'tuesday',
                        'wednesday',
                        'thursday',
                        'friday',
                        'saturday'
                    ];
                    var day_w = weekday[date.getDay()];
                    var day_f = (('0' + (date.getMonth() + 1)).slice(-2)) + '/' +
                        (('0' + date.getDate()).slice(-2)) + '/' + date.getFullYear();
                    var isDisabled = block_dates.includes(day_w) ||
                        block_dates.includes(day_f);

                    return {
                        disabled: isDisabled,
                    };
                }
            };
        }

        jQuery(this).wpcdpk(dpk_data);
    });

    jQuery('.wpcpo-time-picker').each(function() {
        var format = jQuery(this).attr('data-format');

        jQuery(this).
        wpcdpk({
            timeFormat: format,
            timepicker: true,
            onlyTimepicker: true,
            classes: 'only-time',
        });
    });

    jQuery('.wpcpo-date-time-picker').each(function() {
        var date_format = jQuery(this).attr('data-date_format');
        var time_format = jQuery(this).attr('data-time_format');

        jQuery(this).
        wpcdpk({
            dateFormat: date_format,
            timeFormat: time_format,
            timepicker: true,
        });
    });

    jQuery('.wpcpo-date-range-picker').each(function() {
        var format = jQuery(this).attr('data-format');

        jQuery(this).
        wpcdpk({
            range: true,
            dateFormat: format,
            multipleDatesSeparator: ' - '
        });
    });

    jQuery('.wpcpo-option-field').trigger('change');

    jQuery('.wpcpo-option-field').each(function() {
        if (jQuery(this).attr('maxlength') > 0) {
            jQuery(this).
            after('<small class="wpcpo-chars-remaining"><span>' +
                jQuery(this).attr('maxlength') + '</span> ' +
                wpcpo_vars.i18n_remaining + '</small>');
        }
    });

    jQuery('.wpcpo-total').each(function() {
        wpcpo_update_total(jQuery(this));
    });

    jQuery(document).trigger('wpcpo_init');
}