let transactions_input = document.getElementById("transactions_item_id");


var selectedRowTransaction = null

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

];


let transactions = [
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

let updated_transactions = []

transactions_input.addEventListener("keyup", (e) => {
    search_items_transaction();

});

function search_items_transaction() {
    removeElementsTransaction();
    for (let i of names) {

        if (
            i.toLowerCase().startsWith(transactions_input.value.toLowerCase()) &&
            transactions_input.value != ""
        ) {

            let listItem = document.createElement("li");

            listItem.classList.add("list-items");
            listItem.style.cursor = "pointer";
            listItem.setAttribute("onclick", "displayNames('" + i + "')");

            let word = "<b>" + i.substr(0, transactions_input.value.length) + "</b>";
            word += i.substr(transactions_input.value.length);

            listItem.innerHTML = word;
            document.querySelector(".list").appendChild(listItem);
        }
    }
}


function displayNames(value) {
    transactions_input.value = value;
    removeElementsTransaction();
}

function removeElementsTransaction() {
    //clear all the item
    let items = document.querySelectorAll(".list-items");
    items.forEach((item) => {
        item.remove();
    });
}

function load_transactions() {
    insertTransactions();
}

function onFormSubmitTransaction() {
    var formData = readTransactionFormData();

    if (validateTransaction() && names.includes(formData.item_id)) {
        if (selectedRow == null)
            insertNewRecordTransaction(formData);
        else
            updateRecordTransaction(formData);
        resetFormTransaction();
    }


}

function readTransactionTableData() {
    var table = document.getElementById("transactions_list");
    var rowsLength = table.rows.length;

    for (var i = 1; i < rowsLength; ++i) {
        var cells = table.rows.item(i).cells;
        transaction_info = []


        var cellLength = cells.length - 1;


        for (var j = 0; j < cellLength; j++) {
            var cellVal = cells.item(j);
            id = cellVal.getElementsByTagName("input")[0].id;
            var val = document.getElementById(id).value;
            transaction_info.push(val)

        }

        updated_transactions.push(transaction_info)
    }
    console.log(updated_transactions)
}

function insertNewRecordTransaction(data) {
    var table = document.getElementById("transactions_list").getElementsByTagName('tbody')[0];
    var rowsLength = document.getElementById("transactions_list").rows.length;
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
    cell10.innerHTML = `<a onClick="onEditTransaction(this)">Edit</a>
                       <a onClick="onDeleteTransaction(this)">Delete</a>`;
    // updateTotalPrice()

}

function readTransactionFormData() {
    var formData = {};
    formData["item_id"] = document.getElementById("transactions_item_id").value;

    return formData;
}

function insertTransactions() {

    var table = document.getElementById("transactions_list").getElementsByTagName('tbody')[0];
    var rowsLength = table.rows.length;

    if (rowsLength == 0) {
        for (var i = 1; i < transactions.length; ++i) {
            var id = transactions[i] + ":" + Math.floor(Math.random() * 1000);
            var newRow = table.insertRow();
            cell1 = newRow.insertCell(0);
            cell1.innerHTML = `<input class="data" name="index${id}" id="index${id}" value=${i} readonly>`;
            cell2 = newRow.insertCell(1);
            cell2.innerHTML = `<input class="data" name="${id}" id="${id}" value=${names[i]} readonly>`;
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
            cell10.innerHTML = `<a onClick="onEditTransaction(this)">Edit</a>
                       <a onClick="onDeleteTransaction(this)">Delete</a>`;
        }
    }


}

function validateTransactionTable() {
    isValid = true;
    var table = document.getElementById("transactions_list");
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

function validateTransaction() {
    isValid = true;
    if (document.getElementById("transactions_item_id").value == "") {
        isValid = false;
        document.getElementById("fullNameValidationError").classList.remove("hide");
    } else {
        isValid = true;
        if (!document.getElementById("fullNameValidationError").classList.contains("hide"))
            document.getElementById("fullNameValidationError").classList.add("hide");
    }
    return isValid;
}

function onEditTransaction(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("transactions_item_id").value = selectedRow.cells[1].getElementsByTagName("input")[0].value;



}

function updateRecordTransaction(formData) {
    selectedRow.cells[1].getElementsByTagName("input")[0].value = formData.item_id;


}

function onDeleteTransaction(td) {
    if (confirm('Are you sure to delete this record ?')) {
        var table = document.getElementById("transactions_list");
        row = td.parentElement.parentElement;
        var totalDiv = document.getElementById("total");

        var cells = table.rows.item(row.rowIndex).cells;
        var cellVal = cells.item(8)
        totalDiv.value -= Number(cellVal.getElementsByTagName("input")[0].value);

        document.getElementById("transactions_list").deleteRow(row.rowIndex);
        var rowsLength = table.rows.length;

        for (var i = 1; i < rowsLength; ++i) {
            var cells = table.rows.item(i).cells;



            var cellVal = cells.item(0);




            cellVal.getElementsByTagName("input")[0].value = i;

            // console.log(cellVal.getElementsByTagName("input")[0].value)
        }
        resetFormTransaction();
    }
}

function resetFormTransaction() {
    document.getElementById("transactions_item_id").value = "";

    selectedRow = null;
}

function onTransactionTableSubmit() {

    if (validateTransactionTable()) {
        readTransactionTableData();

    }


}


// common functions
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

function openForm() {
    showAllItems();
    document.getElementById("all-items").style.display = "block";
}

function closeForm() {
    document.getElementById("all-items").style.display = "none";
}