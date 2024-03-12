const express = require('express');
const shortid = require('shortid');

const app = express();
const PORT = process.env.PORT || 3000;

const urls = {}; // In-memory storage for URLs

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Route to shorten URL
app.post('/shorten', (req, res) => {
  const { originalUrl } = req.body;
  if (originalUrl) {
    const shortUrl = shortid.generate();
    urls[shortUrl] = originalUrl;
    res.json({ shortUrl: `https://snipurl.onrender.com/${shortUrl}` });
  } else {
    res.status(400).json({ error: 'Invalid URL' });
  }
});

// Route to redirect to original URL
app.get('/:shortUrl', (req, res) => {
  const { shortUrl } = req.params;
  const originalUrl = urls[shortUrl];
  if (originalUrl) {
    res.redirect(originalUrl);
  } else {
    res.status(404).json({ error: 'URL not found' });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
