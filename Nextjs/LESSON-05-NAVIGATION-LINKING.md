# 📘 Lesson 5: Navigation & Linking

Great job, Dhuruvan! Your app looks professional now. But there's a problem with your current navigation - you're using `<a>` tags, which cause full page reloads. Let's fix that!

---

## 🎯 What is the Link Component?

The **Link component** is Next.js's way of navigating between pages **without full page reloads**. It's like React Router's Link, but better!

### The Problem with `<a>` Tags:

```tsx
// ❌ Bad: Full page reload
<a href="/about">About</a>
```

**What happens:**
1. Browser loads the entire page from scratch
2. JavaScript re-initializes
3. State is lost
4. Slow user experience
5. White flash between pages

### The Solution: `<Link>` Component:

```tsx
// ✅ Good: Client-side navigation
import Link from 'next/link';

<Link href="/about">About</Link>
```

**What happens:**
1. Only the page content changes
2. No full reload
3. State is preserved
4. Instant navigation
5. Smooth transitions

---

## 📍 Where to Use Link Component

Use `<Link>` for **internal navigation** (within your app):

```tsx
import Link from 'next/link';

// ✅ Internal links - use Link
<Link href="/">Home</Link>
<Link href="/about">About</Link>
<Link href="/blog/my-post">Blog Post</Link>

// ✅ External links - use regular <a>
<a href="https://google.com" target="_blank">Google</a>
<a href="mailto:hello@example.com">Email Us</a>
```

**Rule of Thumb:**
- Your website pages → `<Link>`
- External websites → `<a>`
- Downloads, mailto, tel → `<a>`

---

## ⏰ When to Use Different Link Patterns

### 1. **Basic Link** - Simple Navigation
```tsx
<Link href="/about">About Us</Link>
```

### 2. **Link with Styling** - Custom Classes
```tsx
<Link href="/about" className="text-blue-600 hover:underline">
  About Us
</Link>
```

### 3. **Active Link** - Highlight Current Page
```tsx
// We'll learn this pattern!
<Link 
  href="/about" 
  className={pathname === '/about' ? 'active' : ''}
>
  About
</Link>
```

### 4. **Dynamic Link** - Programmatic Navigation
```tsx
// Based on data or logic
const postId = 123;
<Link href={`/blog/${postId}`}>Read Post</Link>
```

### 5. **Prefetching** - Pre-load Pages
```tsx
// Next.js does this automatically!
<Link href="/about" prefetch={true}>About</Link>
```

---

## 🤔 Why Use Link Component?

### **Performance Benefits:**

1. **Client-Side Navigation** - No full reload
2. **Prefetching** - Pre-loads pages in the background
3. **Code Splitting** - Only loads needed JavaScript
4. **Instant Navigation** - Feels like a native app
5. **State Preservation** - Keeps your app state

### **Comparison:**

| Feature | `<a>` Tag | `<Link>` Component |
|---------|-----------|-------------------|
| Page Reload | Full reload | No reload |
| Speed | Slow | Instant |
| Prefetching | No | Yes (automatic) |
| State | Lost | Preserved |
| SEO | Good | Good |

### **How Prefetching Works:**

```tsx
// When this Link is visible in viewport
<Link href="/about">About</Link>

// Next.js automatically:
// 1. Pre-loads /about page in background
// 2. When user clicks, page shows instantly!
// 3. No loading time needed
```

---

## 🛠️ Link Component API

### Basic Usage:
```tsx
import Link from 'next/link';

<Link href="/path">Link Text</Link>
```

### With Props:
```tsx
<Link 
  href="/about"           // Required: destination path
  prefetch={true}         // Optional: prefetch page (default: true)
  scroll={true}           // Optional: scroll to top (default: true)
  replace={false}         // Optional: replace history (default: false)
>
  About Us
</Link>
```

