var btn1 = document.getElementById("signUp");
var btn2 = document.getElementById("signIn");
/*Use the SignUp API, 
  send "POST: ./api/register/signup/" request with username, email and password.
  When response, alert with message.
*/
btn1.addEventListener("click", function(){
    if(document.getElementById("username-signUp").value == ""){
        window.alert("You need to input username!");
    }else if(document.getElementById("email-signUp").value == ""){
        window.alert("You need to input email!");
    }else if(document.getElementById("password-signUp").value == ""){
        window.alert("You need to input password!");
    }else if(!check(document.getElementById("username-signUp").value)) {
        window.alert("username must only be consist of 6-10 number of leters, numbers or underscores!");
        clearArea();
    }else{
        var username = document.getElementById("username-signUp").value;
        var email = document.getElementById("email-signUp").value;
        var password = document.getElementById("password-signUp").value;
        var request = new XMLHttpRequest();
        var message = {
            "username" : username,
            "email" : email,
            "password" : password
        };
        var myJSON = JSON.stringify(message);
        //request.open("POST", "http://localhost:9000/register/signup");
        request.open("POST", "https://mighty-waters-04779.herokuapp.com/register/signup");
        request.setRequestHeader("Content-type", "application/json");
        request.onload = function(){
            if(this.status == 200){
                window.alert("Congratulation! Now you can sign in!");
                clearArea();
            }else if(this.status == 400){
                var msg = JSON.parse(request.responseText);
                window.alert(msg.msg);
                clearArea();

            }
        }
        request.send(myJSON);
    }
});

/*Use the SignIn API, 
  send "POST: ./api/register/signin/" request with email and password.
  When response, alert with message.
*/
btn2.addEventListener("click", function(){
    if(document.getElementById("email-signIn").value == ""){
        window.alert("You need to input email!");
    }else if(document.getElementById("password-signIn").value == ""){
        window.alert("You need to input password!");
    }else{
        var email = document.getElementById("email-signIn").value;
        var password= document.getElementById("password-signIn").value;
        var request = new XMLHttpRequest();
        var message = {
            "email" : email,
            "password" : password
        };
        var myJSON = JSON.stringify(message);
        //request.open("POST", "http://localhost:9000/register/signin");
        request.open("POST", "https://mighty-waters-04779.herokuapp.com/register/signin");
        request.setRequestHeader("Content-type", "application/json");
        request.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200){
                var result = JSON.parse(request.responseText)
                const tk = result.token
                console.log(tk);
                window.alert("Success!");
                var req = new XMLHttpRequest();
                //req.open("POST", "http://localhost:9000/api/");
                req.open("POST", "https://mighty-waters-04779.herokuapp.com/api/");
                req.setRequestHeader("Content-type", "application/json");
                var msg = {
                    "token" : tk
                };
                var send = JSON.stringify(msg);
                req.onreadystatechange = function(){
                    if(this.readyState == 4 && this.status == 200){
                        document.write(this.responseText);
                    }
                } 
                req.send(send);
            }else if(this.status == 400){
                //var message = JSON.parse(request.responseText)
                window.alert("Invalid!");
                clearArea();
            }
        }
        request.send(myJSON);
    }
});

function clearArea(){
    document.getElementById("username-signUp").value = '';
    document.getElementById("email-signUp").value = '';
    document.getElementById("password-signUp").value = '';
    document.getElementById("email-signIn").value = '';
    document.getElementById("password-signIn").value = '';
}

function notify(msg){
    document.getElementById("notification").value = msg;
}

//Check the format of the user registration
function check(str){
    const format = /^\w{6,10}$/;
    if(format.test(str))return true;
    return false
}