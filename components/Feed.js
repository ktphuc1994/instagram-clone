import { useSession } from 'next-auth/react';
import MiniProfile from './MiniProfile';
import PostList from './Posts/PostList';
import Stories from './Stories';
import Suggestions from './Suggestions';

export default function Feed() {
  const { data: session } = useSession();

  return (
    <main
      className={`grid ${
        session
          ? 'grid-cols-1 md:grid-cols-3 md:max-w-6xl mx-auto'
          : 'grid-cols-1 md:grid-cols-2 md:max-w-3xl mx-auto'
      }`}
    >
      <section className='md:col-span-2'>
        {/** Story */}
        <Stories />

        {/** Post */}
        <PostList />
      </section>

      <section className='hidden md:inline-grid md:col-span-1'>
        <div className='fixed w-[380px]'>
          {/** Mini Profile */}
          <MiniProfile />

          {/** Suggestion */}
          <Suggestions />
        </div>
      </section>
    </main>
  );
}
