import React, { useState } from 'react';
import ProductForm from './ProductForm';
import ProductList from './ProductList';
import SalesHistory from './SalesHistory';
import SellPopup from './SellPopup';
import TopSellingProducts from './TopSellingProducts';
import { motion } from 'framer-motion';

function SalesApp() {
    const [products, setProducts] = useState([]);
    const [sales, setSales] = useState([]);
    const [sellingProduct, setSellingProduct] = useState(null); 
console.log(sales,'salles');
 
    const addProduct = (name, price, count) => {
        const newProduct = {
            id: products.length + 1,
            name,
            price,
            count,
            inStock: count, 
            totalRevenue: 0
        };
        setProducts([...products, newProduct]);
    };


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

        const soldProduct = products.find(product => product.id === productId);
     
        if (soldProduct) {
            setSales(prevSales => [
                ...prevSales,
                { productId, quantity, name:soldProduct.name, saleDate: new Date() }
            ]);
        }

   
        setSellingProduct(null);
    };


    const openSellPopup = (productId) => {
        setSellingProduct(productId);
    };

  
    const closeSellPopup = () => {
        setSellingProduct(null);
    };

  
    const grandTotalRevenue = products.reduce((total, product) => total + product.totalRevenue, 0);

    

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                    <ProductForm addProduct={addProduct} />
                </div>
                <div className="lg:col-span-2 space-y-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="bg-gray-200 rounded-lg shadow-md p-6"
                    >
                        <ProductList products={products} openSellPopup={openSellPopup} />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="bg-white rounded-lg shadow-md p-6"
                    >
                        <SalesHistory sales={sales} />
                    </motion.div>
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mt-8 bg-white rounded-lg shadow-md p-6 w-full md:w-1/9 lg:w-1/3 ml-auto"
            >
                <div className="grid grid-cols-1 gap-4 text-center">
                    <div className='font-bold'>
                        <motion.p
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.3 }}
                            className="text-lg font-bold mb-2 bg-blue-900 rounded text-white p-2"
                        >
                            Grand Total Revenue
                        </motion.p>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                            className="text-3xl text-blue-500"
                        >
                            ${grandTotalRevenue.toFixed(2)}
                        </motion.p>
                    </div>
                </div>
            </motion.div>
            <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ duration: 0.5, delay: 0.6 }}
            >
            <TopSellingProducts sales={sales} products={products} />
            </motion.div>
           
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="mt-8 bg-white rounded-lg shadow-md p-6"
            >
                <h2 className="text-2xl font-bold mb-4 text-center text-gray-100 bg-gray-500 p-3 rounded">Products Details</h2>
                <div className="overflow-x-auto">
                    <motion.table
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.7 }}
                        className="min-w-full divide-y divide-gray-200"
                    >
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Product Name
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Price
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Stock
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
                                <motion.tr
                                    key={product.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <td className="px-6 py-4 whitespace-nowrap">{product.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">${product.price.toFixed(2)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{product.inStock}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{product.count}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {sales.filter(sale => sale.productId === product.id)
                                            .reduce((total, sale) => total + sale.quantity, 0)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">${product.totalRevenue.toFixed(2)}</td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </motion.table>
                </div>
            </motion.div>
            
          

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
        </div>
    );
}

export default SalesApp;
