import { canvases } from './http';

// 목록
export function getCanvases(params) {
  return canvases.get('/', { params: params });
}
