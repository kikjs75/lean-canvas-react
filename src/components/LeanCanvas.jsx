import CanvasCard from './CanvasCard';

function LeanCanvas({ canvas, onCanvasChange }) {
  // needs : updatedCanvas => <CanvasCard> 에서 updatedNotes 받아서 업데이트 후 작성

  const handleNoteChange = (section, updatedNotes) => {
    console.log('LeanCanvas,handleNoteChange: ', { section, updatedNotes });
    const updatedCanvas = {
      ...canvas,
      [section]: { ...canvas[section], notes: updatedNotes },
    };
    onCanvasChange(updatedCanvas);
  };

  return (
    <div className="border-4 border-black">
      <div className="grid grid-cols-5">
        <CanvasCard
          title="1. 문제"
          notes={canvas.problem.notes}
          onNoteChange={updatedNotes =>
            handleNoteChange('problem', updatedNotes)
          }
        />
        <CanvasCard title="4. 해결안" notes={canvas.solution.notes} />
        <CanvasCard title="3. 가치제안" notes={canvas.valueProposition.notes} />
        <CanvasCard title="5. 경쟁우위" notes={canvas.unfairAdvantage.notes} />
        <CanvasCard
          title="2. 목표 고객"
          notes={canvas.customerSegments.notes}
        />

        <CanvasCard
          title="기존 대안"
          isSubTitle
          notes={canvas.existingAlternatives.notes}
        />
        <CanvasCard title="8. 핵심지표" notes={canvas.keyMetrics.notes} />
        <CanvasCard
          title="상위개념"
          isSubTitle
          notes={canvas.highLevelConcept.notes}
        />
        <CanvasCard title="9. 고객 경로" notes={canvas.channels.notes} />
        <CanvasCard
          title="얼리 어답터"
          isSubTitle
          notes={canvas.earlyAdopters.notes}
        />
      </div>

      <div className="grid grid-cols-2">
        <CanvasCard title="7. 비용 구조" notes={canvas.costStructure.notes} />
        <CanvasCard title="6. 수익 흐름" notes={canvas.revenueStreams.notes} />
      </div>
    </div>
  );
}

export default LeanCanvas;

/*
<CanvasCard title="기존 대안" isSubTitle /> => isSubTitle 값을 생략하면 true 로 설정됨.
*/
