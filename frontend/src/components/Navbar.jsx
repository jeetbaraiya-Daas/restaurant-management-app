import React from "react";
import { ChefHat, Lock, Unlock, Plus, Utensils, Edit3, Wifi } from "lucide-react";

export default function Navbar({
  activePage,
  setActivePage,
  isManager,
  onOpenLogin,
  onLogoutManager,
  totalMenuCount,
  lastSocketEvent
}) {
  const handleProtectedNav = (targetPage) => {
    if (!isManager) {
      onOpenLogin(targetPage);
    } else {
      setActivePage(targetPage);
    }
  };

  return (
    <header className="navbar no-print">
      <div className="navbar-inner">
        {/* Brand Identity */}
        <div className="brand" onClick={() => setActivePage("pos")}>
          <div className="brand-icon">
            <ChefHat size={22} />
          </div>
          <div>
            <div className="brand-title-row">
              <h1 className="brand-title">L&apos;Atelier Culinaire</h1>
              <span className="live-pill" title="Socket.io Real-Time Channel Active">
                <Wifi size={12} /> LIVE POS
              </span>
            </div>
            <p className="brand-subtitle">
              Restaurant Management &amp; Billing Terminal • {totalMenuCount} Dishes
              {lastSocketEvent ? ` • ${lastSocketEvent}` : ""}
            </p>
          </div>
        </div>

        {/* Navigation Tabs (Week 6 Pages: FoodList, AddFood, EditFood) */}
        <nav className="nav-tabs">
          <button
            type="button"
            className={`nav-tab ${activePage === "pos" ? "active" : ""}`}
            onClick={() => setActivePage("pos")}
          >
            <Utensils size={16} />
            <span>Menu &amp; POS Floor</span>
          </button>

          <button
            type="button"
            className={`nav-tab ${activePage === "add" ? "active" : ""}`}
            onClick={() => handleProtectedNav("add")}
          >
            <Plus size={16} />
            <span>Add Food</span>
            {!isManager && <Lock size={12} className="tab-lock" />}
          </button>

          <button
            type="button"
            className={`nav-tab ${activePage === "manage" ? "active" : ""}`}
            onClick={() => handleProtectedNav("manage")}
          >
            <Edit3 size={16} />
            <span>Manage &amp; Edit Menu</span>
            {!isManager && <Lock size={12} className="tab-lock" />}
          </button>
        </nav>

        {/* Role-Based Manager Access Button (Extra Add-on) */}
        <div className="nav-actions">
          {isManager ? (
            <button
              type="button"
              className="role-btn unlocked"
              onClick={onLogoutManager}
              title="Click to lock Manager mode"
            >
              <Unlock size={15} />
              <span>Manager Unlocked</span>
            </button>
          ) : (
            <button
              type="button"
              className="role-btn locked"
              onClick={() => onOpenLogin(activePage)}
            >
              <Lock size={15} />
              <span>Manager Login</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
