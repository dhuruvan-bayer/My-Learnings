/**
 * Problem: Longest Substring Without Repeating Characters
 * Difficulty: Medium
 * Link: https://leetcode.com/problems/longest-substring-without-repeating-characters/
 * 
 * Problem Statement:
 * Given a string s, find the length of the longest substring without repeating characters.
 * 
 * Approach:
 * [Your approach here - e.g., Use sliding window with two pointers (left and right).
 * Use a HashSet to track characters in the current window. When a duplicate is found,
 * shrink the window from the left until the duplicate is removed.]
 * 
 * Time Complexity: O(?)
 * Space Complexity: O(?)
 * 
 * Date Solved: 
 */

import java.util.*;

public class Problem13_LongestSubstringWithoutRepeating {
    
    public int lengthOfLongestSubstring(String s) {
        // TODO: Implement your solution here
        return 0;
    }
    
    // Test cases
    public static void main(String[] args) {
        Problem13_LongestSubstringWithoutRepeating solution = new Problem13_LongestSubstringWithoutRepeating();
        
        // Test case 1
        String s1 = "abcabcbb";
        System.out.println("Test 1: " + solution.lengthOfLongestSubstring(s1)); // Expected: 3 ("abc")
        
        // Test case 2
        String s2 = "bbbbb";
        System.out.println("Test 2: " + solution.lengthOfLongestSubstring(s2)); // Expected: 1 ("b")
        
        // Test case 3
        String s3 = "pwwkew";
        System.out.println("Test 3: " + solution.lengthOfLongestSubstring(s3)); // Expected: 3 ("wke")
        
        // Test case 4
        String s4 = "";
        System.out.println("Test 4: " + solution.lengthOfLongestSubstring(s4)); // Expected: 0
    }
}
