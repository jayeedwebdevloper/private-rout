/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { WebController } from '../MainController';

const Header = () => {

    const droping = () => {
        const drop = document.getElementById('dropItem');
        if (drop.style.display == 'block'){
            drop.style.display = 'none';
        } else {
            drop.style.display = 'block';
        }
    }

    const { userInfo, signOutAccount } = useContext(WebController);

    const signOut = () => {
        signOutAccount();
    }

    return (
        <header className='fixed-top'>
            <Navbar expand="lg" className="bg-dark">
                <Container>
                    <Navbar.Brand><Link to='/' className='navbar-brand text-light fw-semibold fs-4'>Logo</Link></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto align-items-center">
                            <Nav.Link><Link to='/' className='nav-link text-light'>Home</Link></Nav.Link>
                            <Nav.Link><Link to='/cart' className='nav-link text-light'>Cart</Link></Nav.Link>
                            <Nav.Link><Link to='/signup' className='nav-link text-light'>Sign Up</Link></Nav.Link>

                            <div className="d-flex ms-2 ps-2">
                                <div className="account">
                                    {
                                        userInfo?.displayName ?
                                            <div className='py-3'>
                                                <p onClick={droping} className='text-light m-0 drop btn'>{userInfo.displayName}  <svg xmlns="http://www.w3.org/2000/svg" fill='#fff' height="15px" viewBox="0 0 320 512"><path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z" /></svg></p>
                                                <div className='dropItem' id='dropItem'>
                                                    <p className='text-light m-0'>{userInfo.email}</p>
                                                    {userInfo.emailVerified ? <p className='text-success m-0'>Verified</p> : <p className='text-danger m-0'>Not Verified</p>}
                                                    <Nav.Link><Link to='signin' className='nav-link text-light'><button className='btn btn-danger' onClick={signOut}>Sign Out</button></Link></Nav.Link>
                                                </div>

                                            </div>


                                            : <Nav.Link><Link to='signin' className='nav-link text-light'><button className='btn btn-light'>Sign In</button></Link></Nav.Link>
                                    }
                                </div>

                            </div>
                            


                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

export default Header;