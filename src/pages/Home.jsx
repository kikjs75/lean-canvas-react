import { useState } from 'react';
import CanvasList from '../components/CanvasList';
import SearchBar from '../components/SearchBar';
import ViewToggle from '../components/ViewToggle';
import { getCanvases, createCanvas, deleteCanvas } from '../api/canvas';
import Loading from '../components/Loading';
import Error from '../components/Error';
import Button from '../components/Button';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

function Home() {
  const useClient = useQueryClient();
  const [searchText, setSearchText] = useState();
  const [isGridView, setIsGridView] = useState(true);

  // 1) 데이터 조회
  ///////////////////////////
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ['canvases', searchText], // searchText 바뀌면 자동 재조회. 그래서 useEffect 불필요.
    queryFn: () => getCanvases({ title_like: searchText }),
    initialData: [],
  });
  ///////////////////////////

  // 2) 등록
  ///////////////////////////
  const { isLoading: isLoadingCreate, mutate: createNewCanvas } = useMutation({
    mutationFn: createCanvas,
    onSuccess: () => {
      useClient.invalidateQueries(['canvases']);
    },
    onError: err => alert(err.message),
  });

  const handleCreateCanvas = () => {
    createNewCanvas();
  };
  ///////////////////////////

  // 3) 삭제
  ///////////////////////////
  const { mutate: deleteDelCanvas } = useMutation({
    mutationFn: deleteCanvas,
    onSuccess: () => useClient.invalidateQueries(false),
    onError: err => alert(err.message),
  });

  const handleDelete = id => {
    if (confirm('삭제 하시겠습니까?') === false) return;

    deleteDelCanvas(id);
  };
  ///////////////////////////

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
      {error && <Error message={error.message} onRetry={refetch} />}
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
