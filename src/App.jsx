import React, { useState } from "react";

function App() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchBooks = async () => {
    if (!query) return;
    setLoading(true);
    setError("");
    setBooks([]);

    try {
      const res = await fetch(
        `https://openlibrary.org/search.json?title=${query}`
      );
      const data = await res.json();

      if (data.docs.length === 0) {
        setError("No books found. Try another title!");
      } else {
        setBooks(data.docs.slice(0, 10));
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">📚 Book Finder</h1>

      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Enter book title..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="px-4 py-2 rounded-lg border border-gray-300 w-72 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={searchBooks}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Search
        </button>
      </div>

      {loading && <p className="text-gray-600">Searching books...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-4xl">
        {books.map((book, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition"
          >
            {book.cover_i ? (
              <img
                src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                alt={book.title}
                className="w-full h-48 object-cover rounded-lg mb-3"
              />
            ) : (
              <div className="w-full h-48 bg-gray-300 rounded-lg mb-3 flex items-center justify-center text-gray-600">
                No Cover
              </div>
            )}

            <h2 className="font-semibold text-lg">{book.title}</h2>
            <p className="text-gray-600">
              {book.author_name ? book.author_name.join(", ") : "Unknown Author"}
            </p>
            <p className="text-sm text-gray-500">
              {book.first_publish_year
                ? `First Published: ${book.first_publish_year}`
                : ""}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
