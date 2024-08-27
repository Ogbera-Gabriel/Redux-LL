export type Todo = {
    id: number;
    text: string;
    completed: boolean;
};


export type TodoState = {
    todos: Todo[];
    filter: "all" | "active" | "completed";
};

export type Post = {
    userId: string;
    id: string;
    title: string;
    content: string
}

export type User = {
    id: string;
    name: string;
}