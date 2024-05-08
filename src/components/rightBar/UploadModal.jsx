import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import ConfettiExplosion from "react-confetti-explosion";

const UploadModal = ({ show, handleClose }) => {
  const [file, setFile] = useState(null);
  const [desc, setDesc] = useState("");
  const [descError, setDescError] = useState("");
  const [fileError, setFileError] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const queryClient = useQueryClient();

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const mutation = useMutation(
    (newPost) => {
      return makeRequest.post("/posts", newPost);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["posts"]);
        handleClose();
      },
    }
  );

  const handleSubmit = async () => {
    let isValid = true;

    if (!desc) {
      setDescError("Please input a message.");
      isValid = false;
    } else {
      setDescError("");
    }

    if (!file) {
      setFileError("Please select an image.");
      isValid = false;
    } else {
      setFileError("");
    }

    if (!selectedRole) { // Validate selected role
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    let imgUrl = "";
    if (file) {
      imgUrl = await upload();
    }
    mutation.mutate({ desc, img: imgUrl, donatorType: selectedRole }); // Include selected role in the mutation

    setDesc("");
    setFile(null);
    setSelectedRole(""); // Reset selected role after submission
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Thank you for the donation. 💕</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Donation Message 😄</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
            {descError && <Form.Text className="text-danger">{descError}</Form.Text>}
            <Form.Control // Dropdown for selecting role
              as="select"
              className="mt-3"
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
            >
              <option value="">Select type</option>
              <option value="Donor">Donor</option>
              <option value="Recipient">Recipient</option>
            </Form.Control>
            <Form.Control
              className="mt-3"
              type="file"
              placeholder="upload"
              onChange={(e) => setFile(e.target.files[0])}
            />
            {fileError && <Form.Text className="text-danger">{fileError}</Form.Text>}
           
          </Form.Group>
        </Form>
        {show && <ConfettiExplosion />}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleSubmit}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UploadModal;
