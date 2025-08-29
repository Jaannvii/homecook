const Cart = () => {
  const cartItems = []; // Later fetch from Context / API

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-green-600 mb-6">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between items-center border-b py-3">
              <p>{item.name}</p>
              <p>₹{item.price}</p>
            </div>
          ))}
          <button className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg">
            Proceed to Payment
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
