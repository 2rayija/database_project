import React from "react";
import { LockClosedIcon } from "@radix-ui/react-icons";

const Login = () => {
  return (
    <div className="common-page bg-background h-screen flex items-center justify-center">
      <div className="bg-primary shadow-lg rounded-lg p-8 w-96">
        <div className="flex items-center justify-center mb-6">
          <LockClosedIcon className="w-8 h-8 text-accent" />
          <h1 className="text-2xl font-bold text-secondary ml-2">Login</h1>
        </div>

        <form>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-accent"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              placeholder="Enter your username"
              className="mt-1 block w-full px-4 py-2 border border-secondary rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky focus:border-sky"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-accent"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="mt-1 block w-full px-4 py-2 border border-secondary rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky focus:border-sky"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-secondary text-white py-2 px-4 rounded-md hover:bg-accent focus:outline-none focus:ring-2 focus:ring-sky focus:ring-offset-2"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-center text-accent mt-4">
          Don't have an account?{" "}
          <a href="#" className="text-sky hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;