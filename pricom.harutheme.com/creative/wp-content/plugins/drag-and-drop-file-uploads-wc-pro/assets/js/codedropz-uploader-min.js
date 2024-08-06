/**
 * CodeDropz Uploader 5.0.1
 * Copyright 2019 Glen Mongaya
 * CodeDropz - Drag & Drop Uploader
 * @version 5.0.1
 * @author CodeDropz, Glen Don L. Mongaya
 * @license The MIT License (MIT)
 */

! function(e) {
    e.fn.CodeDropz_Wc_Uploader = function(a) {
        var r = [],
            s = [];
        this.each(function() {
            var o = e(this),
                n = e.extend({
                    is_pro: !1,
                    handler: o,
                    form: o.parents("form"),
                    color: "#000",
                    background: "",
                    upload_dir: null,
                    server_max_error: "Uploaded file exceeds the maximum upload size of your server.",
                    max_file: o.data("max") ? o.data("max") : 5,
                    max_upload_size: o.data("limit") ? o.data("limit") : "10485760",
                    supported_type: o.data("type") ? o.data("type") : "jpg|jpeg|JPG|png|gif|pdf|doc|docx|ppt|pptx|odt|avi|ogg|m4a|mov|mp3|mp4|mpg|wav|wmv|xls",
                    max_total_size: "100MB",
                    parallel_uploads: 2,
                    chunks: !1,
                    chunk_size: 1e4,
                    text: "Drag & Drop Files Here",
                    separator: "or",
                    button_text: "Browse Files",
                    err_message: {
                        maxNumFiles: "You have reached the maximum number of files ( Only %s files allowed )",
                        maxUploadLimit: "Note : Some of the files could not be uploaded ( Only %s files allowed )",
                        maxTotalSize: "The total file(s) size exceeding the max size limit of %s."
                    },
                    on_success: "",
                    in_progress: "",
                    completed: "",
                    after_deleted: ""
                }, a),
                t = {
                    parallelUploads: n.parallel_uploads,
                    chunking: n.chunks,
                    chunkSize: n.chunk_size,
                    progress__id: "codedropz--results"
                },
                i = 1048576 * parseInt(n.max_total_size.replace("[^0-9]/g", "")),
                d = o.data("name"),
                l = '<div class="codedropz-upload-handler"><div class="codedropz-upload-container"><div class="codedropz-upload-inner"><div class="codedropz-label"><span class="cd-icon">' + (dnd_wc_uploader.uploader_info.icon ? '<img src="' + dnd_wc_uploader.uploader_info.icon + '"/>' : '<i class="icon-cloud-upload"></i>') + '</span><span class="text">' + n.text + '</span><span class="cd-separator">' + n.separator + '</span><a class="cd-upload-btn" href="javascript:void(0)">' + n.button_text + "</a></div></div></div>" + (1 == dnd_wc_uploader.hide_counter ? "" : '<span class="dnd-upload-counter"><span>0</span> ' + dnd_wc_uploader.uploader_info.of + " " + parseInt(n.max_file) + "</span>") + "</div>";
            n.handler.wrapAll('<div class="codedropz-upload-wrapper"></div>');
            var p = n.form,
                u = n.handler.parents(".codedropz-upload-wrapper");
            n.handler.after(l), !e(".codedropz--preview", u).length > 0 && u.append('<div class="codedropz--preview"></div>');
            var c = {
                init: function() {
                    var a = this;
                    s[d = this.getFieldName(d)] = [], r[d] = {
                        total: 0,
                        uploaded: 0,
                        uploading: !0,
                        maxTotalSize: 0,
                        maxSize: n.max_upload_size,
                        maxFile: n.max_file
                    }, e(".codedropz-upload-handler", u).on("drag dragstart dragend dragover dragenter dragleave drop", function(e) {
                        e.preventDefault(), e.stopPropagation()
                    }), e(".codedropz-upload-handler", u).on("dragover dragenter", function(a) {
                        e(this).addClass("codedropz-dragover")
                    }), e(".codedropz-upload-handler", u).on("dragleave dragend drop", function(a) {
                        e(this).removeClass("codedropz-dragover")
                    }), !e("." + t.progress__id, u).length > 0 && u.append('<div class="' + t.progress__id + '"></div>'), this.getUploadFiles(), e(document).on("click", "a.remove-file", function(r) {
                        e(this).hasClass("deleting") || a.deleteFiles(e(this).data("index"), e(this), e(this).data("name"))
                    }), /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) && o.removeAttr("accept"), e("body").on("added_to_cart", function() {
                        s[d] = [], r[d].total = 0, r[d].uploaded = 0, r[d].maxTotalSize = 0, e(".codedropz--preview").html(""), e(".dnd-upload-counter span").text("0"), e('input:hidden[name^="' + d + '"]').remove()
                    })
                },
                getFieldName: function(e) {
                    return e.replace(/[^a-zA-Z0-9_-]/g, "")
                },
                deleteFiles: function(a, r, o) {
                    var t, i = s[o],
                        d = this;
                    r.addClass("deleting").text(dnd_wc_uploader.uploader_info.delete);
                    for (var l = 0; l < i.length; l++)
                        if (t = i[l], i[l].hasOwnProperty("file") && ("undefined" === e.type(a) || t.index === a)) {
                            if (t.queued && !1 == t.complete && !t.error) r.addClass("deleting").text("aborting..."), this.abortFile(t), this.removeFile(t, l, o);
                            else if (t.complete) {
                                var p = {
                                    _file: t,
                                    _index: l,
                                    _name: o
                                };
                                data = {
                                    action: "dnd_codedropz_wc_upload_delete",
                                    security: dnd_wc_uploader.nonce,
                                    path: e('input[data-index="' + t.progressbar + '"]').val(),
                                    index: t.progressbar
                                }, console.log(data), e.post(n.ajax_url, data, function(e) {
                                    e.success && (d.removeFile(p._file, p._index, p._name), console.log(p._file.name + " - file deleted."))
                                })
                            } else this.removeFile(t, l, o)
                        }
                },
                abortFile: function(e) {
                    var a = dnd_wc_uploader.storage_type;
                    t.chunking && "local_storage" == a ? e.chunkTransfer && e.chunkTransfer.abort() : "remote_storage" == a ? e.chunkTransfer && e.chunkTransfer.abort() : e.transfer.abort()
                },
                removeFile: function(a, s, o) {
                    var t = e("#" + a.progressbar).parents(".codedropz-upload-wrapper");
                    a && a.hasOwnProperty("file") && null != a.progressbar && ((progressBar = t.find("#" + a.progressbar)).length > 0 ? (a.deleted = !0, r[o].total--, r[o].maxTotalSize = r[o].maxTotalSize - a.size, a.complete && r[o].uploaded > 0 && r[o].uploaded--, progressBar.remove(), e('input[data-index="' + a.progressbar + '"]').remove(), this.resetQueue(o), e.isFunction(n.after_deleted) && n.after_deleted.call(this, a.progressbar, r[o])) : console.log("Progress Bar not exists!"), r[o].uploaded < r[o].maxFile && t.find("span.has-error-msg").remove(), r[o].maxTotalSize > i && (u = t, this.validateFiles.setError(n.err_message.maxTotalSize, !1, n.max_total_size)), e(".dnd-upload-counter span", e('input[data-name="' + o + '"]').parents(".codedropz-upload-wrapper")).text(r[o].total))
                },
                getUploadFiles: function() {
                    var a = this;
                    e(".codedropz-upload-handler", u).on("drop", function(e) {
                        a.handleFiles(e.originalEvent.dataTransfer.files)
                    }), e("a.cd-upload-btn", u).on("click", function(e) {
                        e.preventDefault(), n.handler.val(null), n.handler.click()
                    }), n.handler.on("change", function(e) {
                        a.handleFiles(this.files)
                    })
                },
                handleFiles: function(a) {
                    var o = a.length,
                        t = [];
                    if (r[d].maxFile) {
                        var l = r[d].maxFile - r[d].uploaded;
                        l >= 0 && a.length > l && (o = l), 0 == r[d].uploaded && r[d].total > 0 && (o = r[d].maxFile - r[d].total)
                    }
                    if (e("span.has-error-msg", u).remove(), r[d].total >= r[d].maxFile) return this.validateFiles.setError(n.err_message.maxNumFiles, !0, n.max_file);
                    if (o > 0)
                        for (var p = 0; p < o; p++) t = {
                            index: $unique_index = "index-" + Date.now().toString(36) + Math.random().toString(36).substr(2, 5),
                            file: a[p],
                            name: a[p].name,
                            size: a[p].size,
                            queued: !1,
                            complete: !1,
                            error: !1,
                            pause: !1,
                            transfer: null,
                            progressbar: null,
                            deleted: !1
                        }, a.length - o > 0 && this.validateFiles.setError(n.err_message.maxUploadLimit, !1, n.max_file), r[d].total++, r[d].maxTotalSize += t.size, t.progressbar = this.progressBar.make(t), !1 === this.validateFiles.check(t, d) && (t.error = !0), r[d].maxTotalSize > i && !0 == n.is_pro && (this.validateFiles.setError(n.err_message.maxTotalSize, !0, n.max_total_size), t.pause = !0), s[d].push(t);
                    r[d].uploading = !0, this.processQueue(s[d], d)
                },
                validateFiles: {
                    setError: function(a, r, s) {
                        if (e("span.has-error-msg", u).remove(), e("." + t.progress__id, u).after('<span class="has-error-msg">' + a.replace("%s", s) + "</span>"), r) return !1
                    },
                    check: function(a, s) {
                        if (!a) return !0;
                        if (a.progressbar) {
                            var o = e("#" + a.progressbar).find(".dnd-upload-details");
                            if (e("#" + a.progressbar).find(".has-error").remove(), a.size > r[s].maxSize) return o.append('<span class="has-error">' + dnd_wc_uploader.drag_n_drop_upload.large_file + "</span>"), !1;
                            if (a.size < 1e3) return o.append('<span class="has-error">' + dnd_wc_uploader.drag_n_drop_upload.sizeNotValid + "</span>"), !1;
                            if (!(regex_type = RegExp("(.*?).(" + n.supported_type + ")$")).test(a.name.toLowerCase())) return o.append('<span class="has-error">' + dnd_wc_uploader.drag_n_drop_upload.inavalid_type + "</span>"), !1
                        }
                        return a
                    }
                },
                resetQueue: function(e) {
                    var a = [];
                    if (r[e].uploading = !0, s[e].length > 0)
                        for (var o in s[e]) !0 == !s[e][o].deleted && a.push(s[e][o]), !0 == s[e][o].pause && r[e].maxTotalSize < i && (s[e][o].pause = !1);
                    a.length > 0 && (s[e] = a), this.processQueue(s[e], e), console.log(s[e]), console.log(r[e]), console.log(c.bytesToSize(r[e].maxTotalSize) + " of " + n.max_total_size)
                },
                processQueue: function(a, o) {
                    var i = 0,
                        d = [];
                    if (r[o].uploading) {
                        for (var l in a) !1 == a[l].complete && !1 == a[l].error && !1 == a[l].pause && d.push(a[l]);
                        e.isFunction(n.in_progress) && n.in_progress.call(this, p, d, s[o]);
                        for (var l = 0; l < d.length; l++)
                            if (d[l].hasOwnProperty("file") && (!1 == d[l].queued && this.uploadFile(s[o], d[l], o), ++i >= t.parallelUploads && !0 == n.is_pro)) return;
                        0 == i && (r[o].uploading = !1, e.isFunction(n.completed) && n.completed.call(this, p, o, r[o]))
                    }
                },
                previewThumbnail: function(a) {
                    if (a.file) {
                        if (-1 === e.inArray(a.file.type, ["image/png", "image/jpg", "image/jpeg", "image/gif", "image/tiff", "image/xheic"])) return !1;
                        var r = new FileReader;
                        r.onload = function(r) {
                            e("#" + a.progressbar).find(".dnd-upload-image").addClass("no-bg").append('<div class="preview" title="' + a.name + '" style="background-image:url(' + r.target.result + ')"></div>')
                        }, r.readAsDataURL(a.file)
                    }
                },
                progressBar: {
                    make: function(a) {
                        var r = "dnd-file-" + e.now() + "-" + Math.random().toString(36).substr(2, 9),
                            s = !1;
                        1 == dnd_wc_uploader.show_thumbnail && (s = c.previewThumbnail(a));
                        var o = '<div class="dnd-upload-image">' + (!1 === s ? '<span class="icon-images"></span>' : "") + '</div><div class="dnd-upload-details"><span class="name"><span>' + a.name + "</span> <em>(" + c.bytesToSize(a.size) + ')</em></span><a href="javascript:void(0)" title="' + dnd_wc_uploader.uploader_info.remove + '" class="remove-file" data-name="' + d + '" data-index="' + a.index + '"><span class="icon-close-outline"></span></a><span class="dnd-progress-bar"><span></span></span></div>';
                        return !e("." + t.progress__id, u).length > 0 && u.append('<div class="' + t.progress__id + '"></div>'), e("." + t.progress__id, u).append('<div id="' + r + '" class="dnd-upload-status">' + o + "</div>"), r
                    },
                    setProgress: function(a, r) {
                        var s = e(".dnd-progress-bar", e("#" + a));
                        return s.length > 0 && (progress_width = r * s.width() / 100, e("span", s).addClass("in-progress").animate({
                            width: progress_width
                        }, 10).text(r + "% "), 100 == r && e("span", s).addClass("complete").removeClass("in-progress")), !1
                    }
                },
                uploadFile: function(a, s, i) {
                    var d = this,
                        l = new FormData,
                        u = 1024 * t.chunkSize,
                        c = dnd_wc_uploader.storage_type;
                    if (l.append("size_limit", n.max_upload_size), l.append("action", "dnd_codedropz_wc_upload"), l.append("id", o.data("id")), l.append("unique", s.progressbar), l.append("security", dnd_wc_uploader.nonce), !1 == n.is_pro) return !1;
                    t.chunking && s.size > u && "local_storage" == c ? (s.queued = !0, s.chunkSize = u, s.totalChunks = Math.ceil(s.size / s.chunkSize), s.currentChunk = 0, s.action = "dnd_codedropz_wc_upload_chunks", this.uploadChunks(a, s, i)) : "remote_storage" == c ? (s.chunkSize = parseInt(dnd_wc_uploader.storage_chunks), s.action = "codedropz_storage_chunks_upload-wc", s.queued = !0, s.currentChunk = 0, "amazon" == dnd_wc_uploader.storage_name && (s.chunkSize = 5242880), this.uploadChunks(a, s, i)) : (s.queued = !0, l.append("dnd-wc-upload-file", s.file), s.transfer = e.ajax({
                        url: n.ajax_url,
                        type: p.attr("method"),
                        data: l,
                        dataType: "json",
                        cache: !1,
                        contentType: !1,
                        processData: !1,
                        xhr: function() {
                            var e = new window.XMLHttpRequest;
                            return e.upload.addEventListener("progress", function(e) {
                                if (e.lengthComputable) {
                                    var a = parseInt(100 * (e.loaded / e.total));
                                    d.progressBar.setProgress(s.progressbar, a - 1)
                                }
                            }, !1), e
                        },
                        success: function(o) {
                            o.success ? (d.progressBar.setProgress(s.progressbar, 100), s.complete = !0, r[i].uploaded++, d.processQueue(a, i), e.isFunction(n.on_success) && n.on_success.call(this, s.progressbar, o, i, r[i])) : (e("#" + s.progressbar).find(".dnd-upload-details").append('<span class="has-error">' + o.data + "</span>"), s.error = !0, d.processQueue(a, i))
                        },
                        error: function(r, o, n) {
                            e("#" + s.progressbar).find(".dnd-upload-details").append('<span class="has-error">' + n + "</span>"), s.error = !0, d.processQueue(a, i)
                        }
                    }))
                },
                uploadChunks: function(a, s, t) {
                    s.totalChunks = Math.ceil(s.size / s.chunkSize);
                    var i = s.chunkSize * s.currentChunk,
                        d = i + s.chunkSize,
                        l = this;
                    d > s.size && (d = s.size);
                    var u = this.sliceFile(s.file, i, d),
                        c = new FormData;
                    if (c.append("security", dnd_wc_uploader.nonce), c.append("start", i), c.append("end", d), c.append("total_chunks", s.totalChunks), c.append("chunk_size", s.chunkSize), c.append("chunk", s.currentChunk), c.append("chunks-file", u, s.file.name), c.append("unique", s.progressbar), c.append("id", o.data("id")), c.append("action", s.action), c.append("size_limit", n.max_upload_size), c.append("file_size", s.size), s.data) {
                        var h = JSON.stringify(s.data);
                        c.has("data") ? c.set("data", h) : c.append("data", h)
                    }
                    s.chunkTransfer = e.ajax({
                        url: n.ajax_url,
                        type: p.attr("method"),
                        dataType: "json",
                        data: c,
                        type: "POST",
                        contentType: !1,
                        processData: !1,
                        cache: !1,
                        success: function(o, i, d) {
                            o && void 0 !== o && (s.currentChunk++, o.data.partial_chunks && s.currentChunk < s.totalChunks && (s.data = o.data, l.uploadChunks(a, s, t)), console.log(s.name + " [chunk -" + s.currentChunk + " of " + s.totalChunks + "]"), o.data.file && (s.currentChunk == s.totalChunks && l.progressBar.setProgress(s.progressbar, 100), s.complete = !0, r[t].uploaded++, l.processQueue(a, t), e.isFunction(n.on_success) && n.on_success.call(this, s.progressbar, o, t, r[t])))
                        },
                        xhr: function() {
                            var e = new window.XMLHttpRequest;
                            return e.upload.addEventListener("progress", function(e) {
                                if (e.lengthComputable) {
                                    var a = e.loaded / e.total,
                                        r = Math.ceil(1 / s.totalChunks * 99),
                                        o = s.currentChunk / s.totalChunks * 99,
                                        n = 0 == s.currentChunk ? r * a : r * a + o;
                                    l.progressBar.setProgress(s.progressbar, parseInt(n))
                                }
                            }, !1), e
                        },
                        error: function(r, o, n) {
                            e("#" + s.progressbar).find(".dnd-upload-details").append('<span class="has-error">' + n + "</span>"), s.error = !0, l.processQueue(a, t)
                        }
                    })
                },
                sliceFile: function(e, a, r) {
                    return (e.mozSlice ? e.mozSlice : e.webkitSlice ? e.webkitSlice : e.slice ? e.slice : {}).bind(e)(a, r)
                },
                bytesToSize: function(e) {
                    return 0 === e ? "0" : fileSize = (kBytes = e / 1024) >= 1024 ? (kBytes / 1024).toFixed(2) + "MB" : kBytes.toFixed(2) + "KB"
                }
            };
            c.init()
        })
    }
}(jQuery);