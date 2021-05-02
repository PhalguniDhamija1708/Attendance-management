var myInput = document.getElementById("ForgetInputPasword");
    var letter = document.getElementById("letter");
    var capital = document.getElementById("capital");
    var number = document.getElementById("number");
    var length = document.getElementById("length");
    // When the user clicks on the password field, show the message box
    myInput.onfocus = function() {
        document.getElementById("message").style.display = "block";
    }
    
    // When the user clicks outside of the password field, hide the message box
    myInput.onblur = function() {
        document.getElementById("message").style.display = "none";
    }
    
    // When the user starts to type something inside the password field
    myInput.onkeyup = function() {
        // Validate lowercase letters
        var lowerCaseLetters = /[a-z]/g;
        if(myInput.value.match(lowerCaseLetters)) {  
        letter.classList.remove("invalid");
        letter.classList.add("valid");
        } else {
        letter.classList.remove("valid");
        letter.classList.add("invalid");
        }
        
        // Validate capital letters
        var upperCaseLetters = /[A-Z]/g;
        if(myInput.value.match(upperCaseLetters)) {  
        capital.classList.remove("invalid");
        capital.classList.add("valid");
        } else {
        capital.classList.remove("valid");
        capital.classList.add("invalid");
        }
    
        // Validate numbers
        var numbers = /[0-9]/g;
        if(myInput.value.match(numbers)) {  
        number.classList.remove("invalid");
        number.classList.add("valid");
        } else {
        number.classList.remove("valid");
        number.classList.add("invalid");
        }
        
        // Validate length
        if(myInput.value.length >= 8) {
        length.classList.remove("invalid");
        length.classList.add("valid");
        } else {
        length.classList.remove("valid");
        length.classList.add("invalid");
        }
    }

function UpdatePassword(){
    var username=document.getElementById("ForgetInputUserName");
    var email=document.getElementById("ForgetInputEmail");
    var password=document.getElementById("ForgetInputPasword");
    var rePassword=document.getElementById("ForgetInputRePassword");
    var TempUser={
    "userName":username.value,
    "email":email.value,
    "passWord":password.value
    }
    // console.log(password.value);
    // console.log(rePassword.value);
    // console.log(TempUser);


    if(password.value == rePassword.value){
        console.log("helloii");
        fetch("https://localhost:44389/api/UserDetails" + "/" + email.value.toString(), {
        method: "PUT",
        mode: 'cors', 
        cache: 'no-cache', 
        credentials: 'same-origin', 
        headers: {
        'Content-Type': 'application/json'
        },
        redirect: 'follow', 
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(TempUser)
        })
        .then(result => {
            console.log(result);
            if(result.status == 200){
                Email.send({
                    SecureToken : "2e060aa0-9d74-49f8-ab59-8d04322dd9c6",
                    From : "phalgunidhamija15@gmail.com",
                    To :  email.value,
                    Subject : "This is an confirmation email",
                    Body:"Your password has chnaged successfully! Now you can login with new credentials.",     
                }).then(() =>{
                        Swal.fire({
                            icon: 'success',
                            title: 'Your Password has changed successfully',
                            html : `<div> You can login now</div>`
                        }).then(()=>{
                        location.replace('/login.html');
                        })
                    });
            }else{
                email.value = "";
                username.value = "";
                password.value = "";
                rePassword.value = "";
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    html : `<div> credentials do not match. <br/> Re-enter the credentials! <br/></div>`
                })
            }
        })
        .catch(function(){
            alert("Not found");
        })
    }else{
        email.value = "";
        username.value = "";
        password.value = "";
        rePassword.value = "";
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            html : `<div> Password do not match. </div>`
        })
    }
}