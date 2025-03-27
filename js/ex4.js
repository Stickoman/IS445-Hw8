document.getElementById("dataForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const formData = new FormData(this);
    const table = document.getElementById("dataTable");

    while (table.rows.length > 1) {
        table.deleteRow(1);
    }

    for (let [key, value] of formData.entries()) {
        const row = table.insertRow();
        row.insertCell(0).textContent = key;
        row.insertCell(1).textContent = value;
    }
});
