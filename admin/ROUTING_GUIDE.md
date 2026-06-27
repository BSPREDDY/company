# Advanced Routing Guide

This guide explains the comprehensive routing system implemented in your admin application with real-time URL updates and proper route management.

## Features Implemented

### 1. **Route Configuration** (`utils/routeConfig.js`)
Centralized route definitions with metadata for breadcrumbs, icons, and parent routes.

```javascript
import { getRoute, buildUrl, getMainRoutes } from './utils/routeConfig';

// Get route path
const dashboardPath = getRoute('dashboard'); // '/dashboard'

// Build URL with parameters
const contactUrl = buildUrl('contactDetail', { id: 123 }); // '/contacts/123'

// Get all main navigation routes
const routes = getMainRoutes(); // [dashboard, contacts, ...]
```

### 2. **URL Synchronization** (`hooks/useUrlSync.js`)
Keeps component state in sync with URL query parameters for persistence and shareable URLs.

#### `useUrlSync()`
Manages general query parameters.

```javascript
import { useUrlSync } from './hooks/useUrlSync';

function MyComponent() {
  const { 
    queryParams,        // { search: 'john', filter: 'new' }
    updateQueryParams,  // Update URL params
    clearQueryParams,   // Remove specific params
    resetUrlState,      // Clear all params
  } = useUrlSync();

  // Update URL when state changes
  const handleSearch = (term) => {
    updateQueryParams({ search: term, page: 1 });
  };

  // Access current params
  const search = queryParams.search || '';
  
  return (
    <input 
      value={search}
      onChange={(e) => handleSearch(e.target.value)}
    />
  );
}
```

#### `useUrlPagination()`
Handles pagination with URL params (`?page=2&limit=10`).

```javascript
import { useUrlPagination } from './hooks/useUrlSync';

function DataTable() {
  const { page, limit, setPage, setLimit } = useUrlPagination(10);

  // page: current page number from URL
  // limit: items per page from URL
  
  return (
    <>
      <button onClick={() => setPage(page + 1)}>Next</button>
      <span>Page {page} of {totalPages}</span>
    </>
  );
}
```

#### `useUrlSearch()`
Manages search and filter parameters (`?search=term&filter=status`).

```javascript
import { useUrlSearch } from './hooks/useUrlSync';

function SearchBar() {
  const { search, filter, setSearch, setFilter } = useUrlSearch();

  return (
    <>
      <input 
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search..."
      />
      <select value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option value="">All</option>
        <option value="new">New</option>
      </select>
    </>
  );
}
```

### 3. **Breadcrumb Navigation** (`components/Breadcrumb.jsx`)
Automatic breadcrumb generation and custom breadcrumb support.

#### Automatic Breadcrumbs
Automatically builds breadcrumb trail from current route.

```javascript
import { Breadcrumb } from './components/Breadcrumb';

function Page() {
  return (
    <div>
      <Breadcrumb />  {/* Auto-generates: Home > Contacts > Contact Details */}
      <Content />
    </div>
  );
}
```

#### Custom Breadcrumbs
For custom breadcrumb structure.

```javascript
import { CustomBreadcrumb } from './components/Breadcrumb';

function Page() {
  const items = [
    { label: 'Home', path: '/dashboard' },
    { label: 'Contacts', path: '/contacts' },
    { label: 'John Doe', path: null }, // Current page (non-clickable)
  ];

  return <CustomBreadcrumb items={items} />;
}
```

### 4. **Route Transitions & Animations** (`components/RouteTransition.jsx`)
Smooth animations when navigating between routes.

#### Fade & Slide Transition
```javascript
import { RouteTransition } from './components/RouteTransition';

function Page() {
  return (
    <RouteTransition>
      <div>Page content fades and slides smoothly</div>
    </RouteTransition>
  );
}
```

#### Horizontal Slide
```javascript
import { SlideTransition } from './components/RouteTransition';

function Page() {
  return (
    <SlideTransition>
      <div>Page slides horizontally when navigating</div>
    </SlideTransition>
  );
}
```

