import queue from "../data structures/queue.mjs"

// total questions: 5
// lowestCommonAncestor([1,2], 1, 2)                                                                                    //lc236: medium *
// kthSmallest([3,1,4,null,2], 1)                                                                                       //lc230: medium
// maxDepth([3,9,20,null,null,15,7])                                                                                    //lc104: easy
// pathSum2([-2,null,-3], -5)                                                                                           //lc113: medium
// pathSum3([1,0,1,1,2,0,-1,0,1,-1,0,-1,0,1,0], 2)                                                                      //lc437: medium
// maxPathSum([9,6,3,null,null,-6,2,null,null,null,null,null,null,2,])                                                  //lc124: hard
// rightSideView([1,null,3])                                                                                            //lc99:  medium
// diameterOfBinaryTree([1,2,3,4,5])                                                                                    //lc543: easy
// ..........................................................................................................................................................................

function diameterOfBinaryTree(root){
    let max_dia = 0;
    dfs(0);
    console.log(max_dia);
    return max_dia

    function dfs(curr_index){
        if(curr_index >= root.length || root[curr_index] == null){
            return -1;
        }
        let left_min = dfs(2*curr_index+1);
        let right_min = dfs(2*curr_index+2);
        max_dia = Math.max(max_dia, left_min + 2 + right_min);
        return left_min > right_min ? left_min + 1 : right_min + 1;
    }
}

function rightSideView(root){
    let levels_in_tree = -1;
    let res = [];
    dfs(0, 0);
    console.log(res);
    return res;

    function dfs(curr_index, dist_from_root){
        if (root[curr_index] == null || curr_index >= root.length){
            return
        }

        if(levels_in_tree + 1 == dist_from_root){
            levels_in_tree++;
            res.push(root[curr_index]);
        }
        dfs(2*curr_index+2, dist_from_root+1);
        dfs(2*curr_index+1, dist_from_root+1);
    }
}

function maxPathSum(root){
    let max_sum = Number.MIN_SAFE_INTEGER;
    dfs(0)
    console.log(max_sum);
    return max_sum;

    // helper
    function dfs(curr_index){
        if(root[curr_index] == null || curr_index >= root.length){
            return 0;
        }

        let left_st_path_sum = dfs(2*curr_index+1);
        let right_st_path_sum = dfs(2*curr_index+2);
        let current_index_max_path = Math.max(root[curr_index], root[curr_index] + left_st_path_sum, root[curr_index] + right_st_path_sum, root[curr_index] + left_st_path_sum + right_st_path_sum);
        max_sum = Math.max(max_sum, current_index_max_path);
        
        return Math.max(root[curr_index] + left_st_path_sum, root[curr_index] + right_st_path_sum, root[curr_index]);
    }
}

function pathSum3 (root, targetSum){
    let count = 0;
    let res = []
    dfs(0, [], 0);
    console.log(count,res);
    return count;

    function dfs(curr_index, path, sum){
        // base case
        if(root[curr_index] == null || curr_index >= root.length){
            return
        }
        // visit
        // add the current node to the path array and increment the sum accordingly
        path.push(root[curr_index]);
        sum += root[curr_index];
        // if the sum becomes equal to the target, increment path count
        if(sum == targetSum){
            res.push(Array.from(path));
            count++
        }
        // we try all sub paths(subarrays of the path array that terminate at the current node) that end at the current element and see if they their sum is equal to the target
        let temp_sum = sum;
        // iterate over the path array is simulate the removal of one node each oteration by decrementing the value of path sum by path[i];
        for(let i = 0; i < path.length-1; i++){
            temp_sum -= path[i];
            // if we get a sum equal to the target sum, this sub path is also a valid path
            if(temp_sum == targetSum){
                res.push(path.slice(i+1))
                count++;
            }
        }
        // recurse
        dfs(2*curr_index+1, path, sum)
        dfs(2*curr_index+2, path, sum)
        // post visit
        path.pop();
    }
}

function pathSum2(root, targetSum){
    let res = [];
    dfs_pre(0, [], 0);
    console.log(res);
    return res

    function dfs_pre (curr_index, path, sum){
        if (root[curr_index] == null){
            return
        }
        // pre visit
        path.push(root[curr_index]);
        // if the current sum(after addition of the current element) is equal to the target sum, and the current node is a leaf node, the path we have is valid one
         if(sum + root[curr_index] == targetSum && (2*curr_index+1 == null || 2*curr_index + 1 > root.length-1) && (2*curr_index+2 == null || 2*curr_index+2 > root.length+2)){
            res.push(Array.from(path))
            path.pop()
            return
        }
        // visit
        dfs_pre(2*curr_index+1, path, sum + root[curr_index])
        dfs_pre(2*curr_index+2, path, sum + root[curr_index])
        // post visit
        path.pop();
    }
}

function maxDepth(root){
    let height = dfs_post(0);
    console.log(height);
    return height + 1;

    function dfs_post(current){
        if (current == null){
            return 0;
        }
        if(current >= root.length){
            return -1;
        }
        // recurse 
        let left_st_height = dfs_post(2*current + 1);
        let right_st_height = dfs_post(2*current + 2);
        // visit
        return Math.max(left_st_height,right_st_height)+1;
    }
}

function kthSmallest (root, k){
    let res_found = false;
    let res = -1;
    let counter = 0;
    dfs_in(0);
    console.log(res);
    return res;

    function dfs_in(current){
        if(res_found){
            return
        }
        if(current >= root.length || root[current] == null){
            return
        }
        dfs_in(2*current + 1);
        counter++;
        if(counter == k){
            res_found = true;
            res = root[current];
            return;
        }
        dfs_in(2*current + 2);
    }
}

function lowestCommonAncestor(root, p, q){
    let lca = dfs(0)
    console.log(lca);
    return lca

    function dfs(curr_index){
        // pre-visit
        if(root[curr_index] == null || curr_index >= root.length){
            return null
        }
        let is_p_reachable = false;
        let is_q_reachable = false;

        if(root[curr_index] == p){
            is_p_reachable = true
        }
        if(root[curr_index] == q){
            is_q_reachable = true
        }

        // visit
        // recurse left
        let left_st = dfs(2*curr_index + 1);
        if(left_st == p){
            is_p_reachable = true
        }
        else if(left_st == q){
            is_q_reachable = true
        }
        // if a value other than p and q  is returned, it must be the lca, because we return null otherwise
        else if(left_st !== null){
           return left_st
        }
        
        // resurse right
        let right_st = dfs(2*curr_index+2);
        if(right_st == p){
            is_p_reachable = true
        }
        else if(right_st == q){
            is_q_reachable = true
        }
        else if(right_st !== null){
            return right_st
        }

        // post visit
        // if both p and q are reachable, we return the node value
        if(is_p_reachable && is_q_reachable){
            return root[curr_index];
        }
        // if only p was reachable, we return -1
        else if(is_p_reachable){
            return p
        }
        else if(is_q_reachable){
            return q
        }
        else return null
    }
}
