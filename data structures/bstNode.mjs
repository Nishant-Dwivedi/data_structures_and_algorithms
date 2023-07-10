export default class bstNode {
    value
    left = null
    right = null

    constructor (data, left, right) {
        this.value = data;
        this.left = left ? left : null;
        this.right = right ? right : null;
    }
}