"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

jQuery(document).ready(function () {
  var Module =
  /*#__PURE__*/
  function () {
    function Module(selector) {
      _classCallCheck(this, Module);

      this.selector = selector;
    }

    _createClass(Module, [{
      key: "get",
      value: function get(selector) {
        return this.container.querySelector(selector);
      }
    }, {
      key: "init",
      value: function init() {
        this.container = document.querySelector(this.selector);
        this.loadComponents();
        this.bindEvents();
        this.onCreate();
      }
    }]);

    return Module;
  }();

  var Page =
  /*#__PURE__*/
  function () {
    function Page() {
      _classCallCheck(this, Page);

      this.modules = [];
    }

    _createClass(Page, [{
      key: "registerModule",
      value: function registerModule(module) {
        this.modules.push(module);
      }
    }, {
      key: "init",
      value: function init() {
        this.modules.forEach(function (m) {
          return m.init();
        });
      }
    }, {
      key: "start",
      value: function start() {
        var _this = this;

        window.addEventListener("load", function () {
          return _this.init();
        });
      }
    }]);

    return Page;
  }(); /////////////////////


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
        var _this2 = this;

        var $addOk = $(".addOk");
        $addOk.on("click", function () {
          var $noteName = $(".noteName").val();
          var $noteDesc = $("#desc").val();

          if ($noteName && $noteDesc !== undefined) {
            var note = new Note($noteName, $noteDesc);

            _this2.addNote(note);

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

  var notes = new Notes(); ////////////////

  var page = new Page();
  page.registerModule(new NotesModule(".todo"));
  page.start();
});