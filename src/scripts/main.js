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
            return $note;
        }
    }


    class Module {
        constructor() {
            this.notes = [];
        }

        addNote(note) {
            this.notes.push(note);
        }

        getAll() {
            return this.notes;
        }

        remove(index) {
            this.notes.splice(index, 1);
        }
    }


    class NotesModule extends Module {
        constructor() {
            super();
            this.selectorList = $(".notesList");
            this.addNoteSelector = $(".addNote");
            this.addBtnSelector = $(".add");
            this.noteNameSelector = $(".noteName");
            this.descSelector = $("#desc");
            this.addOkBtn = $(".addOk");
            this.addCancelBtn = $(".addCancel");
            this.init();
        }

        loadedLater() {
            this.viewNote($(".view"), $(".todo"));
            this.viewNoteCancel();
            this.delNote($(".delete"),$(".delNote"),$(".delOk"),$(".delNo"));
        }

        init() {
            this.addButton(this.addNoteSelector);
            this.addNoteOk();
            this.addNoteCancel(this.addNoteSelector, this.noteNameSelector, this.descSelector);
        }

        addButton(addNoteSelector) {
            this.addBtnSelector.on("click", function () {
                addNoteSelector.show(500);
            });
        }

        addNoteOk() {
            this.addOkBtn.on("click", () => {
                let $noteName = this.noteNameSelector.val();
                let $noteDesc = this.descSelector.val();
                if ($noteName && $noteDesc !== undefined) {
                    let note = new Note($noteName, $noteDesc, this.selectorList);
                    this.addNote(note);
                    note.asElement();
                    this.noteNameSelector.val("");
                    this.descSelector.val("");
                    this.updateView();
                }
                this.addNoteSelector.hide(500);
            });
        }

        addNoteCancel(addNoteSelector, noteNameSelector, descSelector) {
            this.addCancelBtn.on("click", function () {
                if ((noteNameSelector.val() && descSelector.val()) !== undefined) {
                    noteNameSelector.val("");
                    descSelector.val("");
                }
                addNoteSelector.hide(500);
            })
        }

        viewNote(btn, selector) {
            btn.on("click", (e) => {
                let elem = e.target.closest(".note").getAttribute("data-index");
                let $viewNote = $(`
                        <div class="viewNote noteWindow">
                            <div class="viewContainer">
                                <h3>${this.notes[elem].name}</h3>
                                <div class="viewExitButton">
                                    <img src="images/exit.png" alt="exit">
                                </div>
                            </div>
                            <p>${this.notes[elem].description}</p>
                        </div>
                    `);
                selector.append($viewNote);
                $viewNote.show(500);
            })
        }

        viewNoteCancel() {
            $(".viewExitButton").on("click", (e) => {
                console.log("hello");
                /*if (e.target.closest(".viewNote")){
                    console.log(e.target.closest(".viewNote"));
                    $(".viewNote").hide(500);
                }*/
            })
        }

        delNote(btn,selector,btnYes,btnNo) {
            btn.on("click", (e) => {
                if (e.target.closest(".note")) {
                    selector.show(500);
                    btnYes.on("click", () => {
                        this.removeNote(e.target.closest(".note").getAttribute("data-index"));
                        selector.hide(500);
                    });
                    btnNo.on("click", () => {
                        selector.hide(500);
                    })
                }
            })
        }

        updateView() {
            this.selectorList.html("");
            this.getAll().forEach((note, i) => {
                let noteElem = note.asElement();
                noteElem.attr("data-index", i);
                this.selectorList.append(noteElem);
            });
            this.loadedLater();
        }

        removeNote(index) {
            this.remove(index);
            this.updateView();
        }
    }


    let notes = new NotesModule();

});