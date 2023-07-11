import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prismadb";

interface ExtendedNextApiRequest extends NextApiRequest {
    body : {
        userId : string,
    }
}

export default async function handler(req: ExtendedNextApiRequest, res: NextApiResponse) {
    // res.status(200).json(prisma.deck)

    const { userId } = req.body;

    let decks = await prisma.deck.findMany({
        where: {
            userId: userId
        }
    });
    res.status(200).json(decks)
}
