# FlickFinder 🎬

FlickFinder is a movie search web application that lets users discover movies and explore their details through a simple, responsive interface.

## Features

- Search movies by title
- Browse curated movie recommendations on the home page
- View movie posters, release years, and other details
- Open a movie to view its genre, director, cast, IMDb rating, and plot
- Responsive layout for desktop and mobile screens
- Loading messages and error handling
- Close the movie details modal using the close button, clicking outside, or pressing Escape

## Technologies Used

- HTML5
- CSS3
- JavaScript
- OMDb API

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/RanveerCodes247/FlickFinder.git
```

### 2. Open the project

Open the project folder in your code editor.

### 3. Get an OMDb API key

Visit [OMDb API](https://www.omdbapi.com/apikey.aspx) and obtain your own API key.

### 4. Configure the API key

Open `script.js` and replace the placeholder with your own key:

```javascript
const API_KEY = "YOUR_OMDB_API_KEY";
```

Replace `YOUR_OMDB_API_KEY` with the key you obtained.

### 5. Run the application

Open `index.html` in your browser. An editor extension such as Live Server can also be used.

## Project Structure

```text
FlickFinder/
├── index.html
├── style.css
├── script.js
└── README.md
```

## API

Movie information is provided by the [Open Movie Database (OMDb) API](https://www.omdbapi.com/).

## Security Note

This is a frontend-only project. API keys used directly in browser-side JavaScript can be inspected through browser developer tools. Do not publish your personal API key in the repository. For a publicly deployed application using a shared key, a backend or serverless function is recommended.

## Author

[GitHub — RanveerCodes247](https://github.com/RanveerCodes247)