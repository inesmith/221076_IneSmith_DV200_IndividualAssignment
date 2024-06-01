import React, { useEffect, useState } from 'react';
import { getArtworkById } from '../services/artworkService';
import './styling/ItemDetail.css';
import { useParams } from 'react-router-dom';

function ItemDetail() {
  const { id } = useParams();
  const [artwork, setArtwork] = useState(null);

  useEffect(() => {
    async function fetchArtwork() {
      try {
        const response = await getArtworkById(id);
        setArtwork(response.data);
      } catch (error) {
        console.error('Error fetching artwork:', error);
      }
    }
    fetchArtwork();
  }, [id]);

  if (!artwork) return <div>Loading...</div>;

  return (
    <div className="item-detail-container">
      <img src={artwork.imageUrl} alt={artwork.title} className="item-detail-image" />
      <div className="item-detail-info">
        <h1 className="item-detail-title">{artwork.title}</h1>
        <p className="item-detail-artist">by {artwork.artist}</p>
        <p className="item-detail-description">{artwork.description}</p>
        <p className="item-detail-price">${artwork.price}</p>
      </div>
    </div>
  );
}

export default ItemDetail;
