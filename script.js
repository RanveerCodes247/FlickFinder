const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const movieResults = document.getElementById("movie-results");
const resultsHeading = document.getElementById("results-heading");
const statusMessage = document.getElementById("status-message");
const movieModal = document.getElementById("movie-modal");
const movieDetails = document.getElementById("movie-details");
const closeModal = document.getElementById("close-modal");

const API_KEY = "YOUR_OMDB_API_KEY";

searchForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const movieName = searchInput.value.trim();

    if (movieName === "") {
        movieResults.replaceChildren();
        statusMessage.textContent = "Please enter a movie name.";
        return;
    }

    movieResults.replaceChildren();
    resultsHeading.textContent = "Search Results";
    statusMessage.textContent = "Searching for movies...";

    try {
        const url =
            `https://www.omdbapi.com/?s=${encodeURIComponent(movieName)}&apikey=${API_KEY}`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("The server returned an error.");
        }

        const data = await response.json();

        if (data.Response === "False") {
            if (data.Error === "Movie not found!") {
                statusMessage.textContent =
                    `No movies found for "${movieName}". Try another title.`;
            } else if (data.Error === "Invalid API key!") {
                statusMessage.textContent =
                    "Invalid API key. Please check your OMDb API key.";
            } else if (data.Error === "Request limit reached!") {
                statusMessage.textContent =
                    "The movie search limit has been reached. Try again later.";
            } else {
                statusMessage.textContent =
                    "Unable to search for movies right now. Please try again.";
            }

            return;
        }

        if (!Array.isArray(data.Search) || data.Search.length === 0) {
            statusMessage.textContent = "No movies found. Try another title.";
            return;
        }

        displayMovies(data.Search);
        statusMessage.textContent = "";

    } catch (error) {
        console.error("Movie search failed.");
        statusMessage.textContent =
            "Unable to connect to the movie service. Check your internet and try again.";
    }
});

function displayMovies(movies) {
    movieResults.replaceChildren();

    movies.forEach(function (movie) {
        const movieCard = document.createElement("div");
        movieCard.classList.add("movie-card");
        movieCard.style.cursor = "pointer";

        movieCard.addEventListener("click", function () {
            showMovieDetails(movie.imdbID);
        });

        const poster = document.createElement("img");
        poster.classList.add("movie-poster");
        poster.src = movie.Poster !== "N/A"
            ? movie.Poster
            : "https://placehold.co/300x450?text=No+Poster";
        poster.alt = `Poster of ${movie.Title}`;

        const title = document.createElement("h3");
        title.textContent = movie.Title;

        const year = document.createElement("p");
        year.textContent = `Year: ${movie.Year}`;

        movieCard.append(poster, title, year);
        movieResults.appendChild(movieCard);
    });
}

async function showMovieDetails(imdbID) {
    movieModal.classList.remove("hidden");
    document.body.classList.add("modal-open");

    movieDetails.textContent = "Loading movie details...";

    try {
        const url =
            `https://www.omdbapi.com/?i=${encodeURIComponent(imdbID)}&apikey=${API_KEY}`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Failed to fetch movie details.");
        }

        const movie = await response.json();

        if (movie.Response === "False") {
            movieDetails.textContent = "Unable to load movie details.";
            return;
        }

        movieDetails.replaceChildren();

        const poster = document.createElement("img");
        poster.src = movie.Poster !== "N/A"
            ? movie.Poster
            : "https://placehold.co/300x450?text=No+Poster";
        poster.alt = `Poster of ${movie.Title}`;

        const title = document.createElement("h2");
        title.textContent = movie.Title;

        movieDetails.append(poster, title);

        const details = [
            ["Year", movie.Year],
            ["Genre", movie.Genre],
            ["Director", movie.Director],
            ["Cast", movie.Actors],
            ["IMDb Rating", movie.imdbRating],
            ["Plot", movie.Plot]
        ];

        details.forEach(function (detail) {
            const paragraph = document.createElement("p");
            const label = document.createElement("strong");

            label.textContent = detail[0] + ": ";

            const value =
                detail[1] && detail[1] !== "N/A"
                    ? detail[1]
                    : "Not available";

            paragraph.append(
                label,
                document.createTextNode(value)
            );

            movieDetails.appendChild(paragraph);
        });

    } catch (error) {
        console.error("Unable to load movie details.");
        movieDetails.textContent =
            "Something went wrong while loading movie details.";
    }
}

function closeMovieModal() {
    movieModal.classList.add("hidden");
    document.body.classList.remove("modal-open");
}

closeModal.addEventListener("click", closeMovieModal);

movieModal.addEventListener("click", function (event) {
    if (event.target === movieModal) {
        closeMovieModal();
    }
});

document.addEventListener("keydown", function (event) {
    if (
        event.key === "Escape" &&
        !movieModal.classList.contains("hidden")
    ) {
        closeMovieModal();
    }
});


async function loadRecommendations() {
   const recommendedMovieIDs = [
    "tt1375666",
    "tt0816692",
    "tt0468569",
    "tt0111161",
    "tt4633694",
    "tt0133093",
    "tt0109830",
    "tt0120737"
];

    resultsHeading.textContent = "Popular Picks";
    statusMessage.textContent = "Loading recommendations...";

    try {
        const moviePromises = recommendedMovieIDs.map(async function (id) {
            const url =
                `https://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`;

            const response = await fetch(url);

            if (!response.ok) {
                return null;
            }

            const movie = await response.json();

            if (movie.Response === "False") {
                return null;
            }

            return movie;
        });

        const movies = await Promise.all(moviePromises);
        const validMovies = movies.filter(function (movie) {
            return movie !== null;
        });

        if (validMovies.length === 0) {
            statusMessage.textContent =
                "Recommendations are unavailable right now. Try searching for a movie.";
            return;
        }

        displayMovies(validMovies);
        statusMessage.textContent = "";

    } catch (error) {
        statusMessage.textContent =
            "Unable to load recommendations. You can still search for movies.";
    }
}

loadRecommendations();
