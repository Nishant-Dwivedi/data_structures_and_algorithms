isValid("()[]{{]}}")

// ...................................................................................................................................................................
import stack from "../data structures/stack.mjs";
// ...................................................................................................................................................................

function isValid (s) {
    let stk = new stack();
    for (let i = 0; i < s.length; i++){
        let current = s.charAt(i);
        if(current == "(" || current == "[" || current == "{"){
            stk.push(current)
        }
        else{
            if(current == ")" && stk.top == "("){
                stk.pop();
            }
            else if(current == "]" && stk.top == "["){
                stk.pop()
            }
            else if(current == "}" && stk.top == "{"){
                stk.pop()
            }
            else{
                stk.push(current);
            }
        }
    }
    let res = false
    if(stk.size == 0){
        res = true 
    }
    console.log(res);
    return res
}