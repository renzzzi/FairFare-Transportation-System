document.addEventListener('DOMContentLoaded', function() {
    // Initialize the report section to be hidden
    const reportSection = document.getElementById('report');
    if (reportSection) {
        reportSection.style.display = 'none';
    }

    // --- Supervisor Reports Table ---
    const reportsData = [
        { id: '#TS001', title: 'Incident Report - Bus 123', status: 'Unseen' },
        { id: '#TS002', title: 'Maintenance Request - Bus 456', status: 'Seen' },
        { id: '#TS003', title: 'Passenger Complaint - Trip 789', status: 'Seen' },
        { id: '#TS004', title: 'Fuel Efficiency Analysis - October', status: 'Unseen' }
    ];

    const reportsTableBody = document.querySelector('#reports-table tbody');
    if (reportsTableBody) {
        reportsTableBody.innerHTML = ''; // Clear existing rows if any

        reportsData.forEach(report => {
            const row = reportsTableBody.insertRow();

            row.insertCell().textContent = report.id;       // Column 1: Supervisor ID
            row.insertCell().textContent = report.title;   // Column 2: Report Title

            const statusTextCell = row.insertCell();        // Column 3: Status (Text + Background)
            const actionsCell = row.insertCell();           // Column 4: Actions (Button)

            const actionButton = document.createElement('button');
            actionButton.classList.add('btn', 'btn-sm');

            // Function to update status text, its background, and button appearance
            const updateReportRowAppearance = (currentStatus) => {
                statusTextCell.textContent = currentStatus; // Set text content of the status cell

                if (currentStatus === 'Unseen') {
                    // Apply styles for 'Unseen' status
                    statusTextCell.className = 'status-cell status-unseen'; // Class for BG color and text styling
                    actionButton.textContent = 'Mark as Seen';
                    actionButton.classList.remove('btn-success', 'text-white');
                    actionButton.classList.add('btn-warning', 'text-dark'); // text-dark for better contrast on yellow
                } else { // 'Seen'
                    // Apply styles for 'Seen' status
                    statusTextCell.className = 'status-cell status-seen';   // Class for BG color and text styling
                    actionButton.textContent = 'Mark as Unseen';
                    actionButton.classList.remove('btn-warning', 'text-dark');
                    actionButton.classList.add('btn-success', 'text-white');
                }
            };

            updateReportRowAppearance(report.status); // Set initial appearance

            actionButton.addEventListener('click', () => {
                // Toggle status in the data array
                report.status = (report.status === 'Unseen') ? 'Seen' : 'Unseen';
                // Update the row's appearance
                updateReportRowAppearance(report.status);
                // console.log(`Report ${report.id} status changed to ${report.status}`);
                // In a real app, you'd likely send an update to the server here.
            });

            actionsCell.appendChild(actionButton);
        });
    }

    // --- Revenue Display (from your original code) ---
    const revenueToday = 6850;
    const revenueTodayDashboardElement = document.getElementById('revenueTodayDashboard');
    if (revenueTodayDashboardElement) {
        revenueTodayDashboardElement.textContent = `₱${revenueToday.toFixed(2)}`;
    }

    // --- Charts ---
    let salesRevenueChartInstance;
    let customerDemographicsChartInstance;

    // Function to generate sample sales data
    function getSampleSalesData(months) {
        const labels = [];
        const data = [];
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();

        for (let i = 0; i < months; i++) {
            let monthIndex = (currentMonth - (months - 1) + i);
            let year = currentYear;
            if (monthIndex < 0) {
                monthIndex += 12;
                year -=1;
            }
            labels.push(`${monthNames[monthIndex]} ${year}`);
            data.push(Math.floor(Math.random() * 50000) + 10000); // Random sales data
        }
        return { labels, data };
    }

    // Function to render/update Sales Revenue Chart
    function renderSalesRevenueChart(timeRangeValue) {
        const salesCanvas = document.getElementById('salesRevenue-chart');
        if (!salesCanvas) return;
        const ctx = salesCanvas.getContext('2d');

        let monthsToShow;
        switch (timeRangeValue) {
            case '1y': monthsToShow = 12; break;
            case '9m': monthsToShow = 9; break;
            case '6m': monthsToShow = 6; break;
            case '3m': monthsToShow = 3; break;
            default: monthsToShow = 12;
        }

        const salesData = getSampleSalesData(monthsToShow);

        if (salesRevenueChartInstance) {
            salesRevenueChartInstance.destroy();
        }

        salesRevenueChartInstance = new Chart(ctx, {
            type: 'line',
            data: {
                labels: salesData.labels,
                datasets: [{
                    label: 'Sales Revenue',
                    data: salesData.data,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1,
                    fill: false
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return '₱' + value.toLocaleString();
                            }
                        }
                    }
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                if (context.parsed.y !== null) {
                                    label += '₱' + context.parsed.y.toLocaleString();
                                }
                                return label;
                            }
                        }
                    }
                }
            }
        });
    }

    // Function to render Customer Demographics Chart
    function renderCustomerDemographicsChart() {
        const demographicsCanvas = document.getElementById('customerDemographics-chart');
        if (!demographicsCanvas) return;
        const ctx = demographicsCanvas.getContext('2d');

        const demographicsData = {
            labels: ['18-24', '25-34', '35-44', '45-54', '55+'],
            datasets: [{
                label: 'Customer Age Groups',
                data: [120, 190, 150, 100, 80], // Sample data
                backgroundColor: [
                    'rgba(255, 99, 132, 0.7)',
                    'rgba(54, 162, 235, 0.7)',
                    'rgba(255, 206, 86, 0.7)',
                    'rgba(75, 192, 192, 0.7)',
                    'rgba(153, 102, 255, 0.7)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)'
                ],
                borderWidth: 1
            }]
        };

        if (customerDemographicsChartInstance) {
            customerDemographicsChartInstance.destroy();
        }

        customerDemographicsChartInstance = new Chart(ctx, {
            type: 'doughnut', // Or 'pie'
            data: demographicsData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: false,
                        text: 'Customer Demographics'
                    }
                }
            }
        });
    }

    const timeRangeSelector = document.getElementById('seatsbooked-timerange');
    if (timeRangeSelector) {
        timeRangeSelector.addEventListener('change', function() {
            renderSalesRevenueChart(this.value);
        });
        renderSalesRevenueChart(timeRangeSelector.value); // Initial render
    } else {
        renderSalesRevenueChart('1y'); // Fallback
    }

    renderCustomerDemographicsChart(); // Initial render

    window.renderReportCharts = function() {
        if (timeRangeSelector) {
            renderSalesRevenueChart(timeRangeSelector.value);
        } else {
            renderSalesRevenueChart('1y');
        }
        renderCustomerDemographicsChart();
    };
});