import React, { useState } from 'react';
import { PaystackButton } from 'react-paystack';
import emailjs from '@emailjs/browser';
import './Prints.css';

const frames = [
  { id: 6, name: 'Wli Waterfalls | Volta Region', price: 2500, image: '/images/prints/wli.jpg' },
  { id: 2, name: 'Mount Adaklu | Volta Region', price: 2500, image: '/images/prints/adaklu.jpg' },
  { id: 3, name: 'Mount Wli | Volta Region', price: 2500, image: '/images/prints/3.jpg' },
  { id: 5, name: 'Boti Waterfall | Eastern Region', price: 2500, image: '/images/prints/5.jpg' },
  { id: 1, name: 'Mount Gemi | Volta Region', price: 2500, image: '/images/prints/1.jpg' },
];

const customPrints = [
  { 
    id: 'custom-1', 
    name: '5" x 7"', 
    price: 200, 
    image: '/images/prints/5_by_7/007A0729SIMPI26.jpg',
    images: [
      '/images/prints/5_by_7/007A0729SIMPI26.jpg',
      '/images/prints/5_by_7/007A0743SIMPI26.jpg',
      '/images/prints/5_by_7/007A0784SIMPI26.jpg',
      '/images/prints/5_by_7/007A0789SIMPI26.jpg'
    ],
    isCustom: true,
    size: '5" x 7"'
  },
  {
    id: 'custom-photobook',
    name: 'Photobook',
    price: 1000,
    image: '/images/prints/photobook.jpg',
    images: [
      '/images/prints/photobook.jpg'
    ],
    isCustom: true,
    isPhotobook: true,
    size: 'A4',
    sizes: [
      { name: 'A4', price: 1000 },
      { name: 'A3', price: 1500 }
    ]
  }
];

