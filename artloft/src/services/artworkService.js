// services/artworkService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/artworks';

export const getArtworks = () => axios.get(API_URL);
export const getArtworkById = (id) => axios.get(`${API_URL}/${id}`);
export const createArtwork = (data) => axios.post(API_URL, data);
export const updateArtwork = (id, data) => axios.put(`${API_URL}/${id}`, data);
export const deleteArtwork = (id) => axios.delete(`${API_URL}/${id}`);
