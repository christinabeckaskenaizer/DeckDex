import Image from 'next/image';
import Head from 'next/head';
import { useSession } from "next-auth/react";
import SignInButton from '../components/SignInButton';
import SignOutButton from '../components/SignOutButton';
import { Tab } from '@headlessui/react';
import { useEffect, useState } from 'react';

export default function ProfilePage() {

    const [userDecks, setUserDecks] = useState([]);

    function classNames(...classes: string[]) {
        return classes.filter(Boolean).join(' ')
    }

    const { data: session, status } = useSession();

    async function getUserDecks() {
        let url = "/api/deck/get-user-decks";

        let res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userId: session?.user?.id,
            }),
        });
        let data = await res.json();
        console.log(data);
        setUserDecks(data);

    }

    useEffect(() => {
        getUserDecks();
    }, [])

    let [categories] = useState({
        "My Decks": [
            {
                id: 1,
                title: 'Does drinking coffee make you smarter?',
                date: '5h ago',
                commentCount: 5,
                shareCount: 2,
            },
            {
                id: 2,
                title: "So you've bought coffee... now what?",
                date: '2h ago',
                commentCount: 3,
                shareCount: 2,
            },
        ],
        Popular: [
            {
                id: 1,
                title: 'Is tech making coffee better or worse?',
                date: 'Jan 7',
                commentCount: 29,
                shareCount: 16,
            },
            {
                id: 2,
                title: 'The most innovative things happening in coffee',
                date: 'Mar 19',
                commentCount: 24,
                shareCount: 12,
            },
        ],
        Trending: [
            {
                id: 1,
                title: 'Ask Me Anything: 10 answers to your questions about coffee',
                date: '2d ago',
                commentCount: 9,
                shareCount: 5,
            },
            {
                id: 2,
                title: "The worst advice we've ever heard about coffee",
                date: '4d ago',
                commentCount: 1,
                shareCount: 2,
            },
        ],
    });

    return (
        <main className='min-h-screen min-w-screen flex flex-col items-center'>
            <Head>
                <title>DeckDex | Profile</title>
            </Head>
            <span className='absolute flex flex-row w-72 mt-4 justify-between'>
                <SignInButton />
                <SignOutButton />
            </span>
            {status === "authenticated" && (
                <div className='w-screen flex flex-col items-center py-4'>
                    <div className='w-[90vw] h-56 bg-zinc-900 p-6 rounded-md'>
                        <div className='flex flex-row'>
                            <Image
                                className='rounded-md mb-4 h-44 w-44'
                                src={session?.user?.image ? session.user.image : "/vercel.svg"}
                                alt="Profile Picture"
                                width={100}
                                height={24}
                            />
                            <span className='mx-4'>
                                <p className='text-2xl font-bold mb-4'>
                                    {session?.user?.userName && session.user.userName}
                                </p>
                                <span className='w-96 h-32 p-2 flex rounded-lg bg-zinc-700'>
                                    <p>{session?.user?.bio && session.user.bio || "no bio provided..."}</p>
                                </span>
                            </span>
                        </div>
                    </div>
                    <span className='w-[90vw] mt-4 rounded-md p-4 h-[70vh] bg-zinc-900 flex flex-col'>
                        <Tab.Group>
                            <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
                                {Object.keys(categories).map((category) => (
                                    <Tab
                                        key={category}
                                        className={({ selected }) =>
                                            classNames(
                                                'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-yellow-600',
                                                'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                                                selected
                                                    ? 'bg-zinc-300 shadow'
                                                    : 'text-amber-100 hover:bg-white/[0.12] hover:text-white'
                                            )
                                        }
                                    >
                                        {category}
                                    </Tab>
                                ))}
                            </Tab.List>
                            <Tab.Panels className="mt-2">
                                {Object.values(categories).map((posts, idx) => (
                                    <Tab.Panel
                                        key={idx}
                                        className={classNames(
                                            'rounded-xl bg-zinc-900 p-3',
                                            'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
                                        )}>
                                        {userDecks && userDecks.map((deck) => {
                                            return (
                                                <div className='w-96 h-32 p-2 flex rounded-lg bg-zinc-700'>
                                                    <p>{deck.id}</p>
                                                </div>
                                            )
                                        })}
                                    </Tab.Panel>
                                ))}

                            </Tab.Panels>
                        </Tab.Group>
                    </span>
                </div>
            )
            }
        </main>
    )
}