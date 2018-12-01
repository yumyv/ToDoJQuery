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


    class Module {
        constructor(selector) {
            this.notes = [];
            this.selector = selector;
        }

        addNote(note) {
            this.notes.push(note);
        }

        remove(index) {
            this.notes.splice(index, 1);
        }
    }


    class NotesModule extends Module {
        constructor(selector) {
            super(selector);
            this.addNoteSelector = $(".addNote");
            this.addBtnSelector = $(".add");
            this.noteNameSelector = $(".noteName");
            this.descSelector = $("#desc");
            this.addOkBtn = $(".addOk");
            this.addCancelBtn = $(".addCancel");
            this.init();
        }

        init() {
            this.addButton(this.addNoteSelector, this.addBtnSelector);
            this.addNoteOk(this.addNoteSelector, this.noteNameSelector, this.descSelector, this.addOkBtn);
            this.addNoteCancel(this.addNoteSelector, this.noteNameSelector, this.descSelector, this.addCancelBtn);
        }

        addButton(selector, btn) {
            btn.on("click", function () {
                selector.show(500);
            });
        }

        addNoteOk(addNoteSelector, noteNameSelector, descSelector, btn) {
            btn.on("click", () => {
                let $noteName = noteNameSelector.val();
                let $noteDesc = descSelector.val();
                if ($noteName && $noteDesc !== undefined) {
                    let note = new Note($noteName, $noteDesc, this.selector);
                    this.addNote(note);
                    note.asElement();
                    noteNameSelector.val("");
                    descSelector.val("");
                }
                addNoteSelector.hide(500);
            });
        }

        addNoteCancel(addNoteSelector, noteNameSelector, descSelector, btn) {
            btn.on("click", function () {
                if ((noteNameSelector.val() && descSelector.val()) !== undefined) {
                    noteNameSelector.val("");
                    descSelector.val("");
                }
                addNoteSelector.hide(500);
            })
        }
    }


    let notes = new NotesModule(".todo");
});