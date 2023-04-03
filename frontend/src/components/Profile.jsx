import { useState } from 'react'
import axios from "axios";
import { ReceiptData } from './Receipt';


export const Profile = (props) => {
  const [image, setImage] = useState(null)
  const [receiptData, setReceiptData] = useState(null)
  const [profileData, setProfileData] = useState(null)

  const onImageChange = (e) => {
    const img = e.target.files[0]
    setImage(img)
  }

  const sendReceipt = (e) => {
    let formData = new FormData();
    formData.append('image', image);
    axios({
      method: "POST",
      url:"http://localhost:8000/api/profile/receiptscanner",
      data: formData,
      headers: {'Content-Type': 'multipart/form-data', "Authorization": 'Bearer ' + props.token },
    })
    .then((response) => {
      const res = response.data
      setReceiptData(response.data)
      res.access_token && props.setToken(res.access_token)
    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
        }
    })}
  
    const getProfileData = () => {
      axios({
        method: "GET",
        url:"http://localhost:8000/api/profile",
        headers: {
          Authorization: 'Bearer ' + props.token
        }
      })
      .then((response) => {
        const res = response.data
        res.access_token && props.setToken(res.access_token)
        setProfileData(({
          profile_name: res.username
          }))
      }).catch((error) => {
        if (error.response) {
          console.log(error.response)
          console.log(error.response.status)
          console.log(error.response.headers)
          }
      })}

  return (
    <div className="Profile">

        <h2>Welcome {props.profileData}! Upload an image of a receipt to get started.</h2>
        <p>To get your profile details: </p><button onClick={getProfileData}>Click me</button>
        {profileData && <div>
              <p>Profile name: {profileData.profile_name}</p>
              <p>About me: i like chocolate</p>
            </div>
        }
        <p>Please make sure the picture has appropriate lighting and background, and is actually an image of a receipt, otherwise the parser won't work.</p>
        <input type="file" multiple accept="image/*" onChange={onImageChange} />
        
        <button onClick={sendReceipt}>Upload</button> {/* TODO: only allow for uploads if an upload was actually made */}

        {receiptData!=null && <ReceiptData data = {receiptData}></ReceiptData>}

    </div>
  );
}

export default Profile;