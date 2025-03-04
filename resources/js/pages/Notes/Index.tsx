import React, { useState } from "react";
import { router } from "@inertiajs/react";

// Define TypeScript types
interface Note {
    id: number;
    title: string;
    content : string;
    is_important: boolean;
}

interface NoteListProps {
    notes: Note[];
}

export default function Notes({ notes }: NoteListProps) {
    const [title, setTitle] = useState<string>("");
    const [content ,setContent] = useState<string>("");


    const addNote = (e: React.FormEvent) => {
        e.preventDefault();
        router.post(route("notes.store"), { title ,content});
        setTitle("");
        setContent("");
    };

    const toggleImportance = (id: number) => {
        router.patch(route("notes.update", { id }));
    };

    const deleteNote = (id: number) => {
        router.delete(route("notes.destroy", { id }));
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-gray-100 rounded-xl shadow-md">
            <h1 className="text-xl font-bold text-black">Notes App</h1>

            <form onSubmit={addNote} className="space-y-2">
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                    className="w-full p-2 border rounded text-black"
                    required
                />
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Content"
                    className="w-full p-2 border rounded  text-black"
                    required
                />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                    Add Note
                </button>
            </form>

            <ul className="mt-4">
                {notes.map((note) => (
                    <li key={note.id} className="p-4 border rounded mb-2">
                        <h2 className="font-bold text-black p-2">{note.title}</h2>
                        <p  className="p-2 text-black">{note.content}</p>
                        <button
                            onClick={() => toggleImportance(note.id)}
                            className={`px-4 py-1 rounded  ${
                                note.is_important ? "bg-yellow-500" : "bg-gray-300"
                            }`}
                        >
                            {note.is_important ? "⭐ Important" : "Mark Important"}
                        </button>
                        <button onClick={() => deleteNote(note.id)} className="ml-2 text-red-500">
                            ❌ Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}