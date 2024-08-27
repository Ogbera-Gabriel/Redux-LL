import { User } from '@/lib/types';
import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState: User[] = [
  { id: nanoid(), name: 'John Black' },
  { id: nanoid(), name: 'Jane Aple' },
  { id: nanoid(), name: 'Jim Brook' },
];

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
});

export default usersSlice.reducer;
