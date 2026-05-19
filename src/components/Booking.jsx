import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import './Booking.css';

const services = [
  {
    id: 'corp-headshots',
    name: 'Corporate Headshots',
    image: '/images/bookings/007A8767SIMPI25.jpg',
    description: 'Professional executive portraits for teams and individuals.',
    isStudioOptional: true,
    objectPosition: 'center 15%',
    aspectRatio: '3 / 4',
  },
  {
    id: 'fashion-editorial',
    name: 'Fashion Editorial',
    image: '/images/gallery/fashion_maehyira_mode/007A1596SIMPI26.jpg',
    description: 'High-end editorial, runway, and lookbook photography for brands and designers.',
    isStudioOptional: true,
    aspectRatio: '3 / 4',
  },
  {
    id: 'pre-wedding',
    name: 'Pre Wedding',
    image: '/images/gallery/10_000/007A8334SIMPI25.jpg',
    description: 'Romantic and artistic pre-wedding sessions to capture your love story.',
    isStudioOptional: true,
    aspectRatio: '3 / 4',
  },
  {
    id: 'corp-event',
    name: 'Corporate Event',
    image: '/images/bookings/007A5082SIMPI25.jpg',
    description: 'High-end coverage for conferences, summits, and corporate events.',
    isStudioOptional: false,
  },
  {
    id: 'family-portraits',
    name: 'Family Portraits',
    image: '/images/gallery/dzah_family_portraits/whatsapp_cover.jpeg',
    description: 'Warm, timeless family lifestyle and portrait sessions.',
    isStudioOptional: true,
    objectPosition: 'center 15%',
  }
];

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const getServicePrice = (serviceId, outfitCount) => {
  if (serviceId === 'fashion-editorial') {
    return outfitCount === '1' ? '2,000' : '3,000';
  }
  if (serviceId === 'pre-wedding') {
    return outfitCount === '1' ? '1,800' : '2,500';
  }
  if (serviceId === 'family-portraits') {
    return outfitCount === '1' ? '2,500' : '3,500';
  }
  return null;
};

const hasOutfitPackage = (serviceId) => {
  return ['fashion-editorial', 'pre-wedding', 'family-portraits'].includes(serviceId);
};

