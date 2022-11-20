import React, { Component } from "react";
import BusinessDataService from "../services/business.service";
import { withRouter } from '../common/with-router';

class Business extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getBusiness = this.getBusiness.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateBusiness = this.updateBusiness.bind(this);
    this.deleteBusiness = this.deleteBusiness.bind(this);

    this.state = {
      currentBusiness: {
        id: null,
        title: "",
        description: "",
        published: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getBusiness(this.props.router.params.id);
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function(prevState) {
      return {
        currentBusiness: {
          ...prevState.currentBusiness,
          title: title
        }
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;
    
    this.setState(prevState => ({
      currentBusiness: {
        ...prevState.currentBusiness,
        description: description
      }
    }));
  }

  getBusiness(id) {
    BusinessDataService.get(id)
      .then(response => {
        this.setState({
          currentBusiness: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePublished(status) {
    var data = {
      id: this.state.currentBusiness.id,
      title: this.state.currentBusiness.title,
      description: this.state.currentBusiness.description,
      published: status
    };

    BusinessDataService.update(this.state.currentBusiness.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentBusiness: {
            ...prevState.currentBusiness,
            published: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateBusiness() {
    BusinessDataService.update(
      this.state.currentBusiness.id,
      this.state.currentBusiness
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The business was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteBusiness() {    
    BusinessDataService.delete(this.state.currentBusiness.id)
      .then(response => {
        console.log(response.data);
        this.props.router.navigate('/businesses');
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentBusiness } = this.state;

    return (
      <div>
        {currentBusiness ? (
          <div className="edit-form">
            <h4>Business</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentBusiness.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentBusiness.description}
                  onChange={this.onChangeDescription}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentBusiness.published ? "Published" : "Pending"}
              </div>
            </form>

            {currentBusiness.published ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(true)}
              >
                Publish
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteBusiness}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateBusiness}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Business...</p>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Business);