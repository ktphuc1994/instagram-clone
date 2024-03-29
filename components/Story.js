import { PlusIcon } from '@heroicons/react/24/solid';

export default function Story({ img, username, isUser }) {
  return (
    <div className='p-1 relative group cursor-pointer'>
      <img
        src={img}
        alt={username}
        className='h-14 w-14 rounded-full p-[1.5px] border-2 border-red-500 group-hover:scale-110 transition-transform duration-200 ease-out'
      />
      {isUser ? (
        <PlusIcon className='h-6 w-6 absolute top-5 left-5 text-white' />
      ) : null}
      <p className='text-xs w-14 truncate text-center'>{username}</p>
    </div>
  );
}
