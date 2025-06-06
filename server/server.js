const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001; // Default to 3001 if no env port is set

// Serve static files from the React app build directory
app.use(express.static(path.join(__dirname, '../client/build')));

// The "catchall" handler: for any request that doesn't match one above,
// send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
  console.log('Serving static files from:', path.join(__dirname, '../client/build'));
  console.log('Serving index.html for all other requests from:', path.join(__dirname, '../client/build/index.html'));
});
