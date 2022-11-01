function removeElements() {
    //clear all the item
    let items = document.querySelectorAll(".list-items");
    items.forEach((item) => {
        item.remove();
    });
}

let input = document.getElementById("item_id");

let names = [
    "Ayla",
    "Jake",
    "Sean",
    "Henry",
    "Brad",
    "Stephen",
    "Taylor",
    "Timmy",
    "Cathy",
    "John",
    "Amanda",
    "Amara",
    "Sam",
    "Sandy",
    "Danny",
    "Ellen",
    "Camille",
    "Chloe",
    "Emily",
    "Nadia",
    "Mitchell",
    "Harvey",
    "Lucy",
    "Amy",
    "Glen",
    "Peter",
];

let selectedNames = []

let sortedNames = names.sort();

let products = []

var selectedRow = null





input.addEventListener("keyup", (e) => {

    removeElements();
    for (let i of sortedNames) {

        if (
            i.toLowerCase().startsWith(input.value.toLowerCase()) &&
            input.value != ""
        ) {

            let listItem = document.createElement("li");

            listItem.classList.add("list-items");
            listItem.style.cursor = "pointer";
            listItem.setAttribute("onclick", "displayNames('" + i + "')");

            let word = "<b>" + i.substr(0, input.value.length) + "</b>";
            word += i.substr(input.value.length);

            listItem.innerHTML = word;
            document.querySelector(".list").appendChild(listItem);
        }
    }
});

function displayNames(value) {
    input.value = value;
    removeElements();
}

function onFormSubmit() {
    if (validate()) {
        var formData = readFormData();
        if (selectedRow == null)
            insertNewRecord(formData);
        else
            updateRecord(formData);
        resetForm();
    }


}

function onTableSubmit() {

    if (validateTable()) {
        readTableData();

    }


}

function readTableData() {
    var table = document.getElementById("prod_list");
    var rowsLength = table.rows.length;

    for (var i = 1; i < rowsLength; ++i) {
        var cells = table.rows.item(i).cells;
        prod_info = []


        var cellLength = cells.length - 1;


        for (var j = 0; j < cellLength; j++) {
            var cellVal = cells.item(j);

            if (j > 3) {
                id = cellVal.getElementsByTagName("input")[0].id;
                var val = document.getElementById(id).value;
                prod_info.push(val)

            } else {
                prod_info.push(cellVal.innerHTML);

            }
        }
        products.push(prod_info)
    }
    console.log(products)

}

function readFormData() {
    var formData = {};
    formData["item_id"] = document.getElementById("item_id").value;

    return formData;
}

function insertNewRecord(data) {
    var table = document.getElementById("prod_list").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow();
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.item_id;
    selectedNames.push(data.item_id);
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = 'Item name';
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = 'pcs';
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = 0;
    cell5 = newRow.insertCell(4);
    cell5.innerHTML = `<input type="text" name="Quantity${data.item_id}" id="quantity${data.item_id}" onkeyup="updateUnitPrice(this)" placeholder="Quantity" autocomplete="off">`;
    cell6 = newRow.insertCell(5);
    cell6.innerHTML = `<input type="text" name="UnitPrice${data.item_id}" id="unitprice${data.item_id}" onkeyup="updateUnitPrice(this)" placeholder="Unit Price" autocomplete="off">`;
    cell7 = newRow.insertCell(6);
    cell7.innerHTML = `<input type="text" name="Amount${data.item_id}" id="amount${data.item_id}" placeholder="Amount" autocomplete="off">`;
    cell8 = newRow.insertCell(7);
    cell8.innerHTML = `<a onClick="onEdit(this)">Edit</a>
                       <a onClick="onDelete(this)">Delete</a>`;



}

function resetForm() {
    document.getElementById("item_id").value = "";

    selectedRow = null;
}

function updateUnitPrice(data) {
    id = data.parentElement.parentElement.cells[0].innerHTML;
    var unitPrice = document.getElementById(`unitprice${id}`);
    var amount = document.getElementById(`amount${id}`);
    var quantity = document.getElementById(`quantity${id}`);
    var val = quantity.value * unitPrice.value
    amount.value = val

}


function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("item_id").value = selectedRow.cells[0].innerHTML;


}

function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.item_id;


}

function onDelete(td) {
    if (confirm('Are you sure to delete this record ?')) {
        row = td.parentElement.parentElement;
        document.getElementById("prod_list").deleteRow(row.rowIndex);
        resetForm();
    }
}

function validateTable() {
    isValid = true;
    var table = document.getElementById("prod_list");
    var rowsLength = table.rows.length;

    if (rowsLength == 1) {
        isValid = false;
        document.getElementById("emptyTableError").classList.remove("hide");
    } else {
        isValid = true;
        if (!document.getElementById("emptyTableError").classList.contains("hide"))
            document.getElementById("emptyTableError").classList.add("hide");
    }
    return isValid;
}

function validate() {
    isValid = true;
    if (document.getElementById("item_id").value == "") {
        isValid = false;
        document.getElementById("fullNameValidationError").classList.remove("hide");
    } else {
        isValid = true;
        if (!document.getElementById("fullNameValidationError").classList.contains("hide"))
            document.getElementById("fullNameValidationError").classList.add("hide");
    }
    return isValid;
}