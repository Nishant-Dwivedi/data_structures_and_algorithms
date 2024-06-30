// ..................................................................................................................................................................................
// QUESTIONS SOLVED 9
// threeSum([-2,0,1,1,2])                                                //LC:15;  medium
// threeSumClosest([1,1,1,0], -100)                                       //LC:16;  medium *
// maxArea([1,1])                                                        //LC:11;  medium *
// sortColors([2,0,2,1,1,0])                                             //LC:75;  medium
// isSubsequence("axc", "ahbgdc")                                        //LC:392; easy
// sortedSquares([-5,-3,-2,-1])                                          //LC:977; easy
// rotate([1,2,3,4,5,6,7], 3)                                            //LC:189; medium *
// numRescueBoats([44,10,29,12,49,41,23,5,17,26], 50)                    //LC:881; medium
// moveZeroes([0,1,0,3,12])                                              //LC:283; easy
// canCompleteCircuit([1,2,3,4,5],[3,4,5,1,2])
// ..................................................................................................................................................................................

function canCompleteCircuit(gas, cost){
    gas = gas.concat(gas);
    cost = cost.concat(cost);
    let start = 0;
    let end = 0;
    let start_ind_found = false;
    let curr_net_gas = 0;
    let exhausted_all_indices = false;
    while((start_ind_found != true || exhausted_all_indices != true) && end < gas.length){
        // if end points at start, round trip is possible
        if(end == start + gas.length / 2){
            start_ind_found = true;
            break;
        }
        if(start >= gas.length/2){
            exhausted_all_indices = true;
            break;
        }
        // if it's possible to go to the next stop, go to the next stop and update net gas as necessary
        if(curr_net_gas + gas[end] - cost[end] >= 0){
            curr_net_gas += gas[end] - cost[end];
            end++;
            continue;
        }
        // else if you can't move to the next station 
        else{e
            // if start and end are pointing at the same index, start can't be shifted ahead
            if(start == end){
                start++;
                end++;
                curr_net_gas = 0;
                continue
            }
            // shift start 
            else{
                // while start is behind end and net gas is negative, shift left and update the net gasc
                while(start < end && curr_net_gas + gas[end] - cost[end] < 0){
                    curr_net_gas -= gas[start] - cost[start];
                    start++;
                }
            }
        }
    }
    if(start_ind_found){
        console.log(start);
        return start;
    }
    else{
        console.log(-1);
        return -1;
    }
}

function numRescueBoats(people, limit){
    people.sort((a,b) => a-b);
    // first pointer
    let left = 0;
    // second pointer
    let right = people.length-1;
    // boats count
    let count = 0;
    // while the left and right pointers have not crossed each other already
    while(right != left-1){
        // the last guy who will take a boat alone to the destination
        if(left == right){
            count++;
            break;
        }
        // if the lightest person can't partner up with the heaviest person due to their total weight being over the capacity, the heaviest person will take a boat by himself and the lighter person will try to pair up with someone else
        if(people[left] + people[right] > limit){
            count++;
            right--;
        }
        // else, two people will partner up and go
        else{
            left++;
            right--;
            count++
        }

    }
    console.log(count);
    return count
}

function rotate(nums, k){
        // if k % nums.length is zero, the shifted array will be identical to the input array
        k = k % nums.length;
        if(k == 0){
            console.log(nums);
            return nums;
        }
        let currentIndex = 0; 
        let currentValue = nums[0];
        // marking the start of a cycle. if you cycle back to this index, start a new cycle from index+1
        nums[0] = null;
        // we keep track of the number of elements moved to their shifted index
        let numberofswaps  = 0;
        let valueToBeReplaced;
        let indexToBeReplaced;

        // when total swaps become equal to the number of elements, we have to swap the process
        while(numberofswaps  != nums.length){
            // when we encounter a null, we have cycled back to where we started
            if(currentValue == null){
                // start a new cycle 
                currentIndex++;
                currentValue = nums[currentIndex];
                // mark the beginning of a new cycle
                nums[currentIndex] = null
                continue;
            }
            // find which index will my current element move to and save that index and its current value since they will be shifted next
            indexToBeReplaced = (currentIndex + k)%nums.length;
            valueToBeReplaced = nums[indexToBeReplaced];
            // shift current value
            nums[indexToBeReplaced] = currentValue;
            // prep the replaced value to be shifted in the next iteration
            currentValue = valueToBeReplaced;
            currentIndex = (indexToBeReplaced);
            // increment the total number of shifts
            numberofswaps++;
        }
        console.log(nums);
        return nums;   
    }

function sortedSquares(nums){
    let left = 0;
    let right = nums.length-1;
    let res = new Array(nums.length);
    let res_pointer = nums.length-1;
    while(left <= right){
        if(Math.abs(nums[left]) > Math.abs(nums[right])){
            res[res_pointer] = nums[left] * nums[left];
            left++;
        }
        else{
            res[res_pointer] = nums[right] * nums[right];
            right--;
        }
        res_pointer--
    }
    console.log(res);
    return res;
}

function isSubsequence(s,t){
    if(s.length == 0){
        return true
    }
    // let first pointer be the pointer that tracks the current char that we are looking for
    let current = 0;
    let Subsequence = false;
    // let second pointer track the current char we have encountered
    let trav = 0
    while(trav < t.length){
        let char = t.charAt(trav);
        let charToMatch = s.charAt(current);
        // if the characters match
        if(char == charToMatch){
            // increment the pointer so we can look for the next character
            current++;
            // if current becomes equal to the length, we have already matched the last character
            if(current == s.length){
                Subsequence = true;
                break;
            }
        }
        trav++
    }
    console.log(Subsequence);
    return Subsequence
}

