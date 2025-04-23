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

let editingBusId = null;
function editBus(busId) {
    editingBusId = busId;
    const bus = buses.find(b => b.id === busId);
    if (bus) {
        $('#busName').val(bus.name);
        $('#busType').val(bus.type);
        $('#busCapacity').val(bus.capacity);
        $('#addBusForm button[type="submit"]').text('Update Bus');
    }
}

 let editingRouteId = null;
function editRoute(routeId) {
    editingRouteId = routeId;
    const route = routes.find(r => r.id === routeId);
    if (route) {
        $('#routeFrom').val(route.from);
        $('#routeTo').val(route.to);
        $('#routeDistance').val(route.distance);
        $('#addRouteForm button[type="submit"]').text('Update Route');
    }
}


function addBus(newBus) {
    if (editingBusId) {
        updateBus(editingBusId, newBus);
        editingBusId = null;
         $('#addBusForm button[type="submit"]').text('Save Bus');
    } else {
        newBus.id = Math.max(0, ...buses.map(b => b.id)) + 1;
        buses.push(newBus);
    }

    populateBusListTable(buses);
    updateDashboardStats();
}

function updateBus(busId, updatedBus) {
    buses = buses.map(bus => (bus.id === busId ? { ...bus, ...updatedBus } : bus));
    populateBusListTable(buses);
    updateDashboardStats();
}

function deleteBus(busId) {
    buses = buses.filter(bus => bus.id !== busId);
    populateBusListTable(buses);
    updateDashboardStats();
}

function addRoute(newRoute) {
     if (editingRouteId) {
        updateRoute(editingRouteId, newRoute);
        editingRouteId = null;
         $('#addRouteForm button[type="submit"]').text('Save Route');
    } else {
        newRoute.id = Math.max(0, ...routes.map(r => r.id)) + 1;
        routes.push(newRoute);
    }
   
    populateRouteListTable(routes);
    updateDashboardStats();
}

function updateRoute(routeId, updatedRoute) {
    routes = routes.map(route => (route.id === routeId ? { ...route, ...updatedRoute } : route));
    populateRouteListTable(routes);
    updateDashboardStats();
}

function deleteRoute(routeId) {
    routes = routes.filter(route => route.id !== routeId);
    populateRouteListTable(routes);
    updateDashboardStats();
}

function updateDashboardStats() {
    document.getElementById("totalBusesDashboard").textContent = buses.length;
    document.getElementById("activeRoutesDashboard").textContent = routes.length; // Assuming all routes are active
}

$(document).ready(function () {
    $('#bus').hide();
    $('#manage-routes').hide();

    $('#manageBusesButton').click(function () {
        $('#bus').show();
        $('#dashboardSection, #manageTripsSection, #salesReportSection, #availableResourcesSection, #manage-passengers, #passenger-requests').hide();
        populateBusListTable(buses);
    });

    $('#manageRoutesButton').click(function () {
        $('#manage-routes').show();
        $('#dashboardSection, #manageTripsSection, #salesReportSection, #availableResourcesSection, #manage-passengers, #passenger-requests, #bus').hide();
        populateRouteListTable(routes);
    });



    // --- Modal Interactions ---
    /*$('#addBusButton').click(function() {
        $('#addBusModal').modal('show');
    });*/



    $('#addBusForm').submit(function(event) { //listen to submit
        event.preventDefault();
        const busName = $('#busName').val();
        const busType = $('#busType').val();
        const busCapacity = $('#busCapacity').val();

        if (busName && busType && busCapacity) {
            const newBus = { name: busName, type: busType, capacity: parseInt(busCapacity) };
            addBus(newBus);
            $('#addBusForm')[0].reset();
        } else {
            alert('Please fill in all bus details.'); // Basic validation
        }
    });

    $('#addRouteForm').submit(function(event) {
        event.preventDefault();
        const routeFrom = $('#routeFrom').val();
        const routeTo = $('#routeTo').val();
        const routeDistance = $('#routeDistance').val();

        if (routeFrom && routeTo && routeDistance) {
            const newRoute = { from: routeFrom, to: routeTo, distance: parseInt(routeDistance) };
            addRoute(newRoute);
            $('#addRouteForm')[0].reset();
        } else {
            alert('Please fill in all route details.');
        }
    });
    updateDashboardStats();
    populateBusListTable(buses);  // Initial population of bus list
    populateRouteListTable(routes); // Initial population of route list
});