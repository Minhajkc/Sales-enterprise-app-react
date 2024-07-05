import React, { useState } from 'react';
import ProductForm from './ProductForm';
import ProductList from './ProductList';
import SalesHistory from './SalesHistory';
import SellPopup from './SellPopup';

function SalesApp() {
    const [products, setProducts] = useState([]);
    const [sales, setSales] = useState([]);
    const [sellingProduct, setSellingProduct] = useState(null); // State to track the product being sold

    // Function to add a new product
    const addProduct = (name, price, count) => {
        const newProduct = {
            id: products.length + 1,
            name,
            price,
            count,
            inStock: count, // Initial count is set as inStock when adding the product
            totalRevenue: 0
        };
        setProducts([...products, newProduct]);
    };

    // Function to sell a product
    const sellProduct = (productId, quantity, price) => {
        setProducts(prevProducts => {
            return prevProducts.map(product => {
                if (product.id === productId && product.count >= quantity) {
                    const newCount = product.count - quantity;
                    const revenue = product.totalRevenue + quantity * product.price;
                    return { ...product, count: newCount, totalRevenue: revenue };
                }
                return product;
            });
        });

        // Record the sale in sales history
        const soldProduct = products.find(product => product.id === productId);
        if (soldProduct) {
            setSales(prevSales => [
                ...prevSales,
                { productId, quantity, price, saleDate: new Date() }
            ]);
        }

        // Close the sell popup
        setSellingProduct(null);
    };

    // Function to open the sell popup
    const openSellPopup = (productId) => {
        setSellingProduct(productId);
    };

    // Function to close the sell popup
    const closeSellPopup = () => {
        setSellingProduct(null);
    };

  
    const grandTotalRevenue = products.reduce((total, product) => total + product.totalRevenue, 0);

    

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Product Form Component */}
                <div className="lg:col-span-1">
                    <ProductForm addProduct={addProduct} />
                </div>

                {/* Product List and Sales History */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-yellow-200 rounded-lg shadow-md p-6 ">
                        <ProductList products={products} openSellPopup={openSellPopup} />
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <SalesHistory sales={sales} />
                    </div>
                </div>
            </div>

            {/* Sell Popup Component */}
            {sellingProduct !== null && (
                <SellPopup
                    productId={sellingProduct}
                    productName={products.find(p => p.id === sellingProduct)?.name}
                    productCount={products.find(p => p.id === sellingProduct)?.count}
                    productPrice={products.find(p => p.id === sellingProduct)?.price}
                    sellProduct={sellProduct}
                    closeSellPopup={closeSellPopup}
                />
            )}

            {/* Summary Section */}
            <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <p className="text-lg font-bold mb-2">Grand Total Revenue</p>
                        <p className="text-3xl text-blue-500">${grandTotalRevenue.toFixed(2)}</p>
                    </div>
                   
                </div>
            </div>

            {/* Product Details Section */}
            <div className="mt-8 bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-4">Product Details</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Product Name
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Price
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Initial Count
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    In Stock
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Sold Quantity
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Total Revenue
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {products.map(product => (
                                <tr key={product.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">{product.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">${product.price.toFixed(2)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{product.count}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{product.inStock}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {sales.filter(sale => sale.productId === product.id)
                                            .reduce((total, sale) => total + sale.quantity, 0)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">${product.totalRevenue.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default SalesApp;
