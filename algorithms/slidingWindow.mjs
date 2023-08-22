// In sliding window questions, we are usually trying to build  a sub array or a sub string that qualifies a certain criteria. these questions may sometimes have some overlap with prefix-sum/postfix-sum questions  as well, so caution is advised. there are two different types of sw questions: static window questions and dynamic window questions;

// STATIC SIZED WINDOW
// these are usually straightforward. every once in a while, though, you may encounter a question that does not explicitly mention the size of the window (permutation of a target string s1 in an input string s2; fixed window size is the length of the target string);
// since we are already given a window size to deal with, the question usually asks us to find a window that is valid, and there is usually only one valid window. we find this window by shrinking from the left and expanding from the right one element at a time.

// DYNAMIC SIZED WINDOW
// some questions ask you to MAXIMIZE THE SIZE OF YOUR WINDOW all while ensuring that a certain condition is met. You may need to maintain an additional data structure to keep the state updated every time you expand your window or shrink it.
// in these questions, you start with a window of size 0, keep expanding it until it hits a wall and can no longer be expanded because inclusion of an additional eligible element would break validity in some way (you may run out of allowed swaps/deletes/ignores, you may include a third "kind" of element when only two kinds of elements are allowed, you may find a duplicate element when only unique elements are allowed, etc)
// you shrink the window in such a way that further expansion can continue again(you gain one more swap/delete/ignore back by excluding the element that used it, you eliminate one "kind" of elements completely to allow for a third kind of elements, you remove the first occurrence of a character from the left to allow for its duplicate's inclusion from the right, etc.)
// when you hit a wall again and can no longer expand while maintaining validity, you check if your current maximally expanded window is the largest one you have found so far or not, if it is, update the size of the largest window.
// you end this process when your right boundary can no longer be expanded(right boundary hits the last element);
// here's is a TEMPLATE of how you can find a MINIMUM SIZED WINDOW that's valid =>

// initialize your window attributes(left_boundary, right_boundary, width),  all the state that needs to be tracked while shrinking and expanding;4
// while (right boundary can’t no longer be expanded){
    // add the current element to your window;
    // update the state to reflect the addition of a new element to your window;
    // if the inclusion of this new element broke the validity of your window
        // shrink the window till it becomes valid again while keeping the state updates to reflect removal of elements from the left
    // if our new valid window is the largest sized valid window
        // update the max_window_size
    // increment right boundary for further expansion;
// }



// some questions ask you to MINIMIZE THE WIDTH OF THE WINDOW.
// since you already start with a window of width 0, it may or may not even be a valid window (valid window is a window that qualifies a certain restriction).
// => so our first task is to expand the window untill it becomes a valid window. 
// => As soon as it becomes valid, our goal shits to shrinking its width without losing the validity. 
// => The smallest width to which it could shrink without losing its validity will give you a width to compare. compare it with the thinnest valid window you have created so far and update as necessary.
// => you try to expand the window again
// => you do not want to lose validity at any point once you achieve it; the reason is, if you end up removing some elements from the left that would make your window invalid, you may never form a valid window again if those left out element do not have their duplicates ahead in the input array/string.
// => so you DO NOT want to lose validity even while shrinking
// if a state is maintained in a data structure, it is your responsibilty to keep it updated as you expand/shrink your window.
// every valid window's width is checked against the thinnest window you have formed so far; if your current window is thinner => you update the thinnest window's width.
// here's is a TEMPLATE of how you can find a MINIMUM SIZED WINDOW that's valid =>

// initialize your window attributes(left_boundary, right_boundary, width),  all the state that needs to be tracked while shrinking and expanding;
// while (right boundary can’t no longer be expanded){
//     check if the current element is eligible to be included in the window; if it is, include it;
//     update the state to reflect the consequence of adding an element to your window;
//     if the window thus formed is valid
//         shrink the window if it’s possible to shrink it while keeping it valid;
//             update the state to reflect the consequence of shrinking the window (update elements that were removed, their indexes if tracked, etc);
//         update the left boundary of your window post shrinkage; removal of some elements may move it towards right
//         check if this valid window is the smallest sized valid window; 
//             if it is, update the smallest valid window size;
//     increment right boundary for further expansion;
//     }


