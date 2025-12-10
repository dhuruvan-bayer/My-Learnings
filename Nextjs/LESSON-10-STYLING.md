# 📘 Lesson 10: Styling in Next.js (CSS/Tailwind)

Excellent progress, Dhuruvan! You've been using Tailwind CSS throughout the course. Now let's master **all styling approaches** in Next.js! 🎨

---

## 🎯 What is Styling in Next.js?

Next.js supports **multiple styling methods**:

1. **Tailwind CSS** (what you've been using)
2. **CSS Modules** (component-scoped CSS)
3. **Global CSS** (app-wide styles)
4. **CSS-in-JS** (styled-components, emotion)
5. **Sass/SCSS** (CSS preprocessor)

Each has its **use case**!

---

## 📍 Where Each Styling Method is Used

### **1. Tailwind CSS (Utility-First)**
**Best for:** Rapid development, consistent design systems

```tsx
<div className="bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700">
  Button
</div>
```

**Where you've used it:** Everywhere in your app! Navbar, cards, buttons, layouts.

**Pros:**
- ✅ Fast development
- ✅ No naming CSS classes
- ✅ Consistent spacing/colors
- ✅ Built-in responsive design

**Cons:**
- ❌ Long className strings
- ❌ Learning curve for utility names
- ❌ HTML can look cluttered

---

### **2. CSS Modules (Component-Scoped)**
**Best for:** Component-specific styles, avoiding naming conflicts

```tsx
// app/components/Button.module.css
.button {
  background-color: blue;
  color: white;
  padding: 1rem;
}

.button:hover {
  background-color: darkblue;
}
```

```tsx
// app/components/Button.tsx
import styles from './Button.module.css'

export default function Button() {
  return <button className={styles.button}>Click Me</button>
}
```

**Pros:**
- ✅ Styles scoped to component (no conflicts)
- ✅ Traditional CSS syntax
- ✅ Auto-generated unique class names
- ✅ Works with TypeScript

**Cons:**
- ❌ Need separate CSS files
- ❌ More files to manage

---

### **3. Global CSS**
**Best for:** Base styles, resets, typography, shared utilities

```css
/* app/globals.css */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', sans-serif;
  line-height: 1.6;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}
```

**Import in root layout:**
```tsx
// app/layout.tsx
import './globals.css'
```

**Pros:**
- ✅ Affects entire app
- ✅ Good for base styles
- ✅ Simple to understand

**Cons:**
- ❌ Can cause naming conflicts
- ❌ Hard to track which styles affect what

---

### **4. CSS-in-JS (styled-components)**
**Best for:** Dynamic styles based on props

```tsx
'use client'

import styled from 'styled-components'

const Button = styled.button<{ $primary?: boolean }>`
  background-color: ${props => props.$primary ? 'blue' : 'gray'};
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: 8px;
  
  &:hover {
    opacity: 0.8;
  }
`

export default function MyButton() {
  return <Button $primary>Click Me</Button>
}
```

**Pros:**
- ✅ Dynamic styling with props
- ✅ No separate CSS files
- ✅ TypeScript support

**Cons:**
- ❌ Client Component only
- ❌ Extra library needed
- ❌ Runtime overhead

---

### **5. Sass/SCSS**
**Best for:** Advanced CSS features (variables, nesting, mixins)

```scss
// app/components/Card.module.scss
$primary-color: #3b82f6;
$spacing: 1rem;

.card {
  background: white;
  padding: $spacing * 2;
  border-radius: 8px;
  
  &:hover {
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  }
  
  .title {
    color: $primary-color;
    font-size: 1.5rem;
  }
}
```

**Pros:**
- ✅ Variables, nesting, mixins
- ✅ More powerful than plain CSS
- ✅ Works with CSS Modules

**Cons:**
- ❌ Requires Sass installation
- ❌ Extra compilation step

---

## ⏰ When to Use Each Method

| Method | Use When... | Example |
|--------|-------------|---------|
| **Tailwind** | Rapid UI development | Buttons, cards, layouts |
| **CSS Modules** | Component-specific complex styles | Custom animations, unique designs |
| **Global CSS** | Base styles, typography, resets | Body font, default colors |
| **CSS-in-JS** | Dynamic styles based on props | Themed components, conditional styles |
| **Sass/SCSS** | Need CSS preprocessor features | Large projects with design systems |

---

## 🤔 Why Different Styling Methods?

### **Problem Without Proper Styling:**
```tsx
// ❌ Inline styles everywhere (hard to maintain)
<div style={{ backgroundColor: 'blue', color: 'white', padding: '16px' }}>
  Content
</div>

// ❌ Global CSS conflicts
// button.css: .button { color: blue; }
// form.css: .button { color: red; }  // Conflict!
```

### **Solution With Next.js Styling:**
```tsx
// ✅ Tailwind (consistent utilities)
<div className="bg-blue-600 text-white p-4">Content</div>

// ✅ CSS Modules (scoped, no conflicts)
<button className={styles.button}>Click</button>
```

---

## 🛠️ Complete Examples

### Example 1: CSS Modules Component

```css
/* app/components/ProfileCard.module.css */
.card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16px;
  padding: 2rem;
  color: white;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 4px solid white;
  margin-bottom: 1rem;
}

.name {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.bio {
  opacity: 0.9;
  line-height: 1.6;
}
```

```tsx
// app/components/ProfileCard.tsx
import styles from './ProfileCard.module.css'

interface ProfileCardProps {
  name: string;
  bio: string;
  avatar: string;
}

export default function ProfileCard({ name, bio, avatar }: ProfileCardProps) {
  return (
    <div className={styles.card}>
      <img src={avatar} alt={name} className={styles.avatar} />
      <h2 className={styles.name}>{name}</h2>
      <p className={styles.bio}>{bio}</p>
    </div>
  )
}
```

---

### Example 2: Combining Tailwind + CSS Modules

```css
/* app/components/CustomButton.module.css */
.button {
  position: relative;
  overflow: hidden;
}

.button::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
}

.button:hover::before {
  width: 300px;
  height: 300px;
}
```

```tsx
// app/components/CustomButton.tsx
import styles from './CustomButton.module.css'

export default function CustomButton({ children }: { children: React.ReactNode }) {
  return (
    <button className={`${styles.button} bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold`}>
      {children}
    </button>
  )
}
```

**Best of both worlds!** Tailwind for utility classes, CSS Modules for custom effects.

---

### Example 3: Advanced Tailwind Patterns

```tsx
// Responsive Design
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* 1 column mobile, 2 tablet, 3 desktop */}
</div>

// Dark Mode Support
<div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
  Content
</div>

// Custom Animations
<div className="animate-pulse hover:animate-bounce">
  Loading...
</div>

// Group Hover Effects
<div className="group">
  <img className="group-hover:scale-110 transition-transform" src="..." />
  <p className="group-hover:text-blue-600">Hover card to see effect</p>
</div>

// Custom Colors (tailwind.config.ts)
<div className="bg-brand-primary text-brand-secondary">
  Custom colors
</div>
```

---

### Example 4: Global Styles for Typography

```css
/* app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Custom Typography */
@layer base {
  h1 {
    @apply text-4xl font-bold mb-4 text-gray-900;
  }
  
  h2 {
    @apply text-3xl font-semibold mb-3 text-gray-800;
  }
  
  h3 {
    @apply text-2xl font-medium mb-2 text-gray-700;
  }
  
  p {
    @apply text-base leading-relaxed text-gray-600 mb-4;
  }
  
  a {
    @apply text-blue-600 hover:text-blue-800 underline;
  }
}

/* Custom Components */
@layer components {
  .btn-primary {
    @apply bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold;
  }
  
  .card {
    @apply bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow;
  }
  
  .input-field {
    @apply w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500;
  }
}

/* Custom Utilities */
@layer utilities {
  .text-gradient {
    @apply bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent;
  }
  
  .glass-effect {
    @apply backdrop-blur-lg bg-white/30 border border-white/20;
  }
}
```

Usage:
```tsx
<h1>This uses custom h1 styling</h1>
<button className="btn-primary">Primary Button</button>
<div className="card">Card with hover effect</div>
<h2 className="text-gradient">Gradient Text</h2>
<div className="glass-effect p-6">Glass morphism</div>
```

---

### Example 5: Tailwind Config Customization

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#3b82f6',
          secondary: '#8b5cf6',
          accent: '#ec4899',
        },
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

