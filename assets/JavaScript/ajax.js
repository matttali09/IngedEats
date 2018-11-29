console.log("This file is connected.");

// variables ===========================================
let mainIng = "";
let myLat;
let myLong;

function recipeAjax() {
    let recipeAPIkey = "7872e935a7940ef06e573678577b1f1a";
    let recipeQueryURL = "https://www.food2fork.com/api/search?key=" + recipeAPIkey + "&q=" + mainIng + "&sort=r&count=6";

    $.ajax({
        url: recipeQueryURL,
        method: "GET",
        dataType: "json"
    }).then(function (resp) {
        // confirm there is data received
        console.log(`food2fork results:`);
        console.log(recipeQueryURL);
        console.log(resp);

        // add the results to the HTML page
        displayRecipes(resp.recipes);
    });
}

function displayRecipes(data) {
    console.table(data);
    for (let i = 0; i < data.length; i++) {
        // make the card div
        let column = $("<div>").addClass("col s6 m6");
        let card = $("<div>").addClass("card medium");

        // make the div for the image
        let cardImage = $("<div>").addClass("card-image waves-effect waves-block waves-light");
        let image = $("<img>").addClass("activator").attr("src", data[i].image_url);
        let fav = $("<a>").addClass("btn-floating halfway-fab waves-effect waves-light red").attr("href", "#");
        let favicon = $("<i>").addClass("material-icons favorites").text("star");
        fav.append(favicon);
        cardImage.append(image);
        cardImage.append(fav);

        // make the card content
        let cardContent = $("<div>").addClass("card-content");
        let title = $("<p>").addClass("card-title activator grey-text text-darken-4").text(data[i].title);
        let link = $("<a>").attr("href", data[i].source_url).text("Get the recipe!");
        cardContent.append(title);
        cardContent.append(link);

        // put the content on the DOM
        card.append(cardImage);
        card.append(cardContent);
        column.append(card);
        $("#recipe-results").append(column);
    }
}

function restaurantAjax() {
    let clientID = "2EQ443BHONMJJ0ZGUNR4ZWXOJQPGBRWDWVV55UBLPSOS5B3E";
    let clientSecret = "YUCEUTQGZR3IAVPWFSB1C1ICQSKO1ABUBFEIKCRSWXMHVZQJ";
    let queryURL = "https://api.foursquare.com/v2/venues/explore?client_id=" + clientID + "&client_secret=" + clientSecret + "&v=20181127&limit=5&ll=" + myLat + "," + myLong + "&query='" + mainIng + "'";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (resp) {
        // confirm data received
        console.log(`Eat Street results:`);
        console.log(queryURL);
        console.log(resp);

        displayRestaurants(resp.response.groups["0"].items);
    });
}

function displayRestaurants(data) {
    // confirm the data exists first
    console.table(data);

    // dynamically create the content for each result
    for (let i = 0; i < data.length; i++) {
        // get values for the listing
        let name = data[i].venue.name;
        let venueID = data[i].venue.id;
        let address = data[i].venue.location.formattedAddress;
        let lat = data[i].venue.location.lat;
        let long = data[i].venue.location.lng;

        // create the content for the restaurtant
        let list = $("<li>").addClass("collection-item avatar");
        let link = $("<a>").attr("href", "#").attr("id", venueID).attr("data-lat", lat).attr("data-long", long);
        let icon = $("<i>").addClass("material-icons circle green").text("map");
        let title = $("<span>").addClass("title").html("<strong>" + name + "</strong>");
        let addr = $("<p>").html(address[0] + "<br>" + address[1] + "<br>" + address[2]);
        let fav = $("<a>").addClass("secondary-content").attr("href", "#");
        let favicon = $("<i>").addClass("material-icons").text("star");

        // combine elements and add to the DOM
        fav.append(favicon);
        link.append(icon);
        list.append(fav);
        list.append(link);
        list.append(title);
        list.append(addr);
        $("#restaurant-results").append(list);
    }
}

// function that checks to see if GPS capability is available
function getLocation() {
    event.preventDefault();

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            // set the values of the location
            myLat = parseFloat(position.coords.latitude);
            myLong = parseFloat(position.coords.longitude);
            $("#coord").html("Latitude: " + myLat + "<br>Longitude: " + myLong);
        });
    } else {
        $("#coord").text("Geolocation is not supported by this browser.");
    }
}


