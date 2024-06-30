// Questions solved: 11
// search([3, 5, 1], 3)                                                                                    //LC: 33  medium
findMin([4,5,6,7,0,1,2])                                                                                //LC: 153 medium 
// console.log(findClosestElements([1,3], 1, 2));                                                          //LC: 658 medium  #good question
// peakIndexInMountainArray([3,5,3,2,0])                                                                   //LC: 852 medium
// searchSorted([1,1,1,1,1,1,1,1,1,1,1,1,1,2,1,1,1,1,1], 2)                                                //LC: 81  medium
// firstBad(500, 30)                                                                                       //LC: 278 easy
// searchMatrix( [[1,3]], 3)                                                                               //LC: 74  medium
// searchMatrixTwo([[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], 17)      //LC: 240 medium
// shipWithinDays([3,2,2,4,1,4], 3)                                                                        //LC:1011 medium  #good question
// maximumCandies([5,8,6], 3)                                                                              //LC:2226 medium  #good question
// singleNonDuplicate([1,1,2,3,3,4,4,8,8])                                                                 //LC:540  medium  #good question
// search_lc_704([-1,0,3,5,9,12], 13)
// findMedianSortedArrays([2,2,4,4], [2,2,4,4])
// jobScheduling([1,2,2,3], [2,5,3,4], [3,4,1,2])

// ...................................................................................................................................................................

function jobScheduling(startTime, endTime, profit){
    // create a schwaztzian transform
    let schz = new Array(startTime.length);
    for(let i = 0; i < schz.length; i++){
        schz[i] = [i, i, i];
    }
    schz = schz.sort((a, b) => {
        if(startTime[a[0]] < startTime[b[0]]){
            return -1
        }
        else return 1;
    })
    let new_start_time = [];
    let new_end_time = [];
    let new_profit = [];
    for(let i = 0; i < schz.length; i++){
        new_start_time.push(startTime[schz[i][0]]);
        new_end_time.push(endTime[schz[i][1]]);
        new_profit.push(profit[schz[i][2]]);
    }
    startTime = new_start_time;
    endTime = new_end_time;
    profit = new_profit;
    let memo = new Map();
    let max_p = dp(0);
    console.log(max_p);
    return max_p;

    function dp(ind){
        if(memo.has(ind)){
            return memo.get(ind);
        }
        if(ind == startTime.length-1){
            return profit[ind];
        }
        let nxt_ind_if_curr_ind_included = bs(ind + 1, startTime.length-1, endTime[ind]);
        let max_profit_from_curr_ind = Math.max(nxt_ind_if_curr_ind_included ? profit[ind] + dp(nxt_ind_if_curr_ind_included) : profit[ind], dp(ind+1));
        memo.set(ind, max_profit_from_curr_ind);
        return max_profit_from_curr_ind;     
    }

    // we'll bs the first start time that is >= k;
    function bs(start, end, k){
        if(start > end){
            return null;
        }
        let mid = start + Math.floor((end-start)/2);
        if(startTime[mid] >= k && startTime[mid-1] < k){
            return mid;
        }
        else if(startTime[mid] < k){
            return bs(mid+1, end, k);
        }
        else{
            return bs(start, mid-1, k);
        }
    }
}

