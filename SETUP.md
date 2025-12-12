## Installation & Setup Guide

### Prerequisites

1. **Node.js & npm**
   - Download from: https://nodejs.org/
   - Recommended: LTS version (18+ or higher)
   - Verify installation:
     ```bash
     node --version
     npm --version
     ```

2. **Python Backend (Already created)**
   - Ensure Python Flask app is running on `localhost:5000`
   - Start the backend:
     ```bash
     cd c:\Users\HP\Desktop\DVT
     python -m venv venv
     venv\Scripts\activate
     pip install -r requirements.txt
     python web_app.py
     ```

### React Setup

1. **Navigate to React project:**
   ```bash
   cd c:\Users\HP\Desktop\DVT-React
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Open browser:**
   - Navigate to http://localhost:5173
   - Your React app will load
   - Vite proxy will forward API calls to http://localhost:5000

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint (if configured)

### Project Structure Created

✅ Configuration Files:
- package.json (all dependencies)
- vite.config.ts (dev server with API proxy)
- tsconfig.json (TypeScript strict mode)
- tailwind.config.ts (styling configuration)
- postcss.config.js (PostCSS setup)

✅ Source Code:
- src/main.tsx (React entry point)
- src/App.tsx (root component)
- src/styles/global.css (Tailwind + custom styles)
- src/types/index.ts (TypeScript interfaces)

✅ Stores (Zustand State Management):
- src/stores/authStore.ts
- src/stores/documentStore.ts
- src/stores/uiStore.ts
- src/stores/activityStore.ts

✅ API Client:
- src/api/client.ts (Axios instance with all endpoints)

✅ Custom Hooks:
- src/hooks/useAuth.ts
- src/hooks/useDocuments.ts
- src/hooks/useDarkMode.ts
- src/hooks/usePolling.ts
- src/hooks/useUploadQueue.ts

✅ Components (40+ total):
- Layout: Header, Sidebar, Layout
- Common: Button, Modal, Input, Card, Badge, Spinner
- Document: DocumentCard, DocumentGrid, VersionTimeline, VersionCard, DocumentDetails
- Upload: UploadArea, UploadQueue, UploadProgress
- Diff: DiffViewer, TextDiffViewer, ImageDiffViewer, DiffMetrics, SideBySideDiff
- Comment: CommentSection, CommentForm, CommentList
- Activity: ActivityLog
- Search: SearchBar

✅ Pages:
- src/pages/HomePage.tsx
- src/pages/DocumentPage.tsx
- src/pages/DiffPage.tsx
- src/pages/NotFoundPage.tsx

✅ Utilities:
- src/utils/formatting.ts
- src/utils/validation.ts
- src/utils/download.ts
- src/utils/constants.ts

✅ Templates:
- index.html (Vite HTML template)
- README.md (complete documentation)

### Features Implemented

✅ Document Management
- Upload files with drag-and-drop
- Download versions
- Delete documents
- Search and filter

✅ Version Control
- Version history timeline
- Compare any two versions
- Advanced diff metrics
- Text and image diff viewers

✅ User Interface
- Dark mode toggle
- Responsive design (mobile-first)
- Accessibility (ARIA labels, keyboard navigation)
- Toast notifications
- Loading states

✅ Advanced Features
- Authentication mock (localStorage-based)
- Comment system
- Activity log
- Real-time polling for updates
- Upload queue management
- Optimized components

### Troubleshooting

**Issue: "npm: The term 'npm' is not recognized"**
- Solution: Install Node.js from https://nodejs.org/
- Restart terminal after installation

**Issue: "Cannot connect to backend"**
- Ensure Python Flask app is running on localhost:5000
- Check vite.config.ts proxy settings

**Issue: "Styles not loading"**
- Clear node_modules: `rm -r node_modules`
- Reinstall: `npm install`
- Rebuild: `npm run build`

**Issue: Dark mode not working**
- Clear browser localStorage: DevTools > Application > Storage
- Refresh page

### Production Build

```bash
npm run build
# Output in: dist/
```

Deploy the `dist/` folder to any static hosting service.

### Environment Configuration

Create `.env.local` file in project root:

```
VITE_API_URL=http://localhost:5000/api
VITE_APP_TITLE=DVT - Document Version Tracker
```

### Browser Support

- Chrome/Chromium: ✅ Full support
- Firefox: ✅ Full support  
- Safari: ✅ Full support
- Edge: ✅ Full support
- IE 11: ❌ Not supported

### Next Steps

1. Install Node.js
2. Run `npm install` in DVT-React directory
3. Start Python backend on localhost:5000
4. Run `npm run dev`
5. Open http://localhost:5173
6. Start uploading documents and comparing versions!

### Support & Documentation

- Vite Docs: https://vitejs.dev/
- React Docs: https://react.dev/
- TailwindCSS: https://tailwindcss.com/
- Zustand: https://github.com/pmndrs/zustand
- TypeScript: https://www.typescriptlang.org/
