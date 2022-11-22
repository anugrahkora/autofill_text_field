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


let indexes = []


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
    var formData = readFormData();

    if (validate() && names.includes(formData.item_id)) {
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

function showAllItems() {
    var table = document.getElementById("all-items-list").getElementsByTagName('tbody')[0];
    var rowsLength = table.rows.length;

    if (rowsLength == 0) {
        for (var i = 1; i < names.length; ++i) {
            var id = names[i] + ":" + Math.floor(Math.random() * 1000);
            var newRow = table.insertRow();
            cell1 = newRow.insertCell(0);
            cell1.innerHTML = `<input class="data" name="index${id}" id="index${id}" value=${i} readonly>`;
            cell2 = newRow.insertCell(1);
            cell2.innerHTML = `<input class="data" name="${id}" id="${id}" value=${names[i]} readonly>`;
            cell3 = newRow.insertCell(2);
            cell3.innerHTML = `<input class="data" name="itemName${id}" id="itemName${id}" value="ItemName" readonly>`;
            cell4 = newRow.insertCell(3);
            cell4.innerHTML = `<a onClick="addDataToField(this)">Add</a>`;
        }
    }




}

function addDataToField(value) {

    id = value.parentElement.parentElement.cells[1].getElementsByTagName("input")[0].id;
    var val = document.getElementById(id).value;
    input.value = val;

    closeForm();

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
            id = cellVal.getElementsByTagName("input")[0].id;
            var val = document.getElementById(id).value;
            prod_info.push(val)

        }

        products.push(prod_info)
    }
    // console.log(products)
}

function readFormData() {
    var formData = {};
    formData["item_id"] = document.getElementById("item_id").value;

    return formData;
}

function insertNewRecord(data) {
    var table = document.getElementById("prod_list").getElementsByTagName('tbody')[0];
    var rowsLength = document.getElementById("prod_list").rows.length;
    var id = data.item_id + ":" + rowsLength;

    var newRow = table.insertRow();
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = `<input class="data" name="index${id}" id="index${id}" value=${rowsLength} readonly>`;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = `<input class="data" name="${id}" id="${id}" value=${data.item_id} readonly>`;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = `<input class="data" name="itemName${id}" id="itemName${id}" value="ItemName" readonly>`;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = `<input type="text" name="desc${id}" id="desc${id}">`;
    cell5 = newRow.insertCell(4);
    cell5.innerHTML = `<input class="data" name="unit${id}" id="unit${id}" value="pcs" readonly>`;

    cell6 = newRow.insertCell(5);
    cell6.innerHTML = `<input class="data" name="stock${id}" id="stock${id}" value="0" readonly>`;
    cell7 = newRow.insertCell(6);
    cell7.innerHTML = `<input type="text" name="Quantity${id}" id="quantity${id}" onkeyup="updateUnitPrice(this)" placeholder="Quantity" autocomplete="off">`;
    cell8 = newRow.insertCell(7);
    cell8.innerHTML = `<input type="text" name="UnitPrice${id}" id="unitprice${id}" onkeyup="updateUnitPrice(this)" placeholder="Unit Price" autocomplete="off">`;
    cell9 = newRow.insertCell(8);
    cell9.innerHTML = `<input type="text" name="Amount${id}" id="amount${id}" placeholder="Amount" autocomplete="off"  readonly>`;
    cell10 = newRow.insertCell(9);
    cell10.innerHTML = `<a onClick="onEdit(this)">Edit</a>
                       <a onClick="onDelete(this)">Delete</a>`;
    // updateTotalPrice()

}



function resetForm() {
    document.getElementById("item_id").value = "";

    selectedRow = null;
}

function updateTotalPrice() {

    var table = document.getElementById("prod_list");
    var rowsLength = table.rows.length;
    var totalDiv = document.getElementById("total");
    var total = 0

    for (var i = 1; i < rowsLength; ++i) {
        var cells = table.rows.item(i).cells;



        var cellVal = cells.item(8);
        total = total + Number(cellVal.getElementsByTagName("input")[0].value);



        totalDiv.value = total

    }


}

function updateUnitPrice(data) {
    id = data.parentElement.parentElement.cells[1].getElementsByTagName("input")[0].id;
    var unitPrice = document.getElementById(`unitprice${id}`);
    var amount = document.getElementById(`amount${id}`);
    var quantity = document.getElementById(`quantity${id}`);
    var val = quantity.value * unitPrice.value
    amount.value = val
    updateTotalPrice()


}


function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("item_id").value = selectedRow.cells[1].getElementsByTagName("input")[0].value;



}

function updateRecord(formData) {
    selectedRow.cells[1].getElementsByTagName("input")[0].value = formData.item_id;


}

function onDelete(td) {
    if (confirm('Are you sure to delete this record ?')) {
        var table = document.getElementById("prod_list");
        row = td.parentElement.parentElement;
        var totalDiv = document.getElementById("total");

        var cells = table.rows.item(row.rowIndex).cells;
        var cellVal = cells.item(8)
        totalDiv.value -= Number(cellVal.getElementsByTagName("input")[0].value);

        document.getElementById("prod_list").deleteRow(row.rowIndex);
        var rowsLength = table.rows.length;

        for (var i = 1; i < rowsLength; ++i) {
            var cells = table.rows.item(i).cells;



            var cellVal = cells.item(0);




            cellVal.getElementsByTagName("input")[0].value = i;

            // console.log(cellVal.getElementsByTagName("input")[0].value)
        }
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

function openForm() {
    showAllItems();
    document.getElementById("all-items").style.display = "block";
}

function closeForm() {
    document.getElementById("all-items").style.display = "none";
}