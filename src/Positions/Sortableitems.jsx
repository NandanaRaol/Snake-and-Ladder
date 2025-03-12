import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const SortableItem = ({ id, value }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: "10px",
    margin: "5px",
    border: "1px solid gray",
    cursor: "grab",
    backgroundColor: "lightgray",
    listStyle: "none",
  };

  return (
    <li ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {value}
    </li>
  );
};

export default SortableItem;
