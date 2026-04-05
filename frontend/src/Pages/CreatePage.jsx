import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreatePage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');


  const {createProduct} = useProductStore();

  const handleSubmit = async () => {
  const { sucdess, message } = await createProduct(newProduct);
  console.log("success", sucdess);
  console.log("message", message);

  };

  return (
    <div className="min-h-screen bg-gray-50  pt-32 pb-12 px-4 sm:px-6 lg:px-8">
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6 bg-white p-8 rounded-xl shadow-xl">
        
        {/* Title Label */}
       <h1 className="text-4xl font-bold text-blue-600 dark:text-blue-400 inline-block px-6 py-3 pl-5 rounded-lg ">
  Create New Product
</h1>

        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-4 border-2 border-blue-500 rounded-xl bg-white text-black focus:outline-none focus:ring-4 focus:ring-blue-100 dark:bg-white dark:text-black shadow-lg"
          required
        />
        <input
          type="number"
          placeholder="Price (e.g., 99.99)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full p-4 border-2 border-blue-500 rounded-xl bg-white text-black focus:outline-none focus:ring-4 focus:ring-blue-100 dark:bg-white dark:text-black shadow-lg"
          required
          step="0.01"
        />
        <input
          type="file"
          onChange={(e) => setImage(e.target.files?.[0]?.name || '')}
          className="w-full p-4 border-2 border-blue-500 rounded-xl bg-white text-black file:mr-6 file:py-3 file:px-6 file:rounded-xl file:border-0 file:bg-blue-500 file:text-white file:font-bold hover:file:bg-blue-600 cursor-pointer shadow-lg"
          required
        />
        <button
          type="submit"
          className="w-full p-4 bg-blue-600 text-white text-lg font-bold rounded-xl hover:bg-blue-700 shadow-xl transition-all duration-200"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default CreatePage;