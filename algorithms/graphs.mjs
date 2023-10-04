import queue from "../data structures/queue.mjs"
// .....................................................................................................................................................................
// Questions Solved: 15
// orangesRotting([[2,1,1],[0,1,1],[1,0,1]])                                                                                            //lc:994  medium *
// numIslands(
//     [["1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","0","0","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","0","0","0","0","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1"]]
//   )                                                                                                                                  //lc:200  medium
// longestIncreasingPath([[10,19,5,16,3],[10,13,4,8,15],[5,12,9,15,19],[2,10,17,13,16],[3,4,11,15,12],[3,10,1,5,17],[12,17,8,4,9]])     //lc:329  hard
// accountsMerge( [["Gabe","Gabe0@m.co","Gabe3@m.co","Gabe1@m.co"],["Kevin","Kevin3@m.co","Kevin5@m.co","Kevin0@m.co"],["Ethan","Ethan5@m.co","Ethan4@m.co","Ethan0@m.co"],["Hanzo","Hanzo3@m.co","Hanzo1@m.co","Hanzo0@m.co"],["Fern","Fern5@m.co","Fern1@m.co","Fern0@m.co"]])                    //lc:721  medium *
// maxAreaOfIsland([[1,1,0,0,0],[1,1,0,0,0],[0,0,0,1,1],[0,0,0,1,1]])                                                                   //lc:695  medium
// updateMatrix([[0,0,0],[0,1,0],[0,0,0]]) tle on brute force
// pacificAtlantic([[13],[4],[19],[10],[1],[11],[5],[17],[3],[10],[1],[0],[1],[4],[1],[3],[6],[13],[2],[16],[7],[6],[3],[1],[9],[9],[13],[10],[9],[10],[6],[2],[11],[17],[13],[0],[19],[7],[13],[3],[9],[2]])                                                                                      //lc:471  medium *
// shortestBridge([[0,1,0],[0,0,0],[0,0,1]])                                                                                            //lc:934  medium *
// numOfMinutes(11,4,[5,9,6,10,-1,8,9,1,9,3,4], [0,213,0,253,686,170,975,0,261,309,337])                                                //lc:1376 medium
// solve([["X","X","X","X"],["X","O","O","X"],["X","X","O","X"],["X","O","X","X"]])                                                     //lc:130  medium *
// shortestAlternatingPaths(5, [[3,2],[4,1],[1,4],[2,4]], [[2,3],[0,4],[4,3],[4,4],[4,0],[1,0]])                                        //lc:1129 medium *
// minReorder(6, [[0,1],[1,3],[2,3],[4,0],[4,5]])                                                                                       //lc:1146 medium
// validTrees(10, [[0,1],[5,6],[6,7],[9,0],[3,7],[4,8],[1,8],[5,2],[5,3]])                                                              //lc:prem medium
// minMutation("AACCGGTT", "AAACGGTA", ["AACCGATT","AACCGATA","AAACGATA","AAACGGTA"])                                                   //lc:433  medium *
// eventualSafeNodes([[1,2],[2,3],[5],[0],[5],[],[]])                                                                                   //lc:802  medium *
// closedIsland([[1,1,1,1,1,1,1,0],[1,0,0,0,0,1,1,0],[1,0,1,0,1,1,1,0],[1,0,0,0,0,1,0,1],[1,1,1,1,1,1,1,0]])                            //lc:1254 medium
// .....................................................................................................................................................................
 
function closedIsland(grid){
    let visited = new Set();
    for(let i = 0; i < grid.length; i++){
        for(let j = 0; j < grid[0].length; j++){
            // we'll do boundary dfs to mark the land framents (0's) reachable from these boundary land fragments; every unreachable land fragment then would have to be a surrounded island fragment.
            if(i == 0 || i == grid.length-1 || j == 0 || j == grid[0].length-1){
                if(grid[i][j] == 0){
                    let index = `${i},${j}`;
                    dfs(index);
                }
            }
        }
    }
    // now we will, count the connected components left and their count will be the number of completely closed island
    visited.clear();
    let count = 0;
    for(let i = 0; i < grid.length; i++){
        for(let j = 0; j < grid[0].length; j++){
            if(grid[i][j] == 0){
                let ind = `${i},${j}`;
                if(visited.has(ind) != true){
                    dfs_count(ind);
                    count++;
                }
            }
        }
    }
    console.log(count);
    return count;

    // helper; mark the connected fragments as part of the same connected component
    function dfs_count(index){
        visited.add(index);
        let adj = get_adj(index);
        if(!adj){
            return
        }
        for(let i = 0; i < adj.length; i++){
            if(visited.has(adj[i]) == false){
                visited.add(adj[i]);
                dfs_count(adj[i]);
            }
        }
    }
    // helper: mark's the connected component(0's) reachable from any boundary cell containing a 0 as 1;
    function dfs(index){
        // pre-visit
        visited.add(index);
        let split_ind = index.indexOf(",");
        let row = Number(index.slice(0, split_ind));
        let col = Number(index.slice(split_ind + 1));
        // we'll mark the node as water fragment because any land fragment that is not 4-way surrounded is just as good as a water fragment
        grid[row][col] = 1;

        // visit
        let adj = get_adj(index);
        if(!adj){
            return
        }
        for(let i = 0; i < adj.length; i++){
            if(visited.has(adj[i]) != true){
                visited.add(adj[i]);
                dfs(adj[i]);
            }
        }
    }

    function get_adj(index){
        let split_ind = index.indexOf(",");
        let row = Number(index.slice(0, split_ind));
        let col = Number(index.slice(split_ind + 1))
        let adj_arr = [];
        // observe how visited is not queried here to check if an index is visited or not. The dfs function will skip visited ind anyway.
        // push the top element's index
        if(row != 0 && grid[row-1][col] == 0){
            adj_arr.push(`${row-1},${col}`);
        }
        // push the right element's index
        if(col != grid[0].length-1 && grid[row][col+1] == 0){
            adj_arr.push(`${row},${col+1}`)
        }
        // push the bottom element's index
        if(row != grid.length-1 && grid[row+1][col] == 0){
            adj_arr.push(`${row+1},${col}`)
        }
        // push the left element's index
        if(col != 0 && grid[row][col-1] == 0){
            adj_arr.push(`${row},${col-1}`)
        }
        return adj_arr;
    }
}

