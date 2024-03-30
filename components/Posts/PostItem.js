import { useSession } from 'next-auth/react';
import {
  EllipsisHorizontalIcon,
  HeartIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  BookmarkIcon,
  FaceSmileIcon,
} from '@heroicons/react/24/outline';
import { useState } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '@/firebase';

export default function PostItem({ id, username, userImage, img, caption }) {
  const { data: session } = useSession();
  const [comment, setComment] = useState('');

  const sendComment = async (event) => {
    event.preventDefault();
    const commentToSend = comment;
    setComment('');

    await addDoc(collection(db, 'posts', id, 'comments'), {
      comment: commentToSend,
      username: session.user?.username,
      userImage: session.user?.image,
      timestamp: serverTimestamp(),
    });
  };

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
      {session ? (
        <div>
          <div className='flex justify-between px-4 pt-4'>
            <div className='flex space-x-4'>
              <HeartIcon className='btn' />
              <ChatBubbleOvalLeftEllipsisIcon className='btn' />
            </div>
            <BookmarkIcon className='btn' />
          </div>
        </div>
      ) : null}

      {/** Post comments */}
      <p className='p-5 line-clamp-2'>
        <span className='font-bold mr-2'>{username}</span>
        {caption}
      </p>

      {/** Post Input Box */}
      {session ? (
        <form className='flex items-center p-4'>
          <FaceSmileIcon className='h-7' />
          <input
            className='flex-1 focus:outline-none py-1.5 px-2'
            type='text'
            placeholder='Add a comment...'
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            onClick={sendComment}
            disabled={!comment.trim()}
            className='text-blue-400 font-bold disabled:text-blue-200'
          >
            Post
          </button>
        </form>
      ) : null}
    </div>
  );
}
