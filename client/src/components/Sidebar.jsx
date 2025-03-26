import { MdHome, MdSubscriptions, MdPlaylistPlay } from "react-icons/md";
import { FaHistory } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link } from "react-router-dom";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const menuItems = [
    {
      name: "Home",
      icon: <MdHome size={22} />,
    },
    {
      name: "Subscriptions",
      icon: <MdSubscriptions size={22} />,
    },
    {
      name: "History",
      icon: <FaHistory size={22} />,
    },
    {
      name: "Playlist",
      icon: <MdPlaylistPlay size={22} />,
    },
  ];

  return (
    <div
      className={`fixed top-0 left-0 h-full w-64 bg-gray-300 shadow-md rounded z-10 transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-300">
        <RxHamburgerMenu
          onClick={toggleSidebar}
          className="cursor-pointer"
          size={24}
        />
        <Link to="/">
          <img src="./youtubelogo.jpg" alt="YouTube Logo" className="h-10" />
        </Link>
      </div>
      <div className="flex flex-col p-4 space-y-4">
        {menuItems.map((item, index) => (
          <Link to="/" key={index} className="flex items-center gap-4">
            {item.icon}
            <h3>{item.name}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
