import { canvases } from './http';

// 목록
export function getCanvases() {
  return canvases.get('/');
}