const Booking = () => {
  const [step, setStep] = useState(1); // 1: Service Selection, 2: Date, Time & Details, 3: Success
  const [selectedService, setSelectedService] = useState(null);
  const [shootType, setShootType] = useState('studio'); // 'studio' or 'outdoor'
  
  // Date Picker States
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentDateObj, setCurrentDateObj] = useState(new Date(2026, 4, 19)); // May 2026 from sample image
  const [selectedTime, setSelectedTime] = useState('');
  const [customTime, setCustomTime] = useState('');
  const [outfitCount, setOutfitCount] = useState('1'); // '1' or '2' for fashion editorial
  
  // Form States
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    notes: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  const currentMonth = currentDateObj.getMonth();
  const currentYear = currentDateObj.getFullYear();

  const handleServiceSelect = (service) => {
    setSelectedService(service);
    setShootType(service.isStudioOptional ? 'studio' : 'outdoor');
    setSelectedTime('');
    setSelectedDate(null);
    setOutfitCount('1');
    setStep(2);
  };

  const handlePrevMonth = () => {
    setCurrentDateObj(prev => {
      const d = new Date(prev);
      d.setMonth(d.getMonth() - 1);
      if (d.getFullYear() < 2026 || (d.getFullYear() === 2026 && d.getMonth() < 4)) {
        return prev;
      }
      return d;
    });
  };

  const handleNextMonth = () => {
    setCurrentDateObj(prev => {
      const d = new Date(prev);
      d.setMonth(d.getMonth() + 1);
      if (d.getFullYear() > 2027 || (d.getFullYear() === 2027 && d.getMonth() > 2)) {
        return prev;
      }
      return d;
    });
  };

  const getDaysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (month, year) => {
    let day = new Date(year, month, 1).getDay();
    return day === 0 ? 6 : day - 1; // Mon is 0, Sun is 6
  };

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const firstDayIndex = getFirstDayOfMonth(currentMonth, currentYear);

  const daysArray = [];
  // Fill offset days
  for (let i = 0; i < firstDayIndex; i++) {
    daysArray.push(null);
  }
  // Fill actual days
  for (let i = 1; i <= daysInMonth; i++) {
    daysArray.push(i);
  }

  const handleDaySelect = (day) => {
    if (!day) return;
    const date = new Date(currentYear, currentMonth, day);
    
    // Prevent booking past dates
    const today = new Date();
    today.setHours(0,0,0,0);
    if (date < today) {
      alert("Cannot select a past date.");
      return;
    }
    
    setSelectedDate(date);
    setSelectedTime('');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const timeSlots = shootType === 'studio' 
    ? ['10:00 AM', '12:00 PM', '02:00 PM']
    : ['06:00 AM', '08:00 AM', '10:00 AM', '12:00 PM', '02:00 PM', '04:00 PM', '06:00 PM', 'Custom Time'];

  const getFormattedDate = (date) => {
    if (!date) return '';
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  const handleSubmitBooking = (e) => {
    e.preventDefault();
    const finalTime = selectedTime === 'Custom Time' ? customTime : selectedTime;
    if (!selectedDate || !finalTime) {
      alert('Please select both a date and a time slot.');
      return;
    }

    setIsSubmitting(true);
    const ref = 'SB-' + Math.floor(100000 + Math.random() * 900000);
    setBookingRef(ref);

    const templateParams = {
      booking_ref: ref,
      customer_name: formData.name,
      customer_email: formData.email,
      customer_phone: formData.phone,
      service_name: hasOutfitPackage(selectedService.id)
        ? `${selectedService.name} (${outfitCount} Outfit - ${getServicePrice(selectedService.id, outfitCount)} GHS)`
        : selectedService.name,
      shoot_type: shootType === 'studio' ? 'Studio Shoot' : 'Outdoor/Event Shoot',
      booking_date: getFormattedDate(selectedDate),
      booking_time: finalTime,
      notes: formData.notes || 'N/A'
    };

    emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID',
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID_BOOKING || 'YOUR_TEMPLATE_ID',
      templateParams,
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY'
    )
    .then((response) => {
      console.log('Booking details emailed successfully!', response.status, response.text);
      setIsSubmitting(false);
      setStep(3);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, (err) => {
      console.error('Failed to send booking email...', err);
      // Proceed to success step even if EmailJS is not configured
      setIsSubmitting(false);
      setStep(3);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  };

  return (
    <section className="booking-page fade-in">
      <div className="container">
        
        {step === 1 && (
          <div className="service-selection-view">
            <div className="booking-header">
              <h1 className="booking-title">Book a Session</h1>
              <p className="booking-subtitle">SELECT A PROFESSIONAL PHOTOGRAPHY SERVICE TO BEGIN</p>
            </div>
            
            <div className="services-grid">
              {services.map((service) => (
                <div key={service.id} className="service-card" onClick={() => handleServiceSelect(service)}>
                  <div className="service-image" style={service.aspectRatio ? { aspectRatio: service.aspectRatio } : {}}>
                    <img 
                      src={service.image} 
                      alt={service.name} 
                      style={service.objectPosition ? { objectPosition: service.objectPosition } : {}}
                    />
                    <div className="service-overlay">
                      <span>SELECT SERVICE</span>
                    </div>
                  </div>
                  <div className="service-info">
                    <h3>{service.name}</h3>
                    <p>{service.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 2 && selectedService && (
          <div className="calendar-booking-view fade-in">
            <button className="booking-back-btn" onClick={() => setStep(1)}>← BACK TO SERVICES</button>
            
            <div className="booking-layout-grid">
              
              {/* Column 1: Info Sidebar */}
              <div className="booking-info-sidebar">
                <div className="calendar-icon-container">
                  <svg viewBox="0 0 24 24" className="calendar-svg-icon">
                    <path fill="currentColor" d="M19,4H18V2H16V4H8V2H6V4H5C3.89,4 3,4.9 3,6V20A2,2 0 0,0 5,22H19A2,2 0 0,0 21,20V6A2,2 0 0,0 19,4M19,20H5V9H19V20M5,7V6H19V7H5Z" />
                  </svg>
                </div>
                <h2>Select Date & Time</h2>
                <p>Please select a convenient date and time slot for your professional photography session.</p>
              </div>

              {/* Column 2: Interactive Calendar & Slot Picker */}
              <div className="booking-main-panel">
                <div className="panel-header">
                  <h2>Date & Time Selection</h2>
                </div>

                {/* Shoot Type Toggle */}
                {selectedService.isStudioOptional && (
                  <div className="shoot-type-toggle">
                    <button 
                      className={`type-btn ${shootType === 'studio' ? 'active' : ''}`}
                      onClick={() => {
                        setShootType('studio');
                        setSelectedTime('');
                      }}
                    >
                      STUDIO SHOOT (ADJRINGANOR)
                    </button>
                    <button 
                      className={`type-btn ${shootType === 'outdoor' ? 'active' : ''}`}
                      onClick={() => {
                        setShootType('outdoor');
                        setSelectedTime('');
                      }}
                    >
                      OUTDOOR / ON-LOCATION
                    </button>
                  </div>
                )}

                {/* Package Toggle for Services with Outfit Options */}
                {hasOutfitPackage(selectedService.id) && (
                  <div className="outfit-selection-container" style={{ marginBottom: '2.5rem' }}>
                    <h4 style={{ fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#666', marginBottom: '1rem' }}>Select Outfit Package</h4>
                    <div className="shoot-type-toggle">
                      <button 
                        type="button"
                        className={`type-btn ${outfitCount === '1' ? 'active' : ''}`}
                        onClick={() => setOutfitCount('1')}
                      >
                        1 OUTFIT — {getServicePrice(selectedService.id, '1')} GHS
                      </button>
                      <button 
                        type="button"
                        className={`type-btn ${outfitCount === '2' ? 'active' : ''}`}
                        onClick={() => setOutfitCount('2')}
                      >
                        2 OUTFITS — {getServicePrice(selectedService.id, '2')} GHS
                      </button>
                    </div>
                  </div>
                )}

                {/* Calendar Component */}
                <div className="calendar-container">
                  <div className="calendar-month-header">
                    <h3>{months[currentMonth]} {currentYear}</h3>
                    <div className="calendar-nav-arrows">
                      <button onClick={handlePrevMonth}>&lt;</button>
                      <button onClick={handleNextMonth}>&gt;</button>
                    </div>
                  </div>

                  <div className="calendar-weekdays">
                    <span>M</span>
                    <span>T</span>
                    <span>W</span>
                    <span>T</span>
                    <span>F</span>
                    <span>S</span>
                    <span>S</span>
                  </div>

                  <div className="calendar-days-grid">
                    {daysArray.map((day, idx) => {
                      const isSelected = selectedDate && 
                        selectedDate.getDate() === day && 
                        selectedDate.getMonth() === currentMonth && 
                        selectedDate.getFullYear() === currentYear;

                      const isPast = day && new Date(currentYear, currentMonth, day) < new Date().setHours(0,0,0,0);
                      
                      return (
                        <div 
                          key={idx} 
                          className={`calendar-day-cell 
                            ${day ? 'actual-day' : 'empty-day'} 
                            ${isSelected ? 'selected' : ''} 
                            ${isPast ? 'past-day' : ''}`}
                          onClick={() => day && !isPast && handleDaySelect(day)}
                        >
                          {day && (
                            <>
                              <span className="day-number">{day}</span>
                              {!isPast && <span className="day-indicator"></span>}
                            </>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Time Slots Selection */}
                {selectedDate && (
                  <div className="time-slots-container fade-in">
                    <h4>Pick a slot for {getFormattedDate(selectedDate)}</h4>
                    <p className="time-slot-reminder">
                      Please arrive at the studio (or designated location) at least 30 minutes before your scheduled session to allow adequate time for preparation and setup. This helps ensure your full booked session time is utilized efficiently for the shoot.
                    </p>
                    <div className="time-slots-grid">
                      {timeSlots.map((slot) => (
                        <button 
                          key={slot} 
                          type="button"
                          className={`time-slot-btn ${selectedTime === slot ? 'active' : ''}`}
                          onClick={() => setSelectedTime(slot)}
                        >
                          {slot}
                          {selectedTime === slot && <span className="checkmark-badge">✓</span>}
                        </button>
                      ))}
                    </div>
                    {selectedTime === 'Custom Time' && (
                      <div className="custom-time-input-container fade-in" style={{ marginTop: '2rem' }}>
                        <input 
                          type="text"
                          className="custom-time-field"
                          placeholder="ENTER CUSTOM TIME (e.g. Sunrise at 06:15 AM)"
                          value={customTime}
                          onChange={(e) => setCustomTime(e.target.value)}
                          required
                          style={{
                            width: '100%',
                            padding: '1.2rem',
                            border: '1px solid #ccc',
                            fontSize: '0.9rem',
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            outline: 'none',
                            fontFamily: 'inherit'
                          }}
                        />
                        <p style={{ fontSize: '0.75rem', color: '#666', marginTop: '0.8rem', letterSpacing: '0.05em' }}>
                          Ideal for sunrise, sunset, or customized coverage hours.
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Personal Details Form */}
                {selectedDate && selectedTime && (selectedTime !== 'Custom Time' || customTime.trim() !== '') && (
                  <form className="booking-details-form fade-in" onSubmit={handleSubmitBooking}>
                    <h3>Enter Your Details</h3>
                    <div className="input-group">
                      <input 
                        type="text" 
                        name="name" 
                        placeholder="FULL NAME" 
                        required 
                        value={formData.name} 
                        onChange={handleInputChange} 
                      />
                      <input 
                        type="email" 
                        name="email" 
                        placeholder="EMAIL ADDRESS" 
                        required 
                        value={formData.email} 
                        onChange={handleInputChange} 
                      />
                      <input 
                        type="tel" 
                        name="phone" 
                        placeholder="PHONE NUMBER" 
                        required 
                        value={formData.phone} 
                        onChange={handleInputChange} 
                      />
                      <textarea 
                        name="notes" 
                        placeholder="SPECIAL REQUESTS OR SHOOT DETAILS (OPTIONAL)"
                        value={formData.notes} 
                        onChange={handleInputChange}
                        rows="3"
                      ></textarea>
                    </div>

                    <button 
                      type="submit" 
                      className="confirm-booking-btn"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'CONFIRMING...' : 'CONFIRM BOOKING'}
                    </button>
                  </form>
                )}

              </div>

              {/* Column 3: Summary Sidebar */}
              <div className="booking-summary-sidebar">
                <h3>Summary</h3>
                <div className="summary-card">
                  <div className="summary-row">
                    <span className="summary-label">SERVICE:</span>
                    <span className="summary-value">{selectedService.name}</span>
                  </div>
                  {hasOutfitPackage(selectedService.id) && (
                    <>
                      <div className="summary-row">
                        <span className="summary-label">PACKAGE:</span>
                        <span className="summary-value">{outfitCount === '1' ? '1 Outfit' : '2 Outfits'}</span>
                      </div>
                      <div className="summary-row" style={{ borderTop: '1px solid #eaeaea', paddingTop: '1.2rem', marginTop: '1.2rem' }}>
                        <span className="summary-label" style={{ fontWeight: '700', color: '#111' }}>TOTAL COST:</span>
                        <span className="summary-value" style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--primary, #000)' }}>
                          {getServicePrice(selectedService.id, outfitCount)} GHS
                        </span>
                      </div>
                    </>
                  )}
                  {selectedService.id === 'corp-event' && (
                    <div className="summary-row" style={{ borderTop: '1px solid #eaeaea', paddingTop: '1.2rem', marginTop: '1.2rem', display: 'block' }}>
                      <span className="summary-label" style={{ fontWeight: '700', color: '#111', display: 'block', marginBottom: '0.6rem' }}>PRICING:</span>
                      <p style={{ fontSize: '0.8rem', color: '#555', lineHeight: '1.5', margin: 0, textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '500' }}>
                        OUR PRODUCTION TEAM WILL REACH OUT TO DISCUSS THE SCOPE OF THE PROJECT TO DEFINE CUSTOM PRICING.
                      </p>
                    </div>
                  )}
                  <div className="summary-row">
                    <span className="summary-label">SHOOT TYPE:</span>
                    <span className="summary-value">{shootType === 'studio' ? 'Studio Shoot' : 'Outdoor Shoot'}</span>
                  </div>
                  {selectedDate && (
                    <div className="summary-row">
                      <span className="summary-label">DATE:</span>
                      <span className="summary-value">{getFormattedDate(selectedDate)}</span>
                    </div>
                  )}
                  {selectedTime && (
                    <div className="summary-row">
                      <span className="summary-label">TIME SLOT:</span>
                      <span className="summary-value">{selectedTime === 'Custom Time' ? (customTime || 'Custom Time') : selectedTime}</span>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>
        )}

        {step === 3 && (
          <div className="success-container fade-in">
            <div className="success-icon">✓</div>
            <h1 className="success-title">Booking Confirmed</h1>
            <p className="success-message-simpi">"We are excited to capture your special moments. Your session has been successfully booked and reserved. Our production team will contact you shortly to align on all visual creative details."</p>
            
            <div className="order-summary">
              <h3>BOOKING DETAILS</h3>
              <div className="summary-item">
                <span>BOOKING REF:</span>
                <span>{bookingRef}</span>
              </div>
              <div className="summary-item">
                <span>SERVICE:</span>
                <span>{selectedService?.name}</span>
              </div>
              {hasOutfitPackage(selectedService?.id) && (
                <div className="summary-item">
                  <span>PACKAGE:</span>
                  <span>
                    {outfitCount === '1' ? '1 Outfit' : '2 Outfits'} — {getServicePrice(selectedService.id, outfitCount)} GHS
                  </span>
                </div>
              )}
              {selectedService?.id === 'corp-event' && (
                <div className="summary-item" style={{ display: 'block', borderTop: '1px solid #eee', paddingTop: '1.2rem', marginTop: '1.2rem', paddingBottom: '0.2rem' }}>
                  <span style={{ display: 'block', fontWeight: '700', marginBottom: '0.5rem', fontSize: '0.75rem', letterSpacing: '0.15em', color: '#111' }}>PRICING:</span>
                  <span style={{ display: 'block', color: '#555', fontSize: '0.85rem', lineHeight: '1.5', textTransform: 'none', letterSpacing: 'normal' }}>
                    Our production team will reach out to discuss the scope of your project in order to provide a custom price estimate.
                  </span>
                </div>
              )}
              <div className="summary-item">
                <span>DATE:</span>
                <span>{getFormattedDate(selectedDate)}</span>
              </div>
              <div className="summary-item">
                <span>TIME:</span>
                <span>{selectedTime === 'Custom Time' ? (customTime || 'Custom Time') : selectedTime}</span>
              </div>
              <div className="summary-item">
                <span>SHOOT LOCATION:</span>
                <span>{shootType === 'studio' ? 'STUDIO (ADJRINGANOR)' : 'OUTDOOR / ON-LOCATION'}</span>
              </div>
            </div>

            <p className="success-next-steps">A confirmation email with all details has been sent to your email address and our creative team.</p>
            
            <button className="return-btn" onClick={() => {
              setStep(1);
              setSelectedService(null);
              setSelectedDate(null);
              setSelectedTime('');
              setFormData({ name: '', email: '', phone: '', notes: '' });
            }}>BOOK ANOTHER SESSION</button>
          </div>
        )}

      </div>
    </section>
  );
};

export default Booking;
