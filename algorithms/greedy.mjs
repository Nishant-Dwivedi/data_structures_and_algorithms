// Questions solved: 3
// largestNumber([432,43243])                         //lc:179   medium  *
// canCompleteCircuit([5,1,2,3,4], [4,4,1,5,1])       //lc 134   medium  *
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

function canCompleteCircuit(gas, cost){
    // GREEDY
    // let res = -1;
    // // we will keep track of the amount of gas by which  we miss being able to get to the next station
    // let insufficientGas;
    // // we'll pick starting stations one by one from the left most station
    // for(let i = 0; i < gas.length; i++){
    //     // if we gain no additional fuel by not starting our cycle from the i-1th station,  and instead starting from the current ith station, we can skip the current station as well;
    //     // remember, insuffcientGas tracks the amount of fuel which if we had, we would have been able to get to the next station; Since we couldn't, we now check if there is any fuel to be gained by skipping the last starting point and starting from the current station instead; if there isn't we continue to the next element
    //     if(insufficientGas - (gas[i-1] - cost[i-1]) < 0){
    //         continue;
    //     }
    //     //initialise the inner loop variables that will help in tracking how far we can go starting from the ith node with 0 gas without running out of fuel
    //     let trav = i;
    //     let totalGas = 0;
    //     let isPossible = false;
    //     // just a flag used to start the loop; the stopping condition is the same as the initial consdition
    //     let startLoop = true;
    //     while(true){
    //         // if we could cycle back to the starting point, exit
    //         if(trav == i && startLoop == false){
    //             isPossible = true;
    //             break;
    //         }
    //         // change the flag once the you enter the loop
    //         startLoop = false;
    //         // if we still have gas to go to the next station, update totalGas and trav and continue
    //         if(totalGas + gas[trav] - cost[trav] >= 0){
    //             totalGas = totalGas + gas[trav] - cost[trav];
    //             trav = trav + 1 < gas.length ? trav + 1 : (trav+1) % gas.length;
    //             continue;
    //         }
    //         // else, update the insufficientGas to reflect the amount of gas by which we miss getting to the next stop
    //         else{
    //             insufficientGas = totalGas + gas[trav] - cost[trav];
    //             break
    //         }
    //     }
    //     // exit as soon as the first cycle is found
    //     if(isPossible){
    //         res = i;
    //         console.log(res);
    //         return res;
    //     }
    // }
    // console.log(res);
    // return res

    // SLIDING-WINDOW (faster)
      // inititalize window attributes
      let left = 0;
      let right = 0;
      let loopStartFlag = true;
      let res = -1;
      let totalFuel = 0;
      while (left < gas.length && res == -1){
          if(left == right && loopStartFlag != true){
              res = left;
              break;
          }
          // change the flag to allow exiting the loop once it has started
          loopStartFlag = false;
          // if the next station can be reached with current fuel in the tank, move on
          if(totalFuel + gas[right] - cost[right] >= 0){
              totalFuel += gas[right] - cost[right];
          }
          // else if it cannot be reached with the current amount of fuel
          else{
              // we shrink the window till we can either go to the next station, or we can no longer shrink the window. Shrinking the window implies picking the next station such that we are able to go to the next station
              while(totalFuel + gas[right] - cost[right] < 0 && left != right){
                  totalFuel -= gas[left] - cost[left];
                  left++;
              }
              // reset the flag otherwise it would imply that right pointer cycled back to left pointer which would give false positive and terminate the loop
              if(left == right){
                  loopStartFlag = true;
              }
              // and check if after shrinking, the current jump can be made
              if(totalFuel + gas[right] - cost[right] > 0){
                  totalFuel += gas[right] - cost[right];
              }
              // else we move on to the next station as the starting station, shrinking didn't help and we just can't go to the next station even with the current station as the starting station.
              else{
                  left++;
              }
          }
          // increment right; increment it such that it could cycle back to index 0 when needed
          right = (right+1) % gas.length;
      }
      console.log(res);
      return res;
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