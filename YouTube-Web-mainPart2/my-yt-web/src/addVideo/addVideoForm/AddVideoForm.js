import React, { useState } from 'react';
import './AddVideoForm.css';

function AddVideoForm({ videoList, setVideos, users, connection}) {
  const [title, setTitle] = useState('');
  const [photo, setPhoto] = useState(null);
  const [video, setVideo] = useState(null);
  const token = sessionStorage.getItem('token');
  const userId = sessionStorage.getItem('userId');
  const username = sessionStorage.getItem('username');
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleVideoChange = (e) => {
    setVideo(e.target.files[0]);
  };

  const uploadVideo = async (data) => {
    console.log(data);
    try {

        const response = await fetch(`http://localhost:12345/api/users/${userId}/videos`, {
            method: 'POST',
            headers: {
                "authorization": `Bearer ${token}`
               
            },
            body: data

        })
        
        if (!response.ok) {
          throw new Error('Failed to upload video');
        }
  
        

    } catch (error) {
        // handle error
        console.log('error uploading video');
        console.log(error);
    }
    

  };
  const getVideoPic = async () => {
    
    return await convertToBase64(photo);
  }
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });



  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !photo || !video) {
      alert('Please fill out all fields and upload both photo and video.');
      setTitle('');
      setPhoto(null);
      setVideo(null);
      document.querySelector('.add-video-form').reset();

      return;
    }
    console.log(video);
    console.log(URL.createObjectURL(video));
    const base64Pic = await getVideoPic();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('author', username);
    
    formData.append('photo', base64Pic);
    formData.append('video', video);

    await uploadVideo(formData);
    

    // Clear the form fields
    setTitle('');
    setPhoto(null);
    setVideo(null);
    document.querySelector('.add-video-form').reset();

  };

  return (
    <form onSubmit={handleSubmit} className="add-video-form">
      <h2>Add Video</h2>
      <label>
        Title:
        <input type="text" value={title} onChange={handleTitleChange} />
      </label>
      <label>
        Photo:
        <input type="file" onChange={handlePhotoChange} />
      </label>
      <label>
        Video:
        <input type="file" onChange={handleVideoChange} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

export default AddVideoForm;
