// questions solved: 36

// coinChange([1,2,5], 11)                                       //lc:322  medium
// canPartition([14,9,8,4,3,2])                                  //lc:416  medium
// rob([1,2])                                                    //lc:198  medium
// numDecodings("111111111111111111111111111111111111111111111") //lc:91   medium *
// canJump([3,2,1,0,4])                                          //lc:55   medium
// combinationSum4([1,2,3], 4)                                   //lc:377  medium *
// wordBreak("applepenapple", ["apple","pen"])                   //lc:139  medium
// longestPalindrome("babaddtattarrattatddetartrateedredividerb")//lc:5    medium two pointers solution is way faster
// uniquePaths(3, 7)                                             //lc:62   medium
// rob2([114,117,207,117,235,82,90,67,143,146,53,108,200,91,80,223,58,170,110,236,81,90,222,160,165,195,187,199,114,235,197,187,69,129,64,214,228,78,188,67,205,94,205,169,241,202,144,240])                                                //lc:213  medium *
// findTargetSumWays([1,1,1,1,1], 3)                             //lc:494  medium
// maxProfit([7,1,5,3,6,4])                                      //lc:121  easy
// maxProfit2([1,2,3,0,2])                                       //lc:309  medium
// isInterleave("aabcc", "dbbca", "aadbbcbcac")                  //lc:97   medium
// coinChange2(5, [1,2,5])                                       //lc:518  medium
// numSquares(7929)                                              //lc:279  medium *
// countGoodStrings(10000, 10000, 2, 8)                          //lc:2466 medium
// mostPoints([[1,1],[2,2],[3,3],[4,4],[5,5]]);                  //lc:2140 medium
// lengthOfLIS([18,55,66,2,3,54]);                               //lc:300  medium *
// longestArithSeqLength([3,6,9,12])                             //lc:1027 medium *
// minDistance("horse", "ros")                                   //lc:72   medium
// mincostTickets([1,2,3,4,6,8,9,10,13,14,16,17,19,21,24,
// 26,27,28,29], [3,14,50])                                      //lc:983  medium
// minCost(7, [1,3,4,5])                                         //lc:1547 hard   *
// numDistinct("rabbbit", "rabbit")                              //lc:115  hard
// uniquePathsWithObstacles([[0,0],[0,1]])                       //lc:63   medium
// minInsertions("mbadm")                                        //lc:1312 hard
// minimumTotal([[2],[3,4],[6,5,7],[4,1,8,3]])                   //lc:
// maxSumAfterPartitioning([1,15,7,9,2,5,10], 3)                 //lc:
// maxProfit4(2, [3,2,6,5,0,3]) tle                              //lc:     hard
// findLength( [0,1,1,1,1], [1,0,1,0,1])
// max_p_amzn([3,2,5,6,1])
// longestPalindrome2("")
// maximumLength([30,30,29], 0)
// maxSubArray([-2,1,-3,4,-1,2,1,-5,4]);
// maxProduct([-2,0,-1])
// processor([4,4,6,2,5], 3, 4);                                 //reddit
// lps("bbbab");                                                 //lc:     medium
// ..........................................................................................................................................................................
function lps(str){
    let memo = new Array(str.length);
    for(let i = 0; i < memo.length; i++){
        memo[i] = new Array(str.length).fill(-1);
    }
    let max = dp(0, str.length-1);
    console.log(max);
    return max;
    function dp(start, end){
        if(memo[start][end] != -1){
            return memo[start][end];
        }
        else if (start == end){
            memo[start][end] = 1
            return 1;
        }
        else if(start > end){
            return 0
        }
        let max;
        if(str.charAt(start) == str.charAt(end)){
            max = 2 + dp(start+1, end - 1);
        }
        else{
            max = Math.max(dp(start+1, end), dp(start, end-1));
        }
        memo[start][end] = max;
        return max;
    }
}

function processor(data, pA, pB){
    let pref = new Array(data.length).fill(0);
    let pref_sum = 0;
    for(let i = 0; i < data.length; i++){
        pref[i] = data[i] + pref_sum;
        pref_sum += data[i]; 
    }
    let min = Math.min(dp(4, 1), dp(0, 1));
    console.log(min);
    return min;
   
    function dp(pA_total_tasks, index){
        if(index == data.length){
            return Math.max(pA * pA_total_tasks, pB * (pref[index-1] - pA_total_tasks));
        }
        let time_taken_henceforth = Math.min(dp(pA_total_tasks + data[index], index+1), dp(pA_total_tasks, index+1));
        return time_taken_henceforth;
    }
}

