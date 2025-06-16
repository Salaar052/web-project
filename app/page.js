"use client";

import { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

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
    title: "Beginner's Guide to Urban Gardening",
    slug: "urban-gardening-guide",
    description: "Start your home garden today with these easy tips.",
    image: "/images/blog3.jpg",
  },
];

export default function Home() {
  const [images, setImages] = useState([]);
  const [products, setProducts] = useState([]);

  // Fetch Hero Images
  useEffect(() => {
    async function fetchImages() {
      const res = await fetch("https://better-melody-a764e21132.strapiapp.com/api/Homes?populate=*");
      const data = await res.json();
      const firstSlide = data.data[0];
      setImages(firstSlide.slideBar);
    }

    fetchImages();
  }, []);

  // Fetch Product Data
  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch("https://better-melody-a764e21132.strapiapp.com/api/products?populate=*");
      const data = await res.json();
      setProducts(data.data);
    }

    fetchProducts();
  }, []);

  if (images.length === 0) return <p>Loading...</p>;

  return (
    <>
      {/* Hero Carousel */}
      <div className="w-full h-[450px]">
        <Carousel showThumbs={false} autoPlay infiniteLoop showStatus={false}>
          {images.map((img, index) => (
            <div key={index}>
              <img
                src={`http://localhost:1337${img.formats.large.url}`}
                alt={`Slide ${index + 1}`}
                className="h-[450px] object-cover"
              />
            </div>
          ))}
        </Carousel>
      </div>

      {/* Explore Menu Header */}
      <div className="mx-50 mt-10 flex justify-between items-center">
        <h1 className="text-3xl font-semibold">Explore Menu</h1>
        <Link href="/products" className="text-orange-500">
          View All
        </Link>
      </div>

      {/* Product Carousel */}
      <div className="mx-40 mt-30">
        <Carousel
          showThumbs={false}
          showStatus={false}
          infiniteLoop
          showIndicators={false}
          centerMode={true}
          centerSlidePercentage={33.33}
        >
          {products.map((product) => (
            <div key={product.id} className="px-2">
              <div className="bg-white rounded-lg shadow p-3 text-center">
                <img
                  src={`https://better-melody-a764e21132.strapiapp.com${product.image[0]?.formats?.thumbnail?.url}`}
                  alt={product.title}
                  className="mx-auto h-40 object-cover rounded-md"
                />
                <h3 className="mt-2 text-lg font-medium">{product.title}</h3>
              </div>
            </div>
          ))}
        </Carousel>
      </div>

      {/* Blog Section */}
      <div className="mx-auto max-w-6xl px-6 py-10">
        <h2 className="text-2xl font-bold mb-6">Latest Blogs</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <Link key={blog.id} href={`/blogs/${blog.slug}`}>
              <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-40 object-cover rounded-t"
                />
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
{/* Footer - About Section */}
<footer className="bg-yellow-200 mt-20 py-10 border-t border-green-300">
  <div className="max-w-6xl mx-auto px-6">
    <h2 className="text-xl font-bold text-green-800 mb-4">About Cheezios</h2>
    <p className="text-green-700 text-sm leading-relaxed max-w-3xl">
      AgriConnect is your go-to platform for everything agriculture — from crop guidance and smart gardening 
      tips to modern tools and market insights. Whether you're a seasoned farmer or a home grower, we aim to 
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
