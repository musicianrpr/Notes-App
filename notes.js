const fs = require('fs');

getNotes = function (jsonFile) {
  return jsonFile
};

// adds a note to the notes.json file
const addNote = function (title, body) {
  const notes = loadNotes()

  notes.push({
    title: title,
    body: body,
    ID: countNotes()
  })

  saveNotes(notes)
}

const removeNote = function (ID) {
  var notes = loadNotes()

  if (countNotes() === 1) {
    fs.writeFileSync('notes.json', '')
  } else {
    notes = notes.splice(ID, 1)
    saveNotes(notes)
  }
}

const listNotes = function () {
  const notes = loadNotes()

  for (const value of Object.values(notes)) {
    console.log(`[${value.ID}] ${value.title}`)
  }
}

// returns the notes object
const loadNotes = function () {
  try {
    const dataBuffer = fs.readFileSync('notes.json')
    const dataJSON = dataBuffer.toString()
    return JSON.parse(dataJSON)
  }
  catch (err) {
    return []
  }
}

// counts how many objets there's in notes.json JSON
const countNotes = function() {
  try {
    return Object.keys(loadNotes()).length
  }
  catch (err) {
    return 0
  }
}

// saves a note
const saveNotes = function (note) {
  const dataJSON = JSON.stringify(note)
  fs.writeFileSync('notes.json', dataJSON)
}

module.exports = {
  getNotes: getNotes,
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  countNotes: countNotes
}