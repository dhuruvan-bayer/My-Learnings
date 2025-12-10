# 📘 Lesson 7: Data Fetching

Excellent, Dhuruvan! Now that you understand Server Components, let's master **data fetching** in Next.js!

---

## 🎯 What is Data Fetching?

**Data fetching** is getting data from external sources (APIs, databases, files) to display in your app.

### Traditional React:
```jsx
// ❌ Old way - fetch in browser
function Posts() {
  const [posts, setPosts] = useState([]);
  
  useEffect(() => {
    fetch('/api/posts')
      .then(res => res.json())
      .then(data => setPosts(data));
  }, []);
  
  return <div>{posts.map(...)}</div>
}
```

**Problems:**
- Fetches in browser (slow for user)
- Loading spinner needed
- Bad for SEO (content not in initial HTML)
- Extra JavaScript bundle

### Next.js Way:
```tsx
// ✅ New way - fetch on server
async function Posts() {
  const posts = await fetch('/api/posts');
  const data = await posts.json();
  
  return <div>{data.map(...)}</div>
}
```

**Benefits:**
- Fetches on server (fast)
- No loading spinner needed
- Great SEO (content in HTML)
- Less JavaScript

---

## 📍 Where to Fetch Data

### **1. Server Components (Recommended)**
```tsx
// app/posts/page.tsx
// Runs on SERVER
async function PostsPage() {
  const res = await fetch('https://api.example.com/posts');
  const posts = await res.json();
  return <div>{posts.map(...)}</div>
}
```

### **2. Client Components (When Needed)**
```tsx
// app/components/LiveData.tsx
'use client';

import { useState, useEffect } from 'react';

function LiveData() {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    fetch('/api/live')
      .then(res => res.json())
      .then(setData);
  }, []);
  
  return <div>{data}</div>
}
```

### **3. Server Actions (Forms - We'll learn later)**
```tsx
async function createPost(formData) {
  'use server';
  // Handle form submission
}
```

---

## ⏰ When to Use Each Method

| Method | Use When | Example |
|--------|----------|---------|
| **Server Component** | Initial page load data | Blog posts, user profiles |
| **Client Component** | Real-time/interactive data | Live chat, search results |
| **Route Handler** | API endpoints | POST/PUT/DELETE operations |
| **Server Actions** | Form submissions | Create/update data |

---

## 🤔 Why Fetch on Server?

### **Performance Benefits:**

```
Traditional React (Client-side):
User Request → Server sends HTML/JS → Browser downloads JS
            → JS runs → Fetch data → Display
            ⏱️ Slow! Multiple round trips!

Next.js (Server-side):
User Request → Server fetches data → Server generates HTML
            → Browser displays immediately
            ⏱️ Fast! One round trip!
```

### **Comparison:**

| Aspect | Client Fetch | Server Fetch |
|--------|-------------|--------------|
| **Speed** | Slow (multiple requests) | Fast (one request) |
| **SEO** | Poor (no content initially) | Excellent (content in HTML) |
| **JavaScript** | More (fetch code) | Less (no fetch code) |
| **Security** | API keys exposed | API keys hidden |
| **User Experience** | Loading spinners | Instant content |

---

## 🛠️ Data Fetching Patterns

### Pattern 1: Basic Fetch

```tsx
// app/products/page.tsx
async function ProductsPage() {
  const res = await fetch('https://api.example.com/products');
  const products = await res.json();
  
  return (
    <div>
      {products.map(product => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
}
```

### Pattern 2: Fetch with Error Handling

```tsx
// app/posts/page.tsx
async function PostsPage() {
  try {
    const res = await fetch('https://api.example.com/posts');
    
    if (!res.ok) {
      throw new Error('Failed to fetch posts');
    }
    
    const posts = await res.json();
    
    return (
      <div>
        {posts.map(post => (
          <div key={post.id}>{post.title}</div>
        ))}
      </div>
    );
  } catch (error) {
    return <div>Error loading posts: {error.message}</div>;
  }
}
```

### Pattern 3: Parallel Fetching (Multiple APIs)

```tsx
// app/dashboard/page.tsx
async function DashboardPage() {
  // Fetch multiple things at once!
  const [users, posts, comments] = await Promise.all([
    fetch('https://api.example.com/users').then(r => r.json()),
    fetch('https://api.example.com/posts').then(r => r.json()),
    fetch('https://api.example.com/comments').then(r => r.json()),
  ]);
  
  return (
    <div>
      <div>Users: {users.length}</div>
      <div>Posts: {posts.length}</div>
      <div>Comments: {comments.length}</div>
    </div>
  );
}
```

