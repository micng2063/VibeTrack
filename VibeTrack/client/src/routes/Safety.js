import React, { useEffect, useState } from 'react';
import { Chip} from "@material-ui/core";
import '../css/safety.css';

function Safety() {
  const [venues, setVenues] = useState([]);
  const [selectedVenues, setSelectedVenues] = useState([]);
  const [emailData, setEmailData] = useState({
    to: '',
    subject: "I'm visiting these clubs tonight, please keep an eye out for me!",
    text: '',
  });

  const [values, setValues] = useState(["vibetracktxt@gmail.com"]);
  const [currentValue, setCurrentValue] = useState("");

  const handleKeyUp = (e) => {
    console.log(e.keyCode);
    if (e.keyCode === 13) {
      const newToValue = [...emailData.to.split(','), e.target.value].join(',');
      setEmailData({
        ...emailData,
        to: newToValue,
      });
      setValues((oldState) => [...oldState, e.target.value]);
      setCurrentValue("");
    }
  };

  const handleEmailChange = (e) => {
    setCurrentValue(e.target.value);
  };

  const handleEmailDelete = (item, index) =>{
    let arr = [...values]; // Create a copy of 'values' array
    arr.splice(index,1); // Remove one item from the 'values' array at specified 'index'
    console.log(item);
    setValues(arr); // Update 'values' state with the modified array
  }

  useEffect(() => {
    const getVenues = async () => {
      try {
        const response = await fetch(`http://localhost:5050/record/`);

        if (!response.ok) {
          const message = `An error occurred: ${response.statusText}`;
          window.alert(message);
          return;
        }

        const venueData = await response.json();
        setVenues(venueData);
      } catch (error) {
        console.log('Error fetching venues from the database: ', error);
      }
    };
    getVenues();
  }, []);


  const sendEmail = () => {
    const messageWithSelectedVenues = `Selected Venues:\n${selectedVenues.join('\n')}`;
    const emailDataWithVenues = {
      ...emailData,
      text: messageWithSelectedVenues,
    };
    fetch('http://localhost:5050/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailDataWithVenues),
    })
      .then((response) => response.text())
      .then((data) => {
        console.log('Email sent:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handleClickedVenue = (clickedVenue) => {
    if (selectedVenues.includes(clickedVenue)) return; // Check if venue is already selected
    else {
      setSelectedVenues([...selectedVenues, clickedVenue]); // Add venue to selectedVenues state
    }
  };

  const handleDeleteVenue = (venue) => {
    setSelectedVenues(prevSelectedVenues =>
      prevSelectedVenues.filter(v => v !== venue) // Filter out the 'v' element from the array
    );
  }


  return (
    <div>
      <div className="intro-container"  style={{marginTop:"20px"}}>
        <h1 className="intro-title">Safety First!</h1>
        <p className="intro-description">Clubs! Dancing! Drinks! It's all fun, but who knows what will happen.</p>
        <p className="intro-description">We are here for you to ease the minds of anyone else when you go out tonight! </p>
        <p className="intro-description">Choose from a list of great clubs you are visiting, and we'll drop them a message or alert them if something goes wrong.</p>
      </div>
      <div>	
      <div style={{paddingLeft:'20px', marginTop:'20px'}}>
      {values.map((item,index) => (
            <Chip  size="small" onDelete={()=>handleEmailDelete(item,index)} label={item} style={{backgroundColor:'#747474', color:'#fff', marginRight:'10px'}}/>
          ))}
      </div>
      <div className="grid-safety" style={{padding:'20px'}}>
        <div class="item">
				  <input
					  value={currentValue}
					  onChange={handleEmailChange}
					  onKeyDown={handleKeyUp}
            placeholder="Enter email"
            type="email"
            name="to"
            className="email-input"
            style={{borderRadius:"10px", height:"40px", background:'#fff', color:'#747474', borderColor:'#747474'}}
            inputProps={{ style: { backgroundColor: "#fff", color:'#747474', borderColor:'#747474' } }}
				  />
        </div>
        <div class="item">
          <button onClick={sendEmail} className="send-email-button"  style={{borderRadius:"10px",  height:"40px", marginTop:'10px'}}>
            Send safety notification
          </button>
        </div>
      </div> 
      </div>
      
      <div className="selected-clubs-container">
        {selectedVenues.map((venue,index) => (
            <Chip  size="small" onDelete={()=>handleDeleteVenue(venue,index)} label={venue} style={{backgroundColor:'#e24e99', color:'#fff', marginRight:'10px'}}/>
          ))}
      </div>
      <div className="venues-container">
        <ul className="venues-list">
          {venues.map((venue, index) => (
            <li key={index} className="venue-item" onClick={() => handleClickedVenue(venue.name)}>
              {venue.name.length > 25 ? venue.name.slice(0, 25) + "..." : venue.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Safety;
