# 📘 Lesson 8: Dynamic Routes

Excellent progress, Dhuruvan! You've already used dynamic routes (`/posts/[id]`), now let's master all the patterns!

---

## 🎯 What are Dynamic Routes?

**Dynamic routes** let you create pages with **variable URLs** based on data, without creating a separate file for each page.

### Static Routes (What you know):
```
app/about/page.tsx        → /about
app/blog/page.tsx         → /blog
app/contact/page.tsx      → /contact
```

You need a file for each route!

### Dynamic Routes (The power!):
```
app/posts/[id]/page.tsx   → /posts/1, /posts/2, /posts/123, etc.
app/users/[userId]/page.tsx → /users/john, /users/mary, etc.
app/blog/[slug]/page.tsx  → /blog/my-post, /blog/another-post
```

**One file = Infinite URLs!** 🚀

---

## 📍 Where Dynamic Routes Are Used

```
E-commerce:
/products/[id]              → /products/123
/products/[id]/reviews      → /products/123/reviews
/products/[category]/[id]   → /products/electronics/456

Blog:
/blog/[slug]                → /blog/my-first-post
/author/[name]/posts        → /author/john/posts

Social Media:
/user/[username]            → /user/dhuruvan
/user/[username]/photos     → /user/dhuruvan/photos
/posts/[postId]/comments/[commentId]  → /posts/1/comments/5

Admin Dashboard:
/dashboard/orders/[orderId]  → /dashboard/orders/12345
/dashboard/users/[userId]    → /dashboard/users/67890
```

---

## ⏰ When to Use Dynamic Routes

| Use Case | Example | Route |
|----------|---------|-------|
| **Product pages** | Different products | `/products/[id]` |
| **User profiles** | Different users | `/users/[username]` |
| **Blog posts** | Different articles | `/blog/[slug]` |
| **Documentation** | Different pages | `/docs/[...slug]` |
| **Multi-level** | Nested dynamic | `/category/[cat]/product/[id]` |

---

## 🤔 Why Use Dynamic Routes?

### **Without Dynamic Routes:**
```
app/
├── products/
│   ├── product-1/page.tsx     ❌ 1000 files for 1000 products!
│   ├── product-2/page.tsx     ❌ Can't handle new products
│   ├── product-3/page.tsx     ❌ Impossible to maintain
│   └── ...997 more files
```

### **With Dynamic Routes:**
```
app/
└── products/
    └── [id]/
        └── page.tsx           ✅ One file handles all products!
```

---

## 🛠️ Dynamic Route Types

### **1. Single Dynamic Segment `[id]`**

```
Folder: app/posts/[id]/page.tsx
URLs:   /posts/1, /posts/2, /posts/abc
```

**Example:**
```tsx
// app/posts/[id]/page.tsx
export default function PostPage({ params }: { params: { id: string } }) {
  return <h1>Post ID: {params.id}</h1>
}
```

### **2. Multiple Dynamic Segments**

```
Folder: app/shop/[category]/[product]/page.tsx
URLs:   /shop/electronics/laptop, /shop/books/novel
```

**Example:**
```tsx
// app/shop/[category]/[product]/page.tsx
export default function ProductPage({ 
  params 
}: { 
  params: { category: string; product: string } 
}) {
  return (
    <div>
      <h1>Category: {params.category}</h1>
      <h2>Product: {params.product}</h2>
    </div>
  )
}
```

### **3. Catch-All Segments `[...slug]`**

Matches **any number** of segments!

```
Folder: app/docs/[...slug]/page.tsx
URLs:   /docs/intro
        /docs/getting-started/installation
        /docs/api/components/button
```

**Example:**
```tsx
// app/docs/[...slug]/page.tsx
export default function DocsPage({ 
  params 
}: { 
  params: { slug: string[] } 
}) {
  // params.slug is an ARRAY!
  // /docs/api/button → slug = ['api', 'button']
  return <h1>Path: {params.slug.join('/')}</h1>
}
```

### **4. Optional Catch-All `[[...slug]]`**

Same as catch-all, but also matches the **root**!

```
Folder: app/shop/[[...slug]]/page.tsx
URLs:   /shop                    ← Also matches root!
        /shop/electronics
        /shop/electronics/laptops
```

**Example:**
```tsx
// app/shop/[[...slug]]/page.tsx
export default function ShopPage({ 
  params 
}: { 
  params: { slug?: string[] } 
}) {
  if (!params.slug) {
    return <h1>Shop Home</h1>  // /shop
  }
  return <h1>Path: {params.slug.join('/')}</h1>
}
```

---

## 📝 Complete Examples

### Example 1: Blog Post with Slug

