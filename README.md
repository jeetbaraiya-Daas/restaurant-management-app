# Restaurant Management Web App

A full-stack Restaurant Management and Point-of-Sale (POS) web application built following an 11-week software engineering plan using **Node.js, Express.js, MySQL, React.js, and Socket.io**.

## ✨ Key Features
- **Menu & Category Management (Weeks 6–8):** Filter dishes via category dropdown, quick category pills, dietary tags (Veg / Non-Veg), and live search.
- **Quantity Control & Live Order Ticket (Week 8–9):** Interactive `+` and `-` quantity steppers on food cards synced with a thermal receipt bill generator.
- **Full Manager CRUD with Validations (Weeks 1, 2, 5, 10):** Add, update, and delete dishes with client-side & server-side validation.
- **Extra Add-Ons Included:**
  - **PDF Bill Generation:** Thermal print stylesheet for exporting customer invoices as PDF.
  - **Role-Based Manager Login:** Protected PIN authentication (`PIN: 1234`) for adding, editing, or deleting menu items.
  - **Category Dropdown Filter:** Synchronized dropdown and pill filters.
  - **Real-Time Socket.io Updates:** Live kitchen order tickets (KOT) and menu updates across terminals.

---

## 🗄️ Entity Relationship Diagram (ERD - Week 11 Deliverable)

```mermaid
erDiagram
    CATEGORIES ||--o{ FOODS : contains
    BILLS ||--|{ BILL_ITEMS : includes
    FOODS ||--o{ BILL_ITEMS : referenced_in

    CATEGORIES {
        int id PK
        varchar name UK
        varchar description
        timestamp created_at
    }
    FOODS {
        int id PK
        varchar name
        decimal price
        int category_id FK
        text description
        boolean is_veg
        int spice_level
        int prep_time
        varchar image_url
        boolean available
        timestamp created_at
    }
    BILLS {
        int id PK
        varchar invoice_no UK
        varchar customer_name
        varchar table_no
        varchar order_type
        decimal subtotal
        decimal discount_amount
        decimal tax_amount
        decimal grand_total
        timestamp created_at
    }
    BILL_ITEMS {
        int id PK
        int bill_id FK
        int food_id FK
        int quantity
        decimal unit_price
    }
