import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faTasks, faFolderOpen, faTags, faCog, faTimes } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
// import * as bootstrap from 'bootstrap'; // Import all named exports from bootstrap

const Sidebar = () => {
  const closeOffcanvas = () => {
    // Ferme l'offcanvas de Bootstrap en déclenchant un clic sur le bouton de fermeture
    const offcanvas = document.getElementById('sidebarOffcanvas');
    if (offcanvas) {
      const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvas) || new bootstrap.Offcanvas(offcanvas);
      bsOffcanvas.hide();
    }
  };

  return (
    <>
      {/* Sidebar pour les écrans larges */}
      <div className="sidebar p-3 d-none d-lg-flex flex-column">
        <h4 className="text-white mb-4">Navigation</h4>
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item mb-2">
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive ? 'nav-link active' : 'nav-link text-white'
              }
              aria-current="page"
            >
              <FontAwesomeIcon icon={faTachometerAlt} className="me-2" />
              Dashboard
            </NavLink>
          </li>
          <li className="nav-item mb-2">
            <NavLink
              to="/todos"
              className={({ isActive }) =>
                isActive ? 'nav-link active' : 'nav-link text-white'
              }
            >
              <FontAwesomeIcon icon={faTasks} className="me-2" />
              My Todos
            </NavLink>
          </li>
          <li className="nav-item mb-2">
            <NavLink
              to="/categories"
              className={({ isActive }) =>
                isActive ? 'nav-link active' : 'nav-link text-white'
              }
            >
              <FontAwesomeIcon icon={faFolderOpen} className="me-2" />
              Categories
            </NavLink>
          </li>
          <li className="nav-item mb-2">
            <NavLink
              to="/tags"
              className={({ isActive }) =>
                isActive ? 'nav-link active' : 'nav-link text-white'
              }
            >
              <FontAwesomeIcon icon={faTags} className="me-2" />
              Tags
            </NavLink>
          </li>
          <li className="nav-item mb-2">
            <NavLink
              to="/settings"
              className={({ isActive }) =>
                isActive ? 'nav-link active' : 'nav-link text-white'
              }
            >
              <FontAwesomeIcon icon={faCog} className="me-2" />
              Settings
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Offcanvas Sidebar pour les petits écrans (mobile) */}
      <div
        className="offcanvas offcanvas-start bg-dark text-white d-lg-none"
        tabIndex="-1"
        id="sidebarOffcanvas"
        aria-labelledby="sidebarOffcanvasLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="sidebarOffcanvasLabel">Navigation</h5>
          <button
            type="button"
            className="btn-close text-reset btn-close-white" // text-reset pour que l'icône soit blanche
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        <div className="offcanvas-body">
          <ul className="nav nav-pills flex-column mb-auto">
            <li className="nav-item mb-2">
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  isActive ? 'nav-link active' : 'nav-link text-white'
                }
                onClick={closeOffcanvas} // Ferme l'offcanvas au clic
              >
                <FontAwesomeIcon icon={faTachometerAlt} className="me-2" />
                Dashboard
              </NavLink>
            </li>
            <li className="nav-item mb-2">
              <NavLink
                to="/todos"
                className={({ isActive }) =>
                  isActive ? 'nav-link active' : 'nav-link text-white'
                }
                onClick={closeOffcanvas}
              >
                <FontAwesomeIcon icon={faTasks} className="me-2" />
                My Todos
              </NavLink>
            </li>
            <li className="nav-item mb-2">
              <NavLink
                to="/categories"
                className={({ isActive }) =>
                  isActive ? 'nav-link active' : 'nav-link text-white'
                }
                onClick={closeOffcanvas}
              >
                <FontAwesomeIcon icon={faFolderOpen} className="me-2" />
                Categories
              </NavLink>
            </li>
            <li className="nav-item mb-2">
              <NavLink
                to="/tags"
                className={({ isActive }) =>
                  isActive ? 'nav-link active' : 'nav-link text-white'
                }
                onClick={closeOffcanvas}
              >
                <FontAwesomeIcon icon={faTags} className="me-2" />
                Tags
              </NavLink>
            </li>
            <li className="nav-item mb-2">
              <NavLink
                to="/settings"
                className={({ isActive }) =>
                  isActive ? 'nav-link active' : 'nav-link text-white'
                }
                onClick={closeOffcanvas}
              >
                <FontAwesomeIcon icon={faCog} className="me-2" />
                Settings
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;