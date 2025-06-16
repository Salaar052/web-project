import Link from "next/link";
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export const metadata = {
  title: 'Blogs - AgriConnect',
  description: 'Read our latest articles about farming, gardening, and agricultural technology.',
};

export const revalidate = 3600; // Revalidate every hour

export default function BlogsPage() {
  const blogs = [
    {
      id: 1,
      title: "How to Grow Organic Vegetables",
      slug: "organic-vegetables",
      description: "Learn the basics of growing organic food in your backyard.",
      image: "/images/blog1.jpg",
      date: "2024-03-15",
    },
    {
      id: 2,
      title: "Top 5 Farming Tools for 2025",
      slug: "farming-tools-2025",
      description: "A quick guide to the best tools every modern farmer should use.",
      image: "/images/blog2.jpg",
      date: "2024-03-10",
    },
    {
      id: 3,
      title: "Beginner&apos;s Guide to Urban Gardening",
      slug: "urban-gardening-guide",
      description: "Start your home garden today with these easy tips.",
      image: "/images/blog3.jpg",
      date: "2024-03-05",
    },
  ];

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="text-3xl font-bold mb-8">Latest Blogs</h1>
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
                <p className="text-sm text-gray-500">{blog.date}</p>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">{blog.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
