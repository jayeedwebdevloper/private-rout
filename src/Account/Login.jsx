/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react';
import { Checking } from './Register';
import { WebController } from '../MainController';
import { useNavigate } from 'react-router-dom';
import { GithubAuthProvider, GoogleAuthProvider, getAuth, sendPasswordResetEmail, signInWithPopup, updateProfile } from 'firebase/auth';
import app from '../firebase.init';
import googleIcon from '../assets/google.svg';
import githubIcon from '../assets/github.svg';

const auth = getAuth(app);
const Login = () => {
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const { signinAcount } = useContext(WebController);

    const loginAccount = (e) => {
        e.preventDefault();

        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);
        signinAcount(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                form.reset();
                updateProfile(auth.currentUser, {
                    displayName: name
                });
                navigate('/')
            }).catch(error => {
                setError(error.message)
            })
    }
    const forgot = () => {
        const email = document.getElementById('email').value;
        sendPasswordResetEmail(auth, email)
            .then(() => {
                alert('Please Check Your Email For Reset Your Password');
            }).catch(error => {
                console.log(error);
            })
    }
    const googleProvider = new GoogleAuthProvider();
    const gitHubProvider = new GithubAuthProvider();
    const Google = () => {
        signInWithPopup(auth, googleProvider)
            .then(result => {
                const user = result.user;
                navigate('/');
            }).catch(error => {
                console.log(error);
            })
    }
    const Github = () => {
        signInWithPopup(auth, gitHubProvider)
            .then(result => {
                const user = result.user;
                navigate('/')
            }).catch(error => {
                console.log(error);
            })
    }

    return (
        <div className='container mt-5 pt-5'>
            <div className='shadow mt-5 py-4 px-5 rounded-4 border w-50 mx-auto'>
                <form onSubmit={loginAccount} className="row g-3">
                    <div className="col-12">
                        <label htmlFor="inputEmail4" className="form-label">Email</label>
                        <input type="email" name='email' className="form-control" id="email" />
                    </div>
                    <div className="col-12">
                        <label htmlFor="pass" className="form-label">Password</label>
                        <input type="password" name='password' onKeyUp={Checking} className="form-control" id="pass" />
                        <p className="text-danger m-0 pt-2">{error}</p>
                        <p className='text-primary pt-3 forgot' onClick={forgot}>Forgot Password?</p>

                    </div>
                    <div className="col-12 text-center">
                        <button type="submit" disabled='true' id='submit' className="btn btn-primary w-50">Sign In</button>
                    </div>
                </form>
                <p className="text-center py-3 m-0">Or Sign In With</p>
                <div className="form-third mt-0 d-flex align-items-center justify-content-center">
                    <button onClick={Google} title='Sign Up With Google'><img src={googleIcon} alt="Sign-Up With Google" /></button>
                    <button onClick={Github} title="Sign Up With GitHub"><img src={githubIcon} alt="Sign-Up With GitHub" /></button>
                </div>
            </div>
        </div>
    );
};

export default Login;