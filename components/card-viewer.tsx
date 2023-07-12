import Image from "next/image";

interface Props {
    cardName: string;
    cardImage: string;
    cardText: string;
    cardType: string;
    cardSubType: string;
    cardPrice: number;
}

export default function CardViewer({ cardName, cardImage, cardText, cardType, cardPrice, cardSubType }: Props) {
    return (
        <div className='flex flex-col items-center h-full w-72 flex-1 text-center bg-zinc-700 rounded-xl pt-12 px-4'>
            <div className="flex items-center flex-col">
                <h1 
                className="text-2xl font-bold mb-6"
                >{cardName && cardName}</h1>
                {cardImage && <Image width={128} height={512} src={cardImage} alt={cardName || "Displayed Card"} className="h-96 w-72" />}
                {/* <p>{cardText}</p>
                <p>{cardType}</p>
                <p>{cardSubType}</p>
                <p>{cardPrice}</p> */}
            </div>
        </div>
    )
}