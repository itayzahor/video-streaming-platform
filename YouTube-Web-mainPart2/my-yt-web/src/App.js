import React, { useState, createContext, useEffect } from 'react';
import Home from './homePage/Home'; 
import './App.css';
import Profile from './profile/Profile';

import { BrowserRouter, Route,Routes, link } from 'react-router-dom';
import LoginPage from './loginPage/LoginPage';
import RegisterPage from './registerPage/RegisterPage';

import usersFile from './data/users';
export const ThemeContext = createContext(null);
function App() {
  const [videoList, setVideos] = useState([]);
  const [users, setUsers] = useState(usersFile);
  const [searchQuery, setSearchQuery] = useState('');
  
  
  const [connection, setConnection] = useState({ isConnected: false, user: '' });
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };
  /*
  useEffect(() => {
    fetchVideos();
  }, []);
  
  const fetchVideos = async () => {
    try {
      const response = await fetch('http://localhost:12345/api/videos', {
        method: 'GET',
        
      })
      const videos = await response.json();
      
      setVideos(videos);
    } catch (error) {
      // handle error
      console.log('error fetching videos');
    }
  };
  */
  

  
  return (
    <div id={theme} className='app-div'>
    <BrowserRouter>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        
        <Routes >
          <Route path="/login" element={<LoginPage  users={users} setConnection={setConnection}/>} />
          <Route path="/register" element={<RegisterPage users={users} setUsers={setUsers} setConnection={setConnection} />} />
          <Route path="/profile/:profileUser" element={<Profile/>} />
          <Route path="/*" element={<Home theme={theme} setTheme={setTheme}  connection={connection} setConnection={setConnection} users={users} videoList={videoList} setVideos={setVideos} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />}/>
        </Routes>
        
      </ThemeContext.Provider>
    </BrowserRouter>
    </div>
  )
}
/*
function App() {
  
  return (
    <div className={`App ${darkMode ? 'dark-mode' : ''}`}>
      <WatchVideo darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
    </div>
  );
}
*/

export default App;
