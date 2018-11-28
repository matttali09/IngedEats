/* Form ID's
#main-ing
#sec-ing .... up to six ingredients
#cuisine
#addy
#geo-loc
#submit */

// variables ===========================================
let mainIng = "";
let secIng = "";
let thirdIng = "";
let fourthIng = "";
let fifthIng = "";
let sixthIng = "";
let myLat;
let myLong;
let address = "3024+Meadow+Lake+Ave.,+Largo,+FL";
let cuisine = "";

function recipeAjax() {
    let recipeAPIkey = "7872e935a7940ef06e573678577b1f1a";
    let recipeQueryURL = "https://www.food2fork.com/api/search?key=" + recipeAPIkey + "&q=" + mainIng + "&sort=r";

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
    for (let i = 0; i < 5; i++) {
        // make the card div
        let column = $("<div>").addClass("col s6 m6 l3");
        let card = $("<div>").addClass("card");

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
    for (let i = 0; i < 5; i++) {
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
        let favicon = $("<i>").addClass("material-icons favorites").text("star");

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

// MAIN CODE =================================================

// document ready func.
$(function () {
    $("#submit").on("click", function () {
        // stop the default behavior
        event.preventDefault();

        // open the results.html
        // window.open("results.html", "_top");

        // grab the main-ingredient for the query
        mainIng = $("#main-ing").val().trim();
        // secIng = $("#sec-ing").val().trim();
        // thirdIng = $("#third-ing").val().trim();
        // fourthIng = $("#fourth-ing").val().trim();
        // fifthIng = $("#fifth-ing").val().trim();
        // sixIng = $("#six-ing").val().trim();
        // address = $("#address").val().trim();
        // cuisine = $("#cuisine").val().trim();
        // dietRest = $("#diet-rest").val().trim();
        restaurantAjax();
        recipeAjax();
    });

    $("#loc").on("click", getLocation);
});