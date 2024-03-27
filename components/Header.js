import Image from 'next/image';

export default function Header() {
  return (
    <div>
      {/** Left */}
      <div className='flex items-center justify-between max-w-6xl mx-auto'>
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
        <h1>Right side</h1>
      </div>

      {/** Middle */}

      {/** Right */}
    </div>
  );
}
