document.addEventListener('DOMContentLoaded', () => {
    populatePassengerAccountsTable(passengers);
    updateDashboardStats();
});

let passengers = [
    { id: 1, name: "Juan Dela Cruz", email: "juan@example.com", registrationDate: "2025-01-15", accountStatus: "Active" },
    { id: 2, name: "Maria Santos", email: "maria@example.com", registrationDate: "2025-02-20", accountStatus: "Active" },
    { id: 3, name: "John Smith", email: "john@example.com", registrationDate: "2025-03-10", accountStatus: "Active" },
    { id: 4, name: "Carl Mark", email: "carl@example.com", registrationDate: "2023-01-10", accountStatus: "Inactive" },
];

function populatePassengerAccountsTable(passengerList) {
    const tableBody = document.querySelector("#passengerAccountsTable tbody");
    if (!tableBody) return;

    tableBody.innerHTML = '';

    if (passengerList.length === 0) {
        const row = tableBody.insertRow();
        const cell = row.insertCell();
        cell.textContent = 'No passenger accounts found.';
        cell.colSpan = 6; // Adjusted colspan for the new number of columns
        cell.classList.add('text-center');
        return;
    }

    passengerList.forEach(passenger => {
        const row = tableBody.insertRow();

        row.insertCell().textContent = passenger.name;
        row.insertCell().textContent = passenger.email;

        // Account Status (Text Display with Background)
        const accountStatusTextCell = row.insertCell();
        accountStatusTextCell.textContent = passenger.accountStatus;
        accountStatusTextCell.classList.add('passenger-status-cell');
        if (passenger.accountStatus === "Active") {
            accountStatusTextCell.classList.add('passenger-status-active');
        } else {
            accountStatusTextCell.classList.add('passenger-status-inactive');
        }

        row.insertCell().textContent = passenger.registrationDate;

        // Status Actions (Set Active/Inactive)
        const statusActionsCell = row.insertCell();
        statusActionsCell.classList.add('text-nowrap');

        const setActiveButton = document.createElement('button');
        setActiveButton.textContent = 'Set Active';
        setActiveButton.className = 'btn btn-success btn-sm me-1';
        setActiveButton.disabled = (passenger.accountStatus === 'Active');
        setActiveButton.addEventListener('click', () => updatePassengerAccountStatus(passenger.id, 'Active'));
        statusActionsCell.appendChild(setActiveButton);

        const setInactiveButton = document.createElement('button');
        setInactiveButton.textContent = 'Set Inactive';
        setInactiveButton.className = 'btn btn-warning btn-sm text-dark'; // No margin needed if it's the last in this cell
        setInactiveButton.disabled = (passenger.accountStatus === 'Inactive');
        setInactiveButton.addEventListener('click', () => updatePassengerAccountStatus(passenger.id, 'Inactive'));
        statusActionsCell.appendChild(setInactiveButton);

        // Modify Actions (Edit, Delete)
        const modifyActionsCell = row.insertCell();
        modifyActionsCell.classList.add('text-nowrap');

        const editButton = document.createElement('button');
        editButton.className = 'btn btn-primary btn-sm me-1';
        editButton.innerHTML = '<i class="fas fa-edit"></i> Edit';
        editButton.dataset.id = passenger.id;
        editButton.addEventListener('click', () => editPassenger(passenger.id));
        modifyActionsCell.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.className = 'btn btn-danger btn-sm';
        deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i> Delete';
        deleteButton.dataset.id = passenger.id;
        deleteButton.addEventListener('click', () => deletePassenger(passenger.id));
        modifyActionsCell.appendChild(deleteButton);
    });
}

// Updates the dashboard stats
function updateDashboardStats() {
    const totalPassengers = passengers.length;
    const activePassengers = passengers.filter(p => p.accountStatus === "Active").length;

    const totalElement = document.getElementById("totalPassengersDashboard");
    if (totalElement) totalElement.textContent = totalPassengers;

    const activeElement = document.getElementById("totalPassengerActiveDashboard");
    if (activeElement) activeElement.textContent = activePassengers;
}

// Update account status
function updatePassengerAccountStatus(passengerId, newStatus) {
    const passengerIndex = passengers.findIndex(p => p.id === passengerId);
    if (passengerIndex !== -1) {
        passengers[passengerIndex].accountStatus = newStatus;
        populatePassengerAccountsTable(passengers);
        updateDashboardStats();
    }
}

// Edit a passenger (placeholder function)
function editPassenger(passengerId) {
    const passenger = passengers.find(p => p.id === passengerId);
    if (passenger) {
        console.log(`Editing passenger:`, passenger);
        alert(`Editing passenger: ${passenger.name}\n(Implement actual edit functionality here)`);
    }
}

// Delete a passenger
function deletePassenger(passengerId) {
    if (confirm('Are you sure you want to delete this passenger?')) {
        passengers = passengers.filter(p => p.id !== passengerId);
        populatePassengerAccountsTable(passengers);
        updateDashboardStats();
    }
}