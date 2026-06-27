# Routing Quick Reference

## Copy-Paste Code Examples

### 1. Add Search with Real-Time URL Updates

```javascript
import { useUrlSearch } from './hooks/useUrlSync';

function MyPage() {
  const { search, setSearch } = useUrlSearch();

  return (
    <input 
      placeholder="Search..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
  // URL updates: /page?search=term
}
```

### 2. Add Pagination with URL

```javascript
import { useUrlPagination } from './hooks/useUrlSync';

function DataTable() {
  const { page, limit, setPage } = useUrlPagination(10);

  return (
    <>
      <table>
        {/* Your data for page */}
      </table>
      <button onClick={() => setPage(page - 1)}>Previous</button>
      <span>Page {page}</span>
      <button onClick={() => setPage(page + 1)}>Next</button>
    </>
  );
  // URL updates: /page?page=2&limit=10
}
```

### 3. Add Breadcrumbs to Any Page

```javascript
import { Breadcrumb } from './components/Breadcrumb';

function MyPage() {
  return (
    <div>
      <Breadcrumb />  {/* Auto-generates breadcrumbs */}
      <h1>My Page</h1>
    </div>
  );
}
```

### 4. Add Page Transitions

```javascript
import { RouteTransition } from './components/RouteTransition';

function MyPage() {
  return (
    <RouteTransition>
      <div>
        <h1>Page with smooth animation</h1>
      </div>
    </RouteTransition>
  );
}
```

### 5. Create Dynamic Route Page

```javascript
import { useDynamicRoute } from './hooks/useNestedRoutes';
import { Breadcrumb } from './components/Breadcrumb';
import { RouteTransition } from './components/RouteTransition';

function DetailPage() {
  const { id, navigateToParent, navigateToEdit } = useDynamicRoute();

  return (
    <RouteTransition>
      <div>
        <Breadcrumb />
        <h1>Item #{id}</h1>
        <button onClick={navigateToEdit}>Edit</button>
        <button onClick={navigateToParent}>Back</button>
      </div>
    </RouteTransition>
  );
}
```

### 6. Add Filter Dropdown with URL

```javascript
import { useUrlSearch } from './hooks/useUrlSync';

function FilterDropdown() {
  const { filter, setFilter } = useUrlSearch();

  return (
    <select value={filter} onChange={(e) => setFilter(e.target.value)}>
      <option value="">All</option>
      <option value="new">New</option>
      <option value="read">Read</option>
    </select>
  );
  // URL updates: /page?filter=new
}
```

### 7. Add Custom Breadcrumbs

```javascript
import { CustomBreadcrumb } from './components/Breadcrumb';

function DetailPage({ itemName }) {
  return (
    <CustomBreadcrumb 
      items={[
        { label: 'Home', path: '/dashboard' },
        { label: 'Items', path: '/items' },
        { label: itemName, path: null },
      ]} 
    />
  );
}
```

---

## Hooks Overview

### `useUrlSearch()`
```javascript
const { search, filter, setSearch, setFilter } = useUrlSearch();
```
**Updates URL with:** `?search=term&filter=status`

### `useUrlPagination(itemsPerPage)`
```javascript
const { page, limit, setPage, setLimit } = useUrlPagination(10);
```
**Updates URL with:** `?page=2&limit=10`

### `useDynamicRoute()`
```javascript
const { id, navigateToEdit, navigateToParent, isEditMode } = useDynamicRoute();
```
**For routes:** `/items/:id` and `/items/:id/edit`

### `useNestedRoutes()`
```javascript
const { params, navigateToNested, navigateToParent, navigateWithQuery } = useNestedRoutes();
```
**Advanced nested route handling**

---

## Components Overview

### `<Breadcrumb />`
Auto-generates breadcrumbs from current route. Add to any page.

### `<CustomBreadcrumb items={[...]} />`
Manual breadcrumb with custom items.

### `<RouteTransition>`
Wraps page content for smooth transition animations.

### `<SlideTransition>`
Alternative transition with horizontal slide.

---

## URL Examples

| Action | URL |
|--------|-----|
| View page | `/contacts` |
| Search | `/contacts?search=john` |
| Filter | `/contacts?filter=new` |
| Paginate | `/contacts?page=2` |
| Combined | `/contacts?search=john&filter=new&page=2` |
| Detail view | `/contacts/123` |
| Edit view | `/contacts/123/edit` |

