import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Button from '../components/Button';

function About() {
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ['canvases'],
    queryFn: async () => {
      await new Promise(resolver => setTimeout(resolver, 2000));
      return axios.get('http://localhost:8000/canvases/').then(res => res.data);
    },
    // initialData: [], // 때문에 초기 데이터가 있다고 보고  isLoading = false
  });

  const {
    isLoading: isLoadingCreate,
    error: errorCreate,
    mutate: createNewCanvas,
  } = useMutation({
    mutationFn: newCanvas =>
      axios.post('http://localhost:8000/canvases/', newCanvas),
    onSuccess: () => queryClient.invalidateQueries(['canvases']), // canvases 이름으로 캐싱된 목록 데이터를 무효화 시킨다.
  });

  const handleCreateCanvas = () => {
    createNewCanvas({ title: 'new canvas' });
  };

  return (
    <>
      <div>About Page!</div>
      <h2 className="text-3xl">useQuery</h2>
      {isLoading && <p>isLoading...</p>}
      {error && <p className="text-red-700">{error.message}</p>}
      {/* {data.map(item => (
        <li key={item.id}>{item.title}</li>
      ))} */}
      {data && data.map(item => <li key={item.id}>{item.title}</li>)}

      <h2 className="text-3xl">useMutation</h2>
      {isLoadingCreate && <p>isCreating...</p>}
      {errorCreate && <p>{errorCreate.message}</p>}
      <Button onClick={handleCreateCanvas}>등록</Button>
    </>
  );
}

export default About;
