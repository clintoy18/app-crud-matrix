<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Note;
use Inertia\Inertia;

class NoteController extends Controller
{
    public function index(){
        return Inertia::render('Notes/Index', [
            'notes' => Note::latest()->get() ?? []
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string'
        ]);

        Note::create($request->only('title','content'));

        return redirect()->route('notes.index');
    }
    

    public function update(Request $request, Note $note)
    {
        $note->update([
            'is_important' => !$note->is_important
        ]);
        return redirect()->route('notes.index');
    }

    public function destroy(Request $request, Note $note)
    {
        $note->delete();

        return redirect()->route('notes.index');   
    
    }
}
