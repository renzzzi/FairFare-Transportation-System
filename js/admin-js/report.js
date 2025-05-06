document.addEventListener('DOMContentLoaded', function() {
    // Initialize the report section to be hidden
    const reportSection = document.getElementById('report');
    if (reportSection) {
        reportSection.style.display = 'none'; // This will be controlled by your main navigation logic
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

            row.insertCell().textContent = report.id;
            row.insertCell().textContent = report.title;

            const statusCell = row.insertCell();
            const statusButton = document.createElement('button');
            statusButton.classList.add('btn', 'btn-sm');

            // Function to update button appearance and text based on status
            const updateButtonAppearance = (button, currentStatus) => {
                if (currentStatus === 'Unseen') {
                    button.textContent = 'Mark as Seen';
                    button.classList.remove('btn-success');
                    button.classList.add('btn-warning');
                } else {
                    button.textContent = 'Mark as Unseen';
                    button.classList.remove('btn-warning');
                    button.classList.add('btn-success');
                }
            };

            updateButtonAppearance(statusButton, report.status); // Set initial appearance

            statusButton.addEventListener('click', () => {
                // Toggle status in the data array
                report.status = (report.status === 'Unseen') ? 'Seen' : 'Unseen';
                // Update the button's appearance
                updateButtonAppearance(statusButton, report.status);
                console.log(`Report ${report.id} status changed to ${report.status}`);
                // In a real app, you'd likely send an update to the server here.
            });

            statusCell.appendChild(statusButton);
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
                        display: false, // The h3 is already there
                        text: 'Customer Demographics'
                    }
                }
            }
        });
    }

    // Event listener for the time range selector
    const timeRangeSelector = document.getElementById('seatsbooked-timerange');
    if (timeRangeSelector) {
        timeRangeSelector.addEventListener('change', function() {
            renderSalesRevenueChart(this.value);
        });
        // Initial render of sales chart
        renderSalesRevenueChart(timeRangeSelector.value);
    } else {
        // Fallback if selector not found, render with default
        renderSalesRevenueChart('1y');
    }


    // Initial render of demographics chart
    renderCustomerDemographicsChart();


    // Expose functions to render charts if the report section becomes visible later
    // This is useful if charts are initialized while the parent section is display:none
    // You would call these when you make the #report section visible.
    window.renderReportCharts = function() {
        if (timeRangeSelector) {
            renderSalesRevenueChart(timeRangeSelector.value);
        } else {
            renderSalesRevenueChart('1y');
        }
        renderCustomerDemographicsChart();
    };

    // Example: If you have a button to show the report section:
    // document.getElementById('showReportsButton').addEventListener('click', () => {
    //     document.getElementById('report').style.display = 'block'; // or 'flex', etc.
    //     window.renderReportCharts(); // Re-render charts when section is visible
    // });
});