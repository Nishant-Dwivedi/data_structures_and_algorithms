// STANDARD BACKTRACKING ALGORITHM:

// function is_a_solution (partialSolution) // takes a  partialSolution and checks if it is a complete solution or not
  // return partialSolution == completeSolution

// function process_solution(partialSolution) // processes a partialSolution that has been deemed a complete solution
  // log to the console/push to a result array/ send it to your mom

// function generate_candidates (partialSolution, input) //takes the current state of your partial solution and generates the available candidates that can be included in it.
  // generate possible candidates for the current state at which your partialSolution is.

// function backtrack (partialSolution, input)
  // if a partial solution is a complete solution, process it and exist
  // if(is_a_solution(partialSolution == true))
    // process_solution(partialSolution)
    // return

  // otherwise, generate candidates for inclusion in your partial solution; 
  // let candidates = generate_candidates(partialSolution, input)

  // include each candidate in your current partial solution, and recursively call backtracking again to see if the new partialSolution is a complete solution
  // else backtrack on your selection, and consider the other candidates from the generated pool of candidates
  // for each candidate 
    // add candidate to the partialSolution 
    // call backtrack on the new partialSolution and (input - candidate)
    // remove candidate from partialSolution because the partial solution didn't lead to a complete solution, and try the next candidate and see if that leads to a complete solution.
// .................................................................................................................................................................................

import stack from "../data structures/stack.mjs";

// .................................................................................................................................................................................
// QUESTIONS SOLVED(15)

// printDiceRollCombinations(3);                                     //GFG question: k dice combinations; easy
// permuteAString("cat");                                            //GFG question: Write a program to print all Permutations of given String; easy
// combinationSum3(3, 7)                                             //LC 216; medium
// permutations2([3,3,0,3])                                          //LC 47;  medium *
// wordSearch(board, word)                                           //LC 79;  medium
// combinationsum2([10, 1, 2, 7, 6, 1, 5], 8);                       //LC 40;  medium
// combinationSum([2,3,6,7],7)                                       //LC 39;  medium
// letterCombinations("279")                                         //LC 17;  medium
// subsets2([4,4,4,1,4])                                             //LC 90;  medium
// palindromePartition("aabaacbc")                                   //LC 131; medium
// canPartitionKSubsets([1,1,1,1,2,2,2,2], 4);                       //LC 698; medium *
// generateParenthesis(4);                                           //LC 22;  medium
// restoreIpAddresses("101023")                                      //LC 93;  medium
// getPermutation(3,3)                                               //lc 60;  hard
// maxUniqueSplit("aba")                                             //lc1593: medium
// .........................................................................................................................................................................................

function maxUniqueSplit(s){
  let max_count = 0;
  let hashSet = new Set();
  let partSolution = "";
  backtrack(partSolution, hashSet, s);
  console.log(max_count);
  return max_count;
  // main funtion
  function backtrack(partialSolution, alreadyIndcluded, searchSpace){
    // if partial sol is the exact same size as the given input, the candates in already included concat to form the complete string
    if(partialSolution.length == s.length){
      max_count = Math.max(max_count, alreadyIndcluded.size)
      return
    }
    // generate candidates; your candidates are every unique substring starting with the 0th char of your search space; exit early if 0 candidates are returned
    let candidates = createCandidates(searchSpace, alreadyIndcluded);
    if(candidates.length == 0){
      return
    }
    // for each candidate 
    for(let i = 0; i < candidates.length; i++){
      // add the candidate to your partial solution and update the hash set to keep track of included candidates
      partialSolution = partialSolution.concat(candidates[i]);
      alreadyIndcluded.add(candidates[i]);
      // check if a complete solution could be built with the current candidate included in the partial solution
      backtrack(partialSolution, alreadyIndcluded, searchSpace.slice(candidates[i].length));
      // backtrack on the current selection and restore the state to allow for selection of the next candidate;
      partialSolution =  partialSolution.slice(0, partialSolution.length - candidates[i].length);
      alreadyIndcluded.delete(candidates[i]);
    } 
  }
  // generate candidates
  function createCandidates (string, set){
    let res = [];
    let trav = 1;
    while(trav <= string.length){
      let str = string.slice(0, trav);
      if(!set.has(str)){
        res.push(str);
      }
      trav++;
    }
    return res;
  }
}

