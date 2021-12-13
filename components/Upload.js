import { useState } from "react"
import { Video } from 'cloudinary-react';

export default function Upload() {
  const [file, setFile] = useState(null)
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
      console.log(await res.json())
      setFile(null)
    } catch (error) {
      console.log('-->', error)
    }
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
      </div>
      <div>
        <button onClick={uploadFile} className="button is-primary is-light">Sumbit</button>
      </div>
      <Video
        cloudName="shadid"
        controls
        publicId="povynr1oyrrdnshbrpqe"
        autoPlay
        width={300}
        height={600}
        loop
      />
    </div>
  )
}