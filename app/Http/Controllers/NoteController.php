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

        Note::create($request->only('title','content','category'));

        return redirect()->route('notes.index');
    }
    
    

    public function update(Request $request, Note $note)
    {
        $request->validate([
            'category' => 'required|in:Work,Personal,Study,Other',
        ]);

        $note->update([
            'category' => $request->category,
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
