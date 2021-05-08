const ys=[];
const xs=[];



function get(){
    var id = JSON.parse(localStorage.getItem("token"))['id'];
    //Api return User Info.
     fetch("https://localhost:44352/api/Login/" + id,{
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
                li = data.empName;
                document.getElementById("EmpiDetails").innerHTML = li;
        }).catch(function(error) {
            alert('Looks like there was a problem: \n', error);
    })
    
    //check if the logged user is approver or not
    fetch("https://localhost:44352/api/TimeSheetRequest/" + id,{
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Authorization':"Bearer "+ JSON.parse(localStorage.getItem("token"))['token'],
            'Content-Type': 'application/json'
        },
        redirect: 'follow', 
        referrerPolicy: 'no-referrer'
        }).then(resp => resp.json())
        .then(data=>{
            if(data){
                showhide();}
        }).catch(error => alert('error', error));
}


function chartIt(myChart){
    var id = JSON.parse(localStorage.getItem("token"))['id'];

    //return data of last 5 days to render on graph.
    fetch("https://localhost:44352/api/Attendance/" + id +"/Approved",{
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Authorization':"Bearer "+ JSON.parse(localStorage.getItem("token"))['token'],
            'Content-Type': 'application/json'
        },
        redirect: 'follow', 
        referrerPolicy: 'no-referrer'
        }).then(resp => resp.json())
        .then(data=>{
            let li = "";
            var itr = 0;
                //data.reverse();
                data.forEach(temp => {
                
                    var str = temp.currDate.slice(0,10);
                    var p = str.split("-");
                    var date = new Date(p[0],p[1],p[2]);
                    if(itr<5){
                    if(temp.duration==null){ ys.push(0); xs.push(temp.currDate);}
                    else{ ys.push(temp.duration); xs.push(temp.currDate);}}
                    itr += 1;
            });
               myChart.update();
        }).catch(error => alert('error', error));


}

//bar graph on 2D plain.
var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'line',
    
    data: {
        labels:xs,
        datasets: [{
            label: 'Performance',
            data: ys,
        fills:true,
            backgroundColor: ['rgb(65,103,213,0.2)' ],
            borderColor: ['rgba(255, 99, 132, 1)'],
            borderWidth: 1
        }]
    },

});
chartIt(myChart);


function showhide()
{
    var div = document.getElementById("HideLi");
    if (div.style.display !== "none")
    {
    div.style.display = "none";
    }
    else
    {
    div.style.display = "block";
}}

function Logout(){
    localStorage.removeItem('token');
    location.replace('./login.html');
}
