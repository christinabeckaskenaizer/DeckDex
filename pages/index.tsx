import Image from 'next/image'
import { NextPage } from 'next'
import { signIn, signOut, useSession } from "next-auth/react"
import { createServerContext } from 'react';
import Dropdown from './dropdown';
import Header from '../components/header';
import Link from 'next/link';

function Home() {
  const { data: session } = useSession();

  const userDecks = [
    {
      id: 1,
      name: "Leon's Charizard Deck",
      description: "Leon's Charizard energy ramp deck",
      image: "https://product-images.tcgplayer.com/fit-in/437x437/284251.jpg",
      type: "Fire",
      format: "Standard",
      author: "SweatyMcTryhard",
      cards: {
        1: {
          id: 1,
          name: 'Test Card',
          type: 'pokemon',
          cost: 1,
          hp: 100,
          attacks: [
            {
              name: 'Test Attack',
              damage: 50,
              text: 'This is a test attack'
            }
          ]
        },
      },
      cardCount: 60
    },
    {
      id: 2,
      name: "Solrock/Lunatone Combo",
      description: "Solrock/Lunatone Combo with lazers",
      image: "https://product-images.tcgplayer.com/fit-in/437x437/478028.jpg",
      type: "Psychic",
      format: "Standard",
      author: "Specularity",
      cards: {
        1: {
          id: 1,
          name: 'Test Card',
          type: 'pokemon',
          cost: 1,
          hp: 100,
          attacks: [
            {
              name: 'Test Attack',
              damage: 50,
              text: 'This is a test attack'
            }
          ]
        }
      },
      cardCount: 60,
    },
    {
      id: 3,
      name: "Ice Rider Palkia",
      description: "Rikuto Ohashi's 2022 World Championship Deck",
      image: "https://product-images.tcgplayer.com/fit-in/437x437/272240.jpg",
      type: "Water/Psychic",
      format: "Standard",
      author: "Rikuto Ohashi",
      cards: {
        1: {
          id: 1,
          name: 'Test Card',
          type: 'pokemon',
          cost: 1,
          hp: 100,
          attacks: [
            {
              name: 'Test Attack',
              damage: 50,
              text: 'This is a test attack'
            }
          ]
        }
      },
      cardCount: 60
    },


  ]


  const recentDecks = [
    {
      id: 1,
      name: "WIP Slowking Deck",
      description: "Slowking Deck with some other stuff",
      image: "https://product-images.tcgplayer.com/fit-in/437x437/241770.jpg",
      type: "Psychic/Water",
      format: "Standard",
      author: "SlowpokeFan94",
      cards: {
        1: {
          id: 1,
          name: 'Test Card',
          type: 'pokemon',
          cost: 1,
          hp: 100,
          attacks: [
            {
              name: 'Test Attack',
              damage: 50,
              text: 'This is a test attack'
            }
          ]
        }
      },
      cardCount: 34
    },
    {
      id: 2,
      name: "Dragapult VMAX Deck",
      description: "Super fast hard hitting VMAX deck",
      image: "https://product-images.tcgplayer.com/fit-in/437x437/213180.jpg",
      type: "Psychic",
      format: "Standard",
      author: "GhostLover_Jason",
      cards: {
        1: {
          id: 1,
          name: 'Test Card',
          type: 'pokemon',
          cost: 1,
          hp: 100,
          attacks: [
            {
              name: 'Test Attack',
              damage: 50,
              text: 'This is a test attack'
            }
          ]
        }
      },
      cardCount: 53
    },
    {
      id: 3,
      name: "Base Set WIP",
      description: "Retro Pokemon Deck using only Base Set cards",
      image: "https://product-images.tcgplayer.com/fit-in/437x437/42355.jpg",
      type: "Grass",
      format: "Legacy",
      author: "VanHalen88",
      1: {
        id: 1,
        name: 'Test Card',
        type: 'pokemon',
        cost: 1,
        hp: 100,
        attacks: [
          {
            name: 'Test Attack',
            damage: 50,
            text: 'This is a test attack'
          }
        ],
      },
      cardCount: 16
    },
    {
      id: 3,
      name: "Electric Mouse Deck",
      description: "deck featuring the generational pikachu clones",
      image: "https://product-images.tcgplayer.com/fit-in/437x437/216699.jpg",
      type: "Lightning",
      format: "Expanded",
      author: "PachirisuGal12",
      1: {
        id: 1,
        name: 'Test Card',
        type: 'pokemon',
        cost: 1,
        hp: 100,
        attacks: [
          {
            name: 'Test Attack',
            damage: 50,
            text: 'This is a test attack'
          }
        ],
      },
      cardCount: 16
    },


  ]

  return (
    <main className="flex flex-col bg-zinc-200 h-screen">
      <Header />

      {/* {(session?.user) ?
        <div className="bg-zinc-200 font-mono text-sm py-4 px-8 flex rounded-full">
          <div className='grid grid-cols-3 items-center justify-between w-full mx-auto'>
            <p className='flex items-center m-auto'>Build a Deck</p>
            <p className='flex items-center m-auto'>My Decks</p>
            <p className='flex items-center m-auto'>Card Gallery</p>
          </div>
          <div className="font-mono text-sm flex justify-center m-auto items-center rounded-lg">
            <Dropdown />
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
        </div>
        } */}

      <form className='flex flex-col w-screen justify-center items-center mt-24'>
        <h1 className='text-5xl font-medium text-black'>Search for a Deck, Card, or Creator!</h1>
        <label htmlFor="default-search" className="text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
        <div className="mt-10 relative items-center justify-center flex w-[40vw]">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
          </div>
          <input type="search" id="default-search" className="block shadow-lg shadow-black w-[40vw] p-4 pl-10 text-sm text-gray-900 border focus:outline-none border-gray-300 rounded-md bg-gray-50 focus:none focus:none dark:bg-gray-300 dark:border-gray-600 dark:placeholder-gray-500 dark:black" placeholder="Search..." required />
          <button type="submit" className="text-white absolute h-full translate-y-2 right-0 bottom-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-r-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
        </div>
      </form>
      <div className='my-10 block p-6 bg-white border border-gray-200 rounded-lg shadow-inner w-screen'>
        <h1 className='font-semibold -translate-y-9 bg-blue-300 border-1 border-black border w-40 rounded px-2'>POPULAR DECKS</h1>
        <div className='flex flex-row'>
          {userDecks.map((deck: any, idx: number) => {
            return (
              <Link
                key={deck.id + idx}
                href={`/deck/view/${deck.id}`}
                className="flex flex-col w-80 h-36 mx-4"
              >
                <div
                  className="object-fill overflow-hidden relative outline-1 outline outline-zinc-300 bg-gradient-to-b from-zinc-700 to-zinc-600 mx-2 max-w-96 h-36 flex flex-col rounded-lg bg-zinc-50 w-80">
                  <Image className='-translate-y-16 absolute opacity-30 z-10 w-80 h-auto object-fill ' src={deck.image} width={400} height={900} alt="image of the first card in the displayed deck." />
                  <span className='z-10 p-2'>
                    <h1 className="z-10 font-bold text-white">{deck.name}</h1>
                    <p className="text-sm text-zinc-100">{deck.description}</p>
                    <span className='flex flex-row'>
                      <p className='text-xs mt-2 text-zinc-300'>By</p>&nbsp;
                      <p className='text-xs mt-2 text-zinc-300 underline'>{deck.author}</p>
                    </span>
                  </span>
                  <p className="text-xs font-medium absolute bottom-2 right-4 text-zinc-50 z-10">
                    {/* deck.cards && Object.entries(deck.cards) ? Object.entries(deck.cards).length : 0} */}
                    {deck.cardCount} Cards · {deck.type} · {deck.format}
                  </p>
                </div>
              </Link>
            );
          }
          )}
        </div>

      </div>
      <div className='my-10 block p-6 bg-white border border-gray-200 rounded-lg shadow-inner w-screen'>
        <h1 className='font-semibold -translate-y-9 bg-blue-300 border-1 border-black border w-36 rounded px-2'>RECENT DECKS</h1>
        <div className='flex flex-row'>
          {recentDecks.map((deck: any, idx: number) => {
            return (
              <Link
                key={deck.id + idx}
                href={`/deck/view/${deck.id}`}
                className="flex flex-col w-80 h-36 mx-4"
              >
                <div
                  className="object-fill overflow-hidden relative outline-1 outline outline-zinc-300 bg-gradient-to-b from-zinc-700 to-zinc-600 mx-2 max-w-96 h-36 flex flex-col rounded-lg bg-zinc-50 w-80">
                  <Image className='-translate-y-16 absolute opacity-30 z-10 w-80 h-auto object-fill ' src={deck.image} width={400} height={900} alt="image of the first card in the displayed deck." />
                  <span className='z-10 p-2'>
                    <h1 className="z-10 font-bold text-white">{deck.name}</h1>
                    <p className="text-sm text-zinc-100">{deck.description}</p>
                    <span className='flex flex-row'>
                      <p className='text-xs mt-2 text-zinc-300'>By</p>&nbsp;
                      <p className='text-xs mt-2 text-zinc-300 underline'>{deck.author}</p>
                    </span>
                  </span>
                  <p className="text-xs font-medium absolute bottom-2 right-4 text-zinc-50 z-10">
                    {/* deck.cards && Object.entries(deck.cards) ? Object.entries(deck.cards).length : 0} */}
                    {deck.cardCount} Cards · {deck.type} · {deck.format}
                  </p>
                </div>
              </Link>
            );
          }
          )}
        </div>

      </div>
    </main>
  );
}

export default Home;
