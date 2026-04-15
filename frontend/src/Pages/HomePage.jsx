import React, { useEffect, useState } from "react";
import useProductStore from "../store/product";
import { Trash2, Pencil } from "lucide-react";
import ProductModal from "../components/Productmodal.jsx";

const HomePage = () => {
  const { products, fetchProducts, deleteProduct } = useProductStore();

  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Products</h1>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition"
          >
            <img
              src={`http://localhost:3000/uploads/${product.image}`}
              className="w-full h-40 object-cover rounded-lg"
            />

            <h2 className="text-lg font-semibold mt-3">{product.name}</h2>
            <p className="text-gray-600">₦{product.price}</p>

            {/* ACTIONS */}
            <div className="flex justify-between mt-4">
              <button
                onClick={() => handleEdit(product)}
                className="text-blue-600"
              >
                <Pencil size={20} />
              </button>

              <button
                onClick={() => deleteProduct(product._id)}
                className="text-red-600"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      <ProductModal
        open={open}
        onClose={handleClose}
        product={selectedProduct}
      />
    </div>
  );
};

export default HomePage;