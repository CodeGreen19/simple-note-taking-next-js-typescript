import connect_db from "@/lib/database/db";
import Note from "@/lib/models/note.model";
import { NextRequest, NextResponse } from "next/server";
// read
export const GET = async () => {
  try {
    await connect_db();
    const notes = await Note.find();
    return new NextResponse(JSON.stringify(notes), { status: 200 });
  } catch (error) {
    return new NextResponse(error as string, { status: 500 });
  }
};
// create
export const POST = async (req: NextRequest) => {
  const body = await req.json();
  try {
    await connect_db();
    const note = await Note.create(body);
    return new NextResponse(JSON.stringify(note), { status: 200 });
  } catch (error) {
    return new NextResponse(error as string, { status: 500 });
  }
};

//update
export const PUT = async (req: NextRequest) => {
  const { id } = await req.json();
  try {
    await connect_db();
    const note = await Note.findById(id);
    if (!note) {
      return new NextResponse("note note found", { status: 500 });
    }
    if (note.fullfilled === true) {
      note.fullfilled = false;
    } else {
      note.fullfilled = true;
    }
    await note.save();
    return new NextResponse("note updated", { status: 200 });
  } catch (error) {
    return new NextResponse(error as string, { status: 500 });
  }
};
//delete
export const DELETE = async (req: NextRequest) => {
  const { id } = await req.json();
  console.log(id);

  try {
    await connect_db();
    await Note.findByIdAndDelete(id);
    return new NextResponse("note deleted", { status: 200 });
  } catch (error) {
    return new NextResponse(error as string, { status: 500 });
  }
};
