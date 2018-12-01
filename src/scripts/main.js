jQuery(document).ready(function () {
    class Note {
        constructor(noteName, description, notesSelectorList) {
            this.name = noteName;
            this.description = description;
            this.notesSelectorList = notesSelectorList;
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
            let $notesSelectorList = $(this.notesSelectorList);
            $notesSelectorList.append($note);
            return $notesSelectorList;
        }
    }


    class Module {
        constructor(selectorList) {
            this.notes = [];
            this.selectorLIst = selectorList;
        }

        addNote(note) {
            this.notes.push(note);
        }

        remove(index) {
            this.notes.splice(index, 1);
        }
    }


    class NotesModule extends Module {
        constructor(selectorList) {
            super(selectorList);
            this.addNoteSelector = $(".addNote");
            this.addBtnSelector = $(".add");
            this.noteNameSelector = $(".noteName");
            this.descSelector = $("#desc");
            this.addOkBtn = $(".addOk");
            this.addCancelBtn = $(".addCancel");
            this.init();
        }

        loadedLater() {
            this.viewNote($(".view"));
            this.delNote($(".delete"));

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
                    let note = new Note($noteName, $noteDesc, this.selectorLIst);
                    this.addNote(note);
                    note.asElement();
                    noteNameSelector.val("");
                    descSelector.val("");
                    this.updateView();
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

        viewNote(btn) {
            btn.on("click", (e) =>{
                if(e.target.closest(".note")) alert(this.notes[]);
                //let $viewNote = $(".viewNote");
                //$viewNote.show(500);
            })
        }

        delNote(btn) {
            btn.on("click", () =>{
                alert("delete")
            })
        }

        updateView(){
            this.loadedLater();
        }
    }


    let notes = new NotesModule(".notesList");
});