export default config
```

Usage:
```tsx
<div className="bg-brand-primary text-white p-128 animate-fade-in">
  Custom config in action!
</div>
```

---

## 🧪 Exercise 10: Mastering Styling Methods

Time to practice different styling approaches!

### Task 1: Create CSS Module Button Component (20 mins)

Create `app/components/FancyButton/FancyButton.module.css`:
```css
/* Create a button with:
 - Gradient background
 - Ripple effect on click
 - Smooth hover animation
 - Shadow that grows on hover
 */
```

Create `app/components/FancyButton/FancyButton.tsx`:
- Use the CSS module
- Accept `children` and `onClick` props
- TypeScript interface

**Test it:** Use in your homepage

---

### Task 2: Create Profile Card with CSS Modules (25 mins)

Create `app/components/UserCard/UserCard.module.css`:
```css
/* Style requirements:
 - Gradient background
 - Circular avatar
 - Hover effect (lift up)
 - Professional shadow
 - Use CSS animations
 */
```

Create `app/components/UserCard/UserCard.tsx`:
- Accept: name, role, avatar, bio
- Use CSS module for styling
- Can combine with Tailwind for spacing

---

### Task 3: Custom Global Styles (15 mins)

Update `app/globals.css`:
- Add custom typography styles for h1, h2, h3
- Create `.btn-primary` and `.btn-secondary` classes
- Create `.card` utility class
- Create `.text-gradient` utility

Test by using these classes in any page!

---

### Task 4: Responsive Grid with Tailwind (15 mins)

Create `app/gallery/page.tsx`:
- Display 12 image cards (use placeholder emojis)
- Responsive grid:
  - 1 column on mobile
  - 2 columns on tablet (md)
  - 3 columns on desktop (lg)
  - 4 columns on xl screens
- Cards should have hover effects
- Use Tailwind only!

---

### Task 5: Combined Styling Approach (BONUS - 20 mins)

Create `app/components/AnimatedCard/AnimatedCard.tsx`:
- Use CSS Modules for complex animations
- Use Tailwind for layout and spacing
- Create a card that:
  - Has a 3D flip animation on hover
  - Shows different content on front/back
  - Uses both styling methods effectively

---

## 📝 What to Submit:

After completing the tasks, share:

1. **Did you create FancyButton with CSS Module?** (Yes/No)
2. **Paste your UserCard CSS and TSX code**
3. **Did you add custom global styles?** (Yes/No)
4. **Did the responsive gallery work?** (Yes/No)
5. **Bonus: Did you create AnimatedCard?** (Yes/No)

6. **Answer these questions:**
   - What is the main benefit of CSS Modules over global CSS?
   - When would you use Tailwind vs CSS Modules?
   - How do you combine Tailwind classes with CSS Module classes?
   - What is the `@layer` directive in Tailwind?
   - Why must CSS-in-JS components be Client Components?
   - How do you make a CSS Module file in Next.js?

---

## 🎓 Key Concepts to Remember

1. **CSS Modules** = `.module.css` files with scoped styles
2. **Tailwind** = Utility-first CSS framework
3. **Global CSS** = `globals.css` imported in root layout
4. **Combining styles** = `className={`${styles.button} p-4 bg-blue-600`}`
5. **Responsive** = Tailwind breakpoints: `sm:`, `md:`, `lg:`, `xl:`, `2xl:`
6. **Custom Tailwind** = Extend in `tailwind.config.ts`
7. **@layer** = Organize custom Tailwind styles

---

## ✅ Success Criteria

You've completed this lesson when you can:
- ✅ Create and use CSS Modules
- ✅ Write custom global styles
- ✅ Build responsive layouts with Tailwind
- ✅ Combine multiple styling approaches
- ✅ Extend Tailwind configuration
- ✅ Use @layer for custom utilities

---

## 🎯 Pro Tips:

1. **CSS Modules for complex stuff** - Custom animations, unique designs
2. **Tailwind for everything else** - Rapid development, consistency
3. **Global for base styles** - Typography, resets, shared utilities
4. **Organize components** - Keep CSS Module in same folder as component
5. **Use TypeScript** - Type your component props properly
6. **Responsive first** - Always test on mobile, tablet, desktop

---

Styling is crucial for professional-looking apps! Master these approaches and you'll have complete control over your UI.

Complete the exercises - they cover all important styling patterns. Next, we'll optimize **Images & Fonts** for performance!

Good luck! 🚀🎨
