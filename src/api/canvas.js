import dayjs from 'dayjs';
import { canvases } from './http';
import { v4 as uuid4 } from 'uuid';

// 목록
export async function getCanvases(params) {
  const payload = Object.assign(
    {
      _sort: 'lastModified',
      _order: 'desc',
    },
    params,
  );
  const { data } = await canvases.get('/', { params: payload });
  return data;
}

export function createCanvas() {
  const newCanvas = {
    title: uuid4().substring(0, 4) + '_새로운 린 캔버스',
    lastModified: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    category: '신규',
  };
  return canvases.post('/', newCanvas);
}

export async function deleteCanvas(id) {
  await canvases.delete(`/${id}`); // 응답값은 필요 없고 완료만 기다린다"는 의도가 코드에서 명확하게 드러납
}

export async function getCanvasesById(id) {
  const { data } = await canvases.get(`/${id}`);
  return data;
}

export async function updateTitle(id, title) {
  /**
   * post : 새로운 자원 등록
   * put : 기존 자원 전체 업데이트 및 새로운 자원 등록
   * patch : 일부항목 업데이트
   */
  await canvases.patch(`/${id}`, { title }); // 중괄호 안 하면 업데이트 안 됨.
}

export async function updateCanvas(id, canvas) {
  await canvases.put(`/${id}`, canvas);
}
