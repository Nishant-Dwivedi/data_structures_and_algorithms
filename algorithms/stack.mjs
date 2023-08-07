//Questions solved 8
// isValid("()[]{{]}}")                                                                                                  //lc:20;  easy
// evalRPN(["4","-2","/","2","-3","-","-"])                                                                              //lc:150: medium 
// asteroidCollision([-2,2,1,-2])                                                                                        //lc:735; medium  #good question
// dailyTemperatures([73,74,75,71,69,72,76,73])                                                                          //lc:739; medium  
// decodeString("3[a2[c]]")                                                                                              //lc:394; medium  #good question
// carFleet(10, [3], [3])                                                                                                //lc:853; medium 
// calculate("3-2+1")                                                                                                    //lc:227; medium
// backspaceCompare( "abcd", "bbcd")                                                                                     //lc:844; easy
// ...................................................................................................................................................................
import stack from "../data structures/stack.mjs";
// ...................................................................................................................................................................

function backspaceCompare(s, t){

    let s_stk = new stack();
    let t_stk = new stack();
    let res;
    let larger_str = s.length > t.length ? s.length : t.length;
    for(let i = 0; i <larger_str ; i++){
        if(i < s.length){
            let char = s.charAt(i);
            if(char != "#"){
                s_stk.push(char);
            }
            else{
                s_stk.pop();
            }
        }
        if( i < t.length){
            let char = t.charAt(i);
            if(char != "#"){
                t_stk.push(char);
            }
            else{
                t_stk.pop();
            }
        }
    }
    if(s_stk.size != t_stk.size){
        res =  false;
    }
    else{
        for(let i = 0; t_stk.size != 0 && s_stk.size != 0; i++){
            if(t_stk.top == s_stk.top){
                t_stk.pop();
                s_stk.pop();                
            }
            else{
                res =  false
                console.log(res);
                return res;
            }
        }
        res = true;
    }

    console.log(res);
    return res;
}

function calculate(s){
    // infix to postfix conversion
    let precedenceMap = new Map();
    precedenceMap.set("-", 1);
    precedenceMap.set("+", 1);
    precedenceMap.set("*", 2);
    precedenceMap.set("/", 2);
    let postfix = ""
    let postfix_stk = new stack();
    for(let i = 0; i < s.length; i++){
        let current = s.charAt(i);
        // if curr is an empty space continue
        if(current == " "){
            continue
        }
        // if current char is a number, just concat it with the postfix string
        if(current != "-" && current != "+" && current != "*" && current != "/"){
            let complete_int = current;
            let trav = i+1;
            while(s.charAt(trav) != "-" && s.charAt(trav) != "+" && s.charAt(trav) != "*" && s.charAt(trav) != "/" && s.charAt(trav) != " " && trav < s.length){
                complete_int = complete_int.concat(s.charAt(trav));
                trav++;
            }
            postfix = postfix.length > 0 ?  postfix.concat(" ") : postfix;
            postfix = postfix.concat(complete_int);
            i = trav-1;
        }
        // when current is an operator
        else{
            // move it to monotonic stack(incresing precedence), if the predence of current op is higher than/ equal to the top operator present in the stack
            if(precedenceMap.get(postfix_stk.top) < precedenceMap.get(current) || postfix_stk.size == 0){
                postfix = postfix.concat(" ")
                postfix_stk.push(current);
            }
            // other wise concat operators with the postfix string while popping them off the stack unit monotonicity of the stack is achieved again 
            else{
                while(precedenceMap.get(current) <= precedenceMap.get(postfix_stk.top) && postfix_stk.size != 0){
                    postfix = postfix.concat(" ")
                    postfix = postfix.concat(postfix_stk.top);
                    postfix_stk.pop()
                }
                // add the current operator to the stack once monotonicity is achieved
                postfix_stk.push(current)
            }
        }
    }
    // add the operators remaining in the stack to your postfix string
    while(postfix_stk.size != 0){
        postfix = postfix.concat(" ")
        postfix = postfix.concat(postfix_stk.top)
        postfix_stk.pop()
    }
    console.log(postfix);

    // now solve the postfix expression
    let eval_stk = new stack();
    for(let i = 0; i < postfix.length; i++){
        let current = postfix.charAt(i);
        if(current == " "){
            continue;
        }
        // if current char is a number, push it to the evaluation stack and continue
        if(current != "-" && current != "+" && current != "*" && current != "/"){
            let complete_int = current;
            let trav = i+1;
            while(postfix.charAt(trav) != "-" && postfix.charAt(trav) != "+" && postfix.charAt(trav) != "*" && postfix.charAt(trav) != "/" && postfix.charAt(trav) != " " && trav < postfix.length){
                complete_int = complete_int.concat(postfix.charAt(trav));
                trav++;
            }
            i = trav-1
            eval_stk.push(complete_int);
            continue
        }
        // else evaluate and push the result to the stack
        else{
            let right_operand = eval_stk.top;
            eval_stk.pop();
            let  left_operand = eval_stk.top;
            eval_stk.pop();
            let operator = current;
            let res;
            if(operator == "-"){
                res = Number(left_operand) - Number(right_operand);
            }
            else if(operator == "+"){
                res = Number(left_operand) + Number(right_operand);
            }
            else if(operator == "*"){
                res = Number(left_operand) * Number(right_operand);
            }
            else{
                res = Number(left_operand) / Number(right_operand);
                res = res > 0 ? Math.floor(res) : Math.ceil(res);
            }
            // push the result of evaluation
            eval_stk.push(res);
        }
    }
    console.log(eval_stk.top);
    return eval_stk.top
}

