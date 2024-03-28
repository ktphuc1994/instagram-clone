import Image from 'next/image';
import {
  MagnifyingGlassIcon,
  PlusCircleIcon,
} from '@heroicons/react/24/outline';
import { HomeIcon } from '@heroicons/react/24/solid';

export default function Header() {
  return (
    <div className='flex items-center justify-between max-w-6xl mx-auto px-4'>
      {/** Left */}

      <div className='shrink-0 h-24 w-24 relative hidden lg:inline-grid cursor-pointer'>
        <Image
          src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/800px-Instagram_logo.svg.png'
          alt='instagram-logo'
          fill
          className='object-contain'
        />
      </div>
      <div className='shrink-0 h-24 w-10 relative lg:hidden cursor-pointer'>
        <Image
          src='https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/2048px-Instagram_logo_2016.svg.png'
          alt='instagram-logo'
          fill
          className='object-contain'
        />
      </div>

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
        <HomeIcon className='hidden md:inline-flex h-6 cursor-pointer hover:scale-125 transition-transform duration-200 ease-out' />
        <PlusCircleIcon className='h-6 cursor-pointer hover:scale-125 transition-transform duration-200 ease-out' />
        <img
          src='https://media.licdn.com/dms/image/C5603AQEeDVn0pnKpDQ/profile-displayphoto-shrink_800_800/0/1623814405277?e=2147483647&v=beta&t=6KsthbGW6_lqQg_GVW7rjiaeHk9rs4-uJx1eN_4OYtg'
          alt='user-image'
          className='h-10 w-10 rounded-full cursor-pointer'
        />
      </div>
    </div>
  );
}
