import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import UserBar from '../components/userbar.js';
import { useContext } from 'react';
import { UserContext } from './UserContext';
import "react-pro-sidebar/dist/css/styles.css";
import '../css/settings.css';

export default function Profile() {
  const [form, setForm] = useState({
    _id: "",
    code: "",
    name: "",
    lastName: "",
    phone: "",
    email: "",
    birthdate: "",
    gender: "",
    emergencyName1: "", 
    emergencyEmail1: "", 
    emergencyName2: "", 
    emergencyEmail2: "", 
    favorite: "",
  });
  const navigate = useNavigate();

  const { fetchUser } = useContext(UserContext);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentUser = await fetchUser();
        if (currentUser) {
          const response = await fetch(`http://localhost:5050/user/${currentUser.id}`);
    
          if (!response.ok) {
            const message = `An error has occurred: ${response.statusText}`;
            window.alert(message);
            return;
          }
    
          const user = await response.json();
          if (!user) {
            window.alert(`User with code ${currentUser.id} not found`);
            navigate("/");
            return;
          }
    
          setForm(user);
        }
      } catch (error) {
        console.error(error);
        alert(error);
      }
    }
  
    fetchData();
  }, [fetchUser, navigate]);
  

  function updateForm(value) {
    return setForm(prev => {
      return { ...prev, ...value };
    });
  }
  
  async function onSubmit(e) {
    e.preventDefault();
    const editedUser = {
      _id : form._id,
      code: form.code,
      name: form.name,
      lastName: form.lastName,
      phone: form.phone,
      email: form.email,
      birthdate: form.birthdate,
      gender: form.gender,
      emergencyName1: form.emergencyName1,
      emergencyEmail1: form.emergencyEmail1,
      emergencyName2: form.emergencyName2,
      emergencyEmail2: form.emergencyEmail2,
      favorite: form.favorite,
    };
  
    const currentUser = await fetchUser();
    await fetch(`http://localhost:5050/user/${currentUser.id}`, { // Use currentUser directly
      method: "PATCH",
      body: JSON.stringify(editedUser),
      headers: {
        'Content-Type': 'application/json'
      },
    });
  
    window.alert("Information updated successfully!");
  }

  const { logOutUser } = useContext(UserContext);
  const logOut = async () => {
    try {
      const loggedOut = await logOutUser();
      if (loggedOut) {
        window.location.reload(true);
      }
    } catch (error) {
      alert(error)
    }
  }

  return (
    <div className="profile-component">
    <div className="grid-settings" style={{ display: 'grid', gridTemplateColumns: '20% 80%', gap: '10px', paddingRight: '50px', margin: '0', fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", fontSize: '15px', height: '100vh' }}>
      <div className="grid-settings-left" style={{color: '#fff',  fontFamily:'Segoe UI',}}>
        <UserBar  logOut={logOut}/>
      </div>
      <div className="grid-settings-right" style={{backgroundColor:'#fff', marginTop:'20px'}}>
        <h3 style={{ color: '#000000', paddingBottom: '10px' }}>General Information</h3>
        <form onSubmit={onSubmit} style={{ color: '#000000' }}>
          <div className="grid-about" style={{ display: 'grid', gridTemplateColumns: '50% 50%', gap: '10px', padding: '10px', backgroundColor: 'rgba(255, 255, 255, 0.8)', borderColor: '#e8e8e8', textAlign: 'left', paddingTop: '20px', paddingBottom: '20px' }}>
            <div className="item">
              <div className="form-group">
                <label htmlFor="name">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  style={{backgroundColor: '#fff', borderRadius: '10px', color: '#7a7a7a', height: '40px', fontSize: '15px', borderStyle: 'solid', borderWidth: 'thin', borderColor: '#7a7a7a'}}
                  value={form.name}
                  onChange={(e) => updateForm({ name: e.target.value })}
                />
              </div>
            </div>
            <div className="item">
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  value={form.lastName}
                  style={{backgroundColor: '#fff', borderRadius: '10px', color: '#7a7a7a', height: '40px', fontSize: '15px', borderStyle: 'solid', borderWidth: 'thin', borderColor: '#7a7a7a'}}
                  onChange={(e) => updateForm({ lastName: e.target.value })}
                />
              </div>
            </div>
            <div className="item">
              <div className="form-group">
                <label htmlFor="gender" style={{ color: 'black' }}>Gender</label>
                <select
                  className="form-control"
                  id="gender"
                  value={form.gender}
                  onChange={(e) => updateForm({ gender: e.target.value })}
                  style={{backgroundColor: '#fff', borderRadius: '10px', borderStyle: 'solid', borderWidth: 'thin', borderColor: '#7a7a7a',   marginTop:'4px', height: '40px', padding: '10px', paddingLeft: '30px', width: '100%', fontSize: '15px', color:'#7a7a7a' }}                >
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                  <option value="Rather not disclose">Rather not disclose</option>
                </select>
              </div>
            </div>
            <div className="item">
              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                  type="text"
                  className="form-control"
                  id="phone"
                  value={form.phone}
                  style={{ backgroundColor: '#fff', borderRadius: '10px', color: '#7a7a7a', height: '40px', fontSize: '15px', border: 'thin solid #7a7a7a' }}                  onChange={(e) => updateForm({ phone: e.target.value })}
                />
              </div>
            </div>
            <div className="item">
              <div className="form-group">
                <label htmlFor="birthdate">Birthdate</label>
                <input
                  type="date"
                  className="form-control"
                  id="birthdate"
                  value={form.birthdate}
                  onChange={(e) => updateForm({ birthdate: e.target.value })}
                  style={{backgroundColor: '#fff', borderRadius: '10px', borderStyle: 'solid', borderWidth: 'thin', borderColor: '#7a7a7a',   marginTop:'4px', height: '40px', padding: '10px', paddingLeft: '30px', width: '100%', fontSize: '15px', color:'#7a7a7a' }}
                />
              </div>
            </div>
            <div className="item">
              <div className="form-group">
                <label htmlFor="_id">ID (Read Only)</label>
                <input
                  type="text"
                  className="form-control"
                  id="_id"
                  value={form._id}
                  readOnly
                  style={{backgroundColor: '#fff', borderRadius: '10px', color: '#7a7a7a', height: '40px', fontSize: '15px', borderStyle: 'solid', borderWidth: 'thin', borderColor: '#7a7a7a'}}
                />
              </div>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email" style={{marginLeft:'10px'}}>Email</label>
            <input
              type="text"
              className="form-control"
              id="email"
              value={form.email}
              onChange={(e) => updateForm({ email: e.target.value })}
              style={{backgroundColor: '#fff', borderRadius: '10px', color: '#7a7a7a', height: '40px', fontSize: '15px', borderStyle: 'solid', borderWidth: 'thin', borderColor: '#7a7a7a', marginLeft:'12px', width:'99%'}}

              readOnly
            />
          </div>
          <br />
          <div className="form-group">
            <input
              type="submit"
              value="Update Information"
              className="btn btn-primary"

              style={{backgroundColor: '#fff', borderRadius: '10px', color: '#7a7a7a', height: '40px', fontSize: '15px', borderStyle: 'solid', borderWidth: 'thin', borderColor: '#7a7a7a', width:'50%', marginLeft:'30%'}}

            />
          </div>
        </form>
      </div>
    </div>
  </div>
  );
}
