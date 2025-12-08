/**
 * Problem: First Missing Positive
 * Difficulty: Hard
 * Link: https://leetcode.com/problems/first-missing-positive/
 * 
 * Problem Statement:
 * Given an unsorted integer array nums, return the smallest missing positive integer.
 * You must implement an algorithm that runs in O(n) time and uses O(1) auxiliary space.
 * 
 * Approach:
 * [Your approach here - e.g., Use the array itself as a hash table. Place each number in its
 * "correct" position (num at index num-1). Then scan to find the first position where
 * the number doesn't match its index.]
 * 
 * Time Complexity: O(?)
 * Space Complexity: O(?)
 * 
 * Date Solved: 
 */

import java.util.*;

public class Problem14_FirstMissingPositive {
    
    public int firstMissingPositive(int[] nums) {
        // TODO: Implement your solution here
        return 0;
    }
    
    // Test cases
    public static void main(String[] args) {
        Problem14_FirstMissingPositive solution = new Problem14_FirstMissingPositive();
        
        // Test case 1
        int[] nums1 = {1, 2, 0};
        System.out.println("Test 1: " + solution.firstMissingPositive(nums1)); // Expected: 3
        
        // Test case 2
        int[] nums2 = {3, 4, -1, 1};
        System.out.println("Test 2: " + solution.firstMissingPositive(nums2)); // Expected: 2
        
        // Test case 3
        int[] nums3 = {7, 8, 9, 11, 12};
        System.out.println("Test 3: " + solution.firstMissingPositive(nums3)); // Expected: 1
        
        // Test case 4
        int[] nums4 = {1, 2, 3, 4, 5};
        System.out.println("Test 4: " + solution.firstMissingPositive(nums4)); // Expected: 6
    }
}
