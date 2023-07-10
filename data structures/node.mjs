export default class node {
  value = null;
  next = null;
  constructor(nodeValue, nextPointer) {
    this.value = nodeValue ?? null;
    this.next = nextPointer ?? null;
  }
}
