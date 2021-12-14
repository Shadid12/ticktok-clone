import { 
  faHome, 
  faUserFriends, 
  faVideo,
} 
from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import styles from '../styles/feed.module.css'
import VideoCard from './VideoCard';


export default function Feed() {
  const vids = Array.from(Array(10).keys());
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
              <li>
                <a>
                  <span className={styles.icon}>
                    <FontAwesomeIcon icon={faUserFriends} size='2x'/>
                  </span>
                  <span className={styles.navText}>
                    Following
                  </span>
                </a>
              </li>
              <li>
              <a>
                  <span className={styles.icon}>
                    <FontAwesomeIcon icon={faVideo} size='2x'/>
                  </span>
                  <span className={styles.navText}>
                    Live
                  </span>
                </a>
              </li>
            </ul>
          </aside>
        </div>
        <div className="column is-two-thirds">
          <div className={styles.videosContainer}>
          {vids.map(vid => <VideoCard key={vid} />)}
          </div>
        </div>
      </div>
    </div> 
  )
} 
