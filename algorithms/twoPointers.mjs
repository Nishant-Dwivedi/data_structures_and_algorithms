// threeSum([-1,0,1,2,-1,-4,-2,-3,3,0,4])
// threeSumClosest([-1,2,1,-4], 1)
// findDuplicate([18,13,14,17,9,19,7,17,4,6,17,5,11,10,2,15,8,12,16,17]) // floyd's cycle detection algorithm for O(n)
// maxArea([2,3,4,5,18,17,6]) ............good question
// sortColors([2,0,2,1,1,0])............... good question dutch national flag algorithm
// isSubsequence("axc", "ahbgdc")
// sortedSquares([-5,-3,-2,-1])
// rotate([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54], 45)
// numRescueBoats([44,10,29,12,49,41,23,5,17,26], 50)
// moveZeroes([0,1,0,3,12])

// .............................................................................................................................................................................

function numRescueBoats(people, limit){
    {
        // people.sort()
        // left = 0
        // right = nums.lenght
        // count = 0
        // while(right != left - 1)
            // if(left == right)
                // count++
                // break
            // if(people[left] + people[right] > limit)
                // right--;
                // count++
            // else
                // left++'
                // right--
                // count++
            
    }
    people.sort((a,b) => a-b);
    console.log(people);
    let left = 0;
    let right = people.length-1;
    let count = 0;
    while(right != left-1){
        if(left == right){
            count++;
            break;
        }
        if(people[left] + people[right] > limit){
            count++;
            right--;
        }
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
    k = k % nums.length;
    console.log(k, nums.length);
    if(k == 0){
        console.log(nums);
        return nums;
    }
   
    
        let currentIndex = 0; 
        let currentValue = nums[0];
        // marking the start of a cycle. if you come back to this index, start a new cycle from index+1
        nums[0] = null;
        let numberofswaps  =0;
        let valueToBeReplaced;
        let indexToBeReplaced;
        let justStartingTheLoop = true;
        while(numberofswaps  != nums.length){
            // end of a cycle
            if(currentValue == null){
                // start a new cycle
                currentIndex++;
                currentValue = nums[currentIndex];
                // mark the beginning of a new cycle
                nums[currentIndex] = null
                continue;
            }
            indexToBeReplaced = (currentIndex + k)%nums.length;
            valueToBeReplaced = nums[indexToBeReplaced];
            nums[indexToBeReplaced] = currentValue;
            currentValue = valueToBeReplaced;
            currentIndex = (indexToBeReplaced);
            numberofswaps++;
        }
        console.log(nums);
        return nums;
    
}

function sortedSquares(nums){
    let result = [];
    let left = 0;
    let right = nums.length-1;
    while(left <= right){
        if(Math.abs(nums[left]) < Math.abs(nums[right])){
            result.push(nums[right] * nums[right]);
            right--;
        }
        else{
            result.push(nums[left] * nums[left]);
            left++;
        }
    }
    result.reverse();
    console.log(result);
    return result;
}

function isSubsequence(s,t){
    if(s.length == 0){
        return true
    }
    let current = 0;
    let Subsequence = false;
    let trav = 0
    while(trav < t.length){
        let char = t.charAt(trav);
        let charToMatch = s.charAt(current);
        if(char == charToMatch){
            current++;
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
    let firstZeroIndex = -1;
    let firstNonZeroIndex = nums.length-1;
    while(firstNonZeroIndex > firstZeroIndex){
        for(let i = firstZeroIndex+1; i < nums.length; i++){
            if(nums[i] == 0){
                firstZeroIndex = i;
                break;
            }
        }
        if(firstZeroIndex == -1){
            return
        }
        for(let i = firstZeroIndex + 1; i < nums.length; i++){
            if(nums[i] != 0){
                firstNonZeroIndex = i;
                let temp = nums[i];
                nums[i] = nums[firstZeroIndex];
                nums[firstZeroIndex] = temp;
                break;
            }
            firstNonZeroIndex = 0;
        }
    }
    console.log(nums);
    return;
}

function sortColors (nums){
    {
        //This is the Dutch National Flag Algorithm.
        // define a redrange and a bluerange initialised to 0 and num.length-1;
        // for i:0 to bluerange
            // if i is in redrange, 
                // if nums[i] is 0
                    // continue to the next iteration of the loop because the element swapped in in the last iteration is zero
            // if nums[i] == 0
                // swap it with nums[redrange]
                // increment redrange
                // decrement i, can't move to the next index until the swapped in element is also 0;
            // elif nums[i] == 2
                // swap it with nums[bluerange]
                // decrement bluerange
                // decrement i, cant move to the next index until the swapped in element is also 0;
            // elif nums[i] == 1;
                // continue; .......we donot swap 1's. they fall in place as a result of swapping 0s and 2s
    }
    let redRange = 0;
    let blueRange = nums.length-1;

    for(let i = 0; i <= blueRange; i++){
        if(i < redRange){
            if(nums[i] == 0){
                continue
            }
        }    
        if(nums[i] == 0){
            let temp = nums[redRange];
            nums[redRange] = nums[i];
            nums[i] = temp;
            redRange++
            i--
        }
        else if(nums[i] == 2){
            let temp = nums[blueRange];
            nums[blueRange] = nums[i];
            nums[i] = temp;
            blueRange--;
            i--
        }
        else{
            continue
        }
    }
    console.log(nums);
    return nums
}

function maxArea(height){
    {
    // let maxvolume = height.length * Min(height[0], height[nums.length-1]);
    // let leftBoundary = 0;
    // let rightBoundary = nums.length-1
    // let left = 1;
    // let right = nums.length-2;
    // while(left < right)
        // look for the smaller height pointer amongst left and right boundaries, its the one that provides the upper bound of the total area.
        // if leftBoundary is smaller
            // check if left is larger than leftboundary
                // if its not
                    // left++
                    // continue;
                // if it is
                    // check if it is also larger than the right boundary, because then right boundary will be the upper bound of the total area and in the next iteration, well move that instead
                    // if it is
                        // leftBoundary = left;
                    // newVolume = math.abs(height[rightBoundary]-height[left]) * math.abs(rightBoundary-left)
                    // if newvolume > maxvolume
                        // maxVolume = newVolume;
                        // left++
        // else
            // check if right is larger than rightBoundary
                // if its not
                    // right--
                    // continue;
                // if it is
                    // check if its also larger than leftBoundary, because then the left boundary will be the upper bound.
                    // if it is
                        // rightBOundary = right;
                    // newVolume = math.abs(height[right] - height[leftBoundary]) * math.abs(right-leftBoundary)
                    // if newVOlume > maxVolume
                        // maxVolume = newVolume
                        // right--
        // return maxVolume
    }
    let maxVolume = (height.length-1) * Math.min(height[0], height[height.length-1]);
    let leftBoundary = 0
    let leftTrav = 1;
    let rightBoundary = height.length-1;
    let rightTrav = height.length-2;

    while(leftTrav <= rightTrav){
        if(height[leftBoundary] < height[rightBoundary]){
            if(height[leftTrav] < height[leftBoundary]){
                leftTrav++;
                continue;
            }
            else{
                if(height[leftTrav] > height[rightBoundary]){
                    leftBoundary = leftTrav;
                }
                let newMaxVolume = Math.min(height[rightBoundary],height[leftTrav]) * (rightBoundary - leftTrav);
                if(newMaxVolume > maxVolume){
                    maxVolume = newMaxVolume;
                }
                leftTrav++;
            }
        }
        else {
            if(height[rightTrav] < height[rightBoundary]){
                rightTrav--;
                continue;
            }
            else{
                if(height[rightTrav] > height[leftBoundary]){
                    rightBoundary = rightTrav
                }
                let newMaxVolume = (rightTrav - leftBoundary) * (Math.min(height[rightTrav], height[leftBoundary]));
                if(newMaxVolume > maxVolume){
                    maxVolume = newMaxVolume;
                }
                rightTrav--
            }
        }
    }
    console.log(maxVolume);
    return maxVolume;
 
}

function findDuplicate (nums){
    // Floyds cycle detection algo. very unintuitive for this problem but is faster than the other approach.
    // let slow = nums[0];
    // let fast pointer = nums[0];
    // let startedLoop = true
    // while(nums[slow] != nums[fast] || startedLoop == true)
        // startedLoop = false;
        // slow = nums[slow];
        // fast = nums[nums[fast]]
    // let slow2 = nums[0];
    // if slow == slow2 => return slow
    // else
        // let startedLoopAgain = true
        // while(nums[slow] != nums[slow2] || startedLoopAgain == true)
            // startedLoopAgain = false
            // slow = nums[slow];
            // slow2 = nums[slow2];
    // return slow;


//    { let slow = nums[0];
//     let fast = nums[0];
//     let startedLoop = true;
//     while (slow != fast || startedLoop == true){
//         startedLoop = false;
//         slow = nums[slow];
//         fast = nums[nums[fast]];
//     }
//     let slow2 = nums[0];
//     if(slow == slow2){
//         return slow
//     }
//     else{
//         let startedLoopAgain = true;
//         while(slow != slow2 || startedLoopAgain == true){
//             startedLoopAgain = false;
//             slow = nums[slow];
//             slow2 = nums[slow2];
//         }
//     }
  
//     console.log(slow);
//     return slow}
{
    // Standard approach; O(n^2)
    // calculate the totalSum;
    // let totalsum = 0;
    // let largest = -1
    // for i: 0 to nums.length
        // totalsum = totalsum+nums[i];
        // if(nums[i] > largest)
            // largest = nums[i];

    // let index = 0;
    // let lookingfor = 1;
    // let haveFoundall= false;
    // let havefoundcurrent = false
    // let numberofelementinserted = 0
    // while(havefoundall != true)
        // havefoundcurrent = false
        // if(nums[index] == lookingfor)
            // lookingfor++
            // havefoundcurrent = true;
            // index = 0;
        // if(index == nums.length-1 && havefoundcurrent != true)
            // totalsum = totalsum + lookingfor;
            // lookingfor++;
            // numberofelementsinserted++;
            // index = 0
        // if(lookingfor == largest && index == num.length-1 && havefoundcurrent != true)
            // havefoundall = true;
    // sumofnnumbers = largest * (largest-1)/2;
    // difference = totalsum-largestsum
    // constant = nums.length + numberofelementinserted - largest;
    // dupe = difference/constant;

    let totalSum = 0;
    let largest = Number.MIN_SAFE_INTEGER;
    for(let i = 0; i < nums.length; i++){
        totalSum = totalSum+nums[i];
        if(nums[i] > largest){
            largest = nums[i];
        }
    }
    // find missing numbers, add them to the totalsum so that the new total sum is 1+2+3......n + C * duplicateNum;
    let missingnumberscount = 0;
    for(let i = 1; i < nums.length; i++){
        let foundCurrent = false;
        for(let j = 0; j < nums.length; j++){
            if(nums[j] == i){
                foundCurrent = true;
                break;
            }
        }
        if(foundCurrent == false){
            totalSum = totalSum+i;
            missingnumberscount++;
        }
       
    }
    
    let nSum = (nums.length-1)*(nums.length)/2;
    let difference = totalSum-nSum;
    let C = nums.length + missingnumberscount - (nums.length - 1);
    let duplicateNum = difference/C;
    console.log(duplicateNum);
    return duplicateNum;
}


}

function threeSumClosest(nums, target){
    {   
        // nums.sort()
        // let currentMinDistanceFromTrget = Number.maxValue;
        // let sum;
        // let lastpicked;
        // for i: 0 to nums.length
            // if(lastPicked == nums[i])
                // continue;
            // else
                // lastpicked = nums[i]

            // let leftPointer = i+1;
            // let rightPointer = nums.length-1;
            // while(leftPointer < rightPointer)
                // let currentSum = nums[i] + nums[leftPointer] + nums[rightPointer]
                // let distance = Number(abs(target - currentSum))
                // if (distance < currentMinDistanceFromTrget)
                    // currentMinDistanceFromTrget = distance
                    // sum = currentSum

                // if(currentSum < target)
                    // leftPointer++
                // elif(currentSum > target)
                    // rightPointer--
                // else(currentSum == target)
                    // sum = currentSum
                    // break

    }
    nums.sort((a,b) => a-b);
    let currentMinDistanceFromTarget = Number.MAX_VALUE;
    let sum;
    let result;
    let lastPicked;
    for(let i = 0; i < nums.length; i++){
        if(lastPicked == nums[i]){
            continue
        }
        else{
            lastPicked = nums[i];
        }
        let leftPointer = i+1;
        let rightPointer = nums.length-1;
        while(leftPointer < rightPointer){
            let currentSum = nums[i] + nums[leftPointer] + nums[rightPointer];
            let distance = Math.abs(target - currentSum);
            if(distance < currentMinDistanceFromTarget){
                currentMinDistanceFromTarget = distance;
                result = [nums[i], nums[leftPointer], nums[rightPointer]];
                sum = currentSum;
            }
            if(currentSum < target){
                leftPointer++;
            }
            else if(currentSum > target){
                rightPointer--;
            }
            else{
                sum = currentSum;
                result = [nums[i], nums[leftPointer], nums[rightPointer]]
                break;
            }
        }
    }
    console.log(sum, result);
    return sum;
}

function threeSum(nums){
    {
        // nums.sort();
        // let result = []
        // let lastPicked;
        // for i: 0 to nums.length - 1;  
            // if(nums[i] == lastPicked)
                // continue;
            // else 
                // lastpicked = nums[i];
            // let left = i+1
            // let right = nums.length-1;
            // let sumToLookFor = 0 - nums[i];
            // while (left < right)
                // let sum = nums[left] + nums[right];
                // if(sum < sumToLookFor)
                    // left++;
                // elfi (sum > sumToLookFor)
                    // right--;
                // else 
                    // result.push([nums[i], nums[left], nums[right])
                    // right--     
    }
    nums.sort((first,second) => first - second);
    let result = [];
    let lastPicked;
    for(let i = 0; i < nums.length; i++){
        if(nums[i] == lastPicked){
            continue;
        }
        else{
            lastPicked = nums[i];
        }
        let leftPointer = i + 1;
        let rightPointer = nums.length-1;
        let pointerMovedLastIteration;
        let sumToLookFor = 0 - nums[i];
        while(leftPointer < rightPointer){
            if(nums[leftPointer] == nums[pointerMovedLastIteration]){
                leftPointer++;
                continue;
            }
            else if(nums[rightPointer] == nums[pointerMovedLastIteration]){
                rightPointer--;
                continue;
            }

            let currentSum = nums[leftPointer] + nums[rightPointer];
            if(currentSum == sumToLookFor){
                result.push([nums[i], nums[leftPointer], nums[rightPointer]])
                pointerMovedLastIteration = leftPointer;
                leftPointer++;
                continue;
            }
            else if(currentSum < sumToLookFor){
                pointerMovedLastIteration = leftPointer;
                leftPointer++;
            }
            else {
                pointerMovedLastIteration = rightPointer;
                rightPointer--;
            }
        }
        
    }
    console.log(result);
    return result
}