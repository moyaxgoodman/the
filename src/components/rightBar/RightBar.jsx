import { Link } from "react-router-dom";
import "./rightBar.scss";
import { useContext, useEffect, useState } from "react";
import { makeRequest } from "../../axios";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Share from "../share/Share";
import UploadModal from "./UploadModal";
import ConfettiExplosion from 'react-confetti-explosion';
import { useWindowSize } from 'react-use';
import {emoji}  from '../../assets/emoji/emoji'
import Confetti from 'react-confetti'
import { AuthContext } from "../../context/authContext";


const RightBar = () => {
  const [recentPosts, setRecentPosts] = useState([]);
  const [donators, setDonators] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
  const { width, height } = useWindowSize()
  const { currentUser, logout } = useContext(AuthContext);
 
  useEffect(() => {
    const fetchRecentPosts = async () => {
      try {
        const response = await makeRequest.post('/posts/recent'); // Use makeRequest to make the request
        setRecentPosts(response.data); // Set the recent posts data to state
      } catch (error) {
        console.error('Error fetching recent posts:', error);
      }
    };

    fetchRecentPosts();
  }, []); 

  useEffect(() => {
    const fetchRecentPosts = async () => {
      try {
        const response = await makeRequest.post('/posts/donator'); // Use makeRequest to make the request
        setDonators(response.data); // Set the recent posts data to state
      } catch (error) {
        console.error('Error fetching recent posts:', error);
      }
    };

    fetchRecentPosts();
  }, []); 

  return (
    <div className="rightBar">
      <div className="container">
        <div className="mb-2">
          <Button variant="info" onClick={handleShowModal}>
            Donate Now 😄
          </Button>
          <UploadModal show={showModal} handleClose={handleCloseModal} />
        </div>
        <div className="item">
          <span>Recent Donators</span>
          {recentPosts.map((donator,index)=>(
             <div className="user" key={index}>
             <div className="userInfo">
             <img
              src={"/upload/" +donator.profilePic}
              alt=""
            />
               <span>{donator.name}</span>
             </div>
             <div>
               <button>📢</button>
             </div>
           </div>
          ))}
        </div>
        <div className="item">
          <span>Top Donators</span>
          {donators.map((donator,index)=>(
            <div className="user" key={index}>
            <div className="userInfo">
            <img
              src={"/upload/" +donator.profilePic}
              alt=""
            />
              <p className="d-flex gap-2">
                <span>{donator.name}</span>
                <span>{emoji[index]}</span>
              </p>
            </div>
          </div>
          ))}
         
        </div>
        
        <Confetti
          width={width}
          height={height}
        />
      
      </div>
    </div>
  );
};

export default RightBar;
