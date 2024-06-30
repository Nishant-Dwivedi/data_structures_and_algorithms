import trie from "../data structures/trie.mjs";
// longestCommonPrefix (["flower","flow","flight"]);
// ...............................................................................................................................................................

function longestCommonPrefix(strs){
    strs = strs.sort((a , b) => a.length - b.length);
    let curr_pref = strs[0];
    let curr_pref_len = strs[0].length;
    let t = new trie();
    t.insert(curr_pref);
    for(let i = 1; i < strs.length; i++){
        let str = strs[i].slice(0, curr_pref_len);
        if(t.has(str)){
            continue
        }
        else{
            let left_curr = 0;
            let left_pref = 0;
            while(str.charAt(left_curr) == curr_pref.charAt(left_pref)){
                left_curr++;
                left_pref++;
            }
            t.remove(curr_pref);
            t.insert(curr_pref.slice(0, left_curr));
            curr_pref = curr_pref.slice(0, left_curr);
            curr_pref_len = curr_pref.length;
        }
    }
    console.log(curr_pref);
    return curr_pref;
}