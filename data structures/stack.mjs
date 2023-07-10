import linkedList from "./linkedList.mjs";
import node from "./node.mjs";

export default class stack{
    #linkedList;
    constructor () {
        this.#linkedList = new linkedList();
    }

    push (value) {
        this.#linkedList.prepend(value)
    }

    pop () {
       if (!this.#linkedList.length){
        return new Error("the stack is empty!")
       }
       const valueToBeDeleted = this.#linkedList.head.value;
       this.#linkedList.delete(valueToBeDeleted);
    }

    get top() {
        return this.#linkedList.length ? this.#linkedList.head.value: null;
    }

    get size() {
        return this.#linkedList.length;
    }
}