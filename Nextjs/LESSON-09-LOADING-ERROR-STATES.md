# 📘 Lesson 9: Loading & Error States

Great progress, Dhuruvan! You've mastered routing and dynamic pages. Now let's handle **loading states** and **errors gracefully**! 🎯

---

## 🎯 What are Loading & Error States?

When fetching data or navigating between pages, users should see **feedback** instead of blank screens or crashes!

### **The Problem:**

```tsx
// ❌ Bad UX - User sees blank screen while loading
export default async function PostsPage() {
  const posts = await fetch('https://api.example.com/posts').then(r => r.json());
  return <div>{posts.map(...)}</div>
  // What if this takes 3 seconds? User sees nothing!
}
```

```tsx
// ❌ Bad UX - App crashes on error
export default async function PostsPage() {
  const posts = await fetch('https://api.example.com/posts').then(r => r.json());
  // What if API fails? Entire page crashes!
  return <div>{posts.map(...)}</div>
}
```

### **The Solution:**

Next.js provides **special files** to handle these situations:

1. **`loading.tsx`** - Shows while page is loading
2. **`error.tsx`** - Shows when something breaks

---

## 📍 Where to Use Loading & Error States

### **File Structure:**

```
app/
├── loading.tsx              ← Global loading (wraps entire app)
├── error.tsx                ← Global error handler
├── posts/
│   ├── loading.tsx          ← Posts loading state
│   ├── error.tsx            ← Posts error handler
│   └── page.tsx             ← Posts page
├── dashboard/
│   ├── loading.tsx          ← Dashboard loading
│   ├── error.tsx            ← Dashboard error
│   └── page.tsx             ← Dashboard page
```

**Rule:** `loading.tsx` and `error.tsx` affect **that route and its children**!

---

## ⏰ When Loading States Trigger

Loading states appear:

1. **Navigating between pages** - User clicks link, sees loading
2. **Fetching data** - Server Component awaits data
3. **Route transitions** - Moving from `/posts` to `/posts/123`

---

## 🤔 Why Use Loading & Error States?

### **Without them:**
- ❌ User sees blank screen (bad UX)
- ❌ App crashes on errors (terrible UX)
- ❌ No feedback during navigation
- ❌ Looks unprofessional

### **With them:**
- ✅ Smooth loading indicators
- ✅ Graceful error handling
- ✅ Better perceived performance
- ✅ Professional user experience

---

## 🛠️ Loading States - `loading.tsx`

### **How it Works:**

```
1. User clicks link to /posts
2. Next.js instantly shows loading.tsx
3. Fetches data for posts/page.tsx
4. Replaces loading.tsx with page content
```

### **Basic Example:**

```tsx
// app/posts/loading.tsx
export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading posts...</p>
      </div>
    </div>
  );
}
```

### **Advanced Example with Skeleton:**

```tsx
// app/posts/loading.tsx
export default function Loading() {
  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-6"></div>
      
      <div className="grid md:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

**Skeleton screens** show the layout while loading - much better UX!

---

## 🔥 Error States - `error.tsx`

### **How it Works:**

```
1. User visits /posts
2. Something goes wrong (API fails, network error, bug)
3. Next.js catches the error
4. Shows error.tsx instead of crashing
```

### **Important Rules:**

1. **Must be a Client Component** - `'use client'` required!
2. **Receives `error` and `reset` props**
3. **Wraps child routes in error boundary**

### **Basic Example:**

```tsx
// app/posts/error.tsx
'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Something went wrong!</h2>
        <p className="text-gray-600 mb-6">{error.message}</p>
        <button
          onClick={() => reset()}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
