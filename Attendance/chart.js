var label = [];
var duration = [];

var id = JSON.parse(localStorage.getItem("token"))['id'];

fetch("https://localhost:44352/api/Attendance/" + id +"/Approved",{
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow', 
    referrerPolicy: 'no-referrer'
    }).then(resp => resp.json())
    .then(data=>{
        let li = "";
        var itr = 0;
            data.forEach(temp => {
               
                var str = temp.currDate.slice(0,10);
                var p = str.split("-");
                var date = new Date(p[0],p[1],p[2]);
                if(itr<7){
                if(temp.duration==null){ duration.push(0); label.push(1);}
                else{ duration.push(temp.duration); label.push(1);}}
                  itr += 1;
                });
            console.log(label);
            console.log(duration);
    }).catch(function(error) {
      alert('Looks like there was a problem: \n', error);
  })



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