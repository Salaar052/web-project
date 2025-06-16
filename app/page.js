import HeroCarousel from "@/components/HeroCarousel";
import ProductCarousel from "@/components/ProductCarousel";
import Link from "next/link";
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Metadata } from "next";

export const metadata = {
  title: 'AgriConnect - Your Agricultural Partner',
  description: 'Your go-to platform for everything agriculture — from crop guidance and smart gardening tips to modern tools and market insights.',
};

export const revalidate = 3600; // Revalidate every hour

export default async function Home() {
  // Fetch Hero Images
  const resImages = await fetch(
    "https://better-melody-a764e21132.strapiapp.com/api/Homes?populate=*",
    { 
      next: { revalidate: 3600 },
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  
  if (!resImages.ok) {
    throw new Error('Failed to fetch hero images');
  }
  
  const dataImages = await resImages.json();
  const firstSlide = dataImages.data[0];
  const images = firstSlide?.slideBar || [];

  // Fetch Product Data
  const resProducts = await fetch(
    "https://better-melody-a764e21132.strapiapp.com/api/products?populate=*",
    { 
      next: { revalidate: 3600 },
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  
  if (!resProducts.ok) {
    throw new Error('Failed to fetch products');
  }
  
  const dataProducts = await resProducts.json();
  const products = dataProducts.data || [];

  const blogs = [
    {
      id: 1,
      title: "How to Grow Organic Vegetables",
      slug: "organic-vegetables",
      description: "Learn the basics of growing organic food in your backyard.",
      image: "/images/blog1.jpg",
    },
    {
      id: 2,
      title: "Top 5 Farming Tools for 2025",
      slug: "farming-tools-2025",
      description: "A quick guide to the best tools every modern farmer should use.",
      image: "/images/blog2.jpg",
    },
    {
      id: 3,
      title: "Beginner&apos;s Guide to Urban Gardening",
      slug: "urban-gardening-guide",
      description: "Start your home garden today with these easy tips.",
      image: "/images/blog3.jpg",
    },
  ];

  if (images.length === 0) return <p>Loading...</p>;

  return (
    <>
      {/* Hero Carousel */}
      <div className="w-full h-[450px]">
        <HeroCarousel images={images} />
      </div>

      {/* Explore Menu Header */}
      <div className="mx-50 mt-10 flex justify-between items-center">
        <h1 className="text-3xl font-semibold">Explore Menu</h1>
        <Link href="/products" className="text-orange-500 hover:text-orange-600 transition-colors">
          View All
        </Link>
      </div>

      {/* Product Carousel */}
      <div className="mx-40 mt-30">
        <ProductCarousel products={products} />
      </div>

      {/* Blog Section */}
      <div className="mx-auto max-w-6xl px-6 py-10">
        <h2 className="text-2xl font-bold mb-6">Latest Blogs</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <Link key={blog.id} href={`/blogs/${blog.slug}`}>
              <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                <div className="relative w-full h-40">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    className="object-cover rounded-t"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">{blog.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">{blog.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        {/* Footer - About Section */}
        <footer className="bg-yellow-200 mt-20 py-10 border-t border-green-300">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-xl font-bold text-green-800 mb-4">About Cheezios</h2>
            <p className="text-green-700 text-sm leading-relaxed max-w-3xl">
              AgriConnect is your go-to platform for everything agriculture — from crop guidance and smart gardening 
              tips to modern tools and market insights. Whether you&apos;re a seasoned farmer or a home grower, we aim to 
              support your journey with practical knowledge and trusted resources to help you grow better, smarter, and more sustainably.
            </p>
            <div className="mt-6 text-sm text-bla-600">
              &copy; {new Date().getFullYear()} AgriConnect. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
