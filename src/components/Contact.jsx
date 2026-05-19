import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const subject = encodeURIComponent(`Inquiry from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\n` +
      `Email: ${formData.email}\n\n` +
      `Message:\n${formData.message}`
    );

    window.location.href = `mailto:simpidominic@gmail.com?subject=${subject}&body=${body}`;
  };

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
              <p>simpidominic@gmail.com</p>
            </div>
            <div className="info-item">
              <h3>PHONE</h3>
              <p>+233 20 766 9921</p>
            </div>
            <div className="info-item">
              <h3>STUDIO</h3>
              <p>Simpi Studios</p>
              <p>Accra, Ghana</p>
              <p>Available for Travel Worldwide</p>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input 
                type="text" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                placeholder="YOUR NAME" 
                required 
              />
            </div>
            <div className="form-group">
              <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                placeholder="YOUR EMAIL" 
                required 
              />
            </div>
            <div className="form-group">
              <textarea 
                name="message" 
                value={formData.message} 
                onChange={handleChange} 
                placeholder="HOW CAN WE HELP?" 
                rows="5" 
                required
              ></textarea>
            </div>
            <button type="submit" className="submit-btn">SEND MESSAGE</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