// certain pitfalls that you need to be aware of
// => In "maximizing the window size" problems, when you hit a wall and can no longer expand your window, ascertain that addition of each and every new element on the right hand side of your current right boundary will also lead to your window losing its validity. It should not be a case where your window becomes invalid for addition of a certain element, but becomes valid again if you add more elements from its right without having to shrink first. This is not even a SW problem.
// => keeping the state updated through expansion, shrinkage and collapse can sometimes be not as straightforward as updating a few variables. Sometimes you have sets, hashmaps. Some times you even forget to do it appropriately. Sometimes you dont even know what the hell qualifies as state for the problem
// => once you get a valid window, do not shrink your window by removing an element from the left if it's removal would cost you the validity of your window, be it maximizing or minimizing window size problem. 
// when you maximize a window, eventually you will find an eligible element that cannot be added because its addition would make the window invalid; so you shrink from the left and restore the state of the window to a point where a new element's addition would not break its validity, and immmediately add the element. but you do not expand the right boundary with a window in an invalid state
// similarly, when you minimize a window, once you find a valid window, addition of every new eligible element from the right would allow some shrinkage from the left; But you only remove an element from the left if its removal would not make your window invalid; if it does, your window cant be shrinked futher
// ................................................................................................................................................................................................................

// QUESTIONS SOLVED: 12
// maxProfit([7,6,4,3,1])                            // LC:121;   easy
// lengthOfLongestSubstring("abba")                  // LC:3;     medium
// checkInclusion("ky", "ainwkckifykxlribaypk")      // LC:567;   medium   #good question
// minSubArrayLen(15, [5,1,3,5,10,7,4,9,2,8])        // LC:209;   medium
// totalFruit([1,2,3,2,2])                           // LC:904;   medium
// longestOnes([0,0,1,1,0,0,1,1,1,0,1,1,0,1,1,1], 3) // LC:1004;  medium
// longestSubarray([0,1,1,1,0,1,1,0,1])              // LC:1493;  medium
// maxVowels("aeiou", 2)                             // LC:1456;  medium
// minWindow("baAaABabBba", "AbbB")                  // LC:76;    hard     #good question 
// characterReplacement("JSDSSMESSTR", 2)            // LC:424;   medium   #good question
// numSubarrayProductLessThanK([1,2,3], 0)           // LC:713;   medium   #faster solution when solved sliding window when compared with two pointers
// findAnagrams("cbaebabacd", "abc")                 // lc:438;   medium   #good question; collapsing sw

// ................................................................................................................................................................................................................
import queue from "../data structures/queue.mjs"
//.................................................................................................................................................................................................................

function findAnagrams(s, p){
    // generate a frequency map
    let frq_map = new Map();
    for(let i = 0; i < p.length; i++){
        let char = p.charAt(i);
        if(frq_map.has(char)){
            frq_map.set(char, frq_map.get(char) + 1);
        }
        else {
            frq_map.set(char, 1);
        }
    }
    // initialise window attributes
    let left = 0;
    let right = 0;
    let res = [];
    while(right < s.length){
        let char = s.charAt(right);
        // if we encounter an element not present in the frequency map, it renders our current window invalid and we move to the next element
        if(!frq_map.has(char)){
            let trav = left;
            // update the state while collapsing the window
            while(trav < right){
                let tmp = s.charAt(trav);
                if(frq_map.has(tmp)){
                    frq_map.set(tmp, frq_map.get(tmp) + 1)
                    trav++;
                }
            }
            right++;
            left = right;
            continue;
        }
        // if the current element's freq is zero; we gotta shrink our window until it can be included again. i.e
        if(frq_map.get(char) == 0){
            // shrink
            let trav = left;
            // while the frequency map does'nt have space for one more instance of the current char, we keep removing elements
            while(frq_map.get(char) != 1){
                let tmp = s.charAt(trav);
                frq_map.set(tmp, frq_map.get(tmp)+1);
                trav++;
            }
            left = trav;
        }
        // include the element
        frq_map.set(char, frq_map.get(char) - 1);
        // check if our valid window is complete
        if(right-left+1 == p.length){
            res.push(left);
        }
        right++;
    }
    console.log(res);
    return res;
}

