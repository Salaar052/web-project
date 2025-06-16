// ===============================
// File: app/products/page.jsx
// ===============================
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Products() {
  const [productsByCategory, setProductsByCategory] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("https://better-melody-a764e21132.strapiapp.com/api/products?populate=*");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();

        const grouped = data.data.reduce((acc, product) => {
          const categoryName = product.category?.name || "Uncategorized";
          if (!acc[categoryName]) acc[categoryName] = [];
          acc[categoryName].push(product);
          return acc;
        }, {});

        setProductsByCategory(grouped);
      } catch (err) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  return (
    <>
      <div className="mx-50 mt-10">
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}

        {!loading &&
          !error &&
          Object.entries(productsByCategory).map(([category, products]) => (
            <div key={category} className="mb-12">
              <h3 className="text-xl font-bold mb-4">{category}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {products.map((product) => {
                  const { id, title, desription, price, image, slug } = product;
                  const imageUrl =
                    image?.[0]?.formats?.thumbnail?.url ||
                    image?.[0]?.url ||
                    "/placeholder.png";
                  const fullImageUrl = `https://better-melody-a764e21132.strapiapp.com${imageUrl}`;

                  return (
                    <Card key={id} className="w-full h-auto overflow-hidden flex flex-col">
                      <CardHeader className="pb-2">
                        <CardTitle>
                          <Link href={`/products/${slug}`}>
                            <h1 className="text-lg cursor-pointer hover:underline">
                              {title || "Untitled"}
                            </h1>
                          </Link>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="overflow-hidden flex flex-col gap-2">
                        <Link href={`/products/${slug}`}>
                          <img
                            src={fullImageUrl}
                            alt={title}
                            className="w-full h-[180px] object-cover rounded-md cursor-pointer"
                            loading="lazy"
                          />
                        </Link>
                        <p className="text-sm text-gray-800">
                          {desription || "No description available."}
                        </p>
                        <p className="text-lg font-bold text-green-600">
                          Rs {price || "N/A"}
                        </p>
                        <Button className="mt-2 bg-blue-600 hover:bg-blue-700 text-white">
                          Add to Cart
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
