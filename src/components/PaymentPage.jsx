import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from './CartContext';
import img1 from "./../../src/qrcode.jpg";

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { getTotalPrice } = useCart();
  const totalAmount = getTotalPrice();
  const [contact, setContact] = useState('');
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('card');

  const handleProceed = () => {
    setStep(2);
  };

  const handlePayment = async () => {
    setStep(3);
  };
  const confirmPayment = async () => {
    try {
      const orderResponse = await axios.post(
        "https://e-commerce-backend-c3qy.onrender.com/api/payments/create-order",
        {
          amount: totalAmount,
          currency: "INR",
          receipt: "receipt#1",
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const { id: order_id, amount: order_amount, currency } = orderResponse.data;

      const options = {
        key: 'your_razorpay_key_id',
        amount: order_amount,
        currency,
        name: 'Veggie Vault',
        description: 'Test Transaction',
        order_id,
        handler: async (response) => {
          const paymentResponse = await axios.post(
            "https://e-commerce-backend-c3qy.onrender.com/api/payments/verify-payment",
            {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );

          alert(paymentResponse.data.message);
        },
        prefill: {
          contact,
        },
        theme: {
          color: '#3399cc',
        },
        method: paymentMethod,
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error('Payment error', error);
    }
  };

  const handleConfirmPayment = () => {
    confirmPayment();
    navigate('/Home', { state: { message: 'Order placed' } });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-green-600">Veggie Vault</h1>
        {step === 1 ? (
          <>
            <div className="mt-4 text-center">
              <span className="text-xl font-semibold">Total Amount:</span>
              <span className="text-2xl font-bold text-gray-900"> ₹{totalAmount.toFixed(2)}</span>
            </div>
            <div className="mt-8 space-y-6">
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="contact" className="sr-only">Contact</label>
                  <input
                    id="contact"
                    name="contact"
                    type="text"
                    required
                    className="relative block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Enter Contact Details"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <button
                  onClick={handleProceed}
                  className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Proceed
                </button>
              </div>
            </div>
          </>
        ) : step === 2 ? (
          <>
            <div className="mt-4 text-center">
              <span className="text-xl font-semibold">Choose Payment Method</span>
            </div>
            <div className="mt-8 space-y-6">
              <div className="rounded-md shadow-sm -space-y-px">
                <div
                  className={`flex items-center p-4 border rounded-md cursor-pointer ${paymentMethod === 'card' ? 'border-indigo-600 bg-indigo-50' : 'border-gray-300'}`}
                  onClick={() => setPaymentMethod('card')}
                >
                  <span className="ml-3 block text-sm font-medium text-gray-700">
                    Credit/Debit Card
                  </span>
                </div>
                <div
                  className={`flex items-center p-4 border rounded-md cursor-pointer ${paymentMethod === 'upi' ? 'border-indigo-600 bg-indigo-50' : 'border-gray-300'}`}
                  onClick={() => setPaymentMethod('upi')}
                >
                  <span className="ml-3 block text-sm font-medium text-gray-700">
                    UPI/QR
                  </span>
                </div>
                <div
                  className={`flex items-center p-4 border rounded-md cursor-pointer ${paymentMethod === 'netbanking' ? 'border-indigo-600 bg-indigo-50' : 'border-gray-300'}`}
                  onClick={() => setPaymentMethod('netbanking')}
                >
                  <span className="ml-3 block text-sm font-medium text-gray-700">
                    Net Banking
                  </span>
                </div>
                <div
                  className={`flex items-center p-4 border rounded-md cursor-pointer ${paymentMethod === 'wallet' ? 'border-indigo-600 bg-indigo-50' : 'border-gray-300'}`}
                  onClick={() => setPaymentMethod('wallet')}
                >
                  <span className="ml-3 block text-sm font-medium text-gray-700">
                    Wallet
                  </span>
                </div>
                <div
                  className={`flex items-center p-4 border rounded-md cursor-pointer ${paymentMethod === 'emi' ? 'border-indigo-600 bg-indigo-50' : 'border-gray-300'}`}
                  onClick={() => setPaymentMethod('emi')}
                >
                  <span className="ml-3 block text-sm font-medium text-gray-700">
                    EMI
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-center mt-8">
                <span className="text-xl font-semibold">Total:</span>
                <span className="text-2xl font-bold text-gray-900"> ₹{totalAmount.toFixed(2)}</span>
              </div>
              <div>
                <button
                  onClick={handlePayment}
                  className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Pay Now
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="mt-4 text-center">
              <span className="text-xl font-semibold">Confirm Payment Method</span>
            </div>
            <div className="mt-8 space-y-6">
              <div className="rounded-md shadow-sm">
                <img src={img1} alt="Payment Methods" className="w-full h-auto" />
              </div>
              <div className="flex justify-between items-center mt-8">
                <span className="text-xl font-semibold">Total:</span>
                <span className="text-2xl font-bold text-gray-900"> ₹{totalAmount.toFixed(2)}</span>
              </div>
              <div>
                <button
                  onClick={handleConfirmPayment}
                  className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Confirm Payment
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentPage;