let buses = [
    { id: 1, name: "RTW-123", type: "AC", capacity: 40 },
    { id: 2, name: "ABC-456", type: "AC", capacity: 50 },
    { id: 3, name: "XYZ-789", type: "AC", capacity: 50 },
    { id: 4, name: "MDW-001", type: "Non-AC", capacity: 50 },
    { id: 5, name: "MNL-002", type: "Non-AC", capacity: 50 },
];

let routes = [
    { id: 1, from: "Zamboanga", to: "Ipil", distance: 3949 },
    { id: 2, from: "Pagadian", to: "Zamboanga", distance: 1242 },
    { id: 3, from: "Ipil", to: "Pagadian", distance: 3212 },
    { id: 4, from: "Zamboanga", to: "Davao", distance: 2106 },
    { id: 5, from: "Cagayan de Oro ", to: "Zamboanga", distance: 4312 },
];

let editingBusId = null;
let editingRouteId = null;

function populateBusListTable(buses) {
    const tableBody = document.querySelector("#busListTable tbody");
    if (!tableBody) return;

    tableBody.innerHTML = '';

    if (buses.length === 0) {
        const row = tableBody.insertRow();
        row.insertCell().textContent = 'No buses found.';
        row.cells[0].colSpan = 5;
        row.cells[0].classList.add('text-center');
        return;
    }

    buses.forEach(bus => {
        const row = tableBody.insertRow();
        row.insertCell().textContent = bus.id;
        row.insertCell().textContent = bus.name;
        row.insertCell().textContent = bus.type;
        row.insertCell().textContent = bus.capacity;

        const actionsCell = row.insertCell();
        const editButton = document.createElement('button');
        editButton.className = 'btn btn-primary btn-sm editBusBtn';
        editButton.textContent = 'Edit';
        editButton.dataset.id = bus.id;
        editButton.addEventListener('click', () => editBus(bus.id));
        actionsCell.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.className = 'btn btn-danger btn-sm deleteBusBtn';
        deleteButton.textContent = 'Delete';
        deleteButton.dataset.id = bus.id;
        deleteButton.style.marginLeft = '5px';
        deleteButton.addEventListener('click', () => deleteBus(bus.id));
        actionsCell.appendChild(deleteButton);
    });
    updateDashboardStats();
}

function populateRouteListTable(routes) {
    const tableBody = document.querySelector("#routeListTable tbody");
    if (!tableBody) return;

    tableBody.innerHTML = '';

    if (routes.length === 0) {
        const row = tableBody.insertRow();
        row.insertCell().textContent = 'No routes found.';
        row.cells[0].colSpan = 5;
        row.cells[0].classList.add('text-center');
        return;
    }

    routes.forEach(route => {
        const row = tableBody.insertRow();
        row.insertCell().textContent = route.id;
        row.insertCell().textContent = route.from;
        row.insertCell().textContent = route.to;
        row.insertCell().textContent = route.distance;

        const actionsCell = row.insertCell();
        const editButton = document.createElement('button');
        editButton.className = 'btn btn-primary btn-sm editRouteBtn';
        editButton.textContent = 'Edit';
        editButton.dataset.id = route.id;
        editButton.addEventListener('click', () => editRoute(route.id));
        actionsCell.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.className = 'btn btn-danger btn-sm deleteRouteBtn';
        deleteButton.textContent = 'Delete';
        deleteButton.dataset.id = route.id;
        deleteButton.style.marginLeft = '5px';
        deleteButton.addEventListener('click', () => deleteRoute(route.id));
        actionsCell.appendChild(deleteButton);
    });
    updateDashboardStats();
}

// Called when "Edit" button in bus table is clicked
function editBus(busId) {
    const bus = buses.find(b => b.id === busId);
    if (bus) {
        editingBusId = busId;
        $('#busName').val(bus.name);
        $('#busType').val(bus.type);
        $('#busCapacity').val(bus.capacity);
        $('#busModalLabel').text('Edit Bus');
        $('#saveBusBtn').text('Update Bus');
        $('#busModal').modal('show');
    }
}

// Called when "Edit" button in route table is clicked
function editRoute(routeId) {
    const route = routes.find(r => r.id === routeId);
    if (route) {
        editingRouteId = routeId;
        $('#routeFrom').val(route.from);
        $('#routeTo').val(route.to);
        $('#routeDistance').val(route.distance);
        $('#routeModalLabel').text('Edit Route');
        $('#saveRouteBtn').text('Update Route');
        $('#routeModal').modal('show');
    }
}

// Handles both adding a new bus and initiating an update for an existing bus
function addBus(busData) { // busData is { name, type, capacity }
    if (editingBusId) {
        updateBus(editingBusId, busData);
    } else {
        const newBus = { ...busData, id: Math.max(0, ...buses.map(b => b.id)) + 1 };
        buses.push(newBus);
    }
    populateBusListTable(buses);
    updateDashboardStats();
}

// Updates an existing bus in the 'buses' array
function updateBus(busId, updatedBusData) {
    buses = buses.map(bus => (bus.id === busId ? { ...bus, ...updatedBusData } : bus));
    // populateBusListTable and updateDashboardStats are called by addBus
}

