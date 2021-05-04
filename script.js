const loader = document.getElementById('loading');

function ValidateForm() 
{
    const mail = document.getElementById('exampleInputEmail');
    const pass = document.getElementById('exampleInputPassword');
    const okButton = document.getElementById('Ok');
    

    if(mail.value == ""){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            html : `<div> Email address can't be empty <br/></div>`
            // footer: '<a href>Why do I have this issue?</a>'
        })
    }

    var isEmptyMail = EmptyCheck(mail);
    var isEmptyPass = EmptyCheck(pass);
    if(isEmptyMail){
        mail.style.borderColor = "red";
        mail.value = "";
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            html : `<div> Email address can't be empty <br/></div>`
            // footer: '<a href>Why do I have this issue?</a>'
        })
    }
    else if(isEmptyPass){
        pass.style.borderColor = "red";
        pass.value = "";
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            html : `<div> Password can't be empty <br/></div>`
            // footer: '<a href>Why do I have this issue?</a>'
        })
    }
    else{

        var isValidEmail = ValidateEmail(mail.value);

        if(isValidEmail){
            var isValidPass = ValidatePassword(pass.value);
            if(isValidPass){
                Authenticatelogin();
            }else{
                pass.style.borderColor = "red";
                pass.value = "";
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    html : `<div> Enter correct password <br/></div>`
                    // footer: '<a href>Why do I have this issue?</a>'
                })
            }
        }else{
            mail.style.borderColor = "red";
            mail.value = "";
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                html : `<div> Enter correct email <br/></div>`
                // footer: '<a href>Why do I have this issue?</a>'
            })
        }
    }

    // console.log( mail.value.length);
    
    // if ( isValidEmail ) {
    //     okButton.disabled = false;
    // } 
    // else {
    //     mail.style.borderColor = "red";
    //     mail.value = "";
    //     Swal.fire({
    //         icon: 'error',
    //         title: 'Oops...',
    //         text: 'Enter correct email-address',
    //         // footer: '<a href>Why do I have this issue?</a>'
    //     })
    //     okButton.disabled = true;
    // }

    // if(isValidEmail && isValidPass){
    //     Authenticatelogin();
    // }else{
    //     if(!isValidEmail){
    //         mail.style.borderColor = "red";
    //         mail.value = "";
    //     }
    //     if(!isValidPass){
    //         pass.style.borderColor = "red";
    //         pass.value = "";
    //     }
    //     const message = ['Enter correct credentials'];
    //     Swal.fire({
    //         icon: 'error',
    //         title: 'Oops...',
    //         html : `<div> Enter correct credentials <br/></div>`
    //         // footer: '<a href>Why do I have this issue?</a>'
    //     })
    // }


    // if ( isValidPass ) {
    //     okButton.disabled = false;
    // } 
    // else {
    //     pass.style.borderColor = "red";
    //     pass.value = "";
    //     Swal.fire({
    //         icon: 'error',
    //         title: 'Oops...',
    //         text: 'Enter correct Password',
    //         // footer: '<a href>Why do I have this issue?</a>'
    //     })
    //     okButton.disabled = true;
    // }
}

function EmptyCheck(str){
    if(str.value == "")
        return true;
    else return false;
}

function ValidateEmail(str){
    if(str == "")
        return false;

    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(str))
        return true;
    else
        return false;
}

function ValidatePassword(str){
    if(str == "")
        return false;
    
    if(str.length < 2 ){
        return false;
    }
    return true;
}


