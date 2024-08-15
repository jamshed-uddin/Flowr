import {
  BaseEdge,
  BezierEdge,
  EdgeLabelRenderer,
  getBezierPath,
  getStraightPath,
  useReactFlow,
} from "@xyflow/react";

const CustomEdge = (props) => {
  const { id, sourceX, sourceY, targetX, targetY, selected } = props;
  const { setEdges } = useReactFlow();
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });
  return (
    <>
      <BezierEdge {...props} />
      <EdgeLabelRenderer>
        {selected && (
          <button
            style={{
              position: "absolute",
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
              pointerEvents: "all",
            }}
            className="nodrag nopan bg-white px-1  text-red-600 font-semibold  "
            onClick={() => {
              setEdges((es) => es.filter((e) => e.id !== id));
            }}
          >
            x
          </button>
        )}
      </EdgeLabelRenderer>
    </>
  );
};

export default CustomEdge;
