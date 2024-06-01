import React, { useState } from 'react';
import { createArtwork } from '../services/artworkService';
import './styling/CreateItem.css';

function CreateItem() {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newItem = { title, artist, description, price };
    try {
      await createArtwork(newItem);
    } catch (error) {
      
    }
  };

  return (
    <div className="create-item-container">
      <h1 className="header">Create New Artwork</h1>
      <form onSubmit={handleSubmit} className="create-item-form">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
        />
        <input
          type="text"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
          placeholder="Artist"
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
          required
        />
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default CreateItem;


