import Link from "next/link";
import React, { useEffect, useState } from "react";
import Confetti from 'react-confetti'

const Final = () => {
  const [dimension, setDimension] = useState({})
  useEffect(() => {
    if(typeof window !== undefined){
      console.log(window.innerHeight,window.innerWidth)
    }
  }, [])
  
  
  return (
    <>
        <Confetti width={dimension.width-20} height={dimension.height+70} />
      <div class="bg-gray-200 min-h-screen ">
        <div class="bg-white min-h-screen mt-24 -mb-24 p-6 md:mx-auto">
          <svg
            viewBox="0 0 24 24"
            class="text-green-600 w-16 h-16 mx-auto my-6"
          >
            <path
              fill="currentColor"
              d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
            ></path>
          </svg>
          <div class="text-center">
            <h3 class="md:text-2xl text-base text-gray-900 font-semibold text-center">
              Payment Done!
            </h3>
            <p class="text-gray-600 text-xl my-2">
              Congratulations! Your Order has been successfully placed.
            </p>
            <p class="text-gray-600 my-2">
              Thank you for completing your secure online payment.
            </p>
            <p> Have a great day! </p>
            <div class="py-10 text-center">
            <Link href="/MyOrders"><a
                class="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3"
              >
                MY ORDER
              </a></Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

function getWindowSize() {
  const {innerWidth, innerHeight} = window;
  return {innerWidth, innerHeight};
}

export default Final;
