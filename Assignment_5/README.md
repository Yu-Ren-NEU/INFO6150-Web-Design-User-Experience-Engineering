# Assignment_5 of INFO_6150

- Problem Statement:
	* An HTML page is represented as a Tree with <HTML> as the root node.

			class Node {
				constructor(tagName, children, parent) {
					this.parent = parent;
					this.tagName = tagName;
					//children is an array of node objects.
					this.children = children;
				}

				/**
				Implement below method.  Returns an array of all descendant nodes matching the selector.
				The selector could be a simple CSS selector or descendant CSS selector.
				Examples    selector = "p" |  selector = "p div"
				return [node1, node2, ...]*/
				querySelectorAll(selector) {
				}
				
				/**
				Implement below method.  Add the node to the current node's parent. 
				This method does not return any value.*/
		  		addSibling(node) {
				}
			}

- My Information:
  * Name: Yu Ren
  * NUID: 001051249

- Technologies Used:
  * JavaScript

- Requirements:
  * No requirement.

- Steps to run:
	1. Git clone all of the files.
	2. There is already a frame. And you can create a new one or make some changes in it.
	3. Open terminal and skip to the directory in which "Assignment5.js" is. Input "node Assignment5.js" to see the result.
	4. Or you can copy the code from GitHub and run it on an online editor like repl.it with an example.