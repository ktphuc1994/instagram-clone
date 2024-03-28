import Feed from '@/components/Feed';
import Header from '@/components/Header';
import Head from 'next/head';

export default function Home() {
  return (
    <div className='bg-gray-50 min-h-screen'>
      <Head>
        <title>Instagram App Clone</title>
        <meta
          name='description'
          content='An Instagram Clone App by Robert Khuc, under guidance of Dr. Sahand Ghavidel'
        />
        <link ref='icon' href='/favicon.ico' />
      </Head>
      {/** Header */}
      <Header />

      {/** Feed */}
      <Feed />

      {/** Modal */}
    </div>
  );
}