function eventualSafeNodes(graph){
    let visited = new Set();
    let safe_nodes = new Set();
    for( let i = 0; i < graph.length; i++){
        if(visited.has(i) == false){
            dfs(i);
        }
    }
    console.log(safe_nodes);
    return Array.from(safe_nodes).sort();
    function dfs(vertex) {
        // pre-visit
        let adj = graph[vertex];
        let is_safe_node = false;
        visited.add(vertex);
        // if current node is sink node, it's a safe node since every sink node is always a safe node
        if(adj.length == 0){
            safe_nodes.add(vertex);
            is_safe_node = true;
            return is_safe_node;
        }
        // visit: visit adj nodes to check if all reachable nodes are safe nodes, only then the current node is also a safe node; else it's not
        for(let i = 0; i < adj.length; i++){
            // if an adj node is unvisited
            if(visited.has(adj[i]) != true){
                visited.add(adj[i]);
                let is_safe = dfs(adj[i]);
                // the path from an  adj node lead to an unsafe node, current node is an unsafe node; even if other paths lead to safe nodes, it won't change a thing. this is why we can exit early
                if(is_safe == false){
                    is_safe_node = false;
                    break;
                }
                else{
                    is_safe_node = true;
                }
            }
            // else if an adj node is already visited, it better be a safe node and all the subsequent adj nodes also better be safe nodes for the current node to be a safe node
            else if(visited.has(adj[i]) == true){
                // if it's in the set of safe nodes, the path from this adj node lead to a safe node
                if(safe_nodes.has(adj[i]) == true){
                    is_safe_node = true;
                }
                // if an adjacent, already vis node is not present in the set of safe nodes, that path must have  lead to an unsafe node and hence, the current node is also an unsafe node
                else{
                    is_safe_node = false;
                    break;
                }
            }
        }
        
        // post visit: if all paths lead to safe nodes, the current node is also a safe node
        if(is_safe_node == true){
            safe_nodes.add(vertex);
        }
        return is_safe_node;
    }

}

function minMutation(startGene, endGene, bank){
    // early exit if final gene doesn't even exit
    if(bank.includes(endGene) == false){
        return -1;
    }
    let visited = new Set();
    let min = bfs();
    console.log(min != undefined ? min : -1);
    return min != undefined ? min : -1;

    function bfs(){
        let q = new queue();
        q.enqueue(startGene);
        let min_mutations = 0;
        while(q.isEmpty() != true){
            let lvl_size = q.size;
            for (let i = 0; i < lvl_size; i++){
                let front = q.front;
                q.dequeue();
                visited.add(front);
                if(front == endGene){
                    return min_mutations;
                }
                let adj = get_adj(front);
                for(let i = 0; i < adj.length; i++){
                    if(visited.has(adj[i]) == false){
                        visited.add(adj[i]);
                        q.enqueue(adj[i]);
                    }
                }
                if(i == lvl_size-1){
                    min_mutations++;
                }
            }
        }
    }

    function get_adj(current_gene){
        let adj = [];
        for(let i = 0; i < bank.length; i++){
            let diff_char_count = 0;
            for(let j = 0; j < current_gene.length; j++){
                if(current_gene.charAt(j) != bank[i].charAt(j)){
                    diff_char_count++;
                }
            }
            if(diff_char_count == 1){
                adj.push(bank[i]);
            }
        }
        return adj;
    }
}

function validTrees(n, edges){
    // if there are less than n-1 edges, the graph is disconnected; if there are more than n-1 edges, the graph has a cycle
    if(edges.length != n-1){
        console.log(false);
        return false
    }
    // if the graph has exactly n-1 edges, we have to check if the graph is connected and has no cycles (strictly speaking, it's impossible to be connected and have cycles when you have exactly n-1 edges)
    else{
        let adj_list= new Map();
        for (let i = 0; i < edges.length; i++){
            // add second vertex in 1st vertex's adj list
            if(adj_list.has(edges[i][0])){
                adj_list.get(edges[i][0]).push(edges[i][1]);
            }
            else{
                adj_list.set(edges[i][0], [edges[i][1]]);
            }
            // add 1st vertex in 2n vertex's adj list
            if(adj_list.has(edges[i][1])){
                adj_list.get(edges[i][1]).push(edges[i][0]);
            }
            else{
                adj_list.set(edges[i][1], [edges[i][0]]);
            }
        }
        let res = false;
        // we count the nodes in the graph to see if it's connected or not; Alternatively, we could have checked for a cyle too.
        let nodes_count = 0;
        let visited = new Set();
        dfs(edges[0][0]);
        if(nodes_count == n){
            res = true;
        }
        console.log( res);
        return res

        function dfs(index){
            visited.add(index);
            nodes_count++;
            let adj = adj_list.get(index);
            if(!adj){
                return 
            }
            for(let i = 0; i < adj.length; i++){
                if(visited.has(adj[i]) == false){
                    visited.add(adj[i]);
                    dfs(adj[i]);
                }
            }
        }
    }
}

