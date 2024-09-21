// src/topBar/TopBar.js
import React, { useState, useEffect, useRef } from 'react';

import logoImg from './logo.png';
import { Link } from 'react-router-dom';
import Dropdown  from './Dropdown';
import './TopBar.css';
import { useNavigate } from 'react-router-dom';
//import searchIcon from './logo.png';

function TopBar({theme, setTheme,connection, setConnection , users, setSearchQuery} ) {
  
  const token = sessionStorage.getItem('token');
  const userId = sessionStorage.getItem('userId');
  const username = sessionStorage.getItem('username');
  const profilePicture = sessionStorage.getItem('profilePicture');

  const searchBox = useRef(null);
  const navigate = useNavigate();
  const search = function(){
    setSearchQuery(searchBox.current.value);
    console.log(searchBox.current.value);
  }
  
  
  function handleLogout() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('profilePicture');
    navigate("/login");
  }
  
  return (
    <div>
      <div className="topbar">

        <div className="topbar-right">
          {!token && (
            <Link to="/login">
              <button type="button" className="buttonSign">
                <i className="bi bi-person icon"></i>
                <span className="buttonText">Sign In</span>
              </button>
            </Link>
          )}
          {token &&(
            <div>
              <div onClick={handleLogout} className="profile-picture1">
                <h4>sign out</h4>
                <img className="userImg" src={profilePicture} />
                
              </div>
              
            </div>
          )}
        </div>


        <div className="topbar-left">
          <Link to="/"><img src={logoImg} alt="" className="logo" /></Link>
        </div>


        <div className="topbar-center">
          <input ref={searchBox} onKeyUp={search} type="text" placeholder="Search" className="search-input" />
          <button className="search-button">
            <i className="bi bi-search"></i>
          </button>
        </div>

      </div>
      <Dropdown theme={theme} setTheme={setTheme} connection={connection} setConnection={setConnection} />
    </div>
  );
};

export default TopBar;