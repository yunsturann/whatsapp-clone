import "./sidebar.css";

// ** Custom Components
import ChatList from "./chat-list";
import FilterChatList from "./filter-chat-list";
import LeftSection from "./left-section";
import Navbar from "./navbar";
import PhotoDialogs from "./photo-dialogs";

const Sidebar = () => {
  return (
    <>
      <aside className="sidebar-section">
        {/* navbar */}
        <Navbar />

        {/* filter-chat-list  */}
        <FilterChatList />

        {/* Chat List */}
        <ChatList />

        {/* Left Section */}
        <LeftSection />
      </aside>

      <PhotoDialogs />
    </>
  );
};

export default Sidebar;
