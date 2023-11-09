// QUESTIONS SOLVED: 13
// findHeight(bst.root)                  LC: 104;  easy
// bfsTrav(bst)                          LC: 102;  medium
// preOrdertrav(bst.root)                LC: 144;  easy
// isBst(bst)                            LC: 98;   medium
// deleteNode(20)                        LC:450;   medium
// inOrderSuccessor(12));                premium;  medium
// inOrderPredecessor(20));              GFG;      medium
// lowestLCAinBst(0,1));                 LC:236;   medium
// LCAinBinaryTree(12,25));              LC:235;   medium
// kthSmallestNumber(6));                LC:230;   medium
// countGoodNodes();                     LC: 1448; medium
// rightSIdeView()                       LC:199;   medium
// rightSideViewBFS()                    -------""-------
// houseRobber3()                        LC:337;   medium
// ..................................................................................................................................................................................
import binarySearchTree from "../data structures/binarySearchTree.mjs";
import queue from "../data structures/queue.mjs";
// ..................................................................................................................................................................................

function findHeight(node) {
    let height;
    if(node == null){
        return -1
    }
    // height of a node is height of its taller child incremented by one
    height = 1 +  Math.max(findHeight(node.left), findHeight(node.right));
    return height
}


function bfsTrav (bst) {
    // lvl order trav requires a queue
    const queue = new q();
    let node = null;
    // load the root element into the queue
    queue.enqueue(bst.root)
    // while the queue isn't empty
    while(!queue.isEmpty()){
        // get the front most element in the queue
        node = queue.front;
        // add its left child to the queue if it exists
        if(node.left) {
            queue.enqueue(node.left);
        }
        // add its right child to the queue if it exists
        if(node.right){
            queue.enqueue(node.right);
        }
        // visit the current node; visiting could mean anything, logging to the console, doing some calculation or whatever
        console.log(node.value);
        // dequeue the visited elemtent
        queue.dequeue();
    }
}

function preOrdertrav (root) {

    // visit root; visiting could mean anything involving the current node(printing to the console, doing some calculations), if the root itself doesn't exist, exit early
    if(root ==null){
        return;
    }
    console.log(root.value);

     // if left child exists
    if(root.left){
        // visit left subtree
        preOrdertrav(root.left);
    }
    // if right child exists
    if(root.right){
        // visit right subtree
        preOrdertrav(root.right);
    }
}

function isBst (bst) {
    {
        // the are multiple ways to do this:
        // 1 ⇒ do an inOrder traversal and check if the current element is larger than the last visited element; This is what is implemented below
        // 2 ⇒ do a postOrder traversal and return the larger value of the two children values if the current node is the left child child of the parent. similarly, return the smaller value of the two children values if the current node is the right child of the parent. the idea is if the largest value of the left subtree is smaller than the root, and the smallest value of the right subtree is greater than the root, we have a valid bst. This would require an argument to be sent to the children nodes to let them know if they are the left child or the right child of the parent
    }
    // initialise a number that will be compared with the smallest number in the entire tree.
    let compare = Number.NEGATIVE_INFINITY;
    let isBstBool = true; 
    let root = bst.root;
    function inOrderTrav (node) {
        if(node == null) {
            return
        }
        // trav the left sub-tree
        inOrderTrav(node.left)
        // visit current;
        if(node.value < compare){
            isBstBool = false;
        }
        // update the current smallest if needed
        else{
            compare  = node.value
        }
        // trav the right sub-tree
        inOrderTrav(node.right)
    }
    inOrderTrav(root)
    console.log(isBstBool);
    return isBstBool;
}

// helper function
function binarySearch (value, node){
    if(node == null){
        return null;
    }
    else if(value == node.value){
        return node;
    }
    else if (value < node.value){
        return binarySearch(value, node.left)
    }
    else {
        return binarySearch(value, node.right)
    }
}
// helper function
function binarySearchParentOfANode (value, node){
    if (node.left == null && node.right==null){
        return null
    }
    else if(node.left.value == value || node.right.value == value){
        return node
    }
    else if (value < node.value){
        return binarySearchParentOfANode(value, node.left)
    }
    else {
        return binarySearchParentOfANode(value, node.right)
    }
}