function numSubarrayProductLessThanK(nums, k){
    // initialize window attributes
    let left = 0;
    let right = 0;
    let prod = 1;
    let sub_count = 0;
    // while the window can be expanded
    while(right < nums.length){
        // if the current element can be added to our window
        if(prod * nums[right] < k){
        // add the number to our window
        prod = prod * nums[right];
        //by adding one more element to our window, we increment the total subarray count by n, where n represents total elements after including the current element in our subarray
        sub_count += right-left+1;
        }

        // if the current element  cannot be added to our window without losing validity
        else{
            // we check if there is a window to shrink, if there isn't, we move to the next element
             if(left == right){
                right++;
                left++;
                continue
            }
            // else we shrink the window to allow for inclusion of the current element
            while(prod * nums[right] >= k){
                prod = prod/nums[left];
                left++;
            }
            // add the element
            prod = prod * nums[right];
            // increment the count
            sub_count += right-left+1;
        }
        right++
    }
    console.log((sub_count));
    return sub_count;
}

function characterReplacement(s, k){
    // initialize the window attributes, state
    let left = 0;
    let right = 0; 
    // we will need the most frequently occurring element
    let frequency_map = new Map();
    let max_window_size = Number.MIN_SAFE_INTEGER;
    let result_string = "";
    let max_frequency = 0;

    while(right < s.length){
        // add the current character
        let current_char = s.charAt(right);
        // update state to reflect the  inclusion of a new element to your window
        frequency_map.set(current_char, frequency_map.has(current_char) ? frequency_map.get(current_char) + 1 : 1);
        // we need the max frequency to check if a window is valid or not; so it's better to keep it update as soon as you add a new element to your window; 
        // you'd otherwise use a loop to loop over the current members of your window, and then find the most frequent one => slow af!
        max_frequency = frequency_map.get(current_char) > max_frequency ? frequency_map.get(current_char) : max_frequency;
    
        // if our window is invalid; i.e the size of the window - most frequent element is greater than the number of swaps allowed, we shrink to restore validity
        if((right - left + 1) - max_frequency > k){
            // we shrink to remove the left most element from our window once; removal of one element is sufficient to restore the validiy of our window; the width of the window will get decreased by one and consequently, (width - max_frequency) will also get decreased by one, and we will have restore validity to add one more element to our window
            frequency_map.set(s.charAt(left), frequency_map.get(s.charAt(left)) - 1);
            left++
        }        
        // see if our current valid window is the largest valid window
        result_string = right - left + 1 > max_window_size ? s.slice(left, right + 1) : result_string;
        max_window_size = Math.max(max_window_size, right - left + 1)
        right++;
    }
    console.log(result_string ,max_window_size);
    return max_window_size;
    
}

function minWindow (s, t){
    if(t.length > s.length){
        return ""
    }
    // initialize your state, window attributes
    let left = 0;
    let right = 0;
    let min_window_size = Number.MAX_SAFE_INTEGER;
    // a valid window is a one that has characters_matched equal to lenght of t
    let characters_matched = 0;
    let result_string = "";
    // we need to track the number of times a character occurs in our target; a character's ocurrences will change while expanding/shrinking the window;
    // we decrement the occurrence of a characters when we encounter them and add them to our window; we increment them when we remove them while shrinking the window
    let occurrences_map = new Map();
    // populate the map with initial occurrences
    for(let i = 0; i < t.length; i++){
        let char = t.charAt(i);
        if(occurrences_map.has(char)){
            occurrences_map.set(char, occurrences_map.get(char) + 1)
        }
        else{
            occurrences_map.set(char, 1)
        }
    }
    // we also need to track the order of characters found while building our window and their associated indexes. i chose queues for this but i'm sure there are other ways to accomplish this
    let char_queue = new queue();
    let index_queue = new queue();

    // while right boundary can't no longer be expanded
    while(right < s.length){
        // get the current element
        let current = s.charAt(right);
        // it is important to observe that our window may also have elements that do not even appear in the target string, and that is okay; The window is valid as long as it has all the characters appearing in the target string. for ex: target = ab; input = bccxay; "bccxa" is our min window substring; another example: target: abc, input: abbbbbbxyzczzzz; "abbbbbbxyzc" is our min window substring. You may have more instances of a character in your answer than necessary but the window becomes invaild only when you have fewer instances of any character than necessary.

        // if the current char has appeared in the target, update the frequency map to reflect it's inclusion in our window;
        if(occurrences_map.has(current)){
        //   update the state to reflect the consequence of adding an element to our window
            char_queue.enqueue(current);
            index_queue.enqueue(right);
            occurrences_map.set(current, occurrences_map.get(current) - 1);
            characters_matched = occurrences_map.get(current) < 0 ? characters_matched : characters_matched + 1; 
            
            // if we have a valid window , we check if it can be shrinked without making it unvalid
            if(characters_matched == t.length){
                // see if our current window can be shrinked while maintaining validity; this part is tricky;
                while(true){
                    // get the first char in window
                    let first_char = char_queue.front;
                    // see if it can be removed without making the window invalid; our window become invalid the moment we remove a character from the left that has only occurred once and does not have additional copies of itself to accomodate for its removal; some elements can be removed because they were included more times than they were present in target string
                    if(occurrences_map.get(first_char) + 1 != 1){
                        occurrences_map.set(first_char, occurrences_map.get(first_char) + 1)
                        char_queue.dequeue();
                        index_queue.dequeue();
                    }
                    // as soon as we find an element whose removal would cost us the validity of the window, we exit out of the loop
                    else{
                        break
                    }

                }
                // update the left boundary post shrinkage
                left =  index_queue.front;
                // check if our valid window is the smallest sized valid window. if it is, update the smallest window formed so far
                result_string = min_window_size > right - left +1 ? s.slice(left, right+1): result_string;
                min_window_size = Math.min(min_window_size, right - left + 1);
            }
        }
        // increment the right boundary for further expansion
        right++        
    }
    console.log(result_string, min_window_size);
    return result_string
}

