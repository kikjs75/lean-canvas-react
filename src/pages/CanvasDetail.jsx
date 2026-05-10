import CanvasTitle from '../components/CanvasTitle';
import LeanCanvas from '../components/LeanCanvas';
import { getCanvasesById, updateTitle } from '../api/canvas';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

function CanvasDetail() {
  const { id } = useParams();
  const [canvas, setCanvas] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCanvasesById(id);
      setCanvas(data);
    };
    fetchData();
  }, [id]);

  const handleTitleChange = async title => {
    try {
      await updateTitle(id, title);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div>
      {/* {JSON.stringify(canvas)} */}
      <CanvasTitle
        key={canvas?.id}
        value={canvas?.title}
        onChange={handleTitleChange}
      />
      <LeanCanvas />
    </div>
  );
}

export default CanvasDetail;
