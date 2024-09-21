import VideoItem from "../videoList/videoItem/VideoItem";

import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import './Profile.css';
function Profile() {
    const { profileUser } = useParams();
    const [userVideos, setUserVideos] = useState([]);
    const [user, setUser] = useState([]);
    const token = sessionStorage.getItem('token');
    const userId = sessionStorage.getItem('userId');
    const username = sessionStorage.getItem('username');
    
    useEffect( ()  => {
        getUserInfo();
    }, [profileUser]);

    
    
    const fetchVideos = async (id) => {
        
        try {

            const response = await fetch(`http://localhost:12345/api/users/${id}/videos`, {
                method: 'GET',
                headers: {
                    "authorization": `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }

            })
            const videos = await response.json();

            setUserVideos(videos);

        } catch (error) {
            // handle error
            console.log('error fetching videos');
            console.log(error);

        }
    };
    const getUserInfo = async () => {
        try {

            const response = await fetch(`http://localhost:12345/api/users/${profileUser}/username`, {
                method: 'GET',
                headers: {
                    "authorization": `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }

            })
            const userFromServer = await response.json();
            
            setUser(userFromServer);
            
            fetchVideos(userFromServer._id);
        } catch (error) {
            // handle error
            console.log('error fetching user');
            console.log(error);

        }
    };
    const editDisplayName = async () => {
        const newDisplayName = await prompt('Enter new display name');
        if (newDisplayName === null || newDisplayName === '') {
            return;
        }
        try {
            const response = await fetch(`http://localhost:12345/api/users/${userId}`, {
                method: 'PATCH',
                headers: {
                    "authorization": `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ displayName: newDisplayName })

            })
            getUserInfo();

        } catch (error) {
            // handle error
            console.log('error patching user');
            console.log(error);

        }
    }
    


    return (
        <div className="allProfile" >
            <Link to="/"><div className="youtube-icon"></div></Link>
            <div>
                <div className="ProfileHeader">
                    <img className="ProfileHeaderItem" src={user.profilePicture} alt="profilePic" />
                    <div className="ProfileHeaderItem">Username: {user.username}</div>
                    <div className="ProfileHeaderItem">Name: {user.displayName}</div>
                    {user._id === userId && (<button className="editButton" onClick={() => editDisplayName()} >edit</button>)}
                    
                </div>
            </div>
            <div className="UsersVideoList">
                {userVideos.map((video, key) =>


                    <Link key={key} className="videoOfUser" to={`/watch/${video._id}`} ><VideoItem  video={video}  ></VideoItem></Link>

                )}
            </div>
        </div>

    );
}

export default Profile;