function maxProduct(nums){
    let memo = new Array(nums.length);
    memo.fill([null,null]);
    let max = Number.MIN_SAFE_INTEGER;
    for(let i = 0; i < nums.length; i++){
        max = Math.max(max, dp(i)[0]);
    }
    console.log(max);
    return max;

    function dp(ind){
        if(ind == nums.length-1){
            // [max, min];
            return [nums[ind], nums[ind]];
        }
        else if(memo[ind][0] != null && memo[ind][1] != null){
            return memo[ind];
        }
        else{
            let res;
            if(nums[ind] > 0){
                res =  [Math.max(nums[ind], nums[ind] * dp(ind+1)[0]), Math.min(nums[ind], nums[ind] * dp(ind+1)[1])];
            }
            else if(nums[ind] < 0){
                res =  [Math.max(nums[ind], nums[ind] * dp(ind + 1)[1]), Math.min(nums[ind], nums[ind] * dp(ind+1)[0])]
            }
            else res = [0,0];
            memo[ind] = res;
            return res;
        }
    }
}

function maxSubArray(nums){
    let max = Number.MIN_SAFE_INTEGER;
    let memo = new Array(nums.length);
    memo.fill(-1);
    for(let i = 0; i < nums.length; i++){
        if(memo[i] != -1){
            max = Math.max(max, memo[i]);
            continue;
        }
        max = Math.max(max, dp(i));
    }
    console.log(max);
    return max;
    function dp(i){
        if(i == nums.length-1){
            memo[i] = nums[i]
            return memo[i];
        }
        else if(memo[i] != -1){
            return memo[i];
        }
        else{
            memo[i] = Math.max(nums[i] + dp(i+1), nums[i]);
            return memo[i];
        }
    }
}

function maximumLength(nums, k){
    let memo = new Array(nums.length);
    for(let i = 0; i < memo.length; i++){
        memo[i] = new Array(nums.length);
    }
    let max = dp(-1, k);
    console.log(max);
    return max;

    function dp(last_ind, k){
        if(last_ind == nums.length-1){
            return 0;
        }
        if(memo[last_ind+1][k]){
            return memo[last_ind+1][k]
        }
        let max = Number.MIN_SAFE_INTEGER;
        for(let i = last_ind + 1; i < nums.length; i++){
            if(last_ind == -1 || nums[i] == nums[last_ind]){
                max = Math.max(max, 1 + dp(i, k));
            }
            else{
                if(k == 0){
                    continue;
                }
                else{
                    max = Math.max(max, 1 + dp(i, k-1));
                }
            }
        }
        memo[last_ind+1][k] = max < 0 ? 0 : max
        return max < 0 ? 0 : max;
    }
}

function longestPalindrome2(s){
    let map = new Map();
    let longest = "";
    dp(0, s.length-1);
    console.log(longest);
    return longest;

    function dp(start, end){
        if(map.has(`${start},${end}`)){
            return map.get(`${start},${end}`);
        }
        if(start == end || start + 1 == end){
            if(s.charAt(start) == s.charAt(end)){
                map.set(`${start},${end}`, true);
                longest = end - start + 1 > longest.length ? s.slice(start, end + 1) : longest;
                return true;
            }
        }

        if(s.charAt(start) == s.charAt(end) && dp(start+1, end-1) == true){
            map.set(`${start},${end}`, true);
                longest = end - start + 1 > longest.length ? s.slice(start, end + 1) : longest;
                return true
        }
        else{
            dp(start+1, end);
            dp(start, end-1);
            map.set(`${start},${end}`, false);
            return false;
        }
    }
}


function max_p_amzn(pl){
    let max = dp(0, 0)
    console.log(max);
    return max;

    function dp(index, pref_sum){
        if(index == pl.length){
           if(pref_sum > 0){
            return 0
           }
           else return Number.MIN_SAFE_INTEGER;
        }
        let highest_p;
        if(pref_sum > pl[index]){
            highest_p = Math.max(1 + dp(index+1, pref_sum - pl[index]), dp(index + 1, pref_sum + pl[index]));
        }
        else{
            highest_p = dp(index + 1, pref_sum + pl[index]);
        }
        return highest_p;
    }
}

