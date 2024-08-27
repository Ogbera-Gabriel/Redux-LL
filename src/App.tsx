import './App.css';
import Counter from './components/Counter';
import PostsList from './components/PostsList';
import Todo from './components/Todo';
import { Toaster } from './components/ui/sonner';

function App() {
  return (
    <main className='flex flex-col items-center justify-center h-full'>
      <h1 className='text-4xl mb-6'>Redux Toolkit</h1>
      <PostsList />
      <Todo />
      <Counter />
      <Toaster />
    </main>
  );
}

export default App;
