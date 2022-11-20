import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddBusiness from "./components/add-business.component";
import Business from "./components/business.component";
import BusinessesList from "./components/businesses-list.component";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/businesses"} className="navbar-brand">
            bezKoder
          </Link>
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
          <Routes>
            <Route path="/" element={<BusinessesList/>} />
            <Route path="/businesses" element={<BusinessesList/>} />
            <Route path="/add" element={<AddBusiness/>} />
            <Route path="/businesses/:id" element={<Business/>} />
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;
