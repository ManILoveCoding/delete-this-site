import "./App.css";
import React, { useState, useRef, useEffect } from "react";
import checkIfDeleted from "./Components/MyStartingComponent";
import axios from "axios";
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

    axios.get(`/api/die`).then((response) => {
      console.log(response);
    });

    return (
      <div>
        <h1>Congrats, you just deleted this site!</h1>
        <p>You will be automatically billed</p>
        <h1> running rm -rf ./* </h1>
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
      <div className="App">
        <Product product={product} />
      </div>
    ) : (
      <div></div>
    );
  }
}
