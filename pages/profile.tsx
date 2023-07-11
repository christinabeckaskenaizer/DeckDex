import Image from "next/image";
import Head from "next/head";
import { useSession } from "next-auth/react";
import SignInButton from "../components/SignInButton";
import SignOutButton from "../components/SignOutButton";
import { Tab } from "@headlessui/react";
import { useEffect, useState } from "react";
// import { PencilSquareIcon } from "@heroicons/react/20/solid/";

export default function ProfilePage() {
  const [userDecks, setUserDecks] = useState<any[]>([]);

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }

  const { data: session, status } = useSession();

  async function getUserDecks() {
    if (session?.user.id) {
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
  }

  useEffect(() => {
    getUserDecks();
  }, [session]);

  let [decklists] = useState({
    "My Decks": userDecks,
    "Liked Decks": [],
  });

  return (
    <main className="min-h-screen min-w-screen flex flex-col items-center">
      <Head>
        <title>DeckDex | Profile</title>
      </Head>
      <span className="absolute flex flex-row w-72 mt-4 justify-between">
        <SignInButton />
        <SignOutButton />
      </span>
      {status === "authenticated" && (
        <div className="w-screen flex flex-col items-center py-4">
          <div className="w-[90vw] h-56 bg-zinc-900 p-6 rounded-md">
            <div className="flex flex-row justify-between">
              <div className="flex flex-row">
                <Image
                  className="rounded-md mb-4 h-44 w-44"
                  src={
                    session?.user?.image ? session.user.image : "/vercel.svg"
                  }
                  alt="Profile Picture"
                  width={100}
                  height={24}
                />
                <span className="mx-4">
                  <span className="flex flex-row items-center">
                    <p className="text-2xl font-bold mb-4">
                      {session?.user?.userName && session.user.userName}
                    </p>
                    <button className="text-xs flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 text-zinc-400"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                        />
                      </svg>
                    </button>
                  </span>
                  <span className="w-96 h-32 p-2 flex rounded-lg bg-zinc-700">
                    <p>
                      {(session?.user?.bio && session.user.bio) ||
                        "no bio provided..."}
                    </p>
                  </span>
                </span>
              </div>
              <span className="flex flex-col text-right">
                <p className="font-bold text-2xl">
                  {userDecks && userDecks.length}&nbsp;Created Decks
                </p>
                <p className="font-bold text-2xl">0&nbsp; Liked Decks</p>
              </span>
            </div>
          </div>
          <span className="w-[90vw] mt-4 rounded-md p-4 h-[70vh] bg-zinc-900 flex flex-col">
            <Tab.Group>
              <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
                <Tab
                  key={"My Decks"}
                  className={({ selected }) =>
                    classNames(
                      "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-yellow-600",
                      "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none",
                      selected
                        ? "bg-zinc-300 shadow"
                        : "text-amber-100 hover:bg-white/[0.12] hover:text-white"
                    )
                  }
                >
                  {"My Decks"}
                </Tab>
                <Tab
                  key={"Liked Decks"}
                  className={({ selected }) =>
                    classNames(
                      "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-yellow-600",
                      "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none",
                      selected
                        ? "bg-zinc-300 shadow"
                        : "text-amber-100 hover:bg-white/[0.12] hover:text-white"
                    )
                  }
                >
                  {"Liked Decks"}
                </Tab>
              </Tab.List>
              <Tab.Panels className="mt-2">
                <Tab.Panel
                  className={classNames(
                    "rounded-xl bg-zinc-900 p-3",
                    "focus:outline-none"
                  )}
                >
                  <span className="grid grid-cols-3">
                    {userDecks &&
                      userDecks.map((deck) => {
                        return (
                          <div className="relative outline-1 outline outline-zinc-300 mx-2 max-w-96 h-32 p-2 flex flex-col rounded-lg bg-zinc-700">
                            <h1 className="font-bold">{deck.name}</h1>
                            <p className="text-sm">{deck.description}</p>
                            <p className="text-xs absolute bottom-2 right-4 text-zinc-400">
                              {deck.cardIds.length} Cards
                            </p>
                          </div>
                        );
                      })}
                  </span>
                </Tab.Panel>
                <Tab.Panel className="flex items-center justify-center">
                  <h1>Coming Soon!</h1>
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </span>
        </div>
      )}
    </main>
  );
}
