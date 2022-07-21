import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';

const Navbar = ({ handleClick, isLoggedIn, isAdmin }) => (
  <div>
    <div id='bannerContainer'>
      <img id='banner' src='https://i.postimg.cc/8CT6Kj1Q/banner.png' />
    </div>

    <nav id='navbar'>
      {isLoggedIn ? (
        <div className='navContainer'>
          {/* The navbar will show these links after you log in */}
          <Link to='/' className='link'>
            Home
          </Link>
          <Link to='/products' className='link'>
            All
          </Link>
          <Link to='/products/face' className='link'>
            Face
          </Link>
          <Link to='/products/eye' className='link'>
            Eye
          </Link>
          <Link to='/products/lip' className='link'>
            Lip
          </Link>
          <Link to='/products/nail' className='link'>
            Nail
          </Link>
          <Link to='/logout' className='link' onClick={handleClick}>
            Log Out
          </Link>
          <Link to='/cart' className='link'>
            Cart
          </Link>
          {isAdmin && (
            <Link to='/login/admin' className='link'>
              🛠️ Admin
            </Link>
          )}
        </div>
      ) : (
        <div className='navContainer'>
          {/* The navbar will show these links after you log out */}
          <Link to='/' className='link'>
            Home
          </Link>
          <Link to='/products' className='link'>
            All
          </Link>
          <Link to='/products/face' className='link'>
            Face
          </Link>
          <Link to='/products/eye' className='link'>
            Eye
          </Link>
          <Link to='/products/lip' className='link'>
            Lip
          </Link>
          <Link to='/products/nail' className='link'>
            Nail
          </Link>
          <Link to='/login' className='link'>
            Login
          </Link>
          <Link to='/signup' className='link'>
            Sign Up
          </Link>
          <Link to='/cart' className='link'>
            Cart
          </Link>
        </div>
      )}
    </nav>
    <hr />
  </div>
);

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    isAdmin: state.auth.userType == 'admin',
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
