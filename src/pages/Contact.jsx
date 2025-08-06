import React, { useState } from 'react';
import './contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => { 
    setFormData({ ...formData, [e.target.name]: e.target.value }); 
    if (errors[e.target.name]) {
      setErrors(prev => ({ ...prev, [e.target.name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Please enter your name';
    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.message.trim()) newErrors.message = 'Please enter your message';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSuccess(true);
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="contact">
      <div className="contact__container">
        <h1 className="contact__title">Contact Us</h1>
        <p className="contact__subtitle">Have questions or feedback? We’d love to hear from you.</p>

        {success && (
          <div className="success-toast">
            ✅ Message sent successfully! We will get back to you soon.
          </div>
        )}

        <div className="contact__grid">
          <form className="contact__form" onSubmit={handleSubmit}>
            <label>
              Name
              <input 
                type="text" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                className={errors.name ? 'error-field' : ''} 
              />
              {errors.name && <span className="error-msg">{errors.name}</span>}
            </label>

            <label>
              Email
              <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                className={errors.email ? 'error-field' : ''} 
              />
              {errors.email && <span className="error-msg">{errors.email}</span>}
            </label>

            <label>
              Message
              <textarea 
                name="message" 
                rows="5" 
                value={formData.message} 
                onChange={handleChange} 
                className={errors.message ? 'error-field' : ''} 
              />
              {errors.message && <span className="error-msg">{errors.message}</span>}
            </label>

            <button type="submit">Send Message</button>
          </form>

          <div className="contact__info">
            <h2>Our Office</h2>
            <p>123 Furniture Street, New York, NY 10001</p>
            <h2>Call Us</h2>
            <p>+1 (555) 123-4567</p>
            <h2>Email Us</h2>
            <p>info@furnishco.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
