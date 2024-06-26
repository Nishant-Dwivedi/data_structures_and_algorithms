// QUESTIONS SOLVED 4
// findMaxLength([0,1])
// subarraySum([1,2,1,2,1], 3) 
// productExceptSelf([1,2,3,4])
// minKBitFlips([0,0,0,1,0,1,1,0], 3)
// ...................................................................................................................................................................................

function minKBitFlips(nums, k){
    let prefix = new Array(nums.length);
    prefix.fill(0);
    let bit_flips = 0;
    let curr_prefix = 0;
    let left = 0;
    let right = 0;
    while(left <= nums.length - k){
        // find the next index i to flip i + k consecutive bits
        while(right < nums.length){
            curr_prefix += prefix[right];
            // if the element pointed to by right is a 0 that's been flipped even number of times,
            // or if it's a 1 that's been flipped odd number of times, the next k-bit flip needs to happen at index right.
            if((nums[right] == 0 && curr_prefix % 2 == 0) || (nums[right] == 1 && curr_prefix % 2 != 0)){
                break;
            }
            right++;
        }
       if(right <= nums.length - k){
         // move left to the right pointer
         left = right;
         // flip the next k bits
         bit_flips++;
         // change prefix arr
         prefix[left] = 1;
         left + k < prefix.length ? prefix[left + k] = -1 : null;
       }
       else if(right > nums.length - k && right < nums.length){
        console.log(-1);
        return -1
       }
       else break;
    }
    console.log(bit_flips);
    return bit_flips;
}

function subarraySum(nums, k){
    {
     // sliding window does not work here because there are negative numbers present. if there were just positive elements, it would have worked. expanding the window on the right hand side no longer means strictly increasing subarray sum (breaks the invariant). similarly shrinking the window from the left hand side no longer means strictly decreasing subarray sum.
    }
    let prefix_sum = 0;
    let hashmap = new Map();
    let count = 0;
    for (let i = 0; i < nums.length; i++){
        prefix_sum += nums[i];
        if(prefix_sum == k){
            count++;
        }
        let subarray_sum_to_subtract = prefix_sum - k;
        if(hashmap.has(subarray_sum_to_subtract)){
            count = count + hashmap.get(subarray_sum_to_subtract);  
        }
        hashmap.set(prefix_sum, hashmap.get(prefix_sum) ? hashmap.get(prefix_sum) + 1 : 1);
       
    }
    console.log(count);
    return count;
 }

function findMaxLength(nums){
    {
     // THIS QUESTION IS A MASSIVE BAIT FOR SLIDING WINDOW TECHNIQUE. BUT IT CANNOT BE SOLVED USING IT. IT USES PREFIX SUM TECHNIQUE, BUT THAT'S BESIDE THE POINT. THE MAIN TAKEAWAY FROM THIS PROBLEM IS WHEN TO *NOT USE SLIDING WINDOW.
     // this is a prefix sum problem. it has no business being here; 
    }
    let prefix_sum = 0;
    let hashmap = new Map();
    let max_subarray_size = 0;
    for(let i = 0; i < nums.length; i++ ){
     if(nums[i] == 0){
         prefix_sum -= 1;
     }
     else{
         prefix_sum += 1;
     }
     if(prefix_sum == 0){
         max_subarray_size = i + 1;
     }
     else if(hashmap.has(prefix_sum)){
         let index = hashmap.get(prefix_sum);
         let current_subarray_size = i - index;
         max_subarray_size = Math.max(max_subarray_size, current_subarray_size);
     }
     else{
         hashmap.set(prefix_sum, i);
     }
    }
    console.log(max_subarray_size);
    return max_subarray_size
 }

 function productExceptSelf (nums){
    let left = [];
    let right = [];
    let result = []
    for (let i = 0; i < nums.length; i++){
        left[i] = i-1 != -1 ? left[i-1] * nums[i] : nums[i]; 
    }
    for(let i = nums.length-1; i >= 0; i--){
        right[i] = i+1 != nums.length ? right[i+1] * nums[i] : nums[i];
    }
    for(let i = 0; i < nums.length; i++){
        let leftProd = i != 0 ? left[i-1] : 1;
        let rightProd = i != nums.length-1 ? right[i+1] : 1;
        result[i] = leftProd * rightProd;
    }
    return result;
}