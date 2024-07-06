import React, { useState } from 'react';

function ProductForm({ addProduct }) {
    const [isVisible, setIsVisible] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const { name, price, count } = e.target.elements;
        addProduct(name.value, Number(price.value), Number(count.value));
        e.target.reset(); // Reset form after submission
        setIsVisible(false); // Hide the form after adding the product
    };

    const toggleFormVisibility = () => {
        setIsVisible(!isVisible);
    };

    return (
        <div>
           <button
    onClick={toggleFormVisibility}
    className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded mb-4  text-center lg:text-left lg:inline-block"
>
    {isVisible ? 'Hide Form' : 'Add Product'}
</button>

            {isVisible && (
                <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-auto overflow-y-auto outline-none focus:outline-none">
                    <div className="relative w-auto max-w-lg mx-auto my-6">
                  
                        <div className="bg-white rounded-lg shadow-lg p-10 bg-gray-300">
                            <h2 className="text-xl font-bold mb-4">Add Product</h2>
                            <form onSubmit={handleSubmit} className="mb-4  ">
                                <label className="block mb-2">
                                    Product Name:
                                    <input type="text" name="name" placeholder="Product Name" required className="p-2 mt-1 block w-full border border-gray-300 rounded" />
                                </label>
                                <label className="block mb-2">
                                    Price:
                                    <input type="number" name="price" placeholder="Price" min="0" step="0.01" required className="p-2 mt-1 block w-full border border-gray-300 rounded" />
                                </label>
                                <label className="block mb-2">
                                    Initial Count:
                                    <input type="number" name="count" placeholder="Initial Count" min="0" required className="p-2 mt-1 block w-full border border-gray-300 rounded" />
                                </label>
                                <div className="flex justify-center mt-5">
                                    <button type="submit" className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded">Add Product</button>
                                </div>
                            </form>
                            <button
                                onClick={toggleFormVisibility}
                                className="absolute top-0 right-0 mt-5 mr-5 bg-transparent text-gray-500 hover:text-gray-700 text-lg leading-none outline-none focus:outline-none"
                            >
                                <span className="sr-only">Close</span>
                                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M18.707 1.293a1 1 0 0 1 0 1.414L11.414 10l7.293 7.293a1 1 0 1 1-1.414 1.414L10 11.414l-7.293 7.293a1 1 0 1 1-1.414-1.414L8.586 10 .293 2.707a1 1 0 0 1 1.414-1.414L10 8.586l7.293-7.293a1 1 0 0 1 1.414 0z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProductForm;
