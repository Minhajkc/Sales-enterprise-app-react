import React, { useState } from 'react';

function SalesHistory({ sales, products }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

 

    return (
        <div className="text-center overflow-x-auto">
            <button
                className="text-s font-bold text-gray-500 rounded  "
                onClick={toggleDropdown}
                aria-expanded={isOpen ? 'true' : 'false'}
            >
                TAP TO SEE DAILY SALES
            </button>
            {isOpen && (
                <table className=" min-w-full divide-y  border border-gray-300 mt-3">
                    <thead className="bg-gray-200 ">
                        <tr>
                        <th scope="col" className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Product Name
                                </th>
                                <th scope="col" className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Product ID
                                </th>
                                <th scope="col" className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                 Quantity
                                </th>
                                <th scope="col" className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider">
                                 Sold On
                                </th>
                        </tr>
                    </thead>
                    <tbody>
                        {sales.map((sale, index) => (
                            <tr key={index} className="text-center">
                                <td className="border border-gray-300 p-2">{sale.name}</td>
                                <td className="border border-gray-300 p-2">{sale.productId}</td>
                                <td className="border border-gray-300 p-2">{sale.quantity}</td>
                                <td className="border border-gray-300 p-2">{sale.saleDate.toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default SalesHistory;
