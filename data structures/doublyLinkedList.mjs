import doublyLinkedListNode from "./doublyLinkedListNode.mjs";

export default class doublyLinkedList {
  head;
  tail;
  length = 0;

  constructor() {
    this.head = null;
    this.tail = null;
  }

  append(value) {
    const newNode = new doublyLinkedListNode(value);
    // if the tail is pointing to null, its the first node thats getting appended
    if (this.tail == null) {
      this.tail = newNode;
      this.head = newNode;
      this.length++;
    }
    // else there're already some nodes in the list
    else {
      this.tail.next = newNode;
      newNode.previous = this.tail;
      this.tail = newNode;
      this.length++;
    }
  }

  prepend(value) {
    const newNode = new doublyLinkedListNode(value);
    // if the head is pointing to null, it's the first node that's getting appended
    if (this.head == null) {
      this.head = newNode;
      this.tail = newNode;
      this.length++;
    }
    // else there're already some nodes in the ll
    else {
      newNode.next = this.head;
      this.head.previous = newNode;
      this.head = newNode;
      this.length++;
    }
  }

  contains(value) {
    let traversalPointer = this.head;
    while (traversalPointer != null) {
      if (traversalPointer.value == value) {
        return true;
      } else {
        traversalPointer = traversalPointer.next;
      }
    }
    return false;
  }

  delete(value) {
    let traversalPointer = this.head;
    while (traversalPointer != null) {
      if (traversalPointer.value == value) {
        if (this.head == traversalPointer) {
          this.head = traversalPointer.next;
        }
        if (this.tail == traversalPointer) {
          this.tail = traversalPointer.previous;
        }
        traversalPointer.previous
          ? (traversalPointer.previous.next = traversalPointer.next)
          : null;
        traversalPointer.next
          ? (traversalPointer.next.previous = traversalPointer.previous)
          : null;
        traversalPointer.value = null;
        traversalPointer.next = null;
        traversalPointer.previous = null;
        this.length--;
        return;
      } else traversalPointer = traversalPointer.next;
    }

    throw new Error("a node with the provided value doesn't exist in the ll");
  }

  insert(value, position) {
    if (!position) {
      throw new Error("provide a valid position to insert an item to");
    } else if (this.length < 2) {
      throw new Error(
        "insert doesn't work if there are fewer than 2 elements in the ll, try append/prepend"
      );
    } else if (position > this.length || position <= 1) {
      throw new Error(
        `the valid range for insertion is between 2 and ${this.length} inclusive. use append/prepend to add elements to the tail/head.`
      );
    } else {
      const newNode = new doublyLinkedListNode(value);
      let traversalPointer = this.head;
      for (let i = 0; i < position - 1; i++) {
        traversalPointer = traversalPointer.next;
      }
      traversalPointer.previous.next = newNode;
      newNode.previous = traversalPointer.previous;
      newNode.next = traversalPointer;
      traversalPointer.previous = newNode;
      this.length++;
    }
  }
}
