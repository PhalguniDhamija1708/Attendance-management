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
        //console.log(data);
        let li = "";
            li = data.empName;
            document.getElementById("EmpiDetails").innerText = li;
           // console.log(document.getElementById("EmpiDetails"));
    }).catch(function(error) {
        alert('Looks like there was a problem: \n', error);
    })

   /* fetch("https://localhost:44352/api/TimeSheetRequest/" + id,{
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
            
        }
    }).catch(function(error) {
        alert('Looks like there was a problem: \n', error);
    })*/


    var id = JSON.parse(localStorage.getItem("token"))['id'];
    fetch("https://localhost:44352/api/Approval/" + id ,{
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
                var argdate = date.getFullYear()+'-'+date.getMonth()+'-'+date.getDate();
                if(temp.leaveReason == null || temp.leaveReason == ""){ temp.leaveReason = "-"; }
                else{ temp.project.projectDes = "-"; temp.duration="-";}
                    li += `<tr>
                                <td>${temp.empName}</td>
                                <td>${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</td>
                                <td>${temp.project.projectDes}</td>
                                <td>${temp.duration}</td>
                                <td>${temp.leaveReason}</td>
                                <td>${temp.status}</td>
                          </tr>`;
                });
            document.getElementById("IdToken").innerHTML = li;
            document.getElementById("internal-table").innerHTML = `<a href="#" class="btn btn-success btn-icon-split" data-toggle="modal" data-target="#putModal">
                                                                        <span class="icon text-white-50">
                                                                         <i class="fas fa-check"></i>
                                                                        </span>
                                                                        <span class="text">Acceptt</span>
                                                                    </a>`;
            }
    }).catch(function(error) {
        alert('Looks like there was a problem: \n', error);
    })

}


function Logout(){
    localStorage.removeItem('token');
    location.replace('./login.html');
}


// <td><a href="#"  data-toggle="modal" data-target="#updateModal" onclick="UpdateModal('${temp.currDate}')">
// <i class="fa fa-edit ml-3" aria-hidden="true"></i></a>

// </td>