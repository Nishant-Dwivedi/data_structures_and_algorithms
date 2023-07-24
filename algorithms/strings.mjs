 longestPalindrome("cbbd");                                     //LC:5 medium  good question

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
