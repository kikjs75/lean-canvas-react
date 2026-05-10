import { useEffect, useState } from 'react';
import CanvasList from '../components/CanvasList';
import SearchBar from '../components/SearchBar';
import ViewToggle from '../components/ViewToggle';
import { getCanvases, createCanvas, deleteCanvas } from '../api/canvas';
import Loading from '../components/Loading';
import Error from '../components/Error';
import Button from '../components/Button';
import useApiRequest from '../hooks/useApiRequest';

function Home() {
  const [searchText, setSearchText] = useState();
  const [isGridView, setIsGridView] = useState(true);
  // const [data, setData] = useState([]);

  const {
    isLoading,
    error,
    data,
    execute: fetchData,
  } = useApiRequest(getCanvases, { initData: [] }); // initData: [] 에서 초기값 지정.

  // 5) (axios)경고 없음. 실행 정상. : response 의 data 응답 데이터 있고 그 외 config, header, request, status, statusText 등 추가 정보 더 있음. fetch 에는 없음.
  useEffect(() => {
    const loadData = async () => {
      await fetchData({ title_like: searchText });
    };
    loadData();
  }, [searchText, fetchData]);

  const { execute: deleteDelCanvas } = useApiRequest(deleteCanvas);
  const handleDelete = async id => {
    if (confirm('삭제 하시겠습니까?') === false) return;

    deleteDelCanvas(id, {
      onSuccess: () => {
        fetchData({ title_like: searchText });
      },
      onError: err => {
        alert(err.message);
      },
    });
  };

  const { isLoading: isLoadingCreate, execute: createNewCanvas } =
    useApiRequest(createCanvas);

  const handleCreateCanvas = async () => {
    createNewCanvas(null, {
      onSuccess: () => {
        fetchData({ title_like: searchText });
      },
      onError: err => {
        alert(err.message);
      },
    });
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
          // filteredData={data || []}
          searchText={searchText}
          isGridView={isGridView}
          onDelete={handleDelete}
        />
      )}
    </>
  );
}

export default Home;
