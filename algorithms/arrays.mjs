// QUESTIONS SOLVED (12)

// quickSort([1,2,5,3,6,9], 0, 5)                             //standard quickSort Algorithm
// mergeSort([2,5,1,10,11])                                   //standard mergeSort Algorithm
// secondLargestElement([1,2,3,4,5])                          //GFG question 
// containsDuplicate([1,2,3,1])                               //LC 217 easy
// twoSum(nums, target)                                       //LC 1 easy
// setZeroes([[0,1,2,0],[3,4,5,2],[1,3,1,5]])                 //LC 73 medium
// rotateImage([[1,2,3],[4,5,6],[7,8,9]])                     //LC 48 medium  *
// nextPermutation ([1,3,2])                                  //LC 31 medium  *
// longestConsecutive([100,4,200,1,3,2])                      //LC 128 medium *
// findDuplicates([4,3,2,7,8,2,3,1])                          //LC 442 medium
// missingNumber([9,6,7,2,3,5,8,0,4])                         //LC 268 easy
// majorityElement([2,2,1,1,1,2,2])                           //lc 169 easy
// ..................................................................................................................................................................................

function majorityElement(nums){
    nums.sort((a,b) => a - b);
    let curr_num;
    let num_frq = 0;
    for(let i = 0; i < nums.length; i++){
        if(nums[i] == curr_num){
            num_frq++;
            if(num_frq > nums.length/2){
                console.log(curr_num);
                return curr_num;
            }
        }
        else{
            if(num_frq > nums.length/2){
                console.log(curr_num);
                return curr_num;
            }
            num_frq = 1;
            curr_num = nums[i];
        }
    }
}

function quickSort(arr, left, right){
    // if left and right pointers are equal or have crossed each other, we have no more partitioning left to do
    if(left >= right){
        return left;
    }
    // find a pivot to partition the array around
    let pivotIndex = Math.floor(Math.random() * (right+1 - left) + left);
    // call the partitioning function for the current pivot and save its final index after partitioning; this helper function does the actual heavy lifting
    let pivotsSortedIndex = partition(arr, pivotIndex, 0, arr.length-1);
    // sort the left hand side of the partitioned element
    quickSort(arr, left, pivotsSortedIndex-1);
    // sort the right hand side of the partitioned element
    quickSort(arr, pivotsSortedIndex+1, right);
    console.log(arr);
    return arr;
}

function partition(array, index, leftLimit, rightLimit){
    {
        // helper function for quickSort
        // this function gets a range denoted by leftLimit and rightLimit. It gets the index of the pivot element and it has to put the pivot element in its place.
        // this function does in-place swapping until element on the left of the pivot are smaller than it, and element on the right of it are larger than it.
    }
    let trav = leftLimit;
    let element = array[index];
    let currentPivotIdex = index;
    while(trav <= rightLimit){
        if(array[trav] == element){
            trav++;
            continue
        }
        else if(array[trav] < element){
            if(trav < currentPivotIdex){
                trav++
            }
            else{
                let nexttrav = Math.min(currentPivotIdex, trav);
                let temp = array[trav];
                array[trav] = array[currentPivotIdex];
                array[currentPivotIdex] = temp;
                currentPivotIdex = trav;
                trav = nexttrav;
            }
        }
        else{
            if(trav > currentPivotIdex){
                trav++
            }
            else{
                let nexttrav = Math.min(trav, currentPivotIdex);
                let temp = array[trav];
                array[trav] = array[currentPivotIdex];
                array[currentPivotIdex] = temp;
                currentPivotIdex = trav;
                trav = nexttrav;
            }
        }
}
return currentPivotIdex;
}

function missingNumber(nums){
    {
        // summation of 1 to n or 0 to n is: n * (n+1)/2. 
        // calculate the actual sum and subtract it from this summation. you'll get the missing number.this works because exactly one number is missing.this is the easier way.
        // below is the solution that does in-place swapping such that nums[i] = i+1, and at the end finds the index of zero because only zero can take place of the missing element without affecting the total sum; 
        //this also works but is kinda un-necessary when the question explicitly says only one element is missing between the range 0 to n.
    }
    let indexofzero = -1;
    // in-place swap the elements such that nums[i] == i + 1; while avoiding zero; 
    for(let i = 0; i < nums.length; i++){
        if(nums[i] == 0){
            continue;
        }
        if(nums[i] == i + 1){
            continue;
        }
        else{
           let temp = nums[nums[i]-1]
           nums[nums[i] - 1] = nums[i];
           nums[i] = temp;
           i--;
        }
    }
    // find the index of zero and return it incremented by 1;
    for(let i = 0; i < nums.length; i++){
        if (nums[i] == 0){
            indexofzero = i;
            console.log(i+1);
            break;
        }
    }
    return indexofzero+1
}



