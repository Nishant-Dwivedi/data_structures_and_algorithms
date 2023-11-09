// Priority queue (max_heap)
export default class priorityQueue {
    #heap_arr; 
    #heap_end_index = 0;
    #comparator_func;
    constructor (input, comparator){
        if(comparator != undefined){
            // init an empty priority queue if input isn't a valid array of elements
            if(typeof(input) != "object" || input.length == 0 || input == undefined){
                input = [];
            }
             // init heap to be the input array
             this.#heap_arr = Array.from(input);
             this.#heap_end_index = this.#heap_arr.length-1;
            //  our pq will throw an error without a comparator.
             this.#comparator_func = comparator;
            // build a heap
            this.#build_heap();
        }
        // throw error if invalid input is provided
        else{
            return new Error(`Provide a valid argument: arg1: input array of length > 0, arg2: comparator function that takes in two arguments a, b and returns the higher priority element`)
        }
        
    }
    // helper: builds a heap with highest priority item at the top(max heap)
    #build_heap(){
        //#heapify the input array
        for(let i = Math.floor(this.#heap_arr.length/2) - 1; i >= 0; i--){
            this.#heapify(i);
        }
    }
    // helper: heapifies the subtree rooted at a given index
    #heapify(index){
         // return if index points to a leaf node since a leaf node is already a heap
         if (index > Math.floor((this.#heap_end_index + 1)/2) || index == null){
            return;
        }
    
        // get the indexes of the left and the right children: 2i+1 and 2i +2 in a 0-indexed array
         let left = (2 * index) + 1 <= this.#heap_end_index ? (2 * index) + 1 : null;
         // right child won't necessarily be present
         let right = 2 * (index) + 2 <= this.#heap_end_index ?  2 * (index) + 2 : null;
        
        //  exit early if both child nodes are null
         if(left == null && right == null){
            return
         }
        //  exit early if current node has higher priority than it's children (both children if both are present, left child if only left is present, or right child if only right child is present), 
         else if((right == null && left != null && this.#heap_arr[index] == this.#comparator_func(this.#heap_arr[index], this.#heap_arr[left])) || (left == null && right != null && this.#heap_arr[index] == this.#comparator_func(this.#heap_arr[index], this.#heap_arr[right])) || (left != null && right != null && this.#heap_arr[index] == this.#comparator_func(this.#heap_arr[index], this.#heap_arr[left]) && this.#heap_arr[index] == this.#comparator_func(this.#heap_arr[index], this.#heap_arr[right]))){
            return
         }
        //  else there is a violation of the pq property; handle it and recurse on the children nodes.
         else{
            // figure out the index of the higher priority child amongst the two of them
            // let higher_priority_child_index = right != null && left != null ? (this.#heap_arr[right] == this.#comparator_func(this.#heap_arr[right], this.#heap_arr[left]) ? right : left) : (right == null ? left : right); 
            let higher_priority_child_index;
            if(right != null && left != null){
                higher_priority_child_index = this.#heap_arr[right] == this.#comparator_func(this.#heap_arr[right], this.#heap_arr[left]) ? right : left;
            }
            else if (right == null){
                higher_priority_child_index = left;
            }
            else{
                higher_priority_child_index = right;
            }

            let tmp = this.#heap_arr[index];
            this.#heap_arr[index] = this.#heap_arr[higher_priority_child_index];
            this.#heap_arr[higher_priority_child_index] = tmp;
             // now recursively#heapify heaps rooted at children nodes
            this.#heapify(left);
            this.#heapify(right);
        
         }
    }

    // gets the highest priority item
    get get_priority_element(){
        // console.log(`heap: ${this.#heap_arr}, priority element: ${this.#heap_arr[0]}, size: ${this.#heap_end_index+1}`);
        return this.#heap_arr[0];
    }

    // returns the current heap size
    get size(){
        // console.log(`heap: ${this.#heap_arr},size: ${this.#heap_end_index+1}`);
        return this.#heap_end_index + 1;
    }

    // removes the highest priority(min) item in a min heap
    extract_priority_element(){
        if(this.#heap_arr[0] == null){
            return
        }
        let tmp = this.#heap_arr[0];
        // copy the left most leaf node to the root node that is to be deleted
        this.#heap_arr[0] = this.#heap_arr[this.#heap_end_index];
        // make the left most leaf node null
        this.#heap_arr[this.#heap_end_index] = null;
        // decrement the heap array's end pointer
        this.#heap_end_index--;
        //#heapify the root node
        this.#heapify(0);
        return tmp;
    }

    // inserts a node in the heap
    insert (value){
            // if our heap has some empty space left
            if(this.#heap_arr.length - 1 > this.#heap_end_index){
                // increment the heap end pointer to reflect the increse in size
                this.#heap_end_index++;
                // insert the new element at the left most empty node of the last level(the end of the array)
                this.#heap_arr[this.#heap_end_index] = value;
                // undo the heap property violation if there is one after inserting the new node#heapify upwards);
                let current_index = this.#heap_end_index;
                let parent_index = Math.floor((current_index-1)/2);
                // while the higher priority of a parent node isn't restored or and we haven't reached the root node already, keep swapping with child if needed
                while(current_index > 0 && (this.#heap_arr[parent_index] != this.#comparator_func(this.#heap_arr[current_index], this.#heap_arr[parent_index]))){
                    let temp = this.#heap_arr[parent_index];
                    this.#heap_arr[parent_index] = this.#heap_arr[current_index];
                    this.#heap_arr[current_index] = temp;
                    current_index = parent_index;
                    parent_index = Math.floor((current_index-1)/2);
                }
            }
            // else we create a new node and push it to the end of the array
            else{
                // push the new node to the array
                this.#heap_arr.push(value);
                // increment the heap end pointer to reflect the increse in size
                this.#heap_end_index++;
                // if the current element is the first element in the heap, no property violation can happen
                if(this.#heap_end_index == 0){
                    return;
                }
                // undo the heap property violation if there is one after inserting the new node#heapify upwards)
                let current_index = this.#heap_end_index;
                let parent_index = Math.floor((current_index-1)/2);
                // while the higher priority of a parent node isn't restored or and we haven't reached the root node already, keep swapping with child if needed
                while(current_index > 0 && (this.#heap_arr[parent_index] != this.#comparator_func(this.#heap_arr[current_index], this.#heap_arr[parent_index]))){
                    let temp = this.#heap_arr[parent_index];
                    this.#heap_arr[parent_index] = this.#heap_arr[current_index];
                    this.#heap_arr[current_index] = temp;
                    current_index = parent_index;
                    parent_index = Math.floor((current_index-1)/2);
                }
            }
    }
}