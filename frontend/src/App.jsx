import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar.jsx";
import Bill from "./components/Bill.jsx";
import LoginModal from "./components/LoginModal.jsx";
import FoodList from "./pages/FoodList.jsx";
import AddFood from "./pages/AddFood.jsx";
import EditFood from "./pages/EditFood.jsx";
import {
  fetchFoods,
  createFoodItem,
  updateFoodItem,
  deleteFoodItem,
  submitBillOrder
} from "./services/api.js";

export default function App() {
  const [foods, setFoods] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [activePage, setActivePage] = useState("pos"); // pos | add | manage
  const [isManager, setIsManager] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [pendingTargetPage, setPendingTargetPage] = useState("pos");
  const [toast, setToast] = useState(null);
  const [lastSocketEvent, setLastSocketEvent] = useState("Socket.io Ready");

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3500);
  };

  // Week 7: Load food items on mount
  useEffect(() => {
    async function loadInitialMenu() {
      const result = await fetchFoods();
      setFoods(result.data);
    }
    loadInitialMenu();
  }, []);

  // Week 8: Quantity + and - controls
  const handleIncrement = (foodId) => {
    setQuantities((prev) => ({
      ...prev,
      [foodId]: (prev[foodId] || 0) + 1
    }));
  };

  const handleDecrement = (foodId) => {
    setQuantities((prev) => {
      const current = prev[foodId] || 0;
      if (current <= 1) {
        const updated = { ...prev };
        delete updated[foodId];
        return updated;
      }
      return { ...prev, [foodId]: current - 1 };
    });
  };

  const handleClearOrder = () => {
    setQuantities({});
    showToast("Current bill cleared");
  };

  // Week 7 & 10: Add, Update, Delete Food Handlers
  const handleAddFood = async (newFoodData) => {
    const created = await createFoodItem(newFoodData);
    setFoods((prev) => [created, ...prev]);
    setLastSocketEvent(`Broadcast: Added "${created.name}"`);
    showToast(`Added "${created.name}" to menu!`);
    setActivePage("pos");
  };

  const handleUpdateFood = async (id, updatedData) => {
    const saved = await updateFoodItem(id, updatedData);
    setFoods((prev) => prev.map((item) => (item.id === id ? saved : item)));
    setLastSocketEvent(`Broadcast: Updated "${saved.name}"`);
    showToast(`Updated "${saved.name}"`);
  };

  const handleDeleteFood = async (id) => {
    const target = foods.find((f) => f.id === id);
    await deleteFoodItem(id);
    setFoods((prev) => prev.filter((item) => item.id !== id));
    setLastSocketEvent(`Broadcast: Removed dish #${id}`);
    showToast(`Removed "${target?.name || "Dish"}" from menu`);
  };

  // Week 9: Generate Bill & Broadcast Order
  const handleCheckoutBill = async (billPayload) => {
    await submitBillOrder(billPayload);
    setLastSocketEvent(
      `KOT Sent: ${billPayload.invoiceNo} (${billPayload.tableNo} • ₹${billPayload.grandTotal})`
    );
    showToast(
      `Bill ${billPayload.invoiceNo} generated & sent to Kitchen via Socket.io!`
    );
    setQuantities({});
  };

  // Derived selected items for the Bill component
  const cartItems = foods
    .filter((f) => quantities[f.id] > 0)
    .map((f) => ({ ...f, qty: quantities[f.id] }));

  return (
    <div className="app-shell">
      <Navbar
        activePage={activePage}
        setActivePage={setActivePage}
        isManager={isManager}
        onOpenLogin={(target) => {
          setPendingTargetPage(target);
          setLoginModalOpen(true);
        }}
        onLogoutManager={() => {
          setIsManager(false);
          setActivePage("pos");
          showToast("Manager session locked");
        }}
        totalMenuCount={foods.length}
        lastSocketEvent={lastSocketEvent}
      />

      {toast && <div className="toast-banner no-print">{toast}</div>}

      <main className="main-workspace">
        <div className="workspace-left no-print">
          {activePage === "pos" && (
            <FoodList
              foods={foods}
              quantities={quantities}
              onIncrement={handleIncrement}
              onDecrement={handleDecrement}
            />
          )}

          {activePage === "add" && (
            <AddFood
              onAddFood={handleAddFood}
              onBackToPos={() => setActivePage("pos")}
            />
          )}

          {activePage === "manage" && (
            <EditFood
              foods={foods}
              onUpdateFood={handleUpdateFood}
              onDeleteFood={handleDeleteFood}
              onNavigateAdd={() => setActivePage("add")}
            />
          )}
        </div>

        {/* Right Sticky Thermal Receipt Bill (Always visible for POS speed) */}
        <Bill
          cartItems={cartItems}
          onIncrement={handleIncrement}
          onDecrement={handleDecrement}
          onClearOrder={handleClearOrder}
          onCheckoutBill={handleCheckoutBill}
        />
      </main>

      <LoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        onSuccess={() => {
          setIsManager(true);
          setLoginModalOpen(false);
          if (pendingTargetPage) setActivePage(pendingTargetPage);
          showToast("Manager Mode Unlocked (PIN Verified)");
        }}
      />
    </div>
  );
}