function deleteNode(value, node = bst.root) {
    {
        //find the node to be deleted(better yet, find its parent node)
            // check if it has no child nodes(is a leaf node)
                // if true change parents child ref to null and exit
            // else check if it has only one child node
                //if true change parent's child ref to point to child of the node to be deleted
            // else(it has two nodes)
                // find the largest node in the left  subtree OR the smallest node in right subtree and copy its value to the node to be deleted 
                // then recursively deleted the largest/smallest node whose value you copied
    }
    const nodeToBeDeleted = binarySearch(value, node);
    const parentNode = binarySearchParentOfANode(value, node);
    // if the node has no children
    if(nodeToBeDeleted.left == null && node.right == null){
            if(nodeToBeDeleted.value < parentNode.value){
                parentNode.left = null;
            }
            else {
                parentNode.right = null;
            }
    }   
    // if the node has both children
    else if (nodeToBeDeleted.left && nodeToBeDeleted.right){
        // find smallest in the right  subtree
        let smallest = nodeToBeDeleted.right;
        while(smallest.left){
            smallest = smallest.left;
        }
        // change nodetobedelted's value
        nodeToBeDeleted.value = smallest.value;
        // delete smallest 
        deleteNode(smallest.value, nodeToBeDeleted.right)
    }
    // if the node has only one child
    else{
        if(nodeToBeDeleted.value < parentNode.value){
            parentNode.left = nodeToBeDeleted.left? nodeToBeDeleted.left : nodeToBeDeleted.right;
        }
        else{
            parentNode.right = nodeToBeDeleted.left? nodeToBeDeleted.left : nodeToBeDeleted.right;
        }
    } 
}

function inOrderSuccessor (value, node = bst.root){
    {
        // => binary search the node whose successor is required to be found for this node, there are two cases:
        // case 1 ⇒ this node has a right sub-tree => in this case the successor will be the smallest number in the right sub-tree 
            // ⇒ find smallest number in the right sub-tree and return that.
        // case 2 ⇒ this node does not have a right sub-tree => in this case the successor will be the nearest parent node that is larger than the given value(the parent node that  has this given node in its left sub-tree)
            // => initialize an array = PATH and do a binary search for the node while pushing the visited nodes to path   
            // => iterate from the left end and find the first element greater than node and that is the parent node that is the successor     
    }
    let path = [];
    //helper function
    function binarySearch (value, node){
        path.push(node);
        if(node == null){
            return null
        }
        else if (node.value == value){
            return node
        }
        else if (value < node.value){
            return binarySearch(value, node.left)
        }
        else{
            return binarySearch(value, node.right)
        }
    }
    // binary search the node first
    const foundNode = binarySearch(value, node);
    // if the right subtree does not exist, the successor is the first parent with value larger than itself
    if(!foundNode.right){
        for(let i = path.length-1; i>= 0; i--){
           if (path[i].value > value){
            return path[i]
           }
           else continue
        }
    }
    // else the successor if the smallest element in the right sub tree
    else{
        let next = foundNode.right;
        while(next.left){
            next = next.left;
        }
        return next
    }
}

function inOrderPredecessor (value, node = bst.root){
    {
        // same logic as in order successor
    }
    const path = []
    function binarySearch (value, node){
        path.push(node);
        if(node == null){
            return null
        }
        else if (node.value == value){
            return node
        }
        else if (value < node.value){
            return binarySearch(value, node.left)
        }
        else{
            return binarySearch(value, node.right)
        }
    }
    const nodeWithGivenValue = binarySearch(value, node)
    // if node has a left subtree, pred will be largest of the left subtree
    if(nodeWithGivenValue.left){
        let largestInLeftSubTree = nodeWithGivenValue.left;
        while(largestInLeftSubTree.right){
            largestInLeftSubTree = largestInLeftSubTree.right;
        }
        return largestInLeftSubTree.value;
    }
    // else if there is no left subtree
    else {
        for(let i = path.length-1; i>= 0; i--){
            if(path[i].value<value){
                return path[i].value
            }
            else continue
        }
        return null;
    }
}

function LCAinBST (a, b, node = bst.root){
    {
        // There is at least 3 different ways to do it;
        // Pre Order trav:
                // check if node == a or b, if either case is true return a or b because we encountered one of the two value whose LCA we were looking for in the first place
                // otherwise visit a node and check if its value is in range => greater than a and lesser than b;
                // if it is, then it is the LCA
                // else 
                    // if the current node is out of range on the left side i.e the number is smaller than (a), there's no way we'll find a node in range in the left subtree since they will all be even more smaller => so search the right subtree
                    // else search the left subtree     
    }
    // a < b for convenience
    if (a > b){
        let temp = a;
        a = b;
        b = temp;

    }
    // we encountered on of the two values whose lca we were looking for in the first place. there is no way any other node can be an lca now.
    if(node.value == a){
        return a
    }
    else if(node.value == b){
        return b
    }
    // else, check if the node is in  range of the two given values; if it is then we have a lca
    else if (node.value > a && node.value < b){
        return node.value
    }
    // else if out of range on the left side => search right subtree
    else if (node.value < a){
        return LCAinBST(a, b, node.right)
    }
    // out of range on the right subtree
    else{
        return LCAinBST(a,b,node.left)
    }
}

