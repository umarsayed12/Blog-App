import React, { useState } from "react";
import authenticationService from "../appwrite/auth";
import { Link, useNavigate } from "react-router-dom";
import { login as storeLogin } from "../store/authSlice";
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { Button as MatButton } from "@material-tailwind/react";
function SignUp() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const RegisterAccount = async (data) => {
    setLoading(true);
    setError("");
    try {
      const userData = await authenticationService.createAccount(data);
      if (userData) {
        const currUserData = await authenticationService.getCurrentUser();
        if (currUserData) dispatch(storeLogin(currUserData));
        navigate("/");
      }
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign up to create account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-[#1d4ed8] text-primary transition-all duration-200 hover:underline"
          >
            Log In
          </Link>
        </p>
        {error && (
          <p className="text-red-600 mt-8 text-center">{error.message}</p>
        )}

        <form onSubmit={handleSubmit(RegisterAccount)}>
          <div className="space-y-5">
            <Input
              label="Full Name: "
              placeholder="Enter your Full Name..."
              required
              {...register("username", {
                required: true,
              })}
            />
            {errors.username && (
              <p className="text-red-800">{errors.username.message}</p>
            )}
            <Input
              label="Email: "
              placeholder="Enter your Email..."
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email Address is not valid",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-800">{errors.email.message}</p>
            )}
            <Input
              label="Password: "
              type="password"
              placeholder="Enter your Password..."
              {...register("password", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(value) ||
                    "Password must be at least 8 characters long and include at least one letter and one number",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-800">{errors.password.message}</p>
            )}
            {!loading && (
              <Button type="submit" className="w-full">
                Register
              </Button>
            )}
            {loading && (
              <MatButton className="w-full flex justify-center" loading={true}>
                Loading
              </MatButton>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