function getPermutation(n , k) {
  {
//     the main difficulty in this question is to figure out which element to skip while building a permutation. we only skip an element at index i when we are absolutely sure that skipping the current element would not lead to missing the kth permutaion. We do not want to skip an element at index i if its addition to the partialSolution leads up to the kth permutation. 

// the way to calculate this is better understood with an example, say the given input is [1,2,3,4], and we need the 9th permutation sequence.
// ⇒ every permutation with "1.." as the leading subsequence = factorial(availableChoices -1) = factorial(4-1) = 6. So we'll have 6 total permutations that will have 1 as the starting subsequence. we can skip 1 because 6 < 9 => totalSkippedPermutations = 6
// ⇒ every permutation with "2.." as the leading subsequence = factorial(availableChoices - 1) =factorial(4-1) = 6.  we cannot skip another 6 permutations since the total would then be 12 and we will have skipped the 9th sequence. add 2 to the hashSet.
// ⇒ every permutation with "21.." as the leading subsequence = factorial(availableChoices -1) = factorial(3-1)[availble choices are just 1,3 and 4; 2 was added) = 2. we can skip another 2 permutations since total = 8 < 9 => totalSkippedPermutations = 8
// ⇒ every permutation with "23.." as the leading subsequence = factorial(availableChoices -1) = factorial(3-1) = 2. we cannot skip another 2 permutaions since the total would then be 10 and 10 is greater than 9. add 2 to the hashSet.
// ⇒ every permutation with "231.." as the leading subsequence = factorial(availableChoices -1) = factorial(2-1) = 1 we cannot skip another 1 permutaion since the total would then be 9 and 9 is not greater than 9. add 1 to the hashSet. 
// ⇒ every permutation with "2314.." as the leading subsequence = factorial(availableChoices -1) = factorial(1-1) = 1. we cannot skip another 1 permutaion since the total would then be 9 and 9 is not greater than 9. add 4 to the hashSet.- partialSolution.size == input size => exit out of recursion. [2,3,1,4] is the 9th permutation.
  }

  let skippedPermutations = 0;
  let input = [];
  for(let i = 1; i <= n; i++){
    input.push(i);
  }
  let partialSolution = new Set();
  let kthPermutation = null;
  let haveFoundKthPermutation = false;

  function factorial (number){
    let result = 1;
    while(number != 0){
      result = result * number;
      number--;
    }
    return result
  }

  function backtrack(partialSolution){
    if(haveFoundKthPermutation){
      return
    }
    if (partialSolution.size >= input.length){
      kthPermutation = Array.from(partialSolution);
      haveFoundKthPermutation = true;
      return;
    }

    for (let i = 0; i < input.length; i++){
      if(partialSolution.has(input[i])){
        continue
      }

      let permutationsWithIthElementAsTheFirstElement = factorial(input.length - partialSolution.size - 1 );
      let canSkipIthElement = k > skippedPermutations + permutationsWithIthElementAsTheFirstElement ? true : false;

      if (canSkipIthElement){
        skippedPermutations = skippedPermutations + permutationsWithIthElementAsTheFirstElement;
        continue
      }
      else {
        partialSolution.add(input[i]);
        backtrack(partialSolution)
        partialSolution.delete(input[i]);
      }
    }
  }
  backtrack(partialSolution)
  console.log(kthPermutation);
  return
}

