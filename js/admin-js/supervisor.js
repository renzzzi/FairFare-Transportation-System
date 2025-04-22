document.addEventListener('DOMContentLoaded', function () {
    const dashboardSection = document.getElementById('dashboardSection');
    const tripHistorySection = document.getElementById('tripHistorySection'); 
    const manageTripsSection = document.getElementById('manageTripsSection');
    const manageBookingsSection = document.getElementById('manageBookingsSection');
    const salesReportSection = document.getElementById('salesReportSection');
    const dashboardButton = document.getElementById('dashboardButton');
    const manageTripsButton = document.getElementById('manageTripsButton');
    const manageBookingsButton = document.getElementById('manageBookingsButton');
    const salesReportButton = document.getElementById('salesReportButton');
    const createTripForm = document.getElementById('createTripForm');
    const searchTripInput = document.getElementById('searchTrip');
    const toggleSidebarButton = document.getElementById('toggleSidebar');
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('mainContent');
    const statusModal = document.getElementById('statusModal');
    const newStatusSelect = document.getElementById('newStatus');
    const updateStatusForm = document.getElementById('updateStatusForm');
    const availableResourcesButton = document.getElementById('availableResourcesButton');
    const availableResourcesSection = document.getElementById('availableResourcesSection');
    const assignBusSelect = document.getElementById('assignBus');
    const assignDriverSelect = document.getElementById('assignDriver');
    const trips = [
        {
            id: 1,
            from: 'Zamboanga',
            to: 'Ipil',
            date: '2024-07-20',
            time: '08:00 AM',
            bus: 'RTW-123',
            driver: 'Driver 1',
            status: 'Pending',
            bookings: []
        },
        {
            id: 2,
            from: 'Pagadian',
            to: 'Zamboanga',
            date: '2024-07-21',
            time: '10:00 AM',
            bus: 'ABC-456',
            driver: 'Driver 2',
            status: 'Scheduled',
            bookings: [
                {
                    bookingId: 101,
                    passengerName: 'Juan Dela Cruz',
                    email: 'juan@example.com',
                    phone: '09123456789',
                    seatNumber: 'A1',
                    bookingDate: '2024-07-15',
                    status: 'Pending'
                },
                {
                    bookingId: 102,
                    passengerName: 'Maria Santos',
                    email: 'maria@example.com',
                    phone: '09987654321',
                    seatNumber: 'B2',
                    bookingDate: '2024-07-15',
                    status: 'Pending'
                }
            ]
        },
        {
            id: 3,
            from: 'Ipil',
            to: 'Pagadian',
            date: '2024-07-22',
            time: '01:00 PM',
            bus: 'XYZ-789',
            driver: 'Driver 3',
            status: 'Departed',
            bookings: [
                {
                    bookingId: 103,
                    passengerName: 'John Smith',
                    email: 'john@example.com',
                    phone: '09151234567',
                    seatNumber: 'C3',
                    bookingDate: '2024-07-16',
                    status: 'Accepted'
                }
            ]
        },
        {
            id: 4,
            from: 'Zamboanga',
            to: 'Manila',
            date: '2024-07-23',
            time: '05:00 PM',
            bus: 'MNL-001',
            driver: ' Driver 4',
            status: 'Completed',
            bookings: []
        },
        {
            id: 5,
            from: 'Manila',
            to: 'Zamboanga',
            date: '2024-07-24',
            time: '09:00 AM',
            bus: 'MNL-002',
            driver: 'Driver 5',
            status: 'Canceled',
            bookings: []
        }
    ];
    

    
    let tripIdCounter = trips.length + 1;
    let bookingIdCounter = 104;
    let expandedTripId = null; // Track the expanded trip
    let chartInstance = null;
    //Initial display
    if (dashboardSection) {
        dashboardSection.style.display = 'block';
    }
    if (manageTripsSection) {
        manageTripsSection.style.display = 'none';
    }
    if (manageBookingsSection) {
        manageBookingsSection.style.display = 'none';
    }
    if (salesReportSection) {
        salesReportSection.style.display = 'none';
    }
    // Event Listeners for switching sections
    if (dashboardButton) {
        dashboardButton.addEventListener('click', () => {
            if (dashboardSection) dashboardSection.style.display = 'block';
            if (manageTripsSection) manageTripsSection.style.display = 'none';
            if (manageBookingsSection) manageBookingsSection.style.display = 'none';
            if (salesReportSection) salesReportSection.style.display = 'none';
            updateDashboardStats();
        });
    }
    if (manageTripsButton) {
        manageTripsButton.addEventListener('click', () => {
            if (dashboardSection) dashboardSection.style.display = 'none';
            if (manageTripsSection) manageTripsSection.style.display = 'block';
            if (manageBookingsSection) manageBookingsSection.style.display = 'none';
            if (salesReportSection) salesReportSection.style.display = 'none';
            renderManageTripsTable();
        });
    }
    if (manageBookingsButton) {
        manageBookingsButton.addEventListener('click', () => {
            if (dashboardSection) dashboardSection.style.display = 'none';
            if (manageTripsSection) manageTripsSection.style.display = 'none';
            if (manageBookingsSection) manageBookingsSection.style.display = 'block';
            if (salesReportSection) salesReportSection.style.display = 'none';
            renderBookingsTable();
        });
    }
    if (salesReportButton) {
        salesReportButton.addEventListener('click', () => {
            if (dashboardSection) dashboardSection.style.display = 'none';
            if (manageTripsSection) manageTripsSection.style.display = 'none';
            if (manageBookingsSection) manageBookingsSection.style.display = 'none';
            if (salesReportSection) salesReportSection.style.display = 'block';
            renderSalesReport();
        });
    }
    if (availableResourcesButton) {
        availableResourcesButton.addEventListener('click', () => {
            // Hide other sections
            if (dashboardSection) dashboardSection.style.display = 'none';
            if (manageTripsSection) manageTripsSection.style.display = 'none';
            if (manageBookingsSection) manageBookingsSection.style.display = 'none';
            if (salesReportSection) salesReportSection.style.display = 'none';
            
            // Show the Available Resources section
            availableResourcesSection.style.display = 'block';
        });
    }

    
    // Event listener for form submission
    if (createTripForm) {
        createTripForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const from = document.getElementById('from').value;
            const to = document.getElementById('to').value;
            const date = document.getElementById('date').value;
            const time = document.getElementById('time').value;
            const bus = document.getElementById('assignBus').value;
            const driver = document.getElementById('assignDriver').value;
            const addResourceForm = document.getElementById('addResourceForm');
            const resourceTableBody = document.querySelector('#resourceTable tbody');
            if (!from || !to || !date || !time || !bus || !driver) {
                alert('Please fill in all the fields.');
                return;
            }
            const newTrip = {
                id: tripIdCounter++,
                from,
                to,
                date,
                time,
                bus,
                driver,
                status: 'Pending',
                bookings: []
            };
            trips.push(newTrip);
            renderManageTripsTable();
            updateDashboardStats();
            populateCanceledTripsHistory()
            populateCompletedTripsHistory()
            populateUpcomingTripsTableDashboard();
            populateDepartedBusesTableDashboard();
            populateCompletedTripsDashboard();
            populateCanceledTripsDashboard();
            if (statusModal) $(statusModal).modal('hide');
            createTripForm.reset();
        });
    }
    // Event listener for the search input
    if (searchTripInput) {
        searchTripInput.addEventListener('input', () => {
            const searchTerm = searchTripInput.value.toLowerCase();
            renderManageTripsTable(searchTerm);
        });
    }
    if (toggleSidebarButton) {
        toggleSidebarButton.addEventListener('click', () => {
            sidebar.classList.toggle('collapsed');
            mainContent.classList.toggle('collapsed');
        });
    }
    if (updateStatusForm) {
        updateStatusForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const newStatus = newStatusSelect.value;
            if (currentTripIdForStatusUpdate !== null) {
                const tripIndex = trips.findIndex(trip => trip.id === currentTripIdForStatusUpdate);
                if (tripIndex !== -1) {
                    trips[tripIndex].status = newStatus;
                    renderManageTripsTable();
                    updateDashboardStats();
                    populateCanceledTripsHistory()
                    populateCompletedTripsHistory()
                    populateUpcomingTripsTableDashboard();
                    populateDepartedBusesTableDashboard();
                    populateCompletedTripsDashboard();
                    populateCanceledTripsDashboard();
                }
                currentTripIdForStatusUpdate = null;
            }
            if (statusModal) $(statusModal).modal('hide');
        });
    }

    function updateDashboardStats() {
        const totalTrips = trips.length;
        const activeDrivers = new Set(trips.filter(trip => trip.status === "Departed" && trip.driver).map(trip => trip.driver)).size;
        const pendingApprovals = trips.filter(trip => trip.status === "Pending").length;
        const deployedBusesCount = trips.filter(trip => trip.status === "Departed").length;
        document.getElementById("totalTripsDashboard").textContent = totalTrips;
        document.getElementById("activeDriversDashboard").textContent = activeDrivers;
        document.getElementById("pendingApprovalsDashboard").textContent = pendingApprovals;
        document.getElementById("deployedBusesDashboard").textContent = deployedBusesCount;
    }

    const buses = [];
    const drivers = [];

    const resourceTableBody = document.querySelector('#resourceTable tbody');
    const busSelect = document.getElementById('assignBus');
    const driverSelect = document.getElementById('assignDriver');

    function initializeResourcesFromTrips() {
        const busSet = new Set();
        const driverSet = new Set();

        trips.forEach(trip => {
            if (trip.bus) busSet.add(trip.bus);
            if (trip.driver) driverSet.add(trip.driver);
        });

        let count = 1;

        // Populate both arrays and table
        busSet.forEach(bus => {
            buses.push(bus);
        });

        driverSet.forEach(driver => {
            drivers.push(driver);
        });

        // Render initial rows in the resource table
        buses.forEach((bus, index) => {
            const driver = drivers[index] || '';
            const row = resourceTableBody.insertRow();
            row.insertCell().textContent = count++;
            row.insertCell().textContent = bus;
            row.insertCell().textContent = driver;

            // Add Edit button
            const editCell = row.insertCell();
            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.className = 'btn btn-sm btn-warning';
            editButton.addEventListener('click', () => editResource(bus, driver, row));
            editCell.appendChild(editButton);

            // Add Remove button
            const removeCell = row.insertCell();
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.className = 'btn btn-sm btn-danger ml-1';
            removeButton.addEventListener('click', () => removeResource(bus, row));
            removeCell.appendChild(removeButton);
        });

        // Then render dropdowns
        renderResourceDropdowns();
    }

    // Function to render options in the Manage Trips dropdowns
    function renderResourceDropdowns() {
        // Clear existing options
        busSelect.innerHTML = '';
        driverSelect.innerHTML = '';

        busSelect.innerHTML = '<option value="" disabled selected>Select Bus</option>';
        driverSelect.innerHTML = '<option value="" disabled selected>Select Driver</option>';

        buses.forEach(bus => {
            const busOption = document.createElement('option');
            busOption.value = bus;
            busOption.textContent = bus;
            busSelect.appendChild(busOption);
        });

        // Add each driver as an option in the driver dropdown
        drivers.forEach(driver => {
            const driverOption = document.createElement('option');
            driverOption.value = driver;
            driverOption.textContent = driver;
            driverSelect.appendChild(driverOption);
        });
    }

    function removeResource(bus, row) {
        const busIndex = buses.indexOf(bus);
        if (busIndex !== -1) {
            buses.splice(busIndex, 1);
            drivers.splice(busIndex, 1);
        }
    
        // Remove the row from the table
        row.remove();
    
        // Update the dropdowns and table after removal
        renderResourceDropdowns();  
    }
    

    function editResource(bus, driver, row) {
        const newBus = prompt("Enter new bus name:", bus);
        const newDriver = prompt("Enter new driver name:", driver);

        if (newBus && newDriver) {
            const busIndex = buses.indexOf(bus);
            buses[busIndex] = newBus;

            const driverIndex = drivers.indexOf(driver);
            drivers[driverIndex] = newDriver;

            row.cells[1].textContent = newBus;
            row.cells[2].textContent = newDriver;

            renderResourceDropdowns();
        }
    }
    initializeResourcesFromTrips();

