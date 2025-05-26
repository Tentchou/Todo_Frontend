import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCog, faUserCircle } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();
  // const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  // const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  return (
    <>
        <div className="main-header">
          <div className="main-header-logo">
            {/* <!-- Logo Header --> */}
            <div className="logo-header" data-background-color="dark">
              <a href="index.html" className="logo">
                <img
                  src="/assetss/img/kaiadmin/logo_light.svg"
                  alt="navbar brand"
                  className="navbar-brand"
                  height="20"
                />
              </a>
              <div className="nav-toggle">
                <button className="btn btn-toggle toggle-sidebar">
                  <i className="gg-menu-right"></i>
                </button>
                <button className="btn btn-toggle sidenav-toggler">
                  <i className="gg-menu-left"></i>
                </button>
              </div>
              <button className="topbar-toggler more">
                <i className="gg-more-vertical-alt"></i>
              </button>
            </div>
            {/* <!-- End Logo Header --> */}
          </div>
          {/* <!-- Navbar Header --> */}
          <nav
            className="navbar navbar-header navbar-header-transparent navbar-expand-lg border-bottom"
          >
            <div className="container-fluid">
              <nav
                className="navbar navbar-header-left navbar-expand-lg navbar-form nav-search p-0 d-none d-lg-flex"
              >
                
              </nav>
              {isAuthenticated ? (
                <ul className="navbar-nav topbar-nav ms-md-auto align-items-center">
                  <li
                    className="nav-item topbar-icon dropdown hidden-caret d-flex d-lg-none"
                  >
                    <a
                      className="nav-link dropdown-toggle"
                      data-bs-toggle="dropdown"
                      href="#"
                      role="button"
                      aria-expanded="false"
                      aria-haspopup="true"
                    >
                      <i className="fa fa-search"></i>
                    </a>
                  </li>
                  <li className="nav-item topbar-user dropdown hidden-caret">
                    <a
                      className="dropdown-toggle profile-pic"
                      data-bs-toggle="dropdown"
                      href="#"
                      aria-expanded="false"
                    >
                      <div className="avatar-sm">
                        <FontAwesomeIcon icon={faUserCircle} className="me-1" />
                      </div>
                      <span className="profile-username">
                        <span className="op-7">Hi,</span>
                        <span className="fw-bold">{user?.name || 'User'}</span>
                      </span>
                    </a>
                    <ul className="dropdown-menu dropdown-user animated fadeIn">
                      <div className="dropdown-user-scroll scrollbar-outer">
                        <li>
                          <div className="user-box">
                            <div className="avatar-lg">
                                <FontAwesomeIcon icon={faUserCircle} className="me-1" />
                            </div>
                            <div className="u-text">
                              <h4>{user?.name || 'user' }</h4>
                              <p className="text-muted">{user?.email || 'your@email'}</p>
                            </div>
                          </div>
                        </li>
                        <li>
             
                          <div className="dropdown-divider"></div>
                          <NavLink
                            to="/settings"
                            className='btn btn-xs btn-primary btn-lg rounded-pill'
                          >
                            <FontAwesomeIcon icon={faCog} className="me-2" />
                            Settings
                          </NavLink>
                          <div className="dropdown-divider"></div>
                          {/* <a className="dropdown-item" href="#">Logout</a> */}
                          <button className="btn btn-primary rounded-pill w-100 text-center my-3 px-5 mt-5" onClick={logout}>
                            Logout
                          </button>
                        </li>
                      </div>
                    </ul>
                  </li>
                </ul>
              ) : (
                  <>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/login">
                        Login
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/register">
                        Register
                      </NavLink>
                    </li>
                  </>
              )}
            </div>
          </nav>
          {/* <!-- End Navbar --> */}
        </div>
    </>
  );
};

export default Header;