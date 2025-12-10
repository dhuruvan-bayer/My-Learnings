# 📘 Lesson 6: Server & Client Components

Excellent progress, Dhuruvan! You're 1/3 done! Now let's learn one of Next.js's most powerful features: **Server and Client Components**.

---

## 🎯 What are Server & Client Components?

Next.js introduces a new way to think about React components:

### **Server Components** (Default)
- Render on the **server**
- Send HTML to the browser
- No JavaScript shipped to client
- Can directly access databases, files, APIs

### **Client Components**
- Render in the **browser**
- Interactive with hooks (useState, useEffect)
- Event handlers (onClick, onChange)
- Can use browser APIs (localStorage, window)

```
┌─────────────────────────────────────┐
│         Your Next.js App            │
├─────────────────────────────────────┤
│                                     │
│  Server Components (Default)        │
│  • Fast, no JS to client           │
│  • Can fetch data directly         │
│  • Run on server only              │
│                                     │
│  ┌──────────────────────────┐     │
│  │ Client Components        │     │
│  │ • Interactive            │     │
│  │ • Use hooks             │     │
│  │ • Event handlers        │     │
│  └──────────────────────────┘     │
└─────────────────────────────────────┘
```

---

## 📍 Where Each Type Lives

### **By Default: Everything is a Server Component**

```tsx
// app/page.tsx
// This is a Server Component (default)
export default function Page() {
  return <h1>Hello</h1>
}
```

### **To Make a Client Component: Add `'use client'`**

```tsx
// app/page.tsx
'use client'; // This directive makes it a Client Component

import { useState } from 'react';

export default function Page() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>
}
```

---

## ⏰ When to Use Each Type?

### **Use Server Components When:**

| Use Case | Example |
|----------|---------|
| Fetching data | Getting blog posts from database |
| Accessing backend resources | Reading files, calling APIs |
| Keeping secrets | API keys, tokens |
| Large dependencies | Heavy libraries stay on server |
| Static content | Text, images that don't change |

### **Use Client Components When:**

| Use Case | Example |
|----------|---------|
| Interactivity | Click handlers, form inputs |
| State management | useState, useReducer |
| Effects | useEffect, useLayoutEffect |
| Browser APIs | localStorage, geolocation |
| Event listeners | onClick, onChange, onSubmit |
| Custom hooks | useRouter, usePathname, useSearchParams |

---

## 🤔 Why Two Types of Components?

### **The Problem with Traditional React:**

```tsx
// Traditional React - Everything ships to browser
function Page() {
  const data = fetch('/api/posts'); // ❌ Runs in browser
  return <div>{data}</div>
}

// Result:
// 1. JavaScript bundle is huge
// 2. Data fetching happens in browser (slow)
// 3. SEO is harder
```

### **The Next.js Solution:**

```tsx
// Server Component - Runs on server
async function Page() {
  const data = await fetch('/api/posts'); // ✅ Runs on server
  return <div>{data}</div>
}

// Result:
// 1. No extra JavaScript sent
// 2. Data fetching happens on server (fast)
// 3. Perfect SEO
```

### **Benefits:**

| Benefit | Description |
|---------|-------------|
| **Performance** | Less JavaScript to download |
| **Security** | API keys stay on server |
| **SEO** | Content rendered on server |
| **Data Access** | Direct database access |
| **Bundle Size** | Smaller client bundles |

---

## 🛠️ Server Components (Default)

### Example 1: Static Content

```tsx
// app/about/page.tsx
// Server Component (no 'use client')
export default function AboutPage() {
  return (
    <div>
      <h1>About Us</h1>
      <p>We build amazing web apps</p>
    </div>
  );
}
```

### Example 2: Fetching Data

```tsx
// app/posts/page.tsx
// Server Component can be async!
export default async function PostsPage() {
  // This runs on the server
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const posts = await res.json();

  return (
    <div>
      <h1>Blog Posts</h1>
      <ul>
        {posts.slice(0, 5).map(post => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}
```

### Example 3: Reading Environment Variables

```tsx
// app/config/page.tsx
// Server Component can access server-side env vars
export default function ConfigPage() {
  // This is safe - never sent to browser
  const apiKey = process.env.SECRET_API_KEY;
  
  return (
    <div>
      <h1>Config</h1>
      <p>API configured: {apiKey ? 'Yes' : 'No'}</p>
    </div>
  );
}
```

---

## 🖱️ Client Components

### Example 1: Interactive Button

```tsx
// app/components/Counter.tsx
'use client'; // Required for interactivity!

import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}
```

### Example 2: Form with State

```tsx
// app/components/ContactForm.tsx
'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email:', email);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email"
      />
      <button type="submit">Submit</button>
    </form>
  );
}
```

### Example 3: Using Browser APIs

```tsx
// app/components/ThemeToggle.tsx
'use client';

import { useState, useEffect } from 'react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    // Access localStorage (browser only)
    const saved = localStorage.getItem('theme');
    if (saved) setTheme(saved);
  }, []);

  const toggle = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <button onClick={toggle}>
      Theme: {theme}
    </button>
  );
}
```

---

## 🔄 Mixing Server and Client Components

### Pattern 1: Client Component Inside Server Component

```tsx
// app/page.tsx (Server Component)
import Counter from './Counter'; // Client Component

export default function Page() {
  return (
    <div>
      <h1>My Page</h1>
      <p>This is server rendered</p>
      <Counter /> {/* This is interactive */}
    </div>
  );
}

// app/Counter.tsx (Client Component)
'use client';
import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

### Pattern 2: Passing Server Data to Client Component

```tsx
// app/page.tsx (Server Component)
async function Page() {
  // Fetch on server
  const res = await fetch('https://api.example.com/data');
  const data = await res.json();

  // Pass to client component
  return <ClientDisplay data={data} />;
}

