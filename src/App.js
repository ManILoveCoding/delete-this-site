import "./App.css";
import React, { useState, useRef, useEffect } from "react";
import checkIfDeleted from "./Components/MyStartingComponent";

function Product({ product }) {
  const [paidFor, setPaidFor] = useState(false);
  const paypalRef = useRef();

  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions) => {
          setPaidFor(true);
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          setPaidFor(true);
          console.log(order);
        },
        onError: (err) => {
          setPaidFor(true);
        },
      })
      .render(paypalRef.current);
  }, [product.description, product.price]);

  if (paidFor) {
    checkIfDeleted();
    return (
      <>
        <div>
          <h4>nice, you just deleted this site</h4>
          <p>You will be automatically billed</p>
        </div>
        <div>
          <h1>RUNNING rm -rf ./* </h1> <img src="loading.gif" alt="load" />
        </div>
      </>
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

const product = {
  price: 1.0,
  name: "deletion",
  description: "delete this site",
};

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isDeleted: false,
      hasCheckedAsyncStorage: false,
    };
  }

  async componentWillMount() {
    const isDeleted = await checkIfDeleted();
    this.setState({ isDeleted, hasCheckedAsyncStorage: true });
  }

  render() {
    const { hasCheckedAsyncStorage, isDeleted } = this.state;

    if (!hasCheckedAsyncStorage) {
      return (
        <div>
          <p>thinking</p>
        </div>
      );
    }
    //asyncstorage does not work at all like i think it should so just pretend it returns blank after the second time
    return isDeleted ? (
      <div></div>
    ) : (
      <div className="App">
        <Product product={product} />
      </div>
    );
  }
}