### Link with Child Elements:
```tsx
<Link href="/profile">
  <div className="card">
    <img src="/avatar.jpg" alt="Profile" />
    <h3>View Profile</h3>
  </div>
</Link>
```

---

## 📝 Code Examples

### Example 1: Converting Navigation to Link

**Before (❌ Using `<a>` tags):**
```tsx
// app/layout.tsx
export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <nav>
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/blog">Blog</a>
        </nav>
        {children}
      </body>
    </html>
  );
}
```

**After (✅ Using `<Link>`):**
```tsx
// app/layout.tsx
import Link from 'next/link';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <nav>
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/blog">Blog</Link>
        </nav>
        {children}
      </body>
    </html>
  );
}
```

### Example 2: Styled Navigation Links

```tsx
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="flex gap-4 p-4 bg-gray-900 text-white">
      <Link 
        href="/" 
        className="px-4 py-2 rounded hover:bg-gray-700 transition"
      >
        Home
      </Link>
      <Link 
        href="/about" 
        className="px-4 py-2 rounded hover:bg-gray-700 transition"
      >
        About
      </Link>
      <Link 
        href="/blog" 
        className="px-4 py-2 rounded hover:bg-gray-700 transition"
      >
        Blog
      </Link>
    </nav>
  );
}
```

### Example 3: Dynamic Links with Data

```tsx
import Link from 'next/link';

export default function BlogList() {
  const posts = [
    { id: 1, title: 'First Post' },
    { id: 2, title: 'Second Post' },
    { id: 3, title: 'Third Post' },
  ];

  return (
    <ul>
      {posts.map(post => (
        <li key={post.id}>
          <Link href={`/blog/${post.id}`}>
            {post.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
```

### Example 4: Link with Button Styling

```tsx
import Link from 'next/link';

export default function CallToAction() {
  return (
    <div className="text-center p-8">
      <h1 className="text-3xl mb-4">Welcome!</h1>
      <Link 
        href="/signup" 
        className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
      >
        Get Started
      </Link>
    </div>
  );
}
```

### Example 5: Mixed Internal and External Links

```tsx
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="p-4 bg-gray-900 text-white">
      <div className="flex gap-6">
        {/* Internal Links - use Link */}
        <Link href="/about">About</Link>
        <Link href="/privacy">Privacy</Link>
        <Link href="/terms">Terms</Link>
        
        {/* External Links - use <a> */}
        <a href="https://twitter.com" target="_blank" rel="noopener">
          Twitter
        </a>
        <a href="https://github.com" target="_blank" rel="noopener">
          GitHub
        </a>
      </div>
    </footer>
  );
}
```

---

## 🎨 Advanced Patterns

### Pattern 1: Active Link Highlighting

You'll need the `usePathname` hook (we'll learn hooks later):

```tsx
'use client'; // Client Component needed for hooks

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  
  const links = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/blog', label: 'Blog' },
  ];

  return (
    <nav className="flex gap-4">
      {links.map(link => (
        <Link
          key={link.href}
          href={link.href}
          className={`px-4 py-2 rounded ${
            pathname === link.href 
              ? 'bg-blue-600 text-white'  // Active
              : 'text-gray-600 hover:bg-gray-100'  // Inactive
          }`}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
```

### Pattern 2: Programmatic Navigation

Sometimes you need to navigate programmatically (after form submit, etc.):

```tsx
'use client';

import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    // After login logic...
    router.push('/dashboard'); // Navigate programmatically
  };

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">Login</button>
    </form>
  );
}
```

---

## 🧪 Exercise 5: Converting to Link Component

Time to fix your navigation! Let's replace all `<a>` tags with proper `<Link>` components.

### Task 1: Update Root Layout Navigation (10 mins)

Open `app/layout.tsx` and:

1. Import the Link component at the top
2. Replace ALL `<a>` tags in the navigation with `<Link>` components
3. Keep all the styling I added for you
4. Test navigation - notice how fast it is now!

