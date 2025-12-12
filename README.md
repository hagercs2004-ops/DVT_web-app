# DVT - Document Version Tracker (React)

A modern, production-ready React application for tracking document versions, detecting modifications, and comparing changes.

## Features

- 📁 Upload and manage multiple document versions
- 🔄 Compare any two versions with detailed metrics
- 📊 Advanced diff metrics (additions, deletions, character changes)
- 💬 Comment system for version annotations
- 📜 Activity log for tracking user actions
- 🌙 Dark mode support
- ♿ Accessibility features (ARIA labels, keyboard navigation)
- 📱 Responsive design (mobile-first)
- 🔍 Search and filter documents
- 📥 Download specific versions
- 🗑️ Delete documents
- ⚡ Real-time updates via polling

## Tech Stack

- **Frontend:** React 18.2 + TypeScript
- **State Management:** Zustand
- **Styling:** TailwindCSS 3.3
- **HTTP Client:** Axios with interceptors
- **Forms:** React Hook Form
- **Notifications:** React Hot Toast
- **Icons:** React Icons
- **Build Tool:** Vite
- **Backend:** Python Flask (localhost:5000)

## Quick Start

### Prerequisites

- Node.js 16+ and npm
- Python backend running on localhost:5000

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Visit http://localhost:5173

### Build

```bash
npm run build
```

### Preview

```bash
npm run preview
```

## Project Structure

```
src/
├── main.tsx              # Entry point
├── App.tsx               # Root component
├── api/                  # API client
├── stores/               # Zustand stores
├── hooks/                # Custom hooks
├── components/
│   ├── common/           # Reusable components
│   ├── document/         # Document-related components
│   ├── upload/           # Upload components
│   ├── diff/             # Diff viewer components
│   ├── comment/          # Comment components
│   ├── activity/         # Activity log
│   ├── search/           # Search components
│   └── layout/           # Layout components
├── pages/                # Page components
├── utils/                # Utility functions
├── types/                # TypeScript interfaces
└── styles/               # Global styles
```

## Key Components

### Stores (Zustand)
- **authStore:** User authentication and session
- **documentStore:** Document state management
- **uiStore:** Dark mode, modals, loading states
- **activityStore:** Activity log events

### Hooks
- **useAuth:** Authentication logic
- **useDocuments:** Fetch documents with pagination
- **useDarkMode:** Dark mode toggle
- **usePolling:** Real-time updates polling
- **useUploadQueue:** Upload queue management

### Pages
- **HomePage:** Documents list and upload
- **DocumentPage:** Document details with versions
- **DiffPage:** Version comparison
- **NotFoundPage:** 404 page

## API Integration

The app connects to a Python Flask backend on `localhost:5000` with the following endpoints:

- `GET /api/documents` - Get all documents
- `GET /api/document/{name}` - Get document details
- `POST /api/upload` - Upload a file
- `DELETE /api/delete-document/{name}` - Delete document
- `GET /api/compare/{name}/{v1}/{v2}` - Compare versions
- `GET /api/diff/{name}/{v1}/{v2}` - Get text diff
- `GET /api/image-diff/{name}/{v1}/{v2}` - Get image diff
- `GET /api/download/{name}/{version}` - Download version
- `POST /api/comment/{name}/{version}` - Add comment
- `GET /api/stats` - Get statistics

## Styling

All styling uses TailwindCSS with custom configuration:
- Custom color scheme (primary, secondary, success, danger, warning)
- Dark mode support via `dark:` classes
- Responsive design using Tailwind breakpoints
- No inline styles

## Accessibility

- ARIA labels on all interactive elements
- Keyboard navigation support
- Focus states for keyboard users
- Semantic HTML structure
- Color contrast compliance

## Environment Variables

Create a `.env.local` file:

```
VITE_API_URL=http://localhost:5000/api
```

## Development Tips

1. **State Management:** Use Zustand hooks to access/modify state
2. **API Calls:** Use `documentApi` for all backend communication
3. **Notifications:** Use `toast.success()`, `toast.error()` for user feedback
4. **Dark Mode:** Use `dark:` prefix for dark mode styles
5. **Forms:** Use React Hook Form for complex form handling

## Performance

- Code splitting with React lazy loading
- Optimized images and assets
- Memoized components to prevent unnecessary re-renders
- Efficient state management with Zustand

## License

MIT
