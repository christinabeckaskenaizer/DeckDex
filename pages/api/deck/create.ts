import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prismadb";

// type deckResponseData = {
//     deck: {}
// }

export default async function handler(req, res) {
    const { userId, name, description, types, formatId, private, cardIds, cardNames, favorites, typesId} = req.body;
    const result = await prisma.deck.create({
        data: {
            id : id,
            userId : userId,
            name: name,
            description : description,
            types : types,
            formatId : formatId,
            private : private,
            cardIds : cardIds,
            cardNames : cardNames,
            favorites : favorites,
            typesId : typesId,
        }
    });
    res.json(result)
}