### Pattern 4: Sequential Fetching (Data Depends on Previous)

```tsx
// app/user/[id]/page.tsx
async function UserPage({ params }) {
  // First, get user
  const user = await fetch(`/api/users/${params.id}`).then(r => r.json());
  
  // Then, get their posts (depends on user ID)
  const posts = await fetch(`/api/users/${user.id}/posts`).then(r => r.json());
  
  return (
    <div>
      <h1>{user.name}</h1>
      <div>{posts.map(...)}</div>
    </div>
  );
}
```

### Pattern 5: Fetch with Caching

```tsx
// app/products/page.tsx
async function ProductsPage() {
  // Cache for 1 hour
  const res = await fetch('https://api.example.com/products', {
    next: { revalidate: 3600 } // seconds
  });
  
  const products = await res.json();
  return <div>{products.map(...)}</div>;
}
```

---

## 📝 Fetch Options in Next.js

### **1. Cache Control**

```tsx
// No caching - always fresh
fetch(url, { cache: 'no-store' });

// Cache forever (default)
fetch(url, { cache: 'force-cache' });

// Revalidate after X seconds
fetch(url, { next: { revalidate: 60 } });
```

### **2. Revalidation**

```tsx
// Time-based revalidation (60 seconds)
const res = await fetch(url, {
  next: { revalidate: 60 }
});

// On-demand revalidation (we'll learn later)
// Using revalidatePath() or revalidateTag()
```

### **3. Dynamic Data (No Cache)**

```tsx
// For real-time data (user-specific)
const res = await fetch(url, {
  cache: 'no-store'
});
```

---

## 🎨 Real-World Examples

### Example 1: Blog Posts List

```tsx
// app/blog/page.tsx
async function BlogPage() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
    next: { revalidate: 3600 } // Revalidate every hour
  });
  
  const posts = await res.json();
  
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">Blog Posts</h1>
      <div className="grid gap-4">
        {posts.slice(0, 10).map(post => (
          <div key={post.id} className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
            <p className="text-gray-600">{post.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
```

### Example 2: Weather Dashboard

```tsx
// app/weather/page.tsx
async function WeatherPage() {
  const res = await fetch(
    'https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m',
    { next: { revalidate: 300 } } // Refresh every 5 minutes
  );
  
  const data = await res.json();
  
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Current Weather</h1>
      <div className="text-6xl font-bold">
        {data.current.temperature_2m}°C
      </div>
    </div>
  );
}
```

### Example 3: User Profile with Multiple Fetches

```tsx
// app/profile/[id]/page.tsx
async function ProfilePage({ params }) {
  // Parallel fetching - both happen at same time
  const [user, posts] = await Promise.all([
    fetch(`https://jsonplaceholder.typicode.com/users/${params.id}`).then(r => r.json()),
    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${params.id}`).then(r => r.json()),
  ]);
  
  return (
    <div className="container mx-auto p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold">{user.name}</h1>
        <p className="text-gray-600">{user.email}</p>
      </div>
      
      <h2 className="text-2xl font-bold mb-4">Posts by {user.name}</h2>
      <div className="grid gap-4">
        {posts.map(post => (
          <div key={post.id} className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-bold">{post.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
```

### Example 4: Search with Client-Side Fetching

