import React, { Component } from "react";
import BusinessDataService from "../services/business.service";
import { Link } from "react-router-dom";

export default class BusinessesList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveBusinesses = this.retrieveBusinesses.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveBusiness = this.setActiveBusiness.bind(this);
    this.removeAllBusinesses = this.removeAllBusinesses.bind(this);
    this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      businesses: [],
      currentBusiness: null,
      currentIndex: -1,
      searchTitle: ""
    };
  }

  componentDidMount() {
    this.retrieveBusinesses();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

  retrieveBusinesses() {
    BusinessDataService.getAll()
      .then(response => {
        this.setState({
          businesses: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveBusinesses();
    this.setState({
      currentBusiness: null,
      currentIndex: -1
    });
  }

  setActiveBusiness(business, index) {
    this.setState({
      currentBusiness: business,
      currentIndex: index
    });
  }

  removeAllBusinesses() {
    BusinessDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchTitle() {
    this.setState({
      currentBusiness: null,
      currentIndex: -1
    });

    BusinessDataService.findByTitle(this.state.searchTitle)
      .then(response => {
        this.setState({
          businesses: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchTitle, businesses, currentBusiness, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchTitle}
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
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveBusiness(business, index)}
                  key={index}
                >
                  {business.title}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllBusinesses}
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
  }
}
