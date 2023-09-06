import priorityQueue from "../data structures/priorityQueue.mjs";
// .....................................................................................................................................................................
// Questions solved: 6
// findKthLargest([-1,2,0], 2);                                                                                                //lc:215 medium
// findClosestElements([1,2,5,5,6,6,7,7,8,9], 7, 7)  // slower(O(n)) than the binary search solution (O(log(n) + k));          //lc:658 medium *
// topKFrequent([1,1,1,2,2,3], 2)                                                                                              //lc:347 medium
// topKFrequentWords(["i","love","leetcode","i","love","coding"], 2)                                                           //lc:692 medium
// kClosest( [[3,3],[5,-1],[-2,4]], 2)                                                                                         //lc:973 medium
// kSmallestPairs([1,1,2], [1,2,3], 5)                                                                                         //lc:373 medium *
// .....................................................................................................................................................................

function kSmallestPairs(nums1, nums2, k){
   let pq = new priorityQueue([], comparator);
    // we will track the sum of the highest priority pair in our pq
   let current_max = Number.MIN_SAFE_INTEGER;
   for(let i = 0; i < nums1.length; i++){
    for(let j = 0; j < nums2.length; j++){
        // if the pq has less than k elements in it; just insert the element and update the max sum if necessary
        if(pq.size < k){
            pq.insert([nums1[i], nums2[j]]);
            let top_pair = pq.get_priority_element;
            current_max = top_pair[0] + top_pair[1];
            continue;
        }
        // but if we already have k number of elements
        else{
            // it makes no sense to add a pair whose sum is greater than the sum of our highest priority pair in the pq. 
            // it also doesn't make sense to check subsequent pairs because the sum is only going to increase for subsequent pairs; the input is in non-decreasing order
            if(nums1[i] + nums2[j] >= current_max){
                break;
            }
            // but if the current pair has a sum smaller than the sum of our highest priority pair, we remove the top pair, insert the new pair & update the max sum
            else{
                pq.extract_priority_element();
                pq.insert([nums1[i], nums2[j]]);
                let top_pair = pq.get_priority_element;
                current_max = top_pair[0] + top_pair[1];
            }
        }
    }
   }
   let res = [];
   while(pq.size > 0){
    res.push(pq.extract_priority_element());
   }
   console.log(res);
   return res;
//    comparator: a pair with a higher sum will have a higher priority
   function comparator (a, b){
    if(a[0] + a[1] >= b[0] + b[1]){
        return a
    }
    else return b;
   }
}

function kClosest(points, k){
    let pq = new priorityQueue(points, comparator);
    let res = []
    for(let i = 0; i < k; i++){
        res.push(pq.extract_priority_element());
    }
    console.log(res);
    return res
    function comparator (a, b){
        let dist_a = Math.sqrt(Math.pow(a[0] - 0, 2) + Math.pow(a[1] - 0, 2));
        let dist_b = Math.sqrt(Math.pow(b[0] - 0, 2) + Math.pow(b[1] - 0, 2));
        if(dist_a <= dist_b){
            return a
        }
        else{
            return b;
        }
    }
}

function topKFrequentWords(words, k){
    // build a frq map
    let frq_map = new Map();
    for(let i = 0; i < words.length; i++){
        let word = words[i];
        frq_map.set(word, frq_map.has(word) ? frq_map.get(word) + 1: 1);
    }
    // build a pq
    let pq = new priorityQueue(frq_map.keys(), comparator);
    let res = [];
    for(let i = 0; i < k; i++){
        res.push(pq.extract_priority_element())
    }
    console.log(res);
    return res

    // comparator
    function comparator(a, b){
        if(frq_map.get(a) > frq_map.get(b)){
            return a
        }
        else if( frq_map.get(a) < frq_map.get(b)){
            return b
        }
        // if a and b have the same frq, we use two pointers to find the which element appears first in the lexicographical order
        else{
            let trav = 0;
            let smaller_string_length = a.length <= b.length ? a.length : b.length;
            while(trav < smaller_string_length){
                let ascii_a = a.charCodeAt(trav);
                let ascii_b = b.charCodeAt(trav);
                // check the ascii codes and return the char corresponding to the smaller value
                if(ascii_a < ascii_b){
                    return a;
                }
                else if (ascii_a == ascii_b){
                    trav++;
                    continue;
                }
                else{
                    return b;
                }
            }
            // if the smaller length string is a prefix of the larger length string, return the smaller length one
            return a.length <= b.length ? a : b;
        }   
    }
}

function topKFrequent(nums, k){
    let frq_map = new Map();
    for(let i = 0; i < nums.length; i++){
        frq_map.set(nums[i], frq_map.has(nums[i]) ? frq_map.get(nums[i]) + 1: 1);
    }
    let keys = frq_map.keys();
    let pq = new priorityQueue(keys, comp);
    function comp (a, b){
        if(frq_map.get(a) >= frq_map.get(b)){
            return a
        }
        else{
            return b;
        }
    }
    let res = []
    for(let i = 0; i < k; i++){
        res.push(pq.extract_priority_element());
    }
    console.log(res);
    return res
}

// do binary search instead
function findClosestElements(arr, k, x){
    let pq = new priorityQueue(arr, comp);
    pq.get_priority_element;
    let res = [];
    for(let i = 0; i < k; i++){
        res.push(pq.extract_priority_element())
        pq.get_priority_element
    }
    res = res.sort();
    console.log(`result: ${res}`);
    return res;
    // comparator for the priority queue
    function comp (a, b){
        if(Math.abs(a - x) < Math.abs(b - x)){
            return a;
        }
        else if(Math.abs(a - x) == Math.abs(b - x)){
            return a < b ? a : b;
        }
        else return b;
    }
}

function findKthLargest(nums, k){
    // heap solution: n + k * log(n);
    let res;
    // if k's value is smaller than half the size of the array, we build a max heap
    if (k <= nums.length/2){
        let max_heap = new heap(nums, "max");
        for(let i = 1; i < k; i++){
            max_heap.extract_max();
        }
        res = max_heap.get_max;
    }
    else{
        let min_heap = new heap(nums, "min");
        for(let i = 1; i <= nums.length-k; i++){
            min_heap.extract_min();
        }
        res = min_heap.get_min;
    }
    console.log(res);
    return res;

    // quick select solution O(n) //todo
}
