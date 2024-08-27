import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import PostForm from './PostForm';
import { Button } from './ui/button';
import { deletePost } from '@/features/post/postSlice';

const PostsList = () => {
  const posts = useAppSelector((state) => state.post);
  console.log(posts)
  const dispatch = useAppDispatch();
  const handleDelete = (id: string) => {
    console.log(id)
    dispatch(deletePost({ id }));
  }
  
  return (
    <div className="flex flex-col items-center justify-center mb-5 gap-4 w-[450px]">
      <PostForm />

      <h3 className="text-2xl font-bold">Posts</h3>
      {posts.map((post) => (
        <Card key={post.id} className='w-full'>
          <CardHeader>
            <CardTitle>{post.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{post.content}</p>
          </CardContent>
          <CardFooter className="justify-end">
            <Button variant="destructive" onClick={() => handleDelete(post.id)}>
                Delete
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default PostsList;