function carFleet(target, position, speed){
    let timeMap = new Map();
    for(let i = 0; i < position.length; i++){
        let time = (target - position[i])/speed[i];
        timeMap.set(position[i], time);
    }
    position.sort((a,b) => a-b);
    // we'll build a strictly decreasing monotonic stack of time taken by cars.
    let stk = new stack();
    for(let i =0; i < position.length; i++){
        let timeTakenByCarAtCurrentPosition = timeMap.get(position[i]);
        // if current car is the first car, or if current car takes less time than time take by the car at the top of the stack, there will be no collisions
        if(stk.size == 0 || timeTakenByCarAtCurrentPosition < stk.top){
            stk.push(timeTakenByCarAtCurrentPosition)
        }
        // else collisions will happen and some cars will merge to form a fleet
        else{
            // while our current car is not faster than all the other cars in the stack before it, pop the cars and form a slower moving fleet
            while(timeTakenByCarAtCurrentPosition >= stk.top && stk.size != 0){
                stk.pop()
            }
            // push the current cars time
            stk.push(timeTakenByCarAtCurrentPosition);
        }
    }

    console.log(stk.size);
    return stk.size
}

function decodeString (s){
    let res_stack = new stack();
    let res = "";
    for(let i = 0; i < s.length; i++){
        let curr = s.charAt(i)
        let encoded = "";function calculate (s){
            let operator_precedence = {
                "-": 1,
                "+": 2,
                "*": 3,
                "/": 4
            }
            let operator_stk = new stack(); //monotonically increasing
            let postfix_expression = "";
            for(let i = 0; i < s.length; i++){
                // todo
            }
        }
        
        let temp_stack = new stack();
        // if the current char is an enclosing parenthesis, we gotta decode before moving forward
        if(curr == "]"){
            // populate a temporary stack with [encoded string]
           while(res_stack.top != "["){
            temp_stack.push(res_stack.top);
            res_stack.pop();
           }
           // get the encoded string in right order of characters using the temp stack 
           while(temp_stack.size != 0){
            encoded = encoded.concat(temp_stack.top);
            temp_stack.pop();
           }
            // pop "["
           res_stack.pop();
            // get the multiplier k
           let k = ""
            // populate a temp stack to evaluate k
            // the logic in the while loop here is exactly why people hate javascript. dealing with NaN is frustrating; isNaN(null) for instance returns false; fuck me!
            // while the top element in our res stack can be succesfully coerced to a number
           while(!isNaN(Number(res_stack.top)) && res_stack.top != null){
            temp_stack.push(res_stack.top);
            res_stack.pop();
           }
           while(temp_stack.size != 0){
            k = k.concat(temp_stack.top);
            temp_stack.pop();
           }
            k = Number.parseInt(k);

            // create the decoded string by concatenating encoded string k times   
           let decoded = "";
           for(let i = 1; i <= k; i++){
            decoded = decoded.concat(encoded);
           }
            // if stack is empty, update result
           if(res_stack.size == 0){
            res = res.concat(decoded);
           }
            // else push characters to the stack   
           else{
            for(let i = 0; i < decoded.length; i++){
                res_stack.push(decoded.charAt(i));
            }
           }
        }
        else{
            res_stack.push(s.charAt(i));
        }
    }
    let temp_stack = new stack();
    while(res_stack.size != 0){        
        temp_stack.push(res_stack.top)
        res_stack.pop()
    }
    while(temp_stack.size != 0){
        res = res.concat(temp_stack.top);
        temp_stack.pop()
    }
    console.log(res);
    return res
}

