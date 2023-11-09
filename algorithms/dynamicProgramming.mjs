// coinChange([1,2,5], 11)                                       lc:322 medium
// canPartition([14,9,8,4,3,2])                                  lc:416 medium
// rob([1,2])                                                    lc:198 medium
// ..........................................................................................................................................................................

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