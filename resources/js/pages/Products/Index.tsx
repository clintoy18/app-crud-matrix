import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";

interface Category {
    id: number;
    name: string;
}

interface Props {
    categories: Category[];
}

export default function Products({ categories }: Props) {
    // Product state
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [size, setSize] = useState("");
    const [condition, setCondition] = useState("new");
    const [listingType, setListingType] = useState("for sale");
    const [images, setImages] = useState<File[]>([]);

    // Handle multiple file selection
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImages(Array.from(e.target.files));
        }
    };

    // Handle form submission
    const addProduct = (e: React.FormEvent) => {
        e.preventDefault();
        // Basic client-side check for required fields
        if (!name.trim() || !price || !categoryId) return;

        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("price", price);
        formData.append("category_id", categoryId); // Ensure field name matches migration
        formData.append("size", size);
        formData.append("condition", condition);
        formData.append("listing_type", listingType);
        images.forEach((image, index) => formData.append(`images[${index}]`, image));

        Inertia.post(route("products.store"), formData);
        resetForm();
    };

    // Reset form fields
    const resetForm = () => {
        setName("");
        setDescription("");
        setPrice("");
        setCategoryId("");
        setSize("");
        setCondition("new");
        setListingType("for sale");
        setImages([]);
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Add Product</h2>

            {/* Product Creation Form */}
            <form onSubmit={addProduct} className="grid gap-3">
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Product Name"
                    className="p-2 border rounded text-black"
                    required
                />
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                    className="p-2 border rounded text-black"
                />
                <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Price"
                    className="p-2 border rounded text-black"
                    required
                />
                <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="p-2 border rounded text-black"
                    required
                >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                            {cat.name}
                        </option>
                    ))}
                </select>
                <input
                    type="text"
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                    placeholder="Size (optional)"
                    className="p-2 border rounded text-black"
                />
                <select
                    value={condition}
                    onChange={(e) => setCondition(e.target.value)}
                    className="p-2 border rounded text-black"
                >
                    <option value="new">New</option>
                    <option value="used">Used</option>
                </select>
                <select
                    value={listingType}
                    onChange={(e) => setListingType(e.target.value)}
                    className="p-2 border rounded text-black"
                    required
                >
                    <option value="for sale">For Sale</option>
                    <option value="for donation">For Donation</option>
                </select>

                {/* Image Upload */}
                <input
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className="p-2 border rounded text-black"
                />
                
                {/* Image Previews */}
                {images.length > 0 && (
                    <div className="flex gap-2 mt-2">
                        {images.map((image, index) => (
                            <img
                                key={index}
                                src={URL.createObjectURL(image)}
                                alt="Preview"
                                className="w-16 h-16 object-cover rounded"
                            />
                        ))}
                    </div>
                )}

                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                    Add Product
                </button>
            </form>
        </div>
    );
}