// Populates the Departed Trips table in the Dashboard.
    function populateDepartedBusesTableDashboard() {
        const tableBody = document.querySelector("#deployedBusesTableDashboard tbody");
        if (!tableBody) return;
        tableBody.innerHTML = '';
        const deployedTrips = trips.filter(trip => trip.status === "Departed");
        deployedTrips.forEach((trip) => {
            const row = tableBody.insertRow();
            row.insertCell().textContent = trip.bus;
            row.insertCell().textContent = trip.from;
            row.insertCell().textContent = trip.to;
            row.insertCell().textContent = trip.driver;
            row.insertCell().textContent = trip.time;
            const statusWordCell = row.insertCell();
            statusWordCell.textContent = trip.status;
            statusWordCell.className = 'status';
            // Monitor button
            const bookingsCell = row.insertCell();
            const monitorButton = document.createElement('button');
            monitorButton.className = 'btn btn-info btn-sm monitorBookingBtn';
            monitorButton.textContent = 'Monitor';
            monitorButton.dataset.id = trip.id;
            monitorButton.addEventListener('click', (event) => {
                toggleBookingDisplay(event, trip.id);
            });
            bookingsCell.appendChild(monitorButton);
            // Status Dropdown
            const statusCell = row.insertCell();
            const statusDropdown = document.createElement('select');
            statusDropdown.className = 'form-control form-control-sm updateStatusDropdownDashboard status-dropdown';
            statusDropdown.dataset.id = trip.id;
            const statuses = ["Pending", "Scheduled", "Delayed", "Departed", "Completed", "Canceled"];
            statuses.forEach(status => {
                const option = document.createElement('option');
                option.value = status;
                option.textContent = status;
                if (trip.status === status) {
                    option.selected = true;
                }
                statusDropdown.appendChild(option);
            });
            statusDropdown.addEventListener('change', () => {
                updateTripStatus(trip.id, statusDropdown.value);
            });
            statusCell.appendChild(statusDropdown);
        });
    }
    // Populates the Upcoming Trips table in the Dashboard.

    function populateUpcomingTripsTableDashboard() {
        const tableBody = document.querySelector("#dashboardTripTable tbody");
        if (!tableBody) return;
        tableBody.innerHTML = '';
        const upcomingTrips = trips.filter(trip =>
            trip.status === "Pending" ||
            trip.status === "Scheduled" ||
            trip.status === "Delayed"
        );
        let count = 1;
        upcomingTrips.forEach((trip) => {
            const row = tableBody.insertRow();
            row.insertCell().textContent = count++;
            row.insertCell().textContent = trip.from;
            row.insertCell().textContent = trip.to;
            row.insertCell().textContent = trip.date;
            row.insertCell().textContent = trip.time;
            row.insertCell().textContent = trip.bus;
            row.insertCell().textContent = trip.driver;
            const statusWordCell = row.insertCell();
            statusWordCell.textContent = trip.status;
            statusWordCell.className = 'status';
            // Monitor button
            const bookingsCell = row.insertCell();
            const monitorButton = document.createElement('button');
            monitorButton.className = 'btn btn-info btn-sm monitorBookingBtn';
            monitorButton.textContent = 'Monitor';
            monitorButton.dataset.id = trip.id;
            monitorButton.addEventListener('click', (event) => {
                toggleBookingDisplay(event, trip.id);
            });
            bookingsCell.appendChild(monitorButton);
            // Status Dropdown
            const statusCell = row.insertCell();
            const statusDropdown = document.createElement('select');
            statusDropdown.className = 'form-control form-control-sm updateStatusDropdownDashboard status-dropdown';
            statusDropdown.dataset.id = trip.id;
            const statuses = ["Pending", "Scheduled","Delayed",  "Departed", "Completed", "Canceled"];
            statuses.forEach(status => {
                const option = document.createElement('option');
                option.value = status;
                option.textContent = status;
                if (trip.status === status) {
                    option.selected = true;
                }
                statusDropdown.appendChild(option);
            });
            statusDropdown.addEventListener('change', () => {
                updateTripStatus(trip.id, statusDropdown.value);
            });
            statusCell.appendChild(statusDropdown);
        });
    }
    // Renders the Scheduled Trips table.
    function renderManageTripsTable(searchTerm = '') {
        const tableBody = document.querySelector("#tripList tbody");
        if (!tableBody) return;
        tableBody.innerHTML = '';
        let count = 1;
    
        trips.filter(trip =>
            trip.from.toLowerCase().includes(searchTerm) ||
            trip.to.toLowerCase().includes(searchTerm) ||
            trip.date.includes(searchTerm) ||
            trip.driver.toLowerCase().includes(searchTerm) ||
            trip.bus.toLowerCase().includes(searchTerm) ||
            trip.status.toLowerCase().includes(searchTerm)
        ).forEach((trip) => {
            const row = tableBody.insertRow();
            row.dataset.index = count - 1;
            row.insertCell().textContent = count++;
            row.insertCell().textContent = trip.from;
            row.insertCell().textContent = trip.to;
            row.insertCell().textContent = trip.date;
            row.insertCell().textContent = trip.time;
            row.insertCell().textContent = trip.bus;
            row.insertCell().textContent = trip.driver;
    
            const statusWordCell = row.insertCell();
            statusWordCell.textContent = trip.status;
            statusWordCell.className = 'status';
    
            const bookingsCell = row.insertCell();
            const monitorButton = document.createElement('button');
            monitorButton.className = 'btn btn-info btn-sm monitorBookingBtn';
            monitorButton.textContent = 'Monitor';
            monitorButton.dataset.id = trip.id;
            monitorButton.addEventListener('click', (event) => {
                toggleBookingDisplay(event, trip.id);
            });
            bookingsCell.appendChild(monitorButton);
    
            const actionsCell = row.insertCell();
    
            // Status Dropdown
            const statusDropdown = document.createElement('select');
            statusDropdown.className = 'form-control form-control-sm updateStatusDropdownDashboard status-dropdown mb-1';
            statusDropdown.dataset.id = trip.id;
    
            const statuses = ["Pending", "Scheduled", "Delayed", "Departed",  "Completed", "Canceled"];
            statuses.forEach(status => {
                const option = document.createElement('option');
                option.value = status;
                option.textContent = status;
                if (trip.status === status) {
                    option.selected = true;
                }
                statusDropdown.appendChild(option);
            });
    
            statusDropdown.addEventListener('change', () => {
                updateTripStatus(trip.id, statusDropdown.value);
            });
    
            actionsCell.appendChild(statusDropdown);
    
            // Delete Button
            const deleteButton = document.createElement('button');
            deleteButton.className = 'btn btn-danger btn-sm deleteTrip';
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => {
                deleteTrip(trip.id);
            });
            actionsCell.appendChild(deleteButton);
        });
    }
