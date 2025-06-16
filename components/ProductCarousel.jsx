"use client";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function ProductCarousel({ products }) {
  if (!products?.length) return null;

  return (
    <Carousel
      showThumbs={false}
      showStatus={false}
      infiniteLoop
      showIndicators={false}
      centerMode={true}
      centerSlidePercentage={33.33}
      interval={4000}
      transitionTime={400}
      stopOnHover={true}
    >
      {products.map((product) => (
        <div key={product.id} className="px-2">
          <div className="bg-white rounded-lg shadow p-3 text-center">
            <img
              src={product.image?.[0]?.url}
              alt={product.title}
              className="mx-auto h-40 object-cover rounded-md"
              loading="lazy"
            />
            <h3 className="mt-2 text-lg font-medium">{product.title}</h3>
          </div>
        </div>
      ))}
    </Carousel>
  );
} 