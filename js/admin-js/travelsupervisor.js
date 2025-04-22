function populateSupervisorAccountsTable(supervisors) {
    const tableBody = document.querySelector("#supervisorAccountsTable tbody");
    if (!tableBody) return;
    tableBody.innerHTML = '';

    supervisors.forEach(supervisor => {
        const row = tableBody.insertRow();
        row.insertCell().textContent = supervisor.name;
        row.insertCell().textContent = supervisor.email;

        // Account Status Dropdown
        const accountStatusCell = row.insertCell();
        const accountStatusSelect = document.createElement('select');
        accountStatusSelect.className = 'form-control form-control-sm account-status-dropdown';
        accountStatusSelect.dataset.id = supervisor.id;
        const accountStatuses = ["Active", "Inactive"];

        // Create account status options
        accountStatuses.forEach(status => {
            const option = document.createElement('option');
            option.value = status;
            option.textContent = status;
            if (supervisor.accountStatus === status) {
                option.selected = true;
            }
            accountStatusSelect.appendChild(option);
        });
        accountStatusSelect.addEventListener('change', (event) => {
            updateSupervisorAccountStatus(supervisor.id, event.target.value);
        });
        accountStatusCell.appendChild(accountStatusSelect);

        row.insertCell().textContent = supervisor.applicationDate;

        const approvalStatusCell = row.insertCell();
        let displayApprovalStatus = supervisor.approvalStatus;
        if (supervisor.approvalStatus === "Accept") {
            displayApprovalStatus = "Accepted";
        } else if (supervisor.approvalStatus === "Reject") {
            displayApprovalStatus = "Rejected";
        }
        approvalStatusCell.textContent = displayApprovalStatus;

        approvalStatusCell.className = `status status-${supervisor.approvalStatus.toLowerCase()}`;

        // Actions Dropdown
        const actionsCell = row.insertCell();
        const approvalSelect = document.createElement('select');
        approvalSelect.className = 'form-control form-control-sm approval-status-dropdown';
        approvalSelect.dataset.id = supervisor.id;

        const approvalOptions = ["Pending", "Accepted", "Rejected"];
        approvalOptions.forEach(optionText => {
            const option = document.createElement('option');
            option.value = optionText;
            option.textContent = optionText;
            if (supervisor.approvalStatus === optionText) {
                option.selected = true;
            }
            if (optionText === "Pending") {
                option.disabled = true;
            }
            approvalSelect.appendChild(option);
        });

        approvalSelect.addEventListener('change', (event) => {
            const newStatus = event.target.value;
            updateSupervisorApprovalStatus(supervisor.id, newStatus);

            // Automatically update account status dropdown
            if (newStatus === "Accepted") {
                accountStatusSelect.disabled = false;
                accountStatusSelect.value = "Active";
            } else if (newStatus === "Rejected") {
                const placeholder = document.createElement('option');
                placeholder.textContent = "[Rejected]";
                placeholder.value = "";
                placeholder.disabled = true;
                accountStatusSelect.innerHTML = '';
                accountStatusSelect.appendChild(placeholder);
                accountStatusSelect.value = "";
                accountStatusSelect.disabled = true;
            }
        });

        actionsCell.appendChild(approvalSelect);
    });

    if (supervisors.length === 0) {
        const row = tableBody.insertRow();
        row.insertCell().textContent = 'No supervisor accounts found.';
        row.cells[0].colSpan = 6;
        row.cells[0].classList.add('text-center');
    }
}


function updateSupervisorAccountStatus(supervisorId, newAccountStatus) {
    // In a real application, send an AJAX request to update the account status.
    console.log(`Updating supervisor ${supervisorId} account status to: ${newAccountStatus}`);

    // For this front-end example:
    supervisors = supervisors.map(supervisor => {
        if (supervisor.id === supervisorId) {
            return { ...supervisor, accountStatus: newAccountStatus };
        }
        return supervisor;
    });
    populateSupervisorAccountsTable(supervisors);
    updateSupervisorDashboardCounts(supervisors);
    updateDashboardStats(); // Update dashboard if active supervisor count changes
}

function updateSupervisorApprovalStatus(id, newStatus) {
    supervisors = supervisors.map(supervisor => {
        if (supervisor.id === id) {
            let updatedSupervisor = { ...supervisor, approvalStatus: newStatus };

            // Automatically adjust account status based on approval
            if (newStatus === "Accepted") {
                updatedSupervisor.accountStatus = "Active";
            } else if (newStatus === "Rejected") {
                updatedSupervisor.accountStatus = "Inactive";
            }

            return updatedSupervisor;
        }
        return supervisor;
    });

    populateSupervisorAccountsTable(supervisors);
    updateSupervisorDashboardCounts(supervisors);
    updateDashboardStats(); // Optional: ensures all other stats are also refreshed
}



document.addEventListener('DOMContentLoaded', () => {
    populateSupervisorAccountsTable(supervisors);
    updateSupervisorDashboardCounts(supervisors);
});

function updateSupervisorDashboardCounts(supervisors) {
    const activeCount = supervisors.filter(s => s.accountStatus === "Active" && s.approvalStatus === "Accepted").length;
    const pendingCount = supervisors.filter(s => s.approvalStatus === "Pending").length;

    document.getElementById("activeSupervisorsDashboard").textContent = activeCount;
    document.getElementById("pendingSupervisorApprovalsDashboard").textContent = pendingCount;
}


// Example data (replace with your actual data fetching)
let supervisors = [
    { id: 1, name: "Renz Espiritu", email: "espiritu@example.com", applicationDate: "2025-04-20", approvalStatus: "Accepted", accountStatus: "Active" },
    { id: 2, name: "James Rojas", email: "rojas@example.com", applicationDate: "2025-04-18", approvalStatus: "Accepted", accountStatus: "Inactive" },
    { id: 3, name: "Theodore Adanza", email: "adanza@example.com", applicationDate: "2025-04-22", approvalStatus: "Pending", accountStatus: "Inactive" },
    { id: 4, name: "Graziella Saavedra", email: "saavedra@example.com", applicationDate: "2025-04-15", approvalStatus: "Rejected", accountStatus: "Inactive" }
];



$(document).ready(function () {
    // ... your existing $(document).ready() code ...

    // Manage Bookings button click (assuming this was a typo and should be Manage Supervisors)
    $('#manageBookingsButton').click(function () {
        $('#manage-supervisors').show();
        $('#dashboardSection, #manageTripsSection, #salesReportSection, #availableResourcesSection, #manage-passengers, #passenger-requests').hide();
        populateSupervisorAccountsTable(supervisors);
        updateSupervisorDashboardCounts(supervisors); // Update dashboard if active/pending supervisor count changes
        updateDashboardStats(); 
    });

    // ... rest of your existing $(document).ready() code ...
});