function minReorder(n, connections){
    let dir_adj_list = new Map();
    let undir_adj_list = new Map();
    for(let i = 0; i < connections.length; i++){
        // add to directed adj list;
        if(dir_adj_list.has(connections[i][0])){
            dir_adj_list.get(connections[i][0]).push(connections[i][1]);
        }
        else{
            dir_adj_list.set(connections[i][0], [connections[i][1]]);
        }
        // add to undir adj list;
        if (undir_adj_list.has(connections[i][0])) {
            undir_adj_list.get(connections[i][0]).push(connections[i][1])
        }
        else{
            undir_adj_list.set(connections[i][0], [connections[i][1]]);
        }
        if (undir_adj_list.has(connections[i][1])) {
            undir_adj_list.get(connections[i][1]).push(connections[i][0])
        }
        else{
            undir_adj_list.set(connections[i][1], [connections[i][0]]);
        }
    }
    let visited = new Set();
    let reverse_edges_count = 0;
    dfs(0);
    console.log(reverse_edges_count);
    return reverse_edges_count;

    function dfs(index){
        visited.add(index);
        let adj = undir_adj_list.get(index);
        if(!adj){
            return
        }
        for(let i = 0; i < adj.length; i++){
            if(visited.has(adj[i]) == false){
                visited.add(adj[i]);
                // if the edge from the curr vertex to an adj vertex is in the directed graph, its direction will need to be reversed(every edge pointing away from the 0 vertex needs to be reversed);
                if(dir_adj_list.has(index) && dir_adj_list.get(index).includes(adj[i]) == true){
                    reverse_edges_count++;
                }
                dfs(adj[i]);
            }
        }
    }
}

function shortestAlternatingPaths(n, redEdges, blueEdges){
    // build two separate adj lists, one for blue and one for red
    let red_adj_list = new Map();
    for(let i = 0; i < redEdges.length; i++){
        if(red_adj_list.has(redEdges[i][0])){
            red_adj_list.get(redEdges[i][0]).push(redEdges[i][1]);
        }
        else{
            red_adj_list.set(redEdges[i][0], [redEdges[i][1]]);
        }
    }
    let blue_adj_list = new Map();
    for(let i = 0; i < blueEdges.length; i++){
        if(blue_adj_list.has(blueEdges[i][0])){
            blue_adj_list.get(blueEdges[i][0]).push(blueEdges[i][1]);
        }
        else{
            blue_adj_list.set(blueEdges[i][0], [blueEdges[i][1]]);
        }
    }
    for(let i = 0; i < n; i++){
        if(red_adj_list.has(i) == false){
            red_adj_list.set(i, []);
        }
        if(blue_adj_list.has(i) == false){
            blue_adj_list.set(i, []);
        }
    }
    // mark all nodes to be null before we do bfs.
    let res = [];
    for(let i = 0; i < n; i++){
        res[i] = null;
    }
    // call bfs twice, once for each choice of color of the starting edge;
    // separate visited sets will be needed because there are parallel edges;
    let visited_red = new Set();
    let visited_blue = new Set();
    bfs(1);
    visited_red.clear();
    visited_blue.clear();
    bfs(-1);
    // mark the non reachable nodes to be -1 once  bfs is done;
    for(let i = 0; i < n; i++){
        if(res[i] == null){
            res[i] = -1;
        }
    }
    // return res
    console.log(res);
    return res

    function bfs(start_col){
        let q = new queue();
        q.enqueue(0);
        // when we want starting edges to be red, curr_lvl_col should be 1(blue) so as to pick red edges for the next lvl and vice-versa;
        let curr_lvl_col = start_col;
        let current_dist_from_zero = -1;
        while(q.isEmpty() != true){
            let lvl_size = q.size;
            current_dist_from_zero++;
            for(let i = 0; i < lvl_size; i++){
                let front = q.front;
                q.dequeue();
                // a node is marked visited in the set corresponding to the current lvl's color
                if(curr_lvl_col == 1){
                    visited_blue.add(front);
                }
                else{
                    visited_red.add(front);
                }
                // put the dist of the current vertex from 0 in its corresponding index in the res dist array if the dist is smaller than whats there already
                res[front] = res[front] == null || res[front] > current_dist_from_zero ? current_dist_from_zero : res[front];
                // enqueue the adj edges depending upon the color of current level's edges;
                let adj;
                // if curr level's edges are blue, next lvl's edges will be red and vice verse;
                if(curr_lvl_col == 1){
                    adj = get_adj(front, -1);
                }
                else{
                    adj = get_adj(front, 1);
                }
                // enqueue the adj vertices
                for(let i =0; i < adj.length; i++){
                    // again, a node is marked visited based on the color of the current level's edges
                    // if current lvl's edges are blue, the adj vertices must be reachable via red edges, so we mark them visited in the red visited set
                    if(curr_lvl_col == 1){
                        if(visited_red.has(adj[i]) == false){
                            visited_red.add(adj[i]);
                            q.enqueue(adj[i]);
                        }
                    }
                    // and vice-versa
                    else{
                        if(visited_blue.has(adj[i]) == false){
                            visited_blue.add(adj[i]);
                            q.enqueue(adj[i]);
                        }
                    }
                }
                // at the last node the current lvl, swap the colour
                if(i == lvl_size - 1){
                    curr_lvl_col = curr_lvl_col == 1 ? -1 : 1;
                }
            }
        }
    }

    function get_adj(vertex,edge_col){
        // if blue edges are needed
        if(edge_col == 1){
            return blue_adj_list.get(vertex);
        }
        else{
            return red_adj_list.get(vertex);
        }
    }
}

