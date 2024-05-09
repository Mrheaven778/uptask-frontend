import React, { useEffect, useState, useCallback } from "react";
import AddNoteForm from "./AddNoteForm";
import { Note } from "@/types";
import { getTasksNote } from "@/api/NoteAPI";
import NoteDetail from "./NoteDetail";

function NotesPanel({ taskID }: { taskID: any }) {
  const [notes, setNotes] = useState<Note[]>();

  const getNotes = useCallback(async () => {
    const data = await getTasksNote(taskID);
    setNotes(data);
  }, [taskID]);

  useEffect(() => {
    getNotes();
  }, [getNotes]);

  return (
    <>
      <AddNoteForm taskID={taskID} onNoteAdded={getNotes} />
      <div className="divide-y divide-gray-400 mt-10">
        {notes?.length ? (
          <>
            <p className="font-bold text-2xl text-slate-200 my-5">Notas:</p>
            {notes.map((note) => (
              <NoteDetail key={note.id} note={note} onNoteDeleted={getNotes} />
            ))}
          </>
        ) : (
          <p className="text-center mt-3">No hay notas</p>
        )}
      </div>
    </>
  );
}

export default NotesPanel;
