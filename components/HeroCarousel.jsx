"use client";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function HeroCarousel({ images }) {
  if (!images?.length) return null;
  
  return (
    <Carousel 
      showThumbs={false} 
      autoPlay 
      infiniteLoop 
      showStatus={false}
      interval={5000}
      transitionTime={500}
      stopOnHover={true}
    >
      {images.map((img, index) => (
        <div key={index}>
          <img
            src={img.url}
            alt={`Slide ${index + 1}`}
            className="h-[450px] object-cover"
            loading={index === 0 ? "eager" : "lazy"}
          />
        </div>
      ))}
    </Carousel>
  );
} 