import { faker } from '@faker-js/faker';
import { useEffect, useState } from 'react';

const _createUser = () => ({
  username: faker.internet.userName().toLowerCase(),
  jobTitle: faker.person.jobTitle(),
  img: `https://i.pravatar.cc/150?img=${Math.ceil(Math.random() * 70)}`,
  id: faker.string.nanoid(),
});

const _createUsers = (numUsers = 5) => {
  return Array.from({ length: numUsers }, _createUser);
};

export default function Suggestions() {
  const [suggestedList, setSuggestedList] = useState([]);

  useEffect(() => {
    const suggestedUsers = _createUsers(5);
    setSuggestedList(suggestedUsers);
  }, []);

  return (
    <div className='mt-4 ml-10'>
      <div className='flex justify-between mb-5 text-sm'>
        <h3 className='font-bold text-gray-400'>Suggestion for you</h3>
        <button className='text-gray-600 font-semibold'>See all</button>
      </div>
      {suggestedList.map((suggestedUser) => (
        <div
          key={suggestedUser.id}
          className='flex items-center justify-between mt-3'
        >
          <img
            className='h-10 w-10 rounded-full border p-0.5'
            src={suggestedUser.img}
            alt={suggestedUser.username}
          />
          <div className='flex-1 ml-4'>
            <h2 className='font-semibold text-sm'>{suggestedUser.username}</h2>
            <h3 className='text-gray-400 text-sm truncate w-[230px]'>
              {suggestedUser.jobTitle}
            </h3>
          </div>
          <button className='font-semibold text-blue-400 text-sm'>
            Follow
          </button>
        </div>
      ))}
    </div>
  );
}
