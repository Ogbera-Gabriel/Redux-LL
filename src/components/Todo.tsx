import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { Input } from './ui/input';
import {
  addTodo,
  toggleTodo,
  deleteTodo,
} from '@/features/todo/todoSlice';
import { useState } from 'react';
import { toast } from 'sonner';

const Todo = () => {

  const [inputValue, setInputValue] = useState('');

  const todos = useAppSelector((state) => state.todo.todos);
  const dispatch = useAppDispatch();


  const handleAddTodo = () => {
    if (inputValue.trim() === '') {
      toast.error('Please enter a todo item');
      return;
    }
    dispatch(addTodo(inputValue));
    setInputValue('');
    toast.success(`Todo item ${inputValue} added`);
  };

  const handleToggleTodo = (id: number) => {
    dispatch(toggleTodo(id));
    toast.success(`Todo item ${id} ${todos[id - 1].completed ?  `${todos[id - 1].text} uncompleted` : `${todos[id - 1].text} completed`}`);
  };

  const handleDeleteTodo = (id: number) => {
    dispatch(deleteTodo(id));
    toast.error(`Todo item ${todos[id - 1].text} is deleted`);
  };

  
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold">Things to do</h1>
      <p className="text-2xl font-bold mb-4">TODO</p>

      <section className="flex w-[250px] max-w-sm items-center space-x-2 mb-4">
        <Input
          type="text"
          placeholder="Add Todo"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <Button onClick={handleAddTodo}>Enter</Button>
      </section>

      <ul className="w-[250px] max-w-sm list-none p-0 mb-6">
        <h2 className='font-bold'>My Todos</h2>
        {todos.map((todo) => (
          <li key={todo.id} className="flex items-center justify-between mb-2">
            <Checkbox
              id={`todo-${todo.id}`}
              checked={todo.completed}
              onCheckedChange={() => handleToggleTodo(todo.id)}
            />
            <span
              className={`flex-1 ml-2 ${todo.completed ? 'line-through' : ''}`}
            >
              {todo.text}
            </span>
            <Button
              variant="destructive"
              onClick={() => handleDeleteTodo(todo.id)}
            >
              Delete
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
