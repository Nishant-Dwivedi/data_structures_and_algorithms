// LC specific linked list interface; LC checks node.val of every node and my previous implementation used node.value; 
class nodeLCLinkedList {
    val = null;
    next = null;
    constructor(nodeValue, nextPointer) {
      this.val = nodeValue ?? null;
      this.next = nextPointer ?? null;
    }
  }

 class linkedListLC {
  head;
  tail;
  length = 0;
  constructor() {
    this.head = null;
    this.tail = null;
  }

  append(value) {
    // create a new node
    const newNode = new nodeLCLinkedList(value, null);
    // if tail/head is pointing to null, this is the first node
    if (this.tail == null) {
      this.tail = newNode;
      this.head = newNode;
      this.length++;
    }
    // else it's not the first node
    else {
      this.tail.next = newNode;
      this.tail = newNode;
      this.length++;
    }
  }

  prepend(value) {
    const newNode = new nodeLCLinkedList(value, null);
    // if it's the first node
    if (this.head == null) {
      this.head = newNode;
      this.tail = newNode;
      this.length++;
    }
    // when it's not the first node 
    else {
      newNode.next = this.head;
      this.head = newNode;
      this.length++;
    }
  }

  contains(value) {
    // initialize the traversal pointer to where head is pointing to
    let traversalPointer = this.head;
    // while trav isn't pointing to null
    while (traversalPointer !== null) {
      // if value is found, exit early
      if (traversalPointer.val == value) {
        return true;
      } 
      // else move to the next element
      else {
        traversalPointer = traversalPointer.next;
      }
    }
    // return false if the loop gets completed without a match
    return false;
  }

  delete(value) {
    // initialize two pointers, one for current and one for previous
    let current = this.head;
    let prev = this.head;
    // while current is not pointing to null
    while (current != null) {
      // check if the current node matches the value to be deleted
      if (current.val == value) {
        // if it's the first node that needs to be deleted, the head of the linked list will need to be updated as well
        if (this.head == current) {
          this.head = this.length > 1 ? current.next : null;
        }
        // if it's the last node that needs to be deleted, the tail of the linked list will need to be updated as well
        if (this.tail == current) {
          this.tail = this.length > 1 ? prev : null;
        }
        //  make prev.next point to current.next and delete what current is pointing to
        prev.next = current.next;
        current.value = null;
        current.next = null;
        this.length--;
        return;
      } 
      else {
        prev = current;
        current = current.next;
      }
    }
    // if current node id pointing to null, there's no other node left to check
    return new Error(
      "A node with the provided value doesn't exist in this linked list"
    );
  }

  insert(value, position) {
    // error handling for bad inputs
    if (!position) {
      throw new Error("provide a valid position for insertion");
    } else if (this.length < 2) {
      throw new Error(
        "insert doesn't work if there are fewer than 2 elements in the ll, try append/prepend"
      );
    } else if (position > this.length || position <= 1) {
      throw new Error(
        `the valid range for insertion is between 2 and ${this.length} inclusive. use append/prepend to add elements to the tail/head.`
      );
    }
    // else iterate to position - 2th element and change some pointers
     else {
      const newNode = new nodeLCLinkedList(value);
      let traversalPointer = this.head;
      for (let i = 0; i < position - 2; i++) {
        traversalPointer = traversalPointer.next;
      }
      newNode.next = traversalPointer.next;
      traversalPointer.next = newNode;
      this.length++;
    }
  }
}


//...................................................................................................................................................................
// test related stuff
// import linkedList from "../data structures/linkedList.mjs";  // the first 4 problems use this interface for its ll implementation; uncomment as needed
import stack from "../data structures/stack.mjs"
// change input according to what's given in the question
let input = [1,2,5,2,1,6];
let h = populateLL(input);

