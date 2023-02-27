const saveButton = document.querySelector('#btnSave')
const deleteButton = document.querySelector('#btnDelete')

const titleInput = document.querySelector('#title')
const descriptionInput = document.querySelector('#description')

const notesContainer = document.querySelector("#notes__container")

function clearForm(){
    titleInput.value = "";
    descriptionInput.value = "";
    deleteButton.classList.add('hidden');
}

function displayNoteInForm(note){
    titleInput.value = note.title;
    descriptionInput.value = note.description;
    deleteButton.classList.remove('hidden');

    deleteButton.setAttribute('data-id', note.id);
    saveButton.setAttribute('data-id', note.id);

}

function getNoteById(id){
    fetch(`https://localhost:7014/api/Notes/${id}`)
    .then(data => data.json())
    .then(responce => displayNoteInForm(responce));
}

function populateForm(id){
    getNoteById(id);
}

function addNote(title, description) {
    const body = {
        title: title,
        description: description,
        isVisible: true
    }


    fetch('https://localhost:7014/api/Notes', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            "content-type": "application/json"
        }
    })
    .then(data => data.json())
    .then(() => {
        clearForm();
        getAllNotes();
    });
}

function displayNotes(notes) {
    let allNotes = '';

    notes.forEach(note => {
        const element = `
            <div class="note" data-id="${note.id}">
                <h3>${note.title}</h3>
                <p>${note.description}</p>
            </div>
        `
        allNotes += element
    });

    notesContainer.innerHTML = allNotes;

    document.querySelectorAll('.note')
        .forEach(note => {
            note.addEventListener('click', function() {
                populateForm(note.dataset.id);
            })
        })
}

function getAllNotes() {
    fetch('https://localhost:7014/api/Notes')
    .then(data => data.json())
    .then(responce => displayNotes(responce));
}

function updateNote(id, title, description){
    const body = {
        title: title,
        description: description,
        isVisible: true
    }


    fetch(`https://localhost:7014/api/Notes/${id}`, {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: {
            "content-type": "application/json"
        }
    })
    .then(data => data.json())
    .then(() => {
        clearForm();
        getAllNotes();
    });
}

getAllNotes()


saveButton.addEventListener('click', function() {
    const id = saveButton.dataset.id
    if(id) {
        updateNote(id, titleInput.value, descriptionInput.value);
    } else {
        addNote(id, titleInput.value, descriptionInput.value);
    }
});

function deleteNote(id) {
    fetch(`https://localhost:7014/api/Notes/${id}`, {
        method: 'DELETE',
        headers: {
            "content-type": "application/json"
        }
    })
    .then(() => {
        clearForm();
        getAllNotes();
    });
}

deleteButton.addEventListener('click', function() {
    deleteNote(deleteButton.dataset.id);
});

