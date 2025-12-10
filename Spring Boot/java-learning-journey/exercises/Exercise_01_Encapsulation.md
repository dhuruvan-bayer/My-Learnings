# Exercise 1: Advanced Encapsulation

## 🎯 Objective
Practice advanced encapsulation techniques including defensive copying, immutability, and proper validation.

---

## 📋 Task Description

You are building a **Library Management System**. You need to create a `Book` class that represents a book in the library.

### Requirements:

1. **Create an Immutable `Book` Class** with the following properties:
   - `title` (String) - cannot be null or empty
   - `author` (String) - cannot be null or empty
   - `isbn` (String) - must be exactly 13 characters (ISBN-13 format)
   - `publicationDate` (Date or LocalDate) - cannot be null or in the future
   - `tags` (List of Strings) - categories/genres of the book (e.g., "Fiction", "Mystery")

2. **Implement Proper Encapsulation:**
   - All fields should be `private` and `final`
   - The class should be `final` (cannot be subclassed)
   - Use defensive copying for the `publicationDate` if using `Date`
   - The `tags` list should be unmodifiable from outside
   - Validate all inputs in the constructor

3. **Add Methods:**
   - Getters for all fields (with defensive copies where necessary)
   - `hasTag(String tag)` - returns true if the book has the given tag
   - `toString()` - returns a readable string representation
   - `equals()` and `hashCode()` - for proper equality comparison

4. **Create a Builder (Bonus Challenge):**
   - Implement a Builder pattern for easy object construction
   - The builder should also validate inputs

---

## 💻 Your Implementation

Create a file named `Book.java` in the `exercises` folder with your implementation.

### Test Your Implementation

Create a `BookTest.java` file to test your class with the following scenarios:

```java
// Test 1: Valid book creation
// Test 2: Invalid title (null or empty) - should throw exception
// Test 3: Invalid ISBN (wrong length) - should throw exception
// Test 4: Future publication date - should throw exception
// Test 5: Modify tags externally - should not affect internal state
// Test 6: Modify publication date externally - should not affect internal state
```

---

## 🤔 Think About:

1. Why is it important to make the `Book` class immutable?
2. What would happen if we didn't use defensive copying for `publicationDate`?
3. Why should the class be `final`?
4. How does validation in the constructor help maintain object integrity?

---

## ✅ Submission Guidelines

Once you've completed your implementation:
1. Save your `Book.java` file
2. Test it with various scenarios
3. Share your code with me for review
4. Be prepared to explain your design decisions

---

## 💡 Hints

- Use `LocalDate` instead of `Date` (it's immutable and thread-safe)
- Use `Collections.unmodifiableList()` or `List.copyOf()` for the tags
- In the constructor, validate all parameters before assignment
- Consider what exceptions to throw for invalid inputs
- For equals() and hashCode(), use all fields

---

Take your time and focus on writing clean, well-encapsulated code. Don't hesitate to ask questions if you need clarification!
