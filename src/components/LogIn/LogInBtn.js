import React from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useContext } from 'react';
import { userContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
import './Login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faGoogle, faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const LogInBtn = () => {
    const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState({
        isSignIn: false,
        name: '',
        email: '',
        password: '',
        photoURL: '',
        error: '',
        success: false,
    })
    const [loggedInUser, setLoggedInUser] = useContext(userContext);
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
    const handleGoogleLogIn = () => {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {
                /** @type {firebase.auth.OAuthCredential} */
                var credential = result.credential;
                var token = credential.accessToken;
                const { displayName, photoURL, email } = result.user;
                const signInUser = { name: displayName, photoURL, email }
                setLoggedInUser(signInUser);
                history.replace(from);
            }).catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                var email = error.email;
                var credential = error.credential;
            });
    }

    const handleBlur = (e) => {
        // debugger;
        let isFormValid = true;
        if (e.target.name === 'email') {
            isFormValid = /\S+@\S+\.\S+/.test(e.target.value);
        }
        if (e.target.name === 'password') {
            const passwordValid = e.target.value.length > 5;
            const passwordNumbers = /\d{2}/.test(e.target.value);
            isFormValid = passwordValid && passwordNumbers;
        }
        if (isFormValid) {
            const newUserInfo = { ...user };
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo);
        }
    }

    const handleSubmit = (e) => {
        if (newUser && user.email && user.password) {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then((userCredential) => {
                    // Signed in 
                    var user = userCredential.user;
                    const newUserInfo = { ...user };
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    setUser(newUserInfo);
                    const { displayName, photoURL, email } = { ...user };
                    const signInUser = { name: displayName, photoURL, email }
                    setLoggedInUser(signInUser);
                    updateUserName(user.name);
                    history.replace(from);
                })
                .catch(error => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo);
                });
        }

        if (!newUser && user.email && user.password) {
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then((userCredential) => {
                    var user = userCredential.user;
                    const newUserInfo = { ...user };
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    setUser(newUserInfo);
                    const { displayName, photoURL, email } = { ...user };
                    const signInUser = { name: displayName, photoURL, email }
                    setLoggedInUser(signInUser);
                    history.replace(from);
                    console.log('okokokoko', userCredential.user)
                })
                .catch(error => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo);
                });
        }
        e.preventDefault();
    }

    const updateUserName = name => {
        var user = firebase.auth().currentUser;

        user.updateProfile({
            displayName: name
        }).then(function () {
            console.log('Updated Done')
        }).catch(function (error) {
            console.log(error)
        });
    }

    return (
        <div className="container center">
            <form onSubmit={handleSubmit}>
                <h2>{newUser ? 'Create an Account' : 'Log In'}</h2>
                {newUser && <input className="input" onBlur={handleBlur} name="name" type="text" placeholder="Enter your Name" />}<br /><br />
                <input className="input" onBlur={handleBlur} name="email" type="text" placeholder="Username or Email" required /><br /><br />
                <input className="input" onBlur={handleBlur} name="password" type="password" placeholder="Password" required /><br /><br />
                {newUser && <input className="input" onBlur={handleBlur} name="password" type="password" placeholder="Confirm Password" required />}
                <input className="button input" type="submit" value={newUser ? 'Create an account' : 'Login'} /><br /><br />
                <label htmlFor="newUser">{newUser ? 'Already have an account? ' : 'Don’t have an account?'}</label>
                <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id="" />
            </form><br />
            <p style={{ color: 'red' }}>{user.error}</p>
            {user.success && <p style={{ color: 'green' }}>User {newUser ? 'Sign Up' : 'Log In'} Successfully</p>}
            <button onClick={handleGoogleLogIn}><FontAwesomeIcon icon={faCheckSquare} /> Log In to Google</button>
        </div>
    );
};

export default LogInBtn;