import { FaPlus } from 'react-icons/fa';
import Note from './Note';

function CanvasCard({ title, isSubTitle = false, notes }) {
  const handleAddNote = () => {};
  const handleRemoveNote = id => {
    return;
  };
  const handleUpdateNote = (id, content) => {};

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
            onUpdateNote={handleUpdateNote}
          />
        ))}
      </div>
    </div>
  );
}

export default CanvasCard;
