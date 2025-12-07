# URL Shortener

A modern, **fully responsive** web application that allows users to create, manage, and track shortened URLs with analytics. Built with React, Vite, and Tailwind CSS with complete mobile and desktop support.

**Current Version:** 3.0.0

## Features

✅ **Mobile & Desktop Responsive** - Seamless experience across all devices with adaptive layouts
✅ **Touch-Friendly Mobile Menu** - Overlay drawer navigation on mobile devices
✅ **Responsive Typography & Spacing** - Dynamic scaling for optimal readability
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
- **Styling:** Tailwind CSS v3 with Mobile-First Responsive Design
- **HTTP Client:** Axios with JWT interceptor
- **Routing:** React Router with Protected Routes
- **State Management:** React Context API
- **Charts:** Recharts
- **Icons:** React Icons (Feather - `react-icons/fi`)
- **Linting:** ESLint
- **Responsive Design:** Mobile-first approach with Tailwind breakpoints (sm: 640px, md: 768px, lg: 1024px)

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

The app will be available at `http://localhost:5174` (or next available port)

**Testing Responsive Design:**
- Open DevTools (F12) → Toggle Device Toolbar (Ctrl+Shift+M)
- Test different device sizes to see responsive layouts
- Or resize your browser window and observe breakpoint transitions

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

## Mobile Compatibility & Responsive Design

### Version 3.0.0 - Full Mobile Support

This application is **100% mobile-responsive** with comprehensive support for all device sizes from small phones (320px) to ultra-wide displays (1920px+).

### Responsive Breakpoints

The application uses Tailwind CSS breakpoints for responsive design:

| Breakpoint | Width | Usage |
|-----------|-------|-------|
| **sm:** | 640px | Small phones in landscape, tablets |
| **md:** | 768px | Large tablets in portrait |
| **lg:** | 1024px | Desktop threshold - Primary layout switch point |
| **xl:** | 1280px | Large desktop displays |
| **2xl:** | 1536px | Ultra-wide displays |

### Mobile Navigation

**On Mobile Devices (< 1024px):**
- Sidebar transforms into a **mobile header bar** with menu icon (≡)
- Tapping menu icon opens an **overlay drawer** that slides in from the left
- Navigation items are touch-friendly with adequate padding
- Menu automatically closes when a navigation item is tapped
- Logo and branding displayed in mobile header

**On Desktop (≥ 1024px):**
- Full fixed sidebar (256px width) visible on the left
- Navbar stays at the top with full branding
- Main content area adjusts to sidebar width
- No drawer overlay needed

### Responsive Component Features

#### Dashboard.jsx
- **Mobile:** Single column form (full width), stacked URL list
  - Padding: `p-4` (16px)
  - Heading: `text-2xl`
- **Desktop:** Constrained form width (`w-full lg:w-96`), table view
  - Padding: `p-4 lg:p-10`
  - Heading: `text-2xl lg:text-3xl`
  - Table text scaling: `text-xs lg:text-sm`

#### MyUrls.jsx
- **Mobile:** Single column grid of URL cards
  - Gap: `gap-3` (12px)
  - Responsive text sizing for card content
- **Desktop:** Multi-column grid layout
  - Gap: `gap-3 lg:gap-4`
  - Larger card text and spacing

#### Analytics.jsx
- **Mobile:** Single column stat cards, full-width charts
  - Grid: `grid-cols-1`
- **Tablet:** Two column layout
  - Grid: `md:grid-cols-2`