// surprise me array of top 20 ingredients and function
let topIngredients = [
    "chicken",
    "Brown+Rice",
    "Paella",
    "Tomatoes",
    "Sausage",
    "onions",
    "green+pepper",
    "pepper",
    "beans",
    "corn", 
    "beef",
    "garlic",
    "soy"
];
function surpriseMe() {
    // for (let i = 0; i < topIngredients.length; i++) {
    var item = topIngredients[Math.floor(Math.random()*topIngredients.length)];
    return item
}

// attach suprise me to a suprise me button
$(function () {
    //needs button id
    $("#surprise-me").on("click", function (event) {
        // stop the default behavior
        event.preventDefault();

        // grab the main-ingredient for the query
        mainIng = surpriseMe();

        // show the results area
        $("#recipes").css("display", "block");
        $("#restaurants").css("display", "block");

        // run the ajax calls
        restaurantAjax();
        recipeAjax();
    });

    $("#loc").on("click", getLocation);
});

// MAIN CODE =================================================

// document ready func.
$(function () {
    $("#submit").on("click", function (event) {
        // stop the default behavior
        event.preventDefault();

        // grab the main-ingredient for the query
        mainIng = $("#main-ing").val().trim();

        // show the results area
        $("#recipes").css("display", "block");
        $("#restaurants").css("display", "block");

        // run the ajax calls
        restaurantAjax();
        recipeAjax();
    });

    $("#loc").on("click", getLocation);
});





// favorites logic, needs revision for variables

// globals
let myFavourites = {
    // recipe1 = [
    // ]
};


// favorites logic
$(this).on("click", ".favorites", function(event) {
    try {
        $(this).attr("disabled", true);
        // going to need to store multiple attributes may become a global var
        var propToAdd = [];
        var propIDToAdd = $(this.closest("li").attr("src").attr());

        var myFavouriteRecipe = JSON.parse(localStorage.getItem("favProp"));

        if (myFavouriteRecipe == null){
            myFavouriteRecipe = [];
        }
        if (myFavouriteRecipe != null){
            for (var i=0; i < myFavouriteRecipe.length; i++) {
                if (propIDToAdd == myFavouriteRecipe[i]) {
                    alert("This item is already a favorite");
                    myFavouriteRecipe = [];
                }
            }
        }
        // else statement
        myFavouriteRecipe.push(propIDToAdd);
        myFavouriteRecipe.setItem("favProp", JSON.stringify(myFavourite));
    }
    catch (e) {
        if (e==QUOTA_EXCEEDED_ERR) {
            console.log("Error: local storage limit exceeds max");
            
        }
        else {
            console.log("ERROR: Saving to local storage.")
        }
    }
});
$(this).on("click", ".removeFavorites", function(event) {
        $(this).attr("disabled", true);

        var propIDToRemove = $(this.closest("p").attr("id"));

        var myFavourite = JSON.parse(localStorage.getItem("favProp"));

        if (myFavourite != null){
            for (var i=0; i < myFavourite.length; i++) {
                if (propIDToRemove == myFavourite[i]) {
                    alert("This property is has been removed");
                    delete myFavourite[i];
                    localStorage.setItem("favProp", JSON.stringify(myFavourite));
                    myFavourite =[];
                }
            }
        }
        
        if (myFavourite == null){
            alert("You have no favorite items")
        }
});

$(this).on("click", ".viewFavorites", function(event) {
    console.log("restoring array from data from local storage");

    myFavourite = JSON.parse(localStorage.getItem("favProp"));

    var output = $("<ul>")

    if (myFavourite != null) {
        for (var i = 0; data.properties.length; i++){
            for (var j = 0; j<myFavourite.length; j++) {

                if (data.properties[i].id == myFavourite[j]) {
                    output += "<h6><li>" + data.properties[i].bedrooms + " Bedrooms " + data.properties[i].type + $("</li></h5>") + "<img src=" + data.properties[i].picture + ">" + "<li><button> a href='" + data.properties[i].url + "'>Visitpage</a></button></li>"; 
                }
            }
        }
    }
    output += "</ul>";

    $("#placeholder").html(output);
    
});

$(this).on("click", ".viewFavorites", function(event) { 

    $("#placeholder").remove();

    myFavourite = JSON.parse(localStorage.getItem("favProp"));
    localStorage.clear();

});



// sign in page logic

function onSignIn(googleUser) {
  console.log("this is after signin press");

  var profile = googleUser.getBasicProfile();
  console.log(profile);

  $(".g-signin2").css("display", "none");
  $(".data").css("display", "block");
  $("#pic").attr('src', profile.getImageUrl());
  $("#emailAdd").text(profile.getEmail());
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

$("#go-back").click(function (e) {
  e.preventDefault();
  window.open("index.html")
});