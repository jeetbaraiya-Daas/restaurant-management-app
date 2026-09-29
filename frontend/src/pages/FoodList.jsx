import React, { useState } from "react";
import { Search, Filter, Plus, Minus, Flame } from "lucide-react";
import { CATEGORIES } from "../data/initialFoods.js";

export default function FoodList({
  foods,
  quantities,
  onIncrement,
  onDecrement
}) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [dietFilter, setDietFilter] = useState("All"); // All | Veg | Non-Veg

  // Filter foods by category, search query, and dietary preference
  const filteredFoods = foods.filter((food) => {
    const matchesCategory =
      selectedCategory === "All" || food.category === selectedCategory;
    const matchesSearch =
      food.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      food.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDiet =
      dietFilter === "All" ||
      (dietFilter === "Veg" && food.isVeg) ||
      (dietFilter === "Non-Veg" && !food.isVeg);

    return matchesCategory && matchesSearch && matchesDiet;
  });

  return (
    <section className="menu-floor">
      {/* Search + Category Dropdown Filter Bar (Extra Add-on) */}
      <div className="filter-bar no-print">
        <div className="search-box">
          <Search size={17} className="search-icon" />
          <input
            type="text"
            placeholder="Search dishes, ingredients, truffle, pasta..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="filter-controls">
          {/* Extra Add-On: Category-wise filter with Dropdown */}
          <div className="dropdown-wrapper">
            <Filter size={15} />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              aria-label="Filter by category"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === "All" ? "All Categories" : cat}
                </option>
              ))}
            </select>
          </div>

          {/* Dietary Quick Filter */}
          <div className="diet-toggle">
            {["All", "Veg", "Non-Veg"].map((mode) => (
              <button
                key={mode}
                type="button"
                className={`diet-btn ${dietFilter === mode ? "active" : ""}`}
                onClick={() => setDietFilter(mode)}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Horizontal Category Pills (Week 8) */}
      <div className="category-pills no-print">
        {CATEGORIES.map((cat) => {
          const count =
            cat === "All"
              ? foods.length
              : foods.filter((f) => f.category === cat).length;
          return (
            <button
              key={cat}
              type="button"
              className={`cat-pill ${selectedCategory === cat ? "active" : ""}`}
              onClick={() => setSelectedCategory(cat)}
            >
              <span>{cat}</span>
              <span className="cat-count">{count}</span>
            </button>
          );
        })}
      </div>

      {/* Food Cards Grid */}
      {filteredFoods.length === 0 ? (
        <div className="empty-floor-card">
          <h3>No matching dishes found</h3>
          <p>Try clearing your search filter or switching categories.</p>
          <button
            type="button"
            className="btn-secondary"
            onClick={() => {
              setSelectedCategory("All");
              setSearchQuery("");
              setDietFilter("All");
            }}
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="food-grid">
          {filteredFoods.map((food) => {
            const qty = quantities[food.id] || 0;
            return (
              <article
                key={food.id}
                className={`food-card ${qty > 0 ? "selected-card" : ""}`}
              >
                <div className="food-img-wrap">
                  <img
                    src={food.image}
                    alt={food.name}
                    loading="lazy"
                    onError={(e) => {
                      e.target.src =
                        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80";
                    }}
                  />
                  <span className="category-tag">{food.category}</span>
                  <span
                    className={`diet-indicator ${food.isVeg ? "veg" : "non-veg"}`}
                    title={food.isVeg ? "Vegetarian" : "Non-Vegetarian"}
                  >
                    <span className="diet-dot" />
                  </span>
                </div>

                <div className="food-card-body">
                  <div className="food-title-row">
                    <h3>{food.name}</h3>
                    <span className="food-price">₹{food.price}</span>
                  </div>

                  <p className="food-desc">{food.description}</p>

                  <div className="food-card-footer">
                    <div className="food-meta">
                      <span>⏱ {food.prepTime || 15}m</span>
                      {food.spiceLevel > 0 && (
                        <span className="spice-tag">
                          <Flame size={13} />
                          {food.spiceLevel === 1 ? "Mild" : "Medium"}
                        </span>
                      )}
                    </div>

                    {/* Week 8 Deliverable: + and - Buttons for Quantity Control */}
                    <div className="qty-stepper">
                      <button
                        type="button"
                        className="step-btn"
                        onClick={() => onDecrement(food.id)}
                        disabled={qty === 0}
                        aria-label={`Decrease quantity of ${food.name}`}
                      >
                        <Minus size={14} />
                      </button>
                      <span className="qty-val">{qty}</span>
                      <button
                        type="button"
                        className="step-btn plus"
                        onClick={() => onIncrement(food.id)}
                        aria-label={`Increase quantity of ${food.name}`}
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
