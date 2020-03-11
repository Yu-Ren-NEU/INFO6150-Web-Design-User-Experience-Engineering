import * as Rx from 'rxjs/Rx';
import {Subscription} from "rxjs";

// initial the table by columns and rows numbers
var columns = 15;
var rows = 50;

// Store the table.
var table_arr = [];
for (let i = 0; i < columns; i++) {
    table_arr[i] = [];
}

// Index of the selected element now.
var now_column = null;
var now_row = null;

// Some variables to store the information of table
var thead = null;
var thead_tr = null;
var thead_th_arr = [];
var tbody = null;
var tbody_tr_arr = [];

// Store the observe
var observe_arr = [];
var ob_attr_arr = [];

window.onload = function () {
    // Initialise table head
    thead = document.getElementById('table-head');
    thead_tr = document.createElement('tr');
    thead.appendChild(thead_tr);
    thead_tr.appendChild(document.createElement('th'));
    for (let i = 0; i < columns; i++) {
        let th = document.createElement('th');
        thead_th_arr.push(th);
        th.setAttribute("columnId", String.fromCharCode(65 + i));
        th.innerText = String.fromCharCode(65 + i);
        th.tabIndex = 0;
        // When this is selected, change the background of elements in this column
        th.onclick = function () {
            columns_head_selected(this)
        };
        thead_tr.appendChild(th);
    }
    // Initialise table body
    tbody = document.getElementById('table-body');
    for (let i = 0; i < rows; i++) {
        let tbody_tr = document.createElement('tr');
        tbody_tr_arr.push(tbody_tr);
        let ftd = document.createElement('td');
        ftd.setAttribute("rowId", i + 1);
        ftd.innerText = i + 1;
        ftd.tabIndex = 0;
        ftd.onclick = function () {
            rows_head_selected(this);
        };
        tbody_tr.appendChild(ftd);
        for (let j = 0; j < columns; j++) {
            let td = document.createElement('td');
            table_arr[j][i] = td;
            td.setAttribute("rowId", i + 1);
            td.setAttribute("columnId", String.fromCharCode(65 + j));
            td.tabIndex = 0;
            // Add Eventlisteners to each td.
            td.onclick = function () {
                content_selected(this)
            };
            td.ondblclick = function () {
                content_replace(this)
            };
            tbody_tr.appendChild(td);
        }
        tbody.appendChild(tbody_tr);
    }

    let add_row = document.getElementById("add_row");
    add_row.onclick = function () {
        add_one_row()
    };

    let add_column = document.getElementById("add_column");
    add_column.onclick = function () {
        add_one_column()
    };

    let delete_row = document.getElementById("delete_row");
    delete_row.onclick = function () {
        delete_this_row()
    };

    let delete_column = document.getElementById("delete_column");
    delete_column.onclick = function () {
        delete_this_column()
    };

    let import_csv = document.getElementById("import_csv");
    import_csv.onclick = function () {
        import_data_from_csv()
    };

    let export_csv = document.getElementById("export_csv");
    export_csv.onclick = function () {
        export_data_to_csv()
    };

};

// When column head is clicked
function columns_head_selected(element) {
    element.focus();
    // Convert char to integer so that we can handle this
    now_column = element.getAttribute("columnId").charCodeAt(0) - 65;
    now_row = -1;
    // Change the background of the elements in this column
    for (let i = 0; i < table_arr[now_column].length; i++) {
        table_arr[now_column][i].style.background = "whitesmoke";
    }
    element.onblur = function () {
        for (let i = 0; i < table_arr[now_column].length; i++) {
            table_arr[now_column][i].style.background = "";
        }
    }
}

// When row head is clicked
function rows_head_selected(element) {
    element.focus();
    // Convert char to integer so that we can handle this
    now_column = -1;
    now_row = parseInt(element.getAttribute("rowId")) - 1;
    // Change the background of the elements in this column
    for (let i = 0; i < table_arr.length; i++) {
        table_arr[i][now_row].style.background = "whitesmoke";
    }
    element.onblur = function () {
        for (let i = 0; i < table_arr.length; i++) {
            table_arr[i][now_row].style.background = "";
        }
    }
}

