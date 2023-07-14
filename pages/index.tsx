import Image from 'next/image'
import { NextPage } from 'next'
import { signIn, signOut, useSession } from "next-auth/react"
import { createServerContext } from 'react';

const Home: NextPage = () => {
  const { data: session } = useSession();
  console.log(session)
  return (
    <main className="flex flex-col p-12">

        { (session?.user) ?
        <div className="bg-zinc-800 items-end float-right font-mono text-sm lg:flex justify-end">
          <div className='bg-red-800 items-center justify-center'>
          <p>Build a Deck</p>
          <p>My Decks</p>
          <p>Card Gallery</p>
          </div>
          <button onClick={() => signOut()}>Log Out</button>
          <Image className='rounded-full w-auto h-auto' src={session?.user.image  || "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Pok%C3%A9_Ball_icon.svg/1200px-Pok%C3%A9_Ball_icon.svg.png"} width={64} height={64} alt="profile picture"/>
        </div> :
        <div className=" items-end float-right font-mono text-sm lg:flex justify-end mx-auto">
          <button onClick={() => signIn("google")}>Log In</button>
          </div>
        }

      <form>
    <label htmlFor="default-search" className="text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
    <div className="mt-10 relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
        <input type="search" id="default-search" className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Decks..." required/>
        <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
    </div>
</form>
    </main>
  )
}

export default Home;
