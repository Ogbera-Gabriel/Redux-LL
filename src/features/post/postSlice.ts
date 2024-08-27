import { Post } from '@/lib/types';
import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';


const initialState: Post[] = [
  {id: nanoid(), title: 'Learn Java', content: 'Java is used to develop various types of applications, including web applications, mobile apps (especially Android apps), desktop applications, games, and enterprise-level systems'},
  {id: nanoid(), title: 'Learn Python', content: 'Python’s syntax is straightforward and resembles plain English, making it an excellent language for beginners. The simplicity of the language reduces the learning curve, allowing new programmers to quickly understand and write Python code.'},
];

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    addPost: (
      state,
      action: PayloadAction<{ title: string; content: string }>
    ) => {
      const newPost: Post = {
        id: nanoid(),
        title: action.payload.title,
        content: action.payload.content
      }
      state.unshift(newPost);
    },
    deletePost: (state, action: PayloadAction<{ id: string }>) => {
      return state.filter((post) => post.id !== action.payload.id); 
    },
  },
});

export const { addPost, deletePost } = postSlice.actions;
export default postSlice.reducer;
