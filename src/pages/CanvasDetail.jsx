import { useParams, useSearchParams, useLocation } from 'react-router-dom';

function CanvasDetail() {
  const { id } = useParams(); // id 로 받아야 한다.
  const [searchParams] = useSearchParams(); // searchParams 말고 다른 걸로 해도 된다.
  const location = useLocation();

  console.log('searchParams: ', searchParams);
  console.log('searchParams.keyword: ', searchParams.get('keyword'));
  console.log('location: ', location);
  console.log('location: ', location.hash);
  return (
    <div>
      CanvsDetail
      <p>id: {id}</p>
      <p>keworkd: {searchParams.get('keyword')}</p>
      <p>hash: {location.hash}</p>
    </div>
  );
}

export default CanvasDetail;