- **Desktop:** Three column layout
  - Grid: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`

#### Input Fields
- **Visibility:** Grey background (`bg-gray-700`) for clear visibility on both light and dark screens
- **Touch-Friendly:** Adequate padding and height for mobile touch targets
- **Focus State:** Enhanced border color and slight background change for clarity
- **Placeholder Text:** Light grey color (`placeholder-gray-400`) for distinction

#### Navbar & Sidebar
- **Adaptive Padding:** 
  - Mobile: `px-4 py-3` (compact)
  - Desktop: `lg:px-8 lg:py-4` (spacious)
- **Icon Scaling:** 
  - Mobile: Icon-only logout button
  - Desktop: Icon + text label
- **Logo Display:**
  - Mobile: Hidden from navbar, shown in mobile header
  - Desktop: Visible in navbar (`hidden lg:flex`)

### Mobile-First Development Approach

The application uses a **mobile-first** responsive strategy:
1. Default styles are optimized for mobile devices
2. Larger breakpoint classes (lg:, md:, xl:) enhance experience on bigger screens
3. Example: `p-4 lg:p-10` means 16px on mobile, 40px on desktop

### Touch Optimization

**Mobile-Specific Features:**
- Larger touch targets (≥44px minimum for buttons)
- Adequate spacing between interactive elements
- No hover-dependent functionality on mobile (all actions accessible via tap)
- Smooth transitions for menu animations
- Optimized font sizes for reading on small screens

**Responsive Typography:**
- Heading: `text-2xl lg:text-3xl` (24px mobile → 30px desktop)
- Body: `text-sm lg:text-base` (14px mobile → 16px desktop)
- Labels: `text-sm lg:text-base` (14px mobile → 16px desktop)
- Small text: `text-xs lg:text-sm` (12px mobile → 14px desktop)

### Testing Mobile Responsiveness

**Using Browser DevTools:**
```
1. Press F12 to open DevTools
2. Press Ctrl+Shift+M to toggle Device Toolbar
3. Select various devices from the dropdown (iPhone 12, iPad, Galaxy S21, etc.)
4. Resize viewport and verify layout changes at breakpoints
```

**Common Test Cases:**
- ✅ Mobile phone in portrait (375px width)
- ✅ Mobile phone in landscape (667px width)
- ✅ Tablet in portrait (768px width)
- ✅ Tablet in landscape (1024px width)
- ✅ Desktop (1280px+ width)
- ✅ Ultra-wide desktop (1920px width)

**Mobile Menu Testing:**
- ✅ Menu opens when hamburger (≡) is tapped
- ✅ Menu items are clickable
- ✅ Menu closes after navigation
- ✅ Menu closes when clicking outside
- ✅ Overlay drawer doesn't prevent scrolling on body

### Device Compatibility

**Tested Browsers:**
- Chrome (Desktop & Mobile)
- Firefox (Desktop & Mobile)
- Safari (Desktop & Mobile)
- Edge (Desktop)

**Device Compatibility:**
- iPhone/iPad (iOS 12+)
- Android devices (Android 6+)
- Windows/Mac/Linux desktops
- Tablets and hybrid devices
- All modern browsers with ES6+ support

### Performance Optimization

**Mobile Optimizations:**
- Minimal CSS through Tailwind's PurgeCSS
- Efficient component re-renders
- Lazy loading of routes
- Optimized chart rendering on mobile
- Responsive images and icons

### Version 3.0.0 Improvements

**Mobile Compatibility Updates:**
- ✅ Complete responsive sidebar with mobile drawer menu
- ✅ Touch-optimized navigation and buttons
- ✅ Responsive typography scaling across all pages
- ✅ Mobile-friendly forms and input fields
- ✅ Adaptive grid layouts (1-col → 2-col → 3-col)
- ✅ Responsive spacing and padding adjustments
- ✅ Mobile header with integrated branding
- ✅ Removed dependency issues preventing mobile builds
- ✅ Full mobile testing and validation

---

## Configuration (Original)


## Page & Component Guide

### Pages

#### Dashboard.jsx
- **Purpose:** Primary hub for creating shortened URLs
- **Responsive Features:**
  - Mobile: Full-width form with stacked layout
  - Desktop: Constrained form width with side-by-side content
  - Responsive padding: `p-4 lg:p-10`
  - Heading scaling: `text-2xl lg:text-3xl`
- **Features:**
  - URL creation form with long URL input
  - Optional expiry date selection
  - Display of analytics overview chart
  - URL list in table format (mobile: card list, desktop: table)

#### MyUrls.jsx
- **Purpose:** View and manage all your created URLs
- **Responsive Features:**
  - Mobile: Single column card grid
  - Tablet: Two column grid
  - Desktop: Three column grid
  - Gap scaling: `gap-3 lg:gap-4`
- **Features:**
  - Grid view of all user URLs
  - Quick copy-to-clipboard functionality
  - Edit URL expiry dates
  - Delete URLs with confirmation
  - Click count display
  - Expiry date display (if set)

#### Analytics.jsx
- **Purpose:** Track and analyze URL performance
- **Responsive Features:**
  - Mobile: Single column stat cards (`grid-cols-1`)
  - Tablet: Two column layout (`md:grid-cols-2`)
  - Desktop: Three column layout (`lg:grid-cols-3`)
  - Responsive padding: `p-4 lg:p-10`
- **Features:**
  - Total clicks counter
  - Click trends over time (line chart)
  - Device breakdown (desktop, mobile, tablet)
  - Referrer source analysis
  - Individual URL click breakdown

#### Login.jsx & Register.jsx
- **Purpose:** User authentication
- **Responsive Features:**
  - Mobile: Full-screen responsive card
  - Desktop: Centered card with maximum width
  - Input fields with grey background for visibility
  - URLShortener branding and logo
- **Features:**
  - Form validation
  - Error messages
  - Loading states
  - JWT token management

#### Settings.jsx
- **Purpose:** User account settings and application information
- **Responsive Features:**
  - Mobile: Single column layout (`p-4`)
  - Desktop: Spacious layout (`lg:p-10`)
  - Button group: Stacked on mobile (`flex-col`), side-by-side on tablet/desktop (`sm:flex-row`)
  - Text scaling: `text-sm lg:text-base`
- **Features:**
  - Account settings display
  - Token management
  - API configuration info
  - Application version (v3.0.0)
  - Security warnings and best practices

### Components

#### UrlCard.jsx
- **Props:** `url` (object), `onDelete` (function), `onEdit` (function)
- **Responsive Features:**
  - Touch-friendly button padding and sizing
  - Responsive text sizing for all content
- **Features:**
  - Displays short code, long URL, click count
  - **Copy Button** - Copies short URL to clipboard with visual feedback
  - **Edit Button** - Opens prompt to modify expiry date
  - **Delete Button** - Deletes URL with confirmation
  - Shows expiry date if set
  - Icons from react-icons/fi (Feather)

#### Navbar.jsx
- **Purpose:** Top navigation bar with app branding and logout
- **Responsive Features:**
  - Mobile: Icon-only logout, compact padding (`px-4 py-3`)
  - Desktop: Icon + text logout, expanded padding (`lg:px-8 lg:py-4`)
  - Logo hidden on mobile (`hidden lg:flex`), shown in sidebar header instead
  - Responsive font sizing: `text-sm lg:text-base`
- **Features:**
  - App logo and name (desktop only)
  - User greeting (when logged in)
  - Logout button with icon
  - Fixed positioning with proper z-index

#### Sidebar.jsx
- **Purpose:** Mobile-responsive navigation menu
- **Responsive Features:**
  - **Mobile (< 1024px):**
    - Header bar with hamburger menu icon
    - Overlay drawer that slides from left
    - Full-screen backdrop overlay
    - Touch-friendly navigation items
    - Auto-close on navigation
  - **Desktop (≥ 1024px):**
    - Fixed 256px sidebar on left
    - Full navigation always visible
    - No drawer overlay
  - Active item styling: `bg-transparent text-primary border-primary`
  - Inactive hover: `hover:text-primary hover:bg-gray-700`
- **Features:**
  - Icon-based navigation (Home, Links, Analytics, Settings)
  - Logout functionality
  - Active route highlighting
  - No external dependencies (uses only react-icons/fi)

#### AnalyticsChart.jsx
- **Purpose:** Displays click trends
- **Responsive Features:**
  - Full-width on mobile
  - Responsive container sizing
  - Adaptive chart dimensions
- **Features:**
  - Line chart for daily click data
  - Responsive design

#### Input.jsx
- **Purpose:** Reusable form input component
- **Responsive Features:**
  - Touch-friendly minimum height
  - Responsive padding: `px-3 py-2 lg:px-4 lg:py-3`
  - Text color: `text-white` for visibility
  - Grey background: `bg-gray-700` for distinction from surroundings
- **Features:**
  - Placeholder text support
  - Border styling with focus state
  - Smooth transitions
  - Label rendering
  - Props: `label`, `type`, `value`, `onChange`, `placeholder`

#### Button.jsx
- **Purpose:** Reusable button component
- **Responsive Features:**
  - Touch-friendly minimum dimensions
  - Responsive padding and font sizing
- **Features:**
  - Primary and secondary variants
  - Loading states
  - Disabled states
  - Icon support

#### ProtectedRoute.jsx
- **Purpose:** Layout wrapper and route protection
- **Responsive Features:**
  - Mobile: Vertical flex layout (`flex-col`)
  - Desktop: Horizontal flex layout (`flex-row`) with sidebar
  - Proper sidebar integration on mobile (via Sidebar header)
  - Navbar positioning at top
  - Main content area scaling with sidebar width on desktop
- **Features:**
  - Checks authentication via AuthContext
  - Redirects to login if not authenticated
  - Renders Navbar and Sidebar
  - Renders protected page content
  - Maintains responsive layout structure

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

### Mobile-Specific Issues

#### Mobile Menu Not Opening
- **Issue:** Hamburger menu (≡) on mobile doesn't open the navigation drawer
- **Solution:** 
  1. Clear browser cache (Ctrl+Shift+Delete on Windows)
  2. Hard refresh the page (Ctrl+F5)
  3. Check browser console for JavaScript errors
  4. Ensure you're on a viewport width < 1024px

#### Text Too Small on Mobile
- **Issue:** Text is hard to read on small screens
- **Solution:**
  1. The app uses responsive typography (auto-scales with breakpoints)
  2. Zoom in using your device's pinch-zoom gesture
  3. Check that DevTools device emulation is set to a real device (not custom)

#### Buttons Not Clickable on Mobile
- **Issue:** Mobile buttons appear but don't respond to taps
- **Solution:**
  1. Ensure you're tapping the button area, not just the icon
  2. Wait for page to fully load
  3. Check for JavaScript console errors
  4. Clear browser cache and refresh

#### Layout Broken on Tablet
- **Issue:** Layout looks wrong on tablet devices
- **Solution:**
  1. Confirm your tablet viewport width (DevTools shows this)
  2. Check the responsive breakpoints (sm: 640px, md: 768px, lg: 1024px)
  3. Try rotating device between portrait/landscape
  4. Clear cache and refresh

### General Issues

#### CORS (Cross-Origin) Error
**Error:** `Access to XMLHttpRequest at 'http://localhost:8081/auth/register' from origin 'http://localhost:5174' has been blocked by CORS policy`

**Solution:** Your backend needs CORS configuration. See [`CORS_SETUP.md`](./CORS_SETUP.md) for detailed backend setup instructions for:
- Spring Boot
- Node.js/Express
- Python/Flask
- Other frameworks

#### API Connection Issues
1. Verify backend is running on `http://localhost:8081`
2. Check CORS configuration in backend (see CORS_SETUP.md)
3. Open DevTools → Network tab to inspect requests
4. Check browser Console for error messages