function restoreIpAddresses (s){
  {
    // let result = []

    // function generatecandidates(availablechoices)
      // let candidates = []
      // for i: 1 to 3
        // if availablechoices.length < i
          // break
        // let candidate = availablechoices.slice(0, i)........candidates > 255
        // if Number(candidates) > 255
          // continue
        // if Number(candidate) == 0 and i == 1 .....candidates with trailing 0
          // candidates.push(candidate)
          // return
        // candidates.push(char)
      // return choices

    // function backtracking (partialsolution, currentindex, availablechoices)
      // if currentindex == s.length
        // result.push(partialsolution)
        // return
      // let candidates = generatecandidates()
      // for i: 0 to candidates.length
        // newPartialSolution = partialsolution.concat(partialsolution.length ? `.${candidates[i]}` : candidates[i])
        // newIndex = currentindex + candidates[i].length
        // newAvailableChoices = avalablechoices.slice(candidates[i].length], availablechoices.length)
        // backtrack(newPartialSolution, currentindex, availablechoices)
  }
  let result = []

  // valid candidates are the first single digit number, the first two digit number, and the first 3 digit number smaller than 255.
  function generateCandidates(availableChoices){
    let candidates = [];
    for (let i = 1; i <= 3; i++){
      // if the input string itself is smaller than 3, you are not getting a 3 digit number out of it; we only go as far as the length of the input
      if(availableChoices.length < i){
        break
      }
      let candidate = availableChoices.slice(0, i);
      // if the 3 digit number is greater than 255, it is invalid
      if(Number(candidate) > 255){
        continue
      }
      // if it's just a 0 and not a 0 trailing another integer(0 is valid, 010 or 021 is invalid), it is a valid candidate
      if(Number(candidate) == 0 && i == 1){
        candidates.push(candidate)
        break;
      }
      candidates.push(candidate)
    }
    return candidates
  }
  function backtrack ( partialSolution, currentIndex, availableChoices, totalSegments){
    // if i am at the last element, all if i have to check is whether the number of segments is equal to 4 (the octets)
    if (currentIndex == s.length){
      if(totalSegments != 4){
        return
      }
      result.push(partialSolution)
      return
    }
    // generate candidates
    let candidates = generateCandidates(availableChoices);

    // for each candidate
    for(let i = 0; i < candidates.length; i++){
      // include the current candidate in the partial solution (we are adding a period depending upon the octet)
      let newPartialSolution = partialSolution.concat(partialSolution.length ? `.${candidates[i]}` : candidates[i])
      // new index is current index incremented by the size of our current candidate
      let newIndex = currentIndex + candidates[i].length;
      // new available choices is current available choices with the selected substring sliced out
      let newAvailableChoices = availableChoices.slice(candidates[i].length, availableChoices.length)
      backtrack(newPartialSolution, newIndex, newAvailableChoices, totalSegments + 1)
    }
  }
  backtrack("", 0, s, 0)
  console.log(result);
  return result
}

function generateParenthesis (n){
  let input = "";
  let mystack = new stack();
  let result = [];
  let set = new Set();

  // generate a sorted input array of parenthesis. sorted array helps in generating unique permutations
  for(let i = 0; i < n; i++){
    input = input.concat("(")
  }
  for(let i = 0; i < n; i++){
    input = input.concat(")")
  }
  
  function backtrack (partialsolution, alreadyincluded, stack){
    // our partial solution is a complete solution if its length equals the lenght of the input and the permutation so formed is valid
    if(partialsolution.length == input.length){
      // load up the stack with each parenthesis in the partial solution such that
      for(let i = 0; i < partialsolution.length; i++){
        let char = partialsolution.charAt(i);
        // if the top parenthesis currently in the stack and the current parenthesis form together a complete parenthesis, we remove the top parenthesis and throw away the current parenthesis
        if(stack.top == "(" && char == ")"){
          stack.pop()
        }
        // other wise we push it to the stack
        else{
          stack.push(char)
        }
      }
      // after every parenthesis in the partial solution has been checked, if the stack is empty, every parenthesis in partial solution formed a complete pair
      if(stack.size == 0){
        result.push(partialsolution);
      }
      // empty the stack
      while(stack.size != 0){
        stack.pop()
      }
      return
    }
    // lastPicked is needed to generate unique permutations 
    let lastPicked = null;

    for(let i = 0; i < input.length; i++){
      // my available candidates are parenthesis not already in my partial solution, and parenthesis that aren't duplicates of my current paren.
      if(alreadyincluded.has(i) || lastPicked == input.charAt(i)){
        continue
      }
      // update lastPicked,  hashset  and the partial solution to include the current paren
      lastPicked = input.charAt(i);
      alreadyincluded.add(i);
      let char = input.charAt(i);
      backtrack(partialsolution.concat(char), alreadyincluded, stack);
      alreadyincluded.delete(i);
    }

  }
  backtrack("", set, mystack)
  console.log(result);
  return result
}


