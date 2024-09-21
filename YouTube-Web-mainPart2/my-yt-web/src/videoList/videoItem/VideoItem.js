import React from 'react';
import './VideoItem.css';

//display the video item
function VideoItem({ video}) {
    
    
    
    return (
        <div className="VideoItem">
        <img src={video.photo} alt={video.title} />
            <div>{video.title}</div>
            <p>{video.authorDisplayName}</p>
            <p>{video.views} Views - {video.timeAgo}</p>
        </div>
    );
}

export default VideoItem;