import React, { useContext, useState } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import AuthContext from '../contexts/AuthContext'
import { setToken } from '../lib/auth'

const Login = () => {
    const [form, setForm] = useState({ email: "", password: "" })

    const host = "http://localhost:1337"

    //Handle Submit
    const handleSubmit = () => {
        try {
            const data = await fetch(`${host}/api/auth/local`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ identifier: email, password: password })
            });
            console.log(data.json());
            const json = await data.json();

            setToken(json);

        }catch (err) {
            console.log(err);
        }
    }


    //Handle On Change 
    const handleOnChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        console.log({ ...form, [e.target.name]: e.target.value })
    }
    return (
        <div>
            <Head>
                <title>Login MyShop</title>
                <meta name="viewport" content="Login here to make your purchase" />
            </Head>
            <section class="text-gray-600 body-font">
                <div class="container px-5 py-24 mx-auto flex flex-wrap items-center">
                    <div class="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
                        <h1 class="title-font font-medium text-3xl text-gray-900">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in felis in urna condimentum suscipit non non metus. In ut.</h1>
                        <p class="leading-relaxed mt-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nec nisi odio. Donec hendrerit fringilla pellentesque. In sit amet tristique.</p>
                    </div>
                    <div class="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
                        <h2 class="text-gray-900 text-lg font-medium title-font mb-5">Login</h2>

                        <div class="relative mb-4">
                            <label for="email" class="leading-7 text-sm text-gray-600">Email</label>
                            <input type="email" id="email" name="email" class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                onChange={handleOnChange} />
                        </div>
                        <div class="relative mb-4">
                            <label for="password" class="leading-7 text-sm text-gray-600">Password</label>
                            <input type="password" id="password" name="password" class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                onChange={handleOnChange} />
                        </div>
                        <button class="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg" onClick={handleSubmit} >Login</button>
                        <p class="text-m text-gray-500 mt-3">Didn't have an account? <Link href="/signup"><a className='mr-6 text-indigo-500 hover:text-indigo-600'>SignUp</a></Link></p>
                    </div>
                </div>
            </section>
        </div>

    )
}

export default Login;