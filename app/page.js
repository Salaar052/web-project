"use client";

import { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Link from "next/link";
import { Card } from "@/components/ui/card";

export default function Home() {
  const [images, setImages] = useState([]);
  const [products, setProducts] = useState([]);

  // Fetch Hero Images
  useEffect(() => {
    async function fetchImages() {
      const res = await fetch("http://localhost:1337/api/Homes?populate=*");
      const data = await res.json();
      const firstSlide = data.data[0];
      setImages(firstSlide.slideBar);
    }

    fetchImages();
  }, []);

  // Fetch Product Data
  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch("http://localhost:1337/api/products?populate=*"); // temporary API
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
        <Carousel
          showThumbs={false}
          autoPlay
          infiniteLoop
          showStatus={false}
        >
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

      {/* ✅ Product Carousel with Arrows */}
      <div className="mx-40 mt-30">
        <Carousel 
          showThumbs={false}
          showStatus={false}
          infiniteLoop
          showIndicators={false}
          centerMode={true}
          centerSlidePercentage={33.33} // show 3 at a time
        >
          {products.map((product) => (
            <div key={product.id} className="px-2">
              <div className="bg-white rounded-lg shadow p-3 text-center">
                <img
                  src={`http://localhost:1337${product.image[0]?.formats?.thumbnail?.url}`}
                  alt={product.title}
                  className="mx-auto h-40 object-cover rounded-md"
                />
                <h3 className="mt-2 text-lg font-medium">{product.title}</h3>
              </div>
            </div>
          ))}
        </Carousel>
      </div>

      <div>
        <Card>

        </Card>
        blogs
      </div>
    </>
  );
}
