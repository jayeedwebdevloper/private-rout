/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import googleIcon from '../assets/google.svg';
import githubIcon from '../assets/github.svg';
import { WebController } from '../MainController';
import { GithubAuthProvider, GoogleAuthProvider, signInWithPopup, updateProfile } from 'firebase/auth';
import { getAuth } from 'firebase/auth'
import app from '../firebase.init';

export const Checking = () => {
    const pass = document.getElementById('pass').value;
    const sub = document.getElementById('submit');
    const error = document.getElementById('error');
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/.test(pass)) {
        sub.setAttribute('disabled', true);
        error.style.display = 'block';
    } else {
        sub.removeAttribute('disabled');
        error.style.display = 'none';
    }
    if (pass == '') {
        error.style.display = 'none';
    }
}

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const gitHubProvider = new GithubAuthProvider();

const Register = () => {
    const { createAccount, googleAuth } = useContext(WebController);
    const navigate = useNavigate();
    const [error, setError] = useState('')


    const createAccountNew = (e) => {
        e.preventDefault();

        const form = e.target;
        const name = form.firstName.value + ' ' + form.lastName.value;
        const email = form.email.value;
        const password = form.password.value;
        console.log(name, email, password);
        createAccount(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                form.reset();
                updateProfile(auth.currentUser, {
                    displayName: name
                })
                navigate('/signin');
            }).catch(error => {
                console.log(error);
                setError(error.message);
            })
    }

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
            <div className="shadow mt-5 py-4 px-5 rounded-4 border width mx-auto">
                <h3 className='text-center text-secondary pb-3'>Create Your New Account</h3>
                <form onSubmit={createAccountNew} className="row g-3">
                    <div className="col-md-6">
                        <label htmlFor="first" className="form-label">First Name</label>
                        <input type="text" name='firstName' required className="form-control" id="first" />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="last" className="form-label">Last Name</label>
                        <input type="text" name='lastName' required className="form-control" id="last" />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="inputEmail4" className="form-label">Email</label>
                        <input type="email" name='email' className="form-control" id="inputEmail4" />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="pass" className="form-label">Password</label>
                        <input type="password" name='password' onKeyUp={Checking} className="form-control" id="pass" />
                        <p className="pt-2 text-danger font-12" id='error'>Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character</p>
                    </div>
                    <div className="col-12 text-center pt-2">
                        <button type="submit" disabled='true' id='submit' className="btn btn-primary w-50">Sign Up</button>
                    </div>
                </form>
                <br />
                <p className='text-danger pt-2 m-0'>{error}</p>
                <Link to='/signin' className='text-decoration-none'>Already Have Account?</Link>
                <br />
                <p className="text-center">Or</p>
                <div className="form-third d-flex align-items-center justify-content-center">
                    <button onClick={Google} title='Sign Up With Google'><img src={googleIcon} alt="Sign-Up With Google" /></button>
                    <button onClick={Github} title="Sign Up With GitHub"><img src={githubIcon} alt="Sign-Up With GitHub" /></button>
                </div>
            </div>
        </div>
    );
};

export default Register;