// this one is just for understanding the logic. gives TLE on LC. use the other solution
function solve(board){
    let visited = new Set();
    let res = [];
    for(let i = 0; i < board.length; i++){
        for(let j = 0; j < board[0].length; j++){
            if(board[i][j] == "O"){
                let index = `${i},${j}`;
                let is_connected_to_boundary = dfs(index);
                visited.clear();
                if(is_connected_to_boundary == false){
                    res.push(index);
                }
            }
        }
    }
    for(let i = 0; i < res.length; i++){
        if(visited.has(res[i]) == false){
            dfs_swap(res[i]);
        }
    }

    console.log(board);
    return board;
    // helper:swap the "O's" with "X's";
    function dfs_swap(index){
        let split_ind = index.indexOf(",");
        let row = Number(index.slice(0, split_ind));
        let col = Number(index.slice(split_ind + 1));
        visited.add(index);
        board[row][col] = "X";

        let adj = get_adj(index);
        for(let i = 0; i < adj.length; i++){
            if(visited.has(adj[i]) == false){
                dfs_swap(adj[i]);
            }
        }
    }

    // helper: return true for components connected to any boundary and false for components not connected any boundary
    function dfs(index){
        let split_ind = index.indexOf(",");
        let row = Number(index.slice(0, split_ind));
        let col = Number(index.slice(split_ind + 1));
        visited.add(index);
        let is_connected_to_boundary = false;
        if(row == 0 || row == board.length-1 || col == 0 || col == board[0].length-1){
            is_connected_to_boundary = true;
            return is_connected_to_boundary;
        }
        
        let adj = get_adj(index);
        for(let i = 0; i < adj.length; i++){
            if(visited.has(adj[i]) == false){
                if(dfs(adj[i]) == true){
                    is_connected_to_boundary = true;
                    break;
                }
            }
        }
        return is_connected_to_boundary;
    }

    function get_adj(index){
                let split_ind = index.indexOf(",");
                let row = Number(index.slice(0, split_ind));
                let col = Number(index.slice(split_ind + 1))
                let adj_arr = [];
                // observe how visited is not queried here to check if an index is visited or not. The dfs function will skip visited ind anyway.
                // push the top element's index
                if(row != 0 && board[row-1][col] == "O"){
                    adj_arr.push(`${row-1},${col}`);
                }
                // push the right element's index
                if(col != board[0].length-1 && board[row][col+1] == "O"){
                    adj_arr.push(`${row},${col+1}`)
                }
                // push the bottom element's index
                if(row != board.length-1 && board[row+1][col] == "O"){
                    adj_arr.push(`${row+1},${col}`)
                }
                // push the left element's index
                if(col != 0 && board[row][col-1] == "O"){
                    adj_arr.push(`${row},${col-1}`)
                }
                return adj_arr;
    }
}


// function solve(board){
//     let visited = new Set();
//     for(let i = 0; i < board.length; i++){
//         for(let j = 0; j < board[0].length; j++){
//             // start dfs from boundary elements to mark the entire connected component
//             if(i == 0 || i == board.length-1 || j == 0 || j == board[0].length-1){
//                 let index = `${i},${j}`;
//                 if(board[i][j] == "O" && visited.has(index) == false){
//                     dfs(index);
//                 }
//             }
//         }
//     }
//     // swap the elements of every component that doesn't have an element lying on any boundary
//     for(let i = 0; i < board.length; i++){
//         for(let j = 0; j < board[0].length; j++){
//             let index = `${i},${j}`;
//             if(board[i][j] == "O" && visited.has(index) == false){
//                 dfs_swap(index);
//             }
//         }
//     }
//     console.log(board);
//     return board;

//     function dfs_swap(index){
//         visited.add(index);
//         let split_ind = index.indexOf(",");
//         let row = Number(index.slice(0, split_ind));
//         let col = Number(index.slice(split_ind + 1));
//         board[row][col] = "X";
//         let adj = get_adj(index);
//         for(let i = 0; i < adj.length; i++){
//             if(visited.has(adj[i]) == false){
//                 dfs_swap(adj[i]);
//             }
//         }
//     }
//     function dfs(ind){
//         visited.add(ind);  
//         let adj = get_adj(ind);
//         for(let i = 0; i < adj.length; i++){
//             if(visited.has(adj[i]) == false){
//                 dfs(adj[i]);
//             }
//         }
//     }
//     function get_adj(index){
//         let split_ind = index.indexOf(",");
//         let row = Number(index.slice(0, split_ind));
//         let col = Number(index.slice(split_ind + 1))
//         let adj_arr = [];
//         // observe how visited is not queried here to check if an index is visited or not. The dfs function will skip visited ind anyway.
//         // push the top element's index
//         if(row != 0 && board[row-1][col] == "O"){
//             adj_arr.push(`${row-1},${col}`);
//         }
//         // push the right element's index
//         if(col != board[0].length-1 && board[row][col+1] == "O"){
//             adj_arr.push(`${row},${col+1}`)
//         }
//         // push the bottom element's index
//         if(row != board.length-1 && board[row+1][col] == "O"){
//             adj_arr.push(`${row+1},${col}`)
//         }
//         // push the left element's index
//         if(col != 0 && board[row][col-1] == "O"){
//             adj_arr.push(`${row},${col-1}`)
//         }
//         return adj_arr;
//     }
   
// }


