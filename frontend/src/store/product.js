import create from 'zustand';

const useProductStore = create((set) => ({}));

products:[]
setProducts: (products) => set({ products }),

create = async (newProduct) => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
        return { success: false, message: 'All fields are required.' };
    }
    const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct),
    });
    const data = await res.json();
    set((state) => ({ products: [...state.products, data.data] }));
    return { success: true, message: 'Product created successfully.' };
    // Simulate an API call to create the product

};

export default useProductStore;