import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/AuthSlice.js';
import getAuthService from '../../Services/auth.js';
export function LogoutBtn({className}) {
    const dispatch = useDispatch();
    const logoutHandler=()=>{
        getAuthService.logout()
        .then(()=>{
            dispatch(logout())
        })
    }
    return (
        <button
        className={className}
        onClick={logoutHandler}
        >Logout</button>
    )
}