function LCAinBinaryTree (a, b, node = bst.root){
    {
        // we can check for each node if its left subtree returns either a/b and its right subtree returns either b/a.
        // ⇒  if you find a node whose left subtree contains a/b and right subtree contains b/a, that is the separation point and the lca.
        // ⇒ Use post order DFS because only after accessing the left subtree and the right subtree can you make a decision if a particular node is part of the path from root to a/b or not.
    }
    // if you hit a dead end return null
    if (node == null){
        return null
    }
    // else if the node value itself is either a or b, return a or b accordingly 
    else if (node.value == a || node.value == b){
        return node.value == a ? a : b;
    }
    // save the values returned by left subtree and right subtree in variables
    let left = LCAinBinaryTree(a, b, node.left)
    let right = LCAinBinaryTree(a, b, node.right)

    // visit the node; here visiting means returning something based on what the left subtree and right subtree returned

    //for a null node, return null
    if(left == null && right == null){
        return null
    }
    // if either sub tree returned either a or b but not both, return either a or b accordingly 
    else if(left == a && right == null){
        return a
    }
    else if (left  == b && right == null){
        return b
    }
    else if(right == a && left == null){
        return a
    }
    else if(right == b && left == null){
        return b
    }
    // if one subtree returned a and other returned b or the other way around, we have our LCA and its value needs to be returned
    else if (left == a && right == b){
        return node.value;
    }
    else if (left ==b && right == a){
        return node.value
    }
    // if a value was returned instead of a or b or null, that value was the LCA. keep returning the lca.
    else if(left != a && left != b && left != null){
        return left;
    }
    else if (right != a && right != b && right != null){
        return right;
    }  
}

function kthSmallestNumber(k, node =bst.root) {
    {
    // just do an inOrder dfs traversal while keeping a counter in sync with the number of nodes visited,  and a result variable 
    // when counter == k 
        // => update result to current value and return.
    }
    let counter = 0;
    let hasFound = false;
    let kthSmallest = null;
    function inOrder(node = bst.root) {
        // early exit if result found
        if (hasFound == true || node == null){
            return
        }
        // explore left subtree
        inOrder(node.left)
        // visit current; visiting means incrementing the counter and checking if it's equal to k; if it is we have found the kth smallest number.
        counter++;
        if(counter == k){
            kthSmallest = node.value;
            hasFound = true;

        }
        // explore right subtree
        inOrder(node.right)
    }
    inOrder();
    return kthSmallest;
}

   
function countGoodNodes(node = bst.root){
    {
        // pre order dfs.
        // A node is considered good based on a criteria that involves every node between itself and the root. children don’t come into the picture at all.
    }
    let count = 0;
    let largestValue = Number.NEGATIVE_INFINITY;
    function preOrderTrav (node = bst.root){
        if(node == null){
            return
        }
        if(node.value >= largestValue){
            count++
            largestValue = node.value;
        }
        preOrderTrav(node.left)
        preOrderTrav(node.right)
    }
    preOrderTrav()
    console.log(count);
    return count
}


function rightSIdeView(node = bst.node) {
    {
        // this is the pre order dfs solution
        // we use a level counter and depth of a node to figure out the right most element of every level; 
        // neat trick if you ask me
    }

    let level = -1
    function preOrder (node = bst.root, parentHeight = -1){
        if (node == null){
            return
        }

        let nodeHeight = parentHeight + 1;
        if(nodeHeight>level){
            console.log(node.value);
            level++;
        }
        preOrder(node.right, nodeHeight);
        preOrder(node.left, nodeHeight);

    }
    preOrder()
}
function rightSideViewBFS(node = bst.root){
{
    // BFS solution.
}
const q = new queue();
q.enqueue(node);
while(!q.isEmpty()){
    // get the current size of the queue; we handle all elements in a particular level at once.
    const length = q.size;
    // iterate till the last element of the current level; we will be enqueing  elements belonging to the next level as we go but we don't want want to touch them; they get handled in the next iteration of the while loop
    for(let i = 0; i < length; i++){
        const current = q.front;
        if(i == 0){
            console.log(current.value);
        }
        if(current.right){
            q.enqueue(current.right)
        }
        if(current.left){
            q.enqueue(current.left)
        }
        q.dequeue();
    }
}
}