// helper; generates a ll out of an array and returns the head pointer
function populateLL(arr){
    let LL = new linkedListLC();
    for(let i = 0; i < arr.length; i++){
        LL.append(arr[i]);
    }
    return LL.head;
}
// helper; logs the nodes of a ll
function logger (head){
    let trav = head;
    while(trav != null){
        console.log(trav.val);
        trav = trav.next;
    }
}
// ..................................................................................................................................................................
// question solved: 10
// reverseList(h);                                                                                        //lc:206  easy
// reverseBetween(h, 1, 2)                                                                                //lc:92   medium
// oddEvenList(h)                                                                                         //lc:328  medium
// rotateRight(h,2)                                                                                       //lc:61   medium
// addTwoNumbers(ll1, ll2)                                                                                //lc:02   medium
// reorderList(h)                                                                                         //lc:143  medium
// middleNode(h)                                                                                          //lc:876  easy
// removeNthFromEnd(h, 1)                                                                                 //lc:19   medium
// isPalindrome(h)                                                                                        //lc:234  easy
// hasCycle(h)                                                                                            //lc:141  easy           
// ..................................................................................................................................................................

function hasCycle(head){
  let slow_pointer = head;
  let fast_pointer = head;
  let res = false;
  let start_cycle = true
  while(true){
    start_cycle = false
    if(slow_pointer == null){
      break;
    }
    if(slow_pointer == fast_pointer && start_cycle == false){
      break;
    }
    slow_pointer = slow_pointer.next;
    if(fast_pointer){
      fast_pointer = fast_pointer.next ? fast_pointer.next.next : null;
    }
  }
  if(slow_pointer){
    res = true;
  }
  console.log(res);
  return res;
}

function isPalindrome(head){
  let trav = head;
  let stk = new stack();
  let count = 0;
  let res = false
  while(trav != null){
    stk.push(trav);
    count++;
    trav = trav.next;
  }
  count = Math.floor(count/2);
  trav = head;
  while(count != 0 && trav != null){
    if(trav.val == stk.top.val){
      stk.pop();
      count--;
      trav = trav.next;
      continue
    }
    else{
      console.log(res);
      return res;
    }
  }
  res = true;
  console.log(res);
  return res
}

function removeNthFromEnd(head, n){
  let stk = new stack();
  let trav = head;
  // populate a stack with the nodes
  while(trav != null){
    stk.push(trav);
    trav = trav.next;
  }
  
  while(n > 0){
    trav = stk.top.next;
    stk.pop();
    n--;
  }
  if(stk.size != 0){
    stk.top.next = trav;
  }
  else{
    head = trav;
  }
  logger(head);
  return head;
}

function middleNode (head){
  let stk = new stack();
  let trav = head;
  while(trav != null){
    stk.push(trav);
    trav = trav.next;
  }
  let pop_count = stk.size % 2 == 0 ? stk.size/2 -1 : Math.floor(stk.size/2);
  while(pop_count > 0){
    stk.pop();
    pop_count--;
  }
  trav = stk.top;
  console.log(trav);
  return trav;
}

function reorderList(head){
  let stk = new stack();
  let trav = head;
  while(trav != null){
    stk.push(trav);
    trav = trav.next;
  }
  trav = head;
  while(trav != stk.top && trav != stk.top.next){
    let tmp = trav.next;
    trav.next = stk.top;
    stk.top.next = tmp;
    stk.pop();
    trav = tmp;
  }
  trav.next = null;
  logger(head)
  return head;
}

function addTwoNumbers (l1, l2){
   let l1_trav = l1;
   let l2_trav = l2;
   let res_list = new linkedListLC();
   let carry_over = 0;

   while(l1_trav  != null || l2_trav != null){
    let operand_1 = l1_trav ? l1_trav.val : 0;
    let operand_2 = l2_trav ? l2_trav.val : 0;
    let res = operand_1 + operand_2 + carry_over;
    if(res > 9){
        let unit_digit = res % 10;
        carry_over = Math.floor(res/10);
        res_list.append(unit_digit);
    }
    else{
        res_list.append(res);
        carry_over = 0;
    }
    l1_trav = l1_trav ? l1_trav.next: null;
    l2_trav = l2_trav ? l2_trav.next : null;
   }
   if(carry_over != 0){
    res_list.append(carry_over);
    carry_over = 0;
   }
   logger(res_list.head);
   return res_list.head;
}