const Prints = () => {
  const [selectedFrame, setSelectedFrame] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const [selectedCustomSize, setSelectedCustomSize] = useState(null);
  const [formData, setFormData] = useState({
    size: '24x36',
    deliveryTime: '48h',
    deliveryMethod: 'delivery',
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  const calculateTotal = () => {
    if (!selectedFrame) return 0;
    
    // For custom prints, price is fixed per card size
    if (selectedFrame.isCustom) {
      if (selectedFrame.sizes && selectedCustomSize) {
        return selectedCustomSize.price;
      }
      return selectedFrame.price;
    }
    
    // Set base price by size for standard frames
    let total = 2500; // Base for 24x36
    if (formData.size === '30x40') {
      total = 3200;
    }
    
    return total;
  };

  const handleFrameClick = (frame) => {
    setSelectedFrame(frame);
    setActiveImageIndex(0);
    setOrderComplete(false);
    if (frame.isCustom && frame.sizes) {
      setSelectedCustomSize(frame.sizes[0]);
    } else {
      setSelectedCustomSize(null);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const sendEmail = (orderRef) => {
    const templateParams = {
      order_ref: orderRef,
      customer_name: formData.name,
      customer_email: formData.email,
      customer_phone: formData.phone,
      frame_name: selectedFrame.name,
      frame_size: selectedFrame.isCustom 
        ? (selectedCustomSize ? selectedCustomSize.name : selectedFrame.size) 
        : formData.size,
      delivery_method: formData.deliveryMethod,
      delivery_address: formData.address || 'N/A',
      total_amount: `GH₵${calculateTotal()}`,
    };

    emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID',
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID_PRINTS || 'YOUR_TEMPLATE_ID',
      templateParams,
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY'
    )
    .then((response) => {
      console.log('Email sent successfully!', response.status, response.text);
    }, (err) => {
      console.error('Failed to send email...', err);
    });
  };

  const config = {
    reference: (new Date()).getTime().toString(),
    email: formData.email,
    amount: calculateTotal() * 100, // Amount in pesewas
    publicKey: 'pk_test_a6978513a7d8178d623bf0ef2b75dd28cc98efb2',
    currency: 'GHS',
    text: 'PROCEED TO PAYMENT',
    onSuccess: (reference) => {
      setOrderDetails({
        reference: reference.reference,
        frame: selectedFrame.name,
        size: selectedFrame.isCustom 
          ? (selectedCustomSize ? selectedCustomSize.name : selectedFrame.size) 
          : formData.size,
        delivery: formData.deliveryMethod,
        total: calculateTotal(),
        isCustom: selectedFrame.isCustom || false,
        isPhotobook: selectedFrame.isPhotobook || false
      });
      sendEmail(reference.reference);
      setOrderComplete(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    onClose: () => console.log('Payment window closed'),
  };

  const isFormValid = formData.name && formData.email && formData.phone && (formData.deliveryMethod !== 'delivery' || formData.address);

  return (
    <section className="prints-page fade-in">
      <div className="container">
        {orderComplete ? (
          <div className="success-container fade-in">
            <div className="success-icon">✓</div>
            <h1 className="success-title">Payment Successful</h1>
            <p className="success-message-simpi">
              {orderDetails?.isPhotobook
                ? "Thank you for choosing Simpi Studios for your custom photobook. Our team will contact you shortly via phone and email to coordinate the collection of pictures for your photobook."
                : orderDetails?.isCustom 
                  ? "Thank you for choosing Simpi Studios for your custom masterpiece. Our team will contact you shortly via phone and email to receive your high-resolution picture and coordinate the printing & framing details."
                  : "Thank you for choosing Simpi Studios. We are truly honored to have our work grace your space. Our team is already preparing your frame with the utmost care and precision."}
            </p>
            
            <div className="order-summary">
              <h3>ORDER DETAILS</h3>
              <div className="summary-item">
                <span>ORDER REF:</span>
                <span>{orderDetails?.reference}</span>
              </div>
              <div className="summary-item">
                <span>FRAME / SIZE:</span>
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

            <p className="success-next-steps">
              {orderDetails?.isPhotobook
                ? "A confirmation email has been sent. Our team will reach out directly for the collection of pictures for the photobook."
                : orderDetails?.isCustom 
                  ? "A confirmation email has been sent. Our team will reach out directly to guide you on sending the high-res file." 
                  : "A confirmation email has been sent. We will contact you via phone shortly to coordinate delivery/pickup."}
            </p>
            
            <button className="return-btn" onClick={() => {
              setOrderComplete(false);
              setSelectedFrame(null);
              setActiveImageIndex(0);
            }}>RETURN TO COLLECTION</button>
          </div>
        ) : (
          <>
            {selectedFrame ? (
              <div className="checkout-container fade-in">
                <button className="back-btn" onClick={() => {
                  setSelectedFrame(null);
                  setActiveImageIndex(0);
                }}>← BACK TO COLLECTION</button>
                <div className="checkout-content">
                  <div className="checkout-image-container">
                    <div className="checkout-main-image">
                      <img 
                        src={selectedFrame.images ? selectedFrame.images[activeImageIndex] : selectedFrame.image} 
                        alt={selectedFrame.name} 
                      />
                    </div>
                    {selectedFrame.images && selectedFrame.images.length > 0 && (
                      <div className="checkout-thumbnails">
                        {selectedFrame.images.map((img, idx) => (
                          <div 
                            key={idx} 
                            className={`thumbnail-card ${activeImageIndex === idx ? 'active' : ''}`}
                            onClick={() => setActiveImageIndex(idx)}
                          >
                            <img src={img} alt={`Sample ${idx + 1}`} />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div className="checkout-form-container">
                    <h2>{selectedFrame.isPhotobook ? 'Custom Photobook' : selectedFrame.isCustom ? `${selectedFrame.name} Custom Fine Art Print` : selectedFrame.name}</h2>
                    <div className="price-display">
                      <p className="total-price">TOTAL: GH₵{calculateTotal()}</p>
                      <p className="price-note">
                        {selectedFrame.isPhotobook
                          ? "Our team will reach out directly to collect the pictures for your photobook."
                          : selectedFrame.isCustom 
                            ? "Our team will reach out directly to coordinate receiving your custom high-resolution picture." 
                            : "Price adjusts based on size and delivery time"}
                      </p>
                    </div>
                    
                    <form className="purchase-form" onSubmit={(e) => e.preventDefault()}>
                      <div className="form-section">
                        <h3>SELECT SIZE</h3>
                        {selectedFrame.isCustom ? (
                          selectedFrame.sizes ? (
                            <div className="radio-group">
                              {selectedFrame.sizes.map((sz) => (
                                <label key={sz.name}>
                                  <input 
                                    type="radio" 
                                    name="customSize" 
                                    value={sz.name} 
                                    checked={selectedCustomSize?.name === sz.name} 
                                    onChange={() => setSelectedCustomSize(sz)} 
                                  />
                                  <span>{sz.name} (GH₵{sz.price})</span>
                                </label>
                              ))}
                            </div>
                          ) : (
                            <div className="delivery-time-static">
                              <span>{selectedFrame.size}</span>
                            </div>
                          )
                        ) : (
                          <div className="radio-group">
                            <label>
                              <input type="radio" name="size" value="24x36" checked={formData.size === '24x36'} onChange={handleInputChange} />
                              <span>24" x 36"</span>
                            </label>
                            <label>
                              <input type="radio" name="size" value="30x40" checked={formData.size === '30x40'} onChange={handleInputChange} />
                              <span>30" x 40"</span>
                            </label>
                          </div>
                        )}
                      </div>

                      <div className="form-section">
                        <h3>DELIVERY TIME</h3>
                        <div className="delivery-time-static">
                          <span>{selectedFrame.isPhotobook ? '7 BUSINESS DAYS' : '48 HOURS (STANDARD)'}</span>
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
                            <span>STUDIO PICKUP (SIMPI STUDIOS)</span>
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

                      {isFormValid ? (
                        <PaystackButton {...config} className="payment-btn" />
                      ) : (
                        <button 
                          type="button" 
                          className="payment-btn"
                          onClick={() => alert('Please fill in all personal details first.')}
                        >
                          PROCEED TO PAYMENT
                        </button>
                      )}
                    </form>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="prints-header">
                  <h1 className="prints-title">Fine Art Prints</h1>
                  <p className="prints-subtitle">MUSEUM QUALITY FRAMES FOR YOUR SPACE</p>
                </div>

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

                {/* Custom Prints Grid Section */}
                <div className="custom-prints-section fade-in">
                  <div className="prints-header" style={{ marginTop: '5rem' }}>
                    <h1 className="prints-title">Custom Prints</h1>
                    <p className="prints-subtitle">YOUR MASTERPIECE, CUSTOM FRAMED</p>
                  </div>
                  <div className="frames-grid">
                    {customPrints.map((frame) => (
                      <div key={frame.id} className="frame-card" onClick={() => handleFrameClick(frame)}>
                        <div className="frame-image">
                          <img src={frame.image} alt={frame.name} />
                          <div className="frame-overlay">
                            <span>ORDER CUSTOM SIZES</span>
                          </div>
                        </div>
                        <div className="frame-info">
                          <h3>{frame.name}</h3>
                          <p>GH₵{frame.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Prints;
