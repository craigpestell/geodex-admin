import React, { useState, useEffect } from "react";
import BusinessDataService from "../services/BusinessService";

const Business = props => {
  const initialBusinessState = {
    id: null,
    title: "",
    description: "",
    published: false
  };
  const [currentBusiness, setCurrentBusiness] = useState(initialBusinessState);
  const [message, setMessage] = useState("");

  const getBusiness = id => {
    BusinessDataService.get(id)
      .then(response => {
        setCurrentBusiness(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getBusiness(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentBusiness({ ...currentBusiness, [name]: value });
  };

  const updatePublished = status => {
    var data = {
      id: currentBusiness.id,
      title: currentBusiness.title,
      description: currentBusiness.description,
      published: status
    };

    BusinessDataService.update(currentBusiness.id, data)
      .then(response => {
        setCurrentBusiness({ ...currentBusiness, published: status });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const updateBusiness = () => {
    BusinessDataService.update(currentBusiness.id, currentBusiness)
      .then(response => {
        console.log(response.data);
        setMessage("The business was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteBusiness = () => {
    BusinessDataService.remove(currentBusiness.id)
      .then(response => {
        console.log(response.data);
        props.history.push("/businesses");
      })
      .catch(e => {
        console.log(e);
      });
  };

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
                name="title"
                value={currentBusiness.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={currentBusiness.description}
                onChange={handleInputChange}
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
              onClick={() => updatePublished(false)}
            >
              UnPublish
            </button>
          ) : (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updatePublished(true)}
            >
              Publish
            </button>
          )}

          <button className="badge badge-danger mr-2" onClick={deleteBusiness}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateBusiness}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Business...</p>
        </div>
      )}
    </div>
  );
};

export default Business;
