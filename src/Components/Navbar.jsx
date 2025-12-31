import React, { useContext } from 'react'
import {
  Navbar as HeroNavBar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,

} from "@heroui/react";

import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';

export default function Navbar() {

  const { isLoggedIn, setIsLoggedIn, userData, setUserData } = useContext(AuthContext);
  const navigate = useNavigate();

  function logOut() {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/login');
    setUserData(null)
  }

  return (
    <HeroNavBar>
      <NavbarBrand className="font-bold">
        <Link to="/" className="text-inherit no-underline">
          FAHMY
        </Link>
      </NavbarBrand>
      <NavbarContent justify="end">
        {isLoggedIn ? (
          <>
            <NavbarItem onClick={logOut} className="cursor-pointer">
              Log out
            </NavbarItem>
            <NavbarItem className="cursor-pointer">
              <Link to={'/profile'}>Profile</Link>
            </NavbarItem>
          </>
        ) : (
          <>
            <NavbarItem>
              <Link href="/register">Register</Link>
            </NavbarItem>
            <NavbarItem>
              <Link href="/login">Login</Link>
            </NavbarItem>
          </>
        )}
      </NavbarContent>

    </HeroNavBar>
  );
}
