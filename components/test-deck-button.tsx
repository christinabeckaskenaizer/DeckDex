import { useSession } from "next-auth/react";
import { useRouter } from 'next/router';

interface Props {
    deck: any;
}

export default function TestDeckButton({ deck }: Props) {

    const { data: session, status } = useSession();
    const router = useRouter();

    async function addManyCards(){
        for(let i = 80; i < 140; i++){
            console.log('trying xy1-' + i.toString());
            await getAndAddCard(i.toString());
        }
        console.log("done");
    }

    async function getAndAddCard(id: string) {
        // for test
        let url = '/api/card/get-card';
        let res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'cardId': `xy1-${id}`
            }),
        });
        if (res.status === 200 && session?.user.id) {
            let card = await res.json();

            let cardObject = {
                'cardId': card.id,
                'cardNumber': card.number,
                'cardName': card.name,
                'cardImage': card.images.small,
                'cardType': card.supertype,
                'cardEnergyTypes': card.types,
                'attacks': card.attacks,
                'cardCount': 4,
                'cardPriceInfo': card.tcgplayer
            }

            let cardId = card.id;
            deck.cards ? deck['cards'][cardId] = cardObject : deck['cards'] = { [cardId]: cardObject };

            let deckUpdateUrl = '/api/deck/update';
            let deckUpdateRes = await fetch(deckUpdateUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'id': router.query.slug,
                    'userId': session.user.id,
                    'cards': deck.cards
                })
            });
            if (deckUpdateRes.status === 200) {
                let deckUpdate = await deckUpdateRes.json();
            }
        }
    }
    return (
        <button
            className='absolute'
            onClick={() => addManyCards()}
        >
            TEST
        </button>
    )
}