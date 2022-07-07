import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toasty";
import Image from "next/image";
import Link from "next/link";

const Cart = ({
  setGlobalcart,
  saveGlobalCart,
  Globalcart,
  product,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
  Total,
  user,
  dataBaseCart,
  cartitems,
  logout
}) => {
  const [promocode, setPromocode] = useState("");
  const [cartitem, setCartitem] = useState(0);
  let router = useRouter();
  let total_html = "";

  console.log(cartitems+" cartitems");
 console.log(Globalcart);


  useEffect(async () => {
    console.log("hey i am Cart.js useEffect");
    if (!user.value) {
      router.push("/");
    }
    const data = await fetch(`${process.env.NEXT_PUBLIC_MY_BACK_HOST}/product/getCart/`, {
      method: "GET",
      headers: {
      "Content-Type": "application/json",
      "Authorization":"Bearer "+localStorage.getItem("token")
    }
  }); //request end
  const product = await data.json();
  console.log(product);
    localStorage.setItem("cart",JSON.stringify(product))
    saveGlobalCart(product)
  setCartitem(Object.keys(Globalcart).length);
  if (Total == 0) {
    total_html = "";
  } else {
    total_html = Total;
    console.log(total_html);
  }
    
  }, [router.query,Math.random()]); 

  const removeFromCart = async (product_id, product_name) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_MY_BACK_HOST}/product/deleteFromCart/`+product_id, {
      method: "GET",
      headers: {
      "Content-Type": "application/json",
      "Authorization":"Bearer "+localStorage.getItem("token")
    }}); //request end
    console.log(product_id);
    console.log(Globalcart);
    let newCart = Globalcart;
    delete newCart[product_id];
    console.log("removeFromCart");
    setGlobalcart(newCart);
    saveGlobalCart(newCart);
    toast.success(product_name + " is removed from Cart!");
    
  };

  const checkPromoCode = () => {
    toast.error("Invalid Code");
  };
  return (
    <>
      <div class="bg-white m-5 rounded-3xl min-h-screen">
        <div class="container mx-auto">
          <div class="flex shadow-2xl rounded-3xl min-h-0">
            <div class="w-full bg-white px-10 py-10 rounded-3xl">
              <div class="flex justify-between border-b pb-8">
                <div className="">
                  <Link
                    href="/"
                    class="flex font-semibold text-indigo-600 text-sm"
                  >
                    <a className="flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path
                          stroke-linecap="round"
                          strokeLinejoin="round"
                          d="M10 19l-7-7m0 0l7-7m-7 7h18"
                        />
                      </svg>{" "}
                      Continue Shopping
                    </a>
                  </Link>
                </div>
                <div className="flex">
                  <h1 class="font-semibold text-2xl">Your Cart has</h1>
                  <h2 class="font-semibold text-2xl ml-2 text-indigo-600">
                    {cartitem} Items
                  </h2>
                </div>
              </div>
              {Total!=0 && (<div class="flex mt-10 mb-5">
                <h3 class="font-semibold text-gray-600 text-xs uppercase w-2/5">
                  Product Details
                </h3>
                <h3 class="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
                  Quantity
                </h3>
                <h3 class="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
                  Price
                </h3>
                <h3 class="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
                  Overall Total
                </h3>
              </div>)}
              {!Object.keys(Globalcart).length && (
                <div className="text-3xl flex justify-center py-16">
                  <Image
                        class="h-24 rounded-lg"
                        src="/emptyCart.png"
                        height={350}
                        width={500}
                        alt={"Empty Cart"}
                        />
                </div>
              )}
              {Object.keys(Globalcart).map((item) => {
                return (
                  <div
                    key={item}
                    class="flex items-center hover:bg-gray-100 -mx-8 px-8 py-2 rounded-lg"
                  >
                    <div class="flex w-2/5">
                      <div class="w-20">
                        <Image
                        class="h-24 rounded-lg"
                        src={`${process.env.NEXT_PUBLIC_MY_BACK_HOST}${Globalcart[item].product_image}`}
                        height={110}
                        width={100}
                        alt={Globalcart[item].product_name}
                        />
                      </div>

                      <div class="flex flex-col justify-between ml-4 flex-grow">
                        <span class="font-bold text-sm items-center">
                      <Link href={`/product/${item}/`}>
                        <a>
                          {Globalcart[item].product_name.toUpperCase()}
                      </a>
                      </Link>
                        </span>
                        <span class="text-red-500 text-xs">
                          {Globalcart[item].product_category}
                        </span>
                        <button
                          onClick={() => {
                            removeFromCart(item, Globalcart[item].product_name);
                          }}
                          class="flex w-5 font-semibold hover:text-red-500 text-gray-500 text-xs"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                    <div class="flex justify-center w-1/5">
                      <svg
                        onClick={() => {
                          decreaseQuantity(item);
                        }}
                        class="fill-current cursor-pointer text-gray-600 w-3"
                        viewBox="0 0 448 512"
                      >
                        <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                      </svg>

                      <input
                        class="mx-2 border text-center w-8"
                        type="text"
                        disabled={true}
                        value={Globalcart[item].product_qty}
                      />

                      <svg
                        onClick={() => {
                          increaseQuantity(item);
                        }}
                        class="fill-current cursor-pointer text-gray-600 w-3"
                        viewBox="0 0 448 512"
                      >
                        <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                      </svg>
                    </div>
                    <span class="text-center w-1/5 font-semibold text-sm">
                      {Globalcart[item].product_price}
                    </span>
                    <span class="text-center w-1/5 font-semibold text-sm">
                      {Math.ceil(Globalcart[item].product_subtotal)}
                    </span>
                  </div>
                );
              })}
              {Total!=0 && (<div className="md:flex justify-around  py-8 my-4 border-t border-gray-200">
                <div className="md:pl-3 md:w-3/4 w-full">
                  {
                    <button
                      disabled={Total === 0 ? true : false}
                      onClick={clearCart}
                      className="flex text-white bg-red-500 border-0 py-2 px-6 m-5 focus:outline-none hover:bg-red-600 rounded"
                    >
                      Clear Cart
                    </button>
                  }
                </div>
                <div className="md:pl-3 md:w-3/4 w-full">
                  <Link href={'/Checkout'}>
                    <button
                      disabled={Total === 0 ? true : false}
                      className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 m-5 focus:outline-none hover:bg-indigo-600 rounded"
                      >
                      $ {Total === 0 ? "0d" : Math.ceil(Total)} Checkout
                    </button>
                  </Link>
                </div>
              </div>)}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
