# 📘 Lesson 3: Pages & Routing

Excellent progress, Dhuruvan! You've created 3 pages already. Now let's dive deep into how routing really works in Next.js.

---

## 🎯 What is Routing?

**Routing** is the system that determines what content to show based on the URL in the browser.

**Traditional Apps (React Router):**
```jsx
// You have to manually define routes
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
  <Route path="/contact" element={<Contact />} />
</Routes>
```

**Next.js (File-Based Routing):**
```
app/
├── page.tsx           → /
├── about/page.tsx     → /about
└── contact/page.tsx   → /contact

No route configuration needed! 🎉
```

---

## 📍 Where File-Based Routing Works

Next.js uses the **`app/` directory** structure to automatically create routes:

```
URL Path           File Location              What You See
─────────────────────────────────────────────────────────────
/                  app/page.tsx               Home page
/about             app/about/page.tsx         About page
/blog              app/blog/page.tsx          Blog listing
/blog/hello        app/blog/hello/page.tsx    Single blog post
/dashboard         app/dashboard/page.tsx     Dashboard
/dashboard/users   app/dashboard/users/page.tsx  User list
```

**Rule:** Only folders with a `page.tsx` file become accessible routes!

---

## ⏰ When to Use Different Route Patterns

### 1. **Static Routes** - Fixed URLs
**When:** You know the exact page paths (about, contact, services)

```
app/
├── page.tsx              → /
├── about/page.tsx        → /about
└── services/page.tsx     → /services
```

### 2. **Nested Routes** - Organized sections
**When:** You have related pages under a section

```
app/
└── dashboard/
    ├── page.tsx          → /dashboard
    ├── settings/page.tsx → /dashboard/settings
    └── profile/page.tsx  → /dashboard/profile
```

### 3. **Route Groups** - Organization without URL
**When:** You want to organize files without affecting the URL

```
app/
├── (marketing)/          ← Parentheses = not in URL!
│   ├── about/page.tsx    → /about (not /marketing/about)
│   └── contact/page.tsx  → /contact
└── (shop)/
    ├── products/page.tsx → /products (not /shop/products)
    └── cart/page.tsx     → /cart
```

---

## 🤔 Why File-Based Routing?

### **Advantages:**

1. **No Configuration** - Folder structure = routes
2. **Visual Structure** - Easy to see all routes at a glance
3. **Colocation** - Keep related files together
4. **Less Code** - No route definitions needed
5. **Type-Safe** - TypeScript knows your routes

### **Comparison:**

| Feature | React Router | Next.js |
|---------|--------------|---------|
| Setup | Manual config | Automatic |
| Routes | Code-based | File-based |
| Nesting | Verbose | Natural |
| SEO | Client-side | Server-side |

---

## 🛠️ Advanced Routing Patterns

### 1. **Private Folders** (Don't Become Routes)

Use underscore `_` prefix to create folders that won't be routes:

```
app/
├── _components/        ← NOT a route, just organization
│   ├── Header.tsx
│   └── Footer.tsx
├── _lib/              ← NOT a route
│   └── utils.ts
└── about/
    └── page.tsx       → /about (this IS a route)
```

**Why?** Organize code without creating unnecessary routes.

### 2. **Multiple Segments**

```
app/
└── shop/
    └── products/
        └── electronics/
            └── page.tsx    → /shop/products/electronics
```

Each folder level adds to the URL path!

### 3. **Index Behavior**

```
app/
└── blog/
    ├── page.tsx           → /blog (index page)
    └── first-post/
        └── page.tsx       → /blog/first-post
```

The `page.tsx` in `blog/` serves as the "index" for `/blog`.

---

## 📝 Code Examples

### Example 1: Simple Blog Structure

Let's create a blog section:

```
app/
└── blog/
    ├── page.tsx              → /blog (list all posts)
    ├── post-1/
    │   └── page.tsx          → /blog/post-1
    └── post-2/
        └── page.tsx          → /blog/post-2
```

**`app/blog/page.tsx`** (Blog Listing):
```tsx
export default function BlogPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">My Blog</h1>
      <ul className="space-y-2">
        <li>Post 1: Getting Started with Next.js</li>
        <li>Post 2: Understanding Routing</li>
      </ul>
    </div>
  );
}
```

**`app/blog/post-1/page.tsx`** (Individual Post):
```tsx
export default function Post1Page() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Getting Started with Next.js</h1>
      <p className="text-gray-700">
        This is my first blog post about Next.js...
      </p>
    </div>
  );
}
```

### Example 2: Dashboard with Nested Routes

```
app/
└── dashboard/
    ├── page.tsx              → /dashboard
    ├── analytics/
    │   └── page.tsx          → /dashboard/analytics
    └── settings/
        └── page.tsx          → /dashboard/settings
```

**`app/dashboard/page.tsx`**:
```tsx
export default function DashboardPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <p>Welcome to your dashboard!</p>
    </div>
  );
}
```

