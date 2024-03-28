import Image from 'next/image';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function Header() {
  return (
    <div className='flex items-center justify-between max-w-6xl mx-auto'>
      {/** Left */}

      <div className='h-24 w-24 relative hidden lg:inline-grid cursor-pointer'>
        <Image
          src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/800px-Instagram_logo.svg.png'
          alt='instagram-logo'
          fill
          className='object-contain'
        />
      </div>
      <div className='h-24 w-10 relative lg:hidden cursor-pointer'>
        <Image
          src='https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/2048px-Instagram_logo_2016.svg.png'
          alt='instagram-logo'
          fill
          className='object-contain'
        />
      </div>

      {/** Middle */}
      <div className='relative mt-1'>
        <div className='absolute top-1/2 left-2 -translate-y-1/2'>
          <MagnifyingGlassIcon className='h-5 text-gray-500' />
        </div>
        <input
          type='text'
          className='bg-gray-50 py-2 pl-9 pr-3 border border-gray-500 text-sm rounded-md'
          placeholder='Search'
        />
      </div>

      {/** Right */}
      <h1>Right side</h1>
    </div>
  );
}
