# Spring Boot CORS Configuration - Detailed Setup Guide

## Step 1: Verify Your Project Structure

Your Spring Boot project should have a structure like this:

```
your-backend-project/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/
│   │   │       └── yourcompany/
│   │   │           └── yourproject/
│   │   │               ├── YourBackendApplication.java  (Main class)
│   │   │               ├── controller/
│   │   │               │   └── AuthController.java
│   │   │               ├── service/
│   │   │               ├── model/
│   │   │               ├── repository/
│   │   │               └── config/  ← Create this folder if it doesn't exist
│   │   └── resources/
│   │       └── application.properties
│   └── test/
├── pom.xml
└── README.md
```

## Step 2: Create the CORS Configuration Class

### Option A: Create a new file in the `config` folder

**File:** `src/main/java/com/yourcompany/yourproject/config/CorsConfig.java`

```java
package com.yourcompany.yourproject.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {
    
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")  // Apply to all endpoints
            .allowedOrigins(
                "http://localhost:5174",  // Frontend development port
                "http://localhost:5173",  // Fallback frontend port
                "http://localhost:3000"   // Common React dev port
            )
            .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH")
            .allowedHeaders("*")
            .allowCredentials(true)
            .maxAge(3600);  // Cache preflight response for 1 hour
    }
}
```

### Option B: If you prefer to name it differently

Create: `src/main/java/com/yourcompany/yourproject/config/WebConfig.java`

```java
package com.yourcompany.yourproject.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
            .allowedOrigins("http://localhost:5174", "http://localhost:5173")
            .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH")
            .allowedHeaders("*")
            .allowCredentials(true)
            .maxAge(3600);
    }
}
```

## Step 3: Ensure Spring Web is in Dependencies

Make sure you have Spring Web in your `pom.xml`:

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
```

## Step 4: Package Structure Must Match

⚠️ **IMPORTANT:** The package name in your Java file must match your project structure.

If your main application class is:
```
src/main/java/com/example/urlshortener/UrlShortenerApplication.java
```

Then your CORS config should be in:
```
src/main/java/com/example/urlshortener/config/CorsConfig.java
```

With package declaration:
```java
package com.example.urlshortener.config;
```

## Step 5: Verify @SpringBootApplication is Scanning the Config Package

Your main application class should be in the root or parent package:

```java
package com.example.urlshortener;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class UrlShortenerApplication {
    public static void main(String[] args) {
        SpringApplication.run(UrlShortenerApplication.class, args);
    }
}
```

The `@SpringBootApplication` annotation will automatically scan all sub-packages including `config`.

## Step 6: Restart Your Backend

After adding the CORS configuration:

1. **Stop** your running Spring Boot application
2. **Rebuild** the project: `mvn clean build` (or use your IDE's build button)
3. **Start** the application again
4. You should see Spring Boot startup logs confirming CORS is configured

## Alternative: Use @CrossOrigin on Individual Controllers

If you prefer to configure CORS on specific controllers instead:

**File:** `src/main/java/com/yourcompany/yourproject/controller/AuthController.java`

```java
package com.yourcompany.yourproject.controller;

import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = {
    "http://localhost:5174",
    "http://localhost:5173"
})
@RestController
@RequestMapping("/auth")
public class AuthController {
    
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegistrationRequest request) {
        // Your implementation
    }
    
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        // Your implementation
    }
}
```

## Troubleshooting

### Issue: CORS still not working after restart
1. **Clear browser cache** - CORS responses are cached
2. **Check package name** - Ensure it's a sub-package of your main app
3. **Restart IDE** - Sometimes IDEs need to refresh configuration
4. **Check logs** - Look for startup logs confirming no errors

### Issue: Getting 403 or 401 errors
These are different from CORS errors (which are 0 or blocked).
- CORS working ✅ but authentication failing
- Check your JWT token or authentication logic

### Issue: OPTIONS request is failing
Make sure `OPTIONS` is in your allowed methods:
```java
.allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH")
```

## Directory Example for URL Shortener Backend

Here's a complete example structure:

```
urlshortener-backend/
├── src/main/java/com/example/urlshortener/
│   ├── UrlShortenerApplication.java
│   ├── config/
│   │   ├── CorsConfig.java          ← Add this file here
│   │   └── SecurityConfig.java
│   ├── controller/
│   │   ├── AuthController.java
│   │   └── UrlController.java
│   ├── service/
│   │   ├── AuthService.java
│   │   └── UrlService.java
│   ├── model/
│   │   ├── User.java
│   │   └── Url.java
│   └── repository/
│       ├── UserRepository.java
│       └── UrlRepository.java
├── pom.xml
└── README.md
```

## Testing CORS Configuration

After adding the configuration and restarting:

1. **Frontend tries to register**
2. **Browser sends preflight OPTIONS request**
3. **Backend responds with CORS headers** (you should see this in Network tab)
4. **Actual POST request is sent**
5. **Success!** ✅

Check Network tab in DevTools:
- Look for **OPTIONS** request (preflight)
- Response headers should include:
  - `Access-Control-Allow-Origin: http://localhost:5174`
  - `Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS, PATCH`
  - `Access-Control-Allow-Headers: *`

## Common Mistakes to Avoid

❌ **Wrong:** Creating file without `config` folder
```
src/main/java/com/example/CorsConfig.java  ❌
```

✅ **Correct:** Creating file in `config` sub-package
```
src/main/java/com/example/config/CorsConfig.java  ✅
```

❌ **Wrong:** Package name doesn't match file location
```
File: src/main/java/com/example/config/CorsConfig.java
Package: package com.other.config;  ❌
```

✅ **Correct:** Package name matches file location
```
File: src/main/java/com/example/config/CorsConfig.java
Package: package com.example.config;  ✅
```

## Quick Setup Checklist

- [ ] Create `config` folder in your main package if it doesn't exist
- [ ] Create `CorsConfig.java` in the `config` folder
- [ ] Set correct package name matching file location
- [ ] Implement `WebMvcConfigurer` interface
- [ ] Override `addCorsMappings` method
- [ ] Add `@Configuration` annotation
- [ ] Include frontend URLs: `http://localhost:5174` and `http://localhost:5173`
- [ ] Restart backend application
- [ ] Test registration from frontend

Once complete, try registering from the frontend and it should work! 🎉
