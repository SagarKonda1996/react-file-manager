import React, { useEffect, useState } from 'react'
import M from 'materialize-css'
import { NavLink } from 'react-router-dom';
import Axios from 'axios';
import { Urls } from '../../Urls';
import Loader from '../Shared/Loader';
import Loading from '../Loading/Loading';
const Header = props => {
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        var elem = document.querySelector('.sidenav');
        var instance = new M.Sidenav(elem);
    }, [])
    const clearTrash = () => {
        setIsLoading(true)
        Axios.get(Urls.clear)
            .then(() => {
                M.toast({ html: 'Success' })
                setTimeout(() => {
                    window.location.reload(true)
   
                }, 1000);
            })
            .catch(() => {
                setIsLoading(false)
                M.toast({ html: 'Failed' })
            })
    }
    return (
        <nav class="light-blue lighten-1" role="navigation">
            <div class="nav-wrapper container"><NavLink id="logo-container" to='/' class="brand-logo">File Manager</NavLink>
                <ul class="right hide-on-med-and-down">
                    <li>
                        <NavLink to='/'>Home</NavLink>

                    </li>
                    <li>
                        <button className="btn" onClick={clearTrash}>
                            {
                                isLoading ?<div className="valign-wrapper">
                                    <Loading show={isLoading} />
                                    Cleaning
                                     </div>:
                                    'Clear Unwanted'
                            }

                        </button>
                    </li>


                </ul>

                <ul id="nav-mobile" class="sidenav">
                    <li>
                        <NavLink to='/'>Files</NavLink>

                    </li>
                    <li>
                        <button className="btn" onClick={clearTrash}>
                        {
                                isLoading ?<div className="valign-wrapper">
                                    <Loading show={isLoading} />
                                    Cleaning
                                     </div>:
                                    'Clear Unwanted'
                            }

                        </button>
                    </li>
                </ul>
                <a href="#" data-target="nav-mobile" class="sidenav-trigger"><i class="material-icons">menu</i></a>
            </div>
        </nav>
    )
}


export default Header
