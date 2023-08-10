import { useEffect, useState } from "react";
import { formatter } from "../utils";

interface Props {
    card: any;
}


export default function PriceDisplay({ card }: Props) {

    // const [price, setPrice] = useState<any>(0);
    const [fetchedCard, setFetchedCard] = useState<any>({});

    useEffect(() => {
        setFetchedCard(card);
    }, [card])

    return (
        <div className='flex flex-col items-center h-[92vh] w-auto text-center rounded-xl pt-2 px-4 mb-6'>
            {fetchedCard && fetchedCard.cardPriceInfo && <div className="relative px-auto flex flex-col items-left outline outline-white outline-1 mt-0 m-2 p-2 bg-zinc-900 text-left">
                <div className="flex flex-col">
                    {Object.keys(fetchedCard.cardPriceInfo.prices).map((price: any, idx: number) => (
                        <div key={fetchedCard.cardId + price} className="flex flex-col items-start">
                            <p className="font-bold mt-">{price === "reverseHolofoil" ? "Reverse Holofoil" : price[0].toUpperCase() + price.slice(1)}: {formatter.format(fetchedCard.cardPriceInfo.prices[price].market)}</p>
                        </div>))}
                </div>
            </div>}
        </div>

    )
}