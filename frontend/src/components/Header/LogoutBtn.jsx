import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/AuthSlice.js';
import getAuthService from '../../Services/auth.js';
export function LogoutBtn() {
    const dispatch = useDispatch();
    const logoutHandler=()=>{
        getAuthService.logout()
        .then(()=>{
            dispatch(logout())
        })
    }
    return (
        <button
        className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
        onClick={logoutHandler}
        >Logout</button>
    )
}