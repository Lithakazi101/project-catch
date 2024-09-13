import './Nav.css';

// NavBar Component
export const NavBar = () => {
  return (
    <nav className="flex items-center justify-between bg-white shadow-md py-4 px-6">
      <h2 className="text-green-700 text-2xl font-bold">THE GREENROOM</h2>
    </nav>
  );
};

// NavBarAdmin Component
export const NavBarAdmin = () => {
  return (
    <nav className="flex items-center justify-center bg-white shadow-md py-4 px-6 w-full">
      <h2 className="text-green-700 text-2xl font-bold">THE GREENROOM</h2>
    </nav>
  );
};