// When the content is clicked, change the value of index
function content_selected(element) {
    element.focus();
    now_column = element.getAttribute("columnId").charCodeAt(0) - 65;
    now_row = parseInt(element.getAttribute("rowId")) - 1;
    if (element.hasAttribute("TrueValue")) {
        document.getElementById("Tv_content").innerText = element.getAttribute("TrueValue");
    } else {
        document.getElementById("Tv_content").innerText = element.innerText;
    }
}

// When double clicked, make it content editable.
function content_replace(element) {
    element.focus();
    if (element.hasAttribute("TrueValue")) {
        element.innerText = element.getAttribute("TrueValue");
    }
    element.contentEditable = "true";
    element.addEventListener("blur", function () {
        element.removeAttribute("contentEditable");
        judge_text_inElement(element);
    }, {once: true});
}

// Add a row on the bottom of the row selected
function add_one_row() {
    let tbody_tr = document.createElement('tr');
    // Insert it on the bottom of the row selected
    if (now_row === -1) {
        tbody.insertBefore(tbody_tr, tbody.firstChild);
    } else if (tbody_tr_arr[now_row].nextSibling) {
        tbody.insertBefore(tbody_tr, tbody_tr_arr[now_row].nextSibling);
    } else {
        tbody.appendChild(tbody_tr);
    }
    tbody_tr_arr.splice(now_row + 1, 0, tbody_tr);
    // Insert the first td
    let ftd = document.createElement('td');
    ftd.setAttribute("rowId", now_row + 2);
    ftd.innerText = now_row + 2;
    ftd.tabIndex = 0;
    ftd.onclick = function () {
        rows_head_selected(this);
    };
    tbody_tr.appendChild(ftd);
    // Insert the tds in new row
    for (let i = 0; i < columns; i++) {
        let td = document.createElement('td');
        table_arr[i].splice(now_row + 1, 0, td);
        td.setAttribute("rowId", now_row + 2);
        td.setAttribute("columnId", String.fromCharCode(65 + i));
        td.tabIndex = 0;
        td.onclick = function () {
            content_selected(this)
        };
        td.ondblclick = function () {
            content_replace(this)
        };
        tbody_tr.appendChild(td);
    }

    // Change the values of headers in rows
    for (let i = now_row + 2; i < rows + 1; i++) {
        tbody_tr_arr[i].children[0].setAttribute("rowId", i + 1);
        tbody_tr_arr[i].children[0].innerText = i + 1;
    }

    // Change the values of table_arr
    for (let i = 0; i < columns; i++) {
        for (let j = now_row + 2; j < rows + 1; j++) {
            table_arr[i][j].setAttribute("rowId", j + 1);
        }
    }

    rows++;
}

// Add a column on the right of the row selected
function add_one_column() {
    // Add the column header
    let th = document.createElement('th');
    thead_th_arr.push(th);
    th.setAttribute("columnId", String.fromCharCode(65 + columns));
    th.innerText = String.fromCharCode(65 + columns);
    th.tabIndex = 0;
    // When this is selected, change the background of elements in this column
    th.onclick = function () {
        columns_head_selected(this)
    };
    thead_tr.appendChild(th);

    // Add one column in content
    let newtds = [];
    for (let i = 0; i < rows; i++) {
        let td = document.createElement('td');
        newtds.push(td);
        td.setAttribute("rowId", i + 1);
        td.setAttribute("columnId", String.fromCharCode(65 + now_column + 1));
        td.tabIndex = 0;
        td.onclick = function () {
            content_selected(this)
        };
        td.ondblclick = function () {
            content_replace(this)
        };
        // Insert new column td
        if (tbody_tr_arr[i].children[now_column + 1].nextSibling) {
            tbody_tr_arr[i].insertBefore(td, tbody_tr_arr[i].children[now_column + 1].nextSibling);
        } else {
            tbody_tr_arr[i].appendChild(td);
        }
    }
    table_arr.splice(now_column + 1, 0, newtds);

    // Change the values in table_arr
    for (let i = now_column + 2; i < columns + 1; i++) {
        for (let j = 0; j < rows; j++) {
            table_arr[i][j].setAttribute("columnId", String.fromCharCode(65 + i));
        }
    }

    // Add the column number
    columns++;
}