```tsx
// app/blog/[slug]/page.tsx
interface Post {
  slug: string;
  title: string;
  content: string;
}

export default async function BlogPost({ 
  params 
}: { 
  params: { slug: string } 
}) {
  // Fetch post by slug
  const post = await fetch(`https://api.example.com/posts/${params.slug}`)
    .then(r => r.json());
  
  return (
    <article className="max-w-4xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-700">{post.content}</p>
    </article>
  );
}
```

### Example 2: User Profile

```tsx
// app/user/[username]/page.tsx
export default async function UserProfile({ 
  params 
}: { 
  params: { username: string } 
}) {
  const user = await fetch(`https://api.example.com/users/${params.username}`)
    .then(r => r.json());
  
  return (
    <div className="max-w-2xl mx-auto p-8">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center text-white text-3xl font-bold">
          {user.name[0]}
        </div>
        <div>
          <h1 className="text-3xl font-bold">{user.name}</h1>
          <p className="text-gray-600">@{params.username}</p>
        </div>
      </div>
      <p>{user.bio}</p>
    </div>
  );
}
```

### Example 3: E-commerce Product

```tsx
// app/products/[id]/page.tsx
export default async function ProductPage({ 
  params 
}: { 
  params: { id: string } 
}) {
  const product = await fetch(`https://api.example.com/products/${params.id}`)
    .then(r => r.json());
  
  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <img src={product.image} alt={product.name} className="w-full rounded-lg" />
        </div>
        <div>
          <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
          <p className="text-3xl text-green-600 font-bold mb-4">${product.price}</p>
          <p className="text-gray-700 mb-6">{product.description}</p>
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
```

### Example 4: Nested Dynamic Routes

```tsx
// app/categories/[category]/products/[productId]/page.tsx
export default function ProductInCategory({ 
  params 
}: { 
  params: { category: string; productId: string } 
}) {
  return (
    <div className="p-8">
      <nav className="text-sm text-gray-600 mb-4">
        Home / {params.category} / Product {params.productId}
      </nav>
      <h1 className="text-3xl font-bold">
        Product {params.productId} in {params.category}
      </h1>
    </div>
  );
}
```

### Example 5: Documentation with Catch-All

```tsx
// app/docs/[...slug]/page.tsx
const docs = {
  'getting-started': { title: 'Getting Started', content: 'Welcome...' },
  'getting-started/installation': { title: 'Installation', content: 'To install...' },
  'api/components': { title: 'Components', content: 'Components API...' },
};

export default function DocsPage({ 
  params 
}: { 
  params: { slug: string[] } 
}) {
  const path = params.slug.join('/');
  const doc = docs[path];
  
  if (!doc) {
    return <div>Documentation not found</div>;
  }
  
  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-6">{doc.title}</h1>
      <p className="text-gray-700">{doc.content}</p>
    </div>
  );
}
```

---

## 🎨 generateStaticParams (For Static Generation)

For **build-time generation** of dynamic routes:

```tsx
// app/posts/[id]/page.tsx

// Generate paths at build time
export async function generateStaticParams() {
  const posts = await fetch('https://api.example.com/posts').then(r => r.json());
  
  return posts.map((post) => ({
    id: post.id.toString(),
  }));
}

export default function Post({ params }: { params: { id: string } }) {
  return <h1>Post {params.id}</h1>
}
```

**Result:** All posts are pre-generated at build time!

---

## 🧪 Exercise 8: Mastering Dynamic Routes

Time to practice all patterns!

### Task 1: Create User Profile Page (15 mins)

Create `app/user/[username]/page.tsx`:
- Takes username from URL
- Fetches user from: `https://jsonplaceholder.typicode.com/users`
- Find user by matching `username` field (filter the array)
- Display user's name, email, phone, website
- Use nice card design

**Hint:** You'll need to fetch all users and filter by username

### Task 2: Create Category Products Page (20 mins)

Create `app/shop/[category]/page.tsx`:
- Categories: "electronics", "books", "clothing"
- Display category name
- Show a list of dummy products (create fake data array in the component)
- Each product should be a card with name and price

**Example data:**
```tsx
const products = {
  electronics: [
    { id: 1, name: 'Laptop', price: 999 },
    { id: 2, name: 'Phone', price: 699 },
  ],
  books: [
    { id: 3, name: 'Next.js Guide', price: 29 },
    { id: 4, name: 'React Basics', price: 19 },
  ],
  // ...
};
```

### Task 3: Create Nested Dynamic Route (20 mins)

Create `app/shop/[category]/[productId]/page.tsx`:
- Takes both category and productId
- Display breadcrumb: "Shop / {category} / Product {productId}"
- Show product details (use dummy data)
- Add "Back to {category}" link

### Task 4: Create Documentation with Catch-All (25 mins)

Create `app/docs/[...slug]/page.tsx`:
- Use catch-all route
- Create dummy docs object with paths:
  - `intro` → "Introduction to Next.js"
  - `routing/basics` → "Routing Basics"
  - `routing/dynamic` → "Dynamic Routes"
- Display: breadcrumb, title, content
- Show "Not found" if path doesn't exist

---

## 📝 What to Submit:

After completing all tasks, share:

1. **Did you create the user profile page?** (Yes/No)
2. **Paste your shop `[category]/page.tsx` code**
3. **Did nested route work?** (Yes/No)
4. **Paste your docs catch-all code**

5. **Answer these questions:**
   - What's the difference between `[id]` and `[...slug]`?
   - How do you access dynamic params in a page?
   - What does `[[...slug]]` do differently than `[...slug]`?
   - When would you use multiple dynamic segments?
   - What is `generateStaticParams` used for?

---

## 🎓 Key Concepts to Remember

1. **`[id]`** = Single dynamic segment
2. **`[...slug]`** = Catch-all (multiple segments, array)
3. **`[[...slug]]`** = Optional catch-all (includes root)
4. **Access params** = `{ params }` in function signature
5. **Params are strings** = Always convert if needed (`parseInt`)
6. **Multiple segments** = `[cat]/[id]` works!
7. **generateStaticParams** = Pre-generate at build time

---

## ✅ Success Criteria

You've completed this lesson when you can:
- ✅ Create single dynamic segments `[id]`
- ✅ Use multiple dynamic segments `[cat]/[id]`
- ✅ Implement catch-all routes `[...slug]`
- ✅ Access params correctly with `{ params }`
- ✅ Understand when to use each pattern
- ✅ Build nested dynamic routes

---

Dynamic routes are incredibly powerful! They let you build scalable applications where one file handles thousands of pages. 

Take your time with the exercises - they cover all the important patterns. Once you complete this, we'll move to **Lesson 9: Loading & Error States** where you'll learn to handle async operations gracefully.

Good luck! 🚀💪
