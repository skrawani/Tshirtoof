import React, { useState } from "react";
import Base from "../core/Base";
import { isAutheticated } from "../auth/helper";
import { Link } from "react-router-dom";
import { createCategory } from "./helper/adminapicall";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const { user, token } = isAutheticated();

  const handleChange = (event) => {
    setError("");
    setName(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setError("");
    setSuccess(false);
    //backed request fired
    createCategory(user._id, token, { name })
      .then((data) => {
        if (data.error) {
          setError(true);
        } else {
          setError("");
          setName("");
          setSuccess(true);
        }
      })
      .catch("Error in Submit Add Category");
  };

  const successMessage = () => (
    <div className="row">
      <div className="col-md-6 offset-sm-3 text-left">
        <div
          className="alert alert-success"
          style={{ display: success ? "" : "none" }}
        >
          Category Creation Successfull
        </div>
      </div>
    </div>
  );
  const errorMessage = () => (
    <div className="row">
      <div className="col-md-6 offset-sm-3 text-left">
        <div
          className="alert alert-danger"
          style={{ display: error ? "" : "none" }}
        >
          {error}
        </div>
      </div>
    </div>
  );

  const myCategoryForm = () => (
    <form>
      <div className="form-group">
        <p className="lead text-dark">Enter the category</p>
        <input
          type="text"
          className="form-control my-3 "
          onChange={handleChange}
          value={name}
          autoFocus
          required
          placeholder="eg : Summer"
        />
        <button onClick={onSubmit} className="btn btn-outline-info">
          Create Category
        </button>
      </div>
    </form>
  );

  const goBack = () => (
    <div className="mt-5">
      <Link className="btn btn-sm btn-info mb-3" to="/admin/dashboard">
        Go Back
      </Link>
    </div>
  );

  return (
    <Base
      title="Create a Category"
      description="Add a new category for new tshirts"
      className="container bg-info p-4"
    >
      <div className="row bg-white rounded">
        <div className="col-md-8 offset-md-2">
          {successMessage()}
          {errorMessage()}
          {myCategoryForm()}
          {goBack()}
        </div>
      </div>
    </Base>
  );
};

export default AddCategory;
