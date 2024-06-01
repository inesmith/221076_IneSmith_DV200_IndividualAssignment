import React, { useEffect, useState } from 'react';
import { getArtworks } from '../services/artworkService';
import './styling/HomePage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

function Home() {
  const [artworks, setArtworks] = useState([]);

  useEffect(() => {
    async function fetchArtworks() {
      try {
        const response = await getArtworks();
        setArtworks(response.data);
      } catch (error) {
        console.error('Error fetching artworks:', error);
      }
    }
    fetchArtworks();
  }, []);

  return (
    <div className="home-container">
      <h1 className="header">Welcome to The Art Loft</h1>
      <div className="artworks-list">
        {artworks.map((artwork) => (
          <div key={artwork._id} className="artwork-item">
            <Link to="/create" className="btn btn-primary">Create New Artwork</Link>
            <img src={artwork.imageUrl} alt={artwork.title} />
            <h3>{artwork.title}</h3>
            <p>by {artwork.artist}</p>
            <p>${artwork.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;




