document.getElementById("end").addEventListener("mouseover",displayDate);
function displayDate(){
    var startD=document.getElementById("start");
    var Sdate=new Date(startD.value);

    Sdate.setDate(Sdate.getDate()+7);
    var newdate= Sdate.getDate() + '-' + (Sdate.getMonth() + 1) + '-' +  Sdate.getFullYear();
    document.getElementById("end").value=newdate;
}

var id = JSON.parse(localStorage.getItem("token"))['id'];
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
        //console.log(data);
        let li = "";
            li = data.empName;
            document.getElementById("EmpiDetails").innerText = li;
            localStorage.setItem('appid',data.approverId);
           // console.log(document.getElementById("EmpiDetails"));
    }).catch(function(error) {
        alert('Looks like there was a problem: \n', error);
    })

const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const holidays = ['0-1','0-26','2-29','3-2','4-13','7-30','9-15','10-04','10-5','11-27'];


function TableLoad(){
    var id = JSON.parse(localStorage.getItem("token"))['id'];
    fetch("https://localhost:44352/api/Attendance/" + id +"/Pending",{
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
        data.forEach(temp => {
           // console.log(temp);
            var str = temp.currDate.slice(0,10);
            var p = str.split("-");
            p[1] = p[1]-1;
            var date = new Date(p[0],p[1],p[2]);
            var argdate = days[date.getDay()];
           // console.log(date);
            if(temp.project == null && temp.leaveReason ==null && temp.isHoliday == false)
            {
                 li+=    `<tr>
                            <td>${argdate}</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                            <td><a href="#"  data-toggle="modal" data-target="#updateModal" onclick="UpdateModal('${temp.currDate}')">
                            <i class="fa fa-edit ml-3" aria-hidden="true"></i></a>
                            </td>
                        </tr>`
            }
            else if(temp.project != null && temp.leaveReason == null && temp.isHoliday == false){
                li+=    `<tr>
                            <td>${argdate}</td>
                            <td>${temp.project.projectDes}</td>
                            <td>${temp.duration}</td>
                            <td>-</td>
                            <td><a href="#"  data-toggle="modal" data-target="#updateModal" onclick="UpdateModal('${temp.currDate}')">
                            <i class="fa fa-edit ml-3" aria-hidden="true"></i></a>
                            </td>
                        </tr>`
            }
            else if(temp.project == null && temp.leaveReason != null && temp.isHoliday == false){
                li+=    `<tr>
                            <td>${argdate}</td>
                            <td>-</td>
                            <td>-</td>
                            <td>${temp.leaveReason}</td>
                            <td><a href="#"  data-toggle="modal" data-target="#updateModal" onclick="UpdateModal('${temp.currDate}')">
                            <i class="fa fa-edit ml-3" aria-hidden="true"></i></a>
                            </td>
                        </tr>`
            }
            else if(temp.isHoliday == true){
                 li+=   `<tr>
                            <td>${argdate}</td>
                            <td>-</td>
                            <td>-</td>
                            <td>${temp.leaveReason}</td>
                            <td><a href="#"  data-toggle="modal" data-target="#updateModal" onclick="UpdateModal('${temp.currDate}')">
                            <i class="fa fa-edit ml-3" aria-hidden="true"></i></a>
                            </td>
                      </tr>`
                }
            });
            document.getElementById("CurrentSheet").innerHTML = li;
            if(data.length>0){
            document.getElementById("internal-table").innerHTML = `<div style="float: right;"><a href="#" class="btn btn-success btn-icon-split" data-toggle="modal" data-target="#putModal">
                                                                    <span class="icon text-white-50">
                                                                     <i class="fas fa-check"></i>
                                                                    </span>
                                                                    <span class="text">Send for Approval</span>
                                                                </a></div>`;}

    })
}

TableLoad();

function Refresh(){
    document.getElementById('post-timesheets').reset();
}

function GetProjects(){
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
}