// tle from m*n memoization
function findLength(nums1, nums2){
    let memo = new Map();
    let max_len = dp(0, 0, 0);
    console.log(max_len);
    return max_len;

    function dp(s1_ind, s2_ind, prefix_matched){
        if(memo.has(`${s1_ind},${s2_ind},${prefix_matched}`)){
            return memo.get(`${s1_ind},${s2_ind},${prefix_matched}`);
        }
        // base case
        if(s1_ind == nums1.length || s2_ind == nums2.length){
            return 0
        }
        let max_substring = 0;
        // if the s1 char matches the s2 char
        if(nums1[s1_ind] == nums2[s2_ind]){
            // if the prefix of nums1 ending at s1_ind - 1 exactly matches the prefix of nums2 ending at index s2_ind-1, the current and the subsequent chars also need to be exact matches
            if(prefix_matched == 1){
                max_substring = 1 + dp(s1_ind+1, s2_ind+1, 1);
            }   
            // if there isn't a prefix that's been matched
            else{
                max_substring = Math.max(1 + dp(s1_ind+1, s2_ind+1, 1), dp(s1_ind+1, s2_ind, 0), dp(s1_ind, s2_ind+1, 0));
            }
        }
        // else if the s1 char does not match the s2 char
        else{
            if(prefix_matched == 0){
                max_substring = Math.max(dp(s1_ind+1, s2_ind, 0), dp(s1_ind, s2_ind+1, 0));
            }
            else{
                return 0;
            }
        }
        memo.set(`${s1_ind},${s2_ind},${prefix_matched}`, max_substring)
        return max_substring;
    }
}

// tle O(n^2*k)
function maxProfit4(k, prices){
    let memo = new Map();
    let max = dp(0, k);
    console.log(max, count);
    return max;

    function dp(index, rem_sale){
        if(memo.has(`${index},${rem_sale}`)){
            return memo.get(`${index},${rem_sale}`);
        }
        if(rem_sale == 0 || index >= prices.length-1){
            return 0;
        }
        let max_amount = Number.MIN_SAFE_INTEGER;
        // either purchase the stock at curr index 
        for(let i = index+1; i < prices.length; i++){
            // and sell it later at a higher price
            if(prices[i] > prices[index]){
                max_amount = Math.max(max_amount, prices[i] - prices[index] + dp(i+1, rem_sale-1));
            }
        }
        // or skip the stock at the current index and purchase some other stock in the range index+1 -> n.
        max_amount = Math.max(max_amount, dp(index+1, rem_sale));
        memo.set(`${index},${rem_sale}`, max_amount)
        return max_amount;
    }
}

function maxSumAfterPartitioning(arr, k){
    let max_sum = dp(0);
    console.log(max_sum);
    return max_sum;

    function dp (ind){
        if(ind == arr.length-1){
            return arr[ind];
        }
        if(ind >= arr.length){
            return 0
        }

        let max = arr[ind];
        let max_element = arr[ind];
        let max_subarr_sum = Number.MIN_SAFE_INTEGER;
        for(let i = ind; i < ind + k && i < arr.length; i++){
            max_element = Math.max(max_element, arr[i]);
            max_subarr_sum = (i - ind + 1) * max_element;
            max = Math.max(max, max_subarr_sum + dp(i+1));
        }
        return max;
    }
}

function minimumTotal (triangle){
    let min = dp(0,0);
    console.log(min);
    return min;

    function dp(row_ind, col_ind){
        if(row_ind == triangle.length){
            return 0
        }

        let min_from_next_row = Math.min(triangle[row_ind][col_ind] + dp(row_ind+1, col_ind), triangle[row_ind][col_ind] + dp(row_ind+1, col_ind+1));
        return min_from_next_row;
    }
}

function minInsertions(s){
    let memo = new Map()
    let min_insertions = dp(0, s.length-1);
    console.log(min_insertions);
    return min_insertions;

    function dp(start_ind,end_ind){
        if(memo.has(`${start_ind},${end_ind}`)){
            return memo.get(`${start_ind},${end_ind}`);
        }
        if(start_ind >= end_ind){
            return 0
        }
        let min_inserts;
        if(s.charAt(start_ind) == s.charAt(end_ind)){
            min_inserts = dp(start_ind+1, end_ind-1);
        }
        else{
            min_inserts = Math.min(1 + dp(start_ind+1, end_ind), 1 + dp(start_ind, end_ind-1))
        }
        memo.set(`${start_ind},${end_ind}`, min_inserts);
        return min_inserts;
    }
}

