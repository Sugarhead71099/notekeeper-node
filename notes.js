const fs = require('fs');

function fetchNotes()
{
	try 
	{
		let notesString = fs.readFileSync('notes-data.json'/*, (error) => {
			if ( error ) {
				console.log('Unable to read file');
			}
		}*/);
		return JSON.parse(notesString);
	} catch ( error ) 
	{
		return [];
	}
}

function saveNotes(notes)
{
	fs.writeFileSync('notes-data.json', JSON.stringify(notes)/*, (error) => {
		if ( error ) {
			return false;
		}
		return true;
	}*/);
}

let logNote = (note) => {
	console.log('\n');
	console.log('Title:', note.title);
	console.log('Body:', note.body);
	console.log('\n');
}

let addNote = (title, body) => {
	let notes = fetchNotes();
	let note = {
		title,
		body,
	};
	let duplicateNotes = notes.filter( note => note.title === title );

	if ( ! duplicateNotes.length )
	{
		notes.push(note);
		saveNotes(notes);
		return note;
	}
};

let getAll = () => {
	return fetchNotes();
};

let getNote = (title) => {
	let notes = fetchNotes();
	let note = notes.filter( note => note.title === title );

	return note[0];
};

let removeNote = (title) => {
	let notes = fetchNotes();
	let newNotes = notes.filter( note => note.title !== title );
	if ( notes.length === newNotes.length )
	{
		return false;
	}

	saveNotes(newNotes);
	return true;
};

module.exports = {
	logNote,
	addNote,
	getAll,
	getNote,
	removeNote,
};