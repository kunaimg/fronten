import { TextField } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Join() {
  const navigate = useNavigate();
  const [name, setName] = useState();
  const [image, setImage] = useState();
  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileChange = (e) => {
    localStorage.setItem("image", e.target.files[0].name);
    setImage(e.target.files[0].name);
    setSelectedFile(e.target.files[0]);
  };
  function valid(e) {
    e.preventDefault();
    if (name && image) {
      if (!selectedFile) {
        return;
      }

      const formData = new FormData();
      console.log(formData, selectedFile);
      formData.append("image", selectedFile);

      fetch("https://chatya.onrender.com//upload", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.text())
        .then((data) => {
          setImage(data.image);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
      navigate("/chatapp");
    } else {
      alert("please fill valid infomration");
    }
  }
  return (
    <div>
      {" "}
      <button
        type="button"
        class="btn btn-primary idwork"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        create id
      </button>
      <div
        className="modal fade custom-modal"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Create id New User
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <TextField
                label={"enter user Name"}
                onChange={(e) => {
                  localStorage.setItem("name", e.target.value);
                  setName(e.target.value);
                }}
                fullWidth
              ></TextField>
              <label
                class="btn btn-primary"
                for="fileInput"
                style={{ marginTop: "1rem" }}
              >
                Upload Image
              </label>
              <input
                type="file"
                accept="image/*"
                style={{ marginTop: "1.4rem", display: "none" }}
                id="fileInput"
                onChange={handleFileChange}
              />
            </div>
            <div class="modal-footer">
              <button
                type="button"
                data-bs-dismiss="modal"
                class="btn btn-primary"
                onClick={valid}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Join;
