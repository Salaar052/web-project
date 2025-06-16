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
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="p-8 max-w-2xl w-full bg-white rounded-lg shadow-md mt-2">
        <Link href="/products" className="text-yellow-500 hover:text-yellow-600 transition-colors">
          -Back to Menu
        </Link>
        <h1 className="text-3xl font-bold mb-4 text-center">{title}</h1>
        <div className="relative w-full max-w-md mx-auto h-[300px] mb-4">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover rounded-md"
            priority
          />
        </div>
        <p className="text-lg text-gray-800 mb-4 text-center">{desription}</p>
        {/* 🔘 Size Variation */}
        <div className="mb-4 text-center">
          <h2 className="font-semibold mb-2">Select Size:</h2>
          <div className="flex justify-center gap-3">
            {['Small', 'Regular', 'Large'].map((size) => (
              <Button
                key={size}
                variant={selectedSize === size ? "default" : "outline"}
                onClick={() => setSelectedSize(size)}
                className="transition-colors"
              >
                {size}
              </Button>
            ))}
          </div>
        </div>
        {/* 💵 Pricing */}
        <div className="text-center mt-4 mb-6">
          <p className="text-xl font-bold text-green-600">
            Price: Rs {getTotal()}
          </p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white w-full transition-colors">
          Add to Cart
        </Button>
      </div>
    </div>
  );
} 