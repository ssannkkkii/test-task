import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';

export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async () => {
    const response = await axios.get('http://localhost:8000/api/comments/');
    return response.data;
  }
);

interface Comment {
  id: number;
  description: string;
  product: number;
}

interface CommentsState {
  comments: Comment[];
}

const initialState: CommentsState = {
  comments: [],
};

export const createComment = createAsyncThunk(
  'comments/createComment',
  async (commentData: { sneakerId: number; description: string }) => {
    const response = await axios.post(
      'http://localhost:8000/api/comments/', 
      {
        product: commentData.sneakerId,
        description: commentData.description,
      }
    );
    return response.data;
  }
);

export const deleteComment = createAsyncThunk(
  'comments/deleteComment',
  async (commentId: number) => {
    await axios.delete(`http://localhost:8000/api/comments/${commentId}/`);
    return commentId;
  }
);

export const selectCommentsByProductId = (state: RootState, productId: number): Comment[] => {
  return state.comments.filter((comment) => comment.product === productId);
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState: [] as Comment[],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.fulfilled, (state, action) => {
        return action.payload;  // Оновлення state на отримані коментарі
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.push(action.payload);  // Додавання нового коментаря
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        return state.filter((comment) => comment.id !== action.payload); // Видалення коментаря
      });
  },
});

export default commentsSlice.reducer;