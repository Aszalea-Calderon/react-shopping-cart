//!See Read Me for details on step by steps

import React, { useState } from "react";
import { Route } from "react-router-dom";
import data from "./data";
import { ProductContext } from "./contexts/ProductContext";
import { CartContext } from "./contexts/CartContext";
import { useLocalStorage } from "./hooks/useLocalStorage";

// Components
import Navigation from "./components/Navigation";
import Products from "./components/Products";
import ShoppingCart from "./components/ShoppingCart";

function App() {
  const [products] = useState(data);
  const [cart, setCart] = useLocalStorage("cart", []);

  //?Step 1- Fill out needed functionality for the page

  // add the given item to the cart
  const addItem = (item) => {
    setCart([...cart, item]);
  };

  //Remove item from cart
  const removeItem = (itemId) => {
    console.log("itemId", itemId);
    setCart([
      ...cart.filter((item) => {
        return itemId !== item.id;
      }),
    ]);
  };

  //?Step 3- Wrap and pass the ProductContext giving the values needed in the application, any values passed to the app via props
  return (
    <ProductContext.Provider value={{ addItem, products }}>
      <CartContext.Provider value={{ cart, removeItem }}>
        <div className="App">
          <Navigation />

          {/* Routes */}
          <Route exact path="/">
            <Products />
          </Route>

          <Route path="/cart">
            <ShoppingCart />
          </Route>
        </div>
      </CartContext.Provider>
    </ProductContext.Provider>
  );
}

export default App;
