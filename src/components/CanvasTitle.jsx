import { useState } from 'react';
import { FaEdit, FaCheck } from 'react-icons/fa';

function CanvasTitle({ value, onChange }) {
  const [isEdit, setIsEdit] = useState(false);
  const [title, setTitle] = useState(value);

  // 1) key 방식 변경 후 불필요해서 제거 : <CanvasTitle key={canvas?.id} value={canvas?.title} /> 처럼 호출 시 key 설정.
  // useEffect(() => {
  //   setTitle(value);
  // }, [value]);

  const handelSubmitTitle = () => {
    setIsEdit(false);
    onChange(title);
  };

  return (
    <div className="flex items-center justify-center mb-10">
      {isEdit ? (
        <div className="flex items-center">
          <input
            type="text"
            className="text-4xl font-bold text-center text-blue-600 bg-transparent border-b-2 border-blue-600 focus:outline-none"
            value={title}
            onChange={e => setTitle(e.target.value)}
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
            onClick={() => setIsEdit(true)}
          >
            <FaEdit />
          </button>
        </>
      )}
    </div>
  );
}

export default CanvasTitle;
