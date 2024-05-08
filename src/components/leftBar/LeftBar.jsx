import "./leftBar.scss";
import Market from "../../assets/3.png";
import Logout from "../../assets/12.png";
import Friend from "../../assets/friend.png";
import { AuthContext } from "../../context/authContext";
import { useContext } from "react";
import { isAdmin } from "../../utils/roles";
import { useNavigate } from "react-router-dom";

const LeftBar = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useContext(AuthContext);

  return (
    <div className="leftBar relative" style={{ cursor: 'pointer' }}>
      <div className="container">
        <div className="menu">
          <div className="user">
            <img
              src={"/upload/" +currentUser.profilePic}
              alt=""
            />
            <span>{currentUser.name}</span>
          </div>
          <div className="item">
            <img src={Friend} alt="" />
            <span onClick={()=> navigate('/about-us')}>About Us</span>
          </div>
          
          {isAdmin(currentUser) && 
            <>
            <div className="item" style={{ ':hover': { backgroundColor: 'gray' } }}>
              <img src={Market} alt="" />
              <span onClick={()=> navigate('/dashboard')}>Dashboard</span>
            </div>
          </>
          }
          {!isAdmin(currentUser) && 
          <>
          <div className="item" style={{ ':hover': { backgroundColor: 'gray' } }}>
              <img src={Market} alt="" />
              <span onClick={() => navigate(`/user-dashboard/${currentUser.id}`)}>User Dashboard</span>
            </div>
          </>
          }
          <div className="item">
            <img src={Logout} alt="" />
            <span onClick={logout}>Logout</span>
          </div>
        </div>
        <hr />
      </div>
      <div className="footer">
        <p>&copy; {new Date().getFullYear()} Pocket Donation Bank. All rights reserved.</p>
      </div>
    </div>
  );
};

export default LeftBar;