function uniquePathsWithObstacles(obstacleGrid){
    if(obstacleGrid[obstacleGrid.length-1][obstacleGrid[0].length-1] == 1){
        return 0
    }
    let ways = dp(obstacleGrid.length-1, obstacleGrid[0].length-1)
    console.log(ways);
    return ways;

    function dp (row, col){
        // base cases
        if(row == 0 && col == 1){
            if (obstacleGrid[row][col] == 0){
                return 1
            }
            else return 0
        }
        if(row == 1 && col == 0){
            if (obstacleGrid[row][col] == 0){
                return 1
            }
            else return 0
        }
        let num_of_ways_to_reach_curr = 0
        if(row - 1 >= 0 && obstacleGrid[row-1][col] == 0){
            num_of_ways_to_reach_curr += dp(row-1, col);
        }
        if(col - 1 >= 0 && obstacleGrid[row][col-1] == 0){
            num_of_ways_to_reach_curr += dp(row,col-1);
        }
        return num_of_ways_to_reach_curr;
    }
}

function numDistinct(s, t){
    let num = dp(0, 0);
    console.log(num);
    return num;

    function dp (s_ind, t_ind){
        if(t_ind == t.length){
            return 1;
        }
        if(s_ind == s.length){
            return 0;
        }

        let num_of_ways_to_build_t = 0;
        if(s.charAt(s_ind) == t.charAt(t_ind)){
            num_of_ways_to_build_t += dp(s_ind+1,t_ind+1) + dp(s_ind+1, t_ind);
        }
        else{
            num_of_ways_to_build_t += dp(s_ind+1, t_ind);
        }
        return num_of_ways_to_build_t;
    }
}

function minCost(n, cuts){
    let memo = new Map()
    let min_c = dp(0, n)
    console.log(min_c);
    return min_c

    function dp(start_ind, end_ind){
        if(memo.has(`${start_ind},${end_ind}`)){
            return memo.get(`${start_ind},${end_ind}`);
        }
        let min_cost_to_cut_curr_fragment = Number.MAX_SAFE_INTEGER;
        for(let i = start_ind + 1; i <= end_ind - 1; i++){
            if(cuts.includes(i)){
                let left_segment_price = dp(start_ind, i);
                let right_segment_price = dp(i, end_ind)
                min_cost_to_cut_curr_fragment = Math.min(min_cost_to_cut_curr_fragment, end_ind - start_ind + left_segment_price + right_segment_price);
            }
        }
        memo.set(`${start_ind},${end_ind}`,min_cost_to_cut_curr_fragment == Number.MAX_SAFE_INTEGER ? 0 : min_cost_to_cut_curr_fragment)
        return min_cost_to_cut_curr_fragment == Number.MAX_SAFE_INTEGER ? 0 : min_cost_to_cut_curr_fragment
    }
}

function mincostTickets(days, costs){
    let first_ticket = costs[0] + dp(0, 0);
    let second_ticket = costs[1] + dp(0, 1);
    let third_ticket = costs[2] + dp(0,2);
    let min_cost = Math.min(first_ticket, second_ticket,third_ticket);
    console.log((min_cost));
    return min_cost;

    function dp(index, cost_ind){
        if(index == days.length-1){
            return 0;
        }

        let pass_valid_till = days[index];
        if(cost_ind == 0){
            pass_valid_till += 1;
        }
        else if(cost_ind == 1){
            pass_valid_till += 7;
        }
        else{
            pass_valid_till += 30;
        }

        let min_price_to_cover_journey = Number.MAX_SAFE_INTEGER;

        for(let i = index+1; i < days.length; i++){
            if(days[i] <= pass_valid_till-1){
                // change the min cost to zero at the last index otherwise the outer min won't function
                if(i == days.length-1){
                    min_price_to_cover_journey = 0;
                }
                continue;
            }
            else{
                for(let j = 0; j <= 2; j++){
                    min_price_to_cover_journey = Math.min(min_price_to_cover_journey, costs[j] + dp(i, j))
                }
                break;
            }
        }
        return min_price_to_cover_journey;
    }
}

function minDistance(word1, word2){
    let min = dp(0, 0);
    console.log(min);
    return min;

    function dp (s1_ind, s2_ind){
        if(s1_ind == word1.length){
            if(s2_ind == word2.length){
                return 0
            }
            else{
                return word2.length - s2_ind;
            }
        }
        if(s2_ind == word2.length){
            if(s1_ind == word1.length){
                return 0
            }
            else{
                return word1.length - s1_ind;
            }
        }

        let min_steps;
        if(word1.charAt(s1_ind) == word2.charAt(s2_ind)){
            min_steps = dp(s1_ind+1, s2_ind+1);
        }
        else{
            min_steps = Math.min(
                // delete s1_ind char from word1
                1 + dp(s1_ind+1, s2_ind),
                // replace s1_ind char in word1 to s2_ind char in word2
                1 + dp(s1_ind+1, s2_ind+1),
                // insert
                1 + dp(s1_ind, s2_ind + 1)
            )
        }
        return min_steps;
    }
}

