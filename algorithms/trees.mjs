import binarySearchTree from "../data structures/binarySearchTree.mjs";
import queue from "../data structures/queue.mjs";

// ...................................TREES..............................................
// finMinMax(bst)
// console.log(findHeight(bst.root));
// bfsTrav(bst)
// preOrdertrav(bst.root)
// console.log(isBst(bst));
// deleteNode(20)
// console.log(inOrderSuccessor(12));
// console.log(inOrderPredecessor(20));
// console.log(lowestLCAinBst(0,1));
// console.log(LCAinBinaryTree(12,25));
// console.log(kthSmallestNumber(6));
// constructBST(["a","b","d","z","c","e","f","g"], ["d","z","b","c","a","f","e","g"])
// countGoodNodes()
// rightSIdeView()
// rightSideViewBFS()
// generatePathInBinaryTree(25)
// houseRobber3()

// ........................................FUNCTION DECLARATIONS............................................................

function finMinMax (bst) {
    let trav = bst.root;
    let result = []
    let smallest = null;
    let largest = null;
    
    while(trav.left){
        trav = trav.left
    }
    smallest = trav.value
    trav = bst.root
    while(trav.right){
        trav = trav.right
    }
    largest = trav.value;
    result.push(smallest, largest)
    console.log(result);
}
function findHeight(node) {
    // height of a node = 1 +  max of height of either child nodes
    let height;
    if(node == null){
        return -1
    }
    height = 1 +  Math.max(findHeight(node.left), findHeight(node.right));
    return height
}


function bfsTrav (bst) {
    const queue = new q();
    let node = null;
    queue.enqueue(bst.root)
    while(!queue.isEmpty()){
        node = queue.front;
        if(node.left) {
            queue.enqueue(node.left);
        }
        if(node.right){
            queue.enqueue(node.right);
        }
        // visiting means printing. could mean anything
        console.log(node.value);
        queue.dequeue();
    }
}

function preOrdertrav (root) {
    // visit root
        // if left child exists
            // visit left subtree
        // else return
        // if right child exists
            // visit right subtree
        // else return
    if(root ==null){
        return;
    }
    console.log(root.value);
    if(root.left){
        preOrdertrav(root.left);
    }
    if(root.right){
        preOrdertrav(root.right);
    }
}

function isBst (bst) {
    {
        // initialize a check var to minus infi
        // do inordertrav and check if visited node is larger than check var
        // if it is updated check var => current and continue
        // else terminate immediately and return false
    }
    let compare = Number.NEGATIVE_INFINITY;
    let isBstBool = true; 
    let root = bst.root;
    function inOrderTrav (node) {
        if(node == null) {
            return
        }
        inOrderTrav(node.left)
        // visit
        if(node.value < compare){
            isBstBool = false;
        }
        else{
            compare  = node.value
        }
        inOrderTrav(node.right)
    }
    inOrderTrav(root)
    return isBstBool;
}
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
    let path = [];
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
    const foundNode = binarySearch(value, node);
    if(!foundNode.right){
        for(let i = path.length-1; i>= 0; i--){
           if (path[i].value > value){
            return path[i]
           }
           else continue
        }
    }
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
        // for a given node 
            // case1- if it has a left child, predecessor will be the largest number in the left subtree
            // case2- if it has no left sub tree, pred. will be the first parent node that has a value smaller than the given value(i.e the parent that has the given node to its right )
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
    // if node has a left child, pred will be largest of the left subtree
    if(nodeWithGivenValue.left){
        let largestInLeftSubTree = nodeWithGivenValue.left;
        while(largestInLeftSubTree.right){
            largestInLeftSubTree = largestInLeftSubTree.right;
        }
        return largestInLeftSubTree.value;
    }
    // there is no left subtree
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
    // a < b for convenience
    if (a > b){
        let temp = a;
        a = b;
        b = temp;

    }
    {   // check if node == a or b, if either case is true return a or b 
        // visit a node and check if its value is in range => greater than and lesser than b;
        // if it is, this is the lcs
        // else 
            // if the current node is out of range on the left side i.e the number is smaller than (a), there's no way we'll find a node in range in the left subtree since they will all be even more smaller => so search the right subtree
            // else search the left subtree

            
    }
    if(node.value == a){
        return a
    }
    else if(node.value == b){
        return b
    }
    // if in range of two given values
    else if (node.value > a && node.value < b){
        return node.value
    }
    // out of range on the left side => search right subtree
    else if (node.value < a){
        return LCAinBST(a, b, node.right)
    }
    else{
        return LCAinBST(a,b,node.left)
    }
}

