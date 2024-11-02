let username = document.querySelector("#username")
let password = document.querySelector("#password")
let loginBtn = document.querySelector("#login-btn")

loginBtn.addEventListener("click", login)
getUserName = localStorage.getItem("userName")
getpassword = localStorage.getItem("password")
function login(e){
    e.preventDefault()
    if(username.value === "" || password.value === ""){
        alert("Please fill the data")
    }else if(
        getUserName && getUserName.trim() === username.value.trim() &&
        getpassword && getpassword === password.value
    ){
        setTimeout(()=>{
            window.location = "index.html"
        },1500)
    }else{
        alert("UserName or Password Not Valid")
    }
    username.value=""
    password.value=""
}