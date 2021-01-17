import './App.css';
import React, { useState, useRef, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getData = async () => {
  try{
    const value = await AsyncStorage.getItem('@myApp')
    if(value!=null) {
      return true;
    }
  } catch (e) {
    console.log(e);
  }
}

const storeData = async (value) => {
  try {
    await AsyncStorage.setItem('@myApp', value);
  } catch (e) {
    console.log(e);
  }
}

function Product({ product }) {
  const [paidFor, setPaidFor] = useState(false);
  const paypalRef = useRef();

  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions) => {
          //const order = actions.order.capture();
          setPaidFor(true);
          //console.log(order);
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
    storeData('deleted')
    console.log(getData())
    return (
      <div>
        <h1>Congrats, you just deleted this site!</h1>
        <p>You will be automatically billed</p>
      </div>
    );
  }

  return (
    <div>
      <h1>
        {product.description} for just ${product.price}
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