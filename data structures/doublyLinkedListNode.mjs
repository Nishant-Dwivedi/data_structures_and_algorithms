import node from "./node.mjs";

export default class doublyLinkedListNode extends node {
  previous = null;
  constructor(nodeValue, nextPointer, PreviousPointer) {
    super(nodeValue, nextPointer);
    this.previous = PreviousPointer ? PreviousPointer : null;
  }
}
