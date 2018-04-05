var myInput = document.getElementById("pass");
		var letter = document.getElementById("letter");
		var capital = document.getElementById("capital");
		var number = document.getElementById("number");
		var length = document.getElementById("length");
		myInput.onfocus = function(){
			document.getElementById("message").style.display = "block";
		}
		myInput.onblur = function(){
			document.getElementById("message").style.display = "none";
		}


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

		function showPass(){
			var x = document.getElementById('pass');
			if (x.type === 'password') {
				x.type = "text";
			}
			else{
				x.type = "password";
			}
		}

		var Username = document.getElementById("uname");
		Username.onfocus = function(){
			document.getElementById("uname1").style.display = "block";
			document.getElementById("uname1").style.color = "red";
		}
		Username.onblur = function(){
			document.getElementById("uname1").style.display = "none";
		}

		Username.onkeyup = function() {
		 if(Username.value.length >= 1) {
		    uname1.classList.remove("invalid");
		    uname1.classList.add("valid");
			document.getElementById("uname1").style.color = "green";

		  } else {
		    uname1.classList.remove("valid");
		    uname1.classList.add("invalid");
			document.getElementById("uname1").style.color = "red";


		  }
	}

		var Emailid = document.getElementById("email");
		Emailid.onfocus = function(){
			document.getElementById("email1").style.display = "block";
			document.getElementById("email1").style.color = "red";
		}
		Emailid.onblur = function(){
			document.getElementById("email1").style.display = "none";
		}

		var emails = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		Emailid.onkeyup = function(){
		if (Emailid.value.match(emails	)) {
			email1.classList.remove("invalid");
		    email1.classList.add("valid");
			document.getElementById("email1").style.color = "green";
		}
		else {
		    email1.classList.remove("valid");
		    email1.classList.add("invalid");
			document.getElementById("email1").style.color = "red";
		  }
	}
	var MobNo = document.getElementById("mob");
	MobNo.onfocus = function(){
		document.getElementById("mob1").style.display ="block";
		document.getElementById("mob1").style.color ="red";
	}
	MobNo.onblur = function(){
		document.getElementById("mob1").style.display = "none";
	}

	MobNo.onkeyup = function(){
		var mobnum = /^\d{10}$/;
		if (MobNo.value.match(mobnum)) {
			mob1.classList.remove("invalid");
			mob1.classList.add("valid");
			document.getElementById("mob1").style.color = "green";
		}
		else{
			mob1.classList.remove("valid");
			mob1.classList.add("invalid");
			document.getElementById("mob1").style.color = "red";
		}
	}