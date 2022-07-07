import React, { useState } from 'react'
import Link from 'next/link'
import { toast } from 'react-toastify'

const Forgot = () => {
  const [email, setEmail] = useState('')
  const handleChange=(e)=>{
    setEmail(e.target.value)
    console.log(email);
  }

  const handleSubmit=async(e)=>{
    if(email.length===0){
      toast.error('Enter Email...')
    }else{

      const response = await fetch(`${process.env.NEXT_PUBLIC_MY_BACK_HOST}/account/changePassword`, {
        method: "POST", // *POST is use bcoz here we are login the user
        headers: {
          "Content-Type": "application/json",
        },
        
        body: JSON.stringify({
        email: email,
      }),
      
    }); //request end
    
    const json = await response.json();
    console.log(json.success);
    // e.preventDefault();
    if(json.success){
      toast.success("Password is send to your Email!",{autoClose:7000})
    }else{
      toast.error(json.message)
    }
  }
  }
  return (
    <>
        <>
        <div className="min-h-full flex items-center justify-center py-36 px-4 mb-5 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <img
              className="mx-auto h-6 w-auto"
              src="vercel.svg"
              alt="Workflow"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Forgot Password</h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or{' '}
              <Link href="/Login"><a className="font-medium text-indigo-600 hover:text-indigo-500">
                 Login
              </a></Link>
            </p>
          </div>
          <div className="mt-8 space-y-6" action="#" method="POST">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  value={email}
                  onChange={handleChange}
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
            </div>

            <div>
              <button
                onClick={handleSubmit}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
    </>
  )
}

export default Forgot