function shortestBridge (grid){
    let visited = new Set();
    let completed_dfs = false;
    for(let i = 0; i < grid.length; i++){ 
        for(let j = 0; j < grid[0].length; j++){
            if(grid[i][j] == 1){
                let ind = `${i},${j}`;
                dfs(ind, 1);
                visited.clear();
                completed_dfs = true;
                break;  
            }
        }
        if(completed_dfs == true){
            break;
        }
    }
    // perform a multi-source bfs; at lvl 0, we'll enqueue the entire connected component;
    let q = new queue();
    for(let i = 0; i < grid.length; i++){
        for(let j = 0; j < grid[0].length; j++){
            if(grid[i][j] == -1){
                q.enqueue(`${i},${j}`);
            }
        }
    }
    let dist = bfs();
    console.log(dist);
    return dist;

    function bfs(){ 
        let min_dist = -1;
        let found_dist = false;
        while(q.isEmpty() != true && found_dist == false){
            let lvl_size = q.size;
            let diffrent_components_fragment_found_in_curr_lvl = false;
            for(let i = 0; i < lvl_size; i++){
                let front = q.front;
                q.dequeue();
                visited.add(front);
                let split_index = front.indexOf(",");
                let row = Number(front.slice(0, split_index));
                let col = Number(front.slice(split_index+1));
                if(grid[row][col] == 1){
                    found_dist = true;
                    break;
                }
                if(i == lvl_size-1){
                    min_dist++;
                }
                let adj = get_adj_bfs(front);
                for(let i = 0; i < adj.length; i++){
                    if(visited.has(adj[i]) == false){
                        visited.add(adj[i]);
                        q.enqueue(adj[i]);
                    }
                }
            }
        }
        return min_dist;
    }
    function get_adj_bfs(index){
        let split_ind = index.indexOf(",");
        let row = Number(index.slice(0, split_ind));
        let col = Number(index.slice(split_ind + 1))
        let adj_arr = [];
        // observe how visited is not queried here to check if an index is visited or not. The dfs function will skip visited ind anyway.

        // push the top element's index
        if(row != 0 && grid[row-1][col] != -1){
            adj_arr.push(`${row-1},${col}`);
        }
        // push the right element's index
        if(col != grid[0].length-1 && grid[row][col+1] != -1){
            adj_arr.push(`${row},${col+1}`)
        }
        // push the bottom element's index
        if(row != grid.length-1 && grid[row+1][col] != -1){
            adj_arr.push(`${row+1},${col}`)
        }
        // push the left element's index
        if(col != 0 && grid[row][col-1] != -1){
            adj_arr.push(`${row},${col-1}`)
        }
        return adj_arr;
    }

    function dfs(ind, lookFor){
         // pre-visit
         let split_index = ind.indexOf(",");
         let row = Number(ind.slice(0, split_index));
         let col = Number(ind.slice(split_index+1));
         visited.add(ind);
         grid[row][col] = -1;

        //  visit adj
        let adj = get_adj(ind, lookFor);
        for(let i = 0; i < adj.length; i++){
            if(visited.has(adj[i]) == false){
                dfs(adj[i], lookFor);
            }
        }   
    }
    function get_adj(index, lookFor){
        let split_ind = index.indexOf(",");
        let row = Number(index.slice(0, split_ind));
        let col = Number(index.slice(split_ind + 1))
        let adj_arr = [];
        // observe how visited is not queried here to check if an index is visited or not. The dfs function will skip visited ind anyway.

        // push the top element's index
        if(row != 0 && grid[row-1][col] == lookFor){
            adj_arr.push(`${row-1},${col}`);
        }
        // push the right element's index
        if(col != grid[0].length-1 && grid[row][col+1] == lookFor){
            adj_arr.push(`${row},${col+1}`)
        }
        // push the bottom element's index
        if(row != grid.length-1 && grid[row+1][col] == lookFor){
            adj_arr.push(`${row+1},${col}`)
        }
        // push the left element's index
        if(col != 0 && grid[row][col-1] == lookFor){
            adj_arr.push(`${row},${col-1}`)
        }
        return adj_arr;
    }
}