function findMedianSortedArrays(nums1, nums2){
    let median = null;
    if((nums1.length + nums2.length) % 2 == 0){
        let mid_left = find_med(0, nums1.length-1, nums1, nums2, Math.floor((nums1.length + nums2.length-1)/2), true) || find_med(0, nums2.length-1, nums2, nums1,  Math.floor((nums1.length + nums2.length-1)/2), true);
        if(mid_left == null){
            mid_left = find_med(0, nums1.length-1, nums1, nums2, Math.floor((nums1.length + nums2.length-1)/2), false) || find_med(0, nums2.length-1, nums2, nums1,  Math.floor((nums1.length + nums2.length-1)/2), false);
        }
        let mid_right = find_med(0, nums1.length-1, nums1, nums2, Math.ceil((nums1.length + nums2.length-1)/2), true) || find_med(0, nums2.length-1, nums2, nums1,  Math.ceil((nums1.length + nums2.length-1)/2), true);
        if(mid_right == null){
            mid_right = find_med(0, nums1.length-1, nums1, nums2, Math.ceil((nums1.length + nums2.length-1)/2), false) || find_med(0, nums2.length-1, nums2, nums1,  Math.ceil((nums1.length + nums2.length-1)/2), false);
        }
        median = (mid_left + mid_right)/2
    }
    else{
        median = find_med(0, nums1.length-1, nums1, nums2, (nums1.length+nums2.length-1)/2, true) || find_med(0, nums2.length-1, nums2, nums1, (nums1.length + nums2.length-1)/2,true);
        if(median == null){
            find_med(0, nums1.length-1, nums1, nums2, (nums1.length+nums2.length-1)/2, false) || find_med(0, nums2.length-1, nums2, nums1, (nums1.length + nums2.length-1)/2,false);
        }
    }
    console.log(median);
    return median;

    // k is the total number of elements larger than the median in both the arrays combined
    function find_med(start, end, main_arr, secondary_arr, k, greater_than_logic_used){ 
        if(start > end){
            return null;
        }
        let mid = start + Math.floor((end-start)/2);
        if(greater_than_logic_used == true){
            let first_element_larger_than_mid = bs(0,secondary_arr.length-1, secondary_arr, main_arr[mid]);
            // if there are exactly k elements larger than/equal to a particular element in both the arrays combined, it is our median element
            if((main_arr.length - 1 - mid) + (secondary_arr.length - first_element_larger_than_mid) == k){
            return main_arr[mid];
            }
            // else if there are more than k elements larger than a particular element, the median lies on the right half of this particular element
            else if((main_arr.length - 1 - mid) + (secondary_arr.length - first_element_larger_than_mid) > k){
                return find_med(mid+1, end, main_arr, secondary_arr, k, greater_than_logic_used);
            }
            else if((main_arr.length - 1 - mid) + (secondary_arr.length - first_element_larger_than_mid) < k){
                return find_med(start, mid-1, main_arr, secondary_arr, k, greater_than_logic_used);
            }
            else return null;
        }
        // when <= logic is used to find the median(for cases like arr1: [2,2,4,4], arr2: [2,2,4,4])
        else{
            let last_element_smaller_than_mid = bs_less_than(0, secondary_arr.length-1, secondary_arr, main_arr[mid]);
            // if there are exactly k elements smaller than/equal to a particular element in both the arrays combined, it is our median element
            if((mid) + (last_element_smaller_than_mid + 1)){
                return main_arr[mid];
            }
            else if((mid) + (last_element_smaller_than_mid + 1) > k){
                return find_med(start, mid-1, main_arr, secondary_arr, k, greater_than_logic_used);
            }
            else if((mid) + (last_element_smaller_than_mid + 1) < k){
                return find_med(mid+1, end, main_arr, secondary_arr, k, greater_than_logic_used);
            }
            else return null;
        }
    } 

    // returns the index of the first element >= k
    function bs(start, end, arr, k){
        if(start > end){
            return arr.length;
        }
        let mid = start + Math.floor((end-start)/2);
        if((arr[mid] >= k && arr[mid-1] < k) || (arr[mid] >= k && mid == 0)){
            return mid;
        }
        else if(arr[mid] < k){
            return bs(mid+1, end, arr, k);
        }
        else if(arr[mid] >= k){
            return bs(start, mid-1, arr, k);
        }
    }

    // returns the index of the last element <= k
    function bs_less_than(start, end, arr, k){
        if(start > end){
            return -1
        }
        let mid = start + Math.floor((end-start)/2);
        if(arr[mid] <= k && arr[mid+1] > k || (arr[mid] <= k && mid == arr.length-1)){
            return mid;
        }
        else if(arr[mid] > k){
            return bs_less_than(start, mid-1, arr, k);
        }
        else if(arr[mid] <= k){
            return bs_less_than(mid+1, end, arr, k);
        }
    }
}

