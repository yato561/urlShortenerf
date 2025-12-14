# URL Shortener - Quick Start & Reference Guide

**Generated:** December 10, 2025  
**Documentation File:** `COMPONENT_DOCUMENTATION.md` (42.5 KB, 1820 lines)

---

## 📚 What's Included

This project includes comprehensive documentation for:

✅ **7 Pages** - Dashboard, MyUrls, Analytics, Login, Register, Settings, NotFound
✅ **7 Components** - Input, Button, UrlCard, Navbar, Sidebar, AnalyticsChart, ProtectedRoute
✅ **2 Hooks** - useAuth for authentication logic
✅ **1 Context** - AuthContext for global auth state
✅ **2 API Modules** - api.js (wrapper) & axiosClient.js (Axios config)
✅ **Complete Setup Guide** - From Vite project creation to deployment

---

## 🚀 Quick Project Setup

### Step 1: Create Vite Project

```bash
npm create vite@latest my-app -- --template react
cd my-app
npm install
```

### Step 2: Install Dependencies

```bash
# Core packages
npm install react-router-dom axios recharts react-icons prop-types

# Styling
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### Step 3: Start Development

```bash
npm run dev
# Open http://localhost:5174
```

---

## 📖 Pages Overview

| Page | Route | Protected | Purpose |
|------|-------|-----------|---------|
| **Dashboard** | `/dashboard` | ✅ | Create URLs & view analytics |
| **MyUrls** | `/my-urls` | ✅ | Manage all URLs (edit/delete) |
| **Analytics** | `/analytics` | ✅ | Full analytics dashboard with real-time metrics |
| **Login** | `/login` | ❌ | User authentication |
| **Register** | `/register` | ❌ | New user signup |
| **Settings** | `/settings` | ✅ | Account & app settings |
| **NotFound** | `*` | ❌ | 404 error page |

---

## 🧩 Components Overview

| Component | Purpose | Reusable | Props |
|-----------|---------|----------|-------|
| **Input** | Text input field | ✅ Yes | label, type, disabled, ...props |
| **Button** | Action button | ✅ Yes | children, disabled, onClick |
| **UrlCard** | URL display card | ✅ Yes | url, onDelete, onEdit |
| **Navbar** | Top navigation | ❌ Layout | - |
| **Sidebar** | Side navigation | ❌ Layout | - |
| **AnalyticsChart** | Line chart | ✅ Yes | data (array of {date, clicks}) |
| **ProtectedRoute** | Auth wrapper | ✅ Yes | children |

---

## 🔧 Essential Methods by Page

### Dashboard.jsx
- `fetchUrls()` - Fetch user's URLs from `/urls/all`
- `createUrl()` - Create short URL via `POST /urls/create`
- `useEffect` hooks for initialization

### MyUrls.jsx
- `loadUrls()` - Load all URLs
- `deleteUrl(id)` - Delete URL via `DELETE /urls/delete/{id}`
- `editUrl(url)` - Update expiry via `POST /urls/update/{id}`

### Analytics.jsx (Real-time Dashboard)
- `fetchAnalytics()` - Fetch real-time analytics from `/analytics/overview`
- `fetchUrls()` - Get URLs for breakdown section
- **Backend Integration:**
  - Receives device data as: `[["Desktop", 10], ["Mobile", 5], ...]`
  - Receives referrers as: `[{name: "google", percentage: 45}, ...]`
  - Transforms to Recharts format with unique composite keys
- **Features:**
  - Summary cards: Total Clicks, Total URLs, Top Performing URL
  - Line chart: Daily clicks trend
  - Pie chart: Device distribution (Desktop, Mobile, Tablet, Other)
  - Referrer bars: Top traffic sources with percentages
  - URL breakdown: Individual URL performance cards
- **Color mapping:** Desktop (#1DB954), Mobile (#FF6B6B), Tablet (#4ECDC4), Other (#95E1D3)
- **Key Optimization:** Uses composite keys (`device-Desktop-0`, `referrer-google-0`) to prevent React warnings

### Login.jsx
- `submit()` - Authenticate user
- Uses `useAuth()` hook for login method

### Register.jsx
- `submit()` - Register new user
- Validates: email, password match, minimum length

### Settings.jsx
- `handleCopyToken()` - Copy JWT to clipboard
- `handleLogout()` - Logout with confirmation

---

## 📊 Analytics Dashboard Guide

### What Analytics Tracks

| Metric | Meaning | How Calculated |
|--------|---------|-----------------|
| **Total Clicks** | Sum of all clicks | All URLs' clickCount added |
| **Total URLs** | Number of URLs created | Count of URLs array |
| **Top Performing URL** | URL with most clicks | URL with highest clickCount |
| **Daily Clicks** | Clicks per day | Backend provides clicksPerDay data |
| **Device Distribution** | Traffic by device type | Backend groups clicks by device |
| **Referrers** | Traffic source (where clicks came from) | Backend tracks referrer sources |
| **URL Breakdown** | Individual URL click count | Lists each URL's clickCount |

### Analytics Data Flow

```
Backend: GET /analytics/overview
    ↓
