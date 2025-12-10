# 📘 Lesson 11: Images & Fonts Optimization

Perfect, Dhuruvan! Let's focus on **performance logic** - how Next.js optimizes images and fonts automatically! 🚀

---

## 🎯 What is Image & Font Optimization?

**The Problem:**
- Large images slow down your website
- Fonts cause layout shifts while loading
- Different devices need different image sizes
- Modern formats (WebP, AVIF) aren't supported everywhere

**Next.js Solution:**
- **`<Image>` component** - Automatic optimization, lazy loading, responsive images
- **`next/font`** - Optimized font loading, zero layout shift

---

## 🖼️ Image Optimization with `<Image>`

### **Regular `<img>` vs Next.js `<Image>`**

```tsx
// ❌ Regular HTML img (no optimization)
<img src="/photo.jpg" alt="Photo" />
// Problems:
// - No lazy loading (loads all images at once)
// - No responsive images (same size for all devices)
// - No automatic format conversion (no WebP)
// - Can cause layout shift
// - Slow page load
```

```tsx
// ✅ Next.js Image (automatic optimization)
import Image from 'next/image'

<Image 
  src="/photo.jpg" 
  alt="Photo"
  width={500}
  height={300}
/>
// Benefits:
// ✅ Lazy loading (loads when visible)
// ✅ Automatic WebP/AVIF conversion
// ✅ Responsive images (different sizes for devices)
// ✅ No layout shift (reserves space)
// ✅ Fast page load
```

---

## 🔍 How Image Optimization Works

### **1. Lazy Loading**
Images load only when they're about to enter the viewport!

```tsx
<Image 
  src="/photo.jpg" 
  width={500} 
  height={300}
  loading="lazy"  // Default behavior
  alt="Photo"
/>
```

**Logic:** Saves bandwidth, faster initial page load!

### **2. Automatic Format Conversion**
Next.js serves modern formats (WebP, AVIF) to browsers that support them!

```
Browser supports WebP? → Serve .webp (smaller file)
Browser doesn't? → Serve original .jpg
```

**Logic:** Smaller files = faster loading!

### **3. Responsive Images**
Automatically generates multiple sizes for different devices!

```tsx
<Image 
  src="/photo.jpg"
  width={1200}
  height={800}
  sizes="(max-width: 768px) 100vw, 50vw"
  alt="Photo"
/>
```

**What happens:**
```
Mobile (375px): Serves 375px wide image
Tablet (768px): Serves 768px wide image  
Desktop (1920px): Serves 960px wide image (50vw)
```

**Logic:** Mobile users don't download huge desktop images!

### **4. Image Caching**
Optimized images are cached for faster repeat visits!

---

## 📝 Image Component Examples

### **Example 1: Local Image (Static)**

```tsx
import Image from 'next/image'
import profilePic from '@/public/profile.jpg'  // Import local image

export default function Profile() {
  return (
    <div>
      <Image
        src={profilePic}  // Use imported image
        alt="Profile Picture"
        // width/height detected automatically from file!
        placeholder="blur"  // Shows blur while loading
      />
    </div>
  )
}
```

**Key:** Local images get automatic width/height detection!

---

### **Example 2: Remote Image (External URL)**

```tsx
import Image from 'next/image'

export default function UserAvatar() {
  return (
    <Image
      src="https://api.example.com/avatar/123.jpg"
      alt="User Avatar"
      width={100}
      height={100}
      // MUST specify width/height for remote images!
    />
  )
}
```

**Important:** Remote images require `next.config.js` setup:

```typescript
// next.config.ts
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.example.com',
        pathname: '/avatar/**',
      },
    ],
  },
}

export default nextConfig
```

**Why?** Security - prevents loading images from unauthorized domains!

---

### **Example 3: Fill Mode (Unknown Dimensions)**

```tsx
import Image from 'next/image'

export default function Banner() {
  return (
    <div style={{ position: 'relative', width: '100%', height: '400px' }}>
      <Image
        src="/banner.jpg"
        alt="Banner"
        fill  // Fills parent container
        style={{ objectFit: 'cover' }}  // or 'contain'
      />
    </div>
  )
}
```

**Use case:** Background images, hero sections!

---

### **Example 4: Priority Loading**

```tsx
import Image from 'next/image'

export default function Hero() {
  return (
    <Image
      src="/hero.jpg"
      alt="Hero Image"
      width={1920}
      height={1080}
      priority  // Loads immediately (no lazy loading)
    />
  )
}
```

**Use priority for:**
- Hero images (above the fold)
- Largest Contentful Paint (LCP) images

---

### **Example 5: User Profile Gallery**

```tsx
import Image from 'next/image'

interface User {
  id: number;
  name: string;
  avatar: string;
}

export default async function UsersGallery() {
  const users: User[] = await fetch('https://jsonplaceholder.typicode.com/users')
    .then(r => r.json());

  return (
    <div className="grid grid-cols-4 gap-4 p-8">
      {users.map(user => (
        <div key={user.id} className="text-center">
          <div className="relative w-24 h-24 mx-auto mb-2">
            <Image
              src={`https://i.pravatar.cc/150?img=${user.id}`}
              alt={user.name}
              fill
              className="rounded-full"
              sizes="96px"
            />
          </div>
          <p className="font-semibold">{user.name}</p>
        </div>
      ))}
    </div>
  )
}
```

**Remember:** Add `i.pravatar.cc` to `remotePatterns` in config!

---

## 🔤 Font Optimization with `next/font`

### **The Problem with Regular Fonts:**

```tsx
// ❌ Regular font loading (causes layout shift)
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap');
</style>

