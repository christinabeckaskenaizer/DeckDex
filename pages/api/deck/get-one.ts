import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prismadb";

interface ExtendedNextApiRequest extends NextApiRequest {
    body : {
        id : string,
    }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    const { id } = req.body;

    let deck = await prisma.deck.findUnique({
        where: {
            id : id
        },
    })
    res.status(200).json(deck)
}
