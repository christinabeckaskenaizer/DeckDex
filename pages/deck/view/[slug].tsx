import Head from 'next/head';
import CardViewer from '../../../components/card-viewer';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import CardLink from '../../../components/card-link';
import { useSession } from "next-auth/react";
import DeckDataFrame from '../../../components/deck-data-frame';
import TestDeckButton from '../../../components/test-deck-button';
import { updateDeckPriceInfo } from '../../../utils';


export default function ViewDeckPage() {

    const [deck, setDeck] = useState<any>(null);
    const [currentCard, setCurrentCard] = useState<{} | undefined>({});
    const [loaded, setLoaded] = useState<boolean>(false);
    const [pageStatus, setPageStatus] = useState<string>("");

    const router = useRouter();
    const { data: session, status } = useSession();


    function isMoreThanFiveMinutesAgo(date: Date): boolean {
        const now = new Date();
        const diffInMillis = now.getTime() - date.getTime();
        const minutes = diffInMillis / (1000 * 60); // convert milliseconds to minutes

        return minutes > 5;
    }


    async function getDeck() {
        setPageStatus("Retrieving Decklist")
        setLoaded(false)
        const res = await fetch(`http://localhost:3000/api/deck/get-one/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: router.query.slug
            })
        });
        const deckInfo = await res.json();
        console.log("Got Deck", deckInfo);
        if ((!deckInfo.pricingUpdatedAt || isMoreThanFiveMinutesAgo(new Date(deckInfo.pricingUpdatedAt))) && session?.user?.id && deckInfo.cards) {
            setPageStatus("Updating Deck Price Info")
            console.log("updating deck price info");
            let updatedDeck = await updateDeckPriceInfo(deckInfo, session?.user?.id);
            if (updatedDeck) {
                console.log("updated deck", updatedDeck)
                setDeck(updatedDeck.updateDeck);
            }
        } else {
            setDeck(deckInfo);
        }
        setLoaded(true);
        setPageStatus("Done");
    }

    function setDisplayedCard(card: any) {
        setCurrentCard(card);
    }

    useEffect(() => {
        if (router.isReady) {
            if (!deck) {
                getDeck();
            }
            if (deck && deck.cards) {
                for (let key of Object.keys(deck.cards)) {
                    let card = deck.cards[key];
                    if (card.cardType === 'Pokémon') {
                        setCurrentCard(card);
                        break;
                    }
                }
            }
        }
    }, [router.query.slug, deck]);



    return (
        <main
            className='flex flex-col items-center justify-center w-full flex-1 text-center'
        >
            <Head>
                <title>DeckDex | View Deck</title>
            </Head>

            <TestDeckButton deck={deck} />
            {loaded && <div className='h-auto w-[95vw] mt-6 bg-zinc-900 rounded-md p-4 flex flex-row mb-4'>
                <CardViewer
                    card={currentCard}
                />
                <div className='w-[75vw] h-full flex flex-col '>
                    <h1 className='text-4xl font-bold mb-2'>{deck.name}</h1>
                    <h2 className='text-sm mb-4'>{deck.description}</h2>
                    <div>
                        <span className='flex flex-row justify-evenly bg-zinc-800 rounded-xl mx-4'>
                            <div className='flex flex-col h-auto w-80  py-4 px-5 rounded-xl'>
                                <h2 className='text-xl font-bold underline mb-4'>Pokemon</h2>
                                {deck && deck.cards && Object.keys(deck.cards).map((key: any, idx: number) => {
                                    return (
                                        deck.cards[key].cardType === 'Pokémon' && <CardLink
                                            key={key + idx}
                                            card={deck.cards[key]}
                                            onHover={setDisplayedCard} />
                                    )
                                })}
                            </div>
                            <div className='flex flex-col h-[50vh] w-80 pt-4 px-5 rounded-xl'>
                                <h2 className='text-xl font-bold underline mb-4'>Trainer Cards</h2>
                                {deck && deck.cards && Object.keys(deck.cards).map((key: any) => {
                                    return (
                                        deck.cards[key].cardType === 'Trainer' && <CardLink
                                            key={key}
                                            card={deck.cards[key]}
                                            onHover={setDisplayedCard} />
                                    )
                                })}
                            </div>
                            <div className='flex flex-col h-[50vh] w-80 pt-4 px-5 rounded-xl'>
                                <h2 className='text-xl font-bold underline mb-4'>Energy</h2>
                                {deck && deck.cards && Object.keys(deck.cards).map((key: any) => {
                                    return (
                                        deck.cards[key].cardType === 'Energy' && <CardLink
                                            key={key}
                                            card={deck.cards[key]}
                                            onHover={setDisplayedCard} />
                                    )
                                })}
                            </div>
                            {!deck.cards && <h1 className='text-2xl font-bold absolute mt-32'>No Cards in Deck</h1>}
                        </span>
                        {deck && <DeckDataFrame deck={deck} />}
                    </div>
                </div>
            </div>}
            {pageStatus !== "Done" && <div
                className='flex items-center justify-center w-screen h-screen text-center bg-red-00'
            > <h1 className='text-2xl font-bold'>{pageStatus}</h1></div>}
        </main>
    );
}