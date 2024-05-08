import React, { useEffect, useState } from 'react';
import './aboutUs.scss';
import { makeRequest } from '../../axios';

function AboutUs() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await makeRequest.get('/posts');
        const latestPosts = response.data.slice(0, 10); // Get only the latest 10 posts
        setPosts(latestPosts); 
        console.log(response)
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className='container'>
      <div className='heading'>
        <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img className="d-block w-100" src="/upload/charity-background.jpg" alt="First slide"/>
          </div>
          <div className="carousel-item">
            <img className="d-block w-100" src="/upload/charity-2.jpg" alt="Second slide"/>
          </div>
          <div className="carousel-item">
            <img className="d-block w-100" src="/upload/charity-3.jpg" alt="Third slide"/>
          </div>
        </div>
        <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        </a>
        <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
        </a>
      </div>
      </div>
      <p>Donations to organizations that function primarily for socially good purposes—charitable, educational, humanitarian, religious, or otherwise—are classified as nonprofit contributions. Since non-profit organizations frequently rely significantly on the generosity of people, companies, foundations, and government funding to achieve their goals, these gifts are essential to the continued operations and programming of these organizations. A vast array of industries, including social services, health, education, environmental preservation, the arts and culture, and more, are served by nonprofit organizations. Contributions to these groups can come in many different ways, such as cash contributions, in-kind exchanges for products or services, volunteer work, and fundraising initiatives.</p>
      <div>
        <h3>Posts</h3>
        <div className=''>
          {posts.map(post => (
            <div key={post.id} className="card" style={{ width: "100%" }}>
              <div className="card-body d-flex">
                <div>
                    <h5 className="card-title">{post.name}</h5>
                    <p className="card-text">{post.type}</p>
                    <img src={`/upload/${post.img}`} alt="img" style={{width:"200px",height:"150px"}}/>
                </div>
                <p className='mt-4 p-2'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum nostrum in asperiores eaque placeat? Impedit repudiandae unde praesentium, dolore temporibus dolorum. Quisquam, molestiae? Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam minima nihil quaerat voluptatem dolores exercitationem quo repellat molestiae eaque enim.</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
