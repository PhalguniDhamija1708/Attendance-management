function Login(){
    var uname = document.getElementById("InputEmail").value;
    var pass = document.getElementById("InputPassword").value;

    if(uname=='' || pass==''){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Email or Password can not be empty!',
          })
    }
    else{
            var Temp ={
            "Email": uname,
            "PassWord": pass
            };
            fetch('https://localhost:44352/api/login', {
            method: "POST",
            mode: 'cors', 
            cache: 'no-cache', 
            credentials: 'same-origin',
            headers: {
            'Content-Type': 'application/json'
            },
            redirect: 'follow', 
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(Temp)
            }).then(response => response.text())
            .then((response) => {
                var token = response;
                if(token==""){
                    //alert("Incorrect Username or Password");
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        html : `<div> You are not authorized. <br/> Re-enter the credentials! <br/></div>`
                    })
                }
                else{
                    window.localStorage.setItem("token", token);
                    //alert("Login successfully");
                    Email.send({
                        SecureToken : "2e060aa0-9d74-49f8-ab59-8d04322dd9c6",
                       
                        From : "phalgunidhamija15@gmail.com",
                        To :  uname,
                        Subject : "This is an confirmation email",
                        Body:"You have Logged In successfully! Now you can view your timesheet and fill new one.",
                       
                    }).then(
                        message =>{
                        if(message=='OK'){
                        Swal.fire(
                            'Successfully Logged In!',
                            'We have sent you an email.',
                            'success'
                        ).then(()=>{
                            location.replace('./index.html');
                        })
                        }
                        else{
                            console.error (message);
                        }
                        });
                }
            });
}}