function LCAinBinaryTree (a, b, node = bst.root){
    {
        // if node == null
            // return null
        // if node == a/b
            // return a/b
        // left => LCA (left)
        // right => LCA (right)
        // if left and right both return null => return null
        // elif either one returns a or b  and the other return null => return a or b
        // else if left returns a/b and right returns b/a => return the node.value because it is the lca
        // elif if you receive a number other than a/b/null return that number

    }

    if (node == null){
        return null
    }
    else if (node.value == a || node.value == b){
        return node.value == a ? a : b;
    }
    let left = LCAinBinaryTree(a, b, node.left)
    let right = LCAinBinaryTree(a, b, node.right)

    if(left == null && right == null){
        return null
    }
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
    else if (left == a && right == b){
        return node.value;
    }
    else if (left ==b && right == a){
        return node.value
    }
    else if(left != a && left != b && left != null){
        return left;
    }
    else if (right != a && right != b && right != null){
        return right;
    }  
}

function kthSmallestNumber(k, node =bst.root) {
    {
        // counter = 0; in global scope
        // hasFound = false;
        // kthSmallest = null;

        // if hasFound == true => return
        // inOrder trav
            // visit left => kthSmallestNumber(node.left)
            // visit curr => increment counter by 1
                // log node.value just to see how many operations were performed
                // if counter == k => kthSmallest = node.value, hasFound == true
                    
            // elif left or right returned a number instead of null => return that number
            // visit right => kthSmallestNumber(node.right)
    }
    let counter = 0;
    let hasFound = false;
    let kthSmallest = null;
    function inOrder(node = bst.root) {
        if (hasFound == true || node == null){
            return
        }
        // left
        inOrder(node.left)
        // current
        counter++;
        if(counter == k){
            kthSmallest = node.value;
            hasFound = true;

        }
        // right
        inOrder(node.right)
    }
    inOrder();
    return kthSmallest;
}
function constructBST(preorder, inorder){
    {   
        //TODO
    }

   
}
function countGoodNodes(node = bst.root){
    {
        // if(node==null) => return
        //  count => 0;
        // largestValue => -negative infinity;
        // preOrderTrav
        // visit
            // if node.value >= largestValue
                // largestVal => node.current
                // count++
        // countGoodNodes(left)
        // countGoodNodes(right)
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
    //  level = -1
    // function preOrder (height = -1, node)
        // nodeHeight = height+1;
        // if nodeHeight > level 
            // print node.value
            // level++;
        // preorder(nodeheight, node.left)
        // preorder(nodeHeight, node.right)
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
    // get a queue and add root to it
    // while(!queue.isEmpty)
        // length of quene = q.size()
        // for (i: 0 to < length)   
            // current = q.dequeu
            // if ( i == 0) => right most node
                // console log value
            // add right node if it exists
            // add left node if it exists
            // dequeue current

}
const q = new queue();
q.enqueue(node);
while(!q.isEmpty()){
    const length = q.size;
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
        // postOrderDFS
        // if node == null return null
        // left => houseRobber3(NODE.LEFT)
        // right => houseRobber3(node.right)
        // visit
            //result =>  {
                // includingCurrentNode: left? node.value + left.exclusingNodeValue + right.excludingNodeValue,
                // excludingCurrentNode: right? left.includingNodeValue + right.includingNodeValue
            // }
        // if (node == bst.root)=> return Max(left, right)
        // else return result
    
    }
    if (node == null){
        return null
    }
    let left = houseRobber3(node.left);
    let right = houseRobber3(node.right);
    let includingCurrentNode;
    let excludingCurrentNode;
    let result;
    if(left){
        if(right){
            includingCurrentNode = node.value + left.excludingCurrentNode + right.excludingCurrentNode;
            excludingCurrentNode = left.includingCurrentNode + right.includingCurrentNode;
        }
        else{
            includingCurrentNode = node.value + left.excludingCurrentNode;
            excludingCurrentNode = left.includingCurrentNode;
        }
    }
    else{
        includingCurrentNode = node.value;
        excludingCurrentNode = null;
    }
    result = {
        includingCurrentNode,
        excludingCurrentNode
    }
    if (node == bst.root){
        console.log(Math.max(result.includingCurrentNode, result.excludingCurrentNode));
        return Math.max(result.includingCurrentNode, result.excludingCurrentNode)
    }
    else return result;
}


