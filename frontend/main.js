const socket = io('http://localhost:3000/')

let allNotes = []


socket.on('connect', (data => {
    socket.emit('load')
}))



function addNote() {
    let note = {
        title: document.getElementById('noteMsg').value,
        description: document.getElementById('noteDesc').value
    }
    document.getElementById('noteMsg').value = ''
    document.getElementById('noteDesc').value = ''
    socket.emit('addNote', note)

}

socket.on('allNotes', (notes) => {
    allNotes = notes
    displayData()
})

function displayData() {

    let notes = ``;
    for (let i = 0; i < allNotes.length; i++) {
        notes += ` <div class="col-md-4 mb-3">
        <div class="border bg-white text-dark rounded p-2 text-center">
            <h3>${allNotes[i].title}</h3>
            <h3>${allNotes[i].description}</h3>
            <button class="btn btn-info w-100 mb-2" onClick="updateNote('${allNotes[i]._id}')">Update</button>
            <button class="btn btn-danger w-100" onClick="deleteNote('${allNotes[i]._id}')">Delete</button>
        </div>
    </div>`

    }

    document.getElementById('rows').innerHTML = notes
}



function deleteNote(id) {

    socket.emit('deleteNote', id)
}


function updateNote(id) {
    let note = {
        title: document.getElementById('noteMsg').value,
        description: document.getElementById('noteDesc').value
    }
    document.getElementById('noteMsg').value = ''
    document.getElementById('noteDesc').value = ''
    socket.emit('updateNote', { id, note })
}