#### Animated Page Container
```javascript
import { AnimatedPage } from './components/RouteTransition';

function Page() {
  return (
    <AnimatedPage delay={0.1}>
      <h1>Title animates in</h1>
      <p>Content animates in with stagger effect</p>
    </AnimatedPage>
  );
}
```

### 5. **Nested Routes & Dynamic Parameters** (`hooks/useNestedRoutes.js`)
Handle dynamic parameters and nested route navigation.

#### `useDynamicRoute()`
For ID-based routes like `/contacts/:id/edit`.

```javascript
import { useDynamicRoute } from './hooks/useNestedRoutes';

function ContactDetail() {
  const {
    id,                   // 123 (parsed as number if numeric)
    rawId,               // '123' (as string from URL)
    navigate,            // Standard navigate
    navigateToEdit,      // Go to /contacts/:id/edit
    navigateToDetail,    // Go to /contacts/:id
    isEditMode,          // Check if URL ends with /edit
    currentPath,         // Current full path
  } = useDynamicRoute();

  return (
    <div>
      <p>Contact ID: {id}</p>
      <button onClick={navigateToEdit}>Edit</button>
    </div>
  );
}
```

#### `useNestedRoutes()`
General nested route handling.

```javascript
import { useNestedRoutes } from './hooks/useNestedRoutes';

function NestedPage() {
  const {
    params,                    // URL params object
    navigate,                 // Navigate to any path
    navigateToNested,        // Navigate to nested route
    navigateToParent,        // Go to parent route
    navigateWithQuery,       // Navigate preserving query params
    currentPath,             // Current path
    parentPath,              // Parent path
  } = useNestedRoutes();

  return (
    <>
      <button onClick={navigateToParent}>Back</button>
      <button onClick={() => navigateWithQuery('/path', { page: 2 })}>
        Next Page
      </button>
    </>
  );
}
```

#### `useTabNavigation()`
For tab-based navigation within a route.

```javascript
import { useTabNavigation } from './hooks/useNestedRoutes';

function Dashboard() {
  const { currentTab, navigateToTab } = useTabNavigation('overview');

  return (
    <>
      <button onClick={() => navigateToTab('analytics')}>Analytics</button>
      {currentTab === 'overview' && <OverviewTab />}
      {currentTab === 'analytics' && <AnalyticsTab />}
    </>
  );
}
```

## URL Structure & Query Parameters

### Query Parameters Convention
All query parameters are URL-encoded and update in real-time:

```
/contacts?search=john&filter=new&page=2&limit=20

search  - Search term (syncs with search input)
filter  - Status filter (new, read, replied)
page    - Current page number (starts at 1)
limit   - Items per page (default: 10)
```

### Bookmarkable & Shareable URLs
All state is preserved in the URL, making pages bookmarkable and shareable:

- Current search: `?search=john`
- Current filter: `?filter=new`
- Current page: `?page=2`
- Combined: `?search=john&filter=new&page=2`

Users can bookmark these URLs and return to the exact same state.

## Real-Time URL Updates

State changes automatically update the URL without page reload:

```javascript
// When user types in search box
setSearch('john')  // URL becomes: /contacts?search=john

// When user clicks next page
setPage(2)  // URL becomes: /contacts?search=john&page=2

// When user changes filter
setFilter('new')  // URL becomes: /contacts?search=john&filter=new&page=1
```

## Dynamic Route Examples

### Contact Details Page
Navigate with ID parameter:

```javascript
// From contacts list - click a contact
navigate('/contacts/123');  // Opens contact with ID 123

// Inside contact detail page
const { id } = useDynamicRoute();
// id = 123
```

### Edit Mode Detection
Automatically detect edit mode from URL:

```javascript
const { navigateToEdit, isEditMode } = useDynamicRoute();

if (isEditMode) {
  // Show edit form
} else {
  // Show read-only view
}

// Navigate to edit
navigateToEdit();  // /contacts/123 → /contacts/123/edit
```

