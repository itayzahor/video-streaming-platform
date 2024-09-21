import React from 'react';
import './AddVideoItem.css';

function AddVideoItem({ video, index, deleteVideo, updateTitle }) {
    return (
        <div className="AddedVideoItem">
            <img src={video.photo} className="videoPhoto" />
            <div className="videoDetails">
                <div className="videoTitle">{video.title}</div>
                <div className="videoViews">{video.views}</div>
                <div className="videoTimeAgo">{video.likes}</div>
                <div className="videoActions">
                    <button className="deleteButton" onClick={() => updateTitle(video._id)}>edit</button>
                    <button className="deleteButton" onClick={() => deleteVideo(video._id)}>X</button>
                </div>
            </div>
        </div>
    );
}

export default AddVideoItem;