const getDatesBetween = (startDate, endDate) => {

    console.log(startDate,endDate);
    let currentDate = new Date(
    startDate.getFullYear(),
    startDate.getMonth(),
    startDate.getDate()
    );
    while (currentDate < endDate) {
    var Show = true;    
    if(currentDate.getDay() == 0 || currentDate.getDay() == 6)
    { Show = false ;}
    if(Show){
        var id = JSON.parse(localStorage.getItem("token"))['id'];
        var Holiday = false;
        
        //if(holidays.includes(currentDate.getMonth()+'-'+currentDate.getDate())) {   Holiday =true;  }
        var Month = currentDate.getMonth()+1;
        var Temp = {
            "currDate" : currentDate.getFullYear()+"-"+Month+"-"+currentDate.getDate(),
            "projectId" : null,
            "duration" : null,
            "leaveReason" : null,
            "empId" : id,
            "currWeek": CureeWeek(currentDate),
            "isHoliday" : Holiday,
            "status" : "Pending"
        }

        console.log(Temp);
        try{
            fetch("https://localhost:44352/api/Attendance", {
                method: "POST",
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
                    }
                    else if(res.status==401){
                        alert("Unauthorized  user");
                    }
                    else{
                    }
                    var frm = document.getElementById("post-timesheets");
                    frm.reset();
                    TableLoad();
                });
            }
            catch(Exception){
                alert("Error: Sign in for posting new jobs!!");
            }
    }
    currentDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate() + 1, // Will increase month if over range
    );
    }
};

function UpdateModal(date){
    document.getElementById("UpdateTitleModal").innerHTML = `${date.slice(0,10)}`;
    document.getElementById("updateModal").value = date;
    GetProjects();
}

function Put(){
    var id = JSON.parse(localStorage.getItem("token"))['id'];
    var date = document.getElementById("updateModal").value;
    var project = document.getElementById("project-m").value;
    var duration = document.getElementById("duration-m").value;
    var leaveReason = document.getElementById("leaveReason-m").value;
    Holidays = false;
    Status = "Pending";
    
    if(leaveReason == ""){ leaveReason = null }
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
        fetch("https://localhost:44352/api/Attendance/" + id + "/Pending/"+date, {
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
                TableLoad();
                //window.location.reload();
            });
        }
        catch(Exception){
            alert("Error: Sign in for posting new jobs!!");
        }

    document.getElementById('update-timesheet').reset();
}

function CurrStatus(){
    var EmailTo = "";
    fetch("https://localhost:44352/api/Login/" + localStorage.getItem("appid"),{
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
            let li = "";
            EmailTo = data.Email;
        }).catch(function(error) {
            alert('Looks like there was a problem: \n', error);
    });

    var id = JSON.parse(localStorage.getItem("token"))['id'];
    var startdate = document.getElementById("startdate-input").value;
    var enddate = document.getElementById("enddate-input").value;
    var hash = id+ startdate.slice(8,10)+startdate.slice(5,7)+enddate.slice(8,10);
    AprovalRequest = {
        startDate: startdate,
        endDate : enddate,
        previousStatus : "Pending",
        newStatus : "In Progress",
        hashId : hash
    }
    console.log(AprovalRequest);

    fetch("https://localhost:44352/api/TimeSheetRequest"+"/"+id, {
            method: "PUT",
            mode: 'cors', 
            cache: 'no-cache', 
            credentials: 'same-origin',
            headers: {
             // 'Authorization':"Bearer "+ JSON.parse(localStorage.getItem("token"))['token'],
              'Content-Type': 'application/json'
            },
            redirect: 'follow', 
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(AprovalRequest)
    }).then(resp => {
        if(resp.status == 200){
            Swal.fire({
                icon: 'success',
                title: 'Request Send for Approval To your Approver',
                showConfirmButton: false,
                timer: 2500
              });
              Email.send({
                SecureToken : "2e060aa0-9d74-49f8-ab59-8d04322dd9c6",
               
                From : "phalgunidhamija15@gmail.com",
                To : EmailTo,
                Subject : "Request for Approval",
                Body:"Hi I have requested for my timesheet with the id of " + hash + " please review it.",
               
            })
           location.replace("./blank.html");
        }
        else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Request denined!',
                timer: 2500,
                showConfirmButton: false
              })
        }
        
    })
    document.getElementById('change-timesheet').reset();
    
}
    
document.getElementById("CreateTable").addEventListener('click',UpdateTable)
function UpdateTable(){
    var start = document.getElementById('start').value;
    var end = document.getElementById('end').value;
    var p1 = start.split("-");
    var p2 = end.split("-");
    if(start!="" && end!=""){
    console.log(start, end);
    getDatesBetween(new Date(p1[0],p1[1]-1,p1[2]), new Date(p2[2],p2[1]-1,p2[0]));}
    else{
        Swal.fire({
                icon: 'error',
                 title: 'Oops...',
                 text: 'Error occur check all field!',
                 timer: 2500
               });
    }
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