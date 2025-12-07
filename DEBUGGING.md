## Debugging Guide for URL Shortener

### Console Logs Added

The application now includes comprehensive console logging for debugging:

#### 1. **axiosClient.js - API Configuration**
```javascript
console.log("API Base URL:", BASE_URL);           // Logs the configured API base URL
console.log("✓ Token attached to request");       // Logs when token is added to requests
console.log("✓ Response received:", status);      // Logs successful responses
console.error("Response error:", status, data);   // Logs response errors
```

#### 2. **useAuth.jsx - Authentication**
```javascript
console.log("🔐 Attempting login for:", email);   // Logs login attempt
console.log("✓ Login successful");                 // Logs successful login
console.error("❌ Login error:", errorMsg);        // Logs login errors
console.log("📝 Attempting registration");         // Logs registration attempt
console.log("✓ Registration successful");          // Logs successful registration
console.error("❌ Registration error:", errorMsg); // Logs registration errors
console.log("🔓 Logging out...");                  // Logs logout action
console.log("✓ Logout successful");                // Logs successful logout
```

#### 3. **Dashboard.jsx - URL Management**
- Error messages displayed in UI
- Loading states during operations
- API endpoints used: `/api/urls/shorten`, `/api/urls/my`

#### 4. **MyUrls.jsx - URL Listing**
- Error messages for failed operations
- Uses `globalThis.confirm()` and `globalThis.prompt()` (ESLint compliant)

#### 5. **Analystics.jsx - Analytics**
```javascript
console.log("📊 Fetching URLs for analytics...");
console.log("✓ URLs fetched:", count);
console.log("📈 Generating analytics data...");
```

### How to Debug

#### **Step 1: Open Browser DevTools**
- Press **F12** to open DevTools
- Click the **Console** tab

#### **Step 2: Check API Base URL**
When the app loads, you should see:
```
API Base URL: http://localhost:8081
```

If this shows `undefined` or wrong URL, check `.env` file.

#### **Step 3: Watch for Authentication**
When logging in, console should show:
```
🔐 Attempting login for: user@example.com
✓ Token attached to request
✓ Response received: 200
✓ Login successful
```

If you see errors instead, check:
- Backend is running on `http://localhost:8081`
- CORS is enabled in backend
- Email/password are correct

#### **Step 4: Monitor API Calls**
- Open **Network** tab in DevTools
- Look for requests to `/auth/...` and `/api/urls/...`
- Click on each request to see:
  - Request headers (Authorization: Bearer {token})
  - Response status (200 = success, 401 = unauthorized, 500 = server error)

#### **Step 5: Track State Changes**
- In Console, type: `localStorage.getItem("token")`
- Should return your JWT token
- If it's `null`, you're not logged in

### Common Issues & Solutions

#### **Issue: API returns 401 (Unauthorized)**
```javascript
// Check if token exists
console.log("Token:", localStorage.getItem("token"));

// Check if token is valid
// Usually means token has expired or wasn't sent correctly
```

**Solution:**
1. Clear localStorage: `localStorage.clear()` in console
2. Log out and log back in
3. Check backend token expiration time

#### **Issue: CORS Error in Console**
```
Access to XMLHttpRequest at 'http://localhost:8081/auth/login' 
from origin 'http://localhost:5173' has been blocked by CORS policy
```

**Solution:**
Add to Spring Boot controller:
```java
@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/auth")
public class AuthController { ... }
```

Or configure globally in Spring:
```java
@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
            .allowedOrigins("http://localhost:5173")
            .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS");
    }
}
```

#### **Issue: Network Request Hangs (No Response)**
1. Check if backend server is running
2. Verify backend port is 8081
3. Check firewall settings
4. Restart backend server

#### **Issue: "Failed to load URLs" Error**
```javascript
// Check API endpoint
console.log("Requesting: /api/urls/my");

// Check response structure
// Make sure backend returns: [{ id, longUrl, shortCode, clickCount }]
```

**Solution:**
Verify backend endpoint:
- Returns array of URLs
- Each URL has: `id`, `longUrl`, `shortCode`, `clickCount`
- Status is 200, not 404 or 500

### Network Tab Analysis

| Request | Expected Status | Expected Response |
|---------|-----------------|-------------------|
| POST /auth/login | 200 | `{ token: "jwt..." }` |
| POST /auth/register | 200 or 201 | `{ token: "jwt..." }` or `{ message: "registered" }` |
| POST /api/urls/shorten | 200 or 201 | `{ id, shortCode, ... }` |
| GET /api/urls/my | 200 | `[ { id, longUrl, shortCode, ... } ]` |
| DELETE /api/urls/{id} | 200 or 204 | `{ message: "deleted" }` or empty |

### Environment Variables

Verify `.env` file contains:
```
VITE_API_BASE_URL=http://localhost:8081
```

Check in code:
```javascript
console.log(import.meta.env.VITE_API_BASE_URL);
```

### Performance Debugging

#### **Check Request/Response Times**
1. Open DevTools → Network tab
2. Reload page
3. Click on each request
4. Check **Time** column (should be < 500ms for local requests)

#### **Check Console for Warnings**
- Look for yellow warning messages
- Common: ESLint warnings (don't break functionality)
- Red errors: Usually indicate problems

### Testing Checklist

- [ ] Backend running on http://localhost:8081
- [ ] CORS enabled for http://localhost:5173
- [ ] `.env` file has correct `VITE_API_BASE_URL`
- [ ] Can register new account
- [ ] Can login with registered account
- [ ] Token appears in localStorage
- [ ] Can create shortened URL
- [ ] Can view list of URLs
- [ ] Can delete URLs
- [ ] Can navigate to Analytics page
- [ ] Can access Settings page
- [ ] Logout clears token and redirects to login

### Useful Console Commands

```javascript
// Check current token
localStorage.getItem("token")

// Clear all storage
localStorage.clear()

// Check API base URL
import.meta.env.VITE_API_BASE_URL

// Manually test API call
import('/src/api/axiosClient.js').then(m => {
  m.default.get('/api/urls/my').then(res => console.log(res))
})
```

### Next Steps

If issues persist:
1. Check backend logs
2. Verify database connections
3. Review JWT secret configuration
4. Test endpoints with Postman/curl
5. Enable debug mode in backend

---

**Debugging Tools Used:**
- Browser DevTools (F12)
- Console logging
- Network tab inspection
- localStorage inspection

