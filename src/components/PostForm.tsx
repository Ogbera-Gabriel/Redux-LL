import { addPost } from '@/features/post/postSlice';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { useAppDispatch } from '@/app/hooks';
import { useState } from 'react';
import { toast } from 'sonner';


const PostForm = () => {
  const [value, setValue] = useState({ title: '', content: '' });
  const dispatch = useAppDispatch();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { title, content } = value;
    dispatch(
      addPost({
        title,
        content,
      })
    );
    //dispatch(addTodo(title)); NICE!!!
    toast.success(`Post ${title} added`);
    setValue({ title: '', content: '' });
  };
  return (
    <>
      <h3 className="text-2xl font-bold">Create Post</h3>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-[550px]">
        <Input
          placeholder="Enter post title"
          value={value.title}
          name="title"
          onChange={handleChange}
        />
        <Textarea
          placeholder="Enter post content"
          value={value.content}
          name="content"
          onChange={handleChange}
          className="h-[150px]"
        />
        <Button size="lg">Submit</Button>
      </form>
    </>
  );
};

export default PostForm;
