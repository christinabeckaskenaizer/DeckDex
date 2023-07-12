
interface Props {
    href: string;
    image: string;
    title: string;
    count: number;
    onHover: (link: string, title: string) => void;
}

export default function CardLink({ href, image, title, count, onHover }: Props) {
    return (
        <a href={href} target="_blank">
            <span className="flex flex-row my-1 bg-zinc-700 rounded-xl px-2 py-1 items-center hover:text-yellow-500 hover:bg-zinc-600" onMouseEnter={() => onHover(href, title)}>
                <p className="text-zinc-300 text-sm">{count}&nbsp;x&nbsp;</p>
                <p className="underline">{title}</p>
            </span>
        </a>
    )
}