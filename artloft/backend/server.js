// server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.use(express.json());

// Basic CRUD routes
const Artwork = require('./models/Artwork');

// Create
app.post('/artworks', async (req, res) => {
  try {
    const artwork = new Artwork(req.body);
    await artwork.save();
    res.status(201).send(artwork);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Read
app.get('/artworks', async (req, res) => {
  try {
    const artworks = await Artwork.find();
    res.send(artworks);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update
app.put('/artworks/:id', async (req, res) => {
  try {
    const artwork = await Artwork.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!artwork) {
      return res.status(404).send();
    }
    res.send(artwork);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete
app.delete('/artworks/:id', async (req, res) => {
  try {
    const artwork = await Artwork.findByIdAndDelete(req.params.id);
    if (!artwork) {
      return res.status(404).send();
    }
    res.send(artwork);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(PORT, () => console.log(`Server running on port ${5000}`));
