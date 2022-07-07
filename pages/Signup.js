import React, { useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const Signup = () => {
  const router = useRouter();
  const [samepassword, setSamepassword] = useState(true);
  const [credentials, setCredentials] = useState({
    first: "",
    last: "",
    email: "",
    password1: "",
    password2: "",
  });

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    if (credentials.password1 == credentials.password2) {
      setSamepassword(false);
    }
  };

  const handleSubmit = async (e) => {
    if (credentials.password1 != credentials.password2) {
      toast.error("Please enter same password!");
      return;
    }
    if (credentials.password1.length < 8) {
      toast.error("Password must be 8 characters!");
      return;
    }

    e.preventDefault();
    const response = await fetch(`${process.env.NEXT_PUBLIC_MY_BACK_HOST}/signup/`, {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        first_name: credentials.first,
        last_name: credentials.last,
        email: credentials.email,
        password: credentials.password1,
      }),
    }); //request end

    const json = await response.json();
    console.log(json.message);
    if(json.success==false){
      toast.error(json.message);
    }else{
      toast.success(json.message);
      setTimeout(() => {
        router.push('/Login')
      }, 2000);
    }
  };

  return (
    <>
      <div className="min-h-full flex items-center justify-center py-10 mb-2 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <img
              className="mx-auto h-6 w-auto"
              src="vercel.svg"
              alt="Workflow"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Signup for a account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or{" "}
              <Link href="/Login">
                <a className="font-medium text-indigo-600 hover:text-indigo-500">
                  Login
                </a>
              </Link>
            </p>
          </div>

          <div class="w-full max-w-lg">
            <div class="flex flex-wrap -mx-3 mb-6">
              <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <input
                  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-indigo-500 focus:bg-white"
                  id="grid-first-name"
                  type="text"
                  placeholder="First Name"
                  name="first"
                  value={credentials.first}
                  onChange={onChange}
                  required
                />
              </div>
              <div class="w-full md:w-1/2 px-3">
                <input
                  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500"
                  id="grid-last-name"
                  type="text"
                  placeholder="Last Name"
                  name="last"
                  value={credentials.last}
                  onChange={onChange}
                  required
                />
              </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-6">
              <div class="w-full px-3">
                <input
                  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500"
                  id="grid-password"
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={credentials.email}
                  onChange={onChange}
                  required
                />
              </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-2">
              <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <input
                  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500"
                  type="password"
                  placeholder="Password"
                  name="password1"
                  value={credentials.password1}
                  onChange={onChange}
                  required
                />
              </div>

              <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <input
                  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500"
                  type="password"
                  placeholder="Confirm Password"
                  name="password2"
                  value={credentials.password2}
                  onChange={onChange}
                  required
                />
              </div>
            </div>
            <div className="mt-8">
              <button
                onClick={handleSubmit}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;