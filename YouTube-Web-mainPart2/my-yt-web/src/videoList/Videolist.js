import VideoItem from "./videoItem/VideoItem";
import './VideoList.css';
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function VideoList({  searchQuery }) {
    const [videoList1, setVideos1] = useState([]);

    useEffect(() => {
        fetchVideos(searchQuery);
    }, [searchQuery]);

    const fetchVideos = async (searchQuery) => {
        try {
            if (searchQuery === '') {
                const response = await fetch('http://localhost:12345/api/videos', {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                    }
                })
                const videos = await response.json();
                
                setVideos1(videos);
            }
            else {
                const response = await fetch(`http://localhost:12345/api/videos/prefix/${searchQuery}`, {
                    method: 'GET',

                })
                const videos = await response.json();
                
                setVideos1(videos);
            }
        } catch (error) {
            // handle error
            console.log('error fetching videos');
        }
    };


    return (
        <div className="VideoList">
            {videoList1.map((video, key) =>
                
               
                <Link key={key} className="vid" to={`/watch/${video._id}`} ><VideoItem  video={video}></VideoItem></Link>
               
            )}
        </div>


    );
}

export default VideoList;