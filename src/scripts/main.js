jQuery(document).ready(function () {
    class Note {
        constructor(noteName, description, notesSelector) {
            this.name = noteName;
            this.description = description;
            this.notesSelector = notesSelector;
        }
        asElement() {
            let $note = $(`
                <figure class="note">
                    <h3>${this.name}</h3>
                    <div class="noteContainer">
                        <div class="view">
                            <img src="images/eye.png" alt="eye">
                        </div>
                        <div class="delete">
                            <img src="images/del.png" alt="del">
                        </div>
                    </div>
                </figure>
            `);
            let $notesSelector = $(this.notesSelector);
            $notesSelector.append($note);
            return $notesSelector;
        }
    }

//----------------
    let $addNote = $(".addNote");
    let $delNote = $(".delNote");
    let $viewNote = $(".viewNote");

    class Notes {
        constructor(selector) {
            this.notes = [];
            this.selector = selector;
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
                    let note = new Note($noteName, $noteDesc, this.selector);
                    this.addNote(note);
                    note.asElement();
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

    let notes = new Notes(".todo");
});