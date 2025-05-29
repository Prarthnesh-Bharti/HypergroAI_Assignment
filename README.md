# 🏠 Property Listing Backend

A **Node.js** backend application for managing real estate listings with advanced features like user authentication, favorites, property recommendations, and filtering.

---

## 🌐 Live Demo

🔗 [View on Render](https://your-app-name.onrender.com)

---

## 🚀 Tech Stack

- **Backend:** Node.js, Express.js  
- **Database:** MongoDB Atlas  
- **Authentication:** JWT  
- **Caching:** Redis  
- **CSV Import:** Built-in support  
- **Deployment:** Render  

---

## ✨ Features

- 🔐 User registration and login with JWT
- 🏘️ Full CRUD operations for property listings (restricted to the creator)
- 🔍 Advanced filtering on 10+ attributes (e.g., price, location, size)
- ❤️ Favorite/unfavorite properties
- 📤 Recommend properties to other users
- ⚡ Redis caching for improved performance

---

## 📦 Setup & Scripts

```bash
# Install dependencies
npm install

# Start the server
npm run start

# Start in development mode
npm run dev

# Import properties from CSV
npm run import-csv
```

---

## 📖 API Endpoints

### Root

- `GET /`  
  Returns a welcome message.

---

### Authentication

- `POST /api/auth/register`  
  Registers a new user.  
  **Body:**  
  ```json
  {
    "email": "user@example.com",
    "password": "yourpassword"
  }
  ```

- `POST /api/auth/login`  
  Authenticates a user and returns a JWT token.  
  **Body:**  
  ```json
  {
    "email": "user@example.com",
    "password": "yourpassword"
  }
  ```

---

### Properties

- `GET /api/properties/`  
  Fetch all properties with optional filters, pagination, and sorting.  
  **Query Parameters (optional):**  
  - `page`, `limit`, `sortBy`, `sortDir`, and filtering attributes like `price`, `location`, etc.

- `POST /api/properties/`  
  Create a new property.  
  **Auth required**  
  **Body:**  
  Property JSON object.

- `PUT /api/properties/:id`  
  Update an existing property.  
  **Auth required**  
  **Body:**  
  Updated property JSON.

- `DELETE /api/properties/:id`  
  Delete a property.  
  **Auth required**

---

### Favorites

- `GET /api/favorites/`  
  Get the logged-in user's favorite properties.  
  **Auth required**

- `POST /api/favorites/add`  
  Add a property to favorites.  
  **Auth required**  
  **Body:**  
  ```json
  {
    "propertyId": "property_id"
  }
  ```

- `POST /api/favorites/remove`  
  Remove a property from favorites.  
  **Auth required**  
  **Body:**  
  ```json
  {
    "propertyId": "property_id"
  }
  ```

---