#### Authentication Issues
1. Clear `localStorage` (`localStorage.clear()` in console)
2. Ensure token is valid and not expired
3. Check that endpoints are correct in `api.js`

#### Styling Issues
1. Ensure Tailwind config paths are correct
2. Run `npm run build` to rebuild CSS
3. Clear browser cache (Ctrl+Shift+Delete)
4. Verify responsive classes are applied (inspect element in DevTools)

#### Build Errors
- Ensure all dependencies are installed: `npm install`
- Check that no external packages are missing
- Verify Node.js version is 14+ : `node --version`
- Try clearing node_modules and reinstalling: `rm -r node_modules && npm install`

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

## Changelog

### Version 3.0.0 (Latest)
**Major Update - Full Mobile Responsiveness & Bug Fixes**

**New Features:**
- ✅ Complete mobile and tablet responsiveness
- ✅ Mobile drawer navigation menu with overlay
- ✅ Touch-optimized interface with adequate button/touch target sizing
- ✅ Responsive typography that scales across all device sizes
- ✅ Adaptive grid layouts (1-col mobile → 2-col tablet → 3-col desktop)
- ✅ Responsive spacing and padding adjustments
- ✅ Mobile header with integrated app branding and menu

**Improvements:**
- ✅ Fixed sidebar text visibility issues (transparent background styling)
- ✅ Enhanced input field visibility (grey background for better contrast)
- ✅ Removed problematic external dependencies (@headlessui/react, @radix-ui/react-icons)
- ✅ Improved navigation component performance
- ✅ Professional branded login/register pages with URLShortener logo
- ✅ Enhanced form input styling with focus states

