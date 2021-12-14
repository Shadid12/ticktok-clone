import { useEffect, useState } from "react"
import { useMutation, gql } from '@apollo/client'
import styles from '../styles/upload.module.css'
import Cookie from 'js-cookie'


const CREATE_POST = gql`
mutation CreatePost($id: ID!, $tags: [String]!, $title: String!, $userId: ID!) {
  createPost(data:{
    id: $id
    tags: $tags,
    title: $title,
    author: {
      connect: $userId
    }
  }) {
    _id
    id
    tags
    title
    author {
      email
    }
  }
}

`


export default function Upload() {
  const [createPost, { data, loading, error }] = useMutation(CREATE_POST)
  const [file, setFile] = useState(null)
  const [state, setState] = useState({
    name: '',
    tags: '',
  })

  const handleChange = (e) => { 
    e.preventDefault()
    setState({
      ...state,
      [e.target.name]: e.target.value,
    })
  }

  const uploadFile = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', 'pvsleazk')

    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/shadid/video/upload",
      {
        body: formData,
        method: "post"
      })
      const { public_id } = await res.json()
      
      setFile(null)
      // Add data to database
      const { userId } = JSON.parse(Cookie.get('fauna-session'))
      if(!public_id) {
        return;
      }
      createPost({ variables: { 
        id: public_id,
        title: state.name,
        userId,
        tags: state.tags !== '' ? state.tags.split(',') : [],
      }})

    } catch (error) {
      console.log('-->', error)
    }
  }

  useEffect(() => { 
    if(data) { 
      alert('Video Uploaded!')
      indexVideoData()
    }
    if(error) { 
      alert('Something went wrong')
    }
  }, [data, error])


  const indexVideoData = async () => {
    await fetch('/api/indexVideo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data.createPost)
    })
  }



  return (
    <div>
      <h1>Upload your video</h1>
      <div>
        <div className="file">
          <label className="file-label">
            <input className="file-input" type="file" name="video" onChange={(e) => {
              setFile(e.target.files[0])
            }} />
            <span className="file-cta">
              <span className="file-label">
                Choose a file…
              </span>
            </span>
          </label>
        </div>
        <div className={styles.column}>
          <input 
            onChange={handleChange} 
            value={state.name}
            placeholder="Video name"
            className="input is-link"
            name="name"
          />
        </div>
        <div className={styles.column}>
          <input 
            onChange={handleChange} 
            value={state.tags} 
            placeholder="Tags seperated by commas"
            className="input is-link"
            name="tags"
          />
        </div>
      </div>
      <div>
        <button onClick={uploadFile} className="button is-primary is-light">Sumbit</button>
      </div>
    </div>
  )
}