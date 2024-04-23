import { X, Star, BadgeCheck } from 'lucide-react';
import { IUser } from '../../types';
import { Dispatch, useState } from 'react';
import { unfollowUser } from '../../services/users';
import Spinner from '../Spinner';

import './styles.css';

interface ICard {
  user: IUser;
  index: number;
  setUnFollowers: Dispatch<React.SetStateAction<IUser[]>>;
}

function Card({ user, index, setUnFollowers }: ICard) {
  const [loading, setLoading] = useState(false);

  async function handleRemoveUser(userId: string) {
    setLoading(true);

    try {
      const response = await unfollowUser(userId);
      if (response.status === 200) {
        setUnFollowers((prevState) =>
          prevState.filter((item) => item.id !== userId)
        );
        return;
      }
    } catch (error) {
      console.error('An error has occurred');
    } finally {
      setLoading(false);
    }
  }

  function handleFavoriteUser(index: number) {
    setUnFollowers((prevState) => {
      const newState = [...prevState];
      newState[index] = {
        ...prevState[index],
        is_favorite: !prevState[index].is_favorite,
      };
      return newState;
    });
  }

  return (
    <div
      key={user.id}
      className="bg-zinc-900 flex items-center justify-between p-4 rounded-lg hover-transition"
    >
      <div className="w-10 flex items-center space-x-4">
        <img
          className="rounded-full"
          src={user.profile_pic_url}
          alt="User Icon"
        />
        <div className="flex items-center space-x-1 text-slate-100 font-semibold text-xl">
          <span>{user.username}</span>{' '}
          {user.is_verified && <BadgeCheck stroke="#0f172a" fill="#0866ff" />}
        </div>
      </div>
      <div className="flex space-x-1">
        <div className="w-8 flex items-center">
          <button onClick={() => handleFavoriteUser(index)} title="Favorite">
            <Star
              width={20}
              height={20}
              color="#fcd34d"
              fill={user.is_favorite ? '#fcd34d' : ''}
            />
          </button>
        </div>
        {loading ? (
          <div className="w-8 h-7">
            <Spinner size="12" />
          </div>
        ) : (
          <div className="w-8 flex items-center">
            <button onClick={() => handleRemoveUser(user.id)} title="Unfollow">
              <X width={28} height={28} color="#ef4444" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Card;