// tle's when hashmap is used as a cache. No static array in js, so the only other way to get it to pass is bottom up tabulation
function longestArithSeqLength(nums){
    let len = 0;
    let memo = new Map()
    for(let i = 0; i < nums.length-1; i++){
        for(let j = i+1; j < nums.length; j++){
            let curr;
            if(memo.has(`${i},${nums[j]-nums[i]}`)){
                curr = memo.get(`${i},${nums[j]-nums[i]}`)
            }
            else{
                curr = 1 + dp(j, nums[j] - nums[i])
            }
            len = Math.max(len, curr);
            memo.set(`${i},${nums[j]-nums[i]}`, curr);
        }
    }
    console.log(len);
    return len;

    function dp(index, diff){
        if(memo.has(`${index},${diff}`)){
            return memo.get(`${index},${diff}`)
        }
        if(index == nums.length-1){
            return 1;
        }
        let max_len = 1;
        for(let i = index+1; i < nums.length; i++){
            if(nums[i] - nums[index] == diff){
                max_len = Math.max(max_len, 1 + dp(i, diff));
            }
        }
        memo.set(`${index},${diff}`, max_len);
        return max_len;
    }
}

function lengthOfLIS(nums){
    let memo = new Map()
    let len = 1; 
    dp(0);
    console.log(len);
    return len;

    function dp(index){
        if(memo.has(index)){
            return memo.get(index)
        }
        if(index == nums.length-1){
            return 1
        }
        let largest_lis_starting_with_curr = 1;
        for(let i = index + 1; i < nums.length; i++){
           if(nums[i] > nums[index]){
            // since we add 1 to the dp(i), dp(i) needs to return the lis starting with the ith element, not the lis that is in the range i to n.
            largest_lis_starting_with_curr = Math.max(largest_lis_starting_with_curr,  1+dp(i))
           }
        }
        // this branch of recursion does not return the lis starting with index; 
        let largest_lis_not_starting_with_curr = dp(index+1);
        len = Math.max(largest_lis_not_starting_with_curr, largest_lis_starting_with_curr);
        // we memoize and return the largest lis starting with the current char, instead of the absolute largest lis in the range: index...n;
        // if we return the absolute largest lis between the range -> index to n (len, value in the current call), you wouldn't be able use the subproblem solution to solve a larger subproblem; think about what really is the optimal substructure in this problem.
        memo.set(index,  largest_lis_starting_with_curr)
        return largest_lis_starting_with_curr
    }
}

function mostPoints(questions){
    let memo = new Map()
    let max_profit = dp(0);
    console.log(max_profit);
    return max_profit;

    function dp(index){
        if(memo.has(index)){
            return memo.get(index)
        }
        if(index == questions.length-1){
            return questions[index][0];
        }
        if(index > questions.length-1){
            return 0;
        }
        let max_p_from_curr_ind = Math.max(questions[index][0] + dp(index + questions[index][1] + 1), dp(index+1));
        memo.set(index, max_p_from_curr_ind)
        return max_p_from_curr_ind
    }
}

// top down memo tle's on lc for 1 test case due to the max frames that can be allocated on js mem stack; logic is correct; probably passes on c++
// only bottom up tab would pass
function countGoodStrings(low, high, zero, one){
    let memo = new Map()
    let count = dp(0);
    console.log(count % BigInt(1000000000 + 7));
    return count % BigInt(1000000000 + 7);

   function dp(current_string_len){
       if(memo.has(current_string_len)){
           return BigInt(memo.get(current_string_len));
       }
       if(current_string_len == high){
           return BigInt(1);
       }
       if(current_string_len > high){
           return BigInt(0)
       }

       let is_current_length_in_bounds = current_string_len >= low && current_string_len <= high ? true : false;
       let when_one_appended = dp(current_string_len + one);
       let when_zero_appended = dp(current_string_len + zero);
       let good_len_count;
       if(is_current_length_in_bounds == true){
           good_len_count = BigInt(BigInt(1) + when_zero_appended + when_one_appended);
       }
       else{
           good_len_count = BigInt(when_zero_appended + when_one_appended);
       }
       memo.set(current_string_len, good_len_count.toString())
       return good_len_count;
   }
}

