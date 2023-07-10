## Data Structures and Algorithms implemented in Javascript.

<hr/>

**This repository contains some important data-structures and algorithms that I implemented in Javascript.**

<hr/>

- **why am i doing this?**
  I wish to further improve my problem-solving skills. If there exists a data-structure that cannot achieve the standard time/space complexity due to the limitations imposed by the Javascript language itself, i'll mention it in the comments.
  <br>
- **what data-structures are available so far?**

  > - Singly Linked list
  > - Doubly Linked list
  > - Queue
  > - Stack
  > - Binary-search tree(non-height balanced)

- **what algorithms have i implemented so far?**

  > - Breadth-first search in binary trees
  > - Depth-first search in binary trees(preOrder, inOrder and postOrder)
  > - Backtracking
  > - Sliding window technique
  > - Two-Pointers technique
  > - Prefix/Suffix Sum technique

- **what exactly is my current goal here?**
  I plan to cover graph algorithms after backtracking. I will probaby start with Steven Skiena's CS373.
  <br>
- **what exactly is the end goal here?**
  I plan to exhaustively cover all the questions present in Blind75, Sean-Prashad 169, and Neetcode 150. And i'll build every data-structure that is required, and is not present in the language already to do so.
  <br>
- **a word of caution**
  the implementations here may contain critical errors. I am still learning, and I consider that to be a part of the process. Algorithms and data-structures present here should **not** be used as a reference for learning them.
  <br>
- **how to I go about exploring the repository?**
  The data-structures are present in "data structures" directory. The algorithms and their application in solving problems are in a separate directory - "algorithms".
  Each algorithm has the standard definition at the top. The problems associated with that algorithm follows the definition. Each problem's solution starts with a commented block that contains my own heuristic process on why i approached that particular problem in a certain way. Most solutions are tested against all the edge-cases that Leetcode provides. Some solutions give TLE in Javascript but pass the tests in other faster languages. These are marked as such, but they are few and far in between. This has absolutely no bearing on the application of the algorithm itself. DSA is supposed to be language agnostic anyway.
  <br>

- **what does the presence of a asterisk symbol signify?**
Some questions are tricky and a simple implementation of a particular algorithm does not lead to a solution that leetcode accepts. The optimal solution to such questions is ususally very unintuitive.
For instance, the usage of Floyd's tortoise and hare algorithm in detecting a cycle is intuitive. Its usage to find the duplicate number in an array (Leetcode: 287) is what I would consider very unintuitive.
These are the type of questions that an asterisk represents.
<hr>
