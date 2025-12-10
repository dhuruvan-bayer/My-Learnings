# 📘 Lesson 4: Layouts

Excellent progress, Dhuruvan! You've built multiple pages. Now let's learn how to share UI (like headers and footers) across multiple pages without repeating code.

---

## 🎯 What is a Layout?

A **Layout** is a UI component that wraps your pages and provides **shared elements** that appear across multiple pages.

Think of it like this:
```
┌─────────────────────────────┐
│      Header (Layout)        │ ← Appears on ALL pages
├─────────────────────────────┤
│                             │
│    Page Content (Changes)   │ ← Different for each page
│                             │
├─────────────────────────────┤
│      Footer (Layout)        │ ← Appears on ALL pages
└─────────────────────────────┘
```

**Without Layout:**
```tsx
// Every page repeats the same code ❌
function HomePage() {
  return (
    <>
      <header>My Site</header>
      <main>Home content</main>
      <footer>© 2025</footer>
    </>
  );
}

function AboutPage() {
  return (
    <>
      <header>My Site</header>        // Repeated!
      <main>About content</main>
      <footer>© 2025</footer>          // Repeated!
    </>
  );
}
```

**With Layout:**
```tsx
// Layout wraps everything ✅
function Layout({ children }) {
  return (
    <>
      <header>My Site</header>
      {children}  {/* Page content goes here */}
      <footer>© 2025</footer>
    </>
  );
}

// Pages are now simple
function HomePage() {
  return <main>Home content</main>;
}

function AboutPage() {
  return <main>About content</main>;
}
```

---

## 📍 Where Do Layouts Live?

Layouts are defined using `layout.tsx` files in the `app/` directory:

```
app/
├── layout.tsx              ← Root layout (wraps EVERYTHING)
├── page.tsx                ← Home page
├── about/
│   └── page.tsx            ← About page (wrapped by root layout)
└── dashboard/
    ├── layout.tsx          ← Dashboard layout (nested!)
    ├── page.tsx            ← Dashboard home
    └── settings/
        └── page.tsx        ← Settings (wrapped by both layouts!)
```

---

## ⏰ When to Use Layouts?

### Use Layouts When:
1. **Shared Navigation** - Headers, navbars, sidebars
2. **Consistent Footer** - Copyright, links, social media
3. **Shared Styling** - Common background, fonts, spacing
4. **Authentication Wrapper** - Check if user is logged in
5. **Analytics** - Track page views
6. **Common Components** - Modals, notifications

### Different Types:

| Layout Type | Use Case | Example |
|-------------|----------|---------|
| **Root Layout** | Site-wide elements | Header, footer, fonts |
| **Nested Layout** | Section-specific UI | Dashboard sidebar |
| **Route Group Layout** | Shared UI for some pages | Marketing pages layout |

---

## 🤔 Why Use Layouts?

### **Advantages:**

1. **DRY Principle** - Don't Repeat Yourself
2. **State Preservation** - Layout state persists between page changes
3. **Performance** - Layouts don't re-render when pages change
4. **Organization** - Cleaner code structure
5. **SEO** - Define metadata in layouts

### **Comparison:**

**Traditional React:**
```jsx
// Every page imports the layout component
import Layout from './Layout';

function HomePage() {
  return (
    <Layout>
      <h1>Home</h1>
    </Layout>
  );
}
```

**Next.js:**
```tsx
// Layout automatically wraps pages!
// app/layout.tsx
export default function Layout({ children }) {
  return <>{children}</>;
}

// app/page.tsx - No manual wrapping needed
export default function HomePage() {
  return <h1>Home</h1>;
}
```

---

## 🛠️ Root Layout (Required!)

Every Next.js app **must** have a root layout at `app/layout.tsx`:

```tsx
// app/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {/* This is where your pages render */}
        {children}
      </body>
    </html>
  );
}
```

