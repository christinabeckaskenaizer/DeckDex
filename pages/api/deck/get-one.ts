import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prismadb";

interface ExtendedNextApiRequest extends NextApiRequest {
    body : {
        id : string,
    }
}

export default async function handler(req: ExtendedNextApiRequest, res: NextApiResponse){
    const { id } = req.body;

    let result = await prisma.deck.findUnique({
        where: {
            id : id
        },
        include: {
            User: true,
        }
    })

    if(!result) return res.status(404).json({message: "Deck not found"})

    res.status(200).json({deck: result})
}