function canPartitionKSubsets(nums, k){
  {
    // This is a dynamic programming question and the backtracking solution will give TLE in javascript. The same solution passes in faster languages like cpp. Neetcode had it in his backtracking section. LC has added additional testcases that require memoization. I am leaving the backtracking solution because I struggled a lot with this question. But dp is the way to go. Every other list has this in dp section so im guessing Neetcode solved it when leetcode didn’t have the newer testcases. I am leaving both the solutions and will revisit this when i have learnt dp.
  }

  let havefoundksubsets = false;
  let subsetsum = 0;
  let total = 0;
  let temporary = []
  let hashset = new Set();

  for(let i = 0; i < nums.length; i++){
    total = total + nums[i];
  }
  subsetsum = total / k;

  function backtrack(temp, alreadyincluded, sumsofar, totalsubsets, currentindex){
   
    if(havefoundksubsets == true || totalsubsets == k){
      havefoundksubsets = true;
      return
    }
    if(sumsofar == subsetsum){
      for(let i =0; i < temp.length; i++){
        alreadyincluded.add(temp[i])
      }
      let nextindex = 0
      for(let i = 0; i < nums.length; i++){
        if(!alreadyincluded.has(i)){
          break
        }
        else nextindex++
      }
      backtrack([], alreadyincluded, 0, totalsubsets+1, nextindex)
      for(let i =0; i < temp.length; i++){
        alreadyincluded.delete(temp[i])
      }
      return
    }
    if(currentindex >= nums.length ||sumsofar > subsetsum){
      return
    }

    let nextindex = currentindex+1;
    for(let i = currentindex + 1; i < nums.length; i++){
      if(!alreadyincluded.has(i)){
        break
      }
      else nextindex++
    }

    temp.push(currentindex)
    backtrack(temp, alreadyincluded, sumsofar + nums[currentindex], totalsubsets, nextindex)

    temp.pop()
    backtrack(temp, alreadyincluded, sumsofar, totalsubsets, nextindex)
  }
  backtrack(temporary, hashset, 0,0,0)
  console.log(havefoundksubsets);
  return havefoundksubsets
}


// function canPartitionKSubsets (nums, k){
// // Absolutely brain dead solution that gives tle on leetcode (9000ms lmao). but it works.

//   let total = 0;
//   let index = 0;
//   let result = [];
//   let totalSubsets = 0;
//   let haveFound = false;
//   let subsetSum; 
//   let partialSOlution = []
//   let alreadyInPartition = new Set();
 

//   while(index != nums.length){
//     total += nums[index];
//     index++;
//   }
//   subsetSum = total/k;

//   function generate_candidates (alreadyIndcluded){
//     let candidatesIndices = [];
//     let temp = []
//     let firstElementNotIncluded = 0;
//     for(let i = 0; i < nums.length; i++){
//       if(!alreadyIndcluded.has(i)){
//         break
//       }
//       else{
//         firstElementNotIncluded++
//       }
//     }

//     function backtrack(index, sumsofar, temp){
//       if(sumsofar == subsetSum){
//         candidatesIndices.push(Array.from(temp))
//         return
//       }
//       if(sumsofar > subsetSum || index >= nums.length){
//         return
//       }
      
//       let nextIndexNotIncluded = index+1;
//       for(let i = index + 1; i < nums.length; i++){
//         if(!alreadyIndcluded.has(i)){
//           break
//         }
//         else{
//           nextIndexNotIncluded++
//         }
//       }
//       temp.push(index);
//       backtrack(nextIndexNotIncluded, sumsofar + nums[index], temp)
//       temp.pop()
//       backtrack(nextIndexNotIncluded, sumsofar, temp)
//     }

//     backtrack(firstElementNotIncluded, 0, temp);
//     return candidatesIndices;
//   }

//   function backtrack (partialSolution, alreadyInPartition){
//    let candidates = generate_candidates(alreadyInPartition);
//   //  console.log(candidates);
//   if(haveFound){
//     return
//   }
//    if(candidates.length == 0){
//     if(partialSolution.length >= k){
//       result.push(Array.from(partialSolution))
//       haveFound = true
//      }
//     return
//    }

//    if(partialSolution.length >= k){
//     result.push(Array.from(partialSolution))
//     haveFound = true
//     return
//    }
   
