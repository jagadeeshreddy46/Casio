
import React, { useState } from 'react';
import './Account.css';

const Account = () => {
  const [user, setUser] = useState({
    name: 'Jagadeeswarreddy',
    email: 'jagadeeshreddy@gmail.com',
  });

  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ ...user });
  const [savedMessage, setSavedMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setUser(form);
    setEditing(false);
    setSavedMessage('Profile updated successfully!');

    setTimeout(() => setSavedMessage(''), 3000); 
  };

  return (
    <div className="account-page">
      <div className="account-container">
        <h1>Account Settings</h1>

        <div className="account-form">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            {editing ? (
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
              />
            ) : (
              <p className="info-text">{user.name}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            {editing ? (
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
              />
            ) : (
              <p className="info-text">{user.email}</p>
            )}
          </div>

          {savedMessage && <div className="saved-message">{savedMessage}</div>}

          <div className="button-group">
            {editing ? (
              <>
                <button className="btn primary" onClick={handleSave}>
                  Save
                </button>
                <button className="btn secondary" onClick={() => setEditing(false)}>
                  Cancel
                </button>
              </>
            ) : (
              <button className="btn primary" onClick={() => setEditing(true)}>
                Edit Profile
              </button>
            )}
            <button className="btn logout">Logout</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
