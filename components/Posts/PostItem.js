import { useSession } from 'next-auth/react';
import Moment from 'react-moment';
import {
  EllipsisHorizontalIcon,
  HeartIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  BookmarkIcon,
  FaceSmileIcon,
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconFilled } from '@heroicons/react/24/solid';

import { useEffect, useState } from 'react';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';
import { db } from '@/firebase';
import classes from './PostItem.module.css';

export default function PostItem({ id, username, userImage, img, caption }) {
  const { data: session } = useSession();
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);
  const [totalLikes, setTotalLikes] = useState(0);

  useEffect(() => {
    const unsubscribeComments = onSnapshot(
      query(
        collection(db, 'posts', id, 'comments'),
        orderBy('timestamp', 'desc')
      ),
      (snapshot) => {
        setComments(snapshot.docs);
      }
    );

    const unsubscribeLikes = onSnapshot(
      collection(db, 'posts', id, 'likes'),
      (snapshot) => {
        const isLiked = snapshot.docs.find(
          (likeInfo) => likeInfo.id === session?.user?.uid
        );
        setHasLiked(!!isLiked);
        setTotalLikes(snapshot.docs.length);
      }
    );

    return () => {
      unsubscribeComments();
      unsubscribeLikes();
    };
  }, []);

  const likePost = async () => {
    if (hasLiked) {
      await deleteDoc(doc(db, 'posts', id, 'likes', session.user.uid));
      return;
    }

    await setDoc(doc(db, 'posts', id, 'likes', session.user.uid), {
      username: session.user.username,
    });
  };

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
              {hasLiked ? (
                <HeartIconFilled
                  onClick={likePost}
                  className='text-red-400 btn'
                />
              ) : (
                <HeartIcon onClick={likePost} className='btn' />
              )}
              <ChatBubbleOvalLeftEllipsisIcon className='btn' />
            </div>
            <BookmarkIcon className='btn' />
          </div>
        </div>
      ) : null}

      {/** Post caption */}
      <p className='p-5 line-clamp-2'>
        {totalLikes > 0 && <p className='font-bold mb-1'>{totalLikes} likes</p>}
        <span className='font-bold mr-2'>{username}</span>
        {caption}
      </p>

      {/** Post comments */}
      {comments.length > 0 && (
        <div className={`${classes.comment} mx-10 max-h-24 overflow-y-scroll`}>
          {comments.map((commentInfo) => (
            <div
              key={commentInfo.id}
              className='flex items-center space-x-2 mb-2'
            >
              <img
                className='h-7 w-7 rounded-full object-cover'
                src={commentInfo.data().userImage}
                alt='user-image'
              />
              <p className='font-semibold'>{commentInfo.data().username}</p>
              <p className='flex-1 line-clamp-2'>
                {commentInfo.data().comment}
              </p>
              <Moment fromNow>{commentInfo.data().timestamp?.toDate()}</Moment>
            </div>
          ))}
        </div>
      )}

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
