import "./App.css";
import React, { useState, useRef, useEffect } from "react";

function Product({ product }) {
  const [paidFor, setPaidFor] = useState(false);
  const [error, setError] = useState(null);
  const paypalRef = useRef();

  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                description: product.description,
                amount: {
                  currency_code: "USD",
                  value: product.price,
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          setPaidFor(true);
          console.log(order);
        },
        onError: (err) => {
          setError(err);
          console.error(err);
        },
      })
      .render(paypalRef.current);
  }, [product.description, product.price]);

  if (paidFor) {
    return (
      <div>
        <h1>Congrats, you just bought {product.name}!</h1>
        {/* <img alt={product.description} src={gif} /> */}
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

const Time = ({currentTime}) => {

  useEffect(() => {

  })
  return (
    <h1></h1>
  )
}
function App() {
  var [currentTime, setCurrentTime] = useState(69);
   
  fetch("/time")
      .then((res) => res.json())
      .then((data) => {
        setCurrentTime(data.time);
  })}

  const product = {
    price: 1.0,
    name: "delete",
    description: "delete this site",
    //image: chair,
  };

  return (
    <div className="App">
      <Product product={product} />
      <Time currentTime={currentTime}/>
    </div>
  );
}

export default App;
