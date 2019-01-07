var animalButtons = ["cats", "fish", "lemurs", "kangaroos", "turtles", "platypi", "koalas"];

function createButtons()  {
$("#newButtons").empty();
for (var i = 0; i < animalButtons.length; i++)  {
    $("#newButtons").append('<button class="animals-button btn btn-warning">' + animalButtons[i] + '</button>');
    }
}

$("#addAnimals").on("click", function() {
    var animalNew = $("#animalsCreate").val()
    $("#newButtons").append(
        "<button class='animals-button btn btn-warning' value="+animalNew+">"+animalNew+"</button>"
    )
})

console.log($("#buttonTime").val())

$(document).on('click', '.animals-button', function(event)    {
    event.preventDefault();
    $("#animals").empty();
    var animal = this.innerText;
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&limit=10&api_key=8PEQC9SGkCD2S1w9r090LKanUQGqpPjj";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response)  {
        var results = response.data;
        for (var i = 0; i < results.length; i++)  {

            var image = $("<img>");
            image.attr('src', results[i].images.fixed_height.url);
            image.attr('data-pause', results[i].images.fixed_height_still.url);
            image.attr('state', "animate");
            image.attr('data-animate', results[i].images.fixed_height.url);
            
            image.addClass("animate");
            $("#animals").append(image);

            // $(document).on("click", ".animals", function()  {
               // $(image).attr('data-pause');
                // console.log($(this).attr("state"));
            // });

            // ^ Could not get a pause function to work.

        var rating = results[i].rating;
        var parag = $("<p>").text("Rating: " + rating);
    
        $("#animals").append(parag);
        }
    });

    $("#animals").empty();
});

createButtons();