**Important Rules:**
- ✅ Must include `<html>` and `<body>` tags
- ✅ Only root layout has these tags
- ✅ Wraps ALL pages in your app
- ✅ Cannot be deleted or renamed

---

## 🔄 Nested Layouts

You can create layouts at any level! They **stack on top of each other**:

```
app/
├── layout.tsx              ← Root layout (site-wide)
│   └── dashboard/
│       ├── layout.tsx      ← Dashboard layout (nested)
│       └── page.tsx        ← Wrapped by BOTH layouts!
```

**Example:**

```tsx
// app/layout.tsx (Root Layout)
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header className="bg-blue-600 text-white p-4">
          Site Header
        </header>
        {children}
        <footer className="bg-gray-800 text-white p-4">
          © 2025 My Site
        </footer>
      </body>
    </html>
  );
}

// app/dashboard/layout.tsx (Nested Layout)
export default function DashboardLayout({ children }) {
  return (
    <div className="flex">
      <aside className="w-64 bg-gray-100 p-4">
        Dashboard Sidebar
      </aside>
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}

// app/dashboard/page.tsx
export default function DashboardPage() {
  return <h1>Dashboard Content</h1>;
}
```

**Result:**
```
┌──────────────────────────────────┐
│     Site Header (Root)           │
├──────────────┬───────────────────┤
│  Sidebar     │   Dashboard       │
│ (Dashboard)  │   Content (Page)  │
│              │                   │
├──────────────┴───────────────────┤
│     Footer (Root)                │
└──────────────────────────────────┘
```

---

## 📝 Code Examples

### Example 1: Simple Root Layout with Navigation

```tsx
// app/layout.tsx
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        {/* Navigation Bar */}
        <nav className="bg-white shadow-md p-4">
          <div className="container mx-auto flex gap-6">
            <a href="/" className="font-bold text-blue-600">Home</a>
            <a href="/about" className="hover:text-blue-600">About</a>
            <a href="/blog" className="hover:text-blue-600">Blog</a>
            <a href="/contact" className="hover:text-blue-600">Contact</a>
          </div>
        </nav>

        {/* Page Content */}
        <main className="container mx-auto py-8">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-gray-800 text-white text-center p-4 mt-8">
          <p>© 2025 Dhuruvan Baskar. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
```

### Example 2: Dashboard with Nested Layout

```tsx
// app/dashboard/layout.tsx
export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-6">
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
        <nav className="space-y-2">
          <a href="/dashboard" className="block p-2 hover:bg-gray-800 rounded">
            Home
          </a>
          <a href="/dashboard/profile" className="block p-2 hover:bg-gray-800 rounded">
            Profile
          </a>
          <a href="/dashboard/settings" className="block p-2 hover:bg-gray-800 rounded">
            Settings
          </a>
          <a href="/dashboard/analytics" className="block p-2 hover:bg-gray-800 rounded">
            Analytics
          </a>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-8 bg-gray-50">
        {children}
      </main>
    </div>
  );
}

// app/dashboard/page.tsx
export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Welcome to Dashboard</h1>
      <p>Select an option from the sidebar</p>
    </div>
  );
}

// app/dashboard/profile/page.tsx
export default function ProfilePage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Profile</h1>
      <p>Your profile information</p>
    </div>
  );
}
```

### Example 3: Layout with Metadata

