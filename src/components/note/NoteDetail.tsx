import { deleteNoteById } from "@/api/NoteAPI";
import { Note } from "@/types";
import React from "react";
import { toast } from "sonner";

interface NoteDetailProps {
  note: Note;
  onNoteDeleted: () => void;
}

function NoteDetail({ note, onNoteDeleted }: NoteDetailProps) {
  const deleteNote = async () => {
    try {
      await deleteNoteById(note.id);
      onNoteDeleted();
    } catch (error) {
      toast.error("Ocurrió un error al eliminar la nota", {
        position: "top-center",
        style: {
          background: "#FCA5A5",
          color: "#9B2C2C",
        },
      });
    }
  };
  return (
    <div className="p-3 flex flex-col md:flex-row justify-between items-start md:items-center">
      <div className="w-full md:w-auto">
        <p className="overflow-ellipsis overflow-hidden">
          {note.content} por:
          <span className="font-bold"> {note.createdBy.username}</span>
        </p>
        <p className="text-xs text-slate-400">
          Creado el:{" "}
          {new Date(note.createdAt).toLocaleDateString("es-ES", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>
      <div className="mt-2 md:mt-0">
        <button
          className=" bg-red-400 hover:bg-red-500 p-2 text-xs text-white font-bold cursor-pointer rounded-lg transition-colors"
          onClick={() => {
            deleteNote();
          }}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}

export default NoteDetail;
