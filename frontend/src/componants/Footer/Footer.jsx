import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets.js'
const Footer = () => {
    return (
        <div className='footer' id='footer'>
            <div className="footer-contents">
                <div className="footer-content-left">
                    <img src={assets.logo} alt="" />
                    <p>Order your favorite food here</p>
                    <div className="footer-social-icons">
                        <img src={assets.facebook_icon} alt="" />
                        <img src={assets.twitter_icon} alt="" />
                        <img src={assets.linkedin_icon} alt="" />
                    </div>
                </div>
                <div className="footer-content-center">
                    <h2>COMPANY</h2>
                    <ul>
                        <li>Home</li>
                        <li>About us</li>
                        <li>Delivery</li>
                        <li>Privacy Policy</li>
                    </ul>

                </div>
                <div className="footer-content-right">
                    <h2>Get in Touch</h2>
                    <ul>
                        <li>+91 9879879878</li>
                        <li>support@fooddelivery.com</li>
                    </ul>
                </div>
            </div>
            <hr />
            <p className="footer-copyright">Copyright 2026 © Food Delivery all rights reserved.</p>

        </div>
    )
}

export default Footer
