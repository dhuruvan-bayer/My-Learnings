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
 * Use HashMap where key = character frequency signature, value = list of anagrams.
 * For each string:
 *   1. Count character frequencies using int[26] array
 *   2. Convert frequency array to string key
 *   3. Group strings with identical frequency signatures
 * 
 * Alternative: Sort each string as key (simpler but slower: O(n × k log k))
 * 
 * Time Complexity: O(n × k) where n = strings, k = avg string length
 * Space Complexity: O(n × k) for storing all strings
 * 
 * Date Solved: December 9, 2025 
 */

import java.util.*;

public class Problem06_GroupAnagrams {
    
    // Solution 1: Frequency-based approach (Optimal - Your solution!)
    public List<List<String>> groupAnagrams(String[] strs) {
        Map<String, List<String>> map = new HashMap<>();
        
        for (String str : strs) {
            String key = generateFrequencyKey(str);
            // Add to existing list or create new one
            map.computeIfAbsent(key, k -> new ArrayList<>()).add(str);
        }
        
        return new ArrayList<>(map.values());
    }

    // Generate unique key based on character frequencies
    private String generateFrequencyKey(String str) {
        int[] count = new int[26];  // Auto-initialized to 0
        
        // Count frequency of each character
        for (char c : str.toCharArray()) {
            count[c - 'a']++;
        }
        
        // Convert to string key (same frequencies = same key)
        return Arrays.toString(count);
    }
    
    // Solution 2: Sorting-based approach (Simpler but slower)
    public List<List<String>> groupAnagramsSorting(String[] strs) {
        Map<String, List<String>> map = new HashMap<>();
        
        for (String str : strs) {
            // Sort string to use as key
            char[] chars = str.toCharArray();
            Arrays.sort(chars);
            String key = new String(chars);
            
            map.computeIfAbsent(key, k -> new ArrayList<>()).add(str);
        }
        
        return new ArrayList<>(map.values());
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
