# URL Shortener

A modern web application that allows users to create, manage, and track shortened URLs with analytics. Built with React, Vite, and Tailwind CSS.

## Features

✅ **User Authentication** - Secure registration and login with JWT tokens
✅ **URL Shortening** - Convert long URLs into short, memorable links
✅ **URL Management** - View, edit, and delete your shortened URLs with copy-to-clipboard
✅ **Analytics** - Track click counts and URL performance
✅ **Expiry Management** - Set optional expiration dates for URLs
✅ **Dashboard** - Centralized view with URL creation and management
✅ **Protected Routes** - Secure pages that require authentication
✅ **Icon Navigation** - Modern sidebar with intuitive icons for easy navigation

## Tech Stack

- **Frontend Framework:** React 18
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **HTTP Client:** Axios
- **Routing:** React Router
- **State Management:** React Context API
- **Charts:** Recharts
- **Icons:** React Icons (Feather)
- **Linting:** ESLint

## Project Structure

```
urlShortenerf/
├── src/
│   ├── pages/
│   │   ├── Dashboard.jsx       # Main dashboard with URL creation
│   │   ├── MyUrls.jsx          # View and manage all URLs
│   │   ├── Login.jsx           # User login page
│   │   ├── Register.jsx        # User registration page
│   │   ├── Analystics.jsx      # Analytics dashboard
│   │   ├── Settings.jsx        # User settings
│   │   └── NotFound.jsx        # 404 error page
│   ├── components/
│   │   ├── Navbar.jsx          # Top navigation bar
│   │   ├── Sidebar.jsx         # Side navigation menu
│   │   ├── UrlCard.jsx         # URL card component
│   │   ├── AnalyticsChart.jsx  # Chart visualization
│   │   ├── Button.jsx          # Reusable button component
│   │   ├── Input.jsx           # Reusable input component
│   │   └── ProtectedRoute.jsx  # Route protection wrapper
│   ├── context/
│   │   └── AuthContext.jsx     # Authentication context
│   ├── hooks/
│   │   └── useAuth.jsx         # Authentication hook
│   ├── api/
│   │   ├── api.js              # API helper functions
│   │   └── axiosClient.js      # Axios instance configuration
│   ├── App.jsx                 # Main app component
│   ├── App.css                 # App styles
│   ├── index.css               # Global styles
│   └── main.jsx                # Entry point
├── tailwind.config.js          # Tailwind CSS configuration
├── postcss.config.js           # PostCSS configuration
├── vite.config.js              # Vite configuration
├── eslint.config.js            # ESLint configuration
├── index.html                  # HTML entry point
├── package.json                # Dependencies and scripts
└── README.md                   # This file
```

## Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd urlShortenerf
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   Create a `.env` file in the root directory with:
   ```
   VITE_API_BASE_URL=http://localhost:8081
   ```

## Getting Started

### Development Server

Run the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## API Endpoints

The application connects to a backend API with the following endpoints:

### Authentication
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login and receive JWT token

### URL Management
- `POST /urls/create` - Create a new shortened URL
- `GET /urls/all` - Get all user's URLs
- `DELETE /urls/delete/{id}` - Delete a URL
- `POST /urls/update/{id}` - Update a URL (expiry, etc.)

### Requirements
- Backend server running on `http://localhost:8081`
- CORS enabled for `http://localhost:5173`
- JWT authentication for protected endpoints

## Authentication Flow

1. User registers or logs in
2. Backend returns JWT token
3. Token stored in `localStorage` as `token`
4. Token automatically included in all API requests via axios interceptor
5. Protected routes validate token before rendering

## Configuration

### Tailwind CSS Colors

The following custom colors are configured in `tailwind.config.js`:

```javascript
colors: {
  primary: "#1DB954",      // Spotify green
  darkBg: "#0D1117",       // Dark background
  darkCard: "#161B22",     // Card background
  lightText: "#C9D1D9",    // Light text
  mutedText: "#8B949E",    // Muted text
  accent: "#58A6FF",       // Blue accent
}
```

## Page & Component Guide

### Pages