function findDuplicates (nums){
    {
        // the biggest hint is: the numbers are in the range 1-n, this usually means that if i move element values to their corresponding indexes, i'll have duplicate values which will encounter already existing values at their indexes while i attemp to swap it. these duplicates can be pushed to a result array and the index can be marked by using null.
        // the algorithm is quite simple:
        // => go from i: 0 to nums.length  
        // => if you encounter a null or a number that is already at its right position(value == index(adjusted for 0-indexed arrays, obviously))  => you continue  
        // => else swap current element with the element that is at current element's rightful position  
        // => i - - (because some elements will be swapped to any position between 0 and i-1, who's gonna check for their duplicates? You do not move forward until the element you swapped in at the current index is ALSO at its rightful position. i -- prevents the index from incrementing.)
    }
    let result = [];
    for(let i = 0; i < nums.length; i++){
        if(nums[i] == null || nums[i] == i+1){
            continue
        }
        if(nums[nums[i] - 1] == nums[i]){
            result.push(nums[i]);
            nums[i] = null;
        }
        else{
            let temp = nums[nums[i] - 1];
            nums[nums[i] - 1] = nums[i]
            nums[i] = temp;
            i--;
        }
    }
    console.log(result);
    return result;
}

function longestConsecutive (nums){
    {
        // optimal solution of linear time complexity O(n) is kinda tricky. super-linear complexity (O(nlogn)) algorithm is intuitive => sort the array and solve.
        // O(n) solution is more of a trick that's not very intuitive at first.
        // => we populate a hashset with all the numbers.
        // => we then look for numbers that represent the beginning of a range. for example, if in an input 2 exists,  3 can never be the element that represents the beginning of a consecutive range.
        // => so we iterate over the array and check for each element if element-1 exists in our input(hashset) or not
        // => if it does, we continue to the next element since there's no point in starting counting from this number, a smaller number already exists and we well count all the elements greater than the current number again if we dont skip the current number. waste of effort.
        // => else we calculate the size of the range and update the current largest range accordingly
    }
    let hashset = new Set();
    let currentLargestRange = 1;
    for (let i = 0; i < nums.length; i++){
        hashset.add(nums[i]);
    }
    for(let i = 0; i < nums.length; i++){
        if(hashset.has(nums[i] - 1)){
            continue
        }
        else{
            let rangeStillIntact = true;
            let startValue = nums[i] + 1;
            let range = 1;
            while(rangeStillIntact){
                if(hashset.has(startValue)){
                    range++;
                    startValue++;
                }
                else{
                    rangeStillIntact = false;
                    break;
                }
            }
            if(range > currentLargestRange){
                currentLargestRange = range
            }
        }
    }
    console.log(currentLargestRange);
    return currentLargestRange;
}

function nextPermutation (nums){
   {
    // cheap tricky question because of the in-place requirement. i tried this with hashset, it failed a testcase with duplicates. i tried storing indexes(which is in order when duplicates are present) but the in-place requirement requires modifying the array in a way that previously calculated indexes meant fuck all after the modification. I resorted to the cheap trick after feeling defeated.

    // here's the algo:
    // traverse from the end and find the strictly increasing range
    // the element right before the range starts (say at index i), will have the option to pick the next larger element in its place
    // find the first larger element in the range => swap with the element at index i
    // sort the range i+1 to nums.length => you can just reverse it since its already in decreasing order from the left
   }
   let index = -1;
   for(let i = nums.length-1; i >= 1; i--){
    if(nums[i-1] >= nums[i]){
        continue;
    }
    else{
        index = i-1;
        break;
    }
   }
   if(index != -1){
    for(let i = nums.length-1; i >= index; i--){
        if(nums[i] > nums[index]){
            let temp = nums[index];
            nums[index] = nums[i];
            nums[i] = temp;
            break
        }
       }
   }
   reverse(index+1, nums.length-1);
   console.log(nums);
   return 

   function reverse(startIndex, endIndex){
    if(startIndex >= endIndex){
        return
    }
    else{
        let temp = nums[startIndex];
        nums[startIndex] = nums[endIndex];
        nums[endIndex] = temp;
        reverse(startIndex+1, endIndex-1)
    }
   }
}

