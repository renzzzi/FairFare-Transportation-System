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
        actionsCell.className = "actions-buttons-container"; // For styling the container

        const statuses = ["Pending", "Reviewed", "Resolved"];
        statuses.forEach(statusOption => {
            const button = document.createElement("button");
            button.textContent = statusOption;
            // Add some basic classes for styling (e.g., if you use Bootstrap)
            // You might need to add CSS for these classes if not using a framework
            button.className = `btn btn-sm action-status-btn btn-${statusOption.toLowerCase()}`;
            button.style.marginRight = "4px"; // Basic spacing

            if (item.status === statusOption) {
                button.disabled = true; // Disable button for the current status
            }

            button.onclick = function() {
                updateItemStatus(item.id, statusOption);
            };
            actionsCell.appendChild(button);
        });
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
            // Check if x and y are valid and have innerHTML
            if (!x || !y || typeof x.innerHTML === 'undefined' || typeof y.innerHTML === 'undefined') {
                continue; // Skip if cells are not as expected
            }
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
        } // Added missing closing curly brace for the for loop
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

// UPDATE item status (called by action buttons)
function updateItemStatus(itemId, newStatus) {
    // 1. Update the in-memory 'requests' array
    const itemIndex = requests.findIndex(req => req.id === itemId);
    if (itemIndex === -1) {
        console.error("Item not found in requests array:", itemId);
        return;
    }
    requests[itemIndex].status = newStatus;

    const tableBody = document.querySelector("#requests-table tbody");
    const row = Array.from(tableBody.rows).find(r => r.getAttribute("data-id") === itemId);

    if (row) {
        const statusCell = row.cells[3];
        statusCell.textContent = newStatus;
        statusCell.className = "status " + newStatus.toLowerCase();

        // Update data-status attribute on the row itself
        row.setAttribute("data-status", newStatus);

        const actionButtons = row.cells[5].querySelectorAll(".action-status-btn");
        actionButtons.forEach(button => {
            if (button.textContent === newStatus) {
                button.disabled = true;
            } else {
                button.disabled = false;
            }
        });
    } else {
        console.warn(`Row with id ${itemId} not found for DOM update. Consider repopulating.`);
    }

    // 3. Update pending count
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