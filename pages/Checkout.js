import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Script from "next/script";

const Checkout = ({ Globalcart, Total }) => {
  let router = useRouter();
  useEffect(() => {
    console.log("hey i m test.js useeffect");
    if (Total === 0) {
      router.push("/Cart");
    }
  }, [router.query]);

  const [address, setAddress] = useState({
    address: "",
    postal_code: "",
    city: "",
    state: "",
    full_name: "",
    phone: "",
  });

  const onChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
    // console.log(address);
  };

  const handleSubmit = async (e) => {
    if (address.full_name === "") {
      toast.error("Enter Full name");
      return;
    }
    if (address.phone === "") {
      toast.error("Enter Phone");
      return;
    }
    if (address.address === "") {
      toast.error("Enter Address");
      return;
    }
    if (address.city === "") {
      toast.error("Enter City");
      return;
    }
    if (address.state === "") {
      toast.error("Enter State");
      return;
    }
    if (address.postal_code === "") {
      toast.error("Enter Pincode");
      return;
    }
    e.preventDefault();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_MY_BACK_HOST}/product/getAddressMakeOrder/`,
      {
        method: "POST", // *POST is use bcoz here we are login the user
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },

        body: JSON.stringify({
          address: address.address,
          postal_code: address.postal_code,
          city: address.city,
          state: address.state,
          full_name: address.full_name,
          phone: address.phone,
        }),
      }
    ); //request end
    const data = await response.json();
    console.log(data);

    var options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
      name: "Next super market",
      description: "Order no #" + data.order_no,
      image:
        "https://res.cloudinary.com/crunchbase-production/image/upload/dtokjerhk1dxyludtlwc",
      order_id: data.razorOrder_id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: async function (response) {
        // alert("Payment Successfull")
        console.log({
          order_no: data.order_no,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_order_id: response.razorpay_order_id,
          razorpay_signature: response.razorpay_signature,
        });
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_MY_BACK_HOST}/product/finalOrderPaymentRequest/`,
          {
            method: "POST", // *POST is use bcoz here we are login the user
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },

            body: JSON.stringify({
              order_no: data.order_no,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
            }),
          }
        ); //request end
        const orderRes = await res.json();
        console.log(orderRes);
        if (orderRes.success) {
          localStorage.setItem("cart", JSON.stringify({}));
          toast.success("Congratulations! Order placed.");
          setTimeout(() => {
            router.push("/Final");
          }, 2500);
        }
      },
      prefill: {
        name: address.full_name,
        email: data.email,
        contact: address.phone,
      },
      notes: {
        address: "",
      },
      theme: {
        color: "#6366f1",
      },
    };
    var rzp1 = new Razorpay(options);
    rzp1.on("payment.failed", function (response) {
      toast.error("Payment Failed! try again....",{autoClose: 5000});
    });
    rzp1.open();
    e.preventDefault();
  };

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />

      <section className="">
        <div className="relative mx-auto ">
          <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
            <div className="py-12 bg-gray-100 md:py-24">
              <div className="max-w-lg px-4 mx-auto lg:px-8">
                <div className="flex items-center">
                  <h2 className="text-3xl">Order Summary</h2>
                </div>

                {
                  <div className="mt-8">
                    <p className="text-2xl font-medium tracking-tight">${Total}</p>
                    <p className="mt-1 text-sm text-gray-500">
                      For the purchase of
                    </p>
                  </div>
                }

                <div className="mt-12">
                  <div className="flow-root py-3 px-4 h-max">
                    <ul className="-my-4 divide-y divide-gray-200">
                      {Object.keys(Globalcart).map((item) => {
                        return (
                          <li
                            key={item}
                            className="flex items-center justify-between py-4"
                          >
                            <div className="flex items-start">
                              <img
                                className="flex-shrink-0 object-cover w-16 h-16 rounded-lg"
                                src={`${process.env.NEXT_PUBLIC_MY_BACK_HOST}${Globalcart[item].product_image}`}
                                alt=""
                              />

                              <div className="ml-4">
                                <p className="text-sm">
                                  {Globalcart[item].product_name.toUpperCase()}
                                </p>

                                <dl className="mt-1 space-y-1 text-xs text-gray-500">
                                  <div>
                                    <dt className="inline">Category:</dt>
                                    <dd className="inline">
                                      {" "}
                                      {Globalcart[item].product_category}
                                    </dd>
                                  </div>

                                  <div>
                                    <dt className="inline">Quantity:</dt>
                                    <dd className="inline">
                                      {" "}
                                      {Globalcart[item].product_qty}
                                    </dd>
                                  </div>
                                </dl>
                              </div>
                            </div>

                            <div>
                              <p className="text-sm">
                                ${Math.ceil(Globalcart[item].product_price)}
                                <small className="text-gray-500">
                                  x{Globalcart[item].product_qty}
                                </small>
                                =
                                <span className="text-base text-indigo-500">
                                  {Math.ceil(Globalcart[item].product_subtotal)}
                                </span>
                              </p>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="py-12 bg-white md:py-24">
              <div className="max-w-lg px-4 mx-auto lg:px-8">
                <div className="grid grid-cols-6 gap-4">
                  <div className="col-span-3">
                    <label
                      className="block mb-1 text-sm text-gray-600"
                      htmlFor="full_name"
                    >
                      Full Name
                    </label>

                    <input
                      className="rounded-lg shadow-sm border-gray-200 w-full text-sm p-2.5"
                      type="text"
                      name="full_name"
                      value={address.full_name}
                      onChange={onChange}
                    />
                  </div>

                  <div className="col-span-3">
                    <label className="block mb-1 text-sm text-gray-600" htmlFor="phone">
                      Phone
                    </label>

                    <input
                      className="rounded-lg shadow-sm border-gray-200 w-full text-sm p-2.5"
                      type="tel"
                      name="phone"
                      value={address.phone}
                      onChange={onChange}
                    />
                  </div>

                  <div className="col-span-6">
                    <label
                      className="block mb-1 text-sm text-gray-600"
                      htmlFor="address"
                    >
                      Address
                    </label>

                    <input
                      className="rounded-lg shadow-sm border-gray-200 w-full text-sm p-2.5"
                      type="text"
                      name="address"
                      value={address.address}
                      onChange={onChange}
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="block mb-1 text-sm text-gray-600" htmlFor="city">
                      City
                    </label>

                    <input
                      className="rounded-lg shadow-sm border-gray-200 w-full text-sm p-2.5"
                      type="text"
                      name="city"
                      value={address.city}
                      onChange={onChange}
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="block mb-1 text-sm text-gray-600" htmlFor="email">
                      State
                    </label>

                    <input
                      className="rounded-lg shadow-sm border-gray-200 w-full text-sm p-2.5"
                      type="text"
                      name="state"
                      value={address.state}
                      onChange={onChange}
                    />
                  </div>

                  <div className="col-span-2">
                    <label
                      className="block mb-1 text-sm text-gray-600"
                      htmlFor="postal_code"
                    >
                      Pincode
                    </label>

                    <input
                      className="rounded-lg shadow-sm border-gray-200 w-full text-sm p-2.5"
                      type="number"
                      name="postal_code"
                      value={address.postal_code}
                      onChange={onChange}
                    />
                  </div>

                  <div className="col-span-6">
                    <button
                      onClick={handleSubmit}
                      className="rounded-lg mt-6 bg-indigo-500 text-sm p-2.5 text-white w-full block hover:bg-indigo-600"
                    >
                      Pay Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Checkout;
