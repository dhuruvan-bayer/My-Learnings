/**
 * Problem: Contains Duplicate
 * Difficulty: Easy
 * Link: https://leetcode.com/problems/contains-duplicate/
 * 
 * Problem Statement:
 * Given an integer array nums, return true if any value appears at least twice,
 * and false if every element is distinct.
 * 
 * Approach:
 * [Your approach here - e.g., Use a HashSet to track seen elements. As we iterate,
 * if an element already exists in the set, return true. Otherwise, add it to the set.]
 * 
 * Time Complexity: O(?)
 * Space Complexity: O(?)
 * 
 * Date Solved: 
 */

import java.util.*;

public class Problem01_ContainsDuplicate {
    
    public boolean containsDuplicate(int[] nums) {
        // TODO: Implement your solution here
        Map<Integer,Integer> map = new HashMap<>();

        for(int i=0;i<nums.length;i++){
            if(map.containsKey(nums[i])){
                return true;
            }else{
                map.put(nums[i],map.getOrDefault(nums[i],0)+1);
            }
        }
        return false;
    }
    
    // Test cases
    public static void main(String[] args) {
        Problem01_ContainsDuplicate solution = new Problem01_ContainsDuplicate();
        
        // Test case 1
        int[] nums1 = {1, 2, 3, 1};
        System.out.println("Test 1: " + solution.containsDuplicate(nums1)); // Expected: true
        
        // Test case 2
        int[] nums2 = {1, 2, 3, 4};
        System.out.println("Test 2: " + solution.containsDuplicate(nums2)); // Expected: false
        
        // Test case 3
        int[] nums3 = {1, 1, 1, 3, 3, 4, 3, 2, 4, 2};
        System.out.println("Test 3: " + solution.containsDuplicate(nums3)); // Expected: true
    }
}
