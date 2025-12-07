# CORS Configuration Guide

## Error Encountered
```
Access to XMLHttpRequest at 'http://localhost:8081/auth/register' from origin 'http://localhost:5174' 
has been blocked by CORS policy: Response to preflight request doesn't pass access control check: 
No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

## Root Cause
The backend server running on `http://localhost:8081` is not configured to accept requests from the frontend running on `http://localhost:5174`.

## Solution - Backend CORS Configuration

### For Spring Boot Backend:

**👉 For detailed step-by-step instructions, see [`SPRING_BOOT_CORS_SETUP.md`](./SPRING_BOOT_CORS_SETUP.md)**

Quick version:

**Step 1:** Create folder `src/main/java/com/yourcompany/yourproject/config/` (if it doesn't exist)

**Step 2:** Create file `CorsConfig.java` in the `config` folder:

```java
package com.yourcompany.yourproject.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
            .allowedOrigins("http://localhost:5174", "http://localhost:5173")
            .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
            .allowedHeaders("*")
            .allowCredentials(true)
            .maxAge(3600);
    }
}
```

**Step 3:** Restart your Spring Boot application

⚠️ **IMPORTANT:** Replace `com.yourcompany.yourproject` with your actual package name!

### Or use @CrossOrigin annotation on controllers:

```java
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = {"http://localhost:5174", "http://localhost:5173"})
@RestController
@RequestMapping("/auth")
public class AuthController {
    // Your endpoints...
}
```

### For Node.js/Express Backend:

Install and configure CORS middleware:

```bash
npm install cors
```

```javascript
const cors = require('cors');
const express = require('express');
const app = express();

app.use(cors({
    origin: ["http://localhost:5174", "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    maxAge: 3600
}));

app.use(express.json());
// Your routes...
```

### For Python/Flask Backend:

```bash
pip install flask-cors
```

```python
from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app, 
     origins=["http://localhost:5174", "http://localhost:5173"],
     allow_headers=["Content-Type", "Authorization"],
     methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
     supports_credentials=True)

# Your routes...
```

## Frontend Configuration ✅

The frontend is already properly configured:

- **Frontend URL:** `http://localhost:5174`
- **Backend URL:** `http://localhost:8081` (configured in `.env`)
- **API Base URL:** Set via `VITE_API_BASE_URL` environment variable
- **Axios Interceptors:** Properly configured to attach JWT tokens

## Testing Steps

1. **Ensure backend is running** on `http://localhost:8081`
2. **Verify backend CORS is configured** to allow `http://localhost:5174`
3. **Open browser DevTools** (F12)
4. **Go to Network tab**
5. **Attempt to register**
6. **Look for successful response** (should be 200 or similar, not a CORS error)

## Common Ports

- **Frontend:** `http://localhost:5174` (or 5173 if 5174 is not available)
- **Backend:** `http://localhost:8081`

If your backend is on a different port, update `.env`:
```
VITE_API_BASE_URL=http://localhost:YOUR_BACKEND_PORT
```

## Debug Logs

When CORS is working correctly, you should see in console:
```
API Base URL: http://localhost:8081
📝 Attempting registration for: user@example.com
✓ Token attached to request
✓ Response received: 201
✓ Registration successful, auto-login completed
```

## Production Considerations

⚠️ **Important:** When deploying to production:
- Update CORS origins to your production domain
- Use HTTPS instead of HTTP
- Never use wildcard `*` for origins in production
- Use specific domain: `https://yourdomain.com`
