import { Todo, TodoState } from "@/lib/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: TodoState = {
    todos: [],
    filter: "all",
};

const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        addTodo: (state, action: PayloadAction<string>) => {
            const newTodo: Todo = {
                id: state.todos.length + 1,
                text: action.payload,
                completed: false,
            };
            state.todos.unshift(newTodo);
        },
        toggleTodo: (state, action: PayloadAction<number>) => {
            const todo = state.todos.find(t => t.id === action.payload);
            if (todo) {
                todo.completed = !todo.completed;
            }
        },
        deleteTodo: (state, action: PayloadAction<number>) => {
            state.todos = state.todos.filter(t => t.id !== action.payload);
        },
        setFilter: (state, action: PayloadAction<"all" | "active" | "completed">) => {
            state.filter = action.payload;
        },
    },
});

export const { addTodo, toggleTodo, deleteTodo, setFilter } = todoSlice.actions;
export default todoSlice.reducer;
