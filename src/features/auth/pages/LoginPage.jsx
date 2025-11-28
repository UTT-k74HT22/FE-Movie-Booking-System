/**
 * Login Page
 * User login page
 */

import React from "react";
import { useLogin } from "../hooks/useLogin";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../shared/constants";

const LoginPage = () => {
  const { formData, errors, isSubmitting, handleChange, handleSubmit } =
    useLogin();

  return (
    <div className="relative overflow-hidden h-screen bg-purple-animated">
      <div className="flex h-full justify-center items-center px-4">
        <div className="rounded-xl shadow-md bg-white p-6 w-full md:w-96 border-none">
          <div className="flex flex-col gap-2 p-0 w-full">
            <div className="mx-auto flex items-center justify-center gap-2">
              <div className="text-blue-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-10"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z"
                  />
                </svg>
              </div>
              <div className="text-blue-500 font-medium">MOVIES</div>
            </div>
            <p className="text-2xl text-center text-dark my-3">Sign In</p>
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <div className="block mb-1 text-gray-500">
                  <label htmlFor="username">Username</label>
                </div>
                <div className="flex form-control form-rounded-xl">
                  <div className="relative w-full">
                    <input
                      type="text"
                      id="username"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      className={`block w-full p-2.5 text-sm rounded-lg border ${
                        errors.username ? "border-red-500" : "border-gray-300"
                      } text-gray-900 focus:outline-none focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-50`}
                      placeholder="Enter your username"
                    />
                    {errors.username && (
                      <p className="absolute text-red-500 text-sm mt-1">
                        {errors.username}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="mb-8">
                <div className="block mb-1 text-gray-500">
                  <label htmlFor="password">Password</label>
                </div>
                <div className="flex form-control form-rounded-xl">
                  <div className="relative w-full">
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className={`block w-full p-2.5 text-sm rounded-lg border ${
                        errors.username ? "border-red-500" : "border-gray-300"
                      } text-gray-900 focus:outline-none focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-50`}
                      placeholder="Enter your username"
                    />
                    {errors.password && (
                      <p className="absolute text-red-500 text-sm mt-1">
                        {errors.password}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="cursor-pointer w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Logging in..." : "Sign In"}
              </button>
              <div className="mt-4 text-center">
                <Link
                  to={ROUTES.FORGOT_PASSWORD}
                  className="text-blue-600 hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>

              <div className="mt-4 text-center">
                <p className="text-gray-600">
                  Don't have an account?{" "}
                  <Link
                    to={ROUTES.REGISTER}
                    className="text-blue-600 hover:underline"
                  >
                    Register
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