function numSquares(n){
    let memo = new Map();
    let candidates = [];
    for(let i = 1; i*i <= n; i++){
        candidates.push(i*i);
    }
    candidates.sort((a,b) => b-a);
    let min_ways = dp(0, 0);
    console.log(min_ways, candidates);
    return min_ways;

    // helper
    function dp(index, sum){
        if(memo.has(`${sum}`)){
            return memo.get(`${sum}`);
        }
        if(sum == n){
            return 0
        }
        if(sum > n || index >= candidates.length ){
            return Number.MAX_SAFE_INTEGER
        }
        // the recurrence -> Max{dp(index, sum + candidates[index]), dp(index+1, sum)} works if you memoize [index,sum] pair, but it results in tle on lc. 
        // If you only wish to only have the sum in state(1D dp) and have just that memoize, you will have to recurse from the starting element for every sum value. 
        // Think of it this way -> dp{index, sum} has a state representation that says "the smallest steps to add up to a target starting from a value = sum and ignoring every element in the range 1.....index-1"; The sum value here represents a sum associated with an index. If you just memoize the sum, you will get wrong answers. 
        // however, dp{0, sum} represents "the smallest steps to reach a  target with a starting value = sum and ingnoring nothing and trying all elements in the input", since we recurse on index 0 every time. For this recurrence, the sum value is not associated with a particular index and it by itself is suficient to be memoized.
        let min = Math.min(1 + dp(0, sum + candidates[index]), dp(index + 1, sum));
        memo.set(`${sum}`, min);
        return min;
    }
}

function coinChange2(amount, coins){
    let count = dp(0, amount);
    console.log(count);
    return count;

    function dp(index, sum){
        if(sum == 0){
            return 1
        }
        if(sum < 0 || index == coins.length){
            return 0;
        }

        let ways_count = dp(index, sum-coins[index]) + dp(index+1, sum);
        return ways_count;
    }
}

function isInterleave(s1, s2, s3){
    let memo = new Map()
    let interleave = dp(0, 0, 0);
    console.log(interleave);
    return interleave

    function dp(s1_ind, s2_ind, s3_ind){
        if(memo.has(`${s1_ind},${s2_ind}`)){
            return memo.get(`${s1_ind},${s2_ind}`);
        }
        if(s1_ind >= s1.length){
            if(s2.slice(s2_ind) == s3.slice(s3_ind)){
                return true
            }
            else return false
        }
        if(s2_ind >= s2.length){
            if(s1.slice(s1_ind) == s3.slice(s3_ind)){
                return true
            }
            else return false;
        }

        let can_interleave = false;
        if(s1.charAt(s1_ind) == s3.charAt(s3_ind) && s2.charAt(s2_ind) == s3.charAt(s3_ind)){
            can_interleave = dp(s1_ind+1, s2_ind, s3_ind+1) || dp(s1_ind, s2_ind+1, s3_ind+1);
        }
        else if(s1.charAt(s1_ind) == s3.charAt(s3_ind)){
            can_interleave = dp(s1_ind+1, s2_ind, s3_ind+1);
        }
        else if(s2.charAt(s2_ind) == s3.charAt(s3_ind)){
            can_interleave = dp(s1_ind, s2_ind+1, s3_ind+1);
        }
        memo.set(`${s1_ind},${s2_ind}`, can_interleave);
        return can_interleave;
    }
}

function maxProfit2(prices){
    let max_p  = 0;
    let memo = new Map();
    for(let i = 0; i < prices.length; i++){
        max_p = Math.max(max_p, dp(i));
    }
    console.log(max_p);
    return max_p;

    function dp(purchase_price_index){
        if(memo.has(`${purchase_price_index}`)){
            return memo.get(`${purchase_price_index}`)
        }
        if(purchase_price_index >= prices.length-1){
            return 0
        }
        // max profit is the maximum of-
        let max_profit = 0;
        // - the max profit we could make by choosing to sell the item at the current purchase_price_index at a subsequent day by purchasing it 
        for(let i = purchase_price_index+1; i < prices.length; i++){
            if(prices[i] > prices[purchase_price_index]){
                max_profit = Math.max(prices[i] - prices[purchase_price_index] + dp(i+2), max_profit);
            }
        }
        // - or by skipping the item at the current purchase_price_index and recursing on the next adjacent item {0/1 knapsack}; 
        max_profit = Math.max(max_profit, dp(purchase_price_index+1))
        memo.set(`${purchase_price_index}`, max_profit);
        return max_profit;
    }   
}

