# API Endpoints Quick Reference

## ✅ Updated Endpoints Summary

### Base URL
```
http://localhost:8081
```

### Authentication Endpoints
| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/auth/register` | Register new user |
| POST | `/auth/login` | Login and get JWT token |

### URL Management Endpoints
| Method | Endpoint | Purpose | Body |
|--------|----------|---------|------|
| POST | `/urls/create` | Create shortened URL | `{ longUrl, expiry }` |
| GET | `/urls/all` | Get all user URLs | - |
| DELETE | `/urls/delete/{id}` | Delete a URL | - |
| POST | `/urls/update/{id}` | Update URL (expiry) | `{ expiry }` |

---

## 📝 Endpoint Usage Examples

### 1. Create Shortened URL
```javascript
await api.post("/urls/create", { 
  longUrl: "https://example.com/very/long/url",
  expiry: null // or ISO date string like "2025-12-31T00:00:00Z"
});
```

### 2. Get All URLs
```javascript
await api.get("/urls/all");
// Returns: [{ id, shortCode, longUrl, clickCount, ... }]
```

### 3. Delete URL
```javascript
await api.delete("/urls/delete/123");
```

### 4. Update URL
```javascript
await api.post("/urls/update/123", { 
  expiry: "2025-12-31T00:00:00Z" 
});
```

---

## 🔄 Previous vs Current

```diff
- POST /api/urls/shorten
+ POST /urls/create

- GET /api/urls/my
+ GET /urls/all

- DELETE /api/urls/{id}
+ DELETE /urls/delete/{id}

- POST /api/urls/{id}
+ POST /urls/update/{id}
```

---

## 📂 Files Updated

✅ `src/pages/Dashboard.jsx`
✅ `src/pages/MyUrls.jsx`
✅ `src/pages/Analystics.jsx`
✅ `README.md`

---

## 🧪 Testing in DevTools

### Network Tab
1. Open DevTools (F12)
2. Go to Network tab
3. Perform actions (create, delete, update)
4. Check requests show correct endpoints:
   - `POST http://localhost:8081/urls/create`
   - `GET http://localhost:8081/urls/all`
   - etc.

### Console
Watch for logs:
```javascript
✅ POST /urls/create - Success
✅ GET /urls/all - Success
❌ Error messages if endpoints are wrong
```

---

## ⚠️ Common Issues

### 404 Not Found
- ✓ Check endpoint spelling
- ✓ Verify backend routes match
- ✓ Ensure base URL is correct

### 401 Unauthorized
- ✓ Token not attached
- ✓ Token expired
- ✓ Check Authorization header

### 500 Server Error
- ✓ Backend error
- ✓ Check backend logs
- ✓ Verify request body format

---

## 🚀 Ready to Test!

All endpoints are updated and ready for testing with your backend.

