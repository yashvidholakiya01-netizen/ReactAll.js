import { Heart, Menu, Search, ShoppingBag, User2, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      <section>
        {/* desktop navbar */}
        <nav className="bg-white px-8 py-4 w-full h-auto hidden md:flex items-center justify-between">
          {/* logo */}
          <div className="flex justify-center items-center gap-x-2">
            <img src="https://img.freepik.com/free-vector/bird-colorful-gradient-design-vector_343694-2506.jpg?semt=ais_hybrid&w=740&q=80" alt="logo" className="w-10 object-cover" />
            <h1 className="font-bold text-xl">Shopping.</h1>
          </div>

          {/* links */}
          <ul className="flex items-center justify-center gap-x-4 text-lg font-normal">
            <li>
              <Link to="/">Home</Link>
            </li>
              <li>
              <Link to="/collection">Collection</Link>
            </li>
            <li>
              <Link to="/shop">Shop</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>

          {/* icons */}
          <div className="flex itmes-center justify-center gap-x-6">
            <Search strokeWidth={1} />
            <Heart strokeWidth={1} />
            <ShoppingBag strokeWidth={1} />
            <User2 strokeWidth={1} />
          </div>
        </nav>

        {/* Mobile and Tablet */}
        <nav className="bg-white px-8 py-4 w-full h-auto md:hidden flex items-center justify-between">
          {/* logo */}
          <div className="flex justify-center items-center gap-x-2">
            <img src="/logo.png" alt="logo" className="w-10 object-cover" />
            <h1 className="font-bold text-xl">Shopping.</h1>
          </div>

          {/* icons */}
          <div className="flex itmes-center justify-center gap-x-6">
            <Heart strokeWidth={1} />
            <ShoppingBag strokeWidth={1} />
            <User2 strokeWidth={1} />
            <Menu
              strokeWidth={1}
              className="active:scale-95 active:text-amber-600"
              onClick={() => {
                setShowMenu(true);
              }}
            />
          </div>
        </nav>

        {/* Side Bar / Panel */}
        {showMenu && (
          <section className="md:hidden relative flex justify-end">
            <div className="w-[70%] z-200 bg-white/30 backdrop-blur-sm h-screen fixed top-0 flex items-center justify-center">
              <div className="absolute top-2 right-4">
                <X
                  className="w-10 h-10"
                  strokeWidth={4}
                  onClick={() => {
                    setShowMenu(false);
                  }}
                />
              </div>

              {/* links */}
              <ul className="flex flex-col items-center justify-center gap-y-14 text-3xl font-semibold">
                <li>
                  <Link to="/">Home</Link>
                </li>
                 <li>
              <Link to="/collection">Collection</Link>
            </li>
                <li>
                  <Link to="/shop">Shop</Link>
                </li>
                <li>
                  <Link to="/about">About</Link>
                </li>
                <li>
                  <Link to="/contact">Contact</Link>
                </li>
              </ul>
            </div>
          </section>
        )}
      </section>
    </>
  );
};

export default Navbar;
