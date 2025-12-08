# Arrays & Hashing - Practice Problems

## 📊 Problem Selection Strategy
- **Easy (5 problems)**: Build confidence, learn basic patterns
- **Medium (8 problems)**: Master core interview questions
- **Hard (2 problems)**: Challenge yourself, rare but impressive

**Total: 15 carefully selected problems covering all patterns**

---

## 🟢 Easy Problems (Foundation Building)

### 1. Contains Duplicate
**Difficulty:** Easy  
**Pattern:** HashSet for existence check  
**Link:** https://leetcode.com/problems/contains-duplicate/

**Problem:** Given an integer array `nums`, return `true` if any value appears at least twice, and `false` if every element is distinct.

**Example:**
```
Input: nums = [1,2,3,1]
Output: true

Input: nums = [1,2,3,4]
Output: false
```

**Hints:**
- What data structure allows O(1) lookup?
- Can you detect duplicates in one pass?

**Learning Focus:** Basic HashSet usage

---

### 2. Valid Anagram
**Difficulty:** Easy  
**Pattern:** Frequency counting with HashMap  
**Link:** https://leetcode.com/problems/valid-anagram/

**Problem:** Given two strings `s` and `t`, return `true` if `t` is an anagram of `s`, and `false` otherwise.

**Example:**
```
Input: s = "anagram", t = "nagaram"
Output: true

Input: s = "rat", t = "car"
Output: false
```

**Hints:**
- What makes two words anagrams?
- Can you count character frequencies?

**Learning Focus:** Character frequency mapping

---

### 3. Two Sum
**Difficulty:** Easy  
**Pattern:** Complement search with HashMap  
**Link:** https://leetcode.com/problems/two-sum/

**Problem:** Given an array of integers `nums` and an integer `target`, return indices of two numbers that add up to `target`.

**Example:**
```
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: nums[0] + nums[1] == 9
```

**Hints:**
- For each number, what's its complement?
- How can you check if complement exists in O(1)?

**Learning Focus:** Classic complement search pattern

---

### 4. Majority Element
**Difficulty:** Easy  
**Pattern:** Frequency counting  
**Link:** https://leetcode.com/problems/majority-element/

**Problem:** Given an array `nums` of size `n`, return the majority element (appears more than ⌊n/2⌋ times).

**Example:**
```
Input: nums = [3,2,3]
Output: 3

Input: nums = [2,2,1,1,1,2,2]
Output: 2
```

**Hints:**
- Count frequencies with HashMap
- **Bonus:** Can you solve it in O(1) space? (Boyer-Moore Voting Algorithm)

**Learning Focus:** Frequency tracking

---

### 5. Valid Parentheses
**Difficulty:** Easy  
**Pattern:** Stack (bonus problem to prepare for Stack chapter)  
**Link:** https://leetcode.com/problems/valid-parentheses/

**Problem:** Given a string containing just characters `'(', ')', '{', '}', '[', ']'`, determine if the input is valid.

**Example:**
```
Input: s = "()[]{}"
Output: true

Input: s = "([)]"
Output: false
```

**Hints:**
- Stack is LIFO - Last In, First Out
- Push opening brackets, pop for closing brackets

**Learning Focus:** Stack for matching pairs (preview of next topic)

---

## 🟡 Medium Problems (Core Interview Questions)

### 6. Group Anagrams
**Difficulty:** Medium  
**Pattern:** Grouping with HashMap  
**Link:** https://leetcode.com/problems/group-anagrams/

**Problem:** Given an array of strings, group anagrams together.

**Example:**
```
Input: strs = ["eat","tea","tan","ate","nat","bat"]
Output: [["bat"],["nat","tan"],["ate","eat","tea"]]
```

**Hints:**
- What's a good key to identify anagrams?
- Sorted string? Character frequency array?

**Learning Focus:** HashMap with custom keys

---

