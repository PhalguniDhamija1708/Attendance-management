
const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
//
$(document).ready(function(){
 
    // Initialize select2
    $("#selUser").select2();
   
    // Read selected option
    $('#but_read').click(function(){
    //   var username = $('#selUser option:selected').text();
        var userid = $('#selUser').val();
        console.log(userid);
        localStorage.setItem("hsh", userid);
        LoadTable();
    });
   });



function LoadTable(){
    
    userid = localStorage.getItem('hsh');

    if(userid != "null"){
    fetch("https://localhost:44352/api/Display/" + userid ,{
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
            if(data.length > 0){
                data.forEach(temp => {
                    var str = temp.currDate.slice(0,10);
                    var p = str.split("-");
                    p[1] = p[1]-1;
                    var date = new Date(p[0],p[1],p[2]);
                    var argdate  = days[date.getDay()];
                    
                    //console.log(temp);
                    if(temp.leaveReason != null ){
                        li += `<tr>
                                    <td>${argdate}</td>
                                    <td>-</td>
                                    <td>-</td>
                                    <td>${temp.leaveReason}</td>
                                    <td>${temp.status}</td>
                                    <td><a href="#"  data-toggle="modal" data-target="#updateModal" onclick="UpdateModal('${temp.currDate}')">
                                    <i class="fa fa-edit ml-3" aria-hidden="true"></i></a>
                                    </td>
                              </tr>`;}
                    else{
                        li += `<tr>
                                    <td>${argdate}</td>
                                    <td>${temp.project.projectDes}</td>
                                    <td>${temp.duration}</td>
                                    <td>-</td>
                                    <td>${temp.status}</td>
                                    <td><a href="#"  data-toggle="modal" data-target="#updateModal" onclick="UpdateModal('${temp.currDate}')">
                                    <i class="fa fa-edit ml-3" aria-hidden="true"></i></a>
                                    </td>
                              </tr>`;;
                    }
                     // console.log(li);  
                    });
                document.getElementById("CurrentSheet").innerHTML = li;
                }
        })
    }
    $('#selUser').prop('selectedIndex',0);
}

function Get(){

    var id = JSON.parse(localStorage.getItem("token"))['id'];


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

    fetch("https://localhost:44352/api/Project" ,{
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
        //console.log(data);
        let li = '<option value="null">Choose One</option>';
            data.forEach(element => {
                li += `<option value="${element.projectId}">${element.projectDes}</option>`;
               // console.log(li);
            });
            document.getElementById("project-m").innerHTML = li;
            //console.log(document.getElementById("project"));
    }).catch(function(error) {
        alert('Looks like there was a problem: \n', error);
    })

    fetch("https://localhost:44352/api/InProgress/"+id ,{
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
        //console.log(data);
        let li = '<option value="null">Choose One</option>';
            data.forEach(element => {
                li += `<option value="${element.hashId}">${element.hashId}</option>`;
               // console.log(li);
            });
            document.getElementById("selUser").innerHTML = li;
            //console.log(document.getElementById("project"));
    }).catch(function(error) {
        alert('Looks like there was a problem: \n', error);
    })

    fetch("https://localhost:44352/api/TimeSheetRequest/" + id,{
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
        if(data.length>0){
            showhide();
        }
    }).catch(function(error) {
        alert('Looks like there was a problem: \n', error);
    })

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

function UpdateModal(date){
    document.getElementById("UpdateTitleModal").innerHTML = `Update for ${date.slice(0,10)}`;
    document.getElementById("updateModal").value = date;
}

function Put(){
    var id = JSON.parse(localStorage.getItem("token"))['id'];
    var date = document.getElementById("updateModal").value;
    var project = document.getElementById("project-m").value;
    var duration = document.getElementById("duration-m").value;
    var leaveReason = document.getElementById("leaveReason-m").value;
    Holidays = false;
    Status = "In Progress";
    
    if(leaveReason == ""){ leaveReason = null; }
    else{project = null; duration= null;
        if(leaveReason.includes("Holiday") || leaveReason.includes("holiday")){ Holidays = true;}}
    var Temp = {
        "currDate" : date,
        "projectId" : project,
        "duration" : duration,
        "leaveReason" : leaveReason,
        "empId" : id,
        "currWeek": CureeWeek(date),
        "isHoliday" : Holidays,
        "status" : Status
    }
    console.log(Temp);
    try{
        fetch("https://localhost:44352/api/Attendance/" + id + "/In Progress/"+date, {
            method: "PUT",
            mode: 'cors', 
            cache: 'no-cache', 
            credentials: 'same-origin',
            headers: {
                //'Authorization':"Bearer "+ JSON.parse(localStorage.getItem("token"))['token'],
                'Content-Type': 'application/json'
            },
            redirect: 'follow', 
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(Temp)
            }).then(res => {
                if(res.status==200){
                    Swal.fire({
                        icon: 'success',
                        title: 'Timesheet has been Updated',
                        showConfirmButton: false,
                        timer: 1500
                      });
                }
                else if(res.status==401){
                    alert("Unauthorized  user");
                }
                else{
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Error occur check all field!',
                        timer: 2500
                      });
                }
                LoadTable();
                console.log("passed");
                //window.location.reload();
            });
        }
        catch(Exception){
            alert("Error: Sign in for posting new jobs!!");
        }

    document.getElementById('update-timesheet').reset();
    
}

function CureeWeek(RequestDate){
    todaydate = new Date(RequestDate); 
    var oneJan =  new Date(todaydate.getFullYear(), 0, 1); 
    var numberOfDays =  Math.floor((todaydate - oneJan) / (24 * 60 * 60 * 1000)); 
    var result = Math.ceil(( todaydate.getDay() + 1 + numberOfDays) / 7);
    return result;
}

function Logout(){
    localStorage.removeItem('token');
    location.replace('./login.html');
}