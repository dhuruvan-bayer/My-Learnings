/**
 * Problem: Valid Parentheses
 * Difficulty: Easy
 * Link: https://leetcode.com/problems/valid-parentheses/
 * 
 * Problem Statement:
 * Given a string s containing just the characters '(', ')', '{', '}', '[' and ']',
 * determine if the input string is valid. An input string is valid if:
 * 1. Open brackets must be closed by the same type of brackets.
 * 2. Open brackets must be closed in the correct order.
 * 3. Every close bracket has a corresponding open bracket of the same type.
 * 
 * Approach:
 * Use a Stack (LIFO) to track opening brackets. For each character:
 * - Opening bracket → push to stack
 * - Closing bracket → check if stack is empty or top doesn't match, return false
 * - Otherwise pop the matching opening bracket
 * Finally, stack must be empty (all brackets matched).
 * 
 * Alternative: Store expected closing bracket instead of opening for cleaner logic.
 * 
 * Time Complexity: O(n) - Single pass through string, each operation O(1)
 * Space Complexity: O(n) - Worst case all opening brackets
 * 
 * Date Solved: December 9, 2025 
 */

import java.util.*;

public class Problem05_ValidParentheses {
    
    // Solution 1: Store opening brackets (Your original approach - CORRECT!)
    public boolean isValid(String s) {
        Stack<Character> stack = new Stack<>();
        
        for (char c : s.toCharArray()) {
            if (c == '{' || c == '[' || c == '(') {
                stack.push(c);  // Store opening bracket
            } else {
                // Closing bracket encountered
                if (stack.isEmpty()) {
                    return false;  // No matching opening bracket
                } else if (matches(stack.peek(), c)) {
                    stack.pop();   // Valid pair found
                } else {
                    return false;  // Mismatch detected
                }
            }
        }
        
        return stack.isEmpty();  // All brackets must be matched
    }
    
    // Helper method for cleaner matching logic
    private boolean matches(char open, char close) {
        return (open == '(' && close == ')') ||
               (open == '[' && close == ']') ||
               (open == '{' && close == '}');
    }
    
    // Solution 2: Store expected closing brackets (More elegant)
    public boolean isValidOptimized(String s) {
        Stack<Character> stack = new Stack<>();
        
        for (char c : s.toCharArray()) {
            // Push expected closing bracket
            if (c == '(') {
                stack.push(')');
            } else if (c == '[') {
                stack.push(']');
            } else if (c == '{') {
                stack.push('}');
            } else {
                // Check if closing bracket matches expected
                if (stack.isEmpty() || stack.pop() != c) {
                    return false;
                }
            }
        }
        
        return stack.isEmpty();
    }
    
    // Test cases
    public static void main(String[] args) {
        Problem05_ValidParentheses solution = new Problem05_ValidParentheses();
        
        // Test case 1
        String s1 = "()[]{}";
        System.out.println("Test 1: " + solution.isValid(s1)); // Expected: true
        
        // Test case 2
        String s2 = "([)]";
        System.out.println("Test 2: " + solution.isValid(s2)); // Expected: false
        
        // Test case 3
        String s3 = "{[]}";
        System.out.println("Test 3: " + solution.isValid(s3)); // Expected: true
        
        // Test case 4
        String s4 = "((";
        System.out.println("Test 4: " + solution.isValid(s4)); // Expected: false
    }
}
