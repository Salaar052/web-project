"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function ProductDetailClient({ title, desription, price, imageUrl }) {
  const [selectedSize, setSelectedSize] = useState("Regular");
  
  const getTotal = () => {
    if (selectedSize === "Small") return price - 100;
    if (selectedSize === "Large") return price + 100;
    return price;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="p-4 sm:p-8 max-w-2xl w-full bg-white rounded-lg shadow-md mt-2">
        <Link href="/products" className="text-yellow-500 hover:text-yellow-600 transition-colors inline-block mb-4">
          ← Back to Menu
        </Link>
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-center">{title}</h1>
        <div className="relative w-full max-w-md mx-auto h-[200px] sm:h-[300px] mb-4">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover rounded-md"
            priority
          />
        </div>
        <p className="text-base sm:text-lg text-gray-800 mb-4 text-center">{desription}</p>
        {/* 🔘 Size Variation */}
        <div className="mb-4 text-center">
          <h2 className="font-semibold mb-2">Select Size:</h2>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {['Small', 'Regular', 'Large'].map((size) => (
              <Button
                key={size}
                variant={selectedSize === size ? "default" : "outline"}
                onClick={() => setSelectedSize(size)}
                className="transition-colors text-sm sm:text-base px-3 sm:px-4 py-2"
              >
                {size}
              </Button>
            ))}
          </div>
        </div>
        {/* 💵 Pricing */}
        <div className="text-center mt-4 mb-6">
          <p className="text-lg sm:text-xl font-bold text-green-600">
            Price: Rs {getTotal()}
          </p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white w-full transition-colors text-sm sm:text-base py-2 sm:py-3">
          Add to Cart
        </Button>
      </div>
    </div>
  );
} 