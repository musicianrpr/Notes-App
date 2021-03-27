const chalk = require('chalk');
const fs = require('fs');

getNotes = function (jsonFile) {
  return jsonFile
};

// adds a note to the notes.json file
const addNote = (notes, title, body) => {
  let repeatedTitles = notes.filter((note) => {
    return note.title === title
  })
  if (repeatedTitles.length === 0) {
    notes.push({
    title: title,
    body: body
  })
    saveNotes(notes)
  } else {
    console.log(chalk.red.bold('Repeated title!'))
  }
}

const removeNote = (notes, ID) => {
  if (countNotes() === 1 && ID === 0) {
    fs.writeFileSync('notes.json', '')
  } else if (ID > (countNotes() - 1)) {
    console.log(chalk.red.bold('Note not found'))
  } else {
    let a = -1
    notesToKeep = notes.filter(() => {
      a++
      return ID !== a
    })
    saveNotes(notesToKeep)
  }
}

const listNotes = (notes) => {
  notes.forEach((value, index) => {
    console.log(`[${chalk.green(index)}] ${value.title}`)
  });
}

// returns the notes object
const loadNotes = () => {
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
const countNotes = () => {
  try {
    return Object.keys(loadNotes()).length
  }
  catch (err) {
    return 0
  }
}

// saves a note
const saveNotes = (note) => {
  const dataJSON = JSON.stringify(note)
  fs.writeFileSync('notes.json', dataJSON)
  console.log(chalk.green('Success!'))
}

module.exports = {
  getNotes: getNotes,
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  countNotes: countNotes,
  loadNotes: loadNotes
}