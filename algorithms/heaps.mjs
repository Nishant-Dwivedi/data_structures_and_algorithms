import priorityQueue from "../data structures/priorityQueue.mjs";
// .....................................................................................................................................................................
// findKthLargest([-1,2,0], 2);                                                                                                //lc:215 medium
// findClosestElements([1,2,5,5,6,6,7,7,8,9], 7, 7)  // slower(O(n)) than the binary search solution (O(log(n) + k));          //lc:658 medium *
// topKFrequent([1,1,1,2,2,3], 2)                                                                                              //lc:347 medium
// .....................................................................................................................................................................

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
    // heap solution: n * log(n);
    // let res;
    // // if k's value is smaller than half the size of the array, we build a max heap
    // if (k <= nums.length/2){
    //     let max_heap = new heap(nums, "max");
    //     for(let i = 1; i < k; i++){
    //         max_heap.extract_max();
    //     }
    //     res = max_heap.get_max;
    // }
    // else{
    //     let min_heap = new heap(nums, "min");
    //     for(let i = 1; i <= nums.length-k; i++){
    //         min_heap.extract_min();
    //     }
    //     res = min_heap.get_min;
    // }
    // console.log(res);
    // return res;

    // quick select solution O(n) //todo
}
