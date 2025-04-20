import React, { useState } from "react";
import { IoMdSettings } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";

import {
  arrayMove,
  SortableContext,
  useSortable,
  rectSortingStrategy,
} from "@dnd-kit/sortable";

import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
} from "@dnd-kit/core";

import { CSS } from "@dnd-kit/utilities";

// Sortable Item Component
function SortableItem({ id, label }: { id: string; label: string }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: "16px 24px",
    backgroundColor: "#e0f7fa",
    border: "1px solid #00acc1",
    borderRadius: 8,
    cursor: "grab",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    flex: "0 1 calc(33.33% - 10px)",
    boxSizing: "border-box",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <GiHamburgerMenu />
      <span>{label}</span>
    </div>
  );
}

// Main Q2 Form Component
function YourQ2Component({
  setModalOpen,
}: {
  setModalOpen: (id: string | false) => void;
}) {
  const [items, setItems] = useState([
    { id: "1", label: "Medication" },
    { id: "2", label: "Medicine" },
    { id: "3", label: "Appoitment" },
    { id: "4", label: "Emergency" },
    { id: "5", label: "Injection" },
    { id: "6", label: "date" },
    { id: "7", label: "Meeting room" },
    { id: "8", label: "Inatke Q" },
  ]);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = items.findIndex((item) => item.id === active.id);
    const newIndex = items.findIndex((item) => item.id === over.id);
    setItems((items) => arrayMove(items, oldIndex, newIndex));
  };

  return (
    <div className="bg-white" style={{ padding: 40 }}>
      <div
        onClick={() => setModalOpen(false)}
        style={{ cursor: "pointer", marginBottom: 20 }}
      >
        ❌ Close
      </div>

      <div className="container-fulid">
        <div className="d-flex justify-content-between mb-3">
          <h4>Question Type</h4>
          <div className="border d-flex align-items-center gap-2 py-2 px-4">
            <IoMdSettings />
            <p className="m-0">Question Options</p>
          </div>
        </div>

        <div className="mb-3">
          <select className="form-select w-100">
            <option>Mixed Controls</option>
          </select>
        </div>

        <h6>Block Instructions (optional)</h6>
        <textarea
          className="form-control mb-4"
          placeholder="Client Information"
          defaultValue=""
        />

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={items} strategy={rectSortingStrategy}>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "10px",
                paddingTop: 40,
              }}
            >
              {items.map((item) => (
                <SortableItem key={item.id} id={item.id} label={item.label} />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
}

export default YourQ2Component;
