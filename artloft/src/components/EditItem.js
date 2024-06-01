import React, { useEffect, useState } from 'react';
import { getArtworkById, updateArtwork } from '../services/artworkService';
import './styling/EditItem.css';
import { useParams } from 'react-router-dom';

function EditItem() {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    async function fetchArtwork() {
      try {
        const response = await getArtworkById(id);
        const { title, artist, description, price } = response.data;
        setTitle(title);
        setArtist(artist);
        setDescription(description);
        setPrice(price);
      } catch (error) {
        console.error('Error fetching artwork:', error);
      }
    }
    fetchArtwork();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedItem = { title, artist, description, price };
    try {
      await updateArtwork(id, updatedItem);
      // Handle successful update (e.g., redirect to item detail or home)
    } catch (error) {
      // Handle error
    }
  };

  return (
    <div className="edit-item-container">
      <h1 className="header">Edit Artwork</h1>
      <form onSubmit={handleSubmit} className="edit-item-form">
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
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default EditItem;
