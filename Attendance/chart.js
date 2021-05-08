var label = [];
var duration = [];

var id = JSON.parse(localStorage.getItem("token"))['id'];



var ctx = document.getElementById("myChart");
      var myChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['a','b','c','d','e','f','g'],
          datasets: [{
            data: duration,
            lineTension: 0,
            backgroundColor: 'transparent',
            borderColor: '#007bff',
            borderWidth: 4,
            pointBackgroundColor: '#007bff'
          }]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          },
          legend: {
            display: false,
          }
        }
      });
      
      console.log(label);
      console.log(duration);