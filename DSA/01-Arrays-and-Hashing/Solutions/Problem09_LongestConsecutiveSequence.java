/**
 * Problem: Longest Consecutive Sequence
 * Difficulty: Medium
 * Link: https://leetcode.com/problems/longest-consecutive-sequence/
 * 
 * Problem Statement:
 * Given an unsorted array of integers nums, return the length of the longest consecutive
 * elements sequence. You must write an algorithm that runs in O(n) time.
 * 
 * Approach:
 * [Your approach here - e.g., Add all elements to a HashSet for O(1) lookup.
 * For each number, check if it's the start of a sequence (i.e., num-1 doesn't exist),
 * then count consecutive numbers.]
 * 
 * Time Complexity: O(?)
 * Space Complexity: O(?)
 * 
 * Date Solved: 
 */

import java.util.*;

public class Problem09_LongestConsecutiveSequence {
    
    public int longestConsecutive(int[] nums) {
        // TODO: Implement your solution here
        return 0;
    }
    
    // Test cases
    public static void main(String[] args) {
        Problem09_LongestConsecutiveSequence solution = new Problem09_LongestConsecutiveSequence();
        
        // Test case 1
        int[] nums1 = {100, 4, 200, 1, 3, 2};
        System.out.println("Test 1: " + solution.longestConsecutive(nums1)); // Expected: 4 ([1, 2, 3, 4])
        
        // Test case 2
        int[] nums2 = {0, 3, 7, 2, 5, 8, 4, 6, 0, 1};
        System.out.println("Test 2: " + solution.longestConsecutive(nums2)); // Expected: 9 ([0,1,2,3,4,5,6,7,8])
        
        // Test case 3
        int[] nums3 = {9, 1, 4, 7, 3, 2, 8, 5, 6};
        System.out.println("Test 3: " + solution.longestConsecutive(nums3)); // Expected: 9
    }
}
