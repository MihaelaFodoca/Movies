window.onload = () => {
    fillMovieDetailsWrapper();
};

function getResource(url) {
    return fetch(url,
        {
            method: "GET"
        }
    ).then(function (response) {
        return response.json();
    });
}
function fillMovieDetailsWrapper() {
    var url = document.URL;
    var url_array = url.split("=");
    var id = url_array[url_array.length - 1];
    console.log(id);
    getResource("http://www.omdbapi.com/?apikey=fe7364b5&r=json&plot=full&i=" + id)
        .then(function (responsePromise) {
            displayMovieDetails(responsePromise)
        });
}
function displayMovieDetails(responsePromise) {

    document.getElementById("title").innerHTML = "<h3>" + responsePromise.Title + " ( " + responsePromise.Year + " )" + "</h3>";
    document.getElementById("genre").innerHTML = "<p>" + responsePromise.Runtime + " | " + responsePromise.Genre + " | " + responsePromise.Released + " (" + responsePromise.Country + ")" + "</p>";
    document.getElementById("ratings").innerHTML = "<span id='star'>" + "<img src= Images/yellowstar.png>" + "   </span>" + "Rating: " + responsePromise.Ratings[0]["Value"];
    document.getElementById("poster").innerHTML = "<img id='poster_img' src=" + responsePromise.Poster + ">";
    document.getElementById("plot").innerHTML = responsePromise.Plot;
    document.getElementById("director").innerHTML = "Director: " + "<p>" + responsePromise.Director + "</p>";
    document.getElementById("writer").innerHTML = "Writer : " + "<p>" + responsePromise.Writer + "</p>";
    document.getElementById("actors").innerHTML = "Stars: " + "<p>" + responsePromise.Actors + "</p>";
}