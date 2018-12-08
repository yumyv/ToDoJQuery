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
            this.viewNote($(".view"), $(".viewExitButton"), $(".viewNote"), $(".viewContainer"));
            this.delNote($(".delete"), $(".delNote"), $(".delOk"), $(".delNo"));
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

        viewNote(btn, btnExit, selector, selectorForName) {
            let onOff = true;
            btn.on("click", (e) => {
                if (e.target.closest(".note")) {
                    let index = e.target.closest(".note").getAttribute("data-index");

                    if (onOff) {
                        let $name = $("<h3></h3>");
                        $name.text(this.notes[index].name);
                        $name.addClass(".forName");///////
                        selectorForName.prepend($name);

                        let $description = $("<p></p>");
                        $description.text(this.notes[index].description);
                        selector.append($description);
                        selector.show(500);

                        btnExit.on("click", () => {
                            $name.text("");
                            $description.text("");

                            selector.hide(500);
                            onOff = true;
                        });
                        onOff = false;
                    }
                }
            })
        }

        delNote(btn, selector, btnYes, btnNo) {
            btn.on("click", (e) => {
                if (e.target.closest(".note")) {
                    let index = e.target.closest(".note").getAttribute("data-index");
                    selector.show(500);
                    //need to fix button below
                    //example:
                    /*btn.on("click", (e) => {
                        if (e.target.closest(".note")) {
                            this.removeNote(e.target.closest(".note").getAttribute("data-index"));
                        }
                    })*/
                    btnYes.on("click", () => {
                        selector.hide(500);
                        this.removeNote(index);
                    });
                    btnNo.on("click", () => {
                        selector.hide(500);
                    });
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