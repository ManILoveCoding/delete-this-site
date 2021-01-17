<<<<<<< HEAD
import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  var [currentTime, setCurrentTime] = useState(0);

  const getCurrentTime = () => {
    fetch("/time")
      .then((res) => res.json())
      .then((data) => {
        setCurrentTime(data.time);
      });
  };
  getCurrentTime();

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentTime(currentTime + 1);
    }, 1000);
  }, [currentTime]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <p>This app has been running for {currentTime}</p>
      </header>
=======
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
          return actions.order.create({
            purchase_units: [
              {
                description: product.description,
                amount: {
                  currency_code: 'USD',
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
        onError: err => {
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

function App() {
  const product = {
    price: 1.00,
    name: 'delete',
    description: 'delete this site',
    //image: chair,
  };

  return (
    <div className="App">
      <Product product={product} />
>>>>>>> a3449d7131be6a24ac3e68be351142a85355577d
    </div>
  );
}

export default App;