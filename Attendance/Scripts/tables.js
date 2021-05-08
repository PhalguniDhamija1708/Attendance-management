const loader = document.getElementById('ImLoading');


function Refresh(){
    var id = JSON.parse(localStorage.getItem("token"))['id'];
    var start = document.getElementById("start").value;
    var end = document.getElementById("end").value;
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer "+ JSON.parse(localStorage.getItem("token"))['token']);
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({
      "startDate": start,
      "endDate": end
    });
    
    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    if(start!="" || end!=""){
    displayLoading();
    fetch("https://localhost:44352/api/Display/"+id+"/Approved", requestOptions)
      .then(response => response.json())
      .then(data=>{
        hideloading();
        let li = "";
            //data.reverse();
            if(data.length>0){
                document.getElementById("internal-table").innerHTML = "";
            data.forEach(temp => {
                var str = temp.currDate.slice(0,10);
                var p = str.split("-");
                var date = new Date(p[0],p[1],p[2]);
                if(temp.leaveReason != null ){
                    li += `<tr>
                                <td>${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</td>
                                <td>-</td>
                                <td>-</td>
                                <td>${temp.leaveReason}</td>
                                <td>${temp.status}</td>
                          </tr>`;}
                else{
                    li += `<tr>
                                <td>${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</td>
                                <td>${temp.project.projectDes}</td>
                                <td>${temp.duration}</td>
                                <td>-</td>
                                <td>${temp.status}</td>
                          </tr>`;
                }
                });
            document.getElementById("IdToken").innerHTML = li;}
            else{
                document.getElementById("IdToken").innerHTML = "";
                document.getElementById("internal-table").innerHTML = "There is no approved sheet in selcted dates.";
            }
            document.getElementById("post-timesheets").reset();
    })
      .catch(error => console.log('error', error));}
    else{
        Swal.fire({
            icon: 'error',
             title: 'Oops...',
             text: 'Error occur check all field!',
             timer: 2500
           });
    }

}

function Get(){

    var id = JSON.parse(localStorage.getItem("token"))['id'];
    displayLoading();
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
        hideloading();
        let li = "";
            //data.reverse();
            data.forEach(temp => {
                var str = temp.currDate.slice(0,10);
                var p = str.split("-");
                var date = new Date(p[0],p[1],p[2]);
                if(temp.leaveReason != null ){
                    li += `<tr>
                                <td>${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</td>
                                <td>-</td>
                                <td>-</td>
                                <td>${temp.leaveReason}</td>
                                <td>${temp.status}</td>
                          </tr>`;}
                else{
                    li += `<tr>
                                <td>${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</td>
                                <td>${temp.project.projectDes}</td>
                                <td>${temp.duration}</td>
                                <td>-</td>
                                <td>${temp.status}</td>
                          </tr>`;
                }
                });
            document.getElementById("IdToken").innerHTML = li;
    }).catch(function(error) {
        alert('Looks like there was a problem: \n', error);
    })


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

function displayLoading(){
    loader.classList.add("display");
    setTimeout(()=>{
        loader.classList.remove("display");
    }, 5000);
}
 
function hideloading(){
    loader.classList.remove("display");
}