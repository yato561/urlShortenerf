# URL Shortener - Complete Component & Page Documentation

**Version:** 3.0.0  
**Framework:** React 18 + Vite  
**Styling:** Tailwind CSS v3  
**Last Updated:** December 10, 2025

---

## Table of Contents

1. [Project Setup & Commands](#project-setup--commands)
2. [Project Structure](#project-structure)
3. [Pages Documentation](#pages-documentation)
4. [Components Documentation](#components-documentation)
5. [API & Utilities](#api--utilities)
6. [Context & Hooks](#context--hooks)
7. [Creating New Pages & Components](#creating-new-pages--components)

---

## Project Setup & Commands

### Prerequisites

- **Node.js:** v14+ ([Download](https://nodejs.org))
- **npm:** v6+ (comes with Node.js)
- **Git** (optional, for version control)

### Create a New Vite + React Project

```bash
# Using npm
npm create vite@latest my-app -- --template react

# OR using yarn
yarn create vite my-app --template react

# Navigate to project
cd my-app

# Install dependencies
npm install
```

### Required Dependencies for URL Shortener Project

```bash
# Core dependencies
npm install react react-dom react-router-dom
npm install axios
npm install recharts
npm install react-icons
npm install prop-types

# Development dependencies (for Tailwind CSS)
npm install -D tailwindcss postcss autoprefixer
npm install -D vite @vitejs/plugin-react
npm install -D eslint eslint-plugin-react-hooks eslint-plugin-react-refresh

# Initialize Tailwind CSS
npx tailwindcss init -p
```

### NPM Scripts

```json
{
  "scripts": {
    "dev": "vite",                 // Start development server on localhost:5174
    "build": "vite build",         // Build for production
    "preview": "vite preview",     // Preview production build
    "lint": "eslint ."             // Run ESLint for code quality
  }
}
```

### Running the Project

```bash
# Development mode (with hot reload)
npm run dev
# Access at: http://localhost:5174

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run linter
npm run lint
```

---

## Project Structure

```
urlShortenerf/
├── src/
│   ├── pages/                    # Page components (routed)
│   │   ├── Dashboard.jsx         # Create URLs & view analytics overview
│   │   ├── MyUrls.jsx            # Manage all user URLs
│   │   ├── Analystics.jsx        # Full analytics dashboard
│   │   ├── Login.jsx             # User login page
│   │   ├── Register.jsx          # User registration page
│   │   ├── Settings.jsx          # Account settings
│   │   └── NotFound.jsx          # 404 page
│   │
│   ├── components/               # Reusable UI components
│   │   ├── Navbar.jsx            # Top navigation bar
│   │   ├── Sidebar.jsx           # Side navigation (mobile drawer + desktop)
│   │   ├── Input.jsx             # Reusable input field
│   │   ├── Button.jsx            # Reusable button
│   │   ├── UrlCard.jsx           # URL display card
│   │   ├── AnalyticsChart.jsx    # Charts (LineChart)
│   │   └── ProtectedRoute.jsx    # Route protection wrapper
│   │
│   ├── context/                  # React Context for global state
│   │   └── AuthContext.jsx       # Authentication context
│   │
│   ├── hooks/                    # Custom React hooks
│   │   └── useAuth.jsx           # Authentication logic hook
│   │
│   ├── api/                      # API client & utilities
│   │   ├── api.js                # API wrapper functions
│   │   └── axiosClient.js        # Axios instance with interceptors
│   │
│   ├── App.jsx                   # Main app component with routing
│   ├── App.css                   # App-level styles
│   ├── index.css                 # Global styles
│   ├── main.jsx                  # React entry point
│   └── assets/                   # Static assets
│
├── public/                       # Public static files
├── index.html                    # HTML entry point
├── vite.config.js                # Vite configuration
├── tailwind.config.js            # Tailwind CSS configuration
├── postcss.config.js             # PostCSS configuration
├── eslint.config.js              # ESLint configuration
├── package.json                  # Dependencies and scripts
└── README.md                     # Project documentation
```

---

## Pages Documentation

### 1. **Dashboard.jsx** - URL Creation & Overview

**Path:** `/src/pages/Dashboard.jsx`  
**Route:** `/dashboard` (Protected)

#### Purpose
Primary page for creating short URLs and viewing quick analytics overview.

#### State Management

```javascript
const [longUrl, setLongUrl] = useState("");              // Long URL input
const [expiry, setExpiry] = useState("");                // Optional expiry date
const [urls, setUrls] = useState([]);                    // List of user URLs
const [createdUrl, setCreatedUrl] = useState(null);      // Just-created URL data
const [analytics, setAnalytics] = useState([]);          // Analytics chart data
const [loading, setLoading] = useState(false);           // Request loading state
const [error, setError] = useState(null);                // Error messages
```

#### Methods & Functions

**`fetchUrls()` - Async Function**
- **Purpose:** Fetch all user's created URLs
- **Endpoint:** `GET /urls/all`
- **Logic:**
  ```javascript
  const fetchUrls = async () => {
      try {
          setError(null);
          const res = await api.get("/urls/all");
          setUrls(Array.isArray(res) ? res : res.data || []);
      } catch (err) {
          setError("Failed to load URLs");
          console.error("Error fetching URLs:", err);
      }
  };
  ```
- **Returns:** Array of URL objects with structure:
  ```javascript
  {
      id: string,
      longUrl: string,
      shortCode: string,
      clickCount: number,
      expiry: string | null
  }
  ```

**`createUrl()` - Async Function**
- **Purpose:** Create a new shortened URL
- **Endpoint:** `POST /urls/create`
- **Request Body:**
  ```javascript
  {
      longUrl: string,    // Required: https://example.com
      expiry: string|null // Optional: ISO datetime or null
  }
  ```
- **Logic:**
  - Validates URL input
  - Sends POST request with longUrl and expiry
  - Handles response and displays created URL
  - Clears form on success
  - Fetches updated URL list
- **Returns:** Created URL object with shortCode

**`useEffect` Hooks**
```javascript
// Analytics initialization (one-time)
useEffect(() => {
    setAnalytics([
        { date: "2025-01-01", clicks: 3 },
        { date: "2025-01-02", clicks: 7 },
        { date: "2025-01-03", clicks: 2 }
    ]);
}, []);

// Load URLs on component mount
useEffect(() => {
    fetchUrls();
}, []);
```

#### Components Used
- **Input** - For URL and expiry inputs
- **Button** - For Generate button
- **AnalyticsChart** - For displaying analytics

#### API Endpoints
| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/urls/all` | Fetch user's URLs |
| POST | `/urls/create` | Create new short URL |

---

### 2. **MyUrls.jsx** - URL Management

**Path:** `/src/pages/MyUrls.jsx`  
**Route:** `/my-urls` (Protected)

#### Purpose
View, edit, and delete all shortened URLs with bulk operations support.

#### State Management

```javascript
const [urls, setUrls] = useState([]);           // All user URLs
const [loading, setLoading] = useState(true);   // Loading state
const [error, setError] = useState(null);       // Error messages
```

#### Methods & Functions

**`loadUrls()` - Async Function**
- **Purpose:** Fetch and display all URLs
- **Endpoint:** `GET /urls/all`
- **Logic:**
  ```javascript
  const loadUrls = async () => {
      try {
          setLoading(true);
          setError(null);
          const data = await get("/urls/all");
          setUrls(Array.isArray(data) ? data : data.data || []);
      } catch (err) {
          setError("Failed to load URLs");
          console.error("Error loading URLs:", err);
      } finally {
          setLoading(false);
      }
  };
  ```
- **Returns:** Array of URL objects

**`deleteUrl(id)` - Async Function**
- **Purpose:** Delete a shortened URL
- **Parameters:** `id` (string) - URL ID to delete
- **Endpoint:** `DELETE /urls/delete/{id}`
- **Logic:**
  - Confirms deletion with user dialog
  - Calls API to delete URL
  - Refreshes URL list
  - Shows error if deletion fails
- **Returns:** Success/error message

**`editUrl(url)` - Async Function**
- **Purpose:** Update URL expiry date
- **Parameters:** `url` (object) - URL object with properties
- **Endpoint:** `POST /urls/update/{id}`
- **Request Body:**
  ```javascript
  {
      longUrl: string,       // Original long URL
      expiry: string | null  // New expiry or null to remove
  }
  ```
- **Logic:**
  - Prompts user for new expiry date
  - Sends both longUrl and expiry
  - Refreshes URL list after update
  - Handles errors gracefully

**`useEffect` Hook**
```javascript
useEffect(() => {
    loadUrls();
}, []);  // Load URLs on component mount
```

#### Components Used
- **UrlCard** - Displays individual URL with actions

#### API Endpoints
| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/urls/all` | Fetch all URLs |
| DELETE | `/urls/delete/{id}` | Delete URL |
| POST | `/urls/update/{id}` | Update URL expiry |

---

### 3. **Analystics.jsx** - Full Analytics Dashboard

**Path:** `/src/pages/Analystics.jsx`  
**Route:** `/analytics` (Protected)

#### Purpose
Comprehensive analytics dashboard showing detailed URL performance metrics.

#### State Management

```javascript
const [analytics, setAnalytics] = useState([]);     // Daily click data
const [urls, setUrls] = useState([]);               // URLs for breakdown
const [loading, setLoading] = useState(true);       // Loading state
const [error, setError] = useState(null);           // Error messages
const [topDevices] = useState([...]);               // Mock device data
const [topReferrers] = useState([...]);             // Mock referrer data
```

#### Methods & Functions

**`fetchUrls()` - Async Function**
- **Purpose:** Fetch all URLs for analytics
- **Endpoint:** `GET /urls/all`
- **Returns:** Array of URL objects with clickCount

**`fetchAnalytics()` - Async Function**
- **Purpose:** Fetch or generate analytics data
- **Endpoint:** `GET /analytics` (currently mocked)
- **Logic:** Generates mock daily click data across 7 days
- **Returns:** Array of daily click objects:
  ```javascript
  [
      { date: "Jan 1", clicks: 3 },
      { date: "Jan 2", clicks: 7 },
      ...
  ]
  ```

**`useEffect` Hook**
```javascript
useEffect(() => {
    const loadData = async () => {
        setLoading(true);
        await Promise.all([fetchUrls(), fetchAnalytics()]);
        setLoading(false);
    };
    loadData();
}, []);
```

**Computed Values**

```javascript
// Total clicks across all URLs
const totalClicks = urls.reduce((sum, u) => sum + (u.clickCount || 0), 0);

// URL with highest clicks
const topUrl = urls.length
    ? urls.reduce((best, u) => 
        ((u.clickCount || 0) > (best.clickCount || 0) ? u : best), 
        urls[0])
    : null;
```

#### Display Sections

1. **Stats Summary**
   - Total Clicks: Sum of all clicks
   - Total URLs: Count of created URLs
   - Top Performing URL: URL with most clicks

2. **Clicks per Day**
   - Line chart showing daily trends
   - 7-day analytics window

3. **Top Devices**
   - Donut pie chart showing device distribution
   - Desktop, Mobile, Tablet, Other

4. **Top Referrers**
   - Horizontal bar chart with referrer sources
   - Percentage breakdown

5. **URL Click Breakdown**
   - Individual URL performance cards
   - Shows shortCode, longUrl, clickCount

#### Components Used
- **AnalyticsChart** - LineChart for daily clicks
- **PieChart** (Recharts) - Device distribution
- **Responsive bars** - Referrer percentages

#### API Endpoints
| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/urls/all` | Fetch URLs for analytics |
| GET | `/analytics` | Fetch analytics data |

---

### 4. **Login.jsx** - User Authentication

**Path:** `/src/pages/Login.jsx`  
**Route:** `/login`

#### Purpose
User login page with email/password authentication.

#### State Management

```javascript
const [email, setEmail] = useState("");       // Email input
const [password, setPassword] = useState(""); // Password input
const [error, setError] = useState("");       // Error message
const [loading, setLoading] = useState(false); // Loading state
```

#### Methods & Functions

**`submit()` - Async Function**
- **Purpose:** Handle login submission
- **Logic:**
  1. Validates email and password are provided
  2. Calls `login()` hook method
  3. Updates context with token
  4. Navigates to dashboard on success
  5. Displays error on failure
- **Hooks Used:**
  - `useAuth()` - For login function
  - `useContext(AuthContext)` - For context login
  - `useNavigate()` - For routing

#### Components Used
- **Input** - For email and password
- **Button** - For login action

#### Navigation
- **Success:** `/dashboard`
- **Register Link:** `/register`

---

### 5. **Register.jsx** - User Registration

**Path:** `/src/pages/Register.jsx`  
**Route:** `/register`

#### Purpose
User registration with email, password, and confirmation.

#### State Management

```javascript
const [email, setEmail] = useState("");       // Email input
const [password, setPassword] = useState(""); // Password input
const [confirm, setConfirm] = useState("");   // Confirm password
const [error, setError] = useState("");       // Error messages
const [loading, setLoading] = useState(false); // Loading state
```

#### Methods & Functions

**`submit()` - Async Function**
- **Purpose:** Handle registration submission
- **Validations:**
  1. All fields required
  2. Passwords must match
  3. Password minimum 6 characters
- **Logic:**
  1. Validates input
  2. Calls `register()` hook method
  3. Auto-logs in if token received
  4. Navigates to dashboard or login
  5. Shows error messages
- **Hooks Used:**
  - `useAuth()` - For register function
  - `useContext(AuthContext)` - For context login
  - `useNavigate()` - For routing

#### Components Used
- **Input** - For email, password, confirm password
- **Button** - For sign up action

#### Navigation
- **Success (with token):** `/dashboard`
- **Success (no token):** `/login`
- **Login Link:** `/login`

---

### 6. **Settings.jsx** - Account Settings

**Path:** `/src/pages/Settings.jsx`  
**Route:** `/settings` (Protected)

#### Purpose
User account settings, token management, and application information.

#### State Management

```javascript
const [copied, setCopied] = useState(false); // Copy button state
```

#### Methods & Functions

**`handleCopyToken()` - Function**
- **Purpose:** Copy JWT token to clipboard
- **Logic:**
  1. Retrieves token from localStorage
  2. Copies to clipboard
  3. Shows "Copied!" feedback for 2 seconds
  4. Uses `navigator.clipboard.writeText()`

**`handleLogout()` - Function**
- **Purpose:** Logout user with confirmation
- **Logic:**
  1. Confirms logout action
  2. Calls context logout
  3. Navigates to login page
  4. Clears token from context

#### Components Used
- Input fields (disabled, display-only)
- Button for copy and logout

#### Display Sections

1. **Account Settings**
   - JWT Token display
   - Copy button with feedback

2. **API Configuration**
   - Base URL from environment variable
   - Environment variable name display

3. **Security**
   - Warning about token storage
   - Logout button

4. **About**
   - Application name
   - Version (3.0.0)
   - Build info

#### Environment Variables
```javascript
import.meta.env.VITE_API_BASE_URL // Backend base URL
```

---

## Components Documentation

### 1. **Input.jsx** - Reusable Input Component

**Path:** `/src/components/Input.jsx`  
**Type:** Functional Component

#### Props

```typescript
interface InputProps {
    label?: string;           // Label text above input
    type?: string;            // Input type (text, email, password, etc.)
    disabled?: boolean;       // Disable input
    ...props                  // All standard HTML input attributes
}
```

#### Example Usage

```jsx
<Input
    label="Email"
    type="email"
    placeholder="user@example.com"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    disabled={loading}
/>

<Input
    label="Optional Expiry"
    type="datetime-local"
    value={expiry}
    onChange={(e) => setExpiry(e.target.value)}
/>
```

#### Styling

```javascript
// Label
className="block mb-1 text-gray-300 font-medium"

// Input
className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 
           text-white placeholder-gray-400 focus:border-primary 
           focus:bg-gray-600 outline-none transition 
           disabled:opacity-50 disabled:cursor-not-allowed"
```

#### Features
- ✅ Responsive width (full width)
- ✅ Dark theme with green focus state
- ✅ Disabled state styling
- ✅ Placeholder text styling
- ✅ Smooth transitions

---

### 2. **Button.jsx** - Reusable Button Component

**Path:** `/src/components/Button.jsx`  
**Type:** Functional Component

#### Props

```typescript
interface ButtonProps {
    children: React.ReactNode;  // Button text or content
    disabled?: boolean;         // Disable button
    onClick?: () => void;       // Click handler
    ...props                    // All standard HTML button attributes
}
```

#### Example Usage

```jsx
<Button onClick={createUrl} disabled={loading}>
    {loading ? "Generating..." : "Generate"}
</Button>

<Button onClick={handleLogout}>
    Logout
</Button>
```

#### Styling

```javascript
className="w-full bg-primary hover:bg-green-600 disabled:bg-gray-600 
           disabled:cursor-not-allowed text-black font-semibold 
           py-2 rounded transition"
```

#### Features
- ✅ Full width (w-full)
- ✅ Primary color (#1DB954)
- ✅ Hover state (darker green)
- ✅ Disabled state (gray, not-allowed cursor)
- ✅ Smooth transitions

---

### 3. **UrlCard.jsx** - URL Display Card

**Path:** `/src/components/UrlCard.jsx`  
**Type:** Functional Component

#### Props

```typescript
interface UrlCardProps {
    url: {
        id: string | number;
        shortCode: string;
        longUrl: string;
        clickCount?: number;
        expiry?: string;
    };
    onDelete: (id: string | number) => void;
    onEdit?: (url: object) => void;
}
```

#### Example Usage

```jsx
<UrlCard
    key={url.id}
    url={url}
    onDelete={deleteUrl}
    onEdit={editUrl}
/>
```

#### State Management

```javascript
const [copied, setCopied] = useState(false); // Copy feedback state
```

#### Methods

**`handleCopy()` - Async Function**
- **Purpose:** Copy short URL to clipboard
- **Logic:**
  1. Constructs full short URL with origin
  2. Copies to clipboard
  3. Shows "Copied!" feedback for 2 seconds
  4. Handles copy errors gracefully

#### Display Content

```
┌────────────────────────────────┐
│ 03TG32b (Short Code - Green)   │
│ https://example.com/... (URL)  │
│ 📊 Clicks: 5                   │
│ ⏱️ Expires: Jan 1, 2025        │  (if set)
│                                │
│ [Copy] [Edit] [Delete]         │
└────────────────────────────────┘
```

#### Buttons

| Button | Color | Icon | Purpose |
|--------|-------|------|---------|
| Copy | Primary (Green) | FiCopy | Copy short URL |
| Edit | Blue | FiEdit2 | Edit expiry |
| Delete | Red | FiTrash2 | Delete URL |

#### Icons (react-icons/fi)
- `FiCopy` - Copy icon
- `FiEdit2` - Edit icon
- `FiTrash2` - Delete icon

#### PropTypes Validation

```javascript
UrlCard.propTypes = {
    url: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        shortCode: PropTypes.string.isRequired,
        longUrl: PropTypes.string.isRequired,
        clickCount: PropTypes.number,
        expiry: PropTypes.string,
    }).isRequired,
    onDelete: PropTypes.func.isRequired,
    onEdit: PropTypes.func,
};
```

---

### 4. **Navbar.jsx** - Top Navigation Bar

**Path:** `/src/components/Navbar.jsx`  
**Type:** Functional Component

#### Purpose
Fixed top navigation bar with logo and logout button.

#### Hooks Used
- `useContext(AuthContext)` - Access logout function
- `useNavigate()` - Navigate to login

#### Methods

**`handleLogout()` - Function**
- Calls context logout
- Navigates to login page

#### Display Structure

```
┌──────────────────────────────────────┐
│ Logo (Desktop)  [Spacer]  Logout Btn │
└──────────────────────────────────────┘
```

#### Responsive Design

| Device | Display |
|--------|---------|
| Mobile | Icon only logout (≤640px) |
| Desktop | Icon + "Logout" text |
| Logo | Hidden on mobile (shown in Sidebar) |

#### Styling

```javascript
// Container
className="w-full bg-darkBg px-4 lg:px-8 py-3 lg:py-4 flex 
           justify-between items-center border-b border-gray-700"

// Logout Button
className="flex items-center gap-1 lg:gap-2 bg-red-600 
           hover:bg-red-700 px-2 lg:px-4 py-2 rounded-lg"
```

#### Icons (react-icons/fi)
- `FiLogOut` - Logout icon

---

### 5. **Sidebar.jsx** - Navigation Menu

**Path:** `/src/components/Sidebar.jsx`  
**Type:** Functional Component

#### Purpose
Mobile drawer + Desktop fixed sidebar navigation.

#### State Management

```javascript
const [mobileOpen, setMobileOpen] = useState(false); // Mobile menu state
```

#### Hooks Used
- `useLocation()` - Get current route for active highlighting
- `useState()` - Manage mobile menu open/close

#### Methods

**`isActive(path)` - Helper Function**
- **Purpose:** Check if navigation item is active
- **Logic:** Compares current pathname with item path
- **Returns:** Boolean

#### Navigation Items

```javascript
const navItems = [
    { path: "/dashboard", label: "Dashboard", icon: FiHome },
    { path: "/my-urls", label: "My URLs", icon: FiLink },
    { path: "/analytics", label: "Analytics", icon: FiBarChart2 },
    { path: "/settings", label: "Settings", icon: FiSettings },
];
```

#### Structure

**Mobile (< 1024px)**
1. Header bar with logo and hamburger menu
2. Overlay drawer sliding from left
3. Backdrop overlay for outside click handling

**Desktop (≥ 1024px)**
1. Fixed 256px width sidebar
2. Always visible
3. Logo at top
4. Navigation items with left border highlight

#### Active State Styling

```javascript
// Active
"bg-transparent text-primary border-primary"

// Inactive
"text-gray-300 border-transparent hover:text-primary hover:bg-gray-700"
```

#### Icons (react-icons/fi)
- `FiHome` - Dashboard
- `FiLink` - My URLs
- `FiBarChart2` - Analytics
- `FiSettings` - Settings
- `FiMenu` - Mobile menu icon
- `FiX` - Close menu icon

#### Responsive Behavior

| Breakpoint | Behavior |
|-----------|----------|
| Mobile | Header bar + drawer overlay |
| Tablet | Drawer overlay (lg: 1024px) |
| Desktop | Fixed sidebar visible |

---

### 6. **AnalyticsChart.jsx** - LineChart Component

**Path:** `/src/components/AnalyticsChart.jsx`  
**Type:** Functional Component

#### Props

```typescript
interface AnalyticsChartProps {
    data: Array<{
        date: string;
        clicks: number;
    }>;
}
```

#### Example Usage

```jsx
<AnalyticsChart 
    data={[
        { date: "Jan 1", clicks: 3 },
        { date: "Jan 2", clicks: 7 },
        { date: "Jan 3", clicks: 5 }
    ]}
/>
```

#### Chart Components (Recharts)

```javascript
<ResponsiveContainer width="100%" height={300}>
    <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#555" />
        <XAxis dataKey="date" stroke="#ccc" />
        <YAxis stroke="#ccc" />
        <Tooltip contentStyle={{ backgroundColor: "#161B22", border: "1px solid #555" }} />
        <Line 
            type="monotone" 
            dataKey="clicks" 
            stroke="#1DB954"  // Green primary color
            strokeWidth={3}
            dot={{ fill: "#1DB954" }}  // Dot color
        />
    </LineChart>
</ResponsiveContainer>
```

#### Features
- ✅ Responsive width (100%)
- ✅ Fixed height (300px)
- ✅ Green primary color line
- ✅ Dark theme tooltip
- ✅ Grid with dashed lines
- ✅ X and Y axis labels

#### Data Format

```javascript
[
    { date: "Jan 1", clicks: 3 },
    { date: "Jan 2", clicks: 7 },
    { date: "Jan 3", clicks: 2 },
    // ... more data points
]
```

---

### 7. **ProtectedRoute.jsx** - Route Protection Wrapper

**Path:** `/src/components/ProtectedRoute.jsx`  
**Type:** Functional Component

#### Purpose
Wrap protected routes to ensure only authenticated users can access them.

#### Props

```typescript
interface ProtectedRouteProps {
    children?: React.ReactNode;
    element?: React.ReactNode;
}
```

#### Example Usage in App.jsx

```jsx
<Route 
    path="/dashboard" 
    element={<ProtectedRoute><Dashboard /></ProtectedRoute>} 
/>
```

#### Logic

```javascript
export default function ProtectedRoute({ children }) {
    const { token } = useContext(AuthContext);
    const nav = useNavigate();

    useEffect(() => {
        if (!token) {
            nav("/login");
        }
    }, [token, nav]);

    if (!token) {
        return null;  // or loading spinner
    }

    return (
        <div className="flex flex-col lg:flex-row min-h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Navbar />
                <main className="flex-1 overflow-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
```

#### Features
- ✅ Checks for authentication token
- ✅ Redirects to login if not authenticated
- ✅ Renders Sidebar and Navbar layout
- ✅ Responsive layout (mobile drawer + desktop sidebar)
- ✅ Flex layout for proper content spacing

---

## API & Utilities

### API Client Configuration - `axiosClient.js`

**Path:** `/src/api/axiosClient.js`

#### Base Configuration

```javascript
const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8081";

const api = axios.create({
  baseURL: BASE_URL,
  headers: { 
    "Content-Type": "application/json" 
  },
});
```

#### Request Interceptor

```javascript
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token") || localStorage.getItem("jwt");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);
```

**Features:**
- ✅ Auto-attaches JWT token from localStorage
- ✅ Supports multiple token keys (token, jwt)
- ✅ Error logging for debugging

#### Response Interceptor

```javascript
api.interceptors.response.use(
  (response) => {
    console.log("✓ Response received:", response.status);
    return response;
  },
  (error) => {
    if (error.message === "Network Error") {
      console.error("❌ CORS Error");
    }
    return Promise.reject(error);
  }
);
```

**Features:**
- ✅ Response status logging
- ✅ CORS error detection
- ✅ Helpful error messages

---

### API Wrapper Functions - `api.js`

**Path:** `/src/api/api.js`

#### `get(endpoint)` - Fetch Data

```javascript
const get = async (endpoint) => {
  try {
    const res = await api.get(endpoint);
    return res.data;
  } catch (err) {
    console.error(`GET ${endpoint} failed:`, err);
    throw err;
  }
};
```

**Usage:**
```javascript
const urls = await get("/urls/all");
```

#### `post(endpoint, data)` - Create/Update Data

```javascript
const post = async (endpoint, data) => {
  try {
    const res = await api.post(endpoint, data);
    return res.data;
  } catch (err) {
    console.error(`POST ${endpoint} failed:`, err);
    throw err;
  }
};
```

**Usage:**
```javascript
const newUrl = await post("/urls/create", { 
    longUrl: "https://example.com",
    expiry: null 
});
```

#### `del(endpoint)` - Delete Data

```javascript
const del = async (endpoint) => {
  try {
    const res = await api.delete(endpoint);
    return res.data;
  } catch (err) {
    console.error(`DELETE ${endpoint} failed:`, err);
    throw err;
  }
};
```

**Usage:**
```javascript
await del("/urls/delete/123");
```

#### `put(endpoint, data)` - Replace Data

```javascript
const put = async (endpoint, data) => {
  try {
    const res = await api.put(endpoint, data);
    return res.data;
  } catch (err) {
    console.error(`PUT ${endpoint} failed:`, err);
    throw err;
  }
};
```

**Usage:**
```javascript
const updated = await put("/urls/update/123", newData);
```

---

## Context & Hooks

### 1. **AuthContext** - Global Authentication State

**Path:** `/src/context/AuthContext.jsx`

#### Context Creation

```javascript
export const AuthContext = createContext();
```

#### AuthProvider Component

```javascript
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const login = (jwt) => {
    localStorage.setItem("token", jwt);
    setToken(jwt);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  const value = useMemo(() => ({ token, login, logout }), [token]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
```

#### Usage in Components

```javascript
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function MyComponent() {
    const { token, login, logout } = useContext(AuthContext);
    
    return (
        <div>
            {token && <p>Logged in</p>}
        </div>
    );
}
```

#### Provider Wrapping in App.jsx

```jsx
import { AuthProvider } from "./context/AuthContext";

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                {/* Routes */}
            </BrowserRouter>
        </AuthProvider>
    );
}
```

---

### 2. **useAuth Hook** - Authentication Logic

**Path:** `/src/hooks/useAuth.jsx`

#### Hook Definition

```javascript
export const useAuth = () => {
    const { login: contextLogin, logout: contextLogout } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    // ... methods
    
    return {
        login,
        register,
        logout,
        loading,
        error
    };
};
```

#### Methods

**`login(email, password)` - Async**

```javascript
const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
        const res = await api.post("/auth/login", { email, password });
        const token = res.data?.token || res.token;
        
        if (!token) {
            throw new Error("No token received");
        }
        
        localStorage.setItem("token", token);
        localStorage.setItem("jwt", token);
        contextLogin(token);
        
        setLoading(false);
        return res.data;
    } catch (err) {
        const errorMsg = err.response?.data?.message || err.message;
        setError(errorMsg);
        setLoading(false);
        throw err;
    }
};
```

**Usage:**
```javascript
const { login } = useAuth();
const data = await login("user@example.com", "password123");
```

**`register(email, password)` - Async**

```javascript
const register = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
        const res = await api.post("/auth/register", { email, password });
        
        if (res.data?.token) {
            const token = res.data.token;
            localStorage.setItem("token", token);
            contextLogin(token);
        }
        
        setLoading(false);
        return res.data;
    } catch (err) {
        const errorMsg = err.response?.data?.message || err.message;
        setError(errorMsg);
        setLoading(false);
        throw err;
    }
};
```

**Usage:**
```javascript
const { register } = useAuth();
const data = await register("user@example.com", "password123");
```

**`logout()` - Function**

```javascript
const logout = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("token");
    contextLogout();
};
```

**Usage:**
```javascript
const { logout } = useAuth();
logout();  // Clears tokens and context
```

#### Return Values

```javascript
{
    login: (email, password) => Promise<any>,
    register: (email, password) => Promise<any>,
    logout: () => void,
    loading: boolean,
    error: string | null
}
```

---

## Creating New Pages & Components

### Creating a New Page Component

#### Step 1: Create Page File

```bash
# Create new page file in src/pages/
touch src/pages/MyNewPage.jsx
```

#### Step 2: Write Page Component

```jsx
// src/pages/MyNewPage.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";

export default function MyNewPage() {
  const nav = useNavigate();
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Load data on mount
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      // Fetch data
      setData("Loaded data");
    } catch (err) {
      setError("Failed to load");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full p-4 lg:p-10">
      <h1 className="text-2xl lg:text-3xl font-bold mb-6">My New Page</h1>

      {error && (
        <div className="bg-red-900 bg-opacity-20 border border-red-600 p-3 rounded mb-4 text-red-400 text-sm">
          {error}
        </div>
      )}

      <Input 
        label="Input Label"
        value={data}
        onChange={(e) => setData(e.target.value)}
        disabled={loading}
      />

      <Button onClick={loadData} disabled={loading}>
        {loading ? "Loading..." : "Load"}
      </Button>
    </div>
  );
}
```

#### Step 3: Add Route in App.jsx

```jsx
import MyNewPage from "./pages/MyNewPage";

// Inside Routes
<Route 
  path="/my-new-page" 
  element={<ProtectedRoute><MyNewPage /></ProtectedRoute>} 
/>
```

#### Step 4: Add Navigation Item in Sidebar

```jsx
// In Sidebar.jsx, update navItems
const navItems = [
  { path: "/dashboard", label: "Dashboard", icon: FiHome },
  // ... other items
  { path: "/my-new-page", label: "My New Page", icon: FiStar },  // Add this
];
```

---

### Creating a New Component

#### Step 1: Create Component File

```bash
# Create new component file
touch src/components/MyNewComponent.jsx
```

#### Step 2: Write Component

```jsx
// src/components/MyNewComponent.jsx
import PropTypes from "prop-types";

function MyNewComponent({ title, description, onClick }) {
  return (
    <div className="bg-darkCard p-4 rounded-lg border border-gray-700 hover:border-primary transition">
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-400 text-sm mb-4">{description}</p>
      <button 
        onClick={onClick}
        className="bg-primary hover:bg-green-600 text-black font-semibold px-4 py-2 rounded transition"
      >
        Action
      </button>
    </div>
  );
}

MyNewComponent.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  onClick: PropTypes.func,
};

MyNewComponent.defaultProps = {
  description: "",
  onClick: () => {},
};

export default MyNewComponent;
```

#### Step 3: Use Component in Page

```jsx
import MyNewComponent from "../components/MyNewComponent";

export default function Dashboard() {
  return (
    <div>
      <MyNewComponent 
        title="My Component"
        description="This is a component"
        onClick={() => console.log("clicked")}
      />
    </div>
  );
}
```

---

### Component Best Practices

#### 1. **Use PropTypes for Validation**

```jsx
import PropTypes from "prop-types";

MyComponent.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    })
  ),
  onSelect: PropTypes.func,
  isActive: PropTypes.bool,
};

