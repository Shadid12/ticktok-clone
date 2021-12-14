/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import { 
  faHeart,
  faShare,
  faComment
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from '../styles/feed.module.css'

export default function VideoCard({ videoItem }) {

  return (
    <div className={styles.feedWrap}>
      <div className={styles.firstCol}>
        <img
          className={styles.avatar}
          src="https://bulma.io/images/placeholders/128x128.png" />
      </div>
      <div className={styles.secCol}>
        <a href="">
          <h2 className={styles.username}>{videoItem.author.name}</h2>
        </a>
        {
          videoItem.tags && videoItem.tags.map((tag) => (
            <a key={tag}>#{tag} </a>
          ))
        }
        <div className={styles.vidContainer}>

          <video className={styles.video} controls loop>
            <source
              src={`
                https://res.cloudinary.com/shadid/video/upload/v1639374221/${videoItem.id}.mp4`
              }
              type="video/mp4" 
            />
          </video>

          <div className={styles.icons}>
            <div className={styles.iconWrap}>
              <FontAwesomeIcon icon={faHeart} size='2x' />
            </div>
            <div className={styles.iconWrap}>
              <FontAwesomeIcon icon={faShare} size='2x' />
            </div>
            <div className={styles.iconWrap}>
              <FontAwesomeIcon icon={faComment} size='2x' />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