function pacificAtlantic (heights){
    let result = [];
    let visited = new Set();
    for(let i = 0; i < heights.length; i++){
        for(let j = 0; j < heights[0].length; j++){
            let index = `${i},${j}`;
            let both_oceans_reachable = dfs(index, index);
            if(both_oceans_reachable == 0){
                result.push([i, j]);
            }
            visited.clear();
        }
    }
    console.log(result);
    return result

    function dfs(ind){
        // pre-visit
        let split_index = ind.indexOf(",");
        let row = Number(ind.slice(0, split_index));
        let col = Number(ind.slice(split_index+1));
        visited.add(ind);
        // if you reach the edge elements of the right diagonal of the matrix, both oceans are reachable
        if((((row == heights.length-1 && col == 0) || (row == 0 && col == heights[0].length-1)))){
            return 0;
        }
        let could_reach_PO = false;
        let could_reach_AO = false;
        // if you reach PO boundary or start your search from PO boundary, indicate that PO is reachable
         if((row == 0 || col == 0)){
            could_reach_PO = true;
        }
        // if you reach AO boundary or start your search from AO boundary, indicate that AO is reachable
         if(((row == heights.length-1 || col == heights[0].length-1))){
            could_reach_AO = true;
        }

        // visit adj
        let adj = get_adj(ind);
        for(let i = 0; i < adj.length; i++){
            if(visited.has(adj[i]) == false){
                let res_code = dfs(adj[i]);
                // 0 is returned if both ocean boundaries are reachable
                if(res_code == 0){
                    could_reach_AO = true;
                    could_reach_PO = true;
                    break;
                }
                // 1 is returned if only PO boundary is reachable
                else if(res_code == 1){
                    could_reach_PO = true;
                    // early exit
                    if(could_reach_AO == true){
                        break
                    }
                }
                // -1 is returned if only AO is reachable
                else if(res_code == -1){
                    could_reach_AO = true;
                    // early exit
                    if(could_reach_PO == true){
                        break
                    }
                }
            }
        }
        // post-visit; return appropriate exit code depending upon which boundaries were reachable
        if(could_reach_AO == true && could_reach_PO == true){
            return 0
        }
        else if(could_reach_AO == true){
            return -1
        }
        else if(could_reach_PO == true){
            return 1
        }
        else return null;
    }

    function get_adj(index){
        let split_ind = index.indexOf(",");
        let row = Number(index.slice(0, split_ind));
        let col = Number(index.slice(split_ind + 1))
        let adj_arr = [];
        // observe how visited is not queried here to check if an index is visited or not. The dfs function will skip visited ind anyway.

        // push the top element's index
        if(row != 0 && heights[row-1][col] <= heights[row][col]){
            adj_arr.push(`${row-1},${col}`);
        }
        // push the right element's index
        if(col != heights[0].length-1 && heights[row][col+1] <= heights[row][col]){
            adj_arr.push(`${row},${col+1}`)
        }
        // push the bottom element's index
        if(row != heights.length-1 && heights[row+1][col] <= heights[row][col]){
            adj_arr.push(`${row+1},${col}`)
        }
        // push the left element's index
        if(col != 0 && heights[row][col-1] <= heights[row][col]){
            adj_arr.push(`${row},${col-1}`)
        }
        return adj_arr;
    }
}

function updateMatrix(mat){
    let q = new queue();
    let visited  = new Set();
    for(let i = 0; i < mat.length; i++){
        for(let j = 0; j < mat[0].length; j++){
            if(mat[i][j] != 0){
                let index = `${i},${j}`;
                let dist = bfs(index);
                mat[i][j] = dist;
                // empty the visited set and the queue after cal min dist; since we exit out of bfs as soon as a 0 is found in a level, we have leftover  nodes that need to be removed
                visited.clear();
                while(q.isEmpty() == false){
                    q.dequeue();
                }
            }
        }
    }
    console.log(mat);
    return mat;

    function bfs(index){
        let min_dist = 0;
        let  exit_outer_loop = false;
        q.enqueue(index);
        while(q.isEmpty() != true && exit_outer_loop == false){
            // get the nodes in the current lvl; we'll do level by level trav of the bfs tree
            let nodes_in_curr_lvl = q.size;
            // if we have a zero in the current lvl, we have found the nearest zero
            let zero_found_in_curr_lvl = false;
            for(let i = 0; i < nodes_in_curr_lvl; i++){
                // dequeue the front node and mark it visited
                let front = q.front;
                visited.add(front);
                q.dequeue();
                let split_ind = front.indexOf(",");
                let row = Number(front.slice(0, split_ind));
                let col = Number(front.slice(split_ind+1));   
                // if this front element of the queue is a zero, we can exit early as we have our min dist
                if(mat[row][col] == 0){
                    zero_found_in_curr_lvl = true;
                    exit_outer_loop = true;
                    break;
                }
                // we queue adj elements for the next lvl if this entire level doesn't have a zero; if we find a zero early though, don't forget to empty the queue;
                let adj = get_adj(front, mat);
                for(let j = 0; j < adj.length; j++){
                    if(visited.has(adj[j]) == false){
                        q.enqueue(adj[j]);
                    }
                }
                // if at the last node of the level we still haven't encountered a 0, this entire lvl has no zero; we increment the min dist
                if(i == nodes_in_curr_lvl-1 && zero_found_in_curr_lvl == false){
                    min_dist++;
                }
            }
        }
        // q could have been emptied here instead of the main loop
        return min_dist;
    }

    function get_adj (index, matrix){
        let split_ind = index.indexOf(",");
        let row = Number(index.slice(0, split_ind));
        let col = Number(index.slice(split_ind + 1))
        let adj_arr = [];

        // push the top element's index
        if(row != 0 && visited.has(`${row-1},${col}`) == false){
            adj_arr.push(`${row-1},${col}`);
        }
        // push the right element's index
        if(col != matrix[0].length-1 && visited.has(`${row},${col+1}`) == false){
            adj_arr.push(`${row},${col+1}`)
        }
        // push the bottom element's index
        if(row != matrix.length-1 && visited.has(`${row+1},${col}`) == false){
            adj_arr.push(`${row+1},${col}`)
        }
        // push the left element's index
        if(col != 0 && visited.has(`${row},${col-1}`)==false){
            adj_arr.push(`${row},${col-1}`)
        }
        return adj_arr;
    }
}