function rotateRight(head, k){
    // get the total number of nodes in the list
    let nodeCount = 0;
    let trav = head;
    while (trav != null){
        nodeCount++;
        trav = trav.next;
    }
    // calculate the number of nodes that will get shifted
    let shifts = k % nodeCount;
    if(shifts == 0){
        return head;
    }
    // we will severe the list at a cutoff node; we need a pointer to this node and it's successor node.
    // we do one complete sweep of the list to save pointers to the cutoff node, its successor and the last node of the last
    let cutoffNode = null;
    let cutoffNodesSuccessorNode = null;
    let lastNode= null;
    // traverseTill helps in figuring out the node at which the cutoff needs to happen for shifting the list
    let traverseTill = nodeCount - shifts;
    let travCount = 1;
    trav = head;
    while(trav != null){
        // get the cutoff node and its successor
        if(travCount == traverseTill){
            cutoffNode = trav;
            cutoffNodesSuccessorNode = trav.next;
        }
        // get the last node of the list
        if(trav.next == null){
            lastNode = trav;
        }
        travCount++
        trav = trav.next;
    }
    // join the last node with the first node of the list 
    lastNode.next = head;
    // and update the head to point to cutoff node's successor node
    head = cutoffNodesSuccessorNode;
    // update the cutoff node to become the new tail node
    cutoffNode.next = null;
    logger(head)
    return head
}

function oddEvenList(head){
    let isOdd = true;
    let trav = head;
    let odd_end = null;
    let even_start = null;
    while(trav != null){
        let temp = trav.next;
        // if current node's position is odd
       if(isOdd){
        odd_end = trav;
        if(trav?.next?.next){
            trav.next = trav.next.next;
        }}
        // if current node's position is even
        else{
            even_start = even_start == null ? trav : even_start;
            if(trav?.next?.next){
                trav.next = trav.next.next;
            }
            else{
                trav.next = null;
            }
        }
        trav = temp;
        isOdd = isOdd == true ? false : true;
    }
    odd_end.next = even_start;
    logger(head);
    return head;

    }
function reverseBetween(head, left, right){
    let count = 1;
    let trav = head;
    let lastLeft = left == 1 ? head : null;
    let firstRight = null;
    let stk = new stack();
    while(count <= right+1){
        // every element before the left-1th element is irrelevent
        if(count < left - 1){
            count++;
            trav = trav.next;
            continue;
        }
        // get a pointer to the left-1th element
        if(count == left - 1){
            if(lastLeft == null){
                lastLeft = trav;
            }
            count++;
            trav = trav.next;
            continue;
        }
        // push every element between left and right to a stack
        if(count >= left && count <= right){
            stk.push(trav);
            count++;
            trav = trav.next;
            continue;
        }
        // get a pointer to the right+1th element
        if(count == right+1){
            firstRight = trav;
            break;
        }
    }
    // reverse the interval
    trav = lastLeft;
    // a flag is needed to change the head pointer if left == 1;
    let changedHeadPointer = false;
    while(stk.size != 0){
        trav.next = stk.top;
        // if left == 1, the node head is pointing to itself  will need to be updated
        if(left == 1 && changedHeadPointer == false){
            changedHeadPointer = true;
            head = trav.next;
        }
        // if the stack has only one node left, this node's next pointer need to point at the starting node of the right part of the list that remains unaffected by the reversal
        if(stk.size == 1){
            trav.next.next = firstRight;
        }
        stk.pop();
        trav = trav.next;
    }
    logger(head);
    return head
}

function reverseList(head){
    let stk = new stack();
    let trav = head;
    while(trav != null){
        stk.push(trav);
        trav = trav.next;
    }
    head = stk.top;
    while(stk.size != 0){
        trav = stk.top;
        stk.pop();
        trav.next = stk.top;
    }
    // logger(head);
    return head;
}