// maxProfit([7,6,4,3,1])
// lengthOfLongestSubstring("abba")
// characterReplacement("ABBB", 2) todo
// checkInclusion("ky", "ainwkckifykxlribaypk")
// minSubArrayLen(15, [5,1,3,5,10,7,4,9,2,8])
// totalFruit([1,2,3,2,2])
// longestOnes([0,0,1,1,0,0,1,1,1,0,1,1,0,0,0,1,1,1,1], 3)
// longestSubarray([0,1,1,1,0,1,1,0,1])

// .................................................................................................................................................................................

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
            // k==0; no more swaps left; will have to shrink the window if we are to include the current element;
            else{
                let trav = left;
                // while we do not have at least one swap, keep eliminating elements from the left
                while(remaining_swaps != 1){
                    if(nums[trav] == 0){
                        remaining_swaps++;
                    }
                    current_count--;
                    trav++;
                }
                // update left boundary to exclude the 0 that was eliminated to have one more swap
                left = trav;
                // include the current element and use the one swap you got from shrinking the window
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
    {
        // let left = 0;
        // let right = 0;
        // let hashmap = new map();
        // maxfruits = 0;
        // while(right < fruits.length)
            // if(hashmap.has(fruits[right]))
                // hashmap.set(fruits[right], right);
            // else
                // if(hashmap.size < 2)
                    // hashmap.set(fruits[right] , right)
                // else
                    // time to shrink the window size
                    // let hashmapIndexes = hashmap.values();
                    // let smallerIndex = math.min(...hashmapIndexes);
                    // let smallerKey = fruits[smallerIndex];
                    // left = smallerIndex+1;
                    // hashmap.delete(smallerkey);
                    // hashmap.set(fruits[right], right);
            // maxfruits = math.max(maxfruit, right-left+1)
            // right++
    }
    let left = 0;
    let right = 0;
    let hashmap = new Map();
    let maxfruits = 0;
    while(right < fruits.length){
        if(hashmap.has(fruits[right])){
            hashmap.set(fruits[right], right);
        }
        else{
            if(hashmap.size < 2){
                hashmap.set(fruits[right], right);
            }
            else{
                // shrink the window until the current element can be added again
                let hashmapIndexes = hashmap.values();
                let smallerIndex = Math.min(...hashmapIndexes);
                let smallerKey = fruits[smallerIndex];
                left = smallerIndex + 1;
                hashmap.delete(smallerKey);
                // add the current element
                hashmap.set(fruits[right], right);
            }
        }
        maxfruits = Math.max(maxfruits, right - left + 1)
        right++
    }
    console.log(maxfruits);
    return maxfruits;
}

