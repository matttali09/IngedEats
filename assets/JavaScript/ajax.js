// variables ===========================================
let mainIng = "";
let myLat = 28.59400;
let myLong = -81.20187;
let map;
let marker;

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
        $("#recipe-results").prepend(column);
    }
}

function restaurantAjax() {
    let clientID = "2EQ443BHONMJJ0ZGUNR4ZWXOJQPGBRWDWVV55UBLPSOS5B3E";
    let clientSecret = "YUCEUTQGZR3IAVPWFSB1C1ICQSKO1ABUBFEIKCRSWXMHVZQJ";
    let queryURL = "https://api.foursquare.com/v2/venues/explore?client_id=" + clientID + "&client_secret=" + clientSecret + "&v=20181127&limit=5&ll=" + myLat + "," + myLong + "&radius=15000&categoryId=4d4b7105d754a06374d81259&query='" + mainIng + "'";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (resp) {
        // confirm data received
        console.log(`Four Square results:`);
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
        $("#restaurant-results").prepend(list);

        // add the marker to the map
        marker = new mapboxgl.Marker()
            .setLngLat([long, lat])
            .setPopup(new mapboxgl.Popup({
                offset: 25
            }) // add popups
            .setHTML("<p>" + name + "<p>"))
            .addTo(map);
    }
}

// function that checks to see if GPS capability is available and then create the map
function getLocation() {
    event.preventDefault();

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            // set the values of the location
            myLat = parseFloat(position.coords.latitude);
            myLong = parseFloat(position.coords.longitude);
            $("#coord").html("Latitude: " + myLat + "<br>Longitude: " + myLong);

            // adds the map to the site
            mapboxgl.accessToken = 'pk.eyJ1Ijoid2lucGlsZGV1IiwiYSI6ImNqcDJzbnd1aDAwam8zd3BlejczaWwxa2EifQ.bLD5Bdgv8hiiXbaAIqjLdA';
            map = new mapboxgl.Map({
                container: 'map',
                style: 'mapbox://styles/mapbox/streets-v10',
                zoom: 13,
                center: [myLong, myLat]
            });
        });
    } else {
        $("#coord").text("Geolocation is not supported by this browser.");
    }
}

function surpriseMe() {
    // for (let i = 0; i < topIngredients.length; i++) {
    var item = topIngredients[Math.floor(Math.random() * topIngredients.length)];
    return item
}

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



// Favorites CODE =================================================

// favorites logic, needs revision for variables

// globals
let myFavourite = {
    // recipe1 = [
    // ]
};

// favorites logic
$(this).on("click", ".favorites", function (event) {
    try {
        // turn button off
        $(this).attr("disabled", true);
        // going to need to store multiple attributes may become a global var

        var propIDToAdd = $(this.closest("li").attr("src").attr());

        // initiate variable for local storage
        var myFavouriteRecipe = JSON.parse(localStorage.getItem("favProp"));

        //if favorite is null dont change
        if (myFavouriteRecipe == null) {
            myFavouriteRecipe = [];
        }
        // if not null and the item is but already favorite
        if (myFavouriteRecipe != null) {
            for (var i = 0; i < myFavouriteRecipe.length; i++) {
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
    // catch errors statements
    catch (e) {
        if (e == QUOTA_EXCEEDED_ERR) {
            console.log("Error: local storage limit exceeds max");

        } else {
            console.log("ERROR: Saving to local storage.")
        }
    }
});
// remove favorites function
$(this).on("click", ".removeFavorites", function (event) {
    //turn button off
    $(this).attr("disabled", true);

    // grab property to remove
    var propIDToRemove = $(this.closest("p").attr("id"));

    // premove from local storage
    var myFavourite = JSON.parse(localStorage.getItem("favProp"));

    // if my f property is in the storage remove it and alert that it has been removed
    if (myFavourite != null) {
        for (var i = 0; i < myFavourite.length; i++) {
            if (propIDToRemove == myFavourite[i]) {
                alert("This property is has been removed");
                delete myFavourite[i];
                localStorage.setItem("favProp", JSON.stringify(myFavourite));
                myFavourite = [];
            }
        }
    }
    // if my favourite array is empty
    if (myFavourite == null) {
        alert("You have no favorite items")
    }
});

// view favorites function
$(this).on("click", ".viewFavorites", function (event) {
    console.log("restoring array from data from local storage");

    myFavourite = JSON.parse(localStorage.getItem("favProp"));

    var output = $("<ul>")

    if (myFavourite != null) {
        for (var i = 0; data.properties.length; i++) {
            for (var j = 0; j < myFavourite.length; j++) {

                if (data.properties[i].id == myFavourite[j]) {
                    output += "<h6><li>" + data.properties[i].bedrooms + " Bedrooms " + data.properties[i].type + $("</li></h5>") + "<img src=" + data.properties[i].picture + ">" + "<li><button> a href='" + data.properties[i].url + "'>Visitpage</a></button></li>";
                }
            }
        }
    }
    output += "</ul>";

    $("#placeholder").html(output);

});
// remove favorite item funciton
$(this).on("click", ".removeFavorites", function (event) {

    $("#placeholder").remove();

    myFavourite = JSON.parse(localStorage.getItem("favProp"));
    localStorage.clear();

});



// SignIn CODE =================================================

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