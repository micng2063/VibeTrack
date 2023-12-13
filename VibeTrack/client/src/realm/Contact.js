import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import '../css/settings.css';
import UserBar from '../components/userbar.js';
import { useContext } from 'react';
import { UserContext } from './UserContext';
import "react-pro-sidebar/dist/css/styles.css";

export default function Contact() {
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
  
    // Optionally, you can show a message to indicate that the update was successful.
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
          <h3 style={{ color: '#000000', paddingBottom: '10px' }}>Emergency Contacts</h3>
          <form onSubmit={onSubmit} style={{ color: '#000000' }}>
          <div className="grid-about" style={{ display: 'grid', gridTemplateColumns: '50% 50%', gap: '10px', padding: '10px', backgroundColor: 'rgba(255, 255, 255, 0.8)', borderColor: '#e8e8e8', textAlign: 'left', paddingTop: '20px', paddingBottom: '20px' }}>
            <div className="item">
              <div className="form-group">
                <label htmlFor="emergencyName1">Contact Name #1</label>
                <input
                  type="text"
                  className="form-control"
                  id="emergencyName1"
                  placeholder="Name for emergency contact #1"
                  style={{backgroundColor: '#fff', borderRadius: '10px', color: '#7a7a7a', height: '40px', fontSize: '15px', borderStyle: 'solid', borderWidth: 'thin', borderColor: '#7a7a7a'}}

                  value={form.emergencyName1}
                  onChange={(e) => updateForm({ emergencyName1: e.target.value })}
                />
              </div>
            </div>
            <div className="item">
              <div className="form-group">
                <label htmlFor="emergencyEmail1">Contact Email #1</label>
                <input
                  type="text"
                  className="form-control"
                  id="emergencyEmail1"
                  placeholder="Email for emergency contact #1"
                  style={{backgroundColor: '#fff', borderRadius: '10px', color: '#7a7a7a', height: '40px', fontSize: '15px', borderStyle: 'solid', borderWidth: 'thin', borderColor: '#7a7a7a'}}

                  value={form.emergencyEmail1}
                  onChange={(e) => updateForm({ emergencyEmail1: e.target.value })}
                />
              </div>
            </div>
            <div className="item">
            <div className="form-group">
                <label htmlFor="emergencyName2">Contact Name #2</label>
                <input
                  type="text"
                  className="form-control"
                  id="emergencyName2"
                  placeholder=" Name for emergency contact #2"
                  style={{backgroundColor: '#fff', borderRadius: '10px', color: '#7a7a7a', height: '40px', fontSize: '15px', borderStyle: 'solid', borderWidth: 'thin', borderColor: '#7a7a7a'}}

                  value={form.emergencyName2}
                  onChange={(e) => updateForm({ emergencyName2: e.target.value })}
                />
              </div>
            </div>
            <div className="item">
              <div className="form-group">
                <label htmlFor="emergencyEmail2">Contact Email#2</label>
                <input
                  type="text"
                  className="form-control"
                  id="emergencyEmail2"
                  placeholder="Email for emergency contact #2"
                  style={{backgroundColor: '#fff', borderRadius: '10px', color: '#7a7a7a', height: '40px', fontSize: '15px', borderStyle: 'solid', borderWidth: 'thin', borderColor: '#7a7a7a'}}

                  value={form.emergencyEmail2}
                  onChange={(e) => updateForm({ emergencyEmail2: e.target.value })}
                />
              </div>
            </div>
            </div>
            <div className="form-group">
              <input
                type="submit"
                value="Update Contacts"
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
