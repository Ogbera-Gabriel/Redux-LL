import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import PostForm from './PostForm';
import { Button } from './ui/button';
import { deletePost } from '@/features/post/postSlice';
import { User } from '@/lib/types';
import TimeAgo from './timeAgo';


const PostsList = () => {
  const posts = useAppSelector((state) => state.post);
  const users = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();


  const handleDelete = (id: string) => {
    dispatch(deletePost({ id }));
  }

  const getUserName = (userId: string): string => {
    const user = users.find((user: User) => user.id === userId);
    return user ? user.name : 'Unknown User';
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
          <CardFooter className="flex justify-between">
            <span>by {getUserName(post.userId)}</span>
            <TimeAgo  timeStamp={post.date}/>
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