class TimeMap {
    constructor(){
        this.time_stamp = new Map();
        this.value = new Map();
    }
    set(key, value, timestamp) {
        if(this.value.has(key)){
            this.value.get(key).push(value);
            this.time_stamp.get(key).push(timestamp);
        }
        else{
            this.time_stamp.set(key, [timestamp]);
            this.value.set(key, [value]);
        }
    }

    get(key, timestamp){
        if(!this.value.has(key)){
            return "";
        }
        let bs = (start, end) => {
            if(start > end){
                return -1
            }
           let mid = start + Math.floor((end - start)/2);
            if(this.time_stamp.get(key)[mid] <= timestamp && this.time_stamp.get(key)[mid+1] > timestamp){
                return mid;
            }
            else if(!(this.time_stamp.get(key)[mid] <= timestamp) && this.time_stamp.get(key)[mid-1] <= timestamp){
                return mid-1;
            }
            else if(this.time_stamp.get(key)[mid+1] <= timestamp){
                return bs(mid+1, end);
            }
            else if(!(this.time_stamp.get(key)[mid] <= timestamp)){
                return bs(start, mid-1);
            }
            else{
                return -1;
            }
        }
        let ind = bs(0, this.time_stamp.get(key).length -1);
        if(ind == -1){
            return this.value.get(key)[this.value.get(key).length - 1];
        }
        else{
            return this.value.get(key)[ind];
        }
    }
}

function search_lc_704(nums, target){
    let ind = bs(0, nums.length-1);
    console.log(ind ?? -1);
    return ind ?? -1;

    function bs(start, end){
        let mid = start + Math.floor((end - start)/2);
        if(nums[mid] == target){
            return mid;
        }
        else if((nums[mid] < target && nums[mid + 1] > target) || (nums[mid] > target && nums[mid-1] < target) || start >= end){
            return -1;
        }
        else if(nums[mid] > target){
            return bs(start, mid-1);
        }
        else if (nums[mid] < target){
            return bs(mid + 1, end);
        }
    }
}

function singleNonDuplicate(nums){
    let pairsPossible = Math.floor(nums.length/2);
    let res = binarySearch(0, nums.length-1, pairsPossible);
    console.log(res);
    return res;

    function binarySearch(left, right, pairs){
        // exit condition
        if(left > right){
            return -1
        }

        let mid = left + Math.floor((right-left)/2);
        // if mid element is different from its neighbours, it is the unique element
        if(nums[mid] != nums[mid-1] && nums[mid] != nums[mid+1]){
            return nums[mid];
        } 
        // Note: lets say that there are n elements on either side of mid(there will always be equal no of elements on both sides); One half of search space will have Math.floor(n/2) pairs  + 1 unique element(excluding the middle element), the other half will have (Math.floor(n/2) + 1) pairs (including the middle element); This info can we used to eliminate half the search space; 

        // find the elements on either side of the middle element
        let elementOnLeftHalf = mid-left;
        let elementOnRightHalf = right-mid;

        // middle element will form a pair with a neighbouring element on either side; that is one less total pairs;
        // once middle pair is taken out of the total pairs possible, there are two cases, either remaining number of pairs will be equally distributed on both sides(remaining pairs = even) or one side will have one more pair than the other(remaining pairs = odd); we calculate both the lower and the higher count of pairs
        let lowerPairCount = Math.floor((pairs-1)/2);
        let higherPairCount = pairs-1-lowerPairCount;
        // if mid element's duplicate is on its right, we 
        if(nums[mid] == nums[mid+1]){
            // right search space now has one less element because the middle element formed a pair with the adjacent right element
            elementOnRightHalf--;
            // if left side can accomodate higherPairCount number of pairs; there is no way it has a single unique element
            if(elementOnLeftHalf == higherPairCount * 2){
                // search right half for the lowerPairCount number of pairs; this half has lowerCountPair number of pairs + 1 unique element; mid+2 is to account for the element that formed a pair with the mid element
                return binarySearch(mid+2, right, lowerPairCount);  
            }
            // else if right side can accomodate higherPairCount number of pairs; there is no way it has a single unique element
            else{
                //  search the left half for lowerPairCount number of pairs; this half has lowerCountPair number of pairs + 1 unique element
                return binarySearch(left, mid-1, lowerPairCount);
            }
        }  
        // else if mid element's duplicate is on its left
        else{
            // right search space now has one less element because the middle element formed a pair with the adjacent right element
            elementOnLeftHalf--;
            // if right side can accomodate higherPairCount number of pairs; there is no way it has a single unique element
            if(elementOnRightHalf == higherPairCount * 2){
                 // search left half for the lowerPairCount number of pairs; this half has lowerCountPair number of pairs + 1 unique element; mid-2 is to account for the element that formed a pair with the mid element
                return binarySearch(left, mid-2, lowerPairCount);
            }
            // else if right side can accomodate higherPairCount number of pairs; there is no way it has a single unique element
            // search the left half for lowerPairCount number of pairs; this half has lowerCountPair number of pairs + 1 unique element
            else return binarySearch(mid+1, right, lowerPairCount);
        }
    }
}

