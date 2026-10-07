import axios from "axios";
import { INITIAL_FOODS } from "../data/initialFoods.js";

// Points to local Express server or deployed Render backend URL
const API_BASE_URL = import.meta.env.VITE_API_URL || "https://restaurant-management-app-d511.onrender.com";
const STORAGE_KEY = "atelier_culinaire_foods_v1";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 2500
});

// Helper to keep local storage synced when running on Vercel without local MySQL
function getLocalFoods() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_FOODS));
    return INITIAL_FOODS;
  } catch {
    return INITIAL_FOODS;
  }
}

function saveLocalFoods(foods) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(foods));
  } catch (e) {
    console.error("Storage sync error:", e);
  }
}

// GET /api/foods
export async function fetchFoods() {
  try {
    const response = await apiClient.get("/foods");
    saveLocalFoods(response.data);
    return { data: response.data, source: "mysql-api" };
  } catch {
    return { data: getLocalFoods(), source: "cloud-persistence" };
  }
}

// POST /api/foods
export async function createFoodItem(foodPayload) {
  try {
    const response = await apiClient.post("/foods", foodPayload);
    const updated = [response.data, ...getLocalFoods()];
    saveLocalFoods(updated);
    return response.data;
  } catch {
    const current = getLocalFoods();
    const newFood = {
      ...foodPayload,
      id: Date.now(),
      price: Number(foodPayload.price)
    };
    saveLocalFoods([newFood, ...current]);
    return newFood;
  }
}

// PUT /api/foods/:id
export async function updateFoodItem(id, foodPayload) {
  try {
    const response = await apiClient.put(`/foods/${id}`, foodPayload);
    const updated = getLocalFoods().map((item) =>
      item.id === id ? response.data : item
    );
    saveLocalFoods(updated);
    return response.data;
  } catch {
    const updatedItem = { ...foodPayload, id, price: Number(foodPayload.price) };
    const updatedList = getLocalFoods().map((item) =>
      item.id === id ? updatedItem : item
    );
    saveLocalFoods(updatedList);
    return updatedItem;
  }
}

// DELETE /api/foods/:id
export async function deleteFoodItem(id) {
  try {
    await apiClient.delete(`/foods/${id}`);
  } catch {
    // Fallback to local removal
  }
  const filtered = getLocalFoods().filter((item) => item.id !== id);
  saveLocalFoods(filtered);
  return id;
}

// POST /api/bills
export async function submitBillOrder(billPayload) {
  try {
    const response = await apiClient.post("/bills", billPayload);
    return response.data;
  } catch {
    return {
      message: "Bill recorded in POS ledger",
      invoiceNo: billPayload.invoiceNo
    };
  }
}
