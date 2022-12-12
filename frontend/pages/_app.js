import { NavBar } from '../components/NavBar'
import '../styles/globals.css'
import { useEffect, useState } from 'react'
import Footer from '../components/Footer';
import Head from 'next/head';
import { AuthProvider } from '../contexts/AuthContext';

function MyApp({ Component, pageProps }) {

  // For Paytm Checkout

  <Head>
    <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0" />
  </Head>


  useEffect(() => {
    console.log("Hello app.js useEffect");
  }, [])

  const [cart, setCart] = useState([]);
  const [reloadKey, setReloadKey] = useState(1);

  const addToCart = (item, qty, price, img) => {
    let newCart = cart;
    for (let index = 0; index < qty; index++) {
      newCart.push([item, qty, price, img]);
    }
    console.log(newCart);
    setCart(newCart);
    setReloadKey(Math.random());

  }
  const removeFromCart = (item, qty) => {
    let newCart = cart;
    let index = newCart.indexOf(item);
    newCart.splice(index, 1);
    setCart(newCart);
  }
  const clearCart = (item) => {
    setCart([]);
  }

  return (
    <AuthProvider>
      <NavBar key={reloadKey} cart={cart} />
      <hr />
      <Component cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} {...pageProps} />
      <Footer />
    </AuthProvider>)
}

export default MyApp