function maximumCandies(candies, k){
    // min candies in a pile is k piles with 1 candy each
    let min = 1;
    // max candies in a pile is summation of all candies divided by k;
    let max = 0;
    for(let i = 0; i < candies.length; i++){
        max += candies[i]
    }
    // early exit; not enough candies for k kids
    if(max < k){
        return 0
    }
    max = Math.floor(max/k);

    let maxCandies = binarySearch(min, max);
    console.log(maxCandies);
    return maxCandies;

    // helper function that does the binary search
    function binarySearch(min, max){
        if(min > max){
            return -1
        }
        let mid = min + Math.floor((max-min)/2);
        let isCurrentPileValid = isValidPileSize(mid);
        let isSmallerPileValid = isValidPileSize(mid-1);
        let isLargerPileValid = isValidPileSize(mid+1);
        // if current pilex size is valid and a pile larger by just one unit is invalid, this is the largest sized pile
        if(isCurrentPileValid && !isLargerPileValid){
            return mid
        }
        // if the current pile size is invalid and a pile smaller in size by just one unit is valid, the smaller pile is the largest sized valid pile
        else if(!isCurrentPileValid && isSmallerPileValid){
            return mid-1
        }
        else if(isCurrentPileValid && isSmallerPileValid){
            return binarySearch(mid+1, max);
        }
        else if(!isCurrentPileValid && !isLargerPileValid){
            return binarySearch(min, mid-1);
        }
    }
    // helper function that checks validity of a pile size
    function isValidPileSize(pileSize){
        let pilesCount = 0;
        for(let i = 0; i < candies.length; i++){
            // early exit if k piles are already formed
            if(pilesCount >= k){
                return true
            }
            // if the current pile size is smaller than the pile size we are given, skip this pile since we cannot merge candies from different piles together
            if(candies[i] < pileSize){
                continue;
            }
            // else check how many piles of the given pile size can be made out of our current pile, and add the count to total
            else{
                pilesCount += Math.floor(candies[i]/pileSize);
            }
        }
        // if k or higher number of piles are possible to be formed, return true
        if(pilesCount >= k){
            return true
        }
        // else return false
        else return false
    }
}