```tsx
// app/components/Search.tsx
'use client';

import { useState, useEffect } from 'react';

export default function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }
    
    setLoading(true);
    fetch(`https://jsonplaceholder.typicode.com/posts?q=${query}`)
      .then(res => res.json())
      .then(data => {
        setResults(data);
        setLoading(false);
      });
  }, [query]);
  
  return (
    <div className="p-4">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search posts..."
        className="w-full p-2 border rounded"
      />
      
      {loading && <p>Loading...</p>}
      
      <div className="mt-4">
        {results.map(result => (
          <div key={result.id} className="p-2 border-b">
            {result.title}
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

## ⚠️ Common Patterns & Best Practices

### **DO's ✅**

```tsx
// ✅ Fetch in Server Components
async function Page() {
  const data = await fetch(url);
  return <div>{data}</div>;
}

// ✅ Use Promise.all for parallel fetches
const [users, posts] = await Promise.all([
  fetch('/api/users'),
  fetch('/api/posts')
]);

// ✅ Handle errors
try {
  const data = await fetch(url);
} catch (error) {
  return <Error message={error.message} />;
}

// ✅ Use caching when appropriate
fetch(url, { next: { revalidate: 3600 } });
```

### **DON'Ts ❌**

```tsx
// ❌ Don't fetch in Client Components for initial data
'use client';
function Page() {
  useEffect(() => {
    fetch(url); // Use Server Component instead!
  }, []);
}

// ❌ Don't forget error handling
const data = await fetch(url); // What if it fails?

// ❌ Don't make waterfall requests (sequential when could be parallel)
const users = await fetch('/api/users');
const posts = await fetch('/api/posts'); // Should use Promise.all!

// ❌ Don't use no-store for static data
fetch(url, { cache: 'no-store' }); // Waste of resources if data doesn't change often
```

---

## 🧪 Exercise 7: Mastering Data Fetching

Time to practice different fetching patterns!

### Task 1: Create a Posts Page (15 mins)

Create `app/posts/page.tsx` that:
- Fetches posts from: `https://jsonplaceholder.typicode.com/posts`
- Displays first 20 posts
- Shows title and body
- Uses nice card design
- Caches for 1 hour (`revalidate: 3600`)

### Task 2: Create a Single Post Page (20 mins)

Create `app/posts/[id]/page.tsx` that:
- Takes post ID from URL
- Fetches post: `https://jsonplaceholder.typicode.com/posts/${id}`
- Fetches comments: `https://jsonplaceholder.typicode.com/posts/${id}/comments`
- Uses **parallel fetching** (Promise.all)
- Displays post title, body, and all comments

**Hint:** Use `params.id` to get the ID from URL

### Task 3: Create a Live Search Component (25 mins)

Create `app/_components/PostSearch.tsx` that:
- Is a **Client Component** (`'use client'`)
- Has an input field for search
- Uses `useState` for query and results
- Uses `useEffect` to fetch when query changes
- Fetches from: `https://jsonplaceholder.typicode.com/posts`
- Filters posts by title matching query
- Shows "Loading..." while fetching
- Displays results in a list

Then add it to your homepage!

### Task 4: Create a Stats Dashboard (15 mins)

Create `app/stats/page.tsx` that:
- Fetches 3 things in parallel:
  - Users: `https://jsonplaceholder.typicode.com/users`
  - Posts: `https://jsonplaceholder.typicode.com/posts`
  - Comments: `https://jsonplaceholder.typicode.com/comments`
- Uses `Promise.all()`
- Displays stat cards:
  - Total Users (count)
  - Total Posts (count)
  - Total Comments (count)
- Use nice card design with different colors

---

## 📝 What to Submit:

After completing all tasks, share:

1. **Did you create the Posts page?** (Yes/No)
2. **Did parallel fetching work in single post page?** (Yes/No)
3. **Paste your `PostSearch.tsx` component code**
4. **Did the search filter results as you type?** (Yes/No)
5. **Paste your Stats page code**

6. **Answer these questions:**
   - What's the difference between fetching in Server vs Client Components?
   - When would you use `Promise.all()`?
   - What does `{ next: { revalidate: 60 } }` do?
   - Why is server-side fetching better for SEO?
   - When would you use `cache: 'no-store'`?

---

## 🎓 Key Concepts to Remember

1. **Server Components** = Fetch on server (default, recommended)
2. **Client Components** = Fetch in browser (for real-time/interactive)
3. **Promise.all** = Parallel fetching (faster)
4. **Sequential** = One after another (when data depends on previous)
5. **Caching** = `{ next: { revalidate: X } }` for performance
6. **Error Handling** = Always use try/catch or check response
7. **SEO** = Server fetching = content in HTML = better SEO

---

## ✅ Success Criteria

You've completed this lesson when you can:
- ✅ Fetch data in Server Components
- ✅ Use async/await properly
- ✅ Implement parallel fetching with Promise.all
- ✅ Fetch in Client Components when needed
- ✅ Use caching strategies
- ✅ Handle errors gracefully
- ✅ Understand when to use each method

---

This lesson is crucial for building real-world apps! Data fetching is something you'll do in almost every project.

Take your time with the exercises - they cover all the important patterns. Once you complete this, we'll move to **Lesson 8: Dynamic Routes** where you'll build pages with dynamic URLs like `/posts/123`.

Good luck! 🚀💪
