import { useEffect, useState } from 'react';
import CanvasList from '../components/CanvasList';
import SearchBar from '../components/SearchBar';
import ViewToggle from '../components/ViewToggle';
import { getCanvases } from '../api/canvas';
import Loading from '../components/Loading';
import Error from '../components/Error';

function Home() {
  const [searchText, setSearchText] = useState();
  const [isGridView, setIsGridView] = useState(true);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  // 5) (axios)경고 없음. 실행 정상. : response 의 data 응답 데이터 있고 그 외 config, header, request, status, statusText 등 추가 정보 더 있음. fetch 에는 없음.
  useEffect(() => {
    async function fetchData(params) {
      setIsLoading(true);
      setError(null);
      try {
        await new Promise(resolver => setTimeout(resolver, 2000));

        const response = await getCanvases(params);
        console.log('response: ', response);
        setData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData({ title_like: searchText });
  }, [searchText, retryCount]);

  const handleDelete = id => setData(data.filter(item => item.id !== id));

  return (
    <>
      <div className="mb-6 flex flex-col sm:flex-row items-center justify-between">
        <SearchBar searchText={searchText} setSearchText={setSearchText} />
        <ViewToggle isGridView={isGridView} setIsGridView={setIsGridView} />
      </div>

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
