import React, { useState } from "react";
import authService from "../appwrite/auth";
import { login as storeLogin } from "../store/authSlice";
import { useForm } from "react-hook-form";
import { Logo } from "./index";
import { Input } from "./index";
import { Button } from "./index";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const login = async (data) => {
    setError("");
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(storeLogin(userData));
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex  items-center justify-center w-full mt-12 p-4 ">
  <div
    className={`mx-auto w-full max-w-lg dark:bg-gray-900 rounded-xl p-10 border border-black/10 `}
  >
    <div className="mb-2 flex justify-center "></div>
    <h2 className="text-center text-2xl font-bold leading-tight dark:text-gray-100">
      Sign in to your account
    </h2>
    <p className="mt-2 text-center text-base dark:text-gray-100 dark:text-black/60">
      Don't have any account?&nbsp;
      <Link
        to="/signup"
        className="text-blue-500 hover:text-blue-800 font-medium text-primary transition-all duration-200 "
      >
        Signup
      </Link>
    </p>
    {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
    <form onSubmit={handleSubmit(login)} className="mt-8">
      <div className="space-y-5">
        <Input
          label="Email: "
          placeholder="Enter your email"
          type="email"
          {...register("email", {
            required: true,
            validate: {
              matchPatern: (value) =>
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                "Email address must be a valid address",
            },
          })}
        />
        <Input
          label="Password: "
          type="password"
          placeholder="Enter your password"
          {...register("password", {
            required: true,
          })}
        />
        <Button type="submit" className="w-full">
          Sign in
        </Button>
      </div>
    </form>
  </div>
</div>
    
  );
}

export default Login;






{/* <div className="flex items-center justify-center w-full">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(login)} className="mt-8">
          <div className="space-y-5">
            <Input
              label="Email: "
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />
            <Input
              label="Password: "
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: true,
              })}
            />
            <Button type="submit" className="w-full">
              Sign in
            </Button>
          </div>
        </form>
      </div>
    </div> */}