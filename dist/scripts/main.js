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
        this.viewNote($(".view"), $(".viewExitButton"), $(".viewNote"), $(".viewContainer"));
        this.delNote($(".delete"), $(".delNote"), $(".delOk"), $(".delNo"));
      }
    }, {
      key: "init",
      value: function init() {
        this.addButton(this.addNoteSelector);
        this.addNoteOk();
        this.addNoteCancel(this.addNoteSelector, this.noteNameSelector, this.descSelector);
      }
    }, {
      key: "addButton",
      value: function addButton(addNoteSelector) {
        this.addBtnSelector.on("click", function () {
          addNoteSelector.show(500);
        });
      }
    }, {
      key: "addNoteOk",
      value: function addNoteOk() {
        var _this2 = this;

        this.addOkBtn.on("click", function () {
          var $noteName = _this2.noteNameSelector.val();

          var $noteDesc = _this2.descSelector.val();

          if ($noteName && $noteDesc !== undefined) {
            var note = new Note($noteName, $noteDesc, _this2.selectorList);

            _this2.addNote(note);

            note.asElement();

            _this2.noteNameSelector.val("");

            _this2.descSelector.val("");

            _this2.updateView();
          }

          _this2.addNoteSelector.hide(500);
        });
      }
    }, {
      key: "addNoteCancel",
      value: function addNoteCancel(addNoteSelector, noteNameSelector, descSelector) {
        this.addCancelBtn.on("click", function () {
          if ((noteNameSelector.val() && descSelector.val()) !== undefined) {
            noteNameSelector.val("");
            descSelector.val("");
          }

          addNoteSelector.hide(500);
        });
      }
    }, {
      key: "viewNote",
      value: function viewNote(btn, btnExit, selector, selectorForName) {
        var _this3 = this;

        var onOff = true;
        btn.on("click", function (e) {
          if (e.target.closest(".note")) {
            var index = e.target.closest(".note").getAttribute("data-index");

            if (onOff) {
              var $name = $("<h3></h3>");
              $name.text(_this3.notes[index].name);
              selectorForName.prepend($name);
              var $description = $("<p></p>");
              $description.text(_this3.notes[index].description);
              selector.append($description);
              selector.show(500);
              btnExit.on("click", function () {
                //need to fix <h3> and <p> elements below (stays after delete)
                $name.text("");
                $description.text("");
                selector.hide(500);
                onOff = true;
              });
              onOff = false;
            }
          }
        });
      }
    }, {
      key: "delNote",
      value: function delNote(btn, selector, btnYes, btnNo) {
        var _this4 = this;

        btn.on("click", function (e) {
          if (e.target.closest(".note")) {
            _this4.removeNote(e.target.closest(".note").getAttribute("data-index")); //need to fix button below (un correct delete)

            /*let index = e.target.closest(".note").getAttribute("data-index");
            selector.show(500);
            btnYes.on("click", () => {
                selector.hide(500);
                this.removeNote(index);
            });
            btnNo.on("click", () => {
                selector.hide(500);
            });*/

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