import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import LogInBtn from '../LogIn/LogInBtn';
import { useContext } from 'react';
import { userContext } from '../../App';

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(userContext);
    const [user, setUser] = useContext(userContext);
    const colorStyle = {
        color:'black'
    }
    return (
        <header className="container">
            <div className="row">
                <div className="col-md-5">
                    <h1 id="weight">Hanif Paribahan</h1>
                </div>
                <div className="col-md-7">
                    <ul>
                        <li><Link to="/home">Home</Link></li>
                        <li><Link to="/destination">Destination</Link></li>
                        <li><Link to="/blog">Blog</Link></li>
                        <li><Link>Contact</Link></li>
                        <li style={{color: 'white'}} className="button"><Link style={{color: 'white'}} to="/login">Log In</Link></li>
                    </ul>
                </div>
                <div className="row account">
                    <div className="col-md-5 img">
                        <img src={loggedInUser.photoURL, user.photoURL} alt="" />
                    </div>
                    <div className="col-md-7 name">
                        <h6>{loggedInUser.name, user.name }</h6>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;