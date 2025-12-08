/**
 * Problem: Group Anagrams
 * Difficulty: Medium
 * Link: https://leetcode.com/problems/group-anagrams/
 * 
 * Problem Statement:
 * Given an array of strings strs, group the anagrams together.
 * You can return the answer in any order.
 * 
 * Approach:
 * [Your approach here - e.g., Use a HashMap where the key is the sorted version of each string
 * (or character frequency array), and the value is a list of strings that are anagrams.]
 * 
 * Time Complexity: O(?)
 * Space Complexity: O(?)
 * 
 * Date Solved: 
 */

import java.util.*;

public class Problem06_GroupAnagrams {
    
    public List<List<String>> groupAnagrams(String[] strs) {
        // TODO: Implement your solution here
        return new ArrayList<>();
    }
    
    // Test cases
    public static void main(String[] args) {
        Problem06_GroupAnagrams solution = new Problem06_GroupAnagrams();
        
        // Test case 1
        String[] strs1 = {"eat", "tea", "tan", "ate", "nat", "bat"};
        System.out.println("Test 1: " + solution.groupAnagrams(strs1));
        // Expected: [["bat"], ["nat","tan"], ["ate","eat","tea"]] (order may vary)
        
        // Test case 2
        String[] strs2 = {""};
        System.out.println("Test 2: " + solution.groupAnagrams(strs2));
        // Expected: [[""]]
        
        // Test case 3
        String[] strs3 = {"a"};
        System.out.println("Test 3: " + solution.groupAnagrams(strs3));
        // Expected: [["a"]]
    }
}
