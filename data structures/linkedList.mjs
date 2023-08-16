import node from "./node.mjs";
export default class linkedList {
  head;
  tail;
  length = 0;
  constructor() {
    this.head = null;
    this.tail = null;
  }

  append(value) {
    // create a new node
    const newNode = new node(value, null);
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
    const newNode = new node(value, null);
    if (this.head == null) {
      this.head = newNode;
      this.tail = newNode;
      this.length++;
    } else {
      newNode.next = this.head;
      this.head = newNode;
      this.length++;
    }
  }
  // doesnt contain logic for non-primitives
  contains(value) {
    // initialize the traversal pointer to where head is pointing to
    let traversalPointer = this.head;
    // while trav isn't pointing to null
    while (traversalPointer !== null) {
      // if value is found, exit early
      if (traversalPointer.value == value) {
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
      if (current.value == value) {
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
      } else {
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
      const newNode = new node(value);
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