//    for(let i = 0; i < candidates.length; i++){
//     // add
//     let temp = []
//     for(let j = 0; j < candidates[i].length; j++){
//       alreadyInPartition.add(candidates[i][j]);
//       temp.push(nums[candidates[i][j]])
//     }
//     partialSolution.push(temp)
//     backtrack(partialSolution, alreadyInPartition)

//     // remove
//     for(let k = 0; k < candidates[i].length; k++){
//       alreadyInPartition.delete(candidates[i][k])
//     }
//     partialSolution.pop()
//    }

//   }

//   backtrack(partialSOlution, alreadyInPartition);
//   console.log(result, haveFound);
//   return haveFound
// }

function palindromePartition (s) {
 let result = []
 let partialSolution = []

//  helper function to check palindrome
 function isPalindrome(string){
  if(string.length == 1){
    return true
  }
  else if(string.length == 2){
    return string.charAt(0) == string.charAt(string.length-1);
  }
  else{
    if(string.charAt(0) == string.charAt(string.length-1)){
      return isPalindrome(string.slice(1, string.length-1))
    }
    else return false
  }
 }

 function generatePalindromicSubstrings(string){
  let candidates = []
  // start pointer wont move because you want all the palindromic substrings including the 0th character
  let start = 0;
  // end will decrement after every iteration because how else would you get all palindromic substrings that include the 0th character
  let end = string.length;
  while(end != start){
    // slice out the string bounded by start and end pointers, and check if it's a palindrome
    let input = string.slice(start, end)
    let isPal  = isPalindrome(input);
    // if it is, it is a candidate
    if(isPal){
      candidates.push(input)
    }
    end--;
  }
  return candidates;
 }

 function backtrack (string, partialSolution, processedCharacters){
  // if the characters processed so far are the same as characters in the input, we have a complete solution
  if(processedCharacters >= s.length){
    result.push(Array.from(partialSolution))
    return
  }
  // generate every palindromic substring that includes the 0th character
  let candidates = generatePalindromicSubstrings(string)
  // for every such substring
  for(let i = 0; i < candidates.length; i++){
    // include the ith candidate in my partial solution
    partialSolution.push(candidates[i])
    // backtrack on the string that's left after slicing the ith substring out of it;
    backtrack(string.slice(candidates[i].length), partialSolution, processedCharacters + candidates[i].length)
    partialSolution.pop();
  }
 }
 backtrack(s, partialSolution, 0)
 console.log(result);
 return result
}

function subsets2 (nums){
  // you aren't gonna have a nice time skipping duplicates in a backtracking question if you don't sort the input before hand
  nums.sort()
  let result = [];
  let partialSolution = [];

  function isasolution (index){
    // remember, in a combination type backtracking problem, your index argument tracks the element you are at currently; you dont wanna go out of bounds
    return index == nums.length;
  }
  // processing a complete solution means pushing it to a result array.
  function processsoluiton (partialsolution){
    result.push(Array.from(partialsolution))
  }
  // main bactracking function
  function backtrack (partialsolution, index){
    if(isasolution(index) == true){
      processsoluiton(partialsolution)
      return
    }
    // else block was un-necessary
    else {
      // possible choices you have is to either include the current element or not include it;
      let candidates = [true, false];
      // for each candidate
      for(let i = 0; i < candidates.length; i++){
        // either include it and backtrack on the next adjacent element
        if(candidates[i] == true){
          partialsolution.push(nums[index])
          backtrack(partialsolution, index+1)
          partialsolution.pop()
        }
        // or exclude it and its duplicates as well and backtrack on the next unique elements
        else{
          // i used a skip counter; you can use a newIndex variable that directly calculates the next index to call bactracking function on
          let skipCount = 0;
          for(let i = index+1; i < nums.length; i++){
            // if the element is equal to the current element; increment the number of skips that we'll be doing
            if(nums[i] == nums[index]){
              skipCount++
            }
          }
          // backtrack on our current index increment by the number of skips.
          backtrack(partialsolution, index+skipCount+1)
        }
      }
    }
  }
  backtrack(partialSolution, 0)
  console.log(result);
  return result

}