function shipWithinDays (weights, days){
    // order of shipments is important, do not sort
    // min capacity is the heaviest weight on the conveyor belt; if this were the capacity,  it would  take at most n days to ship all the shipments
    // max capacity is the summation of all the weights on the conveyor belt; if this were the capacity, it would take 1 day to ship everything
    let min = Number.MIN_SAFE_INTEGER;
    let max = 0;
    for(let i = 0; i < weights.length; i++ ){
        max = max + weights[i]
        min = Math.max(min, weights[i]);
    }
    let capacity = binarySearch(min, max);
    console.log(capacity);
    return capacity;

    function binarySearch (min, max){
        if(min > max){
            return null;
        }
        let mid = min + Math.floor((max-min)/2);
        let isCurrentCapacityValid = isValidCapacity(mid, days);
        let isLowerCapacityValid = isValidCapacity(mid-1, days);
        let isHigherCapacityValid =  isValidCapacity(mid+1, days);
        // we are looking for a capacity such that it's good enough to deliver all the shipments in allocated days, but just 1 unit of capacity lower than this capacity would render the given days as insufficient; 
        // we want the first valid capacity that allows shipments to be completed in the  given number of days afterall; think about this.
        if(isCurrentCapacityValid == -1 && isLowerCapacityValid == 1){
            return mid;
        }
        else if(isCurrentCapacityValid == 1 && isHigherCapacityValid == -1){
            return mid+1;
        }
        // if current capacity is sufficient and a capacity higher than current by just one unit of capacity is also sufficient, we search the left half of the search space
        else if((isCurrentCapacityValid == -1 && isHigherCapacityValid == -1)){
            return binarySearch(min, mid-1)
        }
        // if current capacity is insufficient and a capacity lower than current by just one unit of capacity is also insufficient, we search the right half of the search space
        else if(isCurrentCapacityValid == 1 && isLowerCapacityValid == 1){
            return binarySearch (mid+1, max)
        }
    }
    // helper
    function isValidCapacity(capacity, days){
        let total = 0;
        let daysElapsed = 1;
        let trav = 0;
        // if for a given capacity, more days get elapsed than necessary, we have an invalid capacity; if fever days than necessary get elapsed, we have toomuch capacity and that is invalid too.
        while(trav < weights.length){
            // if ship capacity needs to be increased, return positive one and exit early
            if(daysElapsed > days){
                return 1
            }
            // if addition of current weight would not exceed capacity, add the weight
            if(total + weights[trav] <= capacity){
                total += weights[trav];
            }
            // otherwise we add it to be shipped the next day
            else{
                // if the weight is larger than the capacity itself, we exit 
                if(weights[trav] > capacity){
                    return 1;
                }
                daysElapsed++;
                total = weights[trav];
            }
            trav++;
        }
        // if the capacity is so high that it takes fewer days than specified in the problem to ship all the goods, there is room to decrease the ship capacity. return -1 to  signify that
        // a point to note is that even if it takes the exact amount of days as given in the problem, it does not necessarily means there is no room to decrease the capacity of the ship. Example: [1,2,3,4,5,6,7,8,9,10], days: 5; for ship capacity 17, it would take exactly 5 days. but the minimum capacity is 15 not 17.
        if(daysElapsed <= days){
            return -1
        }
        else{
            return 1;
        }
    }
}

function searchMatrixTwo(matrix, target){
    let rowStart = null;
    let rowEnd = null;
    let colStart = null;
    let columnEnd = null;

    // eliminate the rows depending on whether the target could exist in the range of its two extremes
    for(let i = 0; i < matrix.length; i++){
        // if the target is in range defined by the samllest element of the row and the largest element of the row
        if(target >= matrix[i][0] && target <= matrix[i][matrix[i].length - 1]){
            // initialise the start row and end row of the matrix to be searched
            if(rowStart == null){
                rowStart = i;
                // row end needs to be initialised as well because there are instances where only one row qualififes
                rowEnd = i;
                continue
            }
            rowEnd = i;
        }
    }
    
    // if some eligible rows were found in the matrix, from these rows, eliminate the colums that cannot have the target; again, use the edge elements to see if a target element could pe present in that range
    if(rowStart != null && rowEnd != null){
        for(let i = 0; i < matrix[0].length; i++){
            // if target is in the range defined by the smallest and the largest element of a particular column in an eligible row
            if(target >= matrix[rowStart][i] && target <= matrix[rowEnd][i]){
                // initialise the coliumn start and column end of the matrix to be searched
                if(colStart == null){
                    colStart = i;
                    columnEnd = i;
                    continue;
                }
                columnEnd = i;
            }
        }
    }
    // init result to null bacause that's what the helper returns if no match is found
    let result = null;
    // if eigible columns were found, search the matrix bounded by these rows and columns
    if(colStart != null && columnEnd != null){
        for(let i = rowStart; i <= rowEnd; i++){
            result = standardBinarySearch(matrix[i], target, colStart, columnEnd);
            if(result != null){
                result = true;
                break
            }
        }
    }
    console.log(result == null ? false : true);
    return result == null ? false : true;

    // helper
    function standardBinarySearch(arr, target, start, end){
    let middle = start + Math.floor((end-start)/2);
    if(arr[middle] == target){
        return middle;
    }
    else if(start >= end){
        return null;
    }
    else if(target < arr[middle]){
        return standardBinarySearch(arr, target, start, middle-1);
    }
    else{
        return standardBinarySearch(arr, target, middle+1, end)
    }
}
}

