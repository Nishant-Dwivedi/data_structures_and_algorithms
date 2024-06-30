// QUESTIONS SOLVED (16)
// secondLargestElement([1,2,3,4,5])                          //GFG question 
// containsDuplicate([1,2,3,1])                               //LC 217 easy
// twoSum(nums, target)                                       //LC 1 easy
// setZeroes([[0,0,0,0 ], [0,4,5,2], [0,3,1,5]])              //LC 73 medium
// rotateImage([[1,2,3],[4,5,6],[7,8,9]])                     //LC 48 medium  *
// nextPermutation ([1,3,2])                                  //LC 31 medium  *
// longestConsecutive([100,4,200,1,3,2])                      //LC 128 medium *
// findDuplicates([4,3,2,7,8,2,3,1])                          //LC 442 medium
// missingNumber([9,6,7,2,3,5,8,0,4])                         //LC 268 easy
// majorityElement([2,2,1,1,1,2,2])                           //lc 169 easy
// insert([[1,5]], [6,8])
// merge([[1,4],[0,0]])
// employeeFreeTime([[1,2,5,6],[1,3],[4,10]])
// longestPalindrome("abccccdd");
// spiralOrder([[1,2,3],[4,5,6],[7,8,9]])
// isValidSudoku()
// print_star()
// ..................................................................................................................................................................................

function print_star(height){
    let start_ind = Math.floor(height/2);
    let end_ind = Math.floor(height/2);
    for(let i = 0; i < height/2; i++){
        let str = ""
        for(let j = 0; j < height; j++){
            if(j < start_ind || j > end_ind){
               str = str.concat(" ");
            }
            else{
                str = str.concat("#");
            }
        }
        console.log(str);
        start_ind--;
        end_ind++;
    }
}

function isValidSudoku (board){
    let is_valid = true;
    let row_map = new Map();
    let col_map = new Map();
    for(let i = 0; i < 9; i++){
        row_map.set(i, new Array(9));
        col_map.set(i, new Array(9));
    }
    let mini_board_map = new Map();
    for(let i = 0; i < board.length; i++){
        for(let j = 0; j < board[0].length; j++){
            if(board[i][j] == "."){
                continue;
            }
            // check if the current element isn't unique in its row/col
            if(row_map.get(i).includes(board[i][j])){
                is_valid = false;
                break;
            }
            else{
                row_map.get(i).push(board[i][j]);
            }
            if(col_map.get(j).includes(board[i][j])){
                is_valid = false;
                break;
            }
            else{
                col_map.get(j).push(board[i][j]);
            }
            // check if the current element isn't unique in its mini 3x3 board
            let mini_boards_row = Math.floor(i/3);
            let mini_boards_col = Math.floor(j/3);
            if(mini_board_map.has(`${mini_boards_row},${mini_boards_col}`)){
                if(mini_board_map.get(`${mini_boards_row},${mini_boards_col}`).has(board[i][j])){
                    is_valid = false;
                    break;
                }
                else{
                    mini_board_map.get(`${mini_boards_row},${mini_boards_col}`).add(board[i][j]);
                }
            }
            else{
                mini_board_map.set(`${mini_boards_row},${mini_boards_col}`, new Set().add(board[i][j]));
            }
        }
        if(is_valid == false){
            break;
        }
    }
    console.log(is_valid);
    return is_valid;
}


function spiralOrder(matrix){
    // [x, y]: right [1,0], down [0,-1], left [-1,0], up [0, 1];
    let movement = [1, 0];
    let res = [];
    let row = 0;
    let col = 0;
    let right_boundary = matrix[0].length;
    let bottom_boundary = matrix.length;
    let left_boundary = -1;
    let top_boundary = -1;
    
    let elements_processed = 0;
    while(elements_processed < matrix.length * matrix[0].length){
        res.push(matrix[row][col]);
        elements_processed++;
        // traverse rightwards
        if(movement[0] == 1 && movement[1] == 0){
            if(col + 1 == right_boundary){
                movement = [0, -1];
                top_boundary++;
                row++;
                continue
            }
            else col++;
        }
        // traverse downwards
        else if(movement[0] == 0 && movement[1] == -1){
            if(row + 1 == bottom_boundary){
                movement = [-1, 0];
                right_boundary--;
                col--
                continue
            }
            else row++;
        }
        // traverse leftwards
        else if(movement[0] == -1 && movement[1] == 0){
            if(col - 1 == left_boundary){
                movement = [0, 1];
                bottom_boundary--;
                row--;
                continue;
            }
            else col--;
        }
        // traverse upwards
        else{
            if(row - 1 == top_boundary){
                movement = [1, 0];
                left_boundary++;
                col++;
                continue;
            }
            else row--;
        }
    }
    console.log(res);
    return res;
}


function longestPalindrome(s){
    let longest = 0;
    let odd_frq_char_count = 0;
    let map = new Map();
    for(let i = 0; i < s.length; i++){
        map.has(s.charAt(i)) ? map.set(s.charAt(i), map.get(s.charAt(i)) + 1) : map.set(s.charAt(i), 1);
        if(map.get(s.charAt(i)) % 2 == 0){
            odd_frq_char_count--;
            longest += 2;
        }
        else{
            odd_frq_char_count++;
        }
    }
    if(odd_frq_char_count > 0){
        longest++;
    }
    console.log( longest);
    return longest;
}
function employeeFreeTime(schedule){
    // get all the intervals in a single array
    let cumulative_schedule = [];
    for(let i = 0; i < schedule.length; i++){
        for(let j = 0; j < schedule[i].length; j += 2){
            cumulative_schedule.push([schedule[i][j], schedule[i][j+1]]);
        }
    }
    // sort that single array based on each interval's start time
    cumulative_schedule = cumulative_schedule.sort((a, b) => a[0] - b[0]);
    // merge overlapping intervals
    cumulative_schedule = merge(cumulative_schedule);
    // find the non-overlapping intervals
    let res = [];
    for(let i = 0; i < cumulative_schedule.length - 1; i++){
        res.push([cumulative_schedule[i][1], cumulative_schedule[i+1][0]])
    }
    console.log(res);
    return res
}

