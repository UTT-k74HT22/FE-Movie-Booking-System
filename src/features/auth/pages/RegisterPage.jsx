/**
 * Register Page
 */

import React from "react";
import { useRegister } from "../hooks/useRegister";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../shared/constants";

const RegisterPage = () => {
  const { formData, errors, isSubmitting, handleChange, handleSubmit } =
    useRegister();

  return (
    <div className="relative overflow-y-auto min-h-screen bg-purple-animated">
      <div className="flex min-h-screen justify-center items-center px-4">
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
            <p className="text-2xl text-center text-dark my-3">Sign Up</p>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Row: First + Last */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    First name
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    autoComplete="given-name"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`mt-1 block w-full px-4 py-2 rounded-lg border ${
                      errors.firstName ? "border-red-500" : "border-gray-300"
                    } focus:outline-none focus:ring-0 focus:border-blue-500`}
                    aria-invalid={errors.firstName ? "true" : "false"}
                  />
                  {errors.firstName && (
                    <p className="absolute text-sm text-red-500">
                      {errors.firstName}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Last name
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    autoComplete="family-name"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`mt-1 block w-full px-4 py-2 rounded-lg border ${
                      errors.lastName ? "border-red-500" : "border-gray-300"
                    } focus:outline-none focus:ring-0 focus:border-blue-500`}
                    aria-invalid={errors.lastName ? "true" : "false"}
                  />
                </div>
              </div>

              {/* Username */}
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  autoComplete="username"
                  value={formData.username}
                  onChange={handleChange}
                  className={`mt-1 block w-full px-4 py-2 rounded-lg border ${
                    errors.username ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-0 focus:border-blue-500`}
                  aria-invalid={errors.username ? "true" : "false"}
                />
                {errors.username && (
                  <p className="absolute text-sm text-red-500">
                    {errors.username}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`mt-1 block w-full px-4 py-2 rounded-lg border ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-0 focus:border-blue-500`}
                  aria-invalid={errors.email ? "true" : "false"}
                />
                {errors.email && (
                  <p className="absolute text-sm text-red-500">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Phone (optional) */}
              <div>
                <label
                  htmlFor="phoneNumber"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone{" "}
                  <span className="text-sm text-gray-400">(optional)</span>
                </label>
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-500"
                />
              </div>

              {/* Passwords: single column for mobile, side-by-side on md if you prefer */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`mt-1 block w-full px-4 py-2 rounded-lg border ${
                      errors.password ? "border-red-500" : "border-gray-300"
                    } focus:outline-none focus:ring-0 focus:border-blue-500`}
                    aria-invalid={errors.password ? "true" : "false"}
                  />
                  {errors.password && (
                    <p className="absolute text-sm text-red-500">
                      {errors.password}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Confirm password
                  </label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`mt-1 block w-full px-4 py-2 rounded-lg border ${
                      errors.confirmPassword
                        ? "border-red-500"
                        : "border-gray-300"
                    } focus:outline-none focus:ring-0 focus:border-blue-500`}
                    aria-invalid={errors.confirmPassword ? "true" : "false"}
                  />
                </div>
              </div>
              {/* CTA */}
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-2 w-full bg-blue-600 disabled:bg-gray-400 text-white py-2 rounded-lg transition"
                >
                  {isSubmitting ? "Registering..." : "Sign Up"}
                </button>
              </div>
              <div className="mt-4 text-center">
                <p className="text-gray-600">
                  Don't have an account?{" "}
                  <Link
                    to={ROUTES.LOGIN}
                    className="text-blue-600 hover:underline"
                  >
                    Sign In
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

export default RegisterPage;
