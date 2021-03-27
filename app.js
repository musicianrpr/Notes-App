const notesUtils = require('./notes')
const chalk = require('chalk')
const yargs = require('yargs')

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
  handler: function(argv) {
    notesUtils.addNote(argv.title, argv.body)
  }
})

// remove note command
yargs.command({
  command: 'remove',
  describe: 'Deletes a note',
  builder: {
    noteID: {
      describe: "Note's ID",
      demandOption: true,
      type: 'integer'
    },
  handler: function () {
    console.log('Removing note...')
  }
  },
})

// list notes command
yargs.command({
  command: 'list',
  describe: 'List all notes',
  handler: function () {
    console.log('Listing notes...')
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
  handler: function () {
    console.log('Reading a note...')
  }
  },
})

console.log(chalk.green('Success!'))

yargs.parse()