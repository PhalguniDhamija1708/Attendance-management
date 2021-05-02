function Get(){

    var id = JSON.parse(localStorage.getItem("token"))['id'];
   // console.log("https://localhost:44352/api/Attendance/" + id);

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
            data.forEach(temp => {
                var str = temp.currDate.slice(0,10);
                var p = str.split("-");
                var date = new Date(p[0],p[1],p[2]);
               if(temp.leaveReason == null || temp.leaveReason == ""){ temp.leaveReason = "-";}
                else{ temp.projectDes = "-"; temp.duration="-";}
                    li += `<tr>
                                <td>${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</td>
                                <td>${temp.projectDes}</td>
                                <td>${temp.duration}</td>
                                <td>${temp.leaveReason}</td>
                                <td>${temp.status}</td>
                          </tr>`;
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

}

function Logout(){
    localStorage.removeItem('token');
    location.replace('./login.html');
}