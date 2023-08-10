import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prismadb";
import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

interface ExtendedNextApiRequest extends NextApiRequest {
    body: {
        id: string,
        name?: string,
        description?: string,
        formatId?: string,
        isDeckPrivate?: boolean,
        cards?: {},
        pricingUpdatedAt?: Date,
    };
}

export default async function handler(req: ExtendedNextApiRequest, res: NextApiResponse) {

    const session = await getServerSession(req, res, authOptions);

    const deck = await prisma.deck.findUnique({
        where: {
            id: req.body.id,
        },
    });


    if (session?.user?.id !== deck?.userId) {
        return res.status(401).json("Unauthorized");
    }

    const { id, name, description, formatId, isDeckPrivate, cards, pricingUpdatedAt } = req.body;

    const updateDeck = await prisma.deck.update({
        where: {
            id: id,
        },
        data: {
            name: name,
            description: description,
            formatId: formatId,
            isDeckPrivate: isDeckPrivate,
            cards: cards,
            pricingUpdatedAt: pricingUpdatedAt
        },
    })
    res.status(200).json({
        updateDeck
    })
}
