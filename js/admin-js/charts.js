const ctx1 = document.getElementById('seatsbooked-chart').getContext('2d');
const ctx2 = document.getElementById('websitevisitors-chart').getContext('2d');
const ctx3 = document.getElementById('ratings-chart').getContext('2d');
const ctx4 = document.getElementById('customerServiceChart').getContext('2d');


const fullLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
var seatsBookedFullData = [810, 540, 210, 350, 723, 298, 441, 410, 225, 105, 305, 979];
var websiteVisitorsFullData = [1935, 908, 720, 640, 1001, 1034, 988, 840, 305, 299, 541, 2210];

const seatsBookedChartId = 1;
const websiteVisitorsChartId = 2;
const ratingsChartId = 3;

// Chart update function
export function updateChart(range, chartId) {
    let months;
    switch (range) {
        case '3m': months = 3; break;
        case '6m': months = 6; break;
        case '9m': months = 9; break;
        case '1y': months = 12; break;
        default: months = 12; break;
    }

    let labelSlice = fullLabels.slice(-months);
    let dataSlice;

    switch (chartId) {
        case 1:
            dataSlice = seatsBookedFullData.slice(-months);
            seatsBookedChart.data.labels = labelSlice;
            seatsBookedChart.data.datasets[0].data = dataSlice;
            seatsBookedChart.update();
            break;
        case 2:
            dataSlice = websiteVisitorsFullData.slice(-months);
            websiteVisitorsChart.data.labels = labelSlice;
            websiteVisitorsChart.data.datasets[0].data = dataSlice;
            websiteVisitorsChart.update();
            break;
        case 3:
            dataSlice = ratingsFullData.slice(-months);
            ratingsChart.data.labels = labelSlice;
            ratingsChart.data.datasets[0].data = dataSlice;
            ratingsChart.update();
            break;
        case 4:
            dataSlice = ratingsFullData.slice(-months);
            customerServiceChart.data.labels = labelSlice;
            customerServiceChart.data.datasets[0].data = dataSlice;
            customerServiceChart.update();
            break;
        default:
            dataSlice = [];
    }
}

//Seats Booked Chart
const seatsBookedChart = new Chart(ctx1, {
    type: 'line',
    data: {
        labels: fullLabels,
        datasets: [{
            label: 'Seats Booked',
            data: seatsBookedFullData,
            borderColor: 'var(--primary-color)',
            backgroundColor: 'rgba(0, 206, 225, 0.27)',
            tension: 0.3,
            fill: true,
            pointBackgroundColor: 'var(--secondary-color)',
            pointBorderColor: '#fff'
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true
            }
        },
        plugins: {
            legend: { display: false }
        }
    }
});

//Website Visitors Chart
const websiteVisitorsChart = new Chart(ctx2, {
    type: 'line',
    data: {
        labels: fullLabels,
        datasets: [{
            label: 'Website Visitors',
            data: websiteVisitorsFullData,
            borderColor: 'var(--primary-color)',
            backgroundColor: 'rgba(0, 206, 225, 0.27)',
            tension: 0.3,
            fill: true,
            pointBackgroundColor: 'var(--secondary-color)',
            pointBorderColor: '#fff'
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true
            }
        },
        plugins: {
            legend: { display: false }
        }
    }
});

//Ratings Chart
const ratingsChart = new Chart(ctx3, {
    type: 'pie',
    data: {
        labels: ['1*', '2*', '3*', '4*', '5*'],
        datasets: [{
            label: 'Ratings',
            data: [42, 140, 200, 405, 700],
            backgroundColor: [
                'rgba(255, 128, 96, 0.7)',
                'rgba(255, 187, 86, 0.7)',
                'rgba(255, 245, 100, 0.7)',
                'rgba(204, 255, 86, 0.7)',
                'rgba(84, 255, 107, 0.7)'
            ],
            borderColor: [
                'rgba(0, 0, 0, 0.51)',
            ],
            borderWidth: 0.5
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top'
            }
        }
    }
});

const customerServiceChart = new Chart(ctx4, { 
    type: 'pie',
    data: {
        labels: ['Payment Issues', 'Route Inquiries', 'Technical Problems', 'Feedback', 'Other'], // Customize these labels based on your actual categories
        datasets: [{
            label: 'Customer Service Requests',
            data: [150, 220, 180, 100, 50], // Replace these with the actual number of requests for each category
            backgroundColor: [
                'rgba(255, 99, 132, 0.7)',   // Red
                'rgba(54, 162, 235, 0.7)',   // Blue
                'rgba(255, 206, 86, 0.7)',   // Yellow
                'rgba(75, 192, 192, 0.7)',   // Green
                'rgba(153, 102, 255, 0.7)'    // Purple
                // Add more colors if you have more categories
            ],
            borderColor: [
                'rgba(0, 0, 0, 0.51)',
            ],
            borderWidth: 0.5
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        let label = context.label || '';
                        if (context.parsed !== null) {
                            label += ': ' + context.parsed + ' requests';
                        }
                        return label;
                    }
                }
            }
        }
    }
});
export function initializeCharts() {
    // Time Range for Seats Booked
    $('#seatsbooked-timerange').on('change', function () {
        const range = $(this).val();
        updateChart(range, seatsBookedChartId);
    });

    // Time Range for Website Visitors
    $('#websitevisitors-timerange').on('change', function () {
        const range = $(this).val();
        updateChart(range, websiteVisitorsChartId);
    });
}
