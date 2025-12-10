# 📘 Lesson 2: Understanding Project Structure

Great job completing Lesson 1! Now let's understand what was created in your `my-first-nextjs-app` project.

---

## 🎯 What is Project Structure?

Project structure is the **organization of files and folders** in your Next.js application. Understanding it helps you know:
- Where to put your code
- How files relate to each other
- Next.js conventions and special files

---

## 📂 Complete Project Structure

Here's what `create-next-app` generated:

```
my-first-nextjs-app/
├── app/                     # 🌟 Main application folder (App Router)
│   ├── favicon.ico         # Browser tab icon
│   ├── globals.css         # Global styles for entire app
│   ├── layout.tsx          # Root layout (wraps all pages)
│   └── page.tsx            # Home page (/) - YOU EDITED THIS!
│
├── node_modules/            # Installed dependencies (don't touch!)
│
├── public/                  # Static files (images, fonts, etc.)
│   └── (your static assets go here)
│
├── .eslintrc.json          # ESLint configuration
├── .gitignore              # Files Git should ignore
├── next.config.ts          # Next.js configuration
├── package.json            # Project dependencies and scripts
├── package-lock.json       # Locked dependency versions
├── postcss.config.mjs      # PostCSS configuration
├── README.md               # Project documentation
├── tailwind.config.ts      # Tailwind CSS configuration
└── tsconfig.json           # TypeScript configuration
```

---

## 🌟 The `app/` Folder - Your Most Important Folder

This is where **95% of your work happens**. Let's break it down:

### 📄 Special Files in `app/`

#### 1. `page.tsx` - Creates a Page
- **What**: Defines a route's UI
- **Where**: Any folder in `app/`
- **When**: Every time you want a new page/route
- **Why**: This is how Next.js knows what to display

```tsx
// app/page.tsx - Home page at "/"
export default function Home() {
  return <h1>Home Page</h1>
}
```

#### 2. `layout.tsx` - Shared UI Wrapper
- **What**: Wraps pages with shared UI (like headers, footers)
- **Where**: Any folder in `app/`
- **When**: You want consistent UI across multiple pages
- **Why**: Avoid repeating code, maintain state between pages

```tsx
// app/layout.tsx - Wraps ALL pages
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header>My Website Header</header>
        {children}  {/* Your page content goes here */}
        <footer>My Website Footer</footer>
      </body>
    </html>
  )
}
```

#### 3. `globals.css` - Global Styles
- **What**: CSS that applies to your entire app
- **Where**: Usually in root `app/` folder
- **When**: For styles used everywhere (resets, fonts, colors)
- **Why**: Define app-wide styling rules

---

## 🗺️ How Folders Become Routes

**This is the magic of Next.js!** Folder structure = URL structure

```
app/
├── page.tsx              → /              (Home page)
├── about/
│   └── page.tsx          → /about         (About page)
├── blog/
│   └── page.tsx          → /blog          (Blog listing)
│   └── [id]/
│       └── page.tsx      → /blog/123      (Single blog post)
└── contact/
    └── page.tsx          → /contact       (Contact page)
```

**Example:**
- Create file: `app/about/page.tsx` 
- Visit: `http://localhost:3000/about` 
- It works! 🎉

---

## 📁 Other Important Folders & Files

### `public/` Folder
- **What**: Static files served directly
- **When**: Images, fonts, robots.txt, sitemap.xml
- **Why**: These files need direct access via URL

```
public/
├── logo.png              → Access at /logo.png
├── images/
│   └── hero.jpg          → Access at /images/hero.jpg
└── robots.txt            → Access at /robots.txt
```

### `package.json`
- **What**: Project metadata and dependencies
- **Key scripts**:
  ```json
  {
    "scripts": {
      "dev": "next dev",        // Start development server
      "build": "next build",     // Build for production
      "start": "next start",     // Run production build
      "lint": "next lint"        // Check code quality
    }
  }
  ```

### `next.config.ts`
- **What**: Next.js configuration file
- **When**: Need to customize Next.js behavior
- **Why**: Add redirects, environment variables, image domains, etc.