**What to change:**
```tsx
// FROM:
<a href="/">Home</a>

// TO:
<Link href="/">Home</Link>
```

### Task 2: Update Dashboard Layout Navigation (10 mins)

Open `app/dashboard/layout.tsx` and:

1. Import the Link component
2. Replace ALL `<a>` tags with `<Link>` components
3. Keep the icons and styling
4. Test navigation between dashboard pages

### Task 3: Add Navigation to Blog Pages (15 mins)

Update your blog pages to have proper navigation:

1. **`app/blog/page.tsx`** - Convert blog post titles to links:
   ```tsx
   <Link href="/blog/nextjs-basics">Next.js Basics</Link>
   <Link href="/blog/react-tips">React Tips</Link>
   ```

2. **`app/blog/nextjs-basics/page.tsx`** and **`app/blog/react-tips/page.tsx`** - Add a "Back to Blog" link at the bottom:
   ```tsx
   <Link href="/blog" className="text-blue-600 hover:underline">
     ← Back to Blog
   </Link>
   ```

### Task 4: Test the Difference (5 mins)

1. Open your browser DevTools (F12)
2. Go to the Network tab
3. Click between pages using your new Link components
4. Notice: NO full page reloads! Only small data transfers
5. Compare the speed to before

### Task 5: Add a Homepage Link Card (10 mins)

Update `app/page.tsx` to have link cards to different sections:

```tsx
import Link from 'next/link';

export default function Home() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Hello, I'm learning Next.js!
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {/* About Card */}
        <Link href="/about" className="block p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition">
          <h2 className="text-2xl font-bold mb-2 text-blue-600">About Me</h2>
          <p className="text-gray-600">Learn more about who I am</p>
        </Link>

        {/* Blog Card */}
        <Link href="/blog" className="block p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition">
          <h2 className="text-2xl font-bold mb-2 text-green-600">Blog</h2>
          <p className="text-gray-600">Read my latest articles</p>
        </Link>

        {/* Dashboard Card */}
        <Link href="/dashboard" className="block p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition">
          <h2 className="text-2xl font-bold mb-2 text-purple-600">Dashboard</h2>
          <p className="text-gray-600">View your dashboard</p>
        </Link>

        {/* Contact Card */}
        <Link href="/contact" className="block p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition">
          <h2 className="text-2xl font-bold mb-2 text-red-600">Contact</h2>
          <p className="text-gray-600">Get in touch with me</p>
        </Link>
      </div>
    </div>
  );
}
```

---

## 📝 What to Submit:

After completing all tasks, share:

1. **Did you convert all navigation links to `<Link>`?** (Yes/No)
2. **Do you notice the speed difference?** (Yes/No)
3. **Paste your updated `app/page.tsx` with link cards**
4. **What happens in the Network tab when you click links now?**

5. **Answer these questions:**
   - Why is `<Link>` faster than `<a>`?
   - When would you still use `<a>` tag instead of `<Link>`?
   - What is prefetching and why is it useful?

---

## 🎓 Key Concepts to Remember

1. **`<Link>` for internal navigation** - Pages within your app
2. **`<a>` for external links** - Other websites, mailto, tel
3. **Client-side navigation** - No full page reload
4. **Automatic prefetching** - Pages load before you click
5. **Import required** - `import Link from 'next/link'`
6. **Same syntax** - `<Link href="/path">Text</Link>`

---

## ✅ Success Criteria

You've completed this lesson when you can:
- ✅ Import and use the Link component
- ✅ Replace `<a>` tags with `<Link>` for internal navigation
- ✅ Understand the performance benefits
- ✅ Know when to use Link vs regular anchor tags
- ✅ Create clickable card components with Link

---

This is a crucial lesson for performance! The Link component is what makes Next.js apps feel so fast. Once you complete this, we'll move to **Lesson 6: Server & Client Components** where you'll learn about Next.js's rendering architecture.

Good luck! 🚀💪
