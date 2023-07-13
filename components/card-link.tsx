
interface Props {
    href: string;
    image: string;
    title: string;
    count: number;
    card: any;
    onHover: (card: any) => void;
}

export default function CardLink({ href, image, title, count, onHover, card }: Props) {
    return (
        <a href={card.cardImage} target="_blank">
            <span className="max-w-80 flex flex-row my-1 bg-zinc-700 rounded-xl px-2 py-1 items-center hover:text-yellow-500 hover:bg-zinc-600" onMouseEnter={() => onHover(card)}>
                <p className="text-zinc-300 text-sm">{card.cardCount}&nbsp;x&nbsp;</p>
                <p className="underline">{card.cardName}</p>
            </span>
        </a>
    )
}