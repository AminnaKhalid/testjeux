import { useState, useEffect } from "react";
import {
  ShoppingCart,
  X,
  Plus,
  Minus,
  Trash2,
  ChevronDown,
  ChevronUp,
  TicketPercent,
  ArrowRight,
  Loader2,
  CheckCircle,
  ShieldCheck,
} from "lucide-react";

function Cart({
  cart,
  subtotal,
  discount,
  total,
  discountCode,
  setDiscountCode,
  removeItem,
  updateQuantity,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [showDiscountInput, setShowDiscountInput] = useState(false);
  const [isApplyingDiscount, setIsApplyingDiscount] = useState(false);
  const [discountApplied, setDiscountApplied] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Animation for cart items
  const [removingItem, setRemovingItem] = useState(null);

  useEffect(() => {
    if (discount !== 0) {
      setDiscountApplied(true);
      const timer = setTimeout(() => setDiscountApplied(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [discount]);

  const handleRemoveItem = (id) => {
    setRemovingItem(id);
    setTimeout(() => {
      removeItem(id);
      setRemovingItem(null);
    }, 300);
  };

  const applyDiscount = () => {
    setIsApplyingDiscount(true);
    setTimeout(() => {
      setIsApplyingDiscount(false);
      setDiscountCode(discountCode);
    }, 1000);
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setCheckoutSuccess(true);
      setTimeout(() => {
        setCheckoutSuccess(false);
        setIsOpen(false);
      }, 2000);
    }, 2000);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 px-4 py-2 rounded-lg text-white transition-all duration-300 shadow-md hover:shadow-lg relative group"
      >
        <ShoppingCart className="h-5 w-5 transition-transform group-hover:scale-110" />
        <span className="hidden sm:inline">Cart</span>
        {itemCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-bounce">
            {itemCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl z-20 border border-gray-100 animate-fade-in-up">
          <div className="p-4">
            <div className="flex justify-between items-center pb-3 border-b border-gray-100">
              <h2 className="text-lg font-semibold flex items-center gap-2 text-gray-800">
                <ShoppingCart className="h-5 w-5 text-blue-600" />
                <span>Your Cart</span>
              
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-50 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {checkoutSuccess ? (
              <div className="py-8 flex flex-col items-center justify-center text-center">
                <CheckCircle className="h-12 w-12 text-green-500 mb-4 animate-checkmark" />
                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                  Order Placed!
                </h3>
                <p className="text-gray-600 mb-4">
                  Your payment was successful
                </p>
                
              </div>
            ) : cart.length === 0 ? (
              <div className="py-8 flex flex-col items-center justify-center text-gray-500">
                <ShoppingCart className="h-12 w-12 mb-3 opacity-30" />
                <p className="mb-4">Your cart is empty</p>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
                >
                  Continue shopping <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <>
                <div className="max-h-96 overflow-y-auto py-2 divide-y divide-gray-100">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className={`py-4 transition-all duration-300 ${
                        removingItem === item.id
                          ? "opacity-0 scale-95"
                          : "opacity-100 scale-100"
                      }`}
                    >
                      <div className="flex items-center">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-14 h-14 object-cover rounded-xl border border-gray-200 shadow-sm"
                        />
                        <div className="ml-3 flex-1 min-w-0">
                          <h3 className="text-sm font-medium text-gray-800 truncate">
                            {item.name}
                          </h3>
                          <p className="text-sm text-gray-600">
                            ${item.price.toFixed(2)}
                          </p>
                        
                        </div>
                        <div className="flex flex-col items-end ml-2">
                          <button
                            onClick={() => handleRemoveItem(item.id)}
                            className="text-gray-400 hover:text-red-500 p-1 rounded-full hover:bg-red-50 transition-colors mb-2"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                          <div className="flex items-center border border-gray-200 rounded-lg">
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              className="text-gray-500 hover:text-gray-700 p-1 px-2 rounded-l hover:bg-gray-100 transition-colors"
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="text-sm w-8 text-center border-x border-gray-200">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className="text-gray-500 hover:text-gray-700 p-1 px-2 rounded-r hover:bg-gray-100 transition-colors"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>

                  {discount !== 0 && (
                    <div
                      className={`flex justify-between text-sm ${
                        discountApplied ? "animate-discount-applied" : ""
                      }`}
                    >
                      <span className="text-green-600 flex items-center">
                        <TicketPercent className="h-4 w-4 mr-1" />
                        Discount ({discountCode})
                      </span>
                      <span className="text-green-600 font-medium">
                        -${Math.abs(discount).toFixed(2)}
                      </span>
                    </div>
                  )}

                  <div className="pt-2">
                    <button
                      onClick={() => setShowDiscountInput(!showDiscountInput)}
                      className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      {showDiscountInput ? (
                        <>
                          <ChevronUp className="h-4 w-4" />
                          Hide coupon code
                        </>
                      ) : (
                        <>
                          <TicketPercent className="h-4 w-4" />
                          Add coupon code
                        </>
                      )}
                    </button>

                    {showDiscountInput && (
                      <div className="flex mt-2">
                        <input
                          type="text"
                          placeholder="SAVE10 or SAVE20"
                          value={discountCode}
                          onChange={(e) => setDiscountCode(e.target.value)}
                          className="flex-1 border border-gray-300 rounded-l-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-black"
                        />
                        <button
                          onClick={applyDiscount}
                          disabled={isApplyingDiscount}
                          className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-4 py-2 rounded-r-lg text-sm transition-all flex items-center justify-center w-24"
                        >
                          {isApplyingDiscount ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            "Apply"
                          )}
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between font-bold border-t border-gray-100 pt-3 mt-2 text-gray-800">
                    <span>Total:</span>
                    <span className="text-lg">${total.toFixed(2)}</span>
                  </div>

                  <button
                    onClick={handleCheckout}
                    disabled={isCheckingOut}
                    className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white py-3 px-4 rounded-xl mt-4 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                  >
                    {isCheckingOut ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        Secure Checkout
                        <ArrowRight className="h-5 w-5" />
                      </>
                    )}
                  </button>

                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
