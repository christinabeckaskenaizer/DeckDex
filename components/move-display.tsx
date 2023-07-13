import Image from "next/image";

interface Props {
    card: any;
}

export default function MoveDisplay({ card }: Props) {

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

    return (
        <div className='flex flex-col items-center h-[92vh] w-auto flex-1 text-center rounded-xl pt-2 px-4 '>
            {card.attacks && card.attacks.map((attack: any) => (
                <div key={attack.name} className="relative w-96 flex flex-col items-left outline outline-white outline-1 mt-2 m-2 p-2 bg-zinc-900 text-left">
                    <div className="absolute bg-zinc-600 rounded-full p-1 px-2 right-2">
                        <h1 className="font-bold">{attack.name}</h1>
                    </div>
                    <div className="flex flex-row">
                        {attack.cost && attack.cost.map((type: string) => (
                            <Image
                                alt="Energy Type"
                                src={types[type]}
                                width={20}
                                height={20}
                                className="h-5 w-5 flex mr-2 mt-2"
                            />
                        ))}
                    </div>
                    <p className="font-bold mt-2">{attack.damage ? attack.damage + " Damage" : ""}</p>
                    <p className="text-sm text-zinc-400 my-1">{attack.text}</p>
                </div>
            ))
            }
        </div>

    )
}