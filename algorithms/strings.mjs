// QUESTION SOLVED: 6

// longestPalindrome("cbbd");                                     //lc:5     medium  good question/DP
// isAnagram("anagram", "ngaram")                                 //lc:242   easy
// groupAnagrams(["eat","tea","tan","ate","nat","bat"])           //lc:49    medium  
// longestPalindrome2("abccccdd")                                 //lc:409   easy
// isPalindrome("A man9, a plan, a canal: Panama")                //lc:125   easy
// longestCommonPrefix(["flower","flow","floight"])               //lc:14    easy
// .....................................................................................................................................................................



function longestCommonPrefix(strs){
    strs = strs.sort((a, b) => a.length - b.length);
    let lcp = strs[0];
    for(let i = 0; i < strs.length; i++){
        if(lcp.length == 0){
            return "";
        }
        for(let j = 0; j < lcp.length; j++){
            if(lcp.charAt(j) != strs[i].charAt(j)){
                lcp = lcp.slice(0, j);
                break;
            }
            else continue;
        }
    }
    console.log(lcp);
    return lcp
}

function isPalindrome(s){
    let input = "";
    let res;
    for(let i = 0; i < s.length; i++){
        let char = s.charAt(i);
        if(char.charCodeAt() >= 65 && char.charCodeAt() <=90){
            char = String.fromCharCode(char.charCodeAt(0) + 32);
        }
        if((char.charCodeAt() >= 48 && char.charCodeAt() <= 57) || (char.charCodeAt() >= 97 && char.charCodeAt() <= 122)){
            input = input.concat(char);
        }
        else continue;
    }
    res = isPal(input, 0, input.length-1);
    console.log(res);
    return res

    // helper
    function isPal(str, left, right){
      if(left >= right){
        return true;
      }
      else{
        if(str.charAt(left) == str.charAt(right)){
            return isPal(str, left+1, right-1)
        }
        else return false
      }
    }
}

function longestPalindrome2(s){
    // generate a frequency map of character occurrences
    let frq_map = new Map();
    for(let i = 0; i < s.length; i++){
        let char = s.charAt(i);
        if(frq_map.has(char)){
            frq_map.set(char, frq_map.get(char) + 1);
        }
        else{
            frq_map.set(char, 1);
        }
    }

    let palindrome_len = 0;
    let is_single_char_present = false;
    let frq_arr = Array.from(frq_map.values())
    for(let i =0; i < frq_arr.length; i++){
        if(frq_arr[i] % 2 == 0){
            palindrome_len += frq_arr[i];
        }
        else{
            palindrome_len += frq_arr[i] - 1;
            is_single_char_present = is_single_char_present == false ? true : is_single_char_present;
        }
    }
    if(is_single_char_present){
        palindrome_len+=1; 
    }
    console.log(palindrome_len);
    return palindrome_len;
}

function groupAnagrams(strs){
    let res;
    let anagrams_map = new Map();
    for(let i = 0; i < strs.length; i++){
        let sorted_str = sortStr(strs[i]);
        if(anagrams_map.has(sorted_str)){
            anagrams_map.get(sorted_str).push(strs[i]);
        }
        else{
            anagrams_map.set(sorted_str, [strs[i]]);
        }
    }
    res = Array.from(anagrams_map.values());
    console.log(res);
    return res
    // helper
    function sortStr(str){
        let arr = Array.from(str);
        arr = arr.sort();
        return arr.join("")
    }
}

function isAnagram(s, t){
    // early exit
    if(s.length != t.length){
        console.log(false);
        return false;
    }

    // populate the frequency map with frequency of occurrence of each char in s
    let frq_map = new Map();
    for(let i = 0; i < s.length; i++){
        let char = s.charAt(i);
        if(frq_map.has(char)){
            frq_map.set(char, frq_map.get(char) + 1);
        }
        else{
            frq_map.set(char, 1);
        }
    }
    for(let i = 0; i < t.length; i++){
        let char = t.charAt(i);
        if(!frq_map.has(char)){
            console.log(false);
            return false
        }
        else {
            let frq = frq_map.get(char);
            if(frq == 1){
                frq_map.delete(char);
            }
            else{
                frq_map.set(char, frq_map.get(char) - 1);
            }
        }
    }
    console.log(true);
    return true;
}

function longestPalindrome(s){
    let longestPalindrome = "";
    let longestPalindromeLength = 0;
    let left = 0;
    let right = s.length-1;
    // while left and right haven't crossed each other
    while(right >= left){
        // early exit: if a larger palindromic substring  was found than is possible with the current positions of right and left => dont even bother finding the actual substring since it can never be larger than the largest one we have
        if(right-left+1 < longestPalindromeLength){
            left++;
            right = s.length-1
        }

        // check is the current substring starting at left index and ending at right index is a palindrome or not
        let isPal = isPalindrome(s.slice(left, right+1));
        if (isPal){
            // if it is, check if it's size is larger than the largest palindrome we have currently and update if true
            if(right-left+1 > longestPalindromeLength){
                longestPalindromeLength = right-left+1;
                longestPalindrome = s.slice(left, right+1)
            }
            // increment left to the next index because we already found the largest substring starting at the current index; 
            left++;
            // reset right pointer to the end
            right = s.length-1;
        }
        // if the current substring is not a palindrome, we decrement right to see if a smaller substring is a palindrome
        else{
            right--;
        }
    }
    console.log(longestPalindrome);
    return longestPalindrome;

    // helper to check if a sub string is a palindrome or not
    function isPalindrome (str, left = 0, right = str.length-1){
        if(left >= right){
            return true
        }
        else if(str.charAt(left) == str.charAt(right)){
            return isPalindrome(str, left+1, right-1);
        }
        else return false
    }
}
