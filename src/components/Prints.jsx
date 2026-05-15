import React, { useState } from 'react';
import { usePaystackPayment } from 'react-paystack';
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
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
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
    if (formData.deliveryTime === '48h') total += 100;
    
    return total;
  };

  const handleFrameClick = (frame) => {
    setSelectedFrame(frame);
    setOrderComplete(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const config = {
    reference: (new Date()).getTime().toString(),
    email: formData.email,
    amount: calculateTotal() * 100, // Amount in pesewas
    publicKey: 'pk_test_a6978513a7d8178d623bf0ef2b75dd28cc98efb2', // User's public key
    currency: 'GHS',
  };

  const onSuccess = (reference) => {
    setOrderDetails({
      reference: reference.reference,
      frame: selectedFrame.name,
      size: formData.size,
      delivery: formData.deliveryMethod,
      total: calculateTotal()
    });
    setOrderComplete(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const onClose = () => {
    console.log('Payment window closed');
  };

  const initializePayment = usePaystackPayment(config);

  return (
    <section className="prints-page fade-in">
      <div className="container">
        {orderComplete ? (
          <div className="success-container fade-in">
            <div className="success-icon">✓</div>
            <h1 className="success-title">Payment Successful</h1>
            <p className="success-message-simpi">"Thank you for choosing Simpi Studios. We are truly honored to have our work grace your space. Our team is already preparing your frame with the utmost care and precision."</p>
            
            <div className="order-summary">
              <h3>ORDER DETAILS</h3>
              <div className="summary-item">
                <span>ORDER REF:</span>
                <span>{orderDetails?.reference}</span>
              </div>
              <div className="summary-item">
                <span>FRAME:</span>
                <span>{orderDetails?.frame}</span>
              </div>
              <div className="summary-item">
                <span>SIZE:</span>
                <span>{orderDetails?.size}</span>
              </div>
              <div className="summary-item">
                <span>COLLECTION:</span>
                <span>{orderDetails?.delivery.toUpperCase()}</span>
              </div>
              <div className="summary-total">
                <span>TOTAL PAID:</span>
                <span>GH₵{orderDetails?.total}</span>
              </div>
            </div>

            <p className="success-next-steps">A confirmation email has been sent. We will contact you via phone shortly to coordinate delivery/pickup.</p>
            
            <button className="return-btn" onClick={() => {
              setOrderComplete(false);
              setSelectedFrame(null);
            }}>RETURN TO COLLECTION</button>
          </div>
        ) : (
          <>
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
                    
                    <form className="purchase-form">
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

                      <button 
                        type="button" 
                        className="payment-btn"
                        onClick={() => {
                          if (!formData.name || !formData.email || !formData.phone || (formData.deliveryMethod === 'delivery' && !formData.address)) {
                            alert('Please fill in all personal details first.');
                            return;
                          }
                          initializePayment(onSuccess, onClose);
                        }}
                      >
                        PROCEED TO PAYMENT
                      </button>
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
          </>
        )}
      </div>
    </section>
  );
};

export default Prints;
