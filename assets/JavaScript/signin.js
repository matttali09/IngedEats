console.log("this is before anything");

function onSignIn(googleUser) {
  console.log("this is after signin presss");
  
    var profile = googleUser.getBasicProfile();
    console.log(profile);
    
    $(".g-signin2").css("display", "none");
    $(".data").css("display", "block");
    $("#pic").attr('src', profile.getImageUrl());
    $(".emailAdd").text(profile.getEmail());
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  }

  function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        alert("You have successfully signed out")
        $(".g-signin2").css("display", "block");
        $(".data").css("display", "none");
      console.log('User signed out.');
    });
  }