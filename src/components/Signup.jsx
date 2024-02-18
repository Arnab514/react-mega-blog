import React, { useState, useRef } from "react";
import authService from "../appwrite/auth";
import { login } from "../store/authSlice";
import { useForm } from "react-hook-form";
import {Input} from "./index";
import {Button} from "./index"
import {Logo} from "./index";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
  const navigate = useNavigate()
  const [error, setError] = useState("")
  const dispatch = useDispatch()
  const {register, handleSubmit} = useForm()

  const create = async(data) => {
      setError("")
      try {
          const userData = await authService.createAccount(data)
          if (userData) {
              const userData = await authService.getCurrentUser()
              if(userData) dispatch(login(userData));
              navigate("/")
          }
      } catch (error) {
          setError(error.message)
      }
  }

return (
  <div className="flex items-center justify-center w-full mt-12 p-4">
          <div className={`mx-auto w-full max-w-lg dark:bg-gray-900 rounded-xl p-10 border border-black/10`}>
          <div className="mb-2 flex justify-center">
                  <span className="inline-block w-full max-w-[100px]">
                      <Logo width="100%" />
                  </span>
              </div>
              <h2 className="text-center text-2xl font-bold leading-tight dark:text-gray-100">Sign up to create account</h2>
              <p className="mt-2 text-center text-base text-black/60 dark:text-gray-100">
                  Already have an account?&nbsp;
                  <Link
                      to="/"
                      className="text-blue-500 hover:text-blue-800 font-medium text-primary transition-all duration-200"
                  >
                      Sign In
                  </Link>
              </p>
              {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

              <form onSubmit={handleSubmit(create)}>
                  <div className='space-y-5'>
                      <Input
                      label="Full Name: "
                      placeholder="Enter your full name"
                      {...register("name", {
                          required: true,
                      })}
                      />
                      <Input
                      label="Email: "
                      placeholder="Enter your email"
                      type="email"
                      {...register("email", {
                          required: true,
                          validate: {
                              matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                              "Email address must be a valid address",
                          }
                      })}
                      />
                      <Input
                      label="Password: "
                      type="password"
                      placeholder="Enter your password"
                      {...register("password", {
                          required: true,})}
                      />
                      <Button type="submit" className="w-full">
                          Create Account
                      </Button>
                  </div>
              </form>
          </div>

  </div>
)
}

export default Signup;
