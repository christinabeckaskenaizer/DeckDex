import { NextApiRequest, NextApiResponse } from "next";
import  prisma  from "../../../lib/prismadb";


interface ExtendedNextApiRequest extends NextApiRequest {
    body : {
        id: string,
        name : string,
        description: string,
        formatId : string,
        isDeckPrivate : boolean,
        cardIds : string[],
    };
}

export default async function  handler(req: NextApiRequest, res: NextApiResponse) {

    const { id, name, description, formatId, isDeckPrivate, cardIds } = req.body;

    const updateDeck = await prisma.deck.update({
        where: {
        id: id,
        },
        data: {
        name: name,
        description: description,
        formatId : formatId,
        isDeckPrivate : isDeckPrivate,
        cardIds : cardIds,
        },
})
    res.status(200).json({
        "id" : updateDeck.id,
        "userId" : updateDeck.userId,
        "name" :  updateDeck.name,
        "description" :  updateDeck.description,
        "formatId" :     updateDeck.formatId,
        "cardIds" :     updateDeck.cardIds,
        "cardNames" :    updateDeck.cardNames,
        "favorites"  :   updateDeck.favorites,
        "isDeckPrivate" : updateDeck.isDeckPrivate,
        "typeIds" :  updateDeck.typeIds
    })
}
