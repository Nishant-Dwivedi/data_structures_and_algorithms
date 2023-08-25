export default class heap {
    #heap_arr; 
    #heap_end_index = 0;
    #type = null;

    constructor (input, type){
        if(input && typeof(input) == "object" && input.length != 0 && (type == "min" || type == "max")){
             // init heap to be the input array
             this.#heap_arr = Array.from(input);
             this.#heap_end_index = this.#heap_arr.length-1;
             this.#type = type;
            // build a min heap
             if(type == "min"){
                 this.#build_min_heap(input);
             }
            // build a max heap
             else if(type == "max"){                
                 this.#build_max_heap(input);
             }
        }
        // throw error if invalid input is provided
        else{
            return new Error(`Provide a valid argument: (input = an array of size > 0; type: array, heap type = "max"/"min" type: string)`)
        }
        
    }
    // helper: builds a min heap
    #build_min_heap(input){
        // heapify the input array
        for(let i = Math.floor(this.#heap_arr.length/2) - 1; i >= 0; i--){
            this.#min_heapify(i);
        }
    }
    // helper: builds a max heap
      #build_max_heap(input){
        // heapify the input array 
        for(let i = Math.floor(this.#heap_arr.length/2) - 1; i >= 0; i--){
            this.#max_heapify(i);
        }
    }
    // helper: min heapifies the subtree rooted at a given index
    #min_heapify(index){
         // return if index points to a leaf node since a leaf node is already a heap
         if (index > Math.floor((this.#heap_end_index + 1)/2) || index == null){
            return;
        }
         // get the indexes of the left and the right children: 2i+1 and 2i +2 in a 0-indexed array
         let left = (2 * index) + 1 <= this.#heap_end_index ? (2 * index) + 1 : null;
         // right child won't necessarily be present
         let right = 2 * (index) + 2 <= this.#heap_end_index ?  2 * (index) + 2 : null;

         // if current node is larger than either of its children, swap 
        if(this.#heap_arr[index] > this.#heap_arr[left] || this.#heap_arr[index] > this.#heap_arr[right]){
            // if right child isn't null, save in a var the child that's larger (higher priority)
            // for an input array with 11 elements, the mid element will be the 5th one, it will have 2nth and 2n+1th node available; but if input array has 10 elements, the mid element will still be the 5th element, but it's 2n+1th node will be absent in the array
            let smaller = right ? (this.#heap_arr[left] < this.#heap_arr[right] ? left : right) : left;
            let tmp = this.#heap_arr[index];
            this.#heap_arr[index] = this.#heap_arr[smaller];
            this.#heap_arr[smaller] = tmp;
             // now recursively heapify heaps rooted at children nodes
            this.#min_heapify(left);
            this.#min_heapify(right);
        }
        else return
    }

    // helper: max heapifies the subtree rooted at a given index
     #max_heapify(index){
         // return if index points to a leaf node since a leaf node is already a heap
         if (index > Math.floor((this.#heap_end_index + 1)/2) || index == null){
            return;
        }
        // get the indexes of the left and the right children: 2i+1 and 2i +2 in a 0-indexed array
        let left = (2 * index) + 1 <= this.#heap_end_index ? (2 * index) + 1 : null;
        // right child won't necessarily be present
        let right = 2 * (index) + 2 <= this.#heap_end_index ?  2 * (index) + 2 : null;
        
        // if current node is smaller than either of its children, swap 
        if(this.#heap_arr[index] < this.#heap_arr[left] || this.#heap_arr[index] < this.#heap_arr[right]){
            // if right child isn't null, save in a var the child that's larger (higher priority)
            // for an input array with 11 elements, the mid element will be the 5th one, it will have 2nth and 2n+1th node available; but if input array has 10 elements, the mid element will still be the 5th element, but it's 2n+1th node will be absent in the array
            let larger = right ? (this.#heap_arr[left] > this.#heap_arr[right] ? left : right) : left;
            let tmp = this.#heap_arr[index];
            this.#heap_arr[index] = this.#heap_arr[larger];
            this.#heap_arr[larger] = tmp;
             // now recursively heapify heaps rooted at children nodes
            this.#max_heapify(left);
            this.#max_heapify(right);
        }
        else return
    }

    // gets the highest priority item in a min heap
    get get_min(){
        if(this.#type == "max"){
            return new Error(`this is a max heap, use get_max() function instead`);
        }
        console.log(`heap: ${this.#heap_arr}, min: ${this.#heap_arr[0]}, size: ${this.#heap_end_index+1}`);
        return this.#heap_arr[0];
    }

    // gets the highest priority item in a max heap
    get get_max(){
        if(this.type == "min"){
            return new Error(`this is a min heap, use get_min() function instead`);
        }
        console.log(`heap: ${this.#heap_arr}, max: ${this.#heap_arr[0]}, size: ${this.#heap_end_index+1}`);
        return this.#heap_arr[0];
    }

    // returns the current heap size
    get size(){
        console.log(`heap: ${this.#heap_arr}, ${this.#type == "max" ? "max: " : "min: "}${this.#heap_end_index+1} ,size: ${this.#heap_end_index+1}`);
        return this.#heap_end_index + 1;
    }

    // removes the highest priority(min) item in a min heap
    extract_min(){
        if(this.#heap_arr[0] == null || this.#type == "max"){
            return
        }
        // copy the left most leaf node to the root node that is to be deleted
        this.#heap_arr[0] = this.#heap_arr[this.#heap_end_index];
        // make the left most leaf node null
        this.#heap_arr[this.#heap_end_index] = null;
        // decrement the heap array's end pointer
        this.#heap_end_index--;
        // heapify the root node
        this.#min_heapify(0);
    }

    // removes the highest proirity(max) item in a max heap
    extract_max(){
        if(this.#heap_arr[0] == null || this.type == "min"){
            return
        }
        // copy the left most leaf node to the root node that is to be deleted
        this.#heap_arr[0] = this.#heap_arr[this.#heap_end_index];
        // make the left most leaf node null
        this.#heap_arr[this.#heap_end_index] = null;
        // decrement the heap array's end pointer
        this.#heap_end_index--;
        // heapify the root node
        this.#max_heapify(0);
    }

    // inserts a node in the heap
    insert (value){
        // insert in a max heap
        if(this.#type == "max"){
            // if our heap has some empty space left
            if(this.#heap_arr.length - 1 > this.#heap_end_index){
                // increment the heap end pointer to reflect the increse in size
                this.#heap_end_index++;
                // insert the new element at the left most empty node of the last level(the end of the array)
                this.#heap_arr[this.#heap_end_index] = value;
                // undo the heap property violation if there is one after inserting the new node(heapify upwards);
                let current_index = this.#heap_end_index;
                let parent_index = Math.floor((current_index-1)/2);
                while(this.#heap_arr[parent_index] < this.#heap_arr[current_index]){
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
                // undo the heap property violation if there is one after inserting the new node(heapify upwards)
                let current_index = this.#heap_end_index;
                let parent_index = Math.floor((current_index-1)/2);
                while(this.#heap_arr[parent_index] < this.#heap_arr[current_index]){
                    let temp = this.#heap_arr[parent_index];
                    this.#heap_arr[parent_index] = this.#heap_arr[current_index];
                    this.#heap_arr[current_index] = temp;
                    current_index = parent_index;
                    parent_index = Math.floor((current_index-1)/2);
                }
            }
        }
        // insert in a min heap TODO
        else{
             // if our heap has some empty space left
             if(this.#heap_arr.length - 1 > this.#heap_end_index){
                // increment the heap end pointer to reflect the increse in size
                this.#heap_end_index++;
                // insert the new element at the left most empty node of the last level(the end of the array)
                this.#heap_arr[this.#heap_end_index] = value;
                // undo the heap property violation if there is one after inserting the new node(heapify upwards);
                let current_index = this.#heap_end_index;
                let parent_index = Math.floor((current_index-1)/2);
                while(this.#heap_arr[parent_index] > this.#heap_arr[current_index]){
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
                // undo the heap property violation if there is one after inserting the new node(heapify upwards)
                let current_index = this.#heap_end_index;
                let parent_index = Math.floor((current_index-1)/2);
                while(this.#heap_arr[parent_index] > this.#heap_arr[current_index]){
                    let temp = this.#heap_arr[parent_index];
                    this.#heap_arr[parent_index] = this.#heap_arr[current_index];
                    this.#heap_arr[current_index] = temp;
                    current_index = parent_index;
                    parent_index = Math.floor((current_index-1)/2);
                }
            }
        }
    }
}