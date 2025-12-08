/**
 * Problem: Subarray Sum Equals K
 * Difficulty: Medium
 * Link: https://leetcode.com/problems/subarray-sum-equals-k/
 * 
 * Problem Statement:
 * Given an array of integers nums and an integer k, return the total number of
 * continuous subarrays whose sum equals to k.
 * 
 * Approach:
 * [Your approach here - e.g., Use prefix sum with a HashMap. Store cumulative sums and their frequencies.
 * For each position, check if (currentSum - k) exists in the map, which means we found subarray(s) with sum k.]
 * 
 * Time Complexity: O(?)
 * Space Complexity: O(?)
 * 
 * Date Solved: 
 */

import java.util.*;

public class Problem10_SubarraySumEqualsK {
    
    public int subarraySum(int[] nums, int k) {
        // TODO: Implement your solution here
        return 0;
    }
    
    // Test cases
    public static void main(String[] args) {
        Problem10_SubarraySumEqualsK solution = new Problem10_SubarraySumEqualsK();
        
        // Test case 1
        int[] nums1 = {1, 1, 1};
        int k1 = 2;
        System.out.println("Test 1: " + solution.subarraySum(nums1, k1)); // Expected: 2
        
        // Test case 2
        int[] nums2 = {1, 2, 3};
        int k2 = 3;
        System.out.println("Test 2: " + solution.subarraySum(nums2, k2)); // Expected: 2
        
        // Test case 3
        int[] nums3 = {1, -1, 0};
        int k3 = 0;
        System.out.println("Test 3: " + solution.subarraySum(nums3, k3)); // Expected: 3
    }
}
