import './App.css';
import React, { useState, useRef, useEffect } from 'react';

function Product({ product }) {
  const [paidFor, setPaidFor] = useState(false);
  const [error, setError] = useState(null);
  const paypalRef = useRef();

  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions) => {
          const order = actions.order.capture();
          setPaidFor(true);
          console.log(order);
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          setPaidFor(true);
          console.log(order);
        },
        onError: err => {
          setPaidFor(true);
        },
      })
      .render(paypalRef.current);
  }, [product.description, product.price]);

  if (paidFor) {
    return (
      <div>
        <h1>Congrats, you just deleted this site!</h1>
      </div>
    );
  }

  return (
    <div>
      {error && <div>Uh oh, an error occurred! {error.message}</div>}
      <h1>
        {product.description} for ${product.price}
      </h1>
      <div ref={paypalRef} />
    </div>
  );
}

function App() {
  const product = {
    price: 1.00,
    name: 'delete',
    description: 'delete this site',
  };

  return (
    <div className="App">
      <Product product={product} />
    </div>
  );
}

export default App;