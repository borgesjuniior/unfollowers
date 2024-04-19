import { useEffect, useState } from 'react';
import { UserRoundX, CircleX } from 'lucide-react';
import { findAll } from './services/users';
import Spinner from './components/Spinner';
import { IUser } from './types';
import Card from './components/Card';

import './styles/global.css';

function App() {
  const [unfollowers, setUnFollowers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getUnfollowers();
  }, []);

  async function getUsers(friendship: any) {
    const allUsers = [] as IUser[];
    let shouldFetch = true;
    let max_id = '';

    while (shouldFetch) {
      const response = await findAll({
        friendship,
        max_id,
      });

      const { next_max_id, big_list, users } = response.data;

      max_id = next_max_id;
      allUsers.push(...users);
      if (!big_list) shouldFetch = false;
    }
    return allUsers;
  }

  async function getUnfollowers() {
    setLoading(true);
    try {
      const [following, followers] = await Promise.all([
        getUsers('following'),
        getUsers('followers'),
      ]);

      if (!following.length) {
        console.log("you don't follow any accounts");
        return;
      }

      const unfollowers = following.filter((follower) => {
        return !followers.find((f) => f.username === follower.username);
      });

      setUnFollowers(unfollowers);
    } catch (error) {
      throw Error('Ocorreu um erro!');
    } finally {
      setLoading(false);
    }
  }

  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className="h-screen flex">
      <button className="absolute right-12 top-8">
        <CircleX onClick={handleReload} />
      </button>
      <aside className="w-64 bg-zinc-950 p-6">
        <nav className="space-y-4 mt-5">
          <a
            href="/"
            className="flex items-center gap-3 text-sm font-semibold text-zinc-200"
          >
            <UserRoundX />
            Não seguem de volta
          </a>
        </nav>
      </aside>
      <main className="flex-1 bg-zinc-900 p-6 overflow-y-auto">
        {!loading && (
          <h1 className="font-semibold text-3xl mt-10">
            Unfollowers: {unfollowers.length}
          </h1>
        )}
        <div className="grid gap-6 mt-6">
          {loading ? (
            <div className="h-96 mt-56 flex items-center justify-center">
              <Spinner />
            </div>
          ) : unfollowers.length ? (
            unfollowers.map((user) => (
              <Card user={user} setUnFollowers={setUnFollowers} />
            ))
          ) : (
            <span className="font-semibold text-base mt-10">
              Todos os perfis que você segue estão te seguindo de volta.
            </span>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
