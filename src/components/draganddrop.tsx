import React, { useState, useRef, MouseEvent } from "react";

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
  const dragItem = useRef<DragProps>({ grpI: -1, itemI: -1 });
  const dragNode = useRef<EventTarget>();

  const handleDragStart = (e: MouseEvent, params: DragProps) => {
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
    dragItem.current = { grpI: -1, itemI: -1 };
    dragNode.current?.removeEventListener("dragend", handleDragEnd);
    dragNode.current = undefined;
    setDragging(false);
  };

  const handleDragEnter = (e: MouseEvent, params: DragProps) => {
    const currentItem = dragItem.current;
    if (e.target !== dragNode.current) {
      console.log("not the same location");
      setList((oldList) => {
        let newList = JSON.parse(JSON.stringify(oldList));
        newList[params.grpI].items.splice(
          params.itemI,
          0,
          newList[currentItem.grpI].items.splice(currentItem.itemI, 1)[0]
        );
        dragItem.current = params;
        return newList;
      });
    }
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
              onDragEnter={
                dragging
                  ? (e) => handleDragEnter(e, { grpI, itemI })
                  : undefined
              }
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
