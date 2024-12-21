import React from "react";
import { useDispatch } from "react-redux";
import authenticationService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";
import Button from "../Button";
const LogoutBtn = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    authenticationService.logout().then(() => {
      dispatch(logout());
    });
  };
  return (
    <Button
      children={"Logout"}
      className={
        "inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
      }
      onClick={handleLogout}
    />
  );
};

export default LogoutBtn;
