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
        console.log(data);
            li = data.empName;
            document.getElementById("EmpiDetails").innerHTML = li;
            document.getElementById("EMPNAME").innerHTML = data.empName;
            document.getElementById("EMPID").innerHTML = data.empId;
            document.getElementById("EMPMAIL").innerHTML = data.email;
            document.getElementById("UName").innerHTML = data.userName;

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
        console.log(data);
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
    
    function Logout(){
        localStorage.removeItem('token');
        location.replace('./login.html');
    }