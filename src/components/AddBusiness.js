import React, { useState } from "react";
import BusinessDataService from "../services/BusinessService";

const AddBusiness = () => {
  const initialBusinessState = {
    id: null,
    title: "",
    description: "",
    published: false
  };
  const [business, setBusiness] = useState(initialBusinessState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setBusiness({ ...business, [name]: value });
  };

  const saveBusiness = () => {
    var data = {
      title: business.title,
      description: business.description
    };

    BusinessDataService.create(data)
      .then(response => {
        setBusiness({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          published: response.data.published
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newBusiness = () => {
    setBusiness(initialBusinessState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newBusiness}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              value={business.title}
              onChange={handleInputChange}
              name="title"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={business.description}
              onChange={handleInputChange}
              name="description"
            />
          </div>

          <button onClick={saveBusiness} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddBusiness;
