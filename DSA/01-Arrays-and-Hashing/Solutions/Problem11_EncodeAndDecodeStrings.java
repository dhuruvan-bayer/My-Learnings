/**
 * Problem: Encode and Decode Strings
 * Difficulty: Medium
 * Link: https://leetcode.com/problems/encode-and-decode-strings/ (Premium)
 * Alternative: https://neetcode.io/problems/string-encode-and-decode
 * 
 * Problem Statement:
 * Design an algorithm to encode a list of strings to a single string.
 * The encoded string is then decoded back to the original list of strings.
 * 
 * Approach:
 * [Your approach here - e.g., Use length-prefix encoding: for each string, prepend its length
 * followed by a delimiter (e.g., "5#hello4#test"). This handles special characters safely.]
 * 
 * Time Complexity: O(?)
 * Space Complexity: O(?)
 * 
 * Date Solved: 
 */

import java.util.*;

public class Problem11_EncodeAndDecodeStrings {
    
    // Encodes a list of strings to a single string.
    public String encode(List<String> strs) {
        // TODO: Implement your solution here
        return "";
    }

    // Decodes a single string to a list of strings.
    public List<String> decode(String s) {
        // TODO: Implement your solution here
        return new ArrayList<>();
    }
    
    // Test cases
    public static void main(String[] args) {
        Problem11_EncodeAndDecodeStrings codec = new Problem11_EncodeAndDecodeStrings();
        
        // Test case 1
        List<String> input1 = Arrays.asList("hello", "world");
        String encoded1 = codec.encode(input1);
        List<String> decoded1 = codec.decode(encoded1);
        System.out.println("Test 1: " + decoded1); // Expected: ["hello", "world"]
        
        // Test case 2
        List<String> input2 = Arrays.asList("", "");
        String encoded2 = codec.encode(input2);
        List<String> decoded2 = codec.decode(encoded2);
        System.out.println("Test 2: " + decoded2); // Expected: ["", ""]
        
        // Test case 3
        List<String> input3 = Arrays.asList("a#b", "c#d#e");
        String encoded3 = codec.encode(input3);
        List<String> decoded3 = codec.decode(encoded3);
        System.out.println("Test 3: " + decoded3); // Expected: ["a#b", "c#d#e"]
    }
}
