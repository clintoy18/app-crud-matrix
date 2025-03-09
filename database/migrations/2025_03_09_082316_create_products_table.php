<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id(); // Creates 'id' as the primary key
            $table->string('name');
            $table->text('description')->nullable();
            $table->decimal('price', 10, 2)->nullable();
            $table->foreignId('category_id')->constrained('categories')->onDelete('cascade'); // FK to categories
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade'); // FK to users
            $table->string('size')->nullable();
            $table->enum('condition', ['new', 'used'])->default('new');
            $table->json('images')->nullable(); // Store multiple images
            $table->integer('qty')->default(1);
            $table->enum('listing_type', ['for sale', 'for donation']);
            $table->enum('status', ['sold', 'available'])->default('available');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
