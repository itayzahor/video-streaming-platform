import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './LoginPage.css';
import { Link, useNavigate } from 'react-router-dom';


function LoginPage({ users, setConnection }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch('http://localhost:12345/api/tokens', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });



            const data = await response.json();
            const statusNum = response.status;
            if (statusNum === 404) {


                setMessage('Incorrect username or password!');
                return;
            }
            const profilePicture = data.profilePicture;
            const token = data.token;
            const userId = data.userId;

            //const token = jwt.sign({ id: userId }, "key");
            //res.status(200).json({ userId, token });
            
            // Store token in localStorage
            sessionStorage.setItem('profilePicture', profilePicture);
            sessionStorage.setItem('token', token);
            sessionStorage.setItem('userId', userId);
            sessionStorage.setItem('username', username);
            /*
            // Decode token to get user info if needed
            const decodedToken = jwt_decode(token);
            const { id: userId } = decodedToken;
            */

            // Update state or setConnection to indicate user is logged in
            setConnection({ isConnected: true, user: username, id: userId });

            // Redirect to home page
            navigate('/');

        } catch (error) {
            console.error(error);
            console.log('error fetching token');
            setMessage('Incorrect username or password!');
        }
    }




    return (
        <div className="login-container">
            <Link to="/"><div className="youtube-icon"></div></Link>
            <form className="login-form" onSubmit={handleSubmit}>

                <h2>Sign In</h2>
                <div className="form-group">
                    <span>Username</span>
                    <input type="text" value={username} onChange={handleUsernameChange} />
                </div>
                <div className="form-group">
                    <span>Password</span>
                    <input type="password" value={password} onChange={handlePasswordChange} />
                </div>
                <div className="form-buttons">
                    <button type="button" onClick={handleSubmit}>Login</button>
                    <div to="/register">
                        <Link to="/register"><button type="submit">Register</button></Link>
                    </div>
                </div>
                {message && (
                    <div className={'invalid-input-message'}>
                        {message}
                    </div>
                )}
            </form>

        </div>
    );
}

export default LoginPage;