function maxAreaOfIsland(grid){
    let visited = new Set();
    let max_island_size = 0;
    for(let i = 0; i < grid.length; i++){
        for(let j = 0; j < grid[0].length; j++){

            if (grid[i][j] == 1){
                let index = `${i},${j}`;
                if(visited.has(index) == false){
                    let curr_island_size = dfs(index);
                    max_island_size = Math.max(max_island_size, curr_island_size);
                }
            }
        }
    }
    console.log(max_island_size);
    return max_island_size;

    // helper
    function dfs(ind){
        // mark current visited
        visited.add(ind);
        let adj = get_adj(ind, grid);
        if(adj.length == 0){
            return 1;
        }
        else{
            // visit adj nodes
            let size = 0;
            for(let i = 0; i < adj.length; i++){
                if(visited.has(adj[i]) == false){
                    visited.add(adj[i]);
                    size += dfs(adj[i]);
                }  
            }
            // visit current
            return size+1; 
        }
    }

    function get_adj (index, matrix){
        let split_ind = index.indexOf(",");
        let row = Number(index.slice(0, split_ind));
        let col = Number(index.slice(split_ind + 1))
        let adj_arr = [];

        // push the top element's index
        if(row != 0 && matrix[row-1][col] == 1 && visited.has(`${row-1},${col}`) == false){
            adj_arr.push(`${row-1},${col}`);
        }
        // push the right element's index
        if(col != matrix[0].length-1 && matrix[row][col+1] == 1 && visited.has(`${row},${col+1}`) == false){
            adj_arr.push(`${row},${col+1}`)
        }
        // push the bottom element's index
        if(row != matrix.length-1 && matrix[row+1][col] == 1 && visited.has(`${row+1},${col}`) == false){
            adj_arr.push(`${row+1},${col}`)
        }
        // push the left element's index
        if(col != 0 && matrix[row][col-1] == 1 && visited.has(`${row},${col-1}`)==false){
            adj_arr.push(`${row},${col-1}`)
        }
        return adj_arr;
    }
}

function accountsMerge(accounts){
    let adj_list = new Map();
    for(let i = 0; i < accounts.length; i++){
        if(adj_list.has(accounts[i][0])){
            adj_list.get(accounts[i][0]).push(i);
        }
        else{
            adj_list.set(accounts[i][0], [i]);
        }
    }
    let visited = new Set();
    let res = []; 
    let merged_emails = new Set();
    for(let i = 0; i < accounts.length; i++){
        // if curr vertex hasn't been visited, visit it and it's adj vertices to find a connected component
        if(visited.has(i) == false){
            dfs(i, merged_emails);
            // push the connected component to result array
            res.push([accounts[i][0],...Array.from(merged_emails)]);
            merged_emails.clear();
        }
    }
    console.log(res);
    return res;

    function dfs (index, emails){
        // if dfs is called on the first node add all the emails; this forms the root node
        if(emails.size == 0){
            for(let i = 1; i < accounts[index].length; i++){
                emails.add(accounts[index][i]);
            }
            visited.add(index);
        }
        // else check if there's even a single email in the current node that is also in the root node. If there is, merge all the emails with the emails in the root node because they all belong to the same account
        else{
            for(let i = 1; i < accounts[index].length; i++){
                if(emails.has(accounts[index][i])){
                    for(let j = 1; j < accounts[index].length; j++){
                        emails.add(accounts[index][j]);
                    }
                    visited.add(index);
                    break
                }
            }
        }
        // if the node is not the root node, and does not belong with the root node, just exit the recursion; You cannot mark a node visited here because only connected nodes are marked visited. this node could be a root node and if we marked it visited here, it would not be picked up later in the main loop
        if(visited.has(index) == false){
            return
        }
        // get the adj nodes and recurse on them
        let adj = adj_list.get(accounts[index][0]);
        for(let i = 0; i < adj.length; i++){
            if(visited.has(adj[i]) == false){
                dfs(adj[i], emails);
            }
        }
    }
}

function longestIncreasingPath(matrix){
    let longest_path_size = Number.MIN_SAFE_INTEGER; 
    let memo = new Map();
    for(let i = 0; i < matrix.length; i++){
        for(let j = 0; j < matrix[0].length; j++){
            let index = `${i},${j}`;
            let curr_largest_path_size;
            // if largest path for the current index is already memoized, get the memoized value
            if(memo.has(index)){
                curr_largest_path_size = memo.get(index);
            }
            // else calc the val by doing a dfs on the index
            else{
                curr_largest_path_size = dfs(index);
            }
            // update the longest path
            longest_path_size = Math.max(longest_path_size, curr_largest_path_size);
        }
    }
    console.log(longest_path_size);
    return longest_path_size

    function dfs(ind){
        // pre-visit; if there's a memoized value for a node, get it and exit early
        if(memo.has(ind)){
            return memo.get(ind);
        }
        // if we are at a leaf vertex, return 1; a sink vertex is a leaf vertex and its height is 1. It'll have no outgoing edges
        let adj = get_adj(ind);
        if(adj.length == 0){
            // memoize and return the value
            memo.set(ind, 1);
            return 1;
        }
        // visit the adj nodes; current vertex's longest path is the longest path from one of its adjacent vertex + 1;
        let deepest_path = 0;
        for(let i = 0; i < adj.length; i++){
            let curr_path = dfs(adj[i]);
            deepest_path = Math.max(curr_path, deepest_path);
        }
        // post-visit; memoize the result and return the longest path starting from the current vertex.
        memo.set(ind, deepest_path+1);
        return deepest_path+1;
    }

    function get_adj(index){
        let split_ind = index.indexOf(",");
        let row = Number(index.slice(0, split_ind));
        let col = Number(index.slice(split_ind + 1))
        let adj_arr = [];

        // push the top element's index
        if(row != 0 && matrix[row-1][col] > matrix[row][col]){
            adj_arr.push(`${row-1},${col}`);
        }
        // push the right element's index
        if(col != matrix[0].length-1 && matrix[row][col+1] > matrix[row][col]){
            adj_arr.push(`${row},${col+1}`)
        }
        // push the bottom element's index
        if(row != matrix.length-1 && matrix[row+1][col] > matrix[row][col]){
            adj_arr.push(`${row+1},${col}`)
        }
        // push the left element's index
        if(col != 0 && matrix[row][col-1] > matrix[row][col]){
            adj_arr.push(`${row},${col-1}`)
        }
        return adj_arr;
    }
}

