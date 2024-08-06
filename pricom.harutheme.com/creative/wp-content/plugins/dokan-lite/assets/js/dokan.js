(() => {
    var e, t;
    jQuery((function(e) {
            e(".tips").tooltip(), e("ul.order-status").on("click", "a.dokan-edit-status", (function(t) {
                return e(this).addClass("dokan-hide").closest("li").next("li").removeClass("dokan-hide"), !1
            })), e("ul.order-status").on("click", "a.dokan-cancel-status", (function(t) {
                return e(this).closest("li").addClass("dokan-hide").prev("li").find("a.dokan-edit-status").removeClass("dokan-hide"), !1
            })), e("form#dokan-order-status-form").on("submit", (function(t) {
                t.preventDefault();
                var a = e(this),
                    n = a.closest("li");
                n.block({
                    message: null,
                    overlayCSS: {
                        background: "#fff url(" + dokan.ajax_loader + ") no-repeat center",
                        opacity: .6
                    }
                }), e.post(dokan.ajaxurl, a.serialize(), (function(e) {
                    if (n.unblock(), e.success) {
                        var t = n.prev();
                        n.addClass("dokan-hide"), t.find("label").replaceWith(e.data), t.find("a.dokan-edit-status").removeClass("dokan-hide")
                    } else dokan_sweetalert(e.data, {
                        icon: "success"
                    })
                }))
            })), e("form#add-order-note").on("submit", (function(t) {
                if (t.preventDefault(), e("textarea#add-note-content").val()) return e("#dokan-order-notes").block({
                    message: null,
                    overlayCSS: {
                        background: "#fff url(" + dokan.ajax_loader + ") no-repeat center",
                        opacity: .6
                    }
                }), e.post(dokan.ajaxurl, e(this).serialize(), (function(t) {
                    e("ul.order_notes").prepend(t), e("#dokan-order-notes").unblock(), e("#add-note-content").val("")
                })), !1
            })), e("#dokan-order-notes").on("click", "a.delete_note", (function() {
                var t = e(this).closest("li.note");
                e("#dokan-order-notes").block({
                    message: null,
                    overlayCSS: {
                        background: "#fff url(" + dokan.ajax_loader + ") no-repeat center",
                        opacity: .6
                    }
                });
                var a = {
                    action: "dokan_delete_order_note",
                    note_id: e(t).attr("rel"),
                    security: e("#delete-note-security").val()
                };
                return e.post(dokan.ajaxurl, a, (function(a) {
                    e(t).remove(), e("#dokan-order-notes").unblock()
                })), !1
            })), e(".order_download_permissions").on("click", "button.grant_access", (function() {
                var t = e(this),
                    a = e("select.grant_access_id").val();
                if (a) {
                    e(".order_download_permissions").block({
                        message: null,
                        overlayCSS: {
                            background: "#fff url(" + dokan.ajax_loader + ") no-repeat center",
                            opacity: .6
                        }
                    });
                    var n = {
                        action: "dokan_grant_access_to_download",
                        product_ids: a,
                        loop: e(".order_download_permissions .panel").length,
                        order_id: t.data("order-id"),
                        security: t.data("nonce")
                    };
                    return e.post(dokan.ajaxurl, n, (function(t) {
                        t ? e("#accordion").append(t) : dokan_sweetalert(dokan.i18n_download_access, {
                            icon: "warning"
                        }), e(".datepicker").datepicker(), e(".order_download_permissions").unblock()
                    })), !1
                }
            })), e(".order_download_permissions").on("click", "button.revoke_access", (async function(t) {
                t.preventDefault();
                const a = await dokan_sweetalert(dokan.i18n_download_permission, {
                    action: "confirm",
                    icon: "warning"
                });
                if ("undefined" !== a && a.isConfirmed) {
                    var n = e(this),
                        o = n.closest(".dokan-panel"),
                        i = n.attr("rel").split(",")[0],
                        r = n.attr("rel").split(",")[1];
                    if (i > 0) {
                        e(o).block({
                            message: null,
                            overlayCSS: {
                                background: "#fff url(" + dokan.ajax_loader + ") no-repeat center",
                                opacity: .6
                            }
                        });
                        var d = {
                            action: "dokan_revoke_access_to_download",
                            product_id: i,
                            download_id: r,
                            order_id: n.data("order-id"),
                            permission_id: n.data("permission-id"),
                            security: n.data("nonce")
                        };
                        e.post(dokan.ajaxurl, d, (function(t) {
                            e(o).fadeOut("300", (function() {
                                e(o).remove()
                            }))
                        }))
                    } else e(o).fadeOut("300", (function() {
                        e(o).remove()
                    }))
                }
                return !1
            })), e("#grant_access_id").select2({
                allowClear: !0,
                minimumInputLength: 3,
                ajax: {
                    url: dokan.ajaxurl,
                    dataType: "json",
                    delay: 500,
                    data: function(e) {
                        return {
                            q: e.term,
                            action: "dokan_search_downloadable_products",
                            _nonce: dokan.search_downloadable_products_nonce,
                            page: e.page || 1
                        }
                    },
                    processResults: function(t) {
                        var a = [];
                        return t && e.each(t, (function(e, t) {
                            a.push({
                                id: e,
                                text: t
                            })
                        })), {
                            results: a,
                            pagination: {
                                more: 0 != a.length
                            }
                        }
                    },
                    cache: !0
                },
                language: {
                    errorLoading: function() {
                        return dokan.i18n_searching
                    },
                    inputTooLong: function(e) {
                        var t = e.input.length - e.maximum;
                        return 1 === t ? dokan.i18n_input_too_long_1 : dokan.i18n_input_too_long_n.replace("%qty%", t)
                    },
                    inputTooShort: function(e) {
                        var t = e.minimum - e.input.length;
                        return 1 === t ? dokan.i18n_input_too_short_1 : dokan.i18n_input_too_short_n.replace("%qty%", t)
                    },
                    loadingMore: function() {
                        return dokan.i18n_load_more
                    },
                    maximumSelected: function(e) {
                        return 1 === e.maximum ? dokan.i18n_selection_too_long_1 : dokan.i18n_selection_too_long_n.replace("%qty%", e.maximum)
                    },
                    noResults: function() {
                        return dokan.i18n_no_matches
                    },
                    searching: function() {
                        return dokan.i18n_searching
                    }
                }
            })
        })), e = jQuery, (t = {
            init: function() {
                let t = {
                        d: "dd",
                        D: "D",
                        j: "d",
                        l: "DD",
                        F: "MM",
                        m: "mm",
                        M: "M",
                        n: "m",
                        o: "yy",
                        Y: "yy",
                        y: "y"
                    },
                    a = 0,
                    n = "",
                    o = "";
                for (a = 0; a < dokan.i18n_date_format.length; a++) n = dokan.i18n_date_format[a], o += n in t ? t[n] : n;
                e("#shipped-date").datepicker({
                    dateFormat: o
                }), e("body").on("click", "#dokan-add-tracking-number", this.showTrackingForm), e("body").on("click", "#dokan-cancel-tracking-note", this.cancelTrackingForm), e("body").on("click", "#add-tracking-details", this.insertShippingTrackingInfo), e("#woocommerce-order-items").on("click", "button.refund-items", this.refund_items).on("click", ".cancel-action", this.cancel).on("click", "button.do-api-refund, button.do-manual-refund", this.refunds.do_refund).on("change", ".refund input.refund_line_total, .refund input.refund_line_tax", this.refunds.input_changed).on("change keyup", ".wc-order-refund-items #refund_amount", this.refunds.amount_changed).on("change", "input.refund_order_item_qty", this.refunds.refund_quantity_changed).on("keyup", ".woocommerce_order_items .split-input input:eq(0)", (function() {
                    var t = e(this).next();
                    ("" === t.val() || t.is(".match-total")) && t.val(e(this).val()).addClass("match-total")
                })).on("keyup", ".woocommerce_order_items .split-input input:eq(1)", (function() {
                    e(this).removeClass("match-total")
                }))
            },
            showTrackingForm: function(t) {
                t.preventDefault(), e(this).closest("div").find("form#add-shipping-tracking-form").slideDown(300, (function() {
                    e(this).removeClass("dokan-hide")
                }))
            },
            cancelTrackingForm: function(t) {
                t.preventDefault(), e(this).closest("form#add-shipping-tracking-form").slideUp(300, (function() {
                    e(this).addClass("dokan-hide")
                }))
            },
            insertShippingTrackingInfo: function(t) {
                t.preventDefault();
                var a = {
                    shipping_provider: e("#shipping_provider").val(),
                    shipping_number: e("#tracking_number").val(),
                    shipped_date: e("#shipped-date").val(),
                    action: e("#action").val(),
                    post_id: e("#post-id").val(),
                    security: e("#security").val()
                };
                return e("#dokan-order-notes").block({
                    message: null,
                    overlayCSS: {
                        background: "#fff url(" + dokan.ajax_loader + ") no-repeat center",
                        opacity: .6
                    }
                }), e.post(dokan.ajaxurl, a, (function(t) {
                    e("ul.order_notes").prepend(t), e("#dokan-order-notes").unblock(), e("form#add-shipping-tracking-form").find("input[type=text], textarea").val("")
                })), !1
            },
            block: function() {
                e("#woocommerce-order-items").block({
                    message: null,
                    overlayCSS: {
                        background: "#fff",
                        opacity: .6
                    }
                })
            },
            unblock: function() {
                e("#woocommerce-order-items").unblock()
            },
            reload_items: function() {
                var a = {
                    order_id: dokan_refund.post_id,
                    action: "dokan_load_order_items",
                    security: dokan_refund.order_item_nonce
                };
                t.block(), e.ajax({
                    url: dokan_refund.ajax_url,
                    data: a,
                    type: "POST",
                    success: function(t) {
                        e(".dokan-panel-default #woocommerce-order-items").empty(), e(".dokan-panel-default #woocommerce-order-items").append(t)
                    }
                })
            },
            refund_items: function() {
                return e("div.wc-order-refund-items").slideDown(), e("div.wc-order-bulk-actions").slideUp(), e("div.wc-order-totals-items").slideUp(), e("#woocommerce-order-items div.refund").show(), e(".wc-order-edit-line-item .wc-order-edit-line-item-actions").hide(), !1
            },
            cancel: function() {
                return e(this).closest("div.wc-order-data-row").slideUp(), e("div.wc-order-bulk-actions").slideDown(), e("div.wc-order-totals-items").slideDown(), e("#woocommerce-order-items div.refund").hide(), e(".wc-order-edit-line-item .wc-order-edit-line-item-actions").show(), "true" === e(this).attr("data-reload") && t.reload_items(), !1
            },
            refunds: {
                do_refund: async function() {
                    t.block();
                    const a = await dokan_sweetalert(dokan_refund.i18n_do_refund, {
                        action: "confirm",
                        icon: "warning"
                    });
                    if ("undefined" !== a && a.isConfirmed) {
                        var n = e("input#refund_amount").val(),
                            o = e("input#refund_reason").val(),
                            i = {},
                            r = {},
                            d = {};
                        e(".refund input.refund_order_item_qty").each((function(t, a) {
                            e(a).closest("tr").data("order_item_id") && a.value && (i[e(a).closest("tr").data("order_item_id")] = a.value)
                        })), e(".refund input.refund_line_total").each((function(t, a) {
                            e(a).closest("tr").data("order_item_id") && (r[e(a).closest("tr").data("order_item_id")] = accounting.unformat(a.value, dokan_refund.mon_decimal_point))
                        })), e(".refund input.refund_line_tax").each((function(t, a) {
                            if (e(a).closest("tr").data("order_item_id")) {
                                var n = e(a).data("tax_id");
                                d[e(a).closest("tr").data("order_item_id")] || (d[e(a).closest("tr").data("order_item_id")] = {}), d[e(a).closest("tr").data("order_item_id")][n] = accounting.unformat(a.value, dokan_refund.mon_decimal_point)
                            }
                        }));
                        var s = {
                            action: "dokan_refund_request",
                            order_id: dokan_refund.post_id,
                            refund_amount: n,
                            refund_reason: o,
                            line_item_qtys: JSON.stringify(i, null, ""),
                            line_item_totals: JSON.stringify(r, null, ""),
                            line_item_tax_totals: JSON.stringify(d, null, ""),
                            api_refund: e(this).is(".do-api-refund"),
                            restock_refunded_items: e("#restock_refunded_items:checked").length ? "true" : "false",
                            security: dokan_refund.order_item_nonce
                        };
                        e.post(dokan_refund.ajax_url, s, (function(e) {
                            e.data.message && dokan_sweetalert(e.data.message, {
                                icon: "success"
                            }), t.reload_items()
                        })).fail((function(a) {
                            var n = [];
                            if (a.responseJSON.data) {
                                var o = a.responseJSON.data;
                                e.isArray(o) ? n = a.responseJSON.data.map((function(e) {
                                    return e.message
                                })) : n.push(o)
                            }
                            dokan_sweetalert(n.join(" "), {
                                icon: "error"
                            }), t.unblock()
                        }))
                    } else t.unblock()
                },
                input_changed: function() {
                    var t = 0;
                    e(".woocommerce_order_items").find("tr.item, tr.fee, tr.shipping").each((function() {
                        e(this).find(".refund input:not(.refund_order_item_qty)").each((function(a, n) {
                            t += parseFloat(accounting.unformat(e(n).val() || 0, dokan_refund.mon_decimal_point))
                        }))
                    })), e("#refund_amount").val(accounting.formatNumber(t, dokan_refund.currency_format_num_decimals, "", dokan_refund.mon_decimal_point)).trigger("change")
                },
                amount_changed: function() {
                    var t = accounting.unformat(e(this).val(), dokan_refund.mon_decimal_point);
                    e("button .wc-order-refund-amount .amount").text(accounting.formatMoney(t, {
                        symbol: dokan_refund.currency_format_symbol,
                        decimal: dokan_refund.currency_format_decimal_sep,
                        thousand: dokan_refund.currency_format_thousand_sep,
                        precision: dokan_refund.currency_format_num_decimals,
                        format: dokan_refund.currency_format
                    }))
                },
                refund_quantity_changed: function() {
                    var t = e(this).closest("tr.item"),
                        a = t.find("input.quantity").val(),
                        n = e(this).val(),
                        o = e("input.line_total", t),
                        i = e("input.refund_line_total", t),
                        r = accounting.unformat(o.attr("data-total"), dokan_refund.mon_decimal_point) / a;
                    i.val(parseFloat(accounting.formatNumber(r * n, dokan_refund.rounding_precision, "")).toString().replace(".", dokan_refund.mon_decimal_point)).trigger("change"), e("td.line_tax", t).each((function() {
                        var t = e("input.line_tax", e(this)),
                            o = e("input.refund_line_tax", e(this)),
                            i = accounting.unformat(t.attr("data-total_tax"), dokan_refund.mon_decimal_point) / a;
                        if (0 < i) {
                            var r = "yes" === dokan_refund.round_at_subtotal,
                                d = dokan_refund[r ? "rounding_precision" : "currency_format_num_decimals"];
                            o.val(parseFloat(accounting.formatNumber(i * n, d, "")).toString().replace(".", dokan_refund.mon_decimal_point)).trigger("change")
                        } else o.val(0).trigger("change")
                    })), n > 0 ? e("#restock_refunded_items").closest("tr").show() : (e("#restock_refunded_items").closest("tr").hide(), e(".woocommerce_order_items input.refund_order_item_qty").each((function() {
                        e(this).val() > 0 && e("#restock_refunded_items").closest("tr").show()
                    }))), e(this).trigger("refund_quantity_changed")
                }
            }
        }).init(), e("#dokan-filter-customer").filter(":not(.enhanced)").each((function() {
            var t = {
                allowClear: !!e(this).data("allow_clear"),
                placeholder: e(this).data("placeholder"),
                minimumInputLength: e(this).data("minimum_input_length") ? e(this).data("minimum_input_length") : "1",
                escapeMarkup: function(e) {
                    return e
                },
                language: {
                    errorLoading: function() {
                        return dokan.i18n_searching
                    },
                    inputTooLong: function(e) {
                        var t = e.input.length - e.maximum;
                        return 1 === t ? dokan.i18n_input_too_long_1 : dokan.i18n_input_too_long_n.replace("%qty%", t)
                    },
                    inputTooShort: function(e) {
                        var t = e.minimum - e.input.length;
                        return 1 === t ? dokan.i18n_input_too_short_1 : dokan.i18n_input_too_short_n.replace("%qty%", t)
                    },
                    loadingMore: function() {
                        return dokan.i18n_load_more
                    },
                    maximumSelected: function(e) {
                        return 1 === e.maximum ? dokan.i18n_selection_too_long_1 : dokan.i18n_selection_too_long_n.replace("%qty%", e.maximum)
                    },
                    noResults: function() {
                        return dokan.i18n_no_matches
                    },
                    searching: function() {
                        return dokan.i18n_searching
                    }
                },
                ajax: {
                    url: dokan.ajaxurl,
                    dataType: "json",
                    delay: 1e3,
                    data: function(t) {
                        return {
                            term: t.term,
                            action: "dokan_json_search_vendor_customers",
                            security: dokan.search_customer_nonce,
                            exclude: e(this).data("exclude")
                        }
                    },
                    processResults: function(t) {
                        var a = [];
                        return t && e.each(t, (function(e, t) {
                            a.push({
                                id: e,
                                text: t
                            })
                        })), {
                            results: a
                        }
                    },
                    cache: !0
                }
            };
            if (e(this).select2(t).addClass("enhanced"), e(this).data("sortable")) {
                var a = e(this),
                    n = e(this).next(".select2-container").find("ul.select2-selection__rendered");
                n.sortable({
                    placeholder: "ui-state-highlight select2-selection__choice",
                    forcePlaceholderSize: !0,
                    items: "li:not(.select2-search__field)",
                    tolerance: "pointer",
                    stop: function() {
                        e(n.find(".select2-selection__choice").get().reverse()).each((function() {
                            var t = e(this).data("data").id,
                                n = a.find('option[value="' + t + '"]')[0];
                            a.prepend(n)
                        }))
                    }
                })
            }
        })),
        function(e) {
            e("#variants-holder"), e("#product_image_gallery"), e("#product_images_container ul.product_images");
            var t, a, n = {
                modal: !1,
                init: function() {
                    product_type = "simple", e(".product-edit-container").on("click", ".dokan-section-heading", this.toggleProductSection), e(".product-edit-container").on("click", "input[type=checkbox]#_downloadable", this.downloadable), e(".product-edit-container").on("click", "a.sale-schedule", this.showDiscountSchedule), e("body, #dokan-product-images").on("click", "a.add-product-images", this.gallery.addImages), e("body, #dokan-product-images").on("click", "a.action-delete", this.gallery.deleteImage), this.gallery.sortable(), e("body, .product-edit-container").on("click", "a.dokan-feat-image-btn", this.featuredImage.addImage), e("body, .product-edit-container").on("click", "a.dokan-remove-feat-image", this.featuredImage.removeImage), e("body, #variable_product_options").on("click", ".sale_schedule", this.saleSchedule), e("body, #variable_product_options").on("click", ".cancel_sale_schedule", this.cancelSchedule), e(".product-edit-container").on("change", "input[type=checkbox]#_manage_stock", this.showManageStock), e(".product-edit-container").on("click", "a.upload_file_button", this.fileDownloadable), e("body").on("click", "a.insert-file-row", (function() {
                        return e(this).closest("table").find("tbody").append(e(this).data("row")), !1
                    })), e("body").on("click", "a.dokan-product-delete", (function() {
                        return e(this).closest("tr").remove(), !1
                    })), e("body").on("submit", "form.dokan-product-edit-form", this.inputValidate), e(".dokan-product-listing").on("click", "a.dokan-add-new-product", this.addProductPopup), this.loadSelect2(), this.bindProductTagDropdown(), this.attribute.sortable(), this.checkProductPostboxToggle(), e(".product-edit-container .dokan-product-attribute-wrapper").on("click", "a.dokan-product-toggle-attribute, .dokan-product-attribute-heading", this.attribute.toggleAttribute), e(".product-edit-container .dokan-product-attribute-wrapper").on("click", "a.add_new_attribute", this.attribute.addNewAttribute), e(".product-edit-container .dokan-product-attribute-wrapper").on("keyup", "input.dokan-product-attribute-name", this.attribute.dynamicAttrNameChange), e(".dokan-product-attribute-wrapper ul.dokan-attribute-option-list").on("click", "button.dokan-select-all-attributes", this.attribute.selectAllAttr), e(".dokan-product-attribute-wrapper ul.dokan-attribute-option-list").on("click", "button.dokan-select-no-attributes", this.attribute.selectNoneAttr), e(".dokan-product-attribute-wrapper ul.dokan-attribute-option-list").on("click", "button.dokan-add-new-attribute", this.attribute.addNewExtraAttr), e(".product-edit-container .dokan-product-attribute-wrapper").on("click", "a.dokan-product-remove-attribute", this.attribute.removeAttribute), e(".product-edit-container .dokan-product-attribute-wrapper").on("click", "a.dokan-save-attribute", this.attribute.saveAttribute), e("body").on("click", '.product-container-footer input[type="submit"]', this.createNewProduct), this.attribute.disbalePredefinedAttribute(), this.setCorrectProductId(), e("body").trigger("dokan-product-editor-loaded", this)
                },
                setCorrectProductId: function() {
                    if (!e(".dokan-product-edit-form")) return;
                    let t = e("#dokan_product_id").val();
                    if (window.history.replaceState) {
                        let e = new URL(document.location),
                            a = e.searchParams,
                            n = a.get("product_id");
                        if ("" !== n && "0" !== n) return;
                        if (a.set("product_id", t), "edit" !== a.get("action")) return;
                        e.search = a.toString();
                        let o = e.toString(),
                            i = {
                                product_id: t
                            };
                        window.history.replaceState(i, document.title, o)
                    }
                },
                saleSchedule: function() {
                    var t = e(this).closest(".dokan-product-field-content", "div, table");
                    return e(this).hide(), t.find(".cancel_sale_schedule").show(), t.find(".sale_price_dates_fields").show(), !1
                },
                cancelSchedule: function() {
                    var t = e(this).closest(".dokan-product-field-content", "div, table");
                    return e(this).hide(), t.find(".sale_schedule").show(), t.find(".sale_price_dates_fields").hide(), t.find(".sale_price_dates_fields").find("input").val(""), !1
                },
                checkProductPostboxToggle: function() {
                    var t = JSON.parse(localStorage.getItem("toggleClasses"));
                    e.each(t, (function(t, a) {
                        var n = e("." + t.replace(/_/g, "-")),
                            o = n.find(".dokan-section-content"),
                            i = n.find("i.fa-sort-desc");
                        a ? (o.show(), i.removeClass("fa-flip-horizointal").addClass("fa-flip-vertical"), i.css("marginTop", "9px")) : (o.hide(), i.removeClass("fa-flip-vertical").addClass("fa-flip-horizointal"), i.css("marginTop", "0px"))
                    }))
                },
                toggleProductSection: function(t) {
                    t.preventDefault();
                    var a = e(this);
                    if (null != JSON.parse(localStorage.getItem("toggleClasses"))) var n = JSON.parse(localStorage.getItem("toggleClasses"));
                    else n = {};
                    a.closest(".dokan-edit-row").find(".dokan-section-content").slideToggle(300, (function() {
                        var t;
                        e(this).is(":visible") ? ((t = a.find("i.fa-sort-desc")).removeClass("fa-flip-horizointal").addClass("fa-flip-vertical"), t.css("marginTop", "9px"), n[a.data("togglehandler")] = !0) : ((t = a.find("i.fa-sort-desc")).removeClass("fa-flip-vertical").addClass("fa-flip-horizointal"), t.css("marginTop", "0px"), n[a.data("togglehandler")] = !1), localStorage.setItem("toggleClasses", JSON.stringify(n))
                    }))
                },
                loadSelect2: function() {
                    e(".dokan-select2").select2({
                        language: {
                            noResults: function() {
                                return dokan.i18n_no_result_found
                            }
                        }
                    })
                },
                bindProductTagDropdown: function() {
                    e(".product_tag_search").select2({
                        allowClear: !1,
                        tags: dokan.product_vendors_can_create_tags && "on" === dokan.product_vendors_can_create_tags,
                        createTag: function(t) {
                            var a = e.trim(t.term);
                            return "" === a ? null : {
                                id: a,
                                text: a,
                                newTag: !0
                            }
                        },
                        insertTag: function(t, a) {
                            var n = !1;
                            e.each(t, (function(t, o) {
                                e.trim(a.text).toUpperCase() == e.trim(o.text).toUpperCase() && (n = !0)
                            })), n || t.unshift(a)
                        },
                        minimumInputLength: 0,
                        maximumSelectionLength: void 0 !== dokan.maximum_tags_select_length ? dokan.maximum_tags_select_length : -1,
                        ajax: {
                            url: dokan.ajaxurl,
                            dataType: "json",
                            delay: 250,
                            data: function(e) {
                                return {
                                    q: e.term,
                                    action: "dokan_json_search_products_tags",
                                    security: dokan.search_products_tags_nonce,
                                    page: e.page || 1
                                }
                            },
                            processResults: function(t) {
                                var a = [];
                                return t && e.each(t, (function(e, t) {
                                    a.push({
                                        id: t[0],
                                        text: t[1]
                                    })
                                })), {
                                    results: a,
                                    pagination: {
                                        more: 0 != a.length
                                    }
                                }
                            },
                            cache: !0
                        },
                        language: {
                            errorLoading: function() {
                                return dokan.i18n_searching
                            },
                            inputTooLong: function(e) {
                                var t = e.input.length - e.maximum;
                                return 1 === t ? dokan.i18n_input_too_long_1 : dokan.i18n_input_too_long_n.replace("%qty%", t)
                            },
                            inputTooShort: function(e) {
                                var t = e.minimum - e.input.length;
                                return 1 === t ? dokan.i18n_input_too_short_1 : dokan.i18n_input_too_short_n.replace("%qty%", t)
                            },
                            loadingMore: function() {
                                return dokan.i18n_load_more
                            },
                            maximumSelected: function(e) {
                                return 1 === e.maximum ? dokan.i18n_selection_too_long_1 : dokan.i18n_selection_too_long_n.replace("%qty%", e.maximum)
                            },
                            noResults: function() {
                                return dokan.i18n_no_matches
                            },
                            searching: function() {
                                return dokan.i18n_searching
                            }
                        },
                        escapeMarkup: function(e) {
                            return e
                        },
                        templateResult: function(e) {
                            return `<span>${e.text}</span>`
                        },
                        templateSelection: function(e) {
                            return e.text
                        }
                    })
                },
                addProductPopup: function(e) {
                    e.preventDefault(), n.openProductPopup()
                },
                openProductPopup: function() {
                    const o = wp.template("dokan-add-new-product"),
                        i = e("#dokan-add-product-popup");
                    n.modal = i.iziModal({
                        headerColor: dokan.modal_header_color,
                        overlayColor: "rgba(0, 0, 0, 0.8)",
                        width: 690,
                        top: 32,
                        onOpening: () => {
                            n.reRenderPopupElements()
                        },
                        onClosed: () => {
                            t = void 0, a = void 0, e('#dokan-add-new-product-popup input[name="_sale_price_dates_from"], #dokan-add-new-product-popup input[name="_sale_price_dates_to"]').datepicker("destroy")
                        }
                    }), n.modal.iziModal("setContent", o().trim()), n.modal.iziModal("open")
                },
                reRenderPopupElements: function() {
                    n.loadSelect2(), n.bindProductTagDropdown(), e("#dokan-add-new-product-popup .sale_price_dates_fields input").daterangepicker({
                        singleDatePicker: !0,
                        showDropdowns: !1,
                        autoApply: !0,
                        parentEl: "#dokan-add-new-product-popup",
                        opens: "left",
                        autoUpdateInput: !1
                    }).on("apply.daterangepicker", (function(t, a) {
                        e(this).val(a.startDate.format("YYYY-MM-DD"))
                    })), e(".tips").tooltip(), n.gallery.sortable(), e("body").trigger("dokan-product-editor-popup-opened", n)
                },
                createNewProduct: function(t) {
                    t.preventDefault();
                    var o = e(this),
                        i = o.closest("form#dokan-add-new-product-form"),
                        r = o.attr("data-btn_id");
                    if (i.find("span.dokan-show-add-product-success").html(""), i.find("span.dokan-show-add-product-error").html(""), i.find("span.dokan-add-new-product-spinner").css("display", "inline-block"), o.attr("disabled", "disabled"), "" == i.find('input[name="post_title"]').val()) return e("span.dokan-show-add-product-error").html(dokan.product_title_required), o.removeAttr("disabled"), void i.find("span.dokan-add-new-product-spinner").css("display", "none");
                    if ("-1" == i.find('select[name="product_cat"]').val()) return e("span.dokan-show-add-product-error").html(dokan.product_category_required), o.removeAttr("disabled"), void i.find("span.dokan-add-new-product-spinner").css("display", "none");
                    var d = {
                        action: "dokan_create_new_product",
                        postdata: i.serialize(),
                        _wpnonce: dokan.nonce
                    };
                    n.modal.iziModal("startLoading"), e.post(dokan.ajaxurl, d, (function(t) {
                        t.success ? (o.removeAttr("disabled"), "create_new" === r ? (e("#dokan-add-product-popup").iziModal("close"), window.location.href = t.data) : (a = void 0, e(".dokan-dashboard-product-listing-wrapper").load(window.location.href + " table.product-listing-table"), n.modal.iziModal("resetContent"), n.openProductPopup(), n.reRenderPopupElements(), e("span.dokan-show-add-product-success").html(dokan.product_created_response), setTimeout((function() {
                            e("span.dokan-show-add-product-success").html("")
                        }), 3e3))) : (o.removeAttr("disabled"), e("span.dokan-show-add-product-error").html(t.data)), i.find("span.dokan-add-new-product-spinner").css("display", "none")
                    })).always((function() {
                        n.modal.iziModal("stopLoading")
                    }))
                },
                attribute: {
                    toggleAttribute: function(t) {
                        t.preventDefault();
                        var a = e(this),
                            n = a.closest("li").find(".dokan-product-attribute-item");
                        return e(n).hasClass("dokan-hide") ? (a.closest(".dokan-product-attribute-heading").css({
                            borderBottom: "1px solid #e3e3e3"
                        }), e(n).slideDown(200, (function() {
                            a.find("i.fa").removeClass("fa-flip-horizointal").addClass("fa-flip-vertical"), e(this).removeClass("dokan-hide"), e(t.target).hasClass("dokan-product-attribute-heading") ? e(t.target).hasClass("dokan-product-attribute-heading") && a.find("a.dokan-product-toggle-attribute").css("top", "12px") : e(t.target).closest("a").css("top", "12px")
                        }))) : e(n).slideUp(200, (function() {
                            e(this).addClass("dokan-hide"), a.find("i.fa").removeClass("fa-flip-vertical").addClass("fa-flip-horizointal"), e(t.target).hasClass("dokan-product-attribute-heading") ? e(t.target).hasClass("dokan-product-attribute-heading") && a.find("a.dokan-product-toggle-attribute").css("top", "7px") : e(t.target).closest("a").css("top", "7px"), a.closest(".dokan-product-attribute-heading").css({
                                borderBottom: "none"
                            })
                        })), !1
                    },
                    sortable: function() {
                        e(".dokan-product-attribute-wrapper ul").sortable({
                            items: "li.product-attribute-list",
                            cursor: "move",
                            scrollSensitivity: 40,
                            forcePlaceholderSize: !0,
                            forceHelperSize: !1,
                            helper: "clone",
                            opacity: .65,
                            placeholder: "dokan-sortable-placeholder",
                            start: function(e, t) {
                                t.item.css("background-color", "#f6f6f6")
                            },
                            stop: function(e, t) {
                                t.item.removeAttr("style")
                            },
                            update: function(e, t) {
                                n.attribute.reArrangeAttribute()
                            }
                        })
                    },
                    dynamicAttrNameChange: function(t) {
                        t.preventDefault();
                        var a = e(this),
                            n = a.val();
                        "" == n ? a.closest("li").find("strong").html(dokan.i18n_attribute_label) : a.closest("li").find("strong").html(n)
                    },
                    selectAllAttr: function(t) {
                        return t.preventDefault(), e(this).closest("li.product-attribute-list").find("select.dokan_attribute_values option").attr("selected", !0), e(this).closest("li.product-attribute-list").find("select.dokan_attribute_values").trigger("change"), !1
                    },
                    selectNoneAttr: function(t) {
                        return t.preventDefault(), e(this).closest("li.product-attribute-list").find("select.dokan_attribute_values option").attr("selected", !1), e(this).closest("li.product-attribute-list").find("select.dokan_attribute_values").trigger("change"), !1
                    },
                    reArrangeAttribute: function() {
                        e(".dokan-product-attribute-wrapper").find("ul.dokan-attribute-option-list").find("li.product-attribute-list").css("cursor", "default").each((function(t) {
                            e(this).find(".attribute_position").val(t)
                        }))
                    },
                    addNewExtraAttr: async function(t) {
                        t.preventDefault();
                        var a = e(this).closest("li.product-attribute-list"),
                            n = a.data("taxonomy"),
                            o = (await dokan_sweetalert(dokan.new_attribute_prompt, {
                                action: "prompt",
                                input: "text"
                            })).value;
                        if (o) {
                            var i = {
                                action: "dokan_add_new_attribute",
                                taxonomy: n,
                                term: o,
                                _wpnonce: dokan.nonce
                            };
                            e.post(dokan.ajaxurl, i, (function(e) {
                                e.error ? dokan_sweetalert(e.error, {
                                    action: "alert",
                                    icon: "warning"
                                }) : e.slug && (a.find("select.dokan_attribute_values").append('<option value="' + e.slug + '" selected="selected">' + e.name + "</option>"), a.find("select.dokan_attribute_values").trigger("change"))
                            }))
                        }
                    },
                    addNewAttribute: function(t) {
                        t.preventDefault();
                        var a = e(this),
                            o = a.closest(".dokan-attribute-type").find("select#predefined_attribute"),
                            i = o.val(),
                            r = e("ul.dokan-attribute-option-list .product-attribute-list").length,
                            d = {
                                action: "dokan_get_pre_attribute",
                                taxonomy: i,
                                i: r,
                                _wpnonce: dokan.nonce
                            };
                        a.closest(".dokan-attribute-type").find("span.dokan-attribute-spinner").removeClass("dokan-hide"), e.post(dokan.ajaxurl, d, (function(t) {
                            if (t.success) {
                                var r = e(".dokan-product-attribute-wrapper").find("ul.dokan-attribute-option-list");
                                if ($html = e.parseHTML(t.data), e($html).find(".dokan-product-attribute-item").removeClass("dokan-hide"), e($html).find("i.fa.fa-sort-desc").removeClass("fa-flip-horizointal").addClass("fa-flip-vertical"), e($html).find("a.dokan-product-toggle-attribute").css("top", "12px"), e($html).find(".dokan-product-attribute-heading").css({
                                        borderBottom: "1px solid #e3e3e3"
                                    }), r.append($html), n.loadSelect2(), n.bindProductTagDropdown(), n.attribute.reArrangeAttribute(), "variable" !== e("select#product_type").val()) {
                                    let t = e("div.dokan-product-attribute-wrapper label.show_if_variable");
                                    for (let a of t) {
                                        let t = e(a).find('input[type="checkbox"]');
                                        t.length > 0 && t[0].getAttribute("name") ? .startsWith("attribute_variation[") && e(a).hide()
                                    }
                                }
                            }
                            a.closest(".dokan-attribute-type").find("span.dokan-attribute-spinner").addClass("dokan-hide"), i && (o.find('option[value="' + i + '"]').attr("disabled", "disabled"), o.val(""))
                        })).done((function() {
                            e("select#product_type").trigger("change")
                        }))
                    },
                    removeAttribute: async function(t) {
                        t.stopPropagation(), t.preventDefault();
                        const a = await dokan_sweetalert(dokan.remove_attribute, {
                            action: "confirm",
                            icon: "warning"
                        });
                        if ("undefined" !== a && a.isConfirmed) {
                            var o = e(this).closest("li.product-attribute-list");
                            o.fadeOut(300, (function() {
                                o.is(".taxonomy") ? (o.find("select, input[type=text]").val(""), e("select.dokan_attribute_taxonomy").find('option[value="' + o.data("taxonomy") + '"]').removeAttr("disabled")) : (o.find("select, input[type=text]").val(""), o.hide()), n.attribute.reArrangeAttribute()
                            }))
                        }
                        return !1
                    },
                    saveAttribute: function(t) {
                        t.preventDefault(), e(this);
                        var a = {
                            post_id: e("#dokan-edit-product-id").val(),
                            data: e("ul.dokan-attribute-option-list").find("input, select, textarea").serialize(),
                            action: "dokan_save_attributes"
                        };
                        e(".dokan-product-attribute-wrapper").block({
                            message: null,
                            fadeIn: 50,
                            fadeOut: 1e3,
                            overlayCSS: {
                                background: "#fff",
                                opacity: .6
                            }
                        }), e.post(dokan.ajaxurl, a, (function(t) {
                            e("#dokan-variable-product-options").load(window.location.toString() + " #dokan-variable-product-options-inner", (function() {
                                e("#dokan-variable-product-options").trigger("reload"), e("select#product_type").trigger("change"), e(".dokan-product-attribute-wrapper").unblock()
                            }))
                        }))
                    },
                    disbalePredefinedAttribute: function() {
                        e("ul.dokan-attribute-option-list li.product-attribute-list").each((function(t, a) {
                            "none" !== e(a).css("display") && e(a).is(".taxonomy") && e("select#predefined_attribute").find('option[value="' + e(a).data("taxonomy") + '"]').attr("disabled", "disabled")
                        }))
                    }
                },
                inputValidate: function(t) {
                    return t.preventDefault(), "" == e("#post_title").val().trim() ? (e("#post_title").focus(), void e("div.dokan-product-title-alert").removeClass("dokan-hide")) : (e("div.dokan-product-title-alert").hide(), -1 == e("select.product_cat").val() ? (e("select.product_cat").focus(), void e("div.dokan-product-cat-alert").removeClass("dokan-hide")) : (e("div.dokan-product-cat-alert").hide(), e("input[type=submit]").attr("disabled", "disabled"), void this.submit()))
                },
                downloadable: function() {
                    e(this).prop("checked") ? e(this).closest("aside").find(".dokan-side-body").removeClass("dokan-hide") : e(this).closest("aside").find(".dokan-side-body").addClass("dokan-hide")
                },
                showDiscountSchedule: function(t) {
                    t.preventDefault(), e(".sale-schedule-container").slideToggle("fast")
                },
                showManageStock: function(t) {
                    const a = e("#product_type").val();
                    e(this).is(":checked") && "external" !== a ? e(".show_if_stock").slideDown("fast") : e(".show_if_stock").slideUp("fast"), "simple" === a && (e(this).is(":checked") ? e(".hide_if_stock_global").slideUp("fast") : e(".hide_if_stock_global").slideDown("fast"))
                },
                gallery: {
                    addImages: function(a) {
                        a.preventDefault();
                        var n = e(this),
                            o = n.closest(".dokan-product-gallery").find("#product_images_container ul.product_images"),
                            i = n.closest(".dokan-product-gallery").find("#product_image_gallery");
                        t || (t = wp.media({
                            title: dokan.i18n_choose_gallery,
                            library: {
                                type: "image"
                            },
                            button: {
                                text: dokan.i18n_choose_gallery_btn_text
                            },
                            multiple: !0
                        })).on("select", (function() {
                            t.state().get("selection").map((function(t) {
                                t = t.toJSON(), attachment_ids = [], t.id && "image" === t.type && (e('<li class="image" data-attachment_id="' + t.id + '">                                    <img src="' + t.url + '" />                                    <a href="#" class="action-delete">&times;</a>                                </li>').insertBefore(o.find("li.add-image")), e("#product_images_container ul li.image").css("cursor", "default").each((function() {
                                    var e = jQuery(this).attr("data-attachment_id");
                                    attachment_ids.push(e)
                                })), i.val(attachment_ids.join(",")))
                            }))
                        })), t.open()
                    },
                    deleteImage: function(t) {
                        t.preventDefault();
                        var a = e(this),
                            n = (a.closest(".dokan-product-gallery").find("#product_images_container ul.product_images"), a.closest(".dokan-product-gallery").find("#product_image_gallery"));
                        a.closest("li.image").remove();
                        var o = [];
                        return e("#product_images_container ul li.image").css("cursor", "default").each((function() {
                            var t = e(this).attr("data-attachment_id");
                            o.push(t)
                        })), n.val(o.join(",")), !1
                    },
                    sortable: function() {
                        e("body").find("#product_images_container ul.product_images").sortable({
                            items: "li.image",
                            cursor: "move",
                            scrollSensitivity: 40,
                            forcePlaceholderSize: !0,
                            forceHelperSize: !1,
                            helper: "clone",
                            opacity: .65,
                            placeholder: "dokan-sortable-placeholder",
                            start: function(e, t) {
                                t.item.css("background-color", "#f6f6f6")
                            },
                            stop: function(e, t) {
                                t.item.removeAttr("style")
                            },
                            update: function(t, a) {
                                var n = [];
                                e("body").find("#product_images_container ul li.image").css("cursor", "default").each((function() {
                                    var e = jQuery(this).attr("data-attachment_id");
                                    n.push(e)
                                })), e("body").find("#product_image_gallery").val(n.join(","))
                            }
                        })
                    }
                },
                featuredImage: {
                    addImage: function(t) {
                        t.preventDefault();
                        var n = e(this);
                        a || (a = wp.media({
                            title: dokan.i18n_choose_featured_img,
                            library: {
                                type: "image"
                            },
                            button: {
                                text: dokan.i18n_choose_featured_img_btn_text
                            }
                        })).on("select", (function() {
                            a.state().get("selection").map((function(e) {
                                if ("image" === (e = e.toJSON()).type) {
                                    n.siblings("input.dokan-feat-image-id").val(e.id);
                                    var t = n.closest(".instruction-inside"),
                                        a = t.siblings(".image-wrap");
                                    a.find("img").attr("src", e.url), a.find("img").removeAttr("srcset"), t.addClass("dokan-hide"), a.removeClass("dokan-hide")
                                }
                            }))
                        })), a.open()
                    },
                    removeImage: function(t) {
                        t.preventDefault();
                        var a = e(this).closest(".image-wrap"),
                            n = a.siblings(".instruction-inside");
                        n.find("input.dokan-feat-image-id").val("0"), a.addClass("dokan-hide"), n.removeClass("dokan-hide")
                    }
                },
                fileDownloadable: function(t) {
                    t.preventDefault();
                    var a, n = e(this);
                    a || ((a = wp.media({
                        title: dokan.i18n_choose_file,
                        button: {
                            text: dokan.i18n_choose_file_btn_text
                        },
                        multiple: !0
                    })).on("select", (function() {
                        a.state().get("selection").map((function(e) {
                            e = e.toJSON(), n.closest("tr").find("input.wc_file_url, input.wc_variation_file_url").val(e.url)
                        }))
                    })), a.on("ready", (function() {
                        a.uploader.options.uploader.params = {
                            type: "downloadable_product"
                        }
                    }))), a.open()
                }
            };
            e((function() {
                function t() {
                    var t = e("#product_type").val(),
                        a = e("input#_virtual:checked").length,
                        n = e("input#_downloadable:checked").length;
                    let o = e(".dokan-product-shipping-tax");
                    var i = ".hide_if_downloadable, .hide_if_virtual",
                        r = ".show_if_downloadable, .show_if_virtual";
                    e.each(Object.keys(dokan.product_types), (function(e, t) {
                        i = i + ", .hide_if_" + t, r = r + ", .show_if_" + t
                    })), e(i).show(), e(r).hide(), n && e(".show_if_downloadable").show(), a && e(".show_if_virtual").show(), e(".show_if_" + t).show(), n && e(".hide_if_downloadable").hide(), a ? (e(".hide_if_virtual").hide(), 1 === e(".dokan-product-shipping-tax .dokan-section-content").first().children().length ? o.hide() : (o.hasClass("hide_if_virtual") && o.removeClass("hide_if_virtual"), o.show())) : o.show(), e(".hide_if_" + t).hide(), e("input#_manage_stock").trigger("change")
                }
                n.init(), e("select#product_type").on("change", (function() {
                    var a = e(this).val();
                    "variable" === a && (e("input#_manage_stock").trigger("change"), e("input#_downloadable").prop("checked", !1), e("input#_virtual").removeAttr("checked")), t(), e(document.body).trigger("dokan-product-type-change", a, e(this))
                })).trigger("change"), e(".product-edit-container").on("change", "input#_downloadable, input#_virtual", (function() {
                    t()
                })).trigger("change"), e("input#_downloadable").trigger("change"), e("input#_virtual").trigger("change"), e(".sale_price_dates_fields").each((function() {
                    var t = e(this),
                        a = !1,
                        n = t.closest("div, table");
                    t.find("input").each((function() {
                        "" !== e(this).val() && (a = !0)
                    })), a ? (n.find(".sale_schedule").hide(), n.find(".sale_price_dates_fields").show()) : (n.find(".sale_schedule").show(), n.find(".sale_price_dates_fields").hide())
                })), e(".product-edit-container").on("click", ".sale_schedule", (function() {
                    var t = e(this).closest(".product-edit-container, div.dokan-product-variation-itmes, table");
                    return e(this).hide(), t.find(".cancel_sale_schedule").show(), t.find(".sale_price_dates_fields").show(), !1
                })), e(".product-edit-container").on("click", ".cancel_sale_schedule", (function() {
                    var t = e(".product-edit-container, div.dokan-product-variation-itmes, table");
                    return e(this).hide(), t.find(".sale_schedule").show(), t.find(".sale_price_dates_fields").hide(), t.find(".sale_price_dates_fields").find("input").val(""), !1
                })), e("#dokan-product-title-area").on("click", ".edit-slug", (function() {
                    ! function() {
                        var t, a, n, o, i = 0,
                            r = e("#post_name"),
                            d = r.val(),
                            s = e("#sample-permalink"),
                            l = s.html(),
                            c = e("#sample-permalink a").html(),
                            u = e("#edit-slug-buttons"),
                            p = u.html(),
                            m = e("#editable-post-name-full");
                        for (m.find("img").replaceWith((function() {
                                return this.alt
                            })), m = m.html(), s.html(c), n = e("#editable-post-name"), o = n.html(), u.html('<button type="button" class="save button button-small">' + dokan.i18n_ok_text + '</button> <button type="button" class="cancel button-link">' + dokan.i18n_cancel_text + "</button>"), u.children(".save").on("click", (function() {
                                var t = n.children("input").val();
                                t != e("#editable-post-name-full").text() ? e.post(ajaxurl, {
                                    action: "sample-permalink",
                                    post_id: e("#dokan-edit-product-id").val(),
                                    new_slug: t,
                                    new_title: e("#post_title").val(),
                                    samplepermalinknonce: e("#samplepermalinknonce").val()
                                }, (function(a) {
                                    var n = e("#edit-slug-box");
                                    n.html(a), n.hasClass("hidden") && n.fadeIn("fast", (function() {
                                        n.removeClass("hidden")
                                    })), u.html(p), s.html(l), r.val(t), e(".edit-slug").focus(), e("#editable-post-name-full-dokan").val(e("#editable-post-name-full").html())
                                })) : u.children(".cancel").trigger("click")
                            })), u.children(".cancel").on("click", (function() {
                                e("#view-post-btn").show(), n.html(o), u.html(p), s.html(l), r.val(d), e(".edit-slug").focus()
                            })), t = 0; t < m.length; ++t) "%" == m.charAt(t) && i++;
                        a = i > m.length / 4 ? "" : m, n.html('<input type="text" id="new-post-slug" value="' + a + '" autocomplete="off" />').children("input").on("keydown", (function(e) {
                            var t = e.which;
                            13 === t && (e.preventDefault(), u.children(".save").trigger("click")), 27 === t && u.children(".cancel").trigger("click")
                        })).on("keyup", (function() {
                            r.val(this.value)
                        })).focus()
                    }()
                })), e("#dokan-edit-product-id").val() && e("#post_title").val() && e("#samplepermalinknonce").val() && e.post(ajaxurl, {
                    action: "sample-permalink",
                    post_id: e("#dokan-edit-product-id").val(),
                    new_slug: e("#edited-post-name-dokan").val(),
                    new_title: e("#post_title").val(),
                    samplepermalinknonce: e("#samplepermalinknonce").val()
                }, (function(t) {
                    e("#edit-slug-box").html(t)
                })), e(window).on("load", (function() {
                    e("input#_virtual:checked").length && t()
                }))
            }))
        }(jQuery), jQuery((function(e) {
            function t(e, t, a) {
                jQuery('<div class="chart-tooltip">' + a + "</div>").css({
                    top: t - 16,
                    left: e + 20
                }).appendTo("body").fadeIn(200)
            }
            wp.customize, e(".datepicker").datepicker({
                dateFormat: "yy-mm-dd"
            }), e(".dokan-table tbody").on("click", ".toggle-row", (function() {
                e(this).closest("tr").toggleClass("is-expanded")
            })), e(".dokan-start-date").datepicker({
                defaultDate: "",
                dateFormat: "yy-mm-dd",
                numberOfMonths: 1,
                onSelect: function(t) {
                    let a = new Date(t);
                    a.setDate(a.getDate() + 1), e(".dokan-end-date").datepicker("option", {
                        minDate: a
                    })
                }
            }), e(".dokan-end-date").datepicker({
                defaultDate: "",
                dateFormat: "yy-mm-dd",
                numberOfMonths: 1,
                onSelect: function(t) {
                    let a = new Date(t);
                    a.setDate(a.getDate() - 1), e("dokan-start-date").datepicker("option", {
                        maxDate: a
                    })
                }
            }), e(".tips").tooltip();
            var a = null,
                n = null;
            jQuery(".chart-placeholder").on("plothover", (function(e, o, i) {
                if (i) {
                    if ((a != i.dataIndex || n != i.seriesIndex) && (a = i.dataIndex, n = i.seriesIndex, jQuery(".chart-tooltip").remove(), i.series.points.show || i.series.enable_tooltip)) {
                        var r = i.series.data[i.dataIndex][1];
                        tooltip_content = "", i.series.prepend_label && (tooltip_content = tooltip_content + i.series.label + ": "), i.series.prepend_tooltip && (tooltip_content += i.series.prepend_tooltip), tooltip_content += r, i.series.append_tooltip && (tooltip_content += i.series.append_tooltip), i.series.pie.show ? t(o.pageX, o.pageY, tooltip_content) : t(i.pageX, i.pageY, tooltip_content)
                    }
                } else jQuery(".chart-tooltip").remove(), a = null
            }))
        })),
        function(e) {
            e.validator.setDefaults({
                ignore: ":hidden"
            });
            var t = function(t, a) {
                    e(a).closest(".dokan-form-group").addClass("has-error").append(t)
                },
                a = function(t, a) {
                    e(a).closest(".dokan-form-group").removeClass("has-error"), e(t).remove()
                },
                n = wp.customize,
                o = 'input[name="settings[bank][disconnect]"], input[name="settings[paypal][disconnect]"], input[name="settings[skrill][disconnect]"], input[name="settings[dokan_custom][disconnect]"]',
                i = {
                    init: function() {
                        return e("a.dokan-banner-drag").on("click", this.imageUpload), e("a.dokan-remove-banner-image").on("click", this.removeBanner), e("a.dokan-pro-gravatar-drag").on("click", this.gragatarImageUpload), e("a.dokan-gravatar-drag").on("click", this.simpleImageUpload), e("a.dokan-remove-gravatar-image").on("click", this.removeGravatar), e(".dokan-update-setting-top-button").on("click", (function() {
                            e("input[name='dokan_update_store_settings']").trigger("click")
                        })), this.validateForm(this), e(".dokan_payment_disconnect_btn").on("click", (function() {
                            var t = e(this).closest("form"),
                                a = e("form#" + t.attr("id"));
                            e(":input", t).not(":button, :submit, :reset, :hidden, :checkbox").val("").prop("selected", !1);
                            var n = t.serializeArray().reduce((function(e, t) {
                                return e[t.name] = t.value, e
                            }), {});
                            n[e(this).attr("name")] = "", n.form_id = t.attr("id"), n.action = "dokan_settings", i.handleRequest(a, n, !0)
                        })), !1
                    },
                    calculateImageSelectOptions: function(e, t) {
                        var a, o, i, r, d, s, l = parseInt(dokan.store_banner_dimension.width, 10),
                            c = parseInt(dokan.store_banner_dimension.height, 10),
                            u = !!parseInt(dokan.store_banner_dimension["flex-width"], 10),
                            p = !!parseInt(dokan.store_banner_dimension["flex-height"], 10);
                        return d = e.get("width"), r = e.get("height"), this.headerImage = new n.HeaderTool.ImageModel, this.headerImage.set({
                            themeWidth: l,
                            themeHeight: c,
                            themeFlexWidth: u,
                            themeFlexHeight: p,
                            imageWidth: d,
                            imageHeight: r
                        }), t.set("canSkipCrop", !this.headerImage.shouldBeCropped()), (o = d) / (i = r) > (a = l / c) ? l = (c = i) * a : c = (l = o) / a, s = {
                            handles: !0,
                            keys: !0,
                            instance: !0,
                            persistent: !0,
                            imageWidth: d,
                            imageHeight: r,
                            x1: 0,
                            y1: 0,
                            x2: l,
                            y2: c
                        }, !1 === p && !1 === u && (s.aspectRatio = l + ":" + c), !1 === p && (s.maxHeight = c), !1 === u && (s.maxWidth = l), s
                    },
                    onSelect: function() {
                        this.frame.setState("cropper")
                    },
                    onCropped: function(e) {
                        var t = e.url,
                            a = e.attachment_id,
                            n = e.width,
                            o = e.height;
                        this.setImageFromURL(t, a, n, o)
                    },
                    onSkippedCrop: function(e) {
                        var t = e.get("url"),
                            a = e.get("width"),
                            n = e.get("height");
                        this.setImageFromURL(t, e.id, a, n)
                    },
                    setImageFromURL: function(t, a, n, o) {
                        var i = !1;
                        if (e(this.uploadBtn).hasClass("dokan-banner-drag"))(r = e(this.uploadBtn).closest(".dokan-banner")).find("input.dokan-file-field").val(a), r.find("img.dokan-banner-img").attr("src", t), e(this.uploadBtn).parent().siblings(".image-wrap", r).removeClass("dokan-hide"), e(this.uploadBtn).parent(".button-area").addClass("dokan-hide"), i = !0;
                        else if (e(this.uploadBtn).hasClass("dokan-pro-gravatar-drag")) {
                            var r;
                            (r = e(this.uploadBtn).closest(".dokan-gravatar")).find("input.dokan-file-field").val(a), r.find("img.dokan-gravatar-img").attr("src", t), i = !0, e(this.uploadBtn).parent().siblings(".gravatar-wrap", r).removeClass("dokan-hide"), e(this.uploadBtn).parent(".gravatar-button-area").addClass("dokan-hide")
                        }!0 === i && (e(window).on("beforeunload", (function() {
                            return dokan.dokan_banner_added_alert_msg
                        })), e(document).ready((function() {
                            e("#store-form").on("submit", (function(t) {
                                return e(window).off("beforeunload"), !0
                            }))
                        })))
                    },
                    removeImage: function() {
                        n.HeaderTool.currentHeader.trigger("hide"), n.HeaderTool.CombinedList.trigger("control:removeImage")
                    },
                    imageUpload: function(e) {
                        e.preventDefault();
                        var t = i;
                        t.uploadBtn = this, t.frame = wp.media({
                            multiple: !1,
                            button: {
                                text: dokan.selectAndCrop,
                                close: !1
                            },
                            states: [new wp.media.controller.Library({
                                title: dokan.chooseImage,
                                library: wp.media.query({
                                    type: "image"
                                }),
                                multiple: !1,
                                date: !1,
                                priority: 20,
                                suggestedWidth: dokan.store_banner_dimension.width,
                                suggestedHeight: dokan.store_banner_dimension.height
                            }), new wp.media.controller.Cropper({
                                suggestedWidth: 5e3,
                                imgSelectOptions: t.calculateImageSelectOptions
                            })]
                        }), t.frame.on("select", t.onSelect, t), t.frame.on("cropped", t.onCropped, t), t.frame.on("skippedcrop", t.onSkippedCrop, t), t.frame.open()
                    },
                    calculateImageSelectOptionsProfile: function(e, t) {
                        var a, o, i, r, d, s, l = 150,
                            c = 150,
                            u = !!parseInt(dokan.store_banner_dimension["flex-width"], 10),
                            p = !!parseInt(dokan.store_banner_dimension["flex-height"], 10);
                        return d = e.get("width"), r = e.get("height"), this.headerImage = new n.HeaderTool.ImageModel, this.headerImage.set({
                            themeWidth: l,
                            themeHeight: c,
                            themeFlexWidth: u,
                            themeFlexHeight: p,
                            imageWidth: d,
                            imageHeight: r
                        }), t.set("canSkipCrop", !this.headerImage.shouldBeCropped()), (o = d) / (i = r) > (a = l / c) ? l = (c = i) * a : c = (l = o) / a, s = {
                            handles: !0,
                            keys: !0,
                            instance: !0,
                            persistent: !0,
                            imageWidth: d,
                            imageHeight: r,
                            x1: 0,
                            y1: 0,
                            x2: l,
                            y2: c
                        }, !1 === p && !1 === u && (s.aspectRatio = l + ":" + c), !1 === p && (s.maxHeight = c), !1 === u && (s.maxWidth = l), s
                    },
                    simpleImageUpload: function(t) {
                        t.preventDefault();
                        var a, n = e(this);
                        a || (a = wp.media.frames.file_frame = wp.media({
                            title: jQuery(this).data("uploader_title"),
                            button: {
                                text: jQuery(this).data("uploader_button_text")
                            },
                            multiple: !1
                        })).on("select", (function() {
                            var e = a.state().get("selection").first().toJSON(),
                                t = n.closest(".dokan-gravatar");
                            t.find("input.dokan-file-field").val(e.id), t.find("img.dokan-gravatar-img").attr("src", e.url), n.parent().siblings(".gravatar-wrap", t).removeClass("dokan-hide"), n.parent(".gravatar-button-area").addClass("dokan-hide")
                        })), a.open()
                    },
                    gragatarImageUpload: function(e) {
                        e.preventDefault();
                        var t = i;
                        t.uploadBtn = this, t.frame = wp.media({
                            multiple: !1,
                            button: {
                                text: dokan.selectAndCrop,
                                close: !1
                            },
                            states: [new wp.media.controller.Library({
                                title: dokan.chooseImage,
                                library: wp.media.query({
                                    type: "image"
                                }),
                                multiple: !1,
                                date: !1,
                                priority: 20,
                                suggestedWidth: 150,
                                suggestedHeight: 150
                            }), new wp.media.controller.Cropper({
                                imgSelectOptions: t.calculateImageSelectOptionsProfile
                            })]
                        }), t.frame.on("select", t.onSelect, t), t.frame.on("cropped", t.onCropped, t), t.frame.on("skippedcrop", t.onSkippedCrop, t), t.frame.open()
                    },
                    submitSettings: function(t) {
                        "undefined" != typeof tinyMCE && tinyMCE.triggerSave();
                        var a = e("form#" + t),
                            n = a.serialize() + "&action=dokan_settings&form_id=" + t;
                        i.handleRequest(a, n, !1)
                    },
                    handleRequest: function(t, a, n) {
                        n ? t.find(".ajax_prev.disconnect").append('<span class="dokan-loading"> </span>') : t.find(".ajax_prev.save").append('<span class="dokan-loading"> </span>'), e(".dokan-update-setting-top-button span.dokan-loading").remove(), e(".dokan-update-setting-top-button").append('<span class="dokan-loading"> </span>'), e.post(dokan.ajaxurl, a, (function(a) {
                            t.find("span.dokan-loading").remove(), e(".dokan-update-setting-top-button span.dokan-loading").remove(), e("html,body").animate({
                                scrollTop: e(".dokan-dashboard-header").offset().top
                            }), a.success ? (e(".dokan-ajax-response").html(e("<div/>", {
                                class: "dokan-alert dokan-alert-success",
                                html: "<p>" + a.data.msg + "</p>"
                            })), e(".dokan-ajax-response").append(a.data.progress), dokan && dokan.storeProgressBar && dokan.storeProgressBar.init(), o = o.replaceAll("input", "button"), n ? t.find(o).addClass("dokan-hide") : t.find(o).removeClass("dokan-hide")) : e(".dokan-ajax-response").html(e("<div/>", {
                                class: "dokan-alert dokan-alert-danger",
                                html: "<p>" + a.data + "</p>"
                            }))
                        }))
                    },
                    validateForm: function(n) {
                        e("form#settings-form, form#profile-form, form#store-form, form#payment-form").validate({
                            submitHandler: function(e) {
                                n.submitSettings(e.getAttribute("id"))
                            },
                            errorElement: "span",
                            errorClass: "error",
                            errorPlacement: t,
                            success: a,
                            ignore: ".select2-search__field, :hidden, .mapboxgl-ctrl-geocoder--input"
                        })
                    },
                    removeBanner: function(t) {
                        t.preventDefault();
                        var a = e(this).closest(".image-wrap"),
                            n = a.siblings(".button-area");
                        a.find("input.dokan-file-field").val("0"), a.addClass("dokan-hide"), n.removeClass("dokan-hide")
                    },
                    removeGravatar: function(t) {
                        t.preventDefault();
                        var a = e(this).closest(".gravatar-wrap"),
                            n = a.siblings(".gravatar-button-area");
                        a.find("input.dokan-file-field").val("0"), a.addClass("dokan-hide"), n.removeClass("dokan-hide")
                    }
                },
                r = {
                    init: function() {
                        this.withdrawValidate(this)
                    },
                    withdrawValidate: function(n) {
                        e("form.withdraw").validate({
                            errorElement: "span",
                            errorClass: "error",
                            errorPlacement: t,
                            success: a
                        })
                    }
                },
                d = {
                    init: function() {
                        this.validate(this)
                    },
                    validate: function(a) {
                        e("form#dokan-form-contact-seller").validate({
                            errorPlacement: t,
                            errorElement: "span",
                            success: function(e, t) {
                                e.removeClass("error"), e.remove()
                            },
                            submitHandler: async function(t, a) {
                                a.preventDefault(), e(t).block({
                                    message: null,
                                    overlayCSS: {
                                        background: "#fff url(" + dokan.ajax_loader + ") no-repeat center",
                                        opacity: .6
                                    }
                                }), await dokan_execute_recaptcha("form#dokan-form-contact-seller .dokan_recaptcha_token", "dokan_contact_seller_recaptcha");
                                var n = e(t).serialize();
                                e.post(dokan.ajaxurl, n, (function(a) {
                                    e(t).unblock(), void 0 !== a.data && e(t).find(".ajax-response").html(a.data), e(t).find("input[type=text], input[type=email], textarea, input[name=dokan_recaptcha_token]").val("").removeClass("valid")
                                }))
                            }
                        })
                    }
                };
            e((function() {
                i.init(), r.init(), d.init(), e(".dokan-form-horizontal").on("change", "input[type=checkbox]#lbl_setting_minimum_quantity", (function() {
                    var t = e(".show_if_needs_sw_discount");
                    e(this).is(":checked") ? (t.find('input[type="number"]').val(""), t.slideDown("slow")) : t.slideUp("slow")
                }))
            }))
        }(jQuery),
        function(e) {
            var t = DokanValidateMsg;
            t.maxlength = e.validator.format(t.maxlength_msg), t.minlength = e.validator.format(t.minlength_msg), t.rangelength = e.validator.format(t.rangelength_msg), t.range = e.validator.format(t.range_msg), t.max = e.validator.format(t.max_msg), t.min = e.validator.format(t.min_msg), e.validator.messages = t, e(document).on("click", "#dokan_store_tnc_enable", (function(t) {
                e(this).is(":checked") ? e("#dokan_tnc_text").show() : e("#dokan_tnc_text").hide()
            })).ready((function(t) {
                e("#dokan_store_tnc_enable").is(":checked") ? e("#dokan_tnc_text").show() : e("#dokan_tnc_text").hide()
            }))
        }(jQuery),
        function(e) {
            var t = "undefined" != typeof wp && wp.customize && wp.customize.selectiveRefresh;

            function a() {
                dokan.store_banner_dimension.width;
                var t = dokan.store_banner_dimension.height / dokan.store_banner_dimension.width * e("#dokan-content").width();
                e(".dokan-profile-frame-wrapper .profile-info-img.dummy-image").css({
                    height: t
                })
            }
            a(), e(window).on("resize", (function(e) {
                a()
            })), t && wp.customize.selectiveRefresh.bind("partial-content-rendered", (function(e) {
                console.log("placement", e), "store_header_template" === e.partial.id && a()
            })), e(":input.dokan-product-search").filter(":not(.enhanced)").each((function() {
                var t = {
                    allowClear: !!e(this).data("allow_clear"),
                    placeholder: e(this).data("placeholder"),
                    minimumInputLength: e(this).data("minimum_input_length") ? e(this).data("minimum_input_length") : "3",
                    escapeMarkup: function(e) {
                        return e
                    },
                    language: {
                        errorLoading: function() {
                            return dokan.i18n_searching
                        },
                        inputTooLong: function(e) {
                            var t = e.input.length - e.maximum;
                            return 1 === t ? dokan.i18n_input_too_long_1 : dokan.i18n_input_too_long_n.replace("%qty%", t)
                        },
                        inputTooShort: function(e) {
                            var t = e.minimum - e.input.length;
                            return 1 === t ? dokan.i18n_input_too_short_1 : dokan.i18n_input_too_short_n.replace("%qty%", t)
                        },
                        loadingMore: function() {
                            return dokan.i18n_load_more
                        },
                        maximumSelected: function(e) {
                            return 1 === e.maximum ? dokan.i18n_selection_too_long_1 : dokan.i18n_selection_too_long_n.replace("%qty%", e.maximum)
                        },
                        noResults: function() {
                            return dokan.i18n_no_matches
                        },
                        searching: function() {
                            return dokan.i18n_searching
                        }
                    },
                    ajax: {
                        url: dokan.ajaxurl,
                        dataType: "json",
                        delay: 250,
                        data: function(t) {
                            return {
                                term: t.term,
                                action: e(this).data("action") || "dokan_json_search_products_and_variations",
                                security: dokan.search_products_nonce,
                                exclude: e(this).data("exclude"),
                                user_ids: e(this).data("user_ids"),
                                include: e(this).data("include"),
                                limit: e(this).data("limit")
                            }
                        },
                        processResults: function(t) {
                            var a = [];
                            return t && e.each(t, (function(e, t) {
                                a.push({
                                    id: e,
                                    text: t
                                })
                            })), {
                                results: a
                            }
                        },
                        cache: !0
                    }
                };
                if (e(this).select2(t).addClass("enhanced"), e(this).data("sortable")) {
                    var a = e(this),
                        n = e(this).next(".select2-container").find("ul.select2-selection__rendered");
                    n.sortable({
                        placeholder: "ui-state-highlight select2-selection__choice",
                        forcePlaceholderSize: !0,
                        items: "li:not(.select2-search__field)",
                        tolerance: "pointer",
                        stop: function() {
                            e(n.find(".select2-selection__choice").get().reverse()).each((function() {
                                var t = e(this).data("data").id,
                                    n = a.find('option[value="' + t + '"]')[0];
                                a.prepend(n)
                            }))
                        }
                    })
                }
            })), selected_items = [], e("#cb-select-all").on("change", (function(t) {
                var a = e(this),
                    n = e(".cb-select-items");
                a.is(":checked") ? n.each((function(t, a) {
                    e(a).prop("checked", "checked")
                })) : n.each((function(t, a) {
                    e(a).prop("checked", ""), selected_items.pop()
                }))
            }))
        }(jQuery),
        function(e) {
            function t(t, a) {
                const n = e(t.target).closest("li.has-submenu");
                n.find(".navigation-submenu").each(((t, o) => {
                    if (a) n.removeClass("submenu-hovered"), e(".dokan-dashboard-wrap").css("height", ""), e(o).css("bottom", 0), e(o).removeAttr("style");
                    else {
                        n.addClass("submenu-hovered");
                        let t = n[0].getBoundingClientRect(),
                            a = o.getBoundingClientRect(),
                            i = e(".dokan-dashboard-wrap"),
                            r = i[0].getBoundingClientRect(),
                            d = Math.min(r.bottom, r.height);
                        if (d < a.height) {
                            let e = a.height - d;
                            t.top < t.height && (e += t.top), i.css("height", r.height + e)
                        } else i.css("height", "");
                        if (t.top < t.height) e(o).css("bottom", "unset"), e(o).css("top", 0);
                        else {
                            e(o).css("top", "unset");
                            let n = t.top - a.height;
                            if (n > 0) e(o).css("bottom", 0), a = o.getBoundingClientRect(), a.top < 0 && (e(o).css("bottom", "unset"), e(o).css("top", 0));
                            else {
                                e(o).css("bottom", n);
                                let t = e(".dokan-dash-sidebar")[0].getBoundingClientRect(),
                                    i = e(".entry-header")[0].getBoundingClientRect();
                                a = o.getBoundingClientRect(), a.bottom > t.bottom ? n += a.bottom - t.bottom : a.bottom - i.bottom < a.height && (n += a.bottom - i.bottom - a.height - 20), e(o).css("bottom", n)
                            }
                        }
                    }
                }))
            }
            e(document.body).on("wc_add_error_tip", (function(t, a, n) {
                var o = a.position();
                0 === a.parent().find(".wc_error_tip").length && (a.after('<div class="wc_error_tip ' + n + '">' + dokan[n] + "</div>"), a.parent().find(".wc_error_tip").css("left", o.left + a.width() - a.width() / 2 - e(".wc_error_tip").width() / 2).css("top", o.top + a.height()).fadeIn("100"))
            })).on("wc_remove_error_tip", (function(t, a, n) {
                a.parent().find(".wc_error_tip." + n).fadeOut("100", (function() {
                    e(this).remove()
                }))
            })).on("click", (function() {
                e(".wc_error_tip").fadeOut("100", (function() {
                    e(this).remove()
                }))
            })).on("blur", ".wc_input_decimal[type=text], .wc_input_price[type=text], .wc_input_country_iso[type=text]", (function() {
                e(".wc_error_tip").fadeOut("100", (function() {
                    e(this).remove()
                }))
            })).on("change", ".wc_input_price[type=text], .wc_input_decimal[type=text], .wc-order-totals #refund_amount[type=text]", (function() {
                var t, a, n = dokan.decimal_point;
                (e(this).is(".wc_input_price") || e(this).is("#refund_amount")) && (n = dokan.mon_decimal_point), t = new RegExp("[^-0-9%\\" + n + "]+", "gi"), a = new RegExp("\\" + n + "+", "gi");
                var o = e(this).val(),
                    i = o.replace(t, "").replace(a, n);
                o !== i && e(this).val(i)
            })).on("keyup", ".wc_input_price[type=text], .wc_input_decimal[type=text], .wc_input_country_iso[type=text], .wc-order-totals #refund_amount[type=text]", (function() {
                var t, a, n, o = !1;
                e(this).is(".wc_input_price") || e(this).is("#refund_amount") ? (o = !0, t = new RegExp("[^-0-9%\\" + dokan.mon_decimal_point + "]+", "gi"), n = new RegExp("[^\\" + dokan.mon_decimal_point + "]", "gi"), a = "i18n_mon_decimal_error") : e(this).is(".wc_input_country_iso") ? (t = new RegExp("([^A-Z])+|(.){3,}", "im"), a = "i18n_country_iso_error") : (o = !0, t = new RegExp("[^-0-9%\\" + dokan.decimal_point + "]+", "gi"), n = new RegExp("[^\\" + dokan.decimal_point + "]", "gi"), a = "i18n_decimal_error");
                var i = e(this).val(),
                    r = i.replace(t, "");
                o && 1 < r.replace(n, "").length && (r = r.replace(n, "")), i !== r ? e(document.body).triggerHandler("wc_add_error_tip", [e(this), a]) : e(document.body).triggerHandler("wc_remove_error_tip", [e(this), a])
            })).on("change", "#_sale_price.wc_input_price[type=text], .wc_input_price[name^=variable_sale_price], #_subscription_sale_price.wc_input_price[type=text]", (function() {
                var t, a = e(this),
                    n = e("#product_type");
                t = -1 !== a.attr("name").indexOf("variable") ? a.parents(".variable_pricing").find(".wc_input_price[name^=variable_regular_price]") : n.length && "subscription" === n.find(":selected").val() ? e("#_subscription_price") : e("#_regular_price"), parseFloat(window.accounting.unformat(a.val(), dokan.mon_decimal_point)) >= parseFloat(window.accounting.unformat(t.val(), dokan.mon_decimal_point)) && e(this).val("")
            })).on("keyup", "#_sale_price.wc_input_price[type=text], .wc_input_price[name^=variable_sale_price], #_subscription_sale_price.wc_input_price[type=text]", (function() {
                var t, a = e(this),
                    n = e("#product_type");
                t = -1 !== a.attr("name").indexOf("variable") ? a.parents(".variable_pricing").find(".wc_input_price[name^=variable_regular_price]") : n.length && "subscription" === n.find(":selected").val() ? e("#_subscription_price") : e("#_regular_price"), parseFloat(window.accounting.unformat(a.val(), dokan.mon_decimal_point)) >= parseFloat(window.accounting.unformat(t.val(), dokan.mon_decimal_point)) ? e(document.body).triggerHandler("wc_add_error_tip", [e(this), "i18n_sale_less_than_regular_error"]) : e(document.body).triggerHandler("wc_remove_error_tip", [e(this), "i18n_sale_less_than_regular_error"])
            })).on("init_tooltips", (function() {
                e(".tips, .help_tip, .woocommerce-help-tip").tipTip({
                    attribute: "data-tip",
                    fadeIn: 50,
                    fadeOut: 50,
                    delay: 200
                }), e(".column-wc_actions .wc-action-button").tipTip({
                    fadeIn: 50,
                    fadeOut: 50,
                    delay: 200
                }), e(".parent-tips").each((function() {
                    e(this).closest("a, th").attr("data-tip", e(this).data("tip")).tipTip({
                        attribute: "data-tip",
                        fadeIn: 50,
                        fadeOut: 50,
                        delay: 200
                    }).css("cursor", "help")
                }))
            })), e("#dokan-navigation .dokan-dashboard-menu li.has-submenu:not(.active)").on("mouseover", (e => {
                t(e)
            })).on("mouseout", (e => {
                t(e, !0)
            }))
        }(jQuery), window.dokan_show_delete_prompt = async function(e, t) {
            e.preventDefault();
            let a = await dokan_sweetalert(t, {
                action: "confirm",
                icon: "warning"
            });
            if (a.isConfirmed && void 0 !== e.target.href) window.location.href = e.target.href;
            else {
                if (!a.isConfirmed || void 0 === e.target.dataset.url) return !1;
                window.location.href = e.target.dataset.url
            }
        }, window.dokan_bulk_delete_prompt = async function(e, t, a, n) {
            "delete" === jQuery(a).val() && (e.preventDefault(), (await dokan_sweetalert(t, {
                action: "confirm",
                icon: "warning"
            })).isConfirmed && jQuery(n).submit())
        },
        function(e) {
            var t = {
                query: {},
                form: null,
                cateItemStringArray: [],
                init: function() {
                    e("#dokan-store-listing-filter-wrap .sort-by #stores_orderby").on("change", this.buildSortByQuery), e("#dokan-store-listing-filter-wrap .toggle-view span").on("click", this.toggleView), e("#dokan-store-listing-filter-wrap .dokan-store-list-filter-button, #dokan-store-listing-filter-wrap .dokan-icons, #dokan-store-listing-filter-form-wrap .apply-filter #cancel-filter-btn ").on("click", this.toggleForm), e("#dokan-store-listing-filter-form-wrap .store-search-input").on("change", this.buildSearchQuery), e("#dokan-store-listing-filter-form-wrap .apply-filter #apply-filter-btn").on("click", this.submitForm), this.maybeHideListView();
                    const a = t;
                    a.form = document.forms.dokan_store_lists_filter_form;
                    const n = a.getLocal("dokan-layout");
                    if (n) {
                        const t = e(".toggle-view span");
                        a.setView(n, t)
                    }
                    const o = a.getParams();
                    if (o.length) {
                        let t = !1;
                        o.forEach((function(e) {
                            const n = Object.keys(e),
                                i = Object.values(e);
                            (!n.includes("stores_orderby") || o.length > 1) && (t = !0), a.setParams(n, i)
                        })), t && e("#dokan-store-listing-filter-form-wrap").slideToggle()
                    }
                    var i, r;
                    e("#dokan-store-listing-filter-form-wrap").length && e(".store-search-input").on("keypress", (function(t) {
                        if (13 == t.which) return e("#dokan-store-listing-filter-form-wrap").submit(), !1
                    })), e("body").on("click", (function(t) {
                        e(t.target).is("div#dokan-store-products-search-result li") || (e("#dokan-store-products-search-result").html(""), e("#dokan-store-products-search-result").removeClass("dokan-store-products-search-has-results"))
                    })), e("body").on("keyup", ".dokan-store-products-filter-search", (i = function(t) {
                        t.preventDefault();
                        var a = e(this),
                            n = a.val(),
                            o = a.data("store_id");
                        n && (e(".dokan-store-products-filter-search").addClass("dokan-ajax-search-loader"), e("#dokan-store-products-search-result").removeClass("dokan-store-products-search-has-results"), e("#dokan-store-products-search-result").hide(), e("#dokan-store-products-search-result").html(""), jQuery.ajax({
                            type: "post",
                            dataType: "json",
                            url: dokan.ajaxurl,
                            data: {
                                search_term: n,
                                store_id: o,
                                _wpnonce: dokan.store_product_search_nonce,
                                action: "dokan_store_product_search_action"
                            },
                            success: function(t) {
                                e(".dokan-store-products-filter-search").removeClass("dokan-ajax-search-loader"), e("#dokan-store-products-search-result").show(), e("#dokan-store-products-search-result").addClass("dokan-store-products-search-has-results"), "success" == t.type ? e("#dokan-store-products-search-result").html("<ul>" + t.data_list + "</ul>") : e("#dokan-store-products-search-result").html('<ul class="dokan-store-product-results-not-found">' + t.data_list + "</ul>")
                            }
                        }))
                    }, 500, r = 0, function() {
                        var e = this,
                            t = arguments;
                        clearTimeout(r), r = setTimeout((function() {
                            i.apply(e, t)
                        }), 500)
                    }))
                },
                buildSortByQuery: function(e) {
                    const a = t;
                    a.query.stores_orderby = e.target.value, a.submitForm(e)
                },
                toggleView: function(a) {
                    const n = t,
                        o = e(a.target),
                        i = o.parent().find("span"),
                        r = o.data("view");
                    n.setView(r, i), n.setLocal("dokan-layout", r)
                },
                setView: function(t, a) {
                    if (void 0 === t || t.length < 1 || void 0 === a || a.length < 1) return;
                    const n = e("#dokan-seller-listing-wrap");
                    [...a].forEach((function(a) {
                        const o = e(a);
                        t === o.data("view") ? (o.addClass("active"), n.addClass(t)) : (o.removeClass("active"), n.removeClass(o.data("view")))
                    }))
                },
                toggleForm: function(t) {
                    t.preventDefault(), e("#dokan-store-listing-filter-form-wrap").slideToggle()
                },
                buildSearchQuery: function(e) {
                    e.target.value ? t.query.dokan_seller_search = e.target.value : delete t.query.dokan_seller_search
                },
                submitForm: function(a) {
                    a.preventDefault(), t.query._store_filter_nonce && delete t.query._store_filter_nonce, t.query._store_filter_nonce = e('input[name="_store_filter_nonce"]').first().val();
                    const n = decodeURIComponent(e.param(t.query)),
                        o = "/page",
                        i = window.location.pathname,
                        r = i.includes(o) ? i.substr(0, i.indexOf(o)) : "";
                    window.history.pushState(null, null, `${r}?${n}`), window.location.reload()
                },
                setLocal: function(e, t) {
                    window.localStorage.setItem(e, t)
                },
                getLocal: function(e) {
                    return window.localStorage.getItem(e)
                },
                setParams: function(a, n) {
                    const o = t,
                        i = o.form ? o.form.elements : "",
                        r = document.forms.stores_sorting,
                        d = r ? r.elements : "";
                    Object.values(d).forEach((function(t) {
                        t.name === a[0] && e(t).val(n[0])
                    })), Object.values(i).forEach((function(t) {
                        if (a.includes(t.name) && ("checkbox" === t.type ? t.checked = !!["yes", "true", "1"].includes(n[0]) : ["text", "search"].includes(t.type) && (t.value = n[0])), a[0].includes("store_categories[") || a[0].includes("store_category[")) {
                            const t = n[0].split(" ").join("-"),
                                a = e(`[data-slug=${t}]`);
                            o.cateItemStringArray.includes(a.text().trim()) || o.cateItemStringArray.push(a.text().trim()), a.addClass("dokan-btn-theme")
                        } else if ("rating" === a[0]) {
                            const t = n[0].split(" ").join("-");
                            e(`[data-${a[0]}=${t}]`).addClass("active"), e(`[data-rating=${t}]`).parent().addClass("selected")
                        }
                    })), a.forEach((function(e, t) {
                        e.includes("[") || (o.query[e] = n[t])
                    }))
                },
                getParams: function() {
                    const e = new URLSearchParams(location.search),
                        t = [];
                    return e.forEach((function(e, a) {
                        t.push({
                            [a]: e
                        })
                    })), t
                },
                maybeHideListView: function() {
                    const a = t;
                    window.matchMedia("(max-width: 767px)").matches && "list-view" === a.getLocal("dokan-layout") && a.setLocal("dokan-layout", "grid-view"), e(window).on("resize", (function() {
                        e(this).width() < 767 ? (e("#dokan-seller-listing-wrap").removeClass("list-view"), e("#dokan-seller-listing-wrap").addClass("grid-view")) : (e(".toggle-view.item span").last().removeClass("active"), e(".toggle-view.item span").first().addClass("active"))
                    }))
                }
            };
            window.dokan && (window.dokan.storeLists = t, window.dokan.storeLists.init())
        }(jQuery), (e => {
            const t = {
                init: () => {
                    e("#dokan-request-withdraw-button").on("click", (e => {
                        e.preventDefault(), t.openRequestWithdrawWindow()
                    })), e(".dokan-withdraw-make-default-button").on("click", (e => {
                        e.preventDefault(), t.makeDefault(e)
                    })), e("#dokan-withdraw-display-schedule-popup").on("click", (e => {
                        t.opensScheduleWindow(e)
                    })), e("#dokan-withdraw-schedule-request-submit").on("click", (e => {
                        t.handleScheduleChangeRequest(e)
                    })), e("input[name='withdraw-schedule']").on("change", (e => {
                        t.handleScheduleChange(e)
                    })), t.initModal()
                },
                withdrawTemplate: "",
                withdrawModal: "",
                loadModalTemplate: function() {
                    if (!t.withdrawTemplate && e("#tmpl-withdraw-request-popup").length) {
                        const e = window.wp.template("withdraw-request-popup");
                        t.withdrawTemplate = e()
                    }
                },
                initModal: function() {
                    t.loadModalTemplate();
                    const a = e("#dokan-withdraw-request-popup").iziModal({
                        width: 690,
                        overlayColor: "rgba(0, 0, 0, 0.8)",
                        headerColor: dokan.modal_header_color,
                        onOpening: function(e) {
                            t.calculateWithdrawCharges()
                        }
                    });
                    a.iziModal("setContent", t.withdrawTemplate), e("[name='withdraw_method'][id='withdraw-method']").on("change", (e => {
                        t.calculateWithdrawCharges()
                    })), e("input#withdraw-amount").on("keyup", t.debounce(t.calculateWithdrawCharges, 500)), e("#dokan-withdraw-request-submit").on("click", (e => {
                        t.handleWithdrawRequest(e)
                    })), t.withdrawModal = a
                },
                debounce(e, t, a) {
                    var n;
                    return function() {
                        var o = this,
                            i = arguments,
                            r = a && !n;
                        clearTimeout(n), n = setTimeout((function() {
                            n = null, a || e.apply(o, i)
                        }), t), r && e.apply(o, i)
                    }
                },
                openRequestWithdrawWindow: () => {
                    t.withdrawModal.iziModal("open")
                },
                opensScheduleWindow: () => {
                    const a = wp.template("withdraw-schedule-popup"),
                        n = e("#dokan-withdraw-schedule-popup").iziModal({
                            width: 690,
                            overlayColor: "rgba(0, 0, 0, 0.8)",
                            headerColor: dokan.modal_header_color
                        });
                    n.iziModal("setContent", a().trim()), n.iziModal("open"), t.init()
                },
                makeDefault: t => {
                    const a = e(t.target),
                        n = e("#dokan-withdraw-payment-method-list");
                    n.block({
                        message: null,
                        overlayCSS: {
                            background: "#fff",
                            opacity: .6
                        }
                    }), e.post(dokan.ajaxurl, {
                        action: "dokan_withdraw_handle_make_default_method",
                        nonce: n.data("security"),
                        method: a.data("method")
                    }, (e => {
                        e.success ? (dokan_sweetalert(e.data, {
                            position: "bottom-end",
                            toast: !0,
                            icon: "success",
                            showConfirmButton: !1,
                            timer: 2e3,
                            timerProgressBar: !0
                        }), n.unblock(), window.location.reload()) : (dokan_sweetalert(e.data, {
                            position: "bottom-end",
                            toast: !0,
                            icon: "error",
                            showConfirmButton: !1,
                            timer: 2e3,
                            timerProgressBar: !0
                        }), n.unblock())
                    }))
                },
                handleWithdrawRequest: t => {
                    t.preventDefault();
                    const a = e("input#withdraw-amount").val(),
                        n = e("input#dokan_withdraw_nonce").val(),
                        o = e("#withdraw-request-popup"),
                        i = e("#withdraw-method").val();
                    o.block({
                        message: null,
                        overlayCSS: {
                            background: "#fff",
                            opacity: .6
                        }
                    }), e.post(dokan.ajaxurl, {
                        action: "dokan_handle_withdraw_request",
                        _handle_withdraw_request: n,
                        amount: a,
                        method: i
                    }, (async e => {
                        e.success ? await dokan_sweetalert(e.data, {
                            position: "bottom-end",
                            toast: !0,
                            icon: "success",
                            showConfirmButton: !1,
                            timer: 2e3,
                            timerProgressBar: !0,
                            didOpen: e => {
                                setTimeout((function() {
                                    o.unblock(), window.location.reload()
                                }), 2e3)
                            }
                        }) : (dokan_sweetalert("", {
                            icon: "error",
                            html: e.data
                        }), o.unblock())
                    }))
                },
                handleScheduleChangeRequest: t => {
                    t.preventDefault();
                    const a = e("input[name='withdraw-schedule']:checked").val(),
                        n = e("#dokan-withdraw-schedule-request-submit").data("security"),
                        o = e("#withdraw-schedule-popup"),
                        i = e("#withdraw-remaining-amount").val(),
                        r = e("#minimum-withdraw-amount").val(),
                        d = e("#preferred-payment-method").val();
                    o.block({
                        message: null,
                        overlayCSS: {
                            background: "#fff",
                            opacity: .6
                        }
                    }), e.post(dokan.ajaxurl, {
                        action: "dokan_handle_withdraw_schedule_change_request",
                        nonce: n,
                        schedule: a,
                        reserve: i,
                        minimum: r,
                        method: d
                    }, (e => {
                        e.success ? (dokan_sweetalert(e.data, {
                            position: "bottom-end",
                            toast: !0,
                            icon: "success",
                            showConfirmButton: !1,
                            timer: 2e3,
                            timerProgressBar: !0
                        }), o.unblock(), window.location.reload()) : (dokan_sweetalert("", {
                            icon: "error",
                            html: e.data
                        }), o.unblock())
                    }))
                },
                handleScheduleChange: t => {
                    const a = e(t.target).data("next-schedule");
                    e("#dokan-withdraw-next-scheduled-date").html(a)
                },
                calculateWithdrawCharges: () => {
                    let a = e("select[name='withdraw_method'][id='withdraw-method'] option:selected").data();
                    if (e("#dokan-send-withdraw-request-popup-form > .dokan-alert-danger").length || !a) return;
                    e("[name='withdraw_method'][id='withdraw-method']").val();
                    let n = e("[name='withdraw_amount'][id='withdraw-amount']").val();
                    n = accounting.unformat(n, dokan.mon_decimal_point);
                    let {
                        chargePercentage: o,
                        chargeFixed: i
                    } = e("select[name='withdraw_method'][id='withdraw-method'] option:selected").data(), r = 0, d = "";
                    i && (d += t.formatMoney(i), r += i), o && (r += o / 100 * n, d += d ? " + " : "", d += parseFloat(accounting.formatNumber(o, dokan.rounding_precision, "")).toString().replace(".", dokan.mon_decimal_point) + "%", d += ` = ${t.formatMoney(r)}`), d || (d = t.formatMoney(r, dokan.currency)), t.showWithdrawChargeHtml(d, r, n)
                },
                formatMoney: e => accounting.formatMoney(e, {
                    symbol: dokan.currency_format_symbol,
                    decimal: dokan.currency_format_decimal_sep,
                    thousand: dokan.currency_format_thousand_sep,
                    precision: dokan.currency_format_num_decimals,
                    format: dokan.currency_format
                }),
                showWithdrawChargeHtml(a, n, o) {
                    let i = e("#dokan-withdraw-charge-section"),
                        r = e("#dokan-withdraw-revivable-section");
                    e("#dokan-withdraw-charge-section-text").html(a), e("#dokan-withdraw-revivable-section-text").html(t.formatMoney(o - n)), i.show(), r.show()
                }
            };
            e(document).ready((function() {
                t.init()
            }))
        })(jQuery),
        function(e) {
            ! function() {
                let t = {
                    format: dokan_get_daterange_picker_format(),
                    ...dokan_helper.daterange_picker_local
                };
                e(".dokan-daterangepicker").daterangepicker({
                    autoUpdateInput: !1,
                    showDropdowns: !0,
                    locale: t
                }), e(".dokan-daterangepicker").on("apply.daterangepicker", (function(a, n) {
                    e(this).val(n.startDate.format(t.format) + " - " + n.endDate.format(t.format)), e(this).siblings("input.dokan-daterangepicker-start-date").val(n.startDate.format("YYYY-MM-DD")), e(this).siblings("input.dokan-daterangepicker-end-date").val(n.endDate.format("YYYY-MM-DD"))
                })), e(".dokan-daterangepicker").on("cancel.daterangepicker", (function(t, a) {
                    e(this).data("clear") && (e(this).val(""), e(this).siblings("input.dokan-daterangepicker-start-date").val(""), e(this).siblings("input.dokan-daterangepicker-end-date").val(""))
                }))
            }()
        }(jQuery)
})();