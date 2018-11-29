"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

jQuery(document).ready(function () {
  var Note =
  /*#__PURE__*/
  function () {
    function Note(noteName, description, notesSelector) {
      _classCallCheck(this, Note);

      this.name = noteName;
      this.description = description;
      this.notesSelector = notesSelector;
    }

    _createClass(Note, [{
      key: "asElement",
      value: function asElement() {
        var $note = $("\n                <figure class=\"note\">\n                    <h3>".concat(this.name, "</h3>\n                    <div class=\"noteContainer\">\n                        <div class=\"view\">\n                            <img src=\"images/eye.png\" alt=\"eye\">\n                        </div>\n                        <div class=\"delete\">\n                            <img src=\"images/del.png\" alt=\"del\">\n                        </div>\n                    </div>\n                </figure>\n            "));
        var $notesSelector = $(this.notesSelector);
        $notesSelector.append($note);
        return $notesSelector;
      }
    }]);

    return Note;
  }(); //----------------


  var $addNote = $(".addNote");
  var $delNote = $(".delNote");
  var $viewNote = $(".viewNote");

  var Notes =
  /*#__PURE__*/
  function () {
    function Notes(selector) {
      _classCallCheck(this, Notes);

      this.notes = [];
      this.selector = selector;
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
            var note = new Note($noteName, $noteDesc, _this.selector);

            _this.addNote(note);

            note.asElement();
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

  var notes = new Notes(".todo");
});