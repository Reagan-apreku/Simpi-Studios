import React from 'react';
import './Contact.css';

const Contact = () => {
  return (
    <section className="contact-page fade-in">
      <div className="container">
        <div className="contact-header">
          <h1 className="contact-title">Let's Connect</h1>
          <p className="contact-subtitle">WE'D LOVE TO HEAR FROM YOU</p>
        </div>

        <div className="contact-content">
          <div className="contact-info">
            <div className="info-item">
              <h3>INQUIRIES</h3>
              <p>info@simpistudios.com</p>
            </div>
            <div className="info-item">
              <h3>PHONE</h3>
              <p>+233 XX XXX XXXX</p>
            </div>
            <div className="info-item">
              <h3>STUDIO</h3>
              <p>Accra, Ghana</p>
              <p>Available for Travel Worldwide</p>
            </div>
          </div>

          <form className="contact-form">
            <div className="form-group">
              <input type="text" placeholder="YOUR NAME" required />
            </div>
            <div className="form-group">
              <input type="email" placeholder="YOUR EMAIL" required />
            </div>
            <div className="form-group">
              <textarea placeholder="HOW CAN WE HELP?" rows="5" required></textarea>
            </div>
            <button type="submit" className="submit-btn">SEND MESSAGE</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
