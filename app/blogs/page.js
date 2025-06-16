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

export default function BlogSection() {
  return (
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
    </div>
  );
}