```tsx
// app/layout.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Next.js App',
  description: 'Learning Next.js with layouts',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

---

## 🎨 Layout Patterns

### Pattern 1: Conditional Content in Layout

```tsx
// app/layout.tsx
export default function RootLayout({ children }) {
  const showHeader = true; // Could be based on route

  return (
    <html lang="en">
      <body>
        {showHeader && <header>Site Header</header>}
        {children}
      </body>
    </html>
  );
}
```

### Pattern 2: Multiple Sections

```tsx
// app/dashboard/layout.tsx
export default function DashboardLayout({ children }) {
  return (
    <div>
      <header>Dashboard Header</header>
      <div className="flex">
        <nav>Sidebar Nav</nav>
        <main>{children}</main>
        <aside>Right Sidebar</aside>
      </div>
      <footer>Dashboard Footer</footer>
    </div>
  );
}
```

---

## 🧪 Exercise 4: Creating Layouts

Time to build a real application structure with layouts!

### Task 1: Update Root Layout (15 mins)

Modify your existing `app/layout.tsx` to include:

1. **Navigation Bar** with links to:
   - Home (/)
   - About (/about)
   - Blog (/blog)
   - Dashboard (/dashboard)
   - Contact (/contact)

2. **Footer** with:
   - Your name
   - Copyright year (2025)
   - A message like "Built with Next.js"

**Requirements:**
- Use Tailwind classes for styling
- Make the navbar sticky at the top
- Give the footer a dark background
- Ensure all pages now have this header and footer

### Task 2: Create Dashboard Layout (15 mins)

Create `app/dashboard/layout.tsx` with:

1. **Sidebar** with navigation links:
   - Dashboard Home (/dashboard)
   - Profile (/dashboard/profile)
   - Settings (/dashboard/settings)
   - Analytics (/dashboard/analytics)

2. **Main Content Area** where pages will render

**Requirements:**
- Use flexbox for sidebar + content layout
- Sidebar should be fixed width (like 250px)
- Main content should take remaining space
- Add some styling to make it look nice

### Task 3: Create New Dashboard Pages (10 mins)

Create these new pages that will use your dashboard layout:

1. **`app/dashboard/settings/page.tsx`**
   - Heading: "Settings"
   - Content: "Manage your account settings here"
   - Add 3 fake settings options

2. **`app/dashboard/analytics/page.tsx`**
   - Heading: "Analytics"
   - Content: "View your analytics dashboard"
   - Add some fake stats (e.g., "Views: 1,234", "Users: 567")

### Task 4: Verify Layout Stacking (5 mins)

1. Visit `/dashboard/profile` in your browser
2. You should see:
   - Top: Site header (from root layout)
   - Middle Left: Dashboard sidebar (from dashboard layout)
   - Middle Right: Profile content (from page)
   - Bottom: Site footer (from root layout)

3. Navigate between different dashboard pages and notice:
   - Site header/footer stay the same
   - Sidebar stays the same
   - Only the main content changes

---

## 📝 What to Submit:

After completing all tasks, share:

1. **Paste your updated `app/layout.tsx` code** (root layout with nav & footer)
2. **Paste your `app/dashboard/layout.tsx` code** (dashboard layout with sidebar)
3. **Paste your `app/dashboard/settings/page.tsx` code**
4. **Did you see the layout stacking?** Describe what you see when visiting `/dashboard/analytics`

5. **Answer these questions:**
   - What's the difference between `page.tsx` and `layout.tsx`?
   - Why don't we need to import the layout in our pages?
   - What happens if you create `app/blog/layout.tsx`? Which pages would it affect?

---

## 🎓 Key Concepts to Remember

1. **`layout.tsx`** - Wraps pages with shared UI
2. **Root layout** - Required, must have `<html>` and `<body>`
3. **Nested layouts** - Stack on top of each other
4. **`{children}`** - Where the page content renders
5. **State preservation** - Layouts don't re-render on navigation
6. **Automatic wrapping** - Next.js handles it for you

---

## ✅ Success Criteria

You've completed this lesson when you can:
- ✅ Create a root layout with shared navigation and footer
- ✅ Create nested layouts for specific sections
- ✅ Understand how layouts stack and wrap pages
- ✅ Use `{children}` prop correctly
- ✅ See the benefits of not repeating code

---

This is a crucial lesson! Layouts are one of the most powerful features of Next.js. Take your time to understand how they work and experiment with different layouts.

Once you complete this, we'll move to **Lesson 5: Navigation & Linking** where you'll learn how to create proper navigation links (hint: no more `<a>` tags!).

Good luck! 🚀💪
