class node {
    value = null;
    is_end = null;
    constructor() {
        this.value = new Array(26);
        this.is_end = false;
    }   
}

export default class trie{
    #size;
    root = new node();
    constructor (){
        this.#size = 0;
        for(let i = 0; i < this.root.value.length; i++){
            this.root.value[i] = null;
        }
        this.root.is_end = false;
    }

    insert(word){
        // handle unsanitized inserts
        for(let i = 0; i < word.length; i++){
            if((word.charCodeAt(i) >= 65 && word.charCodeAt(i) <= 90) || (word.charCodeAt(i) >= 97 && word.charCodeAt(i) <= 122)){
                continue
            }
            else throw new Error("string contains invalid characters.")
        }
        let trav = this.root;
        for(let i = 0; i < word.length; i++){
            let ASCII_code = word.toLowerCase().charCodeAt(i);
            let char_index = ASCII_code - 97;
            if(trav.value[char_index] == null){
                trav.value[char_index] = new node();
            }
            trav = trav.value[char_index];
            if(i == word.length-1){
                trav.is_end = true;
                this.#size++;
            }
        }
        return
    }

    get get_size() {
        return this.#size;
    }

    remove(word){
        // handle bad input
        if(this.has(word) == false){
            throw new Error("The input string doesn't exist in the Trie.");
        }
        // check if the word which is to be removed is not a prefix of some other word already present in the trie;
        let temp = this.root;
        // get a reference to the last node corresponding to the last char of the word
        for(let i = 0; i < word.length; i++){
            let ASCII_code = word.toLowerCase().charCodeAt(i);
            let char_index = ASCII_code - 97;
            temp = temp.value[char_index];
        }
        // mark this word as removed
        temp.is_end = false;
        this.#size--;
        // check if the word which is to be removed is not a prefix of another existing word in the trie. if it is, we won't remove any character nodes 
        let current_word_prefix_of_another = false; 
        for(let i = 0 ; i < 26; i++){
            if(temp.value[i] != null){
                current_word_prefix_of_another = true;
                break;
            }
        }
        // remove leftover character nodes if the current word is not a prefix of another word already present in the trie.
        current_word_prefix_of_another == false ? this.#remove_leftover_characters(word) : null;
        return
    }

    #remove_leftover_characters (word){
        // remove the leftover character nodes if word isn't a prefix of any other word already present in the trie
        // for instance, say the trie has "abc", and "abcde" in it. This method removes the nodes corresponding to the substring "de", which marks the removal to "abcde" from the trie, if "abcde" is removed from it.
        let temp = this.root;
        let prefix_end_index = -1;
        let trav = this.root;
        // find the node corresponding to the last character of the longest prefix of the word.
        for(let i = 0; i < word.length; i++){
            let ASCII_code = word.toLowerCase().charCodeAt(i);
            let char_index = ASCII_code - 97;
            if(trav.value[char_index].is_end == true && i != word.length - 1){
                temp = trav.value[char_index];
                prefix_end_index = i;
            }
            trav = trav.value[char_index];
        }
        // remove the leftover nodes
        for(let i = prefix_end_index + 1; i < word.length; i++){
            let ASCII_code = word.toLowerCase().charCodeAt(i);
            let char_index = ASCII_code - 97;
            let temp_2 = temp.value[char_index];
            temp.value[char_index] = null;
            temp = temp_2;
        }
        return
    }

    has(word){
        for(let i = 0; i < word.length; i++){
            if((word.charCodeAt(i) >= 65 && word.charCodeAt(i) <= 90) || (word.charCodeAt(i) >= 97 && word.charCodeAt(i) <= 122)){
                continue
            }
            else throw new Error("The input string contains invalid characters. Trie doesn't allow insertion of invalid strings");
        }

        let has_word = true;
        let trav = this.root;
        for(let i = 0; i < word.length; i++){
            let ASCII_code = word.toLowerCase().charCodeAt(i);
            let char_index = ASCII_code - 97;
            // if the i'th char isn't present at position trav in the trie, or if we are at the last character of the word and it isn't marked as such in the trie, return false 
            if(trav.value[char_index] == null || (i == word.length - 1 && trav.value[char_index].is_end == false)){
                has_word = false;
                break;
            }
            trav = trav.value[char_index];
        }
        return has_word;
    }

    startsWith(word){
         // handle unsanitized inserts
         for(let i = 0; i < word.length; i++){
            if((word.charCodeAt(i) >= 65 && word.charCodeAt(i) <= 90) || (word.charCodeAt(i) >= 97 && word.charCodeAt(i) <= 122)){
                continue
            }
            else throw new Error("string contains invalid characters.")
        }
        let trav = this.root;
        let has_word_as_prefix = true;
        for(let i = 0; i < word.length; i++){
            let ASCII_code = word.toLowerCase().charCodeAt(i);
            let char_index = ASCII_code - 97;
            if(trav.value[char_index] == null){
                has_word_as_prefix = false;
                break;
            }
            trav = trav.value[char_index];
        }
        return has_word_as_prefix;
    }
}