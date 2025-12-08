/**
 * Problem: Substring with Concatenation of All Words
 * Difficulty: Hard
 * Link: https://leetcode.com/problems/substring-with-concatenation-of-all-words/
 * 
 * Problem Statement:
 * You are given a string s and an array of strings words. All the strings of words are of
 * the same length. A concatenated substring in s is a substring that contains all the strings
 * of any permutation of words concatenated.
 * Return the starting indices of all the concatenated substrings in s.
 * 
 * Approach:
 * [Your approach here - e.g., Use a sliding window of size (wordLength * numWords).
 * Use two HashMaps: one for word frequencies in 'words', another for current window.
 * Slide the window and check if frequencies match.]
 * 
 * Time Complexity: O(?)
 * Space Complexity: O(?)
 * 
 * Date Solved: 
 */

import java.util.*;

public class Problem15_SubstringWithConcatenationOfAllWords {
    
    public List<Integer> findSubstring(String s, String[] words) {
        // TODO: Implement your solution here
        return new ArrayList<>();
    }
    
    // Test cases
    public static void main(String[] args) {
        Problem15_SubstringWithConcatenationOfAllWords solution = new Problem15_SubstringWithConcatenationOfAllWords();
        
        // Test case 1
        String s1 = "barfoothefoobarman";
        String[] words1 = {"foo", "bar"};
        System.out.println("Test 1: " + solution.findSubstring(s1, words1)); // Expected: [0, 9]
        
        // Test case 2
        String s2 = "wordgoodgoodgoodbestword";
        String[] words2 = {"word", "good", "best", "word"};
        System.out.println("Test 2: " + solution.findSubstring(s2, words2)); // Expected: []
        
        // Test case 3
        String s3 = "barfoofoobarthefoobarman";
        String[] words3 = {"bar", "foo", "the"};
        System.out.println("Test 3: " + solution.findSubstring(s3, words3)); // Expected: [6, 9, 12]
    }
}
