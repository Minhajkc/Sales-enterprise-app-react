import React, { useState } from 'react';

function SalesHistory({ sales }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <button
                className="text-xl font-bold mb-4 text-green-400"
                onClick={toggleDropdown}
                aria-expanded={isOpen ? 'true' : 'false'}

            >
             TAP TO SEE DAILY SALES
            </button>
            {isOpen && (
                <ul className="mb-4">
                    {sales.map((sale, index) => (
                        <li key={index} className="mb-2">
                            Product ID: {sale.productId}, Quantity: {sale.quantity}, Sold on: {sale.saleDate.toLocaleDateString()}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default SalesHistory;