function Authenticatelogin(){
    
    var email = document.getElementById('exampleInputEmail');
    var password = document.getElementById('exampleInputPassword');
    var User = {
        "email" : email.value,
        "passWord" : password.value
    }
    displayLoading();
    fetch("https://localhost:44389/api/Login", {
    method: "POST",
    mode: 'cors', 
    cache: 'no-cache', 
    credentials: 'same-origin', 
    headers: {
    'Content-Type': 'application/json'
    },
    redirect: 'follow', 
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(User)
    })
    .then(res => res.json())
    .then(res => {
        hideloading();
        // console.log(res);
        // document.getElementById('error-message').innerHTML = "";
        localStorage.setItem("token", JSON.stringify(res));
        Email.send({
            SecureToken : "2e060aa0-9d74-49f8-ab59-8d04322dd9c6",
           
            From : "phalgunidhamija15@gmail.com",
            To :  email.value,
            Subject : "This is an confirmation email",
            Body:"You have Logged In successfully! Now you can view your timesheet and fill new one.",
           
        }).then(
            message =>{
            if(message=='OK'){
            // alert('Your mail has been send. Thank you for connecting.');
            Swal.fire(
                'Successfully Logged In!',
                'We have sent you an email.',
                'success'
            ).then(()=>{
                location.replace('/index.html');
            })
            }
            else{
                console.error (message);
                // alert('There is error at sending message. ')
            }
            });
        // Swal.fire(
        //     'Done!',
        //     'Successfully Logged In!',
        //     'success',
        // ).then(()=>{
        //     location.replace('/index.html');
        // })
        
    })
    .catch(function(){
        // console.log("You are not authorized!");
        hideloading();
        console.log("4");
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            html : `<div> You are not authorized. <br/> Re-enter the credentials! <br/></div>`
            // footer: '<a href>Why do I have this issue?</a>'
        })
        // document.getElementById('error-message').innerHTML = "You are not authorized. Re-enter the credentials!"
    })
}

function getEmployee(){
    // var item = JSON.parse(localStorage.getItem('token'))['token'];
    // var id = item
    fetch("https://localhost:44389/api/Portal", {
    method: "GET",
    mode: 'cors', 
    cache: 'no-cache', 
    credentials: 'same-origin', 
    headers: {
    'Content-Type': 'application/json',
    // 'Authentication': 'Bearer ' + item
    },
    redirect: 'follow', 
    referrerPolicy: 'no-referrer',
    })
    .then(res => res.json())
    .then(u => {
        console.log(u);
        var StrGet = "";
        u.forEach((user) => {
        StrGet += `<tr >
            <td style="color:navy;">${user.empId} </td>
            <td style="color:navy;">${user.projectId} </td>
            <td style="color:navy;">${user.duration}</td> 
            <td style="color:navy;">${user.task}</td>
            <td style="color:navy;">${user.leaveReason}</td>
            <td style="color:navy;">${user.currDate}</td>
            <td style="color:navy;">${user.status}</td>           
            </tr>`;
        });
        document.getElementById("abcd").innerHTML=StrGet;
        // document.getElementById('usertitle').innerText += `${user.emp}`;
    })
    .catch(function(){
        // console.log("You are not authorized!");
    })
    
    fetch("https://localhost:44389/api/UserDetails", {
    method: "GET",
    mode: 'cors', 
    cache: 'no-cache', 
    credentials: 'same-origin', 
    headers: {
    'Content-Type': 'application/json',
    // 'Authentication': 'Bearer ' + item
    },
    redirect: 'follow', 
    referrerPolicy: 'no-referrer',
    })
    .then(res => res.json())
    .then(u => {
        console.log(u);
        var x = "";
        u.forEach(user => {
            x = user.empName;
            console.log(x);
        })
        document.getElementById('usertitle').innerHTML = x;
    })
    .catch(function(){
        // console.log("You are not authorized!");
    })
}


// function Logout()
// {
//     Swal.fire({
//         title: 'Are you sure?',
//         text: "You want to logout?",
//         icon: 'warning',
//         showCancelButton: true,
//         confirmButtonColor: '#3085d6',
//         cancelButtonColor: '#d33',
//         confirmButtonText: 'Yes'
//       }).then((result) => {
//         if (result.isConfirmed) {
//           Swal.fire(
//             'Deleted!',
//             'Your file has been deleted.',
//             'success'
//           )
//           localStorage.removeItem("token");
//           location.replace("./login.html");
//         }
//       })
  
//     //redirect to Login
// }

function Logout(){
    localStorage.removeItem("token");
    // localStorage.remove();
    location.replace("./login.html");
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






