import React, { useRef, useEffect, useState } from "react";

const XModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({
    username: "",
    email: "",
    phone: "",
    dob: "",
  });

  const modalContentRef = useRef(null);

  // Close modal when clicking outside modal-content
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        isOpen &&
        modalContentRef.current &&
        !modalContentRef.current.contains(e.target)
      ) {
        setIsOpen(false);
        setForm({ username: "", email: "", phone: "", dob: "" });
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, email, phone, dob } = form;
    if (!username || !email || !phone || !dob) {
      // browser required validation handles empty fields
      return;
    }
    if (!email.includes("@")) {
      alert("Invalid email. Please check your email address.");
      return;
    }
    if (!/^\d{10}$/.test(phone)) {
      alert("Invalid phone number. Please enter a 10-digit phone number.");
      return;
    }
    if (new Date(dob) > new Date()) {
      alert("Invalid date of birth. Date of birth cannot be in the future.");
      return;
    }
    // Successful, close & reset
    setIsOpen(false);
    setForm({ username: "", email: "", phone: "", dob: "" });
  };

  return (
    <div>
      <h1 style={{ textAlign: "center", marginTop: "2rem" }}>
        User Details Modal
      </h1>
      <div style={{ textAlign: "center", margin: "2rem 0" }}>
        {!isOpen && (
          <button type="button" onClick={() => setIsOpen(true)}>
            Open Form
          </button>
        )}
      </div>
      {isOpen && (
        <div
          className="modal"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.3)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            className="modal-content"
            ref={modalContentRef}
            style={{
              background: "#fff",
              padding: "2rem",
              borderRadius: "8px",
              width: "400px",
              boxShadow: "0 4px 32px rgba(0,0,0,0.18)",
              textAlign: "center",
            }}
          >
            <form onSubmit={handleSubmit}>
              <h2 style={{ marginBottom: "1rem" }}>Fill Details</h2>

              <div style={{ marginBottom: "1rem", textAlign: "left" }}>
                <label htmlFor="username">Username:</label>
                <input
                  id="username"
                  type="text"
                  value={form.username}
                  onChange={handleChange}
                  required
                  style={{
                    width: "100%",
                    marginTop: ".35rem",
                    padding: ".5rem",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                  }}
                />
              </div>
              <div style={{ marginBottom: "1rem", textAlign: "left" }}>
                <label htmlFor="email">Email Address:</label>
                <input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  style={{
                    width: "100%",
                    marginTop: ".35rem",
                    padding: ".5rem",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                  }}
                />
              </div>
              <div style={{ marginBottom: "1rem", textAlign: "left" }}>
                <label htmlFor="phone">Phone Number:</label>
                <input
                  id="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  pattern="\d{10}"
                  style={{
                    width: "100%",
                    marginTop: ".35rem",
                    padding: ".5rem",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                  }}
                />
              </div>
              <div style={{ marginBottom: "1rem", textAlign: "left" }}>
                <label htmlFor="dob">Date of Birth:</label>
                <input
                  id="dob"
                  type="date"
                  value={form.dob}
                  onChange={handleChange}
                  required
                  style={{
                    width: "100%",
                    marginTop: ".35rem",
                    padding: ".5rem",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                  }}
                />
              </div>
              <button
                type="submit"
                className="submit-button"
                style={{
                  background: "#1976d2",
                  color: "#fff",
                  padding: ".7rem 2.5rem",
                  border: "none",
                  borderRadius: "4px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  marginTop: "1rem",
                }}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default XModal;