MyComponent.defaultProps = {
  items: [],
  onSelect: () => {},
  isActive: false,
};
```

#### 2. **Responsive Design with Tailwind**

```jsx
<div className="w-full p-4 lg:p-10">           {/* Padding */}
  <h1 className="text-2xl lg:text-3xl">      {/* Font size */}
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">  {/* Columns */}
    {/* Content */}
  </div>
</div>
```

#### 3. **Error Handling**

```jsx
{error && (
  <div className="bg-red-900 bg-opacity-20 border border-red-600 p-3 rounded mb-4 text-red-400 text-sm">
    {error}
  </div>
)}
```

#### 4. **Loading States**

```jsx
{loading ? (
  <p className="text-gray-400">Loading...</p>
) : (
  <div>{/* Content */}</div>
)}
```

---

### Page Template

```jsx
import { useState, useEffect } from "react";
import api from "../api/axiosClient";

export default function NewPage() {
  // ===== STATE MANAGEMENT =====
  const [state, setState] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ===== METHODS =====
  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.get("/endpoint");
      setState(res.data);
    } catch (err) {
      setError("Failed to load data");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  // ===== EFFECTS =====
  useEffect(() => {
    fetchData();
  }, []);

  // ===== RENDER =====
  return (
    <div className="w-full p-4 lg:p-10">
      <h1 className="text-2xl lg:text-3xl font-bold mb-6">Page Title</h1>

      {error && (
        <div className="bg-red-900 bg-opacity-20 border border-red-600 p-3 rounded mb-4 text-red-400 text-sm">
          {error}
        </div>
      )}

      {loading ? (
        <p className="text-gray-400 text-sm">Loading...</p>
      ) : (
        <div>
          {/* Content */}
        </div>
      )}
    </div>
  );
}
```

---

## Environment Configuration

### .env File Setup

```bash
# .env
VITE_API_BASE_URL=http://localhost:8081
```

### Usage in Code

```javascript
// Accessing environment variables
const apiUrl = import.meta.env.VITE_API_BASE_URL;
console.log(apiUrl);  // http://localhost:8081
```

### Vite Environment Variables Rules

- ✅ Prefix with `VITE_` to expose to client
- ✅ Access via `import.meta.env.VARIABLE_NAME`
- ✅ Not prefixed with `VITE_` are private (server-only)
- ✅ Changes require dev server restart

---

## File Organization Summary

### When to Create What

| File Type | Location | When |
|-----------|----------|------|
| **Page** | `src/pages/` | New routable view |
| **Reusable Component** | `src/components/` | Used multiple times |
| **Single-use Component** | `src/pages/` or inline | Used once in a page |
| **Hook** | `src/hooks/` | Shared logic across components |
| **Context** | `src/context/` | Global state needed everywhere |
| **Utility Function** | `src/utils/` (create if needed) | Helper functions |
| **API Function** | `src/api/` | Backend communication |

---

## Common Commands Reference

```bash
# Project Setup
npm create vite@latest my-app -- --template react
cd my-app
npm install

