let supervisors = [
    { id: 1, name: "Renz Espiritu", email: "espiritu@example.com", applicationDate: "2025-04-20", approvalStatus: "Approved", accountStatus: "Active" },
    { id: 2, name: "James Rojas", email: "rojas@example.com", applicationDate: "2025-04-18", approvalStatus: "Approved", accountStatus: "Inactive" },
    { id: 3, name: "Theodore Adanza", email: "adanza@example.com", applicationDate: "2025-04-22", approvalStatus: "Pending", accountStatus: "Inactive" },
    { id: 4, name: "Graziella Saavedra", email: "saavedra@example.com", applicationDate: "2025-04-15", approvalStatus: "Rejected", accountStatus: "Inactive" }
];

document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM fully loaded and parsed for supervisor management.");

    const supervisorSection = document.getElementById('supervisor');
    if (!supervisorSection) {
        console.error("CRITICAL: Supervisor section element with ID 'supervisor' not found!");
        return;
    }
const showManageSupervisorsButton = document.getElementById('showManageSupervisorsButton');
    if (showManageSupervisorsButton) {
        console.log("Button 'showManageSupervisorsButton' found.");
        showManageSupervisorsButton.addEventListener('click', () => {
            console.log("'showManageSupervisorsButton' clicked.");

            supervisorSection.style.display = 'block'; // Make the supervisor section visible
            console.log("Supervisor section display set to 'block'.");
            populateSupervisorAccountsTable(supervisors);
        });
    } else {
        console.warn("Button with ID 'showManageSupervisorsButton' not found. Table will only populate if section is initially visible or shown by other means.");
    }

    function populateSupervisorAccountsTable(supervisorList) {
        console.log("populateSupervisorAccountsTable called with:", supervisorList ? supervisorList.length : 0, "supervisors");
        const tableBody = document.querySelector("#supervisorAccountsTable tbody");
        if (!tableBody) {
            console.error("CRITICAL: Supervisor accounts table body ('#supervisorAccountsTable tbody') not found!");
            return;
        }
        console.log("Table body found:", tableBody);

        tableBody.innerHTML = ''; // Clear existing rows

        if (!supervisorList || supervisorList.length === 0) {
            console.log("Supervisor list is empty or null. Displaying 'No data' message.");
            const row = tableBody.insertRow();
            const cell = row.insertCell();
            cell.textContent = 'No supervisor accounts found.';
            cell.colSpan = 7; 
            cell.classList.add('text-center');
            return;
        }

        console.log(`Processing ${supervisorList.length} supervisors.`);
        supervisorList.forEach((supervisor, index) => {
            const row = tableBody.insertRow();

            row.insertCell().textContent = supervisor.name;
            row.insertCell().textContent = supervisor.email;

            const accountStatusTextCell = row.insertCell();
            accountStatusTextCell.textContent = supervisor.accountStatus;
            accountStatusTextCell.className = 'status-cell'; // Base class for styling
            if (supervisor.accountStatus === "Active") {
                accountStatusTextCell.classList.add('status-active-bg'); // Class for active background
            } else {
                accountStatusTextCell.classList.add('status-inactive-bg'); // Class for inactive background
            }

            row.insertCell().textContent = supervisor.applicationDate;
const approvalStatusTextCell = row.insertCell();
            approvalStatusTextCell.textContent = supervisor.approvalStatus;
            approvalStatusTextCell.className = 'status-cell'; // Base class for styling
            switch (supervisor.approvalStatus) {
                case "Approved":
                    approvalStatusTextCell.classList.add('status-approved-bg'); // Class for approved background
                    break;
                case "Pending":
                    approvalStatusTextCell.classList.add('status-pending-bg');   // Class for pending background
                    break;
                case "Rejected":
                    approvalStatusTextCell.classList.add('status-rejected-bg');  // Class for rejected background
                    break;
                default:
                    console.warn(`Unknown approval status: ${supervisor.approvalStatus} for supervisor ID ${supervisor.id}`);
                    break;
            }

            // --- Account Status Actions (Set Active/Inactive Buttons) ---
            const accountStatusActionsCell = row.insertCell();
            accountStatusActionsCell.classList.add('text-nowrap');

            const setActiveButton = document.createElement('button');
            setActiveButton.textContent = 'Set Active';
            setActiveButton.className = 'btn btn-success btn-sm me-1'; // me-1 for Bootstrap 5 margin
            setActiveButton.disabled = (supervisor.accountStatus === 'Active' || supervisor.approvalStatus !== 'Approved');
            setActiveButton.title = (supervisor.approvalStatus !== 'Approved') ? 'Supervisor must be "Approved" first' : 'Set account to Active';
            setActiveButton.addEventListener('click', () => window.updateSupervisorAccountStatus(supervisor.id, 'Active'));
            accountStatusActionsCell.appendChild(setActiveButton);

            const setInactiveButton = document.createElement('button');
            setInactiveButton.textContent = 'Set Inactive';
            setInactiveButton.className = 'btn btn-secondary btn-sm';
            setInactiveButton.disabled = (supervisor.accountStatus === 'Inactive');
            setInactiveButton.title = 'Set account to Inactive';
            setInactiveButton.addEventListener('click', () => window.updateSupervisorAccountStatus(supervisor.id, 'Inactive'));
            accountStatusActionsCell.appendChild(setInactiveButton);

            // --- Approval Status Actions (Approve/Reject Buttons) ---
            const approvalStatusActionsCell = row.insertCell();
            approvalStatusActionsCell.classList.add('text-nowrap');

            const approveButton = document.createElement('button');
            approveButton.textContent = 'Approve';
            approveButton.className = 'btn btn-primary btn-sm me-1'; 
            approveButton.disabled = (supervisor.approvalStatus === 'Approved'); 
            approveButton.title = (supervisor.approvalStatus === 'Approved') ? 'Application is already approved' : 'Approve this application';
            approveButton.addEventListener('click', () => window.updateSupervisorApprovalStatus(supervisor.id, 'Approved'));
            approvalStatusActionsCell.appendChild(approveButton);

            const rejectButton = document.createElement('button');
            rejectButton.textContent = 'Reject';
            rejectButton.className = 'btn btn-danger btn-sm';
            rejectButton.disabled = (supervisor.approvalStatus === 'Rejected'); 
            rejectButton.title = (supervisor.approvalStatus === 'Rejected') ? 'Application is already rejected' : 'Reject this application';
            rejectButton.addEventListener('click', () => window.updateSupervisorApprovalStatus(supervisor.id, 'Rejected'));
            approvalStatusActionsCell.appendChild(rejectButton);
        });
        console.log("Finished populating supervisor table rows.");
    }

    // Expose update functions to the global scope for button onclicks
    window.updateSupervisorAccountStatus = function(supervisorId, newAccountStatus) {
        console.log(`updateSupervisorAccountStatus called for ID: ${supervisorId}, New Status: ${newAccountStatus}`);
        const supervisorIndex = supervisors.findIndex(s => s.id === supervisorId);
        if (supervisorIndex !== -1) {
            if (newAccountStatus === 'Active' && supervisors[supervisorIndex].approvalStatus !== 'Approved') {
                alert('Supervisor must be "Approved" before their account can be set to "Active".');
                return;
            }
            supervisors[supervisorIndex].accountStatus = newAccountStatus;
            populateSupervisorAccountsTable(supervisors);
            updateSupervisorDashboardCounts(supervisors);
            // updateDashboardStats(); // Your general dashboard update function if needed
        } else {
            console.error(`Supervisor with ID ${supervisorId} not found for account status update.`);
        }
    }

    window.updateSupervisorApprovalStatus = function(supervisorId, newApprovalStatus) {
        console.log(`updateSupervisorApprovalStatus called for ID: ${supervisorId}, New Status: ${newApprovalStatus}`);
        const supervisorIndex = supervisors.findIndex(s => s.id === supervisorId);
        if (supervisorIndex !== -1) {
            supervisors[supervisorIndex].approvalStatus = newApprovalStatus;
            if (newApprovalStatus === "Rejected" || newApprovalStatus === "Pending") {
                supervisors[supervisorIndex].accountStatus = "Inactive";
            }
            populateSupervisorAccountsTable(supervisors);
            updateSupervisorDashboardCounts(supervisors);
            // updateDashboardStats(); // Your general dashboard update function if needed
        } else {
            console.error(`Supervisor with ID ${supervisorId} not found for approval status update.`);
        }
    }

    function updateSupervisorDashboardCounts(supervisorList) {
        // console.log("updateSupervisorDashboardCounts called."); // Can be verbose
        const activeCount = supervisorList.filter(s => s.accountStatus === "Active" && s.approvalStatus === "Approved").length;
        const pendingCount = supervisorList.filter(s => s.approvalStatus === "Pending").length;

        const activeElement = document.getElementById("activeSupervisorsDashboard");
        const pendingElement = document.getElementById("pendingSupervisorApprovalsDashboard");

        if (activeElement) activeElement.textContent = activeCount;
        else console.warn("Element 'activeSupervisorsDashboard' not found for count update.");

        if (pendingElement) pendingElement.textContent = pendingCount;
        else console.warn("Element 'pendingSupervisorApprovalsDashboard' not found for count update.");
    }

    // Initial check for table population
    console.log("Checking initial visibility of supervisor section for table population...");
    if (supervisorSection && getComputedStyle(supervisorSection).display !== 'none') {
        console.log("Supervisor section is visible on initial load. Populating table.");
        populateSupervisorAccountsTable(supervisors);
    } else if (supervisorSection) {
        console.log("Supervisor section is initially hidden ('display: none'). Table will populate when section is shown (e.g., via button click).");
    }

    updateSupervisorDashboardCounts(supervisors); // Initial update for dashboard counts

}); // End of DOMContentLoaded