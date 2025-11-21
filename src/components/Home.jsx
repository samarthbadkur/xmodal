import React, { useRef, useEffect, useState } from 'react';

const XModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({ username: '', email: '', phone: '', dob: '' });
  const modalRef = useRef(null);

  useEffect(() => {
    const closeOnOutsideClick = (e) => {
      if (isOpen && modalRef.current && !modalRef.current.contains(e.target)) {
        setIsOpen(false);
        setForm({ username: '', email: '', phone: '', dob: '' });
      }
    };
    document.addEventListener('mousedown', closeOnOutsideClick);
    return () => document.removeEventListener('mousedown', closeOnOutsideClick);
  }, [isOpen]);

  const handleChange = (e) => setForm({ ...form, [e.target.id]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, email, phone, dob } = form;

    if (!username || !email || !phone || !dob) {
      // Native validation will show on required fields
      return;
    }

    if (!email.includes('@')) {
      alert('Invalid email. Please check your email address.');
      return;
    }
    if (!/^\d{10}$/.test(phone)) {
      alert('Invalid phone number. Please enter a 10-digit phone number.');
      return;
    }
    if (new Date(dob) > new Date()) {
      alert('Invalid date of birth. Date of birth cannot be in the future.');
      return;
    }
    // Close and reset
    setIsOpen(false);
    setForm({ username: '', email: '', phone: '', dob: '' });
  };

  return (
    <div className="modal" style={{ minHeight: '100vh', background: isOpen ? 'rgba(0,0,0,0.3)' : 'initial' }}>
      <h1 style={{ textAlign: 'center', marginTop: '2rem' }}>User Details Modal</h1>
      {!isOpen && (
        <div style={{ textAlign: 'center', margin: '2rem 0' }}>
          <button type="button" onClick={() => setIsOpen(true)}>
            Open Form
          </button>
        </div>
      )}
      {isOpen && (
        <div className="modal-content" ref={modalRef} style={{
          background: '#fff', padding: '2rem', borderRadius: '8px',
          width: '400px', margin: '5% auto', position: 'relative'
        }}>
          <form onSubmit={handleSubmit}>
            <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>Fill Details</h2>

            <div>
              <label htmlFor="username">Username:</label>
              <input id="username" value={form.username} onChange={handleChange} required />
            </div>
            <div>
              <label htmlFor="email">Email Address:</label>
              <input id="email" value={form.email} onChange={handleChange} required />
            </div>
            <div>
              <label htmlFor="phone">Phone Number:</label>
              <input id="phone" value={form.phone} onChange={handleChange} required />
            </div>
            <div>
              <label htmlFor="dob">Date of Birth:</label>
              <input id="dob" type="date" value={form.dob} onChange={handleChange} required />
            </div>

            <div style={{ textAlign: 'center', marginTop: '1rem' }}>
              <button type="submit" className="submit-button">Submit</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default XModal;
