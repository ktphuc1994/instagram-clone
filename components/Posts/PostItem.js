import {
  EllipsisHorizontalIcon,
  HeartIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  BookmarkIcon,
} from '@heroicons/react/24/outline';

export default function PostItem({ id, username, userImage, img, caption }) {
  return (
    <div className='bg-white my-7 border rounded-md'>
      {/** Post Header */}
      <div className='flex items-center p-5'>
        <img
          src={userImage}
          alt={username}
          className='h-12 rounded-full object-cover border p-1 mr-3'
        />
        <p className='font-bold grow'>{username}</p>
        <EllipsisHorizontalIcon className='h-5' />
      </div>

      {/** Post Image */}
      <img src={img} alt={caption} className='object-cover w-full' />

      {/** Post Button */}
      <div>
        <div className='flex justify-between px-4 pt-4'>
          <div className='flex space-x-4'>
            <HeartIcon className='btn' />
            <ChatBubbleOvalLeftEllipsisIcon className='btn' />
          </div>
          <BookmarkIcon className='btn' />
        </div>
      </div>
    </div>
  );
}
