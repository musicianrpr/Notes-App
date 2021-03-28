const chalk = require('chalk');
const fs = require('fs');

getNotes = function (jsonFile) {
  return jsonFile
};

// adds a note to the notes.json file
const addNote = (notes, title, body) => {
  const titleIsRepeated = notes.find((note) => note.title === title)
  if (!titleIsRepeated) {
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
    console.log(chalk.red.bold('Select a valid ID'))
  } else {
    let a = -1
    notesToKeep = notes.filter(() => {
      a++
      return ID !== a
    })
    saveNotes(notesToKeep)
  }
}

const readNotes = (notes, ID) => {
  try {
    console.log(`->${chalk.green(notes[ID].title)}<-\n${notes[ID].body}`)
  }
  catch (err) {
    console.log(chalk.red.bold('Select a valid ID'))
  }
}

const listNotes = (notes) => {
  notes.forEach((value, index) => {
    console.log(`[${chalk.green(index)}] ${value.title}`)
  });
}

// returns the notes object
const notesObj = () => {
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
    return Object.keys(notesObj()).length
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
  readNotes: readNotes,
  countNotes: countNotes,
  notesObj: notesObj
}