function merge (intervals){
    // sort based on interval's start time 
    intervals = intervals.sort((a, b) => {
        return a[0] - b[0];
    });
    let res = [];
    for(let i = 0; i < intervals.length; i++){
        let curr_int_start = intervals[i][0];
        let curr_int_end = intervals[i][1];
        for(let j = i+1; j <= intervals.length; j++){
        // if there's an overlap, expand the ith interval
            if(intervals[j] && intervals[j][0] <=  curr_int_end){
                curr_int_start = Math.min(curr_int_start, intervals[j][0]);
                curr_int_end = Math.max(curr_int_end, intervals[j][1]);
                // since there was a merger of intervals, we want i to start from j+1 in the next iteration if there are no further mergers; since a for loop will increment it by 1 before the next iteration starts, we set it to j to compensate
                i = j;
                continue;
            }
            // if there was no overlap, push the ith interval since it can no longer be expanded
            else{
                res.push([curr_int_start, curr_int_end]);
                // we want i to start from j in the next iteration; since a for loop will increment it by 1 before the next iteration starts, we set it to j-1 to compensate
                i = j-1;
                break;
            }
        }
    }
    // console.log(res);
    return res
}

function insert(intervals, newInterval){
    let res = [];
    let a = newInterval[0];
    let b = newInterval[1];
    let merged = false;
    let a1 = newInterval[0];
    let b1 = newInterval[1];
    if(intervals.length == 0){
        res.push([...newInterval]);
        console.log(res);
        return res;
    }
    for(let i = 0; i < intervals.length; i++){
        // if i'th interval ends before new interval starts
        if(intervals[i][1] < a){
            // push i'th interval
            res.push(intervals[i]);
        }
        // if i'th interval starts after new interval ends
        else if(intervals[i][0] > b){
            // push new interval and mark merged as true if the new interval hasn't been inserted already
            !merged ? res.push([a1, b1]) : null;
            merged = true;
            // push the i'th interval
            res.push(intervals[i]);
        }
        // else expand new interval and merge i'th interval
        else{
            a1 = Math.min(intervals[i][0], a1);
            b1 = Math.max(intervals[i][1], b1);
        }
        // if i points to the last interval and merger still isn't complete, push the new interval
        if(merged == false && i == intervals.length-1){
                res.push([a1, b1]);
            }
    }
    console.log(res);
    return res;
}

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
    let map = new Map();
    let set = new Set();
    let lcs = -1;
    // populate a map with elements and map them to a value of -1
    for(let i = 0; i < nums.length; i++){
        if(map.has(nums[i]) == false){
            map.set(nums[i], -1);
        }
    }
    for(let i = 0; i < nums.length; i++){
            // if current element has been visited already, move on
            if(set.has(nums[i])){
                continue;
            }
            //elsem we extend the sequence starting from the current element until it can no longer be extended
            let longest_curr_seq = 1;
            set.add(nums[i]);
            let nxt = nums[i] + 1;
            // loop over until we find an element which is the starting element of some other lcs, or isn't present in nums at all
            while(map.has(nxt) != false && map.get(nxt) == -1){
                set.add(nxt);
                longest_curr_seq++;
                nxt++;
            }
            // if nxt was pointing to an element which was the starting point of another lcs, its length will get added to current lcs'es length
            if(map.has(nxt) && map.get(nxt) != -1){
                longest_curr_seq += map.get(nxt);
            }
            // update the length of lcs starting with the current element in the map and update max lcs
            map.set(nums[i], longest_curr_seq);
            lcs = Math.max(lcs, longest_curr_seq);
    }
    console.log(lcs);
    return lcs;
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
    // find the transpose of the matrix(matrix[i][j] becomes matrix[j][i]);
    let jstartsfrom = 0
    for(let i = 0; i < matrix.length; i++){
        for (let j = jstartsfrom; j < matrix[i].length; j++){
            let temp = matrix[i][j];
            matrix[i][j] = matrix[j][i];
            matrix[j][i] = temp;
        }
        jstartsfrom++;
    }
    
    // rotate the rows
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
   for(let i = 0; i < matrix.length; i++){
    for(let j = 0; j < matrix[0].length; j++){
        if(matrix[i][j] == 0){
            for(let k = 0; k < Math.max(matrix.length, matrix[0].length); k++){
                if(k < matrix.length){
                    matrix[k][j] = matrix[k][j] != 0 ?  null: matrix[k][j];
                }
                if(k < matrix[0].length){
                    matrix[i][k] = matrix[i][k] != 0 ? null : matrix[i][k];
                }
            }
        }
    }
   }
   for(let i = 0; i < matrix.length; i++){
    for(let j = 0; j< matrix[0].length; j++){
        if(matrix[i][j] == null){
            matrix[i][j] = 0;
        }
    }
   }
   console.log(matrix);
   return
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

