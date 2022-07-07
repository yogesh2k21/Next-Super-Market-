import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Link from "next/link";

const Order = ({ user, context }) => {
  const [order, setOrder] = useState({});
  const [total, setTotal] = useState(0);
  const router = useRouter();
  const order_id = router.query.order_id;
  // console.log(order_id);
  useEffect(async () => {
    if (!user.value) {
      router.push("/");
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_MY_BACK_HOST}/product/getOrder/${order_id}/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    ); //request end
    const res = await response.json();
    console.log(res);
    setOrder(JSON.parse(JSON.stringify(res.data)));
    setTotal(res.amount);
    console.log(order);
  }, [router.query]);
  const getMail = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_MY_BACK_HOST}/product/getOrderInvoiceMail/${order_id}/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    ); //request end
    const res = await response.json();
    console.log(res);
    toast.success("Invoice has been sent to Email");
  };
  return (
    <>
      <section class="text-gray-600 body-font min-h-screen">
        <div class="container px-5 py-24 mx-auto">
          <div class="flex flex-col text-center w-full mb-10">
            <div className="flex justify-around">
              <h1 class="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">
                Order ID:- {order_id}
              </h1>
              <button class="flex text-white bg-indigo-500 border-0 px-5 py-3 focus:outline-none hover:bg-indigo-600 rounded">
                Track order
              </button>
            </div>
            <p class="lg:w-2/3 mx-auto leading-relaxed text-base">
              Your Order has been successfully placed.
            </p>
          </div>
          <div class="lg:w-2/3 w-full mx-auto overflow-auto">
            <table class="table-auto w-full text-left whitespace-no-wrap">
              <thead>
                <tr>
                  <th class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">
                    Item name
                  </th>
                  <th class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                    Price
                  </th>
                  <th class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                    Quantity
                  </th>
                  <th class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                    Subtotal
                  </th>
                  <th class="w-10 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tr rounded-br"></th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(order).map((i) => {
                  return (
                    <tr key={i}>
                      <td class="px-4 py-3 text-green-500">
                        <Link href={`/product/${order[i].product_id}`}>
                          <a>{order[i].product_title.toUpperCase()}</a>
                        </Link>
                      </td>
                      <td class="px-4 py-3">{order[i].product_price}</td>
                      <td class="px-4 py-3">{order[i].product_qty}</td>
                      <td class="px-4 py-3 text-lg text-gray-900">
                        + ${order[i].product_total}
                      </td>
                      <td class="w-10 text-center"> </td>
                    </tr>
                  );
                })}
                <tr>
                  <td class="px-4 py-3"></td>
                  <td class="px-4 py-3"></td>
                  <td class="px-4 py-3">Grand Total</td>
                  <td class="px-4 py-3 text-2xl text-indigo-600">= ${total}</td>
                  <td class="w-10 text-center"></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="flex justify-between pl-4 mt-4 lg:w-2/3 w-full mx-auto">
            <button
              onClick={getMail}
              class="text-indigo-500 flex items-center md:mb-2 lg:mb-0"
            >
              Get Invoice
              <svg xmlns="http://www.w3.org/2000/svg" class="ml-1 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
</svg>
            </button>

            {/* <p class=" text-3xl inline-flex items-center md:mb-2 lg:mb-0">Grand total:- {total}</p> */}
            {/* <button class="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">Track order</button> */}
          </div>
        </div>
      </section>
    </>
  );
};

export default Order;