function moveZeroes (nums){
    let last_non_zero_index = -1;
    let all_elements_processed = false;
    // i tracks the first zero element
    for(let i = 0; i < nums.length; i++){
        if(nums[i] == 0){
            // j tracks the first non-zero element
            for(let j  = last_non_zero_index != -1 ? last_non_zero_index : i + 1; j < nums.length; j++){
                if(nums[j] != 0){
                    // swap with i'th element
                    let tmp = nums[i];
                    nums[i] = nums[j];
                    nums[j] = tmp;
                    last_non_zero_index = j;
                    // if the first non zero element is at the last index, all elements are processed
                    if(j == nums.length-1){
                        all_elements_processed = true;
                    }
                    // break after swapping
                    break;
                }
            }
        } 
        if (all_elements_processed) {
            break;
        }
    }
    console.log(nums);
    return;
}

function sortColors (nums){
    let left = 0;
    let right = nums.length-1;
    for(let i = 0; i <= right; i++){
      if(nums[i] == 0){
          let temp = nums[left];
          nums[left] = nums[i];
          nums[i] = temp;
          left++;
      }
      else if(nums[i] == 2){
          let temp = nums[right];
          nums[right] = nums[i];
          nums[i] = temp;
          right--;
          i--;
      }
    }
    console.log(nums);
    return nums
}

function maxArea(height){
  let left = 0;
  let right = height.length-1;
  let max_volume = t
  let current;
  while (left < right){
    if(height[left] < height[right]){
        current = left + 1;
        while(height[current] <= height[left] && current < right){
            current++;
        }
        left = current;
        max_volume = Math.max(max_volume, (right - left) * Math.min (height[left], height[right]));
    }
    else{
        current = right - 1;
        while(height[current] <= height[right] && current > left){
            current--;
        }
        right = current;
        max_volume = Math.max(max_volume, (right - left) * Math.min (height[left], height[right]));
    }
  }
  console.log(max_volume);
  return max_volume;
}



function threeSumClosest(nums, target){
   nums = nums.sort((a, b) => a - b);
   let threeSum = Number.MAX_SAFE_INTEGER;
   let curr_dist = Number.MAX_SAFE_INTEGER;
   let exact_sum_found = false;
   for(let i = 0; i <= nums.length - 3; i++){
    let sum_to_look_for = target - nums[i];
    let left = i + 1;
    let right = nums.length - 1;
    while(left < right){
        if(exact_sum_found){
            break;
        }
        if(Math.abs(target - (nums[i] + nums[left] + nums[right])) < curr_dist){
            curr_dist = Math.abs(target - (nums[i] + nums[left] + nums[right]));
            threeSum = nums[i] + nums[left] + nums[right];
        }
        if(nums[left] + nums[right] < sum_to_look_for){
            left++;
        }
        else if(nums[left] + nums[right] > sum_to_look_for){
            right--;
        }
        else{
            exact_sum_found = true;
            threeSum = target;
        }
    }
    if(exact_sum_found){
        break;
    }
   }
   console.log(threeSum);
   return threeSum;
}

function threeSum(nums){
    // sort the input; O(nlogn)
    nums.sort((first,second) => first - second);
    let result = [];
    // there are duplicates in the input that we do not want to pick; and duplicates will be adjacent because we sorted the array. lastPicked helps in avoiding duplicates
    let lastPicked;
    // first pointer  is the index i of the outer loop
    for(let i = 0; i < nums.length; i++){
        // skip duplicates
        if(nums[i] == lastPicked){
            continue;
        }
        else{
            lastPicked = nums[i];
        }
        // second pointer
        let leftPointer = i + 1;
        // third pointer
        let rightPointer = nums.length-1;
        let pointerMovedLastIteration;
        // we subtract the value corresponding the first pointer, and look for two elements that add up to make up the difference using two pointers
        let sumToLookFor = 0 - nums[i];
        
        // while the left and right pointers haven't crossed each other; This is the part that would have taken O(n^2) had we used a nested loop, but we turned it into O(n)
        while(leftPointer < rightPointer){
            // pointerMovedLastIteration tracks the element processed in the last iteration; it exists for skipping duplicates in the inner loop
            // if current left pointer points to a duplicate number we encountered already,  we increment left and contine
            if(nums[leftPointer] == nums[pointerMovedLastIteration]){
                leftPointer++;
                continue;
            }
            // similarly, if current right pointer points to a duplicate number we encountered already,  we decrement right and contine
            else if(nums[rightPointer] == nums[pointerMovedLastIteration]){
                rightPointer--;
                continue;
            }
            // check if the sum adds up to the difference that we are looking for
            let currentSum = nums[leftPointer] + nums[rightPointer];
            if(currentSum == sumToLookFor){
                // push all three pointers to a result array;
                result.push([nums[i], nums[leftPointer], nums[rightPointer]]);
                // update pointerMovedLastIteration; we could move left pointer forwards or right pointer backwards after a successful combination has been found, either is fine 
                pointerMovedLastIteration = leftPointer;
                leftPointer++;
                continue;
            }
            // else if the sum is smaller than what we are looking for, increment the left pointer.
            else if(currentSum < sumToLookFor){
                pointerMovedLastIteration = leftPointer;
                leftPointer++;
            }
            // else if the sum is larger than what we are looking for, decrement the left pointer.
            else {
                pointerMovedLastIteration = rightPointer;
                rightPointer--;
            }
        }
        
    }
    console.log(result);
    return result
}