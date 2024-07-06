import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'; // Adjust the icon according to your preference

function TopSellingProducts({ sales, products }) {
    const productSales = products.map(product => {
        const totalQuantitySold = sales
            .filter(sale => sale.productId === product.id)
            .reduce((total, sale) => total + sale.quantity, 0);

        return {
            ...product,
            totalQuantitySold
        };
    });

    const sortedProducts = productSales.sort((a, b) => b.totalQuantitySold - a.totalQuantitySold);
    const topSellingProducts = sortedProducts.slice(0, 3);

    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="mt-8  rounded-lg shadow-md p-3 md:w-1/6  ">
            <button
                className="block text-center text-md font-bold text-yellow-500 flex items-center justify-center"
                onClick={toggleDropdown}
                aria-expanded={isOpen ? 'true' : 'false'}
            >
                {isOpen ? (
                    <>
                        Hide Top Selling Products{' '}
                        <FontAwesomeIcon icon={faAngleUp} className="ml-1" />
                    </>
                ) : (
                    <>
                        Most Selling Products{' '}
                        <FontAwesomeIcon icon={faAngleDown} className="ml-1" />
                    </>
                )}
            </button>
            {isOpen && (
                <table className="table-auto w-full border-collapse border border-gray-200 text-sm">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="border border-gray-200 p-2">Product Name</th>
                            <th className="border border-gray-200 p-2">Total Quantity Sold</th>
                        </tr>
                    </thead>
                    <tbody>
                        {topSellingProducts.map(product => (
                            <tr key={product.id} className="text-left">
                                <td className="border border-gray-200 p-2">{product.name}</td>
                                <td className="border border-gray-200 p-2">{product.totalQuantitySold}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default TopSellingProducts;
