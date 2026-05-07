import CanvasItem from './CanvasItem.jsx';

function CanvasList({ filteredData, searchText, isGridView, onDelete }) {
  if (filteredData.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-xl text-gray-600">
          {searchText ? '검색 결과가 없습니다' : '목록이 없습니다'}
        </p>
      </div>
    );
  } else {
    return (
      <div
        className={`grid gap-6 ${isGridView ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}
      >
        {filteredData.map(item => (
          <CanvasItem
            key={item.id}
            id={item.id}
            title={item.title}
            lastModified={item.lastModified}
            category={item.category}
            onDelete={e => {
              e.preventDefault(); // 기본동작 막는 메서드 : CanvasItem 컴포넌트 내에서 삭제버튼이 LINK 태그 안에 있는데 이게 랜더링 될 때 a 태그가 되어서 기본동작 막는 메서드를 사용해야한다고 한다.
              // e.stopPropagation(); // 이벤트 전파 막는 메서드
              onDelete(item.id);
            }}
          />
        ))}
      </div>
    );
  }

  // 1) Home.jsx 의 return() 안에 있던 부분
  // {filteredData.length === 0 ? (
  //   <div className="text-center py-10">
  //     <p className="text-xl text-gray-600">
  //       {searchText ? '검색 결과가 없습니다' : '목록이 없습니다'}
  //     </p>
  //   </div>
  // ) : (
  //   <div
  //     className={`grid gap-6 ${isGridView ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}
  //   >
  //     {filteredData.map(item => (
  //       <CanvasItem
  //         key={item.id}
  //         id={item.id}
  //         title={item.title}
  //         lastModified={item.lastModified}
  //         category={item.category}
  //       />
  //     ))}
  //   </div>
  // )}
}

export default CanvasList;