---

## 🎨 File Naming Conventions

Next.js uses **special file names** that have specific meanings:

| File Name | Purpose | Example |
|-----------|---------|---------|
| `page.tsx` | Creates a route | Homepage, about page |
| `layout.tsx` | Shared UI wrapper | Header, footer, sidebar |
| `loading.tsx` | Loading state UI | Skeleton screens |
| `error.tsx` | Error boundary | Error messages |
| `not-found.tsx` | 404 page | Custom 404 page |
| `route.ts` | API endpoint | REST API routes |

**Important:** These names are NOT arbitrary - they have special meanings in Next.js!

---

## 📝 Code Example: Exploring Your Current Structure

Let's look at your actual files:

### Your `app/page.tsx` (Home Page)

```tsx
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <p>Hello, I'm learning Next.js!</p>
    </div>
  );
}
```

**What's happening:**
- `export default function Home()` - React component
- `return (...)` - JSX (looks like HTML, but it's JavaScript)
- `className` - CSS classes (Tailwind in your case)
- This file is at `app/page.tsx` → Shows at `/` (homepage)

### Your `app/layout.tsx` (Root Layout)

Open this file and you'll see it wraps your entire app. Every page you create will be inside this layout!

---

## 🧪 Exercise 2: Exploring Structure

Now it's your turn to explore and create!

### Task 1: Understand Current Files (5 mins)
1. Open `app/layout.tsx` in VS Code
2. Find where `{children}` is used - this is where your pages appear!
3. Look at the `<html>` and `<body>` tags

### Task 2: Create an About Page (10 mins)

Create a new About page by following these steps:

1. **Create a new folder** inside `app/` called `about`
   ```
   app/about/
   ```

2. **Create a file** inside `about/` called `page.tsx`
   ```
   app/about/page.tsx
   ```

3. **Add this code** to `app/about/page.tsx`:
   ```tsx
   export default function AboutPage() {
     return (
       <div className="flex min-h-screen flex-col items-center justify-center bg-blue-50 p-8">
         <h1 className="text-4xl font-bold mb-4">About Me</h1>
         <p className="text-lg text-gray-700">
           My name is [YOUR NAME]
         </p>
         <p className="text-lg text-gray-700 mt-2">
           I am learning Next.js to build amazing web applications!
         </p>
       </div>
     );
   }
   ```

4. **Visit** `http://localhost:3000/about` in your browser

### Task 3: Create a Contact Page (10 mins)

Now create a Contact page on your own:

1. Create `app/contact/page.tsx`
2. Write a simple component that displays:
   - A heading: "Contact Me"
   - Your email (can be fake): "student@nextjs.learning"
   - A message: "Feel free to reach out!"
3. Style it with Tailwind classes (be creative!)
4. Visit `http://localhost:3000/contact`

---

## 📝 What to Submit:

Share with me:

1. **Did you successfully create the About page?** (Yes/No)
2. **What URL shows your About page?**
3. **Did you create the Contact page?** (Yes/No)
4. **Paste your Contact page code here** (the entire `page.tsx` file)
5. **One question**: What happens if you create `app/blog/page.tsx`? What URL would it be at?

---

## 🎓 Key Concepts to Remember

1. **`app/` folder** = Your application code lives here
2. **Folders create routes** = `app/about/page.tsx` → `/about`
3. **`page.tsx`** = Required to make a route accessible
4. **`layout.tsx`** = Wraps pages with shared UI
5. **`public/`** = Static files accessible via URL
6. **File names matter** = Special files have special purposes

---

## ✅ Success Criteria

You've completed this lesson when you can:
- ✅ Explain what the `app/` folder is for
- ✅ Create a new page by adding a folder + `page.tsx`
- ✅ Navigate to your new pages in the browser
- ✅ Understand how folder structure maps to URLs

---

Take your time with the exercises! Once you complete them and share your work, we'll move to **Lesson 3: Pages & Routing** where we'll dive deeper into the routing system.

Happy coding! 🚀
