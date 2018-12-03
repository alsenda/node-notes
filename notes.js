console.log('Starting notes.js');

const fs = require('fs');

var fetchNotes = () => {
  try {
    var notesString = fs.readFileSync('notes-data.json');
    return JSON.parse(notesString);
  } catch (e) {
    return [];
  }
};

var saveNotes = (notes) => {
  fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};

var addNote = (title, body) => {
  var notes = fetchNotes();
  var note = {
    title,
    body
  };
  var duplicateNotes = notes.filter((note) => note.title === title);

  if (duplicateNotes.length === 0) {
    notes.push(note);
    saveNotes(notes);
    return note;
  }
};

var getAll = () => {
  console.log('Getting all notes');
};

var getNote = (title) => {
  // Fetch the notes
  var notes = fetchNotes();
  // Filter notes by title
  var newNotes = notes.filter((note) => note.title === title);
  // Return notes
  return newNotes.length
    ? newNotes[0]
    : null;
};

var removeNote = (title) => {
  // Fetch the notes
  var notes = fetchNotes();
  // Filter noted removing the one with title of argument
  var newNotes = notes.filter((note) => note.title !== title);
  // Save new notes array
  saveNotes(newNotes);

  return notes.length !== newNotes.length;
};

module.exports = {
  addNote,
  getAll,
  getNote,
  removeNote
};
