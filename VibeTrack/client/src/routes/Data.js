import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faYelp } from "@fortawesome/free-brands-svg-icons";
import { faPhone, faLink } from '@fortawesome/free-solid-svg-icons';
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import '../css/template.css';
import StarRating from '../components/starRating.js';
import Rating from '../components/rating.js';
import { UserContext } from '../realm/UserContext';
import { useContext } from 'react';

function formatPhoneNumber(phone) {
  // Format retrieved phone number from XXXXXXXXXX to (XXX)-XXX-XXXX
  const cleaned = ('' + phone).replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return '(' + match[1] + ') - ' + match[2] + ' - ' + match[3];
  }
  return null;
}

function convertHoursToMinutes(openingHours) {
  // Replace U+2013 with "-" and U+202f with a regular space (e.g. 11:00 AM – 12:00 AM)
  openingHours = openingHours.replace(/\u2013/g, '-').replace(/\u202f/g, ' ');

  if (openingHours === 'CLOSED') {
    return { openingTime: 0, closingTime: 0 };
  } else if (openingHours === 'Open 24 hours') {
    return { openingTime: 0, closingTime: 1440 }; // 0 minutes to 24 hours
  }

  let [openingTime, closingTime] = openingHours.split(' - ').map(timeStringToMinutes);

  if (closingTime < openingTime) { // Add 1440 minutes (24 hours) to closingTime if AM
    closingTime += 1440;
  }

  return { openingTime, closingTime };
}

function timeStringToMinutes(timeString) {
  const [timePart] = timeString.split(' '); // Split the time and AM/PM part

  let [hours, minutes] = timePart.split(':').map(Number);

  if (hours === 12) { // If it's 12:00 PM, set hours to 12 (no change)
  } else if (timeString.toLowerCase().includes('pm')) {
    hours += 12; // Add 12 hours for PM times (except 12:00 PM)
  }

  const totalMinutes = hours * 60 + minutes;
  return totalMinutes;
}

function formatAmenities(amenitiesString) {
  if (!amenitiesString) {
    return [];
  }

  const amenitiesList = amenitiesString.split(',');
  return amenitiesList;
}

function Data(props) {
  const [venueData, setVenueData] = useState({
    name: "",
    address: "",
    latitude: 0,
    longitude: 0,
    image: [],
    phone: 0,
    monday: "",
    tuesday: "",
    wednesday: "",
    thursday: "",
    friday: "",
    saturday: "",
    sunday: "",
    facebook: "",
    instagram: "",
    yelp: "",
    amenities: "",
    moreabout:"",
    tags:"",
    website:"",
    price:"",
  });



  const [userInfo, setUserInfo] = useState({
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
  const { fetchUser: fetchUserContext } = useContext(UserContext);
  const params = useParams();
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`http://localhost:5050/record/${params.id}`);

        if (!response.ok) {
          const message = `An error has occurred: ${response.statusText}`;
          window.alert(message);
          navigate("/error");
          return;
        }

        const venue = await response.json();
        if (!venue) {
          window.alert(`Venue with id ${params.id} not found`);
          navigate("/error");
          return;
        }

        setVenueData(venue);
      } catch (error) {
        console.error('Network error:', error);
        navigate("/error");
      }
    }

    const fetchUser = async () => {
      try {
        const currentUser = await fetchUserContext();
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
          setUserInfo(user);
        }
      } catch (error) {
        console.error(error);
        alert(error);
      }
    }
    fetchData();
    fetchUser();
  }, [params.id, navigate, fetchUserContext]); 

  const icon = L.icon({ iconUrl: "https://i.imgur.com/yyb78tO.png" });
  const formattedPhoneNumber = formatPhoneNumber(venueData.phone);

  const now = new Date();
  const currentDay = now.getDay(); // 0 = Sunday, 1 = Monday, ...
  const currentHours = now.getHours();
  const currentMinutes = now.getMinutes();
  const currentTime = currentHours <= 4 ? (currentHours + 24) * 60 + currentMinutes : currentHours * 60 + currentMinutes;

  // Assigns the openingTime and closingTime based on the current day of the week (unconventionally, will fix eventually)
  let openingTime, closingTime;
  if (currentDay === 0) { ({ openingTime, closingTime } = convertHoursToMinutes(venueData.sunday)); }
  else if (currentDay === 1) { ({ openingTime, closingTime } = convertHoursToMinutes(venueData.monday)); }
  else if (currentDay === 2) { ({ openingTime, closingTime } = convertHoursToMinutes(venueData.tuesday)); }
  else if (currentDay === 3) { ({ openingTime, closingTime } = convertHoursToMinutes(venueData.wednesday)); }
  else if (currentDay === 4) { ({ openingTime, closingTime } = convertHoursToMinutes(venueData.thursday)); }
  else if (currentDay === 5) { ({ openingTime, closingTime } = convertHoursToMinutes(venueData.friday)); }
  else if (currentDay === 6) { ({ openingTime, closingTime } = convertHoursToMinutes(venueData.saturday)); }

  const isOpen = currentTime >= openingTime && currentTime <= closingTime;

