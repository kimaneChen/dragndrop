import React, { useState } from "react";

export interface DragNDropData {
  title: string;
  items: string[];
}

export interface DragNDropProps {
  data: DragNDropData[];
}

const DragNDrop: React.FC<DragNDropProps> = ({ data }) => {
  const [list, setList] = useState(data);

  const handleDragStart = (e: any) => {
    console.log("Drag Start");
  };
  return (
    <div className="drag-n-drop">
      {list.map((grp: DragNDropData, grpI: number) => (
        <div key={grp.title} className="dnd-group">
          <div className="group-head">{grp.title}</div>
          {grp.items.map((item, itemI) => (
            <div draggable onDragStart={handleDragStart} className="dnd-item">
              {item}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
export default DragNDrop;
