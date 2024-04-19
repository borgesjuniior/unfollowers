import { UserMinus } from 'lucide-react';
import { IUser } from '../../types';
import Spinner from '../Spinner';
import { Dispatch, useState } from 'react';
import { unfollowUser } from '../../services/users';

interface IProps {
  user: IUser;
  setUnFollowers: Dispatch<React.SetStateAction<IUser[]>>;
}

function Card({ user, setUnFollowers }: IProps) {
  const [loading, setLoading] = useState(false);

  async function handleUnfollowUser() {
    setLoading(true);

    try {
      const response = await unfollowUser(user.id);
      if (response.status === 200) {
        setUnFollowers((prev) => prev.filter((item) => item.id !== user.id));
        return;
      }
    } catch (error) {
      throw Error('Ocorreu um erro!');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      key={user.id}
      className="bg-zinc-950 flex flex-1 justify-between p-4 h-20 rounded"
    >
      <div className="flex items-center gap-4">
        <img
          className="w-10 h-10 rounded-full"
          src={user.profile_pic_url}
          alt="Profile picture"
        />
        <span>{user.username}</span>
      </div>
      <button
        className="flex items-center gap-4 text-red-500 hover:text-red-600"
        onClick={handleUnfollowUser}
      >
        Deixar de seguir
        {loading ? <Spinner styles="w-6 text-lime-500" /> : <UserMinus />}
      </button>
    </div>
  );
}

export default Card;