#### Dashboard.jsx
- **Purpose:** Primary hub for creating shortened URLs
- **Features:**
  - URL creation form with long URL input
  - Optional expiry date selection
  - Display of analytics overview chart
  - URL list in table format (when fetched)

#### MyUrls.jsx
- **Purpose:** View and manage all your created URLs
- **Features:**
  - Grid view of all user URLs
  - Quick copy-to-clipboard functionality
  - Edit URL expiry dates
  - Delete URLs with confirmation
  - Click count display
  - Expiry date display (if set)

#### Analytics.jsx
- **Purpose:** Track and analyze URL performance
- **Features:**
  - Total clicks counter
  - Click trends over time (line chart)
  - Device breakdown (desktop, mobile, tablet)
  - Referrer source analysis
  - Individual URL click breakdown

#### Login.jsx & Register.jsx
- **Purpose:** User authentication
- **Features:**
  - Form validation
  - Error messages
  - Loading states
  - JWT token management

#### Settings.jsx
- **Purpose:** User account settings (placeholder)

### Components

#### UrlCard.jsx
- **Props:** `url` (object), `onDelete` (function), `onEdit` (function)
- **Features:**
  - Displays short code, long URL, click count
  - **Copy Button** - Copies short URL to clipboard with visual feedback
  - **Edit Button** - Opens prompt to modify expiry date
  - **Delete Button** - Deletes URL with confirmation
  - Shows expiry date if set
  - Icons from react-icons/fi (Feather)

#### Navbar.jsx & Sidebar.jsx
- **Purpose:** Navigation components
- **Features:**
  - Fixed sidebar with icon-based navigation
  - Active route highlighting
  - Logout functionality
  - Responsive layout with ml-64 offset for fixed sidebar

#### AnalyticsChart.jsx
- **Purpose:** Displays click trends
- **Features:**
  - Line chart for daily click data
  - Responsive design

## Configuration

## Development Guidelines

### Components
- Use functional components with hooks
- Keep components focused and reusable
- Pass data via props or context

### State Management
- Use `useState` for local component state
- Use `AuthContext` for global auth state
- Use custom hooks for common logic (e.g., `useAuth`)

### Error Handling
- Display user-friendly error messages
- Log errors to console for debugging
- Use try-catch in async operations

### Styling
- Use Tailwind utility classes
- Maintain consistent spacing and colors
- Use custom color variables from config

## Troubleshooting

### API Connection Issues
1. Verify backend is running on `http://localhost:8081`
2. Check CORS configuration in backend
3. Open DevTools → Network tab to inspect requests
4. Check browser Console for error messages

### Authentication Issues
1. Clear `localStorage` (`localStorage.clear()` in console)
2. Ensure token is valid and not expired
3. Check that endpoints are correct in `api.js`

### Styling Issues
1. Ensure Tailwind config paths are correct
2. Run `npm run build` to rebuild CSS
3. Clear browser cache (Ctrl+Shift+Delete)

## Scripts

```json
{
  "dev": "vite",                 // Start development server
  "build": "vite build",         // Build for production
  "preview": "vite preview",     // Preview production build
  "lint": "eslint ."             // Run ESLint
}
```

## Dependencies

Key dependencies used in this project:

- `react` - UI library
- `react-router-dom` - Routing
- `axios` - HTTP client
- `tailwindcss` - CSS framework
- `recharts` - Charting library
- `react-icons` - Icon library
- `postcss` - CSS processing
- `autoprefixer` - CSS vendor prefixes
- `prop-types` - Runtime type checking for props
- `eslint` - Code linting

## Security Notes

⚠️ **Important for Production:**
- Use `httpOnly` cookies instead of `localStorage` for token storage
- Implement proper HTTPS
- Validate input on both frontend and backend
- Use environment variables for sensitive data
- Implement rate limiting on backend
- Add CSRF protection

## Contributing

1. Create a feature branch (`git checkout -b feature/YourFeature`)
2. Commit changes (`git commit -m 'Add YourFeature'`)
3. Push to branch (`git push origin feature/YourFeature`)
4. Open a Pull Request

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Support

For issues or questions:
1. Check existing GitHub issues
2. Create a new issue with detailed description
3. Include error messages and steps to reproduce
"# urlShortenerf" 
