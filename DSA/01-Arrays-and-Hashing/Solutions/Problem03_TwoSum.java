/**
 * Problem: Two Sum
 * Difficulty: Easy
 * Link: https://leetcode.com/problems/two-sum/
 * 
 * Problem Statement:
 * Given an array of integers nums and an integer target, return indices of the two numbers
 * such that they add up to target. You may assume that each input would have exactly one solution,
 * and you may not use the same element twice.
 * 
 * Approach:
 * [Your approach here - e.g., Use a HashMap to store each number and its index.
 * For each number, check if (target - current) exists in the map.]
 * 
 * Time Complexity: O(?)
 * Space Complexity: O(?)
 * 
 * Date Solved: 
 */

import java.util.*;

public class Problem03_TwoSum {
    
    public int[] twoSum(int[] nums, int target) {
        // TODO: Implement your solution here
        return new int[]{};
    }
    
    // Test cases
    public static void main(String[] args) {
        Problem03_TwoSum solution = new Problem03_TwoSum();
        
        // Test case 1
        int[] nums1 = {2, 7, 11, 15};
        int target1 = 9;
        System.out.println("Test 1: " + Arrays.toString(solution.twoSum(nums1, target1))); // Expected: [0, 1]
        
        // Test case 2
        int[] nums2 = {3, 2, 4};
        int target2 = 6;
        System.out.println("Test 2: " + Arrays.toString(solution.twoSum(nums2, target2))); // Expected: [1, 2]
        
        // Test case 3
        int[] nums3 = {3, 3};
        int target3 = 6;
        System.out.println("Test 3: " + Arrays.toString(solution.twoSum(nums3, target3))); // Expected: [0, 1]
    }
}
