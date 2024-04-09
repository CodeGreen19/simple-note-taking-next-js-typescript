import React from "react";
import { MdDelete } from "react-icons/md";
import { FaRegCircleCheck } from "react-icons/fa6";
import { FaRegCircle } from "react-icons/fa";
import { CiCircleList } from "react-icons/ci";
import { NoteType } from "@/types/types";

type NoteCardProps = {
  note: NoteType;
  update: (arg: string) => void;
  deleteHandler: (arg: string) => void;
};
function NoteCard({ note, update, deleteHandler }: NoteCardProps) {
  return (
    <div className="flex items-center justify-between bg-[#bbdeff] p-3 my-1 rounded-md gap-2">
      <h1 className="flex items-center justify-start gap-2">
        <CiCircleList className="text-[1.5rem] text-[purple]" />
        {note.fullfilled === true ? (
          <del>{note.title}</del>
        ) : (
          <span>{note.title}</span>
        )}
      </h1>
      <div>
        <button className="p-2" onClick={() => deleteHandler(note._id!)}>
          <MdDelete className="text-[#e44c4c] text-[1.5rem]" />
        </button>
        <button className="p-2" onClick={() => update(note._id!)}>
          {note.fullfilled === true ? (
            <FaRegCircleCheck className="text-[#742eff] text-[1.5rem]" />
          ) : (
            <FaRegCircle className="text-[#676767] text-[1.5rem]" />
          )}
        </button>
      </div>
    </div>
  );
}

export default NoteCard;
