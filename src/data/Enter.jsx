import { TextField } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Enter() {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [name, setName] = useState();
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  function valid(e) {
    e.preventDefault();
    if (name && selectedFile) {
      const formData = new FormData();

      formData.append("image", selectedFile);
      formData.append("content", name);

      fetch("http://localhost:3000/upload", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.text())
        .then((data) => {
          data = JSON.parse(data);
          sessionStorage.setItem("name", name);
          sessionStorage.setItem("image", data.image);

          navigate("/join");
        })
        .catch((error) => {
          console.error("Error:", error);
        });
      console.log("6575767");
    } else {
      alert("please fill valid infomration");
    }
  }
  return (
    <div style={{ height: "100vh" }}>
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
                Create Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Enter };
