// Questions solved: 2
// largestNumber([432,43243])                         //lc:179   medium  *
// reorganizeString("kkkkzrkatkwpkkkktrq")            //lc:767   medium  *

//......................................................................................................................................................................
import priorityQueue from "../data structures/priorityQueue.mjs";
// .....................................................................................................................................................................

function reorganizeString(s){
    // build a frq map
    let frq_map = new Map();
    for(let i = 0; i < s.length; i++){
        let char = s.charAt(i);
        frq_map.set(char, frq_map.has(char) ? frq_map.get(char) + 1: 1);
    }
    let res = "";
    let pq = new priorityQueue(frq_map.keys(), comparator);
    while(true){
        // exit condition
        if(frq_map.size == 0 || pq.size == 0){
            break
        }
        // extract the top priority element; we'll add it to our pq again in the next iteration if it's still has some instances available in the frq map
        let curr = pq.extract_priority_element();
        // if current char is equal to the last char in the res string, exit early: This shouldn't happen because we are greedily ensuring that it doesn't happen in the comparator
        if(res.length >= 2 && curr == res.charAt(res.length-1)){
            break
        }
        // get current
        res = res.concat(curr);
        // update frq map to reflect the inclusion of the current char in res
        if(frq_map.get(curr) == 1){
            frq_map.delete(curr);
        }
        else{
            frq_map.set(curr, frq_map.get(curr) - 1);
        }
        // if there are more than two chars in the res string already and the second last element is still present in the frq map
        if(res.length > 1 && frq_map.has(res.charAt(res.length-2))){
            // add that element into the priority queue again
            pq.insert(res.charAt(res.length-2))
        }
    }
    console.log(res, res.length == s.length);
    return res.length == s.length ? res : "";

    function comparator(a, b){
        // if a is not equal to the last char in res, and b is, a has a higher priority
        if(a != res.charAt(res.length-1) && b == res.charAt(res.length-1)){
            return a
        }
        // else if b is not equal to the last char in res, and a is, b has a higher priority
        else if(b != res.charAt(res.length-1) && a == res.charAt(res.length-1)){
            return b
        }
        // else when both are not equal to the last char in res, the one with the higher freq has a higher priority
        else{
            if(frq_map.get(a) >= frq_map.get(b)){
                return a
            }
            else return b
        }
    }
}

function largestNumber(nums){
    nums =  nums.sort((a, b) => {
         let a_tmp = String(a);
         let b_tmp = String(b);
         let c = a_tmp.concat(b_tmp);
         let d = b_tmp.concat(a_tmp);
         if(c > d){
             return +1
         }
         else return -1
     })
     let res = "";
     for(let i = 0; i < nums.length; i++){
         res = res.concat(String(nums[i]));
     }
     console.log(res);
     return res
 }