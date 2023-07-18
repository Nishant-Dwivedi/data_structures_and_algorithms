// search([3, 5, 1], 3)
// findMin([4,5,6,7,0,1,2])

// ...................................................................................................................................................................

function findMin(nums){
    // if the array contains no shifted elements, or if the array has only one element => return the first element
    if(nums[0] < nums[nums.length1-1] || nums.length == 1){
        return nums[0];
    }

    function binarySearch (left, right){
        let middle = left + Math.floor(((right-left)/2));
        // the smallest element is the pivot element arount which the shift happened; it's the only element whose predecessor is larger than it.
        if(nums[middle-1] > nums[middle]){
            return nums[middle];
        }
        if(left >= right){
            return -1
        }
        // if our middle lands in a subarray that's affected by the rotation
        if(nums[left] > nums[middle] || nums[right] < nums[middle]){
            // remove the unaffected part from our search space and search for target in the affected subarray
            // why? because the unaffected subarray is going to have elements in increasing order and you have better chances of finding a girlfriend than finding an element whose predecessor is greater that it in this subarray.
            if(nums[left] <= nums[middle]){
                return binarySearch(middle+1, right)
            }
            else{
                return binarySearch(left, middle-1);
            }
        }
        // else our middle landed in a subarray unaffected by the shift that has elements in increasing order;
        else{
            // we dont even have to search in this case; we can return the smallest element of this subarray
            return nums[left]
        }
    }
    let result = binarySearch(0, nums.length - 1);
    console.log((result));
    return result;
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