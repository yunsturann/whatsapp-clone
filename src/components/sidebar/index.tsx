import ChatList from "./chat-list";
import FilterChatList from "./filter-chat-list";
import Navbar from "./navbar";
import "./sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar-section">
      {/* navbar */}
      <Navbar />

      {/* filter-chat-list  */}
      <FilterChatList />

      {/* Chat List */}
      <ChatList />
    </div>
  );
};

export default Sidebar;