function dailyTemperatures (temperatures){
    let s = new stack();
    let res = [];
    // for each temperature in your array 
    for (let i = 0; i < temperatures.length; i++){
        // if its the first temperature,  just push CURRENT INDEX to your stack; current temp cannot be the "next higher temperature" for any previous day.
        // if the current temp is lesser than the last temp we recorded, push CURRENT INDEX to the stack and move on; the idea is to maintain a monotically decreasing stack
        if(i == 0 || temperatures[i] <= temperatures[s.top]){
            s.push(i);
            continue;
        }
        else{
            // if the current temp is higher than the last recorded temp, since we are maintaining a monotonically decreasing stack, our current temp is the "next higher recorded temperature" for all the days that have a temp lower than current
            // we pop the stack until we find a temp in the stack that has a value greater than the current temp, all while populating the res array with the current index wherever applicable
            while(temperatures[i] > temperatures[s.top] && s.size != 0){
                // get the top index; this represents the last day that marks the lowest temp in our stack
                let index = s.top;
                // index into the day and mark the current day as the day having a higher temperature
                res[index] = i - index;
                s.pop();
            }
            s.push(i);
        }
    }
    // populate the res arr with 0 for indexes that have no subsequent higher temp day at all.
    while(s.size!=0){
        res[s.top] = 0;
        s.pop();
    } 
    console.log(res);
    return res;
}

function asteroidCollision (asteroids){
    let stk = new stack();
    handleCollisions(0);
    let res = [];
    while(stk.size != 0){
        res.push(stk.top);
        stk.pop()
    }
    res.reverse();
    console.log(res);
    return res;
    // helper
    function handleCollisions (index){
        // if out of range of asteroids array, exit
        if(index >= asteroids.length){
            return
        }
        // empty stack or top and incoming asteroid moving in the same direction or top and incoming asteroid moving away from each other
        if((stk.size == 0) || ((stk.top < 0 && asteroids[index] < 0) || (stk.top > 0 && asteroids[index] > 0))  || ((stk.top < 0 && asteroids[index] > 0))){
            stk.push(asteroids[index]);
            handleCollisions(index+1)
        }
        // otherwise we have asteroids moving towards each other and there will be a collision
        else{
            // if the incoming asteroid is smaller, it gets destroyed and we move to the next asteroid 
            if(Math.abs(stk.top) > Math.abs(asteroids[index])){
                handleCollisions(index+1)
            }
            // if the colliding asteroids are equal in size they both get destroyed and we move to the next asteroid
            else if(Math.abs(stk.top) == Math.abs(asteroids[index])){
                stk.pop();
                handleCollisions(index+1)
            }
            // if the incoming asteroid is larger in size it destroyes the top element and we DO NOT move to a new asteroid until it can no longer wreck a top asteroid
            else if(Math.abs(asteroids[index]) > Math.abs(stk.top)){
                stk.pop();
                handleCollisions(index);
            }
        }
    }

}

function evalRPN (tokens){
    let stk = new stack();
    for(let i = 0; i < tokens.length; i++){
        if(tokens[i] != "+" && tokens[i] != "-" && tokens[i] != "*" && tokens[i] != "/"){
            stk.push(tokens[i]);
        }
        else{
            let rightOperand = Number.parseInt(stk.top);
            stk.pop();
            let leftOperand = Number.parseInt(stk.top);
            stk.pop();
            let result;
            if(tokens[i] == "+"){
                result = leftOperand + rightOperand;
            }
            else if(tokens[i] == "-"){
                result = leftOperand - rightOperand;
            }
            else if(tokens[i] == "*"){
                result = leftOperand * rightOperand;
            }
            else if(tokens[i] == "/"){
                result = leftOperand / rightOperand > 0 ? Math.floor(leftOperand / rightOperand) : Math.ceil(leftOperand/rightOperand);
            }
            stk.push(result);
        }
    }
    console.log(stk.top);
    return stk.top
}

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