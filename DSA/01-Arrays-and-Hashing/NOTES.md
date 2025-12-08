# 01. Arrays & Hashing - Complete Guide

## 📖 Table of Contents
1. [What is Arrays & Hashing?](#what)
2. [Where is it Used?](#where)
3. [When to Use This Pattern?](#when)
4. [Why is it Important?](#why)
5. [Core Concepts](#concepts)
6. [Implementation in Java](#implementation)
7. [Common Patterns & Techniques](#patterns)
8. [Interview Strategies](#strategies)
9. [Time & Space Complexity](#complexity)

---

## <a name="what"></a>🔍 What is Arrays & Hashing?

### Arrays
**Arrays** are contiguous memory locations that store elements of the same type, accessed via indices (0-based in most languages).

**Key Properties:**
- **Fixed size** (in some languages like Java)
- **Random access** - O(1) time to access any element via index
- **Sequential memory** - Elements stored next to each other
- **Indexed** - Access elements using `arr[i]`

### Hashing
**Hashing** is a technique to map keys to values using a hash function, enabling near-constant time lookups.

**Key Data Structures:**
- **HashMap/HashTable** - Key-value pairs (unordered)
- **HashSet** - Unique elements only (unordered)
- **TreeMap** - Sorted key-value pairs (O(log n) operations)
- **LinkedHashMap** - Maintains insertion order

**Hash Function:**
```
hash(key) → index in array
Example: hash("apple") → 42 (index in internal array)
```

---

## <a name="where"></a>🎯 Where is it Used?

### Real-World Applications:
1. **Database Indexing** - Fast lookups using hash indexes
2. **Caching** - Store frequently accessed data (e.g., LRU Cache)
3. **Symbol Tables** - Compilers use hash tables for variable lookups
4. **Duplicate Detection** - Find duplicates in datasets
5. **Frequency Counting** - Analytics, word count, character frequency
6. **Two-Phase Processing** - Store data in phase 1, query in phase 2

### Common Interview Scenarios:
- Finding pairs/triplets that sum to a target
- Detecting duplicates
- Counting frequencies
- Grouping anagrams
- Subarray sum problems
- Finding missing/extra elements

---

## <a name="when"></a>⏰ When to Use This Pattern?

### Use Arrays When:
✅ You need random access to elements (index-based)  
✅ You know the size beforehand or size is manageable  
✅ Memory is contiguous for cache efficiency  
✅ You need to iterate over all elements  

### Use Hashing When:
✅ You need **O(1) average** lookups/insertions/deletions  
✅ Checking if an element **exists** (use HashSet)  
✅ **Counting frequencies** (use HashMap)  
✅ **Mapping relationships** (key → value)  
✅ **Grouping** elements by some property  
✅ Finding **complements** (e.g., target - current)  

### Pattern Recognition Triggers:
🔔 Problem mentions: "find pair", "count frequency", "group by"  
🔔 Need to look up if something exists quickly  
🔔 Need to store seen elements for future reference  
🔔 O(n²) brute force can be optimized with hash table  

---

## <a name="why"></a>💡 Why is it Important?

### Interview Perspective:
1. **Most Common Topic** - 30%+ of coding questions involve arrays/hashing
2. **Foundation for Advanced Topics** - Understanding these enables learning DP, graphs, etc.
3. **Optimization Key** - HashMap often reduces O(n²) → O(n)
4. **Easy to Hard Range** - Questions span all difficulty levels

### Problem-Solving Benefits:
- **Trade Space for Time** - Use extra memory to speed up algorithms
- **Pattern Recognition** - Many problems reduce to "have I seen this before?"
- **Versatility** - Combined with other patterns (two pointers, sliding window)

---

## <a name="concepts"></a>🧠 Core Concepts

### 1. Frequency Counting
**Pattern:** Count occurrences of elements
```java
Map<Integer, Integer> freq = new HashMap<>();
for (int num : arr) {
    freq.put(num, freq.getOrDefault(num, 0) + 1);
}
```

### 2. Complement Search
**Pattern:** Find if `target - current` exists
```java
Set<Integer> seen = new HashSet<>();
for (int num : arr) {
    if (seen.contains(target - num)) {
        return true; // Found pair
    }
    seen.add(num);
}
```

### 3. Grouping by Property
**Pattern:** Group elements that share a characteristic
```java
Map<String, List<String>> groups = new HashMap<>();
for (String str : strings) {
    String key = computeKey(str); // e.g., sorted chars for anagrams
    groups.putIfAbsent(key, new ArrayList<>());
    groups.get(key).add(str);
}
```

### 4. Index Mapping
**Pattern:** Map value to its index
```java
Map<Integer, Integer> indexMap = new HashMap<>();
for (int i = 0; i < arr.length; i++) {
    indexMap.put(arr[i], i);
}
```

### 5. Prefix Sum
**Pattern:** Precompute cumulative sums for range queries
```java
int[] prefixSum = new int[n + 1];
for (int i = 0; i < n; i++) {
    prefixSum[i + 1] = prefixSum[i] + arr[i];
}
// Sum from index i to j: prefixSum[j+1] - prefixSum[i]
```

---

## <a name="implementation"></a>💻 Implementation in Java

### Basic Array Operations
```java
public class ArrayBasics {
    public static void main(String[] args) {
        // Declaration & Initialization
        int[] arr1 = new int[5];           // Size 5, all zeros
        int[] arr2 = {1, 2, 3, 4, 5};      // Direct initialization
        
        // Access & Modification
        int first = arr2[0];                // Access: O(1)
        arr2[2] = 10;                       // Modify: O(1)
        
        // Iteration
        for (int i = 0; i < arr2.length; i++) {
            System.out.println(arr2[i]);
        }
        
        // Enhanced for loop
        for (int num : arr2) {
            System.out.println(num);
        }
        
        // Arrays utility methods
        Arrays.sort(arr2);                  // Sort: O(n log n)
        int index = Arrays.binarySearch(arr2, 10); // Binary search: O(log n)
        Arrays.fill(arr1, -1);              // Fill with value: O(n)
    }
}
```

### HashMap Operations
```java
import java.util.*;

public class HashMapExamples {
    public static void main(String[] args) {
        // Declaration
        Map<String, Integer> map = new HashMap<>();
        
        // Insertion: O(1) average
        map.put("apple", 5);
        map.put("banana", 3);
        map.put("cherry", 7);
        
        // Lookup: O(1) average
        int count = map.get("apple");          // Returns 5
        int defVal = map.getOrDefault("grape", 0); // Returns 0 (default)
        
        // Update
        map.put("apple", 10);                  // Update existing key
        map.put("apple", map.get("apple") + 1); // Increment
        
        // Better increment pattern
        map.put("banana", map.getOrDefault("banana", 0) + 1);
        
        // Check existence
        if (map.containsKey("apple")) {
            System.out.println("Apple exists!");
        }
        
        // Deletion: O(1) average
        map.remove("cherry");
        
        // Iteration
        for (Map.Entry<String, Integer> entry : map.entrySet()) {
            System.out.println(entry.getKey() + ": " + entry.getValue());
        }
        
        // Just keys or values
        for (String key : map.keySet()) { }
        for (Integer value : map.values()) { }
        
        // Size
        int size = map.size();
    }
}
```

### HashSet Operations
```java
import java.util.*;

public class HashSetExamples {
    public static void main(String[] args) {
        // Declaration
        Set<Integer> set = new HashSet<>();
        
        // Insertion: O(1) average
        set.add(1);
        set.add(2);
        set.add(3);
        set.add(2);  // Duplicate - won't be added
        
        // Check existence: O(1) average
        boolean exists = set.contains(2);  // true
        
        // Deletion: O(1) average
        set.remove(3);
        
        // Iteration
        for (int num : set) {
            System.out.println(num);
        }
        
        // Set operations
        Set<Integer> set2 = new HashSet<>(Arrays.asList(2, 3, 4));
        
        // Union
        Set<Integer> union = new HashSet<>(set);
        union.addAll(set2);
        
        // Intersection
        Set<Integer> intersection = new HashSet<>(set);
        intersection.retainAll(set2);
        
        // Difference
        Set<Integer> difference = new HashSet<>(set);
        difference.removeAll(set2);
    }
}
```

---

## <a name="patterns"></a>🎨 Common Patterns & Techniques

### Pattern 1: Two Sum (Complement Search)
**Problem:** Find two numbers that add up to target  
**Technique:** Store seen numbers, check if complement exists

```java
public int[] twoSum(int[] nums, int target) {
    Map<Integer, Integer> map = new HashMap<>();
    
    for (int i = 0; i < nums.length; i++) {
        int complement = target - nums[i];
        
        if (map.containsKey(complement)) {
            return new int[] {map.get(complement), i};
        }
        
        map.put(nums[i], i);
    }
    
    return new int[] {};
}
```
**Time:** O(n) | **Space:** O(n)

---

### Pattern 2: Frequency Counter
**Problem:** Find element appearing most frequently  
**Technique:** Count frequencies with HashMap

```java
public int mostFrequent(int[] nums) {
    Map<Integer, Integer> freq = new HashMap<>();
    int maxFreq = 0;
    int result = nums[0];
    
    for (int num : nums) {
        int count = freq.getOrDefault(num, 0) + 1;
        freq.put(num, count);
        
        if (count > maxFreq) {
            maxFreq = count;
            result = num;
        }
    }
    
    return result;
}
```
**Time:** O(n) | **Space:** O(n)

---

### Pattern 3: Grouping Anagrams
**Problem:** Group strings that are anagrams  
**Technique:** Use sorted string as key

```java
public List<List<String>> groupAnagrams(String[] strs) {
    Map<String, List<String>> groups = new HashMap<>();
    
    for (String str : strs) {
        char[] chars = str.toCharArray();
        Arrays.sort(chars);
        String key = new String(chars);
        
        groups.putIfAbsent(key, new ArrayList<>());
        groups.get(key).add(str);
    }
    
    return new ArrayList<>(groups.values());
}
```
**Time:** O(n * k log k) where k = avg string length | **Space:** O(n * k)

---

### Pattern 4: Subarray Sum Equals K
**Problem:** Count subarrays with sum = k  
**Technique:** Prefix sum + HashMap

```java
public int subarraySum(int[] nums, int k) {
    Map<Integer, Integer> prefixSumCount = new HashMap<>();
    prefixSumCount.put(0, 1); // Base case: sum = 0 seen once
    
    int sum = 0;
    int count = 0;
    
    for (int num : nums) {
        sum += num;
        
        // If (sum - k) exists, we found subarray(s) with sum = k
        if (prefixSumCount.containsKey(sum - k)) {
            count += prefixSumCount.get(sum - k);
        }
        
        prefixSumCount.put(sum, prefixSumCount.getOrDefault(sum, 0) + 1);
    }
    
    return count;
}
```
**Time:** O(n) | **Space:** O(n)

---

### Pattern 5: Longest Consecutive Sequence
**Problem:** Find length of longest consecutive sequence  
**Technique:** HashSet for O(1) lookups

```java
public int longestConsecutive(int[] nums) {
    Set<Integer> numSet = new HashSet<>();
    for (int num : nums) {
        numSet.add(num);
    }
    
    int maxLength = 0;
    
    for (int num : numSet) {
        // Only start counting from sequence beginning
        if (!numSet.contains(num - 1)) {
            int currentNum = num;
            int currentLength = 1;
            
            while (numSet.contains(currentNum + 1)) {
                currentNum++;
                currentLength++;
            }
            
            maxLength = Math.max(maxLength, currentLength);
        }
    }
    
    return maxLength;
}
```
**Time:** O(n) | **Space:** O(n)

---

## <a name="strategies"></a>🎯 Interview Strategies

### Step 1: Identify the Pattern
Ask yourself:
- Do I need to check if something exists? → **HashSet**
- Do I need to count frequencies? → **HashMap<Element, Count>**
- Do I need to find pairs/complements? → **HashMap or HashSet**
- Do I need to group by property? → **HashMap<Key, List<>>**
- Is it about subarrays/ranges? → **Prefix Sum + HashMap**

### Step 2: Consider Trade-offs
| Approach | Time | Space | When to Use |
|----------|------|-------|-------------|
| Brute Force (nested loops) | O(n²) | O(1) | Small inputs, need to understand problem |
| Sorting + Two Pointers | O(n log n) | O(1) | When order matters, space is limited |
| Hashing | O(n) | O(n) | Need fast lookups, space is available |

### Step 3: Handle Edge Cases
- Empty array: `nums.length == 0`
- Single element: `nums.length == 1`
- All duplicates: `[5, 5, 5, 5]`
- All unique: `[1, 2, 3, 4]`
- Negative numbers: `[-1, -2, 0, 1]`
- Large numbers: Integer overflow concerns

### Step 4: Communicate Your Approach
```
"I'll use a HashMap to track elements we've seen. 
As I iterate through the array, I'll check if the 
complement (target - current) exists in the map. 
If yes, we found our pair. Otherwise, I'll add the 
current element to the map. This gives us O(n) time 
instead of O(n²) brute force."
```

---

## <a name="complexity"></a>📊 Time & Space Complexity

### Array Operations
| Operation | Time Complexity | Notes |
|-----------|----------------|-------|
| Access by index | O(1) | `arr[i]` |
| Search (unsorted) | O(n) | Linear scan |
| Search (sorted) | O(log n) | Binary search |
| Insert at end | O(1)* | Amortized for dynamic arrays |
| Insert at position | O(n) | Shift elements |
| Delete from end | O(1) | |
| Delete from position | O(n) | Shift elements |
| Sort | O(n log n) | Comparison-based |

### HashMap/HashSet Operations (Average Case)
| Operation | Time Complexity | Worst Case | Notes |
|-----------|----------------|------------|-------|
| Insert | O(1) | O(n) | Worst case with collisions |
| Lookup | O(1) | O(n) | |
| Delete | O(1) | O(n) | |
| Iteration | O(n) | O(n) | Over all elements |

### Common Algorithm Patterns
| Pattern | Time | Space |
|---------|------|-------|
| Two Sum (HashMap) | O(n) | O(n) |
| Frequency Counting | O(n) | O(k) where k = unique elements |
| Group Anagrams | O(n * k log k) | O(n * k) |
| Subarray Sum | O(n) | O(n) |
| Longest Consecutive | O(n) | O(n) |

---

## 🎓 Key Takeaways

1. **HashMap is your best friend** - Converts many O(n²) problems to O(n)
2. **Think in patterns** - Complement search, frequency counting, grouping
3. **Space-time tradeoff** - Often worth using O(n) space for O(1) lookups
4. **Edge cases matter** - Empty, single element, duplicates, negatives
5. **Communicate clearly** - Explain why you chose HashMap over array/sort

---

## 📝 Next Steps
1. Read through these notes thoroughly
2. Implement the example problems yourself
3. Move to `Problems.md` for practice questions
4. Start with Easy problems, then Medium
5. Submit solutions for review after each problem

**Ready to practice? Let's move to the problems! 🚀**
