import { create } from "zustand";

const useProductStore = create((set, get) => ({
  products: [],

  setProducts: (products) => set({ products }),

  /* ================= CREATE ================= */
  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      return { success: false, message: "All fields required" };
    }

    const formData = new FormData();
    formData.append("name", newProduct.name);
    formData.append("price", newProduct.price);
    formData.append("image", newProduct.image);

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok && data.success) {
        set((state) => ({
          products: [...state.products, data.data],
        }));
        return { success: true, message: "Product created!" };
      }

      return { success: false, message: data.message };
    } catch (error) {
      return { success: false, message: "Network error" };
    }
  },

  /* ================= FETCH ================= */
  fetchProducts: async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();

      if (res.ok && data.success) {
        set({ products: data.data });
      }
    } catch (error) {
      console.error(error);
    }
  },

  /* ================= DELETE ================= */
  deleteProduct: async (id) => {
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (res.ok && data.success) {
        set((state) => ({
          products: state.products.filter((p) => p._id !== id),
        }));
      }

      return data;
    } catch (error) {
      return { success: false };
    }
  },

  /* ================= GET BY ID ================= */
  getProductById: (id) => {
    return get().products.find((p) => p._id === id) || null;
  },

  /* ================= UPDATE ================= */
  updateProduct: async (id, updatedProduct) => {
    const formData = new FormData();

    if (updatedProduct.name)
      formData.append("name", updatedProduct.name);

    if (updatedProduct.price)
      formData.append("price", updatedProduct.price);

    // image is OPTIONAL in edit
    if (updatedProduct.image) {
      formData.append("image", updatedProduct.image);
    }

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "PUT",
        body: formData,
      });

      const data = await res.json();

      if (res.ok && data.success) {
        set((state) => ({
          products: state.products.map((p) =>
            p._id === id ? data.data : p
          ),
        }));

        return { success: true, message: "Updated!" };
      }

      return { success: false, message: data.message };
    } catch (error) {
      return { success: false, message: "Network error" };
    }
  },
}));

export default useProductStore;