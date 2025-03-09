import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";

interface Category {
    id: number;
    name: string;
}

interface Props {
    categories: Category[];
}

export default function Categories({ categories }: Props) {
    const [name, setName] = useState("");

    const addCategory = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return;
        
        Inertia.post(route("categories.store"), { name }, {
            onSuccess: () => {
                setName(""); // Clear input field
                Inertia.reload(); // Refresh categories list
            }
        });
    };
    
    const deleteCategory = (id: number) => {
        if (confirm("Are you sure you want to delete this category?")) {
            Inertia.delete(route("categories.destroy", { category: id }));
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Categories</h2>

            {/* Add Category Form */}
            <form onSubmit={addCategory} className="flex gap-2 mb-4">
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Category name"
                    className="flex-1 p-2 border rounded text-black"
                />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                    Add
                </button>
            </form>

            {/* Category List */}
            <ul className="divide-y">
                {categories.map((category) => (
                    <li key={category.id} className="flex justify-between items-center py-2">
                        <span className="text-black">{category.name}</span>
                        <button
                            onClick={() => deleteCategory(category.id)}
                            className="text-red-500 text-sm"
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
