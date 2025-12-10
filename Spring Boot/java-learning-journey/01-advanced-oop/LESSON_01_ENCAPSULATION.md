# Lesson 1: Advanced Encapsulation & Information Hiding

## 📚 What is Encapsulation?

**Encapsulation** is the bundling of data (attributes) and methods (behaviors) that operate on that data within a single unit (class), while restricting direct access to some of the object's components. It's one of the four fundamental OOP principles.

At an advanced level, encapsulation goes beyond just using `private` fields and `public` getters/setters. It involves:
- **Information Hiding**: Concealing implementation details
- **Immutability**: Creating objects whose state cannot be modified after construction
- **Defensive Copying**: Protecting internal state from external modifications
- **Interface Segregation**: Exposing only necessary methods

---

## 🎯 Where is it Applicable?

Encapsulation is applicable everywhere in Java programming:
- **Class Design**: Protecting internal state of objects
- **API Development**: Hiding implementation details from users
- **Framework Development**: Providing stable interfaces while allowing internal changes
- **Data Transfer Objects (DTOs)**: Safely passing data between layers
- **Domain Models**: Ensuring business rules are enforced

---

## ⏰ When to Use It?

Use advanced encapsulation when:
1. **Building Reusable Libraries**: You need to maintain backward compatibility
2. **Multi-threaded Applications**: Protecting shared state from concurrent modifications
3. **Security-Critical Code**: Preventing unauthorized access or modification
4. **Complex Business Logic**: Ensuring invariants are always maintained
5. **Public APIs**: Providing stability while allowing internal refactoring

---

## 💡 Why is it Important?

### 1. **Maintainability**
Changes to internal implementation don't break external code

### 2. **Security**
Prevents unauthorized access and modification of data

### 3. **Flexibility**
Allows you to change implementation without affecting users

### 4. **Data Integrity**
Ensures objects are always in a valid state

### 5. **Reduced Coupling**
Minimizes dependencies between components

---

## 🔨 Practical Implementation

### Example 1: Basic vs Advanced Encapsulation

#### ❌ Poor Encapsulation
```java
public class BankAccount {
    public double balance;
    public String accountNumber;
    
    // Anyone can modify balance directly!
    // No validation or business logic
}
```

#### ✅ Better Encapsulation
```java
public class BankAccount {
    private double balance;
    private final String accountNumber;
    
    public BankAccount(String accountNumber, double initialBalance) {
        if (initialBalance < 0) {
            throw new IllegalArgumentException("Initial balance cannot be negative");
        }
        this.accountNumber = accountNumber;
        this.balance = initialBalance;
    }
    
    public double getBalance() {
        return balance;
    }
    
    public String getAccountNumber() {
        return accountNumber;
    }
    
    public void deposit(double amount) {
        if (amount <= 0) {
            throw new IllegalArgumentException("Deposit amount must be positive");
        }
        balance += amount;
    }
    
    public void withdraw(double amount) {
        if (amount <= 0) {
            throw new IllegalArgumentException("Withdrawal amount must be positive");
        }
        if (amount > balance) {
            throw new IllegalStateException("Insufficient funds");
        }
        balance -= amount;
    }
}
```

**Key Improvements:**
- `balance` is private and can only be modified through validated methods
- `accountNumber` is `final` - cannot be changed after construction
- All modifications go through business logic validation
- Invalid states are impossible to create

---

### Example 2: Defensive Copying with Mutable Objects

#### ❌ Vulnerable to External Modification
```java
import java.util.Date;

public class Event {
    private Date eventDate;
    
    public Event(Date eventDate) {
        this.eventDate = eventDate;
    }
    
    public Date getEventDate() {
        return eventDate;
    }
}

// Problem:
Date date = new Date();
Event event = new Event(date);
date.setTime(0); // This modifies the event's internal state!
```

#### ✅ Defensive Copying
```java
import java.util.Date;

public class Event {
    private final Date eventDate;
    
    public Event(Date eventDate) {
        // Create a defensive copy
        this.eventDate = new Date(eventDate.getTime());
    }
    
    public Date getEventDate() {
        // Return a copy, not the original
        return new Date(eventDate.getTime());
    }
}

// Now safe:
Date date = new Date();
Event event = new Event(date);
date.setTime(0); // Event's internal date is unaffected!
```

---

### Example 3: Immutable Class Design

```java
import java.util.Collections;
import java.util.List;
import java.util.ArrayList;

public final class Student {
    private final String name;
    private final int age;
    private final List<String> courses;
    
    public Student(String name, int age, List<String> courses) {
        this.name = name;
        this.age = age;
        // Defensive copy of the list
        this.courses = new ArrayList<>(courses);
    }
    
    public String getName() {
        return name;
    }
    
    public int getAge() {
        return age;
    }
    
    public List<String> getCourses() {
        // Return unmodifiable view
        return Collections.unmodifiableList(courses);
    }
    
    @Override
    public String toString() {
        return "Student{name='" + name + "', age=" + age + 
               ", courses=" + courses + "}";
    }
}
```

**Immutability Benefits:**
- Thread-safe without synchronization
- Can be safely shared across code
- Easy to reason about (no state changes)
- Suitable for use as Map keys

---

### Example 4: Builder Pattern for Complex Objects

```java
public class Configuration {
    private final String host;
    private final int port;
    private final int timeout;
    private final boolean sslEnabled;
    private final String username;
    
    private Configuration(Builder builder) {
        this.host = builder.host;
        this.port = builder.port;
        this.timeout = builder.timeout;
        this.sslEnabled = builder.sslEnabled;
        this.username = builder.username;
    }
    
    public static class Builder {
        // Required parameters
        private final String host;
        private final int port;
        
        // Optional parameters with defaults
        private int timeout = 3000;
        private boolean sslEnabled = false;
        private String username = "guest";
        
        public Builder(String host, int port) {
            this.host = host;
            this.port = port;
        }
        
        public Builder timeout(int timeout) {
            this.timeout = timeout;
            return this;
        }
        
        public Builder sslEnabled(boolean enabled) {
            this.sslEnabled = enabled;
            return this;
        }
        
        public Builder username(String username) {
            this.username = username;
            return this;
        }
        
        public Configuration build() {
            return new Configuration(this);
        }
    }
    
    // Getters
    public String getHost() { return host; }
    public int getPort() { return port; }
    public int getTimeout() { return timeout; }
    public boolean isSslEnabled() { return sslEnabled; }
    public String getUsername() { return username; }
}

// Usage:
Configuration config = new Configuration.Builder("localhost", 8080)
    .timeout(5000)
    .sslEnabled(true)
    .username("admin")
    .build();
```

---

## 🎓 Key Takeaways

1. **Always use the most restrictive access level possible** (`private` by default)
2. **Make fields `final` when possible** to ensure immutability
3. **Use defensive copying** for mutable objects in constructors and getters
4. **Validate all input** in constructors and setters
5. **Return unmodifiable views** of collections
6. **Consider immutability** for data objects
7. **Use builders** for complex objects with many parameters

---

## 📝 Next Steps

Practice these concepts with the exercise file. Focus on:
- Identifying encapsulation violations
- Implementing defensive copying
- Creating immutable classes
- Using validation to maintain invariants

Remember: Good encapsulation is about **protecting your objects from entering invalid states** and **hiding implementation details** so you can change them later without breaking client code.
