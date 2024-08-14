import {
  BaseEdge,
  EdgeLabelRenderer,
  getStraightPath,
  useReactFlow,
} from "@xyflow/react";

const CustomEdge = ({ id, sourceX, sourceY, targetX, targetY, selected }) => {
  const { setEdges } = useReactFlow();
  const [edgePath, labelX, labelY] = getStraightPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });
  return (
    <>
      <BaseEdge id={id} path={edgePath} />
      <EdgeLabelRenderer>
        {selected && (
          <button
            style={{
              position: "absolute",
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
              pointerEvents: "all",
            }}
            className="nodrag nopan bg-white p-0.5 text-red-600 "
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
