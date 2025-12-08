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
 * [Your approach here - e.g., Use a Stack. Push opening brackets onto the stack.
 * For closing brackets, pop from stack and check if they match.]
 * 
 * Time Complexity: O(?)
 * Space Complexity: O(?)
 * 
 * Date Solved: 
 */

import java.util.*;

public class Problem05_ValidParentheses {
    
    public boolean isValid(String s) {
        // TODO: Implement your solution here
        return false;
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
