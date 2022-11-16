import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddBusiness from "./components/AddBusiness";
import Business from "./components/Business";
import BusinessesList from "./components/BusinessesList";

function App() {
  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/businesses" className="navbar-brand">
            Repn
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/businesses"} className="nav-link">
                Businesses
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/businesses"]} component={BusinessesList} />
            <Route exact path="/add" component={AddBusiness} />
            <Route path="/businesses/:id" component={Business} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
