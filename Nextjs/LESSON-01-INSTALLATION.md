# 📘 Lesson 1: Installation & Project Setup

## 🎯 What is Next.js?

Next.js is a **React framework** for building full-stack web applications. Think of it as React with superpowers! 

- **React**: A library for building user interfaces
- **Next.js**: A framework built on top of React that adds:
  - File-based routing (no need for react-router)
  - Server-side rendering (SSR)
  - Static site generation (SSG)
  - API routes
  - Image optimization
  - And much more!

---

## 📍 Where Does Next.js Fit?

```
Traditional Stack:
HTML + CSS + JavaScript → React (for UI) → React Router (for routing) → Express (for backend)

Next.js Stack:
Next.js (includes everything above in one framework!)
```

---

## ⏰ When to Use Next.js?

✅ **Use Next.js when:**
- Building modern web applications
- You need SEO (Search Engine Optimization)
- You want faster page loads
- Building e-commerce, blogs, dashboards, SaaS apps
- You want both frontend and backend in one project

❌ **Don't use Next.js when:**
- Building very simple static sites (use plain HTML)
- Building mobile apps (use React Native)
- You only need a backend API (use Express/FastAPI)

---

## 🤔 Why Use Next.js?

1. **Better Performance**: Pages load faster
2. **SEO-Friendly**: Search engines can easily index your content
3. **Developer Experience**: Hot reload, TypeScript support, easy deployment
4. **Full-Stack**: Build both frontend and backend in one project
5. **Production-Ready**: Used by Netflix, TikTok, Twitch, GitHub, etc.

---

## 🛠️ Installation & Setup

### Prerequisites
You need **Node.js** installed (version 18.18 or higher).

Check if you have Node.js:
```bash
node --version
```

If you don't have it, download from: https://nodejs.org/

---

## 📦 Creating Your First Next.js App

### Step 1: Create the Project

Open your terminal and run:

```bash
npx create-next-app@latest my-first-nextjs-app
```

You'll be asked several questions. Here are the recommended answers for learning:

```
✔ Would you like to use TypeScript? › No
✔ Would you like to use ESLint? › Yes
✔ Would you like to use Tailwind CSS? › Yes
✔ Would you like your code inside a `src/` directory? › No
✔ Would you like to use App Router? › Yes
✔ Would you like to use Turbopack for `next dev`? › Yes
✔ Would you like to customize the import alias (@/* by default)? › No
```

**What just happened?**
- `npx`: Executes npm packages without installing them globally
- `create-next-app`: Official Next.js project generator
- `@latest`: Gets the newest version
- `my-first-nextjs-app`: Your project name

### Step 2: Navigate to Your Project

```bash
cd my-first-nextjs-app
```

### Step 3: Start the Development Server

```bash
npm run dev
```

You should see:
```
  ▲ Next.js 15.x.x
  - Local:        http://localhost:3000
  - Ready in 1.2s
```

### Step 4: Open Your Browser

Go to: http://localhost:3000

🎉 **Congratulations!** You're now running your first Next.js application!

---

## 📂 Project Structure Overview (Quick Look)

After creation, you'll see these important files/folders:

```
my-first-nextjs-app/
├── app/                  # Where your pages live (App Router)
│   ├── layout.js        # Root layout (wraps all pages)
│   ├── page.js          # Home page (/)
│   └── globals.css      # Global styles
├── public/              # Static files (images, icons)
├── next.config.js       # Next.js configuration
├── package.json         # Dependencies and scripts
└── README.md            # Project documentation
```

**Don't worry about all these yet!** We'll explore them in the next lesson.

---

## 🎓 Key Concepts to Remember

1. **Next.js = React + More Features**
2. **App Router**: The modern way to build Next.js apps (uses the `app/` folder)
3. **Development Server**: `npm run dev` starts your app locally
4. **Port 3000**: Default port for Next.js apps (http://localhost:3000)

---

## 🧪 Exercise 1: Your Turn!

Now it's time to practice! Here's what I want you to do:

### Task:
1. Create a new Next.js project called `nextjs-learning`
2. Start the development server
3. Open the project in VS Code
4. Take a screenshot or describe what you see in your browser
5. Find and open the `app/page.js` file
6. Change the text on the page to say "Hello, I'm learning Next.js!"
7. Save the file and watch the browser automatically update (this is Hot Reload!)

### What to Submit:
Please share:
- Did you successfully create the project? (Yes/No)
- What text do you see on your home page after your changes?
- Any errors or issues you encountered?

---

## 📝 Success Criteria

You've completed this lesson when you can:
- ✅ Create a new Next.js project
- ✅ Start the development server
- ✅ Access your app in the browser
- ✅ Make a simple text change and see it update automatically

---

Take your time with the exercise! Once you're done, share your results and we'll move on to **Lesson 2: Understanding Project Structure**. 

Good luck! 🚀