function maxProfit(prices){
    let max_p = -1;
    dp(0);
    console.log(max_p);
    return max_p;

    function dp(index){
        if(index == prices.length-1){
            return 0;
        }
        let max_curr_p = Math.max(0, prices[index+1] - prices[index] + dp(index+1))
        max_p = Math.max(max_p, max_curr_p);
        return max_curr_p;
    }
}

function findTargetSumWays(nums, target){
    let memo = new Map();
    let ways = dp(0, 0);
    console.log(ways);
    return ways;

    function dp(index, sum){
        if(memo.has(`${index},${sum}`)){
            return memo.get(`${index},${sum}`);
        }
        if(index == nums.length){
            if(sum == target){
                return 1
            }
            else return 0;
        }
        let ways_count = dp(index+1, sum + nums[index]) + dp(index+1, sum - nums[index]);
        memo.set(`${index},${sum}`, ways_count);
        return ways_count;
    }
}

function rob2(nums){
    if(nums.length == 1){
        return nums[0]
    }
    let memo = new Map();
    let max_amount = Math.max(dp(0, true), dp(1, false));
    console.log(max_amount);
    return max_amount;

    function dp(index, first_house_incl){
        if(memo.has(`${index},${first_house_incl}`)){
            return memo.get(`${index},${first_house_incl}`);
        }
        // index out of bounds
        if(index >= nums.length){
            return 0
        }
        // last element
        if(index == nums.length-1){
            // if the first house was included
            if(first_house_incl == true){
                return 0
            }
            // if the first house was not included
            else{
                return nums[index];
            }
        }
        let max_amt = Math.max(nums[index]+dp(index+2, first_house_incl), dp(index+1, first_house_incl))
        memo.set(`${index},${first_house_incl}`, max_amt)
        return max_amt;
    }
}

function uniquePaths (m, n){
    let memo = new Map();
    let ways = dp(m, n);
    console.log(ways);
    return ways;

    function dp(row, col){
        if((row == 1 && col == 2) || (row == 2 && col == 1)){
            return 1;
        }
        if(row < 1 || col < 1){
            return 0;
        }
        if(memo.has(`${row},${col}`)){
            return memo.get(`${row},${col}`);
        }

        let ways_to_reach_curr = dp(row-1, col) + dp(row, col-1);
        memo.set(`${row},${col}`, ways_to_reach_curr);
        return ways_to_reach_curr;
    }
}

function longestPalindrome(s){
    let lp = "";
    let memo = new Map()
    dp(0, s.length-1);
    console.log(lp);
    return lp;

    function dp(i, j){
        if(i > j){
            return;
        }  
        if(memo.has(`${i},${j}`)){
            return memo.get(`${i},${j}`);
        }
        if((s.charAt(i) == s.charAt(j)) && ispal(i+1, j-1) == true){
                memo.set(`${i},${j}`, true);
                if(j+1-i > lp.length){
                    lp = s.slice(i, j+1)
                }
                return;
            }
        else{
            memo.set(`${i},${j}`, false);
            dp(i+1, j);
            dp(i, j-1);
        }
    }

    function ispal(start, end){
        if(end <= start){
            return true
        }
        if(s.charAt(start) == s.charAt(end) && ispal(start+1, end-1) == true){
            return true;
        }
        else return false;
    }
}

function wordBreak (s, wordDict){
    let memo = new Map();
    let is_segmentation_possible = dp(0);
    console.log(is_segmentation_possible);
    return is_segmentation_possible;

    function dp(index){
        // if it's possible segment the last char of the input string, return true
        if(index == s.length){
            return true;
        }
        // memo
        if(memo.has(index)){
            return memo.get(index);
        }
        // a valid word segmentation starting at any index is a segmentation such that the left over substring can also be segmented into valid words and leads to no leftover characters.
        let segmentation = false;
        for(let i = index; i < s.length; i++){
            if(wordDict.includes(s.slice(index, i+1))){
                if(dp(i+1) == true){
                    segmentation = true;
                    break;
                } 
            }
        }
        memo.set(index, segmentation);
        return segmentation;
    }
}

function combinationSum4 (nums, target){
    let memo = new Map()
    let count = dp(target);
    console.log(count);
    return count;

    function dp(sum){
      if(sum == 0){
        return 1;
      }
      if(memo.has(sum)){
        return memo.get(sum);
      }
      if(sum < 0){
        return 0;
      }

      let ways_to_combination_sum = 0;
      for(let i = 0; i < nums.length; i++){
        let res = dp(sum - nums[i]);
        if(res >= 1){
            ways_to_combination_sum += res;
        }
      }
      memo.set(sum, ways_to_combination_sum);
      return ways_to_combination_sum;
    }
}