// Delete the row which is selected
function delete_this_row() {
    if (rows === 1) {
        alert("There is no row can be deleted!");
        return;
    }

    // Set "exit" for judge formula
    for (let j = 0; j < tbody_tr_arr[now_row].children.length; j++) {
        tbody_tr_arr[now_row].children[j].setAttribute("exit", true);
        // console.log(tbody_tr_arr[now_row].children[j].getAttribute("columnId") + tbody_tr_arr[now_row].children[j].getAttribute("rowId"))
    }

    tbody.removeChild(tbody_tr_arr[now_row]);

    tbody_tr_arr.splice(now_row, 1);
    for (let i = now_row; i < rows - 1; i++) {
        for (let j = 0; j < tbody_tr_arr[i].children.length; j++) {
            tbody_tr_arr[i].children[j].setAttribute("rowId", i + 1);
            if (j === 0) tbody_tr_arr[i].children[j].innerText = i + 1;
        }
    }
    for (let i = 0; i < columns; i++) {
        table_arr[i].splice(now_row, 1);
    }
    rows--;
}

// Delete the column which is selected
function delete_this_column() {
    if (columns === 1) {
        alert("There is no column can be deleted!");
        return;
    }
    thead_tr.removeChild(thead_th_arr[now_column]);
    thead_th_arr.splice(now_column, 1);
    for (let i = now_column; i < columns - 1; i++) {
        thead_th_arr[i].setAttribute("columnId", String.fromCharCode(65 + i));
        thead_th_arr[i].innerText = String.fromCharCode(65 + i);
    }
    for (let i = 0; i < rows; i++) {
        table_arr[now_column][i].setAttribute("exit", true);
        table_arr[now_column][i].parentNode.removeChild(table_arr[now_column][i]);
    }
    table_arr.splice(now_column, 1);
    for (let i = now_column; i < columns - 1; i++) {
        for (let j = 0; j < rows; j++) {
            table_arr[i][j].setAttribute("columnId", String.fromCharCode(65 + i));
        }
    }
    columns--;
}

// Import data from csv file
function import_data_from_csv() {
    fetch("input.csv")
        .then(v => v.text())
        .then(data => init_table_from_data(data))
}

function init_table_from_data(data) {
    if (data === "") {
        alert("No content in file!");
        return;
    }
    let tmp = data.split('\r\n');
    let csvdata = [];
    for (let i = 0; i < tmp.length; i++) {
        csvdata[i] = tmp[i].split(",");
    }

    // For init
    rows = tmp.length - 1;
    columns = csvdata[0].length;

    table_arr = [];
    for (let i = 0; i < columns; i++) {
        table_arr[i] = [];
    }

    thead.innerHTML = "";
    thead_tr = null;
    thead_th_arr = [];
    tbody.innerHTML = "";
    tbody_tr_arr = [];

    // Initialise table head
    thead_tr = document.createElement('tr');
    thead.appendChild(thead_tr);
    thead_tr.appendChild(document.createElement('th'));
    for (let i = 0; i < columns; i++) {
        let th = document.createElement('th');
        thead_th_arr.push(th);
        th.setAttribute("columnId", String.fromCharCode(65 + i));
        th.innerText = String.fromCharCode(65 + i);
        th.tabIndex = 0;
        // When this is selected, change the background of elements in this column
        th.onclick = function () {
            columns_head_selected(this)
        };
        thead_tr.appendChild(th);
    }
    // Initialise table body
    for (let i = 0; i < rows; i++) {
        let tbody_tr = document.createElement('tr');
        tbody_tr_arr.push(tbody_tr);
        let ftd = document.createElement('td');
        ftd.setAttribute("rowId", i + 1);
        ftd.innerText = i + 1;
        ftd.tabIndex = 0;
        ftd.onclick = function () {
            rows_head_selected(this);
        };
        tbody_tr.appendChild(ftd);
        for (let j = 0; j < columns; j++) {
            let td = document.createElement('td');
            table_arr[j][i] = td;
            td.setAttribute("rowId", i + 1);
            td.setAttribute("columnId", String.fromCharCode(65 + j));
            td.innerText = csvdata[i][j];
            td.tabIndex = 0;
            td.onclick = function () {
                content_selected(this)
            };
            td.ondblclick = function () {
                content_replace(this)
            };
            tbody_tr.appendChild(td);
            judge_text_inElement(td);
        }
        tbody.appendChild(tbody_tr);
    }
}

