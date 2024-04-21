import { useCallback, useEffect, useState } from 'react';
import { findAll } from './services/users';
import { IUser } from './types';
import Card from './components/Card';
import Header from './components/Header';
import Aside from './components/Aside';
import Spinner from './components/Spinner';

import './styles/global.css';

function App() {
  const [unfollowers, setUnFollowers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const getUnfollowers = useCallback(async () => {
    setLoading(true);
    try {
      const [following, followers] = await Promise.all([
        getUsers('following'),
        getUsers('followers'),
      ]);

      const unfollowers = following.filter((follower) => {
        return !followers.find((f) => f.username === follower.username);
      });

      setUnFollowers(unfollowers);
    } catch (error) {
      console.error('An error has occurred');
      setIsError(true);
    } finally {
      setLoading(false);
    }
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

  const renderMainContent = () => {
    const { length: unfollowersCount } = unfollowers;

    if (loading) {
      return <Spinner />;
    } else if (unfollowersCount === 0) {
      return (
        <span className="text-xl">
          All the people you follow are following you back
        </span>
      );
    } else {
      return unfollowers.map((user) => (
        <Card key={user.id} user={user} setUnFollowers={setUnFollowers} />
      ));
    }
  };

  useEffect(() => {
    getUnfollowers();
  }, [getUnfollowers]);

  return (
    <div className="h-screen bg-zinc-900 text-zinc-100">
      <Header />
      <div className="flex">
        <Aside />
        <div className="flex flex-1 flex-col mx-8 space-y-6">
          <h2 className="font-semibold text-3xl">
            Non-followers {''}
            <span className="text-slate-400">
              {loading ? 'loading...' : unfollowers.length}
            </span>
          </h2>
          <main className="bg-zinc-800 border-solid border-1 border-slate-800 max-h-[780px] min-h-[780px] space-y-5 p-10 overflow-y-auto rounded">
            {isError ? (
              <span className="text-xl">
                An error occurred when trying to search for users
              </span>
            ) : (
              renderMainContent()
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