// Problems:
// - Flash of Unstyled Text (FOUT)
// - Flash of Invisible Text (FOIT)
// - Layout shift while loading
// - Extra network request
```

### **Next.js Font Solution:**

```tsx
// ✅ Optimized font loading
import { Inter } from 'next/font/google'

const inter = Inter({ 
  subsets: ['latin'],
  weight: ['400', '700']
})

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body>{children}</body>
    </html>
  )
}
```

**Benefits:**
- ✅ Zero layout shift
- ✅ Self-hosted (no external requests)
- ✅ Automatic font optimization
- ✅ Preloaded for performance

---

## 🎨 Font Examples

### **Example 1: Google Fonts**

```tsx
// app/layout.tsx
import { Inter, Roboto, Poppins } from 'next/font/google'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter'  // CSS variable
})

const roboto = Roboto({ 
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-roboto'
})

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${roboto.variable}`}>
      <body className="font-inter">{children}</body>
    </html>
  )
}
```

**Use in CSS:**
```css
/* globals.css */
h1 {
  font-family: var(--font-roboto);
}

body {
  font-family: var(--font-inter);
}
```

---

### **Example 2: Local Custom Font**

```tsx
// app/layout.tsx
import localFont from 'next/font/local'

const myFont = localFont({
  src: './fonts/MyCustomFont.woff2',
  variable: '--font-custom',
  weight: '400',
})

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={myFont.variable}>
      <body className="font-custom">{children}</body>
    </html>
  )
}
```

**Folder structure:**
```
app/
├── fonts/
│   └── MyCustomFont.woff2
└── layout.tsx
```

---

### **Example 3: Multiple Weights**

```tsx
import { Poppins } from 'next/font/google'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700', '900'],
  style: ['normal', 'italic'],
  variable: '--font-poppins'
})
```

---

## 🧪 Exercise 11: Image & Font Optimization

Practice the performance optimization logic!

### Task 1: Create Optimized Image Gallery (20 mins)

Create `app/gallery/page.tsx`:
- Fetch 20 photos from: `https://jsonplaceholder.typicode.com/photos`
- Display in 4-column grid
- Use `<Image>` component with proper width/height
- Add loading="lazy"
- Add alt text from photo titles

**Configure remote images:**
Update `next.config.ts` to allow `via.placeholder.com`

---

### Task 2: User Avatars with Fill Mode (15 mins)

Update `app/users/page.tsx`:
- Display user avatars using `<Image>` with `fill` mode
- Make avatars circular (100x100px)
- Use `https://i.pravatar.cc/150?img={user.id}` for avatars
- Configure remote patterns in next.config

---

### Task 3: Hero Section with Priority Image (15 mins)

Create `app/hero/page.tsx`:
- Large hero image at the top
- Use `priority` prop (loads immediately)
- Full width, 500px height
- Use placeholder local image or remote URL
- Add overlay text on top of image

---

### Task 4: Add Custom Google Font (15 mins)

Update `app/layout.tsx`:
- Import `Roboto` from `next/font/google`
- Apply to entire app using className
- Configure subsets and weights
- Test that font loads without layout shift

---

### Task 5: Blog Post with Optimized Images (BONUS - 20 mins)

Create `app/blog/optimized/page.tsx`:
- Blog post layout
- Multiple images throughout content
- Use different `sizes` prop for responsive images
- One image with `priority`, rest with lazy loading
- Add blur placeholder effect

---

## 📝 What to Submit:

After completing the tasks, share:

1. **Did you create the gallery with Image component?** (Yes/No)
2. **Paste your next.config.ts with remotePatterns**
3. **Did avatars work with fill mode?** (Yes/No)
4. **Did you add Google Font to layout?** (Yes/No)
5. **Paste your layout.tsx font configuration**

6. **Answer these questions:**
   - What's the main benefit of `<Image>` over `<img>`?
   - Why do remote images need `remotePatterns` configuration?
   - What does `priority` prop do?
   - When should you use `fill` instead of width/height?
   - What is the advantage of `next/font` over @import?
   - What does `loading="lazy"` do?

---

## 🎓 Key Concepts to Remember

1. **`<Image>` component** = Automatic optimization, lazy loading, responsive
2. **width/height required** = Prevents layout shift
3. **priority** = Load immediately (for above-fold images)
4. **fill** = Fills parent container (for unknown dimensions)
5. **remotePatterns** = Security config for external images
6. **next/font** = Zero layout shift, self-hosted fonts
7. **loading="lazy"** = Load when visible (default)

---

## ✅ Success Criteria

You've completed this lesson when you can:
- ✅ Use `<Image>` component with proper props
- ✅ Configure remote image patterns
- ✅ Choose between fill vs width/height
- ✅ Use priority for critical images
- ✅ Implement optimized Google Fonts
- ✅ Understand the performance benefits

---

## 🎯 Performance Impact:

### **Before Optimization:**
- 10 images × 2MB each = 20MB page load ❌
- Fonts cause 300ms layout shift ❌
- Mobile users download desktop images ❌

### **After Optimization:**
- 10 images × 100KB each (WebP) = 1MB page load ✅
- Zero font layout shift ✅
- Mobile gets appropriately sized images ✅

**Result:** 20x faster page loads! 🚀

---

This lesson is about **logic and performance**, not styling! You'll see real performance improvements.

Complete the exercises and test the loading behavior. Next: **Metadata & SEO** for better search rankings!

Good luck! 💪🚀
