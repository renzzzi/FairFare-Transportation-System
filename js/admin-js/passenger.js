document.addEventListener('DOMContentLoaded', () => {
    populatePassengerAccountsTable(passengers);
    updateDashboardStats(); // Initial call on page load

});

let passengers = [
    { id: 1, name: "Juan Dela Cruz", email: "juan@example.com", registrationDate: "2025-01-15", accountStatus: "Active" },
    { id: 2, name: "Maria Santos", email: "maria@example.com", registrationDate: "2025-02-20", accountStatus: "Active" },
    { id: 3, name: "John Smith", email: "john@example.com", registrationDate: "2025-03-10", accountStatus: "Active" },
    { id: 4, name: "Carl Mark", email: "carl@example.com", registrationDate: "2023-01-10", accountStatus: "Inactive" },
];

// Function to populate passenger table
function populatePassengerAccountsTable(passengerList) {
    const tableBody = document.querySelector("#passengerAccountsTable tbody");
    if (!tableBody) return;

    tableBody.innerHTML = ''; // Clear table before populating

    if (passengerList.length === 0) {
        const row = tableBody.insertRow();
        const cell = row.insertCell();
        cell.textContent = 'No passenger accounts found.';
        cell.colSpan = 5;
        cell.classList.add('text-center');
        return;
    }

    passengerList.forEach(passenger => {
        const row = tableBody.insertRow();

        row.insertCell().textContent = passenger.name;
        row.insertCell().textContent = passenger.email;

        // Account Status Dropdown
        const accountStatusCell = row.insertCell();
        const accountStatusSelect = document.createElement('select');
        accountStatusSelect.className = 'form-control form-control-sm account-status-dropdown';
        accountStatusSelect.dataset.id = passenger.id;

        ["Active", "Inactive"].forEach(status => {
            const option = document.createElement('option');
            option.value = status;
            option.textContent = status;
            if (passenger.accountStatus === status) option.selected = true;
            accountStatusSelect.appendChild(option);
        });

        accountStatusSelect.addEventListener('change', (event) => {
            updatePassengerAccountStatus(passenger.id, event.target.value);
        });

        accountStatusCell.appendChild(accountStatusSelect);

        row.insertCell().textContent = passenger.registrationDate;

        // Actions (Delete)
        const actionsCell = row.insertCell();
        const deleteButton = document.createElement('button');
        deleteButton.className = 'btn btn-danger btn-sm deletePassengerBtn';
        deleteButton.textContent = 'Delete';
        deleteButton.dataset.id = passenger.id;
        deleteButton.addEventListener('click', () => deletePassenger(passenger.id));
        actionsCell.appendChild(deleteButton);
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
    console.log(`Updating passenger ${passengerId} to ${newStatus}`);
    passengers = passengers.map(p => p.id === passengerId ? { ...p, accountStatus: newStatus } : p);
    populatePassengerAccountsTable(passengers);
    updateDashboardStats();
}

// Delete a passenger
function deletePassenger(passengerId) {
    console.log(`Deleting passenger with ID: ${passengerId}`);
    passengers = passengers.filter(p => p.id !== passengerId);
    populatePassengerAccountsTable(passengers);
    updateDashboardStats();
}
