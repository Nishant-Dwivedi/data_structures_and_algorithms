import bstNode from "./bstNode.mjs";
export default class binarySearchTree {
    root; 
    height = -1; 
    constructor () {
        this.root = null;
    }

    insert(data, node=this.root) {
        // create a bstnode from data
        // if this.root is null => set root to this bstnode and exit
        // else 
            // check if the newNOde goes in the left subtree
                // if there is no data in node.left =>
                    // node.left = newNode
                // else call insert on node.left
            // or right subtree
                 // if there is no data in node.right
                    // node.right = newNode
                // else call insert on node.right
        
        const newNode = new bstNode(data);
        if(!this.root){
            this.root = newNode
            return
        }
        else {
            if(data <= node.value){
                if(!node.left){
                    node.left = newNode;
                    return
                }
                else{
                    this.insert(data, node.left)
                }
            }
            else {
                if(!node.right){
                    node.right = newNode;
                    return
                }
                else{
                    this.insert(data, node.right)
                }
            }
        }
    }

    search (data, node = this.root) {
        if (node == null){
            console.log("not found");
            return false
        }
        else if(node.value == data){
            console.log("found");
            return true
        }
        else if(data <= node.value){
            this.search(data, node.left)
        }
        else {
            this.search(data, node.right)
        }
    }
}