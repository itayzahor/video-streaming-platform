import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import VideoList from '../videoList/Videolist';
import './WatchVideoScreen.css';

function WatchVideoScreen({ users, connection, videoList, setVideos, searchQuery }) {
  const { videoId } = useParams();
  const [videoPath, setVideoPath] = useState('');
  const navigate = useNavigate();
  const [video, setVideo] = useState([]);
  const [comments, setComments] = useState([]);
  const token = sessionStorage.getItem('token');
  const userId = sessionStorage.getItem('userId');
  const username = sessionStorage.getItem('username');

  const fetchVideo = async () => {
    try {
      console.log(videoId);
      const response = await fetch(`http://localhost:12345/api/videos/${videoId}`, {
        method: 'GET',
        headers: {
          "authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        }
      });
      const videoFromServer = await response.json();
      console.log(1);
      console.log(videoFromServer);
      console.log(2);
      setVideoPath(videoFromServer.path);
      setVideo(videoFromServer);
    } catch (error) {
      // handle error
      console.log('error fetching video');
    }
  };
  const fetchComments = async () => {
    try {
      console.log(videoId);
      const response = await fetch(`http://localhost:12345/api/comments/videos/${videoId}`, {
        method: 'GET',
        headers: {
          "authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        }
      });
      const commentsFromServer = await response.json();
      console.log(1);
      console.log(commentsFromServer);
      console.log(2);
      setComments(commentsFromServer);

    } catch (error) {
      // handle error
      console.log('error fetching comments');
    }
  };
  useEffect(() => {
    fetchVideo();
    fetchComments();

  }, [videoId]);





  const [shares, setShares] = useState(0);
  const [downloads, setDownloads] = useState(0);
  const [subscribers, setSubscribers] = useState(0);

  const [commentText, setCommentText] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);



  useEffect(() => {
    if (token && video.likedBy?.includes(username)) {
      setIsLiked(true);

    } else {
      setIsLiked(false);

    }
    if (token && video.dislikedBy?.includes(username)) {
      setIsDisliked(true);
    } else {
      setIsDisliked(false);
    }
  }, [token, username, isLiked, isDisliked, video]);


  const patchVideo = async (data) => {
    try {
      
      const response = await fetch(`http://localhost:12345/api/videos/${videoId}`, {
        method: 'PATCH',
        headers: {
          "authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      });
      const videoFromServer = await response.json();
      
      setVideo(videoFromServer);
    } catch (error) {
      // handle error
      console.log('error patching video');
    }
  };
  const addComment = async (data) => {
    try {
      console.log(comments);
      const response = await fetch(`http://localhost:12345/api/comments/videos/${videoId}`, {
        method: 'POST',
        headers: {
          "authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      });
      const commentFromServer = await response.json();
      console.log(1);
      console.log(commentFromServer);
      console.log(2);
      setComments([...comments, commentFromServer]);
    } catch (error) {
      // handle error
      console.log('error patching comments');
    }
  };
  const patchComment = async (data, id) => {
    try {
      console.log(comments);
      const response = await fetch(`http://localhost:12345/api/comments/${id}/videos/${videoId}`, {
        method: 'PATCH',
        headers: {
          "authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      });
      const commentsFromServer = await response.json();
      console.log(1);
      console.log(commentsFromServer);
      console.log(2);
      setComments(commentsFromServer);
    } catch (error) {
      // handle error
      console.log('error patching comments');
    }
  };
  const deleteComment = async (data) => {
    try {
      
      const response = await fetch(`http://localhost:12345/api/comments/${data}/videos/${videoId}`, {
        method: 'DELETE',
        headers: {
          "authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        }
      });
      const commentsFromServer = await response.json();
     
      setComments(commentsFromServer);
    } catch (error) {
      // handle error
      console.log('error deleting comment');
    }
  };


  const handleLike = () => {
    if (!token) {
      alert('You need to be connected to like a video');
      return;
    }
    if (isLiked) {
      setIsLiked(false);

      
      video.likedBy = video.likedBy.filter(user => user !== username);
      patchVideo(video);


      return;
    }
    video.likedBy.push(username);
    

    if (isDisliked) {
      setIsDisliked(false);

      
      video.dislikedBy = video.dislikedBy.filter(user => user !== username);

    }
    patchVideo(video);


    return;
  };


  const handleDislike = () => {
    if (!token) {
      alert('You need to be connected to dislike a video');
      return;
    }
    if (isDisliked) {
      setIsDisliked(false);

      
      video.dislikedBy = video.dislikedBy.filter(user => user !== username);
      patchVideo(video);


      return;
    }

    video.dislikedBy.push(username);
    


    if (isLiked) {
      setIsLiked(false);

      
      video.likedBy = video.likedBy.filter(user => user !== username);

    }
    patchVideo(video);


    return;
  };

  const handleShare = () => {
    setShares(shares + 1);
  };

  const handleDownload = () => {
    setDownloads(downloads + 1);
  };

  const handleSubscribers = () => {
    setSubscribers(subscribers + 1);
  };

  const handleComment = () => {
    if (!token) {
      alert('You need to be connected to comment on a video');
      setCommentText('');
      return;
    }

    if (commentText.trim() !== '' && token) {
      const newComment = {
        videoId: videoId,
        username: username,
        text: commentText
      };
      addComment(newComment);



    }
    setCommentText('');
  };
  const handleDeleteComment = async (id) => {
    deleteComment(id);

  }
  const handleEditComment = async (id) => {
    const newText = await prompt(`Enter new text: ${comments.find(comment => comment._id === id).text}`);
    if (newText !== null) {

      const newComment = {
        videoId: videoId,
        username: username,
        text: newText
      };
      patchComment(newComment, id)



    }
  }
  const directToProfile = () => {
    navigate(`/profile/${video.author}`);
  }


  return (
    <div className='big-container'>
      <div className="watch-video-container">
        <div className="video-player">
          <video width="100%" src={videoPath} type="video/mp4" autoPlay controls></video>
        </div>
        <div className="video-info">
          <div className="button-container">
            <h1>Title: {video.title}</h1>
            <h3 id='directToProfile' onClick={directToProfile} >By: {video.authorDisplayName}</h3>
            <h3>{video.views} views</h3>
            <h3>Published on {video.timeAgo}</h3>
            <button className={isLiked ? 'buttuonPressed' : ''} onClick={handleLike}>Like ({video.likedBy?.length})</button>
            <button className={isDisliked ? 'buttuonPressed' : ''} onClick={handleDislike}>Dislike ({video.dislikedBy?.length})</button>
            <button onClick={handleShare}>Share ({shares})</button>
            <button onClick={handleDownload}>Download ({downloads})</button>
            <button onClick={handleSubscribers}>Subscribers ({subscribers})</button>

          </div>
          <div className="comments-section">
            <h3>{comments?.length} Comments</h3>
            <div className="comment-input-container">
              <input
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Add a comment"
              />
              <button onClick={handleComment}>Comment</button>
            </div>
            {comments?.map((comment, index) => (
              <div key={index} className="comment">
                <img src={comment.photo} alt="" />
                <span>{comment.displayName}</span>: {comment.text}
                {comment.username === username && (<button className="deleteCommButton" onClick={() => handleEditComment(comment._id)} >edit</button>)}
                {comment.username === username && (<button className="deleteCommButton" onClick={() => handleDeleteComment(comment._id)} >X</button>)}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="video-list-container">
        <div className="video-list">
          <VideoList  searchQuery={searchQuery}  />
        </div>
      </div>
    </div>

  );
};

export default WatchVideoScreen;
