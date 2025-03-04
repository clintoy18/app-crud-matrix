<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Task;
use Inertia\Inertia;

class TaskController extends Controller
{
    public function index() {
        $tasks = Task::all();
        return Inertia::render('Tasks/Index',['tasks' =>$tasks]);

    }

    public function store(Request $request){

        $request->validate([
            'title' => 'required|string|max:255',]);
        Task::create(['title' => $request->title]);
        return redirect()->route('tasks.index');
    }


    public function update(Task $task){
        $task->update(['is_done'=> !$task->is_done]);
        return redirect()->route('tasks.index');
    }


    public function destroy(Task $task) {
        $task->delete();
        return redirect()->route('tasks.index');
    }

}
