import Head from 'next/head';
import CardViewer from '../../../components/card-viewer';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import CardLink from '../../../components/card-link';
import { useSession } from "next-auth/react";


export default function ViewDeckPage() {

    const [deck, setDeck] = useState<any>({});
    const [currentCard, setCurrentCard] = useState<string | "">("");
    const [currentName, setCurrentName] = useState<string | "">("");

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
        const deck = await res.json();
        setDeck(deck);
    }

    function setDisplayedCard(link: any, title: any) {
        setCurrentCard(link);
        setCurrentName(title);
    }

    useEffect(() => {
        if (router.isReady) {
            getDeck();
        }
    }, [router.query.slug]);

    async function getAndAddCard() {
        // for test

        let url = '/api/card/get-card';
        let res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'cardId': 'xy1-139'
            }),
        });
        console.log("HOOOOWEEEE")
        if (res.status === 200 && session?.user.id) {
            let card = await res.json();
            // console.log(card);

            let cardObject = {
                'cardId': card.id,
                'cardName': card.name,
                'cardImage': card.images.small,
                'cardType': card.supertype,
                'cardCount': 12,
            }
            console.log(cardObject);

            let deckUpdateUrl = '/api/deck/update';
            let deckUpdateRes = await fetch(deckUpdateUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'id': router.query.slug,
                    'userId': session.user.id,
                    'cards': [...deck.cards, cardObject]
                })
            });
            if (deckUpdateRes.status === 200) {
                let deckUpdate = await deckUpdateRes.json();
                console.log(deckUpdate);
            }
        }
    }

    return (
        <main
            className='flex flex-col items-center justify-center w-full flex-1 text-center'
        >
            <Head>
                <title>DeckDex | View Deck</title>
            </Head>
            <button
                onClick={() => getAndAddCard()}
            >
                TEST
            </button>
            {deck && <div className='h-[95vh] w-[95vw] m-6 bg-zinc-900 rounded-md p-4 flex flex-row'>
                <CardViewer
                    cardType='basic'
                    cardName={currentName}
                    cardImage={currentCard}
                    cardPrice={10}
                    cardSubType='basic'
                    cardText='a plan was recently announced to gather many Pikachu and make an electric power plant'
                />
                <div className='w-[70vw] h-full flex flex-col'>
                    <h1 className='text-4xl font-bold mb-12'>{deck.name}</h1>
                    <div>
                        <span className='flex flex-row justify-evenly'>
                            <div className='flex flex-col h-[83vh] w-80 bg-zinc-800 pt-4 px-5'>
                                <h2 className='text-xl font-bold underline mb-4'>Pokemon</h2>
                                {deck && deck.cards && deck.cards.map((card: any) => {
                                    return (
                                        card.cardType === 'Pokémon' && <CardLink
                                            count={card.cardCount}
                                            key={card.cardId}
                                            href={card.cardImage}
                                            image={card.cardImage}
                                            title={card.cardName}
                                            onHover={setDisplayedCard} />
                                    )
                                })}
                            </div>
                            <div className='flex flex-col h-[83vh] w-80 bg-zinc-800 pt-4 px-5'>
                                <h2 className='text-xl font-bold underline mb-4'>Trainer Cards</h2>
                                {deck && deck.cards && deck.cards.map((card: any) => {
                                    return (
                                        card.cardType === 'Trainer' && <CardLink
                                            count={card.cardCount}
                                            key={card.cardId}
                                            href={card.cardImage}
                                            image={card.cardImage}
                                            title={card.cardName}
                                            onHover={setDisplayedCard} />
                                    )
                                })}
                            </div>
                            <div className='flex flex-col h-[83vh] w-80 bg-zinc-800 pt-4 px-5'>
                                <h2 className='text-xl font-bold underline mb-4'>Energy</h2>
                                {deck && deck.cards && deck.cards.map((card: any) => {
                                    return (
                                        card.cardType === 'Energy' && <CardLink
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
                    </div>
                </div>
            </div>}
        </main>
    );
}