import React from 'react'
import { NavLink } from 'react-router-dom'

const NavBar = () => {
    return (
        <header>
            <nav class="navbar navbar-expand-lg bg-light">
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to="/">Dash-Board</NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                              <NavLink to="/" className="nav-link active" aria-current="page">view-users</NavLink>  
                            </li>
                              <NavLink to="/register" className="nav-link active" aria-current="page">
                            <li className="nav-item">add-user</li></NavLink>    
                        </ul>
                        {/* <form class="d-flex" role="search">
                            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button class="btn btn-outline-success" type="submit">Search</button>
                        </form> */}
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default NavBar;