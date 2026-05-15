import React, { useState } from 'react';
import './Prints.css';

const frames = [
  { id: 1, name: 'CLASSIC BLACK OAK', price: 1500, image: '/images/prints/1.jpg' },
  { id: 2, name: 'MINIMAL WHITE MAPLE', price: 1800, image: '/images/prints/2.jpg' },
  { id: 3, name: 'NATURAL WALNUT', price: 2200, image: '/images/prints/3.jpg' },
  { id: 4, name: 'VINTAGE GOLD LEAF', price: 2500, image: '/images/prints/4.jpg' },
  { id: 5, name: 'MODERN BRUSHED STEEL', price: 2000, image: '/images/prints/5.jpg' },
];

const Prints = () => {
  const [selectedFrame, setSelectedFrame] = useState(null);
  const [formData, setFormData] = useState({
    size: '12x18',
    deliveryTime: '72h',
    deliveryMethod: 'delivery',
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  const calculateTotal = () => {
    if (!selectedFrame) return 0;
    let total = selectedFrame.price;
    
    // Size multiplier
    if (formData.size === '18x24') total += 500;
    if (formData.size === '24x36') total += 1000;
    
    // Express duration fee
    if (formData.deliveryTime === '48h') total += 300;
    
    return total;
  };

  const handleFrameClick = (frame) => {
    setSelectedFrame(frame);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you for your order! Total amount: GH₵${calculateTotal()}. We will contact you shortly for payment details.`);
    setSelectedFrame(null);
  };

  return (
    <section className="prints-page fade-in">
      <div className="container">
        <div className="prints-header">
          <h1 className="prints-title">Fine Art Prints</h1>
          <p className="prints-subtitle">MUSEUM QUALITY FRAMES FOR YOUR SPACE</p>
        </div>

        {selectedFrame ? (
          <div className="checkout-container fade-in">
            <button className="back-btn" onClick={() => setSelectedFrame(null)}>← BACK TO COLLECTION</button>
            <div className="checkout-content">
              <div className="checkout-image">
                <img src={selectedFrame.image} alt={selectedFrame.name} />
              </div>
              <div className="checkout-form-container">
                <h2>{selectedFrame.name}</h2>
                <div className="price-display">
                  <p className="total-price">TOTAL: GH₵{calculateTotal()}</p>
                  <p className="price-note">Price adjusts based on size and delivery time</p>
                </div>
                
                <form onSubmit={handleSubmit} className="purchase-form">
                  <div className="form-section">
                    <h3>SELECT SIZE</h3>
                    <div className="radio-group">
                      <label>
                        <input type="radio" name="size" value="12x18" checked={formData.size === '12x18'} onChange={handleInputChange} />
                        <span>12" x 18"</span>
                      </label>
                      <label>
                        <input type="radio" name="size" value="18x24" checked={formData.size === '18x24'} onChange={handleInputChange} />
                        <span>18" x 24"</span>
                      </label>
                      <label>
                        <input type="radio" name="size" value="24x36" checked={formData.size === '24x36'} onChange={handleInputChange} />
                        <span>24" x 36"</span>
                      </label>
                    </div>
                  </div>

                  <div className="form-section">
                    <h3>DELIVERY TIME</h3>
                    <div className="radio-group">
                      <label>
                        <input type="radio" name="deliveryTime" value="48h" checked={formData.deliveryTime === '48h'} onChange={handleInputChange} />
                        <span>48 HOURS (EXPRESS)</span>
                      </label>
                      <label>
                        <input type="radio" name="deliveryTime" value="72h" checked={formData.deliveryTime === '72h'} onChange={handleInputChange} />
                        <span>72 HOURS (STANDARD)</span>
                      </label>
                    </div>
                  </div>

                  <div className="form-section">
                    <h3>COLLECTION METHOD</h3>
                    <div className="radio-group">
                      <label>
                        <input type="radio" name="deliveryMethod" value="delivery" checked={formData.deliveryMethod === 'delivery'} onChange={handleInputChange} />
                        <span>HOME DELIVERY</span>
                      </label>
                      <label>
                        <input type="radio" name="deliveryMethod" value="pickup" checked={formData.deliveryMethod === 'pickup'} onChange={handleInputChange} />
                        <span>STUDIO PICKUP (ACCRA)</span>
                      </label>
                    </div>
                    {formData.deliveryMethod === 'delivery' && (
                      <p className="delivery-notice">Note: Delivery fee is calculated based on location and paid by the client upon receipt.</p>
                    )}
                  </div>

                  <div className="form-section">
                    <h3>PERSONAL DETAILS</h3>
                    <div className="input-group">
                      <input type="text" name="name" placeholder="FULL NAME" required onChange={handleInputChange} />
                      <input type="email" name="email" placeholder="EMAIL ADDRESS" required onChange={handleInputChange} />
                      <input type="tel" name="phone" placeholder="PHONE NUMBER" required onChange={handleInputChange} />
                      {formData.deliveryMethod === 'delivery' && (
                        <input type="text" name="address" placeholder="DELIVERY ADDRESS" required onChange={handleInputChange} />
                      )}
                    </div>
                  </div>

                  <button type="submit" className="payment-btn">PROCEED TO PAYMENT</button>
                </form>
              </div>
            </div>
          </div>
        ) : (
          <div className="frames-grid fade-in">
            {frames.map((frame) => (
              <div key={frame.id} className="frame-card" onClick={() => handleFrameClick(frame)}>
                <div className="frame-image">
                  <img src={frame.image} alt={frame.name} />
                  <div className="frame-overlay">
                    <span>SELECT FRAME</span>
                  </div>
                </div>
                <div className="frame-info">
                  <h3>{frame.name}</h3>
                  <p>FROM GH₵{frame.price}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Prints;
