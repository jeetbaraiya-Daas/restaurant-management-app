import React, { useState } from "react";
import { Plus, Minus, Trash2, Printer, Sparkles, Receipt } from "lucide-react";

export default function Bill({
  cartItems,
  onIncrement,
  onDecrement,
  onClearOrder,
  onCheckoutBill
}) {
  const [customerName, setCustomerName] = useState("Walk-in Guest");
  const [tableNo, setTableNo] = useState("T-04");
  const [orderType, setOrderType] = useState("Dine-In");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [invoiceNo] = useState(() => `INV-${Math.floor(100000 + Math.random() * 900000)}`);

  // Week 9: Calculate Subtotal, Discount, GST (5%), and Grand Total
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const taxableAmount = Math.max(0, subtotal - discountAmount);
  const cgst = +(taxableAmount * 0.025).toFixed(2);
  const sgst = +(taxableAmount * 0.025).toFixed(2);
  const taxAmount = +(cgst + sgst).toFixed(2);
  const grandTotal = Math.round(taxableAmount + taxAmount);

  const handlePrintPdf = () => {
    window.print();
  };

  const handleFireOrder = () => {
    if (cartItems.length === 0) return;
    onCheckoutBill({
      invoiceNo,
      customerName,
      tableNo,
      orderType,
      subtotal,
      discountAmount,
      taxAmount,
      grandTotal,
      items: cartItems
    });
  };

  return (
    <aside className="bill-sidebar">
      <div className="thermal-receipt">
        <div className="sawtooth-top no-print" />

        {/* Receipt Header */}
        <div className="receipt-header">
          <div className="receipt-title-row">
            <Receipt size={18} />
            <h2>L&apos;ATELIER CULINAIRE</h2>
          </div>
          <p className="receipt-address">14 Artisan Lane • GSTIN: 27AABCU9603R1ZM</p>
          <div className="receipt-meta-bar">
            <span>{invoiceNo}</span>
            <span>{new Date().toLocaleDateString("en-IN")}</span>
          </div>
        </div>

        {/* Guest & Table Controls */}
        <div className="receipt-guest-controls no-print">
          <div className="guest-row">
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Guest Name"
              className="receipt-input"
            />
            <select
              value={tableNo}
              onChange={(e) => setTableNo(e.target.value)}
              className="receipt-select"
            >
              <option value="T-01">Table T-01</option>
              <option value="T-02">Table T-02</option>
              <option value="T-04">Table T-04</option>
              <option value="T-07">Table T-07</option>
              <option value="VIP-1">VIP Booth 1</option>
            </select>
          </div>

          <div className="order-type-pills">
            {["Dine-In", "Takeaway", "Room Service"].map((type) => (
              <button
                key={type}
                type="button"
                className={`type-pill ${orderType === type ? "active" : ""}`}
                onClick={() => setOrderType(type)}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Print-only metadata */}
        <div className="print-only-meta">
          <p>Guest: {customerName} | {tableNo} ({orderType})</p>
        </div>

        <div className="receipt-divider" />

        {/* Selected Line Items */}
        <div className="receipt-items">
          {cartItems.length === 0 ? (
            <div className="empty-receipt">
              <p className="empty-title">No dishes selected yet</p>
              <p className="empty-sub">
                Use the <strong>+</strong> and <strong>-</strong> buttons on any food card to build a customer bill.
              </p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="receipt-line">
                <div className="line-info">
                  <span className="line-name">{item.name}</span>
                  <span className="line-unit">
                    ₹{item.price} × {item.qty}
                  </span>
                </div>

                <div className="line-controls">
                  <div className="mini-stepper no-print">
                    <button
                      type="button"
                      onClick={() => onDecrement(item.id)}
                      aria-label="Decrease quantity"
                    >
                      <Minus size={12} />
                    </button>
                    <span>{item.qty}</span>
                    <button
                      type="button"
                      onClick={() => onIncrement(item.id)}
                      aria-label="Increase quantity"
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                  <span className="line-total">₹{(item.price * item.qty).toFixed(2)}</span>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="receipt-divider" />

        {/* Discount Selector */}
        {cartItems.length > 0 && (
          <div className="discount-row no-print">
            <span>Apply Discount:</span>
            <div className="discount-pills">
              {[0, 5, 10, 15].map((pct) => (
                <button
                  key={pct}
                  type="button"
                  className={`disc-pill ${discountPercent === pct ? "active" : ""}`}
                  onClick={() => setDiscountPercent(pct)}
                >
                  {pct}%
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Bill Breakdown Totals */}
        <div className="receipt-totals">
          <div className="total-row">
            <span>Subtotal ({cartItems.reduce((s, i) => s + i.qty, 0)} items)</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>
          {discountAmount > 0 && (
            <div className="total-row discount-text">
              <span>Privilege Discount ({discountPercent}%)</span>
              <span>-₹{discountAmount.toFixed(2)}</span>
            </div>
          )}
          <div className="total-row">
            <span>CGST (2.5%)</span>
            <span>₹{cgst.toFixed(2)}</span>
          </div>
          <div className="total-row">
            <span>SGST (2.5%)</span>
            <span>₹{sgst.toFixed(2)}</span>
          </div>
          <div className="total-row grand-total-row">
            <span>GRAND TOTAL</span>
            <span>₹{grandTotal.toFixed(2)}</span>
          </div>
        </div>

        {/* Action Buttons (Week 9 & Extra Add-On PDF Print) */}
        <div className="receipt-actions no-print">
          <button
            type="button"
            className="btn-primary full-width"
            disabled={cartItems.length === 0}
            onClick={handleFireOrder}
          >
            <Sparkles size={16} />
            <span>Generate Bill &amp; Send KOT</span>
          </button>

          <div className="secondary-receipt-btns">
            <button
              type="button"
              className="btn-outline"
              disabled={cartItems.length === 0}
              onClick={handlePrintPdf}
            >
              <Printer size={15} />
              <span>Print / Save PDF</span>
            </button>

            <button
              type="button"
              className="btn-danger-ghost"
              disabled={cartItems.length === 0}
              onClick={onClearOrder}
            >
              <Trash2 size={15} />
              <span>Clear</span>
            </button>
          </div>
        </div>

        <p className="receipt-footer-note">
          Thank you for dining at L&apos;Atelier Culinaire!
        </p>
        <div className="sawtooth-bottom no-print" />
      </div>
    </aside>
  );
}
