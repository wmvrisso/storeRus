const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors()); // Enable CORS middleware

// Endpoint to fetch books from a fake API
app.get('/api/books', async (req, res) => {
  try {
    // Fetch data from a fake API
    const response = await fetch('FAKE API go here'); // Replace with your desired fake API URL
    const books = await response.json();

    // Map the fake data to match your Book schema structure
    const mappedBooks = books.map(book => ({
      title: book.title,
      author: 'Unknown Author', // Placeholder value since fake API might not have an author field
      genre: 'Unknown Genre',  // Placeholder value
      description: book.body,  // Use the body of the fake API's post
      price: Math.floor(Math.random() * 50) + 10, // Generate a random price
      image: 'https://via.placeholder.com/150', // Placeholder image
    }));

    // Send the mapped books as a JSON response
    res.json(mappedBooks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch books from the API' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});