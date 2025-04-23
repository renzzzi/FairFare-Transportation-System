let activeChart = null;

// CHARTS

// CUSTOMER SERVICE CHART
const customerServiceChart = new Chart(document.getElementById('customerServiceChart').getContext('2d'), {
    type: 'pie',
    data: {
        labels: ['Payment Issues', 'Route Inquiries', 'Technical Problems', 'Feedback', 'Other'],
        datasets: [{
            label: 'Customer Service Requests',
            data: [150, 220, 180, 100, 50],
            backgroundColor: [
                'rgba(255, 99, 132, 0.7)',
                'rgba(54, 162, 235, 0.7)',
                'rgba(255, 206, 86, 0.7)',
                'rgba(75, 192, 192, 0.7)',
                'rgba(153, 102, 255, 0.7)'
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
            },
            title: {
                display: true,
                text: 'Breakdown of Customer Service Requests'
            }
        }
    }
});

// RATINGS CHART
const ratingsChart = new Chart(document.getElementById('ratings-chart').getContext('2d'), {
    type: 'bar',
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
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

// SEATS BOOKED CHART
const seatsBookedChart = new Chart(document.getElementById('seatsbooked-chart').getContext('2d'), {
    type: 'line', // Example type, adjust as needed
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
            label: 'Seats Booked',
            data: [50, 75, 60, 90, 80, 100],
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2,
            fill: false
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

//WEBSITE VISITORS CHART
const websiteVisitorsChart = new Chart(document.getElementById('websitevisitors-chart').getContext('2d'), {
    type: 'bar', // Example type, adjust as needed
    data: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        datasets: [{
            label: 'Website Visitors',
            data: [1200, 1500, 1350, 1600],
            backgroundColor: 'rgba(54, 162, 235, 0.7)'
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
