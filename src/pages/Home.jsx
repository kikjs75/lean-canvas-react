import { useEffect, useState } from 'react';
import CanvasList from '../components/CanvasList';
import SearchBar from '../components/SearchBar';
import ViewToggle from '../components/ViewToggle';
import { getCanvases } from '../api/canvas';

function Home() {
  const [searchText, setSearchText] = useState();
  const [isGridView, setIsGridView] = useState(true);
  const [data, setData] = useState([]);

  // 1) (fetch)경고 있음. 실행 정상.
  // async function fetchData() {
  //   const data = await fetch('http://localhost:8000/canvases/')
  //     .then(res => res.json())
  //     .catch(error => console.log('fetch error: ', error));

  //   setData(data);
  // }
  // useEffect(() => {
  //   fetchData();
  // }, []);

  // 2) (fetch)경고 없음. 실행 정상.
  // useEffect(() => {
  //   fetch('http://localhost:8000/canvases/')
  //     .then(res => res.json())
  //     .then(data => setData(data))
  //     .catch(error => console.log('fetch error: ', error));
  // }, []);

  // 3) (fetch)경고 없음. 실행 정상.
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

  // 4) (fetch)경고 없음. 실행 정상.
  // useEffect(() => {
  //   async function fetchData() {
  //     const data = await fetch('http://localhost:8000/canvases/')
  //       .then(res => res.json())
  //       .catch(error => console.log('fetch error: ', error));
  //     setData(data);
  //   }
  //   fetchData();
  // }, []);

  // 5) (axios)경고 없음. 실행 정상. : response 의 data 응답 데이터 있고 그 외 config, header, request, status, statusText 등 추가 정보 더 있음. fetch 에는 없음.
  useEffect(() => {
    async function fetchData(params) {
      const response = await getCanvases(params);
      console.log('response: ', response);
      setData(response.data);
    }
    fetchData({ title_like: searchText });
  }, [searchText]);

  const handleDelete = id => setData(data.filter(item => item.id !== id));

  // 한 줄이 아니면 return 문 넣어야 한다.
  // const handleDelete = id => {
  //   setData(
  //     data.filter(item => {
  //       return item.id !== id;
  //     }),
  //   );
  // };

  // const filteredData = data.filter(item => {
  //   // debugger;
  //   return item.title.toLowerCase().includes(searchText.toLowerCase());
  // });

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mb-6 flex flex-col sm:flex-row items-center justify-between">
        <SearchBar searchText={searchText} setSearchText={setSearchText} />
        <ViewToggle isGridView={isGridView} setIsGridView={setIsGridView} />
      </div>

      <CanvasList
        filteredData={data}
        searchText={searchText}
        isGridView={isGridView}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default Home;
