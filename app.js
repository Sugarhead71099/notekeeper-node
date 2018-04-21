const fs = require('fs'),
	  os = require('os'),
	  _ = require('lodash'),
	  yargs = require('yargs'),
	  notes = require('./notes.js');

const titleOptions = {
	describe: 'Title of note',
	demand: true,	
	alias: 't',
};

const bodyOptions = {
	describe: 'Body of note',
	demand: true,
	alias: 'b',
};

const argv = yargs
	.command('add', 'Add a new note', {
		title: titleOptions,
		body: bodyOptions,
	})
	.command('list', 'List all notes')
	.command('read', 'Read a note', {
		title: titleOptions,
	})
	.command('remove', 'Remove a note', {
		title: titleOptions,
	}).help().argv;
let command = argv._[0];

function add()
{
	console.log('Adding new note');
	let note = notes.addNote(argv.title, argv.body);

	if ( note )
	{
		console.log('Note succesfully added');
		notes.logNote(note);
	} else
	{
		console.log(`No Note added - Note with the title "${argv.title}" already exists`);
	}
}

function list()
{
	console.log('Listing all notes');
	let allNotes = notes.getAll();

	if ( allNotes.length ) {
		console.log(`Printing ${allNotes.length} note(s)`);

		allNotes.forEach( note => notes.logNote(note) );
	} else {
		console.log('There were no notes found');
	}
}

function read()
{
	console.log('Reading note');

	let note = notes.getNote(argv.title);

	if ( note ) {
		console.log('Note Successfully Retrieved');
		notes.logNote(note);
	} else {
		console.log('Note not read - Note not found');
	}
}

function remove()
{
	console.log('Deleting note');
	let noteDeleted = notes.removeNote(argv.title);

	let message = noteDeleted ?
		'Note successfully deleted' :
		`Note not deleted - Note with the title "${argv.title}" not found`;
	console.log(message);
}

if ( ! command )
{

	console.log('Please specify command');

} else
{

	switch ( command )
	{
		case 'add':
			add();
			break;

		case 'list':
			list();
			break;

		case 'read':
			read();
			break;

		case 'remove':
			remove();
			break;

		default:
			console.log('Command not recognized');
			break;
	}

}