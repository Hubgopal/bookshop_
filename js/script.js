const books = [
  { title: "The Great Gatsby", author: "F. Scott Fitzgerald", genre: "Fiction" },
  { title: "Sapiens", author: "Yuval Noah Harari", genre: "Non-fiction" },
  { title: "Harry Potter", author: "J.K. Rowling", genre: "Fantasy" }
];

// Function to search books
function searchBooks() {
  const query = document.getElementById('searchInput').value.toLowerCase();
  const results = books.filter(book =>
      book.title.toLowerCase().includes(query) ||
      book.author.toLowerCase().includes(query) ||
      book.genre.toLowerCase().includes(query)
  );
  displayResults(results);
}

// Display results in the popup
function displayResults(results) {
  const resultContainer = document.getElementById('results');
  resultContainer.innerHTML = ""; // Clear previous results

  if (results.length === 0) {
      resultContainer.innerHTML = "<p>No books found.</p>";
  } else {
      results.forEach(book => {
          const bookItem = `<p>${book.title} by ${book.author} (${book.genre})</p>`;
          resultContainer.innerHTML += bookItem;
      });
  }

  // Show the popup if input is not empty
  const popup = document.getElementById('popupResults');
  if (results.length > 0 || document.getElementById('searchInput').value !== "") {
      popup.classList.remove('hidden');
  } else {
      popup.classList.add('hidden');
  }
}

// Close the popup
document.getElementById('closePopup').addEventListener('click', () => {
  document.getElementById('popupResults').classList.add('hidden');
});

// Optional: Close popup when clicking outside the content
document.getElementById('popupResults').addEventListener('click', (e) => {
  if (e.target === document.getElementById('popupResults')) {
      document.getElementById('popupResults').classList.add('hidden');
  }
});
