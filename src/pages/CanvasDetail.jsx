import CanvasTitle from '../components/CanvasTitle';
import LeanCanvas from '../components/LeanCanvas';
import { getCanvasesById, updateTitle, updateCanvas } from '../api/canvas';
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
      console.log('CanvasDetail.handleTitleChange: ', { title });
      await updateTitle(id, title);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleCanvasChange = async updatedCanvas => {
    console.log('CanvasDetail.handleCanvasChange: ', { updatedCanvas });
    await updateCanvas(id, updatedCanvas);
    setCanvas(updatedCanvas);
  };

  return (
    <div>
      {/* {JSON.stringify(canvas)} */}
      <CanvasTitle
        key={canvas?.id}
        value={canvas?.title}
        onChange={handleTitleChange}
      />
      {canvas && (
        <LeanCanvas
          canvas={canvas}
          onCanvasChange={updatedCanvas => handleCanvasChange(updatedCanvas)}
        />
      )}
    </div>
  );
}

export default CanvasDetail;
