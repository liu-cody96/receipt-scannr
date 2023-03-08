import { useState } from 'react'
import axios from "axios";
import { ReceiptData } from './Receipt';
import { TagUserInput } from './TagUserInput'


export const Profile = (props) => {
  const [image, setImage] = useState(null)
  const [receiptData, setReceiptData] = useState(null)

  const onImageChange = (e) => {
    const img = e.target.files[0]
    setImage(img)
  }

  const sendReceipt = (e) => {
    let formData = new FormData();
    formData.append('image', image);
    axios({
      method: "POST",
      url:"http://localhost:8000/receiptscanner",
      data: formData,
      headers: {'Content-Type': 'multipart/form-data', "Authorization": 'Bearer ' + props.token },
    })
    .then((response) => {
      const res = response.data
      setReceiptData(response.data)
      console.log(res)
      res.access_token && props.setToken(res.access_token)
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
        <p>Please make sure the picture has appropriate lighting and background, otherwise the parser won't work.</p>
        <input type="file" multiple accept="image/*" onChange={onImageChange} />
        <button onClick={sendReceipt}>Upload</button>

        {receiptData!=null && <ReceiptData data = {receiptData}></ReceiptData>}

    </div>
  );
}

export default Profile;