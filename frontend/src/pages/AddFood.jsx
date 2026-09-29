import React, { useState } from "react";
import { CheckCircle2, AlertCircle, ArrowLeft } from "lucide-react";
import { CATEGORIES, PHOTO_PRESETS } from "../data/initialFoods.js";

export default function AddFood({ onAddFood, onBackToPos }) {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "Starters",
    description: "",
    isVeg: true,
    spiceLevel: 1,
    prepTime: 15,
    image: PHOTO_PRESETS[0].url
  });

  const [errors, setErrors] = useState({});

  // Week 10: Form Validation
  const validate = () => {
    const newErrors = {};
    if (!formData.name || formData.name.trim().length < 3) {
      newErrors.name = "Dish name must be at least 3 characters long.";
    }
    if (!formData.price || Number(formData.price) <= 0 || Number(formData.price) > 25000) {
      newErrors.price = "Enter a valid price between ₹1 and ₹25,000.";
    }
    if (!formData.category) {
      newErrors.category = "Please select a valid category.";
    }
    if (!formData.description || formData.description.trim().length < 12) {
      newErrors.description = "Description must be at least 12 characters.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    await onAddFood({
      ...formData,
      name: formData.name.trim(),
      price: Number(formData.price),
      description: formData.description.trim(),
      available: true
    });
  };

  return (
    <div className="manager-page">
      <div className="page-header">
        <div>
          <h2>Add New Culinary Dish</h2>
          <p>Week 6 &amp; 10 Deliverable: Validated React Form connected to REST API</p>
        </div>
        <button type="button" className="btn-secondary" onClick={onBackToPos}>
          <ArrowLeft size={16} />
          <span>Back to POS Floor</span>
        </button>
      </div>

      <div className="form-preview-grid">
        {/* Validated Form Card */}
        <form className="editor-card" onSubmit={handleSubmit} noValidate>
          <div className="form-row-two">
            <div className="form-field">
              <label htmlFor="dishName">Dish Name *</label>
              <input
                id="dishName"
                type="text"
                placeholder="e.g., Smoked Duck Breast"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              {errors.name && (
                <span className="field-error">
                  <AlertCircle size={13} /> {errors.name}
                </span>
              )}
            </div>

            <div className="form-field">
              <label htmlFor="dishPrice">Price (₹) *</label>
              <input
                id="dishPrice"
                type="number"
                placeholder="e.g., 640"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              />
              {errors.price && (
                <span className="field-error">
                  <AlertCircle size={13} /> {errors.price}
                </span>
              )}
            </div>
          </div>

          <div className="form-row-two">
            <div className="form-field">
              <label htmlFor="dishCategory">Category *</label>
              <select
                id="dishCategory"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                {CATEGORIES.filter((c) => c !== "All").map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-field">
              <label>Dietary Classification</label>
              <div className="radio-pills">
                <button
                  type="button"
                  className={`type-pill ${formData.isVeg ? "active" : ""}`}
                  onClick={() => setFormData({ ...formData, isVeg: true })}
                >
                  ● Vegetarian
                </button>
                <button
                  type="button"
                  className={`type-pill ${!formData.isVeg ? "active" : ""}`}
                  onClick={() => setFormData({ ...formData, isVeg: false })}
                >
                  ▲ Non-Veg
                </button>
              </div>
            </div>
          </div>

          <div className="form-field">
            <label htmlFor="dishDesc">Culinary Description *</label>
            <textarea
              id="dishDesc"
              rows={3}
              placeholder="Describe tasting notes, key ingredients, and preparation method..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
            {errors.description && (
              <span className="field-error">
                <AlertCircle size={13} /> {errors.description}
              </span>
            )}
          </div>

          <div className="form-field">
            <label>Quick Curated Photography Presets</label>
            <div className="preset-pills">
              {PHOTO_PRESETS.map((preset) => (
                <button
                  key={preset.label}
                  type="button"
                  className={`preset-btn ${formData.image === preset.url ? "active" : ""}`}
                  onClick={() => setFormData({ ...formData, image: preset.url })}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          <button type="submit" className="btn-primary full-width">
            <CheckCircle2 size={17} />
            <span>Publish Dish to Menu</span>
          </button>
        </form>

        {/* Live Card Preview */}
        <div className="preview-panel">
          <span className="preview-badge">LIVE MENU CARD PREVIEW</span>
          <div className="food-card">
            <div className="food-img-wrap">
              <img src={formData.image} alt="Preview" />
              <span className="category-tag">{formData.category}</span>
            </div>
            <div className="food-card-body">
              <div className="food-title-row">
                <h3>{formData.name || "Untitled Signature Dish"}</h3>
                <span className="food-price">₹{formData.price || "0"}</span>
              </div>
              <p className="food-desc">
                {formData.description ||
                  "Your dish description and tasting notes will appear here as you type..."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
            }