function minSubArrayLen(target, nums){
    {
        // left = 0;
        // right = 0;
        // sum = 0;
        // windowSize = maxInfinity;
        // while(right <= nums.length-1)
            // sum += nums[right]
            // windowSize++;
            // if(sum > target)
                // let index = left;
                // while(sum - nums[index] >= target)
                    // sum -= nums[index];
                    // windowsize--;
                    // index++;
            // windowsize = math.min(windowsize, right-left+1) 
        // return windowsize
    }
    let left = 0;
    let right = 0;
    let currentSum = 0;
    let currentWindowSize = 0;
    let minWindowSize = Number.MAX_SAFE_INTEGER;
    while(right <= nums.length-1){
        currentSum += nums[right];
        currentWindowSize += 1;
        if(currentSum > target) {
            let index = left;
            while(currentSum - nums[index] >= target){
                currentSum -= nums[index];
                currentWindowSize--;
                index++;
            }
            left = left != index ?  index : left;
        }
        minWindowSize = currentSum >= target ?  Math.min(minWindowSize, currentWindowSize) : minWindowSize;
        right++
    }
    console.log(minWindowSize, left, right);
    return currentSum >= target ? minWindowSize : 0;
}
function checkInclusion(s1, s2){
    // good question
    let hashmap = new Map()
    for(let i = 0; i < s1.length; i++){
        if(hashmap.get(s1.charAt(i)) != undefined){
            hashmap.set(s1.charAt(i), hashmap.get(s1.charAt(i))+1)
        }
        else{
            hashmap.set(s1.charAt(i), 1)
        }
    }
    let left = 0;
    let right = 0;
    let currentwindowsize = 0;
    let result = false;
    while (right <= s2.length-1){
        let doesCurrentCharExist = hashmap.get(s2.charAt(right));
        if(doesCurrentCharExist == undefined){
            let index = left;
            while(index != right){
                hashmap.set(s2.charAt(index), hashmap.get(s2.charAt(index))+1);
                index++
            }
            right++;
            left = right;
            currentwindowsize = 0;
        }
        else{
            if(doesCurrentCharExist > 0){
                hashmap.set(s2.charAt(right), hashmap.get(s2.charAt(right)) - 1);
                currentwindowsize++;
                right++
            }
            // char does exist but is already included in the window and has 0 instances of itself available
            else{ 
                // move the window(left pointer) from the left such that current element can be included again
                let index = left;
                while(s2.charAt(index) != s2.charAt(right)){
                    hashmap.set(s2.charAt(index), hashmap.get(s2.charAt(index))+1);
                    index++;
                    currentwindowsize--
                }
                left = index+1;
                right++
            }
        }
        if(currentwindowsize == s1.length){
            result =  true;
            break
        }
    }
    console.log(result);
    return result
}

function characterReplacement(s, k) {
    {
        // todo
    }
        
}

function lengthOfLongestSubstring(s){
    {
        // hashmap = new map()
        // left = 0;
        // right = 1;
        // maxlength = right > left ? right - left : 0;
        // hasmap.set(s.charat(left), left)
        // hasmap.set(s.charat(right), right)
        // for i: 2 to s.length
            // char = s.charat(i);
            // index = hashmap.get(char);
            // if(index)
                // left = index+1;

            // hashmap.set(char, i)
            // right = i;
            // if(right - left > maxlenght)
                // maxlength = right-1
    }
    if(s.length == 0){
        return 0
    }
    if (s.length == 1){
        return 1;
    }
    let hashmap = new Map();
    let left;
    let right;
    for(let i = 0; i < s.length-1; i++){
        if(s.charAt(i) != s.charAt(i+1)){
            left = i;
            right = i+1;
            break;
        }
        if(i == s.length - 2){
            return 1
        }
    }
    let maxlength = right > left ? right - left + 1 : 1;
    hashmap.set(s.charAt(left), left);
    hashmap.set(s.charAt(right), right);
    for(let i = right+1; i < s.length; i++){
        let char = s.charAt(i);
        let index = hashmap.get(char);
        if(index != undefined && index >= left){
            left = index+1;
        }
        hashmap.set(char, i);
        right = i; 
        if(right-left +1> maxlength){
            maxlength = right - left+1;
        }
    }
    console.log(maxlength);
    return maxlength
}

function maxProfit(prices){
    {
        // left = 0;
        // right = 1;
        // profit= prices[right] > prices[left] ? prices[right] - prices[left] : 0;
        // for i: 1 to prices.length
            // if(prices[i] < prices[left])
                // left = i;
                // right = i+1;
            // elif (prices[i] > prices[right])
                // right = i;
                // currentprofit = prices[right] - prices[left];
                // if(currentprofit > profit)
                    // profit = currentprofit
    }
    let left = 0;
    let right = 1;
    let maxProfit = prices[right] > prices[left] ? prices[right] - prices[left] : 0;
    for(let i = 1; i < prices.length; i++){
        if(prices[i] < prices[left]){
            left = i;
            right = i+1;
        }
        if(prices[i] > prices[right]){
            right = i;
        }
        let currentprofit = prices[right] - prices[left];
        if(currentprofit > maxProfit){
            maxProfit = currentprofit;
        }
    }
    console.log(maxProfit);
    return maxProfit;
}