"use client";
import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
} from "@dnd-kit/core";
import { GiHamburgerMenu } from "react-icons/gi";

import "./test.css";

import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";
import { IoMdSettings } from "react-icons/io";
import YourQ3Component from "@/compoments/YourQ3Component";
import YourQ2Component from "@/compoments/YourQ2Component";
import FallbackComponent from "@/compoments/FallbackComponent";

// 👇 Box component with drag capability
function SortableItem({
  index,
  id,
  text,
  modalOpen,
  setModalOpen,
}: {
  index: number;
  id: string;
  text: string;
  setModalOpen: any;
  modalOpen: any;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: 16,
    backgroundColor: "#f2f2f2",
    border: "1px solid #ccc",
    borderRadius: 4,
    cursor: "grab",
  };

  // console.log()
  console.log(modalOpen, "modalOpenmodalOpen");

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <div className="d-flex gap-2" onClick={() => setModalOpen(id)}>
        <div className="">
          <input type="checkbox" />
        </div>
        <p className="w-100">
          <b>{index + 1}.</b> {text}
        </p>
        <div {...listeners}>
          <GiHamburgerMenu />
        </div>
      </div>
    </div>
  );
}

export default function DragAndDropList() {
  const [items, setItems] = useState([
    {
      id: "q1",
      text: "Please describe what has led you to seek Counseling now...",
    },
    {
      id: "q2",
      text: "Please describe what has led you to seek Counseling now... Please describe what has led you to seek Counseling now... Please describe what has led you to seek Counseling now...",
    },
    {
      id: "q3",
      text: "Please describe what has led you to seek Counseling now... Please describe what has led you to seek Counseling now...Please describe what has led you to seek Counseling now...",
    },
  ]);

  const [modalOpen, setModalOpen] = useState<any>(false);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);

      setItems((prev) => arrayMove(prev, oldIndex, newIndex));
    }
  };

  return (
    <>
      <div className="row">
        <div className="col-lg-5">
          <div
            className="d-flex justify-content-between align-items-center py-2 px-3"
            style={{ backgroundColor: "#EEEEEE" }}
          >
            <div>
              <input type="checkbox" />
            </div>

            <p className="m-0 p-0" style={{ color: "#03527A" }}>
              Mohammad
            </p>

            <div className="" style={{ color: "#666666", fontSize: "20px" }}>
              +
            </div>
          </div>

          <div style={{ maxWidth: "100%" }}>
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={items.map((item) => item.id)}
                strategy={verticalListSortingStrategy}
              >
                {items.map((item, index: any) => (
                  <SortableItem
                    index={index}
                    key={item.id}
                    id={item.id}
                    text={item.text}
                    setModalOpen={setModalOpen}
                    modalOpen={modalOpen}
                  />
                ))}
              </SortableContext>
            </DndContext>
          </div>
        </div>
        <div className="col-lg-7">
          <div className="intake-forms ">
            {modalOpen === "q3" ? (
              <YourQ3Component setModalOpen={setModalOpen} />
            ) : modalOpen === "q2" ? (
              <YourQ2Component setModalOpen={setModalOpen} />
            ) : (
              <FallbackComponent />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