function rotateImage (matrix){
    {
        // find the transpose of the matrix(matrix[i][j] becomes matrix[j][i]);
        // switch last elements of each row
    }
    let jstartsfrom = 0
    for(let i = 0; i < matrix.length; i++){
        for (let j = jstartsfrom; j < matrix[i].length; j++){
            let temp = matrix[i][j];
            matrix[i][j] = matrix[j][i];
            matrix[j][i] = temp;
        }
        jstartsfrom++;
    }
    let i = 0;
    let j = matrix[0].length-1;
    while(i < j){
        for(let k = 0; k < matrix.length; k++){
            let temp = matrix[k][i];
            matrix[k][i] = matrix[k][j];
            matrix[k][j] = temp;
        }
        i++;
        j--
    }

    console.log(matrix);
    return
}

function setZeroes (matrix){
   {
    // start from beginning and mark the zero elements by changing them to null; O(n)
    // start again from the beginnnig, if you encounter a null  
        // loop over the corresponding row and column to make that rows/columns  non-null elements to zero and the one that triggered the loop .........O(n^2)
    // else just continue
    // last loop to change nulls to zero ............O(n)
   }
   for (let i = 0; i < matrix.length; i++){
    for(let j =0; j < matrix[i].length; j++){
        if(matrix[i][j] == 0){
            matrix[i][j] = null;
        }
    }
   }

   for(let i = 0; i < matrix.length; i++){
    for(let j = 0; j < matrix[i].length; j++){
        if(matrix[i][j] == null){
            for(let k = 0; k < matrix.length; k++){
                if(matrix[k][j] != null){
                    matrix[k][j] = 0;
                }
            }
            for(let l = 0; l < matrix[i].length; l++){
                if(matrix[i][l] != null){
                    matrix[i][l] = 0;
                }
            }
        }
    }
   }
   for(let i = 0; i < matrix.length; i++){
    for(let j = 0; j < matrix[i].length; j++){
        if(matrix[i][j] == null){
            matrix[i][j] = 0
        }
    }
   }
   console.log(matrix);
   return matrix
}


function twoSum(nums, target){
    {
        // use a hashMap for element:index pairs.
        // everytime you are at a new index, query the hashmap if a (target-currentvalue) exits already or not.
        // if such an element exists, return current index and that elements index and exit early.
    }
    let map = new Map();
    for(let i = 0; i < nums.length; i++){
        if(map.has(target - nums[i])){
            return [map.get(target-nums[i]), i]
        }
        else{
            map.set(target-nums[i], i);
        }
    }
    return [];
}

function containsDuplicate(nums) {
    let set = new Set();
    for (let i = 0; i < nums.length; i++){
        if(set.has(nums[i])){
            return true;
        }
        else {
            set.add(nums[i])
        }
    }
    return false
}

function mergeSort (array, startIndex = 0, endIndex){
    {
        // split the two arrays in half => left and right
        // sortedLeft = mergeSort(left)
        // sortedRight = mergeSort(right)
        // result = merge(sortedleft, sortedright)
        // return result
    }
    if(endIndex == null || endIndex == undefined){
        endIndex = array.length -1;
    }
    if(startIndex == endIndex){
        let element = array[startIndex]
        return [element];
    }
    // left array range => 0 -> leftLength-1
    let breakpointIndex = Math.floor((endIndex - startIndex)/2)
    let sortedLeft = mergeSort(array, startIndex, startIndex +breakpointIndex)

    // right array range => leftlength -> array.length-1
    let sortedRight = mergeSort(array, startIndex + breakpointIndex +1, endIndex)

    let result = mergeTwoSortedArrays(sortedLeft, sortedRight)
    console.log(result);
    return result
}

function mergeTwoSortedArrays(leftArray, rightArray) {
    {
        // standard two-pointer approach to merge two  already sorted arrays .
    }
    let result = [];
    let startingLeftIndex = 0;
    let startingRightIndex = 0;
    // while either index is in range
    while(startingLeftIndex <= leftArray.length -1 || startingRightIndex <= rightArray.length -1){
        let leftElement = leftArray[startingLeftIndex] ? leftArray[startingLeftIndex] : null;
        let rightElement = rightArray[startingRightIndex] ? rightArray[startingRightIndex] : null;
        if(leftElement == null && rightElement == null){
            break
        }
        else if(!leftElement){
            result.push(rightElement)
            startingRightIndex++
        }
        else if(!rightElement){
            result.push(leftElement)
            startingLeftIndex++
        }
        else if(leftElement < rightElement){
            result.push(leftElement)
            startingLeftIndex++
        }
        else{
            result.push(rightElement)
            startingRightIndex++
        }
    }
    return result

}


function secondLargestElement (array){
    {
            //well, you can search for the largest number and everytime you find a new largest number => make the previous largest your second largest. 
    }
    let largest = array[0];
    let secondLargest = array[0];
    for (let i =0; i < array.length; i++){
        if(array[i] > largest){
            secondLargest = largest;
            largest = array[i];
        }
    }
    console.log(secondLargest);
    return secondLargest;
}