### 7. Top K Frequent Elements
**Difficulty:** Medium  
**Pattern:** Frequency counting + sorting/heap  
**Link:** https://leetcode.com/problems/top-k-frequent-elements/

**Problem:** Given an integer array `nums` and integer `k`, return the `k` most frequent elements.

**Example:**
```
Input: nums = [1,1,1,2,2,3], k = 2
Output: [1,2]
```

**Hints:**
- First count frequencies
- Then find top K (sort? bucket sort? heap?)

**Learning Focus:** Combining frequency map with sorting

---

### 8. Product of Array Except Self
**Difficulty:** Medium  
**Pattern:** Prefix/Suffix product  
**Link:** https://leetcode.com/problems/product-of-array-except-self/

**Problem:** Given array `nums`, return array `answer` where `answer[i]` equals product of all elements except `nums[i]`.

**Example:**
```
Input: nums = [1,2,3,4]
Output: [24,12,8,6]
Explanation: [2*3*4, 1*3*4, 1*2*4, 1*2*3]
```

**Hints:**
- Can't use division
- Think about product of all elements to the left and right

**Learning Focus:** Prefix/suffix pattern

---

### 9. Longest Consecutive Sequence
**Difficulty:** Medium  
**Pattern:** HashSet for smart iteration  
**Link:** https://leetcode.com/problems/longest-consecutive-sequence/

**Problem:** Find the length of longest consecutive elements sequence in O(n) time.

**Example:**
```
Input: nums = [100,4,200,1,3,2]
Output: 4
Explanation: [1, 2, 3, 4]
```

**Hints:**
- Add all to HashSet for O(1) lookup
- Only start counting from sequence beginning

**Learning Focus:** HashSet for efficient sequence detection

---

### 10. Subarray Sum Equals K
**Difficulty:** Medium  
**Pattern:** Prefix sum + HashMap  
**Link:** https://leetcode.com/problems/subarray-sum-equals-k/

**Problem:** Find total number of continuous subarrays whose sum equals `k`.

**Example:**
```
Input: nums = [1,1,1], k = 2
Output: 2
Explanation: [1,1] appears twice
```

**Hints:**
- Use prefix sums
- Store prefix sum counts in HashMap
- If (currentSum - k) exists, we found subarray(s)

**Learning Focus:** Prefix sum optimization

---

### 11. Encode and Decode Strings
**Difficulty:** Medium  
**Pattern:** String manipulation + delimiter strategy  
**Link:** https://leetcode.com/problems/encode-and-decode-strings/ (Premium)  
**Alternative:** https://neetcode.io/problems/string-encode-and-decode

**Problem:** Design algorithm to encode list of strings to single string, and decode back.

**Example:**
```
Input: ["hello","world"]
Encode: "5#hello5#world"
Decode: ["hello","world"]
```

**Hints:**
- How to handle strings with special characters?
- Length-prefix encoding: `length + delimiter + string`

**Learning Focus:** String encoding schemes

---

### 12. Valid Sudoku
**Difficulty:** Medium  
**Pattern:** HashSet for constraint checking  
**Link:** https://leetcode.com/problems/valid-sudoku/

**Problem:** Determine if a 9x9 Sudoku board is valid (partially filled).

**Example:**
```
Check:
- Each row has no duplicates
- Each column has no duplicates
- Each 3x3 sub-box has no duplicates
```

**Hints:**
- Use 3 HashSets: rows, cols, boxes
- How to identify which 3x3 box? `(row/3, col/3)`

**Learning Focus:** Multiple HashSets for validation

---

### 13. Longest Substring Without Repeating Characters
**Difficulty:** Medium  
**Pattern:** Sliding window + HashSet  
**Link:** https://leetcode.com/problems/longest-substring-without-repeating-characters/

**Problem:** Find length of longest substring without repeating characters.

**Example:**
```
Input: s = "abcabcbb"
Output: 3
Explanation: "abc"
```

**Hints:**
- Use sliding window with two pointers
- HashSet to track characters in current window
- **Note:** This previews the Sliding Window pattern!

