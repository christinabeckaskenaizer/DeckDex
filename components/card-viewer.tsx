import Image from "next/image";
import { useEffect, useState } from "react";
import MoveDisplay from "./move-display";
import PriceDisplay from "./price-display";

interface Props {
    card: any;
}

export default function CardViewer({ card }: Props) {
    const [displayedCard, setDisplayedCard] = useState<any>({});

    const types: any = {
        "Grass": "/tcg_icons/20px-Grass-attack.png",
        "Fire": "/tcg_icons/20px-Fire-attack.png",
        "Water": "/tcg_icons/20px-Water-attack.png",
        "Lightning": "/tcg_icons/20px-Lightning-attack.png",
        "Psychic": "/tcg_icons/20px-Psychic-attack.png",
        "Fighting": "/tcg_icons/20px-Fighting-attack.png",
        "Darkness": "/tcg_icons/20px-Darkness-attack.png",
        "Metal": "/tcg_icons/20px-Metal-attack.png",
        "Fairy": "/tcg_icons/20px-Fairy-attack.png",
        "Dragon": "/tcg_icons/20px-Dragon-attack.png",
        "Colorless": "/tcg_icons/20px-Colorless-attack.png",
    }

    useEffect(() => {
        setDisplayedCard(card);
    }, [card])

    return (
        <div className='flex flex-col items-center h-[59vh] w-72 flex-1 text-center bg-zinc-700 rounded-xl pt-2 px-4'>
            {displayedCard && <div className="flex items-center flex-col">
                <h1
                    className="text-2xl font-bold mb-2"
                >{card.cardName}</h1>
                {<Image width={128} height={512} src={card.cardImage} alt={card.cardName || "Displayed Card"} className="h-96 w-72 mb-4" />}

                {!displayedCard.cardEnergyTypes && <p>{card.cardType}</p>}
                <PriceDisplay card={displayedCard} />
                {/* <MoveDisplay card={displayedCard} /> */}
            </div>}
        </div>
    )
}