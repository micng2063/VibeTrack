import React from "react";
import '../css/footer.css';

export default function Footer() {
    return (
        <div className="footer-component">
            
		<div className="Box" style={{background:  'linear-gradient(42deg, rgba(2,0,36,1) 0%, rgba(42,42,103,1) 53%, rgba(226,100,172,1) 100%)',  bottom: '0', paddingTop:'20px', overflow: 'hidden'}}>
            <p className="Disclaimer" style={{marginBottom: '20px', fontFamily:'Segoe UI',  fontSize: '15px', border:'1px solid rgba(255, 255, 255, 0)',  textAlign: 'center'}}>Copyright © 2023 Vibetrack · Terms · Privacy Policy · Contact Us</p>
		</div>
        </div>
	);
}
