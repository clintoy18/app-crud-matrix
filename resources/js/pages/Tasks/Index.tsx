import React, { useState } from "react";
import { router } from "@inertiajs/react";

// Define TypeScript types
interface Task {
    id: number;
    title: string;
    is_done: boolean;
}

interface TaskListProps {
    tasks: Task[];
}

export default function TaskList({ tasks }: TaskListProps) {
    const [title, setTitle] = useState<string>("");

    const addTask = (e: React.FormEvent) => {
        e.preventDefault();
        router.post(route("tasks.store"), { title });
        setTitle("");
    };

    const toggleTask = (id: number) => {
        router.patch(route("tasks.update", { id }));
    };

    const deleteTask = (id: number) => {
        router.delete(route("tasks.destroy", { id }));
    };

    return (
        <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
            <h1 className="text-2xl font-bold text-center mb-4 text-blue-600">
                📝 To-Do List
            </h1>

            {/* Task Input Form */}
            <form onSubmit={addTask} className="flex gap-2 mb-4">
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    placeholder="Enter a task..."
                    className="flex-1 p-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                >
                    ➕ Add Task
                </button>
            </form>

            {/* Task List */}
            <ul className="space-y-2">
                {tasks.map((task) => (
                    <li
                        key={task.id}
                        className="flex justify-between items-center p-3 bg-gray-100 rounded-lg shadow"
                    >
                        <span
                            className={`cursor-pointer ${
                                task.is_done ? "line-through text-black" : "text-gray-800"
                            }`}
                            onClick={() => toggleTask(task.id)}
                        >
                            {task.title}
                        </span>
                        <button
                            onClick={() => deleteTask(task.id)}
                            className="text-red-500 hover:text-red-700 transition"
                        >
                            ❌
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