function letterCombinations (digits){
  // generate your own input using a hashMap; i know this is not a hashMap, i'm too lazy to change it now and since there wont be frequent insertions, the performance difference is negligible;
  let input = {
      "2" : ["a","b","c"],
      "3" : ["d","e","f"],
      "4" : ["g","h","i"],
      "5" : ["j","k","l"],
      "6" : ["m","n","o"],
      "7" : ["p","q","r","s"],
      "8" : ["t","u","v"],
      "9" : ["w","x","y","z"]
    }
  
  let size = digits.length;
  let partialSolution = "";
  let result = new Set();

  // your partial solution becomes a complete solution when we have one element associated with each letter; since generate_candidates ensures that you  get characters associated with only one letter, you can just check if the lenght of your partial solution is equal to the length of digits
  function isASolution (partialSolution){
    return  partialSolution.length == size;
  }

  // processing the solution means pushing to a result array
  function processSolution (partialSolution){
    result.add(partialSolution)
  }

  // createCandidates takes an index and queries it for a list of characters associated with the letter at that index; for ex; for letter 2 it returns [a, b, c];
  function createCandidates (digits,index){
    let number = digits.charAt(index);
    return input[number];
  }
  // main backtracking function
  function backtrack (digits,partialSolution, index){
    if(isASolution(partialSolution) == true){
      processSolution(partialSolution)
      return
    }
    else{
      // generate candidates
      let candidates = createCandidates(digits, index);
      // for each candidate
      for(let i = 0; i < candidates.length; i++){
        // update the partial solution to include the candidate and call backtracking on the next index;
        backtrack(digits,partialSolution.concat(candidates[i]), index+1)
      }
    }
  }
  backtrack(digits,partialSolution, 0)
  console.log(result);
  return Array.from(result);
}

function combinationSum(candidates, target){
  let result = []
  let partialsolution = [];
  function backtrack(partialSolution, index, sumSoFar){
      // the partial solution is a complete solution if its elements add up to a given target
      if (sumSoFar == target){
          result.push(Array.from(partialSolution))
          return
      }
      // but if your sum becomes too large, or your index goes out of bounds, you gotta exit; it's important to have this condition after the initial check for target because you may get a target sum when you are at the last element
      if(sumSoFar > target || index == candidates.length){
          return
      }
      // generate possible candidates; [either you include the current element or you dont]
      let potentialCandidates = [true, false]
      // for each possible candidate
      for(let i = 0; i < potentialCandidates.length; i++){
          if(potentialCandidates[i] == true){
              partialSolution.push(candidates[index])
              // you can include duplicates of the current element; no need to move to the next adjacent element just yet; see if we could create a complete solution by including the duplicates of the current element
              backtrack(partialSolution, index, sumSoFar + candidates[index])
              // backtrack on your selection; 
              partialSolution.pop()
          }
          else{
              // include the next adjacent element because the last path we chose didn't lead to a complete solution;
              backtrack(partialSolution, index+1, sumSoFar)
          }
      }
  }
  backtrack(partialsolution, 0, 0)
  return result
}

function combinationsum2(candidates, target) {
  let partialSolution = [];
  let result = [];
  candidates.sort();

  function isASolution(sumSoFar) {
    // the partial solution is a complete solution if its elements add up to a given target
    return sumSoFar == target;
  }
  function processSolution(partSolution) {
    // processing a solution means pushing it to a result array
    result.push(Array.from(partSolution));
    return;
  }
  function generateCandidates() {
    // for every index i, your available choices are true or false, true corresponds to including the element and false corresponds to excluding the element
    return [true, false];
  }
  function backtrack(partialSolution, index, sumsofar) {
    if (isASolution(sumsofar)) {
      processSolution(partialSolution);
      return;
    }
    // exit condition; this should've been included in isASolution function tbh; 
    if (index == candidates.length || sumsofar > target){
      return;
    }

    // generate candidates
    let potentialCandidates = generateCandidates();

    // here, your next index to call backtrack function on cannot be your next adjacent element if it is a duplicate; 
    // you can use a skip counter like in the current implementation below and use (index + skipCounter + 1) as an argument; you can also initialize nextIndex to currentIndex + 1 and iterate till you find a new value and then use newIndex as argument; the latter is cleaner and that is what i've done in other questions.
    let skipIndexCOunt = 0;
    for(let i = index+1; i < candidates.length; i++){
      // if the element is a duplicate, increment the skip counter
        if (candidates[i] == candidates[index]){
            skipIndexCOunt++;
        }   
    }
    // for each candidate
    for (let i = 0; i < potentialCandidates.length; i++) {
      // include the element
        if (potentialCandidates[i] == true) {
            partialSolution.push(candidates[index]);
            backtrack(partialSolution, index + 1, sumsofar + candidates[index]);
            partialSolution.pop();
          } 
      // exclude the element
        else {
          // here you have to add the skip counter to your current index; calculating the newIndex directly would have been cleaner
            backtrack(partialSolution, index +skipIndexCOunt+1, sumsofar);
          }
    }
  }
  backtrack(partialSolution, 0, 0);
  console.log(result);
  return result;
}


