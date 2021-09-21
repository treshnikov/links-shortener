import React, { useContext } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { AuthContext } from "../context/AuthContext"

export const Navbar = () => {
    const auth = useContext(AuthContext)
    const hstory = useHistory()

    const logoutHandler = event => {
        event.preventDefault()
        auth.logout()
        //history.push('/')
    }

    return (
        <nav>
            <div className="nav-wrapper grey lighten-5">
                <a href="#" class="brand-logo">Links shortener app</a>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><NavLink to="/create">Create</NavLink></li>
                    <li><NavLink to="/links">Links</NavLink></li>
                    <li><a href="/" onClick={logoutHandler}>Logout</a></li>
                </ul>
            </div>
        </nav>
    )
}
