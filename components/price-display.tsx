import { useEffect, useState } from "react";

interface Props {
    card: any;
}


export default function PriceDisplay({ card }: Props) {

    const [price, setPrice] = useState<any>(0);

    useEffect(() => {
        getPrice();
    }, [card])

    async function getPrice() {
        if(!card.tcgplayer) return;
        let url = card.tcgplayer.url;
        let res = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        if (res.status === 200) {
            let data = await res.json();
            setPrice(data.tcgplayer.price.lowPrice);
            console.log(data)
        }
    }

    return (
        <div className='flex flex-col items-center h-[92vh] w-auto flex-1 text-center rounded-xl pt-2 px-4 '>
            <div className="relative w-96 flex flex-col items-left outline outline-white outline-1 mt-2 m-2 p-2 bg-zinc-900 text-left">
                <div className="flex flex-row">
                    {/* <p className="font-bold mt-2">{card.tcgplayer.prices.holofoil ? card.tcgplayer.prices.holofoil.market + " Market" : ""}</p> */}
                </div>
                {/* <p className="text-sm text-zinc-400 my-1">{card.tcgplayer.prices.holofoil ? card.tcgplayer.prices.holofoil.directLow + " Direct Low" : ""}</p> */}
            </div>
        </div>

    )
}