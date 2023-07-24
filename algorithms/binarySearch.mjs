// Questions solved: 9
// search([3, 5, 1], 3)                                                                                    //LC: 33  medium
// findMin([4,5,6,7,0,1,2])                                                                                //LC: 153 medium 
// console.log(findClosestElements([1,3], 1, 2));                                                          //LC: 658 medium  #good question
// peakIndexInMountainArray([3,5,3,2,0])                                                                   //LC: 852 medium
// searchSorted([1,1,1,1,1,1,1,1,1,1,1,1,1,2,1,1,1,1,1], 2)                                                //LC: 81  medium
// firstBad(500, 30)                                                                                       //LC: 278 easy
// searchMatrix( [[1,3]], 3)                                                                               //LC: 74  medium
// searchMatrixTwo([[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], 17)      //LC: 240 medium
// searchMatrixTwo([[-5]], -2)
// ...................................................................................................................................................................

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
    let counter = 0
    function isBadVersion(version){
        if(version >= bad){
            counter++;
            return true
        }
        else {
            counter++
            return false
        }
    }

    function findFirstBad(left, right) {
      let middle = left + Math.floor((right-left)/2);
      let isCurrBad = isBadVersion(middle);
      let isPrevBad = isBadVersion(middle-1);
      let isNextBad = isBadVersion(middle+1);

      if(isCurrBad == true){
        if(isPrevBad == false){
            return middle
        }
        else{
            return findFirstBad(left, middle-1)
        }
      }
      else{
        if(isNextBad == true){
            return middle+1;
        }
        else{
            return findFirstBad(middle+1, right);
        }
      }
      
    }
    let result = findFirstBad(1, n);
    console.log(result, counter);
    return result;
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