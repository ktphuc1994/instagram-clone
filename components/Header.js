import Link from 'next/link';
import Image from 'next/image';
import {
  MagnifyingGlassIcon,
  PlusCircleIcon,
} from '@heroicons/react/24/outline';
import { HomeIcon } from '@heroicons/react/24/solid';
import { useRecoilState } from 'recoil';
import { modalState } from '@/atom/modalAtom';
import { useEffect } from 'react';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase';
import { userState } from '@/atom/userAtom';

export default function Header() {
  const [_open, setOpen] = useRecoilState(modalState);
  const [currentUser, setCurrentUser] = useRecoilState(userState);
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) return;

      const uid = user.providerData[0]?.uid;
      if (!uid) return;

      const fetchUser = async () => {
        const docRef = doc(db, 'users', uid);
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) return;

        setCurrentUser(docSnap.data());
      };
      fetchUser();
    });
  }, []);

  const onSignOut = () => {
    signOut(auth);
    setCurrentUser(null);
  };

  return (
    <div className='shadow-sm border-b sticky top-0 bg-white z-30'>
      <div className='flex items-center justify-between max-w-6xl mx-auto px-4'>
        {/** Left */}

        <Link
          href='/'
          className='shrink-0 h-24 w-24 relative hidden lg:inline-grid cursor-pointer'
        >
          <Image
            src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/800px-Instagram_logo.svg.png'
            alt='instagram-logo'
            fill
            sizes='96px'
            className='object-contain'
          />
        </Link>
        <Link
          href='/'
          className='shrink-0 h-24 w-10 relative lg:hidden cursor-pointer'
        >
          <Image
            src='https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/2048px-Instagram_logo_2016.svg.png'
            alt='instagram-logo'
            fill
            sizes='40px'
            className='object-contain'
          />
        </Link>

        {/** Middle */}
        <div className='relative mt-1 pl-4'>
          <div className='absolute top-1/2 left-6 -translate-y-1/2'>
            <MagnifyingGlassIcon className='h-5 text-gray-500' />
          </div>
          <input
            type='text'
            className='bg-gray-50 py-2 pl-9 pr-3 border border-gray-500 text-sm rounded-md w-full'
            placeholder='Search'
          />
        </div>

        {/** Right */}
        <div className='shrink-0 flex space-x-4 items-center'>
          <Link href='/'>
            <HomeIcon className='hidden md:inline-flex h-6 cursor-pointer hover:scale-125 transition-transform duration-200 ease-out' />
          </Link>
          {currentUser ? (
            <>
              <PlusCircleIcon
                onClick={() => {
                  setOpen(true);
                }}
                className='h-6 cursor-pointer hover:scale-125 transition-transform duration-200 ease-out'
              />
              <img
                src={currentUser.userImg}
                alt={currentUser.username}
                className='h-10 w-10 rounded-full cursor-pointer'
                onClick={onSignOut}
              />
            </>
          ) : (
            <Link href='/auth/signin'>Sign in</Link>
          )}
        </div>
      </div>
    </div>
  );
}
