import PostList from './Posts/PostList';
import Stories from './Stories';

export default function Feed() {
  return (
    <main>
      <section>
        {/** Story */}
        <Stories />

        {/** Post */}
        <PostList />
      </section>

      <section>
        {/** Mini Profile */}

        {/** Suggestion */}
      </section>
    </main>
  );
}
