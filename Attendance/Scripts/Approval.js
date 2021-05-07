const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

$(document).ready(function(){
 
    // Initialize select2
    $("#selUser").select2();
   
    // Read selected option
    $('#but_read').click(function(){
      //var username = $('#selUser option:selected').text();
    var userid = $('#selUser').val();
    console.log(userid);
    localStorage.setItem("hsh", userid);
    TableLoad();
    
   document.getElementById("selUser").selectedIndex = "0";
    });
   });

function TableLoad(){
    userid = localStorage.getItem('hsh');
    var id = JSON.parse(localStorage.getItem("token"))['id'];
    if(userid!="null"){
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
                if(temp.leaveReason != null ){
                    li += `<tr>
                                <td>${temp.empName}</td>
                                <td>${argdate}</td>
                                <td>-</td>
                                <td>-</td>
                                <td>${temp.leaveReason}</td>
                          </tr>`;}
                else{
                    li += `<tr>
                                <td>${temp.empName}</td>
                                <td>${argdate}</td>
                                <td>${temp.project.projectDes}</td>
                                <td>${temp.duration}</td>
                                <td>-</td>
                          </tr>`;
                }
                });
            document.getElementById("IdToken").innerHTML = li;
            document.getElementById("internal-table").innerHTML = `<div style="float: right;">
                                                                        <a href="#" class="btn btn-success btn-icon-split mx-2" onclick="Accept()" >
                                                                        <span class="icon text-white-50" >
                                                                         <i class="fas fa-check"></i>
                                                                        </span>
                                                                        <span class="text">Accept</span>
                                                                        </a>
                                                                        <a href="#" class="btn btn-danger btn-icon-split" onclick="Reject()">
                                                                            <span class="icon text-white-50">
                                                                             <i class="fas fa-times"></i>
                                                                            </span>
                                                                        <span class="text">Reject</span>
                                                                        </a>
                                                                    </div>`;
            }
    })}
}   

function Get(){
    var id = JSON.parse(localStorage.getItem("token"))['id'];
    //var apprid = 0
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
        alert('Looks like there was a problem in 1: \n', error);
    })

    fetch("https://localhost:44352/api/Approval/"+id ,{
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
                    var sdate = element.hashId.slice(1,3);
                    var month = element.hashId.slice(3,5);
                    var edate = element.hashId.slice(5);
                    li += `<option value="${element.hashId}">${element.empName} ${sdate}-${month}-${edate}</option>`;
                    //localStorage.setItem(")
                   // console.log(li);
                });
                document.getElementById("selUser").innerHTML = li;
                //console.log(document.getElementById("project"));
        }).catch(function(error) {
            alert('Looks like there was a problem in 2: \n', error);
    }
    )

}

function Accept(){
    var Emailto = "";
   
    fetch("https://localhost:44352/api/Email/"+localStorage.getItem('hsh') ,{
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
            console.log(data);
                data.forEach(element => {
                    Emailto = element.email;
                });
                console.log(Emailto);
                fetch("https://localhost:44352/api/Approval"+"/"+localStorage.getItem('hsh'), {
                    method: "PUT",
                    mode: 'cors', 
                    cache: 'no-cache', 
                    credentials: 'same-origin',
                    headers: {
                    //'Authorization':"Bearer "+ JSON.parse(localStorage.getItem("token"))['token'],
                    'Content-Type': 'application/json'
                    },
                    redirect: 'follow', 
                    referrerPolicy: 'no-referrer'
                    })
                    .then(result => {
                    if(result.status==200){
                        Swal.fire({
                            icon: 'success',
                            title: 'Request is Approved and mail has been sent',
                            showConfirmButton: false,
                            timer: 2500
                        });
                        Email.send({
                            SecureToken : "2e060aa0-9d74-49f8-ab59-8d04322dd9c6",
                        
                            From : "phalgunidhamija15@gmail.com",
                            To : Emailto,
                            Subject : "Request Approved",
                            Body:"Your Request for " +localStorage.getItem('hsh')+ " has been Approved",               
                        })
                    }
                    else{
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Request denined!',
                            timer: 2500,
                            showConfirmButton: false
                        });
                        // window.location.reload();
                    }}).then(res=>{
                    // Get();
                    });

        }).catch(function(error) {
            alert('Looks like there was a problem in accept: \n', error);
    }
    )
        
}

function Reject(){
    var Emailto = "";
    fetch("https://localhost:44352/api/Email/"+localStorage.getItem('hsh') ,{
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
                data.forEach(element => {
                    Emailto = element.email;
                });
        }).catch(function(error) {
            alert('Looks like there was a problem in reject: \n', error);
    }
    )
    Swal.fire({
        title: 'Are you sure?',
        text: "You want to Reject this sheet!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Reject it!'
       }).then((result) => {
        if (result.isConfirmed) {
            try{
                fetch("https://localhost:44352/api/Approval"+"/"+localStorage.getItem('hsh'), {
                method: "DELETE",
                mode: 'cors', 
                cache: 'no-cache', 
                credentials: 'same-origin',
                headers: {
                 //  'Authorization':"Bearer "+ JSON.parse(localStorage.getItem("token"))['token'],
                   'Content-Type': 'application/json'
                },
                redirect: 'follow', 
                referrerPolicy: 'no-referrer'
                })
                .then(result => {
                    if(result.status==200){
                        Swal.fire({
                            icon: 'success',
                            title: 'Request is denined',
                            showConfirmButton: false,
                            timer: 2500
                          });
                          Email.send({
                            SecureToken : "2e060aa0-9d74-49f8-ab59-8d04322dd9c6",
                           
                            From : "phalgunidhamija15@gmail.com",
                            To : Emailto,
                            Subject : "Request Denied",
                            Body:"Your Request for " +localStorage.getItem('hsh')+ " has been denied please refill your Timesheet",               
                        })
                    }
                }
                );}
                catch(Exception){
                    alert("Error: Sign in to Access Delete");
                }
        }
       })
    
}


function Logout(){
    localStorage.removeItem('token');
    location.replace('./login.html');
}


