import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Size {
  id: number;
  size: number;
  stock: number;
}

interface Brand {
  id: number;
  name: string;
}

interface Category {
  id: number;
  name: string;
}

interface Sneaker {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  brand: Brand; // Update this
  category: Category; // Update this
  created_at: string;
  sizes: Size[];
}

interface SneakersState {
  sneakers: Sneaker[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: SneakersState = {
  sneakers: [],
  status: 'idle',
};

export const fetchSneakers = createAsyncThunk(
  'sneakers/fetchSneakers',
  async () => {
    const response = await axios.get('http://localhost:8000/api/sneakers/');
    return response.data; 
  }
);

export const deleteSneaker = createAsyncThunk(
  'sneakers/deleteSneaker',
  async (id: number) => {
    await axios.delete(`http://localhost:8000/api/sneakers/${id}/`); // Fixed the string interpolation
    return id;
  }
);

export const createSneaker = createAsyncThunk(
  'sneakers/createSneaker',
  async (formData: FormData) => {
    const response = await axios.post('http://localhost:8000/api/sneakers/', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  }
);

const sneakersSlice = createSlice({
  name: 'sneakers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSneakers.fulfilled, (state, action) => {
        state.status = 'idle';
        state.sneakers = action.payload;
      })
      .addCase(deleteSneaker.fulfilled, (state, action) => {
        state.sneakers = state.sneakers.filter(sneaker => sneaker.id !== action.payload);
      })
      .addCase(createSneaker.fulfilled, (state, action) => {
        state.sneakers.unshift(action.payload);
      });      
  },
});

export default sneakersSlice.reducer;