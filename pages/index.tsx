import Image from 'next/image'
import { NextPage } from 'next'
import { signIn, signOut, useSession } from "next-auth/react"
import { createServerContext } from 'react';
import Dropdown from './dropdown';

  function Home() {
    const { data: session } = useSession();
    console.log(session);
    return (
      <main className="flex flex-col p-12">

        {(session?.user) ?
          <div className="bg-zinc-800 font-mono text-sm py-4 px-8 flex rounded-full">
            <div className='grid grid-cols-3 items-center justify-between w-full mx-auto'>
              <p className='flex items-center m-auto'>Build a Deck</p>
              <p className='flex items-center m-auto'>My Decks</p>
              <p className='flex items-center m-auto'>Card Gallery</p>
            </div>
            <div className="font-mono text-sm flex justify-center m-auto items-center rounded-lg">
              <Dropdown />
              <button onClick={() => signOut()}>Log Out</button>
            </div>
          </div> :
          <div className="bg-zinc-800 font-mono text-sm p-4 flex rounded-full">
            <div className='grid grid-cols-3 items-center justify-between w-full mx-auto'>
              <p>Build a Deck</p>
              <p>My Decks</p>
              <p>Card Gallery</p>
            </div>
            <div className="bg-blue-400 font-mono text-sm flex justify-center m-auto items-center ">
            </div>
            <div className="bg-green-700 font-mono text-sm lg:flex justify-end mx-auto rounded-lg px-3">
              <button onClick={() => signIn("google")}>Log In</button>
            </div>
          </div>}

        <form>
          <label htmlFor="default-search" className="text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
          <div className="mt-10 relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
            </div>
            <input type="search" id="default-search" className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Decks..." required />
            <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
          </div>
        </form>
      </main>
    );
  }

export default Home;