function wordSearch(board, word) {
  let firstChar = word.charAt(0);
  let noOfColumns = board[0].length;
  let noOfRows = board.length;
  let containsWord = false;
  let hashSet = new Set();

  backtrack(firstChar, "", 0);
  return containsWord;

  function availableIndexes (character, index){
      // available candidates;
      let choices = []
      // if index isn't  provided, it is the first call to generate all available candidates. we have to search the entire matrix for a matching character and not just in a grid around a certain index.
      if (!index){
          for(let i = 0; i < noOfRows; i++){
              for(let j = 0; j < noOfColumns; j++){
                  if(board[i][j] == character){
                      choices.push(`${i}${j}`)
                  }
              }
          } 
      }
      // else, search in a grid around a given index for a matching character
      else{
         let row = Number(index.charAt(0));
         let column = Number(index.charAt(1));

          // topElement
          if(row != 0){
              if(board[row-1][column] == character){
                  choices.push(`${row-1}${column}`)
              }
          }
          // rightElement
          if(column != noOfColumns-1){
              if(board[row][column+1] == character){
                  choices.push(`${row}${column+1}`)
              }
          }
          // bottomElement
          if(row != noOfRows -1){
              if(board[row+1][column] == character){
                  choices.push(`${row+1}${column}`)
              }
          }
          // leftElement
          if(column!=0){
              if(board[row][column-1] == character){
                  choices.push(`${row}${column-1}`)
              }
          }
      }
      return choices
  }

  function backtrack (nextChar, currentString = "", currentIndex = 0, location = null){
      // if the current partial solution is a complete solution => return
      if(currentString == word){
          containsWord = true;
          return
      }
      // if the search space has been exhaustively covered and there is nothing left to do => return
      if(nextChar == null){
          return
      }
      // else
      else{
          // generate available candidates, the characters matching the nextChar and are also adjacent to the index represented by location
          let searchSpace = availableIndexes(nextChar, location);
          // if no adjacent characters exist and available candidates returned an empty array => return
          if(searchSpace.length == 0){
              return
          }
          for(let i = 0; i < searchSpace.length; i++){
              // if i already represents the last char in word, next char is obviously null; otherwise it's the next character in the input string
              let newNextChar = currentIndex == word.length -1 ? null :  word.charAt(currentIndex+1);
              // update the partialSolution to include the current character
              let newCurrentString = currentString.concat(nextChar);
              // if we haven't already found a solution
               if(!containsWord){
                // and if the hashset doesn't already contain the char at index i;
                  if (!hashSet.has(searchSpace[i])){
                      //have the current index be included in the hashset
                      hashSet.add(searchSpace[i]);
                      //call backtrack on the next char 
                      backtrack(newNextChar, newCurrentString, currentIndex + 1, searchSpace[i])
                      // backtrack on the current index because it didn't lead to a complete solution
                      hashSet.delete(searchSpace[i])
                  } 
              }
          }
          
      }
  }
}

