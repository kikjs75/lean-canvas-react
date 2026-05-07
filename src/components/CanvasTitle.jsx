import { useState } from 'react';
import { FaCheck, FaEdit } from 'react-icons/fa';

function CanvasTitle() {
  const [isEdit, setIsEdit] = useState(false);
  const [title, setTitle] = useState('Lean Canvas');
  const [editTitle, setEditTitle] = useState(title);

  const handleEditTitle = () => {
    setEditTitle(title); // 수정화면 진입 시 초기 데이터는 현재 title 설정. // 여기 대신에 위에서 useState(title) 하면 되는 것 같다.
    setIsEdit(true);
  };

  const handleChangeTitle = e => {
    setEditTitle(e.target.value);
  };

  const handelSubmitTitle = () => {
    setIsEdit(false);
    setTitle(editTitle); // 일반화면 진입 시 지금까지 수정된 editTitle 을 title 에 설정.
  };

  return (
    <div className="flex items-center justify-center mb-10">
      {isEdit ? (
        <div className="flex items-center">
          <input
            type="text"
            onChange={handleChangeTitle}
            value={editTitle}
            className="text-4xl font-bold text-center text-blue-600 bg-transparent border-b-2 border-blue-600 focus:outline-none"
          />
          <button
            className="ml-2 p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
            aria-label="Save title"
            onClick={handelSubmitTitle}
          >
            <FaCheck />
          </button>
        </div>
      ) : (
        <>
          <h1 className="text-4xl font-bold text-center ">{title}</h1>
          <button
            className="ml-2 p-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50"
            aria-label="Edit title"
            onClick={handleEditTitle}
          >
            <FaEdit />
          </button>
        </>
      )}
    </div>
  );
}

export default CanvasTitle;