// Populates the Completed Trips History table.
function populateCompletedTripsHistory() {
    const tableBody = document.querySelector("#completedHistoryTable tbody");
    if (!tableBody) return;
    tableBody.innerHTML = '';
    let count = 1;
    const completedTrips = trips.filter(trip => trip.status === "Completed");
    if (completedTrips.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="7" class="text-center">No completed trips.</td></tr>';
    } else {
        completedTrips.forEach(trip => {
            const row = tableBody.insertRow();
            row.insertCell().textContent = count++;
            row.insertCell().textContent = trip.from;
            row.insertCell().textContent = trip.to;
            row.insertCell().textContent = trip.date;
            row.insertCell().textContent = trip.time;
            row.insertCell().textContent = trip.bus;
            row.insertCell().textContent = trip.driver;
            const statusCell = row.insertCell();
            const statusDropdown = document.createElement('select');
            statusDropdown.className = 'form-control form-control-sm updateStatusDropdownDashboard status-dropdown';
            statusDropdown.dataset.id = trip.id;
            const statuses = ["Pending", "Scheduled","Delayed",  "Departed", "Completed", "Canceled"];
            statuses.forEach(status => {
                const option = document.createElement('option');
                option.value = status;
                option.textContent = status;
                if (trip.status === status) {
                    option.selected = true;
                }
                statusDropdown.appendChild(option);
            });
            statusDropdown.addEventListener('change', () => {
                updateTripStatus(trip.id, statusDropdown.value);
            });
            statusCell.appendChild(statusDropdown);
        });
    }
}

