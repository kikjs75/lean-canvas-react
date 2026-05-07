import { useEffect, useRef, useState } from 'react';
import { AiOutlineClose, AiOutlineCheck } from 'react-icons/ai';

// 매 랜더링마다 생성 되어서 밖으로 이동.
const colorOptions = [
  'bg-yellow-300',
  'bg-pink-300',
  'bg-blue-300',
  'bg-green-300',
];
function Note({ id, content, onRemoveNote, onUpdateNote }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(content);
  const textareaRef = useRef(null);
  // const randomIndex = Math.floor(Math.random() * colorOptions.length); // 렌더링 중에 랜덤값을 만드는 것이라서 “순수하지 않다”고 경고. 그래서 아래 처럼 실행.
  const [color, setColor] = useState(() => {
    // debugger;
    return colorOptions[Math.floor(Math.random() * colorOptions.length)];
  });

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + 'px';
    }
  }, [editContent]);

  const handleCommitNote = ({ id, content }) => {
    onUpdateNote(id, content);
    setIsEditing(false);
  };

  const handleChangeConent = e => setEditContent(e.target.value);

  return (
    <div
      className={`p-4 ${color} relative max-h-[32rem] overflow-hidden`}
      onClick={() => {
        setIsEditing(true);
        // setTimeout(() => textareaRef.current.setFocus(), 0); // 두 번 클릭해야 textarea 에 포커스 가는 문제 때문에 했는데 마찬가지앋.
      }}
    >
      <div className="absolute top-2 right-2">
        {isEditing ? (
          <button
            aria-label="Check Note"
            className="text-gray-700"
            onClick={e => {
              e.stopPropagation();
              handleCommitNote(id, editContent);
            }}
          >
            <AiOutlineCheck size={20} />
          </button>
        ) : (
          <button
            aria-label="Close Note"
            className="text-gray-700"
            onClick={() => onRemoveNote(id)}
          >
            <AiOutlineClose size={20} />
          </button>
        )}
      </div>
      <textarea
        className={`w-full h-full bg-transparent resize-none border-none focus:outline-none text-gray-900 overflow-hidden`}
        aria-label="Edit Note"
        placeholder="메모를 작성하세요."
        style={{ height: 'auto', minHeight: '8rem' }}
        value={editContent}
        readOnly={!isEditing}
        onChange={handleChangeConent}
        ref={textareaRef}
      />

      {isEditing && (
        <div className="flex space-x-2">
          {colorOptions.map((option, index) => (
            <button
              key={index}
              className={`w-6 h-6 rounded-full cursor-pointer outline outline-gray-50 ${option}`}
              aria-label={`Change color to ${option}`}
              onClick={() => setColor(option)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Note;

/*
# 수정모드이면 완료버튼, 색상아이콘 보이게 / 제거버튼 안 보이게
# 수정모드는 메모 어디든 누르면 설정한다.
*/
