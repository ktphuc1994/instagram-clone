import Header from '@/components/Header';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Instagram App Clone</title>
        <meta
          name='description'
          content='An Instagram Clone App by Robert Khuc, under guidance of Dr. Sahand Ghavidel'
        />
        <link ref='icon' href='/favicon.ico' />
      </Head>
      <main className=''>
        {/** Header */}
        <Header />

        {/** Feed */}

        {/** Modal */}
      </main>
    </>
  );
}