```

### **Advanced Example:**

```tsx
// app/posts/error.tsx
'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log error to error reporting service
    console.error('Error caught:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-lg w-full">
        {/* Error Icon */}
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-5xl">⚠️</span>
        </div>

        {/* Error Message */}
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-4">
          Oops! Something Went Wrong
        </h1>
        
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-sm font-mono text-red-800">{error.message}</p>
          {error.digest && (
            <p className="text-xs text-red-600 mt-2">Error ID: {error.digest}</p>
          )}
        </div>

        <p className="text-gray-600 text-center mb-8">
          Don't worry, we've logged this error. You can try again or go back home.
        </p>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            onClick={() => reset()}
            className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            🔄 Try Again
          </button>
          <Link
            href="/"
            className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 transition-colors font-semibold text-center"
          >
            🏠 Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
```

---

## 🎨 Complete Examples

### Example 1: Posts Page with Loading & Error

```tsx
// app/posts/page.tsx
export default async function PostsPage() {
  // Simulate delay to see loading state
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
    cache: 'no-store'
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }
  
  const posts = await response.json();
  
  return (
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">All Posts</h1>
      
      <div className="grid md:grid-cols-3 gap-6">
        {posts.slice(0, 9).map((post: any) => (
          <div key={post.id} className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-2">{post.title}</h2>
            <p className="text-gray-600">{post.body.substring(0, 100)}...</p>
          </div>
        ))}
      </div>
    </div>
  );
}
```

```tsx
// app/posts/loading.tsx
export default function Loading() {
  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="h-10 w-48 bg-gray-200 rounded animate-pulse mb-8"></div>
      
      <div className="grid md:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
          <div key={i} className="bg-white rounded-lg shadow-md p-6">
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-4 animate-pulse"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

```tsx
// app/posts/error.tsx
'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md text-center">
        <span className="text-6xl">❌</span>
        <h2 className="text-2xl font-bold text-red-600 mt-4 mb-2">Failed to Load Posts</h2>
        <p className="text-gray-600 mb-6">{error.message}</p>
        <button
          onClick={() => reset()}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-semibold"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
```

---

### Example 2: User Profile with Loading

```tsx
// app/user/[id]/loading.tsx
export default function Loading() {
  return (
    <div className="max-w-2xl mx-auto p-8">
      <div className="bg-white rounded-xl shadow-lg p-8">
        {/* Avatar Skeleton */}
        <div className="w-24 h-24 bg-gray-200 rounded-full animate-pulse mb-6"></div>
        
        {/* Name Skeleton */}
        <div className="h-8 bg-gray-200 rounded w-48 mb-4 animate-pulse"></div>
        
        {/* Info Skeletons */}
        <div className="space-y-4">
          <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
```

---

### Example 3: Dashboard with Error Boundary

```tsx
// app/dashboard/error.tsx
'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Dashboard error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
      <div className="max-w-md text-center">
        <h1 className="text-6xl font-bold mb-4">🔥</h1>
        <h2 className="text-3xl font-bold mb-4">Dashboard Error</h2>
        <p className="text-gray-300 mb-8">
          We couldn't load your dashboard data. This might be a temporary issue.
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => reset()}
            className="bg-white text-gray-900 px-6 py-3 rounded-lg hover:bg-gray-100 font-semibold"
          >
            Retry
          </button>
          <button
            onClick={() => window.location.href = '/'}
            className="bg-gray-700 text-white px-6 py-3 rounded-lg hover:bg-gray-600 font-semibold"
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
}
```

---

## 🎓 Advanced: Nested Loading States

Loading states cascade down the route tree!

```
app/
├── loading.tsx              ← Shown while ANY route loads
├── dashboard/
│   ├── loading.tsx          ← Overrides parent for /dashboard/*
│   ├── page.tsx
│   └── settings/
│       ├── loading.tsx      ← Overrides parent for /dashboard/settings
│       └── page.tsx
```

**Visit `/dashboard/settings`:**
1. Shows `app/loading.tsx` (global)
2. Then shows `dashboard/loading.tsx` (if exists)
3. Then shows `dashboard/settings/loading.tsx` (most specific)

---

## 🎓 Advanced: React Suspense (Manual Control)

For **fine-grained loading control**, use `<Suspense>`:

```tsx
// app/posts/page.tsx
import { Suspense } from 'react'

async function PostsList() {
  const posts = await fetch('https://api.example.com/posts').then(r => r.json());
  return <div>{posts.map(...)}</div>;
}

async function Comments() {
  const comments = await fetch('https://api.example.com/comments').then(r => r.json());
  return <div>{comments.map(...)}</div>;
}

export default function PostsPage() {
  return (
    <div>
      <h1>Posts Page</h1>
      
      {/* Posts load independently */}
      <Suspense fallback={<div>Loading posts...</div>}>
        <PostsList />
      </Suspense>
      
      {/* Comments load independently */}
      <Suspense fallback={<div>Loading comments...</div>}>
        <Comments />
      </Suspense>
    </div>
  );
}
```

**Benefit:** Posts and comments load **in parallel**, each showing its own loading state!

---

## 🧪 Exercise 9: Mastering Loading & Error States

Time to practice graceful loading and error handling!

### Task 1: Add Loading to Users Page (15 mins)

Create `app/users/loading.tsx`:
- Show skeleton cards for users
- Animate with `animate-pulse`
- Match the layout of your users page
- Show 6-8 skeleton cards

**Hint:** Use grid layout like your users page

---

### Task 2: Add Error to Users Page (15 mins)

Create `app/users/error.tsx`:
- Must include `'use client'`
- Show friendly error message
- Include "Try Again" button using `reset()`
- Display the error message
- Add emoji or icon

**Test it:** Modify `app/users/page.tsx` to throw an error:
```tsx
throw new Error('Failed to load users');
```

---

### Task 3: Add Loading to Posts Page (15 mins)

Create `app/posts/loading.tsx`:
- Show 9 skeleton post cards
- Use 3-column grid (like the actual page)
- Animate with pulse effect
- Match the card design

---

### Task 4: Add Error to Single Post Page (20 mins)

Create `app/posts/[id]/error.tsx`:
- Client Component (`'use client'`)
- Show error icon/emoji
- Display error message
- "Try Again" button
- "Back to Posts" link
- Professional styling

**Test it:** Visit an invalid post ID like `/posts/9999`

---

### Task 5: Global Loading (BONUS - 10 mins)

Create `app/loading.tsx`:
- Full-screen loading indicator
- Centered spinner or logo
- Smooth animation
- Nice gradient background

This shows while navigating between ANY pages!

---

## 📝 What to Submit:

After completing the tasks, share:

1. **Did you create loading.tsx for users?** (Yes/No)
2. **Did you create error.tsx for users?** (Yes/No)
3. **Paste your users/loading.tsx code**
4. **Did posts loading work?** (Yes/No)
5. **Did error handling work when you tested it?** (Yes/No)

6. **Answer these questions:**
   - What is the purpose of `loading.tsx`?
   - Why must `error.tsx` be a Client Component?
   - What does the `reset()` function do?
   - Where do you place `loading.tsx` to affect all routes?
   - What's the difference between `loading.tsx` and `<Suspense>`?
   - What happens if you don't have an `error.tsx` file and an error occurs?

---

## 🎓 Key Concepts to Remember

1. **`loading.tsx`** = Special file for loading states
2. **`error.tsx`** = Special file for error handling (must be Client Component)
3. **Placement matters** = Affects that route and children
4. **`reset()`** = Function to retry the failed operation
5. **Skeleton screens** = Better UX than spinners
6. **Error boundaries** = Prevent entire app from crashing
7. **`<Suspense>`** = Manual loading control for specific components

---

## ✅ Success Criteria

You've completed this lesson when you can:
- ✅ Create loading states with `loading.tsx`
- ✅ Create error boundaries with `error.tsx`
- ✅ Design skeleton loading screens
- ✅ Handle errors gracefully with reset functionality
- ✅ Understand when to use `loading.tsx` vs `<Suspense>`
- ✅ Test error states by throwing errors

---

## 🎯 Pro Tips:

1. **Match your layout** - Loading skeletons should look like the actual content
2. **Use animate-pulse** - Tailwind's built-in animation
3. **Test errors** - Always test your error states!
4. **User feedback** - Always show users what's happening
5. **Don't crash** - Error boundaries prevent white screen of death
6. **Log errors** - Use `useEffect` to log errors in production

---

Loading and error states are critical for professional UX! Users should never see blank screens or crashes.

Complete the exercises and test everything thoroughly. Next, we'll cover **Styling** in depth!

Good luck! 🚀💪
