import axios from 'axios';
import { useState } from "react";
import {Login} from '../components/Login'
import {Profile} from '../components/Profile'
import {Header} from '../components/Header'
import useToken from '../components/useToken'


export const HomePage = () => {

    const [data, setData] = useState([]);
    const { token, removeToken, setToken } = useToken();
    const [profileData, setProfileData] = useState([]);

    const getFlights = () => {
        axios.get('http://localhost:8000')
        .then((res) => {
            setData(res.data);
        });
        
    }
    return (
        <>
            <div style={{padding: '15px'}}>
                <button id="myForm" onClick={getFlights}>Display</button>
            </div>
            <div id="welcome">
                <h1>{data} </h1>
            </div>
            
            <div>
                {!token && token!=="" &&token!== undefined?  <Login setProfileData={setProfileData} setToken={setToken} /> // display login if token does not exist
                // display profile if token exists
                :(
                <> 
                <Header token={removeToken}/>
                <Profile token={token} profileData={profileData} setToken={setToken}/>
                </>
                )}
            </div>
        </>
    );
}
