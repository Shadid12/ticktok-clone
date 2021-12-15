import { useQuery, gql } from '@apollo/client';
import { 
  faHome, 
  faUserFriends, 
  faVideo,
} 
from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react';

import styles from '../styles/feed.module.css'
import VideoCard from './VideoCard';

const GET_POSTS = gql`
  {
  listPosts {
    data {
      id
      title
      author {
        _id
        name
      }
      tags
    }
    after
    before
  }
}
`;


export default function Feed() {
  const [searchTerm, setSearchTerm] = useState('');
  const { loading, error, data } = useQuery(GET_POSTS);

  const searchVideos = () => {
    console.log('searching for videos');
    fetch(`/api/searchVideo?searchTerm=${searchTerm}`)
  }

  return (
    <div className={styles.mainWrap}>
      <div className="columns">
        <div className="column">
          <aside className={`${styles.asideMenu} menu`}>
            <ul className="menu-list">
              <li>
                <a >
                  <span className={styles.icon}>
                    <FontAwesomeIcon icon={faHome} size='2x'/>
                  </span>
                  <span className={styles.navText}>For You</span>
                </a>
              </li>
              
              <div className={`${styles.menuContainer} navbar-menu`}>
                <div className={`${styles.search} navbar-item`}>
                  <input 
                    className="input is-rounded ds-input" 
                    type="text" 
                    placeholder="Search videos" 
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />	
                  <button 
                    className={styles.searchbtn}
                    onClick={searchVideos}
                  >
                    Search
                  </button>					
                </div>
              </div>
              
            </ul>
          </aside>
        </div>
        <div className="column is-two-thirds">
          <div className={styles.videosContainer}>
          {loading && <p>Loading...</p>}
          {data?.listPosts?.data && data.listPosts.data.map(vid => <VideoCard key={vid.id} videoItem={vid} />)}
          </div>
        </div>
      </div>
    </div> 
  )
} 
