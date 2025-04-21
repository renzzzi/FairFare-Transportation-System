//Seats Booked Chart
const ctx1 = document.getElementById('seatsbooked-chart').getContext('2d');
const ctx2 = document.getElementById('websitevisitors-chart').getContext('2d');
const ctx3 = document.getElementById('ratings-chart').getContext('2d');


const seatsBookedChart = new Chart(ctx1, {
  type: 'line',
  data: {
    labels: ['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'],
    datasets: [{
      label: 'Seats Booked',
      data: [320, 450, 390, 520, 610, 740],
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
    labels: ['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'],
    datasets: [{
      label: 'Website Visitors',
      data: [1040, 1804, 2090, 830, 233, 1250],
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
              position: 'bottom'
          }
      }
  }
});


//Burger Icon Functionality
$(document).ready(function() {
  $('#burger-icon').click(function() {
    $('.side-panel').toggleClass('active');
  });
});

