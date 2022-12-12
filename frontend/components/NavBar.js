import React, { useContext, useEffect } from 'react'
import Link from 'next/link'
import AuthContext from '../contexts/AuthContext'
import { unsetToken } from '../lib/auth';
import { Router } from 'next/router';

export const NavBar = ({ cart }) => {
    const { user } = useContext(AuthContext);

    const openDropdown = () => {
        let b = document.getElementById("dropdown-menu");
        if (b.style.display === "block") {
            b.style.display = "none";
        }
        else {
            b.style.display = "block";
        }
    }

    const handleLogOut = () => {
        unsetToken();
        Router.push("/");
    }

    return (
        <div>
            <header className="text-gray-600 body-font">
                <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                    <Link href="/"><a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                        <img className='w-8' src='shopping-bag.png' alt='logo' />
                        <span className="ml-3 text-xl">My Shop</span></a></Link>
                    <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
                        <Link href="/"><a className="mr-6 hover:text-gray-900">Home</a></Link>
                        <Link href="/about"><a className="mr-6 hover:text-gray-900">About</a></Link>
                        <Link href="/products"><a className="mr-6 hover:text-gray-900">Products</a></Link>
                        <Link href="/contact"><a className="mr-6 hover:text-gray-900">Contact Us</a></Link>
                        <Link href="/checkout"><a className="mr-6 flex hover:text-gray-900"><img className='w-5' src='cart.svg' alt="cart" />{cart.length}</a></Link>
                    </nav>





                    {user ? (
                        <div class="dropdown block relative mx-2 ">
                            <button class="bg-gray-300 text-gray-700 font-semibold py-1 px-2 rounded inline-flex items-center" onClick={openDropdown} onBlur={openDropdown}>
                                <span class="mr-1">Account</span>
                                <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /> </svg>
                            </button>
                            <ul id="dropdown-menu" class="dropdown-menu absolute hidden text-gray-700 pt-1">
                                <Link href="/account"><a class="rounded-t bg-gray-200 hover:bg-gray-400  text-center w-32 py-2 px-4 block" href="#">My Account</a></Link>
                                <button class="bg-gray-200 rounded-b hover:bg-gray-400 py-2 px-4 block w-32 " onClick={handleLogOut}>Log Out</button>
                            </ul>
                        </div>
                    ) : (
                        <Link Link href="/login" ><a className="inline-flex text-white items-center bg-indigo-500 border-0 py-1 px-3 focus:outline-none mr-6 hover:bg-indigo-600 rounded text-base mt-4 md:mt-0">Login</a></Link>
                    )

                    }

                </div>
            </header >
        </div >
    )
}

