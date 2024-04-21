import { UserMinus } from 'lucide-react';

function Aside() {
  return (
    <aside className="w-72 p-6">
      <div className="flex flex-col items-center space-y-1">
        {/* <div className="w-24 h-24">
          <img
            src="https://avatars.githubusercontent.com/borgesjuniior"
            alt="Profile"
            className="rounded-full"
          />
        </div>
        <span className="text-slate-200 font-bold">Júnior</span>
        <span className="text-slate-300">borgesjuniior_</span> */}
      </div>
      <nav className="space-y-6 mt-6">
        <a
          href="/"
          className="flex items-center gap-3 text-sm font-semibold text-zinc-200"
        >
          <UserMinus />
          Non-followers
        </a>
      </nav>
    </aside>
  );
}

export default Aside;
