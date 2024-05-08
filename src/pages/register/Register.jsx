import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";

import "./register.scss";
import { makeRequest } from "../../axios";

const Register = () => {
  const [fileError, setFileError] = useState(""); // State for file validation error

  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
    profilePic: null, // Add profilePic state to hold the uploaded file
  });
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
  });
  const [err, setErr] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [file, setFile] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.name === "profilePic") {
      // If the change is in the profile picture input, update the state with the selected file
      setInputs((prev) => ({ ...prev, profilePic: e.target.files[0].name }));
    } else {
      // For other inputs, update the state as before
      setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);
  
    let validationErrors = {};
     // Validate file extension
    
  
    // Check username
    if (!inputs.username.trim()) {
      validationErrors.username = "Please enter your username.";
    }
  
    // Check email
    if (!inputs.email.trim()) {
      validationErrors.email = "Please enter your email.";
    }
  
    // Check password
    if (!inputs.password.trim()) {
      validationErrors.password = "Please enter your password.";
    }
  
    // Check name
    if (!inputs.name.trim()) {
      validationErrors.name = "Please enter your name.";
    }
  
    // Check if a profile picture is selected
    if (!file) {
      validationErrors.profilePic = "Please select a profile picture.";
    }else{
      const allowedExtensions = ["png", "jpeg", "jpg"];
      const fileExtension = file.name.split(".").pop().toLowerCase();
      if (!allowedExtensions.includes(fileExtension)) {
        setFileError("Only .png, .jpeg, and .jpg files are allowed.");
        validationErrors.profilePic = "";
        return;
      }
    }
  
    // Set errors state with validation errors
    setErrors(validationErrors);
  
    if (Object.keys(validationErrors).length > 0) {
      return;
    }
  
    try {
      const formData = new FormData();
      formData.append("file", file);
  
      const uploadResponse = await makeRequest.post("/upload", formData);
      if (uploadResponse.status !== 200) {
        return;
      }
      const imgUrl = uploadResponse.data;
      
      const userData = {
        username: inputs.username,
        email: inputs.email,
        password: inputs.password,
        name: inputs.name,
        profilePic: imgUrl,
      };
  
      if (uploadResponse.status === 200) {
        await makeRequest.post("/auth/register", userData);
        navigate("/login");
      }

    } catch (err) {
      if (err.response && err.response.status === 409) {
        alert("User already exists!");
      } else {
        setErr(err.response.data);
      }
    }
  };
  
  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Pocket Donation Bank.</h1>
          <p>
          “It’s easier to take than to give. It’s nobler to give than to take. The thrill of taking lasts a day. The thrill of giving lasts a lifetime" <br />
          -Joan Marques
          </p>
          <span>Do you have an account?</span>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form>
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={handleChange}
            />
            {formSubmitted && errors.username && <p className="text-danger">{errors.username}</p>}
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
            />
            {formSubmitted && errors.email && <p className="text-danger">{errors.email}</p>}
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
            {formSubmitted && errors.password && <p className="text-danger">{errors.password}</p>}
            <input
              type="text"
              placeholder="Name"
              name="name"
              onChange={handleChange}
            />
            {formSubmitted && errors.name && <p className="text-danger">{errors.name}</p>}
            {/* Add file input for profile picture */}
            <Form.Control
              className="mt-3"
              type="file"
              placeholder="upload"
              onChange={(e) => setFile(e.target.files[0])}
            />
             {fileError && <p className="text-danger">{fileError}</p>}
            {formSubmitted && errors.profilePic && (
              <p className="text-danger">{errors.profilePic}</p>
            )}
            {err && <p className="text-danger">{err}</p>}
            <button onClick={handleClick}>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
