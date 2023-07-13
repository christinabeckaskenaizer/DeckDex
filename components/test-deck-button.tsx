import { useSession } from "next-auth/react";
import { useRouter } from 'next/router';

interface Props {
    deck: any;
}

export default function TestDeckButton({ deck }: Props) {

    const { data: session, status } = useSession();
    const router = useRouter();


    async function getAndAddCard() {
        // for test
        let url = '/api/card/get-card';
        let res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'cardId': 'xy1-45'
            }),
        });
        if (res.status === 200 && session?.user.id) {
            let card = await res.json();

            let cardObject = {
                'cardId': card.id,
                'cardName': card.name,
                'cardImage': card.images.small,
                'cardType': card.supertype,
                'cardEnergyTypes': card.types,
                'attacks': card.attacks,
                'cardCount': 4,
                'cardPriceInfo': card.tcgplayer
            }

            let deckUpdateUrl = '/api/deck/update';
            let deckUpdateRes = await fetch(deckUpdateUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'id': router.query.slug,
                    'userId': session.user.id,
                    'cards': [cardObject]
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
            onClick={() => getAndAddCard()}
        >
            TEST
        </button>
    )
}