import "./styles/globals.css";
import Navbar from "../pages/Navbar";
import Footer from "../pages/Footer";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toasyyBontainer, toasyy } from "react-toasyyify";
import LoadingBar from 'react-top-loading-bar'

function MyApp({ Component, pageProps }) {
  let router = useRouter();
  const [user, setUser] = useState({ value: null });
  const [key, setKey] = useState(0);
  const [Globalcart, setGlobalcart] = useState({});
  const [Total, setTotal] = useState(0);
  const [orders, setOrders] = useState({})
  const [progress, setProgress] = useState(0)
  const [cartLength, setCartLength] = useState(0)

  useEffect(() => {
    console.log("hey i am _app.js useEffect");
    router.events.on('routeChangeStart', ()=>{
      setProgress(10)
    })
    try {
      if (localStorage.getItem("cart")) {
        setGlobalcart(JSON.parse(localStorage.getItem("cart")));
      }
    } catch (error) {
      console.log(error);
      localStorage.clear();
    }

    const token = localStorage.getItem("token");
    
    if (token) {
      console.log("changing user value");
      setUser({ value: token });
      setKey(Math.random());
    let subt = 0;
    let keys=Object.keys(Globalcart)
    for (let i = 0; i < keys.length; i++) {
      subt += Globalcart[keys[i]].product_subtotal;
    }
    setTotal(subt)
    try {
      setCartLength(Object.keys(JSON.parse((localStorage.getItem("cart")))).length)
  } catch (error) {
      console.log('Error in getting cart length');            
  }
    }
    router.events.on('routeChangeComplete', ()=>{
      setProgress(100)
    })
  }, [router.query]); 

  const saveGlobalCart = (myCart) => {
    console.log("save cart running");
    localStorage.setItem("cart", JSON.stringify(myCart));
    let subt = 0;
    let keys=Object.keys(myCart)
    for (let i = 0; i < keys.length; i++) {
      subt += myCart[keys[i]].product_subtotal;
    }
    setTotal(subt)
  };

  const increaseQuantity = async (product_id,product_name,product_price,product_qty,product_category,product_subtotal,product_image) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_MY_BACK_HOST}/product/addToCart/`+product_id, {
      method: "GET", 
      headers: {
      "Content-Type": "application/json",
      "Authorization":"Bearer "+localStorage.getItem("token")
    }}); //request end
    console.log(product_id,product_name,product_price,product_qty,product_category,product_subtotal,product_image);
    console.log("incresing");
    let newCart = Globalcart;
    if (product_id in newCart) {
      newCart[product_id].product_qty = Globalcart[product_id].product_qty + 1;
      newCart[product_id].product_subtotal = Globalcart[product_id].product_subtotal + Globalcart[product_id].product_price;
      toasyy.success("Quantity +1");
      // router.push('/Cart')
    } else {
      newCart[product_id] = { product_name, product_price, product_qty: 1 ,product_category,product_subtotal,product_image}; //new item adding
      setCartLength(cartLength+1)
      toasyy.success(product_name.slice(0, 11) + "..." +" in Cart Now!");
    }
    
    setGlobalcart(newCart);
    saveGlobalCart(newCart);
  };

  const decreaseQuantity = async (product_id,product_name,product_price,product_qty,product_category,product_subtotal) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_MY_BACK_HOST}/product/removeFromCart/`+product_id, {
      method: "GET",
      headers: {
      "Content-Type": "application/json",
      "Authorization":"Bearer "+localStorage.getItem("token")
    }}); //request end
    console.log(product_id,product_name,product_price,product_qty,product_category,product_subtotal);
    console.log("decreasing");
    let newCart = Globalcart;
    if (product_id in newCart) {
      newCart[product_id].product_qty =  Globalcart[product_id].product_qty - 1;
      newCart[product_id].product_subtotal =  Globalcart[product_id].product_subtotal - newCart[product_id].product_price;
      if (newCart[product_id].product_qty <= 0) {
        delete newCart[product_id];
        setCartLength(cartLength-1);
        toasyy.success("Removed from Cart");
      }else{
        toasyy.success("Quantity -1");
      }
    }else{
      router.push('/Cart')
    }
    
    setGlobalcart(newCart);
    saveGlobalCart(newCart);
    // router.push('/Cart')
  };

  const clearCart = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_MY_BACK_HOST}/product/ClearCart/`, {
      method: "GET", 
      headers: {
      "Content-Type": "application/json",
      "Authorization":"Bearer "+localStorage.getItem("token")
    }}); //request end
    setGlobalcart({});
    saveGlobalCart({});
    setCartLength(0)
    toasyy.success("Cart is Empty now!");
  };

  const logout = () => {
    console.log("removing token from localStorage....");
    localStorage.clear();
    toasyy.success("Successfully logout!");
    setKey(Math.random());
    setUser({ value: null }); 
    setTimeout(() => {
      router.push("/");
    }, 1500);
  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
        rel="stylesheet"
      ></link>
      <toasyyBontainer
        position="top-center"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
      />
      <LoadingBar
        color='#6366F1'
        progress={progress}
        waitingTime={500}
        onLoaderFinished={() => setProgress(0)}
      />
      <Navbar cartLength={cartLength} logout={logout} user={user} key={key} />
      <Component
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        clearCart={clearCart}
        saveGlobalCart={saveGlobalCart}
        setGlobalcart={setGlobalcart}
        Globalcart={Globalcart}
        Total={Total}
        orders={orders}
        cartLength={cartLength}
        setCartLength={setCartLength}
        setOrders={setOrders}
        user={user}
        logout={logout}
        {...pageProps}
      />
      <Footer />
    </>
  );
}

export default MyApp;
