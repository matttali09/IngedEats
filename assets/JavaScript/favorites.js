// globals
let favourites = [];


// favorites logic
$(this).on("click", ".favorites", function(event) {
    try {
        $(this).attr("disabled", true);

        var propIDToAdd = $(this.closest("p").attr("id"));

        var myFavriteProp = JSON.parse(localStorage.getItem("favProp"));

        if (myFavriteProp == null){
            myFavriteProp = [];
        }
        if (myFavriteProp != null){
            for (var i=0; i < myFavriteProp.length; i++) {
                if (propIDToAdd == myFavrteProp[i]) {
                    alert("This property is already a favorite");
                    myFavriteProp = [];
                }
            }
        }
        // else statement
        myFavriteProp.push(propIDToAdd);
        localStorage.setItem("favProp", JSON.stringify(myFavriteProp));
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

        var myFavriteProp = JSON.parse(localStorage.getItem("favProp"));

        if (myFavriteProp != null){
            for (var i=0; i < myFavriteProp.length; i++) {
                if (propIDToRemove == myFavriteProp[i]) {
                    alert("This property is has been removed");
                    delete myFavriteProp[i];
                    localStorage.setItem("favProp", JSON.stringify(myFaviteProp));
                    myFavriteProp =[];
                }
            }
        }
        
        if (myFavriteProp == null){
            alert("You have no favorite items")
        }
});

$(this).on("click", ".viewFavorites", function(event) {
    console.log("restoring array from data from local storage");

    myFaviteProp = JSON.parse(localStorage.getItem("favProp"));

    var output = $("<ul>")

    if (myFaviteProp != null) {
        for (var i = 0; data.properties.length; i++){
            for (var j = 0; j<myFaviteProp.length; j++) {

                if (data.properties[i].id == myFaviteProp[j]) {
                    output += $("<h6><li>") + data.properties[i].bedrooms + " Bedrooms " + data.properties[i].type + $("</li></h5>") + "<img src=" + data.properties[i].picture + ">" + "<li><button> a href='" + data.properties[i].url + "'>Visitpage</a></button></li>"; 
                }
            }
        }
    }
    output += "</ul>";

    $("#placeholder").html(output);
    
});

$(this).on("click", ".viewFavorites", function(event) { 

    $("#placeholder").remove();

    myFaviteProp = JSON.parse(localStorage.getItem("favProp"));
    localStorage.clear();

});