const images = venueData.image
  ? venueData.image.map((url) => ({
      original: url,
      thumbnail: url
    }))
  : [];

const formattedAmenities = formatAmenities(venueData.amenities);

const [showModal, setShowModal] = useState(false);
const [showModalAlert, setShowModalAlert] = useState(false);

const [emailData, setEmailData] = useState({
  to: '',
  subject: "I'm visiting these clubs tonight, please keep an eye out for me!",
  text: "",
});

const [userLocation, setUserLocation] = useState(null);
// eslint-disable-next-line
const [selectedVenue, setSelectedVenue] = useState(null);

const openModal = (venueData) => {
  setSelectedVenue(venueData);
  setShowModal(true);
}

const closeModal = () => {
  setShowModal(false);
}

// Get the location of the user
const handleAlertButtonClick = async () => {
  try {
    const position = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });

    const location = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    };

    console.log("User Location:", location);
    setUserLocation(location);
  } catch (error) {
    console.error("Error getting user location:", error.message);
    // Handle error, show a message to the user, or provide an alternative method.
  }
};

const sendEmail = () => {
  const locationString = JSON.stringify(userLocation);
  const message = `My current location is: ${venueData.name}, ${venueData.address}. My current coordinates: ${locationString}`;

  setEmailData((prevData) => ({
    ...prevData,
    text: message,
  }));

  console.log("After state update:", emailData);

  fetch('http://localhost:5050/send-email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(emailData),
  })
    .then((response) => response.text())
    .then((data) => {
      console.log('Email sent:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });

  closeAlertModal();
};

const openModalAlert = () => {
  setShowModalAlert(true);
}

const closeAlertModal = () => {
  setShowModalAlert(false);
}

const selectEmergencyContact = (contactName) => {
  const selectedEmail = contactName === userInfo.emergencyName1
    ? userInfo.emergencyEmail1
    : userInfo.emergencyEmail2;

  setEmailData((prevData) => ({
    ...prevData,
    to: selectedEmail,
  }));
};

const renderMoreAbout = () => {
  if (!venueData.moreabout) {
    return null;
  }

  // Split moreabout into an array of sentences

  const sentences = venueData.moreabout.split(/(?<=\.)\s+/);
  // Render each sentence in a separate <p> tag
  return sentences.map((sentence, index) => (
    <p key={index} style={{padding:'0', fontFamily: 'Segoe UI', paddingBottom: index === sentences.length - 1 ? '30px' : '10px', float: 'left', textAlign: 'left', color: '#000', fontSize: '15px' }}>
      {sentence}
    </p>
  ));
};
window.scrollTo({ top: 0, behavior: 'smooth' });
return (
  <div style={{ marginTop: "20px" }}>
    <div className="about-section">
      <div className="item">
        <h2 className="h2 section-title" style={{ float: 'left', textAlign: 'left', color: '#fff',  width: '90%' }}>{venueData.name}</h2>

        <div style={{ display: 'block', float: 'left', textAlign: 'left', width: '25%' }}>
        {isOpen ? (
          <button style={{ marginTop:'12px', float: 'left', textAlign: 'center', color: '#000', fontSize: '15px', backgroundColor: '#65e0ab', marginBottom: '20px',  }} className="btn btn-primary">OPEN NOW</button>
        ) : (
          <button style={{ marginTop:'12px',float: 'left', textAlign: 'center', color: '#fff', fontSize: '15px', marginBottom: '40px' }} className="btn btn-primary">CLOSED</button>
        )}
        </div>
        <div style={{ paddingLeft:'30px', top:'0', display: 'block', float: 'left', textAlign: 'left', width: '45%' }}>
          <Rating/>
          <p style={{ float: 'left', textAlign: 'left', color: '#fff', fontSize: '15px', width: '90%' }}>{venueData.rating} ({venueData.review} reviews)</p>
        </div>
        <p style={{ float: 'left', textAlign: 'left', color: '#fff', fontSize: '15px', width: '90%' }}>{venueData.address}</p>

        <p style={{ float: 'left', textAlign: 'left', color: '#fff', fontSize: '15px', width: '90%' }}>{venueData.about}</p>
        
        <div>
        <p style={{ float: 'left', textAlign: 'left', color: '#fff', fontSize: '15px', width: '60%' }}><Link to={venueData.website} style={{color:'#fff'}}><FontAwesomeIcon icon={faLink} /> {venueData.website.length > 40 ? venueData.website.slice(0, 40) + "..." : venueData.website}</Link></p>
        <p style={{ float: 'left', textAlign: 'left', color: '#fff', fontSize: '15px', width: '40%' }}><FontAwesomeIcon icon={faPhone} /> {formattedPhoneNumber}</p>
        </div>
        <div>
        <button onClick={() => openModal(venueData)} style={{ marginTop: '0px', float: 'left', textAlign: 'center', color: '#000', fontSize: '15px', backgroundColor: '#e24e99', marginBottom: '20px', width: '35%' }} 
                className="btn btn-primary">LEAVE A RATING</button>
          <button onClick={() => { handleAlertButtonClick(); openModalAlert(); }} style={{ marginTop: '0px', float: 'left', textAlign: 'center', color: '#000', fontSize: '15px', backgroundColor: '#e24e99', marginBottom: '20px', width: '35%', cursor: 'pointer', marginLeft: '50px'}} 
                className="btn btn-primary"> Alert Me </button>
        </div>
      </div>
      <div className="item" >
        <ImageGallery items={images}
          showPlayButton={false} // Set to true or false based on your preference
          showFullscreenButton={false} />
      </div>
    </div>
    {showModal && (
      <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={closeModal} style={{ position: 'absolute', top: '10px',  right: '10px', width: '10px', backgroundColor: '#fff', cursor: 'pointer', zIndex: 1, }}>&times;</span>

          <h2 style={{ color: '#747474' }}>Submit a rating</h2>
          <div style={{ marginTop: '20px' }}>
            
          <p style={{color:'#747474', fontFamily:'Segoe UI', paddingBottom:'20px'}}>Let others know what you think about {venueData.name} !</p>
            <StarRating />
          </div>
        </div>
      </div>
    )}

    {showModalAlert && (
      <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={closeAlertModal} style={{ position: 'absolute', top: '10px',  right: '10px', width: '10px', backgroundColor: '#fff', cursor: 'pointer', zIndex: 1, }}>&times;</span>

          <h2 style={{ color: '#747474' }}>Send an alert to your emergency contacts</h2>
          <div style={{display:'grid', gridTemplateColumns: '1fr 1fr', gap:'10px', marginTop:'20px'}}>
              <div class="item"><button style={{backgroundColor: '#e24e99',color:'#fff', borderRadius:'10px'}} onClick={() => selectEmergencyContact(userInfo.emergencyName1)}>
                {userInfo.emergencyName1}
              </button></div>
              <div class="item">
              <button style={{backgroundColor: '#e24e99',color:'#fff', borderRadius:'10px'}}  onClick={() => selectEmergencyContact(userInfo.emergencyName2)}>
                {userInfo.emergencyName2}
              </button>
              </div>
            </div>
            <p style={{color:'#747474',textAlign:'center', marginTop:'10px'}}>or</p>
          <input
            placeholder="Enter email"
            type="email"
            name="to"
            onChange={(e) => setEmailData((prevData) => ({ ...prevData, to: e.target.value }))}
            style={{ marginBottom: "1rem", backgroundColor: "#fff", color: '#747474' }}
            inputProps={{ style: { backgroundColor: "#fff", color: '#747474' } }}
          />
          <button
            onClick={sendEmail} style={{ backgroundColor: '#e24e99', color: '#000', borderRadius: '10px', width: '50%', marginLeft: '150px' }}>
            Submit
          </button>
        </div>
      </div>
    )}
    <div className="container" style={{ 'paddingTop': '25px' }}>
      <div className="grid-container">
        <div class="item1">
        
        {renderMoreAbout()}
        <div className="section-text" style={{ float: 'left', textAlign: 'left', color: '#000', fontSize: '15px', columnCount: '4', columnGap: '50px' }}>
            {formattedAmenities.map((amenity, index) => (
              <span key={index} style={{lineHeight:'1.5em'}}>{amenity}<br /></span>
            ))}
          </div>
        </div>
        <div className="item2">
        <div style={{ display: "flex" }}>
            
            <MapContainer
              style={{
                height: "50vh",
                width: "100%",
                borderRadius: "10px"
              }}
              center={[29.8833, -97.9414]} //  {[{venueData.latitude}, {venueData.longitude}]} center somewhere else??
              zoom={16}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[venueData.latitude, venueData.longitude]} icon={icon}>
                <Popup>
                  {venueData.name} <br /> Coordinates: {venueData.latitude}, {venueData.longitude}
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        
        </div>
        <div class="item3">
          <h4 style={{ color: 'black', fontSize: '20px', paddingBottom: '10px' }}> Opening Hours</h4>
          <div style={{ 'margin-left': '80px', textAlign: 'left', color: 'black', fontSize: '15px' }}>
            <div style={{ 'padding-bottom': '10px' }}>
              <span style={{ 'display': 'inline-block', 'width': '100px' }}>Monday:</span>{venueData.monday}
            </div>
            <div style={{ 'padding-bottom': '10px' }}>
              <span style={{ 'display': 'inline-block', 'width': '100px' }}>Tuesday:</span>{venueData.tuesday}
            </div>
            <div style={{ 'padding-bottom': '10px' }}>
              <span style={{ 'display': 'inline-block', 'width': '100px' }}>Wednesday:</span>{venueData.wednesday}
            </div>
            <div style={{ 'padding-bottom': '10px' }}>
              <span style={{ 'display': 'inline-block', 'width': '100px' }}>Thursday:</span>{venueData.thursday}
            </div>
            <div style={{ 'padding-bottom': '10px' }}>
              <span style={{ 'display': 'inline-block', 'width': '100px' }}>Friday:</span>{venueData.friday}
            </div>
            <div style={{ 'padding-bottom': '10px' }}>
              <span style={{ 'display': 'inline-block', 'width': '100px' }}>Saturday:</span>{venueData.saturday}
            </div>
            <div style={{ 'padding-bottom': '10px' }}>
              <span style={{ 'display': 'inline-block', 'width': '100px' }}>Sunday:</span>{venueData.sunday}
            </div>
          </div>
        </div>
        <div class="item4">
          <h4 style={{ color: '#000', fontSize: '20px' }}> Follow us on</h4>
          <div class="social-container">
            <a href={venueData.facebook} className="facebook social"><FontAwesomeIcon icon={faFacebook} size="1x" /></a>
            <a href={venueData.instagram} className="instagram social"><FontAwesomeIcon icon={faInstagram} size="1x" /></a>
            <a href={venueData.yelp} className="yelp social"><FontAwesomeIcon icon={faYelp} size="1x" /></a>
          </div>
          <span style={{ color: '#000', fontSize: '15px' }}>Or call us at {formattedPhoneNumber} <br />during our open hours.</span>
        </div>
        <div class="item5">
        <h4 style={{ color: 'black', fontSize: '20px', paddingBottom: '10px', paddingRight:'30px'}}> More Informations</h4>
        <div style={{textAlign: 'left', color: 'black', fontSize: '15px' }}>

        <div style={{ 'padding-bottom': '10px' }}>
              <span style={{ 'display': 'inline-block', 'width': '100px' }}>Price Range:</span>{venueData.price}
        </div>
        <div style={{ 'padding-bottom': '10px', display:'grid', gridTemplateColumns:'20% 80%'}}>
          <div class="item"><span style={{ 'display': 'inline-block', 'width': '100px' }}>Tags:</span></div>
          <div  class="item">
            <ul style={{textAlign:'left', columnCount: 2,}}>
            {Array.isArray(venueData.tags)
              ? venueData.tags.map((tag, index) => (
                <li key={index} style={{fontSize:'15px', color:'#747474', fontFamily:'Segoe UI', }}>&nbsp; #{tag} &nbsp; </li>
                ))
              : <li  style={{fontSize:'15px', color:'#747474', fontFamily:'Segoe UI', }}>No tags available</li>}
            </ul>
          </div>
        </div>

        <button  style={{ marginTop: '20px', float: 'left', textAlign: 'center', color: '#000', fontSize: '15px', backgroundColor: '#e24e99', marginBottom: '10px', cursor: 'pointer', }} 
                className="btn btn-primary"> Wrong information displayed?</button>
        <span style={{ color: '#000', fontSize: '15px' }}>Let the team know so we can adjust it accordingly!</span>
        </div>
        </div>
      </div>
    </div>
  </div>
);
};

export default Data;
