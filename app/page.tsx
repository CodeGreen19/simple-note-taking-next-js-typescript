"use client";

import NoteCard from "@/components/NoteCard";
import {
  createNotes,
  deleteNotes,
  getNotes,
  updateNotes,
} from "@/lib/actions/note.action";
import { NoteType } from "@/types/types";
import React, { FormEvent, useEffect, useState } from "react";

function Home() {
  const [tasks, setTasks] = useState<NoteType[]>([]);
  const [task, setTask] = useState<string>("");
  // read notes

  const allnotes = () => {
    getNotes()
      .then((notes: NoteType[]) => {
        setTasks(notes);
        console.log(notes);
      })
      .catch((err) => console.log(err));
  };
  // crate note
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let taskInfo: NoteType = {
      title: task,
      fullfilled: false,
    };
    setTask("");
    setTasks([...tasks, taskInfo]);
    await createNotes(taskInfo);
    allnotes();
  };

  // delete note

  const deleteHandler = async (id: string) => {
    setTasks(tasks.filter((info) => info._id !== id));
    await deleteNotes(id);
    allnotes();
  };

  // update note
  const update = async (id: string) => {
    let info: NoteType[] = [];
    tasks.forEach((ele) => {
      if (ele._id === id) {
        ele.fullfilled = ele.fullfilled ? false : true;
      }
      info.push(ele);
    });
    setTasks(info);
    await updateNotes(id);
    allnotes();
  };

  useEffect(() => {
    allnotes();
  }, []);

  return (
    <div className="w-full p-2 md:p-0 md:w-[50%] m-auto ">
      <form
        className="flex items-center justify-between mt-[20px]"
        onSubmit={handleSubmit}
      >
        <input
          value={task}
          onChange={(e) => setTask(e.target.value)}
          type="text"
          className="w-[79%] rounded-md p-3 outline-none bg-slate-200"
          placeholder="enter text..."
        />
        <button type="submit" className="w-[20%] bg-green-500 p-3 rounded-md">
          Add
        </button>
      </form>
      <div className="border-t-[2px] border-[#bebebe] mt-6">
        {tasks.length === 0 ? (
          <div className="opacity-25 text-center pt-9">no tasks...</div>
        ) : (
          tasks.map((note, i) => (
            <NoteCard
              deleteHandler={deleteHandler}
              update={update}
              key={i}
              note={note}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Home;
