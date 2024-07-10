import { UserNav } from './user-nav';

export const Header = () => {
  return (
    <div className="flex h-16 items-center border-b">
      <h1 className="text-2xl font-bold px-4">Meet Kiosk</h1>

      <div className="ml-auto flex items-center space-x-4">
        <UserNav />
      </div>
    </div>
  );
};
