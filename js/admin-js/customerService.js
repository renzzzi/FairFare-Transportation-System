let requests = [
    { id: "#1024", type: "Request", message: "Need refund for overcharged ticket", status: "Pending", submitted: "April 12, 2025" },
    { id: "#1025", type: "Complaint", message: "Driver arrived late at terminal", status: "Reviewed", submitted: "April 13, 2025" },
    { id: "#1026", type: "Request", message: "Change destination of booked trip", status: "Resolved", submitted: "April 14, 2025" },
    { id: "#1027", type: "Complaint", message: "AC not working in bus", status: "Pending", submitted: "April 14, 2025" },
    { id: "#1028", type: "Request", message: "Payment failure during booking", status: "Resolved", submitted: "April 15, 2025" },
    { id: "#1029", type: "Complaint", message: "Conductor was rude", status: "Reviewed", submitted: "April 15, 2025" },
];


// TABLE
function populateTable() {
    const tableBody = document.querySelector("#requests-table tbody");
    tableBody.innerHTML = ''; // Clear the table body

    if (requests.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="6" class="text-center">No requests or complaints found.</td></tr>';
        return;
    }

    requests.forEach(item => {
        const row = tableBody.insertRow();
        row.setAttribute("data-id", item.id);
        row.setAttribute("data-type", item.type);
        row.setAttribute("data-status", item.status);
        row.setAttribute("data-message", item.message);
        row.setAttribute("data-submitted", item.submitted);

        row.insertCell().textContent = item.id;
        row.insertCell().textContent = item.type;
        row.insertCell().textContent = item.message;
        const statusCell = row.insertCell();
        statusCell.textContent = item.status;
        statusCell.className = "status " + item.status.toLowerCase();
        row.insertCell().textContent = item.submitted;

        const actionsCell = row.insertCell();
        const select = document.createElement("select");
        select.className = "form-control form-control-sm";
        select.onchange = function() {
            updateStatus(this, item.id);
        };

        ["Pending", "Reviewed", "Resolved"].forEach(option => {
            const optionElement = document.createElement("option");
            optionElement.value = option;
            optionElement.textContent = option;
            if (option === item.status) {
                optionElement.selected = true;
            }
            select.appendChild(optionElement);
        });
        actionsCell.appendChild(select);
    });
    updatePendingCount(); //update count
}
//SORTING
function sortTable(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("requests-table");
    switching = true;
    dir = "asc";
    while (switching) {
        switching = false;
        rows = table.rows;
        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];
            if (dir == "asc") {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            } else if (dir == "desc") {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
            }
        }
            if (shouldSwitch) {
                rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                switching = true;
                switchcount++;
            } else {
                if (switchcount == 0 && dir == "asc") {
                    dir = "desc";
                    switching = true;
                }
            }
        }
    }   
}
// UPDATE
function updateStatus(selectElement, id) {
    const status = selectElement.value;
    const row = selectElement.parentNode.parentNode;

    requests = requests.map(item => {
        if (item.id === id) {
            return { ...item, status: status };
        }
        return item;
    });

    row.querySelector(".status").textContent = status;
    row.querySelector(".status").className = "status " + status.toLowerCase();
    row.setAttribute("data-status", status); //update data-status

    updatePendingCount();
}

//UPDATE IN DASHBOARD
function updatePendingCount() {
    const table = document.getElementById("requests-table");
    const rows = table.rows;
    let pendingCount = 0;
    for (let i = 1; i < rows.length; i++) {
        const status = rows[i].getAttribute("data-status");
        if (status === "Pending") {
            pendingCount++;
        }
    }
    document.getElementById("pendingCSRDashboard").textContent = pendingCount;
}

$(document).ready(function () {
    $('#customerservice').hide();
    $('#showCustomerServiceButton').click(function () {
        $('#customerservice').show();
        $('#dashboardSection, #manage-buses, #manage-routes, #manageTripsSection, #salesReportSection, #availableResourcesSection, #manage-passengers,  #report').hide();
    });
    populateTable();
});