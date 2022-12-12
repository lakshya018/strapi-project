import React from 'react'
import Link from 'next/link'

const Products = (props) => {
  return (
    <div className="container mx-auto px-4">
      <section className="text-gray-600 body-font">
        <div className="container px-5 md:py-24 mx-auto">
          <div className="flex flex-wrap w-full md:mb-20">
            <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
              <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">Buy Products from - My Shop</h1>
              <div className="h-1 w-20 bg-indigo-500 rounded"></div>
            </div>
            {/* <p className="lg:w-1/2 w-full leading-relaxed text-gray-500"></p> */}
          </div>
          <div className="flex flex-wrap -m-4">
            {
              props.products.data.map((item) => {
                return (
                  <div  key={item.id} className="xl:w-1/4 lg:w-1/3 md:w-1/2 w-full p-4 ">
                    <div className="bg-gray-100 p-6 rounded-lg">
                      <img className="h-40 rounded m-auto mb-6" src={item.attributes.image.data && item.attributes.image.data.attributes.name} alt="content" />
                      <div className="flex flex-col md:flex-row ">
                        <div className="my-4">
                          <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{item.attributes.category}</h3>
                          <h2 className="text-gray-900 title-font text-lg font-medium">{item.attributes.title}</h2>
                          <p className="mt-1">₹ {item.attributes.price}/-</p>
                        </div>
                        <div className="ml-auto mt-auto">
                          <Link href={`/products/${item.attributes.slug}`}><button className=" text-white bg-indigo-500 border-0 py-2 px-4 focus:outline-none hover:bg-indigo-600 rounded text-sm">View Details</button></Link>
                        
                        </div>
                        
                      </div>

                    </div>
                  </div>
                )
              })
            }


          </div>
        </div>
      </section>
    </div>
  )
}

export async function getServerSideProps(context) {
  let headers = { Authorization: "Bearer e6d5529198bbde8905e0126e5ee258618415b727d5f1e72995e208f48bc46debc1898a040cc8f0da618ee18ee03a5af9612da5b708eb26cf06358de72ef767b5c53d38299b04578c4d477910763bb6b296cc882e6eacc2985e04af27dd8b7cee0abc08c07308c8037bb57099b0d202668c6795c4ef534e58b4b3863884cfe6a0" }

  let response = await fetch('http://localhost:1337/api/products?populate=*', {
    headers: headers
  });
  let products = await response.json();
  console.log(products)
  return {
    props: { products: products },
  }
}
export default Products;
