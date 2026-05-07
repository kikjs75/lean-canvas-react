import { useEffect, useState } from 'react';
import CanvasList from '../components/CanvasList';
import SearchBar from '../components/SearchBar';
import ViewToggle from '../components/ViewToggle';

function Home() {
  const [searchText, setSearchText] = useState('');
  const [isGridView, setIsGridView] = useState(true);
  const [data, setData] = useState([]);

  // 1) 경고 있음. 실행 정상.
  // async function fetchData() {
  //   const data = await fetch('http://localhost:8000/canvases/')
  //     .then(res => res.json())
  //     .catch(error => console.log('fetch error: ', error));

  //   setData(data);
  // }
  // useEffect(() => {
  //   fetchData();
  // }, []);

  // 2) 경고 없음. 실행 정상.
  useEffect(() => {
    fetch('http://localhost:8000/canvases/')
      .then(res => res.json())
      .then(data => setData(data))
      .catch(error => console.log('fetch error: ', error));
  }, []);

  // 3) 경고 없음. 실행 정상.
  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const res = await fetch('http://localhost:8000/canvases/');
  //       const data = await res.json();
  //       setData(data);
  //     } catch (error) {
  //       console.log('fetch error: ', error);
  //     }
  //   }
  //   fetchData();
  // }, []);

  // 4) 경고 없음. 실행 정상.
  // useEffect(() => {
  //   async function fetchData() {
  //     const data = await fetch('http://localhost:8000/canvases/')
  //       .then(res => res.json())
  //       .catch(error => console.log('fetch error: ', error));

  //     setData(data);
  //   }
  //   fetchData();
  // }, []);

  const handleDelete = id => setData(data.filter(item => item.id !== id));

  // 한 줄이 아니면 return 문 넣어야 한다.
  // const handleDelete = id => {
  //   setData(
  //     data.filter(item => {
  //       return item.id !== id;
  //     }),
  //   );
  // };

  const filteredData = data.filter(item => {
    // debugger;
    return item.title.toLowerCase().includes(searchText.toLowerCase());
  });
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mb-6 flex flex-col sm:flex-row items-center justify-between">
        <SearchBar searchText={searchText} setSearchText={setSearchText} />
        <ViewToggle isGridView={isGridView} setIsGridView={setIsGridView} />
      </div>

      <CanvasList
        filteredData={filteredData}
        searchText={searchText}
        isGridView={isGridView}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default Home;
