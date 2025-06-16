import { Button } from "@/components/ui/button";

export default function ProductModal({ product, onClose }) {
  const { title, desription, price, image } = product;
  const imageUrl = `http://localhost:1337${image?.[0]?.url || "/placeholder.png"}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg relative">
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-black text-2xl font-bold"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-60 object-cover rounded mb-4"
        />
        <p className="text-gray-700 mb-2">{desription}</p>
        <p className="text-xl font-semibold text-green-600 mb-4">Rs {price}</p>

        {/* 👇 Size Variation */}
        <div className="mb-4">
          <label className="font-semibold mb-1 block">Size:</label>
          <div className="flex gap-3">
            {["Small", "Medium", "Large"].map((size) => (
              <Button key={size} variant="outline">
                {size}
              </Button>
            ))}
          </div>
        </div>

        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white mt-4">
          Add to Cart
        </Button>
      </div>
    </div>
  );
}
