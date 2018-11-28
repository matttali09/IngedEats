// globals
let favorites = [];


// favorites logic
$(this).on("click", ".favorites", function(event) {
    event.preventDefault();
    $(this).css("color: lightgrey")
    var favsSRC = $(this).attr("data-value")
    var favsDiv = $("<div>")
    favsDiv.text($(this).val())
    favsDiv.attr(favsSRC);
    // $("#favorites").append(favsDiv);
});

// $(favsDiv).click(function(e) {
//     e.preventDefault();
//     window.open(favsDiv.attr("src"))
// })