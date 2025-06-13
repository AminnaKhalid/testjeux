import { useState } from "react";
import Cart from "./Cart";
import ProductList from "./ProductList";
import mouse from "../assets/mouse.jpg"
import monitor from "../assets/monitor.jpg"
import laptop from "../assets/laptop.jpg"
import Navbar from "../../components/Navbar";
function App() {
  const [cart, setCart] = useState([]);
  const [discountCode, setDiscountCode] = useState("");

  // Sample products data
  const products = [
    {
      id: 1,
      name: "Laptop",
      price: 1000,
      image: mouse,
    },
    {
      id: 2,
      name: "Mouse",
      price: 20,
      image: monitor,
    },
    {
      id: 3,
      name: "Keyboard",
      price: 50,
      image: laptop,
    },
    {
      id: 4,
      name: "Monitor",
      price: 200,
      image: mouse,
    },
  ];

  const addItem = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);

      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  const removeItem = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const applyDiscount = (total) => {
    const discountRates = {
      SAVE10: 0.1,
      SAVE20: 0.2,
    };

    const discountRate = discountRates[discountCode] || 0;
    return total * (1 - discountRate);
  };

  const subtotal = calculateTotal();
  const discount = applyDiscount(subtotal) - subtotal;
  const total = applyDiscount(subtotal);

  return (
    <div className="min-h-screen bg-gray-100">
    <Navbar />
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">ShopEasy</h1>
          <Cart
            cart={cart}
            subtotal={subtotal}
            discount={discount}
            total={total}
            discountCode={discountCode}
            setDiscountCode={setDiscountCode}
            removeItem={removeItem}
            updateQuantity={updateQuantity}
          />
        </div>
      </header>

      <main className="container mx-auto p-4">
        <ProductList products={products} addItem={addItem} />
      </main>
    </div>
  );
}

export default App;
