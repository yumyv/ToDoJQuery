jQuery(document).ready(function () {
    class Module {
        constructor(selector) {
            this.selector = selector;
        }

        get(selector) {
            return this.container.querySelector(selector);
        }

        init() {
            this.container = document.querySelector(this.selector);
        }
    }

    class Page {
        constructor() {
            this.modules = [];
        }

        registerModule(module) {
            this.modules.push(module);
        }

        init() {
            this.modules.forEach(m => m.init())
        }

        start() {
            window.addEventListener("load", () => this.init());
        }
    }

//--------------------------- ToDoApp ----------------------
    class Note {
        constructor(name, description) {
            this.name = name;
            this.description = description;
        }

        asElement() {
            let note =
        }
    }


    /*let $addNote = $(".addNote");
    let $delNote = $(".delNote");
    let $viewNote = $(".viewNote");

    class Note {
        constructor(name, description) {
            this.name = name;
            this.description = description;
        }
    }

    class Notes {
        constructor() {
            this.notes = [];
            this.init();
        }

        init() {
            this.addNote();
            this.addButton();
            this.addNoteOk();
            this.addNoteCancel();
        }

        addNote(note) {
            this.notes.push(note);
        }

        addButton() {
            let $addBtn = $(".add");
            $addBtn.on("click", function () {
                $addNote.show(500);
            });
        }

        addNoteOk() {
            let $addOk = $(".addOk");
            $addOk.on("click", () => {
                let $noteName = $(".noteName").val();
                let $noteDesc = $("#desc").val();
                if ($noteName && $noteDesc !== undefined) {
                    let note = new Note($noteName, $noteDesc);
                    this.addNote(note);
                    $(".noteName").val("");
                    $("#desc").val("");
                }
                $addNote.hide(500);
            });
        }

        addNoteCancel() {
            let $addCancel = $(".addCancel");
            $addCancel.on("click", function () {
                if (($(".noteName").val() && $("#desc").val()) !== undefined) {
                    $(".noteName").val("");
                    $("#desc").val("");
                }
                $addNote.hide(500);
            })
        }
    }

    let notes = new Notes();
*/
    ////////////////
    let page = new Page();
    page.registerModule(new NotesModule(".todo"));
    page.start();
});