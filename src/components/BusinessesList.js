import React, { useState, useEffect } from "react";
import BusinessDataService from "../services/BusinessService";
import { Link } from "react-router-dom";

const BusinessesList = () => {
  const [businesses, setBusinesses] = useState([]);
  const [currentBusiness, setCurrentBusiness] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");

  useEffect(() => {
    retrieveBusinesses();
  }, []);

  const onChangeSearchTitle = e => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const retrieveBusinesses = () => {
    BusinessDataService.getAll()
      .then(response => {
        setBusinesses(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveBusinesses();
    setCurrentBusiness(null);
    setCurrentIndex(-1);
  };

  const setActiveBusiness = (business, index) => {
    setCurrentBusiness(business);
    setCurrentIndex(index);
  };

  const removeAllBusinesses = () => {
    BusinessDataService.removeAll()
      .then(response => {
        console.log(response.data);
        refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByTitle = () => {
    BusinessDataService.findByTitle(searchTitle)
      .then(response => {
        setBusinesses(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title"
            value={searchTitle}
            onChange={onChangeSearchTitle}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByTitle}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Businesses List</h4>

        <ul className="list-group">
          {businesses &&
            businesses.map((business, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveBusiness(business, index)}
                key={index}
              >
                {business.title}
              </li>
            ))}
        </ul>

        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllBusinesses}
        >
          Remove All
        </button>
      </div>
      <div className="col-md-6">
        {currentBusiness ? (
          <div>
            <h4>Business</h4>
            <div>
              <label>
                <strong>Title:</strong>
              </label>{" "}
              {currentBusiness.title}
            </div>
            <div>
              <label>
                <strong>Description:</strong>
              </label>{" "}
              {currentBusiness.description}
            </div>
            <div>
              <label>
                <strong>Status:</strong>
              </label>{" "}
              {currentBusiness.published ? "Published" : "Pending"}
            </div>

            <Link
              to={"/businesses/" + currentBusiness.id}
              className="badge badge-warning"
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Business...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BusinessesList;
