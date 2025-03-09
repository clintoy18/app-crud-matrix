import React, { useState } from "react";
import { router } from "@inertiajs/react";

// Define TypeScript types

enum Category{
    Work = "Work",
    Personal = "Personal",
    Study = "Study",
    Other = "Other",
}

interface Note {
    id: number;
    title: string;
    category :Category;
    content : string;
    is_important: boolean;
}


interface NoteListProps {
    notes: Note[];
    filters :{
        search? : string;
        category? :string;
    }
}


export default function Notes({ notes,filters }: NoteListProps) {
    const [title, setTitle] = useState<string>("");
    const [content ,setContent] = useState<string>("");
    const [category ,setCategory] = useState<Category>(Category.Other);
    const [search, setSearch] = useState<string>(filters.search || "");
    const [filterCategory, setFilterCategory] = useState<string>(filters.category || "");
    

    //function to apply search and category parameters

    const applyFilters = (e: React.FormEvent) => {
        e.preventDefault();
        //send a get requests with search and category parameters
        router.get(
            route("notes.index"),
            { search, category: filterCategory},
            {preserveState: true}
        );
    };

    const addNote = (e: React.FormEvent) => {
        e.preventDefault();
        router.post(route("notes.store"), { title ,content,category});
        setTitle("");
        setContent("");
        setCategory(Category.Other);
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

                    {/* Search and Filter Form */}
            <form onSubmit={applyFilters} className="flex flex-col sm:flex-row gap-2 my-4">
                <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search notes..."
                className="flex-1 p-2 border rounded text-black"
                />
                <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="p-2 border rounded  text-black"
                >
                <option value="">All Categories</option>
                {Object.values(Category).map((cat) => (
                    <option key={cat} value={cat}>
                    {cat}
                    </option>
                ))}
                </select>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                Apply
                </button>
            </form>

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
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as Category)} // Cast to enum
                    className="w-full p-2 border rounded text-black"
                >
                    {Object.values(Category).map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>

                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                    Add Note
                </button>
            </form>

            <ul className="mt-4">
                {notes.map((note) => (
                    <li key={note.id} className="p-4 border rounded mb-2">
                        <h2 className="font-bold text-black p-2">{note.title}</h2>
                        <p  className="p-2 text-black">{note.content}</p> 
                        <span className="text-sm text-black">Category: {note.category}</span>
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