const modal = document.getElementById("chartModal");
const modalContent = document.getElementById("modalChartContent");
const modalCanvas = document.getElementById("modalChartCanvas");
const modalCtx = modalCanvas.getContext('2d');
const modalTitle = document.getElementById("modalChartTitle");
const closeButton = document.querySelector(".close-button");
const chartContainers = document.querySelectorAll(".chart");

let activeChart = null;

function createModalChart(chartId, title) {
    const originalChart = Chart.getChart(chartId);
    if (originalChart) {
        modalTitle.textContent = title;

        // Determine modal size based on chart ID
        if (chartId === 'websitevisitors-chart' || chartId === 'seatsbooked-chart') {
            modalContent.className = 'modal-content small-modal';
        } else if (chartId === 'customerServiceChart' || chartId === 'ratings-chart') {
            modalContent.className = 'modal-content large-modal';
        } else {
            modalContent.className = 'modal-content'; // Default size
        }

        if (activeChart) {
            activeChart.destroy();
        }
        activeChart = new Chart(modalCtx, {
            type: originalChart.config.type,
            data: {
                labels: [...originalChart.data.labels],
                datasets: originalChart.data.datasets.map(dataset => ({ ...dataset, data: [...dataset.data] }))
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
            }
        });
        modal.style.display = "block";
    } else {
        console.error(`Chart with ID ${chartId} not found.`);
    }
}

chartContainers.forEach(container => {
    container.addEventListener('click', () => {
        const chartId = container.querySelector('canvas').id;
        const chartTitle = container.querySelector('h3') ? container.querySelector('h3').textContent : container.querySelector('.chart-header h3').textContent;
        createModalChart(chartId, chartTitle);
    });
});

closeButton.addEventListener('click', () => {
    modal.style.display = "none";
    if (activeChart) {
        activeChart.destroy();
        activeChart = null;
    }
});

window.addEventListener('click', (event) => {
    if (event.target == modal) {
        modal.style.display = "none";
        if (activeChart) {
            activeChart.destroy();
            activeChart = null;
        }
    }
});

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

// Initialize Seats Booked chart
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

// Initialize Website Visitors chart
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
