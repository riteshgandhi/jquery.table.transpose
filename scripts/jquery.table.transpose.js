/*
Author 		: Ritesh Gandhi
DOC		    : 20-April-2017
Basic Usage 	: $('#table').transpose({mode: 0});
                  $('#table').transpose("transpose");
*/

/*
The MIT License (MIT)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

(function ($) {
	$(function () {
		$.widget("blk.transpose", {
			options: {
				mode:0 //0=vertical 1=horizontal
            },
            _create: function () {
                this.sourceTableID = "#" + $(this.element).prop("id");
            },
            transpose: function () {
                if (this.options.mode == 0) {
                    this._tpVertical();
                }
                else if (this.options.mode == 1) {
                    this._tpHorizontal();
                }
                this.element.data("tp_mode", this.options.mode);
            },
            _tpHorizontal: function () {
                var srcTableID = this.sourceTableID;
                var uniqueID = $($(srcTableID).uniqueId()).prop("id");
                var hasHeader = $(srcTableID + " > thead").length > 0;
                var col = 0;
                $(srcTableID + " > tbody > tr").each(function () {
                    col = 0;
                    $(this).hide().addClass("tp_src_rows");
                    $(this.cells).each(function () {
                        if ($(this).is("th")) {
                            if (!hasHeader) {
                                var newHeader = $("<thead></thead>").appendTo($(srcTableID));
                                $("<tr></tr>").appendTo($(newHeader)).addClass("tp_rows");
                                hasHeader = true;
                            }
                            $(srcTableID + " > thead > tr").append($(this).remove().clone());
                        }
                        else {
                            var $newrow = null;
                            var rowID = "tp_row_" + uniqueID + "_" + col;
                            if ($("#" + rowID).length == 0) {
                                $newrow = $('<tr id=' + rowID + '></tr>');
                                $newrow.addClass("tp_rows");
                                $(srcTableID + '> tbody:last').append($newrow);
                            }
                            else {
                                $newrow = $("#" + rowID);
                            }
                            $newrow.append($(this).remove().clone());
                            col++;
                        }
                    });
                });
            },
			_tpVertical: function () {
                var srcTableID = this.sourceTableID;
                var uniqueID = $($(srcTableID).uniqueId()).prop("id");
                var hasHeader = $(srcTableID + " > thead").length > 0;
                if (hasHeader) {
                    $(srcTableID + " > thead").hide();
                    $(srcTableID + " > thead > tr").each(function () {
                        $(this.cells).each(function (index,hcell) {
                            var $newrow = null;
                            var rowID = "tp_row_" + uniqueID + "_" + index;
                            if ($("#" + rowID).length == 0) {
                                $newrow = $('<tr id=' + rowID + '></tr>');
                                $newrow.addClass("tp_rows");
                                $(srcTableID + '> tbody:last').append($newrow);
                            }
                            else {
                                $newrow = $("#" + rowID);
                            }
                            var $newHCell = $('<th>' + $(hcell).text().trim() + '</th>');
                            $newrow.append($newHCell);
                        });
                    });
                }
                $(srcTableID + " > tbody > tr").each(function () {
                    if (!$(this).hasClass("tp_rows")) {
                        $(this).hide();
                        $(this.cells).each(function (index, dcell) {
                            var $newrow = null;
                            var rowID = "tp_row_" + uniqueID + "_" + index;
                            if ($("#" + rowID).length == 0) {
                                $newrow = $('<tr id=' + rowID + '></tr>');
                                $newrow.addClass("tp_rows");
                                $(srcTableID + '> tbody:last').append($newrow);
                            }
                            else {
                                $newrow = $("#" + rowID);
                            }
                            $newrow.append($(this).remove().clone());
                        });
                    }
                });
            },
            reset: function () {
                if (this.options.mode == 0) {
                    this._resetVertical();
                }
                else if (this.options.mode == 1) {
                    this._resetHorizontal();
                }
                $(this.sourceTableID).removeData("tp_mode");
            },
            _resetHorizontal: function () {
                var srcTableID = this.sourceTableID;
                var tpSrcRows = $(srcTableID + " > tbody > tr.tp_src_rows");
                var col = 0;
                $(srcTableID + " > thead > tr").each(function () {
                    $(this.cells).each(function () {
                        $(tpSrcRows[col]).append($(this).remove().clone());
                        col++;
                    });
                });
                $(srcTableID + " > thead").empty().remove();
                var tpRows = $(srcTableID + " > tbody > tr.tp_rows");
                $(tpRows).each(function () {
                    col = 0;
                    $(this.cells).each(function () {
                        $(tpSrcRows[col]).append($(this).remove().clone());
                        col++;
                    });
                });
                $(tpRows).remove();
                $(tpSrcRows).removeClass("tp_src_rows");
                $(tpSrcRows).show();
            },
            _resetVertical: function () {
                var srcTableID = this.sourceTableID;
                var tpRows = $(srcTableID + " > tbody > tr.tp_rows");
                var col = 0;
                tpRows.each(function (index, value) {
                    $(value.cells).each(function () {
                        if ($(this).is("th")) {
                            //$(srcTableID + " > thead > tr").append($(this).remove().clone());
                        }
                        else {
                            $($(srcTableID + " > tbody > tr")[col]).append($(this).remove().clone());
                            $($(srcTableID + " > tbody > tr")[col]).show();
                            col++;
                        }
                    });
                    $(value).remove();
                    col = 0;
                });
                $(srcTableID + " > thead").show();
            }
		});
	});
})(jQuery);