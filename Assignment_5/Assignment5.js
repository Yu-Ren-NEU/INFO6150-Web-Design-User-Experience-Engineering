// This function is used to search all nodes from given node using depth first search.
// Then sore the node whose tagName is same with selector.
function dfs_simple(res, node, selector) {
    if (node == null) return;
    // If this node's tagName is same to the target, store it.
    if (node.tagName === selector) res.push(node);
    // Keep searching.
    for (let i = 0; i < node.children.length; i++) {
        dfs_simple(res, node.children[i], selector);
    }
}

// This function is used to search the nodes whose tagNames are same with tmp[now]
function dfs_desc(res, node, tmp, now) {
    let i;
    if (node == null) return;
    // If we found that we have already search all of tags except the last tag, then this problem changes to dfs_simple();
    if (now === tmp.length - 1) {
        dfs_simple(res, node, tmp[now]);
        return;
    }
    // If we found current tag, then we need to find the next tag.
    if (node.tagName === tmp[now]) {
        for (i = 0; i < node.children.length; i++) {
            dfs_desc(res, node.children[i], tmp, now + 1);
        }
    }
    // We still need to find current tag in all children nodes.
    else {
        for (i = 0; i < node.children.length; i++) {
            dfs_desc(res, node.children[i], tmp, now);
        }
    }
}

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
     return [node1, node2, ...]
     */
    querySelectorAll(selector) {
        let res = [];
        // Use split to split the selector by " ".
        let tmp = selector.trim().split(/\s+/);
        dfs_desc(res, this, tmp, 0);
        return res;
    }

    /**
     Implement below method.  Add the node to the current node's parent.
     This method does not return any value.
     */
    addSibling(node) {
        if(node.parent !== null) {
            for(let i = 0; i < node.parent.children.length; i++) {
                if(node === node.parent.children[i]) {
                    node.parent.children.splice(i, 1);
                }
            }
        }
        if(this.parent === null) return;
        this.parent.children.push(node);
        node.parent = this.parent;
    }

}

// According to the following frame, set a test:
//
//     <html>
//         <head></head>
//         <body>
//             <header>
//                 <button></button>
//                 <nav></nav>
//             </header>
//
//             <div>
//                 <div>
//                     <img>
//                     <div>
//                         <span></span>
//                         <h1></h1>
//                         <p></p>
//                         <p></p>
//                         <button></button>
//                     </div>
//                 </div>
//
//                 <div>
//                     <p></p>
//                     <h2></h2>
//                 </div>
//
//                 <div>
//                     <form>
//                         <input>
//                         <input>
//                         <select></select>
//                         <button></button>
//                     </form>
//                 </div>
//             </div>
//
//             <footer>
//                 <div>
//                     <p></p>
//                 </div>
//             </footer>
//
//         </body>
//     </html>

