# 🎬 Movie Watchlist Web App

A responsive movie search and watchlist web application using the OMDB API. Users can search for movies, view details, add/remove from their watchlist, and persist data using `localStorage`.

🔗 **Live Site**: [https://amazing-nasturtium-2930f6.netlify.app/](https://amazing-nasturtium-2930f6.netlify.app/)

---

## 💡 What I Learned

### ✅ JavaScript (JS)

- **DOM Manipulation**  
  - Used `document.querySelector`, `getElementById`, and `closest()` to access and update HTML elements.
  - Rendered dynamic content using template strings and `.innerHTML`.

- **Event Listeners**  
  - Attached events to buttons like `add`, `remove`, and `read more`.

- **Async/Await & Fetch API**  
  - Retrieved movie data from the OMDB API using `fetch()` and handled it with `async/await`.

- **LocalStorage**  
  - Saved and loaded watchlist data using `localStorage` with `JSON.parse()` and `JSON.stringify()`.

- **Array Methods**  
  - `forEach` for rendering lists.
  - `filter` for removing items from the watchlist.
  - `some` to check if a movie was already saved.

- **Class Toggling**  
  - Dynamically showed or hid buttons by toggling CSS classes (`addbtn`, `removebtn`, `nodisplay`).

- **State Persistence**  
  - Saved search results and watchlist in `localStorage` so they persist after refreshing.

---

### ✅ HTML

- **Semantic Tags**  
  - Structured the page using elements like `<header>`, `<input>`, `<button>`, etc.

- **Logical Page Structure**  
  - Split into sections: Header, Search Bar, Movie Display, Watchlist.

- **User Input Handling**  
  - Used form inputs and buttons to handle user interactions.

---

### ✅ CSS

- **Flexbox Layouts**  
  - Built clean, responsive sections using `flexbox`, `gap`, and alignment properties.

- **Responsive Design**  
  - Scaled layout and fonts with `rem` and `em`, and applied media queries for larger screens.

- **Custom Styling**  
  - Styled search bar, movie cards, and buttons with shadows, borders, and hover effects.

- **Text Clamping**  
  - Used `-webkit-line-clamp` to show only a few lines of text, with a `Read more` toggle.

---

## 🔗 Technologies Used

- **HTML5**
- **CSS3**
- **JavaScript (ES6+)**
- **OMDB API**
- **localStorage**

---

## 🚀 Features

- Search for movies using OMDB API.
- Add or remove movies from your personal watchlist.
- Watchlist persists on page reload using localStorage.
- Responsive UI that looks great on mobile and desktop.
- Toggle movie plot summaries with “Read more / Read less”.

---

## 📁 Folder Structure