**Learning Focus:** Dynamic window with HashSet

---

## 🔴 Hard Problems (Challenge Yourself)

### 14. First Missing Positive
**Difficulty:** Hard  
**Pattern:** Array as hash (index mapping)  
**Link:** https://leetcode.com/problems/first-missing-positive/

**Problem:** Find smallest missing positive integer in O(n) time and O(1) space.

**Example:**
```
Input: nums = [3,4,-1,1]
Output: 2

Input: nums = [7,8,9,11,12]
Output: 1
```

**Hints:**
- Can you use array indices as hash?
- Mark presence by negating values or swapping

**Learning Focus:** In-place marking, array as hash table

---

### 15. Substring with Concatenation of All Words
**Difficulty:** Hard  
**Pattern:** Sliding window + HashMap  
**Link:** https://leetcode.com/problems/substring-with-concatenation-of-all-words/

**Problem:** Find all starting indices of substring that's concatenation of all words (in any order).

**Example:**
```
Input: s = "barfoothefoobarman", words = ["foo","bar"]
Output: [0,9]
Explanation: "barfoo" at index 0, "foobar" at index 9
```

**Hints:**
- All words have same length
- Use HashMap to count word frequencies
- Sliding window of size = words.length * word.length

**Learning Focus:** Complex sliding window with word counting

---

## 📈 Progress Tracker

| # | Problem | Status | Attempts | Time (min) | Notes |
|---|---------|--------|----------|-----------|-------|
| 1 | Contains Duplicate | ⏸️ | 0 | - | - |
| 2 | Valid Anagram | ⏸️ | 0 | - | - |
| 3 | Two Sum | ⏸️ | 0 | - | - |
| 4 | Majority Element | ⏸️ | 0 | - | - |
| 5 | Valid Parentheses | ⏸️ | 0 | - | - |
| 6 | Group Anagrams | ⏸️ | 0 | - | - |
| 7 | Top K Frequent | ⏸️ | 0 | - | - |
| 8 | Product Except Self | ⏸️ | 0 | - | - |
| 9 | Longest Consecutive | ⏸️ | 0 | - | - |
| 10 | Subarray Sum = K | ⏸️ | 0 | - | - |
| 11 | Encode/Decode Strings | ⏸️ | 0 | - | - |
| 12 | Valid Sudoku | ⏸️ | 0 | - | - |
| 13 | Longest Substring | ⏸️ | 0 | - | - |
| 14 | First Missing Positive | ⏸️ | 0 | - | - |
| 15 | Concat All Words | ⏸️ | 0 | - | - |

---

## 📝 How to Use This File

### For Each Problem:
1. **Read & Understand** - Don't code immediately
2. **Identify Pattern** - Which pattern from NOTES.md applies?
3. **Plan Approach** - Write pseudocode/draw diagram
4. **Code Solution** - Implement in Java
5. **Test Thoroughly** - Use examples + edge cases
6. **Analyze Complexity** - Time and space
7. **Submit for Review** - Share your code with me

### Recommended Order:
- Do Easy problems first (1-5) to build confidence
- Then Medium problems (6-13) - these are CORE interview questions
- Finally Hard problems (14-15) if time permits

### Time Guidelines:
- **Easy:** 15-20 minutes
- **Medium:** 30-45 minutes
- **Hard:** 60+ minutes

**Don't spend more than 30 min stuck! Ask for hints!**

---

## 🎯 Learning Goals

After completing these 15 problems, you should be able to:
- ✅ Instantly recognize when to use HashMap vs HashSet
- ✅ Implement complement search pattern in sleep
- ✅ Count frequencies efficiently
- ✅ Group elements by custom keys
- ✅ Use prefix sums with HashMap
- ✅ Explain time/space complexity trade-offs
- ✅ Handle edge cases confidently

---

**Ready to start? Begin with Problem #1: Contains Duplicate!**

After you solve it, paste your code and I'll review it! 🚀
