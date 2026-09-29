const db = require("../config/db");

// GET /api/foods - Retrieve all food items joined with category names
exports.getAllFoods = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT f.id, f.name, f.price, c.name AS category, f.category_id,
             f.description, f.is_veg AS isVeg, f.spice_level AS spiceLevel,
             f.prep_time AS prepTime, f.image_url AS image, f.available
      FROM foods f
      JOIN categories c ON f.category_id = c.id
      ORDER BY f.id DESC
    `);
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch foods", error: error.message });
  }
};

// POST /api/foods - Add a new food item
exports.createFood = async (req, res) => {
  try {
    const { name, price, category, description, isVeg, spiceLevel, prepTime, image, available } = req.body;

    if (!name || !price || !category || !description) {
      return res.status(400).json({ message: "Name, price, category, and description are required." });
    }

    // Resolve category_id from category name
    const [catRows] = await db.query("SELECT id FROM categories WHERE name = ?", [category]);
    const categoryId = catRows.length ? catRows[0].id : 1;

    const [result] = await db.query(
      `INSERT INTO foods (name, price, category_id, description, is_veg, spice_level, prep_time, image_url, available)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [name, price, categoryId, description, isVeg ?? true, spiceLevel ?? 1, prepTime ?? 15, image || "", available ?? true]
    );

    const newFood = {
      id: result.insertId,
      name,
      price: Number(price),
      category,
      description,
      isVeg: Boolean(isVeg),
      spiceLevel: Number(spiceLevel || 1),
      prepTime: Number(prepTime || 15),
      image,
      available: Boolean(available ?? true)
    };

    // Emit real-time Socket.io event if attached
    if (req.io) {
      req.io.emit("menu:updated", { action: "CREATE", item: newFood });
    }

    res.status(201).json(newFood);
  } catch (error) {
    res.status(500).json({ message: "Error creating food item", error: error.message });
  }
};

// PUT /api/foods/:id - Update an existing food item
exports.updateFood = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, category, description, isVeg, spiceLevel, prepTime, image, available } = req.body;

    const [catRows] = await db.query("SELECT id FROM categories WHERE name = ?", [category]);
    const categoryId = catRows.length ? catRows[0].id : 1;

    await db.query(
      `UPDATE foods
       SET name = ?, price = ?, category_id = ?, description = ?,
           is_veg = ?, spice_level = ?, prep_time = ?, image_url = ?, available = ?
       WHERE id = ?`,
      [name, price, categoryId, description, isVeg, spiceLevel, prepTime, image, available, id]
    );

    const updatedFood = { id: Number(id), name, price: Number(price), category, description, isVeg, spiceLevel, prepTime, image, available };

    if (req.io) {
      req.io.emit("menu:updated", { action: "UPDATE", item: updatedFood });
    }

    res.status(200).json(updatedFood);
  } catch (error) {
    res.status(500).json({ message: "Error updating food item", error: error.message });
  }
};

// DELETE /api/foods/:id - Delete a food item
exports.deleteFood = async (req, res) => {
  try {
    const { id } = req.params;
    await db.query("DELETE FROM foods WHERE id = ?", [id]);

    if (req.io) {
      req.io.emit("menu:updated", { action: "DELETE", id: Number(id) });
    }

    res.status(200).json({ message: "Food item deleted successfully", id: Number(id) });
  } catch (error) {
    res.status(500).json({ message: "Error deleting food item", error: error.message });
  }
};

// POST /api/bills - Save generated bill to MySQL & broadcast KOT via Socket.io
exports.createBill = async (req, res) => {
  try {
    const { invoiceNo, customerName, tableNo, orderType, subtotal, discountAmount, taxAmount, grandTotal, items } = req.body;

    const [billResult] = await db.query(
      `INSERT INTO bills (invoice_no, customer_name, table_no, order_type, subtotal, discount_amount, tax_amount, grand_total)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [invoiceNo, customerName, tableNo, orderType, subtotal, discountAmount, taxAmount, grandTotal]
    );

    const billId = billResult.insertId;

    if (Array.isArray(items)) {
      for (const item of items) {
        await db.query(
          `INSERT INTO bill_items (bill_id, food_id, quantity, unit_price) VALUES (?, ?, ?, ?)`,
          [billId, item.id, item.qty, item.price]
        );
      }
    }

    if (req.io) {
      req.io.emit("order:created", { invoiceNo, tableNo, grandTotal, itemCount: items?.length || 0 });
    }

    res.status(201).json({ message: "Bill saved", billId, invoiceNo });
  } catch (error) {
    res.status(500).json({ message: "Error saving bill", error: error.message });
  }
};
