import Head from 'next/head';
import Header from '@/components/Header';
import SignInButton from '@/components/SignInButton';
import { getProviders } from 'next-auth/react';

export default function SignInPage({ providers }) {
  return (
    <>
      <Head>
        <title>Login Instagram</title>
        <meta
          name='description'
          content='Log into your Instagram account via various methods.'
        />
      </Head>
      <Header />
      <div className='relative flex justify-center space-x-7 mt-20'>
        <img
          className='absolute -top-11 hidden object-cover md:inline-flex md:w-96'
          src='https://like4like.com/img/hero-x750.png'
          alt='instagram-image'
          style={{ transform: 'translateX(-150px) rotate(-6deg)' }}
        />
        <div className='md:pl-48'>
          {Object.values(providers).map((provider) => (
            <div key={provider.name} className='flex flex-col items-center'>
              <img
                className='w-32 object-cover '
                src='https://png.monster/wp-content/uploads/2020/11/1560800886_instagram-logo-2-e285383a-370x359.png'
                alt='instagram-logo'
              />
              <p className='text-sm italic my-10'>
                This app is created for learning purposes
              </p>
              <SignInButton
                providerName={provider.name}
                providerId={provider.id}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const providers = await getProviders();
  return {
    props: {
      providers,
    },
  };
}