function maxVowels(s, k){
    // initialize the window attributes
    let left = 0;
    let right = 0;
    let current_window_size = 0;
    let current_vowel_count = 0;
    let max_vowel_count = Number.MIN_SAFE_INTEGER;
    // while the window can be expanded
    while(right < s.length){
        // give me the current character and check if it is a vowel
        let char = s.charAt(right);
        // if current window size is larger than whats allowed, we cant include a new element until we shrink the window to allow for just one inclusion
        if(current_window_size >= k){
            // shrink the window to exclude one char and update the state
            if(s.charAt(left) == "a" || s.charAt(left) == "e" || s.charAt(left) == "i" || s.charAt(left) == "o" || s.charAt(left) == "u"){
                current_vowel_count--;
            }
            left++;
            current_window_size--;
        }
        // add the current element and update the state as needed
        if(s.charAt(right) == "a" || s.charAt(right) == "e" || s.charAt(right) == "i" || s.charAt(right) == "o" || s.charAt(right) == "u"){
            current_vowel_count++;
        }
        right++;
        current_window_size++;
        // check if window has maximum vowels
        max_vowel_count = Math.max(max_vowel_count, current_vowel_count);
    }
    console.log(max_vowel_count);
    return max_vowel_count;
}

function longestSubarray(nums){
    let left = 0;
    let right = 0;
    let current_count = 0;
    let max_count = 0;
    let remaining_deletes = 1;
    while(right < nums.length){
        // if the current number is 1, we just include it in the window and move on
        if(nums[right] == 1){
            current_count++;
        }
        // else if we encounter a zero, we get to delete it once and continue, or we have to shrink the window to allow for deletion
        else{
            if(remaining_deletes == 1){
                // we decrement the remaining deletes but we dont increment the counter because it is a delete, not a swap.
                remaining_deletes--;
            }
            // remaining_deletes is already zero; you have to shrink the window to allow for further deletion
            else{
                let trav = left;
                // while we do not have even a single delete, look for a zero
                while(remaining_deletes != 1){
                    // as soon as you find that zero, replenish the delete and exclude it from our window;
                    if(nums[trav] == 0){
                        remaining_deletes++;
                    }
                    // but we also have to decrement the count if we encounter 1s during shrinking our window
                    else{
                        current_count--
                    }
                    trav++;
                }
                left = trav;
                // using the replenished delete to delete the current zero;
                remaining_deletes--;
            }
        }
        
        max_count = Math.max(max_count, current_count)
        right++;
    }
    console.log(max_count);
    return remaining_deletes == 1 ? max_count - 1: max_count;
}

