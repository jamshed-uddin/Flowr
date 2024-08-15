import {
  Handle,
  NodeResizeControl,
  NodeResizer,
  Position,
} from "@xyflow/react";
import React, { useEffect, useRef, useState } from "react";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    width: "fit-content",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#fefce8",
    position: "relative",
  },
};

Modal.setAppElement("#root");

const CardNode = ({ id, data, selected, width, height }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState("");
  const textRef = useRef(null);
  const textContainerRef = useRef(null);
  const parentRef = useRef(null);
  const [containerOverflowed, setContainerOverflowed] = useState(false);
  const [modalIsOpen, setIsOpen] = React.useState(false);

  useEffect(() => {
    const textContainer = textContainerRef.current;
    const parentContainer = parentRef.current;
    if (textContainer && parentContainer) {
      const textArea = textContainer.clientHeight * textContainer.clientWidth;
      const parentArea =
        (parentContainer.clientHeight - 24) *
        (parentContainer.clientWidth - 24);

      if (textArea > parentArea) {
        setContainerOverflowed(true);
      } else {
        setContainerOverflowed(false);
      }
    }
  }, [isEditing, width, height]);

  const handleClick = () => {
    setIsEditing(true);

    setTimeout(() => {
      if (textRef.current) {
        const length = textRef.current.value.length;
        textRef.current.focus();
        textRef.current.selectionStart = length;
        textRef.current.selectionEnd = length;
      }
    }, 0);
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setText(e.target.value);
  };

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <div className="w-[80vw] lg:w-[40vw]">
          <p>{text}</p>
          <button
            onClick={closeModal}
            className="text-xl font-semibold text-red-600 absolute top-0 right-3"
          >
            x
          </button>
        </div>
      </Modal>

      <NodeResizer
        minHeight={160}
        minWidth={160}
        isVisible={selected}
        lineStyle={{ border: "1px solid blue" }}
      />

      <div
        ref={parentRef}
        onDoubleClick={handleClick}
        className={`${
          isEditing && "cursor-auto"
        } bg-yellow-50 shadow-md p-4 min-h-40 min-w-40 h-full  rounded-xl overflow-hidden`}
        style={{ maxWidth: `${width}px`, maxHeight: `${height}px` }}
      >
        {isEditing ? (
          <textarea
            ref={textRef}
            value={text}
            onChange={handleChange}
            onBlur={handleBlur}
            className="h-full bg-yellow-50  resize-none  outline-none p-0 nodrag hide-scrollbar nowheel"
            rows={5}
            style={{
              width: "100%",
              height: "100%",
              maxWidth: `${width}px`,
            }}
          />
        ) : text ? (
          <>
            <span
              ref={textContainerRef}
              style={{ maxWidth: `${width}px` }}
              className="block whitespace-wrap text-ellipsis break-words w-full"
            >
              {text}
            </span>
            {containerOverflowed && (
              <button
                onClick={openModal}
                className="text-blue-700 font-semibold text-sm absolute bottom-[2px] right-2 bg-yellow-50 rounded-xl p-1"
              >
                Show more
              </button>
            )}
          </>
        ) : (
          "Double tap to add text"
        )}
      </div>

      {/* handle to connect nodes */}
      <Handle
        id="top"
        position={Position.Top}
        type="target"
        style={{
          backgroundColor: "transparent",
          border: "1.5px solid gray",
          borderRadius: "100%",
          padding: "2px",
        }}
      />
      <Handle
        id="right"
        position={Position.Right}
        type="source"
        style={{
          backgroundColor: "transparent",
          border: "1.5px solid gray",
          borderRadius: "100%",
          padding: "2px",
        }}
      />

      <Handle
        id="left"
        position={Position.Left}
        type="target"
        style={{
          backgroundColor: "transparent",
          border: "1.5px solid gray",
          borderRadius: "100%",
          padding: "2px",
        }}
      />
      <Handle
        id="bottom"
        position={Position.Bottom}
        type="source"
        style={{
          backgroundColor: "transparent",
          border: "1.5px solid gray",
          borderRadius: "100%",
          padding: "2px",
        }}
      />
    </>
  );
};

export default CardNode;
