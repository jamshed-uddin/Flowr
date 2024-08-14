import {
  addEdge,
  Background,
  Controls,
  ReactFlow,
  useNodesState,
} from "@xyflow/react";
import "./App.css";
import "@xyflow/react/dist/style.css";
import { useCallback } from "react";
import CardNode from "./Components/CardNode";
import CustomEdge from "./Components/CustomEdge";

const nodeTypes = {
  cardNode: CardNode,
};
const edgeTypes = {
  customEdge: CustomEdge,
};

const initialNodes = [
  { id: "1", type: "cardNode", position: { x: 0, y: 0 }, data: { text: "" } },
  { id: "2", type: "cardNode", position: { x: 0, y: 200 }, data: { text: "" } },
];
const initialEdges = [];

function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useNodesState(initialEdges);

  const onConnect = useCallback(
    (connection) => {
      const edge = { ...connection, type: "customEdge" };
      setEdges((eds) => addEdge(edge, eds));
    },
    [setEdges]
  );
  return (
    <div className="relative" style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
      >
        <Background variant="lines" gap={50} />
        <Controls />
      </ReactFlow>
      <div className="absolute bottom-4 left-1/2 px-3 py-2 rounded-xl bg-white -translate-x-1/2 space-x-4 shadow-md">
        <button>Add card</button>
        <button>Add card</button>
        <button>Add card</button>
      </div>
    </div>
  );
}

export default App;
