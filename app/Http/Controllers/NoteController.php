<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Note;
use Inertia\Inertia;

class NoteController extends Controller
{
    public function index(Request $request){
        $query = Note::query();

        if($search = $request->input('search')){
            $query->where(function ($q) use ($search){
                $q->where('title','like',"%{$search}%")
                ->orWhere('content','like',"%{$search}%");
            });
        }

        // apply category filter
        if($category = $request->input('category')){
            $query->where('category', $category);
        }

        //get results , order by newest 
        $notes= $query->latest() -> get();

        // pass the filters back as proprs so the front end can use them
        return Inertia::render('Notes/Index', [
            'notes' => $notes,
            'filters' =>[
                'search' => $search,
                'category' => $category,
            ]
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
