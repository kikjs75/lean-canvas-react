import { useEffect, useState } from 'react';
import CanvasList from '../components/CanvasList';
import SearchBar from '../components/SearchBar';
import ViewToggle from '../components/ViewToggle';
import { getCanvases, createCanvas, deleteCanvas } from '../api/canvas';
import Loading from '../components/Loading';
import Error from '../components/Error';
import Button from '../components/Button';

function Home() {
  const [searchText, setSearchText] = useState();
  const [isGridView, setIsGridView] = useState(true);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingCreate, setIsLoadingCreate] = useState(false);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  async function fetchData(params) {
    try {
      setIsLoading(true);
      setError(null);

      await new Promise(resolver => setTimeout(resolver, 1000));

      const response = await getCanvases(params);
      console.log('response: ', response);
      setData(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }

  // async function fetchDataOther(params) {
  //   setIsLoading(true);
  //   setError(null);

  //   await new Promise(resolver => setTimeout(resolver, 2000));

  //   return getCanvases(params)
  //     .then(response => {
  //       console.log('response: ', response);
  //       setData(response.data);
  //     })
  //     .catch(err => {
  //       setError(err);
  //     })
  //     .finally(() => {
  //       setIsLoading(false);
  //     });
  // }

  // 5) (axios)경고 없음. 실행 정상. : response 의 data 응답 데이터 있고 그 외 config, header, request, status, statusText 등 추가 정보 더 있음. fetch 에는 없음.
  useEffect(() => {
    const loadData = async () => {
      await fetchData({ title_like: searchText });
    };
    loadData();
  }, [searchText, retryCount]);

  const handleDelete = async id => {
    if (confirm('삭제 하시겠습니까?') === false) return;

    try {
      // setData(data.filter(item => item.id !== id));
      await deleteCanvas(id);
      fetchData({ title_like: searchText });
    } catch (err) {
      alert(err.message);
    }
  };

  const handleCreateCanvas = async () => {
    try {
      setIsLoadingCreate(true);
      await new Promise(resolver => setTimeout(resolver, 1000));
      await createCanvas(); // await 없으면 에러 Catch 안 된다.
      fetchData({ title_like: searchText });
    } catch (err) {
      alert(err.message);
    } finally {
      setIsLoadingCreate(false);
    }
  };

  return (
    <>
      <div className="mb-6 flex flex-col sm:flex-row items-center justify-between">
        <SearchBar searchText={searchText} setSearchText={setSearchText} />
        <ViewToggle isGridView={isGridView} setIsGridView={setIsGridView} />
      </div>

      <Button
        isLoadingCreate={isLoadingCreate}
        onClick={handleCreateCanvas}
        className="flex juetify-end mb-6"
      >
        등록하기
      </Button>

      {isLoading && <Loading />}
      {error && (
        <Error
          message={error.message}
          onRetry={() => setRetryCount(c => c + 1)}
        />
      )}
      {!isLoading && !error && (
        <CanvasList
          filteredData={data}
          searchText={searchText}
          isGridView={isGridView}
          onDelete={handleDelete}
        />
      )}
    </>
  );
}

export default Home;
