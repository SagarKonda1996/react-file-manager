import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import Axios from 'axios';
import { Urls } from '../../Urls';
import Loading from '../Loading/Loading';
import { Navbar, Nav, Button } from 'react-bootstrap';
const Header = props => {
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {

    }, [])
    const clearTrash = () => {
        setIsLoading(true)
        Axios.get(Urls.clear)
            .then(() => {
                setTimeout(() => {
                    window.location.reload(true)

                }, 1000);
            })
            .catch(() => {
                setIsLoading(false)
            })
    }
    return (
        <Navbar bg="light" expand="lg">

            <NavLink to='/'>
                <Navbar.Brand >
                    File Manager
      </Navbar.Brand>
            </NavLink>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <NavLink role="" to='/mydrive' className="nav-link mr-3" activeClassName="btn active-nav-link">
                    Home
                    </NavLink>
                    
                        <Button
                        className="waves_button"
                        disabled={isLoading}
                        onClick={!isLoading ? clearTrash : null}
                        >
                              {isLoading ? 'Cleaning in Process...' : 'Trigger CRON Job'}

                        </Button>


                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}



export default Header