function canJump (nums){
    let memo = new Map();
    let canJump = false;
    if(dp(0) == true || dp(1) == true){
        canJump = true;
    }
    console.log(canJump);
    return canJump;

    function dp(index){
        if(index >= nums.length-1){
            return true;
        }
        if(nums[index] == 0){
            return false;
        }
        if(memo.has(index) == true){
            return memo.get(index);
        }

        let can_reach_last_index = false;
        let search_till_index = index + nums[index];
        // don't do a check for i <= i + nums[index]; that was stupid
        for(let i = index+1; i <= search_till_index; i++){
            if(dp(i) == true){
                can_reach_last_index = true;
                break;
            }
        }
        memo.set(index, can_reach_last_index);
        return can_reach_last_index;
    }
}

function numDecodings(s){
    let memo = new Map();
    let char_map = new Map();
    let char_code = 97;
    for(let i = 1; i <= 26; i++){
        char_map.set(`${i}`, String.fromCharCode(char_code))
        char_code++;
    }
    let res = dp(0);
    console.log(res);
    return res

    function dp (index){
        // if the char at the current index is 0, this is an invalid path; we will never form a valid partition from here
        if(s.charAt(index) == "0" ){
            return 0;
        }
        if(memo.has(index)){
            return memo.get(index);
        }
        // if the index we're at is the last char of the input, and this char is not "0", we have a valid partition; if the current index is out of bounds, even then we have a valid partition; return 1
        if((index == s.length-1 && s.charAt(index) != 0) || index >= s.length){
            return 1
        }
        let valid_partitions;
        let partition_one = s.slice(index, index+1);
        let partition_two = s.slice(index, index+2);
        // if the char at the current index concatenated with the char at the next index is valid
        if(char_map.has(partition_two) && partition_two.length == 2){
            // no of ways to partition the current suffix starting at index i = no of ways to partition the suffix starting at index i+1 + no of ways to partition the suffix starting at index i+2
            valid_partitions = dp(index+1) + dp(index+2);
        }
        // else if the char at the current index concatenated with the char at the next index is invalid, 
        else if (char_map.has(partition_one)){
            // no of ways to partition the current suffix starting at index i = no of ways to partition the suffix starting at index i+1
            valid_partitions = dp(index+1);
        }
        // else there are no partitions
        else valid_partitions = 0;
        // memoize and return
        memo.set(index, valid_partitions);
        return valid_partitions
    }
}

function rob (nums){
    let memo = new Map();
    let max = dp(0);
    console.log(max);
    return max;

    function dp(index){ 
        if(index == nums.length-1){
            return nums[index];
        }
        if(index >= nums.length){
            return 0
        }
        if(memo.has(index)){
            return memo.get(index);
        }
        
        let max_sum = Math.max(nums[index] + dp(index+2), dp(index+1));
        memo.set(index, max_sum);
        return max_sum
    }
}

function canPartition(nums){
    let total = nums.reduce((accum, current) => {
        return accum + current;
    }, 0)
    if(total%2 != 0){
        console.log(false);
        return false;
    }
    let sum = total/2;
    let canPartition  = false;
    let memo = new Map();
    dp(0, 0);
    console.log(canPartition);
    return canPartition;

    function dp (index, current_sum){
        if(canPartition == true){
            return;
        }
        if(memo.has(`${index},${current_sum}`)){
            return memo.get(`${index},${current_sum}`);
        }
        if(current_sum == sum){
            memo.set(`${index},${current_sum}`, true);
            canPartition = true;
            return true;
        }

        if(index >= nums.length || current_sum > sum){
            return false;
        }
        let when_curr_included = dp(index+1, current_sum+nums[index]);
        let when_curr_excluded = dp(index+1, current_sum);

        memo.set(`${index},${current_sum}`, when_curr_excluded || when_curr_included);
    }
}

function coinChange(coins, amount){
    let memo = new Map();
    let min_coins = dp(0, amount);
    console.log(min_coins);
    return min_coins;

    // helper;
    function dp (index, sum){
        if(sum == 0){
            return 0;
        }
        if(sum  < 0 || index >= coins.length){
            return Number.MAX_SAFE_INTEGER;
        }
        if(memo.has(`${index},${sum}`)){
            return memo.get(`${index},${sum}`);
        }

        let min = Math.min( 1 + dp(index, sum - coins[index]), dp(index+1, sum));
        memo.set(`${index},${sum}`, min);
        return min;
    }
}