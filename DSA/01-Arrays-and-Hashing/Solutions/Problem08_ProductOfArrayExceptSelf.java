/**
 * Problem: Product of Array Except Self
 * Difficulty: Medium
 * Link: https://leetcode.com/problems/product-of-array-except-self/
 * 
 * Problem Statement:
 * Given an integer array nums, return an array answer such that answer[i] is equal to
 * the product of all the elements of nums except nums[i].
 * The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.
 * You must write an algorithm that runs in O(n) time and without using the division operation.
 * 
 * Approach:
 * [Your approach here - e.g., Use two passes: first calculate prefix products (all elements to the left),
 * then calculate suffix products (all elements to the right) and multiply them.]
 * 
 * Time Complexity: O(?)
 * Space Complexity: O(?)
 * 
 * Date Solved: 
 */

import java.util.*;

public class Problem08_ProductOfArrayExceptSelf {
    
    public int[] productExceptSelf(int[] nums) {
        // TODO: Implement your solution here
        return new int[]{};
    }
    
    // Test cases
    public static void main(String[] args) {
        Problem08_ProductOfArrayExceptSelf solution = new Problem08_ProductOfArrayExceptSelf();
        
        // Test case 1
        int[] nums1 = {1, 2, 3, 4};
        System.out.println("Test 1: " + Arrays.toString(solution.productExceptSelf(nums1)));
        // Expected: [24, 12, 8, 6]
        
        // Test case 2
        int[] nums2 = {-1, 1, 0, -3, 3};
        System.out.println("Test 2: " + Arrays.toString(solution.productExceptSelf(nums2)));
        // Expected: [0, 0, 9, 0, 0]
        
        // Test case 3
        int[] nums3 = {2, 3, 4, 5};
        System.out.println("Test 3: " + Arrays.toString(solution.productExceptSelf(nums3)));
        // Expected: [60, 40, 30, 24]
    }
}
