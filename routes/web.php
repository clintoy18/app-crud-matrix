<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\NoteController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CategoryController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

//products route
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/products', [ProductController::class, 'index'])->name('products.index');
    Route::post('/products', [ProductController::class, 'store'])->name('products.store');
    Route::patch('/products/{product}', [ProductController::class, 'update'])->name('products.update');
    Route::delete('/products/{product}', [ProductController::class, 'destroy'])->name('products.destroy');
});

//categories route
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/categories', [CategoryController::class, 'index'])->name('categories.index');
    Route::post('/categories', [CategoryController::class, 'store'])->name('categories.store');
    Route::patch('/categories/{category}', [CategoryController::class, 'update'])->name('categories.update');
    Route::delete('/categories/{category}', [CategoryController::class, 'destroy'])->name('categories.destroy');
});

Route::get('/tasks',[TaskController::class,'index'])->name('tasks.index');
Route::post('/tasks',[TaskController::class,'store'])->name('tasks.store');
Route::patch('/tasks/{task}',[TaskController::class,'update'])->name('tasks.update');
Route::delete('/tasks/{task}',[TaskController::class,'destroy'])->name('tasks.destroy');


Route::get('/notes',[NoteController::class,'index'])->name('notes.index');
Route::post('/notes',[NoteController::class,'store'])->name('notes.store');
Route::patch('/notes/{note}',[NoteController::class,'update'])->name('notes.update');
Route::delete('/notes/{note}',[NoteController::class,'destroy'])->name('notes.destroy');


require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
