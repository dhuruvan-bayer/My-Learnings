/**
 * Problem: Top K Frequent Elements
 * Difficulty: Medium
 * Link: https://leetcode.com/problems/top-k-frequent-elements/
 * 
 * Problem Statement:
 * Given an integer array nums and an integer k, return the k most frequent elements.
 * You may return the answer in any order.
 * 
 * Approach:
 * [Your approach here - e.g., First count frequencies using a HashMap.
 * Then use a Priority Queue (Min Heap) or Bucket Sort to find the top K elements.]
 * 
 * Time Complexity: O(?)
 * Space Complexity: O(?)
 * 
 * Date Solved: 
 */

import java.util.*;

public class Problem07_TopKFrequentElements {
    
    public int[] topKFrequent(int[] nums, int k) {
        // TODO: Implement your solution here
        return new int[]{};
    }
    
    // Test cases
    public static void main(String[] args) {
        Problem07_TopKFrequentElements solution = new Problem07_TopKFrequentElements();
        
        // Test case 1
        int[] nums1 = {1, 1, 1, 2, 2, 3};
        int k1 = 2;
        System.out.println("Test 1: " + Arrays.toString(solution.topKFrequent(nums1, k1)));
        // Expected: [1, 2] (order may vary)
        
        // Test case 2
        int[] nums2 = {1};
        int k2 = 1;
        System.out.println("Test 2: " + Arrays.toString(solution.topKFrequent(nums2, k2)));
        // Expected: [1]
        
        // Test case 3
        int[] nums3 = {4, 1, -1, 2, -1, 2, 3};
        int k3 = 2;
        System.out.println("Test 3: " + Arrays.toString(solution.topKFrequent(nums3, k3)));
        // Expected: [-1, 2] (order may vary)
    }
}
