import React, { useState } from "react";
import { Edit3, Trash2, Check, X, Plus } from "lucide-react";
import { CATEGORIES } from "../data/initialFoods.js";

export default function EditFood({
  foods,
  onUpdateFood,
  onDeleteFood,
  onNavigateAdd
}) {
  const [editingId, setEditingId] = useState(null);
  const [editDraft, setEditDraft] = useState({});
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const startEditing = (food) => {
    setEditingId(food.id);
    setEditDraft({ ...food });
  };

  const handleSaveEdit = async () => {
    if (!editDraft.name || Number(editDraft.price) <= 0) return;
    await onUpdateFood(editingId, {
      ...editDraft,
      price: Number(editDraft.price)
    });
    setEditingId(null);
  };

  return (
    <div className="manager-page">
      <div className="page-header">
        <div>
          <h2>Menu Inventory &amp; CRUD Manager</h2>
          <p>Week 5, 6 &amp; 10 Deliverable: Edit or Delete Food Items in Real Time</p>
        </div>
        <button type="button" className="btn-primary" onClick={onNavigateAdd}>
          <Plus size={16} />
          <span>Add New Dish</span>
        </button>
      </div>

      <div className="inventory-table-card">
        <table className="inventory-table">
          <thead>
            <tr>
              <th>Dish</th>
              <th>Category</th>
              <th>Diet</th>
              <th>Price (₹)</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {foods.map((food) => {
              const isEditing = editingId === food.id;
              return (
                <tr key={food.id}>
                  <td>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editDraft.name}
                        onChange={(e) =>
                          setEditDraft({ ...editDraft, name: e.target.value })
                        }
                        className="table-input"
                      />
                    ) : (
                      <div className="table-dish-cell">
                        <img src={food.image} alt={food.name} />
                        <strong>{food.name}</strong>
                      </div>
                    )}
                  </td>

                  <td>
                    {isEditing ? (
                      <select
                        value={editDraft.category}
                        onChange={(e) =>
                          setEditDraft({ ...editDraft, category: e.target.value })
                        }
                        className="table-input"
                      >
                        {CATEGORIES.filter((c) => c !== "All").map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <span className="table-badge">{food.category}</span>
                    )}
                  </td>

                  <td>
                    <span className={`diet-pill ${food.isVeg ? "veg" : "non-veg"}`}>
                      {food.isVeg ? "Veg" : "Non-Veg"}
                    </span>
                  </td>

                  <td className="mono-cell">
                    {isEditing ? (
                      <input
                        type="number"
                        value={editDraft.price}
                        onChange={(e) =>
                          setEditDraft({ ...editDraft, price: e.target.value })
                        }
                        className="table-input price-input"
                      />
                    ) : (
                      `₹${food.price}`
                    )}
                  </td>

                  <td className="desc-cell">
                    {isEditing ? (
                      <input
                        type="text"
                        value={editDraft.description}
                        onChange={(e) =>
                          setEditDraft({ ...editDraft, description: e.target.value })
                        }
                        className="table-input"
                      />
                    ) : (
                      food.description
                    )}
                  </td>

                  <td>
                    {isEditing ? (
                      <div className="table-actions">
                        <button
                          type="button"
                          className="action-icon save"
                          onClick={handleSaveEdit}
                          title="Save changes"
                        >
                          <Check size={16} />
                        </button>
                        <button
                          type="button"
                          className="action-icon cancel"
                          onClick={() => setEditingId(null)}
                          title="Cancel"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ) : confirmDeleteId === food.id ? (
                      <div className="table-actions">
                        <button
                          type="button"
                          className="btn-confirm-del"
                          onClick={() => {
                            onDeleteFood(food.id);
                            setConfirmDeleteId(null);
                          }}
                        >
                          Confirm
                        </button>
                        <button
                          type="button"
                          className="action-icon cancel"
                          onClick={() => setConfirmDeleteId(null)}
                        >
                          <X size={15} />
                        </button>
                      </div>
                    ) : (
                      <div className="table-actions">
                        <button
                          type="button"
                          className="action-icon edit"
                          onClick={() => startEditing(food)}
                          title="Edit Dish"
                        >
                          <Edit3 size={15} />
                        </button>
                        <button
                          type="button"
                          className="action-icon delete"
                          onClick={() => setConfirmDeleteId(food.id)}
                          title="Delete Dish"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
 }
