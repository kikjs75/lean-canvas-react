import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaList, FaTh } from 'react-icons/fa';

function Home() {
  const [courseList] = useState([
    {
      id: 1,
      title: '친환경 도시 농업 플랫폼',
      updateAt: '2023-06-15',
      type: '농업',
    },
    {
      id: 2,
      title: 'AI 기반 건강 관리 앱',
      updateAt: '2023-06-10',
      type: '헬스케어',
    },
    {
      id: 3,
      title: '온디맨드 물류 서비스',
      updateAt: '2023-06-05',
      type: '물류',
    },
    {
      id: 4,
      title: 'VR 가상 여행 서비스',
      updateAt: '2023-06-01',
      type: '여행',
    },
  ]);

  // const [courseList, setCourseList] = useState([]);
  const [searchCourse, setSearchCourse] = useState('');
  const [viewMode, setViewMode] = useState('grid');

  const filteredList = courseList.filter(course => {
    return course.title.includes(searchCourse);
  });

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mb-6 flex flex-col sm:flex-row items-center justify-between">
        <div className="relative w-full sm:w-64 mb-4 sm:mb-0">
          <input
            type="text"
            placeholder="검색"
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="검색"
            value={searchCourse}
            onChange={e => setSearchCourse(e.target.value)}
          />
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
        </div>
        <div className="flex space-x-2">
          <button
            className={`p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-500 text-white`}
            aria-label="Grid view"
            onClick={() => setViewMode('grid')}
          >
            <FaTh />
          </button>
          <button
            className={`p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-200`}
            aria-label="List view"
            onClick={() => setViewMode('list')}
          >
            <FaList />
          </button>
        </div>
      </div>

      {courseList.length === 0 && (
        <div className="text-center py-10">
          <p className="text-xl text-gray-600">목록이 없습니다</p>
        </div>
      )}

      {courseList.length > 0 && filteredList.length === 0 && (
        <div className="text-center py-10">
          <p className="text-xl text-gray-600">검색 결과가 없습니다</p>
        </div>
      )}

      <div
        className={`${viewMode === 'grid' ? 'grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'flex flex-col gap-4'}`}
      >
        {filteredList.map(item => {
          return (
            <Link
              key={item.id}
              className={
                viewMode === 'grid'
                  ? 'bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105'
                  : 'bg-white rounded-lg shadow-md p-4 flex items-center justify-between hover:bg-gray-50'
              }
              to={`/canvases/${item.id}`}
            >
              {viewMode === 'grid' ? (
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-2 text-gray-800">
                    {item.title}
                  </h2>
                  <p className="text-sm text-gray-600 mb-4">
                    최근 수정일: {item.updateAt}
                  </p>
                  <span className="inline-block px-3 py-1 text-sm font-semibold text-gray-700 bg-gray-200 rounded-full">
                    {item.type}
                  </span>
                </div>
              ) : (
                <div className="flex items-center justify-between w-full">
                  <h2 className="text-lg font-bold text-gray-800">
                    {item.title}
                  </h2>
                  <p className="text-sm text-gray-600">{item.updateAt}</p>
                  <span className="px-3 py-1 text-sm font-semibold text-gray-700 bg-gray-200 rounded-full">
                    {item.type}
                  </span>
                </div>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
