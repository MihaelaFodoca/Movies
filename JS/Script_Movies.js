document.getElementById("search_button").addEventListener("click", () => {
    fillMovieWrapper();
    clearForm();
});


function getResource(url) {
    return fetch(url,
        {
            method: "GET"
        }
    ).then(function (response) {
        return response.json();
    });
}

function fillMovieWrapper() {
    var searchCriterion = document.getElementById("search_form").value;
    getResource("http://www.omdbapi.com/?apikey=fe7364b5&r=json&plot=full&s=" + searchCriterion)
        .then(function (responsePromise) {
            displayMovies(responsePromise)
        });
}

function clearForm() {
    document.getElementById("search_form").value = "";
    document.getElementById("movie_container").innerHTML = "";
}

function displayMovies(responsePromise) {
    var searchResult = responsePromise.Search;
    searchResult.forEach(key => {
        if (key.Type == "movie") {
            document.getElementById("movie_container").innerHTML += "<div class='movie_wrapper'>" +
                "<img src=" + key.Poster + ">" + "<br>" +
                "<h3>" + key.Title + "</h3>" + "<p>" +
                key.Year + "</p>" +
                "<a id='details' target='_blank' rel='noopener noreferrer' href='MovieDetails.html" + "?imdbid=" + key.imdbID + "'>Details</a>" + "</div>"
        }
    });
}