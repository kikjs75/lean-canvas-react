import axios from 'axios';

function create(baseURL, options) {
  // const instance = axios.create(Object.assign({ baseURL }, options)); // 아래와 결과 같음. options 를 파라미터로 받음.
  const instance = axios.create(Object.assign({ baseURL, ...options })); // 첫 파라미터에 다 넣어서 처리.
  return instance;
}

export const canvases = create(
  'https://json-server-vercel-phi-blond.vercel.app/canvases/',
);
// export const canvases = create('http://localhost:8000/canvases/');
// export const posts = create('http://localhost:8000/posts/');
