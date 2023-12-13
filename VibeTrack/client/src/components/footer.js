import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope, faComment } from "@fortawesome/free-solid-svg-icons";
import '../css/footer.css';

export default function Footer() {
    return (
        <div className="footer-component">
            
		<div className="Box" style={{background:  'linear-gradient(42deg, rgba(2,0,36,1) 0%, rgba(42,42,103,1) 53%, rgba(226,100,172,1) 100%)',  bottom: '0', paddingTop:'20px', overflow: 'hidden'}}>
			<h1 style={{textAlign: "center",paddingBottom: "20px", fontFamily:'Segoe UI', fontSize:'20px'}}>Uncover places, discover world!</h1>
			<div className="FooterContainer" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', maxWidth: '1550px', margin: '0 auto', fontFamily: 'Segoe UI', fontSize: '10px', paddingRight: '20px', paddingLeft: '20px' }}>
				<div className="Row" style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gridGap: '20px'}}>
					<div className="Column" style={{ display: 'flex', flexDirection: 'column', textAlign: 'left', fontFamily: 'Segoe UI', lineHeight: '0.85' }}>
						<p className="Heading"style={{ fontSize: '17px', color: '#fff', marginBottom: '20px', paddingBottom: '10px', fontWeight: 'bold', fontFamily: 'Segoe UI', borderBottom: '1px solid #fff' }} >Leave Us a Message</p>
						<a href="/feedback" className="FooterLink" style={{color: '#fff', marginBottom: '20px',  fontSize: '15px', fontFamily:'Segoe UI'}}>
							and we will get back to you as soon as possible.</a>
                        <a href="/feedback" className="FooterLink" style={{color: '#fff', marginBottom: '20px',  fontSize: '15px', fontFamily:'Segoe UI'}}>
							<button className="btn btn-primary" style={{fontSize:'12px', backgroundColor: "#e24e99 ", borderRadius:'15px',}}>Leave us a message</button></a>
					</div>
					<div className="Column" style={{ display: 'flex', flexDirection: 'column', textAlign: 'left', fontFamily: 'Segoe UI', lineHeight: '0.85' }}>
						<p className="Heading" style={{ fontSize: '17px', color: '#fff', marginBottom: '20px', paddingBottom: '10px', fontWeight: 'bold', fontFamily: 'Segoe UI', borderBottom: '1px solid #fff' }} >Supervisors</p>
						<p className="FooterLink" style={{color: '#fff', marginBottom: '20px',  fontSize: '15px', fontFamily:'Segoe UI'}}>
							Instructor: Dr. Ted Lehr</p>
						<p className="FooterLink" style={{color: '#fff', marginBottom: '20px',  fontSize: '15px', fontFamily:'Segoe UI'}}>
							D.I.Assistant: Mirna Elizondo</p>
						<p className="FooterLink" style={{color: '#fff', marginBottom: '20px',  fontSize: '15px', fontFamily:'Segoe UI'}}>
							Grader: Sarah Davidson</p>
					</div>
					<div className="Column" style={{ display: 'flex', flexDirection: 'column', textAlign: 'left', fontFamily: 'Segoe UI', lineHeight: '0.85' }}>
						<p className="Heading" style={{ fontSize: '17px', color: '#fff', marginBottom: '20px', paddingBottom: '10px', fontWeight: 'bold', fontFamily: 'Segoe UI', borderBottom: '1px solid #fff' }} >About Us</p>
						<p className="FooterLink" style={{color: '#fff', marginBottom: '20px',  fontSize: '15px', fontFamily:'Segoe UI'}}>
							Meet the Team</p>
						<p className="FooterLink" style={{color: '#fff', marginBottom: '20px',  fontSize: '15px', fontFamily:'Segoe UI'}}>
							Our vision</p>
						<p className="FooterLink" style={{color: '#fff', marginBottom: '20px',  fontSize: '15px', fontFamily:'Segoe UI'}}>
							Help & FAQ</p>

					</div>
					<div className="Column" style={{ display: 'flex', flexDirection: 'column', textAlign: 'left', fontFamily: 'Segoe UI', lineHeight: '0.85' }}>
						<p className="Heading" style={{ fontSize: '17px', color: '#fff', marginBottom: '20px', paddingBottom: '10px', fontWeight: 'bold', fontFamily: 'Segoe UI', borderBottom: '1px solid #fff' }} >Contact</p>
						<p className="FooterLink" style={{color: '#fff', marginBottom: '20px',  fontSize: '15px', fontFamily:'Segoe UI'}}>
                        <FontAwesomeIcon icon={faPhone} size="1x" style={{paddingRight:'5px'}}/>(512) 245-2111</p>
						<p href="/" className="FooterLink" style={{color: '#fff', marginBottom: '20px',  fontSize: '15px', fontFamily:'Segoe UI'}}>
                        <FontAwesomeIcon icon={faEnvelope} size="1x" style={{paddingRight:'5px'}}/>vibetracktxt@gmail.com</p>
						<p href="/" className="FooterLink" style={{color: '#fff', marginBottom: '20px',  fontSize: '15px', fontFamily:'Segoe UI'}}>
                        <FontAwesomeIcon  icon={faComment} size="1x" style={{paddingRight:'5px'}}/> 601 University Dr, San Marcos, TX 78666</p>
					</div>
				</div>
			</div>
            <p className="Disclaimer" style={{marginBottom: '20px', fontFamily:'Segoe UI',  fontSize: '15px', borderTop: '1px solid #fff', paddingTop:'10px',   textAlign: 'center'}}>Copyright © 2023 Vibetrack · Terms · Privacy Policy · Contact Us</p>
		</div>
        </div>
	);
}
