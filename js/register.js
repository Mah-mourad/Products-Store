let username = document.querySelector("#username")
let email = document.querySelector("#email")
let password = document.querySelector("#password")
let registerBtn = document.querySelector("#register-btn")

registerBtn.addEventListener("click", register)

function register(e){
    e.preventDefault()
    if(username.value === "" || email.value === "" || password.value === ""){
        alert("Please fill the data")
    }else{
        localStorage.setItem("userName",username.value )
        localStorage.setItem("email",email.value )
        localStorage.setItem("password",password.value )

        setTimeout(()=>{
            window.location = "login.html"
        },2000)
    }
    username.value=""
    email.value=""
    password.value=""
}