//Populates the Canceled Trips History table.
function populateCanceledTripsHistory() {
    const tableBody = document.querySelector("#canceledHistoryTable tbody");
    if (!tableBody) return;
    tableBody.innerHTML = '';
    let count = 1;
    const canceledTrips = trips.filter(trip => trip.status === "Canceled");
    if (canceledTrips.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="7" class="text-center">No canceled trips.</td></tr>';
    } else {
        canceledTrips.forEach(trip => {
            const row = tableBody.insertRow();
            row.insertCell().textContent = count++;
            row.insertCell().textContent = trip.from;
            row.insertCell().textContent = trip.to;
            row.insertCell().textContent = trip.date;
            row.insertCell().textContent = trip.time;
            row.insertCell().textContent = trip.bus;
            row.insertCell().textContent = trip.driver;
            const statusCell = row.insertCell();
            const statusDropdown = document.createElement('select');
            statusDropdown.className = 'form-control form-control-sm updateStatusDropdownDashboard status-dropdown';
            statusDropdown.dataset.id = trip.id;
            const statuses = ["Pending", "Scheduled","Delayed",  "Departed", "Completed", "Canceled"];
            statuses.forEach(status => {
                const option = document.createElement('option');
                option.value = status;
                option.textContent = status;
                if (trip.status === status) {
                    option.selected = true;
                }
                statusDropdown.appendChild(option);
            });
            statusDropdown.addEventListener('change', () => {
                updateTripStatus(trip.id, statusDropdown.value);
            });
            statusCell.appendChild(statusDropdown);
        });
    }
}

    

    //Populates the Completed Trips table in the Dashboard.
    function populateCompletedTripsDashboard() {
        const tableBody = document.querySelector("#dashboardCompletedTripsTable tbody");
        if (!tableBody) return;
        tableBody.innerHTML = '';
        let count = 1;
        const completedTrips = trips.filter(trip => trip.status === "Completed");
        completedTrips.forEach(trip => {
            const row = tableBody.insertRow();
            row.insertCell().textContent = count++;
            row.insertCell().textContent = trip.from;
            row.insertCell().textContent = trip.to;
            row.insertCell().textContent = trip.date;
            row.insertCell().textContent = trip.time;
            row.insertCell().textContent = trip.bus;
            row.insertCell().textContent = trip.driver;
            const statusCell = row.insertCell();
            const statusDropdown = document.createElement('select');
            statusDropdown.className = 'form-control form-control-sm updateStatusDropdownDashboard status-dropdown';
            statusDropdown.dataset.id = trip.id;
            const statuses = ["Pending", "Scheduled","Delayed",  "Departed", "Completed", "Canceled"];
            statuses.forEach(status => {
                const option = document.createElement('option');
                option.value = status;
                option.textContent = status;
                if (trip.status === status) {
                    option.selected = true;
                }
                statusDropdown.appendChild(option);
            });
            statusDropdown.addEventListener('change', () => {
                updateTripStatus(trip.id, statusDropdown.value);
            });
            statusCell.appendChild(statusDropdown);
        });
    }
    //Populates the Canceled Trips table in the Dashboard.
    function populateCanceledTripsDashboard() {
        const tableBody = document.querySelector("#dashboardCanceledTripsTable tbody");
        if (!tableBody) return;
        tableBody.innerHTML = '';
        let count = 1;
        const canceledTrips = trips.filter(trip => trip.status === "Canceled");
        canceledTrips.forEach(trip => {
            const row = tableBody.insertRow();
            row.insertCell().textContent = count++;
            row.insertCell().textContent = trip.from;
            row.insertCell().textContent = trip.to;
            row.insertCell().textContent = trip.date;
            row.insertCell().textContent = trip.time;
            row.insertCell().textContent = trip.bus;
            row.insertCell().textContent = trip.driver;
            const statusCell = row.insertCell();
            const statusDropdown = document.createElement('select');
            statusDropdown.className = 'form-control form-control-sm updateStatusDropdownDashboard status-dropdown';
            statusDropdown.dataset.id = trip.id;
            const statuses = ["Pending", "Scheduled","Delayed",  "Departed", "Completed", "Canceled"];
            statuses.forEach(status => {
                const option = document.createElement('option');
                option.value = status;
                option.textContent = status;
                if (trip.status === status) {
                    option.selected = true;
                }
                statusDropdown.appendChild(option);
            });
            statusDropdown.addEventListener('change', () => {
                updateTripStatus(trip.id, statusDropdown.value);
            });
            statusCell.appendChild(statusDropdown);
        });
    }
    
    function updateTripStatus(tripId, newStatus) {
        const targetTrip = trips.find(t => t.id === tripId);
        if (targetTrip) {
            targetTrip.status = newStatus;
            renderManageTripsTable();
            populateUpcomingTripsTableDashboard();
            populateDepartedBusesTableDashboard();
            updateDashboardStats();
            populateCanceledTripsHistory()
            populateCompletedTripsHistory()
            populateCompletedTripsDashboard();
            populateCanceledTripsDashboard();
        }
    }

    function deleteTrip(tripId) {
        const indexToDelete = trips.findIndex((trip) => trip.id === tripId);
        if (indexToDelete !== -1) {
            trips.splice(indexToDelete, 1);
            renderManageTripsTable();
            populateUpcomingTripsTableDashboard();
            populateDepartedBusesTableDashboard();
            updateDashboardStats();
            populateCanceledTripsHistory()
            populateCompletedTripsHistory()
            populateCompletedTripsDashboard();
            populateCanceledTripsDashboard();
        }
    }
    function toggleBookingDisplay(event, tripId) {
        const clickedButton = event.target;
        const row = clickedButton.closest('tr');
        let bookingRow = row.nextElementSibling; // Check if booking row exists
        if (expandedTripId === tripId) {
            if (bookingRow && bookingRow.classList.contains('booking-info-row')) {
                bookingRow.remove();
            }
            expandedTripId = null;
            clickedButton.textContent = 'Monitor';
        } else {
            if (expandedTripId !== null) {
                const previousExpandedButton = document.querySelector(`[data-id="${expandedTripId}"]`);
                if (previousExpandedButton) {
                    const previousExpandedRow = previousExpandedButton.closest('tr').nextElementSibling;
                    if (previousExpandedRow && previousExpandedRow.classList.contains('booking-info-row')) {
                        previousExpandedRow.remove();
                        previousExpandedButton.textContent = 'Monitor';
                    }
                }
            }
            expandedTripId = tripId; 
            clickedButton.textContent = 'Hide'; 
            bookingRow = document.createElement('tr');
            bookingRow.classList.add('booking-info-row');
            const bookingCell = document.createElement('td');
            bookingCell.colSpan = row.cells.length;
            bookingCell.style.padding = '20px';
            const trip = trips.find(t => t.id === tripId);
            if (trip) {
                let bookingInfoHTML = `<div style="border: 1px solid #ddd; padding: 15px; border-radius: 5px; margin-top: 10px;">
                            <h4>Booking Information for Trip ${trip.id}</h4>
                            <p>Bus: ${trip.bus}</p>
                            <p>Total Bookings: ${trip.bookings.length}</p>`;
                if (trip.bookings.length > 0) {
                    bookingInfoHTML += `<table class="table table-sm table-striped mt-3">
                                    <thead>
                                        <tr>
                                            <th>Booking #</th>
                                            <th>Passenger Name</th>
                                            <th>Email</th>
                                            <th>Phone</th>
                                            <th>Seat #</th>
                                            <th>Booking Date</th>
                                            <th>Status</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>`;
                    trip.bookings.forEach(booking => {
                        bookingInfoHTML += `
                                        <tr>
                                            <td>${booking.bookingId}</td>
                                            <td>${booking.passengerName}</td>
                                            <td>${booking.email}</td>
                                            <td>${booking.phone}</td>
                                            <td>${booking.seatNumber}</td>
                                            <td>${booking.bookingDate}</td>
                                            <td><span class="badge ${booking.status === 'Accepted' ? 'badge-success' : booking.status === 'Pending' ? 'badge-warning' : 'badge-danger'}">${booking.status}</span></td>
                                            <td>
                                                <button class="btn btn-success btn-sm accept-booking-btn" data-booking-id="${booking.bookingId}">Accept</button>
                                                <button class="btn btn-danger btn-sm reject-booking-btn" data-booking-id="${booking.bookingId}">Reject</button>
                                            </td>
                                        </tr>
                                        `;
                    });
                    bookingInfoHTML += `</tbody></table>`;
                } else {
                    bookingInfoHTML += `<p>No bookings for this trip yet.</p>`;
                }
                bookingInfoHTML += `</div>`;
                bookingCell.innerHTML = bookingInfoHTML;
            } else {
                bookingCell.innerHTML = `<div class="alert alert-danger">Trip information not found.</div>`;
            }
            bookingRow.appendChild(bookingCell);
            row.parentNode.insertBefore(bookingRow, row.nextSibling);
            // Add event listeners to the dynamically created buttons
            const acceptButtons = bookingRow.querySelectorAll('.accept-booking-btn');
            const rejectButtons = bookingRow.querySelectorAll('.reject-booking-btn');
            acceptButtons.forEach(button => {
                button.addEventListener('click', (event) => {
                    const bookingId = parseInt(event.target.dataset.bookingId);
                    acceptBooking(tripId, bookingId);
                });
            });
            rejectButtons.forEach(button => {
                button.addEventListener('click', (event) => {
                    const bookingId = parseInt(event.target.dataset.bookingId);
                    rejectBooking(tripId, bookingId);
                });
            });
        }
    }
    function acceptBooking(tripId, bookingId) {
        const trip = trips.find(t => t.id === tripId);
        if (trip) {
            const booking = trip.bookings.find(b => b.bookingId === bookingId);
            if (booking) {
                booking.status = 'Accepted';
                renderManageTripsTable(); // Re-render to update the display
                renderBookingsTable();
                updateDashboardStats(); //update
            }
        }
    }
    function rejectBooking(tripId, bookingId) {
        const trip = trips.find(t => t.id === tripId);
        if (trip) {
            const booking = trip.bookings.find(b => b.bookingId === bookingId);
            if (booking) {
                booking.status = 'Rejected';
                renderManageTripsTable(); // Re-render to update the display
                renderBookingsTable();
                updateDashboardStats();
            }
        }
    }
    function renderBookingsTable() {
        const bookingsTableBody = document.querySelector('#manageBookingsTable tbody');
        if (!bookingsTableBody) return;
    
        bookingsTableBody.innerHTML = '';
        let bookingNumber = 1; // fallback for Booking ID
    
        trips.forEach(trip => {
            trip.bookings.forEach(booking => {
                const row = bookingsTableBody.insertRow();
    
                // Booking ID
                row.insertCell().textContent = booking.id || bookingNumber++;
    
                // Trip details
                row.insertCell().textContent = trip.id;
                row.insertCell().textContent = trip.busName || trip.bus;
    
                // Passenger Info
                row.insertCell().textContent = booking.passengerName;
                row.insertCell().textContent = booking.email;
                row.insertCell().textContent = booking.phone;
                row.insertCell().textContent = booking.bookingDate;
    
                // Price
                row.insertCell().textContent = booking.price || "$100";
    
                // Status word
                const statusWordCell = row.insertCell();
                statusWordCell.textContent = booking.status;
                statusWordCell.className = 'status';
    
                // Status dropdown
                const statusCell = row.insertCell();
                const statusDropdown = document.createElement('select');
                statusDropdown.className = 'form-control form-control-sm';
    
                const statusOptions = ["Pending", "Accepted", "Rejected"];
                statusOptions.forEach(status => {
                    const option = document.createElement('option');
                    option.value = status;
                    option.textContent = status;
                    if (booking.status === status) {
                        option.selected = true;
                    }
                    statusDropdown.appendChild(option);
                });
    
                statusDropdown.addEventListener('change', () => {
                    booking.status = statusDropdown.value;
                    statusWordCell.textContent = booking.status; // Update text label
                    updateDashboardStats();
                    renderSalesReport();
                });
    
                statusCell.appendChild(statusDropdown);
            });
        });
    }
    
    

    
    function renderSalesReport() {
        const salesReportTableBody = document.querySelector('#salesReportTable tbody');
        if (!salesReportTableBody) return;
        salesReportTableBody.innerHTML = '';
        let totalRevenue = 0;
        trips.forEach(trip => {
            trip.bookings.forEach(booking => {
                if (booking.status === 'Accepted') {
                    const row = salesReportTableBody.insertRow();
                    row.insertCell().textContent = trip.id;
                    row.insertCell().textContent = booking.bookingId;
                    row.insertCell().textContent = booking.passengerName;
                    row.insertCell().textContent = "$100";
                    totalRevenue += 100; // Assuming each booking costs $100
                }
            });
        });
        document.getElementById('totalRevenue').textContent = `$${totalRevenue}`;
        //render chart
        renderChart(trips);
    }
    // Renders a chart of accepted bookings per trip.
    function renderChart(trips) {
        const ctx = document.getElementById('salesChart');
        if (!ctx) return;
        const tripLabels = trips.map(trip => `Trip ${trip.id}`);
        const acceptedBookingsPerTrip = trips.map(trip =>trip.bookings.filter(booking => booking.status=== 'Accepted').length
        );
        if (chartInstance) {
            chartInstance.destroy();
        }
        chartInstance = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: tripLabels,
                datasets: [{
                    label: '# of Accepted Bookings',
                    data: acceptedBookingsPerTrip,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Accepted Bookings per Trip',
                        font: {
                            size: 16
                        }
                    },
                    legend: {
                        position: 'bottom'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    // Renders the section for Available Buses and Drivers.
    const resources = [];

    document.getElementById('addResourceForm').addEventListener('submit', function (e) {
        e.preventDefault();

        const busName = document.getElementById('busName').value.trim();
        const driverName = document.getElementById('driverName').value.trim();

        if (busName && driverName) {
            resources.push({ busName, driverName });
            renderResourceTable();
            this.reset(); // Clear the form
        }
    });

    function renderResourceTable() {
        const resourceTableBody = document.querySelector('#resourceTable tbody');
        resourceTableBody.innerHTML = '';

        resources.forEach((resource, index) => {
            const row = resourceTableBody.insertRow();
            row.insertCell().textContent = index + 1;
            row.insertCell().textContent = resource.busName;
            row.insertCell().textContent = resource.driverName;
        });
    }
// Initial rendering of available buses and drivers

    // Initial call
    updateDashboardStats();
    renderManageTripsTable();
    renderBookingsTable();
    renderSalesReport();
    populateCanceledTripsHistory()
    populateCompletedTripsHistory()
    populateUpcomingTripsTableDashboard();
    populateDepartedBusesTableDashboard();
    populateCompletedTripsDashboard();
    populateCanceledTripsDashboard();
});