import React from "react";
import { useDispatch } from "react-redux";
import authenticationService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";
import Button from "../Button";
import { useNavigate } from "react-router-dom";
const LogoutBtn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    authenticationService.logout().then(() => {
      dispatch(logout());
      navigate("/");
    });
  };
  return (
    <Button
      children={"Logout"}
      className={
        "inline-bock px-6 py-2 duration-200 hover:bg-[#1d58d8] rounded-full"
      }
      onClick={handleLogout}
    />
  );
};

export default LogoutBtn;
