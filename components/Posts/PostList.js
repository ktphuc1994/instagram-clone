import PostItem from './PostItem';

const posts = [
  {
    id: '1',
    username: 'robertkhuc',
    userImage:
      'https://media.licdn.com/dms/image/C5603AQEeDVn0pnKpDQ/profile-displayphoto-shrink_800_800/0/1623814405277?e=2147483647&v=beta&t=6KsthbGW6_lqQg_GVW7rjiaeHk9rs4-uJx1eN_4OYtg',
    img: 'https://plus.unsplash.com/premium_photo-1710267557925-4c05618b8caf?q=80&w=869&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    caption: 'Thanks for the meals.',
  },
  {
    id: '2',
    username: 'robin.khuc',
    userImage:
      'https://i.pinimg.com/280x280_RS/c8/c0/b7/c8c0b7e5b7d4f00b4b0a21399b880f87.jpg',
    img: 'https://images.unsplash.com/photo-1707234862402-c0b3f21bcda3?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    caption: 'To the top.',
  },
];

export default function PostList() {
  return (
    <div>
      {posts.map((post) => (
        <PostItem key={post.id} {...post} />
      ))}
    </div>
  );
}
