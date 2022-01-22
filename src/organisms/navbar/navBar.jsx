import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import './navBar.css';
import { useDispatch, useSelector } from 'react-redux';
import MenuItem from '@mui/material/MenuItem';
import { AccountCircle, FitnessCenter, Logout } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import { Divider, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { clearRegistrationData, fireUserLoaded } from '../../actions/user/userActions';
import { sportsGroundLoaded } from '../../actions/sportsGround/sportsGroundActions';
import { fireTrainerLoaded } from '../../actions/trainer/trainerActions';
import { USER_TYPES } from '../../consts';

function NavBar() {
  const [click, setClick] = useState(false);
  const history = useHistory();
  const currentPath = history?.location?.pathname;
  const [currentPathName, setCurrentPathName] = useState(currentPath);

  const user = useSelector((state) => state.userReducer.user || null);
  const mySportsGround = useSelector(
    (state) => state.sportsGroundReducer.mySportsGround || null,
  );
  const trainer = useSelector(
    (state) => state.trainerReducer.trainer || null,
  );
  const registrationStep = useSelector(
    (state) => state.registrationReducer.activeStep || null,
  );
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangePath = (path) => {
    setCurrentPathName(path);
    history.push(path);
    setClick(false);
  };

  const handleLogOut = () => {
    localStorage && localStorage.removeItem('token');

    handleClose();
    dispatch(fireUserLoaded(null, null));
    if (mySportsGround && Object.keys(mySportsGround).length > 0) {
      dispatch(sportsGroundLoaded({}));
    }
    if (trainer && Object.keys(trainer).length > 0) {
      dispatch(fireTrainerLoaded({}));
    }
    handleChangePath('/');
  };

  const handleRegistration = () => {
    registrationStep > 0 && dispatch(clearRegistrationData());
    handleChangePath('/registration');
  };

  const handleCloseLocal = (path) => {
    handleClose();
    handleChangePath(path);
  };

  const getActiveClassName = (path) => (currentPathName === path ? 'active' : '');

  return (
    <nav className="navbar">
      <div className="nav-container">
        <NavLink exact to="/" className="nav-logo">
          <FitnessCenter />
          <Typography fontWeight="900" fontSize="1em" paddingLeft="15px">
            Fit.me
          </Typography>
        </NavLink>

        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          {user ? (
            click ? (
              <>
                {/* TODO tohle podle typu accountu, možná solo komponenta */}
                <li className="nav-item">
                  <NavLink
                    to={user && USER_TYPES.SPORTS_GROUND === user.accountType ? '/gym-administration' : (user && USER_TYPES.TRAINER === user.accountType ? "/trainer-administration" : '/my-profile')}
                    exact
                    activeClassName={getActiveClassName(user && USER_TYPES.SPORTS_GROUND === user.accountType ? '/gym-administration' : (user && USER_TYPES.TRAINER === user.accountType ? "/trainer-administration" : '/my-profile'))}
                    className="nav-links"
                    onClick={() => handleChangePath(user && USER_TYPES.SPORTS_GROUND === user.accountType ? '/gym-administration' : (user && USER_TYPES.TRAINER === user.accountType ? "/trainer-administration" : '/my-profile'))}
                  >
                    Můj profil
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    exact
                    to="/"
                    activeClassName={getActiveClassName('')}
                    className="nav-links"
                    onClick={() => handleLogOut()}
                  >
                    Odhlásit
                  </NavLink>
                </li>
              </>
            ) : (
              <div>
                <IconButton
                  size="medium"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle style={{ color: '#fff' }} fontSize="large" />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                  keepMounted
                  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={() => handleCloseLocal(user && USER_TYPES.SPORTS_GROUND === user.accountType ? '/gym-administration' : (user && USER_TYPES.TRAINER === user.accountType ? "/trainer-administration" : '/my-profile'))}>
                    Můj profil
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={handleLogOut}>
                    Odhlásit se
                    {' '}
                    <Logout style={{ marginLeft: '0.2em' }} />
                  </MenuItem>
                </Menu>
              </div>
            )
          ) : (
            <>
              <li className="nav-item">
                <NavLink
                  exact
                  to="/registration"
                  activeClassName={getActiveClassName('/registration')}
                  className="nav-links"
                  onClick={handleRegistration}
                >
                  Registrace
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  exact
                  to="/login"
                  activeClassName={getActiveClassName('/login')}
                  className="nav-links"
                  onClick={() => handleChangePath('/login')}
                >
                  Přihlásit
                </NavLink>
              </li>
            </>
          )}
        </ul>
        <div className="nav-icon" onClick={() => setClick(!click)}>
          {click ? <CloseIcon fontSize="large" /> : <MenuIcon fontSize="large" />}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
