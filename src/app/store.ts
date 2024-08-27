import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import todoReducer from "../features/todo/todoSlice";
import postReducer from "../features/post/postSlice";
import userReducer from "../features/user/usersSlice";


const loadState = () => {
	try {
		const serializedTodoState = localStorage.getItem('todoState');
		const serializedPostState = localStorage.getItem('posts');
		const serializedCounterState = localStorage.getItem('counterState');
		const serializedUserState = localStorage.getItem('users');
		
		return {
			todo: serializedTodoState ? JSON.parse(serializedTodoState) : undefined,
			post: serializedPostState ? JSON.parse(serializedPostState) : undefined,
			counter: serializedCounterState ? JSON.parse(serializedCounterState) : undefined,
			user: serializedUserState ? JSON.parse(serializedUserState) : undefined
		};
	} catch (error) {
		console.log("Failed to load state: ", error)
		return undefined;
	}
}

const saveState = (state: RootState) => {
	try {
		localStorage.setItem('todoState', JSON.stringify(state.todo));
		localStorage.setItem('posts', JSON.stringify(state.post));
		localStorage.setItem('counterState', JSON.stringify(state.counter));
		localStorage.setItem('users', JSON.stringify(state.user));
	} catch (error) {
		console.log("Failed to save state: ", error)
	}
}

const preloadedState = loadState();
const store = configureStore({
	reducer: {
		todo: todoReducer,
		counter: counterReducer,
		post: postReducer,
		user: userReducer,
	},
	preloadedState,
});

store.subscribe(() => {
	const state = store.getState();
	saveState(state);
});

export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch