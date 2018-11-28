jQuery(document).ready(function () {
    let $addNote = $(".addNote");
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

});