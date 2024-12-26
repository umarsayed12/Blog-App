import React, { useEffect, useState } from "react";
import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { Container, Button, Logo, LogoutBtn } from "../index";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const location = useLocation();
  const [openNav, setOpenNav] = useState(false);

  useEffect(() => {
    setOpenNav(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleResize = () => setOpenNav(false);
    window.addEventListener("resize", handleResize);

    const handleClickOutside = (event) => {
      const nav = document.getElementById("mobile-nav");
      const navButton = document.getElementById("nav-toggle");
      if (
        openNav &&
        nav &&
        !nav.contains(event.target) &&
        !navButton.contains(event.target)
      ) {
        setOpenNav(false);
      }
    };
    document.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [openNav]);

  const navItems = [
    {
      name: "Home",
      slug: "/",
      isActive: true,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      isActive: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-Post",
      isActive: authStatus,
    },
    {
      name: "My Posts",
      slug: "/my-posts",
      isActive: authStatus,
    },
  ];

  const navList = (
    <ul className="mt-2 bg-white px-3 rounded-lg mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      {navItems.map(
        (item) =>
          item.isActive && (
            <Typography
              key={item.name}
              as="li"
              variant="small"
              color="black"
              className="p-1 font-normal"
            >
              <button
                onClick={() => navigate(item.slug)}
                className="inline-block w-full px-4 py-2 text-center rounded-lg duration-200 hover:bg-[#1d4ed8] hover:text-white"
              >
                {item.name}
              </button>
            </Typography>
          )
      )}
    </ul>
  );

  return (
    <Navbar
      color="transparent"
      className="sticky rounded-none top-0 z-10 h-max max-w-full px-4 py-2 lg:px-8 lg:py-4 bg-[#000000] shadow"
    >
      <Container>
        <div className="flex items-center justify-between">
          <Link to="/" className="w-[40%] md:w-[15%] ">
            <Logo width="100%" />
          </Link>
          <div className="hidden lg:flex items-center gap-4">{navList}</div>
          <div className="flex items-center gap-2">
            {!authStatus && (
              <>
                <Button
                  bgColor="bg-transparent"
                  className="hover:bg-gray-600 text-white"
                  onClick={() => navigate("/login")}
                >
                  Log In
                </Button>
                <Button
                  className="hover:bg-[#1d58d8]"
                  onClick={() => navigate("/signup")}
                >
                  Sign Up
                </Button>
              </>
            )}
            {authStatus && (
              <Typography as="li" variant="small" className="p-1 font-normal">
                <LogoutBtn />
              </Typography>
            )}
            <IconButton
              id="nav-toggle"
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
          </div>
        </div>
        <Collapse id="mobile-nav" open={openNav}>
          {navList}
        </Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
