! function(e, t, n) {
    t.dokan_get_i18n_date_format = function(e = !0) {
        if (!e) return dokan_helper.i18n_date_format;
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
            n = 0,
            o = "",
            r = "";
        for (n = 0; n < dokan_helper.i18n_date_format.length; n++) o = dokan_helper.i18n_date_format[n], r += o in t ? t[o] : o;
        return r
    }, t.dokan_get_i18n_time_format = function(e = !0) {
        if (!e) return dokan_helper.i18n_time_format;
        let t = {
                N: "E",
                S: "o",
                w: "e",
                z: "DDD",
                W: "W",
                F: "MMMM",
                m: "MM",
                M: "MMM",
                n: "M",
                o: "YYYY",
                Y: "YYYY",
                y: "YY",
                a: "a",
                A: "A",
                g: "h",
                G: "H",
                h: "hh",
                H: "HH",
                i: "mm",
                s: "ss",
                u: "SSS",
                e: "zz",
                U: "X"
            },
            n = 0,
            o = "",
            r = "";
        for (n = 0; n < dokan_helper.i18n_time_format.length; n++) "\\" !== dokan_helper.i18n_time_format[n] ? (o = dokan_helper.i18n_time_format[n], r += o in t ? t[o] : o) : (r += dokan_helper.i18n_time_format[n], n++, r += dokan_helper.i18n_time_format[n]);
        return r
    }, t.dokan_get_formatted_time = function(e, t, n = dokan_get_i18n_time_format()) {
        const o = t.length;
        if (o <= 0) return "";
        const r = moment(e, n).toDate(),
            a = function(e) {
                return e < 10 ? "0" + e : e
            },
            i = String(r.getHours()),
            s = String(r.getMinutes()),
            l = String(r.getSeconds()),
            c = i >= 12 ? "pm" : "am",
            d = i >= 12 ? "PM" : "AM",
            h = (e, t) => e[t] ? e[t] : t;
        convertTime = e => ((e = e.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [e]).length > 1 && ((e = e.slice(1))[0] = +e[0] % 12 || 12), e[0]), hour12 = convertTime(`${a(i)}:${a(s)}`), replaceMent = {
            hh: a(hour12),
            h: hour12,
            HH: a(i),
            H: i,
            g: hour12,
            MM: a(s),
            M: s,
            mm: a(s),
            m: s,
            i: a(s),
            ss: a(l),
            s: l,
            A: d,
            a: c
        };
        let p = "",
            m = "",
            _ = "";
        for (let e = 0; e < o; e++) _ = t[e], "\\" === _ ? (m.length > 0 && (p += h(replaceMent, m), m = ""), e++, p += t[e]) : 0 === m.length ? m = _ : m !== _ ? (p += h(replaceMent, m), m = _) : m === _ && (m += _);
        return p += m.length ? h(replaceMent, m) : "", p
    }, t.dokan_get_daterange_picker_format = function(e = dokan_helper.i18n_date_format) {
        let t = {
                d: "D",
                D: "DD",
                j: "D",
                l: "DD",
                F: "MMMM",
                m: "MM",
                M: "MM",
                n: "M",
                o: "YYYY",
                Y: "YYYY",
                y: "YY",
                g: "h",
                G: "H",
                h: "hh",
                H: "HH",
                i: "mm",
                s: "ss"
            },
            n = 0,
            o = "",
            r = "";
        for (n = 0; n < e.length; n++) o = e[n], r += o in t ? t[o] : o;
        return r
    }, t.dokan_sweetalert = async function(e = "", t = {}) {
        const n = { ...{
                    text: e,
                    showCancelButton: !0,
                    confirmButtonColor: "#28a745",
                    cancelButtonColor: "#dc3545",
                    ...dokan_helper.sweetalert_local
                },
                ...t
            },
            o = n.action;
        switch (delete n.action, o) {
            case "confirm":
            case "prompt":
                return await Swal.fire(n);
            default:
                delete n.showCancelButton, Swal.fire(n)
        }
    }, t.dokan_execute_recaptcha = function(t, n) {
        return new Promise((function(o) {
            "undefined" == typeof dokan_google_recaptcha && o();
            const r = dokan_google_recaptcha.recaptcha_sitekey,
                a = e.querySelector(t);
            "" === r && o(), grecaptcha.ready((function() {
                grecaptcha.execute(r, {
                    action: n
                }).then((function(e) {
                    a.value = e, o()
                }))
            }))
        }))
    }, t.dokan_handle_ajax_error = function(e) {
        let t = "";
        return e.responseJSON && e.responseJSON.message ? t = e.responseJSON.message : e.responseJSON && e.responseJSON.data && e.responseJSON.data.message ? t = e.responseJSON.data.message : e.responseText && (t = e.responseText), t
    }, t.dokan_sanitize_phone_number = function(e) {
        -1 === ["Backspace", "Tab", "Enter", "Escape"].indexOf(e.key) && -1 === ["(", ")", ".", "-", "_", "+"].indexOf(e.key) && ("a" === e.key && !0 === e.ctrlKey || -1 === ["ArrowLeft", "ArrowRight"].indexOf(e.key) && (e.shiftKey && !isNaN(Number(e.key)) || isNaN(Number(e.key)) && e.preventDefault()))
    };
    let o = "<svg width='20px' height='20px' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>\n  <path d='M8 4V16C8 17.1046 8.89543 18 10 18L18 18C19.1046 18 20 17.1046 20 16V7.24162C20 6.7034 19.7831 6.18789 19.3982 5.81161L16.0829 2.56999C15.7092 2.2046 15.2074 2 14.6847 2H10C8.89543 2 8 2.89543 8 4Z' stroke='#000000' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/>\n  <path d='M16 18V20C16 21.1046 15.1046 22 14 22H6C4.89543 22 4 21.1046 4 20V9C4 7.89543 4.89543 7 6 7H8' stroke='#000000' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/>\n  </svg>",
        r = null,
        a = {
            init() {
                this.copyToClipBoardInit(), n(".dokan-copy-to-clipboard").on("click", this.copyToClipboardClickhandler)
            },
            copyToClipBoardInit() {
                r = n(".dokan-copy-to-clipboard"), r.css("cursor", "pointer"), r.html(o)
            },
            copyToClipboardClickhandler() {
                let t = n(this),
                    r = n(this).data("copy") ? n(this).data("copy") : "";
                const a = e.createElement("textarea");
                a.classList.add("dokan-copy-to-clipboard-textarea"), e.body.appendChild(a), a.value = r, a.select(), a.setSelectionRange(0, 99999);
                let i = e.execCommand("copy");
                e.body.removeChild(a), i && (t.html('<svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n  <path d="M4.89163 13.2687L9.16582 17.5427L18.7085 8" stroke="#000000" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>\n  </svg>'), setTimeout((() => {
                    t.html(o)
                }), 1e3))
            }
        };
    n(e).ready((function() {
        a.init()
    }))
}(document, window, jQuery);