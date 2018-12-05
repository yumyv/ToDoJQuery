"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

jQuery(document).ready(function () {
  var Note =
  /*#__PURE__*/
  function () {
    function Note(noteName, description, notesSelectorList) {
      _classCallCheck(this, Note);

      this.name = noteName;
      this.description = description;
      this.notesSelectorList = notesSelectorList;
    }

    _createClass(Note, [{
      key: "asElement",
      value: function asElement() {
        var $note = $("\n                <figure class=\"note\">\n                    <h3>".concat(this.name, "</h3>\n                    <div class=\"noteContainer\">\n                        <div class=\"view\">\n                            <img src=\"images/eye.png\" alt=\"eye\">\n                        </div>\n                        <div class=\"delete\">\n                            <img src=\"images/del.png\" alt=\"del\">\n                        </div>\n                    </div>\n                </figure>\n            "));
        var $notesSelectorList = $(this.notesSelectorList);
        $notesSelectorList.append($note);
        return $note;
      }
    }]);

    return Note;
  }();

  var Module =
  /*#__PURE__*/
  function () {
    function Module() {
      _classCallCheck(this, Module);

      this.notes = [];
    }

    _createClass(Module, [{
      key: "addNote",
      value: function addNote(note) {
        this.notes.push(note);
      }
    }, {
      key: "getAll",
      value: function getAll() {
        return this.notes;
      }
    }, {
      key: "remove",
      value: function remove(index) {
        this.notes.splice(index, 1);
      }
    }]);

    return Module;
  }();

  var NotesModule =
  /*#__PURE__*/
  function (_Module) {
    _inherits(NotesModule, _Module);

    function NotesModule() {
      var _this;

      _classCallCheck(this, NotesModule);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(NotesModule).call(this));
      _this.selectorList = $(".notesList");
      _this.addNoteSelector = $(".addNote");
      _this.addBtnSelector = $(".add");
      _this.noteNameSelector = $(".noteName");
      _this.descSelector = $("#desc");
      _this.addOkBtn = $(".addOk");
      _this.addCancelBtn = $(".addCancel");

      _this.init();

      return _this;
    }

    _createClass(NotesModule, [{
      key: "loadedLater",
      value: function loadedLater() {
        this.viewNote($(".view"));
        this.delNote($(".delete"));
      }
    }, {
      key: "init",
      value: function init() {
        this.addButton(this.addNoteSelector, this.addBtnSelector);
        this.addNoteOk(this.addNoteSelector, this.noteNameSelector, this.descSelector, this.addOkBtn);
        this.addNoteCancel(this.addNoteSelector, this.noteNameSelector, this.descSelector, this.addCancelBtn);
      }
    }, {
      key: "addButton",
      value: function addButton(selector, btn) {
        btn.on("click", function () {
          selector.show(500);
        });
      }
    }, {
      key: "addNoteOk",
      value: function addNoteOk(addNoteSelector, noteNameSelector, descSelector, btn) {
        var _this2 = this;

        btn.on("click", function () {
          var $noteName = noteNameSelector.val();
          var $noteDesc = descSelector.val();

          if ($noteName && $noteDesc !== undefined) {
            var note = new Note($noteName, $noteDesc, _this2.selectorList);

            _this2.addNote(note);

            note.asElement();
            noteNameSelector.val("");
            descSelector.val("");

            _this2.updateView();
          }

          addNoteSelector.hide(500);
        });
      }
    }, {
      key: "addNoteCancel",
      value: function addNoteCancel(addNoteSelector, noteNameSelector, descSelector, btn) {
        btn.on("click", function () {
          if ((noteNameSelector.val() && descSelector.val()) !== undefined) {
            noteNameSelector.val("");
            descSelector.val("");
          }

          addNoteSelector.hide(500);
        });
      }
    }, {
      key: "viewNote",
      value: function viewNote(btn) {
        var _this3 = this;

        btn.on("click", function (e) {
          var elem = e.target.closest(".note").getAttribute("data-index");
          var $viewNote = $("\n                        <div class=\"viewNote noteWindow\">\n                            <div class=\"viewContainer\">\n                                <h3>".concat(_this3.notes[elem].name, "</h3>\n                                <div class=\"viewExitButton\">\n                                    <img src=\"images/exit.png\" alt=\"exit\">\n                                </div>\n                            </div>\n                            <p>\n                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum doloremque eius enim error excepturi\n                            </p>\n                        </div>\n                    "));
          $viewNote.show(500);
        });
      }
    }, {
      key: "delNote",
      value: function delNote(btn) {
        var _this4 = this;

        btn.on("click", function (e) {
          if (e.target.closest(".note")) {
            _this4.removeNote(e.target.closest(".note").getAttribute("data-index"));
          }
        });
      }
    }, {
      key: "updateView",
      value: function updateView() {
        var _this5 = this;

        this.selectorList.html("");
        this.getAll().forEach(function (note, i) {
          var noteElem = note.asElement();
          noteElem.attr("data-index", i);

          _this5.selectorList.append(noteElem);
        });
        this.loadedLater();
      }
    }, {
      key: "removeNote",
      value: function removeNote(index) {
        this.remove(index);
        this.updateView();
      }
    }]);

    return NotesModule;
  }(Module);

  var notes = new NotesModule();
});