**Bug Fixes:**
- ✅ Fixed layout misalignment issues between navbar, sidebar, and content
- ✅ Fixed editUrl API payload (now sends both longUrl and expiry correctly)
- ✅ Fixed sidebar text being hidden by green highlight overlay
- ✅ Fixed missing dependencies preventing builds

**Testing & Validation:**
- ✅ Tested on mobile phones (portrait & landscape)
- ✅ Tested on tablets (portrait & landscape)
- ✅ Tested on desktop (multiple sizes)
- ✅ Verified all responsive breakpoints (sm, md, lg, xl)
- ✅ Validated touch interactions and mobile menu
- ✅ Cross-browser testing (Chrome, Firefox, Safari, Edge)

**Development:**
- Mobile-first design approach
- Comprehensive Tailwind CSS responsive classes
- Zero external UI library dependencies
- Performance optimized for all devices
- Improved developer experience with clear component structure

---

### Version 1.0.0 (Initial Release)
- Basic URL shortening functionality
- User authentication with JWT
- Analytics dashboard
- Settings page
- Desktop-only layout

## Support

For issues or questions:
1. Check existing GitHub issues
2. Create a new issue with detailed description
3. Include error messages and steps to reproduce
4. Specify your device type and browser when reporting mobile issues
"# urlShortenerf" 