## Best Practices

### 1. Always Use URL Sync for Filters
Instead of local state for filters/search, use URL sync so users can share URLs:

```javascript
// Good - URL is updated
const { search, setSearch } = useUrlSearch();

// Avoid - URL not updated
const [search, setSearch] = useState('');
```

### 2. Reset Page When Filtering
When search or filter changes, reset to page 1:

```javascript
const setSearch = (term) => {
  updateQueryParams({ search: term, page: 1 });
};
```

### 3. Use Custom Breadcrumbs for Complex Hierarchies
For nested/dynamic routes, use custom breadcrumbs:

```javascript
const breadcrumbs = [
  { label: 'Home', path: '/dashboard' },
  { label: 'Contacts', path: '/contacts' },
  { label: contact.name, path: null },
];

<CustomBreadcrumb items={breadcrumbs} />
```

### 4. Preserve Query Params When Navigating
Use `navigateWithQuery` to keep filters/search when going to details:

```javascript
const handleViewDetails = (id) => {
  navigateWithQuery(`/contacts/${id}`, {
    search: queryParams.search,
    filter: queryParams.filter,
  });
};
```

### 5. Always Wrap Pages with RouteTransition
Provides smooth animations for better UX:

```javascript
<RouteTransition>
  <div className="w-full space-y-8">
    <Breadcrumb />
    <YourContent />
  </div>
</RouteTransition>
```

## Adding New Routes

### Step 1: Add to Route Config
```javascript
// utils/routeConfig.js
export const routeConfig = {
  newPage: {
    path: '/new-page',
    label: 'New Page',
    icon: 'newPage',
    breadcrumb: true,
  },
};
```

### Step 2: Create Page Component
```javascript
// pages/NewPage.jsx
import { Breadcrumb } from '../components/Breadcrumb';
import { RouteTransition } from '../components/RouteTransition';

export const NewPage = () => {
  return (
    <MainLayout>
      <RouteTransition>
        <div className="w-full space-y-8">
          <Breadcrumb />
          <h1>New Page</h1>
        </div>
      </RouteTransition>
    </MainLayout>
  );
};
```

### Step 3: Add Route to App.jsx
```javascript
<Route
  path="/new-page"
  element={
    <ProtectedRoute>
      <NewPage />
    </ProtectedRoute>
  }
/>
```

## Debugging URLs

### Log Current Query Params
```javascript
const { queryParams } = useUrlSync();
console.log('[v0] Current URL params:', queryParams);
```

### Check Current Route Info
```javascript
const location = useLocation();
console.log('[v0] Current path:', location.pathname);
console.log('[v0] Current search:', location.search);
```

### Monitor Route Changes
```javascript
useEffect(() => {
  console.log('[v0] Route changed to:', location.pathname);
}, [location.pathname]);
```

## URL Examples

| Page | URL |
|------|-----|
| Dashboard | `/dashboard` |
| Contacts List | `/contacts` |
| Contacts Filtered | `/contacts?filter=new&page=1` |
| Contacts Searched | `/contacts?search=john&page=1` |
| Contact Details | `/contacts/123` |
| Contact Edit | `/contacts/123/edit` |

## Troubleshooting

### URL Not Updating
- Ensure you're using URL sync hooks (`useUrlSearch`, `useUrlPagination`)
- Check that `updateQueryParams` is called correctly
- Verify query param names match your expectations

### Back Button Not Working
- Use `navigateToParent()` from `useNestedRoutes`
- Or use standard `navigate(-1)` from React Router

### Breadcrumb Not Showing
- Ensure route is added to `routeConfig.js` with `breadcrumb: true`
- Check that `<Breadcrumb />` component is rendered
- Verify route path matches the config

### Page Not Animating
- Wrap content with `<RouteTransition>` component
- Check that framer-motion is imported
- Ensure child elements are rendered inside the wrapper