// Export data to csv file
function export_data_to_csv() {
    let max_column = 0;
    let max_row = 0;
    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
            if (table_arr[i][j].innerText !== "") {
                if (max_column < i) max_column = i;
                if (max_row < j) max_row = j;
            }
        }
    }
    let CSV = "";
    for (let i = 0; i <= max_row; i++) {
        let row = "";
        for (let j = 0; j < max_column; j++) {
            if(table_arr[j][i].hasAttribute("TrueValue")) {
                row += table_arr[j][i].getAttribute("TrueValue") + ",";
            }
            else {
                row += table_arr[j][i].innerText + ",";
            }
        }
        if(table_arr[max_column][i].hasAttribute("TrueValue")) {
            row += table_arr[max_column][i].getAttribute("TrueValue") + ",";
        }
        else {
            row += table_arr[max_column][i].innerText + ",";
        }
        CSV += row + "\r\n";
    }
    if (CSV === "") {
        alert("File is empty!");
        return;
    }
    let fileName = "output";
    let uri = 'data:text/csv;charset=utf-8,\ufeff' + encodeURI(CSV);
    let link = document.createElement("a");
    link.href = uri;

    link.style = "visibility:hidden";
    link.download = fileName + ".csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// The formula judgement
function judge_text_inElement(element) {
    if (element.hasAttribute("TrueValue")) unsubscribe_observe(element);
    let text = element.innerText;
    // Delete the space
    text = text.replace(/\s*/g, "");
    if (text.indexOf("=") === 0) {
        text = text.substring(1, text.length);
        if (text.indexOf("+") !== -1) {
            let cmp = text.split("+");
            if (cmp.length === 2) {
                let e1_column = cmp[0].substring(0, 1).charCodeAt(0) - 65;
                // console.log(e1_column);
                let e1_row = parseInt(cmp[0].substring(1, cmp[0].length)) - 1;
                // console.log(e1_row);
                let e2_column = cmp[1].substring(0, 1).charCodeAt(0) - 65;
                // console.log(e2_column);
                let e2_row = parseInt(cmp[1].substring(1, cmp[1].length)) - 1;
                // console.log(e2_row);
                let e1 = table_arr[e1_column][e1_row];
                let e2 = table_arr[e2_column][e2_row];
                element.setAttribute("TrueValue", element.innerText);
                element.innerText = (e1.innerText === "" ? 0 : parseInt(e1.innerText)) + (e2.innerText === "" ? 0 : parseInt(e2.innerText));
                let ob1 = Rx.Observable.fromEvent(e1, 'blur')
                    .do(() => {
                        element.innerText = (e1.innerText === "" ? 0 : parseInt(e1.innerText)) + (e2.innerText === "" ? 0 : parseInt(e2.innerText));
                    });
                let ob1_sub = ob1.subscribe();
                let ob2 = Rx.Observable.fromEvent(e2, 'blur')
                    .do(() => {
                        element.innerText = (e1.innerText === "" ? 0 : parseInt(e1.innerText)) + (e2.innerText === "" ? 0 : parseInt(e2.innerText));
                    });
                let ob2_sub = ob2.subscribe();
                let ob_attr = new MutationObserver(() => {
                    if(e1.hasAttribute("exit") || e2.hasAttribute("exit")) {
                        element.innerText = "Error!";
                        unsubscribe_observe(element);
                        return;
                    }
                    element.setAttribute("TrueValue", "= " + e1.getAttribute("columnId") + e1.getAttribute("rowId") + " + " + e2.getAttribute("columnId") + e2.getAttribute("rowId"));
                });
                ob_attr.observe(e1, {attributes: true});
                ob_attr.observe(e2, {attributes: true});
                ob_attr_arr[element] = ob_attr;
                observe_arr[element] = [];
                observe_arr[element].push(ob1_sub);
                observe_arr[element].push(ob2_sub);
            }
        } else if (text.indexOf("-") !== -1) {
            let cmp = text.split("-");
            if (cmp.length === 2) {
                let e1_column = cmp[0].substring(0, 1).charCodeAt(0) - 65;
                let e1_row = parseInt(cmp[0].substring(1, cmp[0].length)) - 1;
                let e2_column = cmp[1].substring(0, 1).charCodeAt(0) - 65;
                let e2_row = parseInt(cmp[1].substring(1, cmp[1].length)) - 1;
                let e1 = table_arr[e1_column][e1_row];
                let e2 = table_arr[e2_column][e2_row];
                element.setAttribute("TrueValue", element.innerText);
                element.innerText = (e1.innerText === "" ? 0 : parseInt(e1.innerText)) - (e2.innerText === "" ? 0 : parseInt(e2.innerText));
                let ob1 = Rx.Observable.fromEvent(e1, 'blur')
                    .do(() => {
                        element.innerText = (e1.innerText === "" ? 0 : parseInt(e1.innerText)) - (e2.innerText === "" ? 0 : parseInt(e2.innerText));
                    });
                let ob1_sub = ob1.subscribe();
                let ob2 = Rx.Observable.fromEvent(e2, 'blur')
                    .do(() => {
                        element.innerText = (e1.innerText === "" ? 0 : parseInt(e1.innerText)) - (e2.innerText === "" ? 0 : parseInt(e2.innerText));
                    });
                let ob2_sub = ob2.subscribe();
                let ob_attr = new MutationObserver(() => {
                    if(e1.hasAttribute("exit") || e2.hasAttribute("exit")) {
                        element.innerText = "Error!";
                        unsubscribe_observe(element);
                        return;
                    }
                    element.setAttribute("TrueValue", "= " + e1.getAttribute("columnId") + e1.getAttribute("rowId") + " - " + e2.getAttribute("columnId") + e2.getAttribute("rowId"));
                });
                ob_attr.observe(e1, {attributes: true});
                ob_attr.observe(e2, {attributes: true});
                ob_attr_arr[element] = ob_attr;
                observe_arr[element] = [];
                observe_arr[element].push(ob1_sub);
                observe_arr[element].push(ob2_sub);
            }
        } else if (text.indexOf("*") !== -1) {
            let cmp = text.split("*");
            if (cmp.length === 2) {
                let e1_column = cmp[0].substring(0, 1).charCodeAt(0) - 65;
                let e1_row = parseInt(cmp[0].substring(1, cmp[0].length)) - 1;
                let e2_column = cmp[1].substring(0, 1).charCodeAt(0) - 65;
                let e2_row = parseInt(cmp[1].substring(1, cmp[1].length)) - 1;
                let e1 = table_arr[e1_column][e1_row];
                let e2 = table_arr[e2_column][e2_row];
                element.setAttribute("TrueValue", element.innerText);
                element.innerText = (e1.innerText === "" ? 0 : parseInt(e1.innerText)) * (e2.innerText === "" ? 0 : parseInt(e2.innerText));
                let ob1 = Rx.Observable.fromEvent(e1, 'blur')
                    .do(() => {
                        element.innerText = (e1.innerText === "" ? 0 : parseInt(e1.innerText)) * (e2.innerText === "" ? 0 : parseInt(e2.innerText));
                    });
                let ob1_sub = ob1.subscribe();
                let ob2 = Rx.Observable.fromEvent(e2, 'blur')
                    .do(() => {
                        element.innerText = (e1.innerText === "" ? 0 : parseInt(e1.innerText)) * (e2.innerText === "" ? 0 : parseInt(e2.innerText));
                    });
                let ob2_sub = ob2.subscribe();
                let ob_attr = new MutationObserver(() => {
                    if(e1.hasAttribute("exit") || e2.hasAttribute("exit")) {
                        element.innerText = "Error!";
                        unsubscribe_observe(element);
                        return;
                    }
                    element.setAttribute("TrueValue", "= " + e1.getAttribute("columnId") + e1.getAttribute("rowId") + " * " + e2.getAttribute("columnId") + e2.getAttribute("rowId"));
                });
                ob_attr.observe(e1, {attributes: true});
                ob_attr.observe(e2, {attributes: true});
                ob_attr_arr[element] = ob_attr;
                observe_arr[element] = [];
                observe_arr[element].push(ob1_sub);
                observe_arr[element].push(ob2_sub);
            }
        } else if (text.indexOf("/") !== -1) {
            let cmp = text.split("/");
            if (cmp.length === 2) {
                let e1_column = cmp[0].substring(0, 1).charCodeAt(0) - 65;
                let e1_row = parseInt(cmp[0].substring(1, cmp[0].length)) - 1;
                let e2_column = cmp[1].substring(0, 1).charCodeAt(0) - 65;
                let e2_row = parseInt(cmp[1].substring(1, cmp[1].length)) - 1;
                let e1 = table_arr[e1_column][e1_row];
                let e2 = table_arr[e2_column][e2_row];
                element.setAttribute("TrueValue", element.innerText);
                element.innerText = e1.innerText === "" ? 0 : parseInt(e1.innerText) / e2.innerText === "" ? 0 : parseInt(e2.innerText);
                let ob1 = Rx.Observable.fromEvent(e1, 'blur')
                    .do(() => {
                        element.innerText = (e1.innerText === "" ? 0 : parseInt(e1.innerText)) / (e2.innerText === "" ? 0 : parseInt(e2.innerText));
                    });
                let ob1_sub = ob1.subscribe();
                let ob2 = Rx.Observable.fromEvent(e2, 'blur')
                    .do(() => {
                        element.innerText = (e1.innerText === "" ? 0 : parseInt(e1.innerText)) / (e2.innerText === "" ? 0 : parseInt(e2.innerText));
                    });
                let ob2_sub = ob2.subscribe();
                let ob_attr = new MutationObserver(() => {
                    if(e1.hasAttribute("exit") || e2.hasAttribute("exit")) {
                        element.innerText = "Error!";
                        unsubscribe_observe(element);
                        return;
                    }
                    element.setAttribute("TrueValue", "= " + e1.getAttribute("columnId") + e1.getAttribute("rowId") + " / " + e2.getAttribute("columnId") + e2.getAttribute("rowId"));
                });
                ob_attr.observe(e1, {attributes: true});
                ob_attr.observe(e2, {attributes: true});
                ob_attr_arr[element] = ob_attr;
                observe_arr[element] = [];
                observe_arr[element].push(ob1_sub);
                observe_arr[element].push(ob2_sub);
            }
        } else if (text.indexOf("SUM") !== -1) {
            text = text.substring(4, text.length - 1);
            let cmp = text.split(":");
            if (cmp.length === 2) {
                let e1_column = cmp[0].substring(0, 1).charCodeAt(0) - 65;
                // console.log(e1_column);
                let e1_row = parseInt(cmp[0].substring(1, cmp[0].length)) - 1;
                // console.log(e1_row);
                let e2_column = cmp[1].substring(0, 1).charCodeAt(0) - 65;
                // console.log(e2_column);
                let e2_row = parseInt(cmp[1].substring(1, cmp[1].length)) - 1;
                // console.log(e2_row);
                let min_column = e1_column < e2_column ? e1_column : e2_column;
                let max_column = e1_column > e2_column ? e1_column : e2_column;
                let min_row = e1_row < e2_row ? e1_row : e2_row;
                let max_row = e1_row > e2_row ? e1_row : e2_row;
                let e1 = table_arr[min_column][min_row];
                let e2 = table_arr[max_column][max_row];
                element.setAttribute("TrueValue", "= SUM(" + String.fromCharCode(65 + min_column) + (min_row + 1) + ":" + String.fromCharCode(65 + max_column) + (max_row + 1) + ")");
                element.innerText = sum_cells(e1, e2);
                // Set the Observables
                observe_arr[element] = [];
                for (let i = min_column; i <= max_column; i++) {
                    for (let j = min_row; j <= max_row; j++) {
                        let sub = Rx.Observable.fromEvent(table_arr[i][j], 'blur')
                            .do(() => {
                                element.innerText = sum_cells(e1, e2);
                            })
                            .subscribe();
                        observe_arr[element].push(sub);
                    }
                }
                let ob_attr = new MutationObserver(() => {
                    if(e1.hasAttribute("exit") || e2.hasAttribute("exit")) {
                        element.innerText = "Error!";
                        unsubscribe_observe(element);
                        return;
                    }
                    unsubscribe_observe_sum(element);
                    // console.log(123);
                    element.setAttribute("TrueValue", "= SUM(" + e1.getAttribute("columnId") + e1.getAttribute("rowId") + ":" + e2.getAttribute("columnId") + e2.getAttribute("rowId") + ")");
                    element.innerText = sum_cells(e1, e2);
                    // Set the Observables
                    observe_arr[element] = [];
                    for (let i = e1.getAttribute("columnId").charCodeAt(0) - 65; i <= e2.getAttribute("columnId").charCodeAt(0) - 65; i++) {
                        for (let j = parseInt(e1.getAttribute("rowId")) - 1; j <= parseInt(e2.getAttribute("rowId")) - 1; j++) {
                            let sub = Rx.Observable.fromEvent(table_arr[i][j], 'blur')
                                .do(() => {
                                    element.innerText = sum_cells(e1, e2);
                                })
                                .subscribe();
                            observe_arr[element].push(sub);
                        }
                    }
                });
                ob_attr.observe(e1, {attributes: true});
                ob_attr.observe(e2, {attributes: true});
                ob_attr_arr[element] = ob_attr;
            }
        } else {
            element.innerText = "Error!"
        }
    }
}

