import { UserMinus } from 'lucide-react';
import { IUser } from '../types';

interface IProps {
  user: IUser;
}

function Card({ user }: IProps) {
  return (
    <div
      key={user.id}
      className="bg-white/10 flex flex-1 justify-between p-4 h-20 rounded"
    >
      <div className="flex items-center gap-4">
        <img
          className="w-10 h-10 rounded-full"
          src={user.profile_pic_url}
          alt="Profile picture"
        />
        <span>{user.username}</span>
      </div>
      <button className="flex items-center gap-4 text-red-500 hover:text-red-600">
        Deixar de seguir
        <UserMinus />
      </button>
    </div>
  );
}

export default Card;
