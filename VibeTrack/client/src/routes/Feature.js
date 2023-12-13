import React from 'react';
import '../css/discover.css';

function Feature() {
    return (
        <div className="grid-feature">
            <div class="item">
            <ul>
                <li style={{ color: '#000000', paddingLeft: '50px', paddingBottom:'10px'}}><a href="/">Home</a></li>
                <li style={{ color: '#000000', paddingLeft: '50px', paddingBottom:'10px'}}><a href="/discover">Discover</a></li>
                <li style={{ color: '#000000', paddingLeft: '50px', paddingBottom:'10px'}}><a href="/data/:id">Data</a></li>
                <li style={{ color: '#000000', paddingLeft: '50px', paddingBottom:'10px'}}><a href="/specialevent">Special Event</a></li>
                <li style={{ color: '#000000', paddingLeft: '50px', paddingBottom:'10px'}}><a href="/calendar">Calendar</a></li>
                <li style={{ color: '#000000', paddingLeft: '50px', paddingBottom:'10px'}}><a href="/template">Template</a></li>
                <li style={{ color: '#000000', paddingLeft: '50px', paddingBottom:'10px'}}><a href="/search">Search</a></li>
                <li style={{ color: '#000000', paddingLeft: '50px', paddingBottom:'10px'}}><a href="/safety">Safety</a></li>
                <li style={{ color: '#000000', paddingLeft: '50px', paddingBottom:'10px'}}><a href="/invitation">Invitation</a></li>
            </ul>
            </div>

            <div class="item">
            <ul>
                <li style={{ color: '#000000', paddingLeft: '20px', paddingBottom:'10px'}}><a href="/login">Login</a></li>
                <li style={{ color: '#000000', paddingLeft: '20px', paddingBottom:'10px'}}><a href="/signup">Signup</a></li>
                <li style={{ color: '#000000', paddingLeft: '20px', paddingBottom:'10px'}}><a href="/profile">Profile</a></li>
                <li style={{ color: '#000000', paddingLeft: '20px', paddingBottom:'10px'}}><a href="/contact">Contact</a></li>
                <li style={{ color: '#000000', paddingLeft: '20px', paddingBottom:'10px'}}><a href="/userList">User List</a></li>
                <li style={{ color: '#000000', paddingLeft: '20px', paddingBottom:'10px'}}><a href="/security">Security</a></li>
                <li style={{ color: '#000000', paddingLeft: '20px', paddingBottom:'10px'}}><a href="/reset">Reset</a></li>
            </ul>
            </div>

            <div class="item">
            <ul>
                <li style={{ color: '#000000', paddingLeft: '20px', paddingBottom:'10px'}}><a href="/recordlist">Record List</a></li>
                <li style={{ color: '#000000', paddingLeft: '20px', paddingBottom:'10px'}}><a href="/edit/:id">Edit</a></li>
                <li style={{ color: '#000000', paddingLeft: '20px', paddingBottom:'10px'}}><a href="/favorites">Favorites</a></li>
                <li style={{ color: '#000000', paddingLeft: '20px', paddingBottom:'10px'}}><a href="/create">Create</a></li>
                <li style={{ color: '#000000', paddingLeft: '20px', paddingBottom:'10px'}}><a href="/rating/:id">Star Rating</a></li>
            </ul>
            </div>
        </div>
    );
};

export default Feature;