function searchMatrix (matrix, target){
    let result = binarySearch(0, matrix.length-1)
    console.log(result);
    return result
   
    function binarySearch(topRow, bottomRow){
        // exaustively searched without a match => exit with a false
        if(topRow > bottomRow){
            return false
        }
        // else binary search
        let middleRow = topRow + Math.floor((bottomRow-topRow)/2);
        // if either edge element matches target, return true and exit early
        if(target == matrix[middleRow][0] || target == matrix[middleRow][matrix[middleRow].length-1]){
            return true
        }
        // els if target could lie between the extremes of the middle row
        else if(target > matrix[middleRow][0] && target < matrix[middleRow][matrix[middleRow].length -1]){
            // standard binary search the middle row for target
            let result = standardBinarySearch(matrix[middleRow], target, 0, matrix[middleRow].length-1);
            if(result != null){
                return true
            }
            else return false
        }
        // else if target smaller than the smallest element of the row
        else if(target < matrix[middleRow][0]){
            // search the upper half of the matrix
            return binarySearch(topRow, middleRow-1);
        }
        // else search the lower half of the matrix
        else{
            return binarySearch(middleRow+1, bottomRow);
        }
    }
}

function firstBad(n, bad){
    let firstBad = bs(1, n);
    console.log(firstBad);
    return firstBad;

    function isBadVersion(ver){
        if(ver >= bad){
            return true
        }
        else return false
    }
    
    function bs(start, end){
        let mid = start + Math.floor((end-start)/2);
        let is_mid_bad = isBadVersion(mid);
        let is_next_bad = isBadVersion(mid+1);
        let is_prev_bad = isBadVersion(mid-1);
        if(is_mid_bad && !is_prev_bad){
            return mid;
        }
        else if(!is_mid_bad && is_next_bad){
            return mid+1;
        }
        else if(is_mid_bad && is_prev_bad){
            return bs(start, mid-1);
        }
        else if(!is_mid_bad && !is_next_bad){
            return bs(mid + 1, end);
        }
    }
}

