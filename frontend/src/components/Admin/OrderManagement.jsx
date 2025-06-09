const OrderManagement = () => {
    const orders = [
        {
            _id: 12312321,
            user: {
                name: "John Doe",
            },
            totalPrice: 110,
            status: "Processing",
        },
    ];

    const handleStatusChange = (orderId, status) => {
        console.log({ id: orderId, status })
    }

    return (
        <div className="max-w-7xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Order Management</h2>
            <div className="overflow-x-auto bg-white shadow border border-gray-200 rounded-lg">
                <table className="min-w-full text-sm text-left text-gray-700">
                    <thead className="bg-gray-100 text-xs uppercase">
                        <tr>
                            <th className="py-3 px-4">Order ID</th>
                            <th className="py-3 px-4">Customer</th>
                            <th className="py-3 px-4">Total Price</th>
                            <th className="py-3 px-4">Status</th>
                            <th className="py-3 px-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length > 0 ? (
                            orders.map((order) => (
                                <tr key={order._id} className="border-t hover:bg-gray-50">
                                    <td className="py-4 px-4 font-medium text-gray-900 whitespace-nowrap">
                                        #{order._id}
                                    </td>
                                    <td className="p-4">{order.user.name}</td>
                                    <td className="p-4">${order.totalPrice}</td>
                                    <td className="p-4">
                                        <select
                                            value={order.status}
                                            onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                            className="border border-gray-300 text-sm rounded-md p-2 w-full"
                                        >
                                            <option value="Processing">Processing</option>
                                            <option value="Shipped">Shipped</option>
                                            <option value="Delivered">Delivered</option>
                                            <option value="Cancelled">Cancelled</option>
                                        </select>
                                    </td>
                                    <td className="p-4">
                                        <button
                                            onClick={() => handleStatusChange(order._id, "Delivered")}
                                            className="bg-green-500 text-white text-sm px-3 py-1.5 rounded cursor-pointer transition-all duration-150 hover:bg-green-600"
                                        >
                                            Mark as Delivered
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="p-4 text-center text-gray-500">
                                    No Orders found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrderManagement;
