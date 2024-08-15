import {
  addEdge,
  Background,
  Controls,
  ReactFlow,
  ReactFlowProvider,
  useNodesState,
} from "@xyflow/react";
import "./App.css";
import "@xyflow/react/dist/style.css";
import { useCallback, useEffect, useState } from "react";
import CardNode from "./Components/CardNode";
import CustomEdge from "./Components/CustomEdge";

import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
const nodeTypes = {
  cardNode: CardNode,
};
const edgeTypes = {
  customEdge: CustomEdge,
};

const initialNodes = [
  {
    id: "1",
    type: "cardNode",
    position: { x: 0, y: 0 },
    data: { text: "" },
    selected: false,
  },
  {
    id: "2",
    type: "cardNode",
    position: { x: 0, y: 200 },
    data: { text: "" },
    selected: false,
  },
];
const initialEdges = [];

function App() {
  const [selectedNodes, setSelectedNodes] = useState([]);
  const [isAddingNode, setIsAddingNode] = useState(false);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useNodesState(initialEdges);

  useEffect(() => {
    const selected = nodes.filter((node) => node.selected === true);
    setSelectedNodes(selected);
  }, [nodes]);

  const onConnect = useCallback(
    (connection) => {
      const edge = { ...connection, type: "customEdge" };
      setEdges((eds) => addEdge(edge, eds));
    },
    [setEdges]
  );

  const handlePaneClick = (event) => {
    if (isAddingNode) {
      const { top, left } = event.target.getBoundingClientRect();

      const x = event.clientX - left;
      const y = event.clientY - top;

      const newNode = {
        id: (nodes.length + 1).toString(),
        type: "cardNode", // Use your custom node type
        position: { x, y },
        data: { text: "" },
        selected: false,
      };

      setNodes((nds) => [...nds, newNode]);
      setIsAddingNode(false);
    }
  };

  return (
    <div className={`relative `} style={{ width: "100vw", height: "100vh" }}>
      <ReactFlowProvider>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          onPaneClick={handlePaneClick}
          style={{ cursor: isAddingNode ? "cell" : "auto" }}
        >
          <Background variant="lines" gap={50} />
          <Controls />
        </ReactFlow>
      </ReactFlowProvider>
      <div className="absolute bottom-4 left-1/2 px-3 py-2 rounded-xl bg-white -translate-x-1/2 space-x-4 shadow-md flex items-center gap-6">
        {/* select button */}
        <button
          onClick={() => setIsAddingNode(true)}
          className={`border-[2px] border-black h-5 w-5 rounded-sm active:scale-95 ${
            isAddingNode && "bg-yellow-100 border-gray-200 shadow-md"
          }`}
        ></button>

        {/* delete button */}
        <button
          disabled={!selectedNodes.length}
          className="disabled:opacity-60 active:scale-95"
        >
          <TrashIcon className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}

export default App;
