import linkedList from "./linkedList.mjs";

export default class queue {
    #linkedList;
    constructor () {
        this.#linkedList = new linkedList();
    }

    enqueue (value) {
        this.#linkedList.append(value);
        return
    }

    dequeue () {
        if (!this.#linkedList.length){
            throw new Error("there's nothing to dequeue in the queue.")
        }
        const value = this.#linkedList.head.value;
        this.#linkedList.delete(value);
        return
    }

    get front () {
        return this.#linkedList.length ? this.#linkedList.head.value : new Error("queue is empty") 
    }

     get size () {
        return this.#linkedList.length;
    }

    isEmpty () {
        return this.#linkedList.length ? false : true;
    }
}