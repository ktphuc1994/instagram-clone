'use client';
import { useEffect, useState } from 'react';
import { faker } from '@faker-js/faker';
import Story from './Story';

const _createUser = () => ({
  username: faker.internet.userName().toLowerCase(),
  img: `https://i.pravatar.cc/150?img=${Math.ceil(Math.random() * 70)}`,
  id: faker.string.nanoid(),
});

const _createUsers = (numUsers = 5) => {
  return Array.from({ length: numUsers }, _createUser);
};

export default function Stories() {
  const [storyUsers, setStoryUsers] = useState([]);

  useEffect(() => {
    const fakerStoryUsers = _createUsers(20);
    setStoryUsers(fakerStoryUsers);
    console.log({ fakerStoryUsers });
  }, []);

  return (
    <div>
      {storyUsers.map((user) => (
        <Story key={user.id} {...user} />
      ))}
    </div>
  );
}
