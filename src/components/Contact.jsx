import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error'

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    const templateParams = {
      customer_name: formData.name,
      customer_email: formData.email,
      message: formData.message
    };

    emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID',
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID_CONTACT || 'YOUR_TEMPLATE_ID_CONTACT',
      templateParams,
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY'
    )
    .then((response) => {
      console.log('Contact message sent successfully!', response.status, response.text);
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
    }, (err) => {
      console.error('Failed to send contact message...', err);
      setIsSubmitting(false);
      setSubmitStatus('error');
    });
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
              <p>NTHC Estate, Adjringanor</p>
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
            <button type="submit" className="submit-btn" disabled={isSubmitting}>
              {isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}
            </button>
            {submitStatus === 'success' && (
              <p className="submit-message success">Thank you! Your message has been sent successfully.</p>
            )}
            {submitStatus === 'error' && (
              <p className="submit-message error">Something went wrong. Please try again or email us directly.</p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
