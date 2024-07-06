import React from 'react';

function SellPopup({ productId, productName, productCount, sellProduct, closeSellPopup }) {
    const [sellQuantity, setSellQuantity] = React.useState(1);

    const handleSell = () => {
        if (!sellQuantity || isNaN(sellQuantity) || sellQuantity < 1 || sellQuantity > productCount) {
            console.error('Invalid quantity to sell:', sellQuantity);
            alert('Invalid quantity to sell')
            return;
        }

        sellProduct(productId, sellQuantity);
        closeSellPopup();
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center">
            <div className="bg-gray-200 p-6 rounded shadow-lg">
                <h2 className="text-lg font-bold mb-4">Sell Quantity - {productName}</h2>
                <input
                    type="number"
                    min="1"
                    max={productCount}
                    placeholder="Quantity"
                    className="p-2 mb-4 border border-gray-300 rounded"
                    value={sellQuantity}
                    onChange={(e) => setSellQuantity(Number(e.target.value))}
                />
                <div className="flex justify-end">
                    <button onClick={closeSellPopup} className="text-gray-500 hover:text-gray-700 mr-4">Cancel</button>
                    <button onClick={handleSell} className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">Sell</button>
                </div>
            </div>
        </div>
    );
}

export default SellPopup;
