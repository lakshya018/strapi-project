import Head from 'next/head'
import Image from 'next/image'
import { NavBar } from '../components/NavBar'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className="container mx-auto px-4">
      <section className="text-gray-600 body-font">
        <div className="container mx-auto flex px-5 md:py-14 md:flex-row flex-col items-center m-auto">
          <div className="max-w-xl w-full mb-10 md:mb-0 items-center">
            <img className=" mx-auto rounded px-5 " alt="hero" src="shopping.png" />
          </div>
          <div className="lg:flex-grow md:w-1/2 lg:pl-20 md:pl-16 pl-5 flex flex-col md:items-start md:text-left items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">Before they sold out
              <br className="hidden lg:inline-block" />readymade gluten
            </h1>
            <p className="mb-8 leading-relaxed">Copper mug try-hard pitchfork pour-over freegan heirloom neutra air plant cold-pressed tacos poke beard tote bag. Heirloom echo park mlkshk tote bag selvage hot chicken authentic tumeric truffaut hexagon try-hard chambray.</p>
            <div className="flex justify-center">
              <button className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Button</button>
              <button className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">Button</button>
            </div>
          </div>
        </div>
      </section>
    </div>

  )
}
