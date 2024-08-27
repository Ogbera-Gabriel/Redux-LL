import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import PostForm from './PostForm';
import { Button } from './ui/button';
import { deletePost, reactionAdded } from '@/features/post/postSlice';
import { User } from '@/lib/types';
import TimeAgo from './timeAgo';
import { ThumbsUp, Heart, Rocket, Coffee, Smile } from 'lucide-react';

const reactionEmoji = {
  thumbsUp: <ThumbsUp className="h-4 w-4" />,
  wow: <Smile className="h-4 w-4" />,
  heart: <Heart className="h-4 w-4" />,
  rocket: <Rocket className="h-4 w-4" />,
  coffee: <Coffee className="h-4 w-4" />,
};

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

  const handleReaction = (postId: string, reaction: keyof typeof reactionEmoji) => {
    dispatch(reactionAdded({ postId, reaction }));
  }
  
  return (
    <div className="flex flex-col items-center justify-center mb-5 gap-4 w-[550px]">
      <PostForm />

      <h3 className="text-2xl font-bold">Posts</h3>
      {posts.map((post) => (
        <Card key={post.id} className='w-full'>
          <CardHeader>
            <CardTitle>{post.title}</CardTitle>
            <p className="text-sm text-muted-foreground">by {getUserName(post.userId)}</p>
          </CardHeader>
          <CardContent>
            <p>{post.content}</p>
          </CardContent>
          <CardFooter className="flex flex-col items-start gap-2">
            <div className="flex justify-between w-full items-center">
              <TimeAgo timeStamp={post.date}/>
              <Button variant="destructive" size="sm" onClick={() => handleDelete(post.id)}>
                Delete
              </Button>
            </div>
            <div className="flex gap-2">
              {Object.entries(reactionEmoji).map(([name, emoji]) => (
                <Button
                  key={name}
                  variant="outline"
                  size="sm"
                  onClick={() => handleReaction(post.id, name as keyof typeof reactionEmoji)}
                >
                  {emoji} {post.reactions[name as keyof typeof reactionEmoji]}
                </Button>
              ))}
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default PostsList;
