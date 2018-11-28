"use strict";

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

jQuery(document).ready(function () {
  var $addNote = $(".addNote");
  var $delNote = $(".delNote");
  var $viewNote = $(".viewNote");

  var Note = function Note(name, description) {
    _classCallCheck(this, Note);

    this.name = name;
    this.description = description;
  };

  var Notes =
  /*#__PURE__*/
  function () {
    function Notes() {
      _classCallCheck(this, Notes);

      this.notes = [];
      this.init();
    }

    _createClass(Notes, [{
      key: "init",
      value: function init() {
        this.addNote();
        this.addButton();
        this.addNoteOk();
        this.addNoteCancel();
      }
    }, {
      key: "addNote",
      value: function addNote(note) {
        this.notes.push(note);
      }
    }, {
      key: "addButton",
      value: function addButton() {
        var $addBtn = $(".add");
        $addBtn.on("click", function () {
          $addNote.show(500);
        });
      }
    }, {
      key: "addNoteOk",
      value: function addNoteOk() {
        var _this = this;

        var $addOk = $(".addOk");
        $addOk.on("click", function () {
          var $noteName = $(".noteName").val();
          var $noteDesc = $("#desc").val();

          if ($noteName && $noteDesc !== undefined) {
            var note = new Note($noteName, $noteDesc);

            _this.addNote(note);

            $(".noteName").val("");
            $("#desc").val("");
          }

          $addNote.hide(500);
        });
      }
    }, {
      key: "addNoteCancel",
      value: function addNoteCancel() {
        var $addCancel = $(".addCancel");
        $addCancel.on("click", function () {
          if (($(".noteName").val() && $("#desc").val()) !== undefined) {
            $(".noteName").val("");
            $("#desc").val("");
          }

          $addNote.hide(500);
        });
      }
    }]);

    return Notes;
  }();

  var notes = new Notes();
});