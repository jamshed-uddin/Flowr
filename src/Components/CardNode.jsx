import {
  Handle,
  NodeResizeControl,
  NodeResizer,
  Position,
} from "@xyflow/react";
import React, { useRef, useState } from "react";

const CardNode = ({ id, data, selected }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState("");
  const textRef = useRef(null);

  const handleClick = () => {
    setIsEditing(true);

    setTimeout(() => textRef.current.focus(), 0);
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setText(e.target.value);
  };

  return (
    <>
      <NodeResizer minHeight={160} minWidth={320} isVisible={selected} />
      <Handle position={Position.Top} type="target" />
      <div
        onDoubleClick={handleClick}
        className={`${
          isEditing && "cursor-auto"
        } bg-white shadow-md p-4 min-h-40 min-w-80 h-full w-full rounded-xl`}
      >
        {isEditing ? (
          <textarea
            ref={textRef}
            value={text}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full h-full border-0  resize-none overflow-hidden outline-none p-0"
          />
        ) : (
          <div>{text || "Double tap to add text"}</div>
        )}

        {/* <Handle position={Position.Right} type="source" /> */}

        {/* <Handle position={Position.Left} type="target" /> */}
      </div>
      <Handle position={Position.Bottom} type="source" />
    </>
  );
};

export default CardNode;
