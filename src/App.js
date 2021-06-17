import "antd/dist/antd.css";
import React, { useLayoutEffect } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import Checkout from "./components/Checkout";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Search from "./components/Search";
import Thanks from "./components/Thanks";
import ipConfig from "./ipConfig.json";

// export const config = {
//   endpoint: `http://${ipConfig.workspaceIp}:8082/api/v1`,
// };
export const config = {
  endpoint: `https://qkart-frontend-swapnoneel.herokuapp.com/api/v1`,
};

export default function App(props) {
  const location = useLocation();
  // Scroll to top if path changes
  useLayoutEffect(() => {
    window && window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="App">
      
      <Switch>
        <Route  path="/register" exact>
          <Register/>
        </Route>

        <Route path="/login" exact>
          <Login />
        </Route>

        <Route  path="/products" exact>
          <Search />
        </Route>

        <Route path="/checkout" exact>
          <Checkout />
        </Route>

        <Route path="/thanks" exact>
          <Thanks />
        </Route>

        
        <Route path="/" >
          <Home />
        </Route>
     
      </Switch>


    </div>
  );
}
