import React, { useContext, useEffect, useState } from 'react'
import { context } from '../store/context'
import { toast } from 'react-toastify'
import { useAuth } from '../auth/hooks/hook'

function Profile({ setProfile, profile }) {
    let { user } = useContext(context)
    let { handleProfile } = useAuth()
    let [image, setImage] = useState({
        file: "",
        url: '',
        dbProfile: ''
    })
    function pickFile(e) {
        let file = e.target.files[0]
        let url = URL.createObjectURL(file)
        setImage({ ...image, url, file })
        console.log("image local", image.url)
    }
    function move(e) {
        if (image.url || image.dbProfile) {
            console.log("preview")
            window.open(image?.url || image.dbProfile, "_blank")
        }
    }
    async function saveImage() {
        if (image.url) {
            let form = new FormData()
            form.append('image', image.file)
            if (user?.fileId) form.append('fileId', user.fileId)
            await handleProfile(form)
        }
        else {
            toast.error('Plz Select Image')
        }
    }
    useEffect(() => {
        setImage({ ...image, dbProfile: user?.profileURL })
    }, [user])

    return (
        <div className="profile-overlay">

            <button
                className="close-btn"
                onClick={() => {
                    setProfile(!profile)
                    localStorage.setItem('profile', !profile)
                }}
            >
                ✕
            </button>

            <div className="profile-card text-center p-4">

                <div className="profile-img mb-3" >
                    <img
                        src={image.url || image.dbProfile || "/default.png"}
                        className="img-fluid"
                        alt="profile"
                    />

                    {/* Camera Icon */}
                    <div className="camera-icon">
                        <label >
                            <i className="bi bi-camera" style={{ cursor: 'pointer' }}></i>
                            <input type="file" hidden={true} onChange={pickFile} />
                        </label>
                    </div>
                </div>
                <div className="btn-box d-flex justify-content-center gap-2">
                    <button className="preview-btn" onClick={move}>
                        Preview
                    </button>

                    <button className="save-btn" onClick={saveImage}>
                        Save
                    </button>
                </div>
                <h4 className="fw-bold mb-1">
                    {user?.userName}
                </h4>

                <p className="text-muted">
                    {user?.email}
                </p>

            </div>

            <style>{`
.profile-overlay{
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0,0,0,0.4);
  backdrop-filter: blur(8px);
  z-index: 999999;
}.preview-btn{
  background:#e7f1ff;
  color:#0d6efd;
  border:none;
  padding:8px 15px;
  border-radius:8px;
  cursor:pointer;
}

.save-btn{
  background:#0d6efd;
  color:white;
  border:none;
  padding:8px 15px;
  border-radius:8px;
  cursor:pointer;
}

.profile-card{
  background:white;
  border-radius:20px;
  width:320px;
  box-shadow:0 10px 30px rgba(0,0,0,0.2);
  position:relative;
}

.profile-img{
  width:220px;
  height:220px;
  margin:auto;
  border-radius:50%;
  overflow:hidden;
  border:4px solid #0d6efd;
  position:relative;
    overflow:visible;
}

.profile-img img{
  width:100%;
  height:100%;
  object-fit:cover;
  border-radius:50%;
}

/* camera icon */
.camera-icon{
  position:absolute;
  bottom:10px;
  right:10px;

  width:32px;
  height:32px;
  border-radius:50%;

  display:flex;
  justify-content:center;
  align-items:center;

  background:#0d6efd;
  color:white;
  font-size:14px;

  border:2px solid white;
  z-index:10;   /* 🔥 important */
}
  

.close-btn{
  position:absolute;
  top:20px;
  right:20px;
  border:none;
  background:white;
  width:35px;
  height:35px;
  border-radius:50%;
  box-shadow:0 2px 8px rgba(0,0,0,0.2);
  cursor:pointer;
  font-size:18px;
}
`}</style>

        </div>
    )
}

export default Profile