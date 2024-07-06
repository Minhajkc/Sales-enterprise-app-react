import React from 'react';

function ProductList({ products, openSellPopup }) {
    return (
        <div>
            {products.length === 0 ? (
                <p className="text-gray-500 text-center ">No products available. Add products to see them here.</p>
            ) : (
                <ul className="mb-8 ">
                    {products.map(product => (
                        <li key={product.id} className="flex items-center justify-between p-4 border-b border-gray-300">
                            <div>
                                <span className="font-bold">{product.name}</span> - ${product.price} ({product.count} in stock)
                            </div>
                            <div>
                                <button onClick={() => openSellPopup(product.id)} className="bg-orange-500 hover:bg-orange-700 text-white py-2 px-4 rounded">Sell</button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default ProductList;
