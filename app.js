const notesUtils = require('./notes')
const chalk = require('chalk')
const yargs = require('yargs')
const { loadNotes } = require('./notes')

// add note command
yargs.command({
  command: 'add',
  describe: 'adds a note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string'
    },
    body: {
      describe: 'Note text',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    notesUtils.addNote(loadNotes(), argv.title, argv.body)
  }
})

// remove note command
yargs.command({
  command: 'remove',
  describe: 'Deletes a note',
  builder: {
    ID: {
      describe: "Note's ID",
      demandOption: true,
      type: 'integer'
    }
  },
  handler(argv) {
    notesUtils.removeNote(loadNotes(), argv.ID)
  }
})

// list notes command
yargs.command({
  command: 'list',
  describe: 'List all notes',
  handler() {
    notesUtils.listNotes(loadNotes())
  }
})

// read note command
yargs.command({
  command: 'read',
  describe: 'Reads a single note',
  builder: {
    noteID: {
      describe: '',
      demandOption: true,
      type: 'integer'
    },
  handler() {
    console.log('Reading a note...')
  }
  },
})

yargs.parse() 