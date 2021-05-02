

$('#myModal .save').click(function (e) {
    e.preventDefault();
    $('#myModal').modal('hide');
    //$(this).tab('show')
    return false;
})

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
        if(data.length > 0){
            data.forEach(temp => {
                var str = temp.currDate.slice(0,10);
                var p = str.split("-");
                var date = new Date(p[0],p[1],p[2]);
                if(temp.leaveReason == null || temp.leaveReason == ""){ temp.leaveReason = "-"; }
                else{ temp.projectDes = "-"; temp.duration="-";}
                    li += `<tr>
                                <td>${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</td>
                                <td>${temp.projectDes}</td>
                                <td>${temp.duration}</td>
                                <td>${temp.leaveReason}</td>
                                <td>${temp.status}</td>
                                <td><a href="#"  data-toggle="modal" data-target="#updateModal" >
                                <i class="fa fa-edit ml-3" aria-hidden="true"></i></a>
                                <a><i class="fa fa-trash ml-5" aria-hidden="true" style="color: black;"></i></a>
                                </td>
                          </tr>`;
                });
            document.getElementById("CurrentSheet").innerHTML = li;
            document.getElementById("internal-table").innerHTML = `<a href="#" class="btn btn-success btn-icon-split">
                                                                        <span class="icon text-white-50">
                                                                         <i class="fas fa-check"></i>
                                                                        </span>
                                                                        <span class="text">Send for Approval</span>
                                                                    </a>`;
            }
    }).catch(function(error) {
        alert('Looks like there was a problem: \n', error);
    })
}

function Get(){

    //fetch all details
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
        //console.log(data);
        let li = "";
            li = data.empName;
            document.getElementById("EmpiDetails").innerText = li;
           // console.log(document.getElementById("EmpiDetails"));
    }).catch(function(error) {
        alert('Looks like there was a problem: \n', error);
    })

    //project details
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
            document.getElementById("project").innerHTML += li;
            //console.log(document.getElementById("project"));
    }).catch(function(error) {
        alert('Looks like there was a problem: \n', error);
    })

    //table fillling 
    TableLoad();
}

const holidays = ['0-1','0-26','2-29','3-2','4-13','7-30','9-15','10-04','10-5','11-27'];


function Post(){
    var date = document.getElementById("date-input").value;
    var project = document.getElementById("project").value;
    var duration = document.getElementById("duration").value;
    var leaveReason = document.getElementById("leaveReason").value;
    var id = JSON.parse(localStorage.getItem("token"))['id'];
    var Holidays = false;
    var Status = "Pending";
    var TempDate = new Date(date);
    var res = TempDate.getMonth()+"-"+TempDate.getDate();
    holidays.forEach(one => { 
        if( one == res || TempDate.getDay() == 0 || TempDate.getDay() == 6){
            Holidays = true;
        }
    });
    if(leaveReason == ""){ leaveReason = null}
    else{project = null; duration= null}
    if(date != ""){
    if(!Holidays){
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
       // console.log(Temp);
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
                        Swal.fire({
                            icon: 'success',
                            title: 'Timesheet has been saved',
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
                    var frm = document.getElementById("post-timesheet");
                    frm.reset();
                    Get();
                    //window.location.reload();
                });
            }
            catch(Exception){
                alert("Error: Sign in for posting new jobs!!");
            }
    }
    else{
        Swal.fire({
            title: `${date} is a Holiday!`,
            imageUrl: 'img/holiday.png',
            imageWidth: 300,
            imageHeight: 200,
            imageAlt: 'Custom image',
            timer: 2000,
            timerProgressBar: true,
            didOpen: () => {
            Swal.showLoading()
            timerInterval = setInterval(() => {
            const content = Swal.getContent()
            if (content) {
            const b = content.querySelector('b')
            if (b) {
            b.textContent = Swal.getTimerLeft()
            }
            }
            }, 100)
            },
            willClose: () => {
            clearInterval(timerInterval)
            }
            })
    }}
    else{
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Date can not be empty!',
            timer: 1500
          })
    }
    document.getElementById("post-timesheet").reset();
    TableLoad();
}


function Put(){
    
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