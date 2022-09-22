import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import NotesList from './components/NoteList';
import Search from './components/Search';
import AddNote from './components/AddNote';

const App = () => {
	const [notes, setNotes] = useState([
		{
			id: nanoid(),
			text: 'This is my first note!',
			date: '15/04/2021',
		},
		{
			id: nanoid(),
			text: 'This is my second note!',
			date: '21/04/2021',
		},
		{
			id: nanoid(),
			text: 'This is my third note!',
			date: '28/04/2021',
		},
		{
			id: nanoid(),
			text: 'This is my new note!',
			date: '30/04/2021',
		},
	]);


	const Add = ({
		handleAddNote,
	}) => {
		return (
			<div className='add'>
				<AddNote handleAddNote={handleAddNote} />
			</div>
			
		);
	};

	const [searchText, setSearchText] = useState('');

	

	useEffect(() => {
		const savedNotes = JSON.parse(
			localStorage.getItem('react-notes-app-data')
		);

		if (savedNotes) {
			setNotes(savedNotes);
		}
	}, []);

	useEffect(() => {
		localStorage.setItem(
			'react-notes-app-data',
			JSON.stringify(notes)
		);
	}, [notes]);

	const addNote = (text) => {
		const date = new Date();
		const newNote = {
			id: nanoid(),
			text: text,
			date: date.toLocaleDateString(),
		};
		const newNotes = [...notes, newNote];
		setNotes(newNotes);
	};

	const deleteNote = (id) => {
		const newNotes = notes.filter((note) => note.id !== id);
		setNotes(newNotes);
	};

	return (
		
			<div className='container'>
				<div className='child-search'>
				<Search handleSearchNote={setSearchText} />
				<Add handleAddNote={addNote}/>
				</div>
				
				<div className='child-list'>
				
				<NotesList
					notes={notes.filter((note) =>
						note.text.toLowerCase().includes(searchText)
					)}
					 handleDeleteNote={deleteNote}
				/>
				</div>
				
			</div>
		
	);
};

export default App;