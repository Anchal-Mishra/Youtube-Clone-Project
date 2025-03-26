import { useEffect, useState } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import VideoPlayerPage from "./pages/VideoPlayerPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import CreateChannelPage from "./pages/CreateChannelPage";
import ChannelPage from "./pages/ChannelPage";
import { useDispatch, useSelector } from "react-redux";
import { restoreAuthState } from "./redux/slices/authSlice";
import { useChannel } from "./hooks/useChannel";
import VideoUpload from "./pages/VideoUpload";
import { Toaster } from "react-hot-toast";
import About from "./pages/About";
import ErrorPage from "./pages/ErrorPage";
import Contact from "./pages/Contact";

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(restoreAuthState());
  }, [dispatch]);

  const { fetchUserChannel } = useChannel();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (user) {
      fetchUserChannel();
    }
  }, [user, fetchUserChannel]);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <>
      <BrowserRouter>
        <Toaster />
        <div className="max-w-full overflow-hidden">
          <Navbar onToggleSidebar={toggleSidebar} />
          <div className="flex">
            <div
              className={`transition-all duration-300 ease-linear ${
                isSidebarOpen ? "w-56" : "w-0"
              }`}
            >
              <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            </div>
          </div>
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/video/:id" element={<VideoPlayerPage />} />
          <Route path="/create-channel" element={<CreateChannelPage />} />
          <Route path="/channel/:id" element={<ChannelPage />} />
          <Route path="/video-upload" element={<VideoUpload />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