function numIslands(grid){
    let island_count = 0;
    let visited = new Set();
    for(let i = 0; i < grid.length; i++){
        for(let j = 0; j < grid[0].length; j++){
            let ind = `${i},${j}`;
            if(grid[i][j] == 1 && visited.has(ind) == false){
                island_count++;
                dfs(ind);
            }
        }
    } 
    console.log(island_count);
    return island_count;

    function dfs(index){
        // mark the vertex index as visited
        visited.add(index);
        // call dfs on it's adj unvisited vertices
        let adj = get_adj(index);
        if(adj.length == 0){
            return;
        }
        for(let i = 0; i < adj.length; i++){
            // if the adj vertex is unvisited, mark it visited and call dfs on that vertex 
            if(visited.has(adj[i]) == false){
                visited.add(adj[i]);
                dfs(adj[i]);
            }
        }
    }

    function get_adj(index){
        let split_ind = index.indexOf(",");
        let row = Number(index.slice(0, split_ind));
        let col = Number(index.slice(split_ind + 1))
        let adj_arr = [];

        // push the top element's index
        if(row != 0 && grid[row-1][col] == 1){
            adj_arr.push(`${row-1},${col}`);
        }
        // push the right element's index
        if(col != grid[0].length-1 && grid[row][col+1] == 1){
            adj_arr.push(`${row},${col+1}`)
        }
        // push the bottom element's index
        if(row != grid.length-1 && grid[row+1][col] == 1){
            adj_arr.push(`${row+1},${col}`)
        }
        // push the left element's index
        if(col != 0 && grid[row][col-1] == 1){
            adj_arr.push(`${row},${col-1}`)
        }
        return adj_arr;
    }
}

function orangesRotting (grid){
    // build an adj list from the matrix provided
    let adj_list = new Map();
    // we'll need starting nodes in our multi source bfs. get them in an array; also track the number of fresh oranges since it's possible that some fresh organges stay unspoilt indefinitely.
    let rotten_indexes = [];
    let fresh_oranges_count = 0;
    // we'll need to track if there's at least one fresh orange to handle an edge case
    let has_fresh = false;
    for(let i = 0; i < grid.length; i++){
        for (let j = 0; j < grid[0].length; j++){
            let matrix_index = `${i}${j}`;
            adj_list.set(matrix_index, get_adj_nodes(matrix_index));
            // if a vertex has a rotten orange, push the index of this site to rotten_indexes array
            if(grid[i][j] == 2){
                rotten_indexes.push(matrix_index)[[2,1,1],[0,1,1],[1,0,1]]
            }
            // if a site has a fresh orange, increment fresh orange count
            if(grid[i][j] == 1){
                // mark the availability of at least one fresh orange
                has_fresh = true;
                fresh_oranges_count++;
            }
        }
    }
    // handle edge cases in the input
    if(rotten_indexes.length == 0){
        if(has_fresh){
            return -1
        }
        return -1;
    }
    let time = bfs();
    console.log(fresh_oranges_count == 0 ? time : -1);
    return fresh_oranges_count == 0 ? time : -1;

    // do multi source bfs 
    function bfs (){
        let q = new queue();
        let visited = new Set();
        // our level count will be the time spent if all fresh oranges get rotten at the end of bfs
        let level_count = 0;
        // enqueue all the source vertices and mark as visited
        for(let i = 0; i < rotten_indexes.length; i++){
            q.enqueue(rotten_indexes[i]);
        }
        while(q.isEmpty() != true){
            let level_size = q.size;
            let fresh_orange_in_curr_lvl = false
            for(let i = 0; i < level_size; i++){
                // dequeue the front vertex and mark the node as visited
                let front = q.front;
                q.dequeue();
                visited.add(front);
                let row = front.charAt(0);
                let col = front.charAt(1);
                // if curr vertex has a fresh orange
                if(grid[row][col] == 1){
                    fresh_orange_in_curr_lvl = true;
                    fresh_oranges_count--;
                }
                // enqueue the non visited adjacent vertices
                let adj = adj_list.get(front);
                for(let j = 0; j < adj.length; j++){
                    if(visited.has(adj[j]) == false){
                        visited.add(adj[j]);
                        q.enqueue(adj[j]);
                    }
                }
                // increment the level count by one if atleast one fresh orange got rotten in the current lvl; we do check this at the last vertex of any level because we dont want to increment the lvl size multiple times in the same level
                if(i == level_size - 1 && fresh_orange_in_curr_lvl == true){
                    level_count++;
                }
            }
        }

        return level_count;
    }

    // helper; returns the indexes of adjacent elements that have'nt been visisted in an array
    function get_adj_nodes(ind){
        let adj_arr = [];
        let row = Number(ind.charAt(0));
        let col = Number(ind.charAt(1));
        // push the top element's index
        if(row != 0 && grid[row-1][col] != 0){
            adj_arr.push(`${row-1}${col}`);
        }
        // push the right element's index
        if(col != grid[0].length-1 && grid[row][col+1] != 0){
            adj_arr.push(`${row}${col+1}`)
        }
        // push the bottom element's index
        if(row != grid.length-1 && grid[row+1][col] != 0){
            adj_arr.push(`${row+1}${col}`)
        }
        // push the left element's index
        if(col != 0 && grid[row][col-1] != 0){
            adj_arr.push(`${row}${col-1}`)
        }
        return adj_arr;
    }
}