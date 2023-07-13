import { formatter } from "../utils";

interface Props {
    card: any;
    onHover: (card: any) => void;
}

export default function CardLink({ onHover, card }: Props) {

    function getMarketPrice() {
        try {
            if (card.cardPriceInfo && card.cardPriceInfo.prices) {
                return formatter.format(Object.entries(card.cardPriceInfo.prices)[0][1]["market"]);
            }
            return "";
        } catch (err) {

        }
    }
    return (
        <a href={card.cardPriceInfo.url} target="_blank">
            <span className="max-w-80 flex flex-row my-1 bg-zinc-700 rounded-xl px-2 py-1 items-center hover:text-yellow-500 hover:bg-zinc-600 justify-between" onMouseEnter={() => onHover(card)}>
                <span className="flex flex-row">
                    <p className="text-zinc-300 text-sm">{card.cardCount}&nbsp;x&nbsp;</p>
                    <p className="underline">{card.cardName}</p>
                </span>
                <p className="text-zinc-300 text-sm text-right">&nbsp;{getMarketPrice()}</p>
            </span>
        </a>
    )
}