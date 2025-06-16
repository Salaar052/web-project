"use client"
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ProductDetail() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [selectedSize, setSelectedSize] = useState("Regular");

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(
          `https://better-melody-a764e21132.strapiapp.com/api/products?filters[slug][$eq]=${slug}&populate=*`
        );
        if (!res.ok) throw new Error("Failed to fetch product");
        const data = await res.json();
        setProduct(data.data[0]); // First match
      } catch (err) {
        setError(err.message || "Unknown error");
      }
    }

    if (slug) fetchProduct();
  }, [slug]);

  if (error) return <p>Error: {error}</p>;
  if (!product) return <p>Loading...</p>;

  const { title, desription, price, image } = product;
  const imageUrl = image?.[0]?.url || "/placeholder.png";
  const fullImageUrl = `https://better-melody-a764e21132.strapiapp.com${imageUrl}`;

  // 🧮 Calculate total based on selected size
  const getTotal = () => {
    if (selectedSize === "Small") return price - 100;
    if (selectedSize === "Large") return price + 100;
    return price;
  };
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="p-8 max-w-2xl w-full bg-white rounded-lg shadow-md mt-2">
            <Link href="/products" className="text-yellow-500"> -Back to Menu</Link>
          <h1 className="text-3xl font-bold mb-4 text-center">{title}</h1>
          <img
            src={fullImageUrl}
            alt={title}
            className="w-full max-w-md mx-auto rounded-md mb-4"
          />
          <p className="text-lg text-gray-800 mb-4 text-center">{desription}</p>

          {/* 🔘 Size Variation */}
          <div className="mb-4 text-center">
            <h2 className="font-semibold mb-2">Select Size:</h2>
            <div className="flex justify-center gap-3">
              {["Small", "Regular", "Large"].map((size) => (
                <Button
                  key={size}
                  variant={selectedSize === size ? "default" : "outline"}
                  onClick={() => setSelectedSize(size)}
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

          <Button className="bg-blue-600 hover:bg-blue-700 text-white w-full">
            Add to Cart
          </Button>
        </div>
      </div>
    </>
  );
}