function deleteBus(busId) {
    if (confirm('Are you sure you want to delete this bus?')) {
        buses = buses.filter(bus => bus.id !== busId);
        populateBusListTable(buses);
        updateDashboardStats();
    }
}

// Handles both adding a new route and initiating an update for an existing route
function addRoute(routeData) { // routeData is { from, to, distance }
    if (editingRouteId) {
        updateRoute(editingRouteId, routeData);
    } else {
        const newRoute = { ...routeData, id: Math.max(0, ...routes.map(r => r.id)) + 1 };
        routes.push(newRoute);
    }
    populateRouteListTable(routes);
    updateDashboardStats();
}

// Updates an existing route in the 'routes' array
function updateRoute(routeId, updatedRouteData) {
    routes = routes.map(route => (route.id === routeId ? { ...route, ...updatedRouteData } : route));
    // populateRouteListTable and updateDashboardStats are called by addRoute
}

function deleteRoute(routeId) {
    if (confirm('Are you sure you want to delete this route?')) {
        routes = routes.filter(route => route.id !== routeId);
        populateRouteListTable(routes);
        updateDashboardStats();
    }
}

function updateDashboardStats() {
    // Ensure these elements exist in your full HTML if you're using them
    const totalBusesEl = document.getElementById("totalBusesDashboard");
    const activeRoutesEl = document.getElementById("activeRoutesDashboard");
    if (totalBusesEl) totalBusesEl.textContent = buses.length;
    if (activeRoutesEl) activeRoutesEl.textContent = routes.length;
}

$(document).ready(function () {
    $('#bus').hide();
    // $('#manage-routes').hide(); // This ID was not in the provided HTML for a section. Assume 'bus' section contains both.

    $('#manageBusesButton').click(function () {
        $('#bus').show();
        $('#dashboardSection, #manageTripsSection, #salesReportSection, #availableResourcesSection, #manage-passengers, #passenger-requests, #report').hide();
        populateBusListTable(buses);
        populateRouteListTable(routes); // Populate routes as well if they are in the same section
    });

    // If you have a separate button/section for routes:
    // $('#manageRoutesButton').click(function () {
    //     $('#manage-routes').show(); // Ensure this section ID exists
    //     $('#dashboardSection, #manageTripsSection, #salesReportSection, #availableResourcesSection, #manage-passengers, #passenger-requests, #bus, #report').hide();
    //     populateRouteListTable(routes);
    // });


    // --- Modal Interactions ---

    // Open Bus Modal for ADDING a new bus
    $('#openAddBusModalBtn').click(function() {
        editingBusId = null;
        $('#addBusForm')[0].reset();
        $('#busModalLabel').text('Add New Bus');
        $('#saveBusBtn').text('Save Bus');
        $('#busModal').modal('show');
    });

    // Open Route Modal for ADDING a new route
    $('#openAddRouteModalBtn').click(function() {
        editingRouteId = null;
        $('#addRouteForm')[0].reset();
        $('#routeModalLabel').text('Add New Route');
        $('#saveRouteBtn').text('Save Route');
        $('#routeModal').modal('show');
    });


    // Handle Bus Form Submission (for both Add and Edit)
    $('#addBusForm').submit(function(event) {
        event.preventDefault();
        const busName = $('#busName').val();
        const busType = $('#busType').val();
        const busCapacity = parseInt($('#busCapacity').val());

        if (busName && busType && !isNaN(busCapacity) && busCapacity > 0) {
            const busData = { name: busName, type: busType, capacity: busCapacity };
            addBus(busData); // This function now handles add or update logic

            $('#busModal').modal('hide');
            // Form is reset when modal is opened for "add new"
            // editingBusId is set to null when modal is opened for "add new" or after successful edit below
        } else {
            alert('Please fill in all bus details correctly (capacity must be a positive number).');
        }
    });

    // Handle Route Form Submission (for both Add and Edit)
    $('#addRouteForm').submit(function(event) {
        event.preventDefault();
        const routeFrom = $('#routeFrom').val();
        const routeTo = $('#routeTo').val();
        const routeDistance = parseInt($('#routeDistance').val());

        if (routeFrom && routeTo && !isNaN(routeDistance) && routeDistance > 0) {
            const routeData = { from: routeFrom, to: routeTo, distance: routeDistance };
            addRoute(routeData); // This function now handles add or update logic

            $('#routeModal').modal('hide');
            // Form is reset when modal is opened for "add new"
            // editingRouteId is set to null when modal is opened for "add new" or after successful edit below
        } else {
            alert('Please fill in all route details correctly (distance must be a positive number).');
        }
    });

    // Clear editing state when modals are hidden (covers cancel/close button too)
    $('#busModal').on('hidden.bs.modal', function () {
        editingBusId = null;
        $('#addBusForm')[0].reset(); // Also reset form on any close
    });

    $('#routeModal').on('hidden.bs.modal', function () {
        editingRouteId = null;
        $('#addRouteForm')[0].reset(); // Also reset form on any close
    });

    // Initial population
    updateDashboardStats();
    populateBusListTable(buses);
    populateRouteListTable(routes);
});