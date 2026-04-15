import React, { useEffect, useState } from "react";
import useProductStore from "../store/product.js";

const ProductModal = ({ open, onClose, product }) => {
  const { updateProduct } = useProductStore();

  const [form, setForm] = useState({
    name: "",
    price: "",
    image: null,
  });

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name,
        price: product.price,
        image: null,
      });
    }
  }, [product]);

  if (!open) return null;

 const handleSubmit = async (e) => {
  e.preventDefault();

  const data = new FormData();
  data.append("name", form.name);
  data.append("price", form.price);

  if (form.image) {
    data.append("image", form.image);
  }

  const res = await updateProduct(product._id, {
    name: form.name,
    price: form.price,
    image: form.image,
  });

  if (res.success) {
    onClose();
  } else {
    alert(res.message);
  }
};

 return (
  <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
    <div className="bg-white w-full max-w-2xl mx-4 rounded-xl shadow-xl p-8">
      
      <h2 className="text-4xl font-bold text-blue-600 mb-6">
        Edit Product
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* NAME */}
        <input
          type="text"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
          placeholder="Product Name"
          className="w-full p-4 border-2 border-blue-500 rounded-xl bg-white text-black shadow-lg"
        />

        {/* PRICE */}
        <input
          type="number"
          value={form.price}
          onChange={(e) =>
            setForm({ ...form, price: e.target.value })
          }
          placeholder="Price (e.g. 99.99)"
          step="0.01"
          className="w-full p-4 border-2 border-blue-500 rounded-xl bg-white text-black shadow-lg"
        />

        {/* IMAGE */}
        <input
          type="file"
          onChange={(e) =>
            setForm({ ...form, image: e.target.files?.[0] })
          }
          accept="image/*"
          className="w-full p-4 border-2 border-blue-500 rounded-xl bg-white text-black file:mr-6 file:py-3 file:px-6 file:rounded-xl file:border-0 file:bg-blue-500 file:text-white file:font-bold hover:file:bg-blue-600 shadow-lg"
        />

        {/* BUTTONS */}
        <div className="flex gap-4">
          <button
            type="submit"
            className="w-full p-4 bg-blue-600 text-white text-lg font-bold rounded-xl hover:bg-blue-700 shadow-xl"
          >
            Save Changes
          </button>

          <button
            type="button"
            onClick={onClose}
            className="w-full p-4 bg-gray-300 text-black text-lg font-bold rounded-xl hover:bg-gray-400 shadow-xl"
          >
            Cancel
          </button>
        </div>

      </form>
    </div>
  </div>
);
};

export default ProductModal;