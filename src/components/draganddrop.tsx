import React, { useState, useRef } from "react";

export interface DragNDropData {
  title: string;
  items: string[];
}

export interface DragNDropProps {
  data: DragNDropData[];
}

type DragProps = {
  grpI: number;
  itemI: number;
};

const DragNDrop: React.FC<DragNDropProps> = ({ data }) => {
  const [list, setList] = useState(data);
  const [dragging, setDragging] = useState(false);
  const dragItem = useRef<DragProps | null>({ grpI: -1, itemI: -1 });
  const dragNode = useRef<EventTarget | null>();

  const handleDragStart = (e: React.MouseEvent, params: DragProps) => {
    console.log("Drag Start....", params);
    dragItem.current = params;
    dragNode.current = e.target;
    dragNode.current.addEventListener("dragend", handleDragEnd);
    setTimeout(() => {
      setDragging(true);
    });
  };

  const handleDragEnd = () => {
    console.log("dragend-----");
    dragItem.current = null;
    dragNode.current?.removeEventListener("dragend", handleDragEnd);
    dragNode.current = null;
    setDragging(false);
  };

  const getStyles = (params: DragProps) => {
    const currentItem = dragItem.current;
    if (
      currentItem?.grpI === params.grpI &&
      currentItem?.itemI === params.itemI
    ) {
      return "current dnd-item";
    }
    return "dnd-item";
  };

  return (
    <div className="drag-n-drop">
      {list.map((grp: DragNDropData, grpI: number) => (
        <div key={grp.title} className="dnd-group">
          <div className="group-head">{grp.title}</div>
          {grp.items.map((item, itemI) => (
            <div
              draggable
              onDragStart={(e) => handleDragStart(e, { grpI, itemI })}
              key={item}
              className={dragging ? getStyles({ grpI, itemI }) : "dnd-item"}
            >
              {item}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
export default DragNDrop;
