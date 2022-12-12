import React, { useState, useEffect } from 'react'
import { AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai';
import Script from 'next/script';



const Checkout = ({ cart }) => {
    const [subTotal, setSubTotal] = useState(0);
    const [form, setForm] = useState({ name: "", email: "", phone: "", pincode: "", city: "", state: "", address: "" });

    useEffect(() => {
        let myTotal = 0;
        for (let index = 0; index < cart.length; index++) {
            const element = cart[index];
            myTotal += Number(element[2]);

        }
        setSubTotal(myTotal);
    }, [])

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        // console.log({ ...form, [e.target.name]: e.target.value });
    }

    const payNow = async () => {

        let orderID = 'OID' +  Math.floor(1000000* Math.random()); 
        let url = `http://localhost:1337/api/orders/pretransaction`;

        const rawResponse = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({orderid: orderID, amount: subTotal, ...form, cart:cart })
        });
        const content = await rawResponse.json();

        // console.log(content);

        var config = {
            "root": "",
            "flow": "DEFAULT",
            "data": {
                "orderId": orderID, /* update order id */
                "token": content.body.txnToken, /* update token value */
                "tokenType": "TXN_TOKEN",
                "amount": subTotal,
            },
            "handler": {
                "notifyMerchant": function (eventName, data) {
                    console.log("notifyMerchant handler function called");
                    console.log("eventName => ", eventName);
                    console.log("data => ", data);
                }
            }
        };

        if (window.Paytm && window.Paytm.CheckoutJS) { 
            // initialze configuration using init method 
            window.Paytm.CheckoutJS.init(config).then(function onSuccess() {
              // after successfully updating configuration, invoke JS Checkout
              window.Paytm.CheckoutJS.invoke();
            }).catch(function onError(error) {
              console.log("error => ", error);
            }); 
        }
           
        
    }





    return (

        <div className='container mx-auto px-4'>

            {/* Paytm Js Script */}
<Script id={"paytm"} type="application/javascript" crossorigin="anonymous" src={`https://securegw.paytm.in/merchantpgpui/checkoutjs/merchants/${process.env.NEXT_PUBLIC_MID}.js`}> </Script>







            {/* Cart  */}
            <div className="container mx-auto px-4 sm:px-8">
                <div className="py-8">
                    <div>
                        <h2 className="text-2xl font-semibold leading-tight">Your Orders</h2>
                    </div>
                    <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                        <div>{cart.length ? `
                            Your Cart details are as follows:
                            
                            `: `Your Cart is Empty!`}</div>
                        <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">


                            <table className="min-w-full leading-normal">
                                <thead>
                                    <tr>
                                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                            Products
                                        </th>
                                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                            Amount
                                        </th>
                                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                            Quantity
                                        </th>
                                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">

                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        cart.map((item) => {
                                            return (
                                                <tr key={item.id}>
                                                    <td className="px-5 py-5 border-b border-gray-200 bg-white md:text-lg text-base">
                                                        <div className="flex items-center">
                                                            <div className="flex-shrink-0 w-12 h-12">
                                                                <img
                                                                    className="w-full h-full rounded-full"
                                                                    src={item[3]}
                                                                    alt=""
                                                                />
                                                            </div>
                                                            <div className="ml-3">
                                                                <h2 className="text-gray-900 ">
                                                                    {item[0]}
                                                                </h2>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-5 py-5 border-b border-gray-200 bg-white md:text-lg text-base">
                                                        <h2 className="text-gray-900 ">₹ {item[2]}/item </h2>

                                                    </td>
                                                    <td className="px-5  py-5 border-b border-gray-200 bg-white text-xl">
                                                        <div className="flex items-center">
                                                            <button> <AiFillMinusCircle className='text-indigo-600 mx-1' /></button>
                                                            <p className="mx-1">1</p>
                                                            <button><AiFillPlusCircle className='text-indigo-600 mx-1' /></button>

                                                        </div>

                                                    </td>
                                                    <td className="px-5  py-5 border-b border-gray-200 bg-white text-xl">
                                                        <button className="inline-flex text-white items-center bg-indigo-500 border-0 py-1 px-3 focus:outline-none mr-6 hover:bg-indigo-600 rounded text-base mt-4 md:mt-0">Remove Item</button>

                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }

                                </tbody>
                            </table>
                        </div>
                        <div ><h1 className="text-3xl font-bold text-center">Sub Total: ₹ {subTotal}/-</h1></div>
                    </div>
                </div>
            </div>

            {/* ADDRESS */}
            <section className="text-gray-600 body-font relative">
                <div className="container px-5 py-24 mx-auto min-h-screen">
                    <div className="flex flex-col text-center w-full mb-12">
                        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Address Details</h1>
                    </div>
                    <div className="lg:w-1/2 md:w-2/3 mx-auto">
                        <div className="flex flex-wrap -m-2">
                            <div className="p-2 w-1/2">
                                <div className="relative">
                                    <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
                                    <input type="text" onChange={handleChange} value={form.name} id="name" name="name" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                </div>
                            </div>
                            <div className="p-2 w-1/2">
                                <div className="relative">
                                    <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
                                    <input type="email" onChange={handleChange} value={form.email} id="email" name="email" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                </div>
                            </div>
                            <div className="p-2 w-1/2">
                                <div className="relative">
                                    <label htmlFor="phone" className="leading-7 text-sm text-gray-600">Phone</label>
                                    <input type="number" onChange={handleChange} value={form.phone} id="phone" name="phone" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                </div>
                            </div>
                            <div className="p-2 w-1/2">
                                <div className="relative">
                                    <label htmlFor="pincode" className="leading-7 text-sm text-gray-600">Pincode</label>
                                    <input type="number" onChange={handleChange} value={form.pincode} id="pincode" name="pincode" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                </div>
                            </div>
                            <div className="p-2 w-1/2">
                                <div className="relative">
                                    <label htmlFor="city" className="leading-7 text-sm text-gray-600">City</label>
                                    <input type="text" id="city" onChange={handleChange} value={form.city} name="city" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                </div>
                            </div>
                            <div className="p-2 w-1/2">
                                <div className="relative">
                                    <label htmlFor="state" className="leading-7 text-sm text-gray-600">State</label>
                                    <input type="text" onChange={handleChange} value={form.state} id="state" name="state" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                </div>
                            </div>
                            <div className="p-2 w-full">
                                <div className="relative">
                                    <label htmlFor="address" className="leading-7 text-sm text-gray-600">Address</label>
                                    <textarea id="address" onChange={handleChange} value={form.address} name="address" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-25 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
                                </div>
                            </div>
                            <div className="p-2 w-full">
                                <button onClick={payNow} className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Pay Now</button>
                            </div>

                        </div>
                    </div>
                </div>
            </section>

        </div >
    )
}

export default Checkout;