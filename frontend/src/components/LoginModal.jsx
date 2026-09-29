import React, { useState } from "react";
import { ShieldCheck, X, AlertCircle } from "lucide-react";

export default function LoginModal({ isOpen, onClose, onSuccess }) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Default Manager PIN is 1234
    if (pin.trim() === "1234") {
      setPin("");
      setError("");
      onSuccess();
    } else {
      setError("Invalid Manager PIN. Use demo PIN: 1234");
    }
  };

  return (
    <div className="modal-backdrop no-print">
      <div className="modal-card">
        <div className="modal-header">
          <div className="modal-title-group">
            <ShieldCheck size={22} className="text-terracotta" />
            <h3>Manager Role Authentication</h3>
          </div>
          <button type="button" className="icon-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <p className="modal-desc">
          Adding, editing, or deleting menu items is restricted to authorized restaurant managers.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="managerPin">Enter 4-Digit Manager PIN</label>
            <input
              id="managerPin"
              type="password"
              maxLength={4}
              placeholder="••••"
              value={pin}
              onChange={(e) => {
                setPin(e.target.value);
                setError("");
              }}
              className="pin-input"
              autoFocus
            />
            <span className="pin-hint">Demo Evaluation PIN: <strong>1234</strong></span>
          </div>

          {error && (
            <div className="form-error-banner">
              <AlertCircle size={15} />
              <span>{error}</span>
            </div>
          )}

          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Unlock Manager Access
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
