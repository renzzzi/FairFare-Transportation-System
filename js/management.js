export function setupSupervisorManagement() {
    const expandButton = document.getElementById('expand-supervisors-button');
    const searchDiv = document.getElementById('supervisor-search');
    const addButton = document.getElementById('add-supervisor-button');
    const addForm = document.getElementById('add-supervisor-form');
    const removeButton = document.getElementById('remove-supervisor-button');

    expandButton.addEventListener('click', () => {
        searchDiv.style.display = 'block';
        addForm.style.display = 'block';
    });

    addButton.addEventListener('click', () => {
        const name = document.getElementById('new-supervisor-name').value;
        const password = document.getElementById('new-supervisor-password').value;
        //just a simulation of adding the data to the database
        alert(`Adding supervisor: Name=${name}, Password=${password}`);
    });

    removeButton.addEventListener('click', () => {
        // simulating remove functionality
        alert('Remove supervisor functionality');
    });
}

export function setupPassengerManagement() {
    const expandButton = document.getElementById('expand-passengers-button');
    const searchDiv = document.getElementById('passenger-search');

    expandButton.addEventListener('click', () => {
        searchDiv.style.display = 'block';
    });

    // simulate ban/unban functionality
    const passengersTable = document.getElementById('passengers-table');
    passengersTable.addEventListener('click', (event) => {
        const target = event.target;
        if (target.classList.contains('ban-button')) {
            const row = target.parentNode.parentNode;
            row.classList.toggle('banned');
            target.textContent = row.classList.contains('banned') ? 'Unban' : 'Ban';
        }
    });
}
