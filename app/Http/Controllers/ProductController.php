<?php

namespace App\Http\Controllers;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $products = Product::latest()->with('category')->get();
        $categories = Category::all(); // to show in dropdown on the frontend

        return Inertia::render('Products/Index', [
            'products'   => $products,
            'categories' => $categories,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'nullable|numeric|min:0',
            'category_id' => 'required|exists:categories,id', 
            'size' => 'nullable|string|max:50',
            'condition' => 'required|in:new,used',
            'listing_type' => 'required|in:for sale,for donation',
            'images.*' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);
    
        // Debugging - Check if category_id is present
        if (!$request->category_id) {
            return redirect()->back()->withErrors(['category_id' => 'The category is required.']);
        }
    
        // Handle image upload
        $imagePaths = [];
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $path = $image->store('products', 'public');
                $imagePaths[] = $path;
            }
        }
    
        // Save product
        Product::create([
            'name' => $validated['name'],
            'description' => $validated['description'] ?? null,
            'price' => $validated['price'] ?? null,
            'category_id' => $validated['category_id'], // ✅ Ensure this is included
            'user_id' => Auth::id(),
            'size' => $validated['size'] ?? null,
            'condition' => $validated['condition'],
            'listing_type' => $validated['listing_type'],
            'images' => json_encode($imagePaths),
            'qty' => 1,
            'status' => 'available',
        ]);
    
        return redirect()->back()->with('success', 'Product added successfully!');
    }
    
    
    
    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
 // Update an existing product
        public function update(Request $request, Product $product)
        {
            $request->validate([
                'name'         => 'required|string|max:255',
                'description'  => 'required|string',
                'price'        => 'required|numeric|min:0',
                'category_id'  => 'required|exists:categories,id',
                'size'         => 'required|string',
                'condition'    => 'require|string',
                'qty'          => 'required|integer|min:0',
                'listing_type' => 'required|string',
                'status'       => 'nullable|string',
                'images'       => 'nullable|array',       // Accept an array of files
                'images.*'     => 'image|max:2048',         // Each file must be an image (max 2MB)
            ]);

            $product->update($request->only('name', 'description', 'price', 'category_id','size', 'condition', 'qty', 'listing_type', 'status'));

            return redirect()->back()->with('success', 'Product updated!');
        }
    /**
     * Remove the specified resource from storage.
     */
   // Delete a product
   public function destroy(Product $product)
   {
       $product->delete();

       return redirect()->back()->with('success', 'Product deleted!');
   }
}
