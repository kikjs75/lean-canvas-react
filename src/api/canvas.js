import dayjs from 'dayjs';
import { canvases } from './http';
import { v4 as uuid4 } from 'uuid';

// 목록
export function getCanvases(params) {
  const payload = Object.assign(
    {
      _sort: 'lastModified',
      _order: 'desc',
    },
    params,
  );
  return canvases.get('/', { params: payload });
}

export function createCanvas() {
  const newCanvas = {
    title: uuid4().substring(0, 4) + '_새로운 린 캔버스',
    lastModified: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    category: '신규',
  };
  return canvases.post('/', newCanvas);
}
