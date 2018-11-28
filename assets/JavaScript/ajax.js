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
let lat;
let long;
let address = "3024+Meadow+Lake+Ave.,+Largo,+FL";
let cuisine = "";

function restaurantAjax() {
    let clientID = "2EQ443BHONMJJ0ZGUNR4ZWXOJQPGBRWDWVV55UBLPSOS5B3E";
    let clientSecret = "YUCEUTQGZR3IAVPWFSB1C1ICQSKO1ABUBFEIKCRSWXMHVZQJ";
    let queryURL = "https://api.foursquare.com/v2/venues/explore?client_id=" + clientID + "&client_secret=" + clientSecret + "&v=20181127&limit=5&ll=" + lat + "," + long + "&query=" + mainIng;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (resp) {
        // confirm data received
        console.log(`Eat Street results:`);
        console.log(queryURL);
        console.log(resp);

    });
}

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
        displayOnPage(resp.recipes);
    });
}

function displayOnPage(data) {
    console.table(data);
    for (let i = 0; i < 5; i++) {
        // make the card div
        let card = $("<div>").addClass("card");
        console.log(`I'm making a card. i is: ${i}`);

        // make the div for the image
        let cardImage = $("<div>").addClass("card-image waves-effect waves-block waves-light");
        let image = $("<img>").addClass("activator").attr("src", data[i].image_url);
        cardImage.append(image);

        // make the card content
        let cardContent = $("<div>").addClass("card-content");
        let title = $("<p>").addClass("card-title activator grey-text text-darken-4").text(data[i].title);
        let link = $("<a>").attr("href", data[i].source_url).text("Click here!");
        cardContent.append(title, link);

        // make the hidden card revealed info
        // let cardReveal = $("<div").addClass("card-reveal");
        // let title2 = $("<span>").addClass("card-title grey-text text-darken-4").text(data[i].title);
        // let exitIcon = $("<i>").addClass("material-icons right").text("more_vert");
        // 
        // title2.append(exitIcon);
        // cardReveal.append(title);
        // cardReveal.append(link);

        // put the content on the DOM
        card.append(cardImage);
        card.append(cardContent);
        // card.append(cardReveal);
        $("#recipe-results").append(card);
    }
}

// function that checks to see if GPS capability is available
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        $("#coord").text("Geolocation is not supported by this browser.");
    }
}

// if GPS is available, it saves the latitude and longitude
function showPosition(position) {
    // set the values of the location
    lat = parseFloat(position.coords.latitude);
    long = parseFloat(position.coords.longitude);
    $("#coord").html("Latitude: " + lat +
        "<br>Longitude: " + long);
}

// document ready func.
$(function () {
    $("#submit").on("click", function () {
        // stop the default behavior
        event.preventDefault();

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
        //recipeAjax();
    });

    $("#loc").on("click", getLocation);
});