---

## Common Patterns

### Pattern 1: List with Search, Filter, Pagination
```javascript
import { useUrlSearch, useUrlPagination } from './hooks/useUrlSync';

function ListPage() {
  const { search, filter, setSearch, setFilter } = useUrlSearch();
  const { page, setPage } = useUrlPagination(10);

  // URL: /items?search=john&filter=new&page=2
  // All state preserved in URL and bookmarkable
}
```

### Pattern 2: Master-Detail Navigation
```javascript
import { useDynamicRoute } from './hooks/useNestedRoutes';

// List page
function ItemList() {
  navigate(`/items/${id}`);  // Navigate to detail
}

// Detail page
function ItemDetail() {
  const { id, navigateToParent } = useDynamicRoute();
  // /items/123
}
```

### Pattern 3: Nested Tabs
```javascript
import { useTabNavigation } from './hooks/useNestedRoutes';

function Dashboard() {
  const { currentTab, navigateToTab } = useTabNavigation('overview');
  
  return (
    <>
      <button onClick={() => navigateToTab('analytics')}>Analytics</button>
      {currentTab === 'overview' && <Overview />}
      {currentTab === 'analytics' && <Analytics />}
    </>
  );
}
```

---

## Adding a New Route

### 1. Add to Route Config
```javascript
// utils/routeConfig.js
newPage: {
  path: '/new-page',
  label: 'New Page',
  breadcrumb: true,
}
```

### 2. Create Component
```javascript
// pages/NewPage.jsx
import { Breadcrumb } from '../components/Breadcrumb';
import { RouteTransition } from '../components/RouteTransition';

export const NewPage = () => (
  <RouteTransition>
    <div>
      <Breadcrumb />
      <h1>New Page</h1>
    </div>
  </RouteTransition>
);
```

### 3. Add Route to App.jsx
```javascript
import { NewPage } from './pages/NewPage';

// In Routes:
<Route
  path="/new-page"
  element={<ProtectedRoute><NewPage /></ProtectedRoute>}
/>
```

---

## Debugging

### Check Current URL
```javascript
import { useLocation } from 'react-router-dom';

const location = useLocation();
console.log('Current path:', location.pathname);
console.log('Query params:', location.search);
```

### Check Query Params
```javascript
import { useUrlSearch } from './hooks/useUrlSync';

const { search, filter } = useUrlSearch();
console.log('Search:', search);
console.log('Filter:', filter);
```

### Check Route Params
```javascript
import { useParams } from 'react-router-dom';

const { id } = useParams();
console.log('ID from URL:', id);
```

---

## Best Practices Checklist

- [ ] Use URL sync hooks for filters/search (not local state)
- [ ] Wrap pages with `<RouteTransition>` for animations
- [ ] Add `<Breadcrumb />` to every page
- [ ] Reset page to 1 when changing search/filter
- [ ] Use `navigateWithQuery()` to preserve URL state
- [ ] Add route to `routeConfig.js` before creating page
- [ ] Use `useDynamicRoute()` for ID-based routes
- [ ] Use `<CustomBreadcrumb>` for complex hierarchies

---

## Troubleshooting

### URL not updating?
→ Use `useUrlSearch()`, `useUrlPagination()` instead of `useState()`

### Back button not working?
→ Use `navigateToParent()` from `useNestedRoutes()`

### Breadcrumbs not showing?
→ Verify route is in `routeConfig.js` with `breadcrumb: true`

### No animations?
→ Wrap page with `<RouteTransition>`

### Page state lost on reload?
→ Keep state in URL using URL sync hooks

---

## File Locations

| File | Purpose |
|------|---------|
| `utils/routeConfig.js` | Central route configuration |
| `hooks/useUrlSync.js` | Search, filter, pagination hooks |
| `hooks/useNestedRoutes.js` | Dynamic route hooks |
| `components/Breadcrumb.jsx` | Breadcrumb components |
| `components/RouteTransition.jsx` | Page transition animations |
| `pages/ContactDetail.jsx` | Example of dynamic routing |
| `ROUTING_GUIDE.md` | Full documentation |

---

## Next Steps

1. Review `ROUTING_GUIDE.md` for detailed documentation
2. Check `ContactDetail.jsx` for complete example
3. Use quick reference code snippets above
4. Add URL sync to your existing pages
5. Test bookmarkable URLs and state sharing
