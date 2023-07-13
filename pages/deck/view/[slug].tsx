import Head from 'next/head';
import CardViewer from '../../../components/card-viewer';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import CardLink from '../../../components/card-link';
import { useSession } from "next-auth/react";
import DeckDataFrame from '../../../components/deck-data-frame';
import TestDeckButton from '../../../components/test-deck-button';


export default function ViewDeckPage() {

    const [deck, setDeck] = useState<any>({});
    const [currentCard, setCurrentCard] = useState<{} | undefined>({});

    const router = useRouter();
    const { data: session, status } = useSession();




    async function getDeck() {
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
        setDeck(deckInfo);
    }

    function setDisplayedCard(card: any) {
        setCurrentCard(card);
    }

    useEffect(() => {
        if (router.isReady) {
            if (!deck.cards) {
                getDeck();
            }
            if (deck.cards) {
                for (let card of deck.cards) {
                    if (card.cardType === 'Pokémon') {
                        setCurrentCard(card);
                        console.log(card);
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
            {deck && <div className='h-auto w-[95vw] mt-6 bg-zinc-900 rounded-md p-4 flex flex-row mb-4'>
                <CardViewer
                    card={currentCard}
                />
                <div className='w-[70vw] h-full flex flex-col '>
                    <h1 className='text-4xl font-bold mb-2'>{deck.name}</h1>
                    <h2 className='text-sm mb-4'>{deck.description}</h2>
                    <div>
                        <span className='flex flex-row justify-evenly bg-zinc-800 rounded-xl mx-4'>
                            <div className='flex flex-col h-[50vh] w-80  pt-4 px-5 rounded-xl'>
                                <h2 className='text-xl font-bold underline mb-4'>Pokemon</h2>
                                {deck && deck.cards && deck.cards.map((card: any) => {
                                    return (
                                        card.cardType === 'Pokémon' && <CardLink
                                            card={card}
                                            count={card.cardCount}
                                            key={card.cardId}
                                            href={card.cardImage}
                                            image={card.cardImage}
                                            title={card.cardName}
                                            onHover={setDisplayedCard} />
                                    )
                                })}
                            </div>
                            <div className='flex flex-col h-[50vh] w-80 pt-4 px-5 rounded-xl'>
                                <h2 className='text-xl font-bold underline mb-4'>Trainer Cards</h2>
                                {deck && deck.cards && deck.cards.map((card: any) => {
                                    return (
                                        card.cardType === 'Trainer' && <CardLink
                                            card={card}
                                            count={card.cardCount}
                                            key={card.cardId}
                                            href={card.cardImage}
                                            image={card.cardImage}
                                            title={card.cardName}
                                            onHover={setDisplayedCard} />
                                    )
                                })}
                            </div>
                            <div className='flex flex-col h-[50vh] w-80 pt-4 px-5 rounded-xl'>
                                <h2 className='text-xl font-bold underline mb-4'>Energy</h2>
                                {deck && deck.cards && deck.cards.map((card: any) => {
                                    return (
                                        card.cardType === 'Energy' && <CardLink
                                            card={card}
                                            count={card.cardCount}
                                            key={card.cardId}
                                            href={card.cardImage}
                                            image={card.cardImage}
                                            title={card.cardName}
                                            onHover={setDisplayedCard} />
                                    )
                                })}
                            </div>
                        </span>
                        {deck && <DeckDataFrame deck={deck} />}
                    </div>
                </div>
            </div>}
        </main>
    );
}