**`app/dashboard/analytics/page.tsx`**:
```tsx
export default function AnalyticsPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Analytics</h1>
      <p>Your analytics data here...</p>
    </div>
  );
}
```

---

## 🎨 Route Organization Best Practices

### ✅ Good Structure:
```
app/
├── (public)/               # Route group for public pages
│   ├── page.tsx           → /
│   ├── about/page.tsx     → /about
│   └── contact/page.tsx   → /contact
├── (dashboard)/           # Route group for dashboard
│   └── dashboard/
│       ├── page.tsx       → /dashboard
│       └── settings/page.tsx → /dashboard/settings
└── _components/           # Private folder (not a route)
    ├── Navbar.tsx
    └── Footer.tsx
```

### ❌ Avoid:
```
app/
├── page1.tsx              # ❌ Wrong! Use folders
├── page2.tsx              # ❌ Wrong! Not how Next.js works
└── randomFolder/          # ❌ No page.tsx inside = not accessible
    └── component.tsx
```

**Remember:** Folders create structure, `page.tsx` creates routes!

---

## 🧪 Exercise 3: Building a Multi-Page Site

Time to practice! Create a more complex routing structure.

### Task 1: Create a Blog Section (15 mins)

Create a blog with the following structure:

```
app/blog/
├── page.tsx              → /blog (main blog page)
├── nextjs-basics/
│   └── page.tsx          → /blog/nextjs-basics
└── react-tips/
    └── page.tsx          → /blog/react-tips
```

**Requirements:**

1. **`app/blog/page.tsx`** should display:
   - Heading: "My Blog"
   - Paragraph: "Welcome to my blog about web development"
   - List of blog post titles (just text for now)

2. **`app/blog/nextjs-basics/page.tsx`** should display:
   - Heading: "Next.js Basics"
   - Paragraph with some content about Next.js (make it up!)
   - Author: Your name
   - Date: "December 4, 2025"

3. **`app/blog/react-tips/page.tsx`** should display:
   - Heading: "React Tips and Tricks"
   - Paragraph with tips about React (make it up!)
   - Author: Your name
   - Date: "December 4, 2025"

### Task 2: Create a Dashboard Section (15 mins)

Create a dashboard with nested routes:

```
app/dashboard/
├── page.tsx              → /dashboard
└── profile/
    └── page.tsx          → /dashboard/profile
```

**Requirements:**

1. **`app/dashboard/page.tsx`** should display:
   - Heading: "Dashboard"
   - Welcome message with your name
   - Description: "This is your personal dashboard"

2. **`app/dashboard/profile/page.tsx`** should display:
   - Heading: "My Profile"
   - Name: Dhuruvan Baskar
   - Bio: A short paragraph about yourself
   - Skills: List 3 skills you want to learn

### Task 3: Create a Private Components Folder (5 mins)

1. Create `app/_components/` folder (note the underscore!)
2. Create `app/_components/PageTitle.tsx` with this code:

```tsx
export function PageTitle({ title }: { title: string }) {
  return (
    <h1 className="text-4xl font-bold text-blue-600 mb-6">
      {title}
    </h1>
  );
}
```

3. Use this component in your `app/dashboard/page.tsx`:

```tsx
import { PageTitle } from '../_components/PageTitle';

export default function DashboardPage() {
  return (
    <div className="p-8">
      <PageTitle title="Dashboard" />
      {/* rest of your content */}
    </div>
  );
}
```

---

## 📝 What to Submit:

After completing all tasks, share:

1. **Did you create all the blog pages?** (Yes/No)
2. **Paste your `app/blog/page.tsx` code**
3. **Did you create the dashboard section?** (Yes/No)
4. **Paste your `app/dashboard/profile/page.tsx` code**
5. **Did the PageTitle component work?** (Yes/No)
6. **Answer these questions:**
   - What URL shows your blog main page?
   - What URL shows your dashboard profile?
   - Why does `_components` folder not create a `/components` route?

---

## 🎓 Key Concepts to Remember

1. **File-based routing** - Folder structure = URL structure
2. **`page.tsx` required** - Folders need this to be accessible routes
3. **Nested routes** - Folder hierarchy = URL hierarchy
4. **Private folders** - Use `_` prefix to organize without creating routes
5. **Route groups** - Use `()` to organize without affecting URLs
6. **Colocation** - Keep related files together in folders

---

## ✅ Success Criteria

You've completed this lesson when you can:
- ✅ Create nested route structures
- ✅ Understand folder-to-URL mapping
- ✅ Use private folders for organization
- ✅ Build a multi-page application structure
- ✅ Import and use components across pages

---

This exercise is more challenging - take your time! Once you complete it and share your work, we'll move to **Lesson 4: Layouts** where you'll learn how to share UI across multiple pages (like headers and footers).

Good luck! 💪🚀
