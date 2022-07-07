import React from "react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const Explore = ({ category }) => {
  const [items, setitems] = useState(category);
  return (
    <>
      <section className="text-gray-600 body-font min-h-screen">
        <div className="container px-10 py-10 mx-auto">
          <div className="flex flex-wrap -m-4">
            {items.map((item, i) => {
              return (
                <Link key={i} href={"category/" + item.id} passHref>
                  <div className="xl:w-1/3 md:w-1/2 p-4">
                      <a href=''>
                        <div className="border border-gray-200 p-6 rounded-lg">
                            <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
                                <Image src={item.url || 'https://uxwing.com/wp-content/themes/uxwing/download/08-computers-mobile-hardware/mobile-phone.svg'} height={25} width={25} alt="ss" />
                            </div>
                        <h2 className="text-lg text-gray-900 font-medium title-font mb-2">{item.title}</h2>
                        <p className="leading-relaxed text-base">{item.description}</p>
                        </div>
                      </a>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export async function getServerSideProps(context) {
  let data = await fetch(`${process.env.NEXT_PUBLIC_MY_BACK_HOST}/product/category`);
  let category = await data.json();
  return {
    props: { category },
  };
}

export default Explore;
