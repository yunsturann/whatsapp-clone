import "./contact-info.css";

// ** Icons
import { IoChevronForwardOutline } from "react-icons/io5";
import {
  FaBan,
  FaBell,
  FaLock,
  FaStar,
  FaThumbsDown,
  FaTrashAlt,
} from "react-icons/fa";
import { IoMdTimer } from "react-icons/io";

const ContactInfo = () => {
  return (
    <div className="contact-info">
      {/* Avatar & username*/}
      <div className="user-detail">
        <img src="/images/avatar.png" alt="" />

        <h3>John Doe</h3>
      </div>

      {/* About */}
      {true && (
        <div className="about">
          <h4>About</h4>
          <p>Lorem ipsum dolor sit amet.</p>
        </div>
      )}

      {/* Shared Media  */}
      <div className="shared-media">
        <div className="header">
          <h4>Media, links and docs</h4>
          <div className="right">
            <div>240</div>
            <IoChevronForwardOutline />
          </div>
        </div>

        {/* Media Preview */}
        <div className="media-preview">
          <div className="preview-item">
            <img src="/images/nature.jpg" alt="" />
          </div>
          <div className="preview-item">
            <img src="/images/nature.jpg" alt="" />
          </div>
          <div className="preview-item">
            <img src="/images/nature.jpg" alt="" />
          </div>
        </div>
      </div>

      {/* Chat actions */}
      <div className="chat-actions">
        <div className="item">
          <FaStar className="icon" />
          <div className="texts">
            <p>Starred messages</p>
          </div>
          <IoChevronForwardOutline />
        </div>

        <div className="item">
          <FaBell className="icon" />
          <div className="texts">
            <p>Mute notifications</p>
          </div>
          <IoChevronForwardOutline />
        </div>

        <div className="item">
          <IoMdTimer className="icon" />
          <div className="texts">
            <p>Disapperaring messages</p>
            <span>Off</span>
          </div>
          <IoChevronForwardOutline />
        </div>

        <div className="item">
          <FaLock className="icon" />
          <div className="texts">
            <p>Encryption</p>
            <span>Messages are end-to-end encrypted.</span>
          </div>
          <IoChevronForwardOutline />
        </div>
      </div>

      {/* User Actions */}
      <div className="user-actions">
        {/* TODO: fix usernames */}

        <div className="item">
          <FaBan />
          <p>Block John Doe</p>
        </div>

        <div className="item">
          <FaThumbsDown />
          <p>Report John Doe</p>
        </div>

        <div className="item">
          <FaTrashAlt />
          <p>Delete Chat</p>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
