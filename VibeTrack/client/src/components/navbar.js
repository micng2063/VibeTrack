import React from "react";
import NavSearch from "./navSearch.js";
import '../css/navbar.css';

export default function Navbar() {
 return (
   <div className="navbar-content" >
      <div class="navigation-bar" 
            style={{overflow: 'hidden',
            background: 'linear-gradient(42deg, rgba(2,0,36,1) 0%, rgba(42,42,103,1) 73%, rgba(226,100,172,1) 100%)'}}>
        <a href="/" 
          style={{float: 'left', color: '#f2f2f2', textAlign: 'center', padding: '14px 16px', fontFamily: 'Big Shoulders Text', fontSize: '1.5em', textTransform: 'uppercase', fontWeight: '300', justifyContent: 'right',}} class="split">
            <img src="https://i.imgur.com/KIpIJ7M.png" alt="Logo" loading="lazy" style={{ height:"30px"}} />
        </a>
        
        {/*eslint-disable-next-line*/} 
        <a style={{float: 'right', color: '#f2f2f2', textAlign: 'center', padding: '14px 16px', fontFamily: 'Big Shoulders Text', fontSize: '1.5em', textTransform: 'uppercase', fontWeight: '300', justifyContent: 'right',}}> <NavSearch/>
        </a>

        <a href="specialevent"
            style={{float: 'right', color: '#f2f2f2', textAlign: 'center', padding: '14px 16px', fontFamily: 'Big Shoulders Text', fontSize: '1.5em', textTransform: 'uppercase', fontWeight: '300', justifyContent: 'right',}}>
          Special Event</a>
        <a href="tripfinder"
            style={{float: 'right', color: '#f2f2f2', textAlign: 'center', padding: '14px 16px', fontFamily: 'Big Shoulders Text', fontSize: '1.5em', textTransform: 'uppercase', fontWeight: '300', justifyContent: 'right',}}>
          Trip Finder</a>
        <a href="invitation"
          style={{float: 'right', color: '#f2f2f2', textAlign: 'center', padding: '14px 16px', fontFamily: 'Big Shoulders Text', fontSize: '1.5em', textTransform: 'uppercase', fontWeight: '300', justifyContent: 'right',}}>
          Invitation
        </a>
        <a href="safety" 
          style={{float: 'right', color: '#f2f2f2', textAlign: 'center', padding: '14px 16px', fontFamily: 'Big Shoulders Text', fontSize: '1.5em', textTransform: 'uppercase', fontWeight: '300', justifyContent: 'right',}}>
          Safety
        </a>
        <a href="discover"
          style={{float: 'right', color: '#f2f2f2', textAlign: 'center', padding: '14px 16px', fontFamily: 'Big Shoulders Text', fontSize: '1.5em', textTransform: 'uppercase', fontWeight: '300', justifyContent: 'right',}}>
          Discover
        </a>
        
       
      </div>
    </div>
 );
}