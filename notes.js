const chalk = require('chalk');
const fs = require('fs');

getNotes = function (jsonFile) {
  return jsonFile
};

// adds a note to the notes.json file
const addNote = function (title, body) {
  const notes = loadNotes()

  notes.push({
    title: title,
    body: body
  })

  saveNotes(notes)
}

const removeNote = function (ID) {
  const notes = loadNotes()

  if (countNotes() === 1 && ID === 0) {
    fs.writeFileSync('notes.json', '')
  } else if (ID > (countNotes() - 1)) {
    console.log(chalk.red.bold('Note not found'))
  } else {
    let a = -1
    notesToKeep = notes.filter(function () {
      a++
      return ID !== a
    })
    saveNotes(notesToKeep)
  }
}

const listNotes = function () {
  const notes = loadNotes()

  for (const [key, value] of Object.values(notes)) {
    console.log(`[${key}] ${value.title}`)
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
  console.log(chalk.green('Success!'))
}

module.exports = {
  getNotes: getNotes,
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  countNotes: countNotes
}