function longestOnes (nums, k){
    let left = 0;
    let right = 0;
    let current_count = 0;
    let remaining_swaps = k;
    let max_count = 0;
    while(right < nums.length){
        // if current element is a 1, all we need to do is expand the window.
        if(nums[right] == 1){
            current_count++;
        }
        // if current element is a 0, shrinking the window is necessary if k == 0, else we can continue expanding
        else{
            if(remaining_swaps > 0){
                remaining_swaps--;
                current_count++;
            }
            // k==0; no more swaps left; we will  shrink the window until we have at least one swap available again;
            else{
                let trav = left;
                // while we do not have at least one swap, keep eliminating elements from the left
                while(remaining_swaps != 1){
                    if(nums[trav] == 0){
                        remaining_swaps++;
                    }
                    // while keeping the state updated
                    current_count--;
                    trav++;
                }
                // update left boundary to exclude the 0 that was eliminated to have one more swap
                left = trav;
                // update the state to include the current element and use the one swap you got from shrinking the window
                current_count++;
                remaining_swaps--;
            }
        }
        // update the max count if necessary
        max_count = Math.max(max_count, current_count);
        right++;
    }
    console.log(max_count);
    return max_count;

}


function totalFruit(fruits){
    // initialize the attributes of your window
    let left = 0;
    let right = 0;
    // State is needed to be maintained; we track "fruit type: index of the most recent occurrence" pairs
    let hashmap = new Map();
    let maxfruits = 0;
    // while the window can be expanded
    while(right < fruits.length){
        // if the current fruit is already in our window
        if(hashmap.has(fruits[right])){
            // update the state to change the index of the most recent occurrence
            hashmap.set(fruits[right], right);
        }
        // if the current fruit does not exist in our window
        else{
            // check if we maybe haven't even encountered two different kinds of fruits
            if(hashmap.size < 2){
                hashmap.set(fruits[right], right);
            }
            // but if we have encountered two fruits and we still didn't find the current fruit: it is a new kind of fruit; we will have to shrink the window to allow for its inclusion
            else{
                // shrink the window until the new fruit can be added again and update the state to reflect the changes
                // get the values in an array; these value represent indexes; find the smaller index; find the fruit type associated with the smaller index; delete that fruit type
                let hashmapIndexes = hashmap.values();
                let smallerIndex = Math.min(...hashmapIndexes);
                let smallerKey = fruits[smallerIndex];
                left = smallerIndex + 1;
                // update the state to exclude the fruit that had a smaller index;
                hashmap.delete(smallerKey);
                //update the state to include the new fruit
                hashmap.set(fruits[right], right);
            }
        }
        // update max window size if needed
        maxfruits = Math.max(maxfruits, right - left + 1)
        right++
    }
    console.log(maxfruits);
    return maxfruits;
}

function minSubArrayLen(target, nums){
    // inititalize you window attributes
    let left = 0;
    let right = 0;
    let currentSum = 0;
    let currentWindowSize = 0;
    let minWindowSize = Number.MAX_SAFE_INTEGER;
    // while the window can still be expanded
    while(right <= nums.length-1){
        // update state => include the element in your window and increment window's size
        currentSum += nums[right];
        currentWindowSize += 1;
        // if the window can no longer be expanded
        if(currentSum > target) {
            // we shrink it to allow for expansion
            let index = left;
            while(currentSum - nums[index] >= target){
                // all while keeping the state updated
                currentSum -= nums[index];
                currentWindowSize--;
                index++;
            }
            // after the window has been shrunk, update the left boundary
            left = left != index ?  index : left;
        }
        // update minimum window size if necessary
        minWindowSize = currentSum >= target ?  Math.min(minWindowSize, currentWindowSize) : minWindowSize;
        right++
    }
    console.log(minWindowSize, left, right);
    return currentSum >= target ? minWindowSize : 0;
}


