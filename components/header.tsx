import Image from "next/image";
import SignInButton from "./SignInButton";




export default function Header() {
    return (
        // bg-card-back bg-[center_top_75rem]
        <div  className="w-screen h-24 bg-zinc-50 flex items-center justify-between outline-b-1 outline-red-600 outline ">
            <Image alt="pokemon energy icons on a colorful splattered background" width={1920} height={1080} src='/energy-header.png' className="absolute w-full h-20 bg-zinc-50 z-0 bg-opacity-60 object-cover object-[top_90rem] opacity-30" />
            <span className="z-10 flex flex-row items-center">
                <span className="flex flex-row mx-4 rounded-md p-2">
                    <h1 className="font-bold text-4xl text-white drop-shadow-[0_1.9px_1.1px_rgba(0,0,0,01)]">Deck</h1>
                    <h1 className="text-4xl font-bold text-red-600">Dex</h1>
                </span>
                <div>
                    <button className="mx-12 font-bold text-lg">Build</button>
                    <button className="mx-12 font-bold text-lg">Search</button>
                    <button className="mx-12 font-bold text-lg">Gallery</button>
                </div>
            </span>
            <span className="z-10 flex flex-row items-center mr-12">
                <SignInButton />
            </span>
        </div>
    )
}