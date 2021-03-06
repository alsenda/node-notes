console.log('Starting app.js');

const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

const argv = yargs.argv;
var command = argv._[0];
console.log('Command: ', command);
console.log('Yargs', argv);

if (command === 'add') {
  var note = notes.addNote(argv.title, argv.body);
  notes.logNote(note, 'created');
} else if (command === 'list') {
  notes.getAll();
} else if (command === 'read') {
  var note = notes.getNote(argv.title);
  notes.logNote(note, 'found');
} else if (command === 'remove') {
  var wasRemoved = notes.removeNote(argv.title);
  var message = wasRemoved
    ? 'A note was removed'
    : 'Title not found';
  console.log(message);
} else {
  console.log('Command not recognized');
}
