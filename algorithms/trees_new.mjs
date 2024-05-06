import queue from "../data structures/queue.mjs"

// total questions: 8
// lowestCommonAncestor([1,2], 1, 2)                                                                                    //lc236: medium *
// kthSmallest([3,1,4,null,2], 1)                                                                                       //lc230: medium
// maxDepth([3,9,20,null,null,15,7])                                                                                    //lc104: easy
// pathSum2([-2,null,-3], -5)                                                                                           //lc113: medium
// pathSum3([1,0,1,1,2,0,-1,0,1,-1,0,-1,0,1,0], 2)                                                                      //lc437: medium
// maxPathSum([9,6,3,null,null,-6,2,null,null,null,null,null,null,2,])                                                  //lc124: hard
// rightSideView([1,null,3])                                                                                            //lc99:  medium
// diameterOfBinaryTree([1,3,2,5,null,null,9,6,null,7])                                                                 //lc662: medium
// distanceK([3,5,1,6,2,0,8,null,null,7,4], 5, 2)                                                                       //lc863: medium
// verticalTraversal([1,2,3,4,5,6,7])
// ..........................................................................................................................................................................

function verticalTraversal (root){
    let col_map = new Map();
    let smallest_col = Number.MAX_SAFE_INTEGER;
    let largest_col = Number.MIN_SAFE_INTEGER;
    dfs(0, 0, 0);
    let res = new Array();
    for(let i = smallest_col; i <= largest_col; i++){
        if(col_map.has(i)){
            let arr = col_map.get(i);
            let result = []
            arr.forEach(element => {
                if(element != undefined){
                    result = result.concat(element);
                }
            });
            res.push(result);
        }
    }
    console.log(res);
    return res;

    function dfs(ind, col, lvl){
        // base case
        if(root[ind] == null || ind >= root.length){
            return;
        }
        // visit
        if (col_map.has(col)) {
            let lvl_arr = col_map.get(col);
            if(lvl_arr[lvl] != undefined){
                lvl_arr[lvl].push(root[ind]);
                lvl_arr[lvl].sort((a,b) => a - b);
            }
            else{
                lvl_arr[lvl] = [root[ind]];
            }
        }
        else{
            let new_lvl_arr = new Array();
            new_lvl_arr[lvl] = [root[ind]];
            col_map.set(col, new_lvl_arr);
        }
        // update the smallest/largest col
        smallest_col = Math.min(smallest_col, col);
        largest_col = Math.max(largest_col, col);
        // recurse
        dfs(ind*2 + 1, col - 1, lvl + 1);
        dfs(ind*2 + 2, col + 1, lvl + 1);
    }

}


function distanceK(root, target, k){
    let res = [];
    let visit = new Set();
    let adj_list = new Map();
    let target_ind = -1
    dfs(0);
    visit.add(target_ind);
    dfs_height(target_ind, 0);
    console.log(res);

    // build a graph using dfs
    function dfs(ind){
        if(ind >= root.length || root[ind] == null){
            return
        }
        if(root[ind] == target){
            target_ind = ind;
        }
        root[ind*2+1] != null && ind*2+1 < root.length ? (adj_list.has(ind) ? adj_list.get(ind).push(ind*2+1) : adj_list.set(ind, [ind*2+1])) : null;
        root[ind*2+2] != null && ind*2+2 < root.length ? (adj_list.has(ind) ? adj_list.get(ind).push(ind*2+2) : adj_list.set(ind, [ind*2+2])) : null;
        Math.floor((ind - 1)/2) >= 0 ?(adj_list.has(ind) ? adj_list.get(ind).push(Math.floor((ind - 1)/2)):adj_list.set(ind, [Math.floor((ind - 1)/2)]) ) : null;
        dfs(ind*2+1)
        dfs(ind*2+2)
        return
    }
    // find all nodes at dist k from target using target as root
    function dfs_height(ind, height){
        if(height == k){
            res.push(root[ind]);
            return
        }
        let adj = adj_list.get(ind);
        for(let i = 0; i < adj.length; i++){
            if(visit.has(adj[i]) != true){
                visit.add(adj[i]);
                dfs_height(adj[i], height+1);
            }
        }
    }
}    


function diameterOfBinaryTree(root){
    let lvl_nodes_map = new Map();
    let lvl_available = new Set();
    let max_width = 0;
    let curr_max_lvl = 0;
    dfs(0, 0);
    console.log(max_width);
    return max_width;

    function dfs(curr_index, curr_lvl){
        // when on a null node, "hydrate" all the levels below the current level so that each lvl each nodes count equivalent to the count they'd have had if it were a perfect binary tree.
        if(curr_index >= root.length || root[curr_index] == null){
            let power_of_2 = 0;
            // we loop upto the max lvl encountered in our dfs thus far.
            for(let i = curr_lvl; i <= curr_max_lvl; i++){
                if(lvl_available.has(i)){
                    lvl_nodes_map.set(i, lvl_nodes_map.get(i) + Math.pow(2, power_of_2));
                }
                power_of_2++;
            }
            return;
        }
        // recurse
        dfs(curr_index*2 + 1, curr_lvl+1);
        dfs(curr_index*2 + 2, curr_lvl+1);

        // keep track of the deepest lvl encountered in our dfs; it's used when encountering a null leaf node.
        curr_max_lvl = Math.max(curr_max_lvl, curr_lvl);

        // if the current lvl is already marked available, just increment the node count of this lvl in the hash map
        if(lvl_available.has(curr_lvl)){
            lvl_nodes_map.set(curr_lvl, lvl_nodes_map.get(curr_lvl) + 1);
        }
        // otherwise mark this new lvl as available and set the nodes count to 1
        else{
            lvl_available.add(curr_lvl);
            lvl_nodes_map.set(curr_lvl, 1);
        }
        // the presence of even a single node on any lvl makes a lvl eligible for max width calculation(a lvl being bounded by a left node and a right node is not a requirement for the lvl to be considered valid for max width calculation)
        if(lvl_available.has(curr_lvl)){
            max_width = Math.max(max_width, lvl_nodes_map.get(curr_lvl));
        }
        return;
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
