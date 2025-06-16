// ===============================
// File: app/products/page.jsx
// ===============================
import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";

export const metadata = {
  title: 'Products - AgriConnect',
  description: 'Browse our wide range of agricultural products and tools.',
};

export const revalidate = 3600; // Revalidate every hour

export default async function Products() {
  const res = await fetch(
    "https://better-melody-a764e21132.strapiapp.com/api/products?populate=*",
    { 
      next: { revalidate: 3600 },
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }

  const data = await res.json();
  const grouped = data.data.reduce((acc, product) => {
    const categoryName = product.category?.name || "Uncategorized";
    if (!acc[categoryName]) acc[categoryName] = [];
    acc[categoryName].push(product);
    return acc;
  }, {});

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {Object.entries(grouped).map(([category, products]) => (
        <div key={category} className="mb-12">
          <h3 className="text-xl sm:text-2xl font-bold mb-4">{category}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {products.map((product) => {
              const { id, title, desription, price, image, slug } = product;
              const imageUrl = image?.[0]?.url || "/placeholder.png";
              return (
                <Card key={id} className="w-full h-auto overflow-hidden flex flex-col">
                  <CardHeader className="pb-2">
                    <CardTitle>
                      <Link href={`/products/${slug}`}>
                        <h1 className="text-base sm:text-lg cursor-pointer hover:underline">
                          {title || "Untitled"}
                        </h1>
                      </Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="overflow-hidden flex flex-col gap-2">
                    <Link href={`/products/${slug}`}>
                      <div className="relative w-full h-[150px] sm:h-[180px]">
                        <Image
                          src={imageUrl}
                          alt={title}
                          fill
                          className="object-cover rounded-md cursor-pointer"
                        />
                      </div>
                    </Link>
                    <p className="text-xs sm:text-sm text-gray-800 line-clamp-2">
                      {desription || "No description available."}
                    </p>
                    <p className="text-base sm:text-lg font-bold text-green-600">
                      Rs {price || "N/A"}
                    </p>
                    <Button className="mt-2 bg-blue-600 hover:bg-blue-700 text-white transition-colors text-sm sm:text-base py-2">
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
  );
}
