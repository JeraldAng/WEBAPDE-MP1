function validate(e){
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    
    var keycode = (e.keyCode ? e.keyCode : e.which);
    
    if (keycode == '13' || keycode == '1') {
        if (username == "admin" && password == "p@ssword"){
            alert ("Login successful. Welcome, Mr. Krabs!");
            window.location = "dashboard.html"; // Redirecting to other page.
            return false;
        }
        else if (username=="admin" && password != "p@assword"){
            alert("Password incorrect. Please try again.");
        }
        else if(username=="" || password==""){
            alert("Please fill in both username and password.");
        }
        else if(username == null && password == null){
            alert("Please enter your username and password.");
        }
        else{
            alert("User invalid. Please try again.");
        }
    }
}


