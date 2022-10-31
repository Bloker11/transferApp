import { useState } from "react";
import Wrapper from "../assets/wrappers/Navbar";
import { FaAlignLeft, FaUserCircle, FaCaretDown } from "react-icons/fa";
import { useAppContext } from "../context/appContext";

const Navbar = () => {
  const { user, logoutUser, toggleSidebar } = useAppContext();
  const [showLogout, setShowLogout] = useState(false);
  return (
    <>
      <Wrapper>
        <div className="nav-center">
          <button className="toggle-btn" onClick={toggleSidebar}>
            <FaAlignLeft />
          </button>
          <div className="btn-container">
            <button className="btn" onClick={() => setShowLogout(!showLogout)}>
              <FaUserCircle />
              {user.name}
              <FaCaretDown />
            </button>
            <div className={showLogout ? "dropdown show-dropdown" : "dropdown"}>
              <button onClick={() => logoutUser()} className="dropdown-btn">
                logout
              </button>
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default Navbar;
