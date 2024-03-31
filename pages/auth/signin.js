import Head from 'next/head';
import Header from '@/components/Header';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { db } from '@/firebase';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';

export default function SignInPage() {
  const router = useRouter();

  const onGoogleClick = async () => {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      const user = auth.currentUser.providerData[0];
      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) return;

      await setDoc(docRef, {
        name: user.displayName,
        email: user.email,
        userImg: user.photoURL,
        uid: user.uid,
        timestamp: serverTimestamp(),
        username: user.displayName.split(' ').join('.').toLocaleLowerCase(),
      });

      router.push('/');
    } catch (error) {
      console.log(error);
    }
  };

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
          <div className='flex flex-col items-center'>
            <img
              className='w-32 object-cover '
              src='https://png.monster/wp-content/uploads/2020/11/1560800886_instagram-logo-2-e285383a-370x359.png'
              alt='instagram-logo'
            />
            <p className='text-sm italic my-10'>
              This app is created for learning purposes
            </p>
            <button
              onClick={onGoogleClick}
              className='bg-red-400 rounded-lg p-3 text-white hover:bg-red-500'
            >
              Sign in with Google
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
