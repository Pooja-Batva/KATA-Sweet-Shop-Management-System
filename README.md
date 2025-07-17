# KATA-Sweet-Shop-Management-System using ChatGPT and Copilot
A Sweet Shop Management System that enables users to add, update, delete, search, sort, and browse available sweets with ease.

## 📦 Features

- **Add Sweet**  
  Add a new sweet with name, category, price, and quantity.

- **Delete Sweet**  
  Remove a sweet by its ID.

- **View All Sweets**  
  List all sweets available in the shop.

- **Search & Sort Sweets**  
  Search by name, category, or price range.  
  Sort by price, name, or quantity.

- **Purchase Sweet**  
  Decrease stock by purchasing quantity. Throws error if insufficient stock.

- **Restock Sweet**  
  Add stock to existing sweet by ID.

---

## 📁 Folder Structure
Backend/
│
├── src/
│ ├── models/ # Mongoose schemas
│ ├── services/ # Business logic (unit tested)
│ ├── controllers/ # HTTP handlers
│ ├── routes/ # Express route definitions
│ └── app.js # Express app
│
├── tests/
│ ├── unit/ # Jest unit tests (mocked DB)
│ └── integration/ # Supertest integration tests (mocked DB)
│
├── server.js # Entry point
└── README.md


---

## 🚀 Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/Pooja-Batva/KATA-Sweet-Shop-Management-System.git
cd Backend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up MongoDB
```bash
# Make sure you have MongoDB installed and running
mongoose.connect('mongodb://localhost:27017/sweetshop')  
```

### 4. Start the server
```bash
npm start
```

### 5. Run tests
```bash     
npm test
```

### Technologies Used
Node.js
Express.js
MongoDB + Mongoose
Jest + Supertest
REST API (JSON)