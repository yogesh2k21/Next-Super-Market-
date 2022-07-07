import React, { useEffect } from "react";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router";
const Product = ({product,increaseQuantity,Globalcart,user,cartLength,setCartLength}) => {
// const [items, setitems] = useState(product);
const [Service, setService] = useState();
const [Pin, setPin] = useState('');
const [pinSpinner, setpinSpinner] = useState(false);
const [cartButtonState, setcartButtonState] = useState(false)
let router = useRouter();

useEffect(() => {
  if(Globalcart){
    console.log(Globalcart);

  }
  if (product.id in Globalcart) {
    console.log("useEffect of product page");
    setcartButtonState(true)
  }
}, [router.query]) //router.query is used to run this useEffect when url changes or page loads


const addToCart = async(product_id,product_name,product_price,product_qty,product_category,product_subtotal,product_image)=>{
  if(!user.value){
    toast.error('Please Login...')
    setTimeout(() => {
      router.push("/Login");
    }, 2500);
    return;
  }
  // console.log(product_id,product_name,product_price,product_qty,product_category,product_subtotal);
  setcartButtonState(true);
  increaseQuantity(product_id,product_name,product_price,product_qty,product_category,product_subtotal,product_image)
  // setCartLength(cartLength+1)
}

const onChangePin = (event) =>{
  setPin(event.target.value);
}

const CheckServiceAvailability = async () =>{
  setpinSpinner(true);
  console.log(Pin);
  let data = await fetch(`${process.env.NEXT_PUBLIC_MY_BACK_HOST}/checkPin/${Pin}/`);
  let res = await data.json();
  console.log(res.Available);
  setService(res.Available);
  setpinSpinner(false);
}

const rating=product.rating;
return (
<>
  <section className="text-gray-600 bg-gray-100 body-font overflow-hidden py-6">
    <div className="container px-5 py-24 mx-auto">
      <div className="lg:w-4/5 mx-auto flex flex-wrap">
        <Image alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
          src={`${process.env.NEXT_PUBLIC_MY_BACK_HOST}` + product.image} width={400} height={420} />
        <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
          <h2 className="text-sm title-font text-gray-500 tracking-widest">
            {product.category.toUpperCase()}
          </h2>
          <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
            {product.title}
          </h1>
          <div className="flex mb-4">
            <span className="flex items-center">
              <svg fill={rating>=1?'currentColor':'none'} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z">
                </path>
              </svg>
              <svg fill={rating>=2?'currentColor':'none'} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z">
                </path>
              </svg>
              <svg fill={rating>=3?'currentColor':'none'} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z">
                </path>
              </svg>
              <svg fill={rating>=4?'currentColor':'none'} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z">
                </path>
              </svg>
              <svg fill={rating==5?'currentColor':'none'} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z">
                </path>
              </svg>
              <span className="text-gray-600 ml-3">
                {product.rating} Reviews count
              </span>
            </span>
          </div>
          <p className="leading-relaxed">{product.description}</p>
          <div className="flex mt-2">
            <span className="title-font font-medium text-2xl text-gray-900">
              ${product.price}
            </span>
            {!cartButtonState && <button disabled={cartButtonState} onClick={()=>{addToCart(product.id,product.title,product.price,1,product.category,product.price,product.image)}}
              className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
              Add to Cart
            </button>}
            {cartButtonState && <button disabled={cartButtonState} className="flex ml-auto text-white bg-slate-400 border-0 py-2 px-6 focus:outline-none hover:bg-grey-600 rounded">
              Added
            </button>}
            <button
              className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
              <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5"
                viewBox="0 0 24 24">
                <path
                  d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z">
                </path>
              </svg>
            </button>
          </div>
          <div>
              <div class="mt-2 flex h-10">
                <input type='number' onChange={onChangePin} value={Pin} class="rounded-l-lg p-4 border-t mr-0 border-b border-l w-25 text-gray-800 focus:outline-none bg-white hover:border-indigo-500" placeholder="Enter Pincode here"/>
                <button onClick={CheckServiceAvailability} class="px-4 rounded-r-lg bg-indigo-500 focus:outline-none text-white p-1 uppercase border-indigo-600 border-t border-b border-r">Check</button>
                {pinSpinner?<svg class="mt-2 ml-3 h-5 w-5 animate-spin text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>:''}
            </div>
              {( Service!=null && !Service )?<span class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">Sorry! We don't deliver to this address yet</span>:''}
              {( Service!=null && Service )?<span class="flex items-center font-medium tracking-wide text-green-500 text-xs mt-1 ml-1">Yah! We can deliver here</span>:''}
          </div>
        </div>
      </div>
    </div>
  </section>
</>
);
};

export async function getServerSideProps(context) {
const { product_id } = context.query;
let data = await fetch(`${process.env.NEXT_PUBLIC_MY_BACK_HOST}/product/${product_id}`);
let product = await data.json();
return {
props: { product }, // will be passed to the page component as props
};
}

export default Product;