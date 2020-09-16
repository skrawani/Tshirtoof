import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAutheticated } from "../auth/helper";
import {
  getCategories,
  deleteCategory,
  updateCategory,
} from "./helper/adminapicall";
const ManageCategories = () => {
  const [values, setValues] = useState([]);
  const [update, setUpdate] = useState({
    category: "",
    error: "",
    createdCategory: "",
    getaRedirect: false,
    selectedId: "",
  });

  const [prev, setPrev] = useState("");

  const { selectedId, error, createdCategory, category } = update;
  const { user, token } = isAutheticated();
  const { name } = values;
  const preload = () => {
    getCategories()
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          setValues(data);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    preload();
  }, []);

  const deleteThisCategory = (categoryId) => {
    deleteCategory(categoryId, user._id, token)
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          preload();
        }
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (event) => {
    // console.log(event.target.value);
    setUpdate({ ...update, category: event.target.value });
  };

  const popUpdate = (ele) => {
    setPrev(ele);
    const { _id, name } = ele;
    setUpdate({
      ...update,
      category: name,
      selectedId: _id,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues([...values, {}]);

    updateCategory(selectedId, user._id, token, { category })
      .then((data) => {
        if (data.error) {
          console.log(data.error);
          setValues({ ...values, error: data.error });
        } else {
          let updatedValues = values;
          var temp = { ...prev, name: category };
          updatedValues[updatedValues.indexOf(prev)] = temp;
          setValues(updatedValues);
          setUpdate({ ...update, selectedId: "", createdCategory: category });
        }
      })
      .catch();
  };
  const successMessage = () => (
    <div className="row">
      <div className="col-md-6 offset-sm-3 text-left">
        <div
          className="alert alert-success"
          style={{ display: createdCategory ? "" : "none" }}
        >
          {createdCategory} Updated Successfully
        </div>
      </div>
    </div>
  );

  const cancel = () => {
    setUpdate({
      ...update,
      createdCategory: false,
      selectedId: "",
    });
  };

  return (
    <Base title="Manage Categories" description="Manage Categories here">
      <Link className="btn btn-info" to={`/admin/dashboard`}>
        <span className="">Admin Home</span>
      </Link>

      <div className="row">
        <div className="col-12">
          <h2 className="text-center text-white my-3">
            Total {values.length} Categories
          </h2>
          {successMessage()}
          {values.map((cate, index) => {
            if (selectedId !== cate._id) {
              return (
                <div key={index} className="row text-center mb-2 ">
                  <div className="col-4">
                    <h3 className="text-white text-left">{cate.name}</h3>
                  </div>
                  <div className="col-4">
                    <button
                      onClick={() => {
                        popUpdate(cate);
                      }}
                      className="btn btn-success"
                    >
                      <span className="">Update</span>
                    </button>
                  </div>
                  <div className="col-4">
                    <button
                      onClick={() => {
                        deleteThisCategory(cate._id);
                      }}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            } else {
              return (
                <form key={index}>
                  <div className="form-group">
                    <input
                      type="text"
                      onChange={handleChange}
                      name="name"
                      className="form-control"
                      placeholder="Name"
                      value={category}
                    />
                  </div>
                  <button
                    type="submit"
                    onClick={onSubmit}
                    className="btn btn-outline-success mb-3 mr-3"
                  >
                    Done
                  </button>
                  <button
                    type="submit"
                    onClick={cancel}
                    className="btn btn-outline-danger mb-3 ml-3"
                  >
                    Cancel
                  </button>
                </form>
              );
            }
          })}
        </div>
      </div>
    </Base>
  );
};

export default ManageCategories;