function searchSorted(nums, target){
    let result = binarySearch(0, nums.length-1);
    console.log(result);
    return result

    function binarySearch(left, right){
        let middle = left + Math.floor((right-left)/2);
        // if middle lands at target, return true  
        if(nums[middle] == target){
            return true
        }
        // if search space exahaustively covered without a match, return false
        else if(left >= right){
            return false
        }
        // else we find which half of the entire subarray does not have shifted elements
        else{
            // if the left edge element is smaller than the middle element, left half is definitely unaffected by the shift
            if(nums[left] < nums[middle]){
                // if target is greater than left, and smaller than middle then search the unaffected left half
                if(target >= nums[left] && target < nums[middle]){
                    // search the left half
                    return binarySearch(left, middle-1);
                }
                // else search the right half
                else return binarySearch(middle+1, right);
            }
            // if the right edge element is larger than the middle element, right half is definitely unaffected by the shift
            else if (nums[right] > nums[middle]){
                // if the target is larger than middle and smaller than the right edge element
                if(target > nums[middle] && target <= nums[right]){
                    // search the right half
                    return binarySearch(middle+1, right)
                }
                // else search the left half
                else return binarySearch(left, middle-1)
            }

            // else the edge elements are equal to the middle element
            else{
                // and we use two pointers to find the first element not equal to the middle. It will reveal which half is unaffected by the shift
                let leftTrav = left+1;
                let rightTrav = right-1;
                // while both edge pointers are still pointing at values equal to the middle value
                while(nums[leftTrav] == nums[middle] && nums[rightTrav] == nums[middle]){
                    leftTrav++;
                    rightTrav--;
                }
                // find the unique element's index
                let uniqueIndex = nums[leftTrav] != nums[middle] ? leftTrav : rightTrav;
                // if the first unique element was found on the right side of the middle, every element between left edge and middle has to be a duplicate of the middle element; this is clear when you observer the edge case => [1,1,1,1,0,1]; 
                if(uniqueIndex > middle){
                    // since the middle element is not our target, and eveything on its left is a duplicate of it, we search the right half
                    return binarySearch(middle+1, right)
                }
                // else the first unique element was found on the left  side of the middle, and every element between middle and the right edge is a duplicate of the middle element: [1,0,1,1,1,1]
                // since the middle element is not our target, and everything on the right is a duplicate, we search the left half
                else return binarySearch(left, middle-1);
            }
        }
    }
}

function peakIndexInMountainArray(arr){
    function binarySearch(left, right){
        let middle = left + Math.floor((right-left)/2);
        // if pred and succ are both smaller than curr, we found peak
        if(arr[middle-1] < arr[middle] && arr[middle+1] < arr[middle]){
            return middle;
        }
        // if middle landed on a leftward slope; the peak is on the right
        else if(arr[middle+1] > arr[middle] || arr[middle-1] < arr[middle]){
            return binarySearch(middle+1, right);
        }
        // else it landed on a rightward slope; the peak is on the left
        else{
            return binarySearch(left, middle-1);
        }
    }
    let result = binarySearch(0, arr.length-1);
    console.log(result);
    return result
}

function findClosestElements (arr, k, x){
    // if the target element is smaller than the smallest element
    if(x < arr[0]){
        return arr.slice(0, k);
    }
    // else if target is greater than the largest element
    else if(x > arr[arr.length-1]){
        return arr.slice(arr.length - k, arr.length)
    }
    // else when the target element has to be in between the extremes of the given array
    else {
       let target_index = standardBinarySearch(arr, x, 0, arr.length - 1);
       // if you did not find the element itself, you will have to find the closest element;
       if(target_index == null){
            target_index = findClosestToTarget(arr, x, 0, arr.length-1);
       }
       console.log(target_index);
    // now we want to slice off an array such that its elements are closest to element at the target index, which will be the target itself, or the element closest to target; Use two pointers for this
       let start_index = target_index;
       let end_index = target_index;
       let count = 1;
    //    while our array edges aren't k elements apart
       while(count != k){
        // if start index becomes zero we can't decrement it any further; the remaining closest elements will be added from the right
        if(start_index == 0){
            end_index++;
            count++;
            continue;
        }
        // similarly if the end index reaches the last element, any additional closest elements will be added from the left;
        if(end_index == arr.length-1){
            start_index--;
            count++;
            continue;
        }
        // calulate the distance of target from predecessor and from successor
        let right_dist = arr[end_index + 1] - x;
        let left_dist = x - arr[start_index - 1];
        // if the left distance is larger; add the successor because that is closer to target
        if(left_dist > right_dist){
            end_index++;
            count++
        }
        // other wise add the predecessor
        else{
            start_index--;
            count++;
        }
       }
       return arr.slice(start_index, end_index+1)
    }
}

function findMin(nums){
   let min = bs(0, nums.length-1);
   console.log(min);
   return min;

   function bs(start, end){
    if(nums[start] < nums[end]){
        return nums[start];
    }
    let mid = start + Math.floor((end-start)/2);
    if(nums[mid] < nums[mid-1]){
        return nums[mid];
    }
    else if(nums[start] < nums[mid]){
        return bs(mid+1, end);
    }
    else return bs(start, mid-1);
   }
}

