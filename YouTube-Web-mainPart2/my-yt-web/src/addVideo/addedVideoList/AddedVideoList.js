import AddVideoItem from './addVideoItem/AddVideoItem';
import './AddedVideoList.css';
import { useEffect, useState } from 'react';
function AddedVideoList({ videoList, setVideos, users, connection }) {
    const [userVideos, setUserVideos] = useState([]);
    const token = sessionStorage.getItem('token');
    const userId = sessionStorage.getItem('userId');
    const username = sessionStorage.getItem('username');
    useEffect(() => {
        fetchVideos();
    }, [userVideos]);

    const fetchVideos = async () => {
        try {

            const response = await fetch(`http://localhost:12345/api/users/${userId}/videos`, {
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
        }
    };

    const deleteVideo = async (id) => {
        try {

            const response = await fetch(`http://localhost:12345/api/users/${userId}/videos/${id}`, {
                method: 'DELETE',
                headers: {
                    "authorization": `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }

            })
            const videos = await response.json();

            setUserVideos(videos);

        } catch (error) {
            // handle error
            console.log('error deleting video');
        }
        

    };
    const updateTitle = async (id) => {
        const newTitle = await prompt('Enter new title:');
        if (newTitle === null || newTitle === '') {
            return;
        }
        try {

            const response = await fetch(`http://localhost:12345/api/users/${userId}/videos/${id}`, {
                method: 'PATCH',
                headers: {
                    "authorization": `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title: newTitle })

            });
            fetchVideos();

        } catch (error) {
            // handle error
            console.log('error deleting video');
        }
    };
    return (
        <div className="AddedVideoList">
            <div className="AddedVideoListHeader">
                <div className="headerItem">Title</div>
                <div className="headerItem">Views</div>
                <div className="headerItem">Likes</div>
            </div>
            {userVideos.length > 0 ? (
                <div>
                    {userVideos.map((video, index) => (
                        video.author == username &&
                        <AddVideoItem key={index} video={video} index={index} deleteVideo={deleteVideo} updateTitle={updateTitle} />
                    ))}
                </div>
            ) : (
                <p>No videos added yet.</p>
            )}
        </div>
    );
}

export default AddedVideoList;
