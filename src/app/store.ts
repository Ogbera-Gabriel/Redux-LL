import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import todoReducer from "../features/todo/todoSlice";
import postReducer from "../features/post/postSlice";


const loadState = () => {
	try {
		const serializedTodoState = localStorage.getItem('todoState');
		const serializedPostState = localStorage.getItem('posts');
		const serializedCounterState = localStorage.getItem('counterState');
		
		return {
			todo: serializedTodoState ? JSON.parse(serializedTodoState) : undefined,
			post: serializedPostState ? JSON.parse(serializedPostState) : undefined,
			counter: serializedCounterState ? JSON.parse(serializedCounterState) : undefined,
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