function search (nums, target){

    function binarySearch(left, right){
        // find the middle index
        let middle = left + Math.floor((right - left)/ 2);
        // if we found the target, return its index
        if(nums[middle] == target){
            return middle
        }
        // if we exhausted the search space without a result, return -1
        else if(left >= right){
            return -1
        }
        // else
        // if our middle pointer landed in a subarray that has rotated elements
        if(nums[left] > nums[middle] || nums[right] < nums[middle]){
            // one side of the middle element will have elements unaffected by the shift; this is the only side we can confidently remove if target is not present in it; the other side that's affected by the shift, we cant be sure if our element is in it or not, so can't confidently remove it either

            // if subarray on the left of the middle is unaffected by the shift
            if(nums[left] <= nums[middle]){
                // we check if the target lies in it
                if(target >= nums[left] && target < nums[middle]){
                    // if it does, our new search space is the subarray on the left
                    return binarySearch(left, middle-1);
                }
                // else we search the affected right hand side of the middle element
                else{
                    return binarySearch(middle+1, right)
                }
            }
            // else the subarray on the right is unaffected by the shift => nums[right] > nums[middle]
            else{
                // and we check if the target lies in this subarray
                if(target > nums[middle] && target <= nums[right]){
                    return binarySearch(middle+1, right)
                }
                // else we search the affected subarray on the left hand side
                else{
                    return binarySearch(left, middle - 1);
                }
            }
        }
        // else our middle pointer landed in a non affected portion of the array
        else {
            // perform a regular binary search
            if(target < nums[middle]){
                return binarySearch(left, middle - 1);
            }
            else {
                return binarySearch(middle+1, right);
            }
        }
    }
    let result = binarySearch(0, nums.length-1);
    console.log(result);
    return result;
}

// helper function; returns the index of the target element or null if the target does not exist
function standardBinarySearch(arr, target, start, end){
    let middle = start + Math.floor((end-start)/2);
    if(arr[middle] == target){
        return middle;
    }
    else if(start >= end){
        return null;
    }
    else if(target < arr[middle]){
        return standardBinarySearch(arr, target, start, middle-1);
    }
    else{
        return standardBinarySearch(arr, target, middle+1, end)
    }
}
// helper function; returns the index of the closest element to the target when the target itself does not exist
function findClosestToTarget (arr, target, start, end){
    let middle = start + Math.floor((end-start)/2);
    // if you find an elements such that it is larger than the target and its predecessor is smaller than target, one of these two elements will be the closest element to our target
    if(arr[middle] > target && arr[middle-1] < target){
        let left_distance = target - arr[middle-1];
        let right_distance = arr[middle] - target;
        // if the predecessor is at a higher distance away than the right element
        if(left_distance > right_distance){
            // current element is the closest element
            return middle;
        }
        // for equal and larger right distanc,  predecessor element is the closest element
        else return middle-1;
    }
    // amother base condition; your middle lands at an element smaller than the target and its successor is larger than the target;
    else if(arr[middle] < target && arr[middle+1] > target){
        let left_dist = target - arr[middle];
        let right_dist = arr[middle+1] - target;
        // if the current element is at a higher distance from target than the successor element
        if(left_dist >right_dist){
            // then successor element is the closest element
            return middle+1
        }
        // for equal and larger right distance, current element is the closest element
        else return middle
    }

    // if the middle pointer lands at an element that is larger than target but it's predeccessor is also larger than target
    else if(arr[middle] > target && arr[middle-1] > target){
        // we search the left half because the elements in the right half will all be larger than the target and we are not finding an element that is smaller than target in that range
        return findClosestToTarget(arr, target, start, middle-1);
    }
    // else if the middle lands at an element that is smaller than the target and its successor is also smaller than the target
    else if (arr[middle] < target && arr[middle+1] < target){
        // we will search in the right 
        return findClosestToTarget(arr, target, middle+1, end);
    }
}