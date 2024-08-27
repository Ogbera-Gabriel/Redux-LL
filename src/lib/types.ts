export type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

export type TodoState = {
  todos: Todo[];
  filter: 'all' | 'active' | 'completed';
};

export type Post = {
  userId: string;
  id: string;
  title: string;
  content: string;
  date: string;

  reactions: {
    thumbsUp: number;
    wow: number;
    heart: number;
    rocket: number;
    coffee: number;
  };
};

export type User = {
  id: string;
  name: string;
};
