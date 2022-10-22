function removeElements() {
    //clear all the item
    let items = document.querySelectorAll(".list-items");
    items.forEach((item) => {
        item.remove();
    });
}

let input = document.getElementById("item_id");
var selectedRow = null

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

let sortedNames = names.sort();



var selectedRow = null


// document.getElementById("fullName").getAttribute("autocomplete") = "off";


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

function readFormData() {
    var formData = {};
    formData["item_id"] = document.getElementById("item_id").value;

    return formData;
}

function insertNewRecord(data) {
    var table = document.getElementById("prod_list").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.item_id;

    cell4 = newRow.insertCell(1);
    cell4.innerHTML = `<a onClick="onEdit(this)">Edit</a>
                       <a onClick="onDelete(this)">Delete</a>`;
}

function resetForm() {
    document.getElementById("item_id").value = "";

    selectedRow = null;
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