// var root = new Node("html", [], null);
// var head = new Node("head", [], root);
// root.children.push(head);
// var body = new Node("body", [], root);
// root.children.push(body);
//
// // header
// var header = new Node("header", [], body);
// body.children.push(header);
// var header_button = new Node("button", [], header);
// header.children.push(header_button);
// var header_nav = new Node("nav", [], header);
// header.children.push(header_nav);
//
// //body -> div
// var div = new Node("div", [], body);
// body.children.push(div);
//
// //body -> div -> div
// var div_div = new Node("div", [], div);
// div.children.push(div_div);
// var div_div_img = new Node("img", [], div_div);
// div_div.children.push(div_div_img);
// var div_div_div = new Node("div", [], div_div);
// div_div.children.push(div_div_div);
// var div_div_div_span = new Node("span", [], div_div_div);
// div_div_div.children.push(div_div_div_span);
// var div_div_div_h1 = new Node("h1", [], div_div_div);
// div_div_div.children.push(div_div_div_h1);
// var div_div_div_p1 = new Node("p", [], div_div_div);
// div_div_div.children.push(div_div_div_p1);
// var div_div_div_p2 = new Node("p", [], div_div_div);
// div_div_div.children.push(div_div_div_p2);
// var div_div_div_button = new Node("button", [], div_div_div);
// div_div_div.children.push(div_div_div_button);
//
// //body -> div -> div1
// var div_div1 = new Node("div", [], div);
// div.children.push(div_div1);
// var div_div1_p = new Node("p", [], div_div1);
// div_div1.children.push(div_div1_p);
// var div_div1_h2 = new Node("h2", [], div_div1);
// div_div1.children.push(div_div1_h2);
//
// //body -> div -> div2
// var div_div2 = new Node("div", [], div);
// div.children.push(div_div2);
// var div_div2_form = new Node("form", [], div_div2);
// div_div2.children.push(div_div2_form);
// var div_div2_form_input = new Node("input", [], div_div2_form);
// div_div2_form.children.push(div_div2_form_input);
// var div_div2_form_input1 = new Node("input", [], div_div2_form);
// div_div2_form.children.push(div_div2_form_input1);
// var div_div2_form_input2 = new Node("input", [], div_div2_form);
// div_div2_form.children.push(div_div2_form_input2);
// var div_div2_form_selector = new Node("selector", [], div_div2_form);
// div_div2_form.children.push(div_div2_form_selector);
// var div_div2_form_button = new Node("button", [], div_div2_form);
// div_div2_form.children.push(div_div2_form_button);
//
// //body -> footer
// var footer = new Node("footer", [], body);
// body.children.push(footer);
// var footer_div = new Node("div", [], footer);
// footer.children.push(footer_div);
// var footer_div_p = new Node("p", [], footer_div);
// footer_div.children.push(footer_div_p);
//
// // console.log(body.querySelectorAll("h1"));
//
// // console.log(body.querySelectorAll("form input"));
//
// // console.log(body.querySelectorAll("button"));
//
// // Used to output the test frame in console.
// function output_frame(node, n) {
//     if(node == null) return;
//     let str = "";
//     for(let i = 0; i < n; i++) {
//         str += "\t";
//     }
//     str += node.tagName;
//     console.log(str);
//     for(let i = 0; i < node.children.length; i++) {
//         output_frame(node.children[i], n + 1);
//     }
// }
//
// footer_div_p.addSibling(new Node("p", [], null));   // add p to body -> footer -> div using addSibling()
// // console.log(footer_div.children);
// footer_div_p.children.push(new Node("p", [], footer_div_p));       // add p to body -> footer -> div -> p
//
// output_frame(root, 0);
//
// console.log(root.querySelectorAll("div p"));
//


/*
  Test Case DOM:
  <html>

    <div> - div1

      <p> - p1
        <a></a> - a1
      </p>

      <p></p> - p2

      <section> - section
        <p> - p3
          <a></a> - a2
        </p>
        <p></p> - p4
      </section>

    </div>

    <div> - div2
      <p> - p5
        <a></a> - a3
      </p>
    </div>

  <html>
*/

let html = new Node("html", [], null),
    div1 = new Node("div", [], null),
    div2 = new Node("div", [], null);

div1.parent = html;
div2.parent = html;
html.children.push(div1, div2);

let p1 = new Node("p", [], null),
    p2 = new Node("p", [], null),
    section = new Node("section", [], null);

p1.parent = div1;
p2.parent = div1;
section.parent = div1;
div1.children.push(p1, p2, section);

let a1 = new Node("a", [], null);

a1.parent = p1;
p1.children.push(a1);

let p3 = new Node("p", [], null),
    p4 = new Node("p", [], null);

p3.parent = section;
p4.parent = section;
section.children.push(p3, p4);

let a2 = new Node("a", [], null);

a2.parent = p3;
p3.children.push(a2);

let p5 = new Node("p", [], null);

p5.parent = div2;
div2.children.push(p5);

let a3 = new Node("a", [], null);

a3.parent = p5;
p5.children.push(a3);

/* Test 1
Expect: p1, p2, p3, p4, p5
*/
console.log("\n\nTest 1: ====================================== \n\n");
console.log(html.querySelectorAll("p"));

/* Test 2
Expect: a1, a2, a3
*/
console.log("\n\nTest 2: ====================================== \n\n");
console.log(html.querySelectorAll("p a"));

/* Test 3
Expect: p3, p4
*/
console.log("\n\nTest 3: ====================================== \n\n");
console.log(html.querySelectorAll("div section p"));

/* Test 4
Expect: a3
*/
console.log("\n\nTest 4: ====================================== \n\n");
console.log(div2.querySelectorAll("p a"));

div1.addSibling(p5);

/* Test 5
Expect: firstline: html
        secondline: div1, div2, p5
*/
console.log("\n\nTest 5: ====================================== \n\n");
console.log(p5.parent); // p5 is now a sibling of div1, so its parent should be html
console.log("\n");
console.log(html.children); // html now should have p5 as children

/* Test 6
Expect: empty []
*/
console.log("\n\nTest 6: ====================================== \n\n");
console.log(div2.children); // Since p5 is now html's child, so div2 should have no children now

/* Test 7
Expect: html
*/
console.log("\n\nTest 7: ====================================== \n\n");
let dumbSibling = new Node("div", [], html);
html.addSibling(dumbSibling);
// Below can't be null! Because html has no parent
console.log(dumbSibling.parent);