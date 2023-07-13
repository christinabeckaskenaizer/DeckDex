import Image from "next/image";
import { useEffect, useState } from "react";
import MoveDisplay from "./move-display";
import PriceDisplay from "./price-display";

interface Props {
    card: any;
}

export default function CardViewer({ card }: Props) {
    const [displayedCard, setDisplayedCard] = useState<any>({});

    useEffect(() => {
        setDisplayedCard(card);
    }, [card])

    return (
        <div className='flex flex-col items-center h-full w-72 flex-1 text-center bg-zinc-000 rounded-xl pt-2 px-4'>
            {displayedCard && displayedCard.cardImage && <div className="fixed flex flex-col items-center h-[90vh] w-auto flex-1 text-center bg-zinc-700 rounded-xl pt-2 px-auto">
                <h1
                    className="text-2xl font-bold mb-2"
                >{card.cardName}</h1>
                {<Image width={128} height={512} src={displayedCard.cardImage || "https://cdn.cardsrealm.com/images/cartas/swshp-swsh-black-star-promos/en/med/professors-research-swsh178-swsh178.png?8681?&width=275"} alt={card.cardName || "Displayed Card"} className="h-96 w-72 mb-4 mx-5" />}

                {!displayedCard.cardEnergyTypes && <p>{card.cardType}</p>}
                <PriceDisplay card={displayedCard} />
                {/* <MoveDisplay card={displayedCard} /> */}
            </div>}
            {!displayedCard.cardImage && <div className="flex items-center flex-col">
                {<Image width={128} height={512} src={"https://cdn.cardsrealm.com/images/cartas/swshp-swsh-black-star-promos/en/med/professors-research-swsh178-swsh178.png?8681?&width=275"} alt={"Displayed Card"} className="h-96 w-72 mb-4" />}
            </div>}
        </div>
    )
}