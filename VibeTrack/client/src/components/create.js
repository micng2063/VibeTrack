import React, { useState } from "react";
import { useNavigate } from "react-router";
import '../css/create.css';

// solved issues with css not rendering -> new broswer or clean cache
export default function Create() {
  const [form, setForm] = useState({ // Define a state variable 'form'
    name: "",
    address: "",
    about: "",
    phone: "",
    website: "",
    image: "",
  });
  const navigate = useNavigate();

  function updateForm(value) {  // Function to update form state
    return setForm((prev) => {
      // Update multiple fields in the form state object without directly mutating it
      // Create a new state object by merging the previous state with the new values provided in value
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) { // Function to handle form submission
    e.preventDefault();

    const newVenue = { ...form }; // Create a new object with form data

    await fetch("http://localhost:5050/record/", { // Send a POST request to the server
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newVenue),
    })
    .catch(error => {
      window.alert(error);
      return;
    });

    setForm({ // Reset form state after submission
      name: "",
      address: "",
      about: "",
      phone: "",
      website: "",
      image: "",
    });

    // Navigate to the record list page after successful submission
    navigate("/recordList");
  }

  return ( // Render form submission panel
    <div style={{ color: "#000000", paddingBottom: "10px" }}>
      <h3 style={{ color: "#000000" }}>Create New Venue</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={form.name}
            onChange={(e) => updateForm({ name: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            className="form-control"
            id="address"
            value={form.address}
            onChange={(e) => updateForm({ address: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label htmlFor="about">About</label>
          <input
            type="text"
            className="form-control"
            id="about"
            value={form.about}
            onChange={(e) => updateForm({ about: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            className="form-control"
            id="phone"
            value={form.phone}
            onChange={(e) => updateForm({ phone: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label htmlFor="website">Website</label>
          <input
            type="text"
            className="form-control"
            id="website"
            value={form.website}
            onChange={(e) => updateForm({ website: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label htmlFor="image">Image URL</label>
          <input
            type="text"
            className="form-control"
            id="image"
            value={form.image}
            onChange={(e) => updateForm({ image: e.target.value })}
          />
        </div>

        <div className="form-group">
          <input
            type="submit"
            value="Create Venue"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}