function checkInclusion(s1, s2){
    // state is needed to be maintained: we track "character: its number of occurrences" pairs
    let hashmap = new Map()
    for(let i = 0; i < s1.length; i++){
        // if a char is already added to the hashmap, increment its occurrences count
        if(hashmap.get(s1.charAt(i)) != undefined){
            hashmap.set(s1.charAt(i), hashmap.get(s1.charAt(i))+1)
        }
        // else mark it as occurring once
        else{
            hashmap.set(s1.charAt(i), 1)
        }
    }
    // initialise window boundaries and size and a result flag
    let left = 0;
    let right = 0;
    let currentwindowsize = 0;
    let result = false;
    // while the window can be expanded
    while (right <= s2.length-1){
        // check if the current character exists in our window
        let doesCurrentCharExist = hashmap.get(s2.charAt(right));
        // if it does not, we COLLAPSE the current window since we can't include the current element in our window if it's to remain valid; our valid window is a contiguous string comprising  all the characters of the s1 string: this is different from shrinking the window. we collapsed it since the presence of this current element rendered it invalid
        if(doesCurrentCharExist == undefined){
            let index = left;
            while(index != right){
                // while we collapse the window, don't forget to update the state to reflect this change; we have to increment the occurrence of every element since we decrement it when we include an element in our window
                hashmap.set(s2.charAt(index), hashmap.get(s2.charAt(index))+1);
                index++
            }
            // state after collaspsing the window
            right++;
            left = right;
            currentwindowsize = 0;
        }
        // else if the current char exists in our hashmap
        else{
            // we have to check if the number of its occurences is greater than zero; if it is we can just expand
            if(doesCurrentCharExist > 0){
                hashmap.set(s2.charAt(right), hashmap.get(s2.charAt(right)) - 1);
                currentwindowsize++;
                right++
            }
            // char does exist but is already included in the window and has 0 instances of itself available, we shrink the window to have it be available just once
            else{ 
                // move the window(left pointer) from the left such that current element can be included again
                let index = left;
                while(s2.charAt(index) != s2.charAt(right)){
                    // keep the state updated as you make changes to the elements included in your window
                    hashmap.set(s2.charAt(index), hashmap.get(s2.charAt(index))+1);
                    index++;
                    currentwindowsize--
                }
                left = index+1;
                right++
            }
        }
        // update window size if needed
        if(currentwindowsize == s1.length){
            result =  true;
            break
        }
    }
    console.log(result);
    return result
}


function lengthOfLongestSubstring(s){
    // early exit for simpler inputs
    if(s.length == 0){
        return 0
    }
    if (s.length == 1){
        return 1;
    }
    // we have state to maintain = the characters that have appeared in our window so far; 
    let hashmap = new Map();
    let left;
    let right;
    for(let i = 0; i < s.length-1; i++){
        // initializing the left and right boundaries of our window to be the first two unique adjacent characters; there are weird fucking testcases in this question, man. you can't initialize your starting window boundaries to 0 and 1 because it breaks a certain test case
        if(s.charAt(i) != s.charAt(i+1)){
            left = i;
            right = i+1;
            break;
        }
        if(i == s.length - 2){
            return 1
        }
    }
    // calculate the initial width of the window
    let maxlength = right > left ? right - left + 1 : 1;
    // update state to include the initial elements that the boundaries represent: we are storing "character: index" pairs
    hashmap.set(s.charAt(left), left);
    hashmap.set(s.charAt(right), right);

    // expand window till you don't hit a wall
    for(let i = right+1; i < s.length; i++){
        let char = s.charAt(i);
        // get the index of our current character 
        let index = hashmap.get(char);
        // if it is already included in the window and is on the right hand side of our left boundary
        if(index != undefined && index >= left){
            // shrink the window to exclude the element
            left = index+1;
        }
        // update the state to include this char from the right
        hashmap.set(char, i);
        right = i; 
        // update max window size if needed
        if(right-left +1> maxlength){
            maxlength = right - left+1;
        }
    }
    console.log(maxlength);
    return maxlength
}

function maxProfit(prices){
    // initialize your window boundaries
    let left = 0;
    let right = 1;
    // initialize max profit
    let maxProfit = prices[right] > prices[left] ? prices[right] - prices[left] : 0;
    // while the window can no longer be expanded
    for(let i = 1; i < prices.length; i++){
        // a valid window in this question is a window with increasing elements; if at any point there is a dip, that dip will be your new selling price (a new window)
        if(prices[i] < prices[left]){
            left = i;
            right = i+1;
        }
        // if the current element is larger than the last element, we can expand our window by including it in our window
        if(prices[i] > prices[right]){
            right = i;
        }
        // update the max profit
        let currentprofit = prices[right] - prices[left];
        if(currentprofit > maxProfit){
            maxProfit = currentprofit;
        }
    }
    console.log(maxProfit);
    return maxProfit;
}