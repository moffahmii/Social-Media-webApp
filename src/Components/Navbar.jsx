import React, { useContext } from 'react';
import {
  Navbar as HeroNavBar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  Avatar,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import { LogOut, User, LayoutDashboard, Settings } from 'lucide-react';

export default function Navbar() {
  const { isLoggedIn, setIsLoggedIn, userData, setUserData } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  function logOut() {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setUserData(null);
    navigate('/login');
  }

  return (
    <HeroNavBar
      isBordered
      maxWidth="xl"
      className="bg-white/70 backdrop-blur-md"
    >
      <NavbarBrand>
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-primary p-1.5 rounded-lg group-hover:rotate-12 transition-transform">
            <LayoutDashboard className="text-white" size={20} />
          </div>
          <p className="font-black text-xl tracking-tighter text-slate-800">HOME</p>
        </Link>
      </NavbarBrand>

      <NavbarContent justify="end">
        {isLoggedIn ? (
          <NavbarContent as="div" justify="end" className="gap-4">
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  isBordered
                  as="button"
                  className="transition-transform"
                  color="primary"
                  name={userData?.name}
                  size="sm"
                  src={userData?.photo}
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem key="profile_info" className="h-14 gap-2">
                  <p className="font-semibold">Signed in as</p>
                  <p className="font-semibold text-primary">{userData?.email}</p>
                </DropdownItem>
                <DropdownItem
                  key="profile"
                  startContent={<User size={18} />}
                  onClick={() => navigate('/profile')}
                >
                  My Profile
                </DropdownItem>
                <DropdownItem
                  key="settings"
                  startContent={<Settings size={18} />}
                  onClick={() => navigate('/change-password')}
                >
                  Settings
                </DropdownItem>
                <DropdownItem
                  key="logout"
                  color="danger"
                  className="text-danger"
                  startContent={<LogOut size={18} />}
                  onClick={logOut}
                >
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarContent>
        ) : (
          <div className="flex items-center gap-2">
            <NavbarItem>
              <Button
                as={Link}
                to="/login"
                variant="light"
                className="font-bold text-slate-600"
              >
                Login
              </Button>
            </NavbarItem>
            <NavbarItem>
              <Button
                as={Link}
                to="/register"
                color="primary"
                variant="flat"
                className="font-bold rounded-full"
              >
                Sign Up
              </Button>
            </NavbarItem>
          </div>
        )}
      </NavbarContent>
    </HeroNavBar>
  );
}