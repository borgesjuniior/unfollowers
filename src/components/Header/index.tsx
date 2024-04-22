import { LogOut, Glasses } from 'lucide-react';

function Header() {
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <header className="flex items-center justify-between p-5">
      <div className="flex items-center space-x-1">
        <Glasses color="#d9f99d" />
        <h1 className="text-slate-50 font-semibold text-xl">Unfollowers</h1>
      </div>
      <button
        className="bg-red-500 hover:bg-red-600 transition-all duration-30 flex items-center justify-center rounded-full w-9 h-9"
        onClick={handleReload}
      >
        <LogOut />
      </button>
    </header>
  );
}

export default Header;
