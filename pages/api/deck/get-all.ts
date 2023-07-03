import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prismadb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // res.status(200).json(prisma.deck)
    let decks = await prisma.deck.findMany();
    res.status(200).json(decks)
}