function permutations2(nums) {
  {
  // Good question in that it teaches you how to handle duplicates in apermutaion problem;
  // for any given index i, you want to pick only unique, non-selected elements from the given input. This would require you to skip: 
  // 1 ⇒ the elements already existing in your partialSolution from the previous calls made to your backtracking function, and
  // 2 ⇒ the elements that do not exist in your partialSolution, but are a duplicate of the current element.
  // keeping track of the last selected element using a variable - lastPicked- outside of the for loop  will handle the second kind of elements - the ones that are duplicates. But duplicate elements can be selected for subsequent indexes? If you use hashset to keep track of selected values, it will not work. So use a hashset to keep track of indexes of selected elements instead of values , and skip the indexes that are already in your partialSolution. And dont forget to sort nums before starting else duplicates would not sit    adjacent to one another and that woul make skpping them a nightmare.
  // this question is kinda tricky so it's just better to kinda memorize how to handle duplicates in a permutaion problem. 
  }
  let result = [];
  let sorted = nums.sort();
  let pickedIndexes = new Set();
  function backtrack(partialsolution) {
    if (partialsolution.size == sorted.length) {
      let temp = [];
      let indexes = Array.from(partialsolution);
      for (let i = 0; i < indexes.length; i++) {
        temp.push(nums[indexes[i]]);
      }
      result.push(temp);
      return;
    }
    let lastPicked = null;
    for (let i = 0; i < sorted.length; i++) {
      if (sorted[i] != lastPicked) {
        if (!partialsolution.has(i)) {
          lastPicked = sorted[i];
          partialsolution.add(i);
          backtrack(partialsolution);
          partialsolution.delete(i);
        }
      }
    }
  }
  backtrack(pickedIndexes);
  console.log(result);
  return result;
}

function combinationSum3(k, n) {
  {
    // standard combination generation question with a twist => your partial solution is a complete solution if it has length = k, and its elements sum upto n;
    // you can have multiple early exist conditions in this question;
    // if partialSolution's length at any point becomes greater than k => exit early;
    // if partialSolution's sum becomes larger than n => exit early;
    // In combination type backtracking questions, your index parameter tracks the element you are considering; make sure it doesn't go out of bounds. In permutation type questions, you loop over the input in a for loop so this is not something you have to especially be mindful of.
  }

  let choices = [];
  let chosen = [];
  for (let i = 1; i <= 9; i++) {
    choices.push(i);
  }
  function backtrack(sumSofar, index = 0) {
    if (sumSofar == n) {
      if (chosen.length == k) {
        console.log(chosen);
        return;
      }
    }
    if (sumSofar > n) {
      return;
    }
    if (chosen.length > k) {
      return;
    }
    if (index > choices.length) {
      return;
    }

    chosen.push(choices[index]);
    backtrack(sumSofar + choices[index], index + 1);

    chosen.pop();
    backtrack(sumSofar, index + 1);
  }
  backtrack(0);
}

function permuteAString(string) {
  {
    // again, a fairly straightforward permutation generation question for a set of size = string.length
    // your partial solution is a complete solution when its length becomes equal to 3;
    // your available candidates are characters that were in the original string minus the charaters that are already in your partial solution
    // processing a complete solution means printing to the console
  }
  let result = [];
  let stringArray = Array.from(string);
  function backtrack(availableChoices, choicesMadeSoFar, indexToTerminateAt) {
    if (indexToTerminateAt > availableChoices.length - 1) {
      console.log(choicesMadeSoFar);
      return;
    }
    for (let i = 0; i < availableChoices.length; i++) {
      if (availableChoices[i] != null) {
        let temp = availableChoices[i];
        choicesMadeSoFar.push(availableChoices[i]);
        availableChoices[i] = null;
        backtrack(availableChoices, choicesMadeSoFar, indexToTerminateAt + 1);
        availableChoices[i] = temp;
        choicesMadeSoFar.pop();
      }
    }
  }
  backtrack(stringArray, result, 0);
}

function printDiceRollCombinations(noOfDices) {
  {
    // fairly straightforward permutation generation for a set of size 3 with each element lying in the range 1 to 6 inclusive.
    // your partial solution is a complete solution when its length becomes equal to 3;
    // your available candidates are integers between your current index and 6;
    // processing a complete solution means printing to the console
  }

  let result = [];
  function backtrack(currentState, index) {
    if (index == noOfDices) {
      console.log(currentState);
      return;
    }
    for (let i = 1; i <= 6; i++) {
      currentState.push(i);
      backtrack(currentState, index + 1);
      currentState.pop();
    }
  }
  backtrack(result, 0);
}
