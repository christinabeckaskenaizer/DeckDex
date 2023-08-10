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
        <div className='flex flex-col items-center h-full max-w-96 flex-1 text-center bg-zinc-000 rounded-xl pt-2 px-4'>
            {displayedCard && displayedCard.cardImage && <div className="fixed mt-16 flex flex-col items-center h-[90vh] max-w-80 flex-1 text-center bg-zinc-00 rounded-xl pt-2 ">
                <h1
                    className="text-2xl font-bold mb-0 mx-2 w-72 flex-row flex justify-center bg-red-00 break-words"
                >{card.cardName}</h1>
                <span
                    className="flex flex-row h-auto items-center mb-2"
                >
                    <Image
                        src={card.cardSetLogo || ""}
                        alt="Set Logo"
                        width={24}
                        height={24}
                        className="w-auto h-4 mx-2"
                    />
                    <h2
                        className="text-xs text-zinc-300 mb-2"
                    >
                        {card.cardNumber}/{card.cardSetTotal}
                    </h2>
                </span>
                {<Image width={128} height={512} src={displayedCard.cardImage || "https://cdn.cardsrealm.com/images/cartas/swshp-swsh-black-star-promos/en/med/professors-research-swsh178-swsh178.png?8681?&width=275"} alt={card.cardName || "Displayed Card"} className="h-96 w-auto max-h-96 max-w-72 mb-4 mx-2" />}

                {<p>{card.cardType}</p>}
                <PriceDisplay card={displayedCard} />
                {/* <MoveDisplay card={displayedCard} /> */}
            </div>}
            {!displayedCard.cardImage && <div className="flex items-center flex-col">
                {<Image width={128} height={512} src={"https://cdn.cardsrealm.com/images/cartas/swshp-swsh-black-star-promos/en/med/professors-research-swsh178-swsh178.png?8681?&width=275"} alt={"Displayed Card"} className="h-72 w-auto max-h-96 max-w-72 mb-4 mx-2" />}
            </div>}
        </div>
    )
}