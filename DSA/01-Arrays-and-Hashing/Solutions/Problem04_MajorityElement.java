/**
 * Problem: Majority Element
 * Difficulty: Easy
 * Link: https://leetcode.com/problems/majority-element/
 * 
 * Problem Statement:
 * Given an array nums of size n, return the majority element.
 * The majority element is the element that appears more than ⌊n / 2⌋ times.
 * You may assume that the majority element always exists in the array.
 * 
 * Approach:
 * Boyer-Moore Voting Algorithm - The majority element (appearing > n/2 times) will
 * "survive" a vote cancellation process. Maintain a candidate and vote count:
 * - When votes = 0, select new candidate
 * - Same element → increment votes
 * - Different element → decrement votes (cancellation)
 * Since majority > n/2, it will be the last standing candidate.
 * 
 * Time Complexity: O(n) - Single pass through array
 * Space Complexity: O(1) - Only two integer variables used
 * 
 * Date Solved: December 8, 2025 
 */

import java.util.*;

public class Problem04_MajorityElement {
    
    public int majorityElement(int[] nums) {
        // Boyer-Moore Voting Algorithm
        int candidate = 0;
        int votes = 0;

        for (int num : nums) {
            if (votes == 0) {
                candidate = num;  // Select new candidate when votes depleted
                votes = 1;
            } else if (candidate == num) {
                votes++;          // Same element strengthens candidate
            } else {
                votes--;          // Different element cancels a vote
            }
        }
        
        return candidate;
    }
    
    // Test cases
    public static void main(String[] args) {
        Problem04_MajorityElement solution = new Problem04_MajorityElement();
        
        // Test case 1
        int[] nums1 = {3, 2, 3};
        System.out.println("Test 1: " + solution.majorityElement(nums1)); // Expected: 3
        
        // Test case 2
        int[] nums2 = {2, 2, 1, 1, 1, 2, 2};
        System.out.println("Test 2: " + solution.majorityElement(nums2)); // Expected: 2
        
        // Test case 3
        int[] nums3 = {1};
        System.out.println("Test 3: " + solution.majorityElement(nums3)); // Expected: 1
    }
}
