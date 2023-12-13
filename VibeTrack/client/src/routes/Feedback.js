import React, { useState } from 'react';
import { Chip } from "@material-ui/core";
import '../css/feedback.css';

function Feedback() {
  const [emailData, setEmailData] = useState({
    to: 'vibetracktxt@gmail.com',
    subject: 'Receipt: Feedback for VibeTrack',
    text: '',
  });

  const [values, setValues] = useState(["vibetracktxt@gmail.com"]);
  const [currentValue, setCurrentValue] = useState("");
  const [userName, setUserName] = useState("");
  const [satisfactionRating, setSatisfactionRating] = useState(3); // Default to a neutral rating

  const handleKeyUp = (e) => {
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

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
  };

  const handleFeedbackChange = (e) => {
    setEmailData({
      ...emailData,
      text: e.target.value,
    });
  };

  const handleSatisfactionChange = (e) => {
    setSatisfactionRating(parseInt(e.target.value, 10));
  };

  const handleEmailDelete = (item, index) => {
    let arr = [...values];
    arr.splice(index, 1);
    setValues(arr);
  };

  const sendEmail = () => {
    // Concatenate the user's name and satisfaction rating with emailData.text before sending
    const emailTextWithUserInfo = `${emailData.text}\n\nName: ${userName}\nSatisfaction Rating: ${satisfactionRating}`;

    // Removed the part related to selected venues
    fetch('http://localhost:5050/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...emailData,
        text: emailTextWithUserInfo,
      }),
    })
      .then((response) => response.text())
      .then((data) => {
        console.log('Email sent:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="feedback-component">
      <div className="intro-container" style={{ marginTop: "20px" }}>
        <h1 className="intro-title">Send us your feedback!</h1>
        <p className="intro-description">Here at VibeTrack, we value your feedback!</p>
        <p className="intro-description">Please let us know your thoughts so that we can improve our customer experience here.</p>
      </div>
      <div>
        <div style={{ paddingLeft: '20px', marginTop: '20px' }}>
          {values.map((item, index) => (
            <Chip size="small" onDelete={() => handleEmailDelete(item, index)} label={item} style={{ backgroundColor: '#747474', color: '#fff', marginRight: '10px' }} />
          ))}
        </div>
        <div className="grid-feedback" style={{ padding: '20px' }}>
          <div className="item">
            
          <div className="horizontal-radios">
              <label style= {{color:'#000'}}>Overall, how satisfied are you with the user experience here at VibeTrack? </label>
              {[1, 2, 3, 4, 5].map((rating) => (
                <label key={rating} style= {{color:'#000'}}>
                  <input
                    type="radio"
                    name="satisfaction"
                    value={rating}
                    checked={satisfactionRating === rating}
                    onChange={handleSatisfactionChange}
                    style= {{color:'#000'}}
                  />
                  {rating}
                </label>
              ))}
            </div>
            <textarea
              value={emailData.text}
              onChange={handleFeedbackChange}
              placeholder="Tell us how we can improve"
              className="feedback-textbox"
              style={{ borderRadius: "10px", fontSize:'15px',  fontFamily: 'Segoe UI', minHeight: "100px", width: "100%", resize: "vertical", marginTop: '10px', padding: '10px', background: '#fff', color: '#747474', border: '1px solid #747474', }}
            />
          </div>
          <div className="item" style={{'marginTop':'25px'}}>
          <input
              value={userName}
              onChange={handleUserNameChange}
              placeholder="Enter your name"
              type="text"
              name="name"
              className="feedback-input"
              style={{ borderRadius: "10px", height: "40px", marginBottom:'20px', fontSize:'15px',  fontFamily: 'Segoe UI',  background: '#fff', color: '#747474', border: '1px solid #747474', }}
            />
            <input
              value={currentValue}
              onChange={handleEmailChange}
              onKeyDown={handleKeyUp}
              placeholder="Enter email for receipt"
              type="text"
              name="to"
              className="feedback-input"
              style={{ borderRadius: "10px", height: "40px", fontSize:'15px',  fontFamily: 'Segoe UI',  background: '#fff', color: '#747474', border: '1px solid #747474', }}
            />
          </div>
        </div>
        <div style={{paddingBottom:'20px', paddingLeft:'10px', paddingRight:'10px'}}><button onClick={sendEmail} className="send-email-button" style={{ borderRadius: "10px", height: "40px", marginTop: '10px', backgroundColor:'#e24e99' }}>
              Submit your feedback
            </button></div>
        
        
      </div>
    </div>
  );
}

export default Feedback;
