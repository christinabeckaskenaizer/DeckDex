import { NextApiRequest, NextApiHandler, NextApiResponse } from "next";
import prisma from '../../../lib/prismadb';

export type deckResponseData = {
    decks : []
}

interface ExtendedNextApiRequest extends NextApiRequest {
    body : {
        search : string;
    }
}

export default async function handler(req: ExtendedNextApiRequest, res: NextApiResponse){
    const { search } = req.body;

    let decks : any | null = null;
    console.log("SEARCH" ,  search)
    if (search) {
        decks = await prisma.deck.findMany({
            where: {
                name: {
                    search: search.split(" ").join(" & ")
                },
            },
        })
    }
    res.status(200).json(decks)
}