// Unsubscribe the observes in this element
function unsubscribe_observe(element) {
    let subs = new Subscription();
    for (let i = 0; i < observe_arr[element].length; i++) {
        subs.add(observe_arr[element][i]);
    }
    subs.unsubscribe();
    ob_attr_arr[element].disconnect();
    element.removeAttribute("TrueValue");
}

// Unsubscribe the observes in this element except Attributes changes
function unsubscribe_observe_sum(element) {
    let subs = new Subscription();
    for (let i = 0; i < observe_arr[element].length; i++) {
        subs.add(observe_arr[element][i]);
    }
    subs.unsubscribe();
    element.removeAttribute("TrueValue");
}

// Return the sum of the values from e1 : e2
function sum_cells(e1, e2) {
    let minC = e1.getAttribute("columnId").charCodeAt(0) - 65;
    let minR = parseInt(e1.getAttribute("rowId")) - 1;
    let maxC = e2.getAttribute("columnId").charCodeAt(0) - 65;
    let maxR = parseInt(e2.getAttribute("rowId")) - 1;
    // Get the sum;
    let sum = 0;
    for (let i = minC; i <= maxC; i++) {
        for (let j = minR; j <= maxR; j++) {
            sum += (table_arr[i][j].innerText === "" ? 0 : parseInt(table_arr[i][j].innerText));
        }
    }
    return sum;
}
