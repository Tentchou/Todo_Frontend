import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container-fluid d-flex justify-content-between">
        <nav className="pull-left">
          <ul className="nav">
            <li className="nav-item">
              <a className="nav-link">
                El Bresilio
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#"> Help </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#"> Licenses </a>
            </li>
          </ul>
        </nav>
        <div className="copyright">
        <p className="mb-0">&copy; {new Date().getFullYear()} My Professional TodoApp. All rights reserved.</p>
        </div>
        <div className='me-2'>
          Distributed by
          <a target="_blank" href="https://tentchouromeogithub.com" >Git Hub</a>.
        </div>
      </div>
    </footer>
  );
};

export default Footer;