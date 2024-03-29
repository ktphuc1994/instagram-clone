import { useEffect, useState } from 'react';
import { faker } from '@faker-js/faker';
import Story from './Story';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

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
  }, []);

  return (
    <div className='py-6 bg-white mt-8 border border-gray-200 rounded-sm'>
      <Swiper slidesPerView='auto'>
        {storyUsers.map((user) => (
          <SwiperSlide key={user.id} style={{ width: 'auto' }}>
            {<Story {...user} />}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
