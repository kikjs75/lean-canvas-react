import { FaPlus } from 'react-icons/fa';
import Note from './Note';
import { v4 as uuid4 } from 'uuid';

function CanvasCard({ title, isSubTitle = false, notes = [], onNoteChange }) {
  const handleAddNote = () => {
    const newNote = {
      id: uuid4(),
      content: '',
      color: '',
    };

    return onNoteChange([...notes, newNote]);
  };
  const handleRemoveNote = id => {
    const filteredNotes = notes.filter(note => note.id !== id);
    return onNoteChange(filteredNotes);
  };
  const handleUpdateNote = (id, content, color) => {
    console.log('CanvasCard.handleUpdateNote:  ', { id, content, color });
    const updatedNotes = notes.map(note => {
      return note.id === id ? { ...note, id, content, color } : note;
    });
    onNoteChange(updatedNotes);
  };

  // updatedNotes : onNoteChange 통해서 업데이트 된 Note 포함된 Notes 리턴.

  return (
    <div className="row-span-1 bg-white min-h-48 border border-collapse border-gray-300">
      <div
        className={`${isSubTitle === false && 'bg-gray-100 border-b border-b-gray-300'} flex items-start justify-between px-3 py-2`}
      >
        <h3 className={`${isSubTitle === false && 'font-bold'}`}>{title}</h3>
        <button
          className="bg-blue-400  text-white p-1.5 text-xs rounded-md"
          onClick={handleAddNote}
        >
          <FaPlus />
        </button>
      </div>
      <div className="space-y-3 min-h-32 p-3">
        {notes.map(item => (
          <Note
            key={item.id}
            id={item.id}
            content={item.content}
            color={item.color}
            onRemoveNote={handleRemoveNote}
            onUpdateNote={(id, content, color) =>
              handleUpdateNote(id, content, color)
            }
          />
        ))}
      </div>
    </div>
  );
}

export default CanvasCard;
