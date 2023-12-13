import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { FaStar } from "react-icons/fa";
import '../css/home.css';
import { Link } from "react-router-dom";

export default function Home() {
  const [randomVenues, setRandomVenues] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getVenues = async () => {
      try {
        const response = await fetch('http://localhost:5050/record/');

        if (!response.ok) {
          const message = `An error occurred: ${response.statusText}`;
          window.alert(message);
          return;
        }

        const venueData = await response.json();
        const randomVenues = getRandomVenues(venueData, 3);
        setRandomVenues(randomVenues);
      } catch (error) {
        console.log('Error fetching venues from the database, ', error);
      }
    };

    getVenues();
  }, []);

  const getRandomVenues = (venues, count) => {
    const randomVenues = [];
    while (randomVenues.length < count && venues.length > 0) {
      const randomIndex = Math.floor(Math.random() * venues.length);
      randomVenues.push(venues.splice(randomIndex, 1)[0]);
    }
    return randomVenues;
  };

  const stars = Array(5).fill(0);   
  return (
    <div  style={{marginTop:"20px"}}>
      <div className="section-intro" style={{backgroundImage:'url(https://i.imgur.com/bQfI5Uz.png)', backgroundSize:'cover'}}>
        <img src="https://i.imgur.com/SoHE2tO.png" alt="Logo" loading="lazy" 
            style={{ height:"125px", borderRadius:'30px', boxShadow: '0 4px 8px rgba(255, 255, 255, 0.1)', animation: 'imageAnimation 2s infinite alternate'}} />
        <p className="section-subtitle" style={{color:'#fff'}}>Uncover places, discover world</p>
        <h2 className="h2 section-title" style={{color:'#fff'}}>VibeTrack</h2>

        <div className="row-flex" style={{ marginBottom: "10px" }}>
          <div className="link-wrapper">
            <Button variant="contained" onClick={() => navigate("/login")} style={{ backgroundColor: "#e24e99 " }}>Login</Button>
          </div>
          <div className="link-wrapper">
            <Button variant="contained" onClick={() => navigate("/signup")} style={{ backgroundColor: "#e24e99 " }}>Signup</Button>
          </div>
        </div>
      </div>

      <div className="container">
          <h2 className="h2 section-title">What we do</h2>
          <div className="about-project">
            <div className="item">
              <img src="https://i.imgur.com/al6ByNd.png" className="circle" alt="Placeholder" loading="lazy"/>
              <hr className="hr-style"/>
              <h3  style={{marginTop:'20px'}}>Search for Events</h3>
              <p className="section-text">Wondering what’s going on this weekend? We consistently curates a list of upcoming events in the San Marcos area.</p>
            </div>
            <div className="item">
              <img src="https://i.imgur.com/Em15dzc.jpg" className="circle" alt="Placeholder" loading="lazy"/>
              <hr className="hr-style"/>
              <h3  style={{marginTop:'20px'}}>Club Finder</h3>
              <p className="section-text">Not sure where to hang? Discover clubs nearby that cater to your preferences and make the shortest trip to get there! </p>  
            </div>
            <div className="item">
              <img src="https://i.imgur.com/6qmK0E2.png"  className="circle" alt="Placeholder" loading="lazy"/>
              <hr className="hr-style"/>
              <h3  style={{marginTop:'20px'}}>Alert & Invite </h3>
              <p className="section-text">Your safety is our top priority! Let friends, colleagues and family know where you're heading tonight with simple tap.</p>
              </div>
          </div>
      </div>
      
      <hr className="hr-style"/>
      <section className="popular" id="destination">
        <div className="container">
          <h2 className="h2 section-title">Discover venues</h2>
          <p className="section-text" style={{textAlign:'center'}} >Experience nightlife in San Marcos, TX. Enjoy live music, late-night restaurants, bars, and dog-friendly outdoor decks. There's always something going on around you! </p>

          <ul className="popular-list" >
            {randomVenues.map((venue, index) => (
              <li key={index}>
                <div className="popular-card">
                  <figure className="card-img">
                    <img src={venue.image} alt={venue.name} loading="lazy" />
                  </figure>

                  <div className="card-content" >
                  <div className="card-rating">
                        <p style={{color:'#747474'}}>{venue.price}</p>
                      {stars.map((value, index) => {
                        const decimalPart = venue.rating - Math.floor(venue.rating);
                        const roundUpThreshold = 0.5;
                        const roundedRating = decimalPart > roundUpThreshold ? Math.ceil(venue.rating) : Math.floor(venue.rating);

                        return (
                          <FaStar
                            key={index}
                            size={15}
                            color={index < roundedRating ? '#FFBA5A' : '#a9a9a9'}
                          />
                        );
                      })}
                    </div>

                    <p className="card-subtitle">{venue.address}</p>
                    <h3 className="h3 card-title"><Link to={`/data/${venue._id}`}>{venue.name}</Link></h3>

                    <p className="card-text">{venue.description}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul></div>
      </section>
      <hr className="hr-style"/>
      <div className="container">
          
          <div className="about-something">
            <div class="item">
            <h2 className="h2 section-title">Find the venue that is right for you </h2>
              <ul className="section-text" style={{textAlign:'left', paddingLeft:'30px', paddingRight:'30px',  fontFamily:'Segoe UI'}}>
                <li style={{ marginBottom: '10px' }}>✦ Discover nearby clubs that cater to your preferences  </li>
                <li style={{ marginBottom: '10px' }}>✦ Filter by venue type, features and price range</li>
                <li style={{ marginBottom: '10px' }}>✦ Invite your friends to come and join the fun</li>
              </ul>
              
              <Link to="/discover">
              <Button  style={{ backgroundColor: "#e24e99", color:'#fff', fontFamily:'Segoe UI' }}>Discover</Button>
              </Link>
              </div>
            
            <div class="item">
            <img src="https://i.imgur.com/L04j96J.png" alt="Discover" loading="lazy" style={{width:'50vw',animation: 'slideFromRight 2s ease-in-out forwards',}}/>
          </div>
          </div>
      </div>
      <hr className="hr-style"/>
      <div className="container">
          
          <div className="about-something">
            <div class="item">
              <img src="https://i.imgur.com/uEFSurf.png" alt="Special Event" loading="lazy" style={{width:'50vw',animation: 'slideFromLeft 2s ease-in-out forwards',}}/>
            </div>
            <div class="item">
            <h2 className="h2 section-title">Search for Special Event</h2>
              <ul className="section-text" style={{textAlign:'left', paddingLeft:'30px', paddingRight:'50px',  fontFamily:'Segoe UI'}}>
                <li style={{ marginBottom: '10px' }}>✦ Consisttently update upcoming special events such as live music, standup comedy, etc.  </li>
                <li style={{ marginBottom: '10px' }}>✦ Checkout what's happening around San Marcos this weekend</li>
                <li style={{ marginBottom: '10px' }}>✦ Set it off and make it a night to remember</li>
              </ul>
              
              <Link to="/specialevent">
              <Button  style={{ backgroundColor: "#e24e99", color:'#fff', fontFamily:'Segoe UI' }}>Special Event</Button>
              </Link>
              </div>
          </div>
      </div>

      <hr className="hr-style"/>
      <div className="container">
          
          <div className="about-something">
            <div class="item">
            <h2 className="h2 section-title">Hit the Road with TripFinder </h2>
              <ul className="section-text" style={{textAlign:'left', paddingLeft:'30px', paddingRight:'30px',  fontFamily:'Segoe UI'}}>
                <li style={{ marginBottom: '10px' }}>✦ Plan your party schedule ahead of time  </li>
                <li style={{ marginBottom: '10px' }}>✦ Search for clubs and venues that are closest to you</li>
                <li style={{ marginBottom: '10px' }}>✦ Find the shortest trip to your destination</li>
              </ul>
              
              <Link to="/search">
              <Button  style={{ backgroundColor: "#e24e99", color:'#fff', fontFamily:'Segoe UI' }}>Trip Finder</Button>
              </Link>
              </div>
            
            <div class="item">
            <img src="https://i.imgur.com/fcSjozN.png" alt="TripFinder" loading="lazy" style={{width:'50vw',animation: 'slideFromRight 2s ease-in-out forwards',}}/>
          </div>
          </div>
      </div>
    </div>
  );
}
