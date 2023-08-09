/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import app from './firebase.init';
import { useNavigate } from 'react-router-dom';



export const WebController = createContext();
const auth = getAuth(app);

const MainController = ({ children }) => {
    const [userInfo, setUserInfo] = useState({});
    const [loader, setLoader] = useState(true);

    const createAccount = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const signinAcount = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }
    const signOutAccount = () => {
        signOut(auth)
            .then(() => {
            }).catch(error => {
                console.log(error);
            })
    }

    useEffect(() => {
        const Logged = onAuthStateChanged(auth, (user) => {
            setUserInfo(user);
            setLoader(false);
        })
        return () => {
            Logged()
        }
    }, []);


    const userInformation = { createAccount, signinAcount, signOutAccount, userInfo, loader };

    return (
        <WebController.Provider value={userInformation}>
            {children}
        </WebController.Provider>
    );
};

export default MainController;