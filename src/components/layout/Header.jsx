function Header() {
  return (
    <>
      <header className="bg-white shadow w-full">
        <div className="flex items-center justify-between px-8 py-4">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            {/* <img src="/logo.png" alt="Logo" className="h-8 w-8" /> */}
            <span className="font-bold text-xl">RegCheck</span>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
