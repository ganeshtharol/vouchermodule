import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

import classNames from "classnames";
import Dropdown from 'react-bootstrap/Dropdown'

function Header() {

    const useClickOutside = (element, callback) => {
        useEffect(() => {
            const handleClickOutside = (event) => {
                if (!element.current.contains(event.target)) {
                    callback()
                }
            }
            document.addEventListener('mousedown', handleClickOutside);

            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
            }
        })
    }
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

    const mainNavRef = useRef();

    const handleClick = () => {
        setIsMobileNavOpen(!isMobileNavOpen);
    }

    const handleClose = () => {
        setIsMobileNavOpen(false);
    }

    // Hide Mobile Sidebar on click outside of navigation
    useClickOutside(mainNavRef, () => setIsMobileNavOpen(false));

    return (
        <header className={
            classNames(
                isMobileNavOpen && 'mobile-navigation--open'
            )
        }>
            <div className="container">
                <Link className="brand-logo" to="/">
                    Voucher
                </Link>

                <div className="main-navigation" ref={mainNavRef}>
                    <span className="nav-close-btn" onClick={handleClose}><i className="bi bi-x-circle"></i></span>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                    </ul>
                </div>
                <ul className="user-controls">
                    <li>
                        <Link to="/" className="notification">
                            <span className="count">5</span>
                            <i className="bi bi-cart"></i>
                        </Link>
                    </li>
                    <Dropdown className="logged-user" align="end" as="li">
                        <Dropdown.Toggle variant="" id="dropdown-split-basic" >
                            <img src="" alt="" />
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <div className="user-info">
                                <div className="user-img">
                                    <img src="" alt="" />
                                </div>
                                <div>
                                    <h4>John Doe</h4>
                                </div>
                            </div>
                            <button type="button" className="dropdown-item">Logout</button>
                        </Dropdown.Menu>
                    </Dropdown>
                    <li className="nav-toggler">
                        <span onClick={handleClick}><i className="bi bi-list"></i></span>
                    </li>
                </ul>
            </div>
        </header>
    )
}


export default Header;