// app/ClientDisplay.tsx (Client Component)
'use client';
export default function ClientDisplay({ data }) {
  const [visible, setVisible] = useState(false);
  return (
    <div>
      <button onClick={() => setVisible(!visible)}>Toggle</button>
      {visible && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}
```

---

## ⚠️ Common Rules & Restrictions

### **Server Components CAN:**
- ✅ Be async functions
- ✅ Fetch data directly
- ✅ Access server resources
- ✅ Import Client Components
- ✅ Use server-only modules

### **Server Components CANNOT:**
- ❌ Use useState, useEffect, hooks
- ❌ Use event handlers (onClick, etc.)
- ❌ Use browser APIs
- ❌ Import Client Components that import Server Components

### **Client Components CAN:**
- ✅ Use all React hooks
- ✅ Use event handlers
- ✅ Use browser APIs
- ✅ Import other Client Components

### **Client Components CANNOT:**
- ❌ Be async functions
- ❌ Directly access server resources
- ❌ Use server-only modules
- ❌ Import Server Components directly

---

## 📝 Decision Tree

```
Do you need interactivity (clicks, forms, state)?
│
├─ YES → Use Client Component ('use client')
│   │
│   ├─ useState/useEffect?
│   ├─ onClick/onChange?
│   └─ Browser APIs?
│
└─ NO → Use Server Component (default)
    │
    ├─ Fetching data?
    ├─ Static content?
    └─ Database access?
```

---

## 🧪 Exercise 6: Building Server & Client Components

Time to practice! You'll build both types and see the differences.

### Task 1: Create a Server Component with Data (15 mins)

Create `app/users/page.tsx` that fetches and displays users from an API:

```tsx
// app/users/page.tsx
// This is a Server Component - NO 'use client'!

export default async function UsersPage() {
  // Fetch data on server
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  const users = await res.json();

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Users List</h1>
      <div className="grid gap-4">
        {users.map(user => (
          <div key={user.id} className="bg-white p-4 rounded-lg shadow">
            <h2 className="font-bold text-lg">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>
            <p className="text-sm text-gray-500">{user.company.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
```

**Requirements:**
- Make it a Server Component (no 'use client')
- Fetch data from the API
- Display all users with their name, email, and company

### Task 2: Create an Interactive Client Component (15 mins)

Create `app/_components/LikeButton.tsx`:

```tsx
// app/_components/LikeButton.tsx
'use client'; // Required for interactivity!

import { useState } from 'react';

export default function LikeButton() {
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    if (liked) {
      setLikes(likes - 1);
      setLiked(false);
    } else {
      setLikes(likes + 1);
      setLiked(true);
    }
  };

  return (
    <button
      onClick={handleLike}
      className={`px-4 py-2 rounded-lg transition ${
        liked 
          ? 'bg-red-500 text-white' 
          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
      }`}
    >
      {liked ? '❤️' : '🤍'} {likes} Likes
    </button>
  );
}
```

**Requirements:**
- Must have 'use client' directive
- Use useState for likes count
- Toggle between liked/unliked
- Change button color when liked

### Task 3: Mix Server and Client Components (15 mins)

Update your blog post pages to include the LikeButton:

1. **Import LikeButton** in `app/blog/nextjs-basics/page.tsx`
2. **Add it below the article content**
3. **Do the same** for `app/blog/react-tips/page.tsx`

Example:
```tsx
// app/blog/nextjs-basics/page.tsx
import Link from "next/link";
import LikeButton from "../../_components/LikeButton"; // Import

export default function NextjsBasics(){
    return (
        <article className="max-w-4xl mx-auto p-8">
            {/* ...existing content... */}
            
            {/* Add at the bottom */}
            <div className="mt-8 pt-8 border-t">
              <LikeButton />
            </div>
        </article>
    )
}
```

### Task 4: Create a Counter Component (10 mins)

Create `app/_components/Counter.tsx`:

- Must be a Client Component
- Use useState for count
- Have Increment and Decrement buttons
- Display current count
- Style it nicely

Then add it to your homepage (`app/page.tsx`) in one of the cards!

---

## 📝 What to Submit:

After completing all tasks, share:

1. **Did you create the Users page?** (Yes/No)
2. **Paste your `app/_components/Counter.tsx` code**
3. **Did the LikeButton work on blog posts?** (Yes/No)
4. **Can you click it multiple times?** (Yes/No)

5. **Answer these questions:**
   - What's the difference between Server and Client Components?
   - When would you use a Server Component?
   - When would you use a Client Component?
   - What does 'use client' do?
   - Can a Server Component use useState? Why or why not?

---

## 🎓 Key Concepts to Remember

1. **Server Components** = Default, run on server, no interactivity
2. **Client Components** = Need `'use client'`, interactive, hooks
3. **Decision** = Interactivity needed? → Client. Otherwise → Server
4. **Performance** = Server Components = less JavaScript
5. **Mixing** = You can use both in the same app
6. **Data Flow** = Server → Client (not the reverse)

---

## ✅ Success Criteria

You've completed this lesson when you can:
- ✅ Create Server Components (default)
- ✅ Create Client Components ('use client')
- ✅ Understand when to use each
- ✅ Mix both in the same page
- ✅ Fetch data in Server Components
- ✅ Add interactivity in Client Components

---

This is a game-changing concept! Understanding Server vs Client Components is crucial for building performant Next.js apps. Take your time with this one!

Once you complete this, we'll move to **Lesson 7: Data Fetching** where you'll learn advanced patterns for fetching data.

Good luck! 🚀💪
