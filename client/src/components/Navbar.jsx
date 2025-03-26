import { IoSearchOutline } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { CgProfile } from "react-icons/cg";
import { useEffect, useState } from "react";
import ProfileSidenav from "./ProfileSidenav";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setFilteredVideos, setQuery } from "../redux/slices/searchSlice";

const Navbar = ({ onToggleSidebar }) => {
  const [isProfileSidenavOpen, setIsProfileSidenavOpen] = useState(false);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { query } = useSelector((state) => state.search);
  const { videos } = useSelector((state) => state.video);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    setIsProfileSidenavOpen(false);
  }, [location]);

  const toggleProfileSidenav = () => {
    setIsProfileSidenavOpen((prev) => !prev);
  };

  const handleSearchChange = (e) => {
    const searchQuery = e.target.value;
    dispatch(setQuery(searchQuery));

    const filteredVideos = videos.filter((video) =>
      video.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    dispatch(setFilteredVideos(filteredVideos));
  };

  return (
    <nav className="flex justify-between items-center px-4 py-2 relative">
      <div className="flex items-center gap-2">
        <RxHamburgerMenu
          onClick={onToggleSidebar}
          className="cursor-pointer"
          size={24}
        />
        <Link to="/">
          <img src="./youtubelogo.jpg" alt="YouTube Logo" className="md:h-14 h-10" />
        </Link>
      </div>
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Search videos here"
          className="border outline-none rounded-full px-3 py-1 sm:w-[25vw] w-[30vw]"
          value={query}
          onChange={handleSearchChange}
        />
        <IoSearchOutline className="text-gray-500" size={20} />
      </div>
      <button
        onClick={toggleProfileSidenav}
        className="text-sm font-semibold flex items-center gap-1 border px-2 py-1 rounded-full bg-red-700 text-white"
      >
        {isAuthenticated && user?.avatar ? (
          <img src={user.avatar} alt="User Avatar" className="w-8 h-8 rounded-full" />
        ) : (
          <>
            <CgProfile size={20} /> Profile
          </>
        )}
      </button>
      <ProfileSidenav isOpen={isProfileSidenavOpen} toggleSidebar={toggleProfileSidenav} />
    </nav>
  );
};

export default Navbar;
