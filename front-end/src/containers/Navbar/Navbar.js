import React, {useRef, useState, useEffect} from 'react';
import classes from './Navbar.module.css';
import {NavLink, Link} from 'react-router-dom';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '../../components/UI/Button/Button';
import SideDrawer from '../../components/SideDrawer/SideDrawer';
import Backdrop from '@material-ui/core/Backdrop';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import logo from '../../images/whattime-logo.svg';

// Redux
import {connect} from 'react-redux';
import * as actionTypes from '../../store/actions/actionTypes';

function Navbar(props) {

    const [navBackground, setNavBackground] = useState(false);
    const [logoutModal, setLogoutModal] = useState(false);
    const [showSideDrawer, setShowSideDrawer] = useState(false);

    const navRef = useRef();
    navRef.current = navBackground;
    
    const screenIsSmall = useMediaQuery('(max-width:768px)');

    useEffect(() => {
      const handleScroll = () => {
        const show = window.scrollY > 60
        if (navRef.current !== show) {
          setNavBackground(show)
        }
      }
      document.addEventListener('scroll', handleScroll)
      return () => {
        document.removeEventListener('scroll', handleScroll)
      }
    }, [])

    const logoutHandler = () => {
        localStorage.removeItem('accessToken');
        setLogoutModal(false);
        window.location.pathname = '/'
        props.onLogout();
    }


    // Navbar is empty until authentication is determined.

    let transitionProperty = !showSideDrawer ? {transition: 'background-color 0.2s ease'} : {};

    return <>
        <div className={classes.Navbar} style={navBackground || (showSideDrawer && screenIsSmall) ? {backgroundColor: 'rgb(222, 222, 236)', ...transitionProperty} : transitionProperty}>
            {!props.authLoading ? 
            <h2 className={classes.LogoText + ' purple'}>
                <Link className={classes.Link} to='/'>whattime.app</Link>
                <img src={logo} className={classes.Logo}/>
            </h2>
            : null}

            {!props.authLoading && props.username ?
                <ul className={classes.NavList}>
                    <li className={classes.NavItem}>
                        <NavLink exact className={classes.Link} activeStyle={{color: '#6C63FF'}} to='/my-surveys'>My Surveys</NavLink>
                    </li>
                    <li className={classes.NavItem}>
                        <NavLink className={classes.Link} activeStyle={{color: '#6C63FF'}} to='/create'>Create</NavLink>
                    </li>
                    <li className={classes.NavItem}>
                        <span onClick={() => setLogoutModal(true)} className={classes.Link}>Logout</span>
                    </li>
                </ul>
            : null}
            {!props.authLoading && !props.username ?
                <ul className={classes.NavList}>
                    <li className={classes.NavItem}>
                        <NavLink exact className={classes.Link} activeStyle={{color: '#6C63FF'}} to='/'>Home</NavLink>
                    </li>
                    <li className={classes.NavItem}>
                        <NavLink className={classes.Link} activeStyle={{color: '#6C63FF'}} to='/signup'>Sign Up</NavLink>
                    </li>
                    <li className={classes.NavItem}>
                        <NavLink className={classes.Link} activeStyle={{color: '#6C63FF'}} to='/login'>Login</NavLink>
                    </li>
                </ul>
            : null}

            <div className={classes.Burger} onClick={() => setShowSideDrawer(!showSideDrawer)}>
                <div className={showSideDrawer ? classes.Line1 : null}></div>
                <div className={showSideDrawer ? classes.Line2 : null}></div>
                <div className={showSideDrawer ? classes.Line3 : null}></div>
            </div>

            <Dialog
            open={logoutModal}
            onClose={() => setLogoutModal(!logoutModal)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            style={{borderRadius: '0'}}
            >
            <div className={classes.LogoutModal}>
                <h3 className={classes.ModalHeader}>Are you sure you want to log out?</h3>
                <DialogActions>
                    <Button 
                    onClick={() => setLogoutModal(!logoutModal)}
                    buttonClasses='Large'>
                        NO
                    </Button>
                    <Button 
                    onClick={logoutHandler}
                    buttonClasses='Large'>
                        YES
                    </Button>
                </DialogActions>
            </div>
            </Dialog>
        </div>
        
        {screenIsSmall ?
            <>
                <SideDrawer 
                auth={props.username && !props.authLoading ? true: (!props.username && !props.authLoading ? false : null)}
                show={showSideDrawer}
                setLogoutModal={setLogoutModal}
                close={() => setShowSideDrawer(false)}
                />

                <Backdrop
                open={showSideDrawer}
                style={{zIndex: '-1'}}
                onClick={() => {
                    setShowSideDrawer(false);
                }}
                style={{zIndex: '5'}}/>
            </>
        : null}
        
    </>
}

const mapStateToProps = state => {
    return {
        username: state.auth.username,
        authLoading: state.auth.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch({type: actionTypes.LOGOUT})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
