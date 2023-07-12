import Head from 'next/head';
import CardViewer from '../../../components/card-viewer';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function ViewDeckPage() {

    const [deck, setDeck] = useState<any>({});
    const [currentCard, setCurrentCard] = useState<any>({});

    const router = useRouter();

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
        console.log(deck);
    }

    useEffect(() => {
        if (router.isReady) {
            getDeck();
        }
    }, [router.query.slug]);

    return (
        <main
            className='flex flex-col items-center justify-center w-full flex-1 text-center'
        >
            <Head>
                <title>DeckDex | View Deck</title>
            </Head>
            {deck && <div className='h-[95vh] w-[95vw] m-6 bg-zinc-900 rounded-md p-4 flex flex-row'>
                <CardViewer
                    cardType='basic'
                    cardName='Picklechu'
                    cardImage='https://teamcovenant.com/wp-content/uploads/2019/06/pikachu.jpg'
                    cardPrice={10}
                    cardSubType='basic'
                    cardText='a plan was recently announced to gather many Pikachu and make an electric power plant'
                />
                <div className='w-[70vw] h-full flex flex-col'>
                    <h1 className='text-4xl font-bold mb-12'>{deck.name}</h1>
                    <div>
                        <span className='flex flex-row justify-evenly'>
                            <div className='flex flex-col h-[83vh] w-80 bg-zinc-800 pt-4'>
                                <h2 className='text-xl font-bold underline mb-4'>Pokemon</h2>
                            </div>
                            <div className='flex flex-col h-[83vh] w-80 bg-zinc-800 pt-4'>
                                <h2 className='text-xl font-bold underline mb-4'>Trainer Cards</h2>
                            </div>
                            <div className='flex flex-col h-[83vh] w-80 bg-zinc-800 pt-4'>
                                <h2 className='text-xl font-bold underline mb-4'>Energy</h2>
                            </div>
                        </span>
                    </div>
                </div>
            </div>}
        </main>
    );
}