Raw Data Format:
  - devices: [["Desktop", 10], ["Mobile", 5], ...]  ← Array format
  - referrers: [{name: "google", percentage: 45}, ...]  ← Object format
    ↓
React Transformation:
  - Devices → Convert [[name, count]] to {id, name, value, color}
  - Referrers → Add composite key {id: "referrer-name-index"}
    ↓
Recharts Components:
  - PieChart renders device distribution
  - ResponsiveContainer handles sizing (200x200px)
  - Bars visualize referrer percentages
```

### Understanding the Visualizations

**Summary Cards (Top Row)**
- Green numbers = Key metrics
- Shows snapshot of performance
- Updated when page loads

**Clicks per Day (Line Chart)**
- Shows trend over time
- X-axis = Date
- Y-axis = Click count
- Green line = Click trend

**Device Distribution (Pie Chart)**
- Shows which devices users are on
- Colors: Desktop (Green), Mobile (Red), Tablet (Cyan), Other (Light Cyan)
- Larger slice = More traffic from that device

**Top Referrers (Bars)**
- Shows where traffic comes from
- Longer bar = More traffic
- Percentage = % of total clicks from that source
- "Unknown" = No referrer data

**URL Breakdown (Cards)**
- Each card = One short URL
- Shows long URL, short code, and click count
- Cards show all your URLs' performance

### Backend Data Format

Analytics endpoint returns:
```javascript
GET /analytics/overview → {
  totalClicks: 16,
  totalUrls: 20,
  topUrl: { shortCode: "68jcwfr", clickCount: 3 },
  clicksPerDay: [...],
  devices: [["Tablet", 2], ["Mobile", 10], ["Desktop", 4]],    // Array format
  referrers: [
    {percentage: 13, name: "Tablet"},
    {percentage: 63, name: "Mobile"},
    {percentage: 25, name: "Desktop"}
  ]
}
```

### Composite Key Strategy

**Why:** React requires unique keys for lists. When multiple items have the same value, keys would duplicate.

**Solution:** Combine data + index
```javascript
// Device key example
"device-Desktop-0", "device-Mobile-1", "device-Tablet-2"

// Referrer key example
"referrer-google-0", "referrer-unknown-1", "referrer-facebook-2"

// Ensures uniqueness even with duplicate names
```

---

## 🎣 Hooks Usage

### useAuth Hook

```javascript
import { useAuth } from "../hooks/useAuth";

const MyComponent = () => {
    const { login, register, logout, loading, error } = useAuth();
    
    // login(email, password) → Promise
    // register(email, password) → Promise
    // logout() → void
    // loading, error → state
};
```

### useContext Hook

```javascript
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const MyComponent = () => {
    const { token, login, logout } = useContext(AuthContext);
};
```

---

## 📡 API Endpoints Reference

### Authentication
```
POST /auth/login        { email, password }
POST /auth/register     { email, password }
```

### URLs
```
POST /urls/create       { longUrl, expiry: null }
GET  /urls/all
DELETE /urls/delete/{id}
POST /urls/update/{id}  { longUrl, expiry }
GET  /redirect/{shortCode}  (Redirect to original URL - increments click count)
```

### Analytics (Real-time)
```
GET /analytics/overview
  Response: {
    totalClicks: number,
    totalUrls: number,
    topUrl: { shortCode, clickCount },
    clicksPerDay: [{ date, clicks }],
    devices: [["name", count], ...],
    referrers: [{ name, percentage }, ...],
    breakdown: [{ shortCode, clickCount }, ...]
  }
```

---

## 📝 Creating New Components

### Component Template

```jsx
import PropTypes from "prop-types";

function MyComponent({ prop1, prop2, onAction }) {
  return (
    <div className="bg-darkCard p-4 rounded-lg border border-gray-700">
      <h3 className="text-lg font-semibold text-white">{prop1}</h3>
      <button onClick={onAction}>Action</button>
    </div>
  );
}

MyComponent.propTypes = {
  prop1: PropTypes.string.isRequired,
  prop2: PropTypes.string,
  onAction: PropTypes.func,
};

export default MyComponent;
```

### Register in Parent

```jsx
import MyComponent from "../components/MyComponent";

<MyComponent prop1="value" onAction={() => {}} />
```

---

## 📝 Creating New Pages

### Page Template

```jsx
import { useState, useEffect } from "react";

export default function NewPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      // Fetch data
    } catch (err) {
      setError("Error message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full p-4 lg:p-10">
      <h1 className="text-2xl lg:text-3xl font-bold mb-6">Page Title</h1>
      {/* Content */}
    </div>
  );
}
```

### Add Route

```jsx
// App.jsx
<Route 
  path="/new-page" 
  element={<ProtectedRoute><NewPage /></ProtectedRoute>} 
