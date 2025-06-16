import ProductDetailClient from "@/components/ProductDetailClient";
import { notFound } from "next/navigation";

export const revalidate = 3600; // Revalidate every hour

// Generate static params for all product pages
export async function generateStaticParams() {
  try {
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
    return data.data.map((product) => ({
      slug: product.slug,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export async function generateMetadata({ params }) {
  const slug = params.slug;
  
  try {
    const res = await fetch(
      `https://better-melody-a764e21132.strapiapp.com/api/products?filters[slug][$eq]=${slug}&populate=*`,
      { 
        next: { revalidate: 3600 },
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!res.ok) {
      throw new Error('Failed to fetch product');
    }

    const data = await res.json();
    const product = data.data[0];

    if (!product) {
      return {
        title: 'Product Not Found',
        description: 'The requested product could not be found.',
      };
    }

    return {
      title: `${product.title} - AgriConnect`,
      description: product.desription || 'View product details on AgriConnect.',
    };
  } catch (error) {
    return {
      title: 'Product Details - AgriConnect',
      description: 'View product details on AgriConnect.',
    };
  }
}

export default async function ProductDetail({ params }) {
  const slug = params.slug;
  
  try {
    const res = await fetch(
      `https://better-melody-a764e21132.strapiapp.com/api/products?filters[slug][$eq]=${slug}&populate=*`,
      { 
        next: { revalidate: 3600 },
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!res.ok) {
      throw new Error('Failed to fetch product');
    }

    const data = await res.json();
    const product = data.data[0];

    if (!product) {
      notFound();
    }

    // Use the complete URL from Strapi directly
    const imageUrl = product.image?.[0]?.url || "/placeholder.png";

    return (
      <ProductDetailClient
        title={product.title}
        desription={product.desription}
        price={product.price}
        imageUrl={imageUrl}
      />
    );
  } catch (error) {
    console.error('Error fetching product:', error);
    notFound();
  }
}
