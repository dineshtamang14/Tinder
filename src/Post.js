import React, { useState } from 'react';
import axios from "./axios";
import { useNavigate } from 'react-router-dom';
import './Post.css';

const UserForm = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [profession, setProfession] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('location', profession);
    formData.append('image', image);

    try {
      await axios.post('/tinder/card', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Resetting the form fields
      setName('');
      setProfession('');
      setImage(null);
      alert('Form data submitted successfully!');
      navigate('/');
    } catch (error) {
      console.error('Error submitting form data:', error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  return (
    <div className="user-form-container">
      <h2 className="user-form-title">User Form</h2>
      <form className="user-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Name:</label>
          <input
            className="form-input"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Location:</label>
          <input
            className="form-input"
            type="text"
            value={profession}
            onChange={(e) => setProfession(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Image:</label>
          <input
            className="form-input"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        <button className="submit-button" type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UserForm;
