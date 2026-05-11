import axios from 'axios';

function create(baseURL, options) {
  // const instance = axios.create(Object.assign({ baseURL }, options)); // 아래와 결과 같음. options 를 파라미터로 받음.
  const instance = axios.create(Object.assign({ baseURL, ...options })); // 첫 파라미터에 다 넣어서 처리.
  return instance;
}

console.log('MODE: ', import.meta.env.MODE);
console.log('VITE_API_BASE_URL: ', import.meta.env.VITE_API_BASE_URL);

// export const canvases = create(
//   'https://json-server-vercel-phi-blond.vercel.app/canvases/',
// );
export const canvases = create(
  `${import.meta.env.VITE_API_BASE_URL}/canvases/`,
);
// export const posts = create('http://localhost:8000/posts/');
