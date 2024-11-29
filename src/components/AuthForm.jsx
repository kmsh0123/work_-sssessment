import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation, useRegisterMutation } from "../feature/api/auth/authApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { addUser } from "../feature/auth/authSlice";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";
import { RegisterSchema } from "../schema/RegisterSchema";
import { LoginSchema } from "../schema/LoginSchema";
import { message } from "antd";

const AuthForm = ({ isLoginPage }) => {
  const [userRegister, { isLoading: isRegisterLoading }] = useRegisterMutation();
  const [userLogin, { isLoading: isLoginLoading }] = useLoginMutation();
  const nav = useNavigate();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(isLoginPage ? LoginSchema : RegisterSchema),
  });

  const authHandler = async (user) => {
    if (isLoginPage) {
      try {
        const { data,error } = await userLogin(user);
         if(error){
      message.error(error?.data?.message);
    }
        if (data?.success) {
          dispatch(addUser({ user: data?.user, token: data?.token }));
          nav("/");
          message.success(data?.message)
        }
      } catch (error) {
        message.error(error.message);
      }
    } else {
      try {
        const { data,error } = await userRegister(user);
        if(error){
          message.error(error?.data?.message);
        }
        if (data?.success) {
          nav("/login");
          message.success(data?.message);
        }
      } catch (error) {
        message.error(error);
      }
    }
  };

  return (
    <div className="flex items-center flex-1 flex-col justify-center min-h-screen px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
          {isLoginPage ? "Login to your account" : "Register your account"}
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit(authHandler)} className="space-y-6">
          {!isLoginPage && (
            <div>
              <label
                style={{ color: errors.name ? "red" : "black" }}
                htmlFor="name"
                className="block text-sm font-medium text-gray-900"
              >
                Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  {...register("name")}
                  type="text"
                  className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm ${
                    errors.name ? "outline-red-500" : ""
                  }`}
                />
                <p className="text-red-500 text-sm">{errors.name?.message}</p>
              </div>
            </div>
          )}

          <div>
            <label
              style={{ color: errors.email ? "red" : "black" }}
              htmlFor="email"
              className="block text-sm font-medium text-gray-900"
            >
              Email
            </label>
            <div className="mt-2">
              <input
                id="email"
                {...register("email")}
                type="email"
                className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm ${
                  errors.email ? "outline-red-500" : ""
                }`}
              />
              <p className="text-red-500 text-sm">{errors.email?.message}</p>
            </div>
          </div>

          <div>
            <label
              style={{ color: errors.password ? "red" : "black" }}
              htmlFor="password"
              className="block text-sm font-medium text-gray-900"
            >
              Password
            </label>
            <div className="mt-2 relative">
              <input
                id="password"
                {...register("password")}
                type={showPassword ? "text" : "password"}
                className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm ${
                  errors.password ? "outline-red-500" : ""
                }`}
              />
              <span
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </span>
            </div>
            <p className="text-red-500 text-sm">{errors.password?.message}</p>
          </div>

          {!isLoginPage && (
            <div>
              <label
                style={{ color: errors.confirm_password ? "red" : "black" }}
                htmlFor="confirm_password"
                className="block text-sm font-medium text-gray-900"
              >
                Confirm Password
              </label>
              <div className="mt-2 relative">
                <input
                  id="confirm_password"
                  {...register("confirm_password")}
                  type={showPassword ? "text" : "password"}
                  className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm ${
                    errors.confirm_password ? "outline-red-500" : ""
                  }`}
                />
                <span
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500 cursor-pointer"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                </span>
              </div>
              <p className="text-red-500 text-sm">{errors.confirm_password?.message}</p>
            </div>
          )}

          <div>
            <button
              type="submit"
              className={`flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                isLoginPage ? (isLoginLoading ? "opacity-70" : "") : (isRegisterLoading ? "opacity-70" : "")
              }`}
              disabled={isLoginPage ? isLoginLoading : isRegisterLoading}
            >
              {isLoginPage
                ? isLoginLoading
                  ? <ImSpinner2 className="animate-spin w-5 h-5 mx-auto" />
                  : "Login"
                : isRegisterLoading
                ? <ImSpinner2 className="animate-spin w-5 h-5 mx-auto" />
                : "Register"}
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          {isLoginPage ? (
            <>
              Don't have an account?{" "}
              <Link to="/register" className="font-semibold text-indigo-600 hover:text-indigo-500">
                Create one
              </Link>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-500">
                Sign in
              </Link>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