# Development
npm run dev              # Start dev server
npm run build           # Build for production
npm run preview         # Preview production build
npm run lint            # Check code quality

# Git Commands
git init                # Initialize repository
git add .               # Stage all changes
git commit -m "message" # Commit changes
git push                # Push to remote

# Npm Packages
npm install package-name           # Install package
npm install -D package-name        # Install as dev dependency
npm uninstall package-name         # Remove package
npm list                           # List installed packages
```

---

## Tailwind CSS Classes Reference

### Spacing
```
p-4   = padding: 16px
m-6   = margin: 24px
mb-4  = margin-bottom: 16px
gap-3 = gap: 12px
```

### Responsive Prefix
```
sm:   = min-width: 640px
md:   = min-width: 768px
lg:   = min-width: 1024px    (MAIN BREAKPOINT)
xl:   = min-width: 1280px
```

### Colors (Custom)
```
primary        = #1DB954 (Green)
darkBg         = #0D1117 (Very dark)
darkCard       = #161B22 (Dark card)
lightText      = #C9D1D9 (Light gray)
mutedText      = #8B949E (Muted gray)
accent         = #58A6FF (Blue)
```

### Common Utilities
```
w-full        = width: 100%
h-screen      = height: 100vh
flex          = display: flex
grid          = display: grid
rounded       = border-radius: 4px
rounded-lg    = border-radius: 8px
shadow-lg     = large box shadow
border        = 1px border
transition    = smooth transitions
```

---

## Troubleshooting Guide

### Issue: Page Not Loading
- **Check:** Routes in App.jsx
- **Fix:** Ensure import path is correct
- **Command:** Check browser console for errors

### Issue: Styles Not Applied
- **Check:** Tailwind class names spelled correctly
- **Fix:** Clear cache: `npm run dev` (should auto-reload)
- **Command:** Check DevTools computed styles

### Issue: API Not Connecting
- **Check:** Backend running on port 8081
- **Check:** CORS configuration in backend
- **Check:** VITE_API_BASE_URL in .env
- **Fix:** See CORS_SETUP.md in project

### Issue: Token Not Persisting
- **Check:** localStorage in DevTools
- **Fix:** Clear storage and re-login
- **Command:** `localStorage.clear()` in console

---

## Summary

This documentation covers:
✅ Complete project setup with Vite
✅ All 7 pages with detailed methods
✅ All 7 components with usage examples
✅ API client configuration and utilities
✅ Context and hooks implementation
✅ Step-by-step guides for creating new pages/components
✅ Best practices and patterns
✅ Environment configuration
✅ Troubleshooting guide

**For more help:** Check individual file comments and console logs during development.

