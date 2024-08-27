import { Post } from '@/lib/types';
import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';

const initialState: Post[] = [];

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    addPost: {
      reducer: (state, action: PayloadAction<Post>) => {
        state.unshift(action.payload);
      },
      prepare: (title: string, content: string, userId: string) => {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            userId,
            date: new Date().toISOString(),
            reactions: {
              thumbsUp: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              coffee: 0
            }
          }
        };
      },
    },
    reactionAdded(state, action: PayloadAction<{ postId: string; reaction: keyof Post['reactions'] }>) {
      const { postId, reaction } = action.payload;
      const existingPost = state.find((post) => post.id === postId);
      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    },
    deletePost: (state, action: PayloadAction<{ id: string }>) => {
      return state.filter((post) => post.id !== action.payload.id);
    },
  },
});

export const { addPost, deletePost, reactionAdded } = postSlice.actions;
export default postSlice.reducer;
