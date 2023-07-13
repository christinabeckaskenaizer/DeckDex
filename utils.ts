import { createClient } from '@supabase/supabase-js'

// Create Supabase client
const supabase = createClient('http://localhost:3000', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "")

// Upload file using standard upload
export async function uploadFile(file: File) {
    const { data, error } = await supabase.storage.from('profile-pictures').upload('file_path', file)
    if (error) {
        // Handle error
    } else {
        // Handle success
        return data
    }
}

export const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

export async function updateDeckPriceInfo(deck: any, userId: string) {
    for (let cardId of Object.keys(deck.cards)) {
        let url = '/api/card/get-card';
        let result = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ cardId: cardId })
        });
        let cardInfo: any = await result.json();
        let cardPrice = cardInfo.tcgplayer;
        deck.cards[cardId] = cardPrice;
    }
    let updateUrl = '/api/deck/update';
    let updateResult = await fetch(updateUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ deck: deck, pricingUpdatedAt: new Date(), userId: userId, id: deck.id })
    });
    let updatedDeck = await updateResult.json();
    console.log("deck updated")
    return updatedDeck;
}

/*
deckPriceInfo = {
    "totalPrice" : $number,
    "xy1-1": {tcgplayerObject},
}

or

cards= {
    "totalPrice" : $number,
    "xy1-1": {cardObject},
}
*/