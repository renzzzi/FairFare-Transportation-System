document.addEventListener('DOMContentLoaded', function() {
    // Initialize the report section to be hidden
    const reportSection = document.getElementById('report');
    if (reportSection) {
        reportSection.style.display = 'none';
    }

    // Sample report data
    const reportsData = [
        { id: '#TS001', title: 'Incident Report - Bus 123', status: 'Unseen' },
        { id: '#TS002', title: 'Maintenance Request - Bus 456', status: 'Seen' },
        { id: '#TS003', title: 'Passenger Complaint - Trip 789', status: 'Seen' },
        { id: '#TS004', title: 'Fuel Efficiency Analysis - October', status: 'Unseen' }
    ];

    const reportsTableBody = document.querySelector('#reports-table tbody');
    if (reportsTableBody) {
        reportsData.forEach(report => {
            const row = reportsTableBody.insertRow();

            const idCell = row.insertCell();
            idCell.textContent = report.id;

            const titleCell = row.insertCell();
            titleCell.textContent = report.title;

            const statusCell = row.insertCell();
            const statusDropdown = document.createElement('select');
            statusDropdown.classList.add('form-select', 'form-select-sm');

            const unseenOption = document.createElement('option');
            unseenOption.value = 'Unseen';
            unseenOption.textContent = 'Unseen';
            statusDropdown.appendChild(unseenOption);

            const seenOption = document.createElement('option');
            seenOption.value = 'Seen';
            seenOption.textContent = 'Seen';
            statusDropdown.appendChild(seenOption);

            statusDropdown.value = report.status; 

            statusCell.appendChild(statusDropdown);
        });
    }
    //Sample Revenue
    const revenueToday = 6850;

    // Connect revenue to the dashboard
    const revenueTodayDashboardElement = document.getElementById('revenueTodayDashboard');
    if (revenueTodayDashboardElement) {
        revenueTodayDashboardElement.textContent = `₱${revenueToday.toFixed(2)}`;
    }
});