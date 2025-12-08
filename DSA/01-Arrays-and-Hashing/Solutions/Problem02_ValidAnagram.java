/**
 * Problem: Valid Anagram
 * Difficulty: Easy
 * Link: https://leetcode.com/problems/valid-anagram/
 * 
 * Problem Statement:
 * Given two strings s and t, return true if t is an anagram of s, and false otherwise.
 * An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase,
 * typically using all the original letters exactly once.
 * 
 * Approach:
 * [Your approach here - e.g., Count the frequency of each character in both strings using
 * a HashMap and compare if they are equal.]
 * 
 * Time Complexity: O(?)
 * Space Complexity: O(?)
 * 
 * Date Solved: 
 */

import java.util.*;

public class Problem02_ValidAnagram {
    
    public boolean isAnagram(String s, String t) {
        // TODO: Implement your solution here
        if (s.length() != t.length()) {
            return false;
        }

        Map<Character, Integer> map = new HashMap<>();

        for (int i = 0; i < s.length(); i++) {
            map.put(s.charAt(i), map.getOrDefault(s.charAt(i), 0) + 1);
        }

        for (int i = 0; i < s.length(); i++) {
            if (map.containsKey(t.charAt(i))) {
                map.put(t.charAt(i), map.get(t.charAt(i)) - 1);
                if (map.get(t.charAt(i)) == 0) {
                    map.remove(t.charAt(i));
                }
            }
        }

        return map.isEmpty();
    }
    
    // Test cases
    public static void main(String[] args) {
        Problem02_ValidAnagram solution = new Problem02_ValidAnagram();
        
        // Test case 1
        String s1 = "anagram", t1 = "nagaram";
        System.out.println("Test 1: " + solution.isAnagram(s1, t1)); // Expected: true
        
        // Test case 2
        String s2 = "rat", t2 = "car";
        System.out.println("Test 2: " + solution.isAnagram(s2, t2)); // Expected: false
        
        // Test case 3
        String s3 = "listen", t3 = "silent";
        System.out.println("Test 3: " + solution.isAnagram(s3, t3)); // Expected: true
    }
}
