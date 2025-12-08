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
 * [Your approach here - e.g., Use a HashMap to count frequencies of each element,
 * then find the element with count > n/2. Bonus: Try Boyer-Moore Voting Algorithm for O(1) space.]
 * 
 * Time Complexity: O(?)
 * Space Complexity: O(?)
 * 
 * Date Solved: 
 */

import java.util.*;

public class Problem04_MajorityElement {
    
    public int majorityElement(int[] nums) {
        // TODO: Implement your solution here
        return 0;
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