// helper function
function generatePathInBinaryTree(a, node = bst.root){
    {
        // postOrder dfs
        // if(node == null) => return
        // if(node == a ) => return a 
        // if(node.left)
            // left =>  lowestCommonAncestorBrute(node.left)
        // if(node.right)
            // right => lowestCommonAncestorBrute(node.right)
        // visit
        // if either left or right returns a  => current node is part of path => push to path array
        // if neither return value is  a => return null
    }
    if(node == null){
        return
    }
    if(node.value == a){
        return a
    }
    let left = generatePathInBinaryTree(a, node.left);
    let right = generatePathInBinaryTree(a, node.right);
    if(left == a || right == a){
        console.log(node.value);
        return a
    }
    else return null
    
}

function houseRobber3 (node = bst.root) {
    {
        // At first you would think that doing level order traversal and summing up the elements of alternate levels would give the answer. That’s not going to work because we can have a parent child pair that both need to be skipped because the grand parent and grand child are larger than both parent and child.

        // An important observation is that at every node, you essentially have two choices; either to include that node in the total sum or exclude it. furthermore, if you wish to include a particular node, you can only do so if both of its children were not included in the total sum. Another thing to note is that including every alternate node does not necessarily means that your sum will be maximum because it is a regular binary tree.
        // for instance:                  10                     level 0
        //                            /         \
        //                           1           2               level 1
        //                         /   \       /   \
        //                        3    4      6     7            level 2
        //                       / \ / \    / \    / \
        //                      9 8  9 8    9 8    9 8           level 3
        
        // in the above tree level 3 and level 0 nodes add up to give the max sum. for them to be allowed to be added, you have to skip nodes from two consecutive levels: level 1 and level 2;
        // ⇒ we can see that the decision to include or exclude a node depends upon the result of visiting its children(whether they were included or not). So post-order traversal is needed.
        // ⇒ we will do a post order dfs, and from every node we will return two types of sums in an object ⇒ sumIncludingNodeValue, and sumExcludingNodeValue.
        // ⇒ sumIncludingNodeValue for the current node  ⇒ current node value + left child’s sumExcludingNodeValue + right child’s sumExcludingNodeValue;
        // ⇒ sumExcludingNodeValue ⇒ larger of ((left child’s sumExcludingNodeValue + right child’s sumExcludingNodeValue), (left child’s sumIncludingNodeValue + right child’s sumIncludingNodeValue);
        // ⇒ the parent will take these values and calculate its own sumExcludingNodeValue, and sumIncludingNodeValue;
        // ⇒ once we reach the root node, we will return the larger of th two values.
    }
    if (node == null){
        return null
    }
    // explore left sub tree
    let left = houseRobber3(node.left);
    // explore right sub tree
    let right = houseRobber3(node.right);

    // visit current
    let includingCurrentNode;
    let excludingCurrentNode;
    let result;

    // if left and right both subtrees exist;
    if(node.left && node.right){
        // when you include a node to your sum, you can only include it to the sum that excludes the children nodes.
        includingCurrentNode = node.value + left.excludingCurrentNode + right.excludingCurrentNode;
        // when you exclude a node, there is no restriction on what you can pick. Just pick the larger value
        excludingCurrentNode = Math.max((left.includingCurrentNode + right.includingCurrentNode),(left.excludingCurrentNode + right.excludingCurrentNode));
    }
    // else if only the left subtree exist;
    else if(node.left){
        includingCurrentNode = node.value + left.excludingCurrentNode;
        excludingCurrentNode = Math.max(left.includingCurrentNode, left.excludingCurrentNode);
    }
    // else if only right subtree exist;
    else if(node.right){
        includingCurrentNode = node.value + right.excludingCurrentNode;
        excludingCurrentNode = Math.max(right.includingCurrentNode, right.excludingCurrentNode);
    }
    // create an object to return both sums
    result = {
        includingCurrentNode,
        excludingCurrentNode
    }
    // if at the root node, log to the console
    if (node == bst.root){
        console.log(Math.max(result.includingCurrentNode, result.excludingCurrentNode));
        return Math.max(result.includingCurrentNode, result.excludingCurrentNode)
    }
    // else return both sums to the parent node
    else return result;
}