/>
```

### Add Navigation

```jsx
// Sidebar.jsx - Add to navItems
{ path: "/new-page", label: "New Page", icon: FiIcon }
```

---

## 🎨 Tailwind CSS Breakpoints

```
Default     = Mobile (< 640px)
sm:         = 640px (landscape phone)
md:         = 768px (tablet)
lg:         = 1024px (Desktop) ← MAIN BREAKPOINT
xl:         = 1280px (Large desktop)
```

### Responsive Example

```jsx
<div className="p-4 lg:p-10">              {/* 16px mobile, 40px desktop */}
  <h1 className="text-2xl lg:text-3xl">   {/* 24px mobile, 30px desktop */}
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
    {/* 1 col mobile, 2 col tablet, 3 col desktop */}
  </div>
</div>
```

---

## 🎯 Common Tailwind Classes

### Spacing
- `p-4` = padding 16px
- `m-6` = margin 24px
- `gap-3` = gap 12px
- `mb-4` = margin-bottom 16px

### Colors (Custom)
- `primary` = #1DB954 (Green)
- `darkBg` = #0D1117 (Dark background)
- `darkCard` = #161B22 (Card)
- `text-gray-300` = Light gray

### Layout
- `w-full` = 100% width
- `h-screen` = 100vh height
- `flex` = flexbox
- `grid` = grid layout
- `rounded-lg` = 8px border-radius

---

## ⌨️ Terminal Commands

```bash
# Development
npm run dev              # Start dev server
npm run build           # Production build
npm run preview         # Preview build locally
npm run lint            # Check code quality

# Package Management
npm install package     # Add package
npm install -D package  # Add dev dependency
npm uninstall package   # Remove package
npm list               # Show installed packages

# Git
git init               # Initialize repo
git add .              # Stage changes
git commit -m "msg"    # Commit
git push               # Push to remote
```

---

## 🗂️ Project Structure

```
urlShortenerf/
├── src/pages/           # 7 page components
├── src/components/      # 7 reusable components
├── src/context/         # Global state (AuthContext)
├── src/hooks/           # Custom hooks (useAuth)
├── src/api/             # API client & utilities
├── src/App.jsx          # Router & main app
└── vite.config.js       # Vite configuration
```

---

## 🔐 Authentication Flow

### Login
1. User enters email/password
2. `login()` sends POST to `/auth/login`
3. Backend returns JWT token
4. Token stored in localStorage
5. Context state updated
6. User navigated to `/dashboard`

### Protected Routes
```jsx
<Route path="/dashboard" 
  element={<ProtectedRoute><Dashboard /></ProtectedRoute>} 
/>
```
- Checks if token exists
- Redirects to `/login` if not authenticated
- Renders Sidebar + Navbar + page content if authenticated

### Logout
1. User clicks logout button
2. `handleLogout()` clears localStorage
3. Context logout removes token from state
4. User redirected to `/login`

---

## 🐛 Environment Setup

### .env File

```
VITE_API_BASE_URL=http://localhost:8081
```

### Access in Code

```javascript
const apiUrl = import.meta.env.VITE_API_BASE_URL;
```

### Rules
- ✅ Prefix with `VITE_` to expose to frontend
- ✅ Restart dev server after changing
- ❌ Not `VITE_` prefixed = private (server-only)

---

## 📊 Version Info

| Aspect | Version |
|--------|---------|
| React | 19.2.0 |
| Vite | 7.2.5 |
| Tailwind | 3.4.18 |
| React Router | 7.10.1 |
| Axios | 1.13.2 |
| Recharts | 3.5.1 |

---

## 📎 Where to Find Details

| Topic | Location |
|-------|----------|
| Component code | `src/components/*.jsx` |
| Page code | `src/pages/*.jsx` |
| API calls | `src/api/api.js` & `axiosClient.js` |
| Authentication | `src/hooks/useAuth.jsx` & `context/AuthContext.jsx` |
| Routes | `src/App.jsx` |
| Styles | Tailwind CSS (inline classes) |
| Config | `vite.config.js`, `tailwind.config.js` |

---

## ✨ Key Features

✅ Full mobile responsive (sm, md, lg breakpoints)
✅ JWT authentication with localStorage
✅ Dark theme with green primary color
✅ CRUD operations for URLs
✅ Analytics with charts (Recharts)
✅ Protected routes with auth check
✅ Mobile drawer menu + desktop sidebar
✅ API error handling with user-friendly messages
✅ Loading states on all operations
✅ PropTypes validation for components

---

## 📚 Full Documentation

For complete, detailed documentation see:
**`COMPONENT_DOCUMENTATION.md`** (42.5 KB, 1820 lines)

This file contains:
- Every method signature
- All state management details
- Complete API reference
- Code examples for each feature
- Troubleshooting guide
- Best practices
- Step-by-step guides

---

## 🎓 Learning Path

1. **Read COMPONENT_DOCUMENTATION.md** - Get familiar with structure
2. **Examine src/App.jsx** - Understand routing
3. **Check src/pages/Dashboard.jsx** - See how pages work
4. **Review src/components/Input.jsx** - Understand component patterns
5. **Study src/context/AuthContext.jsx** - Learn state management
6. **Explore src/api/axiosClient.js** - Understand API integration

---

**Happy Coding! 🚀**

For questions or issues, refer to the detailed documentation file.
